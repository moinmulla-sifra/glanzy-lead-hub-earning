import { googleSheetsService } from "../../lib/googleSheetsService";
import { checkGcpOidcStatus } from "../../lib/gcpOidcAuth";

/**
 * Protected server-side diagnostic endpoint for Google Sheets & Vercel OIDC / GCP Workload Identity Federation.
 * Verifies authentication status, detected worksheet tab names, column headers, and row counts
 * without exposing private credentials, service account keys, or contact emails/phones.
 */
export async function handleSheetsDiagnostic(
  request: Request,
  env?: Record<string, unknown>,
): Promise<Response> {
  try {
    const url = new URL(request.url);
    const shouldForceSync =
      url.searchParams.get("sync") === "true" ||
      url.searchParams.get("force") === "true" ||
      request.method === "POST";

    // Optional admin security check:
    // If ADMIN_DIAGNOSTIC_KEY is set, require either Bearer auth or x-admin-key header
    const adminKey =
      (env?.ADMIN_DIAGNOSTIC_KEY as string) || process.env.ADMIN_DIAGNOSTIC_KEY;
    const authHeader =
      request.headers.get("authorization") ||
      request.headers.get("x-admin-key") ||
      "";

    if (adminKey && !authHeader.includes(adminKey)) {
      return new Response(
        JSON.stringify({
          error: "Unauthorized access to sheets diagnostic",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    let syncResult:
      { success: boolean; error?: string; totalBrands?: number } | undefined;

    if (shouldForceSync) {
      syncResult = await googleSheetsService.syncWithRemoteSheet(env, true);
    }

    const report = await googleSheetsService.getDiagnosticReport(env);
    const oidcStatus = checkGcpOidcStatus(env);

    return new Response(
      JSON.stringify(
        {
          status: report.auth.authenticated
            ? "connected"
            : oidcStatus.configured
              ? "auth_failed"
              : "not_configured",
          liveSheetAuthoritative:
            report.dataSource === "live_google_sheets_oidc",
          diagnostic: report,
          lastSyncResult: syncResult || null,
        },
        null,
        2,
      ),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      },
    );
  } catch (error: unknown) {
    const message = (error as Error)?.message || String(error);
    console.error("Sheets diagnostic endpoint error:", message);
    return new Response(
      JSON.stringify({
        error: "Failed to generate sheets diagnostic",
        details: message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
