import { googleSheetsService } from "../../lib/googleSheetsService";
import { loadSavedRecords } from "../brands/saved";
import { loadOutreachRecords } from "../brands/contacted";

export const handleDashboardAnalytics = async (
  request: Request,
  _env?: Record<string, unknown>,
) => {
  try {
    const url = new URL(request.url);
    let workspaceId = url.searchParams.get("workspaceId");

    if (request.method === "POST") {
      const body = await request.json().catch(() => ({}));
      if (body.workspaceId) workspaceId = body.workspaceId;
    }

    // 1. Total discoverable brands from Google Sheets / repository
    const discoverResult = googleSheetsService.getBrands({
      pageParam: 0,
      pageSize: 1000,
    });
    const allBrands = discoverResult.brands || [];
    const totalDiscoverableBrands =
      discoverResult.totalCount || allBrands.length;

    // 2. Data confidence distribution across sheet brands
    const confidenceCounts: Record<string, number> = {
      high: 0,
      medium: 0,
      low: 0,
      unverified: 0,
    };

    // 3. Creator-opportunity score distribution
    const opportunityDistribution = {
      high_fit: 0, // >= 85
      moderate_fit: 0, // 70 - 84
      niche_fit: 0, // < 70
    };

    let latestVerificationDate: string | null = null;

    for (const b of allBrands) {
      const conf = (b.data_confidence || "medium").toLowerCase();
      if (confidenceCounts[conf] !== undefined) {
        confidenceCounts[conf]++;
      } else {
        confidenceCounts.medium++;
      }

      const score = Number(
        b.creator_fit_score || b.opportunity_score || b.lead_score || 0,
      );
      if (score >= 85) {
        opportunityDistribution.high_fit++;
      } else if (score >= 70) {
        opportunityDistribution.moderate_fit++;
      } else {
        opportunityDistribution.niche_fit++;
      }

      if (
        b.last_verified_at &&
        (!latestVerificationDate || b.last_verified_at > latestVerificationDate)
      ) {
        latestVerificationDate = b.last_verified_at;
      }
    }

    // 4. Workspace-specific pipeline and outreach statistics
    const activeWs = workspaceId || "ws_default";
    const allSaved = loadSavedRecords();
    const savedRecords = allSaved.filter(
      (s) => !workspaceId || s.workspace_id === activeWs,
    );
    const allOutreach = loadOutreachRecords();
    const outreachRecords = allOutreach.filter(
      (o) => !workspaceId || o.workspace_id === activeWs,
    );

    const pipelineCounts = {
      saved: savedRecords.length,
      contacted: 0,
      replied: 0,
      interested: 0,
      meeting: 0,
      won: 0,
      lost: 0,
    };

    for (const item of outreachRecords) {
      const statusKey = (
        item.status || "Contacted"
      ).toLowerCase() as keyof typeof pipelineCounts;
      if (pipelineCounts[statusKey] !== undefined) {
        pipelineCounts[statusKey]++;
      } else {
        pipelineCounts.contacted++;
      }
    }

    const awaitingFollowUp = pipelineCounts.contacted + pipelineCounts.replied;

    // Recent activity feed
    const recentActivities = [
      ...outreachRecords.map((o) => ({
        id: o.id,
        type: "outreach",
        status: o.status,
        brandId: o.brand_id,
        title: `Outreach status: ${o.status}`,
        timestamp: o.updated_at || o.created_at,
      })),
      ...savedRecords.slice(0, 5).map((s) => ({
        id: s.id,
        type: "saved",
        status: "Saved",
        brandId: s.brand_id,
        title: "Brand saved to pipeline",
        timestamp: s.created_at,
      })),
    ]
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      )
      .slice(0, 8);

    return new Response(
      JSON.stringify({
        totalDiscoverableBrands,
        workspaceId: activeWs,
        savedBrandsCount: savedRecords.length,
        contactedBrandsCount: outreachRecords.length,
        awaitingFollowUp,
        pipeline: pipelineCounts,
        confidenceDistribution: confidenceCounts,
        opportunityDistribution,
        latestVerificationDate: latestVerificationDate || "Recently updated",
        recentActivities,
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error("Dashboard analytics error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to generate dashboard analytics" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
