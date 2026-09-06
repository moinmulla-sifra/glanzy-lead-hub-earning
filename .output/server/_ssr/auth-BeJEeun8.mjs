import { n as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as supabase, t as ThemeToggle } from "./ThemeToggle-QFaiLLcW.mjs";
import { p as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-BeJEeun8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let active = true;
		supabase.auth.getSession().then(({ data }) => {
			if (active && data.session) navigate({
				to: "/",
				replace: true
			});
		});
		return () => {
			active = false;
		};
	}, [navigate]);
	async function onSubmit(e) {
		e.preventDefault();
		setBusy(true);
		setError(null);
		const { error: authError } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		setBusy(false);
		if (authError) {
			setError(authError.message);
			return;
		}
		navigate({
			to: "/",
			replace: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "glanzy auth-wrap",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "auth-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "eyebrow",
						children: "GLANZY STUDIO"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Lead Command Center" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "sub",
					children: "Private access. Sign in with your team account to continue."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "auth-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "email",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "email",
								type: "email",
								value: email,
								autoComplete: "email",
								required: true,
								onChange: (e) => setEmail(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "auth-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "password",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "password",
								type: "password",
								value: password,
								autoComplete: "current-password",
								required: true,
								onChange: (e) => setPassword(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn primary",
							type: "submit",
							disabled: busy,
							children: busy ? "Signing in…" : "Sign in"
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "auth-error",
							children: error
						}) : null
					]
				})
			]
		})
	});
}
//#endregion
export { AuthPage as component };
