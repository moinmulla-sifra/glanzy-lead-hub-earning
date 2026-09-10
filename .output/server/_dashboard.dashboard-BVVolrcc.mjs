import { t as supabase } from "./_ssr/supabase-ZUHfAP0X.mjs";
import {
  o as require_jsx_runtime,
  r as useQuery,
} from "./_libs/react+tanstack__react-query.mjs";
import { y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import {
  h as Sparkles,
  q as Compass,
  rt as Bookmark,
  u as TrendingUp,
  y as Send,
} from "./_libs/lucide-react.mjs";
import { t as useMonetization } from "./_ssr/useMonetization-C1JT4SaF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_dashboard.dashboard-BVVolrcc.js
var import_jsx_runtime = require_jsx_runtime();
function DashboardOverview() {
  const { data: sessionData } = useQuery({
    queryKey: ["auth_session"],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session;
    },
  });
  const userId = sessionData?.user?.id || null;
  const { data: profile } = useQuery({
    queryKey: ["profile", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      return data;
    },
  });
  const { workspaceId } = useMonetization(userId);
  const { data: workspace } = useQuery({
    queryKey: ["workspace_details", workspaceId],
    enabled: !!workspaceId,
    queryFn: async () => {
      const { data } = await supabase
        .from("workspaces")
        .select("*")
        .eq("id", workspaceId)
        .single();
      return data;
    },
  });
  const { data: counts } = useQuery({
    queryKey: ["dashboard-counts", workspaceId],
    enabled: !!workspaceId,
    queryFn: async () => {
      const { count: savedCount } = await supabase
        .from("saved_brands")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("workspace_id", workspaceId);
      const { count: outreachCount } = await supabase
        .from("outreach")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("workspace_id", workspaceId);
      return {
        saved: savedCount || 0,
        outreach: outreachCount || 0,
      };
    },
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: "space-y-8 animate-in fade-in duration-500",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className:
          "flex flex-col md:flex-row justify-between items-start md:items-center gap-4",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
              className: "text-3xl font-bold tracking-tight text-foreground",
              children: [
                "Welcome back, ",
                profile?.full_name?.split(" ")[0] || "there",
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
              className: "text-muted-foreground mt-1",
              children: workspace
                ? `Active Workspace: ${workspace.name}`
                : "Here's what's happening today.",
            }),
          ],
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className:
              "bg-card border border-border/50 rounded-2xl p-6 shadow-sm",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "flex items-center gap-3 mb-4",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                    className:
                      "w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center",
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      Sparkles,
                      { className: "w-5 h-5 text-brand" },
                    ),
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                    className: "font-semibold text-foreground",
                    children: "Discover",
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                className: "text-2xl font-bold mb-1",
                children: "New",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                className: "text-sm text-muted-foreground",
                children: "Opportunities waiting",
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className:
              "bg-card border border-border/50 rounded-2xl p-6 shadow-sm",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "flex items-center gap-3 mb-4",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                    className:
                      "w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center",
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      Bookmark,
                      { className: "w-5 h-5 text-blue-500" },
                    ),
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                    className: "font-semibold text-foreground",
                    children: "Saved Brands",
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                className: "text-2xl font-bold mb-1",
                children: counts?.saved || 0,
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                className: "text-sm text-muted-foreground",
                children: "In your pipeline",
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className:
              "bg-card border border-border/50 rounded-2xl p-6 shadow-sm",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "flex items-center gap-3 mb-4",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                    className:
                      "w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center",
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      Send,
                      { className: "w-5 h-5 text-green-500" },
                    ),
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                    className: "font-semibold text-foreground",
                    children: "Active Outreach",
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                className: "text-2xl font-bold mb-1",
                children: counts?.outreach || 0,
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                className: "text-sm text-muted-foreground",
                children: "Ongoing conversations",
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className:
              "bg-card border border-border/50 rounded-2xl p-6 shadow-sm",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "flex items-center gap-3 mb-4",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                    className:
                      "w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center",
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      TrendingUp,
                      { className: "w-5 h-5 text-purple-500" },
                    ),
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                    className: "font-semibold text-foreground",
                    children: "Profile",
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                className: "text-2xl font-bold mb-1",
                children: profile?.onboarding_completed ? "100%" : "50%",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                className: "text-sm text-muted-foreground",
                children: "Completion",
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className:
          "bg-card border border-border/50 rounded-2xl p-12 text-center shadow-sm",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
            className:
              "w-16 h-16 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-6",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, {
              className: "w-8 h-8 text-brand",
            }),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
            className: "text-2xl font-bold text-foreground mb-3",
            children: "Your Branzly workspace is ready.",
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
            className: "text-muted-foreground mb-8 max-w-md mx-auto text-lg",
            children:
              "Start discovering brands that match your niche, save them to your pipeline, and manage your outreach.",
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className:
              "flex flex-col sm:flex-row items-center justify-center gap-4",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                to: "/discover",
                className:
                  "w-full sm:w-auto bg-brand text-brand-foreground font-semibold rounded-xl px-8 py-3 hover:bg-brand/90 transition-all shadow-lg shadow-brand/20",
                children: "Discover Brands",
              }),
              !profile?.onboarding_completed &&
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                  to: "/onboarding",
                  className:
                    "w-full sm:w-auto bg-muted text-foreground font-semibold rounded-xl px-8 py-3 hover:bg-muted/80 transition-colors",
                  children: "Complete Your Profile",
                }),
            ],
          }),
        ],
      }),
    ],
  });
}
//#endregion
export { DashboardOverview as component };
