import { _ as createFileRoute, g as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_dashboard.outreach-dF6IwfMd.js
var $$splitComponentImporter = () => import("./_dashboard.outreach-BeSCcsUt.mjs");
var Route = createFileRoute("/_dashboard/outreach")({
	validateSearch: (search) => {
		return { ...search["brandId"] ? { brandId: search["brandId"] } : {} };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
