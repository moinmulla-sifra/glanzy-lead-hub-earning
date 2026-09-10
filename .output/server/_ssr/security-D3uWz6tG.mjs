import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as LegalLayout } from "./LegalLayout-6PSef7lZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/security-D3uWz6tG.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/security.tsx?tsr-split=component";
function SecurityPage() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LegalLayout, {
		title: "Security Architecture",
		lastUpdated: "September 16, 2026",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-2xl font-bold mt-8 mb-4 text-foreground",
					children: "1. Security Overview"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 6,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-muted-foreground leading-relaxed",
					children: "At Branzly, we take the security of your data seriously. This page outlines the specific security measures, architectural decisions, and practices we have implemented to protect our platform, your accounts, and your workspace data."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 9,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 5,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-2xl font-bold mt-8 mb-4 text-foreground",
						children: "2. Authentication & Authorization"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 18,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground leading-relaxed",
						children: "We rely on Supabase, an industry-leading backend-as-a-service provider, to manage our authentication layer. Passwords are encrypted by Supabase using robust cryptographic standards, and Branzly never stores or has access to your plaintext passwords."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 21,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground leading-relaxed mt-2",
						children: "Session management is handled securely via signed JWTs (JSON Web Tokens) that enforce short-lived access and proper validation on every authenticated request."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 27,
						columnNumber: 11
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 17,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-2xl font-bold mt-8 mb-4 text-foreground",
						children: "3. Database Security & Isolation"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 35,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground leading-relaxed",
						children: "All relational data is stored in PostgreSQL databases hosted by Supabase. We enforce strict data isolation using PostgreSQL Row-Level Security (RLS)."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 38,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
						className: "list-disc pl-6 text-muted-foreground space-y-2 mt-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Row-Level Security (RLS):" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 45,
							columnNumber: 15
						}, this), " Every database query is evaluated against RLS policies at the database engine level. This ensures that users can only read, write, or modify data (such as saved brands or outreach history) that belongs strictly to their own user ID or their authorized workspace."] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 44,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Workspace Isolation:" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 52,
							columnNumber: 15
						}, this), " For team and agency accounts, data is logically isolated by `workspace_id`. A user must have an active `workspace_members` record verifying their access before the database will return any workspace-specific data."] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 51,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 43,
						columnNumber: 11
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 34,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-2xl font-bold mt-8 mb-4 text-foreground",
						children: "4. Encryption in Transit and at Rest"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 62,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground leading-relaxed",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "In Transit:" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 66,
							columnNumber: 13
						}, this), " All communication between your browser and Branzly's servers, as well as between our servers and our database infrastructure, is encrypted using HTTPS/TLS. We do not support unencrypted HTTP connections."]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 65,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground leading-relaxed mt-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "At Rest:" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 72,
							columnNumber: 13
						}, this), " Our underlying database provider (Supabase) ensures that data volumes and backups are encrypted at rest using modern AES-256 encryption standards provided by the underlying cloud infrastructure."]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 71,
						columnNumber: 11
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 61,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-2xl font-bold mt-8 mb-4 text-foreground",
						children: "5. Infrastructure & Application Security"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 80,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground leading-relaxed",
						children: "Branzly is built using modern web frameworks (React, Vite) that inherently protect against common vulnerabilities like Cross-Site Scripting (XSS)."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 83,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
						className: "list-disc pl-6 text-muted-foreground space-y-2 mt-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "No Secrets in Client:" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 90,
							columnNumber: 15
						}, this), " Sensitive API keys, database service-role keys, and operational credentials are never exposed to the browser. Only safe, public-facing identifiers are bundled into the client application."] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 89,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Externalized Research Architecture:" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 96,
							columnNumber: 15
						}, this), " Branzly itself does not run vulnerable web-scraping clusters or manage third-party API credentials (like Apify or TinyFish) in the web environment. Brand intelligence is ingested securely from a scheduled external workflow, reducing the attack surface of the main web application."] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 95,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 88,
						columnNumber: 11
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 79,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-2xl font-bold mt-8 mb-4 text-foreground",
					children: "6. Security Limitations"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 107,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-muted-foreground leading-relaxed",
					children: "As a developing startup project, we want to be transparent about our current security posture. We are not currently certified under compliance frameworks such as SOC 2, ISO 27001, or HIPAA. While we employ strong architectural practices like RLS and encryption, we do not guarantee absolute protection against all possible threats."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 110,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 106,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-2xl font-bold mt-8 mb-4 text-foreground",
						children: "7. Responsible Disclosure"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 120,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground leading-relaxed",
						children: "We value the work of security researchers and the community in helping keep our platform safe. If you believe you have discovered a security vulnerability in Branzly, we ask that you report it to us responsibly."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 123,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground leading-relaxed mt-2",
						children: [
							"Please email reports to:",
							" ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
								href: "mailto:support@branzly.dedyn.io",
								className: "text-brand hover:underline",
								children: "support@branzly.dedyn.io"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 132,
								columnNumber: 15
							}, this) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 131,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 129,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground leading-relaxed mt-2",
						children: "When reporting, please include:"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 137,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
						className: "list-disc pl-6 text-muted-foreground space-y-2 mt-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "A detailed description of the vulnerability." }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 141,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Clear steps to reproduce the issue (including affected pages or functions)." }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 142,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Screenshots or video recordings if applicable." }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 146,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 140,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground leading-relaxed mt-2",
						children: "We kindly ask that you do not execute disruptive testing, such as Denial of Service (DoS) attacks, or access/modify data belonging to other users during your testing."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 148,
						columnNumber: 11
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 119,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 4,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 3,
		columnNumber: 10
	}, this);
}
//#endregion
export { SecurityPage as component };
