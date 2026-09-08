export interface ResearchQuery {
  keywords?: string[];
  industry?: string;
  country?: string;
  limit?: number;
  url?: string; // For specific company research
}

export interface NormalizedBrandResult {
  company_name: string;
  domain: string | null;
  website: string | null;
  industry: string | null;
  country: string | null;
  company_stage: string | null;
  recent_funding: string | null;
  recent_launch: string | null;
  marketing_activity: string | null;
  existing_creator_activity: string | null;
  contact_email: string | null;
  contact_person: string | null;
  contact_role: string | null;
  linkedin: string | null;
  evidence: Array<{
    field_name: string;
    source_url: string;
    source_type: string;
    confidence: 'high' | 'medium' | 'low' | 'unverified';
    data: any;
  }>;
}

export interface ResearchProvider {
  name: string;
  discoverBrands(query: ResearchQuery): Promise<{ results: NormalizedBrandResult[]; raw: any }>;
  researchBrand(query: ResearchQuery): Promise<{ results: NormalizedBrandResult[]; raw: any }>;
}
