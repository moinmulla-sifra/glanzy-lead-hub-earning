import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase, type Profile } from "@/lib/supabase";
import { toast } from "sonner";
import { User, Loader2, Save, ExternalLink } from "lucide-react";

export function ProfileView({ userId }: { userId: string | null }) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Partial<Profile>>({});
  
  const profileQuery = useQuery({
    queryKey: ["profile", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId!).single();
      if (error) throw error;
      return data as Profile;
    },
  });

  useEffect(() => {
    if (profileQuery.data) {
      setFormData(profileQuery.data);
    }
  }, [profileQuery.data]);

  const updateProfileMutation = useMutation({
    mutationFn: async (updates: Partial<Profile>) => {
      const { error } = await supabase
        .from("profiles")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", userId!);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err: Error) => toast.error(err.message || "Failed to update profile"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    updateProfileMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!userId || profileQuery.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
      </div>
    );
  }

  const isAgency = profileQuery.data?.account_type === "agency";

  return (
    <div className="flex flex-col h-full gap-6 lg:gap-8 pb-12 animate-in fade-in duration-500 max-w-4xl mx-auto w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <User className="text-brand" size={32} /> Profile
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage your public identity and brand matching preferences.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border border-border/60 rounded-3xl p-6 lg:p-10 subtle-shadow space-y-8">
        
        {/* Basic Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name || ""}
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50"
              />
            </div>
            
            {isAgency && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Agency Name</label>
                <input
                  type="text"
                  name="agency_name"
                  value={formData.agency_name || ""}
                  onChange={handleChange}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country || ""}
                onChange={handleChange}
                placeholder="e.g. United States"
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50"
              />
            </div>
          </div>
        </div>

        <hr className="border-border/50" />

        {/* Brand Matching */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground mb-4">Brand Matching</h2>
          <p className="text-sm text-muted-foreground mb-4">This information helps us recommend the best brand opportunities in the For You section.</p>
          
          <div className="space-y-2 max-w-lg">
            <label className="text-sm font-semibold text-foreground">Primary Niche / Category</label>
            <input
              type="text"
              name="niche"
              value={formData.niche || ""}
              onChange={handleChange}
              placeholder="e.g. Tech, Beauty, Gaming, Lifestyle"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50"
            />
          </div>

          <div className="space-y-2 max-w-2xl">
            <label className="text-sm font-semibold text-foreground">Bio / Description</label>
            <textarea
              name="bio"
              value={formData.bio || ""}
              onChange={handleChange}
              rows={4}
              placeholder="Tell brands a little about your content and audience..."
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 resize-none"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={updateProfileMutation.isPending}
            className="flex items-center gap-2 px-6 py-3 bg-brand text-brand-foreground font-semibold rounded-xl text-sm hover:bg-brand/90 transition-all shadow-sm shadow-brand/20 disabled:opacity-50"
          >
            {updateProfileMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}
