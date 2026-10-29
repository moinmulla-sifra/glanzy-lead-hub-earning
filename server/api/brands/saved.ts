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

// Local persistent fallback for saved brands if Supabase is offline
const SAVED_FILE = path.join(process.cwd(), ".data", "saved_brands.json");

interface SavedRecord {
  id: string;
  workspace_id: string;
  brand_id: string;
  status: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export function loadSavedRecords(): SavedRecord[] {
  try {
    if (fs.existsSync(SAVED_FILE)) {
      return JSON.parse(fs.readFileSync(SAVED_FILE, "utf-8")) || [];
    }
  } catch (e) {
    console.warn("Could not load local saved file:", e);
  }
  return [];
}

function saveSavedRecords(records: SavedRecord[]) {
  try {
    const dir = path.dirname(SAVED_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(SAVED_FILE, JSON.stringify(records, null, 2), "utf-8");
  } catch (e) {
    console.warn("Could not save local saved file:", e);
  }
}

export const handleSavedBrands = async (
  request: Request,
  env?: Record<string, unknown>,
) => {
  try {
    const supabase = getSupabase(env);
    const body = await request.json().catch(() => ({}));
    const {
      workspaceId,
      action, // 'list' | 'toggle' | 'save' | 'unsave'
      brandId,
      status,
      notes,
      pageParam = 0,
      pageSize = 12,
      search = "",
      filters = {},
      sortOption = "recently_saved",
    } = body;

    const activeWorkspaceId = workspaceId || "default_workspace";

    // Handle TOGGLE / SAVE / UNSAVE
    if (action === "toggle" || action === "save" || action === "unsave") {
      if (!brandId) {
        return new Response(JSON.stringify({ error: "Missing brandId" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      // 1. Try Supabase first
      let supabaseSuccess = false;
      try {
        if (action === "unsave") {
          await supabase
            .from("saved_brands")
            .delete()
            .eq("workspace_id", activeWorkspaceId)
            .eq("brand_id", brandId);
          supabaseSuccess = true;
        } else {
          // Check if exists
          const { data: existing } = await supabase
            .from("saved_brands")
            .select("id")
            .eq("workspace_id", activeWorkspaceId)
            .eq("brand_id", brandId)
            .maybeSingle();

          if (existing && action === "toggle") {
            await supabase.from("saved_brands").delete().eq("id", existing.id);
          } else if (!existing) {
            await supabase.from("saved_brands").insert({
              workspace_id: activeWorkspaceId,
              brand_id: brandId,
              status: status || "Saved",
              notes: notes || null,
            });
          }
          supabaseSuccess = true;
        }
      } catch {
        supabaseSuccess = false;
      }

      // 2. Also keep local persistent storage in sync
      const localRecords = loadSavedRecords();
      const existingIdx = localRecords.findIndex(
        (r) => r.workspace_id === activeWorkspaceId && r.brand_id === brandId,
      );

      let isNowSaved = false;
      if (action === "unsave" || (action === "toggle" && existingIdx !== -1)) {
        if (existingIdx !== -1) {
          localRecords.splice(existingIdx, 1);
        }
        isNowSaved = false;
      } else {
        if (existingIdx === -1) {
          localRecords.push({
            id: `saved_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            workspace_id: activeWorkspaceId,
            brand_id: brandId,
            status: status || "Saved",
            notes: notes || "",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        }
        isNowSaved = true;
      }
      saveSavedRecords(localRecords);

      return new Response(
        JSON.stringify({
          success: true,
          isSaved: isNowSaved,
          brandId,
          source: supabaseSuccess ? "supabase_synced" : "local_store",
        }),
        { headers: { "Content-Type": "application/json" } },
      );
    }

    // Handle LIST SAVED BRANDS
    let rawSaved: SavedRecord[] = [];
    try {
      const { data, error } = await supabase
        .from("saved_brands")
        .select(
          "id, workspace_id, brand_id, status, notes, created_at, updated_at",
        )
        .eq("workspace_id", activeWorkspaceId)
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        rawSaved = data;
      } else {
        rawSaved = loadSavedRecords().filter(
          (r) => r.workspace_id === activeWorkspaceId,
        );
      }
    } catch {
      rawSaved = loadSavedRecords().filter(
        (r) => r.workspace_id === activeWorkspaceId,
      );
    }

    // Enrich each saved record with full brand intelligence from Google Sheets Service
    let enriched = rawSaved
      .map((item) => {
        const brand = googleSheetsService.getBrandById(item.brand_id);
        if (!brand) return null;
        return {
          ...item,
          brand,
        };
      })
      .filter(Boolean) as Array<
      SavedRecord & {
        brand: ReturnType<typeof googleSheetsService.getBrandById>;
      }
    >;

    // Search filter
    const searchTerm = (search || "").toLowerCase().trim();
    if (searchTerm) {
      enriched = enriched.filter((item) => {
        const b = item.brand!;
        return (
          b.company_name.toLowerCase().includes(searchTerm) ||
          (b.industry || "").toLowerCase().includes(searchTerm) ||
          (b.country || "").toLowerCase().includes(searchTerm) ||
          (b.category || "").toLowerCase().includes(searchTerm)
        );
      });
    }

    // Category / industry filters
    if (filters.industry && filters.industry.length > 0) {
      enriched = enriched.filter((item) => {
        const ind = (item.brand?.industry || "").toLowerCase();
        return filters.industry.some((fi: string) =>
          ind.includes(fi.toLowerCase()),
        );
      });
    }

    if (filters.country && filters.country.length > 0) {
      enriched = enriched.filter((item) => {
        const c = (item.brand?.country || "").toLowerCase();
        return filters.country.some((fc: string) =>
          c.includes(fc.toLowerCase()),
        );
      });
    }

    if (filters.status && filters.status.length > 0) {
      enriched = enriched.filter((item) =>
        filters.status.includes(item.status),
      );
    }

    // Sorting
    switch (sortOption) {
      case "recently_saved":
        enriched.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
        break;
      case "recently_updated":
        enriched.sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
        );
        break;
      case "creator_fit":
        enriched.sort(
          (a, b) =>
            (Number(b.brand?.creator_fit_score) || 0) -
            (Number(a.brand?.creator_fit_score) || 0),
        );
        break;
      case "lead_score":
        enriched.sort(
          (a, b) =>
            (Number(b.brand?.lead_score) || 0) -
            (Number(a.brand?.lead_score) || 0),
        );
        break;
      case "az":
        enriched.sort((a, b) =>
          (a.brand?.company_name || "").localeCompare(
            b.brand?.company_name || "",
          ),
        );
        break;
      default:
        enriched.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
    }

    const totalCount = enriched.length;
    const startIndex = pageParam * pageSize;
    const paginated = enriched.slice(startIndex, startIndex + pageSize);
    const hasMore = startIndex + pageSize < totalCount;

    return new Response(
      JSON.stringify({
        savedBrands: paginated,
        totalCount,
        count: totalCount,
        nextPage: hasMore ? pageParam + 1 : undefined,
        savedBrandIds: rawSaved.map((r) => r.brand_id),
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (err: unknown) {
    const errorObj = err as { message?: string } | undefined;
    return new Response(
      JSON.stringify({
        error: errorObj?.message || "Failed to handle saved brands",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
