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
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs").then((n) => n.r)) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"a358-bcYDw3IykA7gpfBOsjmc9yV6BFg\"",
		"mtime": "2026-09-12T13:27:10.747Z",
		"size": 41816,
		"path": "../public/favicon.ico"
	},
	"/sitemap.xml": {
		"type": "application/xml",
		"etag": "\"4e1-e+jEe0vROJmbVVw1/cD/m0eH4mY\"",
		"mtime": "2026-09-12T13:27:10.747Z",
		"size": 1249,
		"path": "../public/sitemap.xml"
	},
	"/sw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-mUc6w02QGtOwmiPvWU5YSn3UjSw\"",
		"mtime": "2026-09-12T13:27:10.747Z",
		"size": 156,
		"path": "../public/sw.js"
	},
	"/assets/BrandProfileModal-B0NE0e_A.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9542-Ubejc6NX+xCi8IW7vbEGMwAvvXM\"",
		"mtime": "2026-09-12T13:27:09.678Z",
		"size": 38210,
		"path": "../public/assets/BrandProfileModal-B0NE0e_A.js"
	},
	"/assets/LegalLayout-DUq55HHC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"118a-098ODQCP/Yh+xGTPbFSjbeBYrrU\"",
		"mtime": "2026-09-12T13:27:09.678Z",
		"size": 4490,
		"path": "../public/assets/LegalLayout-DUq55HHC.js"
	},
	"/assets/_dashboard.contacted-p2KXd2VR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a797-IyRWyCUPR/yc7LmUpLrcqDz9Rn4\"",
		"mtime": "2026-09-12T13:27:09.679Z",
		"size": 42903,
		"path": "../public/assets/_dashboard.contacted-p2KXd2VR.js"
	},
	"/assets/_dashboard-R5WDwy9e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3605-EG7EnScWg1bfbW9yZotjny8zuuA\"",
		"mtime": "2026-09-12T13:27:09.679Z",
		"size": 13829,
		"path": "../public/assets/_dashboard-R5WDwy9e.js"
	},
	"/assets/_dashboard.discover-D6YbN-Yv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"565e-F2fbSbE131Yn6RgQ2kuZIMYKRGo\"",
		"mtime": "2026-09-12T13:27:09.679Z",
		"size": 22110,
		"path": "../public/assets/_dashboard.discover-D6YbN-Yv.js"
	},
	"/assets/_dashboard.for-you-6XZY45Xz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"355e-2dOR7zoxCHCZ+uuh1YvV+Dng7NA\"",
		"mtime": "2026-09-12T13:27:09.679Z",
		"size": 13662,
		"path": "../public/assets/_dashboard.for-you-6XZY45Xz.js"
	},
	"/assets/_dashboard.profile-BiFjvopt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f66-ShwuXE71RxRo4BaAF2+WKBwJzho\"",
		"mtime": "2026-09-12T13:27:09.679Z",
		"size": 8038,
		"path": "../public/assets/_dashboard.profile-BiFjvopt.js"
	},
	"/assets/_dashboard.saved-CMGSBFR8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5ce2-aJFhtcfM0Ff6SaAseR0PMQTFvCA\"",
		"mtime": "2026-09-12T13:27:09.679Z",
		"size": 23778,
		"path": "../public/assets/_dashboard.saved-CMGSBFR8.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"cf-SN9PxAcW4Shht9Ja3+KObrOBKjE\"",
		"mtime": "2026-09-12T13:27:10.748Z",
		"size": 207,
		"path": "../public/robots.txt"
	},
	"/assets/_dashboard.settings-DiaCS6er.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"92ba-y8Kn16n1fcM3vAuKQ9nDUCrLYhE\"",
		"mtime": "2026-09-12T13:27:09.679Z",
		"size": 37562,
		"path": "../public/assets/_dashboard.settings-DiaCS6er.js"
	},
	"/assets/_dashboard.team-BzGQ1Mkz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"243e-acgWCLzDphRwuaxqczRV3nqBDzg\"",
		"mtime": "2026-09-12T13:27:09.679Z",
		"size": 9278,
		"path": "../public/assets/_dashboard.team-BzGQ1Mkz.js"
	},
	"/assets/admin-DY_qp_et.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18ad-xqwowXEbRCQzRIj0ANe/DgC5rmM\"",
		"mtime": "2026-09-12T13:27:09.679Z",
		"size": 6317,
		"path": "../public/assets/admin-DY_qp_et.js"
	},
	"/assets/arrow-right-BeRVpgVc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-I66/Z2EpfMx8BGgavY1W2Eke96Q\"",
		"mtime": "2026-09-12T13:27:09.679Z",
		"size": 165,
		"path": "../public/assets/arrow-right-BeRVpgVc.js"
	},
	"/assets/arrow-left-DQmd5hZu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-LqD7EmNs9R81SsZ7bhp29P+vDHg\"",
		"mtime": "2026-09-12T13:27:09.679Z",
		"size": 165,
		"path": "../public/assets/arrow-left-DQmd5hZu.js"
	},
	"/assets/auth-BSYoUlX_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3211-UZMJ5lzWCXMMilSjWqVSUOeR+j8\"",
		"mtime": "2026-09-12T13:27:09.679Z",
		"size": 12817,
		"path": "../public/assets/auth-BSYoUlX_.js"
	},
	"/assets/about-Rljsdgs1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3bf3-abFVvlQqcXNw/U5BOXHtwP38ORU\"",
		"mtime": "2026-09-12T13:27:09.679Z",
		"size": 15347,
		"path": "../public/assets/about-Rljsdgs1.js"
	},
	"/assets/bookmark-DW2tSGOY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-Hz/8lB4r6SP+49oOwjo9TwH5kJE\"",
		"mtime": "2026-09-12T13:27:09.679Z",
		"size": 230,
		"path": "../public/assets/bookmark-DW2tSGOY.js"
	},
	"/assets/building-2-DtlKDAcU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17f-Ix08qirRJjpmEBPQLj2MkBJgdB4\"",
		"mtime": "2026-09-12T13:27:09.679Z",
		"size": 383,
		"path": "../public/assets/building-2-DtlKDAcU.js"
	},
	"/assets/calendar-CZclbofY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"101-+gHrQyG7Z2KuX+dM9giMLSkR6m4\"",
		"mtime": "2026-09-12T13:27:09.679Z",
		"size": 257,
		"path": "../public/assets/calendar-CZclbofY.js"
	},
	"/assets/chart-no-axes-column-increasing-DD7wD4tZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d9-p4pWIwRtylp3Ej1LRnnqcm76k7E\"",
		"mtime": "2026-09-12T13:27:09.679Z",
		"size": 217,
		"path": "../public/assets/chart-no-axes-column-increasing-DD7wD4tZ.js"
	},
	"/assets/_dashboard.dashboard-D6M0r_9M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f07-3O+aAoAwHr8aFYxuMmxxVVwPle4\"",
		"mtime": "2026-09-12T13:27:09.679Z",
		"size": 7943,
		"path": "../public/assets/_dashboard.dashboard-D6M0r_9M.js"
	},
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"a5cd3-4CB4dqsC4nJHzw8R5fK0xD8+fzo\"",
		"mtime": "2026-09-12T13:27:10.748Z",
		"size": 679123,
		"path": "../public/favicon.png"
	},
	"/assets/check-CJ6mA__T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c-P/tsEPzG/PMtwtkzWVO6smHIVYM\"",
		"mtime": "2026-09-12T13:27:09.679Z",
		"size": 124,
		"path": "../public/assets/check-CJ6mA__T.js"
	},
	"/assets/compass-BgPFnzN0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-51xjJvaHnpQ0llVIgGSHx9RVpAo\"",
		"mtime": "2026-09-12T13:27:09.679Z",
		"size": 251,
		"path": "../public/assets/compass-BgPFnzN0.js"
	},
	"/assets/constants-FrcIFbfo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"102-91XtQ+J1D9V0oFxfgmuAYGAfNAI\"",
		"mtime": "2026-09-12T13:27:09.679Z",
		"size": 258,
		"path": "../public/assets/constants-FrcIFbfo.js"
	},
	"/assets/createLucideIcon-C-so-e7F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4af-d0qudJwEnLLmPOFaysGXRnxa/DE\"",
		"mtime": "2026-09-12T13:27:09.679Z",
		"size": 1199,
		"path": "../public/assets/createLucideIcon-C-so-e7F.js"
	},
	"/assets/info-Bs78oyN2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cc-chQsGilxITj8jpFaI2rFXj0j8b8\"",
		"mtime": "2026-09-12T13:27:09.679Z",
		"size": 204,
		"path": "../public/assets/info-Bs78oyN2.js"
	},
	"/assets/jsx-dev-runtime-BN4uJXNV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6515-zghcjQsxeXRjfbtdMV6VcdqA64o\"",
		"mtime": "2026-09-12T13:27:09.679Z",
		"size": 25877,
		"path": "../public/assets/jsx-dev-runtime-BN4uJXNV.js"
	},
	"/assets/jsx-runtime-CyVFUO3U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14f7-xHr95lUrS9DUWTgDsrwGa8htBQ0\"",
		"mtime": "2026-09-12T13:27:09.679Z",
		"size": 5367,
		"path": "../public/assets/jsx-runtime-CyVFUO3U.js"
	},
	"/assets/link-Ie0pT_3L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"62ea-jJLWP6AblrGcX46BIUBdkj8ajsI\"",
		"mtime": "2026-09-12T13:27:09.680Z",
		"size": 25322,
		"path": "../public/assets/link-Ie0pT_3L.js"
	},
	"/assets/loader-circle-B2lAyaPL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-3VDCn5w5suzzG2YEVpt2YZ0mC/Y\"",
		"mtime": "2026-09-12T13:27:09.680Z",
		"size": 144,
		"path": "../public/assets/loader-circle-B2lAyaPL.js"
	},
	"/assets/log-out-CygjK5kZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-oindVa7y49DtIE2DNpABmOQs4DE\"",
		"mtime": "2026-09-12T13:27:09.680Z",
		"size": 230,
		"path": "../public/assets/log-out-CygjK5kZ.js"
	},
	"/assets/mail-DzZ6hBqr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-wzYRiD0sikUG5h2kQdL15rhu7DI\"",
		"mtime": "2026-09-12T13:27:09.680Z",
		"size": 213,
		"path": "../public/assets/mail-DzZ6hBqr.js"
	},
	"/assets/onboarding-BT5Pn53R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2822-UpPreNoVl5T+WdF3S+nWpzsmLpY\"",
		"mtime": "2026-09-12T13:27:09.680Z",
		"size": 10274,
		"path": "../public/assets/onboarding-BT5Pn53R.js"
	},
	"/assets/phone-kN06n0jZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"370-CRK1jC5h7rHhya3MgM8J0kMj4/c\"",
		"mtime": "2026-09-12T13:27:09.680Z",
		"size": 880,
		"path": "../public/assets/phone-kN06n0jZ.js"
	},
	"/assets/policies-CJntD5vW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"615d-DJDVJCFgSjc19ini6VfJln4GZcs\"",
		"mtime": "2026-09-12T13:27:09.680Z",
		"size": 24925,
		"path": "../public/assets/policies-CJntD5vW.js"
	},
	"/assets/pricing-ChKaTjUF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ff4-F22KRuZq54janAPkAuku9OmcBUE\"",
		"mtime": "2026-09-12T13:27:09.680Z",
		"size": 12276,
		"path": "../public/assets/pricing-ChKaTjUF.js"
	},
	"/assets/routes-6HgbtOnT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"222a-PqOb4JLIfzZV1r3OSMqgpASiRaY\"",
		"mtime": "2026-09-12T13:27:09.680Z",
		"size": 8746,
		"path": "../public/assets/routes-6HgbtOnT.js"
	},
	"/assets/save-iNOlvxt3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-SlvmD48y+bf6TE7LYdLxBsAh2Sc\"",
		"mtime": "2026-09-12T13:27:09.680Z",
		"size": 327,
		"path": "../public/assets/save-iNOlvxt3.js"
	},
	"/assets/search-Cyq1P6QR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-5Grbz7GtldlWUMZxoZ/VWv3hae0\"",
		"mtime": "2026-09-12T13:27:09.680Z",
		"size": 174,
		"path": "../public/assets/search-Cyq1P6QR.js"
	},
	"/assets/security-CkASCtYC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24a2-dBnSUtbd3cUOvJqkyFgxZzbYJI8\"",
		"mtime": "2026-09-12T13:27:09.680Z",
		"size": 9378,
		"path": "../public/assets/security-CkASCtYC.js"
	},
	"/assets/send-Crmo_tpU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-SbIYMCodIrAyBrc094v3QtbM780\"",
		"mtime": "2026-09-12T13:27:09.680Z",
		"size": 290,
		"path": "../public/assets/send-Crmo_tpU.js"
	},
	"/assets/shield-CQjJCYRB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"110-fHoCQO7zOMbvU2ff+KidcftT/s4\"",
		"mtime": "2026-09-12T13:27:09.680Z",
		"size": 272,
		"path": "../public/assets/shield-CQjJCYRB.js"
	},
	"/assets/sliders-horizontal-Yaw0kF-K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66a-gAl5G2mPtesZXbqwgBvk+YaDug8\"",
		"mtime": "2026-09-12T13:27:09.680Z",
		"size": 1642,
		"path": "../public/assets/sliders-horizontal-Yaw0kF-K.js"
	},
	"/assets/sparkles-DnQVlx0k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-aae1Ij2aG5QtbjE3vpyblpXzDCM\"",
		"mtime": "2026-09-12T13:27:09.680Z",
		"size": 494,
		"path": "../public/assets/sparkles-DnQVlx0k.js"
	},
	"/assets/index-VyvTQkSd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85b6b-5SzOMFhcV7SbObv9NLVY6/RVv8I\"",
		"mtime": "2026-09-12T13:27:09.678Z",
		"size": 547691,
		"path": "../public/assets/index-VyvTQkSd.js"
	},
	"/assets/styles-ChT1mZLL.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"d7b2-YNXSE+EmZnKhhltLKQFVfsJJaV8\"",
		"mtime": "2026-09-12T13:27:09.681Z",
		"size": 55218,
		"path": "../public/assets/styles-ChT1mZLL.css"
	},
	"/assets/supabase-ClxXyGWb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33e0c-D/9byBMn7zXP3Tkbr7wps9GesbA\"",
		"mtime": "2026-09-12T13:27:09.680Z",
		"size": 212492,
		"path": "../public/assets/supabase-ClxXyGWb.js"
	},
	"/assets/terms-hWCPpwzA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b78-Le9r5rteCQG44tk9xMsYT3Uds74\"",
		"mtime": "2026-09-12T13:27:09.680Z",
		"size": 11128,
		"path": "../public/assets/terms-hWCPpwzA.js"
	},
	"/assets/trending-up-OGSctlhb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"af-aXUhkIM5jsuK49UdHHGELKFulzs\"",
		"mtime": "2026-09-12T13:27:09.680Z",
		"size": 175,
		"path": "../public/assets/trending-up-OGSctlhb.js"
	},
	"/assets/useMonetization-DxJ0fuTA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11fc-8DfLMBwqabc+s5anxgCPjV2afSM\"",
		"mtime": "2026-09-12T13:27:09.680Z",
		"size": 4604,
		"path": "../public/assets/useMonetization-DxJ0fuTA.js"
	},
	"/assets/useMutation-R89B6UW7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"92b-svlrAeF0M9Is1/lCk42GR0qZ9bs\"",
		"mtime": "2026-09-12T13:27:09.680Z",
		"size": 2347,
		"path": "../public/assets/useMutation-R89B6UW7.js"
	},
	"/assets/useQuery-DXSofuAG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2229-rlNUB0kwUbgt4ykNUGDoyvbZ+0w\"",
		"mtime": "2026-09-12T13:27:09.680Z",
		"size": 8745,
		"path": "../public/assets/useQuery-DXSofuAG.js"
	},
	"/assets/theme-nvo7oiL7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cd5-sOcmTIaoXDCUUpmqWhqNTDIgTY8\"",
		"mtime": "2026-09-12T13:27:09.680Z",
		"size": 7381,
		"path": "../public/assets/theme-nvo7oiL7.js"
	},
	"/assets/useRouter-l_j_2ZPr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10a-mJn0UjXYhaRa8jnoevRLr8Vfj6I\"",
		"mtime": "2026-09-12T13:27:09.680Z",
		"size": 266,
		"path": "../public/assets/useRouter-l_j_2ZPr.js"
	},
	"/assets/user-CCuPUL_2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-6w1EvGMXRKzg9waKgTIX5eAk68Y\"",
		"mtime": "2026-09-12T13:27:09.681Z",
		"size": 196,
		"path": "../public/assets/user-CCuPUL_2.js"
	},
	"/assets/users-CdtFiOjL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-Q0u0q9vttM7maGVojMjPzzrCat4\"",
		"mtime": "2026-09-12T13:27:09.681Z",
		"size": 306,
		"path": "../public/assets/users-CdtFiOjL.js"
	},
	"/assets/x-vg-THGOt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-uOkEog6qSkBdEFC6b0Qs6IkltMI\"",
		"mtime": "2026-09-12T13:27:09.681Z",
		"size": 154,
		"path": "../public/assets/x-vg-THGOt.js"
	},
	"/assets/useMatch-0nMY29ej.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"38d-GeFFbMzFYsrzywEjMPDnjnCxfjU\"",
		"mtime": "2026-09-12T13:27:09.680Z",
		"size": 909,
		"path": "../public/assets/useMatch-0nMY29ej.js"
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
