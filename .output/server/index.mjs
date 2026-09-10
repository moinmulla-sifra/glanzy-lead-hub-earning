globalThis.__nitro_main__ = import.meta.url;
import { i as serve, r as NodeResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
import { i as toEventHandler, n as defineHandler, o as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
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
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-09-10T08:45:27.506Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-10T08:45:27.506Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/BrandProfileModal-y800TYV5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9542-c7V4Fg0POi7dcmKUnlWhJZ0uIRo\"",
		"mtime": "2026-09-10T08:45:26.538Z",
		"size": 38210,
		"path": "../public/assets/BrandProfileModal-y800TYV5.js"
	},
	"/assets/LegalLayout-DUq55HHC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"118a-098ODQCP/Yh+xGTPbFSjbeBYrrU\"",
		"mtime": "2026-09-10T08:45:26.538Z",
		"size": 4490,
		"path": "../public/assets/LegalLayout-DUq55HHC.js"
	},
	"/assets/_dashboard-01ZmTjDt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"358e-ymUitnay/9EhZBT3hqsJwSME6fg\"",
		"mtime": "2026-09-10T08:45:26.538Z",
		"size": 13710,
		"path": "../public/assets/_dashboard-01ZmTjDt.js"
	},
	"/assets/_dashboard.contacted-Dg1TgV_b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a772-w8DbK2IgMnJva541M+82brd8L6Y\"",
		"mtime": "2026-09-10T08:45:26.538Z",
		"size": 42866,
		"path": "../public/assets/_dashboard.contacted-Dg1TgV_b.js"
	},
	"/assets/_dashboard.dashboard-DiwUmPR9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f07-+Agx7+lyACFphnlakujFD5htrno\"",
		"mtime": "2026-09-10T08:45:26.538Z",
		"size": 7943,
		"path": "../public/assets/_dashboard.dashboard-DiwUmPR9.js"
	},
	"/assets/_dashboard.discover-C8KzEAan.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"582a-zdFvXCkblYiygHGwjXiw0WNe9Ho\"",
		"mtime": "2026-09-10T08:45:26.538Z",
		"size": 22570,
		"path": "../public/assets/_dashboard.discover-C8KzEAan.js"
	},
	"/assets/_dashboard.for-you-BZx92Inv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"355a-s/iEZyvNL5OxY27g7MK7a8V3W70\"",
		"mtime": "2026-09-10T08:45:26.538Z",
		"size": 13658,
		"path": "../public/assets/_dashboard.for-you-BZx92Inv.js"
	},
	"/assets/_dashboard.profile-DUWebJRJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f66-odMGIIpiFnkZ6lOjiJte+FoRmrM\"",
		"mtime": "2026-09-10T08:45:26.538Z",
		"size": 8038,
		"path": "../public/assets/_dashboard.profile-DUWebJRJ.js"
	},
	"/assets/_dashboard.saved-KJ6cR_ml.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5cbd-FiK35+BRV0rrstHWHFpm14DkjGA\"",
		"mtime": "2026-09-10T08:45:26.538Z",
		"size": 23741,
		"path": "../public/assets/_dashboard.saved-KJ6cR_ml.js"
	},
	"/assets/_dashboard.team-DOQz8OML.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"243e-VZ68WupblxGivHgiYL6+PULjEps\"",
		"mtime": "2026-09-10T08:45:26.538Z",
		"size": 9278,
		"path": "../public/assets/_dashboard.team-DOQz8OML.js"
	},
	"/assets/about-Rljsdgs1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3bf3-abFVvlQqcXNw/U5BOXHtwP38ORU\"",
		"mtime": "2026-09-10T08:45:26.538Z",
		"size": 15347,
		"path": "../public/assets/about-Rljsdgs1.js"
	},
	"/assets/_dashboard.settings-Cj-MBNvM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9252-q7iDVbqwngWlxVs0cu+1KlExDQ0\"",
		"mtime": "2026-09-10T08:45:26.538Z",
		"size": 37458,
		"path": "../public/assets/_dashboard.settings-Cj-MBNvM.js"
	},
	"/assets/arrow-right-BeRVpgVc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-I66/Z2EpfMx8BGgavY1W2Eke96Q\"",
		"mtime": "2026-09-10T08:45:26.539Z",
		"size": 165,
		"path": "../public/assets/arrow-right-BeRVpgVc.js"
	},
	"/assets/admin-CaYsdejS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"197c-Xg7Sn4FJGthb3fgQLKCIbRhd8BU\"",
		"mtime": "2026-09-10T08:45:26.539Z",
		"size": 6524,
		"path": "../public/assets/admin-CaYsdejS.js"
	},
	"/assets/bookmark-DW2tSGOY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-Hz/8lB4r6SP+49oOwjo9TwH5kJE\"",
		"mtime": "2026-09-10T08:45:26.539Z",
		"size": 230,
		"path": "../public/assets/bookmark-DW2tSGOY.js"
	},
	"/assets/building-2-DtlKDAcU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17f-Ix08qirRJjpmEBPQLj2MkBJgdB4\"",
		"mtime": "2026-09-10T08:45:26.539Z",
		"size": 383,
		"path": "../public/assets/building-2-DtlKDAcU.js"
	},
	"/assets/calendar-CZclbofY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"101-+gHrQyG7Z2KuX+dM9giMLSkR6m4\"",
		"mtime": "2026-09-10T08:45:26.539Z",
		"size": 257,
		"path": "../public/assets/calendar-CZclbofY.js"
	},
	"/assets/chart-no-axes-column-increasing-DD7wD4tZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d9-p4pWIwRtylp3Ej1LRnnqcm76k7E\"",
		"mtime": "2026-09-10T08:45:26.539Z",
		"size": 217,
		"path": "../public/assets/chart-no-axes-column-increasing-DD7wD4tZ.js"
	},
	"/assets/auth-Fa7RVvvz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3363-GfYjcRrLm8kA8q+MuMXMrUUcFi8\"",
		"mtime": "2026-09-10T08:45:26.539Z",
		"size": 13155,
		"path": "../public/assets/auth-Fa7RVvvz.js"
	},
	"/assets/check-CJ6mA__T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c-P/tsEPzG/PMtwtkzWVO6smHIVYM\"",
		"mtime": "2026-09-10T08:45:26.539Z",
		"size": 124,
		"path": "../public/assets/check-CJ6mA__T.js"
	},
	"/assets/compass-BgPFnzN0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-51xjJvaHnpQ0llVIgGSHx9RVpAo\"",
		"mtime": "2026-09-10T08:45:26.539Z",
		"size": 251,
		"path": "../public/assets/compass-BgPFnzN0.js"
	},
	"/assets/createLucideIcon-C-so-e7F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4af-d0qudJwEnLLmPOFaysGXRnxa/DE\"",
		"mtime": "2026-09-10T08:45:26.539Z",
		"size": 1199,
		"path": "../public/assets/createLucideIcon-C-so-e7F.js"
	},
	"/assets/credit-card-BrbVIf0e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-Vk50Eh9UPWfzViTVfDPQxa1HrvM\"",
		"mtime": "2026-09-10T08:45:26.539Z",
		"size": 207,
		"path": "../public/assets/credit-card-BrbVIf0e.js"
	},
	"/assets/info-Bs78oyN2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cc-chQsGilxITj8jpFaI2rFXj0j8b8\"",
		"mtime": "2026-09-10T08:45:26.539Z",
		"size": 204,
		"path": "../public/assets/info-Bs78oyN2.js"
	},
	"/assets/jsx-dev-runtime-BN4uJXNV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6515-zghcjQsxeXRjfbtdMV6VcdqA64o\"",
		"mtime": "2026-09-10T08:45:26.539Z",
		"size": 25877,
		"path": "../public/assets/jsx-dev-runtime-BN4uJXNV.js"
	},
	"/assets/jsx-runtime-CyVFUO3U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14f7-xHr95lUrS9DUWTgDsrwGa8htBQ0\"",
		"mtime": "2026-09-10T08:45:26.539Z",
		"size": 5367,
		"path": "../public/assets/jsx-runtime-CyVFUO3U.js"
	},
	"/assets/link-Ie0pT_3L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"62ea-jJLWP6AblrGcX46BIUBdkj8ajsI\"",
		"mtime": "2026-09-10T08:45:26.539Z",
		"size": 25322,
		"path": "../public/assets/link-Ie0pT_3L.js"
	},
	"/assets/loader-circle-B2lAyaPL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-3VDCn5w5suzzG2YEVpt2YZ0mC/Y\"",
		"mtime": "2026-09-10T08:45:26.539Z",
		"size": 144,
		"path": "../public/assets/loader-circle-B2lAyaPL.js"
	},
	"/assets/log-out-CygjK5kZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-oindVa7y49DtIE2DNpABmOQs4DE\"",
		"mtime": "2026-09-10T08:45:26.539Z",
		"size": 230,
		"path": "../public/assets/log-out-CygjK5kZ.js"
	},
	"/assets/mail-DzZ6hBqr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-wzYRiD0sikUG5h2kQdL15rhu7DI\"",
		"mtime": "2026-09-10T08:45:26.539Z",
		"size": 213,
		"path": "../public/assets/mail-DzZ6hBqr.js"
	},
	"/assets/monetization-DabKtcvu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e0-V7FEhXU0EJGh08NNy3bWxMAQ4Fk\"",
		"mtime": "2026-09-10T08:45:26.539Z",
		"size": 736,
		"path": "../public/assets/monetization-DabKtcvu.js"
	},
	"/assets/onboarding-BLDpcciQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2822-GIEVNNjySemRJKRWon73hNJhgcc\"",
		"mtime": "2026-09-10T08:45:26.539Z",
		"size": 10274,
		"path": "../public/assets/onboarding-BLDpcciQ.js"
	},
	"/assets/policies-CJntD5vW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"615d-DJDVJCFgSjc19ini6VfJln4GZcs\"",
		"mtime": "2026-09-10T08:45:26.540Z",
		"size": 24925,
		"path": "../public/assets/policies-CJntD5vW.js"
	},
	"/assets/phone-DEmgT3P7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"461-e8J8VhqI8xMC5lhlTbSQ9XoGVCY\"",
		"mtime": "2026-09-10T08:45:26.540Z",
		"size": 1121,
		"path": "../public/assets/phone-DEmgT3P7.js"
	},
	"/assets/pricing-Bt22yRFQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22c6-zvaQbKQ45Uk2eVYdnhAWLI4uYGk\"",
		"mtime": "2026-09-10T08:45:26.540Z",
		"size": 8902,
		"path": "../public/assets/pricing-Bt22yRFQ.js"
	},
	"/assets/routes-PvmH7LK3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2322-17U9pkKsz0TSj+lH9tKVGPILumo\"",
		"mtime": "2026-09-10T08:45:26.540Z",
		"size": 8994,
		"path": "../public/assets/routes-PvmH7LK3.js"
	},
	"/assets/save-iNOlvxt3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-SlvmD48y+bf6TE7LYdLxBsAh2Sc\"",
		"mtime": "2026-09-10T08:45:26.540Z",
		"size": 327,
		"path": "../public/assets/save-iNOlvxt3.js"
	},
	"/assets/search-Cyq1P6QR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-5Grbz7GtldlWUMZxoZ/VWv3hae0\"",
		"mtime": "2026-09-10T08:45:26.540Z",
		"size": 174,
		"path": "../public/assets/search-Cyq1P6QR.js"
	},
	"/assets/security-CkASCtYC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24a2-dBnSUtbd3cUOvJqkyFgxZzbYJI8\"",
		"mtime": "2026-09-10T08:45:26.540Z",
		"size": 9378,
		"path": "../public/assets/security-CkASCtYC.js"
	},
	"/assets/send-Crmo_tpU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-SbIYMCodIrAyBrc094v3QtbM780\"",
		"mtime": "2026-09-10T08:45:26.540Z",
		"size": 290,
		"path": "../public/assets/send-Crmo_tpU.js"
	},
	"/assets/shield-CQjJCYRB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"110-fHoCQO7zOMbvU2ff+KidcftT/s4\"",
		"mtime": "2026-09-10T08:45:26.540Z",
		"size": 272,
		"path": "../public/assets/shield-CQjJCYRB.js"
	},
	"/assets/sliders-horizontal-DqRnZEYG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66a-y+yVfLuvcYZm0tpExtIj4SUiU3k\"",
		"mtime": "2026-09-10T08:45:26.540Z",
		"size": 1642,
		"path": "../public/assets/sliders-horizontal-DqRnZEYG.js"
	},
	"/assets/sparkles-DnQVlx0k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-aae1Ij2aG5QtbjE3vpyblpXzDCM\"",
		"mtime": "2026-09-10T08:45:26.540Z",
		"size": 494,
		"path": "../public/assets/sparkles-DnQVlx0k.js"
	},
	"/assets/styles-CCx5AMA8.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"d442-4/Kwn852MvHSvR8OMCgFNZqbyvE\"",
		"mtime": "2026-09-10T08:45:26.541Z",
		"size": 54338,
		"path": "../public/assets/styles-CCx5AMA8.css"
	},
	"/assets/supabase-ClxXyGWb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33e0c-D/9byBMn7zXP3Tkbr7wps9GesbA\"",
		"mtime": "2026-09-10T08:45:26.540Z",
		"size": 212492,
		"path": "../public/assets/supabase-ClxXyGWb.js"
	},
	"/assets/terms-hWCPpwzA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b78-Le9r5rteCQG44tk9xMsYT3Uds74\"",
		"mtime": "2026-09-10T08:45:26.540Z",
		"size": 11128,
		"path": "../public/assets/terms-hWCPpwzA.js"
	},
	"/assets/theme-nvo7oiL7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cd5-sOcmTIaoXDCUUpmqWhqNTDIgTY8\"",
		"mtime": "2026-09-10T08:45:26.540Z",
		"size": 7381,
		"path": "../public/assets/theme-nvo7oiL7.js"
	},
	"/assets/index-BKM5fQK8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85bac-a0xGMBm6Wre7bS34aHXM9Tsv6w0\"",
		"mtime": "2026-09-10T08:45:26.538Z",
		"size": 547756,
		"path": "../public/assets/index-BKM5fQK8.js"
	},
	"/assets/useMatch-0nMY29ej.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"38d-GeFFbMzFYsrzywEjMPDnjnCxfjU\"",
		"mtime": "2026-09-10T08:45:26.540Z",
		"size": 909,
		"path": "../public/assets/useMatch-0nMY29ej.js"
	},
	"/assets/useMonetization-Bd6N8sR8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e2-rJuhXuELIK1GT1it/WSe3hS8EoE\"",
		"mtime": "2026-09-10T08:45:26.540Z",
		"size": 738,
		"path": "../public/assets/useMonetization-Bd6N8sR8.js"
	},
	"/assets/useMutation-BSaApSbL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"92b-0I+Gj+Ml6l5Eq7+xVCqT2xjY+Ks\"",
		"mtime": "2026-09-10T08:45:26.540Z",
		"size": 2347,
		"path": "../public/assets/useMutation-BSaApSbL.js"
	},
	"/assets/trending-up-OGSctlhb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"af-aXUhkIM5jsuK49UdHHGELKFulzs\"",
		"mtime": "2026-09-10T08:45:26.540Z",
		"size": 175,
		"path": "../public/assets/trending-up-OGSctlhb.js"
	},
	"/assets/useRouter-l_j_2ZPr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10a-mJn0UjXYhaRa8jnoevRLr8Vfj6I\"",
		"mtime": "2026-09-10T08:45:26.541Z",
		"size": 266,
		"path": "../public/assets/useRouter-l_j_2ZPr.js"
	},
	"/assets/user-CCuPUL_2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-6w1EvGMXRKzg9waKgTIX5eAk68Y\"",
		"mtime": "2026-09-10T08:45:26.541Z",
		"size": 196,
		"path": "../public/assets/user-CCuPUL_2.js"
	},
	"/assets/users-CdtFiOjL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-Q0u0q9vttM7maGVojMjPzzrCat4\"",
		"mtime": "2026-09-10T08:45:26.541Z",
		"size": 306,
		"path": "../public/assets/users-CdtFiOjL.js"
	},
	"/assets/x-vg-THGOt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-uOkEog6qSkBdEFC6b0Qs6IkltMI\"",
		"mtime": "2026-09-10T08:45:26.541Z",
		"size": 154,
		"path": "../public/assets/x-vg-THGOt.js"
	},
	"/assets/useQuery-C7H1MROZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2229-nMvx5xGF4/FzPnGw/5FFNUlOgFI\"",
		"mtime": "2026-09-10T08:45:26.540Z",
		"size": 8745,
		"path": "../public/assets/useQuery-C7H1MROZ.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
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
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
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
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
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
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
