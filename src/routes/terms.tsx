import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="September 16, 2026">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            1. Introduction & Acceptance of Terms
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing or using Branzly (the "Service"), operated by Glanzy
            Studio under the Mirza Group, you agree to be bound by these Terms
            of Service. If you do not agree to these terms, you may not access
            or use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            2. About Branzly
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Branzly is an AI-powered brand discovery and intelligence platform
            designed to help creators, agencies, and marketing professionals
            organize and discover business opportunities. Branzly provides
            software tools and aggregates business information; it does not
            guarantee partnerships, campaign results, or business outcomes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            3. Eligibility and User Accounts
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            You must be at least 18 years old to use this Service. When creating
            an account (whether a creator, agency, or brand account), you must
            provide accurate and complete information. You are solely
            responsible for maintaining the security of your account and
            password. Workspace owners are responsible for the actions of their
            invited team members.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            4. Acceptable Use and Prohibited Activities
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            You agree not to engage in platform abuse. Specifically, you must
            not:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>
              Use automated scripts, bots, scrapers, or reverse engineering to
              extract data from Branzly.
            </li>
            <li>
              Use the Service for sending unsolicited spam, malicious outreach,
              or harassing communications to brands or contacts discovered on
              the platform.
            </li>
            <li>
              Attempt to bypass security measures, Row-Level Security, or access
              data belonging to other workspaces.
            </li>
            <li>
              Use the platform for any illegal, fraudulent, or unauthorized
              purpose.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            5. Brand Data and Public Information
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Branzly aggregates and displays brand intelligence, social metrics,
            contact details, and marketing signals. This information may be
            sourced from public websites, automated external research processes
            (such as scheduled ChatGPT workflows), and third-party data
            providers.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-2">
            <strong>Important Disclaimer Regarding Accuracy:</strong> We do not
            guarantee that every business detail, contact email, or opportunity
            signal is complete, current, error-free, or accurate. Business
            information changes rapidly. The presence of a brand on Branzly does
            not imply that the brand endorses Branzly, wants a collaboration,
            has an active budget, or will respond to your outreach.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            6. Outreach and Contact Responsibilities
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Branzly provides workflow tools to help you track your outreach
            (e.g., the "Contacted" status). Branzly does not automatically send
            emails or negotiate deals on your behalf. You are entirely
            responsible for your own outreach, pitches, negotiations, and
            compliance with anti-spam laws (such as CAN-SPAM or GDPR) when
            contacting businesses found through the platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            7. Intellectual Property
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The Branzly platform, its original content, features, and
            functionality are owned by Glanzy Studio/Mirza Group. Trademarks,
            logos, and company names of third-party brands displayed on the
            platform remain the property of their respective owners and are used
            for identification and informational purposes only.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            8. Subscriptions, Pricing, and Billing
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Access to certain features or usage limits may require a paid
            subscription. Prices and features are subject to change. Fees are
            non-refundable except as required by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            9. Termination
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We may terminate or suspend your account and access to the Service
            immediately, without prior notice or liability, for any reason,
            including without limitation if you breach these Terms of Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            10. Limitation of Liability and Disclaimers
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis.
            Branzly makes no warranties, expressed or implied, regarding the
            availability, reliability, or accuracy of the service. In no event
            shall Branzly, Glanzy Studio, Mirza Group, or its directors,
            employees, or partners be liable for any indirect, incidental,
            special, consequential, or punitive damages, including loss of
            profits, data, or goodwill, arising out of your use of the platform
            or reliance on the brand intelligence provided.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            11. Governing Law
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            These Terms shall be governed and construed in accordance with the
            laws of India, without regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            12. Changes to Terms
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We reserve the right to modify or replace these Terms at any time.
            By continuing to access or use our Service after those revisions
            become effective, you agree to be bound by the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            13. Contact Information
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about these Terms, please contact us at:{" "}
            <a
              href="mailto:support@branzly.dedyn.io"
              className="text-brand hover:underline"
            >
              support@branzly.dedyn.io
            </a>
            .
          </p>
        </section>

        <p className="text-xs text-muted-foreground mt-12 pt-8 border-t border-border/50">
          <em>
            Developer Note: This document has been prepared based on current
            platform capabilities. Formal legal review is recommended prior to
            broad commercial distribution.
          </em>
        </p>
      </div>
    </LegalLayout>
  );
}
