type EmailResult = {
  ok: boolean;
  skipped: boolean;
  error?: string;
};

export function escapeEmailHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function notificationRecipient() {
  return process.env.FORM_NOTIFICATION_EMAIL || process.env.ASSESSMENT_NOTIFICATION_EMAIL || "contact@fluidrwa.com";
}

export async function sendNotificationEmail({
  to = notificationRecipient(),
  subject,
  text,
  html
}: {
  to?: string;
  subject: string;
  text: string;
  html: string;
}): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FORM_NOTIFICATION_FROM || process.env.ASSESSMENT_NOTIFICATION_FROM;

  if (!apiKey || !from || !to) {
    return { ok: false, skipped: true };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      signal: controller.signal,
      body: JSON.stringify({
        from,
        to,
        subject,
        text,
        html
      })
    });

    if (!response.ok) {
      return { ok: false, skipped: false, error: await response.text() };
    }

    return { ok: true, skipped: false };
  } catch (error) {
    return {
      ok: false,
      skipped: false,
      error: error instanceof Error ? error.message : "Email notification failed."
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function notifyFormSubmission({
  requestId,
  source,
  firstName,
  lastName,
  contactEmail,
  companyName,
  title,
  phone,
  country,
  website,
  linkedin,
  vendorName,
  vendorCategory,
  pageUrl,
  projectDescription,
  paypalSubscriptionId,
  payuTransactionId,
  payuPaymentId,
  payuAmount,
  payuCurrency,
  membershipPlan,
  paymentProvider,
  paymentStatus
}: {
  requestId?: string | null;
  source?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  contactEmail?: string | null;
  companyName?: string | null;
  title?: string | null;
  phone?: string | null;
  country?: string | null;
  website?: string | null;
  linkedin?: string | null;
  vendorName?: string | null;
  vendorCategory?: string | null;
  pageUrl?: string | null;
  projectDescription?: string | null;
  paypalSubscriptionId?: string | null;
  payuTransactionId?: string | null;
  payuPaymentId?: string | null;
  payuAmount?: string | null;
  payuCurrency?: string | null;
  membershipPlan?: string | null;
  paymentProvider?: string | null;
  paymentStatus?: string | null;
}) {
  const name = [firstName, lastName].filter(Boolean).join(" ").trim() || "Unknown contact";
  const safe = {
    requestId: escapeEmailHtml(requestId || "Not returned"),
    source: escapeEmailHtml(source || "Website form"),
    name: escapeEmailHtml(name),
    email: escapeEmailHtml(contactEmail),
    company: escapeEmailHtml(companyName),
    title: escapeEmailHtml(title),
    phone: escapeEmailHtml(phone),
    country: escapeEmailHtml(country),
    website: escapeEmailHtml(website),
    linkedin: escapeEmailHtml(linkedin),
    vendorName: escapeEmailHtml(vendorName),
    vendorCategory: escapeEmailHtml(vendorCategory),
    pageUrl: escapeEmailHtml(pageUrl),
    description: escapeEmailHtml(projectDescription),
    paypalSubscriptionId: escapeEmailHtml(paypalSubscriptionId),
    payuTransactionId: escapeEmailHtml(payuTransactionId),
    payuPaymentId: escapeEmailHtml(payuPaymentId),
    payuAmount: escapeEmailHtml(payuAmount),
    payuCurrency: escapeEmailHtml(payuCurrency),
    membershipPlan: escapeEmailHtml(membershipPlan),
    paymentProvider: escapeEmailHtml(paymentProvider),
    paymentStatus: escapeEmailHtml(paymentStatus)
  };
  const hasPayment = Boolean(paypalSubscriptionId || payuTransactionId || payuPaymentId || membershipPlan || paymentProvider);
  const subject = `${hasPayment ? "Paid vendor form" : "New FluidRWA form submission"} - ${companyName || name}`;
  const text = [
    `Request ID: ${requestId || "Not returned"}`,
    `Source: ${source || "Website form"}`,
    `Payment provider: ${paymentProvider || ""}`,
    `Payment status: ${paymentStatus || ""}`,
    `Membership plan: ${membershipPlan || ""}`,
    `PayPal subscription ID: ${paypalSubscriptionId || ""}`,
    `PayU transaction ID: ${payuTransactionId || ""}`,
    `PayU payment ID: ${payuPaymentId || ""}`,
    `PayU amount: ${payuAmount || ""}`,
    `PayU currency: ${payuCurrency || ""}`,
    `Name: ${name}`,
    `Email: ${contactEmail || ""}`,
    `Company: ${companyName || ""}`,
    `Title: ${title || ""}`,
    `Phone: ${phone || ""}`,
    `Country: ${country || ""}`,
    `Website: ${website || ""}`,
    `LinkedIn: ${linkedin || ""}`,
    `Vendor: ${vendorName || ""}`,
    `Vendor category: ${vendorCategory || ""}`,
    `Page URL: ${pageUrl || ""}`,
    "",
    "Request details:",
    projectDescription || ""
  ].join("\n");
  const html = `
    <div style="font-family:Arial,sans-serif;color:#12213a;line-height:1.55">
      <h2 style="margin:0 0 12px">New FluidRWA form submission</h2>
      ${hasPayment ? '<p style="background:#eaf7fb;border:1px solid #bfeaf3;border-radius:10px;padding:12px 14px"><strong>Payment step completed before this form.</strong> Match this lead against the PayPal or PayU reference below.</p>' : ""}
      <p><strong>${safe.company || safe.name}</strong> submitted a website form.</p>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;border:1px solid #dbe7f3;width:100%;max-width:760px">
        <tbody>
          <tr><td><strong>Request ID</strong></td><td>${safe.requestId}</td></tr>
          <tr><td><strong>Source</strong></td><td>${safe.source}</td></tr>
          <tr><td><strong>Payment provider</strong></td><td>${safe.paymentProvider}</td></tr>
          <tr><td><strong>Payment status</strong></td><td>${safe.paymentStatus}</td></tr>
          <tr><td><strong>Membership plan</strong></td><td>${safe.membershipPlan}</td></tr>
          <tr><td><strong>PayPal subscription ID</strong></td><td>${safe.paypalSubscriptionId}</td></tr>
          <tr><td><strong>PayU transaction ID</strong></td><td>${safe.payuTransactionId}</td></tr>
          <tr><td><strong>PayU payment ID</strong></td><td>${safe.payuPaymentId}</td></tr>
          <tr><td><strong>PayU amount</strong></td><td>${safe.payuAmount}</td></tr>
          <tr><td><strong>PayU currency</strong></td><td>${safe.payuCurrency}</td></tr>
          <tr><td><strong>Name</strong></td><td>${safe.name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${safe.email}</td></tr>
          <tr><td><strong>Company</strong></td><td>${safe.company}</td></tr>
          <tr><td><strong>Title</strong></td><td>${safe.title}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${safe.phone}</td></tr>
          <tr><td><strong>Country</strong></td><td>${safe.country}</td></tr>
          <tr><td><strong>Website</strong></td><td>${safe.website}</td></tr>
          <tr><td><strong>LinkedIn</strong></td><td>${safe.linkedin}</td></tr>
          <tr><td><strong>Vendor</strong></td><td>${safe.vendorName}</td></tr>
          <tr><td><strong>Vendor category</strong></td><td>${safe.vendorCategory}</td></tr>
          <tr><td><strong>Page URL</strong></td><td>${safe.pageUrl}</td></tr>
        </tbody>
      </table>
      <h3>Request details</h3>
      <p style="white-space:pre-wrap">${safe.description}</p>
    </div>
  `;

  return sendNotificationEmail({ subject, text, html });
}

export async function notifyFreelancerSubmission({
  profileId,
  fullName,
  contactEmail,
  headline,
  category,
  location,
  rate,
  availability,
  experience,
  services,
  tags,
  portfolioUrl,
  linkedinUrl,
  githubUrl,
  websiteUrl,
  summary,
  fileNames,
  freeUntil
}: {
  profileId?: string | null;
  fullName?: string | null;
  contactEmail?: string | null;
  headline?: string | null;
  category?: string | null;
  location?: string | null;
  rate?: string | null;
  availability?: string | null;
  experience?: string | null;
  services?: string[] | null;
  tags?: string[] | null;
  portfolioUrl?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  websiteUrl?: string | null;
  summary?: string | null;
  fileNames?: string[] | null;
  freeUntil?: string | null;
}) {
  const safe = {
    profileId: escapeEmailHtml(profileId || "Not returned"),
    fullName: escapeEmailHtml(fullName),
    email: escapeEmailHtml(contactEmail),
    headline: escapeEmailHtml(headline),
    category: escapeEmailHtml(category),
    location: escapeEmailHtml(location),
    rate: escapeEmailHtml(rate),
    availability: escapeEmailHtml(availability),
    experience: escapeEmailHtml(experience),
    services: escapeEmailHtml((services || []).join(", ")),
    tags: escapeEmailHtml((tags || []).join(", ")),
    portfolioUrl: escapeEmailHtml(portfolioUrl),
    linkedinUrl: escapeEmailHtml(linkedinUrl),
    githubUrl: escapeEmailHtml(githubUrl),
    websiteUrl: escapeEmailHtml(websiteUrl),
    summary: escapeEmailHtml(summary),
    files: escapeEmailHtml((fileNames || []).join(", ")),
    freeUntil: escapeEmailHtml(freeUntil)
  };
  const subject = `New FluidRWA freelancer profile - ${fullName || category || "Review needed"}`;
  const text = [
    `Profile ID: ${profileId || "Not returned"}`,
    `Name: ${fullName || ""}`,
    `Email: ${contactEmail || ""}`,
    `Headline: ${headline || ""}`,
    `Category: ${category || ""}`,
    `Location: ${location || ""}`,
    `Rate: ${rate || ""}`,
    `Availability: ${availability || ""}`,
    `Experience: ${experience || ""}`,
    `Services: ${(services || []).join(", ")}`,
    `Tags: ${(tags || []).join(", ")}`,
    `Portfolio: ${portfolioUrl || ""}`,
    `LinkedIn: ${linkedinUrl || ""}`,
    `GitHub: ${githubUrl || ""}`,
    `Website: ${websiteUrl || ""}`,
    `Files: ${(fileNames || []).join(", ")}`,
    `Free until: ${freeUntil || ""}`,
    "",
    "Summary:",
    summary || ""
  ].join("\n");
  const html = `
    <div style="font-family:Arial,sans-serif;color:#12213a;line-height:1.55">
      <h2 style="margin:0 0 12px">New FluidRWA freelancer profile</h2>
      <p><strong>${safe.fullName}</strong> submitted a freelancer listing for review.</p>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;border:1px solid #dbe7f3;width:100%;max-width:760px">
        <tbody>
          <tr><td><strong>Profile ID</strong></td><td>${safe.profileId}</td></tr>
          <tr><td><strong>Name</strong></td><td>${safe.fullName}</td></tr>
          <tr><td><strong>Email</strong></td><td>${safe.email}</td></tr>
          <tr><td><strong>Headline</strong></td><td>${safe.headline}</td></tr>
          <tr><td><strong>Category</strong></td><td>${safe.category}</td></tr>
          <tr><td><strong>Location</strong></td><td>${safe.location}</td></tr>
          <tr><td><strong>Rate</strong></td><td>${safe.rate}</td></tr>
          <tr><td><strong>Availability</strong></td><td>${safe.availability}</td></tr>
          <tr><td><strong>Experience</strong></td><td>${safe.experience}</td></tr>
          <tr><td><strong>Services</strong></td><td>${safe.services}</td></tr>
          <tr><td><strong>Tags</strong></td><td>${safe.tags}</td></tr>
          <tr><td><strong>Portfolio</strong></td><td>${safe.portfolioUrl}</td></tr>
          <tr><td><strong>LinkedIn</strong></td><td>${safe.linkedinUrl}</td></tr>
          <tr><td><strong>GitHub</strong></td><td>${safe.githubUrl}</td></tr>
          <tr><td><strong>Website</strong></td><td>${safe.websiteUrl}</td></tr>
          <tr><td><strong>Uploaded file names</strong></td><td>${safe.files}</td></tr>
          <tr><td><strong>Free until</strong></td><td>${safe.freeUntil}</td></tr>
        </tbody>
      </table>
      <h3>Profile summary</h3>
      <p style="white-space:pre-wrap">${safe.summary}</p>
    </div>
  `;

  return sendNotificationEmail({ subject, text, html });
}
