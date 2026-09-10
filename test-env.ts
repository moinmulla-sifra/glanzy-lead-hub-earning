import { createServerFn } from "@tanstack/react-start";
export const testEnv = createServerFn({ method: "GET" }).handler(() => {
  return {
    processEnv: process.env["VITE_SUPABASE_URL"] || null,
    importMeta: import.meta.env.VITE_SUPABASE_URL || null,
  };
});
