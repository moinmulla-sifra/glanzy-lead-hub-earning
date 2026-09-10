import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <LegalLayout title="About Branzly" lastUpdated="September 16, 2026">
      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Who We Are</h2>
          <p className="text-muted-foreground leading-relaxed">
            Branzly is an AI-powered brand discovery and intelligence platform
            for creators and agencies. We exist to help creators, influencer
            marketers, agencies, talent managers, brands, and marketing
            professionals discover brands, understand their activity and
            opportunities, organize relevant brand information, evaluate
            potential partnerships, and make better-informed outreach and
            collaboration decisions.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Branzly is a product and startup initiative operated through Glanzy
            Studio under the broader Mirza Group organization. We are currently
            being developed and operated as a startup/project and our legal
            structure may evolve over time.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our mission is to help creators and agencies discover meaningful
            brand opportunities and brand intelligence more efficiently, turning
            fragmented public data into structured, actionable insights.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
          <p className="text-muted-foreground leading-relaxed">
            We envision a creator economy where brand discovery and
            creator-brand opportunities are intelligent, transparent, efficient,
            and accessible to creators and marketing teams of all sizes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            What Branzly Does
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Branzly organizes useful brand intelligence into one professional
            discovery environment. Our platform enables:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>
              <strong>Brand Discovery:</strong> Search and explore thousands of
              brands across various industries and categories.
            </li>
            <li>
              <strong>Brand Intelligence:</strong> Access detailed company
              information, products, social presence, marketing activity, and
              creator activity.
            </li>
            <li>
              <strong>Opportunity Signals:</strong> Identify potential
              partnership opportunities based on recent launches, funding, and
              marketing signals.
            </li>
            <li>
              <strong>Organization:</strong> Save promising brands to custom
              lists and team workspaces.
            </li>
            <li>
              <strong>Contact Workflows:</strong> Reveal available business
              contact information and track outreach status manually (Contacted
              state).
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Who Branzly Is For
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Branzly is designed to serve:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Creators and Influencers</li>
            <li>Creator Agencies and Talent Managers</li>
            <li>Marketing Professionals</li>
            <li>Brands and Businesses</li>
            <li>Creator-economy professionals</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Why Branzly Exists
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Brand discovery is often fragmented across search engines, social
            platforms, websites, news, directories, spreadsheets, and
            disconnected research tools. Creators and agencies often need to
            discover brands, research company information, understand marketing
            signals, identify relevant business opportunities, save promising
            companies, and keep track of outreach. Branzly is intended to bring
            useful brand intelligence and discovery into a more structured,
            organized environment.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            How Branzly Works
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The Branzly workflow is designed to be simple and effective:
          </p>
          <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
            <li>
              <strong>Discover:</strong> Search for brands in your niche or
              explore curated recommendations.
            </li>
            <li>
              <strong>Understand:</strong> Review comprehensive brand profiles,
              products, social metrics, and funding information.
            </li>
            <li>
              <strong>Save:</strong> Organize relevant brands into lists or
              workspace folders.
            </li>
            <li>
              <strong>Contact:</strong> Uncover available business contact
              information and reach out to the brand directly outside the
              platform.
            </li>
            <li>
              <strong>Track:</strong> Mark brands as "Contacted" and track your
              outreach pipeline status.
            </li>
          </ol>
        </section>

        <section className="space-y-4 bg-muted/20 border border-border/50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-foreground">Founder & CEO</h2>
          <h3 className="text-lg font-bold text-foreground mt-4">Moin M</h3>
          <p className="text-muted-foreground leading-relaxed mt-2">
            Moin M is the Founder and CEO of Branzly, the brand discovery and
            intelligence platform built to help creators, agencies, and modern
            marketing teams discover better opportunities and make more informed
            decisions. Branzly was created around a simple idea: finding the
            right brands should be easier, faster, and more intelligent than
            relying on scattered searches, spreadsheets, and disconnected
            information sources.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            As the founder of Glanzy Studio and the creator behind Branzly, Moin
            M is focused on building practical technology for the creator
            economy and improving how creators, agencies, and brands discover
            and understand commercial opportunities.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Branzly represents that vision in product form — combining
            structured brand intelligence, discovery, opportunity signals, and
            organization into one platform designed for the modern creator and
            marketing ecosystem.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Company Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h4 className="font-semibold text-foreground">
                Parent Organization
              </h4>
              <p className="text-muted-foreground">Mirza Group</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">
                Operating Organization
              </h4>
              <p className="text-muted-foreground">Glanzy Studio</p>
              <a
                href="https://www.glanzystudio.dedyn.io"
                target="_blank"
                rel="noreferrer"
                className="text-brand hover:underline text-sm"
              >
                glanzystudio.dedyn.io
              </a>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Founded</h4>
              <p className="text-muted-foreground">September 16, 2026</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Location</h4>
              <p className="text-muted-foreground">India</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Contact Us</h2>
          <div className="space-y-6 mt-4">
            <div>
              <h4 className="font-semibold text-foreground">
                General Support & Legal/Privacy
              </h4>
              <p className="text-sm text-muted-foreground mb-1">
                For general inquiries, help with your account, or questions
                about our privacy policy.
              </p>
              <a
                href="mailto:support@branzly.dedyn.io"
                className="text-brand hover:underline font-medium"
              >
                support@branzly.dedyn.io
              </a>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">
                Leads & Additional Support
              </h4>
              <p className="text-sm text-muted-foreground mb-1">
                For help with brand discovery or issues regarding lead
                information.
              </p>
              <a
                href="mailto:leads@branzly.dedyn.io"
                className="text-brand hover:underline font-medium"
              >
                leads@branzly.dedyn.io
              </a>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">
                Partnerships & Business
              </h4>
              <p className="text-sm text-muted-foreground mb-1">
                For collaboration requests, API access, or enterprise features.
              </p>
              <a
                href="mailto:partners@branzly.dedyn.io"
                className="text-brand hover:underline font-medium"
              >
                partners@branzly.dedyn.io
              </a>
            </div>
          </div>
        </section>
      </div>
    </LegalLayout>
  );
}
