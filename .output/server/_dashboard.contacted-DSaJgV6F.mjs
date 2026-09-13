import { _ as createFileRoute, g as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_dashboard.contacted-DSaJgV6F.js
var $$splitComponentImporter = () => import("./_dashboard.contacted-DzFPVZn_.mjs");
var Route = createFileRoute("/_dashboard/contacted")({
	validateSearch: (search) => {
		return { ...search["brandId"] ? { brandId: search["brandId"] } : {} };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
