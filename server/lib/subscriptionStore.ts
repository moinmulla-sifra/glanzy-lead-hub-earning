import DodoPayments from "dodopayments";
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

export interface SubscriptionRecord {
  workspace_id: string;
  plan: string;
  status: "active" | "cancelled" | "on_hold" | "expired" | "inactive";
  provider: string;
  provider_subscription_id?: string;
  customer_email?: string;
  next_billing_date?: string;
  updated_at: string;
}

const PRODUCT_TO_PLAN: Record<string, string> = {
  pdt_0NnVj2WDdu538UYT0YJyn: "creator_plus",
  pdt_0NnVjWPRBluNjdQSiMw4H: "creator_plus",
  pdt_0NnVl9vHzPaM4ZeSuypNO: "creator_pro",
  pdt_0NnVlYI4ZE35p4jApk3Ud: "creator_pro",
  pdt_0NnVmAScc9gdOR13e5OGx: "agency_plus",
  pdt_0NnVmVob4HjnEaPiOoNWQ: "agency_plus",
  pdt_0NnVmrrrfGMpqoHR8yvHo: "agency_pro",
  pdt_0NnVnRNOMYq9ZlHoTEsua: "agency_pro",
};

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

const getSupabase = (
  env?: Record<string, unknown>,
  authHeader?: string | null,
) => {
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

  return createClient(url, key, {
    auth: { persistSession: false },
    global: {
      headers: authHeader ? { Authorization: authHeader } : {},
    },
  });
};

