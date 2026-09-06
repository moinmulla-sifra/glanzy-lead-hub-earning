import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { toast } from "sonner";
import {
  ChevronRight,
  Filter,
  LogOut,
  RefreshCw,
  Search,
} from "lucide-react";
import { supabase, type BrandLead } from "@/lib/supabase";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LeadDetails, badgeClass, fmt } from "@/components/LeadDetails";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Glanzy Lead Command Center" },
      {
        name: "description",
        content: "Search, review and update Glanzy Studio's saved brand leads.",
      },
      { property: "og:title", content: "Glanzy Lead Command Center" },
      {
        property: "og:description",
        content: "Search, review and update Glanzy Studio's saved brand leads.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

const PAGE_SIZE = 50;
const SEARCH_COLUMNS = [
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

type SortKey = "lead_desc" | "fit_desc" | "updated_desc" | "verified_desc" | "name_asc";

const SORTS: Record<SortKey, { column: string; ascending: boolean }> = {
  lead_desc: { column: "lead_score", ascending: false },
  fit_desc: { column: "influencer_fit_score", ascending: false },
  updated_desc: { column: "updated_at", ascending: false },
  verified_desc: { column: "verified_at", ascending: false },
  name_asc: { column: "company_name", ascending: true },
};

interface Filters {
  search: string;
  mail: string;
  priority: string;
  budget: string;
  industry: string;
  stage: string;
  sort: SortKey;
  page: number;
}

function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [ready, setReady] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const [filters, setFilters] = useState<Filters>({
    search: "",
    mail: "all",
    priority: "all",
    budget: "all",
    industry: "all",
    stage: "all",
    sort: "lead_desc",
    page: 0,
  });
  const [searchInput, setSearchInput] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileDetailsOpen, setMobileDetailsOpen] = useState(false);

  // Session gate + persistence
  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      if (!data.session) {
        navigate({ to: "/auth", replace: true });
        return;
      }
      setUserEmail(data.session.user.email ?? null);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        setReady(false);
        navigate({ to: "/auth", replace: true });
      } else {
        setUserEmail(session.user.email ?? null);
      }
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  // Debounced search
  useEffect(() => {
    const t = setTimeout(
      () => setFilters((f) => ({ ...f, search: searchInput.trim(), page: 0 })),
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

  const refreshAll = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["brand_leads"] });
    queryClient.invalidateQueries({ queryKey: ["brand_leads_stats"] });
    queryClient.invalidateQueries({ queryKey: ["brand_leads_options"] });
  }, [queryClient]);

  // Realtime
  useEffect(() => {
    if (!ready) return;
    const channel = supabase
      .channel("brand_leads_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "brand_leads" }, () => {
        refreshAll();
      })
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [ready, refreshAll]);

  const rows = leadsQuery.data?.rows ?? [];
  const total = leadsQuery.data?.count ?? 0;

  useEffect(() => {
    if (!selectedId && rows[0]) setSelectedId(rows[0].id);
  }, [rows, selectedId]);

  const selected = useMemo(
    () => rows.find((r) => r.id === selectedId) ?? null,
    [rows, selectedId],
  );

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
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

  if (!ready) {
    return (
      <div className="glanzy app-shell">
        <div className="loading">Checking your session…</div>
      </div>
    );
  }

  return (
    <div className="glanzy app-shell">
      <header className="topbar">
        <div className="topbar-copy">
          <div className="eyebrow">GLANZY STUDIO</div>
          <h1>Lead Command Center</h1>
          <p>Search, review and update your saved brand leads directly from Supabase.</p>
        </div>
        <div className="topbar-actions">
          {userEmail ? <span className="user-chip">{userEmail}</span> : null}
          <ThemeToggle />
          <button className="btn secondary icon-label-btn" onClick={refreshAll}>
            <RefreshCw aria-hidden="true" />
            <span>Refresh</span>
          </button>
          <button className="btn danger icon-label-btn" onClick={signOut}>
            <LogOut aria-hidden="true" />
            <span>Sign out</span>
          </button>
        </div>
      </header>

      <section className="stats">
        <Stat label="Total Leads" value={stats?.total} />
        <Stat label="Pending" value={stats?.pending} />
        <Stat label="Complete" value={stats?.complete} />
        <Stat label="Success" value={stats?.success} />
      </section>

      <section className="toolbar" aria-label="Lead search and filters">
        <div className="search-wrap">
          <Search aria-hidden="true" />
          <input
            type="search"
            placeholder="Search brands, industry, product, email, email draft..."
            autoComplete="off"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <details className="mobile-filter-panel">
          <summary>
            <Filter aria-hidden="true" />
            Filters{activeFilterCount ? ` (${activeFilterCount})` : ""}
          </summary>
          <div className="mobile-filter-grid">
            <FilterControls
              filters={filters}
              setFilters={setFilters}
              industries={optionsQuery.data?.industries ?? []}
              stages={optionsQuery.data?.stages ?? []}
            />
          </div>
        </details>
        <div className="desktop-filter-controls">
          <FilterControls
            filters={filters}
            setFilters={setFilters}
            industries={optionsQuery.data?.industries ?? []}
            stages={optionsQuery.data?.stages ?? []}
          />
        </div>
      </section>

      <main className="content-grid">
        <section className="table-panel">
          <div className="panel-header">
            <div>
              <h2>Saved Brands</h2>
              <span className="muted">
                {leadsQuery.isLoading ? "Loading…" : `${total} match${total === 1 ? "" : "es"}`}
              </span>
            </div>
            {leadsQuery.error ? (
              <div className="error">{(leadsQuery.error as Error).message}</div>
            ) : null}
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Brand</th>
                  <th>Industry</th>
                  <th>Lead</th>
                  <th>Priority</th>
                  <th>Budget</th>
                  <th>Mail</th>
                </tr>
              </thead>
              <tbody>
                {leadsQuery.isLoading ? (
                  <tr>
                    <td colSpan={6} className="loading">
                      Loading saved brands…
                    </td>
                  </tr>
                ) : rows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="loading">
                      No matching brands.
                    </td>
                  </tr>
                ) : (
                  rows.map((r) => (
                    <tr
                      key={r.id}
                      className={selectedId === r.id ? "selected" : ""}
                      onClick={() => setSelectedId(r.id)}
                    >
                      <td>
                        <div className="brand-cell">
                          <div className="avatar">{initials(r.company_name)}</div>
                          <div>
                            <div className="brand-name">{fmt(r.company_name)}</div>
                            <div className="brand-sub">{fmt(r.email || r.website || r.product)}</div>
                          </div>
                        </div>
                      </td>
                      <td>{fmt(r.industry)}</td>
                      <td>
                        <span className="score">{r.lead_score ?? "—"}</span>
                      </td>
                      <td>
                        <span className="badge priority">{fmt(r.priority)}</span>
                      </td>
                      <td>{fmt(r.budget_potential)}</td>
                      <td>
                        <span className={`badge ${badgeClass(r.mail)}`}>{fmt(r.mail)}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="mobile-lead-list" aria-live="polite">
            {leadsQuery.isLoading ? (
              <div className="loading">Loading saved brands…</div>
            ) : rows.length === 0 ? (
              <div className="loading">No matching brands.</div>
            ) : (
              rows.map((lead) => (
                <button
                  type="button"
                  className="mobile-lead-card"
                  key={lead.id}
                  onClick={() => {
                    setSelectedId(lead.id);
                    setMobileDetailsOpen(true);
                  }}
                  aria-label={`Open ${fmt(lead.company_name)} details`}
                >
                  <span className="mobile-lead-main">
                    <span className="avatar">{initials(lead.company_name)}</span>
                    <span className="mobile-lead-copy">
                      <span className="mobile-brand-line">
                        <span className="brand-name">{fmt(lead.company_name)}</span>
                        <span className={`badge ${badgeClass(lead.mail)}`}>{fmt(lead.mail)}</span>
                      </span>
                      <span className="brand-sub">{fmt(lead.industry || lead.product)}</span>
                    </span>
                    <ChevronRight className="mobile-lead-chevron" aria-hidden="true" />
                  </span>
                  <span className="mobile-lead-metrics">
                    <span>
                      <small>Lead score</small>
                      <strong>{lead.lead_score ?? "—"}</strong>
                    </span>
                    <span>
                      <small>Priority</small>
                      <strong>{fmt(lead.priority)}</strong>
                    </span>
                    <span>
                      <small>Budget</small>
                      <strong>{fmt(lead.budget_potential)}</strong>
                    </span>
                  </span>
                </button>
              ))
            )}
          </div>
          <div className="pagination">
            <span className="muted">
              Page {filters.page + 1} of {pageCount}
            </span>
            <div className="section-actions">
              <button
                className="btn small secondary"
                disabled={filters.page === 0}
                onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
              >
                ← Previous
              </button>
              <button
                className="btn small secondary"
                disabled={filters.page + 1 >= pageCount}
                onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
              >
                Next →
              </button>
            </div>
          </div>
        </section>

        <LeadDetails
          lead={selected}
          onChanged={refreshAll}
          mobileOpen={mobileDetailsOpen}
          onMobileClose={() => setMobileDetailsOpen(false)}
        />
      </main>
    </div>
  );
}

function FilterControls({
  filters,
  setFilters,
  industries,
  stages,
}: {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  industries: string[];
  stages: string[];
}) {
  return (
    <>
      <Select value={filters.mail} onChange={(mail) => setFilters((f) => ({ ...f, mail, page: 0 }))} options={[["all", "All mail statuses"], ["Pending", "Pending"], ["Complete", "Complete"], ["Success", "Success"]]} />
      <Select value={filters.priority} onChange={(priority) => setFilters((f) => ({ ...f, priority, page: 0 }))} options={[["all", "All priorities"], ["Immediate", "Immediate"], ["High Priority", "High Priority"], ["Good Lead", "Good Lead"], ["Nurture", "Nurture"], ["Low", "Low"]]} />
      <Select value={filters.budget} onChange={(budget) => setFilters((f) => ({ ...f, budget, page: 0 }))} options={[["all", "All budget potential"], ["Very High", "Very High"], ["High", "High"], ["Medium", "Medium"], ["Low", "Low"], ["Unknown", "Unknown"]]} />
      <Select value={filters.industry} onChange={(industry) => setFilters((f) => ({ ...f, industry, page: 0 }))} options={[["all", "All industries"], ...industries.map((value) => [value, value] as [string, string])]} />
      <Select value={filters.stage} onChange={(stage) => setFilters((f) => ({ ...f, stage, page: 0 }))} options={[["all", "All company stages"], ...stages.map((value) => [value, value] as [string, string])]} />
      <Select value={filters.sort} onChange={(sort) => setFilters((f) => ({ ...f, sort: sort as SortKey, page: 0 }))} options={[["lead_desc", "Lead score ↓"], ["fit_desc", "Influencer fit ↓"], ["updated_desc", "Recently updated"], ["verified_desc", "Recently verified"], ["name_asc", "Brand A–Z"]]} />
    </>
  );
}

function Stat({ label, value }: { label: string; value: number | undefined }) {
  return (
    <div className="stat">
      <div className="label">{label}</div>
      <div className="value">{value ?? "—"}</div>
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <select className="control" value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map(([v, label]) => (
        <option key={v} value={v}>
          {label}
        </option>
      ))}
    </select>
  );
}

function initials(name: string | null) {
  return String(name || "?")
    .split(/\s+/)
    .slice(0, 2)
    .map((x) => x[0])
    .join("")
    .toUpperCase();
}

async function fetchLeads(filters: Filters) {
  const run = async (sortKey: SortKey) => {
    const sort = SORTS[sortKey];
    let query = supabase.from("brand_leads").select("*", { count: "exact" });
    const term = filters.search.replace(/[,()%]/g, " ").trim();
    if (term) {
      query = query.or(SEARCH_COLUMNS.map((c) => `${c}.ilike.%${term}%`).join(","));
    }
    if (filters.mail !== "all") query = query.eq("mail", filters.mail);
    if (filters.priority !== "all") query = query.eq("priority", filters.priority);
    if (filters.budget !== "all") query = query.eq("budget_potential", filters.budget);
    if (filters.industry !== "all") query = query.eq("industry", filters.industry);
    if (filters.stage !== "all") query = query.eq("company_stage", filters.stage);
    query = query.order(sort.column, { ascending: sort.ascending, nullsFirst: false });
    const from = filters.page * PAGE_SIZE;
    return query.range(from, from + PAGE_SIZE - 1);
  };

  let { data, error, count } = await run(filters.sort);
  if (error && filters.sort === "verified_desc" && /verified_at/.test(error.message)) {
    toast.message("No verified date on this table — sorted by recently updated instead.");
    ({ data, error, count } = await run("updated_desc"));
  }
  if (error) throw new Error(error.message);
  return { rows: (data ?? []) as BrandLead[], count: count ?? 0 };
}

async function fetchStats() {
  const countFor = async (mail?: string) => {
    let q = supabase.from("brand_leads").select("id", { count: "exact", head: true });
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
  return { total, pending, complete, success };
}

async function fetchOptions() {
  const { data, error } = await supabase
    .from("brand_leads")
    .select("industry, company_stage")
    .limit(2000);
  if (error) throw new Error(error.message);
  const industries = new Set<string>();
  const stages = new Set<string>();
  for (const row of data ?? []) {
    if (row.industry) industries.add(row.industry as string);
    if (row.company_stage) stages.add(row.company_stage as string);
  }
  return {
    industries: [...industries].sort(),
    stages: [...stages].sort(),
  };
}
