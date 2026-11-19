import tls from "node:tls";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.tilbudjagt.dk").replace(/\/+$/, "");
const VERCEL_API = "https://api.vercel.com";
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

type Check = { name: string; ok: boolean; detail: string };
type PageCheck = { path: string; status: number; ms: number; ok: boolean };

function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function dateOnly(d: Date): string {
  return d.toISOString().slice(0, 10);
}

async function fetchJson(url: string, init: RequestInit = {}, timeout = 8000): Promise<any> {
  const res = await fetch(url, { ...init, signal: AbortSignal.timeout(timeout), cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function analytics(path: string, params: Record<string, string>): Promise<any | null> {
  const token = process.env.VERCEL_TOKEN;
  const teamId = process.env.VERCEL_TEAM_ID;
  const projectId = process.env.VERCEL_PROJECT_ID;
  if (!token || !teamId || !projectId) return null;
  const q = new URLSearchParams({ teamId, projectId, ...params });
  try {
    return await fetchJson(`${VERCEL_API}/v1/query/web-analytics/${path}?${q.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    return null;
  }
}

function tlsDaysLeft(host: string): Promise<number | null> {
  return new Promise((resolve) => {
    let settled = false;
    const done = (value: number | null) => {
      if (!settled) {
        settled = true;
        resolve(value);
      }
    };
    const socket = tls.connect({ host, port: 443, servername: host, timeout: 6500 }, () => {
      try {
        const cert = socket.getPeerCertificate();
        socket.end();
        if (!cert?.valid_to) return done(null);
        done(Math.ceil((new Date(cert.valid_to).getTime() - Date.now()) / 86400000));
      } catch {
        done(null);
      }
    });
    socket.on("error", () => done(null));
    socket.on("timeout", () => {
      socket.destroy();
      done(null);
    });
  });
}

async function txtRecords(name: string): Promise<string[]> {
  try {
    const data = await fetchJson(`https://dns.google/resolve?name=${encodeURIComponent(name)}&type=TXT`);
    return (data.Answer || [])
      .map((a: any) => String(a.data || "").replace(/^"|"$/g, ""))
      .filter(Boolean);
  } catch {
    return [];
  }
}

async function pageCheck(path: string): Promise<PageCheck> {
  const started = Date.now();
  try {
    const res = await fetch(SITE + path, {
      redirect: "follow",
      signal: AbortSignal.timeout(7000),
      headers: { "user-agent": "TilbudJagt-Weekly-Monitor/1.0" },
    });
    return { path, status: res.status, ms: Date.now() - started, ok: res.status >= 200 && res.status < 400 };
  } catch {
    return { path, status: 0, ms: Date.now() - started, ok: false };
  }
}

function row(cells: string[]): string {
  return `<tr>${cells.map((c) => `<td style="padding:7px 9px;border-bottom:1px solid #e5e7eb;font-size:13px">${c}</td>`).join("")}</tr>`;
}

function table(headers: string[], rows: string[][], empty = "لا توجد بيانات بعد"): string {
  if (!rows.length) return `<p style="color:#6b7280;font-size:13px">${empty}</p>`;
  return `<table style="width:100%;border-collapse:collapse;margin:8px 0 18px">${row(headers.map((h) => `<b>${h}</b>`))}${rows.map(row).join("")}</table>`;
}

export async function GET(request: Request) {
  const expected = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization") || "";
  if (!expected || auth !== `Bearer ${expected}`) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const since = dateOnly(new Date(now.getTime() - WEEK_MS));
  const until = dateOnly(now);
  const dateRange = { since, until };

  const [counts, byRoute, byDay, byReferrer, byCountry, home, tlsDays, spfRoot, dmarcRoot, spfSend, dkimSend] =
    await Promise.all([
      analytics("visits/count", dateRange),
      analytics("visits/aggregate", { ...dateRange, by: "route", limit: "8" }),
      analytics("visits/aggregate", { ...dateRange, by: "day" }),
      analytics("visits/aggregate", { ...dateRange, by: "referrerHostname", limit: "5" }),
      analytics("visits/aggregate", { ...dateRange, by: "country", limit: "5" }),
      fetch(SITE, {
        redirect: "follow",
        signal: AbortSignal.timeout(7000),
        headers: { "user-agent": "TilbudJagt-Weekly-Monitor/1.0" },
      }).catch(() => null),
      tlsDaysLeft(new URL(SITE).hostname),
      txtRecords("tilbudjagt.dk"),
      txtRecords("_dmarc.tilbudjagt.dk"),
      txtRecords("send.tilbudjagt.dk"),
      txtRecords("resend._domainkey.send.tilbudjagt.dk"),
    ]);

  const pages = await Promise.all(["/", "/butikker", "/produkter", "/guides", "/robots.txt", "/sitemap.xml", "/ads.txt", "/app-ads.txt"].map(pageCheck));

  const adminStarted = Date.now();
  let adminStatus = 0;
  try {
    const adminRes = await fetch(`${SITE}/api/admin/stores`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{}",
      signal: AbortSignal.timeout(7000),
    });
    adminStatus = adminRes.status;
  } catch {
    adminStatus = 0;
  }

  const headerMap = new Map<string, string>();
  home?.headers.forEach((value, key) => headerMap.set(key.toLowerCase(), value));
  const securityHeaders: Check[] = [
    { name: "HSTS", ok: !!headerMap.get("strict-transport-security"), detail: headerMap.get("strict-transport-security") || "غير موجود" },
    { name: "CSP", ok: !!headerMap.get("content-security-policy"), detail: headerMap.get("content-security-policy") ? "موجود" : "غير موجود" },
    { name: "X-Content-Type-Options", ok: headerMap.get("x-content-type-options") === "nosniff", detail: headerMap.get("x-content-type-options") || "غير موجود" },
    { name: "Referrer-Policy", ok: !!headerMap.get("referrer-policy"), detail: headerMap.get("referrer-policy") || "غير موجود" },
    { name: "Permissions-Policy", ok: !!headerMap.get("permissions-policy"), detail: headerMap.get("permissions-policy") ? "موجود" : "غير موجود" },
  ];

  const dnsChecks: Check[] = [
    { name: "SPF للنطاق", ok: spfRoot.some((x) => x.toLowerCase().startsWith("v=spf1")), detail: spfRoot.find((x) => x.toLowerCase().startsWith("v=spf1")) || "غير موجود" },
    { name: "DMARC", ok: dmarcRoot.some((x) => x.toLowerCase().startsWith("v=dmarc1")), detail: dmarcRoot.find((x) => x.toLowerCase().startsWith("v=dmarc1")) || "غير موجود" },
    { name: "SPF للإرسال", ok: spfSend.some((x) => x.toLowerCase().startsWith("v=spf1")), detail: spfSend.find((x) => x.toLowerCase().startsWith("v=spf1")) || "غير موجود" },
    { name: "DKIM Resend", ok: dkimSend.some((x) => /p=/i.test(x)), detail: dkimSend.length ? "موجود" : "غير موجود" },
    { name: "حماية لوحة الإدارة", ok: adminStatus === 401, detail: adminStatus === 401 ? "تطلب كلمة سر (401)" : `الحالة ${adminStatus || "غير متاحة"}` },
  ];

  const visits = counts?.data || { visitors: 0, pageviews: 0 };
  const routeRows = (byRoute?.data || []).map((r: any) => [esc(r.route || r.requestPath || "—"), esc(r.pageviews ?? 0), esc(r.visitors ?? 0)]);
  const dayRows = (byDay?.data || []).map((r: any) => [esc((r.timestamp || "").slice(0, 10) || "—"), esc(r.pageviews ?? 0), esc(r.visitors ?? 0)]);
  const referrerRows = (byReferrer?.data || []).map((r: any) => [esc(r.referrerHostname || "—"), esc(r.pageviews ?? 0), esc(r.visitors ?? 0)]);
  const countryRows = (byCountry?.data || []).map((r: any) => [esc(r.country || "—"), esc(r.pageviews ?? 0), esc(r.visitors ?? 0)]);

  const pageRows = pages.map((p) => [`<span dir="ltr">${esc(p.path)}</span>`, p.status ? esc(p.status) : "خطأ", `${esc(p.ms)} ms`, p.ok ? "سليم" : "يحتاج فحص"]);
  const securityRows = securityHeaders.map((c) => [esc(c.name), c.ok ? "سليم" : "ناقص", esc(c.detail).slice(0, 160)]);
  const dnsRows = dnsChecks.map((c) => [esc(c.name), c.ok ? "سليم" : "يحتاج فحص", esc(c.detail).slice(0, 160)]);

  const allPagesOk = pages.every((p) => p.ok);
  const allHeadersOk = securityHeaders.every((c) => c.ok);
  const allDnsOk = dnsChecks.every((c) => c.ok);
  const overall = allPagesOk && allHeadersOk && allDnsOk ? "سليم" : "يحتاج متابعة";

  const html = `<!doctype html>
<html dir="rtl" lang="ar"><head><meta charset="utf-8"><title>TilbudJagt التقرير الأسبوعي</title></head>
<body style="margin:0;background:#f3f4f6;font-family:Arial,Tahoma,sans-serif;color:#111827">
<div style="max-width:720px;margin:0 auto;padding:22px">
  <div style="background:#0f766e;color:#fff;border-radius:14px;padding:18px 20px">
    <div style="font-size:12px;opacity:.85">TilbudJagt.dk</div>
    <h1 style="margin:6px 0 4px;font-size:21px">التقرير الأسبوعي: الأمان والزيارات</h1>
    <div style="font-size:13px;opacity:.9">الفترة ${esc(since)} إلى ${esc(until)} · الحالة العامة: <b>${overall}</b></div>
  </div>
  <div style="background:#fff;border-radius:14px;padding:18px 20px;margin-top:14px">
    <h2 style="font-size:17px;margin:0 0 10px">الزيارات</h2>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      <div style="flex:1;min-width:130px;background:#ecfdf5;border-radius:10px;padding:12px"><div style="font-size:12px;color:#047857">الزوار</div><div style="font-size:26px;font-weight:bold">${esc(visits.visitors ?? 0)}</div></div>
      <div style="flex:1;min-width:130px;background:#eff6ff;border-radius:10px;padding:12px"><div style="font-size:12px;color:#1d4ed8">مشاهدات الصفحات</div><div style="font-size:26px;font-weight:bold">${esc(visits.pageviews ?? 0)}</div></div>
    </div>
    <h3 style="font-size:14px;margin:18px 0 4px">أكثر الصفحات زيارة</h3>
    ${table(["الصفحة", "مشاهدات", "زوار"], routeRows)}
    <h3 style="font-size:14px;margin:18px 0 4px">الزيارات اليومية</h3>
    ${table(["اليوم", "مشاهدات", "زوار"], dayRows)}
    <h3 style="font-size:14px;margin:18px 0 4px">مصادر الزيارات</h3>
    ${table(["المصدر", "مشاهدات", "زوار"], referrerRows)}
    <h3 style="font-size:14px;margin:18px 0 4px">الدول</h3>
    ${table(["الدولة", "مشاهدات", "زوار"], countryRows)}
  </div>
  <div style="background:#fff;border-radius:14px;padding:18px 20px;margin-top:14px">
    <h2 style="font-size:17px;margin:0 0 10px">فحص الصفحات</h2>
    ${table(["الصفحة", "الحالة", "السرعة", "النتيجة"], pageRows)}
    <h2 style="font-size:17px;margin:18px 0 10px">رؤوس الأمان</h2>
    ${table(["الرأس", "النتيجة", "التفصيل"], securityRows)}
    <h2 style="font-size:17px;margin:18px 0 10px">البريد و DNS والحماية</h2>
    ${table(["الفحص", "النتيجة", "التفصيل"], dnsRows)}
    <p style="font-size:13px;color:#374151">شهادة SSL: <b>${tlsDays === null ? "تعذر الفحص" : `${esc(tlsDays)} يومًا متبقيًا`}</b></p>
  </div>
  <p style="font-size:12px;color:#6b7280;text-align:center;margin:16px 0">تقرير تلقائي كل يوم إثنين من TilbudJagt.dk. لا تشارك هذا البريد علنًا.</p>
</div></body></html>`;

  // Reports go only to the official site inbox; never to a personal address.
  const to = ["support@tilbudjagt.dk"];

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY || ""}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || "TilbudJagt <support@tilbudjagt.dk>",
      to,
      subject: `TilbudJagt – التقرير الأسبوعي ${until}`,
      html,
    }),
    signal: AbortSignal.timeout(9000),
  }).catch(() => null);

  if (!resendRes?.ok) {
    return Response.json({ ok: false, error: "Report generated but email could not be sent", overall, to }, { status: 502 });
  }

  return Response.json({ ok: true, overall, to, visits, pagesOk: allPagesOk, headersOk: allHeadersOk, dnsOk: allDnsOk });
}
