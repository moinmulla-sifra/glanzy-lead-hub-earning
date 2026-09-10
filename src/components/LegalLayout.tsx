import { Link } from "@tanstack/react-router";
import { ReactNode } from "react";

export function LegalLayout({
  children,
  title,
  lastUpdated,
}: {
  children: ReactNode;
  title: string;
  lastUpdated: string;
}) {
  return (
    <div className="min-h-screen bg-background selection:bg-brand/20">
      <header className="sticky top-0 left-0 right-0 h-16 border-b border-border/50 bg-background/80 backdrop-blur-xl z-50 flex items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-lg leading-none">B</span>
          </div>
          <span className="font-bold text-lg tracking-tight">Branzly</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            to="/about"
            className="text-sm font-semibold text-muted-foreground hover:text-foreground"
          >
            About
          </Link>
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
      <main className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground">
            Last Updated: {lastUpdated}
          </p>
        </div>
        <div className="prose prose-invert prose-brand max-w-none">
          {children}
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
            <Link to="/about" className="hover:text-foreground">
              About
            </Link>
            <Link to="/policies" className="hover:text-foreground">
              Policies
            </Link>
            <Link to="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link to="/security" className="hover:text-foreground">
              Security
            </Link>
            <a
              href="mailto:support@branzly.dedyn.io"
              className="hover:text-foreground"
            >
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
