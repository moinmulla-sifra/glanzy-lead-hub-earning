import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-BCWKuXDT.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/actions-CRa6Zpbw.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var startResearchJob = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("143f660d82fd54263aeaf3f594ec9918033d5a3fb38029a69fca98518c6865cc"));
var triggerAutomatedResearch = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("d8c7bf5b512c56b270695b304148b3af6cbdff19912eead426eb87dfe7084810"));
//#endregion
export { triggerAutomatedResearch as n, startResearchJob as t };
