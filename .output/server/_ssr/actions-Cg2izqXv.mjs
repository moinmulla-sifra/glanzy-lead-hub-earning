import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { n as ResearchEngine } from "./ssr.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/actions-Cg2izqXv.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var startResearchJob_createServerFn_handler = createServerRpc({
	id: "143f660d82fd54263aeaf3f594ec9918033d5a3fb38029a69fca98518c6865cc",
	name: "startResearchJob",
	filename: "src/lib/research/actions.ts"
}, (opts) => startResearchJob.__executeServer(opts));
var startResearchJob = createServerFn({ method: "POST" }).validator((d) => d).handler(startResearchJob_createServerFn_handler, async ({ data: payload }) => {
	const supabase = createClient(processModule.env["VITE_SUPABASE_URL"] || {
		"BASE_URL": "/",
		"DEV": true,
		"MODE": "production",
		"PROD": false,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkeGp4cnRkeWxudWh2bW1jdmVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2OTgxMjUsImV4cCI6MjEwNDI3NDEyNX0.C7mUyroSPQ7Vcpepiqv-jzSd-zhTB4fHuFrMX23l3HY",
		"VITE_SUPABASE_URL": "https://ldxjxrtdylnuhvmmcveg.supabase.co"
	}["VITE_SUPABASE_URL"] || "https://placeholder.supabase.co", processModule.env["VITE_SUPABASE_ANON_KEY"] || {
		"BASE_URL": "/",
		"DEV": true,
		"MODE": "production",
		"PROD": false,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkeGp4cnRkeWxudWh2bW1jdmVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2OTgxMjUsImV4cCI6MjEwNDI3NDEyNX0.C7mUyroSPQ7Vcpepiqv-jzSd-zhTB4fHuFrMX23l3HY",
		"VITE_SUPABASE_URL": "https://ldxjxrtdylnuhvmmcveg.supabase.co"
	}["VITE_SUPABASE_ANON_KEY"] || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder", { global: { headers: { Authorization: `Bearer ${payload.token}` } } });
	const job = await ResearchEngine.createJob(supabase, payload.workspaceId, payload.userId, payload.type, payload.query, payload.provider);
	ResearchEngine.processJob(supabase, job.id).catch(console.error);
	return job;
});
var triggerAutomatedResearch_createServerFn_handler = createServerRpc({
	id: "d8c7bf5b512c56b270695b304148b3af6cbdff19912eead426eb87dfe7084810",
	name: "triggerAutomatedResearch",
	filename: "src/lib/research/actions.ts"
}, (opts) => triggerAutomatedResearch.__executeServer(opts));
var triggerAutomatedResearch = createServerFn({ method: "POST" }).validator((d) => d).handler(triggerAutomatedResearch_createServerFn_handler, async ({ data: payload }) => {
	const supabase = createClient(processModule.env["VITE_SUPABASE_URL"] || {
		"BASE_URL": "/",
		"DEV": true,
		"MODE": "production",
		"PROD": false,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkeGp4cnRkeWxudWh2bW1jdmVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2OTgxMjUsImV4cCI6MjEwNDI3NDEyNX0.C7mUyroSPQ7Vcpepiqv-jzSd-zhTB4fHuFrMX23l3HY",
		"VITE_SUPABASE_URL": "https://ldxjxrtdylnuhvmmcveg.supabase.co"
	}["VITE_SUPABASE_URL"] || "https://placeholder.supabase.co", processModule.env["VITE_SUPABASE_ANON_KEY"] || {
		"BASE_URL": "/",
		"DEV": true,
		"MODE": "production",
		"PROD": false,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkeGp4cnRkeWxudWh2bW1jdmVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2OTgxMjUsImV4cCI6MjEwNDI3NDEyNX0.C7mUyroSPQ7Vcpepiqv-jzSd-zhTB4fHuFrMX23l3HY",
		"VITE_SUPABASE_URL": "https://ldxjxrtdylnuhvmmcveg.supabase.co"
	}["VITE_SUPABASE_ANON_KEY"] || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder", { global: { headers: { Authorization: `Bearer ${payload.token}` } } });
	const { data: { user } } = await supabase.auth.getUser();
	if (!user) throw new Error("Unauthorized");
	const serviceRoleKey = processModule.env["SERVICE_ROLE_KEY"];
	const elevatedSupabase = serviceRoleKey ? createClient(processModule.env["VITE_SUPABASE_URL"] || {
		"BASE_URL": "/",
		"DEV": true,
		"MODE": "production",
		"PROD": false,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkeGp4cnRkeWxudWh2bW1jdmVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2OTgxMjUsImV4cCI6MjEwNDI3NDEyNX0.C7mUyroSPQ7Vcpepiqv-jzSd-zhTB4fHuFrMX23l3HY",
		"VITE_SUPABASE_URL": "https://ldxjxrtdylnuhvmmcveg.supabase.co"
	}["VITE_SUPABASE_URL"] || "https://placeholder.supabase.co", serviceRoleKey) : supabase;
	return await ResearchEngine.runAutomatedHourlyJob(elevatedSupabase);
});
//#endregion
export { startResearchJob_createServerFn_handler, triggerAutomatedResearch_createServerFn_handler };