export const getDodoApiKey = (env?: Record<string, unknown>): string => {
  const rawKey =
    (env?.DODO_PAYMENTS_API_KEY as string) ||
    process.env.DODO_PAYMENTS_API_KEY ||
    "";
  return rawKey.trim().replace(/^["']|["']$/g, "");
};

export const getDodo = (env?: Record<string, unknown>): DodoPayments | null => {
  const rawEnv =
    (env?.DODO_PAYMENTS_ENVIRONMENT as string) ||
    process.env.DODO_PAYMENTS_ENVIRONMENT;
  const environment = rawEnv === "live_mode" ? "live_mode" : "test_mode";

  const apiKey = getDodoApiKey(env);

  if (!apiKey || apiKey.startsWith("test_sk_placeholder")) {
    return null;
  }

  return new DodoPayments({
    bearerToken: apiKey,
    environment,
  });
};

// In-memory cache
const memoryCache = new Map<string, SubscriptionRecord>();

// Persistent file storage helpers
const STORAGE_FILE = path.join(process.cwd(), ".data", "subscriptions.json");

function ensureStorageDir() {
  try {
    const dir = path.dirname(STORAGE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (e) {
    console.warn("Could not create storage dir:", e);
  }
}

function loadStorageFromFile(): void {
  try {
    ensureStorageDir();
    if (fs.existsSync(STORAGE_FILE)) {
      const data = fs.readFileSync(STORAGE_FILE, "utf-8");
      const records = JSON.parse(data) as Record<string, SubscriptionRecord>;
      for (const [k, v] of Object.entries(records)) {
        memoryCache.set(k, v);
      }
    }
  } catch (e) {
    console.warn("Failed loading subscriptions from file:", e);
  }
}

function saveStorageToFile(): void {
  try {
    ensureStorageDir();
    const obj: Record<string, SubscriptionRecord> = {};
    for (const [k, v] of memoryCache.entries()) {
      obj[k] = v;
    }
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(obj, null, 2), "utf-8");
  } catch (e) {
    console.warn("Failed saving subscriptions to file:", e);
  }
}

// Initialize on module load
loadStorageFromFile();

/**
 * Normalizes plan name to canonical app plan (free, creator_plus, creator_pro, agency_plus, agency_pro)
 */
export function normalizePlanName(rawPlan?: string | null): string {
  if (!rawPlan) return "free";
  let plan = rawPlan.toLowerCase().trim();
  if (plan === "pro") plan = "creator_pro";
  if (plan === "agency") plan = "agency_pro";
  if (PRODUCT_TO_PLAN[plan]) plan = PRODUCT_TO_PLAN[plan];
  return plan;
}

/**
 * Upserts a subscription in the local cache and persists to disk.
 * Also attempts to write to Supabase if accessible.
 */
export async function saveSubscription(
  sub: SubscriptionRecord,
  env?: Record<string, unknown>,
  authHeader?: string | null,
): Promise<void> {
  const canonicalPlan = normalizePlanName(sub.plan);
  const record: SubscriptionRecord = {
    ...sub,
    plan: canonicalPlan,
    updated_at: new Date().toISOString(),
  };

  memoryCache.set(record.workspace_id, record);
  saveStorageToFile();

  // Try updating Supabase subscriptions table as secondary sync
  try {
    const supabase = getSupabase(env, authHeader);
    const { data: existingSub } = await supabase
      .from("subscriptions")
      .select("id")
      .eq("workspace_id", record.workspace_id)
      .maybeSingle();

    if (existingSub?.id) {
      await supabase
        .from("subscriptions")
        .update({
          plan: record.plan,
          status: record.status,
          provider: record.provider || "dodo",
          provider_subscription_id:
            record.provider_subscription_id || `dodo_${Date.now()}`,
          updated_at: record.updated_at,
        })
        .eq("id", existingSub.id);
    } else {
      await supabase.from("subscriptions").insert({
        workspace_id: record.workspace_id,
        plan: record.plan,
        status: record.status,
        provider: record.provider || "dodo",
        provider_subscription_id:
          record.provider_subscription_id || `dodo_${Date.now()}`,
        updated_at: record.updated_at,
      });
    }
  } catch (sbErr) {
    // Non-fatal: Supabase RLS may prevent direct anon client insert
    console.warn("Supabase background sync notice (handled):", sbErr);
  }
}

/**
 * Queries Dodo Payments API directly for any active subscription
 * associated with a workspaceId or userEmail.
 */
export async function syncFromDodoPayments(
  workspaceId?: string | null,
  userEmail?: string | null,
  env?: Record<string, unknown>,
): Promise<SubscriptionRecord | null> {
  const dodo = getDodo(env);
  if (!dodo) {
    return null;
  }

  try {
    // 1. Check active subscriptions in Dodo
    const subsResponse = await dodo.subscriptions.list({ page_size: 100 });
    const subs = subsResponse.items || [];

    for (const sub of subs) {
      const subMetadata = sub.metadata as Record<string, string> | undefined;
      const subWorkspaceId = subMetadata?.workspace_id;
      const customerEmail = sub.customer?.email?.toLowerCase();

      const matchesWorkspace =
        workspaceId && subWorkspaceId && subWorkspaceId === workspaceId;
      const matchesEmail =
        userEmail && customerEmail && customerEmail === userEmail.toLowerCase();

      if ((matchesWorkspace || matchesEmail) && sub.status === "active") {
        const resolvedWorkspaceId = workspaceId || subWorkspaceId;
        if (resolvedWorkspaceId) {
          const rawPlan =
            subMetadata?.plan_type ||
            (sub.product_id ? PRODUCT_TO_PLAN[sub.product_id] : null) ||
            "creator_pro";

          const record: SubscriptionRecord = {
            workspace_id: resolvedWorkspaceId,
            plan: normalizePlanName(rawPlan),
            status: "active",
            provider: "dodo",
            provider_subscription_id: sub.subscription_id,
            customer_email: sub.customer?.email,
            next_billing_date: sub.next_billing_date,
            updated_at: new Date().toISOString(),
          };

          await saveSubscription(record, env);
          return record;
        }
      }
    }

    // 2. Also check recent successful payments in Dodo (in case subscription object is propagating)
    const paymentsResponse = await dodo.payments.list({ page_size: 50 });
    const payments = paymentsResponse.items || [];

    for (const payment of payments) {
      const payMetadata = payment.metadata as
        Record<string, string> | undefined;
      const payWorkspaceId = payMetadata?.workspace_id;
      const customerEmail = payment.customer?.email?.toLowerCase();

      const matchesWorkspace =
        workspaceId && payWorkspaceId && payWorkspaceId === workspaceId;
      const matchesEmail =
        userEmail && customerEmail && customerEmail === userEmail.toLowerCase();

      if (
        (matchesWorkspace || matchesEmail) &&
        payment.status === "succeeded"
      ) {
        const resolvedWorkspaceId = workspaceId || payWorkspaceId;
        if (resolvedWorkspaceId) {
          const rawPlan =
            payMetadata?.plan_type ||
            (payment.product_cart?.[0]?.product_id
              ? PRODUCT_TO_PLAN[payment.product_cart[0].product_id]
              : null) ||
            "creator_pro";

          const record: SubscriptionRecord = {
            workspace_id: resolvedWorkspaceId,
            plan: normalizePlanName(rawPlan),
            status: "active",
            provider: "dodo",
            provider_subscription_id: payment.payment_id,
            customer_email: payment.customer?.email,
            updated_at: new Date().toISOString(),
          };

          await saveSubscription(record, env);
          return record;
        }
      }
    }
  } catch (err) {
    console.warn("Dodo direct query notice:", err);
  }

  return null;
}

/**
 * Retrieves the effective subscription for a workspace.
 * First checks fast in-memory/file cache, then Dodo Payments API, then Supabase.
 */
export async function getEffectiveSubscription(
  workspaceId: string,
  userEmail?: string | null,
  env?: Record<string, unknown>,
  authHeader?: string | null,
  forceLiveSync = false,
): Promise<SubscriptionRecord> {
  if (!workspaceId) {
    return {
      workspace_id: "",
      plan: "free",
      status: "inactive",
      provider: "none",
      updated_at: new Date().toISOString(),
    };
  }

  // 1. Check local cache
  const cached = memoryCache.get(workspaceId);
  if (cached && !forceLiveSync && cached.status === "active") {
    return cached;
  }

  // 2. Query live Dodo Payments API
  const dodoRecord = await syncFromDodoPayments(workspaceId, userEmail, env);
  if (dodoRecord && dodoRecord.status === "active") {
    return dodoRecord;
  }

  // 3. Check Supabase DB
  try {
    const supabase = getSupabase(env, authHeader);
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("workspace_id", workspaceId)
      .eq("status", "active")
      .maybeSingle();

    if (sub && sub.plan) {
      const record: SubscriptionRecord = {
        workspace_id,
        plan: normalizePlanName(sub.plan),
        status: (sub.status as SubscriptionRecord["status"]) || "active",
        provider: sub.provider || "supabase",
        provider_subscription_id: sub.provider_subscription_id,
        updated_at: sub.updated_at || new Date().toISOString(),
      };
      memoryCache.set(workspaceId, record);
      saveStorageToFile();
      return record;
    }
  } catch (sbErr) {
    console.warn("Supabase select subscription notice:", sbErr);
  }

  // 4. Return cached or fallback to free
  if (cached) {
    return cached;
  }

  return {
    workspace_id: workspaceId,
    plan: "free",
    status: "inactive",
    provider: "none",
    updated_at: new Date().toISOString(),
  };
}
