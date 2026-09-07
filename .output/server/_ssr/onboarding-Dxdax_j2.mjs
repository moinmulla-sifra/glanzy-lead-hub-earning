import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-BEO93jmY.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as LoaderCircle, Y as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-Dxdax_j2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OnboardingPage() {
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [sessionChecked, setSessionChecked] = (0, import_react.useState)(false);
	const [userId, setUserId] = (0, import_react.useState)(null);
	const [accountType, setAccountType] = (0, import_react.useState)("creator");
	const [primaryNiche, setPrimaryNiche] = (0, import_react.useState)("");
	const [country, setCountry] = (0, import_react.useState)("");
	const [agencyName, setAgencyName] = (0, import_react.useState)("");
	const [contentCategories, setContentCategories] = (0, import_react.useState)("");
	const [platforms, setPlatforms] = (0, import_react.useState)("");
	const [audienceRange, setAudienceRange] = (0, import_react.useState)("");
	const [website, setWebsite] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (!data.session) {
				navigate({
					to: "/auth",
					replace: true
				});
				return;
			}
			setUserId(data.session.user.id);
			supabase.from("profiles").select("account_type, onboarding_completed, primary_niche").eq("id", data.session.user.id).single().then(({ data: profile, error }) => {
				if (profile) if (profile.onboarding_completed) navigate({
					to: "/dashboard",
					replace: true
				});
				else {
					setAccountType(profile.account_type);
					setSessionChecked(true);
				}
				else setSessionChecked(true);
			});
		});
	}, [navigate]);
	const handleComplete = async (e) => {
		e.preventDefault();
		if (!userId) return;
		setLoading(true);
		try {
			const updates = {
				country,
				onboarding_completed: true
			};
			if (accountType === "creator") {
				if (!primaryNiche) throw new Error("Please enter your primary niche.");
				updates.primary_niche = primaryNiche;
				updates.content_categories = contentCategories.split(",").map((s) => s.trim()).filter(Boolean);
				updates.platforms = platforms.split(",").map((s) => s.trim()).filter(Boolean);
				updates.audience_range = audienceRange;
			} else {
				if (!agencyName) throw new Error("Please enter your agency name.");
				updates.website = website;
				updates.primary_niche = primaryNiche;
				updates.content_categories = contentCategories.split(",").map((s) => s.trim()).filter(Boolean);
			}
			const { error: profileError } = await supabase.from("profiles").update(updates).eq("id", userId);
			if (profileError) throw profileError;
			if (accountType === "agency") {
				const { data: wsMember } = await supabase.from("workspace_members").select("workspace_id").eq("user_id", userId).eq("role", "owner").single();
				if (wsMember) await supabase.from("workspaces").update({ name: agencyName }).eq("id", wsMember.workspace_id);
			}
			toast.success("Welcome to Branzly!");
			navigate({
				to: "/dashboard",
				replace: true
			});
		} catch (err) {
			toast.error(err.message || "Failed to save profile");
		} finally {
			setLoading(false);
		}
	};
	const skipOnboarding = async () => {
		if (!userId) return;
		setLoading(true);
		try {
			await supabase.from("profiles").update({ onboarding_completed: true }).eq("id", userId);
			navigate({
				to: "/dashboard",
				replace: true
			});
		} catch (err) {
			toast.error("Failed to skip");
		} finally {
			setLoading(false);
		}
	};
	if (!sessionChecked) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-8 h-8 animate-spin text-brand" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center bg-background p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full max-w-lg bg-card border border-border/50 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-500",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-bold text-foreground mb-2 tracking-tight",
						children: "Complete your profile"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted-foreground",
						children: [
							"Let's set up your ",
							accountType,
							" account to get personalized recommendations."
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleComplete,
					className: "space-y-4",
					children: [
						accountType === "creator" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-semibold text-foreground",
									children: "Primary Niche *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									placeholder: "e.g. Tech, Beauty, Gaming",
									value: primaryNiche,
									onChange: (e) => setPrimaryNiche(e.target.value),
									className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-semibold text-foreground",
									children: "Platforms (comma separated)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "e.g. YouTube, Instagram, TikTok",
									value: platforms,
									onChange: (e) => setPlatforms(e.target.value),
									className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-semibold text-foreground",
									children: "Audience Range"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: audienceRange,
									onChange: (e) => setAudienceRange(e.target.value),
									className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow appearance-none",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Select range..."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "1k-10k",
											children: "1k - 10k"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "10k-50k",
											children: "10k - 50k"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "50k-100k",
											children: "50k - 100k"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "100k-500k",
											children: "100k - 500k"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "500k+",
											children: "500k+"
										})
									]
								})]
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-semibold text-foreground",
									children: "Agency Name *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									placeholder: "e.g. Apex Talent Group",
									value: agencyName,
									onChange: (e) => setAgencyName(e.target.value),
									className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-semibold text-foreground",
									children: "Website"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "url",
									placeholder: "https://example.com",
									value: website,
									onChange: (e) => setWebsite(e.target.value),
									className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-semibold text-foreground",
									children: "Focus Categories (comma separated)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "e.g. Tech, Fashion, Lifestyle",
									value: contentCategories,
									onChange: (e) => setContentCategories(e.target.value),
									className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow"
								})]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-semibold text-foreground",
								children: "Country"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "e.g. United States",
								value: country,
								onChange: (e) => setCountry(e.target.value),
								className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-4 flex flex-col gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: loading,
								className: "w-full flex items-center justify-center gap-2 bg-brand text-brand-foreground font-semibold rounded-xl px-4 py-3.5 hover:bg-brand/90 transition-all shadow-lg shadow-brand/20 disabled:opacity-50 disabled:cursor-not-allowed",
								children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-5 h-5 animate-spin" }) : "Complete Profile", !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-5 h-5" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: skipOnboarding,
								disabled: loading,
								className: "w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
								children: "Skip for now"
							})]
						})
					]
				})]
			})
		})
	});
}
//#endregion
export { OnboardingPage as component };
