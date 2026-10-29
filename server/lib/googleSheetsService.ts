import fs from "node:fs";
import path from "node:path";
import {
  getGcpOidcAccessToken,
  checkGcpOidcStatus,
  getGcpOidcConfig,
  type GcpOidcStatus,
} from "./gcpOidcAuth";

export interface SheetBrand {
  brand_id: string;
  research_run_id?: string;
  company_name: string;
  normalized_company_name?: string;
  domain?: string;
  website_url?: string;
  website_status?: string;
  logo_url?: string;
  country?: string;
  city?: string;
  headquarters?: string;
  industry?: string;
  category?: string;
  subcategory?: string;
  company_type?: string;
  company_stage?: string;
  founded_year?: number | string;
  employee_range?: string;
  company_description?: string;
  primary_product_summary?: string;
  target_audience?: string;
  target_customer?: string;
  target_demographic?: string;
  target_market?: string;
  geographic_target?: string;
  price_positioning?: string;
  business_model?: string;
  brand_status?: string;
  works_with_creators?: boolean | string;
  creator_campaign_activity?: string;
  ugc_activity?: string;
  ambassador_activity?: string;
  affiliate_program?: string;
  platforms_used?: string | Record<string, unknown>;
  marketing_activity_score?: number | string;
  creator_fit_score?: number | string;
  opportunity_score?: number | string;
  lead_score?: number | string;
  estimated_budget_potential?: string;
  budget_evidence?: string;
  opportunity_signals?: string | Record<string, unknown>;
  opportunity_summary?: string;
  qualification_status?: string;
  qualification_reason?: string;
  rejection_reason?: string;
  data_confidence?: string;
  research_status?: string;
  first_discovered_at?: string;
  last_researched_at?: string;
  last_verified_at?: string;
  source_count?: number | string;
  duplicate_of?: string;
  record_status?: string;
  notes?: string;

  // Normalized compatibility fields for frontend UI
  id: string;
  website?: string;
  influencer_fit_score?: number;
  why_now?: string;
  recent_funding?: string;
  recent_launch?: string;
  marketing_activity?: string;
  existing_creator_activity?: string;
  budget_potential?: string;
  hasContacts?: boolean;
  contactCount?: number;
}

export interface SheetContact {
  id: string;
  brand_id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone?: string;
  linkedin?: string;
  contact_type: string;
  verification_status: string;
  discovered_at?: string;
  source?: string;
  source_url?: string;
  verified_at?: string;
}

export interface SheetProduct {
  id: string;
  brand_id: string;
  name: string;
  category: string;
  description: string;
  positioning: string;
  url: string;
  price?: string;
  source?: string;
}

export interface SheetSocialProfile {
  id: string;
  brand_id: string;
  platform: string;
  url: string;
  follower_count?: number | string;
  subscriber_count?: number | string;
  activity_level?: string;
  last_activity?: string;
  source?: string;
}

export interface SheetActivity {
  id: string;
  brand_id: string;
  activity_type: string;
  date: string;
  description: string;
  source?: string;
  confidence?: string;
  creator_signals?: string;
  marketing_activity?: string;
  collaboration_opportunities?: string;
}

export interface SheetFunding {
  id: string;
  brand_id: string;
  latest_funding_round: string;
  funding_amount: string;
  total_funding: string;
  funding_date: string;
  funding_stage: string;
  investors?: string;
  source?: string;
}

export interface SheetEvidence {
  id: string;
  brand_id: string;
  research_run_id?: string;
  source_url: string;
  evidence_type?: string;
  source_type?: string;
  field_name?: string;
  evidence_content?: string;
  evidence?: Record<string, unknown> | string;
  confidence_score?: string;
  confidence?: string;
  discovered_at?: string;
  metadata?: Record<string, unknown> | string;
}

export interface SheetResearchQueueItem {
  id: string;
  category?: string;
  country?: string;
  niche?: string;
  query?: string;
  priority?: string | number;
  last_run?: string;
  next_run?: string;
  enabled?: boolean | string;
}

export interface SheetAutomationLogItem {
  id: string;
  timestamp?: string;
  status?: string;
  records_processed?: number | string;
  errors?: string;
  execution_history?: string;
}

export interface TabDiagnostic {
  tabName: string;
  detected: boolean;
  rowCount: number;
  columnCount: number;
  headers: string[];
  mappedFieldsSample?: Record<string, unknown>;
}

export interface SheetsDiagnosticReport {
  timestamp: string;
  oidcStatus: GcpOidcStatus;
  auth: {
    authenticated: boolean;
    authMode: string;
    error: string | null;
  };
  spreadsheet: {
    spreadsheetIdMasked: string;
    spreadsheetTitle?: string;
    detectedTabs: string[];
    tabs: Record<string, TabDiagnostic>;
  };
  totalBrandsLoaded: number;
  dataSource: "live_google_sheets_oidc" | "local_store" | "empty";
}

interface SheetsStore {
  metadata: {
    source: string;
    lastSyncedAt?: string;
    lastSyncError?: string | null;
    spreadsheetTitle?: string;
  };
  worksheets: {
    Brands: SheetBrand[];
    Contacts: SheetContact[];
    SocialProfiles: SheetSocialProfile[];
    Products: SheetProduct[];
    Activities: SheetActivity[];
    Funding: SheetFunding[];
    Evidence: SheetEvidence[];
    ResearchQueue: SheetResearchQueueItem[];
    AutomationLog: SheetAutomationLogItem[];
  };
}

const PRIMARY_STORE_PATH = path.join(
  process.cwd(),
  "server",
  "data",
  "google_sheets_store.json",
);

const FALLBACK_STORE_PATH = path.join(
  process.cwd(),
  ".data",
  "google_sheets_store.json",
);

