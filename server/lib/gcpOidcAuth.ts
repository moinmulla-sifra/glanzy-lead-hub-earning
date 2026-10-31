import { ExternalAccountClient } from "google-auth-library";
import { getVercelOidcToken } from "@vercel/oidc";

export interface GcpOidcConfig {
  projectId?: string;
  projectNumber?: string;
  serviceAccountEmail?: string;
  workloadIdentityPoolId?: string;
  workloadIdentityPoolProviderId?: string;
  spreadsheetId?: string;
}

export interface GcpOidcStatus {
  configured: boolean;
  oidcAvailable: boolean;
  missingFields: string[];
  maskedConfig: {
    projectId?: string;
    projectNumber?: string;
    serviceAccountEmail?: string;
    workloadIdentityPoolId?: string;
    workloadIdentityPoolProviderId?: string;
    spreadsheetId?: string;
  };
}

export interface TokenResult {
  accessToken: string;
  expiresAtMs: number;
  source: "vercel_oidc_wif";
}

let cachedClient: ExternalAccountClient | null = null;
let cachedToken: TokenResult | null = null;
let lastConfigHash = "";

export function getGcpOidcConfig(env?: Record<string, unknown>): GcpOidcConfig {
  const getVal = (key: string): string => {
    const fromEnv = env?.[key];
    if (typeof fromEnv === "string" && fromEnv.trim()) return fromEnv.trim();
    const fromProcess = process.env[key];
    if (typeof fromProcess === "string" && fromProcess.trim())
      return fromProcess.trim();
    return "";
  };

  return {
    projectId: getVal("GCP_PROJECT_ID"),
    projectNumber: getVal("GCP_PROJECT_NUMBER"),
    serviceAccountEmail: getVal("GCP_SERVICE_ACCOUNT_EMAIL"),
    workloadIdentityPoolId: getVal("GCP_WORKLOAD_IDENTITY_POOL_ID"),
    workloadIdentityPoolProviderId: getVal(
      "GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID",
    ),
    spreadsheetId: getVal("GOOGLE_SHEETS_SPREADSHEET_ID"),
  };
}

function maskString(val?: string, visibleChars = 4): string {
  if (!val) return "";
  if (val.length <= visibleChars) return "***";
  return `${val.substring(0, visibleChars)}...${val.substring(val.length - Math.min(3, val.length - visibleChars))}`;
}

export function isVercelOidcAvailable(env?: Record<string, unknown>): boolean {
  return Boolean(
    env?.VERCEL_OIDC_TOKEN ||
    env?.["x-vercel-oidc-token"] ||
    process.env.VERCEL_OIDC_TOKEN ||
    process.env.VERCEL ||
    process.env.VERCEL_ENV,
  );
}

export function checkGcpOidcStatus(
  env?: Record<string, unknown>,
): GcpOidcStatus {
  const cfg = getGcpOidcConfig(env);
  const missing: string[] = [];

  if (!cfg.projectNumber) missing.push("GCP_PROJECT_NUMBER");
  if (!cfg.serviceAccountEmail) missing.push("GCP_SERVICE_ACCOUNT_EMAIL");
  if (!cfg.workloadIdentityPoolId)
    missing.push("GCP_WORKLOAD_IDENTITY_POOL_ID");
  if (!cfg.workloadIdentityPoolProviderId)
    missing.push("GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID");
  if (!cfg.spreadsheetId) missing.push("GOOGLE_SHEETS_SPREADSHEET_ID");

  return {
    configured: missing.length === 0,
    oidcAvailable: isVercelOidcAvailable(env),
    missingFields: missing,
    maskedConfig: {
      projectId: cfg.projectId ? maskString(cfg.projectId, 6) : undefined,
      projectNumber: cfg.projectNumber
        ? maskString(cfg.projectNumber, 3)
        : undefined,
      serviceAccountEmail: cfg.serviceAccountEmail
        ? maskString(cfg.serviceAccountEmail, 5)
        : undefined,
      workloadIdentityPoolId: cfg.workloadIdentityPoolId || undefined,
      workloadIdentityPoolProviderId:
        cfg.workloadIdentityPoolProviderId || undefined,
      spreadsheetId: cfg.spreadsheetId
        ? maskString(cfg.spreadsheetId, 6)
        : undefined,
    },
  };
}

/**
 * Creates or retrieves a memoized ExternalAccountClient configured for
 * Vercel OIDC -> GCP Workload Identity Pool -> Service Account impersonation.
 * No service-account private key is ever required or stored.
 */
