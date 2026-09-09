import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DiscoverView } from "@/components/DiscoverView";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_dashboard/discover")({
  component: DiscoverPage,
});

function DiscoverPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setUserId(data.session.user.id);
      }
    });
  }, []);

  return (
    <DiscoverView
      userId={userId}
      onStartOutreach={(brandId) =>
        navigate({ to: "/contacted", search: { brandId } })
      }
    />
  );
}