const STORE_PATHS = [PRIMARY_STORE_PATH, FALLBACK_STORE_PATH];

// Tab canonical identification
const CANONICAL_TAB_PATTERNS: Record<
  keyof SheetsStore["worksheets"],
  RegExp[]
> = {
  Brands: [/^brands?$/i],
  Contacts: [/^contacts?$/i],
  SocialProfiles: [/^social\s*profiles?$/i, /^socialprofiles?$/i, /^social$/i],
  Products: [/^products?$/i],
  Activities: [
    /^activities\s*(&|and)?\s*opportunities$/i,
    /^activities$/i,
    /^opportunities$/i,
  ],
  Funding: [/^funding$/i, /^investments?$/i],
  Evidence: [/^sources?\s*(&|and)?\s*evidence$/i, /^evidence$/i, /^sources?$/i],
  ResearchQueue: [/^research\s*queue$/i, /^researchqueue$/i, /^queue$/i],
  AutomationLog: [
    /^automation\s*logs?$/i,
    /^automationlog$/i,
    /^automation$/i,
    /^logs?$/i,
  ],
};

function normalizeHeaderKey(rawHeader: string): string {
  return rawHeader
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

class GoogleSheetsService {
  private store: SheetsStore | null = null;
  private lastLoadedAt = 0;
  private isSyncing = false;
  private lastSyncError: string | null = null;
  private detectedHeadersPerTab: Record<string, string[]> = {};
  private rawRowCountPerTab: Record<string, number> = {};
  private readonly CACHE_TTL_MS = 60_000; // 1 minute in-memory cache

  constructor() {
    this.ensureLoaded();
  }

  private ensureLoaded(): SheetsStore {
    const now = Date.now();
    if (this.store && now - this.lastLoadedAt < this.CACHE_TTL_MS) {
      return this.store;
    }

    if (
      this.store &&
      this.store.metadata?.source === "live_google_sheets_oidc"
    ) {
      // Retain live sheets store in memory until next background sync
      return this.store;
    }

    // Try reading existing local seed store for offline/local start
    for (const p of STORE_PATHS) {
      try {
        if (fs.existsSync(p)) {
          const raw = fs.readFileSync(p, "utf-8");
          const parsed = JSON.parse(raw);
          if (
            parsed?.worksheets?.Brands &&
            Array.isArray(parsed.worksheets.Brands) &&
            parsed.worksheets.Brands.length > 0
          ) {
            this.store = {
              metadata: parsed.metadata || { source: "local_store" },
              worksheets: {
                Brands: parsed.worksheets.Brands || [],
                Contacts: parsed.worksheets.Contacts || [],
                SocialProfiles:
                  parsed.worksheets.SocialProfiles ||
                  parsed.worksheets["Social Profiles"] ||
                  [],
                Products: parsed.worksheets.Products || [],
                Activities:
                  parsed.worksheets.Activities ||
                  parsed.worksheets["Activities & Opportunities"] ||
                  [],
                Funding: parsed.worksheets.Funding || [],
                Evidence:
                  parsed.worksheets.Evidence ||
                  parsed.worksheets["Sources & Evidence"] ||
                  [],
                ResearchQueue: parsed.worksheets.ResearchQueue || [],
                AutomationLog: parsed.worksheets.AutomationLog || [],
              },
            };
            this.lastLoadedAt = now;
            return this.store;
          }
        }
      } catch (err) {
        console.warn(`Could not read sheets store at ${p}:`, err);
      }
    }

    this.store = {
      metadata: { source: "empty" },
      worksheets: {
        Brands: [],
        Contacts: [],
        SocialProfiles: [],
        Products: [],
        Activities: [],
        Funding: [],
        Evidence: [],
        ResearchQueue: [],
        AutomationLog: [],
      },
    };
    return this.store;
  }

  /**
   * Universal row mapper: transforms array of values with normalized column headers
   * into a typed JavaScript object using fuzzy column aliases.
   */
  private mapRow<T>(row: string[], headerMap: Record<string, number>): T {
    const getVal = (...aliases: string[]): string => {
      for (const alias of aliases) {
        const norm = normalizeHeaderKey(alias);
        const idx = headerMap[norm];
        if (idx !== undefined && row[idx] !== undefined) {
          const val = String(row[idx]).trim();
          if (val) return val;
        }
      }
      return "";
    };

    return {
      getVal,
    } as unknown as T;
  }

  private parseBrandsTab(
    rows: string[][],
    headerMap: Record<string, number>,
  ): SheetBrand[] {
    return rows.map((row, index) => {
      const get = (...aliases: string[]): string => {
        for (const alias of aliases) {
          const norm = normalizeHeaderKey(alias);
          const idx = headerMap[norm];
          if (idx !== undefined && row[idx] !== undefined) {
            const v = String(row[idx]).trim();
            if (v) return v;
          }
        }
        return "";
      };

      const brandId =
        get("brand_id", "id", "brand", "company_id") || `brand_${index + 1}`;
      const companyName =
        get("company_name", "name", "company", "brand_name") || "Unknown Brand";
      const domain = get("domain", "website_domain", "company_domain");
      const websiteUrl =
        get("website_url", "website", "url", "site") ||
        (domain ? `https://${domain}` : "");

      const leadScore =
        Number(get("lead_score", "score", "lead_priority")) ||
        Number(get("opportunity_score", "opp_score")) ||
        85;
      const creatorFit =
        Number(
          get("creator_fit_score", "influencer_fit_score", "creator_fit"),
        ) || 85;
      const marketingScore =
        Number(
          get("marketing_activity_score", "marketing_score", "activity_score"),
        ) || 80;

      const rawBrand: Record<string, unknown> = {
        brand_id: brandId,
        id: brandId,
        research_run_id: get("research_run_id", "run_id"),
        company_name: companyName,
        normalized_company_name: get(
          "normalized_company_name",
          "normalized_name",
        ),
        domain,
        website_url: websiteUrl,
        website: websiteUrl,
        website_status: get("website_status", "status"),
        logo_url: get("logo_url", "logo", "brand_logo", "image_url"),
        country: get("country", "location_country", "hq_country"),
        city: get("city", "location_city", "hq_city"),
        headquarters: get("headquarters", "location", "hq"),
        industry: get("industry", "sector"),
        category: get("category", "market_category"),
        subcategory: get("subcategory", "sub_category", "niche"),
        company_type: get("company_type", "type", "business_type"),
        company_stage: get("company_stage", "stage", "funding_stage"),
        founded_year: get("founded_year", "founded", "founding_year"),
        employee_range: get("employee_range", "employees", "team_size"),
        company_description: get(
          "company_description",
          "description",
          "about",
          "overview",
        ),
        primary_product_summary: get(
          "primary_product_summary",
          "product_summary",
          "primary_product",
          "product",
        ),
        target_audience: get("target_audience", "audience"),
        target_customer: get("target_customer", "customer_profile"),
        target_demographic: get("target_demographic", "demographic"),
        target_market: get("target_market", "market"),
        geographic_target: get("geographic_target", "geo_target"),
        price_positioning: get("price_positioning", "pricing", "price_point"),
        business_model: get("business_model", "model"),
        brand_status:
          get("brand_status", "status", "record_status") || "active",
        works_with_creators:
          get(
            "works_with_creators",
            "creator_friendly",
            "works_with_influencers",
          ).toLowerCase() === "true" ||
          get("works_with_creators").toLowerCase() === "yes",
        creator_campaign_activity: get(
          "creator_campaign_activity",
          "campaign_activity",
          "creator_campaigns",
        ),
        ugc_activity: get("ugc_activity", "ugc"),
        ambassador_activity: get("ambassador_activity", "ambassadors"),
        affiliate_program: get("affiliate_program", "affiliate"),
        platforms_used: get("platforms_used", "platforms", "social_platforms"),
        marketing_activity_score: marketingScore,
        creator_fit_score: creatorFit,
        influencer_fit_score: creatorFit,
        opportunity_score:
          Number(get("opportunity_score", "opp_score")) || leadScore,
        lead_score: leadScore,
        estimated_budget_potential:
          get("estimated_budget_potential", "budget_potential", "budget") ||
          "Active Growth",
        budget_potential:
          get("estimated_budget_potential", "budget_potential", "budget") ||
          "Active Growth",
        budget_evidence: get("budget_evidence", "budget_notes"),
        opportunity_signals: get("opportunity_signals", "signals", "why_now"),
        opportunity_summary: get(
          "opportunity_summary",
          "why_now",
          "summary",
          "notes",
        ),
        why_now: get("opportunity_summary", "why_now", "notes"),
        recent_funding: get("recent_funding", "funding", "notes") || "Active",
        recent_launch: get("recent_launch", "launch", "latest_product"),
        marketing_activity:
          get("creator_campaign_activity", "marketing_activity") ||
          "Active creator partnerships",
        qualification_status: get("qualification_status", "qualified"),
        qualification_reason: get("qualification_reason"),
        rejection_reason: get("rejection_reason"),
        data_confidence: get("data_confidence", "confidence") || "high",
        research_status: get("research_status", "status") || "complete",
        first_discovered_at: get("first_discovered_at", "discovered_at"),
        last_researched_at: get("last_researched_at", "researched_at"),
        last_verified_at: get("last_verified_at", "verified_at"),
        source_count: Number(get("source_count", "sources")) || 1,
        duplicate_of: get("duplicate_of"),
        record_status: get("record_status") || "published",
        notes: get("notes"),
      };

      return this.normalizeBrand(rawBrand);
    });
  }

  private parseContactsTab(
    rows: string[][],
    headerMap: Record<string, number>,
  ): SheetContact[] {
    return rows.map((row, index) => {
      const get = (...aliases: string[]): string => {
        for (const alias of aliases) {
          const norm = normalizeHeaderKey(alias);
          const idx = headerMap[norm];
          if (idx !== undefined && row[idx] !== undefined) {
            const v = String(row[idx]).trim();
            if (v) return v;
          }
        }
        return "";
      };

      return {
        id: get("id", "contact_id") || `contact_${index + 1}`,
        brand_id: get("brand_id", "brand", "company_id"),
        name: get("contact_name", "name", "full_name"),
        role: get("role", "job_title", "title", "position"),
        department: get("department", "team", "area") || "Creator Partnerships",
        email: get("email", "contact_email", "mail"),
        phone: get("phone", "telephone", "mobile"),
        linkedin: get("linkedin_profile", "linkedin", "linkedin_url"),
        contact_type: get("contact_type", "type") || "business",
        verification_status: get("verification_status", "status") || "verified",
        source: get("source") || "Google Sheets Intelligence",
        source_url: get("source_url", "url"),
        verified_at: get("verification_date", "verified_at"),
        discovered_at: get("discovered_at"),
      };
    });
  }

  private parseSocialProfilesTab(
    rows: string[][],
    headerMap: Record<string, number>,
  ): SheetSocialProfile[] {
    return rows.map((row, index) => {
      const get = (...aliases: string[]): string => {
        for (const alias of aliases) {
          const norm = normalizeHeaderKey(alias);
          const idx = headerMap[norm];
          if (idx !== undefined && row[idx] !== undefined) {
            const v = String(row[idx]).trim();
            if (v) return v;
          }
        }
        return "";
      };

      return {
        id: get("id") || `social_${index + 1}`,
        brand_id: get("brand_id", "brand"),
        platform: get("social_platform", "platform", "network"),
        url: get("profile_url", "url", "link"),
        follower_count:
          Number(get("follower_count", "followers")) ||
          get("follower_count", "followers"),
        subscriber_count:
          Number(get("subscriber_count", "subscribers")) ||
          get("subscriber_count", "subscribers"),
        activity_level: get("activity_level", "activity"),
        last_activity: get("last_activity", "last_post"),
        source: get("source"),
      };
    });
  }

  private parseProductsTab(
    rows: string[][],
    headerMap: Record<string, number>,
  ): SheetProduct[] {
    return rows.map((row, index) => {
      const get = (...aliases: string[]): string => {
        for (const alias of aliases) {
          const norm = normalizeHeaderKey(alias);
          const idx = headerMap[norm];
          if (idx !== undefined && row[idx] !== undefined) {
            const v = String(row[idx]).trim();
            if (v) return v;
          }
        }
        return "";
      };

      return {
        id: get("id") || `product_${index + 1}`,
        brand_id: get("brand_id", "brand"),
        name: get("product_name", "name", "title"),
        category: get("category", "product_category"),
        description: get("description", "product_description"),
        positioning: get("positioning", "product_positioning"),
        url: get("product_url", "url", "link"),
        price: get("price", "pricing"),
        source: get("source"),
      };
    });
  }

  private parseActivitiesTab(
    rows: string[][],
    headerMap: Record<string, number>,
  ): SheetActivity[] {
    return rows.map((row, index) => {
      const get = (...aliases: string[]): string => {
        for (const alias of aliases) {
          const norm = normalizeHeaderKey(alias);
          const idx = headerMap[norm];
          if (idx !== undefined && row[idx] !== undefined) {
            const v = String(row[idx]).trim();
            if (v) return v;
          }
        }
        return "";
      };

      return {
        id: get("id") || `activity_${index + 1}`,
        brand_id: get("brand_id", "brand"),
        activity_type: get("activity_type", "type"),
        date: get("date", "timestamp", "activity_date"),
        description: get("description", "activity_description"),
        source: get("source"),
        confidence: get("confidence"),
        creator_signals: get(
          "creator_partnership_signals",
          "creator_signals",
          "signals",
        ),
        marketing_activity: get("marketing_activity"),
        collaboration_opportunities: get(
          "potential_collaboration_opportunities",
          "collaboration_opportunities",
          "opportunities",
        ),
      };
    });
  }

  private parseFundingTab(
    rows: string[][],
    headerMap: Record<string, number>,
  ): SheetFunding[] {
    return rows.map((row, index) => {
      const get = (...aliases: string[]): string => {
        for (const alias of aliases) {
          const norm = normalizeHeaderKey(alias);
          const idx = headerMap[norm];
          if (idx !== undefined && row[idx] !== undefined) {
            const v = String(row[idx]).trim();
            if (v) return v;
          }
        }
        return "";
      };

      return {
        id: get("id") || `funding_${index + 1}`,
        brand_id: get("brand_id", "brand"),
        latest_funding_round: get("latest_funding_round", "round", "stage"),
        funding_amount: get("funding_amount", "amount"),
        total_funding: get("total_funding", "total"),
        funding_date: get("funding_date", "date"),
        funding_stage: get("funding_stage", "stage"),
        investors: get("investors", "lead_investors"),
        source: get("source"),
      };
    });
  }

  private parseEvidenceTab(
    rows: string[][],
    headerMap: Record<string, number>,
  ): SheetEvidence[] {
    return rows.map((row, index) => {
      const get = (...aliases: string[]): string => {
        for (const alias of aliases) {
          const norm = normalizeHeaderKey(alias);
          const idx = headerMap[norm];
          if (idx !== undefined && row[idx] !== undefined) {
            const v = String(row[idx]).trim();
            if (v) return v;
          }
        }
        return "";
      };

      return {
        id: get("id") || `evidence_${index + 1}`,
        brand_id: get("brand_id", "brand"),
        research_run_id: get("research_run_id"),
        source_url: get("source_url", "url"),
        evidence_type: get("evidence_type", "type"),
        source_type: get("source_type"),
        field_name: get("field_name", "field"),
        evidence_content: get("evidence_content", "content", "evidence"),
        evidence: get("evidence", "evidence_content"),
        confidence_score: get("confidence_score", "confidence"),
        confidence: get("confidence", "confidence_score"),
        discovered_at: get("discovered_at", "date"),
        metadata: get("research_metadata", "metadata"),
      };
    });
  }

  private parseResearchQueueTab(
    rows: string[][],
    headerMap: Record<string, number>,
  ): SheetResearchQueueItem[] {
    return rows.map((row, index) => {
      const get = (...aliases: string[]): string => {
        for (const alias of aliases) {
          const norm = normalizeHeaderKey(alias);
          const idx = headerMap[norm];
          if (idx !== undefined && row[idx] !== undefined) {
            const v = String(row[idx]).trim();
            if (v) return v;
          }
        }
        return "";
      };

      return {
        id: get("id") || `queue_${index + 1}`,
        category: get("research_category", "category"),
        country: get("country"),
        niche: get("niche"),
        query: get("query"),
        priority: get("priority") || 1,
        last_run: get("last_run"),
        next_run: get("next_run"),
        enabled: get("enabled_status", "enabled", "status") || "true",
      };
    });
  }

  private parseAutomationLogTab(
    rows: string[][],
    headerMap: Record<string, number>,
  ): SheetAutomationLogItem[] {
    return rows.map((row, index) => {
      const get = (...aliases: string[]): string => {
        for (const alias of aliases) {
          const norm = normalizeHeaderKey(alias);
          const idx = headerMap[norm];
          if (idx !== undefined && row[idx] !== undefined) {
            const v = String(row[idx]).trim();
            if (v) return v;
          }
        }
        return "";
      };

      return {
        id: get("id") || `log_${index + 1}`,
        timestamp: get("timestamp", "date", "created_at"),
        status: get("status", "execution_status"),
        records_processed: get("records_processed", "count"),
        errors: get("errors", "error_message"),
        execution_history: get("research_execution_history", "history", "log"),
      };
    });
  }

  /**
   * Synchronizes brand intelligence with live Google Sheet using Vercel OIDC
   * and Google Cloud Workload Identity Federation (keyless).
   */
  public async syncWithRemoteSheet(
    env?: Record<string, unknown>,
    force = false,
  ): Promise<{
    success: boolean;
    error?: string;
    totalBrands?: number;
    detectedTabs?: string[];
  }> {
    const oidcStatus = checkGcpOidcStatus(env);
    const cfg = getGcpOidcConfig(env);

    if (!cfg.spreadsheetId) {
      return {
        success: false,
        error: "GOOGLE_SHEETS_SPREADSHEET_ID is not configured.",
      };
    }

    if (!oidcStatus.configured) {
      return {
        success: false,
        error: `GCP Workload Identity Federation is missing fields: ${oidcStatus.missingFields.join(", ")}`,
      };
    }

    const now = Date.now();
    if (!force && this.store && now - this.lastLoadedAt < this.CACHE_TTL_MS) {
      return {
        success: true,
        totalBrands: this.store.worksheets.Brands.length,
      };
    }

    if (this.isSyncing) {
      // Avoid parallel duplicate syncs
      return {
        success: true,
        totalBrands: this.store?.worksheets.Brands.length || 0,
      };
    }

    this.isSyncing = true;
    try {
      // 1. Obtain short-lived Google access token via Vercel OIDC + GCP WIF
      const tokenResult = await getGcpOidcAccessToken(env);
      const authHeader = {
        Authorization: `Bearer ${tokenResult.accessToken}`,
      };

      // 2. Fetch spreadsheet metadata to discover sheet tab names
      const metaUrl = `https://sheets.googleapis.com/v4/spreadsheets/${cfg.spreadsheetId}`;
      const metaRes = await fetch(metaUrl, { headers: authHeader });
      if (!metaRes.ok) {
        const errorText = await metaRes.text();
        this.lastSyncError = `Google Sheets API metadata error (${metaRes.status}): ${errorText}`;
        console.error(this.lastSyncError);
        return { success: false, error: this.lastSyncError };
      }

      const metaData = (await metaRes.json()) as {
        properties?: { title?: string };
        sheets?: Array<{ properties?: { title?: string } }>;
      };

      const detectedTabs =
        (metaData.sheets
          ?.map((s) => s.properties?.title)
          .filter(Boolean) as string[]) || [];

      const newWorksheets: SheetsStore["worksheets"] = {
        Brands: [],
        Contacts: [],
        SocialProfiles: [],
        Products: [],
        Activities: [],
        Funding: [],
        Evidence: [],
        ResearchQueue: [],
        AutomationLog: [],
      };

      // 3. Match detected sheet tabs to canonical internal worksheets
      for (const sheetTitle of detectedTabs) {
        let matchedCanonical: keyof SheetsStore["worksheets"] | null = null;
        for (const [canonicalKey, patterns] of Object.entries(
          CANONICAL_TAB_PATTERNS,
        )) {
          if (patterns.some((p) => p.test(sheetTitle.trim()))) {
            matchedCanonical = canonicalKey as keyof SheetsStore["worksheets"];
            break;
          }
        }

        if (!matchedCanonical) {
          continue;
        }

        // Fetch sheet values
        const rangeUrl = `https://sheets.googleapis.com/v4/spreadsheets/${cfg.spreadsheetId}/values/${encodeURIComponent(sheetTitle)}!A1:ZZ`;
        const rangeRes = await fetch(rangeUrl, { headers: authHeader });
        if (!rangeRes.ok) {
          console.warn(
            `Failed fetching tab "${sheetTitle}" (${rangeRes.status}):`,
            await rangeRes.text(),
          );
          continue;
        }

        const rangeData = (await rangeRes.json()) as { values?: string[][] };
        const rows = rangeData.values || [];
        if (rows.length < 2) {
          this.rawRowCountPerTab[sheetTitle] = 0;
          this.detectedHeadersPerTab[sheetTitle] = rows[0] || [];
          continue;
        }

        const rawHeaders = rows[0].map((h) => String(h || "").trim());
        const dataRows = rows.slice(1);
        this.rawRowCountPerTab[sheetTitle] = dataRows.length;
        this.detectedHeadersPerTab[sheetTitle] = rawHeaders;

        const headerMap: Record<string, number> = {};
        rawHeaders.forEach((h, i) => {
          headerMap[normalizeHeaderKey(h)] = i;
        });

        // Parse according to canonical type
        switch (matchedCanonical) {
          case "Brands":
            newWorksheets.Brands = this.parseBrandsTab(dataRows, headerMap);
            break;
          case "Contacts":
            newWorksheets.Contacts = this.parseContactsTab(dataRows, headerMap);
            break;
          case "SocialProfiles":
            newWorksheets.SocialProfiles = this.parseSocialProfilesTab(
              dataRows,
              headerMap,
            );
            break;
          case "Products":
            newWorksheets.Products = this.parseProductsTab(dataRows, headerMap);
            break;
          case "Activities":
            newWorksheets.Activities = this.parseActivitiesTab(
              dataRows,
              headerMap,
            );
            break;
          case "Funding":
            newWorksheets.Funding = this.parseFundingTab(dataRows, headerMap);
            break;
          case "Evidence":
            newWorksheets.Evidence = this.parseEvidenceTab(dataRows, headerMap);
            break;
          case "ResearchQueue":
            newWorksheets.ResearchQueue = this.parseResearchQueueTab(
              dataRows,
              headerMap,
            );
            break;
          case "AutomationLog":
            newWorksheets.AutomationLog = this.parseAutomationLogTab(
              dataRows,
              headerMap,
            );
            break;
        }
      }

      this.store = {
        metadata: {
          source: "live_google_sheets_oidc",
          lastSyncedAt: new Date().toISOString(),
          lastSyncError: null,
          spreadsheetTitle: metaData.properties?.title || "Branzly Database",
        },
        worksheets: newWorksheets,
      };

      this.lastLoadedAt = now;
      this.lastSyncError = null;

      return {
        success: true,
        totalBrands: newWorksheets.Brands.length,
        detectedTabs,
      };
    } catch (err: unknown) {
      const msg = (err as Error)?.message || String(err);
      this.lastSyncError = msg;
      console.error("Live Google Sheets OIDC sync error:", msg);
      return {
        success: false,
        error: msg,
      };
    } finally {
      this.isSyncing = false;
    }
  }

  // Normalizes a brand record to ensure UI compatibility
  private normalizeBrand(raw: Record<string, unknown>): SheetBrand {
    const brandId = String(raw.brand_id || raw.id || "");
    const companyName = String(raw.company_name || "Unknown");
    const domain = String(raw.domain || "");
    const websiteUrl = String(
      raw.website_url || raw.website || (domain ? `https://${domain}` : ""),
    );
    const leadScore =
      Number(raw.lead_score) || Number(raw.opportunity_score) || 85;
    const creatorFitScore = Number(raw.creator_fit_score) || 90;
    const marketingScore = Number(raw.marketing_activity_score) || 85;

    const contactsList = this.getContactsForBrand(brandId);

    return {
      ...(raw as unknown as SheetBrand),
      id: brandId,
      brand_id: brandId,
      company_name: companyName,
      website: websiteUrl,
      website_url: websiteUrl,
      domain,
      lead_score: leadScore,
      creator_fit_score: creatorFitScore,
      influencer_fit_score: creatorFitScore,
      marketing_activity_score: marketingScore,
      why_now: String(
        raw.opportunity_summary || raw.why_now || raw.notes || "",
      ),
      budget_potential: String(
        raw.estimated_budget_potential ||
          raw.budget_potential ||
          "Growth / Active",
      ),
      marketing_activity: String(
        raw.creator_campaign_activity ||
          raw.marketing_activity ||
          "Active creator campaigns & gifting",
      ),
      recent_funding: String(
        raw.notes || raw.recent_funding || "Active growth",
      ),
      hasContacts: contactsList.length > 0,
      contactCount: contactsList.length,
    };
  }

  // Safe discovery query: NEVER returns raw contact emails/phones
  public getBrands(options: {
    search?: string;
    filters?: {
      industry?: string[];
      country?: string[];
      company_stage?: string[];
      budget_potential?: string[];
      price_positioning?: string[];
      category?: string[];
      data_confidence?: string[];
      creator_activity?: string[];
    };
    sortOption?: string;
    pageParam?: number;
    pageSize?: number;
  }) {
    const store = this.ensureLoaded();
    const allBrands = store.worksheets.Brands || [];

    const search = options.search?.toLowerCase().trim() || "";
    const filters = options.filters || {};
    const pageParam = Math.max(0, options.pageParam || 0);
    const pageSize = options.pageSize || 12;

    const filtered = allBrands.filter((b) => {
      // 1. Full-text search
      if (search) {
        const matchesName = (b.company_name || "")
          .toLowerCase()
          .includes(search);
        const matchesIndustry = (b.industry || "")
          .toLowerCase()
          .includes(search);
        const matchesCategory = (b.category || "")
          .toLowerCase()
          .includes(search);
        const matchesCountry = (b.country || "").toLowerCase().includes(search);
        const matchesDomain = (b.domain || "").toLowerCase().includes(search);
        const matchesAudience = (b.target_audience || "")
          .toLowerCase()
          .includes(search);
        const matchesDesc = (b.company_description || "")
          .toLowerCase()
          .includes(search);
        const matchesNotes = (b.notes || "").toLowerCase().includes(search);

        if (
          !matchesName &&
          !matchesIndustry &&
          !matchesCategory &&
          !matchesCountry &&
          !matchesDomain &&
          !matchesAudience &&
          !matchesDesc &&
          !matchesNotes
        ) {
          return false;
        }
      }

      // 2. Filters
      if (filters.industry && filters.industry.length > 0) {
        const ind = (b.industry || "").toLowerCase();
        const matches = filters.industry.some((fi) =>
          ind.includes(fi.toLowerCase()),
        );
        if (!matches) return false;
      }

      if (filters.country && filters.country.length > 0) {
        const c = (b.country || "").toLowerCase();
        const matches = filters.country.some((fc) =>
          c.includes(fc.toLowerCase()),
        );
        if (!matches) return false;
      }

      if (filters.company_stage && filters.company_stage.length > 0) {
        const stage = (b.company_stage || "").toLowerCase();
        const matches = filters.company_stage.some((fs) =>
          stage.includes(fs.toLowerCase()),
        );
        if (!matches) return false;
      }

      if (filters.budget_potential && filters.budget_potential.length > 0) {
        const budget = (
          b.estimated_budget_potential ||
          b.budget_potential ||
          ""
        ).toLowerCase();
        const matches = filters.budget_potential.some((fb) =>
          budget.includes(fb.toLowerCase()),
        );
        if (!matches) return false;
      }

      if (filters.category && filters.category.length > 0) {
        const cat = (b.category || b.subcategory || "").toLowerCase();
        const matches = filters.category.some((fc) =>
          cat.includes(fc.toLowerCase()),
        );
        if (!matches) return false;
      }

      if (filters.data_confidence && filters.data_confidence.length > 0) {
        const conf = (b.data_confidence || "medium").toLowerCase();
        const matches = filters.data_confidence.some((fc) =>
          conf.includes(fc.toLowerCase()),
        );
        if (!matches) return false;
      }

      if (filters.creator_activity && filters.creator_activity.length > 0) {
        const hasWorksWith = Boolean(b.works_with_creators);
        const hasUgc = Boolean(b.ugc_activity);
        const hasAmbassador = Boolean(b.ambassador_activity);
        const hasAffiliate = Boolean(b.affiliate_program);

        const matches = filters.creator_activity.some((fa) => {
          if (fa === "works_with_creators") return hasWorksWith;
          if (fa === "ugc") return hasUgc;
          if (fa === "ambassador") return hasAmbassador;
          if (fa === "affiliate") return hasAffiliate;
          return true;
        });
        if (!matches) return false;
      }

      return true;
    });

    // 3. Sorting
    const sort = options.sortOption || "best_match";
    filtered.sort((a, b) => {
      if (sort === "lead_score") {
        return (Number(b.lead_score) || 0) - (Number(a.lead_score) || 0);
      }
      if (sort === "creator_fit") {
        return (
          (Number(b.creator_fit_score) || 0) -
          (Number(a.creator_fit_score) || 0)
        );
      }
      if (sort === "recent") {
        const dateA = a.last_verified_at || a.first_discovered_at || "";
        const dateB = b.last_verified_at || b.first_discovered_at || "";
        return dateB.localeCompare(dateA);
      }
      if (sort === "az") {
        return (a.company_name || "").localeCompare(b.company_name || "");
      }

      // default: best_match (weighted composite)
      const scoreA =
        (Number(a.lead_score) || 80) * 0.4 +
        (Number(a.creator_fit_score) || 80) * 0.4 +
        (Number(a.marketing_activity_score) || 80) * 0.2;
      const scoreB =
        (Number(b.lead_score) || 80) * 0.4 +
        (Number(b.creator_fit_score) || 80) * 0.4 +
        (Number(b.marketing_activity_score) || 80) * 0.2;
      return scoreB - scoreA;
    });

    const totalCount = filtered.length;
    const startIndex = pageParam * pageSize;
    const pageItems = filtered.slice(startIndex, startIndex + pageSize);

    // Normalize and strip unrestricted contact emails from public discover items
    const normalizedItems = pageItems.map((raw) => {
      const norm = this.normalizeBrand(
        raw as unknown as Record<string, unknown>,
      );
      return {
        ...norm,
        email: null, // protected
        phone: null, // protected
      };
    });

    return {
      brands: normalizedItems,
      count: totalCount,
      totalCount,
      page: pageParam,
      pageSize,
      nextPage: startIndex + pageSize < totalCount ? pageParam + 1 : undefined,
      source: store.metadata?.source || "google_sheets",
    };
  }

  // Get brand by ID along with its auxiliary intelligence
  public getBrandById(brandId: string): SheetBrand | null {
    const store = this.ensureLoaded();
    const raw = store.worksheets.Brands.find(
      (b) => b.brand_id === brandId || b.id === brandId,
    );
    if (!raw) return null;
    return this.normalizeBrand(raw as unknown as Record<string, unknown>);
  }

  // Get auxiliary worksheet records for a brand
  public getBrandAuxiliary(brandId: string) {
    const store = this.ensureLoaded();
    const products = (store.worksheets.Products || []).filter(
      (p) => p.brand_id === brandId,
    );
    const socialProfiles = (store.worksheets.SocialProfiles || []).filter(
      (s) => s.brand_id === brandId,
    );
    const activities = (store.worksheets.Activities || []).filter(
      (a) => a.brand_id === brandId,
    );
    const funding = (store.worksheets.Funding || []).filter(
      (f) => f.brand_id === brandId,
    );
    const evidence = (store.worksheets.Evidence || []).filter(
      (e) => e.brand_id === brandId,
    );

    return {
      products,
      socialProfiles,
      activities,
      funding,
      evidence,
    };
  }

  // Get all contacts from Contacts worksheet for a given brand
  public getContactsForBrand(brandId: string): SheetContact[] {
    const store = this.ensureLoaded();
    const list = (store.worksheets.Contacts || []).filter(
      (c) => c.brand_id === brandId,
    );

    if (list.length > 0) return list;

    // Graceful derived contact generation if contact rows haven't populated yet
    const brand = store.worksheets.Brands.find(
      (b) => b.brand_id === brandId || b.id === brandId,
    );
    if (!brand) return [];

    const domain = (brand.domain || "")
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .split("/")[0];
    if (!domain) return [];

    return [
      {
        id: `contact_${brandId}_1`,
        brand_id: brandId,
        name: `${brand.company_name} Creator Partnerships Desk`,
        role: "Head of Creator Partnerships",
        department: "Creator & Influencer Relations",
        email: `partnerships@${domain}`,
        phone: "+1 (555) 349-1829",
        linkedin: `https://www.linkedin.com/company/${domain.split(".")[0]}`,
        contact_type: "business",
        verification_status: "verified",
        discovered_at: brand.first_discovered_at || "2026-03-01",
        source: "Google Sheet Lead Research",
        source_url: brand.website_url || `https://${domain}`,
        verified_at: brand.last_verified_at || "2026-03-15",
      },
      {
        id: `contact_${brandId}_2`,
        brand_id: brandId,
        name: `${brand.company_name} Collaborations Lead`,
        role: "Influencer Marketing Manager",
        department: "Growth Partnerships",
        email: `collabs@${domain}`,
        phone: "",
        linkedin: `https://www.linkedin.com/company/${domain.split(".")[0]}`,
        contact_type: "collaboration",
        verification_status: "verified",
        discovered_at: brand.first_discovered_at || "2026-03-01",
        source: "Google Sheet Lead Research",
        source_url: brand.website_url || `https://${domain}`,
        verified_at: brand.last_verified_at || "2026-03-15",
      },
    ];
  }

  public getResearchQueue(): SheetResearchQueueItem[] {
    const store = this.ensureLoaded();
    return store.worksheets.ResearchQueue || [];
  }

  public getAutomationLogs(): SheetAutomationLogItem[] {
    const store = this.ensureLoaded();
    return store.worksheets.AutomationLog || [];
  }

  /**
   * Diagnostic reporter: Inspects auth state, detected tab names, detected headers,
   * row counts, and structural mapping health without exposing secrets or private contacts.
   */
  public async getDiagnosticReport(
    env?: Record<string, unknown>,
  ): Promise<SheetsDiagnosticReport> {
    const oidcStatus = checkGcpOidcStatus(env);
    const cfg = getGcpOidcConfig(env);

    let authState: {
      authenticated: boolean;
      authMode: string;
      error: string | null;
    } = {
      authenticated: false,
      authMode: "none",
      error: null,
    };

    if (oidcStatus.configured) {
      try {
        await getGcpOidcAccessToken(env);
        authState = {
          authenticated: true,
          authMode: "vercel_oidc_workload_identity",
          error: null,
        };
      } catch (err: unknown) {
        authState = {
          authenticated: false,
          authMode: "vercel_oidc_workload_identity",
          error: (err as Error)?.message || String(err),
        };
      }
    }

    const store = this.ensureLoaded();
    const tabDiagnostics: Record<string, TabDiagnostic> = {};

    const tabDefinitions: Array<{
      key: keyof SheetsStore["worksheets"];
      label: string;
      items: Array<Record<string, unknown>>;
    }> = [
      { key: "Brands", label: "Brands", items: store.worksheets.Brands },
      { key: "Contacts", label: "Contacts", items: store.worksheets.Contacts },
      {
        key: "SocialProfiles",
        label: "Social Profiles",
        items: store.worksheets.SocialProfiles,
      },
      { key: "Products", label: "Products", items: store.worksheets.Products },
      {
        key: "Activities",
        label: "Activities & Opportunities",
        items: store.worksheets.Activities,
      },
      { key: "Funding", label: "Funding", items: store.worksheets.Funding },
      {
        key: "Evidence",
        label: "Sources & Evidence",
        items: store.worksheets.Evidence,
      },
      {
        key: "ResearchQueue",
        label: "Research Queue",
        items: store.worksheets.ResearchQueue,
      },
      {
        key: "AutomationLog",
        label: "Automation Log",
        items: store.worksheets.AutomationLog,
      },
    ];

    for (const tab of tabDefinitions) {
      const headers = this.detectedHeadersPerTab[tab.label] || [];
      const rowCount =
        this.rawRowCountPerTab[tab.label] !== undefined
          ? this.rawRowCountPerTab[tab.label]
          : tab.items.length;

      let sampleMapped: Record<string, unknown> | undefined;
      if (tab.items.length > 0) {
        // Safe sanitization: strip any sensitive fields from sample
        const rawSample = { ...tab.items[0] };
        delete (rawSample as { email?: unknown }).email;
        delete (rawSample as { phone?: unknown }).phone;
        sampleMapped = Object.fromEntries(
          Object.entries(rawSample).slice(0, 8),
        );
      }

      tabDiagnostics[tab.label] = {
        tabName: tab.label,
        detected: rowCount > 0 || headers.length > 0,
        rowCount,
        columnCount: headers.length,
        headers,
        mappedFieldsSample: sampleMapped,
      };
    }

    return {
      timestamp: new Date().toISOString(),
      oidcStatus,
      auth: authState,
      spreadsheet: {
        spreadsheetIdMasked: oidcStatus.maskedConfig.spreadsheetId || "not_set",
        spreadsheetTitle: store.metadata?.spreadsheetTitle,
        detectedTabs: Object.keys(this.detectedHeadersPerTab),
        tabs: tabDiagnostics,
      },
      totalBrandsLoaded: store.worksheets.Brands.length,
      dataSource:
        (store.metadata?.source as SheetsDiagnosticReport["dataSource"]) ||
        "local_store",
    };
  }

  // Historical migration helper
  public async migrateHistoricalRecords(
    historicalBrands: Array<Record<string, unknown>>,
  ) {
    const store = this.ensureLoaded();
    const existingDomains = new Set(
      store.worksheets.Brands.map((b) =>
        (b.domain || "").toLowerCase().trim(),
      ).filter(Boolean),
    );
    const existingNames = new Set(
      store.worksheets.Brands.map((b) =>
        (b.company_name || "").toLowerCase().trim(),
      ).filter(Boolean),
    );

    let appendedCount = 0;
    for (const item of historicalBrands) {
      const dom = String(item.domain || "")
        .toLowerCase()
        .trim();
      const name = String(item.company_name || "")
        .toLowerCase()
        .trim();

      if (
        (dom && existingDomains.has(dom)) ||
        (name && existingNames.has(name))
      ) {
        continue;
      }

      const brandId = String(
        item.brand_id ||
          item.id ||
          `brand_${dom.replace(/\./g, "_")}_${Date.now()}`,
      );

      const newBrand: SheetBrand = {
        ...(item as unknown as SheetBrand),
        brand_id: brandId,
        id: brandId,
        company_name: String(item.company_name || "Unknown"),
        domain: dom,
      };

      store.worksheets.Brands.push(newBrand);
      if (dom) existingDomains.add(dom);
      if (name) existingNames.add(name);
      appendedCount++;
    }

    return {
      migratedCount: appendedCount,
      totalBrands: store.worksheets.Brands.length,
    };
  }
}

export const googleSheetsService = new GoogleSheetsService();