export function getGcpExternalAccountClient(
  env?: Record<string, unknown>,
): ExternalAccountClient | null {
  const cfg = getGcpOidcConfig(env);

  if (
    !cfg.projectNumber ||
    !cfg.serviceAccountEmail ||
    !cfg.workloadIdentityPoolId ||
    !cfg.workloadIdentityPoolProviderId
  ) {
    return null;
  }

  const configHash = `${cfg.projectNumber}:${cfg.workloadIdentityPoolId}:${cfg.workloadIdentityPoolProviderId}:${cfg.serviceAccountEmail}`;
  if (cachedClient && lastConfigHash === configHash) {
    return cachedClient;
  }

  const audience = `//iam.googleapis.com/projects/${cfg.projectNumber}/locations/global/workloadIdentityPools/${cfg.workloadIdentityPoolId}/providers/${cfg.workloadIdentityPoolProviderId}`;
  const tokenUrl = "https://sts.googleapis.com/v1/token";
  const impersonationUrl = `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${cfg.serviceAccountEmail}:generateAccessToken`;

  const client = ExternalAccountClient.fromJSON({
    type: "external_account",
    audience,
    subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
    token_url: tokenUrl,
    service_account_impersonation_url: impersonationUrl,
    subject_token_supplier: {
      getSubjectToken: async () => {
        const directToken =
          (env?.VERCEL_OIDC_TOKEN as string) ||
          (env?.["x-vercel-oidc-token"] as string) ||
          process.env.VERCEL_OIDC_TOKEN;

        if (directToken && directToken.trim()) {
          return directToken.trim();
        }

        try {
          const vercelToken = await getVercelOidcToken();
          if (!vercelToken) {
            throw new Error(
              "Vercel OIDC token returned empty. Ensure Vercel project OIDC is enabled in Project Settings > Integrations.",
            );
          }
          return vercelToken;
        } catch (err: unknown) {
          const msg = (err as Error)?.message || String(err);
          if (
            msg.includes("missing from the request") ||
            msg.includes("x-vercel-oidc-token")
          ) {
            throw new Error(
              "The 'x-vercel-oidc-token' header is missing from the request. Live Google Sheet federation requires running on Vercel with OIDC enabled in Project Settings.",
            );
          }
          throw new Error(
            `Failed to obtain Vercel OIDC token for GCP federation: ${msg}`,
          );
        }
      },
    },
  }) as ExternalAccountClient;

  client.scopes = [
    "https://www.googleapis.com/auth/spreadsheets.readonly",
    "https://www.googleapis.com/auth/spreadsheets",
  ];

  cachedClient = client;
  lastConfigHash = configHash;
  cachedToken = null; // Invalidate cached access token on config change

  return cachedClient;
}

/**
 * Obtains a fresh or cached short-lived GCP access token using Vercel OIDC federation.
 * Handles automatic refresh before token expiration.
 */
export async function getGcpOidcAccessToken(
  env?: Record<string, unknown>,
): Promise<TokenResult> {
  const status = checkGcpOidcStatus(env);
  if (!status.configured) {
    throw new Error(
      `GCP Workload Identity Federation is not fully configured. Missing: ${status.missingFields.join(", ")}`,
    );
  }

  const now = Date.now();
  // If we have a cached token valid for at least another 2 minutes, return it
  if (cachedToken && cachedToken.expiresAtMs - now > 120_000) {
    return cachedToken;
  }

  const client = getGcpExternalAccountClient(env);
  if (!client) {
    throw new Error("Unable to initialize GCP ExternalAccountClient.");
  }

  try {
    const tokenResponse = await client.getAccessToken();
    if (!tokenResponse || !tokenResponse.token) {
      throw new Error(
        "GCP STS / service account impersonation did not return an access token.",
      );
    }

    const expiresInMs = (tokenResponse.res?.data as { expires_in?: number })
      ?.expires_in
      ? (tokenResponse.res?.data as { expires_in?: number }).expires_in! * 1000
      : 3600_000;

    cachedToken = {
      accessToken: tokenResponse.token,
      expiresAtMs: now + expiresInMs,
      source: "vercel_oidc_wif",
    };

    return cachedToken;
  } catch (error: unknown) {
    const message = (error as Error)?.message || String(error);
    cachedToken = null;
    throw new Error(
      `Google Cloud Workload Identity Federation authentication failed: ${message}`,
    );
  }
}
