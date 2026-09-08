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
		"mtime": "2026-09-08T08:55:31.206Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-08T08:55:31.206Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/BrandProfileModal-CRKtzV98.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b23-syTVgjZH734+Gb7uzEhIQNbdvKQ\"",
		"mtime": "2026-09-08T08:55:30.360Z",
		"size": 11043,
		"path": "../public/assets/BrandProfileModal-CRKtzV98.js"
	},
	"/assets/_dashboard-rgr_OGpu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"236b-+YUAcu7U0roHII9n8REku4vfoKw\"",
		"mtime": "2026-09-08T08:55:30.360Z",
		"size": 9067,
		"path": "../public/assets/_dashboard-rgr_OGpu.js"
	},
	"/assets/_dashboard.dashboard-Cf-QRSAR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14ba-9fuOC1JQgWI7c8ZTcYTROyA5Bgo\"",
		"mtime": "2026-09-08T08:55:30.360Z",
		"size": 5306,
		"path": "../public/assets/_dashboard.dashboard-Cf-QRSAR.js"
	},
	"/assets/_dashboard.discover-6qGFjGiR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"40b3-e1TRpADNnIz3WR/qWa3/J6xcHro\"",
		"mtime": "2026-09-08T08:55:30.360Z",
		"size": 16563,
		"path": "../public/assets/_dashboard.discover-6qGFjGiR.js"
	},
	"/assets/_dashboard.for-you-qfSFvGfR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29b3-E0iYW9Ko9x1H8fHH2dK3up3FMcg\"",
		"mtime": "2026-09-08T08:55:30.360Z",
		"size": 10675,
		"path": "../public/assets/_dashboard.for-you-qfSFvGfR.js"
	},
	"/assets/_dashboard.outreach-BKu479os.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"779c-sSXeAoyeegUpmQelzkRNz0D7Hz8\"",
		"mtime": "2026-09-08T08:55:30.360Z",
		"size": 30620,
		"path": "../public/assets/_dashboard.outreach-BKu479os.js"
	},
	"/assets/_dashboard.profile-CWFilUD3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1688-/xdu0izsRy4aC42JzApQ/RXlbtA\"",
		"mtime": "2026-09-08T08:55:30.360Z",
		"size": 5768,
		"path": "../public/assets/_dashboard.profile-CWFilUD3.js"
	},
	"/assets/_dashboard.saved-DzaYv488.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44a1-OTaZ1UQy0xGLcd/bgTPBRmMkijQ\"",
		"mtime": "2026-09-08T08:55:30.360Z",
		"size": 17569,
		"path": "../public/assets/_dashboard.saved-DzaYv488.js"
	},
	"/assets/_dashboard.settings-DFG6WWHS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c90-jTFZiPemEBI5jZYZ8XljBK/mJDA\"",
		"mtime": "2026-09-08T08:55:30.360Z",
		"size": 15504,
		"path": "../public/assets/_dashboard.settings-DFG6WWHS.js"
	},
	"/assets/_dashboard.team-DH6QVTzK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"194f-4o8+u84HxMfdjxkVMD3FnJN8wGQ\"",
		"mtime": "2026-09-08T08:55:30.360Z",
		"size": 6479,
		"path": "../public/assets/_dashboard.team-DH6QVTzK.js"
	},
	"/assets/actions-Z8P2tE4-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"130f-i+GJcgAUmCHhSO9cg2BgeBk3dv8\"",
		"mtime": "2026-09-08T08:55:30.360Z",
		"size": 4879,
		"path": "../public/assets/actions-Z8P2tE4-.js"
	},
	"/assets/admin-ByBih1np.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3425-beOSaBPkwc9LnkEwBLweMZIjoaM\"",
		"mtime": "2026-09-08T08:55:30.360Z",
		"size": 13349,
		"path": "../public/assets/admin-ByBih1np.js"
	},
	"/assets/arrow-right-D5pQCwSL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-ZEAsrP4e3qMmAxYVGwTMi/L1e3g\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 165,
		"path": "../public/assets/arrow-right-D5pQCwSL.js"
	},
	"/assets/auth-CzKV7h4n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24ac-br53COMxDB6ymDlqz24h4VoS8E8\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 9388,
		"path": "../public/assets/auth-CzKV7h4n.js"
	},
	"/assets/bookmark-BtRCrCO3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-zTCPiRZ4+AK16tj2BSmMaFmkSPE\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 230,
		"path": "../public/assets/bookmark-BtRCrCO3.js"
	},
	"/assets/building-2-DW8rJ0te.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17f-l6GieKsUJtfNXG3ws13zq38N+3s\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 383,
		"path": "../public/assets/building-2-DW8rJ0te.js"
	},
	"/assets/calendar-DJ3ZQlXp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"101-ZzGEs5vxRSVYkooBTt4IXs3d9CQ\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 257,
		"path": "../public/assets/calendar-DJ3ZQlXp.js"
	},
	"/assets/chart-no-axes-column-increasing-Klwwk7w3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d9-Tlt22IiXVKswI9Jhngt8Suqcgyo\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 217,
		"path": "../public/assets/chart-no-axes-column-increasing-Klwwk7w3.js"
	},
	"/assets/check-CCy2ox4b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c-KGWDWXSc/SAgW4zPP5kvBnhtKaA\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 124,
		"path": "../public/assets/check-CCy2ox4b.js"
	},
	"/assets/clock-Cia5stp0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d1-wmbCGXWAJrqeM6IsJbwwT9V9250\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 465,
		"path": "../public/assets/clock-Cia5stp0.js"
	},
	"/assets/compass-BSwcFPjt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-Dz18uIooJeV05JtiQIvHy27U65Y\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 251,
		"path": "../public/assets/compass-BSwcFPjt.js"
	},
	"/assets/constants-DXzb8QxL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f9-jzqhylteZ0AXr9+aVlgQgyQQrgI\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 761,
		"path": "../public/assets/constants-DXzb8QxL.js"
	},
	"/assets/createLucideIcon-CEGepnBf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ab-9w7034WUPiHI10TPGK6P975saJ0\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 1195,
		"path": "../public/assets/createLucideIcon-CEGepnBf.js"
	},
	"/assets/credit-card-T4PSeN2q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-Gmp8mAEUgVA2YTtxZKbrK+z1/lY\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 207,
		"path": "../public/assets/credit-card-T4PSeN2q.js"
	},
	"/assets/index-C_5B5tTd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"569d5-he4umdLZ/CDsSzt1VtBWe4W7yJU\"",
		"mtime": "2026-09-08T08:55:30.360Z",
		"size": 354773,
		"path": "../public/assets/index-C_5B5tTd.js"
	},
	"/assets/invariant-DVltax7q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d46-6Vq45OKIuk1VDi55V2zxsUT3EnY\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 3398,
		"path": "../public/assets/invariant-DVltax7q.js"
	},
	"/assets/jsx-runtime-Cltr0gcK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20ee-ObwGPj96dlkL76iVLbX2wLAXzuw\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 8430,
		"path": "../public/assets/jsx-runtime-Cltr0gcK.js"
	},
	"/assets/link-C8IzGKoe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"46aa-eX94yvdVcA0ur5+wnwyPmscGgjM\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 18090,
		"path": "../public/assets/link-C8IzGKoe.js"
	},
	"/assets/loader-circle-LmZjNfAe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-sJcskFe9MqqdeLTvIyYy3gYFP80\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 144,
		"path": "../public/assets/loader-circle-LmZjNfAe.js"
	},
	"/assets/log-out-ORTi8ClS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-3wRLfeFfa38+5PdCAFpChUSqzoI\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 230,
		"path": "../public/assets/log-out-ORTi8ClS.js"
	},
	"/assets/mail-DUe2Erw0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-c1O7U3Mx/a0OU9dkvlHx1WVt42Q\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 213,
		"path": "../public/assets/mail-DUe2Erw0.js"
	},
	"/assets/monetization-DabKtcvu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e0-V7FEhXU0EJGh08NNy3bWxMAQ4Fk\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 736,
		"path": "../public/assets/monetization-DabKtcvu.js"
	},
	"/assets/not-found-DIgawKw1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37-RTB6YH5iXRKeXz1Sn6ZQ+vS0lnc\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 55,
		"path": "../public/assets/not-found-DIgawKw1.js"
	},
	"/assets/onboarding-DpXR7kNW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d89-qXBAJ2mk+rJ1m9VhKC0pE8crWGA\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 7561,
		"path": "../public/assets/onboarding-DpXR7kNW.js"
	},
	"/assets/pricing-CJXBgpHd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"183d-XhcXxp6JJVOj1/m/5jM7/pq/EEY\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 6205,
		"path": "../public/assets/pricing-CJXBgpHd.js"
	},
	"/assets/redirect-Bis1Jk_h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"207-XoVCss6mtvCWxNlyQXufSu4Z2ig\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 519,
		"path": "../public/assets/redirect-Bis1Jk_h.js"
	},
	"/assets/routes-C6osC6Na.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"168e-Qbv6ZX8Y+SYIJmswPUQPHE4VUq4\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 5774,
		"path": "../public/assets/routes-C6osC6Na.js"
	},
	"/assets/save-DWdmpGqL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-ztkSjfyPW3jcI/H3WSETwHgmaxk\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 327,
		"path": "../public/assets/save-DWdmpGqL.js"
	},
	"/assets/search-CXDrsK5n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16b-fJRTTvFUgBJANLeDPzbQiYUJc1k\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 363,
		"path": "../public/assets/search-CXDrsK5n.js"
	},
	"/assets/send-C1wOFq8M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-axmNEtcrilTGXvQcLgSNGoNaH9c\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 290,
		"path": "../public/assets/send-C1wOFq8M.js"
	},
	"/assets/shield-O49Fg52t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"110-Usn7MmeYoZIwMzj1hQE/o/HUogo\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 272,
		"path": "../public/assets/shield-O49Fg52t.js"
	},
	"/assets/sliders-horizontal-CgihUY2D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66a-iGBc4Jbysneei9Ygul8dqn6kSV4\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 1642,
		"path": "../public/assets/sliders-horizontal-CgihUY2D.js"
	},
	"/assets/sparkles-C-wfMPnb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-xdKjJ3+/+dRDz1GpNZV6deESOBM\"",
		"mtime": "2026-09-08T08:55:30.361Z",
		"size": 494,
		"path": "../public/assets/sparkles-C-wfMPnb.js"
	},
	"/assets/styles-BBlvwhad.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"d42a-rEOVwm1oJo7zQ7bPDOic7AkLH/A\"",
		"mtime": "2026-09-08T08:55:30.362Z",
		"size": 54314,
		"path": "../public/assets/styles-BBlvwhad.css"
	},
	"/assets/supabase-DTorYgRt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33e0c-NBytwoKRb9Kw0RozhUQTPDurW9Y\"",
		"mtime": "2026-09-08T08:55:30.362Z",
		"size": 212492,
		"path": "../public/assets/supabase-DTorYgRt.js"
	},
	"/assets/trending-up-9fTZhAs5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"af-MXfPw6K0UXbLnVQN7N5iGkvD32Q\"",
		"mtime": "2026-09-08T08:55:30.362Z",
		"size": 175,
		"path": "../public/assets/trending-up-9fTZhAs5.js"
	},
	"/assets/useMatch-BjsaTMSe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27c-3WqmrdwiMf1iCoHIgabIJJjG/U4\"",
		"mtime": "2026-09-08T08:55:30.362Z",
		"size": 636,
		"path": "../public/assets/useMatch-BjsaTMSe.js"
	},
	"/assets/useMonetization-d4ax3LTk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e2-7wCXUgy8I9ztnZUXwcedD3oXeWI\"",
		"mtime": "2026-09-08T08:55:30.362Z",
		"size": 738,
		"path": "../public/assets/useMonetization-d4ax3LTk.js"
	},
	"/assets/useMutation-790vnlT8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"927-eAyyhrDsqWUJo4+42yhy7HO2MSs\"",
		"mtime": "2026-09-08T08:55:30.362Z",
		"size": 2343,
		"path": "../public/assets/useMutation-790vnlT8.js"
	},
	"/assets/useQuery-BcBN3ZtR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f88-n1hLa2+HMDZVSS0MfLO5Usdfw5M\"",
		"mtime": "2026-09-08T08:55:30.362Z",
		"size": 8072,
		"path": "../public/assets/useQuery-BcBN3ZtR.js"
	},
	"/assets/useRouter-CwjitLz4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"97-RAU16egCj2YoU17v/JNQx0lTbng\"",
		"mtime": "2026-09-08T08:55:30.362Z",
		"size": 151,
		"path": "../public/assets/useRouter-CwjitLz4.js"
	},
	"/assets/user-dmWph8jC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-msTozB54YMCdQI76vDh9PV7MCOI\"",
		"mtime": "2026-09-08T08:55:30.362Z",
		"size": 196,
		"path": "../public/assets/user-dmWph8jC.js"
	},
	"/assets/users-ByQQ79Dh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-D4tkZLwnv3uIaly6ENwmKRNmiAQ\"",
		"mtime": "2026-09-08T08:55:30.362Z",
		"size": 306,
		"path": "../public/assets/users-ByQQ79Dh.js"
	},
	"/assets/x-_CKTk_uH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-CuIL3t3oFedpuLZG2cTjjUn7Srw\"",
		"mtime": "2026-09-08T08:55:30.362Z",
		"size": 154,
		"path": "../public/assets/x-_CKTk_uH.js"
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
