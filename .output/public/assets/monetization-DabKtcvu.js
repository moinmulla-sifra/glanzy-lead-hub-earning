var e = {
  free: {
    name: `Free`,
    type: `free`,
    priceMonthly: 0,
    limits: {
      searchesPerMonth: 50,
      brandViewsPerMonth: 100,
      savedBrandsTotal: 25,
      outreachActiveTotal: 10,
      teamMembers: 1,
    },
    features: {
      advancedDiscovery: !1,
      removeAds: !1,
      exportData: !1,
      prioritySupport: !1,
    },
  },
  pro: {
    name: `Pro`,
    type: `pro`,
    priceMonthly: 49,
    limits: {
      searchesPerMonth: 500,
      brandViewsPerMonth: 1e3,
      savedBrandsTotal: 500,
      outreachActiveTotal: 250,
      teamMembers: 1,
    },
    features: {
      advancedDiscovery: !0,
      removeAds: !0,
      exportData: !0,
      prioritySupport: !0,
    },
  },
  agency: {
    name: `Agency`,
    type: `agency`,
    priceMonthly: 199,
    limits: {
      searchesPerMonth: 5e3,
      brandViewsPerMonth: 1e4,
      savedBrandsTotal: 5e3,
      outreachActiveTotal: 2500,
      teamMembers: 10,
    },
    features: {
      advancedDiscovery: !0,
      removeAds: !0,
      exportData: !0,
      prioritySupport: !0,
    },
  },
};
export { e as t };
