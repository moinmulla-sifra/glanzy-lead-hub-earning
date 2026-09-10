import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/policies")({
  component: PoliciesPage,
});

function PoliciesPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="September 16, 2026">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            1. Introduction
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Welcome to Branzly. We respect your privacy and are committed to
            protecting your personal data. This Privacy Policy explains how we
            collect, use, and safeguard your information when you use the
            Branzly platform, our website, and associated services. Please read
            this policy carefully to understand our practices regarding your
            data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            2. Who Branzly Is
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Branzly is an AI-powered brand discovery and intelligence platform
            for creators and agencies, operated as a startup project through
            Glanzy Studio under the broader Mirza Group organization, based in
            India.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            3. Scope of This Policy
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            This Privacy Policy applies to all users of the Branzly platform,
            including visitors to our public website, registered creators,
            agencies, and brands. It covers the data we collect directly from
            you when you create an account, as well as the data we collect
            automatically through your use of the service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            4. Information We Collect
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We collect information primarily to provide, maintain, and improve
            our brand discovery services. We only collect data that is actually
            utilized by the current architecture of our application.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">
            5. Information You Provide
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            This includes information you actively submit to us when using the
            platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">
            6. Account Information
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            When you register for Branzly, we collect basic account information
            including your email address and an encrypted password. This is
            required to create and secure your account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">
            7. Authentication Information
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We use Supabase Authentication to manage your login credentials. We
            store authentication tokens and session data securely to keep you
            logged in across your devices.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">
            8. Profile Information
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            You may choose to provide additional profile information such as
            your full name, avatar image URL, account type (creator or agency),
            and billing tier information. This data is stored in our database to
            personalize your experience.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">
            9. Workspace and Agency Information
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            If you create or join a team workspace, we collect the workspace
            name, member roles (e.g., owner, admin, member), and the
            associations between user accounts and workspaces.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">
            10. Saved Brands
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We store records of the brands you save or bookmark within the
            platform to provide your personalized "Saved" view and organize your
            discovery process.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">
            11. Contacted Brand Information
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            When you mark a brand as "Contacted," we store outreach metadata,
            including the brand ID, the user who initiated the contact, the
            status of the outreach (e.g., pending, replied), and any internal
            descriptions or notes you save regarding the outreach activity.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            12. Usage Information
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We collect data about how you interact with the Branzly application
            to ensure performance and improve the user experience.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">
            13. Device and Technical Information
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We collect basic technical information through our hosting and
            analytics providers, such as browser type, operating system, IP
            address (anonymized where required), and viewport size.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">
            14. Log Data
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Our servers automatically record information ("Log Data") created by
            your use of the services. Log Data may include information such as
            your IP address, browser type, operating system, the referring web
            page, pages visited, location, your mobile carrier, device and
            application IDs, search terms, and cookie information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">
            15. Cookies
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We use cookies and similar tracking technologies (like local storage
            and session storage) primarily for authentication (keeping you
            signed in), preserving your UI preferences (like dark/light theme),
            and maintaining application state.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">
            16. Analytics
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We use Vercel Analytics and Google Analytics to understand how
            visitors engage with our website. This helps us optimize our pages
            and improve the overall service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            17. How Information Is Used
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We use the information we collect to operate, maintain, and provide
            the features and functionality of the Branzly service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">
            18. Product Improvement
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We use usage data to understand how our users use the product, which
            features are most popular, and where we need to focus our
            development efforts to build a better tool for creators and
            agencies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">
            19. Security and Fraud Prevention
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We use your data to maintain the security of our platform, verify
            accounts, and prevent unauthorized access or abuse of our systems.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">
            20. Customer Support
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            If you contact us at support@branzly.dedyn.io, we will use your
            email address and any information you provide to resolve your
            inquiry.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">
            21. Communication
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We may use your email address to send you service-related notices,
            including legally required notices, in lieu of communication by
            postal mail. We may also use your contact information to send you
            updates about product features or changes to our policies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">
            22. Personalization
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We use your saved brands, search history, and profile data to
            personalize your "For You" feed and recommend relevant brand
            opportunities.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">
            23. Legal Compliance
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We may use or disclose your information if required by law,
            subpoena, or other legal process, or if we have a good faith belief
            that disclosure is reasonably necessary to comply with legal
            obligations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            24. Data Storage
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Your personal information, workspace configurations, and saved data
            are securely stored in a PostgreSQL database hosted by Supabase.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">
            25. Data Retention
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We retain your personal information for as long as your account is
            active or as needed to provide you with our services. We may retain
            and use your information as necessary to comply with legal
            obligations, resolve disputes, and enforce agreements.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">
            26. Data Deletion & Account Deletion
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            You may request deletion of your account and associated personal
            data by contacting support@branzly.dedyn.io. Note that in our
            current preview environment, automated self-serve deletion flows
            within the Settings dashboard are disabled to prevent accidental
            data loss.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">
            27. Data Correction
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            You can update your account information at any time by accessing
            your Settings page within the Branzly application.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">
            28. User Rights
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Depending on your location, you may have rights to access, correct,
            delete, or restrict the processing of your personal data. Please
            contact us to exercise these rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            29. Third-Party Services
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We rely on certain third-party services to operate Branzly
            effectively.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">
            30. Authentication & Database Providers
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We use Supabase for authentication, user management, and secure
            database hosting. Your credentials and user data are securely
            processed and stored on Supabase infrastructure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">
            31. Analytics Providers
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We use Vercel Analytics and Google Analytics to collect aggregated,
            anonymous usage data to understand platform performance and user
            engagement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">
            32. External Links
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Branzly contains links to external brand websites, social media
            profiles, and source documents. We are not responsible for the
            privacy practices or the content of these third-party websites.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            33. Brand Information and Public Data
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Branzly is a brand intelligence platform. The information we display
            about brands, products, social metrics, and business contacts is
            compiled from publicly available business sources, external data
            providers, and scheduled automated research processes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">
            34. Publicly Available Business Information
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The brand data in our database is intended to represent business
            entities and business contact information (B2B data) rather than
            private consumer data. We do not claim ownership over publicly
            available brand information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">
            35. Information About Other Individuals
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            If you store or process information about other individuals (such as
            brand representatives or agency team members) within your Branzly
            workspace, you are responsible for ensuring you have the appropriate
            rights and permissions to process that data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            36. International Data Considerations
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Branzly is operated from India. By using our service, you understand
            that your information may be transferred to, stored, and processed
            in jurisdictions where our servers and third-party providers (like
            Supabase and Vercel) are located, which may have different data
            protection laws than your country of residence.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            37. Security
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We take security seriously and implement industry-standard measures,
            including Row-Level Security (RLS) in our database, to protect your
            data. However, no internet transmission or electronic storage is
            100% secure. For detailed information, please review our Security
            page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            38. Changes to This Policy
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. We will notify you of any material changes by
            posting the updated policy on this page and updating the "Last
            Updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
            39. Contact Information
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have questions about this Privacy Policy or our data
            practices, please contact us at:
            <br />
            <br />
            <strong>Legal / Privacy Contact:</strong>{" "}
            <a
              href="mailto:support@branzly.dedyn.io"
              className="text-brand hover:underline"
            >
              support@branzly.dedyn.io
            </a>
          </p>
        </section>

        <p className="text-xs text-muted-foreground mt-12 pt-8 border-t border-border/50">
          <em>
            Developer Note: This document has been prepared based on current
            platform architecture. As Branzly is an early-stage startup, formal
            legal review is recommended prior to broad commercial distribution.
          </em>
        </p>
      </div>
    </LegalLayout>
  );
}
