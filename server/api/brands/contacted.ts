import { createClient } from "@supabase/supabase-js";
import { googleSheetsService } from "../../lib/googleSheetsService";
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

// Local storage fallback for outreach if Supabase is offline
const OUTREACH_FILE = path.join(process.cwd(), ".data", "outreach.json");

interface OutreachRecord {
  id: string;
  workspace_id: string;
  brand_id: string;
  status: string;
  email_subject?: string;
  email_body?: string;
  notes?: string;
  next_action?: string;
  contacted_at?: string;
  last_activity_at: string;
  created_at: string;
  updated_at: string;
}

function loadOutreachRecords(): OutreachRecord[] {
  try {
    if (fs.existsSync(OUTREACH_FILE)) {
      return JSON.parse(fs.readFileSync(OUTREACH_FILE, "utf-8")) || [];
    }
  } catch (e) {
    console.warn("Could not load local outreach file:", e);
  }
  return [];
}

function saveOutreachRecords(records: OutreachRecord[]) {
  try {
    const dir = path.dirname(OUTREACH_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(OUTREACH_FILE, JSON.stringify(records, null, 2), "utf-8");
  } catch (e) {
    console.warn("Could not save local outreach file:", e);
  }
}

export const handleContactedBrands = async (
  request: Request,
  env?: Record<string, unknown>,
) => {
  try {
    const supabase = getSupabase(env);
    const body = await request.json().catch(() => ({}));
    const {
      workspaceId,
      action = "list", // 'list' | 'update_status' | 'upsert' | 'delete'
      outreachId,
      brandId,
      status,
      notes,
      emailSubject,
      emailBody,
      nextAction,
    } = body;

    const activeWorkspaceId = workspaceId || "default_workspace";

    // Handle STATUS UPDATE / UPSERT
    if (action === "update_status" || action === "upsert") {
      if (!brandId) {
        return new Response(JSON.stringify({ error: "Missing brandId" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const now = new Date().toISOString();
      const updatedStatus = status || "Contacted";

      // 1. Try Supabase
      try {
        await supabase.from("outreach").upsert(
          {
            workspace_id: activeWorkspaceId,
            brand_id: brandId,
            status: updatedStatus,
            notes: notes || undefined,
            email_subject: emailSubject || undefined,
            email_body: emailBody || undefined,
            next_action: nextAction || undefined,
            contacted_at: now,
            updated_at: now,
          },
          { onConflict: "workspace_id, brand_id" },
        );
      } catch {
        // Fallback to local store
      }

      // 2. Sync local store
      const records = loadOutreachRecords();
      const existing = records.find(
        (r) => r.workspace_id === activeWorkspaceId && r.brand_id === brandId,
      );

      if (existing) {
        existing.status = updatedStatus;
        if (notes !== undefined) existing.notes = notes;
        if (emailSubject !== undefined) existing.email_subject = emailSubject;
        if (emailBody !== undefined) existing.email_body = emailBody;
        if (nextAction !== undefined) existing.next_action = nextAction;
        existing.updated_at = now;
        existing.last_activity_at = now;
      } else {
        records.push({
          id: outreachId || `outreach_${Date.now()}`,
          workspace_id: activeWorkspaceId,
          brand_id: brandId,
          status: updatedStatus,
          notes: notes || "",
          email_subject: emailSubject || "",
          email_body: emailBody || "",
          next_action: nextAction || "",
          contacted_at: now,
          last_activity_at: now,
          created_at: now,
          updated_at: now,
        });
      }
      saveOutreachRecords(records);

      return new Response(
        JSON.stringify({
          success: true,
          status: updatedStatus,
          brandId,
        }),
        { headers: { "Content-Type": "application/json" } },
      );
    }

    // Handle LIST
    let rawOutreach: OutreachRecord[] = [];
    try {
      const { data, error } = await supabase
        .from("outreach")
        .select("*")
        .eq("workspace_id", activeWorkspaceId)
        .order("updated_at", { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        rawOutreach = data;
      } else {
        rawOutreach = loadOutreachRecords().filter(
          (r) => r.workspace_id === activeWorkspaceId,
        );
      }
    } catch {
      rawOutreach = loadOutreachRecords().filter(
        (r) => r.workspace_id === activeWorkspaceId,
      );
    }

    // Enrich with full brand intelligence from Google Sheets
    const enriched = rawOutreach
      .map((item) => {
        const brand = googleSheetsService.getBrandById(item.brand_id);
        if (!brand) return null;
        const contacts = googleSheetsService.getContactsForBrand(item.brand_id);
        return {
          ...item,
          brand,
          contacts,
        };
      })
      .filter(Boolean);

    return new Response(
      JSON.stringify({
        outreach: enriched,
        count: enriched.length,
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (err: unknown) {
    const errorObj = err as { message?: string } | undefined;
    return new Response(
      JSON.stringify({
        error: errorObj?.message || "Failed to handle contacted brands",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
