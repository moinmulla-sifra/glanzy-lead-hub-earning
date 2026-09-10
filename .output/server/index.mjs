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
		"mtime": "2026-09-10T12:23:51.827Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/LegalLayout-DUq55HHC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"118a-098ODQCP/Yh+xGTPbFSjbeBYrrU\"",
		"mtime": "2026-09-10T12:23:50.524Z",
		"size": 4490,
		"path": "../public/assets/LegalLayout-DUq55HHC.js"
	},
	"/sw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-1tPdHx8K7r6W0Zav5Gjb/bKbzJA\"",
		"mtime": "2026-09-10T12:23:51.827Z",
		"size": 156,
		"path": "../public/sw.js"
	},
	"/assets/_dashboard-DLEufFGE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37e9-WQLj032raIpkhDs2ZbyZQqLo2Yc\"",
		"mtime": "2026-09-10T12:23:50.524Z",
		"size": 14313,
		"path": "../public/assets/_dashboard-DLEufFGE.js"
	},
	"/assets/_dashboard.contacted-CD5O_6WU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a772-5Z6ymEMScF4RI9KAmjbcDO7JZmc\"",
		"mtime": "2026-09-10T12:23:50.524Z",
		"size": 42866,
		"path": "../public/assets/_dashboard.contacted-CD5O_6WU.js"
	},
	"/assets/_dashboard.dashboard-MpVeUp4T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f07-TvGFnxbZmODAdnJk1kNOzbbjRIM\"",
		"mtime": "2026-09-10T12:23:50.524Z",
		"size": 7943,
		"path": "../public/assets/_dashboard.dashboard-MpVeUp4T.js"
	},
	"/assets/_dashboard.discover-D2Cxn5qY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"582a-Vx5PZV9iWzGzwHr5oRJWPZmrKDI\"",
		"mtime": "2026-09-10T12:23:50.524Z",
		"size": 22570,
		"path": "../public/assets/_dashboard.discover-D2Cxn5qY.js"
	},
	"/assets/_dashboard.for-you-hVlY6Pm9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"355a-+GYT9FHcV5j2EKSNX/MIaKdIsZw\"",
		"mtime": "2026-09-10T12:23:50.524Z",
		"size": 13658,
		"path": "../public/assets/_dashboard.for-you-hVlY6Pm9.js"
	},
	"/assets/_dashboard.profile-CVTJHB7v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f66-fBX3mzjmqlAAYACnqCEOA102hLw\"",
		"mtime": "2026-09-10T12:23:50.524Z",
		"size": 8038,
		"path": "../public/assets/_dashboard.profile-CVTJHB7v.js"
	},
	"/assets/_dashboard.saved-Bhj86Dry.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5cbd-s3Jvsxdvn9Jjdgg1y34+UXhmiZ8\"",
		"mtime": "2026-09-10T12:23:50.524Z",
		"size": 23741,
		"path": "../public/assets/_dashboard.saved-Bhj86Dry.js"
	},
	"/assets/_dashboard.settings-CYbX_Gw-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9252-3msyYpp+U2nIr2StwmoBhCoMoiA\"",
		"mtime": "2026-09-10T12:23:50.524Z",
		"size": 37458,
		"path": "../public/assets/_dashboard.settings-CYbX_Gw-.js"
	},
	"/assets/_dashboard.team-DGZ9INx2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"243e-X8fy4M2YlvJIxsx73KMrhCOAR6E\"",
		"mtime": "2026-09-10T12:23:50.525Z",
		"size": 9278,
		"path": "../public/assets/_dashboard.team-DGZ9INx2.js"
	},
	"/assets/BrandProfileModal-8lflRzJw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9542-+M2gJTOG1C5cOUL9OYqrv+YPWto\"",
		"mtime": "2026-09-10T12:23:50.524Z",
		"size": 38210,
		"path": "../public/assets/BrandProfileModal-8lflRzJw.js"
	},
	"/assets/about-Rljsdgs1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3bf3-abFVvlQqcXNw/U5BOXHtwP38ORU\"",
		"mtime": "2026-09-10T12:23:50.525Z",
		"size": 15347,
		"path": "../public/assets/about-Rljsdgs1.js"
	},
	"/assets/bookmark-DW2tSGOY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-Hz/8lB4r6SP+49oOwjo9TwH5kJE\"",
		"mtime": "2026-09-10T12:23:50.525Z",
		"size": 230,
		"path": "../public/assets/bookmark-DW2tSGOY.js"
	},
	"/assets/building-2-DtlKDAcU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17f-Ix08qirRJjpmEBPQLj2MkBJgdB4\"",
		"mtime": "2026-09-10T12:23:50.525Z",
		"size": 383,
		"path": "../public/assets/building-2-DtlKDAcU.js"
	},
	"/assets/calendar-CZclbofY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"101-+gHrQyG7Z2KuX+dM9giMLSkR6m4\"",
		"mtime": "2026-09-10T12:23:50.525Z",
		"size": 257,
		"path": "../public/assets/calendar-CZclbofY.js"
	},
	"/assets/chart-no-axes-column-increasing-DD7wD4tZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d9-p4pWIwRtylp3Ej1LRnnqcm76k7E\"",
		"mtime": "2026-09-10T12:23:50.525Z",
		"size": 217,
		"path": "../public/assets/chart-no-axes-column-increasing-DD7wD4tZ.js"
	},
	"/assets/check-CJ6mA__T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c-P/tsEPzG/PMtwtkzWVO6smHIVYM\"",
		"mtime": "2026-09-10T12:23:50.525Z",
		"size": 124,
		"path": "../public/assets/check-CJ6mA__T.js"
	},
	"/assets/compass-BgPFnzN0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-51xjJvaHnpQ0llVIgGSHx9RVpAo\"",
		"mtime": "2026-09-10T12:23:50.525Z",
		"size": 251,
		"path": "../public/assets/compass-BgPFnzN0.js"
	},
	"/assets/createLucideIcon-C-so-e7F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4af-d0qudJwEnLLmPOFaysGXRnxa/DE\"",
		"mtime": "2026-09-10T12:23:50.525Z",
		"size": 1199,
		"path": "../public/assets/createLucideIcon-C-so-e7F.js"
	},
	"/assets/arrow-right-BeRVpgVc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-I66/Z2EpfMx8BGgavY1W2Eke96Q\"",
		"mtime": "2026-09-10T12:23:50.525Z",
		"size": 165,
		"path": "../public/assets/arrow-right-BeRVpgVc.js"
	},
	"/assets/auth-BBAV388X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3211-VsOs6Ivww7WuKByDmAV17SuNTCY\"",
		"mtime": "2026-09-10T12:23:50.525Z",
		"size": 12817,
		"path": "../public/assets/auth-BBAV388X.js"
	},
	"/assets/admin-CTi-Tft5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1917-oCZN6NvSfhwWwe1awJJZenecZFY\"",
		"mtime": "2026-09-10T12:23:50.525Z",
		"size": 6423,
		"path": "../public/assets/admin-CTi-Tft5.js"
	},
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"a5cd3-4CB4dqsC4nJHzw8R5fK0xD8+fzo\"",
		"mtime": "2026-09-10T12:23:51.827Z",
		"size": 679123,
		"path": "../public/favicon.png"
	},
	"/assets/credit-card-BrbVIf0e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-Vk50Eh9UPWfzViTVfDPQxa1HrvM\"",
		"mtime": "2026-09-10T12:23:50.525Z",
		"size": 207,
		"path": "../public/assets/credit-card-BrbVIf0e.js"
	},
	"/assets/info-Bs78oyN2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cc-chQsGilxITj8jpFaI2rFXj0j8b8\"",
		"mtime": "2026-09-10T12:23:50.525Z",
		"size": 204,
		"path": "../public/assets/info-Bs78oyN2.js"
	},
	"/assets/jsx-dev-runtime-BN4uJXNV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6515-zghcjQsxeXRjfbtdMV6VcdqA64o\"",
		"mtime": "2026-09-10T12:23:50.525Z",
		"size": 25877,
		"path": "../public/assets/jsx-dev-runtime-BN4uJXNV.js"
	},
	"/assets/jsx-runtime-CyVFUO3U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14f7-xHr95lUrS9DUWTgDsrwGa8htBQ0\"",
		"mtime": "2026-09-10T12:23:50.525Z",
		"size": 5367,
		"path": "../public/assets/jsx-runtime-CyVFUO3U.js"
	},
	"/assets/link-Ie0pT_3L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"62ea-jJLWP6AblrGcX46BIUBdkj8ajsI\"",
		"mtime": "2026-09-10T12:23:50.525Z",
		"size": 25322,
		"path": "../public/assets/link-Ie0pT_3L.js"
	},
	"/assets/loader-circle-B2lAyaPL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-3VDCn5w5suzzG2YEVpt2YZ0mC/Y\"",
		"mtime": "2026-09-10T12:23:50.525Z",
		"size": 144,
		"path": "../public/assets/loader-circle-B2lAyaPL.js"
	},
	"/assets/log-out-CygjK5kZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-oindVa7y49DtIE2DNpABmOQs4DE\"",
		"mtime": "2026-09-10T12:23:50.525Z",
		"size": 230,
		"path": "../public/assets/log-out-CygjK5kZ.js"
	},
	"/assets/mail-DzZ6hBqr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-wzYRiD0sikUG5h2kQdL15rhu7DI\"",
		"mtime": "2026-09-10T12:23:50.525Z",
		"size": 213,
		"path": "../public/assets/mail-DzZ6hBqr.js"
	},
	"/assets/monetization-DabKtcvu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e0-V7FEhXU0EJGh08NNy3bWxMAQ4Fk\"",
		"mtime": "2026-09-10T12:23:50.525Z",
		"size": 736,
		"path": "../public/assets/monetization-DabKtcvu.js"
	},
	"/assets/onboarding-Tf248rnp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2822-hDbPU0pc1FM7bAv5D4Wy4KcW24Q\"",
		"mtime": "2026-09-10T12:23:50.525Z",
		"size": 10274,
		"path": "../public/assets/onboarding-Tf248rnp.js"
	},
	"/assets/phone-DEmgT3P7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"461-e8J8VhqI8xMC5lhlTbSQ9XoGVCY\"",
		"mtime": "2026-09-10T12:23:50.525Z",
		"size": 1121,
		"path": "../public/assets/phone-DEmgT3P7.js"
	},
	"/assets/policies-CJntD5vW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"615d-DJDVJCFgSjc19ini6VfJln4GZcs\"",
		"mtime": "2026-09-10T12:23:50.525Z",
		"size": 24925,
		"path": "../public/assets/policies-CJntD5vW.js"
	},
	"/assets/pricing-CF9h2UMz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22c6-C5SEgbYKIsN/oxvjJQzVXqxHGkw\"",
		"mtime": "2026-09-10T12:23:50.525Z",
		"size": 8902,
		"path": "../public/assets/pricing-CF9h2UMz.js"
	},
	"/assets/routes-6HgbtOnT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"222a-PqOb4JLIfzZV1r3OSMqgpASiRaY\"",
		"mtime": "2026-09-10T12:23:50.526Z",
		"size": 8746,
		"path": "../public/assets/routes-6HgbtOnT.js"
	},
	"/assets/save-iNOlvxt3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-SlvmD48y+bf6TE7LYdLxBsAh2Sc\"",
		"mtime": "2026-09-10T12:23:50.526Z",
		"size": 327,
		"path": "../public/assets/save-iNOlvxt3.js"
	},
	"/assets/search-Cyq1P6QR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-5Grbz7GtldlWUMZxoZ/VWv3hae0\"",
		"mtime": "2026-09-10T12:23:50.526Z",
		"size": 174,
		"path": "../public/assets/search-Cyq1P6QR.js"
	},
	"/assets/security-CkASCtYC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24a2-dBnSUtbd3cUOvJqkyFgxZzbYJI8\"",
		"mtime": "2026-09-10T12:23:50.526Z",
		"size": 9378,
		"path": "../public/assets/security-CkASCtYC.js"
	},
	"/assets/send-Crmo_tpU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-SbIYMCodIrAyBrc094v3QtbM780\"",
		"mtime": "2026-09-10T12:23:50.526Z",
		"size": 290,
		"path": "../public/assets/send-Crmo_tpU.js"
	},
	"/assets/shield-CQjJCYRB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"110-fHoCQO7zOMbvU2ff+KidcftT/s4\"",
		"mtime": "2026-09-10T12:23:50.526Z",
		"size": 272,
		"path": "../public/assets/shield-CQjJCYRB.js"
	},
	"/assets/sliders-horizontal-BO7KtZ6b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66a-5M9p/5RohXipsdQlo6zHEEqGRA8\"",
		"mtime": "2026-09-10T12:23:50.526Z",
		"size": 1642,
		"path": "../public/assets/sliders-horizontal-BO7KtZ6b.js"
	},
	"/assets/sparkles-DnQVlx0k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-aae1Ij2aG5QtbjE3vpyblpXzDCM\"",
		"mtime": "2026-09-10T12:23:50.526Z",
		"size": 494,
		"path": "../public/assets/sparkles-DnQVlx0k.js"
	},
	"/assets/styles-BvxOqhd_.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"d807-cKnp32po/Bqq63mj+lRfkM/Qhsk\"",
		"mtime": "2026-09-10T12:23:50.527Z",
		"size": 55303,
		"path": "../public/assets/styles-BvxOqhd_.css"
	},
	"/assets/supabase-ClxXyGWb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33e0c-D/9byBMn7zXP3Tkbr7wps9GesbA\"",
		"mtime": "2026-09-10T12:23:50.526Z",
		"size": 212492,
		"path": "../public/assets/supabase-ClxXyGWb.js"
	},
	"/assets/terms-hWCPpwzA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b78-Le9r5rteCQG44tk9xMsYT3Uds74\"",
		"mtime": "2026-09-10T12:23:50.526Z",
		"size": 11128,
		"path": "../public/assets/terms-hWCPpwzA.js"
	},
	"/assets/index-CSpmUcP_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85ba9-9S4vADAGG0Y81OnKJMaexF8j7uI\"",
		"mtime": "2026-09-10T12:23:50.524Z",
		"size": 547753,
		"path": "../public/assets/index-CSpmUcP_.js"
	},
	"/assets/theme-nvo7oiL7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cd5-sOcmTIaoXDCUUpmqWhqNTDIgTY8\"",
		"mtime": "2026-09-10T12:23:50.526Z",
		"size": 7381,
		"path": "../public/assets/theme-nvo7oiL7.js"
	},
	"/assets/trending-up-OGSctlhb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"af-aXUhkIM5jsuK49UdHHGELKFulzs\"",
		"mtime": "2026-09-10T12:23:50.526Z",
		"size": 175,
		"path": "../public/assets/trending-up-OGSctlhb.js"
	},
	"/assets/useMatch-0nMY29ej.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"38d-GeFFbMzFYsrzywEjMPDnjnCxfjU\"",
		"mtime": "2026-09-10T12:23:50.526Z",
		"size": 909,
		"path": "../public/assets/useMatch-0nMY29ej.js"
	},
	"/assets/useMonetization-BHpDxFTC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e2-AklhnqSZW0QGJRjGguvDrvOrFG4\"",
		"mtime": "2026-09-10T12:23:50.526Z",
		"size": 738,
		"path": "../public/assets/useMonetization-BHpDxFTC.js"
	},
	"/assets/useMutation-9SfDHKqG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"92b-xSBJfZn49ohXTIz8mAy5cCabyoQ\"",
		"mtime": "2026-09-10T12:23:50.526Z",
		"size": 2347,
		"path": "../public/assets/useMutation-9SfDHKqG.js"
	},
	"/assets/useQuery-CFmNLy0w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2229-9Q7AdKSXXFDZNUvd43HTIvESEWE\"",
		"mtime": "2026-09-10T12:23:50.526Z",
		"size": 8745,
		"path": "../public/assets/useQuery-CFmNLy0w.js"
	},
	"/assets/useRouter-l_j_2ZPr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10a-mJn0UjXYhaRa8jnoevRLr8Vfj6I\"",
		"mtime": "2026-09-10T12:23:50.526Z",
		"size": 266,
		"path": "../public/assets/useRouter-l_j_2ZPr.js"
	},
	"/assets/user-CCuPUL_2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-6w1EvGMXRKzg9waKgTIX5eAk68Y\"",
		"mtime": "2026-09-10T12:23:50.526Z",
		"size": 196,
		"path": "../public/assets/user-CCuPUL_2.js"
	},
	"/assets/users-CdtFiOjL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-Q0u0q9vttM7maGVojMjPzzrCat4\"",
		"mtime": "2026-09-10T12:23:50.526Z",
		"size": 306,
		"path": "../public/assets/users-CdtFiOjL.js"
	},
	"/assets/x-vg-THGOt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-uOkEog6qSkBdEFC6b0Qs6IkltMI\"",
		"mtime": "2026-09-10T12:23:50.527Z",
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
