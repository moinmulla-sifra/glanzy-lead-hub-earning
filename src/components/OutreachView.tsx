import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  supabase,
  type Outreach,
  type OutreachStatus,
  type OutreachActivity,
  type Brand,
} from "@/lib/supabase";
import { toast } from "sonner";
import {
  ExternalLink,
  Mail,
  User,
  Phone,
  Check,
  ChevronRight,
  MessageSquare,
  Briefcase,
  Calendar,
  Save,
  Send,
  Search,
  SlidersHorizontal,
  Plus,
  X,
  List,
  LayoutGrid,
  Clock,
  Activity,
  FileText,
  ArrowRight,
  MoreVertical,
  Globe,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

const STATUSES: OutreachStatus[] = [
  "Saved",
  "Contacted",
  "Replied",
  "Interested",
  "Meeting",
  "Won",
  "Lost",
];

const getStatusColor = (status: OutreachStatus) => {
  switch (status) {
    case "Won":
      return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
    case "Lost":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "Contacted":
    case "Replied":
    case "Interested":
    case "Meeting":
      return "bg-brand/10 text-brand border-brand/20";
    case "Saved":
    default:
      return "bg-muted/50 text-muted-foreground border-border/50";
  }
};

export function OutreachView({
  userId,
  defaultSelectedId,
}: {
  userId: string | null;
  defaultSelectedId?: string | null;
}) {
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState<"pipeline" | "list">("pipeline");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<OutreachStatus[]>([]);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 400);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const workspacesQuery = useQuery({
    queryKey: ["workspaces", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workspace_members")
        .select("workspace_id")
        .eq("user_id", userId!);
      if (error) throw error;
      return data.map((d) => d.workspace_id);
    },
  });

  const workspaceId = workspacesQuery.data?.[0];

  const outreachQuery = useQuery({
    queryKey: ["outreach", workspaceId],
    enabled: !!workspaceId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("outreach")
        .select(`*, brand:brand_id (*)`)
        .eq("workspace_id", workspaceId!)
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data as Outreach[];
    },
  });

  const allRecords = useMemo(() => outreachQuery.data || [], [outreachQuery.data]);

  const filteredRecords = useMemo(() => {
    return allRecords.filter((record) => {
      if (statusFilter.length > 0 && !statusFilter.includes(record.status))
        return false;
      if (debouncedSearch) {
        const search = debouncedSearch.toLowerCase();
        const brand = record.brand;
        if (!brand) return false;
        if (
          !brand.company_name.toLowerCase().includes(search) &&
          !brand.industry?.toLowerCase().includes(search) &&
          !brand.contact_person?.toLowerCase().includes(search) &&
          !brand.email?.toLowerCase().includes(search)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [allRecords, statusFilter, debouncedSearch]);

  const initMutation = useMutation({
    mutationFn: async (brandId: string) => {
      if (!workspaceId) throw new Error("No workspace");
      const { data: existing, error: fetchErr } = await supabase
        .from("outreach")
        .select("id")
        .eq("workspace_id", workspaceId)
        .eq("brand_id", brandId)
        .maybeSingle();
      if (fetchErr) throw fetchErr;
      if (existing) return existing.id;

      const { data: saved } = await supabase
        .from("saved_brands")
        .select("*")
        .eq("workspace_id", workspaceId)
        .eq("brand_id", brandId)
        .maybeSingle();

      const { data: created, error: createErr } = await supabase
        .from("outreach")
        .insert({
          workspace_id: workspaceId,
          brand_id: brandId,
          status: "Saved",
          email_subject: saved?.email_subject || null,
          email_body: saved?.email_body || null,
          notes: saved?.notes || null,
        })
        .select("id")
        .single();

      if (createErr) throw createErr;

      await supabase.from("outreach_activity").insert({
        outreach_id: created.id,
        user_id: userId,
        activity_type: "created",
        description: "Started outreach from Discover/Saved",
        new_status: "Saved",
      });

      return created.id;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["outreach"] });
      setSelectedId(id);
      window.history.replaceState({}, "", "/outreach");
    },
  });

  useEffect(() => {
    if (defaultSelectedId && workspaceId && outreachQuery.isSuccess) {
      const existing = allRecords.find((o) => o.brand_id === defaultSelectedId);
      if (existing) {
        setSelectedId(existing.id);
        window.history.replaceState({}, "", "/outreach");
      } else if (!initMutation.isPending && !initMutation.isSuccess) {
        initMutation.mutate(defaultSelectedId);
      }
    }
  }, [
    defaultSelectedId,
    workspaceId,
    outreachQuery.isSuccess,
    allRecords,
    initMutation,
  ]);

  const updateStatusMutation = useMutation({
    mutationFn: async ({
      id,
      status,
      oldStatus,
    }: {
      id: string;
      status: OutreachStatus;
      oldStatus: string;
    }) => {
      const { error } = await supabase
        .from("outreach")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;

      await supabase.from("outreach_activity").insert({
        outreach_id: id,
        user_id: userId,
        activity_type: "status_changed",
        old_status: oldStatus,
        new_status: status,
      });
    },
    onSuccess: () => {
      toast.success("Status updated");
      queryClient.invalidateQueries({ queryKey: ["outreach"] });
      queryClient.invalidateQueries({
        queryKey: ["outreach_activity", selectedId],
      });
    },
    onError: (err: Error) =>
      toast.error(err.message || "Could not update status"),
  });

  const markContactedMutation = useMutation({
    mutationFn: async ({
      id,
      oldStatus,
    }: {
      id: string;
      oldStatus: string;
    }) => {
      const now = new Date().toISOString();
      const { error } = await supabase
        .from("outreach")
        .update({
          status: "Contacted",
          contacted_at: now,
          last_activity_at: now,
          updated_at: now,
        })
        .eq("id", id);
      if (error) throw error;

      await supabase.from("outreach_activity").insert({
        outreach_id: id,
        user_id: userId,
        activity_type: "contacted",
        description: "Marked as contacted",
        old_status: oldStatus,
        new_status: "Contacted",
      });
    },
    onSuccess: () => {
      toast.success("Marked as contacted!");
      queryClient.invalidateQueries({ queryKey: ["outreach"] });
      queryClient.invalidateQueries({
        queryKey: ["outreach_activity", selectedId],
      });
    },
    onError: (err: Error) => toast.error(err.message || "Error updating"),
  });

  const updateEmailMutation = useMutation({
    mutationFn: async ({
      id,
      subject,
      body,
    }: {
      id: string;
      subject: string;
      body: string;
    }) => {
      const now = new Date().toISOString();
      const { error } = await supabase
        .from("outreach")
        .update({
          email_subject: subject,
          email_body: body,
          updated_at: now,
          last_activity_at: now,
        })
        .eq("id", id);
      if (error) throw error;

      await supabase.from("outreach_activity").insert({
        outreach_id: id,
        user_id: userId,
        activity_type: "email_updated",
        description: "Email draft updated",
      });
    },
    onSuccess: () => {
      toast.success("Draft saved successfully");
      queryClient.invalidateQueries({ queryKey: ["outreach"] });
      queryClient.invalidateQueries({
        queryKey: ["outreach_activity", selectedId],
      });
    },
    onError: (err: Error) => toast.error(err.message || "Could not save draft"),
  });

  const updateNotesMutation = useMutation({
    mutationFn: async ({ id, notes }: { id: string; notes: string }) => {
      const now = new Date().toISOString();
      const { error } = await supabase
        .from("outreach")
        .update({ notes, updated_at: now, last_activity_at: now })
        .eq("id", id);
      if (error) throw error;

      await supabase.from("outreach_activity").insert({
        outreach_id: id,
        user_id: userId,
        activity_type: "note_added",
        description: "Notes updated",
      });
    },
    onSuccess: () => {
      toast.success("Notes saved");
      queryClient.invalidateQueries({ queryKey: ["outreach"] });
      queryClient.invalidateQueries({
        queryKey: ["outreach_activity", selectedId],
      });
    },
    onError: (err: Error) => toast.error(err.message || "Could not save notes"),
  });

  const updateNextActionMutation = useMutation({
    mutationFn: async ({
      id,
      next_action,
    }: {
      id: string;
      next_action: string;
    }) => {
      const now = new Date().toISOString();
      const { error } = await supabase
        .from("outreach")
        .update({ next_action, updated_at: now, last_activity_at: now })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Next action updated");
      queryClient.invalidateQueries({ queryKey: ["outreach"] });
    },
    onError: (err: Error) =>
      toast.error(err.message || "Could not save next action"),
  });

  const activeCount = allRecords.filter(
    (r) => !["Won", "Lost"].includes(r.status),
  ).length;
  const metrics = {
    active: activeCount,
    replied: allRecords.filter((r) => r.status === "Replied").length,
    meetings: allRecords.filter((r) => r.status === "Meeting").length,
    won: allRecords.filter((r) => r.status === "Won").length,
  };

  const selected = selectedId
    ? filteredRecords.find((r) => r.id === selectedId) || null
    : null;

  return (
    <div className="flex flex-col h-full gap-6 lg:gap-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              Outreach
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Manage your brand conversations and keep every opportunity
              organized.
            </p>
          </div>
          <div className="flex items-center bg-card p-1 rounded-xl border border-border/60 shadow-sm subtle-shadow">
            <button
              onClick={() => setViewMode("pipeline")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${viewMode === "pipeline" ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
            >
              <LayoutGrid size={16} /> Pipeline
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${viewMode === "list" ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
            >
              <List size={16} /> List
            </button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border/60 rounded-2xl p-4 subtle-shadow">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Activity size={16} />{" "}
              <span className="text-sm font-semibold">Active Outreach</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {metrics.active}
            </p>
          </div>
          <div className="bg-card border border-border/60 rounded-2xl p-4 subtle-shadow">
            <div className="flex items-center gap-2 text-brand mb-2">
              <MessageSquare size={16} />{" "}
              <span className="text-sm font-semibold">Replied</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {metrics.replied}
            </p>
          </div>
          <div className="bg-card border border-border/60 rounded-2xl p-4 subtle-shadow">
            <div className="flex items-center gap-2 text-blue-500 mb-2">
              <Calendar size={16} />{" "}
              <span className="text-sm font-semibold">Meetings</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {metrics.meetings}
            </p>
          </div>
          <div className="bg-card border border-border/60 rounded-2xl p-4 subtle-shadow">
            <div className="flex items-center gap-2 text-green-500 mb-2">
              <CheckCircle2 size={16} />{" "}
              <span className="text-sm font-semibold">Won</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{metrics.won}</p>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-center bg-card p-2 rounded-2xl border border-border/60 shadow-sm subtle-shadow">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search outreach..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-transparent border-none focus:ring-0 text-base placeholder:text-muted-foreground"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {outreachQuery.isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center p-12 bg-card border border-border/60 rounded-3xl">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent mb-4" />
          <p className="font-semibold text-muted-foreground">
            Loading your pipeline...
          </p>
        </div>
      ) : allRecords.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-16 bg-card border border-border/60 rounded-3xl">
          <div className="w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center mb-6 border border-border/50 shadow-sm">
            <Briefcase className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-3">No outreach yet</h2>
          <p className="text-muted-foreground max-w-md mb-8 text-lg">
            Choose a brand from Discover and start your first conversation.
          </p>
          <Link
            to="/discover"
            className="px-6 py-3 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm flex items-center gap-2"
          >
            <Globe size={18} /> Discover Brands
          </Link>
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-h-0 relative">
          {viewMode === "list" && (
            <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
              {/* List View Master */}
              <div className="w-full md:w-[400px] flex flex-col bg-card rounded-3xl border border-border/60 subtle-shadow overflow-hidden flex-shrink-0 min-h-0">
                <div className="p-4 border-b border-border/50 bg-muted/20">
                  <h2 className="font-bold tracking-tight">Active Pipeline</h2>
                  <p className="text-xs text-muted-foreground">
                    {filteredRecords.length} opportunities
                  </p>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                  {filteredRecords.map((row) => {
                    const isSelected = selected?.id === row.id;
                    return (
                      <button
                        key={row.id}
                        onClick={() => setSelectedId(row.id)}
                        className={`w-full text-left p-4 rounded-2xl transition-all duration-200 border
                          ${isSelected ? "bg-brand/5 border-brand/30 shadow-sm" : "bg-transparent border-transparent hover:bg-muted/50 hover:border-border/50"}
                        `}
                      >
                        <div className="flex justify-between items-start mb-1.5">
                          <span className="font-bold text-foreground truncate pr-2 leading-tight">
                            {row.brand?.company_name || "Unknown Brand"}
                          </span>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap border ${getStatusColor(row.status)}`}
                          >
                            {row.status}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                          <div className="flex justify-between items-center">
                            <span className="truncate flex items-center gap-1">
                              <Briefcase size={12} />{" "}
                              {row.brand?.industry || "Unspecified"}
                            </span>
                            <span>
                              {new Date(row.updated_at).toLocaleDateString(
                                undefined,
                                { month: "short", day: "numeric" },
                              )}
                            </span>
                          </div>
                          {row.next_action && (
                            <span className="text-foreground/80 font-medium truncate flex items-center gap-1">
                              <ArrowRight size={12} className="text-brand" />{" "}
                              {row.next_action}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Detail Pane */}
              <div className="flex-1 flex flex-col bg-card rounded-3xl border border-border/60 subtle-shadow overflow-hidden min-h-0">
                {selected ? (
                  <OutreachDetailPane
                    outreach={selected}
                    userId={userId}
                    onClose={() => setSelectedId(null)}
                    onStatusChange={(status) =>
                      updateStatusMutation.mutate({
                        id: selected.id,
                        status,
                        oldStatus: selected.status,
                      })
                    }
                    onMarkContacted={() =>
                      markContactedMutation.mutate({
                        id: selected.id,
                        oldStatus: selected.status,
                      })
                    }
                    onSaveEmail={(subject, body) =>
                      updateEmailMutation.mutate({
                        id: selected.id,
                        subject,
                        body,
                      })
                    }
                    onSaveNotes={(notes) =>
                      updateNotesMutation.mutate({ id: selected.id, notes })
                    }
                    onSaveNextAction={(next_action) =>
                      updateNextActionMutation.mutate({
                        id: selected.id,
                        next_action,
                      })
                    }
                  />
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
                    <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4 border border-border/50 shadow-sm">
                      <Briefcase className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      Select an opportunity
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Choose a brand from the list to view details and manage
                      outreach.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {viewMode === "pipeline" && (
            <div className="flex-1 flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
              {[
                "Saved",
                "Contacted",
                "Replied",
                "Interested",
                "Meeting",
                "Won",
              ].map((colStatus) => {
                const colRecords = filteredRecords.filter(
                  (r) => r.status === colStatus,
                );
                return (
                  <div
                    key={colStatus}
                    className="w-[320px] flex-shrink-0 flex flex-col bg-muted/20 border border-border/50 rounded-3xl snap-start"
                  >
                    <div className="p-4 flex items-center justify-between border-b border-border/50">
                      <h3 className="font-bold flex items-center gap-2">
                        {colStatus}
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/50">
                          {colRecords.length}
                        </span>
                      </h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
                      {colRecords.map((record) => (
                        <div
                          key={record.id}
                          onClick={() => setSelectedId(record.id)}
                          className="bg-card rounded-2xl p-4 border border-border/60 subtle-shadow cursor-pointer hover:border-brand/40 hover:-translate-y-0.5 transition-all"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold leading-tight line-clamp-1 pr-2">
                              {record.brand?.company_name}
                            </h4>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1 line-clamp-1">
                            <Briefcase size={12} />{" "}
                            {record.brand?.industry || "Industry unspecified"}
                          </p>

                          {record.next_action && (
                            <div className="mb-3 p-2 bg-muted/40 rounded-lg border border-border/50 text-xs text-foreground/90 font-medium flex gap-1.5">
                              <ArrowRight
                                size={14}
                                className="text-brand shrink-0"
                              />{" "}
                              <span className="line-clamp-2">
                                {record.next_action}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50 text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                            <span className="flex items-center gap-1">
                              <Clock size={12} />{" "}
                              {new Date(record.updated_at).toLocaleDateString()}
                            </span>
                            {record.brand?.lead_score != null && (
                              <span className="text-brand flex items-center gap-1">
                                <Activity size={12} /> Score{" "}
                                {record.brand.lead_score}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pipeline Detail Modal (when selected in pipeline mode) */}
          {viewMode === "pipeline" && selected && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-card w-full max-w-5xl max-h-full rounded-3xl border border-border/60 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
                <OutreachDetailPane
                  outreach={selected}
                  userId={userId}
                  onClose={() => setSelectedId(null)}
                  onStatusChange={(status) =>
                    updateStatusMutation.mutate({
                      id: selected.id,
                      status,
                      oldStatus: selected.status,
                    })
                  }
                  onMarkContacted={() =>
                    markContactedMutation.mutate({
                      id: selected.id,
                      oldStatus: selected.status,
                    })
                  }
                  onSaveEmail={(subject, body) =>
                    updateEmailMutation.mutate({
                      id: selected.id,
                      subject,
                      body,
                    })
                  }
                  onSaveNotes={(notes) =>
                    updateNotesMutation.mutate({ id: selected.id, notes })
                  }
                  onSaveNextAction={(next_action) =>
                    updateNextActionMutation.mutate({
                      id: selected.id,
                      next_action,
                    })
                  }
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function OutreachDetailPane({
  outreach,
  userId,
  onClose,
  onStatusChange,
  onMarkContacted,
  onSaveEmail,
  onSaveNotes,
  onSaveNextAction,
}: {
  outreach: Outreach;
  userId: string | null;
  onClose?: () => void;
  onStatusChange: (s: OutreachStatus) => void;
  onMarkContacted: () => void;
  onSaveEmail: (s: string, b: string) => void;
  onSaveNotes: (n: string) => void;
  onSaveNextAction: (n: string) => void;
}) {
  const [activeTab, setActiveTab] = useState<"details" | "email" | "history">(
    "details",
  );
  const [emailSubject, setEmailSubject] = useState(
    outreach.email_subject || "",
  );
  const [emailBody, setEmailBody] = useState(outreach.email_body || "");
  const [notes, setNotes] = useState(outreach.notes || "");
  const [nextAction, setNextAction] = useState(outreach.next_action || "");

  // Reset local state when outreach changes
  useEffect(() => {
    setEmailSubject(outreach.email_subject || "");
    setEmailBody(outreach.email_body || "");
    setNotes(outreach.notes || "");
    setNextAction(outreach.next_action || "");
  }, [
    outreach.id,
    outreach.email_subject,
    outreach.email_body,
    outreach.notes,
    outreach.next_action,
  ]);

  const activityQuery = useQuery({
    queryKey: ["outreach_activity", outreach.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("outreach_activity")
        .select("*")
        .eq("outreach_id", outreach.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as OutreachActivity[];
    },
  });

  return (
    <div className="flex flex-col h-full overflow-hidden bg-card rounded-3xl">
      {/* Header */}
      <div className="p-6 border-b border-border/50 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-foreground truncate">
              {outreach.brand?.company_name}
            </h2>
            {outreach.brand?.website && (
              <a
                href={outreach.brand.website}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-brand transition-colors p-1 bg-muted rounded-md"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5">
              <Briefcase size={14} />{" "}
              {outreach.brand?.industry || "Industry unspecified"}
            </span>
            {outreach.brand?.country && (
              <span className="flex items-center gap-1.5">
                <Globe size={14} /> {outreach.brand.country}
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex flex-col gap-1 items-end">
            <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
              Current Status
            </span>
            <select
              value={outreach.status}
              onChange={(e) => onStatusChange(e.target.value as OutreachStatus)}
              className={`h-9 pl-3 pr-8 rounded-xl text-sm font-bold shadow-sm appearance-none cursor-pointer border focus:ring-2 focus:ring-brand focus:outline-none ${getStatusColor(outreach.status)}`}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors ml-2 self-start flex"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Tab Nav */}
      <div className="px-6 pt-4 border-b border-border/50 flex items-center gap-6 overflow-x-auto custom-scrollbar">
        {[
          { id: "details", icon: FileText, label: "Details & Notes" },
          { id: "email", icon: Mail, label: "Email Draft" },
          { id: "history", icon: Activity, label: "Activity History" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as "details" | "email" | "history")}
            className={`flex items-center gap-2 pb-3 px-1 text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${
              activeTab === t.id
                ? "border-brand text-brand"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            <t.icon size={16} /> {t.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-muted/10">
        {activeTab === "details" && (
          <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Info */}
              <div className="bg-card rounded-2xl p-5 border border-border/60 subtle-shadow">
                <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                  <User size={16} className="text-brand" /> Key Contact
                </h3>
                {outreach.brand?.contact_person ? (
                  <div className="space-y-3">
                    <div>
                      <p className="font-bold text-foreground text-lg leading-none mb-1">
                        {outreach.brand.contact_person}
                      </p>
                      {outreach.brand.contact_role && (
                        <p className="text-sm text-muted-foreground">
                          {outreach.brand.contact_role}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 pt-2">
                      {outreach.brand.email && (
                        <a
                          href={`mailto:${outreach.brand.email}`}
                          className="flex items-center gap-3 text-sm text-foreground hover:text-brand transition-colors p-2 rounded-lg hover:bg-muted/50 border border-transparent hover:border-border"
                        >
                          <div className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0">
                            <Mail size={14} />
                          </div>
                          <span className="truncate">
                            {outreach.brand.email}
                          </span>
                        </a>
                      )}
                      {outreach.brand.phone && (
                        <a
                          href={`tel:${outreach.brand.phone}`}
                          className="flex items-center gap-3 text-sm text-foreground hover:text-brand transition-colors p-2 rounded-lg hover:bg-muted/50 border border-transparent hover:border-border"
                        >
                          <div className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0">
                            <Phone size={14} />
                          </div>
                          <span>{outreach.brand.phone}</span>
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="h-full min-h-[100px] flex items-center justify-center text-center">
                    <p className="text-sm text-muted-foreground italic">
                      No contact information available for this brand.
                    </p>
                  </div>
                )}
              </div>

              {/* Next Action */}
              <div className="bg-card rounded-2xl p-5 border border-border/60 subtle-shadow flex flex-col">
                <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                  <ArrowRight size={16} className="text-brand" /> Next Action
                </h3>
                <div className="flex-1 flex flex-col gap-3">
                  <input
                    value={nextAction}
                    onChange={(e) => setNextAction(e.target.value)}
                    placeholder="E.g. Follow up on Tuesday, Send portfolio..."
                    className="w-full px-3 py-2 bg-transparent border-b border-border/50 focus:border-brand focus:outline-none text-sm font-medium transition-colors"
                  />
                  <div className="mt-auto flex justify-end">
                    <button
                      onClick={() => onSaveNextAction(nextAction)}
                      disabled={nextAction === outreach.next_action}
                      className="px-4 py-1.5 bg-muted text-foreground rounded-lg text-xs font-semibold hover:bg-muted/80 transition-colors disabled:opacity-50"
                    >
                      Save Action
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-card rounded-2xl p-5 border border-border/60 subtle-shadow flex flex-col min-h-[250px]">
              <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                <MessageSquare size={16} className="text-brand" /> Workspace
                Notes
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                These notes are private to your workspace and not visible to the
                brand.
              </p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Log call notes, thoughts, or strategies..."
                className="w-full flex-1 min-h-[150px] p-4 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand text-sm leading-relaxed resize-y custom-scrollbar"
              />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => onSaveNotes(notes)}
                  disabled={notes === outreach.notes}
                  className="flex items-center gap-2 px-5 py-2.5 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none"
                >
                  <Save size={14} /> Save Notes
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "email" && (
          <div className="flex flex-col h-full max-w-4xl mx-auto bg-card rounded-2xl p-5 border border-border/60 subtle-shadow">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Mail size={16} className="text-brand" /> Email Drafter
              </h3>
              {outreach.status === "Saved" && (
                <button
                  onClick={onMarkContacted}
                  className="flex items-center gap-2 px-4 py-2 bg-brand/10 text-brand rounded-xl text-sm font-semibold hover:bg-brand/20 transition-colors border border-brand/20"
                >
                  <Check size={14} /> Mark as Contacted
                </button>
              )}
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Subject
                </label>
                <input
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Compelling subject line..."
                  className="w-full px-4 py-3 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand text-sm font-semibold transition-colors"
                />
              </div>

              <div className="flex-1 flex flex-col space-y-1.5 min-h-[300px]">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex justify-between">
                  Message Body
                  <span className="normal-case text-muted-foreground/60 font-medium">
                    Use personalized details for best results
                  </span>
                </label>
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Write your outreach message here..."
                  className="w-full flex-1 p-4 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand text-sm leading-relaxed resize-y custom-scrollbar"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between mt-6 pt-4 border-t border-border/50 gap-4">
              <p className="text-xs text-muted-foreground">
                Branzly does not send emails automatically. Copy and send via
                your client.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${emailSubject}\n\n${emailBody}`,
                    );
                    toast.success("Copied to clipboard!");
                  }}
                  className="px-4 py-2.5 bg-background border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors"
                >
                  Copy Content
                </button>
                <button
                  onClick={() => onSaveEmail(emailSubject, emailBody)}
                  disabled={
                    emailSubject === outreach.email_subject &&
                    emailBody === outreach.email_body
                  }
                  className="flex items-center gap-2 px-4 py-2.5 bg-muted text-foreground rounded-xl text-sm font-semibold hover:bg-muted/80 transition-colors disabled:opacity-50"
                >
                  <Save size={16} /> Save Draft
                </button>
                <a
                  href={`mailto:${outreach.brand?.email || ""}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`}
                  className="flex items-center gap-2 px-5 py-2.5 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm"
                >
                  <Send size={16} /> Open Mail Client
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="max-w-3xl mx-auto">
            {activityQuery.isLoading ? (
              <div className="flex justify-center p-8">
                <div className="w-6 h-6 animate-spin rounded-full border-2 border-brand border-t-transparent" />
              </div>
            ) : activityQuery.data?.length === 0 ? (
              <div className="text-center p-12 bg-card rounded-2xl border border-border/60">
                <p className="text-muted-foreground">
                  No activity recorded yet.
                </p>
              </div>
            ) : (
              <div className="relative pl-6 space-y-8 before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-border/60">
                {activityQuery.data?.map((activity) => (
                  <div key={activity.id} className="relative">
                    <div className="absolute -left-6 top-1 w-6 h-6 rounded-full bg-background border-2 border-muted flex items-center justify-center">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          activity.activity_type === "status_changed"
                            ? "bg-brand"
                            : activity.activity_type === "contacted"
                              ? "bg-green-500"
                              : activity.activity_type === "created"
                                ? "bg-blue-500"
                                : "bg-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="pl-4">
                      <p className="text-xs text-muted-foreground font-medium mb-1">
                        {new Date(activity.created_at).toLocaleString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          },
                        )}
                      </p>
                      <div className="bg-card p-4 rounded-2xl border border-border/60 subtle-shadow">
                        {activity.activity_type === "status_changed" ? (
                          <p className="text-sm text-foreground">
                            Status changed from{" "}
                            <span className="font-semibold">
                              {activity.old_status}
                            </span>{" "}
                            to{" "}
                            <span className="font-semibold text-brand">
                              {activity.new_status}
                            </span>
                          </p>
                        ) : activity.activity_type === "contacted" ? (
                          <p className="text-sm font-semibold text-foreground">
                            Marked as Contacted
                          </p>
                        ) : activity.activity_type === "created" ? (
                          <p className="text-sm font-semibold text-foreground">
                            Outreach Started
                          </p>
                        ) : (
                          <p className="text-sm text-foreground">
                            {activity.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
