import { createClient } from "@supabase/supabase-js";
import { PLANS, type PlanType } from "../../../src/lib/monetization";
import { getEffectiveSubscription } from "../../lib/subscriptionStore";
import {
  googleSheetsService,
  type SheetContact,
} from "../../lib/googleSheetsService";
import fs from "node:fs";
import path from "node:path";

const DEFAULT_SUPABASE_URL = "https://ldxjxrtdylnuhvmmcveg.supabase.co";
const DEFAULT_SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkeGp4cnRkeWxudWh2bW1jdmVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2OTgxMjUsImV4cCI6MjEwNDI3NDEyNX0.C7mUyroSPQ7Vcpepiqv-jzSd-zhTB4fHuFrMX23l3HY";

function sanitizeSupabaseKey(rawKey: string | undefined | null): string {
  if (!rawKey) return "";
  const key = rawKey.trim().replace(/^["']|["']$/g, "");
  const parts = key.split(".");
  if (parts.length >= 3) {
    const sigMatch = parts[2].match(/^[A-Za-z0-9_-]+/);
    if (sigMatch) {
      return `${parts[0]}.${parts[1]}.${sigMatch[0]}`;
    }
  }
  return key;
}

const getSupabase = (env?: Record<string, unknown>) => {
  const rawUrl =
    (env?.VITE_SUPABASE_URL as string) ||
    process.env.VITE_SUPABASE_URL ||
    DEFAULT_SUPABASE_URL;

  const rawKey =
    (env?.VITE_SUPABASE_SERVICE_ROLE_KEY as string) ||
    (env?.VITE_SUPABASE_ANON_KEY as string) ||
    process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    DEFAULT_SUPABASE_KEY;

  const url =
    rawUrl && !rawUrl.includes("placeholder")
      ? rawUrl.trim()
      : DEFAULT_SUPABASE_URL;
  const key = sanitizeSupabaseKey(rawKey) || DEFAULT_SUPABASE_KEY;

  return createClient(url, key);
};

// Persistent storage for contact reveals
const REVEALS_FILE = path.join(process.cwd(), ".data", "reveals.json");

interface RevealsStore {
  [workspaceId: string]: {
    [monthKey: string]: string[]; // array of revealed brandIds
  };
}

let inMemoryReveals: RevealsStore | null = null;

function loadReveals(): RevealsStore {
  if (inMemoryReveals) return inMemoryReveals;
  try {
    const dir = path.dirname(REVEALS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (fs.existsSync(REVEALS_FILE)) {
      const raw = fs.readFileSync(REVEALS_FILE, "utf-8");
      inMemoryReveals = JSON.parse(raw);
      return inMemoryReveals || {};
    }
  } catch (e) {
    console.warn("Could not load reveals file:", e);
  }
  inMemoryReveals = {};
  return inMemoryReveals;
}

function saveReveals(store: RevealsStore) {
  try {
    const dir = path.dirname(REVEALS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(REVEALS_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (e) {
    console.warn("Could not save reveals file:", e);
  }
}

function getCurrentMonthKey(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export const handleReveal = async (
  request: Request,
  env?: Record<string, unknown>,
) => {
  try {
    const supabase = getSupabase(env);
    const authHeader =
      request.headers.get("Authorization") ||
      request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "").trim();

    let user: { id: string; email?: string } | null = null;
    if (token) {
      try {
        const { data: userData } = await supabase.auth.getUser(token);
        if (userData?.user) {
          user = userData.user;
        }
      } catch {
        // Fallback for demo or dev mode
      }
    }

    const body = await request.json().catch(() => ({}));
    const { workspaceId, brandId, checkOnly = false } = body;

    if (!brandId) {
      return new Response(JSON.stringify({ error: "Missing brandId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Resolve workspace ID
    let activeWorkspaceId = workspaceId;
    if (!activeWorkspaceId && user?.id) {
      try {
        const { data: member } = await supabase
          .from("workspace_members")
          .select("workspace_id")
          .eq("user_id", user.id)
          .limit(1)
          .maybeSingle();
        activeWorkspaceId = member?.workspace_id;
      } catch {
        // Fallback
      }
    }

    if (!activeWorkspaceId) {
      activeWorkspaceId = "default_workspace";
    }

    // 1. Fetch effective subscription for reveal limits
    const subRecord = await getEffectiveSubscription(
      activeWorkspaceId,
      user?.email || null,
      env,
      authHeader,
    );
    const plan = (subRecord?.plan as PlanType) || "free";
    const planConfig = PLANS[plan] || PLANS.free;
    const monthlyLimit = planConfig.limits.monthly_contact_reveals;

    // 2. Fetch the target brand from Google Sheets Service
    const brand = googleSheetsService.getBrandById(brandId);
    if (!brand) {
      return new Response(
        JSON.stringify({ error: "Brand not found in Google Sheet" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // 3. Load reveal history for workspace
    const store = loadReveals();
    if (!store[activeWorkspaceId]) {
      store[activeWorkspaceId] = {};
    }
    const monthKey = getCurrentMonthKey();
    if (!store[activeWorkspaceId][monthKey]) {
      store[activeWorkspaceId][monthKey] = [];
    }

    const currentRevealedList = store[activeWorkspaceId][monthKey];
    const isAlreadyRevealed = currentRevealedList.includes(brandId);
    const revealsUsed = currentRevealedList.length;

    // 4. Retrieve ALL contacts from Contacts worksheet for this brand
    const allContacts: SheetContact[] =
      googleSheetsService.getContactsForBrand(brandId);
    const hasContactDetails = allContacts.length > 0;

    // Separate verified vs active contacts for clear UI presentation
    const verifiedContacts = allContacts.filter(
      (c) => (c.verification_status || "").toLowerCase() === "verified",
    );
    const unverifiedContacts = allContacts.filter(
      (c) => (c.verification_status || "").toLowerCase() !== "verified",
    );

    // If checkOnly was requested, return current status and limits
    if (checkOnly) {
      return new Response(
        JSON.stringify({
          revealed: isAlreadyRevealed,
          alreadyRevealed: isAlreadyRevealed,
          revealsUsed,
          revealsLimit: monthlyLimit,
          revealsRemaining: Math.max(0, monthlyLimit - revealsUsed),
          hasContactDetails,
          contactCount: allContacts.length,
          contacts: isAlreadyRevealed ? allContacts : null,
          verifiedContacts: isAlreadyRevealed ? verifiedContacts : null,
          unverifiedContacts: isAlreadyRevealed ? unverifiedContacts : null,
          primaryContact:
            isAlreadyRevealed && allContacts.length > 0 ? allContacts[0] : null,
        }),
        { headers: { "Content-Type": "application/json" } },
      );
    }

    // If already revealed, return EVERY contact without deducting usage
    if (isAlreadyRevealed) {
      return new Response(
        JSON.stringify({
          revealed: true,
          alreadyRevealed: true,
          revealsUsed,
          revealsLimit: monthlyLimit,
          revealsRemaining: Math.max(0, monthlyLimit - revealsUsed),
          contacts: allContacts,
          verifiedContacts,
          unverifiedContacts,
          contactCount: allContacts.length,
          primaryContact: allContacts.length > 0 ? allContacts[0] : null,
        }),
        { headers: { "Content-Type": "application/json" } },
      );
    }

    // If brand has NO contact info at all, don't decrement reveals!
    if (!hasContactDetails) {
      return new Response(
        JSON.stringify({
          revealed: false,
          noContactAvailable: true,
          revealsUsed,
          revealsLimit: monthlyLimit,
          revealsRemaining: Math.max(0, monthlyLimit - revealsUsed),
          message:
            "No direct contact details currently available for this brand in the Sheet.",
        }),
        { headers: { "Content-Type": "application/json" } },
      );
    }

    // Enforce monthly limit
    if (revealsUsed >= monthlyLimit) {
      return new Response(
        JSON.stringify({
          error: `Monthly contact reveal limit reached (${monthlyLimit} reveals). Upgrade your plan to reveal more business contacts.`,
          limitReached: true,
          revealsUsed,
          revealsLimit: monthlyLimit,
          revealsRemaining: 0,
        }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }

    // Execute the reveal: apply quota ONCE per brand
    currentRevealedList.push(brandId);
    saveReveals(store);

    // Record in outreach_activity if an outreach item exists
    try {
      if (user?.id) {
        const { data: outreachItem } = await supabase
          .from("outreach")
          .select("id")
          .eq("workspace_id", activeWorkspaceId)
          .eq("brand_id", brandId)
          .maybeSingle();

        if (outreachItem?.id) {
          await supabase.from("outreach_activity").insert({
            outreach_id: outreachItem.id,
            workspace_id: activeWorkspaceId,
            activity_type: "contact_revealed",
            note: `Revealed ${allContacts.length} contacts for ${brand.company_name}`,
            user_id: user.id,
            created_by: user.id,
          });
        }
      }
    } catch {
      // Non-fatal logging
    }

    const updatedRevealsUsed = currentRevealedList.length;

    // Return EVERY available email and contact detail
    return new Response(
      JSON.stringify({
        revealed: true,
        alreadyRevealed: false,
        revealsUsed: updatedRevealsUsed,
        revealsLimit: monthlyLimit,
        revealsRemaining: Math.max(0, monthlyLimit - updatedRevealsUsed),
        contacts: allContacts,
        verifiedContacts,
        unverifiedContacts,
        contactCount: allContacts.length,
        primaryContact: allContacts.length > 0 ? allContacts[0] : null,
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (err: unknown) {
    const errorObj = err as { message?: string } | undefined;
    return new Response(
      JSON.stringify({
        error: errorObj?.message || "Failed to reveal contacts",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
