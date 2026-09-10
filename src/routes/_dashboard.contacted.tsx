import { createFileRoute } from "@tanstack/react-router";
import { ContactedView } from "@/components/ContactedView";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

type ContactedSearch = {
  brandId?: string;
};

export const Route = createFileRoute("/_dashboard/contacted")({
  validateSearch: (search: Record<string, unknown>): ContactedSearch => {
    return {
      ...(search["brandId"] ? { brandId: search["brandId"] as string } : {}),
    };
  },
  component: ContactedPage,
});

function ContactedPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const { brandId } = Route.useSearch();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setUserId(data.session.user.id);
      }
    });
  }, []);

  return <ContactedView userId={userId} defaultSelectedId={brandId || null} />;
}
