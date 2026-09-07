//#region node_modules/.nitro/vite/services/ssr/assets/monetization-mD78bnGP.js
var PLANS = {
	free: {
		name: "Free",
		type: "free",
		priceMonthly: 0,
		limits: {
			searchesPerMonth: 50,
			brandViewsPerMonth: 100,
			savedBrandsTotal: 25,
			outreachActiveTotal: 10,
			teamMembers: 1
		},
		features: {
			advancedDiscovery: false,
			removeAds: false,
			exportData: false,
			prioritySupport: false
		}
	},
	pro: {
		name: "Pro",
		type: "pro",
		priceMonthly: 49,
		limits: {
			searchesPerMonth: 500,
			brandViewsPerMonth: 1e3,
			savedBrandsTotal: 500,
			outreachActiveTotal: 250,
			teamMembers: 1
		},
		features: {
			advancedDiscovery: true,
			removeAds: true,
			exportData: true,
			prioritySupport: true
		}
	},
	agency: {
		name: "Agency",
		type: "agency",
		priceMonthly: 199,
		limits: {
			searchesPerMonth: 5e3,
			brandViewsPerMonth: 1e4,
			savedBrandsTotal: 5e3,
			outreachActiveTotal: 2500,
			teamMembers: 10
		},
		features: {
			advancedDiscovery: true,
			removeAds: true,
			exportData: true,
			prioritySupport: true
		}
	}
};
//#endregion
export { PLANS as t };
