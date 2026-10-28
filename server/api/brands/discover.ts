import { createClient } from "@supabase/supabase-js";
import { PLANS, PlanType } from "../../../src/lib/monetization";
import { getEffectiveSubscription } from "../../lib/subscriptionStore";
import { googleSheetsService } from "../../lib/googleSheetsService";

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

export const handleDiscover = async (
  request: Request,
  env?: Record<string, unknown>,
) => {
  try {
    const supabase = getSupabase(env);
    const body = await request.json().catch(() => ({}));
    const authHeader =
      request.headers.get("Authorization") ||
      request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "").trim();

    let user: { id: string; email?: string } | null = null;
    let userEmail: string | null = null;
    if (token) {
      try {
        const { data } = await supabase.auth.getUser(token);
        user = (data?.user as { id: string; email?: string } | null) || null;
        if (user?.email) {
          userEmail = user.email;
        }
      } catch {
        // Non-fatal if Supabase auth endpoint unavailable
      }
    }

    const {
      workspaceId,
      pageParam = 0,
      pageSize = 12,
      search,
      filters,
      sortOption,
    } = body;

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
        // Continue
      }
    }

    let plan = "free";
    if (activeWorkspaceId) {
      const sub = await getEffectiveSubscription(
        activeWorkspaceId,
        userEmail,
        env,
        authHeader,
      );
      if (sub?.plan) {
        plan = sub.plan;
      }
    }

    if (plan === "pro") plan = "creator_pro";
    if (plan === "agency") plan = "agency_pro";
    if (!PLANS[plan as PlanType]) plan = "free";

    const planConfig = PLANS[plan as PlanType];

    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    ).toISOString();

    if (activeWorkspaceId) {
      try {
        const { data: usage } = await supabase
          .from("usage")
          .select("*")
          .eq("workspace_id", activeWorkspaceId)
          .gte("period_start", startOfDay)
          .limit(1)
          .maybeSingle();

        let searches = usage?.searches || 0;
        const leads = usage?.brand_views || 0;

        if (pageParam === 0 && search) {
          if (
            planConfig.limits.daily_brand_searches !== "unlimited" &&
            searches >= planConfig.limits.daily_brand_searches
          ) {
            return new Response(
              JSON.stringify({ error: "Daily search limit reached" }),
              { status: 403, headers: { "Content-Type": "application/json" } },
            );
          }
          searches++;
        }

        if (
          planConfig.limits.daily_brand_leads !== "unlimited" &&
          leads >= planConfig.limits.daily_brand_leads
        ) {
          return new Response(
            JSON.stringify({ error: "Daily lead limit reached" }),
            { status: 403, headers: { "Content-Type": "application/json" } },
          );
        }

        if (!usage) {
          const endOfDay = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1,
          ).toISOString();
          await supabase.from("usage").insert({
            workspace_id: activeWorkspaceId,
            period_start: startOfDay,
            period_end: endOfDay,
            searches: search && pageParam === 0 ? 1 : 0,
            brand_views: pageSize,
          });
        } else {
          await supabase
            .from("usage")
            .update({
              searches: searches,
              brand_views: leads + pageSize,
            })
            .eq("id", usage.id);
        }
      } catch {
        // Usage tracking graceful error handling
      }
    }

    // Google Sheet as single source of truth for brand discovery
    const result = googleSheetsService.getBrands({
      search,
      filters,
      sortOption,
      pageParam,
      pageSize,
    });

    const maskedBrands = result.brands.map((brand) => {
      if (!planConfig.features.full_brand_intelligence) {
        return {
          ...brand,
          primary_product_summary: planConfig.features.product_intelligence
            ? brand.primary_product_summary
            : "Upgrade to unlock product intelligence",
          recent_funding: planConfig.features.funding_intelligence
            ? brand.recent_funding
            : "Upgrade to unlock funding intelligence",
          marketing_activity: planConfig.features.marketing_intelligence
            ? brand.marketing_activity
            : "Upgrade to unlock marketing intelligence",
          opportunity_signals: planConfig.features.creator_intelligence
            ? brand.opportunity_signals
            : null,
        };
      }
      return brand;
    });

    return new Response(
      JSON.stringify({
        brands: maskedBrands,
        count: result.count,
        totalCount: result.totalCount,
        nextPage: result.nextPage,
        page: result.page,
        pageSize: result.pageSize,
        source: "google_sheets",
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (err: unknown) {
    const errorObj = err as { message?: string } | undefined;
    return new Response(
      JSON.stringify({
        error: errorObj?.message || "Error processing discover request",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
