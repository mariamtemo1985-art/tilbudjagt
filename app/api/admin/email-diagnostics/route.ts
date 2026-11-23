import { timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const mask = (value: string) => {
  const [local, domain] = value.split("@");
  if (!domain) return "***";
  return `${local.slice(0, 1)}***@${domain}`;
};

async function resendGet(path: string, key: string) {
  const response = await fetch(`https://api.resend.com${path}`, {
    headers: { Authorization: `Bearer ${key}` },
    cache: "no-store",
  });
  const body = await response.json().catch(() => null);
  return { ok: response.ok, status: response.status, body };
}

export async function GET(request: NextRequest) {
  const expected = process.env.CRON_SECRET ?? "";
  const supplied = request.headers.get("x-cron-secret") ?? "";
  if (
    !expected ||
    supplied.length !== expected.length ||
    !timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))
  ) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ error: "Resend is not configured." }, { status: 503 });

  const email = String(request.nextUrl.searchParams.get("email") || "").trim().toLowerCase();
  const reveal = request.nextUrl.searchParams.get("reveal") === "1";
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const [domains, emails, suppressions] = await Promise.all([
    resendGet("/domains", key),
    resendGet("/emails?limit=100", key),
    resendGet("/suppressions?limit=100", key),
  ]);

  const emailRows = Array.isArray(emails.body?.data) ? emails.body.data : [];
  const welcomeRows = emailRows
    .filter((item: { subject?: string }) => /tilbudjagt|velkommen|vip/i.test(String(item.subject || "")))
    .slice(0, 30)
    .map((item: { id?: string; to?: string[]; subject?: string; created_at?: string; last_event?: string }) => ({
      id: item.id,
      to: Array.isArray(item.to) ? item.to.map(mask) : [],
      subject: item.subject,
      created_at: item.created_at,
      last_event: item.last_event,
    }));

  const suppressionRows = Array.isArray(suppressions.body?.data) ? suppressions.body.data : [];
  const domainRows = Array.isArray(domains.body?.data) ? domains.body.data : [];

  let target: unknown = null;
  if (email) {
    const result = await resendGet(`/suppressions/${encodeURIComponent(email)}`, key);
    target = {
      email: mask(email),
      suppressed: result.ok,
      status: result.status,
      origin: result.ok ? result.body?.origin : null,
      created_at: result.ok ? result.body?.created_at : null,
    };
  }

  let subscriber: unknown = null;
  let recentSubscribers: unknown[] = [];
  if (supabaseUrl && supabaseKey) {
    const headers = { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` };
    if (email) {
      const response = await fetch(
        `${supabaseUrl}/rest/v1/newsletter_subscribers?email=eq.${encodeURIComponent(email)}&select=email,consent_at,source&limit=1`,
        { headers, cache: "no-store" },
      );
      const rows = await response.json().catch(() => []);
      const row = Array.isArray(rows) ? rows[0] : null;
      subscriber = row
        ? { email: reveal ? String(row.email || "") : mask(String(row.email || "")), consent_at: row.consent_at, source: row.source }
        : { email: reveal ? email : mask(email), exists: false };
    }
    const recent = await fetch(
      `${supabaseUrl}/rest/v1/newsletter_subscribers?select=email,consent_at,source&order=consent_at.desc&limit=20`,
      { headers, cache: "no-store" },
    );
    const rows = await recent.json().catch(() => []);
    recentSubscribers = Array.isArray(rows)
      ? rows.map((row: { email?: string; consent_at?: string; source?: string }) => ({
          email: row.email ? (reveal ? row.email : mask(row.email)) : "***",
          consent_at: row.consent_at,
          source: row.source,
        }))
      : [];
  }

  return NextResponse.json({
    ok: domains.ok && emails.ok && suppressions.ok,
    statuses: { domains: domains.status, emails: emails.status, suppressions: suppressions.status },
    errors: {
      domains: domains.ok ? null : domains.body?.message || domains.body?.error?.message || null,
      emails: emails.ok ? null : emails.body?.message || emails.body?.error?.message || null,
      suppressions: suppressions.ok ? null : suppressions.body?.message || suppressions.body?.error?.message || null,
    },
    domains: domainRows.map((item: { name?: string; status?: string; region?: string }) => ({
      name: item.name,
      status: item.status,
      region: item.region,
    })),
    recent_welcome: welcomeRows,
    suppressions_count: suppressionRows.length,
    suppressions: suppressionRows.slice(0, 30).map((item: { email?: string; origin?: string; created_at?: string }) => ({
      email: item.email ? mask(item.email) : "***",
      origin: item.origin,
      created_at: item.created_at,
    })),
    target,
    subscriber,
    recent_subscribers: recentSubscribers,
  });
}
