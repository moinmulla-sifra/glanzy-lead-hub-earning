import { createFileRoute } from "@tanstack/react-router";
import { TeamView } from "@/components/TeamView";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_dashboard/team")({
  component: TeamPage,
});

function TeamPage() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setUserId(data.session.user.id);
      }
    });
  }, []);

  return <TeamView userId={userId} />;
}
