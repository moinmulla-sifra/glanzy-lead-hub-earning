import { n as __toESM } from "../_runtime.mjs";
import {
  a as require_react,
  i as require_jsx_runtime,
  r as useQueryClient,
  t as useQuery,
} from "../_libs/react+tanstack__react-query.mjs";
import { n as supabase, t as ThemeToggle } from "./ThemeToggle-QFaiLLcW.mjs";
import { p as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import {
  a as LogOut,
  c as Earth,
  d as ArrowLeft,
  i as Mail,
  l as Copy,
  n as RefreshCw,
  o as Linkedin,
  r as Pencil,
  s as Funnel,
  t as Search,
  u as ChevronRight,
} from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D90lMTZ9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var statusValues = ["Pending", "Complete", "Success"];
function badgeClass(value) {
  if (value === "Pending") return "pending";
  if (value === "Complete") return "complete";
  if (value === "Success") return "success";
  return "priority";
}
function fmt(value) {
  return value === null || value === void 0 || value === ""
    ? "—"
    : String(value);
}
function linkHref(href) {
  return /^https?:\/\//i.test(href) ? href : `https://${href}`;
}
async function copy(text, label) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  } catch {
    toast.error(`Could not copy ${label.toLowerCase()}`);
  }
}
function LeadDetails({ lead, onChanged, mobileOpen = false, onMobileClose }) {
  const [mail, setMail] = (0, import_react.useState)("Pending");
  const [savingMail, setSavingMail] = (0, import_react.useState)(false);
  const [editingEmail, setEditingEmail] = (0, import_react.useState)(false);
  const [subject, setSubject] = (0, import_react.useState)("");
  const [body, setBody] = (0, import_react.useState)("");
  const [savingEmail, setSavingEmail] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    setMail(lead?.mail ?? "Pending");
    setSubject(lead?.email_subject ?? "");
    setBody(lead?.email_body ?? "");
    setEditingEmail(false);
  }, [lead?.id, lead?.mail, lead?.email_subject, lead?.email_body]);
  (0, import_react.useEffect)(() => {
    if (!mobileOpen) return;
    document.body.classList.add("mobile-details-active");
    return () => document.body.classList.remove("mobile-details-active");
  }, [mobileOpen]);
  if (!lead)
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
      className: "details-panel",
      "aria-label": "Lead details",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "empty-state",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
            className: "empty-icon",
            children: "✦",
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
            children: "Select a brand",
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
            children:
              "Click any lead to view its full details and change the mail status.",
          }),
        ],
      }),
    });
  async function saveMail() {
    if (!lead) return;
    setSavingMail(true);
    const { error } = await supabase
      .from("brand_leads")
      .update({
        mail,
        updated_at: /* @__PURE__ */ new Date().toISOString(),
      })
      .eq("id", lead.id);
    setSavingMail(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(`Mail status: ${lead.mail ?? "—"} → ${mail}`);
    onChanged();
  }
  async function saveEmail() {
    if (!lead) return;
    setSavingEmail(true);
    const { error } = await supabase
      .from("brand_leads")
      .update({
        email_subject: subject,
        email_body: body,
        updated_at: /* @__PURE__ */ new Date().toISOString(),
      })
      .eq("id", lead.id);
    setSavingEmail(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setEditingEmail(false);
    toast.success("Email draft saved");
    onChanged();
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
    className: `details-panel${mobileOpen ? " mobile-open" : ""}`,
    "aria-label": `${fmt(lead.company_name)} details`,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "mobile-details-nav",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
            className: "mobile-back-btn",
            type: "button",
            onClick: onMobileClose,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
                "aria-hidden": "true",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                children: "Leads",
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
            children: "Lead details",
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: "details-header",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "details-title",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
                  children: fmt(lead.company_name),
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
                  children: [
                    fmt(lead.industry),
                    " · ",
                    fmt(lead.company_stage),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
              className: `badge ${badgeClass(lead.mail)}`,
              children: fmt(lead.mail),
            }),
          ],
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "details-body",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "detail-section",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
                children: "Mail status",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "status-editor",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
                    className: "control",
                    value: mail,
                    onChange: (e) => setMail(e.target.value),
                    children: statusValues.map((v) =>
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        "option",
                        {
                          value: v,
                          children: v,
                        },
                        v,
                      ),
                    ),
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
                    className: "btn primary",
                    onClick: saveMail,
                    disabled: savingMail,
                    children: savingMail ? "Saving…" : "Save",
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                className: "muted status-help",
                children:
                  "Pending → Complete → Success. The Supabase trigger keeps the corresponding tables synchronized.",
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "detail-section",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "section-head",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
                    children: "Email draft",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    className: "section-actions",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
                        className: "btn small secondary",
                        onClick: () => copy(subject ?? "", "Subject"),
                        disabled: !subject,
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
                            "aria-hidden": "true",
                          }),
                          " ",
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                            children: "Subject",
                          }),
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
                        className: "btn small secondary",
                        onClick: () => copy(body ?? "", "Body"),
                        disabled: !body,
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
                            "aria-hidden": "true",
                          }),
                          " ",
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                            children: "Body",
                          }),
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
                        className: "btn small secondary",
                        onClick: () =>
                          copy(
                            `${subject ?? ""}\n\n${body ?? ""}`.trim(),
                            "Email",
                          ),
                        disabled: !subject && !body,
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
                            "aria-hidden": "true",
                          }),
                          " ",
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                            children: "Both",
                          }),
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
                        className: "btn small secondary",
                        onClick: () => {
                          if (editingEmail) {
                            setSubject(lead.email_subject ?? "");
                            setBody(lead.email_body ?? "");
                          }
                          setEditingEmail(!editingEmail);
                        },
                        children: [
                          editingEmail
                            ? null
                            : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                Pencil,
                                { "aria-hidden": "true" },
                              ),
                          " ",
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                            children: editingEmail ? "Cancel" : "Edit",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              editingEmail
                ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    import_jsx_runtime.Fragment,
                    {
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                          className: "field full email-subject-field",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                              "label",
                              {
                                htmlFor: "emailSubject",
                                children: "Subject",
                              },
                            ),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                              "input",
                              {
                                id: "emailSubject",
                                className: "email-input",
                                value: subject,
                                onChange: (e) => setSubject(e.target.value),
                              },
                            ),
                          ],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                          className: "field full",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                              "label",
                              {
                                htmlFor: "emailBody",
                                children: "Body",
                              },
                            ),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                              "textarea",
                              {
                                id: "emailBody",
                                className: "email-area",
                                value: body,
                                onChange: (e) => setBody(e.target.value),
                              },
                            ),
                          ],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                          className: "section-actions email-save-actions",
                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                            "button",
                            {
                              className: "btn primary small",
                              onClick: saveEmail,
                              disabled: savingEmail,
                              children: savingEmail ? "Saving…" : "Save email",
                            },
                          ),
                        }),
                      ],
                    },
                  )
                : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    className: "field-grid",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                        className: "field full",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
                            children: "Subject",
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                            className: "value pre",
                            children: fmt(lead.email_subject),
                          }),
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                        className: "field full",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
                            children: "Body",
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                            className: "value pre",
                            children: fmt(lead.email_body),
                          }),
                        ],
                      }),
                    ],
                  }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "detail-section",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
                children: "Quick links",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "link-row",
                children: [
                  lead.website
                    ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
                        className: "link",
                        href: linkHref(lead.website),
                        target: "_blank",
                        rel: "noopener noreferrer",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, {
                            "aria-hidden": "true",
                          }),
                          " Website",
                        ],
                      })
                    : null,
                  lead.linkedin
                    ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
                        className: "link",
                        href: linkHref(lead.linkedin),
                        target: "_blank",
                        rel: "noopener noreferrer",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                            Linkedin,
                            { "aria-hidden": "true" },
                          ),
                          " LinkedIn",
                        ],
                      })
                    : null,
                  lead.email
                    ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
                        className: "link",
                        href: `mailto:${lead.email}`,
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
                            "aria-hidden": "true",
                          }),
                          " Email",
                        ],
                      })
                    : null,
                ],
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "detail-section",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
                children: "Lead signals",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "field-grid",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
                    label: "Lead score",
                    value: lead.lead_score,
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
                    label: "Influencer fit",
                    value: lead.influencer_fit_score,
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
                    label: "Priority",
                    value: lead.priority,
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
                    label: "Budget potential",
                    value: lead.budget_potential,
                  }),
                ],
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "detail-section",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
                children: "Company",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "field-grid",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
                    label: "Contact",
                    value: lead.contact_person,
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
                    label: "Role",
                    value: lead.contact_role,
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
                    label: "Email",
                    value: lead.email,
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
                    label: "Phone",
                    value: lead.phone,
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
                    label: "Product",
                    value: lead.product,
                    full: true,
                  }),
                ],
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "detail-section",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
                children: "Why now",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                className: "field",
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                  className: "value pre",
                  children: fmt(lead.why_now),
                }),
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "detail-section",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
                children: "Growth signals",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "field-grid",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
                    label: "Recent funding",
                    value: lead.recent_funding,
                    full: true,
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
                    label: "Recent launch",
                    value: lead.recent_launch,
                    full: true,
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
                    label: "Marketing activity",
                    value: lead.marketing_activity,
                    full: true,
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
                    label: "Creator activity",
                    value: lead.existing_creator_activity,
                    full: true,
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
                    label: "Next action",
                    value: lead.next_action,
                    full: true,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function Field({ label, value, full }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: full ? "field full" : "field",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: "value pre",
        children: fmt(value),
      }),
    ],
  });
}
var PAGE_SIZE = 50;
var SEARCH_COLUMNS = [
  "company_name",
  "industry",
  "product",
  "email",
  "contact_person",
  "contact_role",
  "website",
  "recent_funding",
  "recent_launch",
  "marketing_activity",
  "existing_creator_activity",
  "why_now",
  "next_action",
  "email_subject",
  "email_body",
];
var SORTS = {
  lead_desc: {
    column: "lead_score",
    ascending: false,
  },
  fit_desc: {
    column: "influencer_fit_score",
    ascending: false,
  },
  updated_desc: {
    column: "updated_at",
    ascending: false,
  },
  verified_desc: {
    column: "verified_at",
    ascending: false,
  },
  name_asc: {
    column: "company_name",
    ascending: true,
  },
};
function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [ready, setReady] = (0, import_react.useState)(false);
  const [userEmail, setUserEmail] = (0, import_react.useState)(null);
  const [filters, setFilters] = (0, import_react.useState)({
    search: "",
    mail: "all",
    priority: "all",
    budget: "all",
    industry: "all",
    stage: "all",
    sort: "lead_desc",
    page: 0,
  });
  const [searchInput, setSearchInput] = (0, import_react.useState)("");
  const [selectedId, setSelectedId] = (0, import_react.useState)(null);
  const [mobileDetailsOpen, setMobileDetailsOpen] = (0, import_react.useState)(
    false,
  );
  (0, import_react.useEffect)(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      if (!data.session) {
        navigate({
          to: "/auth",
          replace: true,
        });
        return;
      }
      setUserEmail(data.session.user.email ?? null);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        setReady(false);
        navigate({
          to: "/auth",
          replace: true,
        });
      } else setUserEmail(session.user.email ?? null);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);
  (0, import_react.useEffect)(() => {
    const t = setTimeout(
      () =>
        setFilters((f) => ({
          ...f,
          search: searchInput.trim(),
          page: 0,
        })),
      300,
    );
    return () => clearTimeout(t);
  }, [searchInput]);
  const leadsQuery = useQuery({
    queryKey: ["brand_leads", filters],
    enabled: ready,
    queryFn: async () => fetchLeads(filters),
  });
  const statsQuery = useQuery({
    queryKey: ["brand_leads_stats"],
    enabled: ready,
    queryFn: fetchStats,
  });
  const optionsQuery = useQuery({
    queryKey: ["brand_leads_options"],
    enabled: ready,
    queryFn: fetchOptions,
  });
  const refreshAll = (0, import_react.useCallback)(() => {
    queryClient.invalidateQueries({ queryKey: ["brand_leads"] });
    queryClient.invalidateQueries({ queryKey: ["brand_leads_stats"] });
    queryClient.invalidateQueries({ queryKey: ["brand_leads_options"] });
  }, [queryClient]);
  (0, import_react.useEffect)(() => {
    if (!ready) return;
    const channel = supabase
      .channel("brand_leads_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "brand_leads",
        },
        () => {
          refreshAll();
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [ready, refreshAll]);
  const rows = leadsQuery.data?.rows ?? [];
  const total = leadsQuery.data?.count ?? 0;
  (0, import_react.useEffect)(() => {
    if (!selectedId && rows[0]) setSelectedId(rows[0].id);
  }, [rows, selectedId]);
  const selected = (0, import_react.useMemo)(
    () => rows.find((r) => r.id === selectedId) ?? null,
    [rows, selectedId],
  );
  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({
      to: "/auth",
      replace: true,
    });
  }
  const stats = statsQuery.data;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const activeFilterCount = [
    filters.mail,
    filters.priority,
    filters.budget,
    filters.industry,
    filters.stage,
  ].filter((value) => value !== "all").length;
  if (!ready)
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
      className: "glanzy app-shell",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: "loading",
        children: "Checking your session…",
      }),
    });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: "glanzy app-shell",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
        className: "topbar",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "topbar-copy",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                className: "eyebrow",
                children: "GLANZY STUDIO",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
                children: "Lead Command Center",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                children:
                  "Search, review and update your saved brand leads directly from Supabase.",
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "topbar-actions",
            children: [
              userEmail
                ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                    className: "user-chip",
                    children: userEmail,
                  })
                : null,
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
                className: "btn secondary icon-label-btn",
                onClick: refreshAll,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
                    "aria-hidden": "true",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                    children: "Refresh",
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
                className: "btn danger icon-label-btn",
                onClick: signOut,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
                    "aria-hidden": "true",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                    children: "Sign out",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
        className: "stats",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
            label: "Total Leads",
            value: stats?.total,
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
            label: "Pending",
            value: stats?.pending,
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
            label: "Complete",
            value: stats?.complete,
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
            label: "Success",
            value: stats?.success,
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
        className: "toolbar",
        "aria-label": "Lead search and filters",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "search-wrap",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
                "aria-hidden": "true",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
                type: "search",
                placeholder:
                  "Search brands, industry, product, email, email draft...",
                autoComplete: "off",
                value: searchInput,
                onChange: (e) => setSearchInput(e.target.value),
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
            className: "mobile-filter-panel",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, {
                    "aria-hidden": "true",
                  }),
                  "Filters",
                  activeFilterCount ? ` (${activeFilterCount})` : "",
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                className: "mobile-filter-grid",
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  FilterControls,
                  {
                    filters,
                    setFilters,
                    industries: optionsQuery.data?.industries ?? [],
                    stages: optionsQuery.data?.stages ?? [],
                  },
                ),
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
            className: "desktop-filter-controls",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              FilterControls,
              {
                filters,
                setFilters,
                industries: optionsQuery.data?.industries ?? [],
                stages: optionsQuery.data?.stages ?? [],
              },
            ),
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
        className: "content-grid",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
            className: "table-panel",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "panel-header",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
                        children: "Saved Brands",
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                        className: "muted",
                        children: leadsQuery.isLoading
                          ? "Loading…"
                          : `${total} match${total === 1 ? "" : "es"}`,
                      }),
                    ],
                  }),
                  leadsQuery.error
                    ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                        className: "error",
                        children: leadsQuery.error.message,
                      })
                    : null,
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                className: "table-wrap",
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  "table",
                  {
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                          "tr",
                          {
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                "th",
                                { children: "Brand" },
                              ),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                "th",
                                { children: "Industry" },
                              ),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                "th",
                                { children: "Lead" },
                              ),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                "th",
                                { children: "Priority" },
                              ),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                "th",
                                { children: "Budget" },
                              ),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                "th",
                                { children: "Mail" },
                              ),
                            ],
                          },
                        ),
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
                        children: leadsQuery.isLoading
                          ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
                              children: /* @__PURE__ */ (0,
                              import_jsx_runtime.jsx)("td", {
                                colSpan: 6,
                                className: "loading",
                                children: "Loading saved brands…",
                              }),
                            })
                          : rows.length === 0
                            ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                "tr",
                                {
                                  children: /* @__PURE__ */ (0,
                                  import_jsx_runtime.jsx)("td", {
                                    colSpan: 6,
                                    className: "loading",
                                    children: "No matching brands.",
                                  }),
                                },
                              )
                            : rows.map((r) =>
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                  "tr",
                                  {
                                    className:
                                      selectedId === r.id ? "selected" : "",
                                    onClick: () => setSelectedId(r.id),
                                    children: [
                                      /* @__PURE__ */ (0,
                                      import_jsx_runtime.jsx)("td", {
                                        children: /* @__PURE__ */ (0,
                                        import_jsx_runtime.jsxs)("div", {
                                          className: "brand-cell",
                                          children: [
                                            /* @__PURE__ */ (0,
                                            import_jsx_runtime.jsx)("div", {
                                              className: "avatar",
                                              children: initials(
                                                r.company_name,
                                              ),
                                            }),
                                            /* @__PURE__ */ (0,
                                            import_jsx_runtime.jsxs)("div", {
                                              children: [
                                                /* @__PURE__ */ (0,
                                                import_jsx_runtime.jsx)("div", {
                                                  className: "brand-name",
                                                  children: fmt(r.company_name),
                                                }),
                                                /* @__PURE__ */ (0,
                                                import_jsx_runtime.jsx)("div", {
                                                  className: "brand-sub",
                                                  children: fmt(
                                                    r.email ||
                                                      r.website ||
                                                      r.product,
                                                  ),
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      }),
                                      /* @__PURE__ */ (0,
                                      import_jsx_runtime.jsx)("td", {
                                        children: fmt(r.industry),
                                      }),
                                      /* @__PURE__ */ (0,
                                      import_jsx_runtime.jsx)("td", {
                                        children: /* @__PURE__ */ (0,
                                        import_jsx_runtime.jsx)("span", {
                                          className: "score",
                                          children: r.lead_score ?? "—",
                                        }),
                                      }),
                                      /* @__PURE__ */ (0,
                                      import_jsx_runtime.jsx)("td", {
                                        children: /* @__PURE__ */ (0,
                                        import_jsx_runtime.jsx)("span", {
                                          className: "badge priority",
                                          children: fmt(r.priority),
                                        }),
                                      }),
                                      /* @__PURE__ */ (0,
                                      import_jsx_runtime.jsx)("td", {
                                        children: fmt(r.budget_potential),
                                      }),
                                      /* @__PURE__ */ (0,
                                      import_jsx_runtime.jsx)("td", {
                                        children: /* @__PURE__ */ (0,
                                        import_jsx_runtime.jsx)("span", {
                                          className: `badge ${badgeClass(r.mail)}`,
                                          children: fmt(r.mail),
                                        }),
                                      }),
                                    ],
                                  },
                                  r.id,
                                ),
                              ),
                      }),
                    ],
                  },
                ),
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                className: "mobile-lead-list",
                "aria-live": "polite",
                children: leadsQuery.isLoading
                  ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                      className: "loading",
                      children: "Loading saved brands…",
                    })
                  : rows.length === 0
                    ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                        className: "loading",
                        children: "No matching brands.",
                      })
                    : rows.map((lead) =>
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                          "button",
                          {
                            type: "button",
                            className: "mobile-lead-card",
                            onClick: () => {
                              setSelectedId(lead.id);
                              setMobileDetailsOpen(true);
                            },
                            "aria-label": `Open ${fmt(lead.company_name)} details`,
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                "span",
                                {
                                  className: "mobile-lead-main",
                                  children: [
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                      "span",
                                      {
                                        className: "avatar",
                                        children: initials(lead.company_name),
                                      },
                                    ),
                                    /* @__PURE__ */ (0,
                                    import_jsx_runtime.jsxs)("span", {
                                      className: "mobile-lead-copy",
                                      children: [
                                        /* @__PURE__ */ (0,
                                        import_jsx_runtime.jsxs)("span", {
                                          className: "mobile-brand-line",
                                          children: [
                                            /* @__PURE__ */ (0,
                                            import_jsx_runtime.jsx)("span", {
                                              className: "brand-name",
                                              children: fmt(lead.company_name),
                                            }),
                                            /* @__PURE__ */ (0,
                                            import_jsx_runtime.jsx)("span", {
                                              className: `badge ${badgeClass(lead.mail)}`,
                                              children: fmt(lead.mail),
                                            }),
                                          ],
                                        }),
                                        /* @__PURE__ */ (0,
                                        import_jsx_runtime.jsx)("span", {
                                          className: "brand-sub",
                                          children: fmt(
                                            lead.industry || lead.product,
                                          ),
                                        }),
                                      ],
                                    }),
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                      ChevronRight,
                                      {
                                        className: "mobile-lead-chevron",
                                        "aria-hidden": "true",
                                      },
                                    ),
                                  ],
                                },
                              ),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                "span",
                                {
                                  className: "mobile-lead-metrics",
                                  children: [
                                    /* @__PURE__ */ (0,
                                    import_jsx_runtime.jsxs)("span", {
                                      children: [
                                        /* @__PURE__ */ (0,
                                        import_jsx_runtime.jsx)("small", {
                                          children: "Lead score",
                                        }),
                                        /* @__PURE__ */ (0,
                                        import_jsx_runtime.jsx)("strong", {
                                          children: lead.lead_score ?? "—",
                                        }),
                                      ],
                                    }),
                                    /* @__PURE__ */ (0,
                                    import_jsx_runtime.jsxs)("span", {
                                      children: [
                                        /* @__PURE__ */ (0,
                                        import_jsx_runtime.jsx)("small", {
                                          children: "Priority",
                                        }),
                                        /* @__PURE__ */ (0,
                                        import_jsx_runtime.jsx)("strong", {
                                          children: fmt(lead.priority),
                                        }),
                                      ],
                                    }),
                                    /* @__PURE__ */ (0,
                                    import_jsx_runtime.jsxs)("span", {
                                      children: [
                                        /* @__PURE__ */ (0,
                                        import_jsx_runtime.jsx)("small", {
                                          children: "Budget",
                                        }),
                                        /* @__PURE__ */ (0,
                                        import_jsx_runtime.jsx)("strong", {
                                          children: fmt(lead.budget_potential),
                                        }),
                                      ],
                                    }),
                                  ],
                                },
                              ),
                            ],
                          },
                          lead.id,
                        ),
                      ),
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "pagination",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                    className: "muted",
                    children: ["Page ", filters.page + 1, " of ", pageCount],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    className: "section-actions",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
                        className: "btn small secondary",
                        disabled: filters.page === 0,
                        onClick: () =>
                          setFilters((f) => ({
                            ...f,
                            page: f.page - 1,
                          })),
                        children: "← Previous",
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
                        className: "btn small secondary",
                        disabled: filters.page + 1 >= pageCount,
                        onClick: () =>
                          setFilters((f) => ({
                            ...f,
                            page: f.page + 1,
                          })),
                        children: "Next →",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadDetails, {
            lead: selected,
            onChanged: refreshAll,
            mobileOpen: mobileDetailsOpen,
            onMobileClose: () => setMobileDetailsOpen(false),
          }),
        ],
      }),
    ],
  });
}
function FilterControls({ filters, setFilters, industries, stages }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_jsx_runtime.Fragment,
    {
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
          value: filters.mail,
          onChange: (mail) =>
            setFilters((f) => ({
              ...f,
              mail,
              page: 0,
            })),
          options: [
            ["all", "All mail statuses"],
            ["Pending", "Pending"],
            ["Complete", "Complete"],
            ["Success", "Success"],
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
          value: filters.priority,
          onChange: (priority) =>
            setFilters((f) => ({
              ...f,
              priority,
              page: 0,
            })),
          options: [
            ["all", "All priorities"],
            ["Immediate", "Immediate"],
            ["High Priority", "High Priority"],
            ["Good Lead", "Good Lead"],
            ["Nurture", "Nurture"],
            ["Low", "Low"],
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
          value: filters.budget,
          onChange: (budget) =>
            setFilters((f) => ({
              ...f,
              budget,
              page: 0,
            })),
          options: [
            ["all", "All budget potential"],
            ["Very High", "Very High"],
            ["High", "High"],
            ["Medium", "Medium"],
            ["Low", "Low"],
            ["Unknown", "Unknown"],
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
          value: filters.industry,
          onChange: (industry) =>
            setFilters((f) => ({
              ...f,
              industry,
              page: 0,
            })),
          options: [
            ["all", "All industries"],
            ...industries.map((value) => [value, value]),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
          value: filters.stage,
          onChange: (stage) =>
            setFilters((f) => ({
              ...f,
              stage,
              page: 0,
            })),
          options: [
            ["all", "All company stages"],
            ...stages.map((value) => [value, value]),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
          value: filters.sort,
          onChange: (sort) =>
            setFilters((f) => ({
              ...f,
              sort,
              page: 0,
            })),
          options: [
            ["lead_desc", "Lead score ↓"],
            ["fit_desc", "Influencer fit ↓"],
            ["updated_desc", "Recently updated"],
            ["verified_desc", "Recently verified"],
            ["name_asc", "Brand A–Z"],
          ],
        }),
      ],
    },
  );
}
function Stat({ label, value }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: "stat",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: "label",
        children: label,
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: "value",
        children: value ?? "—",
      }),
    ],
  });
}
function Select({ value, onChange, options }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
    className: "control",
    value,
    onChange: (e) => onChange(e.target.value),
    children: options.map(([v, label]) =>
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "option",
        {
          value: v,
          children: label,
        },
        v,
      ),
    ),
  });
}
function initials(name) {
  return String(name || "?")
    .split(/\s+/)
    .slice(0, 2)
    .map((x) => x[0])
    .join("")
    .toUpperCase();
}
async function fetchLeads(filters) {
  const run = async (sortKey) => {
    const sort = SORTS[sortKey];
    let query = supabase.from("brand_leads").select("*", { count: "exact" });
    const term = filters.search.replace(/[,()%]/g, " ").trim();
    if (term)
      query = query.or(
        SEARCH_COLUMNS.map((c) => `${c}.ilike.%${term}%`).join(","),
      );
    if (filters.mail !== "all") query = query.eq("mail", filters.mail);
    if (filters.priority !== "all")
      query = query.eq("priority", filters.priority);
    if (filters.budget !== "all")
      query = query.eq("budget_potential", filters.budget);
    if (filters.industry !== "all")
      query = query.eq("industry", filters.industry);
    if (filters.stage !== "all")
      query = query.eq("company_stage", filters.stage);
    query = query.order(sort.column, {
      ascending: sort.ascending,
      nullsFirst: false,
    });
    const from = filters.page * PAGE_SIZE;
    return query.range(from, from + PAGE_SIZE - 1);
  };
  let { data, error, count } = await run(filters.sort);
  if (
    error &&
    filters.sort === "verified_desc" &&
    /verified_at/.test(error.message)
  ) {
    toast.message(
      "No verified date on this table — sorted by recently updated instead.",
    );
    ({ data, error, count } = await run("updated_desc"));
  }
  if (error) throw new Error(error.message);
  return {
    rows: data ?? [],
    count: count ?? 0,
  };
}
async function fetchStats() {
  const countFor = async (mail) => {
    let q = supabase.from("brand_leads").select("id", {
      count: "exact",
      head: true,
    });
    if (mail) q = q.eq("mail", mail);
    const { count, error } = await q;
    if (error) throw new Error(error.message);
    return count ?? 0;
  };
  const [total, pending, complete, success] = await Promise.all([
    countFor(),
    countFor("Pending"),
    countFor("Complete"),
    countFor("Success"),
  ]);
  return {
    total,
    pending,
    complete,
    success,
  };
}
async function fetchOptions() {
  const { data, error } = await supabase
    .from("brand_leads")
    .select("industry, company_stage")
    .limit(2e3);
  if (error) throw new Error(error.message);
  const industries = /* @__PURE__ */ new Set();
  const stages = /* @__PURE__ */ new Set();
  for (const row of data ?? []) {
    if (row.industry) industries.add(row.industry);
    if (row.company_stage) stages.add(row.company_stage);
  }
  return {
    industries: [...industries].sort(),
    stages: [...stages].sort(),
  };
}
//#endregion
export { Dashboard as component };
