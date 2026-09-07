import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_dashboard.outreach--CvmmNhr.js
var $$splitComponentImporter = () => import("./_dashboard.outreach-BrDMiMvk.mjs");
var Route = createFileRoute("/_dashboard/outreach")({
	validateSearch: (search) => {
		return { brandId: search.brandId };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
