import {
  X, ExternalLink, Mail, Phone, Linkedin, Building2, TrendingUp, Sparkles, AlertCircle, Save, Check, Send, MapPin, Globe, Tag, DollarSign, Users, Activity, Briefcase, History, Info, Calendar, Instagram, Youtube, Twitter, Facebook
} from "lucide-react";
import { type Brand } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface BrandProfileModalProps {
  brand: Brand | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onSave: () => void;
  isSaving: boolean;
  onStartOutreach?: () => void; // Keeping for compatibility, but we might handle it internally
  onRefreshResearch?: () => void;
  isRefreshing?: boolean;
}

export const BrandProfileModal = React.memo(function BrandProfileModal({
  brand,
  isOpen,
  onClose,
  isSaved,
  onSave,
  isSaving,
  onRefreshResearch,
  isRefreshing,
}: BrandProfileModalProps) {
  const [showContact, setShowContact] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setShowContact(false); // Reset on open
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const { data: contactsData } = useQuery({
    queryKey: ["brand-contacts", brand?.id],
    enabled: !!brand?.id && isOpen,
    queryFn: async () => {
      const { data } = await supabase.from("brand_contacts").select("*").eq("brand_id", brand!.id);
      return data || [];
    }
  });

  const { data: productsData } = useQuery({
    queryKey: ["brand-products", brand?.id],
    enabled: !!brand?.id && isOpen,
    queryFn: async () => {
      const { data } = await supabase.from("brand_products").select("*").eq("brand_id", brand!.id);
      return data || [];
    }
  });

  const { data: socialProfilesData } = useQuery({
    queryKey: ["brand-social-profiles", brand?.id],
    enabled: !!brand?.id && isOpen,
    queryFn: async () => {
      const { data } = await supabase.from("brand_social_profiles").select("*").eq("brand_id", brand!.id);
      return data || [];
    }
  });

  const { data: activitiesData } = useQuery({
    queryKey: ["brand-activities", brand?.id],
    enabled: !!brand?.id && isOpen,
    queryFn: async () => {
      const { data } = await supabase.from("brand_activities").select("*").eq("brand_id", brand!.id).order('date', { ascending: false });
      return data || [];
    }
  });

  const { data: fundingData } = useQuery({
    queryKey: ["brand-funding", brand?.id],
    enabled: !!brand?.id && isOpen,
    queryFn: async () => {
      const { data } = await supabase.from("brand_funding").select("*").eq("brand_id", brand!.id);
      return data || [];
    }
  });

  // Fetch current user/workspace context and contacted status
  const { data: contactedData, refetch: refetchContacted } = useQuery({
    queryKey: ["brand-contacted-status", brand?.id],
    enabled: !!brand?.id && isOpen,
    queryFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) return null;
      const { data: workspaces } = await supabase.from('workspaces').select('id');
      if (!workspaces || workspaces.length === 0) return null;
      
      const { data } = await supabase
        .from("outreach")
        .select("*")
        .eq("workspace_id", workspaces?.[0]?.id)
        .eq("brand_id", brand!.id)
        .eq("status", "contacted")
        .maybeSingle();
      
      return data;
    }
  });

  const markContactedMutation = useMutation({
    mutationFn: async () => {
      if (!brand) throw new Error("No brand selected");
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error("Not authenticated");
      const { data: workspaces } = await supabase.from('workspaces').select('id');
      if (!workspaces || workspaces.length === 0) throw new Error("No workspace");
      
      // Upsert into outreach table with status 'contacted'
      const { error } = await supabase
        .from("outreach")
        .upsert({
          workspace_id: workspaces?.[0]?.id,
          brand_id: brand.id,
          status: "contacted",
          contacted_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          contacted_by: session.session.user.id,
          contact_channel: 'platform'
        }, { onConflict: 'workspace_id, brand_id' });
        
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Marked as contacted");
      refetchContacted();
      queryClient.invalidateQueries({ queryKey: ["outreach"] });
    },
    onError: (error) => {
      toast.error("Failed to mark as contacted");
      console.error(error);
    }
  });

  if (!isOpen || !brand) return null;

  const copyEmail = (email: string) => {
    if (email) {
      navigator.clipboard.writeText(email);
      toast.success("Email copied to clipboard");
    }
  };

  const hasContactInfo = brand.contact_person || brand.email || brand.phone || brand.linkedin || (contactsData && contactsData.length > 0);
  const isContacted = !!contactedData;

  const ScoreCircle = ({ score, label }: { score: number | null, label: string }) => {
    if (score === null || score === undefined) return null;
    const color = score >= 80 ? "text-green-500" : score >= 60 ? "text-yellow-500" : "text-muted-foreground";
    return (
      <div className="flex flex-col items-center">
        <div className={`text-2xl font-bold ${color}`}>{score}</div>
        <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-1">{label}</div>
      </div>
    );
  };

  const PlatformIcon = ({ platform }: { platform: string }) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram size={14} />;
      case 'youtube': return <Youtube size={14} />;
      case 'tiktok': return <Sparkles size={14} />;
      case 'linkedin': return <Linkedin size={14} />;
      case 'twitter':
      case 'x': return <Twitter size={14} />;
      case 'facebook': return <Facebook size={14} />;
      default: return <Globe size={14} />;
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 animate-in fade-in duration-200">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-5xl h-[95vh] md:h-[90vh] bg-card border border-border/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col slide-in-from-bottom-8 animate-in duration-300">
        
        {/* Header */}
        <div className="flex-shrink-0 border-b border-border/50 p-6 sm:px-8 bg-muted/10 flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0 flex gap-6">
            <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center border border-border/50 shadow-sm shrink-0 overflow-hidden">
              {brand.logo_url ? (
                <img src={brand.logo_url} alt={brand.company_name} className="w-full h-full object-cover" />
              ) : (
                <Building2 size={32} className="text-muted-foreground/50" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-bold truncate">
                  {brand.company_name}
                </h2>
                {brand.research_status === 'verified' && (
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-xs font-medium border border-blue-500/20 flex items-center gap-1">
                    <Check size={12} /> Verified
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                {brand.website && (
                  <a
                    href={brand.website.startsWith('http') ? brand.website : `https://${brand.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-foreground transition-colors text-brand"
                  >
                    <Globe size={14} />
                    {brand.domain || brand.website}
                    <ExternalLink size={12} />
                  </a>
                )}
                {brand.category && (
                  <span className="flex items-center gap-1.5">
                    <Tag size={14} /> {brand.category} {brand.subcategory ? ` / ${brand.subcategory}` : ''}
                  </span>
                )}
                {brand.country && (
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} /> {brand.city ? `${brand.city}, ` : ''}{brand.country}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onSave}
              disabled={isSaving}
              className={`
                px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2
                ${
                  isSaved
                    ? "bg-brand/10 text-brand border border-brand/20"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 border border-transparent"
                }
              `}
            >
              {isSaved ? <Check size={16} /> : <Save size={16} />}
              {isSaved ? "Saved" : "Save"}
            </button>
            
            <button
              onClick={() => setShowContact(true)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 bg-brand text-white hover:bg-brand/90 shadow-md shadow-brand/20"
            >
              <Send size={16} />
              Contact
            </button>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-muted-foreground hover:bg-muted rounded-xl transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {showContact ? (
            /* CONTACT VIEW */
            <div className="p-6 sm:p-8 animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold">Contact Information</h3>
                  <p className="text-muted-foreground text-sm mt-1">Business contact details for {brand.company_name}</p>
                </div>
                <button 
                  onClick={() => setShowContact(false)}
                  className="text-sm text-brand hover:underline"
                >
                  &larr; Back to Profile
                </button>
              </div>

              {!hasContactInfo ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center border border-border/50 rounded-2xl bg-muted/20">
                  <Mail size={32} className="text-muted-foreground/50 mb-3" />
                  <h4 className="text-base font-semibold mb-1">No Contact Information Available</h4>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    We haven't discovered any verified business contact details for this brand yet. Try refreshing research.
                  </p>
                </div>
              ) : (
                <div className="bg-card border border-border/50 rounded-2xl overflow-hidden mb-8 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/50">
                    <div className="bg-card p-6">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Primary Contact</div>
                      <div className="space-y-4">
                        {brand.contact_person && (
                          <div>
                            <div className="text-sm font-medium">{brand.contact_person}</div>
                            {brand.contact_role && <div className="text-sm text-muted-foreground">{brand.contact_role}</div>}
                          </div>
                        )}
                        
                        {brand.email && (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                              <Mail size={14} className="text-brand" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate">{brand.email}</div>
                              <div className="text-xs text-muted-foreground">Business Email</div>
                            </div>
                            <button onClick={() => copyEmail(brand.email!)} className="p-1.5 text-muted-foreground hover:bg-muted rounded-md transition-colors">
                              <span className="text-xs font-medium px-2">Copy</span>
                            </button>
                          </div>
                        )}

                        {brand.phone && (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                              <Phone size={14} className="text-brand" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium">{brand.phone}</div>
                              <div className="text-xs text-muted-foreground">Business Phone</div>
                            </div>
                          </div>
                        )}
                      </div>

                      {contactsData && contactsData.length > 0 && (
                        <div className="mt-6">
                           <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Additional Contacts</div>
                           <div className="space-y-4">
                              {contactsData.map((contact: any) => (
                                <div key={contact.id} className="pt-4 border-t border-border/50">
                                   <div className="text-sm font-medium">{contact.name || 'Unnamed Contact'}</div>
                                   {contact.role && <div className="text-sm text-muted-foreground">{contact.role} {contact.department ? `(${contact.department})` : ''}</div>}
                                   {contact.email && (
                                     <div className="flex items-center gap-2 mt-2">
                                       <Mail size={12} className="text-muted-foreground" />
                                       <div className="text-xs font-medium truncate flex-1">{contact.email}</div>
                                       <button onClick={() => copyEmail(contact.email)} className="text-[10px] bg-muted px-2 py-0.5 rounded text-muted-foreground hover:text-foreground">Copy</button>
                                     </div>
                                   )}
                                </div>
                              ))}
                           </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-card p-6">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Social & Links</div>
                      <div className="space-y-4">
                        {brand.linkedin && (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                              <Linkedin size={14} className="text-blue-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <a href={brand.linkedin.startsWith('http') ? brand.linkedin : `https://${brand.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline truncate block">
                                LinkedIn Profile
                              </a>
                            </div>
                          </div>
                        )}
                        {socialProfilesData && socialProfilesData.map((profile: any) => (
                          <div key={profile.id} className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 text-foreground">
                              <PlatformIcon platform={profile.platform} />
                            </div>
                            <div className="flex-1 min-w-0 flex justify-between items-center">
                              <a href={profile.url.startsWith('http') ? profile.url : `https://${profile.url}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline truncate block capitalize">
                                {profile.platform}
                              </a>
                              {profile.follower_count && (
                                <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                                  {new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(profile.follower_count)} followers
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end pt-4 border-t border-border/50">
                <button
                  onClick={() => markContactedMutation.mutate()}
                  disabled={markContactedMutation.isPending || isContacted}
                  className={`
                    px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2
                    ${isContacted ? "bg-green-500/10 text-green-600 border border-green-500/20" : "bg-brand text-white hover:bg-brand/90 shadow-md"}
                  `}
                >
                  {markContactedMutation.isPending ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : isContacted ? (
                    <Check size={18} />
                  ) : (
                    <Send size={18} />
                  )}
                  {isContacted ? "Contacted" : "Mark as Contacted"}
                </button>
              </div>
            </div>
          ) : (
            /* INTELLIGENCE PROFILE */
            <div className="p-6 sm:p-8 space-y-10">
              
              {/* Scores Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-muted/30 p-6 rounded-2xl border border-border/50">
                <ScoreCircle score={brand.creator_fit_score} label="Creator Fit" />
                <ScoreCircle score={brand.opportunity_score} label="Opportunity" />
                <ScoreCircle score={brand.lead_score} label="Lead Score" />
                
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="text-sm font-bold capitalize">{brand.data_confidence || 'Unverified'}</div>
                  <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-1">Data Confidence</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* LEFT COLUMN */}
                <div className="md:col-span-2 space-y-10">
                  
                  {/* About */}
                  <section>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Info size={18} className="text-muted-foreground" /> About
                    </h3>
                    {brand.company_description ? (
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {brand.company_description}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">No description available.</p>
                    )}
                  </section>

                  {/* Why This Brand */}
                  {(brand.why_now || brand.opportunity_signals) && (
                    <section>
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Sparkles size={18} className="text-brand" /> Opportunity Signals
                      </h3>
                      <div className="bg-brand/5 border border-brand/10 rounded-2xl p-5">
                        {brand.why_now && (
                          <p className="text-sm font-medium leading-relaxed mb-4">{brand.why_now}</p>
                        )}
                        {brand.opportunity_signals && (
                          <div className="flex flex-wrap gap-2">
                            {(Array.isArray(brand.opportunity_signals) ? brand.opportunity_signals : []).map((sig: string, i: number) => (
                              <span key={i} className="px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-semibold">
                                {sig}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </section>
                  )}

                  {/* Products & Audience */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <section>
                      <h3 className="text-base font-bold mb-3">Products</h3>
                      <div className="text-sm text-muted-foreground space-y-2">
                        {brand.product_description ? (
                          <p>{brand.product_description}</p>
                        ) : (
                          <p className="italic">No product overview available.</p>
                        )}
                        
                        {productsData && productsData.length > 0 && (
                          <div className="mt-4 space-y-3">
                            {productsData.map((prod: any) => (
                              <div key={prod.id} className="bg-muted/30 p-3 rounded-lg border border-border/50">
                                <div className="font-medium text-foreground">{prod.name}</div>
                                {prod.category && <div className="text-xs mt-0.5">{prod.category}</div>}
                                {prod.description && <div className="text-xs mt-1.5 opacity-80">{prod.description}</div>}
                                {prod.price && <div className="text-xs mt-1.5 font-medium">{prod.price}</div>}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </section>
                    
                    <section>
                      <h3 className="text-base font-bold mb-3">Target Audience</h3>
                      <div className="text-sm text-muted-foreground space-y-2">
                        {brand.target_audience ? (
                          <p>{brand.target_audience}</p>
                        ) : brand.target_demographic ? (
                          <p>{brand.target_demographic}</p>
                        ) : (
                          <p className="italic">Not available</p>
                        )}
                      </div>
                    </section>
                  </div>

                  {/* Marketing Intelligence */}
                  <section>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <TrendingUp size={18} className="text-muted-foreground" /> Marketing Intelligence
                    </h3>
                    <div className="space-y-4">
                      {brand.marketing_activity && (
                        <div>
                          <h4 className="text-sm font-semibold mb-1">Marketing Activity</h4>
                          <p className="text-sm text-muted-foreground">{brand.marketing_activity}</p>
                        </div>
                      )}
                      
                      {brand.existing_creator_activity && (
                        <div>
                          <h4 className="text-sm font-semibold mb-1">Creator Activity</h4>
                          <p className="text-sm text-muted-foreground">{brand.existing_creator_activity}</p>
                        </div>
                      )}
                      
                      {brand.recent_collaborations && (
                        <div>
                          <h4 className="text-sm font-semibold mb-1">Recent Collaborations</h4>
                          <p className="text-sm text-muted-foreground">{brand.recent_collaborations}</p>
                        </div>
                      )}

                      {!brand.marketing_activity && !brand.existing_creator_activity && !brand.recent_collaborations && (
                        <p className="text-sm text-muted-foreground italic">No marketing intelligence available.</p>
                      )}
                    </div>
                  </section>
                  
                  {/* Recent Activity & Funding */}
                  <section>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <History size={18} className="text-muted-foreground" /> Recent Activity & Funding
                    </h3>
                    <div className="space-y-3">
                      {brand.recent_launch && (
                        <div className="flex gap-3 items-start border border-border/50 p-4 rounded-xl">
                          <Activity size={16} className="text-brand mt-0.5 shrink-0" />
                          <div>
                            <h4 className="text-sm font-semibold">Recent Launch</h4>
                            <p className="text-sm text-muted-foreground">{brand.recent_launch}</p>
                          </div>
                        </div>
                      )}
                      {brand.recent_funding && (
                        <div className="flex gap-3 items-start border border-border/50 p-4 rounded-xl">
                          <DollarSign size={16} className="text-green-500 mt-0.5 shrink-0" />
                          <div>
                            <h4 className="text-sm font-semibold">Funding Event</h4>
                            <p className="text-sm text-muted-foreground">{brand.recent_funding}</p>
                          </div>
                        </div>
                      )}

                      {fundingData && fundingData.length > 0 && fundingData.map((funding: any) => (
                        <div key={funding.id} className="flex gap-3 items-start border border-border/50 p-4 rounded-xl">
                          <DollarSign size={16} className="text-green-500 mt-0.5 shrink-0" />
                          <div>
                            <h4 className="text-sm font-semibold capitalize">{funding.funding_stage || 'Funding Round'}</h4>
                            <div className="text-sm text-foreground font-medium">{funding.funding_amount}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                                {funding.funding_date ? new Date(funding.funding_date).toLocaleDateString() : ''} 
                                {funding.investors ? ` • Investors: ${funding.investors}` : ''}
                            </div>
                          </div>
                        </div>
                      ))}

                      {activitiesData && activitiesData.length > 0 && activitiesData.map((activity: any) => (
                        <div key={activity.id} className="flex gap-3 items-start border border-border/50 p-4 rounded-xl">
                          <Activity size={16} className="text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <h4 className="text-sm font-semibold capitalize">{activity.activity_type.replace('_', ' ')}</h4>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                            {activity.date && <div className="text-xs text-muted-foreground mt-1">{new Date(activity.date).toLocaleDateString()}</div>}
                          </div>
                        </div>
                      ))}
                      
                      {!brand.recent_launch && !brand.recent_funding && (!activitiesData || activitiesData.length === 0) && (!fundingData || fundingData.length === 0) && (
                        <p className="text-sm text-muted-foreground italic">No recent activities tracked.</p>
                      )}
                    </div>
                  </section>

                </div>
                
                {/* RIGHT COLUMN */}
                <div className="space-y-6">
                  
                  {/* Brand Information */}
                  <div className="bg-muted/20 border border-border/50 rounded-2xl p-6">
                    <h3 className="text-base font-bold mb-4">Brand Information</h3>
                    <dl className="space-y-3 text-sm">
                      <div className="flex justify-between gap-4">
                        <dt className="text-muted-foreground">Industry</dt>
                        <dd className="font-medium text-right">{brand.industry || 'N/A'}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-muted-foreground">Company Type</dt>
                        <dd className="font-medium text-right">{brand.company_type || 'N/A'}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-muted-foreground">Stage</dt>
                        <dd className="font-medium text-right">{brand.company_stage || 'N/A'}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-muted-foreground">Founded</dt>
                        <dd className="font-medium text-right">{brand.founded_year || 'N/A'}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-muted-foreground">Pricing</dt>
                        <dd className="font-medium text-right">{brand.price_positioning || brand.budget_potential || 'N/A'}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-muted-foreground">Business Model</dt>
                        <dd className="font-medium text-right">{brand.business_model || 'N/A'}</dd>
                      </div>
                    </dl>
                  </div>
                  
                  {/* Research & Verification */}
                  <div className="bg-muted/20 border border-border/50 rounded-2xl p-6">
                    <h3 className="text-base font-bold mb-4 flex items-center justify-between">
                      Research Status
                      {onRefreshResearch && (
                        <button 
                          onClick={onRefreshResearch} 
                          disabled={isRefreshing}
                          className="text-xs text-brand hover:underline font-medium"
                        >
                          {isRefreshing ? 'Refreshing...' : 'Refresh'}
                        </button>
                      )}
                    </h3>
                    <dl className="space-y-3 text-sm">
                      <div className="flex flex-col gap-1">
                        <dt className="text-muted-foreground text-xs uppercase tracking-wider">Status</dt>
                        <dd className="font-medium capitalize">{brand.research_status?.replace('_', ' ') || 'Candidate'}</dd>
                      </div>
                      <div className="flex flex-col gap-1">
                        <dt className="text-muted-foreground text-xs uppercase tracking-wider">Last Researched</dt>
                        <dd className="font-medium">{brand.last_researched_at ? new Date(brand.last_researched_at).toLocaleDateString() : 'Never'}</dd>
                      </div>
                      <div className="flex flex-col gap-1">
                        <dt className="text-muted-foreground text-xs uppercase tracking-wider">Sources</dt>
                        <dd className="font-medium">{brand.source_count || 0} sources verified</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
});
