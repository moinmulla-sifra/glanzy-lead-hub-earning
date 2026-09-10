const fs = require("fs");

let content = fs.readFileSync("src/routes/auth.tsx", "utf8");

// The auth page doesn't have a footer by default, let's inject a simple footer at the bottom of the right panel, or absolute at the bottom.
// First, find the return block.
const authRenderStart = content.indexOf("return (");

if (authRenderStart !== -1) {
  // Add Link import if not there
  if (!content.includes('import { Link } from "@tanstack/react-router"')) {
    content = content.replace(
      /import \{\s*createFileRoute,\s*useNavigate,\s*useSearch,\s*\} from "@tanstack\/react-router";/,
      'import { createFileRoute, useNavigate, useSearch, Link } from "@tanstack/react-router";',
    );
  }

  // the layout is a grid:
  // <div className="min-h-screen bg-background flex flex-col md:flex-row">
  // ...
  //   </div>
  // </div>
  // We'll insert a legal footer inside the form container.

  // Wait, let's see what is inside the form container.
  // There is a <p className="text-sm text-center text-muted-foreground mt-8">
}

// Let's replace the bottom text
content = content.replace(
  /<p className="text-sm text-center text-muted-foreground mt-8">[\s\S]*?<\/p>/,
  `<div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-sm text-center text-muted-foreground">
              {mode === "signin" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setMode("signup")}
                    className="text-brand font-semibold hover:underline"
                  >
                    Sign up
                  </button>
                </>
              ) : mode === "signup" ? (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setMode("signin")}
                    className="text-brand font-semibold hover:underline"
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setMode("signin")}
                  className="text-brand font-semibold hover:underline"
                >
                  Back to Sign in
                </button>
              )}
            </p>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link to="/about" className="hover:text-foreground">About</Link>
              <Link to="/policies" className="hover:text-foreground">Privacy</Link>
              <Link to="/terms" className="hover:text-foreground">Terms</Link>
              <Link to="/security" className="hover:text-foreground">Security</Link>
            </div>
            
            <p className="text-xs text-muted-foreground opacity-50 text-center max-w-xs">
              By continuing, you agree to Branzly's Terms of Service and Privacy Policy. Branzly is a product associated with Glanzy Studio.
            </p>
          </div>`,
);

fs.writeFileSync("src/routes/auth.tsx", content);
console.log("Auth updated");
