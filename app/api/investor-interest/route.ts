import { POST as saveLead } from "@/app/api/vendor-intro-request/route";
import { d1LeadStoreEnabled } from "@/lib/formStore";
import { formRequestRejection } from "@/lib/formAbuse";
import { validateInvestorInterest } from "@/lib/investorInterest";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const rejection = formRequestRejection(request);
  if (rejection) return Response.json({ ok: false, message: "Please reload the page and try again" }, { status: 403 });
  let payload: unknown;
  try { payload = await request.json(); } catch { return Response.json({ ok: false, message: "Please check your details and try again" }, { status: 400 }); }
  const { data, errors } = validateInvestorInterest(payload);
  if (data.websiteUrl) return Response.json({ ok: false, message: "Please reload the page and try again" }, { status: 400 });
  if (Object.keys(errors).length) return Response.json({ ok: false, errors, message: "Please check the highlighted fields" }, { status: 400 });
  // Investor interests must never fall back to the former lead database.
  if (!d1LeadStoreEnabled()) return Response.json({ ok: false, message: "The form is temporarily unavailable. Please email contact@fluidrwa.com" }, { status: 503 });
  const submittedAt = new Date().toISOString();
  let sourcePage = "/investors";
  try {
    const source = new URL(data.sourcePage, "https://www.fluidrwa.com");
    if (["fluidrwa.com", "www.fluidrwa.com"].includes(source.hostname)) sourcePage = source.pathname;
  } catch { /* Keep the known form path for malformed source URLs. */ }
  const details = ["Investor interest", `Investor type: ${data.investorType}`, `Asset classes: ${data.assetClasses.join(", ")}`, `Region: ${data.region}`, `Ticket size: ${data.ticketSize || "Not provided"}`, `Company: ${data.companyName || "Not provided"}`, "Consent: Receive weekly tokenized asset updates and related investor updates from FluidRWA", "Consent version: investor-interest-2026-11-21", `Submitted at: ${submittedAt}`, `Source page: ${sourcePage}`].join("\n");
  // Reuse the existing D1 lead pipeline, email notification and delivery receipts.
  const headers = new Headers(request.headers);
  headers.delete("content-length");
  const response = await saveLead(new Request(request.url, { method: "POST", headers, body: JSON.stringify({ firstName: data.firstName, contactEmail: data.email, companyName: data.companyName || "Individual investor", country: data.region, source: "investor-interest", vendorCategory: "Tokenized asset investor", pageUrl: "https://www.fluidrwa.com/investors", projectDescription: details, rawPayload: { INVESTOR_TYPE: data.investorType, ASSET_CLASSES: data.assetClasses, TICKET_SIZE: data.ticketSize, SOURCE_PAGE: sourcePage, CONSENT: true, CONSENT_VERSION: "investor-interest-2026-11-21", SUBMITTED_AT: submittedAt } }) }));
  const result = await response.json();
  if (!response.ok) return Response.json(result, { status: response.status });
  if (!result.requestId) return Response.json({ ok: false, message: "Your interest could not be saved. Please try again" }, { status: 503 });
  return Response.json({ ok: true, message: "Your interest has been saved. We will keep you updated by email. You can unsubscribe at any time." });
}
