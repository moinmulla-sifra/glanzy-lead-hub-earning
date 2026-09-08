import { t as nodeCron } from "../_libs/node-cron+unenv.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/index.js
var TinyFishProvider = class {
	name = "tinyfish";
	async discoverBrands(query) {
		if ((processModule.env["TINYFISH_API_KEY"] || "DEMO") === "DEMO") {
			const results = [];
			for (let i = 0; i < 6; i++) results.push({
				company_name: "Glow & Co " + Math.floor(Math.random() * 1e4),
				domain: "glowandco" + Math.floor(Math.random() * 1e4) + ".demo",
				website: "https://glowandco.demo",
				industry: query.industry || "Beauty",
				country: query.country || "USA",
				company_stage: "Seed",
				recent_funding: "$2M Seed round",
				recent_launch: "Launched new serum",
				marketing_activity: "Active on TikTok",
				existing_creator_activity: "Working with 10+ micro-influencers",
				contact_email: "hello@glowandco.demo",
				contact_person: "Jane Doe",
				contact_role: "CMO",
				linkedin: "https://linkedin.com/company/glowandco",
				evidence: [{
					field_name: "recent_funding",
					source_url: "https://news.ycombinator.demo",
					source_type: "news",
					confidence: "high",
					data: "Seed round announced"
				}, {
					field_name: "contact_email",
					source_url: "https://glowandco.demo/contact",
					source_type: "website",
					confidence: "medium",
					data: "Found in footer"
				}]
			});
			return {
				results,
				raw: { source: "TinyFish Demo" }
			};
		}
		return {
			results: [],
			raw: { status: "unimplemented_real_fetch" }
		};
	}
	async researchBrand(query) {
		return this.discoverBrands(query);
	}
};
var ApifyProvider = class {
	name = "apify";
	async discoverBrands(query) {
		if ((processModule.env["APIFY_API_TOKEN"] || "DEMO") === "DEMO") return {
			results: [{
				company_name: "Fresh Foods",
				domain: "freshfoods.demo",
				website: "https://www.freshfoods.demo",
				industry: "Food & Beverage",
				country: "UK",
				company_stage: "Series A",
				recent_funding: null,
				recent_launch: null,
				marketing_activity: "Instagram ads active",
				existing_creator_activity: null,
				contact_email: "press@freshfoods.demo",
				contact_person: null,
				contact_role: null,
				linkedin: "https://linkedin.com/company/freshfoods-demo",
				evidence: [{
					field_name: "marketing_activity",
					source_url: "https://instagram.com/freshfoods",
					source_type: "social",
					confidence: "high",
					data: "Ads library"
				}]
			}],
			raw: { source: "Apify Demo" }
		};
		return {
			results: [],
			raw: { status: "unimplemented_real_fetch" }
		};
	}
	async researchBrand(query) {
		return this.discoverBrands(query);
	}
};
var providers = {
	tinyfish: new TinyFishProvider(),
	apify: new ApifyProvider()
};
var ResearchEngine = class {
	static async createJob(supabase, workspaceId, userId, type, query, providerName = "tinyfish") {
		const { data, error } = await supabase.from("research_jobs").insert({
			workspace_id: workspaceId,
			requested_by: userId,
			research_type: type,
			query,
			provider: providerName,
			status: "queued"
		}).select().single();
		if (error) throw error;
		return data;
	}
	static async processJob(supabase, jobId) {
		await supabase.from("research_jobs").update({
			status: "running",
			started_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", jobId);
		const { data: job } = await supabase.from("research_jobs").select("*").eq("id", jobId).single();
		if (!job) return;
		const provider = providers[job.provider || "tinyfish"] || providers["tinyfish"];
		if (!provider) throw new Error("Provider not found");
		const { data: run } = await supabase.from("research_runs").insert({
			research_job_id: job.id,
			provider: provider.name,
			status: "running"
		}).select().single();
		try {
			const { results, raw } = await provider.discoverBrands(job.query);
			await supabase.from("research_runs").update({
				raw_results: raw,
				status: "completed",
				completed_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", run.id);
			let newBrandsCount = 0;
			for (const result of results) {
				await this.processResult(supabase, result, run.id);
				newBrandsCount++;
			}
			await supabase.from("research_jobs").update({
				status: "completed",
				completed_at: (/* @__PURE__ */ new Date()).toISOString(),
				result_count: newBrandsCount
			}).eq("id", job.id);
		} catch (err) {
			await supabase.from("research_runs").update({
				status: "failed",
				error: err.message,
				completed_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", run.id);
			await supabase.from("research_jobs").update({
				status: "failed",
				error: err.message,
				completed_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", job.id);
		}
	}
	static async processResult(supabase, result, runId) {
		if (!result.domain && !result.company_name) return;
		let query = supabase.from("brands").select("id, lead_score");
		if (result.domain) query = query.eq("domain", result.domain);
		else query = query.eq("company_name", result.company_name);
		const { data: existingBrands } = await query;
		let brandId;
		const leadScore = this.calculateLeadScore(result);
		if (existingBrands && existingBrands.length > 0) {
			brandId = existingBrands[0]?.id || "";
			await supabase.from("brands").update({
				last_researched_at: (/* @__PURE__ */ new Date()).toISOString(),
				research_status: "verified",
				lead_score: leadScore,
				data_confidence: "high"
			}).eq("id", brandId);
		} else {
			const { data: newBrand, error } = await supabase.from("brands").insert({
				company_name: result.company_name,
				normalized_name: (result.company_name || "").toLowerCase().replace(/[^a-z0-9]/g, ""),
				domain: result.domain,
				website: result.website,
				industry: result.industry,
				country: result.country,
				company_stage: result.company_stage,
				recent_funding: result.recent_funding,
				recent_launch: result.recent_launch,
				marketing_activity: result.marketing_activity,
				existing_creator_activity: result.existing_creator_activity,
				email: result.contact_email,
				contact_person: result.contact_person,
				contact_role: result.contact_role,
				linkedin: result.linkedin,
				lead_score: leadScore,
				influencer_fit_score: 75,
				last_researched_at: (/* @__PURE__ */ new Date()).toISOString(),
				last_verified_at: (/* @__PURE__ */ new Date()).toISOString(),
				research_status: "candidate",
				data_confidence: "high"
			}).select().single();
			if (error) {
				console.error("Failed to insert brand", error);
				return;
			}
			brandId = newBrand.id;
		}
		for (const ev of result.evidence) await supabase.from("brand_evidence").insert({
			brand_id: brandId,
			research_run_id: runId,
			field_name: ev.field_name,
			source_url: ev.source_url,
			source_type: ev.source_type,
			confidence: ev.confidence,
			evidence: ev.data
		});
	}
	static async runAutomatedHourlyJob(supabase) {
		console.log("Starting automated hourly research run");
		const { data: config } = await supabase.from("app_config").select("value").eq("key", "research_scheduler").single();
		if (config?.value?.enabled === false) {
			console.log("Automated research is disabled.");
			return { status: "disabled" };
		}
		const targetPerRun = config?.value?.target_per_run || 6;
		const { data: activeJob } = await supabase.from("research_jobs").select("id").eq("research_type", "automated_hourly").in("status", ["queued", "running"]).limit(1);
		if (activeJob && activeJob.length > 0) {
			const { data: jobDetails } = await supabase.from("research_jobs").select("started_at, created_at").eq("id", activeJob[0]?.id).single();
			if (jobDetails) {
				const startTime = new Date(jobDetails.started_at || jobDetails.created_at).getTime();
				if (Date.now() - startTime > 72e5) {
					console.log("Found stale locked job, marking failed to recover...");
					await supabase.from("research_jobs").update({
						status: "failed",
						error: "Stale lock timeout"
					}).eq("id", activeJob[0]?.id);
				} else {
					console.log("An automated job is already running or queued.");
					return { status: "locked" };
				}
			}
		}
		if (activeJob && activeJob.length > 0) {
			console.log("An automated job is already running or queued.");
			return { status: "locked" };
		}
		const { data: queueItem } = await supabase.from("research_queue").select("*").eq("enabled", true).order("next_run", { ascending: true }).limit(1).single();
		if (!queueItem) {
			console.log("No active items in research queue.");
			return { status: "empty_queue" };
		}
		await supabase.from("research_queue").update({
			last_run: (/* @__PURE__ */ new Date()).toISOString(),
			next_run: new Date(Date.now() + 864e5).toISOString()
		}).eq("id", queueItem.id);
		const { data: job } = await supabase.from("research_jobs").insert({
			research_type: "automated_hourly",
			query: queueItem.research_query,
			provider: "tinyfish",
			status: "running",
			started_at: (/* @__PURE__ */ new Date()).toISOString()
		}).select().single();
		const { data: run } = await supabase.from("research_runs").insert({
			research_job_id: job.id,
			provider: "tinyfish",
			status: "running"
		}).select().single();
		try {
			const provider = providers["tinyfish"];
			if (!provider) throw new Error("Provider not found");
			const { results, raw } = await provider.discoverBrands(queueItem.research_query);
			await supabase.from("research_runs").update({
				raw_results: raw,
				status: "completed",
				completed_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", run.id);
			let newBrandsCount = 0;
			let duplicates = 0;
			let rejected = 0;
			for (const result of results) {
				if (newBrandsCount >= targetPerRun) break;
				if (!result.domain && !result.company_name) {
					rejected++;
					continue;
				}
				let duplicateQuery = supabase.from("brands").select("id");
				if (result.domain) duplicateQuery = duplicateQuery.eq("domain", result.domain);
				else duplicateQuery = duplicateQuery.eq("company_name", result.company_name);
				const { data: existingBrands } = await duplicateQuery;
				if (existingBrands && existingBrands.length > 0) {
					duplicates++;
					continue;
				}
				await this.processResult(supabase, result, run.id);
				newBrandsCount++;
			}
			await supabase.from("research_jobs").update({
				status: "completed",
				completed_at: (/* @__PURE__ */ new Date()).toISOString(),
				result_count: newBrandsCount
			}).eq("id", job.id);
			console.log(`Automated run complete. Found ${newBrandsCount} new leads (Target: ${targetPerRun}, Duplicates: ${duplicates}, Rejected: ${rejected})`);
			return {
				status: "completed",
				newLeads: newBrandsCount,
				duplicates,
				rejected
			};
		} catch (err) {
			console.error("Automated run failed:", err);
			await supabase.from("research_runs").update({
				status: "failed",
				error: err.message,
				completed_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", run.id);
			await supabase.from("research_jobs").update({
				status: "failed",
				error: err.message,
				completed_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", job.id);
			return {
				status: "failed",
				error: err.message
			};
		}
	}
	static calculateLeadScore(result) {
		let score = 50;
		if (result.recent_funding) score += 20;
		if (result.recent_launch) score += 15;
		if (result.marketing_activity) score += 10;
		if (result.existing_creator_activity) score += 10;
		if (result.contact_email) score += 5;
		return Math.min(score, 100);
	}
};
var isSetup = false;
function setupCronJobs() {
	if (isSetup) return;
	isSetup = true;
	console.log("Setting up automated hourly research engine scheduler using node-cron...");
	nodeCron.schedule("0 * * * *", async () => {
		try {
			console.log("Automated hourly node-cron scheduler triggered...");
			const supabaseUrl = processModule.env["VITE_SUPABASE_URL"] || "";
			const supabaseKey = processModule.env["SERVICE_ROLE_KEY"] || processModule.env["VITE_SUPABASE_ANON_KEY"] || "";
			if (!supabaseUrl || !supabaseKey) {
				console.error("Missing Supabase credentials for automated job");
				return;
			}
			const supabase = createClient(supabaseUrl, supabaseKey);
			await ResearchEngine.runAutomatedHourlyJob(supabase);
		} catch (err) {
			console.error("Error in automated hourly scheduler:", err);
		}
	});
}
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
var serverEntryPromise;
async function getServerEntry() {
	if (!serverEntryPromise) serverEntryPromise = import("./server-C7O7JL5l.mjs").then((m) => m.default ?? m);
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
		return payload.unhandled === true && payload.message === "HTTPError";
	} catch {
		return false;
	}
}
var server_default = { async fetch(request, env, ctx) {
	try {
		return await normalizeCatastrophicSsrResponse(await (await getServerEntry()).fetch(request, env, ctx));
	} catch (error) {
		console.error(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
} };
setupCronJobs();
//#endregion
export { server_default as default, ResearchEngine as n, renderErrorPage as t };
