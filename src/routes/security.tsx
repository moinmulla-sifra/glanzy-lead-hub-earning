import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/security")({
  component: SecurityPage,
});

function SecurityPage() {
  return (
    <LegalLayout title="Security Architecture" lastUpdated="September 16, 2026">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            1. Security Overview
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            At Branzly, we take the security of your data seriously. This page
            outlines the specific security measures, architectural decisions,
            and practices we have implemented to protect our platform, your
            accounts, and your workspace data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            2. Authentication & Authorization
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We rely on Supabase, an industry-leading backend-as-a-service
            provider, to manage our authentication layer. Passwords are
            encrypted by Supabase using robust cryptographic standards, and
            Branzly never stores or has access to your plaintext passwords.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-2">
            Session management is handled securely via signed JWTs (JSON Web
            Tokens) that enforce short-lived access and proper validation on
            every authenticated request.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            3. Database Security & Isolation
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            All relational data is stored in PostgreSQL databases hosted by
            Supabase. We enforce strict data isolation using PostgreSQL
            Row-Level Security (RLS).
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
            <li>
              <strong>Row-Level Security (RLS):</strong> Every database query is
              evaluated against RLS policies at the database engine level. This
              ensures that users can only read, write, or modify data (such as
              saved brands or outreach history) that belongs strictly to their
              own user ID or their authorized workspace.
            </li>
            <li>
              <strong>Workspace Isolation:</strong> For team and agency
              accounts, data is logically isolated by `workspace_id`. A user
              must have an active `workspace_members` record verifying their
              access before the database will return any workspace-specific
              data.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            4. Encryption in Transit and at Rest
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            <strong>In Transit:</strong> All communication between your browser
            and Branzly's servers, as well as between our servers and our
            database infrastructure, is encrypted using HTTPS/TLS. We do not
            support unencrypted HTTP connections.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-2">
            <strong>At Rest:</strong> Our underlying database provider
            (Supabase) ensures that data volumes and backups are encrypted at
            rest using modern AES-256 encryption standards provided by the
            underlying cloud infrastructure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            5. Infrastructure & Application Security
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Branzly is built using modern web frameworks (React, Vite) that
            inherently protect against common vulnerabilities like Cross-Site
            Scripting (XSS).
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
            <li>
              <strong>No Secrets in Client:</strong> Sensitive API keys,
              database service-role keys, and operational credentials are never
              exposed to the browser. Only safe, public-facing identifiers are
              bundled into the client application.
            </li>
            <li>
              <strong>Externalized Research Architecture:</strong> Branzly
              itself does not run vulnerable web-scraping clusters or manage
              third-party API credentials (like Apify or TinyFish) in the web
              environment. Brand intelligence is ingested securely from a
              scheduled external workflow, reducing the attack surface of the
              main web application.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            6. Security Limitations
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            As a developing startup project, we want to be transparent about our
            current security posture. We are not currently certified under
            compliance frameworks such as SOC 2, ISO 27001, or HIPAA. While we
            employ strong architectural practices like RLS and encryption, we do
            not guarantee absolute protection against all possible threats.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            7. Responsible Disclosure
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We value the work of security researchers and the community in
            helping keep our platform safe. If you believe you have discovered a
            security vulnerability in Branzly, we ask that you report it to us
            responsibly.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-2">
            Please email reports to:{" "}
            <strong>
              <a
                href="mailto:support@branzly.dedyn.io"
                className="text-brand hover:underline"
              >
                support@branzly.dedyn.io
              </a>
            </strong>
          </p>
          <p className="text-muted-foreground leading-relaxed mt-2">
            When reporting, please include:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
            <li>A detailed description of the vulnerability.</li>
            <li>
              Clear steps to reproduce the issue (including affected pages or
              functions).
            </li>
            <li>Screenshots or video recordings if applicable.</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-2">
            We kindly ask that you do not execute disruptive testing, such as
            Denial of Service (DoS) attacks, or access/modify data belonging to
            other users during your testing.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
