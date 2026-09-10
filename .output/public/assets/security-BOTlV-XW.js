import { t as e } from "./jsx-runtime-Cltr0gcK.js";
import { t } from "./LegalLayout-DDWuOMYG.js";
var n = e();
function r() {
  return (0, n.jsx)(t, {
    title: `Security Architecture`,
    lastUpdated: `September 16, 2026`,
    children: (0, n.jsxs)(`div`, {
      className: `space-y-8`,
      children: [
        (0, n.jsxs)(`section`, {
          children: [
            (0, n.jsx)(`h2`, {
              className: `text-2xl font-bold mt-8 mb-4 text-foreground`,
              children: `1. Security Overview`,
            }),
            (0, n.jsx)(`p`, {
              className: `text-muted-foreground leading-relaxed`,
              children: `At Branzly, we take the security of your data seriously. This page outlines the specific security measures, architectural decisions, and practices we have implemented to protect our platform, your accounts, and your workspace data.`,
            }),
          ],
        }),
        (0, n.jsxs)(`section`, {
          children: [
            (0, n.jsx)(`h2`, {
              className: `text-2xl font-bold mt-8 mb-4 text-foreground`,
              children: `2. Authentication & Authorization`,
            }),
            (0, n.jsx)(`p`, {
              className: `text-muted-foreground leading-relaxed`,
              children: `We rely on Supabase, an industry-leading backend-as-a-service provider, to manage our authentication layer. Passwords are encrypted by Supabase using robust cryptographic standards, and Branzly never stores or has access to your plaintext passwords.`,
            }),
            (0, n.jsx)(`p`, {
              className: `text-muted-foreground leading-relaxed mt-2`,
              children: `Session management is handled securely via signed JWTs (JSON Web Tokens) that enforce short-lived access and proper validation on every authenticated request.`,
            }),
          ],
        }),
        (0, n.jsxs)(`section`, {
          children: [
            (0, n.jsx)(`h2`, {
              className: `text-2xl font-bold mt-8 mb-4 text-foreground`,
              children: `3. Database Security & Isolation`,
            }),
            (0, n.jsx)(`p`, {
              className: `text-muted-foreground leading-relaxed`,
              children: `All relational data is stored in PostgreSQL databases hosted by Supabase. We enforce strict data isolation using PostgreSQL Row-Level Security (RLS).`,
            }),
            (0, n.jsxs)(`ul`, {
              className: `list-disc pl-6 text-muted-foreground space-y-2 mt-2`,
              children: [
                (0, n.jsxs)(`li`, {
                  children: [
                    (0, n.jsx)(`strong`, {
                      children: `Row-Level Security (RLS):`,
                    }),
                    ` Every database query is evaluated against RLS policies at the database engine level. This ensures that users can only read, write, or modify data (such as saved brands or outreach history) that belongs strictly to their own user ID or their authorized workspace.`,
                  ],
                }),
                (0, n.jsxs)(`li`, {
                  children: [
                    (0, n.jsx)(`strong`, { children: `Workspace Isolation:` }),
                    " For team and agency accounts, data is logically isolated by `workspace_id`. A user must have an active `workspace_members` record verifying their access before the database will return any workspace-specific data.",
                  ],
                }),
              ],
            }),
          ],
        }),
        (0, n.jsxs)(`section`, {
          children: [
            (0, n.jsx)(`h2`, {
              className: `text-2xl font-bold mt-8 mb-4 text-foreground`,
              children: `4. Encryption in Transit and at Rest`,
            }),
            (0, n.jsxs)(`p`, {
              className: `text-muted-foreground leading-relaxed`,
              children: [
                (0, n.jsx)(`strong`, { children: `In Transit:` }),
                ` All communication between your browser and Branzly's servers, as well as between our servers and our database infrastructure, is encrypted using HTTPS/TLS. We do not support unencrypted HTTP connections.`,
              ],
            }),
            (0, n.jsxs)(`p`, {
              className: `text-muted-foreground leading-relaxed mt-2`,
              children: [
                (0, n.jsx)(`strong`, { children: `At Rest:` }),
                ` Our underlying database provider (Supabase) ensures that data volumes and backups are encrypted at rest using modern AES-256 encryption standards provided by the underlying cloud infrastructure.`,
              ],
            }),
          ],
        }),
        (0, n.jsxs)(`section`, {
          children: [
            (0, n.jsx)(`h2`, {
              className: `text-2xl font-bold mt-8 mb-4 text-foreground`,
              children: `5. Infrastructure & Application Security`,
            }),
            (0, n.jsx)(`p`, {
              className: `text-muted-foreground leading-relaxed`,
              children: `Branzly is built using modern web frameworks (React, Vite) that inherently protect against common vulnerabilities like Cross-Site Scripting (XSS).`,
            }),
            (0, n.jsxs)(`ul`, {
              className: `list-disc pl-6 text-muted-foreground space-y-2 mt-2`,
              children: [
                (0, n.jsxs)(`li`, {
                  children: [
                    (0, n.jsx)(`strong`, { children: `No Secrets in Client:` }),
                    ` Sensitive API keys, database service-role keys, and operational credentials are never exposed to the browser. Only safe, public-facing identifiers are bundled into the client application.`,
                  ],
                }),
                (0, n.jsxs)(`li`, {
                  children: [
                    (0, n.jsx)(`strong`, {
                      children: `Externalized Research Architecture:`,
                    }),
                    ` Branzly itself does not run vulnerable web-scraping clusters or manage third-party API credentials (like Apify or TinyFish) in the web environment. Brand intelligence is ingested securely from a scheduled external workflow, reducing the attack surface of the main web application.`,
                  ],
                }),
              ],
            }),
          ],
        }),
        (0, n.jsxs)(`section`, {
          children: [
            (0, n.jsx)(`h2`, {
              className: `text-2xl font-bold mt-8 mb-4 text-foreground`,
              children: `6. Security Limitations`,
            }),
            (0, n.jsx)(`p`, {
              className: `text-muted-foreground leading-relaxed`,
              children: `As a developing startup project, we want to be transparent about our current security posture. We are not currently certified under compliance frameworks such as SOC 2, ISO 27001, or HIPAA. While we employ strong architectural practices like RLS and encryption, we do not guarantee absolute protection against all possible threats.`,
            }),
          ],
        }),
        (0, n.jsxs)(`section`, {
          children: [
            (0, n.jsx)(`h2`, {
              className: `text-2xl font-bold mt-8 mb-4 text-foreground`,
              children: `7. Responsible Disclosure`,
            }),
            (0, n.jsx)(`p`, {
              className: `text-muted-foreground leading-relaxed`,
              children: `We value the work of security researchers and the community in helping keep our platform safe. If you believe you have discovered a security vulnerability in Branzly, we ask that you report it to us responsibly.`,
            }),
            (0, n.jsxs)(`p`, {
              className: `text-muted-foreground leading-relaxed mt-2`,
              children: [
                `Please email reports to: `,
                (0, n.jsx)(`strong`, {
                  children: (0, n.jsx)(`a`, {
                    href: `mailto:support@branzly.dedyn.io`,
                    className: `text-brand hover:underline`,
                    children: `support@branzly.dedyn.io`,
                  }),
                }),
              ],
            }),
            (0, n.jsx)(`p`, {
              className: `text-muted-foreground leading-relaxed mt-2`,
              children: `When reporting, please include:`,
            }),
            (0, n.jsxs)(`ul`, {
              className: `list-disc pl-6 text-muted-foreground space-y-2 mt-2`,
              children: [
                (0, n.jsx)(`li`, {
                  children: `A detailed description of the vulnerability.`,
                }),
                (0, n.jsx)(`li`, {
                  children: `Clear steps to reproduce the issue (including affected pages or functions).`,
                }),
                (0, n.jsx)(`li`, {
                  children: `Screenshots or video recordings if applicable.`,
                }),
              ],
            }),
            (0, n.jsx)(`p`, {
              className: `text-muted-foreground leading-relaxed mt-2`,
              children: `We kindly ask that you do not execute disruptive testing, such as Denial of Service (DoS) attacks, or access/modify data belonging to other users during your testing.`,
            }),
          ],
        }),
      ],
    }),
  });
}
export { r as component };
