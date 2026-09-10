import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Compass,
  Mail,
  BarChart,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-brand/20">
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-border/50 bg-background/80 backdrop-blur-xl z-50 flex items-center justify-between px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center shadow-lg shadow-brand/20">
            <span className="text-white font-bold text-lg leading-none">B</span>
          </div>
          <span className="font-bold text-lg tracking-tight">Branzly</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link
            to="/auth"
            search={{ mode: "signin" }}
            className="text-sm font-semibold text-muted-foreground hover:text-foreground"
          >
            Sign In
          </Link>
          <Link
            to="/auth"
            search={{ mode: "signup" }}
            className="text-sm font-semibold bg-foreground text-background px-4 py-2 rounded-lg hover:bg-foreground/90 transition-colors"
          >
            Get Started
          </Link>
        </nav>
      </header>

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-sm font-semibold mb-6 border border-brand/20">
            <SparklesIcon className="w-4 h-4" /> Now in Public Beta
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            The CRM built for the{" "}
            <span className="text-brand">creator economy</span>.
          </h1>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Discover perfectly matched brands, track your outreach pipeline, and
            close more sponsorships without the spreadsheet chaos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth"
              search={{ mode: "signup" }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand text-brand-foreground font-semibold rounded-xl px-8 py-4 text-lg hover:bg-brand/90 transition-all shadow-lg shadow-brand/20"
            >
              Start for free <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card border border-border/50 rounded-3xl p-8 subtle-shadow text-center">
            <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-6">
              <Compass className="text-brand w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-3">Smart Discovery</h3>
            <p className="text-muted-foreground">
              Find brands actively looking for creators in your specific niche
              with our dynamic opportunity engine.
            </p>
          </div>
          <div className="bg-card border border-border/50 rounded-3xl p-8 subtle-shadow text-center">
            <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-6">
              <Mail className="text-brand w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-3">Outreach Pipeline</h3>
            <p className="text-muted-foreground">
              Track every conversation from initial pitch to signed contract in
              a beautiful Kanban board designed for deals.
            </p>
          </div>
          <div className="bg-card border border-border/50 rounded-3xl p-8 subtle-shadow text-center">
            <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-6">
              <BarChart className="text-brand w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-3">Agency Ready</h3>
            <p className="text-muted-foreground">
              Manage your entire roster's pipeline with team workspaces, shared
              contacts, and aggregated reporting.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 opacity-50">
            <div className="w-6 h-6 rounded bg-foreground flex items-center justify-center">
              <span className="text-background font-bold text-xs">B</span>
            </div>
            <span className="font-bold text-sm">
              Branzly © {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/policies" className="hover:text-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link to="/about" className="hover:text-foreground">
              About
            </Link>
            <Link to="/security" className="hover:text-foreground">
              Security
            </Link>
            <a
              href="mailto:support@branzly.dedyn.io"
              className="hover:text-foreground"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}
