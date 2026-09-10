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
		"mtime": "2026-09-09T17:31:33.814Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-09T17:31:33.814Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/BrandProfileModal-Deuq-c_o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"619e-rnZxOkNYJbSX3nUaVtOpi5rgMfI\"",
		"mtime": "2026-09-09T17:31:32.902Z",
		"size": 24990,
		"path": "../public/assets/BrandProfileModal-Deuq-c_o.js"
	},
	"/assets/LegalLayout-DDWuOMYG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"afc-mQ9niYX8i6y+BPU6zVjSOLt9vOA\"",
		"mtime": "2026-09-09T17:31:32.902Z",
		"size": 2812,
		"path": "../public/assets/LegalLayout-DDWuOMYG.js"
	},
	"/assets/_dashboard-BD54zZOI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27ac-xmAQC5bAUar0gzzkYXsahYz82h4\"",
		"mtime": "2026-09-09T17:31:32.902Z",
		"size": 10156,
		"path": "../public/assets/_dashboard-BD54zZOI.js"
	},
	"/assets/_dashboard.contacted-C90QVQJ8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7861-oYExS3HbV+QQ8yS01DQY/w8NZAk\"",
		"mtime": "2026-09-09T17:31:32.902Z",
		"size": 30817,
		"path": "../public/assets/_dashboard.contacted-C90QVQJ8.js"
	},
	"/assets/_dashboard.dashboard-DWHM09PU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14ba-TZxM+rZrg76rTmJjmfmTC2e+SFU\"",
		"mtime": "2026-09-09T17:31:32.902Z",
		"size": 5306,
		"path": "../public/assets/_dashboard.dashboard-DWHM09PU.js"
	},
	"/assets/_dashboard.discover-Blts7Wfv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f4a-u2vUG04TOdnrZzZm9seX2tZcsk4\"",
		"mtime": "2026-09-09T17:31:32.902Z",
		"size": 16202,
		"path": "../public/assets/_dashboard.discover-Blts7Wfv.js"
	},
	"/assets/_dashboard.for-you-B59RcmZQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2792-uTRW67dJOBrOGbxX8XxRHYw/d14\"",
		"mtime": "2026-09-09T17:31:32.902Z",
		"size": 10130,
		"path": "../public/assets/_dashboard.for-you-B59RcmZQ.js"
	},
	"/assets/_dashboard.profile-CJeAwbf8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1688-BOrfU5+EP7q9U3Irs/nrDChzV24\"",
		"mtime": "2026-09-09T17:31:32.902Z",
		"size": 5768,
		"path": "../public/assets/_dashboard.profile-CJeAwbf8.js"
	},
	"/assets/_dashboard.saved-B33FlOQB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4272-O8OInylKKBQB4iD72YXCEvKiiM8\"",
		"mtime": "2026-09-09T17:31:32.902Z",
		"size": 17010,
		"path": "../public/assets/_dashboard.saved-B33FlOQB.js"
	},
	"/assets/_dashboard.settings-BK_9h8AF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"51db-2EXr3/miowYlqKr7G6tytMTRnXE\"",
		"mtime": "2026-09-09T17:31:32.903Z",
		"size": 20955,
		"path": "../public/assets/_dashboard.settings-BK_9h8AF.js"
	},
	"/assets/_dashboard.team-CP_quFxT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"194f-X7w7nDGOAz6HklHlPqPF4wJzrkw\"",
		"mtime": "2026-09-09T17:31:32.903Z",
		"size": 6479,
		"path": "../public/assets/_dashboard.team-CP_quFxT.js"
	},
	"/assets/about-VX2NtvBM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"267f-uO8kPduJ26QXDBURYBT5SAmT4do\"",
		"mtime": "2026-09-09T17:31:32.903Z",
		"size": 9855,
		"path": "../public/assets/about-VX2NtvBM.js"
	},
	"/assets/admin-76dLkGmy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1168-zScchJofWOzZ4rlbFO8Z9BK+Yh8\"",
		"mtime": "2026-09-09T17:31:32.903Z",
		"size": 4456,
		"path": "../public/assets/admin-76dLkGmy.js"
	},
	"/assets/arrow-right-D5pQCwSL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-ZEAsrP4e3qMmAxYVGwTMi/L1e3g\"",
		"mtime": "2026-09-09T17:31:32.903Z",
		"size": 165,
		"path": "../public/assets/arrow-right-D5pQCwSL.js"
	},
	"/assets/auth-BlBuH5ft.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24ac-4LoHsn7De6ODkNhIhNbIEczn6cA\"",
		"mtime": "2026-09-09T17:31:32.903Z",
		"size": 9388,
		"path": "../public/assets/auth-BlBuH5ft.js"
	},
	"/assets/bookmark-BtRCrCO3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-zTCPiRZ4+AK16tj2BSmMaFmkSPE\"",
		"mtime": "2026-09-09T17:31:32.903Z",
		"size": 230,
		"path": "../public/assets/bookmark-BtRCrCO3.js"
	},
	"/assets/building-2-DW8rJ0te.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17f-l6GieKsUJtfNXG3ws13zq38N+3s\"",
		"mtime": "2026-09-09T17:31:32.903Z",
		"size": 383,
		"path": "../public/assets/building-2-DW8rJ0te.js"
	},
	"/assets/calendar-DJ3ZQlXp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"101-ZzGEs5vxRSVYkooBTt4IXs3d9CQ\"",
		"mtime": "2026-09-09T17:31:32.903Z",
		"size": 257,
		"path": "../public/assets/calendar-DJ3ZQlXp.js"
	},
	"/assets/chart-no-axes-column-increasing-Klwwk7w3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d9-Tlt22IiXVKswI9Jhngt8Suqcgyo\"",
		"mtime": "2026-09-09T17:31:32.903Z",
		"size": 217,
		"path": "../public/assets/chart-no-axes-column-increasing-Klwwk7w3.js"
	},
	"/assets/check-CCy2ox4b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c-KGWDWXSc/SAgW4zPP5kvBnhtKaA\"",
		"mtime": "2026-09-09T17:31:32.903Z",
		"size": 124,
		"path": "../public/assets/check-CCy2ox4b.js"
	},
	"/assets/compass-BSwcFPjt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-Dz18uIooJeV05JtiQIvHy27U65Y\"",
		"mtime": "2026-09-09T17:31:32.903Z",
		"size": 251,
		"path": "../public/assets/compass-BSwcFPjt.js"
	},
	"/assets/createLucideIcon-CEGepnBf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ab-9w7034WUPiHI10TPGK6P975saJ0\"",
		"mtime": "2026-09-09T17:31:32.903Z",
		"size": 1195,
		"path": "../public/assets/createLucideIcon-CEGepnBf.js"
	},
	"/assets/credit-card-T4PSeN2q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-Gmp8mAEUgVA2YTtxZKbrK+z1/lY\"",
		"mtime": "2026-09-09T17:31:32.903Z",
		"size": 207,
		"path": "../public/assets/credit-card-T4PSeN2q.js"
	},
	"/assets/index-BKV59txD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"55994-NMa6vP6pQvmeI048jQRNVB5IcRE\"",
		"mtime": "2026-09-09T17:31:32.902Z",
		"size": 350612,
		"path": "../public/assets/index-BKV59txD.js"
	},
	"/assets/jsx-runtime-Cltr0gcK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20ee-ObwGPj96dlkL76iVLbX2wLAXzuw\"",
		"mtime": "2026-09-09T17:31:32.903Z",
		"size": 8430,
		"path": "../public/assets/jsx-runtime-Cltr0gcK.js"
	},
	"/assets/link-CKQMLqzL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"53c4-8aFwqd7yOh48/fxkRTTEwchByVI\"",
		"mtime": "2026-09-09T17:31:32.903Z",
		"size": 21444,
		"path": "../public/assets/link-CKQMLqzL.js"
	},
	"/assets/loader-circle-LmZjNfAe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-sJcskFe9MqqdeLTvIyYy3gYFP80\"",
		"mtime": "2026-09-09T17:31:32.903Z",
		"size": 144,
		"path": "../public/assets/loader-circle-LmZjNfAe.js"
	},
	"/assets/log-out-ORTi8ClS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-3wRLfeFfa38+5PdCAFpChUSqzoI\"",
		"mtime": "2026-09-09T17:31:32.903Z",
		"size": 230,
		"path": "../public/assets/log-out-ORTi8ClS.js"
	},
	"/assets/mail-DUe2Erw0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-c1O7U3Mx/a0OU9dkvlHx1WVt42Q\"",
		"mtime": "2026-09-09T17:31:32.903Z",
		"size": 213,
		"path": "../public/assets/mail-DUe2Erw0.js"
	},
	"/assets/monetization-DabKtcvu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e0-V7FEhXU0EJGh08NNy3bWxMAQ4Fk\"",
		"mtime": "2026-09-09T17:31:32.903Z",
		"size": 736,
		"path": "../public/assets/monetization-DabKtcvu.js"
	},
	"/assets/onboarding-BRoKIxGT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d89-/QTFobujzxP/H+ADEotZn/8gUG8\"",
		"mtime": "2026-09-09T17:31:32.903Z",
		"size": 7561,
		"path": "../public/assets/onboarding-BRoKIxGT.js"
	},
	"/assets/phone-CA_HO8J9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"461-3a/uodZI4BlnfSX35HW9L+ReTzc\"",
		"mtime": "2026-09-09T17:31:32.903Z",
		"size": 1121,
		"path": "../public/assets/phone-CA_HO8J9.js"
	},
	"/assets/policies-Bvtxzv6J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4349-qRMpFAds0r9A7qtOx0V+GFX8ytE\"",
		"mtime": "2026-09-09T17:31:32.904Z",
		"size": 17225,
		"path": "../public/assets/policies-Bvtxzv6J.js"
	},
	"/assets/pricing-D2EdDVmz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"183d-bscY44rXzi3mEwuRqvTAAeHoVE8\"",
		"mtime": "2026-09-09T17:31:32.904Z",
		"size": 6205,
		"path": "../public/assets/pricing-D2EdDVmz.js"
	},
	"/assets/routes-DWT18vcK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1753-lGhrt+uDY88D126vh6yH5X7HcHc\"",
		"mtime": "2026-09-09T17:31:32.904Z",
		"size": 5971,
		"path": "../public/assets/routes-DWT18vcK.js"
	},
	"/assets/save-DWdmpGqL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-ztkSjfyPW3jcI/H3WSETwHgmaxk\"",
		"mtime": "2026-09-09T17:31:32.904Z",
		"size": 327,
		"path": "../public/assets/save-DWdmpGqL.js"
	},
	"/assets/search-B10CUpjR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-3DqTlc8U1f/UJVNuEwVGPSFg+Zw\"",
		"mtime": "2026-09-09T17:31:32.904Z",
		"size": 174,
		"path": "../public/assets/search-B10CUpjR.js"
	},
	"/assets/security-D5e7xtFC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"197c-x8G6AVTC6CSEQQdUSHmmnap9CgM\"",
		"mtime": "2026-09-09T17:31:32.904Z",
		"size": 6524,
		"path": "../public/assets/security-D5e7xtFC.js"
	},
	"/assets/send-C1wOFq8M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-axmNEtcrilTGXvQcLgSNGoNaH9c\"",
		"mtime": "2026-09-09T17:31:32.904Z",
		"size": 290,
		"path": "../public/assets/send-C1wOFq8M.js"
	},
	"/assets/shield-O49Fg52t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"110-Usn7MmeYoZIwMzj1hQE/o/HUogo\"",
		"mtime": "2026-09-09T17:31:32.904Z",
		"size": 272,
		"path": "../public/assets/shield-O49Fg52t.js"
	},
	"/assets/sliders-horizontal-D0DEHE4j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66a-H49rtCEeWgjNSlZn88DW/u+RAF4\"",
		"mtime": "2026-09-09T17:31:32.904Z",
		"size": 1642,
		"path": "../public/assets/sliders-horizontal-D0DEHE4j.js"
	},
	"/assets/sparkles-C-wfMPnb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-xdKjJ3+/+dRDz1GpNZV6deESOBM\"",
		"mtime": "2026-09-09T17:31:32.904Z",
		"size": 494,
		"path": "../public/assets/sparkles-C-wfMPnb.js"
	},
	"/assets/styles-0qCSypZu.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"d412-vEPx/2RALYTNawq2bDsFmC+qkYk\"",
		"mtime": "2026-09-09T17:31:32.904Z",
		"size": 54290,
		"path": "../public/assets/styles-0qCSypZu.css"
	},
	"/assets/supabase-DTorYgRt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33e0c-NBytwoKRb9Kw0RozhUQTPDurW9Y\"",
		"mtime": "2026-09-09T17:31:32.904Z",
		"size": 212492,
		"path": "../public/assets/supabase-DTorYgRt.js"
	},
	"/assets/terms-BRdJEA--.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f21-zfH9afbP6oQ6Vprcn1K9GpfOYXI\"",
		"mtime": "2026-09-09T17:31:32.904Z",
		"size": 7969,
		"path": "../public/assets/terms-BRdJEA--.js"
	},
	"/assets/theme-DqD5jDaL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15a2-Z/3wV0+S/7u9nf5bIeDhlMe6YCg\"",
		"mtime": "2026-09-09T17:31:32.904Z",
		"size": 5538,
		"path": "../public/assets/theme-DqD5jDaL.js"
	},
	"/assets/trending-up-9fTZhAs5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"af-MXfPw6K0UXbLnVQN7N5iGkvD32Q\"",
		"mtime": "2026-09-09T17:31:32.904Z",
		"size": 175,
		"path": "../public/assets/trending-up-9fTZhAs5.js"
	},
	"/assets/useMatch-CU29MQY4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"257-AZNrobS0eJgmU28EQ2OgOzvWiKg\"",
		"mtime": "2026-09-09T17:31:32.904Z",
		"size": 599,
		"path": "../public/assets/useMatch-CU29MQY4.js"
	},
	"/assets/useMonetization-DRjRWfNW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e2-8mC30gQlPkqezUoHJQQTJ/X6NIw\"",
		"mtime": "2026-09-09T17:31:32.904Z",
		"size": 738,
		"path": "../public/assets/useMonetization-DRjRWfNW.js"
	},
	"/assets/useMutation-DwpZdMzz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"927-39X+HCnUXJtk1ZeFH+b7BTPWCf8\"",
		"mtime": "2026-09-09T17:31:32.904Z",
		"size": 2343,
		"path": "../public/assets/useMutation-DwpZdMzz.js"
	},
	"/assets/useQuery-DmZyFyf6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f88-fi1phOjb1itJwi7siTRJySXtMmM\"",
		"mtime": "2026-09-09T17:31:32.904Z",
		"size": 8072,
		"path": "../public/assets/useQuery-DmZyFyf6.js"
	},
	"/assets/useRouter-CwjitLz4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"97-RAU16egCj2YoU17v/JNQx0lTbng\"",
		"mtime": "2026-09-09T17:31:32.904Z",
		"size": 151,
		"path": "../public/assets/useRouter-CwjitLz4.js"
	},
	"/assets/user-dmWph8jC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-msTozB54YMCdQI76vDh9PV7MCOI\"",
		"mtime": "2026-09-09T17:31:32.904Z",
		"size": 196,
		"path": "../public/assets/user-dmWph8jC.js"
	},
	"/assets/users-ByQQ79Dh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-D4tkZLwnv3uIaly6ENwmKRNmiAQ\"",
		"mtime": "2026-09-09T17:31:32.904Z",
		"size": 306,
		"path": "../public/assets/users-ByQQ79Dh.js"
	},
	"/assets/x-_CKTk_uH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-CuIL3t3oFedpuLZG2cTjjUn7Srw\"",
		"mtime": "2026-09-09T17:31:32.904Z",
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
