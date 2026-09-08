import { n as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/supabase-CzmrzPTc.mjs";
import { a as useQueryClient, n as useMutation, r as useQuery, s as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react.mjs";
import { O as LoaderCircle, i as User, v as Save } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_dashboard.profile-4X3rt_Hl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/ProfileView.tsx";
function ProfileView({ userId }) {
	const queryClient = useQueryClient();
	const [formData, setFormData] = (0, import_react.useState)({});
	const profileQuery = useQuery({
		queryKey: ["profile", userId],
		enabled: !!userId,
		queryFn: async () => {
			const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
			if (error) throw error;
			return data;
		}
	});
	(0, import_react.useEffect)(() => {
		if (profileQuery.data) setFormData(profileQuery.data);
	}, [profileQuery.data]);
	const updateProfileMutation = useMutation({
		mutationFn: async (updates) => {
			const { error } = await supabase.from("profiles").update({
				...updates,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", userId);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Profile updated successfully");
			queryClient.invalidateQueries({ queryKey: ["profile"] });
		},
		onError: (err) => toast.error(err.message || "Failed to update profile")
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!userId) return;
		updateProfileMutation.mutate(formData);
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value
		}));
	};
	if (!userId || profileQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex flex-col items-center justify-center h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "w-8 h-8 animate-spin text-brand" }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 63,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 62,
		columnNumber: 7
	}, this);
	const isAgency = profileQuery.data?.account_type === "agency";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex flex-col h-full gap-6 lg:gap-8 pb-12 animate-in fade-in duration-500 max-w-4xl mx-auto w-full",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-col gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "text-3xl lg:text-4xl font-bold tracking-tight text-foreground flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, {
					className: "text-brand",
					size: 32
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 74,
					columnNumber: 11
				}, this), " Profile"]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 73,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-muted-foreground text-lg",
				children: "Manage your public identity and brand matching preferences."
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 76,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 72,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
			onSubmit: handleSubmit,
			className: "bg-card border border-border/60 rounded-3xl p-6 lg:p-10 subtle-shadow space-y-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-xl font-bold text-foreground mb-4",
						children: "Basic Information"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 87,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "text-sm font-semibold text-foreground",
									children: "Full Name"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 92,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									name: "full_name",
									value: formData.full_name || "",
									onChange: handleChange,
									className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 95,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 91,
								columnNumber: 13
							}, this),
							isAgency && /* @__PURE__ */ (void 0)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (void 0)("label", {
									className: "text-sm font-semibold text-foreground",
									children: "Agency Name"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 106,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("input", {
									type: "text",
									name: "agency_name",
									value: formData.agency_name || "",
									onChange: handleChange,
									className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 109,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 105,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "text-sm font-semibold text-foreground",
									children: "Country"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 120,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									name: "country",
									value: formData.country || "",
									onChange: handleChange,
									placeholder: "e.g. United States",
									className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 123,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 119,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 90,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 86,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("hr", { className: "border-border/50" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 135,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-xl font-bold text-foreground mb-4",
							children: "Brand Matching"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 139,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm text-muted-foreground mb-4",
							children: "This information helps us recommend the best brand opportunities in the For You section."
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 142,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-2 max-w-lg",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "text-sm font-semibold text-foreground",
								children: "Primary Niche / Category"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 148,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "text",
								name: "niche",
								value: formData.niche || "",
								onChange: handleChange,
								placeholder: "e.g. Tech, Beauty, Gaming, Lifestyle",
								className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 151,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 147,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-2 max-w-2xl",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "text-sm font-semibold text-foreground",
								children: "Bio / Description"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 162,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
								name: "bio",
								value: formData.bio || "",
								onChange: handleChange,
								rows: 4,
								placeholder: "Tell brands a little about your content and audience...",
								className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 resize-none"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 165,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 161,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 138,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "pt-4 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "submit",
						disabled: updateProfileMutation.isPending,
						className: "flex items-center gap-2 px-6 py-3 bg-brand text-brand-foreground font-semibold rounded-xl text-sm hover:bg-brand/90 transition-all shadow-sm shadow-brand/20 disabled:opacity-50",
						children: [updateProfileMutation.isPending ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "w-4 h-4 animate-spin" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 183,
							columnNumber: 15
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Save, { className: "w-4 h-4" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 185,
							columnNumber: 15
						}, this), "Save Profile"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 177,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 176,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 81,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 71,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/_dashboard.profile.tsx?tsr-split=component";
function ProfilePage() {
	const [userId, setUserId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) setUserId(data.session.user.id);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProfileView, { userId }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 15,
		columnNumber: 10
	}, this);
}
//#endregion
export { ProfilePage as component };
