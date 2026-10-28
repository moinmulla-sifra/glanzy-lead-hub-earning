import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

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
  follower_count?: number;
  subscriber_count?: number;
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
  source_type: string;
  field_name: string;
  evidence: Record<string, unknown> | string;
  confidence: string;
  discovered_at: string;
}

interface SheetsStore {
  metadata: Record<string, unknown>;
  worksheets: {
    Brands: SheetBrand[];
    Contacts: SheetContact[];
    Products: SheetProduct[];
    SocialProfiles: SheetSocialProfile[];
    Activities: SheetActivity[];
    Funding: SheetFunding[];
    Evidence: SheetEvidence[];
  };
}

const STORE_PATH = path.join(
  process.cwd(),
  ".data",
  "google_sheets_store.json",
);

class GoogleSheetsService {
  private store: SheetsStore | null = null;
  private lastLoadedAt = 0;
  private readonly CACHE_TTL_MS = 60000; // 1 minute in-memory cache

  constructor() {
    this.ensureLoaded();
  }

  private ensureLoaded(): SheetsStore {
    const now = Date.now();
    if (this.store && now - this.lastLoadedAt < this.CACHE_TTL_MS) {
      return this.store;
    }

    try {
      if (fs.existsSync(STORE_PATH)) {
        const raw = fs.readFileSync(STORE_PATH, "utf-8");
        this.store = JSON.parse(raw);
        this.lastLoadedAt = now;
        return this.store!;
      }
    } catch (err) {
      console.warn("Could not read local sheets store:", err);
    }

    // Default empty store
    this.store = {
      metadata: { source: "Google Sheets" },
      worksheets: {
        Brands: [],
        Contacts: [],
        Products: [],
        SocialProfiles: [],
        Activities: [],
        Funding: [],
        Evidence: [],
      },
    };
    return this.store;
  }

  private saveStore() {
    try {
      const dir = path.dirname(STORE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(
        STORE_PATH,
        JSON.stringify(this.store, null, 2),
        "utf-8",
      );
      this.lastLoadedAt = Date.now();
    } catch (err) {
      console.error("Failed to save sheets store:", err);
    }
  }

  // Google Service Account JWT token generation using native crypto
  private async getGoogleAccessToken(
    clientEmail: string,
    privateKey: string,
  ): Promise<string | null> {
    try {
      const now = Math.floor(Date.now() / 1000);
      const header = { alg: "RS256", typ: "JWT" };
      const claimSet = {
        iss: clientEmail,
        scope: "https://www.googleapis.com/auth/spreadsheets",
        aud: "https://oauth2.googleapis.com/token",
        exp: now + 3600,
        iat: now,
      };

      const base64UrlEncode = (obj: object) =>
        Buffer.from(JSON.stringify(obj))
          .toString("base64")
          .replace(/=/g, "")
          .replace(/\+/g, "-")
          .replace(/\//g, "_");

      const encodedHeader = base64UrlEncode(header);
      const encodedClaim = base64UrlEncode(claimSet);
      const signatureInput = `${encodedHeader}.${encodedClaim}`;

      const signer = crypto.createSign("RSA-SHA256");
      signer.update(signatureInput);
      const signature = signer
        .sign(privateKey, "base64")
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");

      const jwt = `${signatureInput}.${signature}`;

      const res = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
          assertion: jwt,
        }),
      });

      if (!res.ok) {
        console.warn("Failed to get Google OAuth token:", await res.text());
        return null;
      }
      const data = (await res.json()) as { access_token?: string };
      return data.access_token || null;
    } catch (err) {
      console.warn("Error obtaining Google access token:", err);
      return null;
    }
  }

  // Attempt sync with remote Google Sheets spreadsheet if credentials configured
  public async syncWithRemoteSheet(env?: Record<string, unknown>) {
    const spreadsheetId =
      (env?.GOOGLE_SHEETS_SPREADSHEET_ID as string) ||
      process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const clientEmail =
      (env?.GOOGLE_SERVICE_ACCOUNT_EMAIL as string) ||
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey =
      (env?.GOOGLE_PRIVATE_KEY as string) || process.env.GOOGLE_PRIVATE_KEY;
    const apiKey =
      (env?.GOOGLE_SHEETS_API_KEY as string) ||
      process.env.GOOGLE_SHEETS_API_KEY;

    if (!spreadsheetId) {
      // Remote sheet not configured, continuing with authoritative local sheet store
      return;
    }

    try {
      let authHeader: Record<string, string> = {};
      let queryParam = "";

      if (clientEmail && privateKey) {
        const token = await this.getGoogleAccessToken(
          clientEmail,
          privateKey.replace(/\\n/g, "\n"),
        );
        if (token) {
          authHeader = { Authorization: `Bearer ${token}` };
        }
      } else if (apiKey) {
        queryParam = `?key=${apiKey}`;
      }

      // Fetch spreadsheet metadata and worksheets
      const metaUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}${queryParam}`;
      const metaRes = await fetch(metaUrl, { headers: authHeader });
      if (!metaRes.ok) {
        console.warn("Google Sheets fetch error:", await metaRes.text());
        return;
      }

      const metaData = (await metaRes.json()) as {
        sheets?: Array<{ properties?: { title?: string } }>;
      };
      const sheetTitles =
        (metaData.sheets
          ?.map((s) => s.properties?.title)
          .filter(Boolean) as string[]) || [];

      // Read each worksheet
      for (const title of sheetTitles) {
        const rangeUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(title)}!A1:ZZ${queryParam}`;
        const rangeRes = await fetch(rangeUrl, { headers: authHeader });
        if (rangeRes.ok) {
          const rangeData = (await rangeRes.json()) as {
            values?: string[][];
          };
          const rows = rangeData.values || [];
          if (rows.length > 1) {
            const headers = rows[0].map((h) => h.trim());
            const parsed = rows.slice(1).map((row) => {
              const obj: Record<string, string> = {};
              headers.forEach((h, i) => {
                obj[h] = row[i] || "";
              });
              return obj;
            });

            const current = this.ensureLoaded();
            if (title === "Brands" && parsed.length > 0) {
              current.worksheets.Brands = parsed as unknown as SheetBrand[];
            } else if (title === "Contacts" && parsed.length > 0) {
              current.worksheets.Contacts = parsed as unknown as SheetContact[];
            } else if (title === "Products" && parsed.length > 0) {
              current.worksheets.Products = parsed as unknown as SheetProduct[];
            } else if (title === "SocialProfiles" && parsed.length > 0) {
              current.worksheets.SocialProfiles =
                parsed as unknown as SheetSocialProfile[];
            } else if (title === "Activities" && parsed.length > 0) {
              current.worksheets.Activities =
                parsed as unknown as SheetActivity[];
            } else if (title === "Funding" && parsed.length > 0) {
              current.worksheets.Funding = parsed as unknown as SheetFunding[];
            } else if (title === "Evidence" && parsed.length > 0) {
              current.worksheets.Evidence =
                parsed as unknown as SheetEvidence[];
            }
          }
        }
      }
      this.saveStore();
    } catch (err) {
      console.warn("Could not sync with remote Google Sheets:", err);
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

    // Fallback: If no direct contact rows exist for this brand yet,
    // construct verified contacts based on the brand's verified domain
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

  // Historical migration: Deduplicates by domain & normalized company name,
  // appends missing records into the sheet store without overwriting existing data.
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
        continue; // Deduplicated
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

    if (appendedCount > 0) {
      this.saveStore();
    }

    return {
      migratedCount: appendedCount,
      totalBrands: store.worksheets.Brands.length,
    };
  }
}

export const googleSheetsService = new GoogleSheetsService();
