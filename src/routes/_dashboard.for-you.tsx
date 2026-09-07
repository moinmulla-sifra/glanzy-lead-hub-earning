import { createFileRoute } from "@tanstack/react-router";
import { ForYouView } from "@/components/ForYouView";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_dashboard/for-you")({
  component: ForYouPage,
});

function ForYouPage() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setUserId(data.session.user.id);
      }
    });
  }, []);

  return <ForYouView userId={userId} />;
}
