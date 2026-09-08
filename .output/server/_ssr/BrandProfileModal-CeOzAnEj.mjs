import { n as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { A as Linkedin, B as CircleAlert, E as Mail, F as ExternalLink, G as Building2, H as Check, b as Phone, c as TrendingUp, f as Sparkles, g as Send, n as X, v as Save } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/BrandProfileModal-CeOzAnEj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BrandProfileModal = import_react.memo(function BrandProfileModal({ brand, isOpen, onClose, isSaved, onSave, isSaving, onStartOutreach }) {
	(0, import_react.useEffect)(() => {
		if (isOpen) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "unset";
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);
	if (!isOpen || !brand) return null;
	const copyEmail = () => {
		if (brand.email) {
			navigator.clipboard.writeText(brand.email);
			toast.success("Email copied to clipboard");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 animate-in fade-in duration-200",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 bg-background/80 backdrop-blur-sm",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-4xl max-h-[90vh] bg-card border border-border/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col slide-in-from-bottom-8 animate-in duration-300",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-shrink-0 border-b border-border/50 p-6 sm:px-8 bg-muted/10 flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl sm:text-3xl font-bold text-foreground truncate",
								children: brand.company_name
							}), brand.website && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: brand.website.startsWith("http") ? brand.website : `https://${brand.website}`,
								target: "_blank",
								rel: "noreferrer",
								className: "p-2 bg-muted rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors shrink-0",
								title: "Visit Website",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 18 })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-3 text-sm",
							children: [
								brand.industry && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5 text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-lg font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { size: 14 }), brand.industry]
								}),
								brand.country && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: brand.country
								}),
								brand.company_stage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground border-l border-border pl-3",
									children: [brand.company_stage, " Stage"]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "p-2 bg-muted/50 hover:bg-muted rounded-full text-muted-foreground transition-colors shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto p-6 sm:p-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-3 gap-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-2 space-y-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-brand/5 border border-brand/20 rounded-2xl p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-brand font-semibold mb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 18 }), "Creator Fit"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-3xl font-bold text-foreground mb-1",
											children: [brand.influencer_fit_score || "--", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-lg text-muted-foreground font-normal",
												children: "/100"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-1.5 w-full bg-brand/10 rounded-full overflow-hidden mt-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full bg-brand rounded-full",
												style: { width: `${brand.influencer_fit_score || 0}%` }
											})
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-muted/30 border border-border/50 rounded-2xl p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-muted-foreground font-semibold mb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { size: 18 }), "Lead Score"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-3xl font-bold text-foreground mb-1",
											children: brand.lead_score || "--"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground mt-2",
											children: "Overall opportunity signal"
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-6",
								children: [(brand.why_now || brand.recent_funding || brand.recent_launch) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-lg font-bold text-foreground flex items-center gap-2 mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
										size: 18,
										className: "text-brand"
									}), "Why now?"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [
										brand.why_now && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground leading-relaxed",
											children: brand.why_now
										}),
										brand.recent_funding && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-3 bg-muted/20 p-4 rounded-xl border border-border/50",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-0.5 w-2 h-2 rounded-full bg-green-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-foreground block mb-0.5",
												children: "Recent Funding"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm text-muted-foreground",
												children: brand.recent_funding
											})] })]
										}),
										brand.recent_launch && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-3 bg-muted/20 p-4 rounded-xl border border-border/50",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-0.5 w-2 h-2 rounded-full bg-blue-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-foreground block mb-0.5",
												children: "Recent Launch"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm text-muted-foreground",
												children: brand.recent_launch
											})] })]
										})
									]
								})] }), (brand.existing_creator_activity || brand.marketing_activity) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-lg font-bold text-foreground flex items-center gap-2 mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, {
										size: 18,
										className: "text-brand"
									}), "Marketing Activity"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [brand.existing_creator_activity && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-muted/20 p-4 rounded-xl border border-border/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-foreground block mb-1",
											children: "Creator Activity"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground leading-relaxed",
											children: brand.existing_creator_activity
										})]
									}), brand.marketing_activity && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-muted/20 p-4 rounded-xl border border-border/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-foreground block mb-1",
											children: "General Marketing"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground leading-relaxed",
											children: brand.marketing_activity
										})]
									})]
								})] })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-muted/10 border border-border/50 rounded-2xl p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-bold text-foreground mb-4",
									children: "Contact Information"
								}), brand.contact_person || brand.email || brand.phone || brand.linkedin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [
										brand.contact_person && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-medium text-foreground",
											children: brand.contact_person
										}), brand.contact_role && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm text-muted-foreground",
											children: brand.contact_role
										})] }),
										brand.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col gap-2 pt-2 border-t border-border/50",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 text-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
													size: 16,
													className: "text-muted-foreground shrink-0"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "truncate flex-1",
													children: brand.email
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: copyEmail,
												className: "w-full text-xs font-medium py-1.5 bg-muted hover:bg-muted/80 rounded-lg transition-colors",
												children: "Copy Email"
											})]
										}),
										brand.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-sm pt-2 border-t border-border/50",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
												size: 16,
												className: "text-muted-foreground shrink-0"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate",
												children: brand.phone
											})]
										}),
										brand.linkedin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "pt-2 border-t border-border/50",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: brand.linkedin.startsWith("http") ? brand.linkedin : `https://${brand.linkedin}`,
												target: "_blank",
												rel: "noreferrer",
												className: "flex items-center gap-2 text-sm text-[#0a66c2] hover:underline",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, {
													size: 16,
													className: "shrink-0"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "truncate",
													children: "LinkedIn Profile"
												})]
											})
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground italic",
									children: "No contact information available."
								})]
							}), brand.budget_potential && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-muted/10 border border-border/50 rounded-2xl p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-bold text-foreground mb-2",
									children: "Budget Potential"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-lg font-medium text-foreground capitalize",
									children: brand.budget_potential
								})]
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-shrink-0 p-6 sm:px-8 bg-muted/10 border-t border-border/50 flex flex-col sm:flex-row items-center gap-4 justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground hidden sm:block",
						children: "Information gathered for discovery purposes."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 w-full sm:w-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: isSaving,
							onClick: onSave,
							className: `flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                ${isSaved ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 group" : "bg-muted text-foreground hover:bg-muted/80 shadow-sm"}
              `,
							children: isSaved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4 group-hover:hidden" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4 hidden group-hover:block" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "group-hover:hidden",
									children: "Saved"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden group-hover:block",
									children: "Remove"
								})
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "w-4 h-4" }), "Save Brand"] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								if (!isSaved) onSave();
								onStartOutreach();
							},
							className: "flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-4 h-4" }), "Start Outreach"]
						})]
					})]
				})
			]
		})]
	});
});
//#endregion
export { BrandProfileModal as t };
