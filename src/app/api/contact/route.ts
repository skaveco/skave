const fields = [
  "name", "email", "phone", "referralSource", "companyNameAndIndustry",
  "company", "partners", "budget", "message",
] as const;

const requiredFields = [
  "name", "email", "referralSource", "companyNameAndIndustry", "partners", "budget", "message",
] as const;
const referralSources = ["social-media", "referral", "google", "online-ad"];
const budgets = ["up-to-7000", "7000-15000", "15000-30000", "30000-60000", "over-60000"];

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ error: "Invalid form data" }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  const payload = {} as Record<(typeof fields)[number], string>;
  for (const field of fields) {
    const value = input[field] ?? "";
    if (typeof value !== "string" || value.length > (field === "message" ? 10000 : 1000)) {
      return Response.json({ error: "Invalid field" }, { status: 400 });
    }
    payload[field] = value.trim();
  }

  if (requiredFields.some((field) => !payload[field]) ||
      payload.name.length > 200 || payload.email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) ||
      !referralSources.includes(payload.referralSource) || !budgets.includes(payload.budget)) {
    return Response.json({ error: "Invalid form data" }, { status: 400 });
  }

  if (payload.company) {
    try {
      const url = new URL(payload.company);
      if (!/^https?:\/\/[^\s]+$/i.test(payload.company) ||
          !["http:", "https:"].includes(url.protocol) || !url.hostname) {
        throw new Error("Invalid website URL");
      }
    } catch {
      return Response.json({ error: "Invalid company URL" }, { status: 400 });
    }
  }

  const webhookUrl = process.env.MAKE_CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return Response.json({ error: "Contact service unavailable" }, { status: 503 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error("Webhook rejected submission");
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Contact service unavailable" }, { status: 502 });
  }
}
