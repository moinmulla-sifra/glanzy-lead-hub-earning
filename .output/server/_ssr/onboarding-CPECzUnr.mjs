import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-CzmrzPTc.mjs";
import { s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { Z as ArrowRight, k as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-CPECzUnr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/onboarding.tsx?tsr-split=component";
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
				updates.niche = primaryNiche;
				updates.content_categories = contentCategories.split(",").map((s) => s.trim()).filter(Boolean);
				updates.platforms = platforms.split(",").map((s) => s.trim()).filter(Boolean);
				updates.audience_range = audienceRange;
			} else {
				if (!agencyName) throw new Error("Please enter your agency name.");
				updates.website = website;
				updates.primary_niche = primaryNiche;
				updates.niche = primaryNiche;
				updates.agency_name = agencyName;
				updates.content_categories = contentCategories.split(",").map((s) => s.trim()).filter(Boolean);
			}
			const profilePayload = {
				id: userId,
				account_type: accountType,
				...updates
			};
			const { error: profileError } = await supabase.from("profiles").upsert(profilePayload).select().single();
			if (profileError) throw profileError;
			const { data: wsMember } = await supabase.from("workspace_members").select("workspace_id").eq("user_id", userId).maybeSingle();
			if (!wsMember) {
				const wsName = accountType === "agency" ? agencyName || "My Agency" : "My Workspace";
				const { data: newWs } = await supabase.from("workspaces").insert({
					name: wsName,
					type: accountType,
					workspace_type: accountType,
					owner_id: userId
				}).select().maybeSingle();
				if (newWs) await supabase.from("workspace_members").insert({
					workspace_id: newWs.id,
					user_id: userId,
					role: "owner"
				});
			} else if (accountType === "agency" && agencyName) await supabase.from("workspaces").update({
				name: agencyName,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", wsMember.workspace_id);
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
			await supabase.from("profiles").upsert({
				id: userId,
				onboarding_completed: true
			});
			const { data: wsMember } = await supabase.from("workspace_members").select("workspace_id").eq("user_id", userId).maybeSingle();
			if (!wsMember) {
				const { data: newWs } = await supabase.from("workspaces").insert({
					name: "My Workspace",
					type: accountType || "creator",
					workspace_type: accountType || "creator",
					owner_id: userId
				}).select().maybeSingle();
				if (newWs) await supabase.from("workspace_members").insert({
					workspace_id: newWs.id,
					user_id: userId,
					role: "owner"
				});
			}
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
	if (!sessionChecked) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen flex items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "w-8 h-8 animate-spin text-brand" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 170,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 169,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen flex items-center justify-center bg-background p-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "w-full max-w-lg bg-card border border-border/50 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-500",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-8",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-center mb-8",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-3xl font-bold text-foreground mb-2 tracking-tight",
						children: "Complete your profile"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 177,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground",
						children: [
							"Let's set up your ",
							accountType,
							" account to get personalized recommendations."
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 180,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 176,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
					onSubmit: handleComplete,
					className: "space-y-4",
					children: [
						accountType === "creator" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "text-sm font-semibold text-foreground",
									children: "Primary Niche *"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 189,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									required: true,
									placeholder: "e.g. Tech, Beauty, Gaming",
									value: primaryNiche,
									onChange: (e) => setPrimaryNiche(e.target.value),
									className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 192,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 188,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "text-sm font-semibold text-foreground",
									children: "Platforms (comma separated)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 195,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									placeholder: "e.g. YouTube, Instagram, TikTok",
									value: platforms,
									onChange: (e) => setPlatforms(e.target.value),
									className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 198,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 194,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "text-sm font-semibold text-foreground",
									children: "Audience Range"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 201,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
									value: audienceRange,
									onChange: (e) => setAudienceRange(e.target.value),
									className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow appearance-none",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "",
											children: "Select range..."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 205,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "1k-10k",
											children: "1k - 10k"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 206,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "10k-50k",
											children: "10k - 50k"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 207,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "50k-100k",
											children: "50k - 100k"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 208,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "100k-500k",
											children: "100k - 500k"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 209,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "500k+",
											children: "500k+"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 210,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 204,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 200,
								columnNumber: 17
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 187,
							columnNumber: 42
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "text-sm font-semibold text-foreground",
									children: "Agency Name *"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 215,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									required: true,
									placeholder: "e.g. Apex Talent Group",
									value: agencyName,
									onChange: (e) => setAgencyName(e.target.value),
									className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 218,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 214,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "text-sm font-semibold text-foreground",
									children: "Website"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 221,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "url",
									placeholder: "https://example.com",
									value: website,
									onChange: (e) => setWebsite(e.target.value),
									className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 224,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 220,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "text-sm font-semibold text-foreground",
									children: "Focus Categories (comma separated)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 227,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									placeholder: "e.g. Tech, Fashion, Lifestyle",
									value: contentCategories,
									onChange: (e) => setContentCategories(e.target.value),
									className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 230,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 226,
								columnNumber: 17
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 213,
							columnNumber: 21
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "text-sm font-semibold text-foreground",
								children: "Country"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 235,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "text",
								placeholder: "e.g. United States",
								value: country,
								onChange: (e) => setCountry(e.target.value),
								className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 238,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 234,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "pt-4 flex flex-col gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "submit",
								disabled: loading,
								className: "w-full flex items-center justify-center gap-2 bg-brand text-brand-foreground font-semibold rounded-xl px-4 py-3.5 hover:bg-brand/90 transition-all shadow-lg shadow-brand/20 disabled:opacity-50 disabled:cursor-not-allowed",
								children: [loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "w-5 h-5 animate-spin" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 243,
									columnNumber: 28
								}, this) : "Complete Profile", !loading && /* @__PURE__ */ (void 0)(ArrowRight, { className: "w-5 h-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 244,
									columnNumber: 30
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 242,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: skipOnboarding,
								disabled: loading,
								className: "w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
								children: "Skip for now"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 247,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 241,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 186,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 175,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 174,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 173,
		columnNumber: 10
	}, this);
}
//#endregion
export { OnboardingPage as component };
