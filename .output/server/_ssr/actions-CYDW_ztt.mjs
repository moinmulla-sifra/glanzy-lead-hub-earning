import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { n as ResearchEngine } from "./ssr.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/actions-CYDW_ztt.js
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
	const supabase = createClient(processModule.env["VITE_SUPABASE_URL"] || "", processModule.env["VITE_SUPABASE_ANON_KEY"] || "", { global: { headers: { Authorization: `Bearer ${payload.token}` } } });
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
	const supabase = createClient(processModule.env["VITE_SUPABASE_URL"] || "", processModule.env["VITE_SUPABASE_ANON_KEY"] || "", { global: { headers: { Authorization: `Bearer ${payload.token}` } } });
	const { data: { user } } = await supabase.auth.getUser();
	if (!user) throw new Error("Unauthorized");
	processModule.env["SERVICE_ROLE_KEY"];
	return await ResearchEngine.runAutomatedHourlyJob(supabase);
});
//#endregion
export { startResearchJob_createServerFn_handler, triggerAutomatedResearch_createServerFn_handler };
