import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SavedView } from "@/components/SavedView";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_dashboard/saved")({
  component: SavedPage,
});

function SavedPage() {
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
    <SavedView
      userId={userId}
      onStartOutreach={(brandId) =>
        navigate({ to: "/contacted", search: { brandId } })
      }
    />
  );
}
