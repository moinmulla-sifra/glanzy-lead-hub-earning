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
		"etag": "\"cf-SN9PxAcW4Shht9Ja3+KObrOBKjE\"",
		"mtime": "2026-09-11T07:08:47.367Z",
		"size": 207,
		"path": "../public/robots.txt"
	},
	"/sitemap.xml": {
		"type": "application/xml",
		"etag": "\"4e1-e+jEe0vROJmbVVw1/cD/m0eH4mY\"",
		"mtime": "2026-09-11T07:08:47.367Z",
		"size": 1249,
		"path": "../public/sitemap.xml"
	},
	"/sw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-mUc6w02QGtOwmiPvWU5YSn3UjSw\"",
		"mtime": "2026-09-11T07:08:47.367Z",
		"size": 156,
		"path": "../public/sw.js"
	},
	"/assets/BrandProfileModal-DGcsiZLR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9542-LI6yidRR2jPOh6ZEURhI8ZbXLFo\"",
		"mtime": "2026-09-11T07:08:46.370Z",
		"size": 38210,
		"path": "../public/assets/BrandProfileModal-DGcsiZLR.js"
	},
	"/assets/LegalLayout-DUq55HHC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"118a-098ODQCP/Yh+xGTPbFSjbeBYrrU\"",
		"mtime": "2026-09-11T07:08:46.370Z",
		"size": 4490,
		"path": "../public/assets/LegalLayout-DUq55HHC.js"
	},
	"/assets/_dashboard-B_0ujK7c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3605-kBxIe3sO7eESAJEYkB1VkFBnt1I\"",
		"mtime": "2026-09-11T07:08:46.370Z",
		"size": 13829,
		"path": "../public/assets/_dashboard-B_0ujK7c.js"
	},
	"/assets/_dashboard.contacted-C6GeDmul.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a772-kQef/uKDKEY43iW3YTDv7pwhDVo\"",
		"mtime": "2026-09-11T07:08:46.370Z",
		"size": 42866,
		"path": "../public/assets/_dashboard.contacted-C6GeDmul.js"
	},
	"/assets/_dashboard.dashboard-Di8NeaNz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f07-/aqk4lUVVDDSanJKcPgc5neznCU\"",
		"mtime": "2026-09-11T07:08:46.370Z",
		"size": 7943,
		"path": "../public/assets/_dashboard.dashboard-Di8NeaNz.js"
	},
	"/assets/_dashboard.discover-DRw7i4yA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"582a-8FNiuQfHpmbnMyp33emgl0eMzxg\"",
		"mtime": "2026-09-11T07:08:46.371Z",
		"size": 22570,
		"path": "../public/assets/_dashboard.discover-DRw7i4yA.js"
	},
	"/assets/_dashboard.for-you-B-anx_Mj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"355a-K0Rw6aNrG7GBesJLBfpRJDqVBu8\"",
		"mtime": "2026-09-11T07:08:46.371Z",
		"size": 13658,
		"path": "../public/assets/_dashboard.for-you-B-anx_Mj.js"
	},
	"/assets/_dashboard.profile-77-U1qo5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f66-r/Sjo2BvtHiFhXUPq5Kk45wMAZ0\"",
		"mtime": "2026-09-11T07:08:46.371Z",
		"size": 8038,
		"path": "../public/assets/_dashboard.profile-77-U1qo5.js"
	},
	"/assets/_dashboard.saved-BIEhbjDN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5cbd-qBgnvpXV5kC8H/s+nPCINTQ+N54\"",
		"mtime": "2026-09-11T07:08:46.371Z",
		"size": 23741,
		"path": "../public/assets/_dashboard.saved-BIEhbjDN.js"
	},
	"/assets/_dashboard.settings-XXFTyStp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"93a0-cLXB932LOzglW8S9M6/BZy7Z9QA\"",
		"mtime": "2026-09-11T07:08:46.371Z",
		"size": 37792,
		"path": "../public/assets/_dashboard.settings-XXFTyStp.js"
	},
	"/assets/_dashboard.team-DIvYzjde.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"243e-qgE+WkFh1/b8lQRvnl1saTz4P5k\"",
		"mtime": "2026-09-11T07:08:46.371Z",
		"size": 9278,
		"path": "../public/assets/_dashboard.team-DIvYzjde.js"
	},
	"/assets/about-Rljsdgs1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3bf3-abFVvlQqcXNw/U5BOXHtwP38ORU\"",
		"mtime": "2026-09-11T07:08:46.371Z",
		"size": 15347,
		"path": "../public/assets/about-Rljsdgs1.js"
	},
	"/assets/admin-B4tXS5K9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1917-yFvCrG2Fh0iodf80ZLTC5JRB6BI\"",
		"mtime": "2026-09-11T07:08:46.371Z",
		"size": 6423,
		"path": "../public/assets/admin-B4tXS5K9.js"
	},
	"/assets/arrow-right-BeRVpgVc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-I66/Z2EpfMx8BGgavY1W2Eke96Q\"",
		"mtime": "2026-09-11T07:08:46.371Z",
		"size": 165,
		"path": "../public/assets/arrow-right-BeRVpgVc.js"
	},
	"/assets/auth-BAGjASlM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3211-TOSoUDfo6JlATNRJ4MCcSjN+4j8\"",
		"mtime": "2026-09-11T07:08:46.371Z",
		"size": 12817,
		"path": "../public/assets/auth-BAGjASlM.js"
	},
	"/assets/bookmark-DW2tSGOY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-Hz/8lB4r6SP+49oOwjo9TwH5kJE\"",
		"mtime": "2026-09-11T07:08:46.371Z",
		"size": 230,
		"path": "../public/assets/bookmark-DW2tSGOY.js"
	},
	"/assets/building-2-DtlKDAcU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17f-Ix08qirRJjpmEBPQLj2MkBJgdB4\"",
		"mtime": "2026-09-11T07:08:46.371Z",
		"size": 383,
		"path": "../public/assets/building-2-DtlKDAcU.js"
	},
	"/assets/calendar-CZclbofY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"101-+gHrQyG7Z2KuX+dM9giMLSkR6m4\"",
		"mtime": "2026-09-11T07:08:46.371Z",
		"size": 257,
		"path": "../public/assets/calendar-CZclbofY.js"
	},
	"/assets/chart-no-axes-column-increasing-DD7wD4tZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d9-p4pWIwRtylp3Ej1LRnnqcm76k7E\"",
		"mtime": "2026-09-11T07:08:46.371Z",
		"size": 217,
		"path": "../public/assets/chart-no-axes-column-increasing-DD7wD4tZ.js"
	},
	"/assets/check-CJ6mA__T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c-P/tsEPzG/PMtwtkzWVO6smHIVYM\"",
		"mtime": "2026-09-11T07:08:46.371Z",
		"size": 124,
		"path": "../public/assets/check-CJ6mA__T.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"a358-bcYDw3IykA7gpfBOsjmc9yV6BFg\"",
		"mtime": "2026-09-11T07:08:47.367Z",
		"size": 41816,
		"path": "../public/favicon.ico"
	},
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"a5cd3-4CB4dqsC4nJHzw8R5fK0xD8+fzo\"",
		"mtime": "2026-09-11T07:08:47.367Z",
		"size": 679123,
		"path": "../public/favicon.png"
	},
	"/assets/compass-BgPFnzN0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-51xjJvaHnpQ0llVIgGSHx9RVpAo\"",
		"mtime": "2026-09-11T07:08:46.371Z",
		"size": 251,
		"path": "../public/assets/compass-BgPFnzN0.js"
	},
	"/assets/createLucideIcon-C-so-e7F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4af-d0qudJwEnLLmPOFaysGXRnxa/DE\"",
		"mtime": "2026-09-11T07:08:46.371Z",
		"size": 1199,
		"path": "../public/assets/createLucideIcon-C-so-e7F.js"
	},
	"/assets/link-Ie0pT_3L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"62ea-jJLWP6AblrGcX46BIUBdkj8ajsI\"",
		"mtime": "2026-09-11T07:08:46.371Z",
		"size": 25322,
		"path": "../public/assets/link-Ie0pT_3L.js"
	},
	"/assets/loader-circle-B2lAyaPL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-3VDCn5w5suzzG2YEVpt2YZ0mC/Y\"",
		"mtime": "2026-09-11T07:08:46.371Z",
		"size": 144,
		"path": "../public/assets/loader-circle-B2lAyaPL.js"
	},
	"/assets/log-out-CygjK5kZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-oindVa7y49DtIE2DNpABmOQs4DE\"",
		"mtime": "2026-09-11T07:08:46.371Z",
		"size": 230,
		"path": "../public/assets/log-out-CygjK5kZ.js"
	},
	"/assets/mail-DzZ6hBqr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-wzYRiD0sikUG5h2kQdL15rhu7DI\"",
		"mtime": "2026-09-11T07:08:46.371Z",
		"size": 213,
		"path": "../public/assets/mail-DzZ6hBqr.js"
	},
	"/assets/monetization-DabKtcvu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e0-V7FEhXU0EJGh08NNy3bWxMAQ4Fk\"",
		"mtime": "2026-09-11T07:08:46.372Z",
		"size": 736,
		"path": "../public/assets/monetization-DabKtcvu.js"
	},
	"/assets/onboarding-62Bc3cKh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2822-mmikLRM2nnPsai0nUtLCL1E1GB4\"",
		"mtime": "2026-09-11T07:08:46.372Z",
		"size": 10274,
		"path": "../public/assets/onboarding-62Bc3cKh.js"
	},
	"/assets/phone-DEmgT3P7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"461-e8J8VhqI8xMC5lhlTbSQ9XoGVCY\"",
		"mtime": "2026-09-11T07:08:46.372Z",
		"size": 1121,
		"path": "../public/assets/phone-DEmgT3P7.js"
	},
	"/assets/policies-CJntD5vW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"615d-DJDVJCFgSjc19ini6VfJln4GZcs\"",
		"mtime": "2026-09-11T07:08:46.372Z",
		"size": 24925,
		"path": "../public/assets/policies-CJntD5vW.js"
	},
	"/assets/pricing-BbcNjwAE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2613-5QuztaDh0vmVKjh4Bil51I8TI60\"",
		"mtime": "2026-09-11T07:08:46.372Z",
		"size": 9747,
		"path": "../public/assets/pricing-BbcNjwAE.js"
	},
	"/assets/routes-6HgbtOnT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"222a-PqOb4JLIfzZV1r3OSMqgpASiRaY\"",
		"mtime": "2026-09-11T07:08:46.372Z",
		"size": 8746,
		"path": "../public/assets/routes-6HgbtOnT.js"
	},
	"/assets/save-iNOlvxt3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-SlvmD48y+bf6TE7LYdLxBsAh2Sc\"",
		"mtime": "2026-09-11T07:08:46.372Z",
		"size": 327,
		"path": "../public/assets/save-iNOlvxt3.js"
	},
	"/assets/search-Cyq1P6QR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-5Grbz7GtldlWUMZxoZ/VWv3hae0\"",
		"mtime": "2026-09-11T07:08:46.372Z",
		"size": 174,
		"path": "../public/assets/search-Cyq1P6QR.js"
	},
	"/assets/security-CkASCtYC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24a2-dBnSUtbd3cUOvJqkyFgxZzbYJI8\"",
		"mtime": "2026-09-11T07:08:46.372Z",
		"size": 9378,
		"path": "../public/assets/security-CkASCtYC.js"
	},
	"/assets/shield-CQjJCYRB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"110-fHoCQO7zOMbvU2ff+KidcftT/s4\"",
		"mtime": "2026-09-11T07:08:46.372Z",
		"size": 272,
		"path": "../public/assets/shield-CQjJCYRB.js"
	},
	"/assets/sliders-horizontal-DeibLmXA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66a-LPhjmLJO4+BkeFJsedvV7WpE2TU\"",
		"mtime": "2026-09-11T07:08:46.372Z",
		"size": 1642,
		"path": "../public/assets/sliders-horizontal-DeibLmXA.js"
	},
	"/assets/sparkles-DnQVlx0k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-aae1Ij2aG5QtbjE3vpyblpXzDCM\"",
		"mtime": "2026-09-11T07:08:46.372Z",
		"size": 494,
		"path": "../public/assets/sparkles-DnQVlx0k.js"
	},
	"/assets/info-Bs78oyN2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cc-chQsGilxITj8jpFaI2rFXj0j8b8\"",
		"mtime": "2026-09-11T07:08:46.371Z",
		"size": 204,
		"path": "../public/assets/info-Bs78oyN2.js"
	},
	"/assets/jsx-dev-runtime-BN4uJXNV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6515-zghcjQsxeXRjfbtdMV6VcdqA64o\"",
		"mtime": "2026-09-11T07:08:46.371Z",
		"size": 25877,
		"path": "../public/assets/jsx-dev-runtime-BN4uJXNV.js"
	},
	"/assets/jsx-runtime-CyVFUO3U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14f7-xHr95lUrS9DUWTgDsrwGa8htBQ0\"",
		"mtime": "2026-09-11T07:08:46.371Z",
		"size": 5367,
		"path": "../public/assets/jsx-runtime-CyVFUO3U.js"
	},
	"/assets/send-Crmo_tpU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-SbIYMCodIrAyBrc094v3QtbM780\"",
		"mtime": "2026-09-11T07:08:46.372Z",
		"size": 290,
		"path": "../public/assets/send-Crmo_tpU.js"
	},
	"/assets/credit-card-BrbVIf0e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-Vk50Eh9UPWfzViTVfDPQxa1HrvM\"",
		"mtime": "2026-09-11T07:08:46.371Z",
		"size": 207,
		"path": "../public/assets/credit-card-BrbVIf0e.js"
	},
	"/assets/index-BWAvfb8q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85b76-aYaK+HOYrUEyDufAHrpHjIJr0x0\"",
		"mtime": "2026-09-11T07:08:46.370Z",
		"size": 547702,
		"path": "../public/assets/index-BWAvfb8q.js"
	},
	"/assets/styles-B8OWbbbl.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"da01-Z/D6kx3xyY8XuraFXW1ngRbwr6o\"",
		"mtime": "2026-09-11T07:08:46.373Z",
		"size": 55809,
		"path": "../public/assets/styles-B8OWbbbl.css"
	},
	"/assets/terms-hWCPpwzA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b78-Le9r5rteCQG44tk9xMsYT3Uds74\"",
		"mtime": "2026-09-11T07:08:46.372Z",
		"size": 11128,
		"path": "../public/assets/terms-hWCPpwzA.js"
	},
	"/assets/trending-up-OGSctlhb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"af-aXUhkIM5jsuK49UdHHGELKFulzs\"",
		"mtime": "2026-09-11T07:08:46.372Z",
		"size": 175,
		"path": "../public/assets/trending-up-OGSctlhb.js"
	},
	"/assets/theme-nvo7oiL7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cd5-sOcmTIaoXDCUUpmqWhqNTDIgTY8\"",
		"mtime": "2026-09-11T07:08:46.372Z",
		"size": 7381,
		"path": "../public/assets/theme-nvo7oiL7.js"
	},
	"/assets/useMutation-xv1hEOHq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"92b-AM1DPgh4xAYgwWf5fQwhIP2eQFo\"",
		"mtime": "2026-09-11T07:08:46.372Z",
		"size": 2347,
		"path": "../public/assets/useMutation-xv1hEOHq.js"
	},
	"/assets/useQuery-CgsEIqQD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2229-4TLiYxy7rbr5ROHll2XS1K/W5nA\"",
		"mtime": "2026-09-11T07:08:46.372Z",
		"size": 8745,
		"path": "../public/assets/useQuery-CgsEIqQD.js"
	},
	"/assets/useRouter-l_j_2ZPr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10a-mJn0UjXYhaRa8jnoevRLr8Vfj6I\"",
		"mtime": "2026-09-11T07:08:46.372Z",
		"size": 266,
		"path": "../public/assets/useRouter-l_j_2ZPr.js"
	},
	"/assets/useMonetization-L5dLuOji.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"50c-x73buLHH17PLcz1bxITESFbNRSg\"",
		"mtime": "2026-09-11T07:08:46.372Z",
		"size": 1292,
		"path": "../public/assets/useMonetization-L5dLuOji.js"
	},
	"/assets/useMatch-0nMY29ej.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"38d-GeFFbMzFYsrzywEjMPDnjnCxfjU\"",
		"mtime": "2026-09-11T07:08:46.372Z",
		"size": 909,
		"path": "../public/assets/useMatch-0nMY29ej.js"
	},
	"/assets/users-CdtFiOjL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-Q0u0q9vttM7maGVojMjPzzrCat4\"",
		"mtime": "2026-09-11T07:08:46.372Z",
		"size": 306,
		"path": "../public/assets/users-CdtFiOjL.js"
	},
	"/assets/x-vg-THGOt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-uOkEog6qSkBdEFC6b0Qs6IkltMI\"",
		"mtime": "2026-09-11T07:08:46.372Z",
		"size": 154,
		"path": "../public/assets/x-vg-THGOt.js"
	},
	"/assets/supabase-ClxXyGWb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33e0c-D/9byBMn7zXP3Tkbr7wps9GesbA\"",
		"mtime": "2026-09-11T07:08:46.372Z",
		"size": 212492,
		"path": "../public/assets/supabase-ClxXyGWb.js"
	},
	"/assets/user-CCuPUL_2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-6w1EvGMXRKzg9waKgTIX5eAk68Y\"",
		"mtime": "2026-09-11T07:08:46.372Z",
		"size": 196,
		"path": "../public/assets/user-CCuPUL_2.js"
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
