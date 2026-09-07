import { n as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/supabase-BEO93jmY.mjs";
import { a as useQueryClient, n as useMutation, o as require_jsx_runtime, r as useQuery, s as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { O as LoaderCircle, i as User, v as Save } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_dashboard.profile-Dxyc7l2U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	if (!userId || profileQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col items-center justify-center h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-8 h-8 animate-spin text-brand" })
	});
	const isAgency = profileQuery.data?.account_type === "agency";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-full gap-6 lg:gap-8 pb-12 animate-in fade-in duration-500 max-w-4xl mx-auto w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-3xl lg:text-4xl font-bold tracking-tight text-foreground flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
					className: "text-brand",
					size: 32
				}), " Profile"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-lg",
				children: "Manage your public identity and brand matching preferences."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			className: "bg-card border border-border/60 rounded-3xl p-6 lg:p-10 subtle-shadow space-y-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-bold text-foreground mb-4",
						children: "Basic Information"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-semibold text-foreground",
									children: "Full Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									name: "full_name",
									value: formData.full_name || "",
									onChange: handleChange,
									className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50"
								})]
							}),
							isAgency && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-semibold text-foreground",
									children: "Agency Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									name: "agency_name",
									value: formData.agency_name || "",
									onChange: handleChange,
									className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-semibold text-foreground",
									children: "Country"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									name: "country",
									value: formData.country || "",
									onChange: handleChange,
									placeholder: "e.g. United States",
									className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50"
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "border-border/50" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-bold text-foreground mb-4",
							children: "Brand Matching"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mb-4",
							children: "This information helps us recommend the best brand opportunities in the For You section."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 max-w-lg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-semibold text-foreground",
								children: "Primary Niche / Category"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								name: "niche",
								value: formData.niche || "",
								onChange: handleChange,
								placeholder: "e.g. Tech, Beauty, Gaming, Lifestyle",
								className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 max-w-2xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-semibold text-foreground",
								children: "Bio / Description"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								name: "bio",
								value: formData.bio || "",
								onChange: handleChange,
								rows: 4,
								placeholder: "Tell brands a little about your content and audience...",
								className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 resize-none"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pt-4 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						disabled: updateProfileMutation.isPending,
						className: "flex items-center gap-2 px-6 py-3 bg-brand text-brand-foreground font-semibold rounded-xl text-sm hover:bg-brand/90 transition-all shadow-sm shadow-brand/20 disabled:opacity-50",
						children: [updateProfileMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "w-4 h-4" }), "Save Profile"]
					})
				})
			]
		})]
	});
}
function ProfilePage() {
	const [userId, setUserId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) setUserId(data.session.user.id);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileView, { userId });
}
//#endregion
export { ProfilePage as component };
