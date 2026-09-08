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
		"mtime": "2026-09-08T03:52:13.629Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-08T03:52:13.629Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/BrandProfileModal-CNfbIPUW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"425f-561tYBA7qHNXFq2IW3xODNrvc/I\"",
		"mtime": "2026-09-08T03:52:12.848Z",
		"size": 16991,
		"path": "../public/assets/BrandProfileModal-CNfbIPUW.js"
	},
	"/assets/_dashboard-BmWFiIcJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2cf5-bpdcEKlfN/Lt7UNnnDgZn2AVr0M\"",
		"mtime": "2026-09-08T03:52:12.848Z",
		"size": 11509,
		"path": "../public/assets/_dashboard-BmWFiIcJ.js"
	},
	"/assets/_dashboard.dashboard-BS7ncGY-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f07-vrmpaGZBG1NZxelQaNXPqVM/kG0\"",
		"mtime": "2026-09-08T03:52:12.848Z",
		"size": 7943,
		"path": "../public/assets/_dashboard.dashboard-BS7ncGY-.js"
	},
	"/assets/_dashboard.discover-BSA1Lg-D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5995-wUXswA98w6pbD6i8KWcoRsEv2xw\"",
		"mtime": "2026-09-08T03:52:12.848Z",
		"size": 22933,
		"path": "../public/assets/_dashboard.discover-BSA1Lg-D.js"
	},
	"/assets/_dashboard.for-you-_K-uMSeS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3760-wUbWoEBLOjZ7JpWPnDC7dHxxDV4\"",
		"mtime": "2026-09-08T03:52:12.848Z",
		"size": 14176,
		"path": "../public/assets/_dashboard.for-you-_K-uMSeS.js"
	},
	"/assets/_dashboard.profile-HsmQksim.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cef-s0TBLO6mLPxXgC9qvBA01wOS+vk\"",
		"mtime": "2026-09-08T03:52:12.849Z",
		"size": 7407,
		"path": "../public/assets/_dashboard.profile-HsmQksim.js"
	},
	"/assets/_dashboard.saved-BhMJ5S-H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5eee-s5U37kLCjyzu/9/ODgjjuocaxkk\"",
		"mtime": "2026-09-08T03:52:12.849Z",
		"size": 24302,
		"path": "../public/assets/_dashboard.saved-BhMJ5S-H.js"
	},
	"/assets/_dashboard.outreach-D3y4af-G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a6ab-u7C3t4xsJRpV/lWRdRgxdR0OlDU\"",
		"mtime": "2026-09-08T03:52:12.849Z",
		"size": 42667,
		"path": "../public/assets/_dashboard.outreach-D3y4af-G.js"
	},
	"/assets/_dashboard.team-DMguaIsH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2422-vyrk/ZWI23nUbmlBBOGvrGEDGTI\"",
		"mtime": "2026-09-08T03:52:12.849Z",
		"size": 9250,
		"path": "../public/assets/_dashboard.team-DMguaIsH.js"
	},
	"/assets/_dashboard.settings-Dd6dwECX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6850-NSuS7KHDeUCTk93RdLCXFAd4uMA\"",
		"mtime": "2026-09-08T03:52:12.849Z",
		"size": 26704,
		"path": "../public/assets/_dashboard.settings-Dd6dwECX.js"
	},
	"/assets/actions-DkbsB6oR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"130f-4JGU4Q85TtPHbG84Tq7Td6z0NO8\"",
		"mtime": "2026-09-08T03:52:12.849Z",
		"size": 4879,
		"path": "../public/assets/actions-DkbsB6oR.js"
	},
	"/assets/arrow-right-BeRVpgVc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-I66/Z2EpfMx8BGgavY1W2Eke96Q\"",
		"mtime": "2026-09-08T03:52:12.849Z",
		"size": 165,
		"path": "../public/assets/arrow-right-BeRVpgVc.js"
	},
	"/assets/admin-bdMsIme2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4aec-D1lXMET9K/9SM22e8vV3TP7su20\"",
		"mtime": "2026-09-08T03:52:12.849Z",
		"size": 19180,
		"path": "../public/assets/admin-bdMsIme2.js"
	},
	"/assets/bookmark-DW2tSGOY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-Hz/8lB4r6SP+49oOwjo9TwH5kJE\"",
		"mtime": "2026-09-08T03:52:12.849Z",
		"size": 230,
		"path": "../public/assets/bookmark-DW2tSGOY.js"
	},
	"/assets/building-2-DtlKDAcU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17f-Ix08qirRJjpmEBPQLj2MkBJgdB4\"",
		"mtime": "2026-09-08T03:52:12.849Z",
		"size": 383,
		"path": "../public/assets/building-2-DtlKDAcU.js"
	},
	"/assets/auth-Dd_8QO0D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34b2-HvL1vjVmSLpIDYPl1Wx/li63N/E\"",
		"mtime": "2026-09-08T03:52:12.849Z",
		"size": 13490,
		"path": "../public/assets/auth-Dd_8QO0D.js"
	},
	"/assets/calendar-CZclbofY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"101-+gHrQyG7Z2KuX+dM9giMLSkR6m4\"",
		"mtime": "2026-09-08T03:52:12.849Z",
		"size": 257,
		"path": "../public/assets/calendar-CZclbofY.js"
	},
	"/assets/chart-no-axes-column-increasing-DD7wD4tZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d9-p4pWIwRtylp3Ej1LRnnqcm76k7E\"",
		"mtime": "2026-09-08T03:52:12.849Z",
		"size": 217,
		"path": "../public/assets/chart-no-axes-column-increasing-DD7wD4tZ.js"
	},
	"/assets/check-CJ6mA__T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c-P/tsEPzG/PMtwtkzWVO6smHIVYM\"",
		"mtime": "2026-09-08T03:52:12.849Z",
		"size": 124,
		"path": "../public/assets/check-CJ6mA__T.js"
	},
	"/assets/clock-BpxvNw8t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d1-ZGwBq9YIIPPROgNyhVCBpG5qht4\"",
		"mtime": "2026-09-08T03:52:12.849Z",
		"size": 465,
		"path": "../public/assets/clock-BpxvNw8t.js"
	},
	"/assets/compass-BgPFnzN0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-51xjJvaHnpQ0llVIgGSHx9RVpAo\"",
		"mtime": "2026-09-08T03:52:12.849Z",
		"size": 251,
		"path": "../public/assets/compass-BgPFnzN0.js"
	},
	"/assets/constants-BwUKYOFI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f9-5MgS4jdtFjxcgKEPvoPIwNtW2Sc\"",
		"mtime": "2026-09-08T03:52:12.849Z",
		"size": 761,
		"path": "../public/assets/constants-BwUKYOFI.js"
	},
	"/assets/createLucideIcon-C-so-e7F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4af-d0qudJwEnLLmPOFaysGXRnxa/DE\"",
		"mtime": "2026-09-08T03:52:12.849Z",
		"size": 1199,
		"path": "../public/assets/createLucideIcon-C-so-e7F.js"
	},
	"/assets/credit-card-BrbVIf0e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-Vk50Eh9UPWfzViTVfDPQxa1HrvM\"",
		"mtime": "2026-09-08T03:52:12.849Z",
		"size": 207,
		"path": "../public/assets/credit-card-BrbVIf0e.js"
	},
	"/assets/jsx-dev-runtime-BN4uJXNV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6515-zghcjQsxeXRjfbtdMV6VcdqA64o\"",
		"mtime": "2026-09-08T03:52:12.849Z",
		"size": 25877,
		"path": "../public/assets/jsx-dev-runtime-BN4uJXNV.js"
	},
	"/assets/link-1pE965Pq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"55b5-NRhQyKZIgA/GqDvc2QJN8/3ZI20\"",
		"mtime": "2026-09-08T03:52:12.849Z",
		"size": 21941,
		"path": "../public/assets/link-1pE965Pq.js"
	},
	"/assets/jsx-runtime-CyVFUO3U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14f7-xHr95lUrS9DUWTgDsrwGa8htBQ0\"",
		"mtime": "2026-09-08T03:52:12.849Z",
		"size": 5367,
		"path": "../public/assets/jsx-runtime-CyVFUO3U.js"
	},
	"/assets/loader-circle-B2lAyaPL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-3VDCn5w5suzzG2YEVpt2YZ0mC/Y\"",
		"mtime": "2026-09-08T03:52:12.849Z",
		"size": 144,
		"path": "../public/assets/loader-circle-B2lAyaPL.js"
	},
	"/assets/mail-DzZ6hBqr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-wzYRiD0sikUG5h2kQdL15rhu7DI\"",
		"mtime": "2026-09-08T03:52:12.849Z",
		"size": 213,
		"path": "../public/assets/mail-DzZ6hBqr.js"
	},
	"/assets/monetization-DabKtcvu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e0-V7FEhXU0EJGh08NNy3bWxMAQ4Fk\"",
		"mtime": "2026-09-08T03:52:12.849Z",
		"size": 736,
		"path": "../public/assets/monetization-DabKtcvu.js"
	},
	"/assets/not-found-DIgawKw1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37-RTB6YH5iXRKeXz1Sn6ZQ+vS0lnc\"",
		"mtime": "2026-09-08T03:52:12.849Z",
		"size": 55,
		"path": "../public/assets/not-found-DIgawKw1.js"
	},
	"/assets/onboarding-C0MR44wz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2573-2peIvVktAqRDyTjmLhMXBpL8is0\"",
		"mtime": "2026-09-08T03:52:12.849Z",
		"size": 9587,
		"path": "../public/assets/onboarding-C0MR44wz.js"
	},
	"/assets/pricing-RAf4uqmi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22c6-pGkP/M06zZKKuTFd4G7VMA88h54\"",
		"mtime": "2026-09-08T03:52:12.850Z",
		"size": 8902,
		"path": "../public/assets/pricing-RAf4uqmi.js"
	},
	"/assets/redirect-D265Jhw1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"203-YoYuk06AnMmFcPdOTdn8l0z9hB0\"",
		"mtime": "2026-09-08T03:52:12.850Z",
		"size": 515,
		"path": "../public/assets/redirect-D265Jhw1.js"
	},
	"/assets/routes-D5w4q8SG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21e1-YmG7f9s1ACfdnDyp1k/162O/jYg\"",
		"mtime": "2026-09-08T03:52:12.850Z",
		"size": 8673,
		"path": "../public/assets/routes-D5w4q8SG.js"
	},
	"/assets/save-iNOlvxt3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-SlvmD48y+bf6TE7LYdLxBsAh2Sc\"",
		"mtime": "2026-09-08T03:52:12.850Z",
		"size": 327,
		"path": "../public/assets/save-iNOlvxt3.js"
	},
	"/assets/search-C_qdBvVP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16b-DuEcdJNre4e9UQTekPr5JSn5H14\"",
		"mtime": "2026-09-08T03:52:12.850Z",
		"size": 363,
		"path": "../public/assets/search-C_qdBvVP.js"
	},
	"/assets/send-Crmo_tpU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-SbIYMCodIrAyBrc094v3QtbM780\"",
		"mtime": "2026-09-08T03:52:12.850Z",
		"size": 290,
		"path": "../public/assets/send-Crmo_tpU.js"
	},
	"/assets/shield-CQjJCYRB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"110-fHoCQO7zOMbvU2ff+KidcftT/s4\"",
		"mtime": "2026-09-08T03:52:12.850Z",
		"size": 272,
		"path": "../public/assets/shield-CQjJCYRB.js"
	},
	"/assets/sliders-horizontal-Bo6o7MJI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66a-PpE722zle4nk0NovmqcuOlid+VI\"",
		"mtime": "2026-09-08T03:52:12.850Z",
		"size": 1642,
		"path": "../public/assets/sliders-horizontal-Bo6o7MJI.js"
	},
	"/assets/sparkles-DnQVlx0k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-aae1Ij2aG5QtbjE3vpyblpXzDCM\"",
		"mtime": "2026-09-08T03:52:12.850Z",
		"size": 494,
		"path": "../public/assets/sparkles-DnQVlx0k.js"
	},
	"/assets/styles-BVKqJ4P9.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"d7fd-1fq+jJZNKxN2CKL/MaJ/BBnpc7s\"",
		"mtime": "2026-09-08T03:52:12.850Z",
		"size": 55293,
		"path": "../public/assets/styles-BVKqJ4P9.css"
	},
	"/assets/sun-Chlw1ExS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f1-V8/ao8UmlTxqu3vVeeJHU+OmVX4\"",
		"mtime": "2026-09-08T03:52:12.850Z",
		"size": 1009,
		"path": "../public/assets/sun-Chlw1ExS.js"
	},
	"/assets/supabase-ClxXyGWb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33e0c-D/9byBMn7zXP3Tkbr7wps9GesbA\"",
		"mtime": "2026-09-08T03:52:12.850Z",
		"size": 212492,
		"path": "../public/assets/supabase-ClxXyGWb.js"
	},
	"/assets/trending-up-OGSctlhb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"af-aXUhkIM5jsuK49UdHHGELKFulzs\"",
		"mtime": "2026-09-08T03:52:12.850Z",
		"size": 175,
		"path": "../public/assets/trending-up-OGSctlhb.js"
	},
	"/assets/useMatch-szM5JRPq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ae-N1g5iWKd+kclUA6ltz0pNlTP/2M\"",
		"mtime": "2026-09-08T03:52:12.850Z",
		"size": 942,
		"path": "../public/assets/useMatch-szM5JRPq.js"
	},
	"/assets/useMonetization-DCuDPcRX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e2-qv3YUCKnE3dJYsf6cnzvaK50FM0\"",
		"mtime": "2026-09-08T03:52:12.850Z",
		"size": 738,
		"path": "../public/assets/useMonetization-DCuDPcRX.js"
	},
	"/assets/index-CWk80wST.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"86813-7fbUtmOHiLCP7OuVqHKiEyZnGC4\"",
		"mtime": "2026-09-08T03:52:12.848Z",
		"size": 550931,
		"path": "../public/assets/index-CWk80wST.js"
	},
	"/assets/useMutation-DhpHuRkk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"92b-yo5lz7PPBAD0qaxbXMrxcKblgdY\"",
		"mtime": "2026-09-08T03:52:12.850Z",
		"size": 2347,
		"path": "../public/assets/useMutation-DhpHuRkk.js"
	},
	"/assets/useQuery-oi5YnPGk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2229-0Qk/1MUMK7GuU2R+xGj3qqQqhL8\"",
		"mtime": "2026-09-08T03:52:12.850Z",
		"size": 8745,
		"path": "../public/assets/useQuery-oi5YnPGk.js"
	},
	"/assets/user-CCuPUL_2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-6w1EvGMXRKzg9waKgTIX5eAk68Y\"",
		"mtime": "2026-09-08T03:52:12.850Z",
		"size": 196,
		"path": "../public/assets/user-CCuPUL_2.js"
	},
	"/assets/useRouter-l_j_2ZPr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10a-mJn0UjXYhaRa8jnoevRLr8Vfj6I\"",
		"mtime": "2026-09-08T03:52:12.850Z",
		"size": 266,
		"path": "../public/assets/useRouter-l_j_2ZPr.js"
	},
	"/assets/users-CdtFiOjL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-Q0u0q9vttM7maGVojMjPzzrCat4\"",
		"mtime": "2026-09-08T03:52:12.850Z",
		"size": 306,
		"path": "../public/assets/users-CdtFiOjL.js"
	},
	"/assets/utils-DOxJr7TG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d65-N/Upz3VmMhYB3amgBqQVTIou9qI\"",
		"mtime": "2026-09-08T03:52:12.850Z",
		"size": 3429,
		"path": "../public/assets/utils-DOxJr7TG.js"
	},
	"/assets/x-vg-THGOt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-uOkEog6qSkBdEFC6b0Qs6IkltMI\"",
		"mtime": "2026-09-08T03:52:12.850Z",
		"size": 154,
		"path": "../public/assets/x-vg-THGOt.js"
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
