import { createFileRoute } from "@tanstack/react-router";
import { OutreachView } from "@/components/OutreachView";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

type OutreachSearch = {
  brandId?: string;
};

export const Route = createFileRoute("/_dashboard/outreach")({
  validateSearch: (search: Record<string, unknown>): OutreachSearch => {
    return {
      ...(search['brandId'] ? { brandId: search['brandId'] as string } : {}),
    };
  },
  component: OutreachPage,
});

function OutreachPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const { brandId } = Route.useSearch();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setUserId(data.session.user.id);
      }
    });
  }, []);

  return <OutreachView userId={userId} defaultSelectedId={brandId || null} />;
}
