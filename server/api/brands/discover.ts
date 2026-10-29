import { createClient } from "@supabase/supabase-js";
import { PLANS, PlanType } from "../../../src/lib/monetization";
import { getEffectiveSubscription } from "../../lib/subscriptionStore";
import { googleSheetsService } from "../../lib/googleSheetsService";
import { checkGcpOidcStatus } from "../../lib/gcpOidcAuth";

const DEFAULT_SUPABASE_URL = "https://ldxjxrtdylnuhvmmcveg.supabase.co";
const DEFAULT_SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkeGp4cnRkeWxudWh2bW1jdmVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2OTgxMjUsImV4cCI6MjEwNDI3NDEyNX0.C7mUyroSPQ7Vcpepiqv-jzSd-zhTB4fHuFrMX23l3HY";

function sanitizeSupabaseKey(rawKey: string | undefined | null): string {
  if (!rawKey) return "";
  const key = rawKey.trim().replace(/^["']|["']$/g, "");
  const parts = key.split(".");
  if (parts.length >= 3) {
    const sigMatch = parts[2].match(/^[A-Za-z0-9_-]+/);
    if (sigMatch) return `${parts[0]}.${parts[1]}.${sigMatch[0]}`;
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

function normalizePlan(plan: string): PlanType {
  if (plan === "pro") plan = "creator_pro";
  if (plan === "agency") plan = "agency_pro";
  return PLANS[plan as PlanType] ? (plan as PlanType) : "free";
}

function getSortColumn(sortOption?: string): {
  column: string;
  ascending: boolean;
} {
  switch ((sortOption || "").toLowerCase()) {
    case "newest":
    case "recent":
      return { column: "created_at", ascending: false };
    case "highest score":
    case "top score":
    case "best match":
    default:
      return { column: "lead_score", ascending: false };
  }
}

/**
 * Temporary resilient data strategy:
 * Google Sheets remains the preferred brand-intelligence source.
 * If Sheets is unavailable or returns no rows, use the existing Supabase
 * brand catalogue rather than showing a misleading empty Discover page.
 */
async function getSupabaseBrandFallback(
  supabase: ReturnType<typeof createClient>,
  options: {
    search?: string;
    filters?: Record<string, unknown>;
    sortOption?: string;
    pageParam: number;
    pageSize: number;
  },
) {
  const { search, filters, sortOption, pageParam, pageSize } = options;
  let query = supabase
    .from("brands")
    .select("*", { count: "exact" })
    .eq("status", "published");

  if (search?.trim()) {
    const term = search.trim().replace(/[,%()]/g, " ");
    query = query.or(
      `company_name.ilike.%${term}%,industry.ilike.%${term}%,product.ilike.%${term}%,category.ilike.%${term}%,subcategory.ilike.%${term}%,country.ilike.%${term}%,company_description.ilike.%${term}%`,
    );
  }

  if (filters && typeof filters === "object") {
    const country = filters.country;
    const industry = filters.industry;
    const category = filters.category;
    const stage = filters.companyStage ?? filters.company_stage;
    if (
      typeof country === "string" &&
      country &&
      country.toLowerCase() !== "all"
    ) {
      query = query.ilike("country", country);
    }
    if (
      typeof industry === "string" &&
      industry &&
      industry.toLowerCase() !== "all"
    ) {
      query = query.ilike("industry", industry);
    }
    if (
      typeof category === "string" &&
      category &&
      category.toLowerCase() !== "all"
    ) {
      query = query.ilike("category", category);
    }
    if (typeof stage === "string" && stage && stage.toLowerCase() !== "all") {
      query = query.ilike("company_stage", stage);
    }
  }

  const sort = getSortColumn(sortOption);
  query = query.order(sort.column, {
    ascending: sort.ascending,
    nullsFirst: false,
  });
  const from = Math.max(0, pageParam) * Math.max(1, pageSize);
  query = query.range(from, from + Math.max(1, pageSize) - 1);

  const { data, error, count } = await query;
  if (error) throw error;
  const brands = (data || []).map((brand: Record<string, unknown>) => ({
    ...brand,
    id: brand.id,
    brand_id: brand.id,
    name: brand.company_name,
    primary_product_summary: brand.product_description || brand.product || null,
    opportunity_signals: brand.opportunity_signals || brand.opportunity_signals,
    source: "supabase_fallback",
  }));
  const totalCount = count || 0;
  return {
    brands,
    count: brands.length,
    totalCount,
    nextPage: from + brands.length < totalCount ? pageParam + 1 : null,
    page: pageParam,
    pageSize,
    source: "supabase_fallback",
  };
}

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
        if (user?.email) userEmail = user.email;
      } catch {
        // Continue with the public catalogue; auth failures must not break discovery.
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
        // Discovery can continue without workspace-specific quota tracking.
      }
    }

    let plan: string = "free";
    if (activeWorkspaceId) {
      const sub = await getEffectiveSubscription(
        activeWorkspaceId,
        userEmail,
        env,
        authHeader,
      );
      if (sub?.plan) plan = sub.plan;
    }
    const planType = normalizePlan(plan);
    const planConfig = PLANS[planType];

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
              {
                status: 403,
                headers: { "Content-Type": "application/json" },
              },
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
            {
              status: 403,
              headers: { "Content-Type": "application/json" },
            },
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
            .update({ searches, brand_views: leads + pageSize })
            .eq("id", usage.id);
        }
      } catch {
        // Quota telemetry should not make discovery unavailable.
      }
    }

    const oidcStatus = checkGcpOidcStatus(env);
    if (oidcStatus.configured) {
      const syncRes = await googleSheetsService.syncWithRemoteSheet(env);
      if (!syncRes.success && process.env.NODE_ENV === "production") {
        console.error(
          "Live Google Sheet sync failed in production:",
          syncRes.error,
        );
        return new Response(
          JSON.stringify({
            error: "Authoritative Google Sheets data sync failed",
            details: syncRes.error,
            source: "google_sheets_error",
          }),
          { status: 502, headers: { "Content-Type": "application/json" } },
        );
      }
    }

    let result: {
      brands: Array<Record<string, unknown>>;
      count: number;
      totalCount: number;
      nextPage?: number | null;
      page: number;
      pageSize: number;
      source?: string;
    } | null = null;
    let source = "google_sheets";
    try {
      result = googleSheetsService.getBrands({
        search,
        filters,
        sortOption,
        pageParam,
        pageSize,
      }) as typeof result;
    } catch (sheetError) {
      console.error(
        "Google Sheets brand lookup failed; considering fallback.",
        sheetError,
      );
    }

    // Only fallback if Google Sheets service has 0 total records in catalogue
    // and no search term caused the 0 results. If the user searched for something
    // that doesn't exist, we must preserve the authentic empty result!
    const sheetDiagnostic = await googleSheetsService.getDiagnosticReport(env);
    const hasSheetCatalogue = sheetDiagnostic.totalBrandsLoaded > 0;

    if (!hasSheetCatalogue && (!result || result.brands.length === 0)) {
      result = await getSupabaseBrandFallback(supabase, {
        search,
        filters,
        sortOption,
        pageParam,
        pageSize,
      });
      source = "supabase_fallback";
    }

    if (!result) {
      return new Response(
        JSON.stringify({
          error: "Brand intelligence catalogue is currently unavailable",
          source: "service_unavailable",
        }),
        { status: 503, headers: { "Content-Type": "application/json" } },
      );
    }

    const maskedBrands = result.brands.map((brand: Record<string, unknown>) => {
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
        source: result.source || source,
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (err: unknown) {
    const errorObj = err as { message?: string } | undefined;
    console.error("Discover request failed:", errorObj?.message || err);
    return new Response(
      JSON.stringify({
        error: errorObj?.message || "Error processing discover request",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
