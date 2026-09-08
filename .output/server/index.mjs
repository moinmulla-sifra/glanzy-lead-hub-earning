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
	"/assets/BrandProfileModal-CR9KPZkc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a37-l+IujsYCRhj9AaScrWWeonWcISw\"",
		"mtime": "2026-09-08T03:41:12.840Z",
		"size": 10807,
		"path": "../public/assets/BrandProfileModal-CR9KPZkc.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-08T03:41:13.456Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-09-08T03:41:13.455Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/Match-Cf1h_w2m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bdfd-WRmHVkPwllpjvx++p701pHmrLTQ\"",
		"mtime": "2026-09-08T03:41:12.840Z",
		"size": 48637,
		"path": "../public/assets/Match-Cf1h_w2m.js"
	},
	"/assets/_dashboard-B7ZD0Q9a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20ac-tfN1bE+N4oOglZGVS4l/sESIyWk\"",
		"mtime": "2026-09-08T03:41:12.840Z",
		"size": 8364,
		"path": "../public/assets/_dashboard-B7ZD0Q9a.js"
	},
	"/assets/_dashboard.dashboard-DdPJuslw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14ba-erIHRyksFdxNVno2FxNZ2pw87xk\"",
		"mtime": "2026-09-08T03:41:12.840Z",
		"size": 5306,
		"path": "../public/assets/_dashboard.dashboard-DdPJuslw.js"
	},
	"/assets/_dashboard.discover-u1gcVxot.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3e9b-bicjUoG87pn+w1i/sW6ViNgZtvE\"",
		"mtime": "2026-09-08T03:41:12.840Z",
		"size": 16027,
		"path": "../public/assets/_dashboard.discover-u1gcVxot.js"
	},
	"/assets/_dashboard.for-you-ivVBAR7X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"277b-Tin7SKJ4uh2wikhzwnPWbEB9BmU\"",
		"mtime": "2026-09-08T03:41:12.840Z",
		"size": 10107,
		"path": "../public/assets/_dashboard.for-you-ivVBAR7X.js"
	},
	"/assets/_dashboard.outreach-DUIteW9Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"78e2-jM+SVk5ryNa0k8R2JBSgsI3N2Sw\"",
		"mtime": "2026-09-08T03:41:12.840Z",
		"size": 30946,
		"path": "../public/assets/_dashboard.outreach-DUIteW9Y.js"
	},
	"/assets/_dashboard.profile-BE3rWQpn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141f-TT7nZPFUHMbYwo2D61s//hPPm/E\"",
		"mtime": "2026-09-08T03:41:12.840Z",
		"size": 5151,
		"path": "../public/assets/_dashboard.profile-BE3rWQpn.js"
	},
	"/assets/_dashboard.saved-NtHAmR9H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4275-UX8DyMZyq+kbbypeX5DAaoSmadE\"",
		"mtime": "2026-09-08T03:41:12.841Z",
		"size": 17013,
		"path": "../public/assets/_dashboard.saved-NtHAmR9H.js"
	},
	"/assets/_dashboard.settings-Dy8pxUSb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"46f4-HAwzopMw58u+2bshE+uxk6iW0S0\"",
		"mtime": "2026-09-08T03:41:12.841Z",
		"size": 18164,
		"path": "../public/assets/_dashboard.settings-Dy8pxUSb.js"
	},
	"/assets/_dashboard.team-C5LcSlYM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1933-LCExTVFdSPtM8LuDB+XzHM/YNIY\"",
		"mtime": "2026-09-08T03:41:12.841Z",
		"size": 6451,
		"path": "../public/assets/_dashboard.team-C5LcSlYM.js"
	},
	"/assets/admin-CJ2I5RUO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e87-TaZYsx9fWa83e4AX+0hPfdtbkxc\"",
		"mtime": "2026-09-08T03:41:12.841Z",
		"size": 3719,
		"path": "../public/assets/admin-CJ2I5RUO.js"
	},
	"/assets/arrow-right-j5bSDiKM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-HSVNUK+bc/gcqNSqVMplqiFZr4U\"",
		"mtime": "2026-09-08T03:41:12.841Z",
		"size": 165,
		"path": "../public/assets/arrow-right-j5bSDiKM.js"
	},
	"/assets/auth-CUa3SOaA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"260b-nmUG0oVowgPlcROvV4ZoaOWGTs4\"",
		"mtime": "2026-09-08T03:41:12.841Z",
		"size": 9739,
		"path": "../public/assets/auth-CUa3SOaA.js"
	},
	"/assets/bookmark-CW02mlak.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-vaXk1+e2gg00+VQV2zxIxO8vs7I\"",
		"mtime": "2026-09-08T03:41:12.841Z",
		"size": 230,
		"path": "../public/assets/bookmark-CW02mlak.js"
	},
	"/assets/building-2-CytT9GNw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17f-Co+AAHPRW7VC3uF4PC/Y0eOcg40\"",
		"mtime": "2026-09-08T03:41:12.841Z",
		"size": 383,
		"path": "../public/assets/building-2-CytT9GNw.js"
	},
	"/assets/calendar-CL3QkIdP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"101-bF0EfdQvWUsVzWLHfe3fOeJf8bc\"",
		"mtime": "2026-09-08T03:41:12.841Z",
		"size": 257,
		"path": "../public/assets/calendar-CL3QkIdP.js"
	},
	"/assets/chart-no-axes-column-increasing-bJNEzTw7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d9-tr0Qmd8d3LOfG5y2XtpCTk/uPZY\"",
		"mtime": "2026-09-08T03:41:12.841Z",
		"size": 217,
		"path": "../public/assets/chart-no-axes-column-increasing-bJNEzTw7.js"
	},
	"/assets/check-CxZocAz1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c-IlDUDwLq05BMDiT8/iMNRvmAqjQ\"",
		"mtime": "2026-09-08T03:41:12.841Z",
		"size": 124,
		"path": "../public/assets/check-CxZocAz1.js"
	},
	"/assets/compass-CH-0rvxA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-d+IHNzu9bhcKncM5QZ6k+CtIwpo\"",
		"mtime": "2026-09-08T03:41:12.841Z",
		"size": 251,
		"path": "../public/assets/compass-CH-0rvxA.js"
	},
	"/assets/constants-Cv0jiKmZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f9-H2/fWd1m51whG80kgQmJBkcoiAs\"",
		"mtime": "2026-09-08T03:41:12.841Z",
		"size": 761,
		"path": "../public/assets/constants-Cv0jiKmZ.js"
	},
	"/assets/createLucideIcon-Dhi9XBT_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ab-urCVHxiPQyx61bhikDR8SqJWdJk\"",
		"mtime": "2026-09-08T03:41:12.841Z",
		"size": 1195,
		"path": "../public/assets/createLucideIcon-Dhi9XBT_.js"
	},
	"/assets/credit-card-BlxscEcf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-FQl8Xozlq7uzHoudCnqFM35wAKI\"",
		"mtime": "2026-09-08T03:41:12.841Z",
		"size": 207,
		"path": "../public/assets/credit-card-BlxscEcf.js"
	},
	"/assets/index-DzBPF8L5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ada1-B8NPY8Q3lmKlkEXRJRjzZoMy0NI\"",
		"mtime": "2026-09-08T03:41:12.837Z",
		"size": 306593,
		"path": "../public/assets/index-DzBPF8L5.js"
	},
	"/assets/jsx-runtime-yLamxOIm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e87-z0S8yY8pXkwJwDchZ9crwsTHOZs\"",
		"mtime": "2026-09-08T03:41:12.841Z",
		"size": 11911,
		"path": "../public/assets/jsx-runtime-yLamxOIm.js"
	},
	"/assets/link-UI6zb2FJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5af5-jbflUR37XnYXOKbvFgbZFGIDo98\"",
		"mtime": "2026-09-08T03:41:12.841Z",
		"size": 23285,
		"path": "../public/assets/link-UI6zb2FJ.js"
	},
	"/assets/loader-circle-D-eGqzgw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-P2S4U26wMDfDCu3hCf+mAAWqz7k\"",
		"mtime": "2026-09-08T03:41:12.841Z",
		"size": 144,
		"path": "../public/assets/loader-circle-D-eGqzgw.js"
	},
	"/assets/mail-3PmDPYBM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-qNsJfBzFB1+EtegpaKL2S6jxYQU\"",
		"mtime": "2026-09-08T03:41:12.841Z",
		"size": 213,
		"path": "../public/assets/mail-3PmDPYBM.js"
	},
	"/assets/monetization-DabKtcvu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e0-V7FEhXU0EJGh08NNy3bWxMAQ4Fk\"",
		"mtime": "2026-09-08T03:41:12.841Z",
		"size": 736,
		"path": "../public/assets/monetization-DabKtcvu.js"
	},
	"/assets/onboarding-BjXI62j-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ada-SHnkgGCe+45DVQyDMxsToEVU7JU\"",
		"mtime": "2026-09-08T03:41:12.841Z",
		"size": 6874,
		"path": "../public/assets/onboarding-BjXI62j-.js"
	},
	"/assets/pricing-1fS_f1EP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"183d-thVyb5jtm344UKjsIHuhrMOWWXY\"",
		"mtime": "2026-09-08T03:41:12.841Z",
		"size": 6205,
		"path": "../public/assets/pricing-1fS_f1EP.js"
	},
	"/assets/routes-DUEgGUwh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"168e-mBRr+M4+96CU3B3p+XHLlYCyznU\"",
		"mtime": "2026-09-08T03:41:12.841Z",
		"size": 5774,
		"path": "../public/assets/routes-DUEgGUwh.js"
	},
	"/assets/save-B9VwrPoC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-/2lFDZ8e/IBLyFbyIIOsHWoHwgU\"",
		"mtime": "2026-09-08T03:41:12.841Z",
		"size": 327,
		"path": "../public/assets/save-B9VwrPoC.js"
	},
	"/assets/search-DfPZyNUn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16b-/1OsmQeJB9/NA2fKfzJqxUaQMXI\"",
		"mtime": "2026-09-08T03:41:12.842Z",
		"size": 363,
		"path": "../public/assets/search-DfPZyNUn.js"
	},
	"/assets/send-D211DPyo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-kM3n6LUuNthSWcCkLr+uAVwVI/I\"",
		"mtime": "2026-09-08T03:41:12.842Z",
		"size": 290,
		"path": "../public/assets/send-D211DPyo.js"
	},
	"/assets/shield-W-hrxvtK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"110-LVvN/q86BjDghxJ2aWxHE5IDIaY\"",
		"mtime": "2026-09-08T03:41:12.842Z",
		"size": 272,
		"path": "../public/assets/shield-W-hrxvtK.js"
	},
	"/assets/sliders-horizontal-D4JEKGxq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66a-WFMmr/pANUjA9cPivtvSXY/FOpg\"",
		"mtime": "2026-09-08T03:41:12.842Z",
		"size": 1642,
		"path": "../public/assets/sliders-horizontal-D4JEKGxq.js"
	},
	"/assets/sparkles-B6rreRvi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-jTUvPvHXKI2j8vVj9BaNbSRk4hg\"",
		"mtime": "2026-09-08T03:41:12.842Z",
		"size": 494,
		"path": "../public/assets/sparkles-B6rreRvi.js"
	},
	"/assets/styles-Dsz7R7Np.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"d289-S7BSw8FZwF7VeY00wMO+BN8Isec\"",
		"mtime": "2026-09-08T03:41:12.842Z",
		"size": 53897,
		"path": "../public/assets/styles-Dsz7R7Np.css"
	},
	"/assets/sun-DtDxFIBU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f1-7SKOicgrFRbg39jbs3EnyQrbiA8\"",
		"mtime": "2026-09-08T03:41:12.842Z",
		"size": 1009,
		"path": "../public/assets/sun-DtDxFIBU.js"
	},
	"/assets/supabase-CRX9Nu9H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33703-wd6Qg2/WWjhe6Z1vKFkqgoypwVw\"",
		"mtime": "2026-09-08T03:41:12.842Z",
		"size": 210691,
		"path": "../public/assets/supabase-CRX9Nu9H.js"
	},
	"/assets/trending-up-BwmyDVMK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"af-Quk0CprvBqAluK8EiGiET/9qd+s\"",
		"mtime": "2026-09-08T03:41:12.842Z",
		"size": 175,
		"path": "../public/assets/trending-up-BwmyDVMK.js"
	},
	"/assets/useMatch-C8H7l6l7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a1-dCj3212FSmFulXkr9SEP3xzm0RY\"",
		"mtime": "2026-09-08T03:41:12.842Z",
		"size": 1185,
		"path": "../public/assets/useMatch-C8H7l6l7.js"
	},
	"/assets/useMonetization-CdAb4c-t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e2-3vgFAfSEp6YFzlvwQTu/YKfM+JU\"",
		"mtime": "2026-09-08T03:41:12.842Z",
		"size": 738,
		"path": "../public/assets/useMonetization-CdAb4c-t.js"
	},
	"/assets/useMutation-CDmxDbb5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"927-X6qOT8mcbM4B6P4aRR4ypfUftCI\"",
		"mtime": "2026-09-08T03:41:12.842Z",
		"size": 2343,
		"path": "../public/assets/useMutation-CDmxDbb5.js"
	},
	"/assets/useQuery-G9l0Ygn9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f88-iTaUc8OGGkp7vRkKpMTfm0Nh/bw\"",
		"mtime": "2026-09-08T03:41:12.842Z",
		"size": 8072,
		"path": "../public/assets/useQuery-G9l0Ygn9.js"
	},
	"/assets/useRouter-BRuzMWm0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"97-nqhH+ZXyvaETvFo1l7j/YSpiGlw\"",
		"mtime": "2026-09-08T03:41:12.842Z",
		"size": 151,
		"path": "../public/assets/useRouter-BRuzMWm0.js"
	},
	"/assets/user-QcSAX8Pl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-oGp8ntwkScGecBrCTIhR3W6SDvE\"",
		"mtime": "2026-09-08T03:41:12.842Z",
		"size": 196,
		"path": "../public/assets/user-QcSAX8Pl.js"
	},
	"/assets/users-BKDYAenJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-KX5QwzufNmkchvH/mEdr2NkMy9s\"",
		"mtime": "2026-09-08T03:41:12.842Z",
		"size": 306,
		"path": "../public/assets/users-BKDYAenJ.js"
	},
	"/assets/x-CmLw_Szi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-38tuAalhGmrxeh943RCvKYxdpzk\"",
		"mtime": "2026-09-08T03:41:12.842Z",
		"size": 154,
		"path": "../public/assets/x-CmLw_Szi.js"
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
var _lazy_RfVFMN = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_RfVFMN
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
