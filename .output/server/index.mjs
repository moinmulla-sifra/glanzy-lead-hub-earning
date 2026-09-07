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
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-07T15:17:33.250Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/BrandProfileModal-CqWTnwwg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"40e9-eq+GH/oxbk+CirV/YztFd5Iqqs4\"",
		"mtime": "2026-09-07T15:17:32.416Z",
		"size": 16617,
		"path": "../public/assets/BrandProfileModal-CqWTnwwg.js"
	},
	"/assets/Match-CHFyh5_7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d544-GT4/nMe8N9oQKUpGVo60uO4mpjQ\"",
		"mtime": "2026-09-07T15:17:32.416Z",
		"size": 54596,
		"path": "../public/assets/Match-CHFyh5_7.js"
	},
	"/assets/_dashboard.dashboard-DUdLDsFo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f07-vGjFJbSb0G+IMRZx//pIc37l1P0\"",
		"mtime": "2026-09-07T15:17:32.416Z",
		"size": 7943,
		"path": "../public/assets/_dashboard.dashboard-DUdLDsFo.js"
	},
	"/assets/_dashboard.discover-CWtJzci9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"62a6-p9Lm75DIGTKxdKxbH29Azx72JWA\"",
		"mtime": "2026-09-07T15:17:32.417Z",
		"size": 25254,
		"path": "../public/assets/_dashboard.discover-CWtJzci9.js"
	},
	"/assets/_dashboard.for-you-BPP4Wu66.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34f7-WbEIAsA7wraAQIUWZsOSN60eYF4\"",
		"mtime": "2026-09-07T15:17:32.417Z",
		"size": 13559,
		"path": "../public/assets/_dashboard.for-you-BPP4Wu66.js"
	},
	"/assets/_dashboard.outreach-B93CC_Sl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a7e3-2GFwYnp3WZhxQopt9J4dzfbMVsQ\"",
		"mtime": "2026-09-07T15:17:32.417Z",
		"size": 42979,
		"path": "../public/assets/_dashboard.outreach-B93CC_Sl.js"
	},
	"/assets/_dashboard.profile-BV4jBL1d.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cef-ktOrdvF4TslPeQzYdN7uiZa3k2k\"",
		"mtime": "2026-09-07T15:17:32.417Z",
		"size": 7407,
		"path": "../public/assets/_dashboard.profile-BV4jBL1d.js"
	},
	"/assets/_dashboard.saved-DD54nHs9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5c91-FlMpAqkII7bzF92rvj5KKXv+cUs\"",
		"mtime": "2026-09-07T15:17:32.417Z",
		"size": 23697,
		"path": "../public/assets/_dashboard.saved-DD54nHs9.js"
	},
	"/assets/_dashboard-B6Kz6QZz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d16-skddXo7dNleUFc6ooDbuE4BF8b0\"",
		"mtime": "2026-09-07T15:17:32.416Z",
		"size": 11542,
		"path": "../public/assets/_dashboard-B6Kz6QZz.js"
	},
	"/assets/_dashboard.settings-Bkv3TVeT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6850-H/5mkbZx09W+zb4n8Cnbg34wUO8\"",
		"mtime": "2026-09-07T15:17:32.417Z",
		"size": 26704,
		"path": "../public/assets/_dashboard.settings-Bkv3TVeT.js"
	},
	"/assets/admin--Rz-xZzv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15d4-hj5yuPx8xkXsDr0MY9fC6RCmwzQ\"",
		"mtime": "2026-09-07T15:17:32.417Z",
		"size": 5588,
		"path": "../public/assets/admin--Rz-xZzv.js"
	},
	"/assets/_dashboard.team-Q3LjwtTS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23ae-d4W+6k8Ksx5ZKF0bU9BvqzpVcjo\"",
		"mtime": "2026-09-07T15:17:32.417Z",
		"size": 9134,
		"path": "../public/assets/_dashboard.team-Q3LjwtTS.js"
	},
	"/assets/arrow-right-B7PznuYl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-Y9rqu2o7UhE3BFNsx7X7UfUtoHc\"",
		"mtime": "2026-09-07T15:17:32.417Z",
		"size": 165,
		"path": "../public/assets/arrow-right-B7PznuYl.js"
	},
	"/assets/auth-BqVQzawV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34b2-j7lbXVo5d8XCDtLPZ82QZFeuYMo\"",
		"mtime": "2026-09-07T15:17:32.417Z",
		"size": 13490,
		"path": "../public/assets/auth-BqVQzawV.js"
	},
	"/assets/bookmark-CJ00IaJ1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-IgSv6kZ6laGNyDSeu2pl0nQW0sw\"",
		"mtime": "2026-09-07T15:17:32.417Z",
		"size": 230,
		"path": "../public/assets/bookmark-CJ00IaJ1.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-09-07T15:17:33.250Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/building-2-dklc4z_N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17f-YwkWeWcWgR8aypeqba/x3o3jdtE\"",
		"mtime": "2026-09-07T15:17:32.417Z",
		"size": 383,
		"path": "../public/assets/building-2-dklc4z_N.js"
	},
	"/assets/calendar-DEi2OBfi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"101-4YcV1tzE6kBYlx9BcT+VSOKEW64\"",
		"mtime": "2026-09-07T15:17:32.417Z",
		"size": 257,
		"path": "../public/assets/calendar-DEi2OBfi.js"
	},
	"/assets/chart-no-axes-column-increasing-IlfwoDHL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d9-kVXqb9vSZEDXG/TERSTs5Pg08O0\"",
		"mtime": "2026-09-07T15:17:32.417Z",
		"size": 217,
		"path": "../public/assets/chart-no-axes-column-increasing-IlfwoDHL.js"
	},
	"/assets/check-Dfba6_ls.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c-89K/qrXyNAg2tEbKE/qx9t6THBs\"",
		"mtime": "2026-09-07T15:17:32.417Z",
		"size": 124,
		"path": "../public/assets/check-Dfba6_ls.js"
	},
	"/assets/compass-kohhsSt9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-5Q3BzScloexgOCyvjkNMO3bhcmY\"",
		"mtime": "2026-09-07T15:17:32.417Z",
		"size": 251,
		"path": "../public/assets/compass-kohhsSt9.js"
	},
	"/assets/createLucideIcon-_ZC6gjkH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4af-Fs4MsEW3CaHeVah876KzaukGOIk\"",
		"mtime": "2026-09-07T15:17:32.417Z",
		"size": 1199,
		"path": "../public/assets/createLucideIcon-_ZC6gjkH.js"
	},
	"/assets/credit-card-DfyuXqlm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-lEnsuzxRLaxdGYg2cn/HWDAWRyg\"",
		"mtime": "2026-09-07T15:17:32.417Z",
		"size": 207,
		"path": "../public/assets/credit-card-DfyuXqlm.js"
	},
	"/assets/index-CpkBI1vI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76778-CMrfXsInCzStNxREdYetNLQktEo\"",
		"mtime": "2026-09-07T15:17:32.416Z",
		"size": 485240,
		"path": "../public/assets/index-CpkBI1vI.js"
	},
	"/assets/jsx-dev-runtime-Dj92G--B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"88f6-kXh6O+Ek3Z1BWh+aqUJEt5C0gJE\"",
		"mtime": "2026-09-07T15:17:32.417Z",
		"size": 35062,
		"path": "../public/assets/jsx-dev-runtime-Dj92G--B.js"
	},
	"/assets/jsx-runtime-DNbtopEU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14f7-ufakM9oB+kzC42WQKoKp2ScYdvY\"",
		"mtime": "2026-09-07T15:17:32.417Z",
		"size": 5367,
		"path": "../public/assets/jsx-runtime-DNbtopEU.js"
	},
	"/assets/link-BY6-MYBz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a71-LXYMW3CmLb+PdINsD+7kasQ31ac\"",
		"mtime": "2026-09-07T15:17:32.417Z",
		"size": 27249,
		"path": "../public/assets/link-BY6-MYBz.js"
	},
	"/assets/loader-circle-eOTfl4aT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-r/KqXX8dFYqRAQbzTVVuePdZjUw\"",
		"mtime": "2026-09-07T15:17:32.417Z",
		"size": 144,
		"path": "../public/assets/loader-circle-eOTfl4aT.js"
	},
	"/assets/mail-vn8ooTlV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-ugEDLZOegWssOTfbuhCoYZDEw1A\"",
		"mtime": "2026-09-07T15:17:32.417Z",
		"size": 213,
		"path": "../public/assets/mail-vn8ooTlV.js"
	},
	"/assets/monetization-DabKtcvu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e0-V7FEhXU0EJGh08NNy3bWxMAQ4Fk\"",
		"mtime": "2026-09-07T15:17:32.417Z",
		"size": 736,
		"path": "../public/assets/monetization-DabKtcvu.js"
	},
	"/assets/onboarding-DANlcAmN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2573-Qz2DkUQQVivSlT+k/FSNegTWjoc\"",
		"mtime": "2026-09-07T15:17:32.417Z",
		"size": 9587,
		"path": "../public/assets/onboarding-DANlcAmN.js"
	},
	"/assets/phone-9DckRgeU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"208-lHKE0BiX+YI32o9UY9SuxEyNpyY\"",
		"mtime": "2026-09-07T15:17:32.417Z",
		"size": 520,
		"path": "../public/assets/phone-9DckRgeU.js"
	},
	"/assets/pricing-CC1N8Fr8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22c6-GvYl3pg1dbqZkEz7NkQZgye0Crs\"",
		"mtime": "2026-09-07T15:17:32.417Z",
		"size": 8902,
		"path": "../public/assets/pricing-CC1N8Fr8.js"
	},
	"/assets/routes-D_Gbg1kP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21e1-1lImGGpNsy4rViVmdVRM/RO/BaY\"",
		"mtime": "2026-09-07T15:17:32.418Z",
		"size": 8673,
		"path": "../public/assets/routes-D_Gbg1kP.js"
	},
	"/assets/save-DSraX1p6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-5RMAobXt5RB7ozbuA1nBJXmluqU\"",
		"mtime": "2026-09-07T15:17:32.418Z",
		"size": 327,
		"path": "../public/assets/save-DSraX1p6.js"
	},
	"/assets/search-S3THcI8R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16b-Z7C5ww8zjZA2x0ckRK0ww+ct/3k\"",
		"mtime": "2026-09-07T15:17:32.418Z",
		"size": 363,
		"path": "../public/assets/search-S3THcI8R.js"
	},
	"/assets/send-DLVytPg8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-AfKOxMe4HujPNrVOLwMey9n/e1s\"",
		"mtime": "2026-09-07T15:17:32.418Z",
		"size": 290,
		"path": "../public/assets/send-DLVytPg8.js"
	},
	"/assets/shield-BVtI8hKr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"110-7bsYWWMLNNcHchxkAiOeLEeyVOg\"",
		"mtime": "2026-09-07T15:17:32.418Z",
		"size": 272,
		"path": "../public/assets/shield-BVtI8hKr.js"
	},
	"/assets/sliders-horizontal-CrvJOXJD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66a-gUsMil+xnRaXErWS7IuoLbIbXTk\"",
		"mtime": "2026-09-07T15:17:32.418Z",
		"size": 1642,
		"path": "../public/assets/sliders-horizontal-CrvJOXJD.js"
	},
	"/assets/sparkles-SqonR3Bo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-m3YqSEuDh/YutvZtRRTZ2yCyeA4\"",
		"mtime": "2026-09-07T15:17:32.418Z",
		"size": 494,
		"path": "../public/assets/sparkles-SqonR3Bo.js"
	},
	"/assets/sun-DeP1L_rf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f1-DXdAiKJ69ygimdMwgtDT3j4S7t4\"",
		"mtime": "2026-09-07T15:17:32.418Z",
		"size": 1009,
		"path": "../public/assets/sun-DeP1L_rf.js"
	},
	"/assets/styles-Dphk06Ug.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"17f74-XJTVXivU5I+okeBbhGqTF/GyXw4\"",
		"mtime": "2026-09-07T15:17:32.418Z",
		"size": 98164,
		"path": "../public/assets/styles-Dphk06Ug.css"
	},
	"/assets/supabase-CRX9Nu9H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33703-wd6Qg2/WWjhe6Z1vKFkqgoypwVw\"",
		"mtime": "2026-09-07T15:17:32.418Z",
		"size": 210691,
		"path": "../public/assets/supabase-CRX9Nu9H.js"
	},
	"/assets/useMutation-DMZGkamJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"92b-g3yr7pgSjHwdkyvoJDMCUk56tPE\"",
		"mtime": "2026-09-07T15:17:32.418Z",
		"size": 2347,
		"path": "../public/assets/useMutation-DMZGkamJ.js"
	},
	"/assets/useQuery-BOfSJAqC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2229-dqxiZknS6jZXuTYAAWtraHRmNrU\"",
		"mtime": "2026-09-07T15:17:32.418Z",
		"size": 8745,
		"path": "../public/assets/useQuery-BOfSJAqC.js"
	},
	"/assets/useRouter-Bk203626.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10a-rsg0Jzwj9Ns1XQb0JhOPWAMbK7Q\"",
		"mtime": "2026-09-07T15:17:32.418Z",
		"size": 266,
		"path": "../public/assets/useRouter-Bk203626.js"
	},
	"/assets/useMonetization-BdpYBEdc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e2-U0nUca3FA/z1AlqD7dk07+x1xaE\"",
		"mtime": "2026-09-07T15:17:32.418Z",
		"size": 738,
		"path": "../public/assets/useMonetization-BdpYBEdc.js"
	},
	"/assets/useMatch-D1x7l68s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d8-E3GbOQcdXuFX7aSAB3OCsF+St8Q\"",
		"mtime": "2026-09-07T15:17:32.418Z",
		"size": 1496,
		"path": "../public/assets/useMatch-D1x7l68s.js"
	},
	"/assets/trending-up-DYuptGhm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"af-VGBBnCun3scRe3pJDWg+rx6Bf4A\"",
		"mtime": "2026-09-07T15:17:32.418Z",
		"size": 175,
		"path": "../public/assets/trending-up-DYuptGhm.js"
	},
	"/assets/user-p58LN28T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-zrVwjNATir7ZzDg+5NEKNcD67ZQ\"",
		"mtime": "2026-09-07T15:17:32.418Z",
		"size": 196,
		"path": "../public/assets/user-p58LN28T.js"
	},
	"/assets/users-Dwy-6N_2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-Zzci1kKt2dQfURlGKiRTAnUILII\"",
		"mtime": "2026-09-07T15:17:32.418Z",
		"size": 306,
		"path": "../public/assets/users-Dwy-6N_2.js"
	},
	"/assets/x-BYWp7ko_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-r4tnHwlzfwu3TTQtwiBry2WgviY\"",
		"mtime": "2026-09-07T15:17:32.418Z",
		"size": 154,
		"path": "../public/assets/x-BYWp7ko_.js"
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
