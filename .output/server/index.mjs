globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-09-07T06:11:10.494Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-07T06:11:10.494Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/BrandProfileModal-BH9majym.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"41ba-nmpTqBN8m753FxbgGV3SMG4mtCw\"",
		"mtime": "2026-09-07T06:11:09.899Z",
		"size": 16826,
		"path": "../public/assets/BrandProfileModal-BH9majym.js"
	},
	"/assets/QueryClientProvider-W16wr4W7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a0e-g+PilojAccYbCV5QduT5LNno+34\"",
		"mtime": "2026-09-07T06:11:09.900Z",
		"size": 14862,
		"path": "../public/assets/QueryClientProvider-W16wr4W7.js"
	},
	"/assets/ThemeToggle-CYmOblfe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5cd-oOdBAeeZYTXze7VtS6ZZKS+oPAw\"",
		"mtime": "2026-09-07T06:11:09.900Z",
		"size": 1485,
		"path": "../public/assets/ThemeToggle-CYmOblfe.js"
	},
	"/assets/_dashboard-DFm77qNr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2768-StrgsgHbgtu3Ak68kSyxC4+ygM4\"",
		"mtime": "2026-09-07T06:11:09.900Z",
		"size": 10088,
		"path": "../public/assets/_dashboard-DFm77qNr.js"
	},
	"/assets/_dashboard.for-you-BCQ1x_hM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3561-eU0uPnzjZPsNti/aUVh96R96pqQ\"",
		"mtime": "2026-09-07T06:11:09.900Z",
		"size": 13665,
		"path": "../public/assets/_dashboard.for-you-BCQ1x_hM.js"
	},
	"/assets/_dashboard.outreach-CN5LHcO6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a808-1Dt9NNVqYBhu7D8vQYI1h7uqqIY\"",
		"mtime": "2026-09-07T06:11:09.900Z",
		"size": 43016,
		"path": "../public/assets/_dashboard.outreach-CN5LHcO6.js"
	},
	"/assets/_dashboard.profile-hlYOrA20.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"414-N/EhWDt6o/g1SoNTbTZSgxrP1SY\"",
		"mtime": "2026-09-07T06:11:09.900Z",
		"size": 1044,
		"path": "../public/assets/_dashboard.profile-hlYOrA20.js"
	},
	"/assets/_dashboard.saved-DP2Y42Xn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5cd5-eMFOrs0UXG2UgZNjZvqaNJq+pEo\"",
		"mtime": "2026-09-07T06:11:09.900Z",
		"size": 23765,
		"path": "../public/assets/_dashboard.saved-DP2Y42Xn.js"
	},
	"/assets/_dashboard.settings-COT97ioO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"415-zpZmU5Q9tsWsDUlfID9W2ELn3JU\"",
		"mtime": "2026-09-07T06:11:09.900Z",
		"size": 1045,
		"path": "../public/assets/_dashboard.settings-COT97ioO.js"
	},
	"/assets/auth-DWEw2iWA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2984-g6JHsm5F1zO+Bm5Ns2xCFw4S/ow\"",
		"mtime": "2026-09-07T06:11:09.900Z",
		"size": 10628,
		"path": "../public/assets/auth-DWEw2iWA.js"
	},
	"/assets/bookmark-DW2tSGOY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-Hz/8lB4r6SP+49oOwjo9TwH5kJE\"",
		"mtime": "2026-09-07T06:11:09.900Z",
		"size": 230,
		"path": "../public/assets/bookmark-DW2tSGOY.js"
	},
	"/assets/calendar-CZclbofY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"101-+gHrQyG7Z2KuX+dM9giMLSkR6m4\"",
		"mtime": "2026-09-07T06:11:09.900Z",
		"size": 257,
		"path": "../public/assets/calendar-CZclbofY.js"
	},
	"/assets/createLucideIcon-C-so-e7F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4af-d0qudJwEnLLmPOFaysGXRnxa/DE\"",
		"mtime": "2026-09-07T06:11:09.900Z",
		"size": 1199,
		"path": "../public/assets/createLucideIcon-C-so-e7F.js"
	},
	"/assets/jsx-dev-runtime-BN4uJXNV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6515-zghcjQsxeXRjfbtdMV6VcdqA64o\"",
		"mtime": "2026-09-07T06:11:09.900Z",
		"size": 25877,
		"path": "../public/assets/jsx-dev-runtime-BN4uJXNV.js"
	},
	"/assets/link-Dnx_pGxI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a83-ygAlQlX3Qx3D/v4IDClo2WxEGto\"",
		"mtime": "2026-09-07T06:11:09.900Z",
		"size": 27267,
		"path": "../public/assets/link-Dnx_pGxI.js"
	},
	"/assets/save-m3mH321Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e9c-HZRuqAUHxygv9cOr394eB0ONu/0\"",
		"mtime": "2026-09-07T06:11:09.900Z",
		"size": 11932,
		"path": "../public/assets/save-m3mH321Z.js"
	},
	"/assets/search-C_qdBvVP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16b-DuEcdJNre4e9UQTekPr5JSn5H14\"",
		"mtime": "2026-09-07T06:11:09.900Z",
		"size": 363,
		"path": "../public/assets/search-C_qdBvVP.js"
	},
	"/assets/sliders-horizontal-CWqUeiRR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bc-LWw3B+2M82fMDbj7dlLlZg1J81o\"",
		"mtime": "2026-09-07T06:11:09.900Z",
		"size": 1724,
		"path": "../public/assets/sliders-horizontal-CWqUeiRR.js"
	},
	"/assets/sparkles-DnQVlx0k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-aae1Ij2aG5QtbjE3vpyblpXzDCM\"",
		"mtime": "2026-09-07T06:11:09.900Z",
		"size": 494,
		"path": "../public/assets/sparkles-DnQVlx0k.js"
	},
	"/assets/styles-BmPxebE_.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"16aae-jll1v8CcJpCdYI2z4Mp5/+Eu4m4\"",
		"mtime": "2026-09-07T06:11:09.901Z",
		"size": 92846,
		"path": "../public/assets/styles-BmPxebE_.css"
	},
	"/assets/supabase-CRX9Nu9H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33703-wd6Qg2/WWjhe6Z1vKFkqgoypwVw\"",
		"mtime": "2026-09-07T06:11:09.900Z",
		"size": 210691,
		"path": "../public/assets/supabase-CRX9Nu9H.js"
	},
	"/assets/_dashboard.discover-gjok35tI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5879-g+QQKQDByawML+Og4ID73H0jzcg\"",
		"mtime": "2026-09-07T06:11:09.900Z",
		"size": 22649,
		"path": "../public/assets/_dashboard.discover-gjok35tI.js"
	},
	"/assets/index-B6tS1aTb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"83417-wQ7fBPI2rd11vd0tBh6b33Nelvo\"",
		"mtime": "2026-09-07T06:11:09.899Z",
		"size": 537623,
		"path": "../public/assets/index-B6tS1aTb.js"
	},
	"/assets/useRouter-l_j_2ZPr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10a-mJn0UjXYhaRa8jnoevRLr8Vfj6I\"",
		"mtime": "2026-09-07T06:11:09.900Z",
		"size": 266,
		"path": "../public/assets/useRouter-l_j_2ZPr.js"
	},
	"/assets/user-CCuPUL_2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-6w1EvGMXRKzg9waKgTIX5eAk68Y\"",
		"mtime": "2026-09-07T06:11:09.900Z",
		"size": 196,
		"path": "../public/assets/user-CCuPUL_2.js"
	},
	"/assets/x-VktXaVUJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"187-y0J0vFwqUhoJ0e1SvcXLKpiJjFQ\"",
		"mtime": "2026-09-07T06:11:09.900Z",
		"size": 391,
		"path": "../public/assets/x-VktXaVUJ.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_0jRgqU = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_0jRgqU
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
