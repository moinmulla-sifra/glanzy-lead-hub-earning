import { createAPIFileRoute } from '@tanstack/react-start/api';

export const APIRoute = createAPIFileRoute('/api/cron')({
  GET: async () => {
    return new Response(JSON.stringify({ status: "Cron not fully connected to backend yet" }), {
      headers: { "Content-Type": "application/json" }
    });
  }
});
