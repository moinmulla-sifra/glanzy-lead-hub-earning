import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-CzmrzPTc.mjs";
import { a as useQueryClient, n as useMutation, r as useQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { l as require_react_dom } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { B as ExternalLink, I as Info, L as History, N as Linkedin, O as MapPin, Q as Building2, R as Globe, V as DollarSign, Y as Check, _ as Send, c as TrendingUp, it as Activity, k as Mail, n as X, p as Sparkles, u as Tag, x as Phone, y as Save } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/BrandProfileModal-C5AczfTb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var _jsxFileName = "/app/applet/src/components/BrandProfileModal.tsx";
var BrandProfileModal = import_react.memo(function BrandProfileModal({ brand, isOpen, onClose, isSaved, onSave, isSaving, onRefreshResearch, isRefreshing }) {
	const [showContact, setShowContact] = (0, import_react.useState)(false);
	const queryClient = useQueryClient();
	(0, import_react.useEffect)(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
			setShowContact(false);
		} else document.body.style.overflow = "unset";
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);
	const { data: contactedData, refetch: refetchContacted } = useQuery({
		queryKey: ["brand-contacted-status", brand?.id],
		enabled: !!brand?.id && isOpen,
		queryFn: async () => {
			const { data: session } = await supabase.auth.getSession();
			if (!session.session) return null;
			const { data: workspaces } = await supabase.from("workspaces").select("id");
			if (!workspaces || workspaces.length === 0) return null;
			const { data } = await supabase.from("outreach").select("*").eq("workspace_id", workspaces?.[0]?.id).eq("brand_id", brand.id).eq("status", "contacted").maybeSingle();
			return data;
		}
	});
	const markContactedMutation = useMutation({
		mutationFn: async () => {
			if (!brand) throw new Error("No brand selected");
			const { data: session } = await supabase.auth.getSession();
			if (!session.session) throw new Error("Not authenticated");
			const { data: workspaces } = await supabase.from("workspaces").select("id");
			if (!workspaces || workspaces.length === 0) throw new Error("No workspace");
			const { error } = await supabase.from("outreach").upsert({
				workspace_id: workspaces?.[0]?.id,
				brand_id: brand.id,
				status: "contacted",
				contacted_at: (/* @__PURE__ */ new Date()).toISOString(),
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}, { onConflict: "workspace_id, brand_id" });
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Marked as contacted");
			refetchContacted();
			queryClient.invalidateQueries({ queryKey: ["outreach"] });
		},
		onError: (error) => {
			toast.error("Failed to mark as contacted");
			console.error(error);
		}
	});
	if (!isOpen || !brand) return null;
	const copyEmail = () => {
		if (brand.email) {
			navigator.clipboard.writeText(brand.email);
			toast.success("Email copied to clipboard");
		}
	};
	const hasContactInfo = brand.contact_person || brand.email || brand.phone || brand.linkedin;
	const isContacted = !!contactedData;
	const ScoreCircle = ({ score, label }) => {
		if (score === null || score === void 0) return null;
		return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-col items-center",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: `text-2xl font-bold ${score >= 80 ? "text-green-500" : score >= 60 ? "text-yellow-500" : "text-muted-foreground"}`,
				children: score
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 140,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-1",
				children: label
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 141,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 139,
			columnNumber: 7
		}, this);
	};
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 animate-in fade-in duration-200",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "absolute inset-0 bg-background/80 backdrop-blur-sm",
			onClick: onClose
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 148,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative w-full max-w-5xl h-[95vh] md:h-[90vh] bg-card border border-border/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col slide-in-from-bottom-8 animate-in duration-300",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex-shrink-0 border-b border-border/50 p-6 sm:px-8 bg-muted/10 flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex-1 min-w-0 flex gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "w-20 h-20 bg-muted rounded-2xl flex items-center justify-center border border-border/50 shadow-sm shrink-0 overflow-hidden",
						children: brand.logo_url ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
							src: brand.logo_url,
							alt: brand.company_name,
							className: "w-full h-full object-cover"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 160,
							columnNumber: 17
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Building2, {
							size: 32,
							className: "text-muted-foreground/50"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 162,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 158,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3 mb-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "text-2xl font-bold truncate",
								children: brand.company_name
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 168,
								columnNumber: 17
							}, this), brand.research_status === "verified" && /* @__PURE__ */ (void 0)("span", {
								className: "px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-xs font-medium border border-blue-500/20 flex items-center gap-1",
								children: [/* @__PURE__ */ (void 0)(Check, { size: 12 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 173,
									columnNumber: 21
								}, this), " Verified"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 172,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 167,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-4 text-sm text-muted-foreground flex-wrap",
							children: [
								brand.website && /* @__PURE__ */ (void 0)("a", {
									href: brand.website.startsWith("http") ? brand.website : `https://${brand.website}`,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "flex items-center gap-1.5 hover:text-foreground transition-colors text-brand",
									children: [
										/* @__PURE__ */ (void 0)(Globe, { size: 14 }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 186,
											columnNumber: 21
										}, this),
										brand.domain || brand.website,
										/* @__PURE__ */ (void 0)(ExternalLink, { size: 12 }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 188,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 180,
									columnNumber: 19
								}, this),
								brand.category && /* @__PURE__ */ (void 0)("span", {
									className: "flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ (void 0)(Tag, { size: 14 }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 193,
											columnNumber: 21
										}, this),
										" ",
										brand.category,
										" ",
										brand.subcategory ? ` / ${brand.subcategory}` : ""
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 192,
									columnNumber: 19
								}, this),
								brand.country && /* @__PURE__ */ (void 0)("span", {
									className: "flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ (void 0)(MapPin, { size: 14 }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 198,
											columnNumber: 21
										}, this),
										" ",
										brand.city ? `${brand.city}, ` : "",
										brand.country
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 197,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 178,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 166,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 157,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: onSave,
							disabled: isSaving,
							className: `
                px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2
                ${isSaved ? "bg-brand/10 text-brand border border-brand/20" : "bg-muted text-muted-foreground hover:bg-muted/80 border border-transparent"}
              `,
							children: [isSaved ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { size: 16 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 218,
								columnNumber: 26
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Save, { size: 16 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 218,
								columnNumber: 48
							}, this), isSaved ? "Saved" : "Save"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 206,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setShowContact(true),
							className: "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 bg-brand text-white hover:bg-brand/90 shadow-md shadow-brand/20",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { size: 16 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 226,
								columnNumber: 15
							}, this), "Contact"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 222,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: onClose,
							className: "p-2 -mr-2 text-muted-foreground hover:bg-muted rounded-xl transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { size: 20 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 233,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 229,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 205,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 156,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex-1 overflow-y-auto",
				children: showContact ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-6 sm:p-8 animate-in fade-in duration-300",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between mb-8",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-xl font-bold",
								children: "Contact Information"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 245,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-muted-foreground text-sm mt-1",
								children: ["Business contact details for ", brand.company_name]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 246,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 244,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => setShowContact(false),
								className: "text-sm text-brand hover:underline",
								children: "← Back to Profile"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 248,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 243,
							columnNumber: 15
						}, this),
						!hasContactInfo ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-col items-center justify-center py-12 px-4 text-center border border-border/50 rounded-2xl bg-muted/20",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, {
									size: 32,
									className: "text-muted-foreground/50 mb-3"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 258,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
									className: "text-base font-semibold mb-1",
									children: "No Contact Information Available"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 259,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-sm text-muted-foreground max-w-sm",
									children: "We haven't discovered any verified business contact details for this brand yet. Try refreshing research."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 260,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 257,
							columnNumber: 17
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-card border border-border/50 rounded-2xl overflow-hidden mb-8 shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-px bg-border/50",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "bg-card p-6",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4",
										children: "Primary Contact"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 268,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "space-y-4",
										children: [
											brand.contact_person && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
												className: "text-sm font-medium",
												children: brand.contact_person
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 272,
												columnNumber: 29
											}, this), brand.contact_role && /* @__PURE__ */ (void 0)("div", {
												className: "text-sm text-muted-foreground",
												children: brand.contact_role
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 273,
												columnNumber: 52
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 271,
												columnNumber: 27
											}, this),
											brand.email && /* @__PURE__ */ (void 0)("div", {
												className: "flex items-center gap-3",
												children: [
													/* @__PURE__ */ (void 0)("div", {
														className: "w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center shrink-0",
														children: /* @__PURE__ */ (void 0)(Mail, {
															size: 14,
															className: "text-brand"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 280,
															columnNumber: 31
														}, this)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 279,
														columnNumber: 29
													}, this),
													/* @__PURE__ */ (void 0)("div", {
														className: "flex-1 min-w-0",
														children: [/* @__PURE__ */ (void 0)("div", {
															className: "text-sm font-medium truncate",
															children: brand.email
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 283,
															columnNumber: 31
														}, this), /* @__PURE__ */ (void 0)("div", {
															className: "text-xs text-muted-foreground",
															children: "Business Email"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 284,
															columnNumber: 31
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 282,
														columnNumber: 29
													}, this),
													/* @__PURE__ */ (void 0)("button", {
														onClick: copyEmail,
														className: "p-1.5 text-muted-foreground hover:bg-muted rounded-md transition-colors",
														children: /* @__PURE__ */ (void 0)("span", {
															className: "text-xs font-medium px-2",
															children: "Copy"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 287,
															columnNumber: 31
														}, this)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 286,
														columnNumber: 29
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 278,
												columnNumber: 27
											}, this),
											brand.phone && /* @__PURE__ */ (void 0)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (void 0)("div", {
													className: "w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center shrink-0",
													children: /* @__PURE__ */ (void 0)(Phone, {
														size: 14,
														className: "text-brand"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 295,
														columnNumber: 31
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 294,
													columnNumber: 29
												}, this), /* @__PURE__ */ (void 0)("div", {
													className: "flex-1 min-w-0",
													children: [/* @__PURE__ */ (void 0)("div", {
														className: "text-sm font-medium",
														children: brand.phone
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 298,
														columnNumber: 31
													}, this), /* @__PURE__ */ (void 0)("div", {
														className: "text-xs text-muted-foreground",
														children: "Business Phone"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 299,
														columnNumber: 31
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 297,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 293,
												columnNumber: 27
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 269,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 267,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "bg-card p-6",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4",
										children: "Social & Links"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 307,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "space-y-4",
										children: brand.linkedin && /* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0",
												children: /* @__PURE__ */ (void 0)(Linkedin, {
													size: 14,
													className: "text-blue-500"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 312,
													columnNumber: 31
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 311,
												columnNumber: 29
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "flex-1 min-w-0",
												children: /* @__PURE__ */ (void 0)("a", {
													href: brand.linkedin.startsWith("http") ? brand.linkedin : `https://${brand.linkedin}`,
													target: "_blank",
													rel: "noopener noreferrer",
													className: "text-sm font-medium hover:underline truncate block",
													children: "LinkedIn Profile"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 315,
													columnNumber: 31
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 314,
												columnNumber: 29
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 310,
											columnNumber: 27
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 308,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 306,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 266,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 265,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-end pt-4 border-t border-border/50",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => markContactedMutation.mutate(),
								disabled: markContactedMutation.isPending || isContacted,
								className: `
                    px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2
                    ${isContacted ? "bg-green-500/10 text-green-600 border border-green-500/20" : "bg-brand text-white hover:bg-brand/90 shadow-md"}
                  `,
								children: [markContactedMutation.isPending ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 337,
									columnNumber: 21
								}, this) : isContacted ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { size: 18 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 339,
									columnNumber: 21
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { size: 18 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 341,
									columnNumber: 21
								}, this), isContacted ? "Contacted" : "Mark as Contacted"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 328,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 327,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 242,
					columnNumber: 13
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-6 sm:p-8 space-y-10",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-2 md:grid-cols-4 gap-4 bg-muted/30 p-6 rounded-2xl border border-border/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScoreCircle, {
								score: brand.creator_fit_score,
								label: "Creator Fit"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 353,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScoreCircle, {
								score: brand.opportunity_score,
								label: "Opportunity"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 354,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScoreCircle, {
								score: brand.lead_score,
								label: "Lead Score"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 355,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-col items-center justify-center text-center",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-sm font-bold capitalize",
									children: brand.data_confidence || "Unverified"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 358,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-1",
									children: "Data Confidence"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 359,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 357,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 352,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-1 md:grid-cols-3 gap-8",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "md:col-span-2 space-y-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "text-lg font-bold mb-4 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Info, {
										size: 18,
										className: "text-muted-foreground"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 371,
										columnNumber: 23
									}, this), " About"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 370,
									columnNumber: 21
								}, this), brand.company_description ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-sm text-foreground/80 leading-relaxed",
									children: brand.company_description
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 374,
									columnNumber: 23
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-sm text-muted-foreground italic",
									children: "No description available."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 378,
									columnNumber: 23
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 369,
									columnNumber: 19
								}, this),
								(brand.why_now || brand.opportunity_signals) && /* @__PURE__ */ (void 0)("section", { children: [/* @__PURE__ */ (void 0)("h3", {
									className: "text-lg font-bold mb-4 flex items-center gap-2",
									children: [/* @__PURE__ */ (void 0)(Sparkles, {
										size: 18,
										className: "text-brand"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 386,
										columnNumber: 25
									}, this), " Why This Brand?"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 385,
									columnNumber: 23
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "bg-brand/5 border border-brand/10 rounded-2xl p-5",
									children: [brand.why_now && /* @__PURE__ */ (void 0)("p", {
										className: "text-sm font-medium leading-relaxed mb-4",
										children: brand.why_now
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 390,
										columnNumber: 27
									}, this), brand.opportunity_signals && /* @__PURE__ */ (void 0)("div", {
										className: "flex flex-wrap gap-2",
										children: (Array.isArray(brand.opportunity_signals) ? brand.opportunity_signals : []).map((sig, i) => /* @__PURE__ */ (void 0)("span", {
											className: "px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-semibold",
											children: sig
										}, i, false, {
											fileName: _jsxFileName,
											lineNumber: 395,
											columnNumber: 31
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 393,
										columnNumber: 27
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 388,
									columnNumber: 23
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 384,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-6",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
										className: "text-base font-bold mb-3",
										children: "Products"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 408,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-sm text-muted-foreground space-y-2",
										children: brand.product_description ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: brand.product_description }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 411,
											columnNumber: 27
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "italic",
											children: "Not available"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 413,
											columnNumber: 27
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 409,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 407,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
										className: "text-base font-bold mb-3",
										children: "Target Audience"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 419,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-sm text-muted-foreground space-y-2",
										children: brand.target_audience ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: brand.target_audience }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 422,
											columnNumber: 27
										}, this) : brand.target_demographic ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: brand.target_demographic }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 424,
											columnNumber: 27
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "italic",
											children: "Not available"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 426,
											columnNumber: 27
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 420,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 418,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 406,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "text-lg font-bold mb-4 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TrendingUp, {
										size: 18,
										className: "text-muted-foreground"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 435,
										columnNumber: 23
									}, this), " Marketing Intelligence"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 434,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-4",
									children: [
										brand.marketing_activity && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
											className: "text-sm font-semibold mb-1",
											children: "Marketing Activity"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 440,
											columnNumber: 27
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "text-sm text-muted-foreground",
											children: brand.marketing_activity
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 441,
											columnNumber: 27
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 439,
											columnNumber: 25
										}, this),
										brand.existing_creator_activity && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
											className: "text-sm font-semibold mb-1",
											children: "Creator Activity"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 447,
											columnNumber: 27
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "text-sm text-muted-foreground",
											children: brand.existing_creator_activity
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 448,
											columnNumber: 27
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 446,
											columnNumber: 25
										}, this),
										brand.recent_collaborations && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
											className: "text-sm font-semibold mb-1",
											children: "Recent Collaborations"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 454,
											columnNumber: 27
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "text-sm text-muted-foreground",
											children: brand.recent_collaborations
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 455,
											columnNumber: 27
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 453,
											columnNumber: 25
										}, this),
										!brand.marketing_activity && !brand.existing_creator_activity && !brand.recent_collaborations && /* @__PURE__ */ (void 0)("p", {
											className: "text-sm text-muted-foreground italic",
											children: "No marketing intelligence available."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 460,
											columnNumber: 25
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 437,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 433,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "text-lg font-bold mb-4 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(History, {
										size: 18,
										className: "text-muted-foreground"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 468,
										columnNumber: 23
									}, this), " Recent Activity"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 467,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-3",
									children: [
										brand.recent_launch && /* @__PURE__ */ (void 0)("div", {
											className: "flex gap-3 items-start border border-border/50 p-4 rounded-xl",
											children: [/* @__PURE__ */ (void 0)(Activity, {
												size: 16,
												className: "text-brand mt-0.5 shrink-0"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 473,
												columnNumber: 27
											}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
												className: "text-sm font-semibold",
												children: "Recent Launch"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 475,
												columnNumber: 29
											}, this), /* @__PURE__ */ (void 0)("p", {
												className: "text-sm text-muted-foreground",
												children: brand.recent_launch
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 476,
												columnNumber: 29
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 474,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 472,
											columnNumber: 25
										}, this),
										brand.recent_funding && /* @__PURE__ */ (void 0)("div", {
											className: "flex gap-3 items-start border border-border/50 p-4 rounded-xl",
											children: [/* @__PURE__ */ (void 0)(DollarSign, {
												size: 16,
												className: "text-green-500 mt-0.5 shrink-0"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 482,
												columnNumber: 27
											}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
												className: "text-sm font-semibold",
												children: "Funding Event"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 484,
												columnNumber: 29
											}, this), /* @__PURE__ */ (void 0)("p", {
												className: "text-sm text-muted-foreground",
												children: brand.recent_funding
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 485,
												columnNumber: 29
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 483,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 481,
											columnNumber: 25
										}, this),
										!brand.recent_launch && !brand.recent_funding && /* @__PURE__ */ (void 0)("p", {
											className: "text-sm text-muted-foreground italic",
											children: "No recent activities tracked."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 491,
											columnNumber: 25
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 470,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 466,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 366,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "bg-muted/20 border border-border/50 rounded-2xl p-6",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "text-base font-bold mb-4",
									children: "Brand Information"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 503,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dl", {
									className: "space-y-3 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex justify-between gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", {
												className: "text-muted-foreground",
												children: "Industry"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 506,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", {
												className: "font-medium text-right",
												children: brand.industry || "N/A"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 507,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 505,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex justify-between gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", {
												className: "text-muted-foreground",
												children: "Company Type"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 510,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", {
												className: "font-medium text-right",
												children: brand.company_type || "N/A"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 511,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 509,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex justify-between gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", {
												className: "text-muted-foreground",
												children: "Stage"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 514,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", {
												className: "font-medium text-right",
												children: brand.company_stage || "N/A"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 515,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 513,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex justify-between gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", {
												className: "text-muted-foreground",
												children: "Founded"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 518,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", {
												className: "font-medium text-right",
												children: brand.founded_year || "N/A"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 519,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 517,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex justify-between gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", {
												className: "text-muted-foreground",
												children: "Pricing"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 522,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", {
												className: "font-medium text-right",
												children: brand.price_positioning || brand.budget_potential || "N/A"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 523,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 521,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex justify-between gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", {
												className: "text-muted-foreground",
												children: "Business Model"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 526,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", {
												className: "font-medium text-right",
												children: brand.business_model || "N/A"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 527,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 525,
											columnNumber: 23
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 504,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 502,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "bg-muted/20 border border-border/50 rounded-2xl p-6",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "text-base font-bold mb-4 flex items-center justify-between",
									children: ["Research Status", onRefreshResearch && /* @__PURE__ */ (void 0)("button", {
										onClick: onRefreshResearch,
										disabled: isRefreshing,
										className: "text-xs text-brand hover:underline font-medium",
										children: isRefreshing ? "Refreshing..." : "Refresh"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 537,
										columnNumber: 25
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 534,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dl", {
									className: "space-y-3 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex flex-col gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", {
												className: "text-muted-foreground text-xs uppercase tracking-wider",
												children: "Status"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 548,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", {
												className: "font-medium capitalize",
												children: brand.research_status?.replace("_", " ") || "Candidate"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 549,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 547,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex flex-col gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", {
												className: "text-muted-foreground text-xs uppercase tracking-wider",
												children: "Last Researched"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 552,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", {
												className: "font-medium",
												children: brand.last_researched_at ? new Date(brand.last_researched_at).toLocaleDateString() : "Never"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 553,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 551,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex flex-col gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", {
												className: "text-muted-foreground text-xs uppercase tracking-wider",
												children: "Sources"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 556,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", {
												className: "font-medium",
												children: [brand.source_count || 0, " sources verified"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 557,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 555,
											columnNumber: 23
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 546,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 533,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 499,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 363,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 349,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 239,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 153,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 147,
		columnNumber: 5
	}, this), document.body);
});
//#endregion
export { BrandProfileModal as t };
