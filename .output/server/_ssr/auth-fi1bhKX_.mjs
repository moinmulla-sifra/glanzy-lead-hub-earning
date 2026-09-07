import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-BEO93jmY.mjs";
import { s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { E as Mail, L as Compass, O as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./auth-Dagac8zo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-fi1bhKX_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/auth.tsx?tsr-split=component";
function AuthPage() {
	const navigate = useNavigate();
	const search = Route.useSearch();
	const [mode, setMode] = (0, import_react.useState)(search.mode || "signin");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [sessionChecked, setSessionChecked] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [accountType, setAccountType] = (0, import_react.useState)("creator");
	(0, import_react.useEffect)(() => {
		supabase.auth.onAuthStateChange((event, session) => {
			if (event === "PASSWORD_RECOVERY") setMode("reset");
		});
		supabase.auth.getSession().then(({ data }) => {
			if (data.session && mode !== "reset") checkProfile(data.session.user.id);
			else setSessionChecked(true);
		});
	}, [mode]);
	const checkProfile = async (uid) => {
		try {
			const { data, error } = await supabase.from("profiles").select("account_type, onboarding_completed").eq("id", uid).single();
			if (error && error.code === "PGRST116") navigate({
				to: "/onboarding",
				replace: true
			});
			else if (data) if (!data.onboarding_completed) navigate({
				to: "/onboarding",
				replace: true
			});
			else navigate({
				to: "/dashboard",
				replace: true
			});
			else navigate({
				to: "/onboarding",
				replace: true
			});
		} catch (err) {
			console.error(err);
			navigate({
				to: "/onboarding",
				replace: true
			});
		} finally {
			setSessionChecked(true);
		}
	};
	const handleAuth = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			if (mode === "signup") {
				if (password.length < 6) throw new Error("Password must be at least 6 characters.");
				if (!fullName) throw new Error("Please enter your name.");
				const { data, error } = await supabase.auth.signUp({
					email,
					password,
					options: { data: {
						full_name: fullName,
						account_type: accountType
					} }
				});
				if (error) throw error;
				if (data.user) if (data.user.identities?.length === 0) toast.error("User already exists or email is taken.");
				else if (data.session) {
					toast.success("Account created!");
					await supabase.from("profiles").upsert({
						id: data.user.id,
						full_name: fullName,
						account_type: accountType
					});
					const workspaceName = accountType === "agency" ? `${fullName}'s Agency` : `${fullName}'s Workspace`;
					const { data: wsData, error: wsError } = await supabase.from("workspaces").insert({
						name: workspaceName,
						type: accountType,
						owner_id: data.user.id
					}).select("id").single();
					if (!wsError && wsData) await supabase.from("workspace_members").insert({
						workspace_id: wsData.id,
						user_id: data.user.id,
						role: "owner"
					});
					navigate({
						to: "/onboarding",
						replace: true
					});
				} else {
					toast.success("Please check your email to verify your account.");
					setMode("signin");
				}
			} else if (mode === "signin") {
				const { data, error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) throw error;
				if (data.session) {
					toast.success("Welcome back!");
					checkProfile(data.user.id);
				}
			} else if (mode === "forgot") {
				const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth` });
				if (error) throw error;
				toast.success("Password reset email sent! Check your inbox.");
				setMode("signin");
			} else if (mode === "reset") {
				if (password.length < 6) throw new Error("Password must be at least 6 characters.");
				const { error } = await supabase.auth.updateUser({ password });
				if (error) throw error;
				toast.success("Password updated successfully!");
				setMode("signin");
			}
		} catch (err) {
			toast.error(err.message || "Authentication failed");
		} finally {
			setLoading(false);
		}
	};
	if (!sessionChecked) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen flex items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "w-8 h-8 animate-spin text-brand" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 179,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 178,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen flex flex-col md:flex-row bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "hidden md:flex flex-col md:w-1/2 lg:w-[55%] bg-muted/30 p-12 relative overflow-hidden border-r border-border/50",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-brand/10 via-background to-background pointer-events-none" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 185,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative z-10 flex items-center gap-3 mb-16",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "w-10 h-10 rounded-xl bg-brand flex items-center justify-center shadow-lg shadow-brand/20",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-white font-bold text-xl leading-none",
							children: "B"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 189,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 188,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-bold text-2xl tracking-tight text-foreground",
						children: "Branzly"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 191,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 187,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative z-10 flex-1 flex flex-col justify-center max-w-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight tracking-tight",
							children: "Discover better brands. Reach out. Close deals."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 197,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-lg text-muted-foreground mb-12",
							children: "The complete creator economy CRM. Find the right opportunities, manage your pipeline, and build stronger brand partnerships."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 200,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Compass, { className: "text-brand w-6 h-6" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 208,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 207,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "font-semibold text-foreground",
									children: "Smart Discovery"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 211,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-sm text-muted-foreground",
									children: "Find brands that match your niche and audience."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 214,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 210,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 206,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "text-brand w-6 h-6" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 222,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 221,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "font-semibold text-foreground",
									children: "Outreach CRM"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 225,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-sm text-muted-foreground",
									children: "Track conversations from saved to won."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 226,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 224,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 220,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 205,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 196,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 184,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex-1 flex items-center justify-center p-6 sm:p-12 relative",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "md:hidden flex items-center gap-3 mb-10 justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "w-10 h-10 rounded-xl bg-brand flex items-center justify-center shadow-lg shadow-brand/20",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-white font-bold text-xl leading-none",
							children: "B"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 241,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 240,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-bold text-2xl tracking-tight text-foreground",
						children: "Branzly"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 245,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 239,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-center mb-8",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "text-3xl font-bold text-foreground mb-2 tracking-tight",
								children: mode === "signin" ? "Welcome back" : mode === "signup" ? "Create an account" : mode === "forgot" ? "Reset password" : "Set new password"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 252,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-muted-foreground",
								children: mode === "signin" ? "Sign in to your account to continue" : mode === "signup" ? "Join Branzly to manage your brand deals" : mode === "forgot" ? "Enter your email to receive a reset link" : "Enter your new password below"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 255,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 251,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
							onSubmit: handleAuth,
							className: "space-y-4",
							children: [
								mode === "signup" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-2 gap-3 mb-4",
									children: [/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => setAccountType("creator"),
										className: `py-3 px-4 rounded-xl border flex flex-col items-center gap-1 transition-all ${accountType === "creator" ? "bg-brand/10 border-brand/50 text-brand" : "bg-background border-border text-muted-foreground hover:bg-muted/50"}`,
										children: /* @__PURE__ */ (void 0)("span", {
											className: "font-semibold text-sm",
											children: "Creator"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 264,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 263,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => setAccountType("agency"),
										className: `py-3 px-4 rounded-xl border flex flex-col items-center gap-1 transition-all ${accountType === "agency" ? "bg-brand/10 border-brand/50 text-brand" : "bg-background border-border text-muted-foreground hover:bg-muted/50"}`,
										children: /* @__PURE__ */ (void 0)("span", {
											className: "font-semibold text-sm",
											children: "Agency"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 267,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 266,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 262,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (void 0)("label", {
										className: "text-sm font-semibold text-foreground",
										children: "Full Name"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 272,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "text",
										required: true,
										value: fullName,
										onChange: (e) => setFullName(e.target.value),
										placeholder: "John Doe",
										className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 275,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 271,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 261,
									columnNumber: 37
								}, this),
								mode !== "reset" && /* @__PURE__ */ (void 0)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (void 0)("label", {
										className: "text-sm font-semibold text-foreground",
										children: "Email"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 280,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "email",
										required: true,
										value: email,
										onChange: (e) => setEmail(e.target.value),
										placeholder: "name@example.com",
										className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 283,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 279,
									columnNumber: 36
								}, this),
								(mode === "signin" || mode === "signup" || mode === "reset") && /* @__PURE__ */ (void 0)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex justify-between items-center",
										children: [/* @__PURE__ */ (void 0)("label", {
											className: "text-sm font-semibold text-foreground",
											children: mode === "reset" ? "New Password" : "Password"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 288,
											columnNumber: 21
										}, this), mode === "signin" && /* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => setMode("forgot"),
											className: "text-xs font-semibold text-brand hover:underline",
											children: "Forgot password?"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 291,
											columnNumber: 43
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 287,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "password",
										required: true,
										value: password,
										onChange: (e) => setPassword(e.target.value),
										placeholder: "••••••••",
										className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 295,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 286,
									columnNumber: 80
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "submit",
									disabled: loading,
									className: "w-full flex items-center justify-center gap-2 bg-foreground text-background font-semibold rounded-xl px-4 py-3.5 hover:bg-foreground/90 transition-all shadow-lg shadow-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed mt-4",
									children: loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "w-5 h-5 animate-spin" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 299,
										columnNumber: 28
									}, this) : mode === "signin" ? "Sign In" : mode === "signup" ? "Create Account" : mode === "forgot" ? "Send Reset Link" : "Update Password"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 298,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 260,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-center mt-6",
							children: mode === "signin" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-sm text-muted-foreground",
								children: [
									"Don't have an account?",
									" ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										onClick: () => setMode("signup"),
										className: "font-semibold text-foreground hover:underline",
										children: "Sign up"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 306,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 304,
								columnNumber: 36
							}, this) : mode === "signup" || mode === "forgot" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-sm text-muted-foreground",
								children: [
									"Already have an account?",
									" ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										onClick: () => setMode("signin"),
										className: "font-semibold text-foreground hover:underline",
										children: "Sign in"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 311,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 309,
								columnNumber: 65
							}, this) : null
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 303,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 250,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 237,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 236,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 182,
		columnNumber: 10
	}, this);
}
//#endregion
export { AuthPage as component };
