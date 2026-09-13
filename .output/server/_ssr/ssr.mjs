import { n as __exportAll } from "../_runtime.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { t as DodoPayments } from "../_libs/dodopayments+[...].mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/index.js
var ssr_exports = /* @__PURE__ */ __exportAll({
	default: () => server_default,
	n: () => renderErrorPage,
	t: () => PLANS
});
var lastCapturedError;
var TTL_MS = 5e3;
function record(error) {
	lastCapturedError = {
		error,
		at: Date.now()
	};
}
var CAUSE_DEPTH_LIMIT = 5;
var DESCRIPTION_LENGTH_LIMIT = 8e3;
function describeError(error) {
	const parts = [];
	let current = error;
	for (let depth = 0; depth < CAUSE_DEPTH_LIMIT && current != null; depth++) {
		if (!(current instanceof Error)) {
			parts.push(typeof current === "string" ? current : safeStringify(current));
			break;
		}
		const label = depth === 0 ? "" : "caused by: ";
		const status = describeStatus(current);
		parts.push(`${label}${current.stack ?? `${current.name}: ${current.message}`}${status}`);
		current = current.cause;
	}
	return parts.join("\n").slice(0, DESCRIPTION_LENGTH_LIMIT);
}
function describeStatus(error) {
	const { status, statusCode } = error;
	const value = status ?? statusCode;
	return typeof value === "number" ? ` (status ${value})` : "";
}
function safeStringify(value) {
	try {
		return JSON.stringify(value) ?? String(value);
	} catch {
		return String(value);
	}
}
function isErrorLike(value) {
	return value instanceof Error;
}
var originalConsoleError = console.error.bind(console);
console.error = (...args) => {
	originalConsoleError(...args.map((arg) => {
		if (!isErrorLike(arg)) return arg;
		record(arg);
		return describeError(arg);
	}));
};
if (typeof globalThis.addEventListener === "function") {
	globalThis.addEventListener("error", (event) => record(event.error ?? event));
	globalThis.addEventListener("unhandledrejection", (event) => record(event.reason));
}
function consumeLastCapturedError() {
	if (!lastCapturedError) return void 0;
	if (Date.now() - lastCapturedError.at > TTL_MS) {
		lastCapturedError = void 0;
		return;
	}
	const { error } = lastCapturedError;
	lastCapturedError = void 0;
	return error;
}
function renderErrorPage() {
	return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
var dodo = new DodoPayments({
	bearerToken: processModule.env.DODO_PAYMENTS_API_KEY || "test_sk_placeholder",
	environment: "test_mode"
});
var getProductId = (planId, interval) => {
	if (planId === "creator_plus" && interval === "monthly") return processModule.env.DODO_CREATOR_PLUS_MONTHLY_PRODUCT_ID;
	if (planId === "creator_plus" && interval === "yearly") return processModule.env.DODO_CREATOR_PLUS_YEARLY_PRODUCT_ID;
	if (planId === "creator_pro" && interval === "monthly") return processModule.env.DODO_CREATOR_PRO_MONTHLY_PRODUCT_ID;
	if (planId === "creator_pro" && interval === "yearly") return processModule.env.DODO_CREATOR_PRO_YEARLY_PRODUCT_ID;
	if (planId === "agency_plus" && interval === "monthly") return processModule.env.DODO_AGENCY_PLUS_MONTHLY_PRODUCT_ID;
	if (planId === "agency_plus" && interval === "yearly") return processModule.env.DODO_AGENCY_PLUS_YEARLY_PRODUCT_ID;
	if (planId === "agency_pro" && interval === "monthly") return processModule.env.DODO_AGENCY_PRO_MONTHLY_PRODUCT_ID;
	if (planId === "agency_pro" && interval === "yearly") return processModule.env.DODO_AGENCY_PRO_YEARLY_PRODUCT_ID;
	return processModule.env.DODO_TEST_PRODUCT_ID;
};
var handleCheckout = async (request) => {
	try {
		const { planId, workspaceId, interval, returnUrl } = await request.json();
		const productId = getProductId(planId, interval);
		if (!productId) return new Response(JSON.stringify({ error: `Missing Dodo Product ID configuration for plan: ${planId} (${interval}). Please configure DODO_${planId.toUpperCase()}_${interval.toUpperCase()}_PRODUCT_ID in test environment variables.` }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const session = await dodo.checkoutSessions.create({
			billing_address: { country: "IN" },
			billing_currency: "INR",
			customer: {
				name: "Workspace " + workspaceId,
				email: "customer@branzly.com"
			},
			product_cart: [{
				product_id: productId,
				quantity: 1
			}],
			return_url: returnUrl || `${request.headers.get("origin") || new URL(request.url).origin || "http://localhost:3000"}/settings`,
			metadata: {
				workspace_id: workspaceId,
				plan_type: planId
			}
		});
		return new Response(JSON.stringify({ url: session.checkout_url }), { headers: { "Content-Type": "application/json" } });
	} catch (err) {
		console.error("Checkout Error:", err);
		return new Response(JSON.stringify({ error: err.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var PLANS = {
	free: {
		name: "Free",
		type: "free",
		accountType: "all",
		priceMonthly: 0,
		priceYearly: 0,
		limits: {
			daily_brand_leads: 25,
			daily_brand_searches: 10,
			saved_brand_limit: 5,
			monthly_contact_reveals: 3,
			outreach_record_limit: 5,
			team_seats: 1
		},
		features: {
			basic_filters: true,
			advanced_filters: false,
			limited_brand_intelligence: true,
			full_brand_intelligence: false,
			product_intelligence: false,
			funding_intelligence: false,
			marketing_intelligence: false,
			creator_intelligence: false,
			outreach_tracker: "basic",
			csv_export: "none",
			new_brand_alerts: false,
			notification_priority: "none",
			shared_workspace_crm: false,
			shared_outreach: false,
			whitelabel_reporting: false,
			dedicated_account_manager: false,
			priority_data_access: false,
			ads_enabled: true,
			support_level: "standard"
		}
	},
	creator_plus: {
		name: "Creators Plus",
		type: "creator_plus",
		accountType: "creator",
		priceMonthly: 499,
		priceYearly: 4999,
		limits: {
			daily_brand_leads: 500,
			daily_brand_searches: 100,
			saved_brand_limit: 50,
			monthly_contact_reveals: 50,
			outreach_record_limit: 100,
			team_seats: 1
		},
		features: {
			basic_filters: true,
			advanced_filters: false,
			limited_brand_intelligence: false,
			full_brand_intelligence: true,
			product_intelligence: false,
			funding_intelligence: false,
			marketing_intelligence: false,
			creator_intelligence: false,
			outreach_tracker: "basic",
			csv_export: "none",
			new_brand_alerts: false,
			notification_priority: "none",
			shared_workspace_crm: false,
			shared_outreach: false,
			whitelabel_reporting: false,
			dedicated_account_manager: false,
			priority_data_access: false,
			ads_enabled: false,
			support_level: "standard"
		}
	},
	creator_pro: {
		name: "Creators Pro",
		type: "creator_pro",
		accountType: "creator",
		priceMonthly: 999,
		priceYearly: 9999,
		limits: {
			daily_brand_leads: "unlimited",
			daily_brand_searches: "unlimited",
			saved_brand_limit: "unlimited",
			monthly_contact_reveals: 500,
			outreach_record_limit: "unlimited",
			team_seats: 1
		},
		features: {
			basic_filters: true,
			advanced_filters: true,
			limited_brand_intelligence: false,
			full_brand_intelligence: true,
			product_intelligence: true,
			funding_intelligence: true,
			marketing_intelligence: true,
			creator_intelligence: true,
			outreach_tracker: "full",
			csv_export: "standard",
			new_brand_alerts: true,
			notification_priority: "standard",
			shared_workspace_crm: false,
			shared_outreach: false,
			whitelabel_reporting: false,
			dedicated_account_manager: false,
			priority_data_access: false,
			ads_enabled: false,
			support_level: "priority"
		}
	},
	agency_plus: {
		name: "Agency Plus",
		type: "agency_plus",
		accountType: "agency",
		priceMonthly: 2499,
		priceYearly: 24999,
		limits: {
			daily_brand_leads: "unlimited",
			daily_brand_searches: "unlimited",
			saved_brand_limit: "unlimited",
			monthly_contact_reveals: 1e3,
			outreach_record_limit: "unlimited",
			team_seats: 3
		},
		features: {
			basic_filters: true,
			advanced_filters: true,
			limited_brand_intelligence: false,
			full_brand_intelligence: true,
			product_intelligence: true,
			funding_intelligence: true,
			marketing_intelligence: true,
			creator_intelligence: true,
			outreach_tracker: "full",
			csv_export: "standard",
			new_brand_alerts: true,
			notification_priority: "standard",
			shared_workspace_crm: true,
			shared_outreach: true,
			whitelabel_reporting: false,
			dedicated_account_manager: false,
			priority_data_access: false,
			ads_enabled: false,
			support_level: "standard"
		}
	},
	agency_pro: {
		name: "Agency Pro",
		type: "agency_pro",
		accountType: "agency",
		priceMonthly: 4999,
		priceYearly: 49999,
		limits: {
			daily_brand_leads: "unlimited",
			daily_brand_searches: "unlimited",
			saved_brand_limit: "unlimited",
			monthly_contact_reveals: 5e3,
			outreach_record_limit: "unlimited",
			team_seats: 10
		},
		features: {
			basic_filters: true,
			advanced_filters: true,
			limited_brand_intelligence: false,
			full_brand_intelligence: true,
			product_intelligence: true,
			funding_intelligence: true,
			marketing_intelligence: true,
			creator_intelligence: true,
			outreach_tracker: "full",
			csv_export: "custom",
			new_brand_alerts: true,
			notification_priority: "priority",
			shared_workspace_crm: true,
			shared_outreach: true,
			whitelabel_reporting: true,
			dedicated_account_manager: true,
			priority_data_access: true,
			ads_enabled: false,
			support_level: "priority"
		}
	}
};
var supabase$1 = createClient(processModule.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co", processModule.env.VITE_SUPABASE_SERVICE_ROLE_KEY || processModule.env.VITE_SUPABASE_ANON_KEY || "placeholder");
var handleDiscover = async (request) => {
	try {
		const body = await request.json();
		const token = request.headers.get("Authorization")?.replace("Bearer ", "");
		if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
			headers: { "Content-Type": "application/json" }
		});
		const { data: { user } } = await supabase$1.auth.getUser(token);
		if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
			headers: { "Content-Type": "application/json" }
		});
		const { workspaceId, pageParam = 0, pageSize = 12, search, filters, sortOption } = body;
		const { data: sub } = await supabase$1.from("subscriptions").select("plan").eq("workspace_id", workspaceId).eq("status", "active").maybeSingle();
		let plan = sub?.plan || "free";
		if (plan === "pro") plan = "creator_pro";
		if (plan === "agency") plan = "agency_pro";
		if (!PLANS[plan]) plan = "free";
		const planConfig = PLANS[plan];
		const now = /* @__PURE__ */ new Date();
		const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
		const { data: usage } = await supabase$1.from("usage").select("*").eq("workspace_id", workspaceId).gte("period_start", startOfDay).limit(1).maybeSingle();
		let searches = usage?.searches || 0;
		const leads = usage?.brand_views || 0;
		if (pageParam === 0 && search) {
			if (planConfig.limits.daily_brand_searches !== "unlimited" && searches >= planConfig.limits.daily_brand_searches) return new Response(JSON.stringify({ error: "Daily search limit reached" }), {
				status: 403,
				headers: { "Content-Type": "application/json" }
			});
			searches++;
		}
		if (planConfig.limits.daily_brand_leads !== "unlimited" && leads >= planConfig.limits.daily_brand_leads) return new Response(JSON.stringify({ error: "Daily lead limit reached" }), {
			status: 403,
			headers: { "Content-Type": "application/json" }
		});
		if (!usage) {
			const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).toISOString();
			await supabase$1.from("usage").insert({
				workspace_id: workspaceId,
				period_start: startOfDay,
				period_end: endOfDay,
				searches: search && pageParam === 0 ? 1 : 0,
				brand_views: pageSize
			});
		} else await supabase$1.from("usage").update({
			searches,
			brand_views: leads + pageSize
		}).eq("id", usage.id);
		let q = supabase$1.from("brands").select("*", { count: "exact" });
		if (search) q = q.or(`company_name.ilike.%${search}%,industry.ilike.%${search}%,country.ilike.%${search}%`);
		if (filters?.industry) q = q.eq("industry", filters.industry);
		if (filters?.country) q = q.eq("country", filters.country);
		if (planConfig.features.advanced_filters) {
			if (filters?.company_stage) q = q.eq("company_stage", filters.company_stage);
		}
		if (sortOption === "score") q = q.order("lead_score", { ascending: false });
		else if (sortOption === "recent") q = q.order("created_at", { ascending: false });
		else q = q.order("company_name", { ascending: true });
		q = q.range(pageParam * pageSize, (pageParam + 1) * pageSize - 1);
		const { data: brands, count, error } = await q;
		if (error) return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
		const maskedBrands = brands?.map((brand) => {
			if (!planConfig.features.full_brand_intelligence) return {
				...brand,
				product_description: planConfig.features.product_intelligence ? brand.product_description : "Upgrade to unlock product intelligence",
				recent_funding: planConfig.features.funding_intelligence ? brand.recent_funding : "Upgrade to unlock funding intelligence",
				marketing_activity: planConfig.features.marketing_intelligence ? brand.marketing_activity : "Upgrade to unlock marketing intelligence",
				creator_signals: planConfig.features.creator_intelligence ? brand.creator_signals : null
			};
			return brand;
		});
		return new Response(JSON.stringify({
			brands: maskedBrands,
			count,
			nextPage: (pageParam + 1) * pageSize < (count || 0) ? pageParam + 1 : void 0
		}), { headers: { "Content-Type": "application/json" } });
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
new DodoPayments({
	bearerToken: processModule.env.DODO_PAYMENTS_API_KEY || "test_sk_placeholder",
	environment: "test_mode"
});
var supabase = createClient(processModule.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co", processModule.env.VITE_SUPABASE_SERVICE_ROLE_KEY || processModule.env.VITE_SUPABASE_ANON_KEY || "placeholder");
var handleDodoWebhook = async (request) => {
	const payload = await request.text();
	const signature = request.headers.get("webhook-signature");
	if (!payload || !signature) return new Response(JSON.stringify({ message: "Missing payload or signature" }), {
		status: 400,
		headers: { "Content-Type": "application/json" }
	});
	try {
		const parsed = JSON.parse(payload);
		const { data: existingEvent } = await supabase.from("webhook_events").select("id").eq("event_id", parsed.event_id).maybeSingle();
		if (existingEvent) return new Response(JSON.stringify({
			received: true,
			message: "Duplicate event ignored"
		}), { headers: { "Content-Type": "application/json" } });
		await supabase.from("webhook_events").insert({
			event_id: parsed.event_id,
			event_type: parsed.event,
			payload: parsed
		}).select("id").maybeSingle();
		if (parsed.data && parsed.data.metadata && parsed.data.metadata.workspace_id) {
			const workspaceId = parsed.data.metadata.workspace_id;
			const planType = parsed.data.metadata.plan_type;
			const eventType = parsed.event;
			if (eventType === "subscription.active" || eventType === "subscription.renewed") await supabase.from("subscriptions").upsert({
				workspace_id: workspaceId,
				plan: planType,
				status: "active",
				provider: "dodo",
				provider_subscription_id: parsed.data.subscription_id || parsed.data.payment_id,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}, { onConflict: "workspace_id" });
			else if (eventType === "subscription.updated") await supabase.from("subscriptions").upsert({
				workspace_id: workspaceId,
				plan: planType,
				status: parsed.data.status === "active" ? "active" : "on_hold",
				provider: "dodo",
				provider_subscription_id: parsed.data.subscription_id,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}, { onConflict: "workspace_id" });
			else if (eventType === "subscription.on_hold") await supabase.from("subscriptions").update({
				status: "on_hold",
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("workspace_id", workspaceId);
			else if (eventType === "subscription.canceled" || eventType === "subscription.expired" || eventType === "subscription.failed") await supabase.from("subscriptions").update({
				status: eventType === "subscription.failed" ? "failed" : "canceled",
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("workspace_id", workspaceId);
		}
		return new Response(JSON.stringify({ received: true }), { headers: { "Content-Type": "application/json" } });
	} catch (err) {
		console.error("Webhook Error:", err);
		return new Response(JSON.stringify({ message: err.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var serverEntryPromise;
async function getServerEntry() {
	if (!serverEntryPromise) serverEntryPromise = import("./server-CGEn3et5.mjs").then((m) => m.default ?? m);
	return serverEntryPromise;
}
async function normalizeCatastrophicSsrResponse(response) {
	if (response.status < 500) return response;
	if (!(response.headers.get("content-type") ?? "").includes("application/json")) return response;
	const body = await response.clone().text();
	if (!isH3SwallowedErrorBody(body)) return response;
	console.error(consumeLastCapturedError() ?? /* @__PURE__ */ new Error(`h3 swallowed SSR error: ${body}`));
	return new Response(renderErrorPage(), {
		status: 500,
		headers: { "content-type": "text/html; charset=utf-8" }
	});
}
function isH3SwallowedErrorBody(body) {
	try {
		const payload = JSON.parse(body);
		return payload.unhandled === true && (payload.message === "HTTPError" || payload.error === true);
	} catch {
		return false;
	}
}
var server_default = { async fetch(request, env, ctx) {
	try {
		const url = new URL(request.url);
		if (url.pathname === "/api/checkout" && request.method === "POST") return await handleCheckout(request);
		if (url.pathname === "/api/brands/discover" && request.method === "POST") return await handleDiscover(request);
		if (url.pathname === "/api/webhook/dodo" && request.method === "POST") return await handleDodoWebhook(request);
		if (url.pathname === "/api/cron") return new Response(JSON.stringify({ status: "Cron not fully connected to backend yet" }), { headers: { "Content-Type": "application/json" } });
		return await normalizeCatastrophicSsrResponse(await (await getServerEntry()).fetch(request, env, ctx));
	} catch (error) {
		console.error(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
} };
//#endregion
export { renderErrorPage as n, ssr_exports as r, PLANS as t };
