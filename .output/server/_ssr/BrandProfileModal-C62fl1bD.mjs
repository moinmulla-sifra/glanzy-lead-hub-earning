import { n as __toESM } from "../_runtime.mjs";
import { s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { l as require_react_dom } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { D as Mail, H as CircleAlert, I as ExternalLink, W as Check, b as Phone, c as TrendingUp, f as Sparkles, g as Send, j as Linkedin, n as X, q as Building2, v as Save } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/BrandProfileModal-C62fl1bD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var _jsxFileName = "/app/applet/src/components/BrandProfileModal.tsx";
var BrandProfileModal = import_react.memo(function BrandProfileModal({ brand, isOpen, onClose, isSaved, onSave, isSaving, onStartOutreach, onRefreshResearch, isRefreshing }) {
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
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 animate-in fade-in duration-200",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "absolute inset-0 bg-background/80 backdrop-blur-sm",
			onClick: onClose
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 66,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative w-full max-w-4xl max-h-[90vh] bg-card border border-border/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col slide-in-from-bottom-8 animate-in duration-300",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex-shrink-0 border-b border-border/50 p-6 sm:px-8 bg-muted/10 flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3 mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "text-2xl sm:text-3xl font-bold text-foreground truncate",
								children: brand.company_name
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 76,
								columnNumber: 15
							}, this), brand.website && /* @__PURE__ */ (void 0)("a", {
								href: brand.website.startsWith("http") ? brand.website : `https://${brand.website}`,
								target: "_blank",
								rel: "noreferrer",
								className: "p-2 bg-muted rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors shrink-0",
								title: "Visit Website",
								children: /* @__PURE__ */ (void 0)(ExternalLink, { size: 18 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 91,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 80,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 75,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center gap-3 text-sm",
							children: [
								brand.industry && /* @__PURE__ */ (void 0)("span", {
									className: "flex items-center gap-1.5 text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-lg font-medium",
									children: [/* @__PURE__ */ (void 0)(Building2, { size: 14 }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 98,
										columnNumber: 19
									}, this), brand.industry]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 97,
									columnNumber: 17
								}, this),
								brand.country && /* @__PURE__ */ (void 0)("span", {
									className: "text-muted-foreground",
									children: brand.country
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 103,
									columnNumber: 17
								}, this),
								brand.company_stage && /* @__PURE__ */ (void 0)("span", {
									className: "text-muted-foreground border-l border-border pl-3",
									children: [brand.company_stage, " Stage"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 106,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 95,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 74,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: onClose,
						className: "p-2 bg-muted/50 hover:bg-muted rounded-full text-muted-foreground transition-colors shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { size: 20 }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 116,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 112,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 73,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex-1 overflow-y-auto p-6 sm:p-8",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-1 md:grid-cols-3 gap-8",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "md:col-span-2 space-y-8",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "bg-brand/5 border border-brand/20 rounded-2xl p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-2 text-brand font-semibold mb-2",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { size: 18 }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 129,
												columnNumber: 21
											}, this), "Creator Fit"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 128,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-3xl font-bold text-foreground mb-1",
											children: [brand.influencer_fit_score || "--", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-lg text-muted-foreground font-normal",
												children: "/100"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 134,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 132,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "h-1.5 w-full bg-brand/10 rounded-full overflow-hidden mt-3",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "h-full bg-brand rounded-full",
												style: { width: `${brand.influencer_fit_score || 0}%` }
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 139,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 138,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 127,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "bg-muted/30 border border-border/50 rounded-2xl p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-2 text-muted-foreground font-semibold mb-2",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TrendingUp, { size: 18 }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 148,
												columnNumber: 21
											}, this), "Lead Score"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 147,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-3xl font-bold text-foreground mb-1",
											children: brand.lead_score || "--"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 151,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-sm text-muted-foreground mt-2",
											children: "Overall opportunity signal"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 154,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 146,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 126,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-6",
								children: [(brand.why_now || brand.recent_funding || brand.recent_launch) && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
									className: "text-lg font-bold text-foreground flex items-center gap-2 mb-3",
									children: [/* @__PURE__ */ (void 0)(CircleAlert, {
										size: 18,
										className: "text-brand"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 167,
										columnNumber: 23
									}, this), "Why now?"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 166,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "space-y-3",
									children: [
										brand.why_now && /* @__PURE__ */ (void 0)("p", {
											className: "text-muted-foreground leading-relaxed",
											children: brand.why_now
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 172,
											columnNumber: 25
										}, this),
										brand.recent_funding && /* @__PURE__ */ (void 0)("div", {
											className: "flex items-start gap-3 bg-muted/20 p-4 rounded-xl border border-border/50",
											children: [/* @__PURE__ */ (void 0)("div", { className: "mt-0.5 w-2 h-2 rounded-full bg-green-500 shrink-0" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 178,
												columnNumber: 27
											}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
												className: "font-medium text-foreground block mb-0.5",
												children: "Recent Funding"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 180,
												columnNumber: 29
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "text-sm text-muted-foreground",
												children: brand.recent_funding
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 183,
												columnNumber: 29
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 179,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 177,
											columnNumber: 25
										}, this),
										brand.recent_launch && /* @__PURE__ */ (void 0)("div", {
											className: "flex items-start gap-3 bg-muted/20 p-4 rounded-xl border border-border/50",
											children: [/* @__PURE__ */ (void 0)("div", { className: "mt-0.5 w-2 h-2 rounded-full bg-blue-500 shrink-0" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 191,
												columnNumber: 27
											}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
												className: "font-medium text-foreground block mb-0.5",
												children: "Recent Launch"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 193,
												columnNumber: 29
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "text-sm text-muted-foreground",
												children: brand.recent_launch
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 196,
												columnNumber: 29
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 192,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 190,
											columnNumber: 25
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 170,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 165,
									columnNumber: 19
								}, this), (brand.existing_creator_activity || brand.marketing_activity) && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
									className: "text-lg font-bold text-foreground flex items-center gap-2 mb-3",
									children: [/* @__PURE__ */ (void 0)(TrendingUp, {
										size: 18,
										className: "text-brand"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 210,
										columnNumber: 23
									}, this), "Marketing Activity"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 209,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "space-y-3",
									children: [brand.existing_creator_activity && /* @__PURE__ */ (void 0)("div", {
										className: "bg-muted/20 p-4 rounded-xl border border-border/50",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "font-medium text-foreground block mb-1",
											children: "Creator Activity"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 216,
											columnNumber: 27
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "text-sm text-muted-foreground leading-relaxed",
											children: brand.existing_creator_activity
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 219,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 215,
										columnNumber: 25
									}, this), brand.marketing_activity && /* @__PURE__ */ (void 0)("div", {
										className: "bg-muted/20 p-4 rounded-xl border border-border/50",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "font-medium text-foreground block mb-1",
											children: "General Marketing"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 226,
											columnNumber: 27
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "text-sm text-muted-foreground leading-relaxed",
											children: brand.marketing_activity
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 229,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 225,
										columnNumber: 25
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 213,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 208,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 161,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 124,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "bg-muted/10 border border-border/50 rounded-2xl p-5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "font-bold text-foreground mb-4",
									children: "Contact Information"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 243,
									columnNumber: 17
								}, this), brand.contact_person || brand.email || brand.phone || brand.linkedin ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-4",
									children: [
										brand.contact_person && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
											className: "font-medium text-foreground",
											children: brand.contact_person
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 254,
											columnNumber: 25
										}, this), brand.contact_role && /* @__PURE__ */ (void 0)("div", {
											className: "text-sm text-muted-foreground",
											children: brand.contact_role
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 258,
											columnNumber: 27
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 253,
											columnNumber: 23
										}, this),
										brand.email && /* @__PURE__ */ (void 0)("div", {
											className: "flex flex-col gap-2 pt-2 border-t border-border/50",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "flex items-center gap-2 text-sm",
												children: [/* @__PURE__ */ (void 0)(Mail, {
													size: 16,
													className: "text-muted-foreground shrink-0"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 268,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "truncate flex-1",
													children: brand.email
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 272,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 267,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)("button", {
												onClick: copyEmail,
												className: "w-full text-xs font-medium py-1.5 bg-muted hover:bg-muted/80 rounded-lg transition-colors",
												children: "Copy Email"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 274,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 266,
											columnNumber: 23
										}, this),
										brand.phone && /* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-2 text-sm pt-2 border-t border-border/50",
											children: [/* @__PURE__ */ (void 0)(Phone, {
												size: 16,
												className: "text-muted-foreground shrink-0"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 285,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "truncate",
												children: brand.phone
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 289,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 284,
											columnNumber: 23
										}, this),
										brand.linkedin && /* @__PURE__ */ (void 0)("div", {
											className: "pt-2 border-t border-border/50",
											children: /* @__PURE__ */ (void 0)("a", {
												href: brand.linkedin.startsWith("http") ? brand.linkedin : `https://${brand.linkedin}`,
												target: "_blank",
												rel: "noreferrer",
												className: "flex items-center gap-2 text-sm text-[#0a66c2] hover:underline",
												children: [/* @__PURE__ */ (void 0)(Linkedin, {
													size: 16,
													className: "shrink-0"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 305,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "truncate",
													children: "LinkedIn Profile"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 306,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 295,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 294,
											columnNumber: 23
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 251,
									columnNumber: 19
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-sm text-muted-foreground italic",
									children: "No contact information available."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 312,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 242,
								columnNumber: 15
							}, this), brand.budget_potential && /* @__PURE__ */ (void 0)("div", {
								className: "bg-muted/10 border border-border/50 rounded-2xl p-5",
								children: [/* @__PURE__ */ (void 0)("h3", {
									className: "font-bold text-foreground mb-2",
									children: "Budget Potential"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 320,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "text-lg font-medium text-foreground capitalize",
									children: brand.budget_potential
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 323,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 319,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 241,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 122,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 121,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex-shrink-0 p-6 sm:px-8 bg-muted/10 border-t border-border/50 flex flex-col sm:flex-row items-center gap-4 justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground hidden sm:block",
						children: "Information gathered for discovery purposes."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 334,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 w-full sm:w-auto",
						children: [
							onRefreshResearch && /* @__PURE__ */ (void 0)("button", {
								onClick: onRefreshResearch,
								disabled: isRefreshing,
								className: "px-4 py-2 bg-secondary text-secondary-foreground rounded-lg flex items-center justify-center font-medium border border-border hover:bg-secondary/80 transition-colors shadow-sm disabled:opacity-50",
								children: isRefreshing ? /* @__PURE__ */ (void 0)("span", {
									className: "animate-pulse",
									children: "Researching..."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 345,
									columnNumber: 19
								}, this) : "Refresh Research"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 339,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								disabled: isSaving,
								onClick: onSave,
								className: `flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                ${isSaved ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 group" : "bg-muted text-foreground hover:bg-muted/80 shadow-sm"}
              `,
								children: isSaved ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "w-4 h-4 group-hover:hidden" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 365,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "w-4 h-4 hidden group-hover:block" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 366,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "group-hover:hidden",
										children: "Saved"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 367,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "hidden group-hover:block",
										children: "Remove"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 368,
										columnNumber: 19
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 364,
									columnNumber: 17
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Save, { className: "w-4 h-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 372,
									columnNumber: 19
								}, this), "Save Brand"] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 371,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 352,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => {
									if (!isSaved) onSave();
									onStartOutreach();
								},
								className: "flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { className: "w-4 h-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 386,
									columnNumber: 15
								}, this), "Start Outreach"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 377,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 337,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 333,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 71,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 65,
		columnNumber: 5
	}, this), document.body);
});
//#endregion
export { BrandProfileModal as t };
