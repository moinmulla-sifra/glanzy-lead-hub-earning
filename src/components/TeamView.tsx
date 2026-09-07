import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase, type WorkspaceMember } from "@/lib/supabase";
import { toast } from "sonner";
import { Users, Loader2, UserPlus, Shield, UserMinus } from "lucide-react";

export function TeamView({ userId }: { userId: string | null }) {
  const queryClient = useQueryClient();
  const [inviteEmail, setInviteEmail] = useState("");

  const workspaceMemberQuery = useQuery({
    queryKey: ["workspace_member_team", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workspace_members")
        .select("workspace_id, role, workspaces(name, workspace_type)")
        .eq("user_id", userId!)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const workspaceId = workspaceMemberQuery.data?.workspace_id;
  const isOwner = workspaceMemberQuery.data?.role === "owner";
  const isAgency =
    workspaceMemberQuery.data?.workspaces?.workspace_type === "agency";

  const teamMembersQuery = useQuery({
    queryKey: ["team_members", workspaceId],
    enabled: !!workspaceId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workspace_members")
        .select("*, profiles(full_name, avatar_url, account_type)")
        .eq("workspace_id", workspaceId!);

      if (error) throw error;
      return data;
    },
  });

  const inviteMemberMutation = useMutation({
    mutationFn: async (email: string) => {
      // In a real app, this would trigger an edge function to send an invite email
      // and create a pending invite record. For this preview, we'll simulate it.
      await new Promise((r) => setTimeout(r, 1000));
      throw new Error(
        "Email invitations are disabled in this preview environment.",
      );
    },
    onSuccess: () => {
      toast.success("Invitation sent successfully");
      setInviteEmail("");
    },
    onError: (err: Error) =>
      toast.error(err.message || "Failed to send invitation"),
  });

  if (!userId || workspaceMemberQuery.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
      </div>
    );
  }

  if (!isAgency) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
          <Users className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Team Management
        </h2>
        <p className="text-muted-foreground">
          Team management is only available for Agency accounts. You are
          currently on a Creator account.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-6 lg:gap-8 pb-12 animate-in fade-in duration-500 max-w-5xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <Users className="text-brand" size={32} /> Team Members
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage access to your agency workspace (
            {workspaceMemberQuery.data?.workspaces?.name}).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Members List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-card border border-border/60 rounded-3xl p-6 subtle-shadow">
            <h2 className="font-bold text-lg mb-6">Active Members</h2>

            {teamMembersQuery.isLoading ? (
              <div className="flex justify-center p-8">
                <Loader2 className="w-6 h-6 animate-spin text-brand" />
              </div>
            ) : (
              <div className="space-y-4">
                {teamMembersQuery.data?.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center overflow-hidden">
                        {member.profiles?.avatar_url ? (
                          <img
                            src={member.profiles.avatar_url}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="font-bold text-sm">
                            {member.profiles?.full_name?.charAt(0) || "U"}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">
                          {member.profiles?.full_name || "Unknown User"}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {member.role}
                        </p>
                      </div>
                    </div>

                    {isOwner && member.user_id !== userId && (
                      <button
                        className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        title="Remove Member"
                      >
                        <UserMinus size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Invite Panel */}
        <div className="space-y-4">
          <div className="bg-card border border-border/60 rounded-3xl p-6 subtle-shadow">
            <h2 className="font-bold text-lg mb-2">Invite New Member</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Send an email invitation to join this workspace.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (inviteEmail) inviteMemberMutation.mutate(inviteEmail);
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@agency.com"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50"
                  disabled={!isOwner}
                />
              </div>

              <button
                type="submit"
                disabled={
                  !isOwner || inviteMemberMutation.isPending || !inviteEmail
                }
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-foreground text-background font-semibold rounded-xl text-sm hover:bg-foreground/90 transition-all shadow-sm disabled:opacity-50"
              >
                {inviteMemberMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <UserPlus className="w-4 h-4" />
                )}
                Send Invitation
              </button>

              {!isOwner && (
                <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1 mt-2">
                  <Shield size={12} /> Only workspace owners can invite members.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
