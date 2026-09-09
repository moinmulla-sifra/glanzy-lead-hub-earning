const fs = require('fs');

let code = fs.readFileSync('src/components/BrandProfileModal.tsx', 'utf8');

const queries = `
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
`;

code = code.replace(/const \{ data: contactedData, refetch: refetchContacted \} = useQuery\(\{/, queries + '\n  const { data: contactedData, refetch: refetchContacted } = useQuery({');

fs.writeFileSync('src/components/BrandProfileModal.tsx', code);
