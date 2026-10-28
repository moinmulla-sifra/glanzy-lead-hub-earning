import { googleSheetsService } from "../../lib/googleSheetsService";
import { handleReveal } from "./reveal";

export const handleBrandDetails = async (
  request: Request,
  env?: Record<string, unknown>,
) => {
  try {
    const url = new URL(request.url);
    const brandId = url.searchParams.get("id") || "";

    if (!brandId) {
      return new Response(JSON.stringify({ error: "Missing brand id" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const brand = googleSheetsService.getBrandById(brandId);
    if (!brand) {
      return new Response(JSON.stringify({ error: "Brand not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const auxiliary = googleSheetsService.getBrandAuxiliary(brandId);

    // Also check reveal status if authorization or workspaceId is present
    const authHeader = request.headers.get("Authorization");
    const workspaceId = url.searchParams.get("workspaceId");

    let revealInfo: Record<string, unknown> | null = null;
    if (authHeader || workspaceId) {
      try {
        const dummyReq = new Request(
          new URL("/api/brands/reveal", request.url).toString(),
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(authHeader ? { Authorization: authHeader } : {}),
            },
            body: JSON.stringify({
              brandId,
              workspaceId,
              checkOnly: true,
            }),
          },
        );
        const revRes = await handleReveal(dummyReq, env);
        if (revRes.ok) {
          revealInfo = await revRes.json();
        }
      } catch {
        // Non-fatal
      }
    }

    return new Response(
      JSON.stringify({
        brand,
        products: auxiliary.products,
        socialProfiles: auxiliary.socialProfiles,
        activities: auxiliary.activities,
        funding: auxiliary.funding,
        evidence: auxiliary.evidence,
        revealInfo,
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (err: unknown) {
    const errorObj = err as { message?: string } | undefined;
    return new Response(
      JSON.stringify({
        error: errorObj?.message || "Failed to load brand details",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
