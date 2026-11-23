import { createHash, createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { clientIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const secret = () => process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.RESEND_API_KEY || "";
const tokenFor = (email: string) => {
  const payload = `${email}|${Date.now()}`;
  const sig = createHmac("sha256", secret()).update(payload).digest("base64url");
  return Buffer.from(`${payload}|${sig}`).toString("base64url");
};
const emailFromToken = (token: string) => {
  try {
    const raw = Buffer.from(token, "base64url").toString();
    const cut = raw.lastIndexOf("|"); const payload = raw.slice(0, cut); const sig = raw.slice(cut + 1);
    const split = payload.lastIndexOf("|"); const email = payload.slice(0, split);
    const issued = Number(payload.slice(split + 1));
    const expected = createHmac("sha256", secret()).update(payload).digest("base64url");
    const a = Buffer.from(sig), b = Buffer.from(expected);
    if (!emailPattern.test(email) || Date.now() - issued > 31536000000 || a.length !== b.length || !timingSafeEqual(a, b)) return null;
    return email;
  } catch { return null; }
};
const welcomeIdempotencyKey = (email: string, consentAt: string) =>
  `welcome-${createHash("sha256").update(`${email}|${consentAt}`).digest("hex")}`;

async function subscriberExists(url: string, key: string, email: string): Promise<boolean | null> {
  try {
    const response = await fetch(
      `${url}/rest/v1/newsletter_subscribers?email=eq.${encodeURIComponent(email)}&select=email&limit=1`,
      {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        cache: "no-store",
      },
    );
    if (!response.ok) return null;
    const rows = await response.json().catch(() => null);
    return Array.isArray(rows) && rows.length > 0;
  } catch {
    return null;
  }
}

const page = `<!doctype html><html lang="da"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Afmelding bekræftet | TilbudJagt</title><style>body{margin:0;background:#f5f7fb;color:#172033;font-family:Arial,sans-serif;min-height:100vh;display:grid;place-items:center}.card{width:min(92%,520px);box-sizing:border-box;background:#fff;border:1px solid #e6eaf0;border-radius:24px;padding:42px 30px;text-align:center;box-shadow:0 14px 40px #17203318}.icon{width:68px;height:68px;margin:0 auto 20px;border-radius:50%;display:grid;place-items:center;background:#e8f8ef;color:#16834b;font-size:38px;font-weight:700}h1{margin:0 0 14px;font-size:28px}p{font-size:17px;line-height:1.7;color:#526071;margin:10px 0}.note{margin:24px 0;padding:14px 16px;background:#f3f7ff;border-radius:14px;font-size:15px;color:#40516a}a{display:inline-block;margin-top:14px;padding:13px 22px;background:#1769e0;color:#fff;text-decoration:none;border-radius:12px;font-weight:700}small{display:block;margin-top:24px;color:#8792a2}</style></head><body><main class="card"><div class="icon">✓</div><h1>Din afmelding er bekræftet</h1><p>Du er nu afmeldt TilbudJagt VIP-listen.</p><p>Du vil ikke modtage flere VIP-beskeder fra os.</p><div class="note">En bekræftelse er sendt til din e-mailadresse. Hvis du senere ønsker at tilmelde dig igen, kan du altid besøge TilbudJagt.</div><a href="https://www.tilbudjagt.dk/">Tilbage til TilbudJagt</a><small>TilbudJagt.dk · Tak fordi du var med</small></main></body></html>`;

export async function GET(request: NextRequest) {
  const email = emailFromToken(request.nextUrl.searchParams.get("token") || "");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL; const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!email) return new NextResponse("Ugyldigt eller udløbet afmeldingslink.", { status: 400 });
  if (!url || !key) return new NextResponse("Afmelding er midlertidigt utilgængelig.", { status: 503 });
  const deleted = await fetch(`${url}/rest/v1/newsletter_subscribers?email=eq.${encodeURIComponent(email)}`, { method: "DELETE", headers: { apikey: key, Authorization: `Bearer ${key}`, Prefer: "return=representation" } });
  if (!deleted.ok) return new NextResponse("Afmelding kunne ikke gennemføres.", { status: 502 });
  const removed = await deleted.json().catch(() => []);
  if (!Array.isArray(removed) || removed.length === 0) return new NextResponse(page, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  const resend = process.env.RESEND_API_KEY; const from = process.env.RESEND_FROM_EMAIL;
  if (resend && from) await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${resend}`, "Content-Type": "application/json" }, body: JSON.stringify({ from, to: [email], subject: "Du er afmeldt TilbudJagt VIP-listen", html: `<h2>Din afmelding er bekræftet</h2><p>Du er nu afmeldt TilbudJagt VIP-listen og vil ikke modtage flere VIP-beskeder.</p><p>Du kan altid tilmelde dig igen på <a href="https://www.tilbudjagt.dk/">TilbudJagt.dk</a>.</p>` }) });
  return new NextResponse(page, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}

export async function POST(request: NextRequest) {
  const limited = rateLimit(`newsletter:${clientIp(request)}`, 5, 10 * 60 * 1000);
  if (!limited.ok) return tooManyRequests(limited.retryAfter);
  try {
    if (Number(request.headers.get("content-length") || 0) > 5_000) {
      return NextResponse.json({ error: "Invalid request." }, { status: 413 });
    }
    const body = await request.json();
    const email = String(body?.email || "").trim().toLowerCase().slice(0, 254);
    if (!emailPattern.test(email) || body?.consent !== true) {
      return NextResponse.json({ error: "Valid email and consent are required." }, { status: 400 });
    }
    const consentAt = new Date().toISOString();

    const resend = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    if (!resend || !from) {
      return NextResponse.json({ error: "Email service is not configured yet." }, { status: 503 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    let inserted = false;
    if (url && key) {
      const existing = await subscriberExists(url, key, email);
      if (existing === true) {
        return NextResponse.json({ ok: true, alreadySubscribed: true });
      }

      const saved = await fetch(`${url}/rest/v1/newsletter_subscribers?on_conflict=email`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          Prefer: "resolution=ignore-duplicates,return=representation",
        },
        body: JSON.stringify({
          email,
          consent_at: consentAt,
          source: "vip_waitlist",
        }),
      });
      if (saved.status === 409) {
        return NextResponse.json({ ok: true, alreadySubscribed: true });
      }
      if (!saved.ok) {
        return NextResponse.json({ error: "Could not save subscription." }, { status: 502 });
      }
      const savedRows = await saved.json().catch(() => null);
      if (Array.isArray(savedRows) && savedRows.length === 0) {
        return NextResponse.json({ ok: true, alreadySubscribed: true });
      }
      inserted = Array.isArray(savedRows) ? savedRows.length > 0 : true;
    }

    const unsubscribe = `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.tilbudjagt.dk"}/api/newsletter?token=${tokenFor(email)}`;
    const sent = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resend}`,
        "Content-Type": "application/json",
        "Idempotency-Key": welcomeIdempotencyKey(email, consentAt),
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject: "Velkommen til TilbudJagt VIP-listen",
        html: `<h2>Velkommen til TilbudJagt</h2><p>Tak fordi du tilmeldte dig vores gratis VIP-interesseliste.</p><p><a href="${unsubscribe}">Afmeld VIP-listen</a></p>`,
      }),
    });
    if (!sent.ok) {
      if (inserted && url && key) {
        await fetch(`${url}/rest/v1/newsletter_subscribers?email=eq.${encodeURIComponent(email)}`, {
          method: "DELETE",
          headers: { apikey: key, Authorization: `Bearer ${key}` },
        }).catch(() => undefined);
      }
      return NextResponse.json({ error: "The welcome email could not be sent." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const expected = process.env.CRON_SECRET ?? "";
  const supplied = request.headers.get("x-cron-secret") ?? "";
  if (
    !expected ||
    supplied.length !== expected.length ||
    !timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))
  ) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const email = String(request.nextUrl.searchParams.get("email") || "").trim().toLowerCase().slice(0, 254);
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "Subscription store is not configured." }, { status: 503 });
  }

  const deleted = await fetch(
    `${url}/rest/v1/newsletter_subscribers?email=eq.${encodeURIComponent(email)}`,
    {
      method: "DELETE",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: "return=representation",
      },
    },
  );
  if (!deleted.ok) {
    return NextResponse.json({ error: "Could not remove subscriber." }, { status: 502 });
  }
  const rows = await deleted.json().catch(() => []);
  return NextResponse.json({ ok: true, deleted: Array.isArray(rows) ? rows.length : 0 });
}
