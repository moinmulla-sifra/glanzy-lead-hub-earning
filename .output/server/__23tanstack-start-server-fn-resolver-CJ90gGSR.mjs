//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-CJ90gGSR.js
var manifest = {
	"143f660d82fd54263aeaf3f594ec9918033d5a3fb38029a69fca98518c6865cc": {
		functionName: "startResearchJob_createServerFn_handler",
		importer: () => import("./_ssr/actions-Cg2izqXv.mjs")
	},
	"d8c7bf5b512c56b270695b304148b3af6cbdff19912eead426eb87dfe7084810": {
		functionName: "triggerAutomatedResearch_createServerFn_handler",
		importer: () => import("./_ssr/actions-Cg2izqXv.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
