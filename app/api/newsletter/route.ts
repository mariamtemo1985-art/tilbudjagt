import { createHmac, timingSafeEqual } from "crypto";

import { NextRequest, NextResponse } from "next/server";



const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const tokenSecret = () => process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.RESEND_API_KEY || "";



function makeToken(email: string) {
  
  const payload = `${email}|${Date.now()}`;
  
  const signature = createHmac("sha256", tokenSecret()).update(payload).digest("base64url");
  
  return Buffer.from(`${payload}|${signature}`).toString("base64url");
  
}

function readToken(token: string) {
  
  try {
    
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    
    const end = decoded.lastIndexOf("|"); const signature = decoded.slice(end + 1); const payload = decoded.slice(0, end);
    
    const split = payload.lastIndexOf("|"); const email = payload.slice(0, split); const issuedAt = Number(payload.slice(split + 1));
    
    if (!emailPattern.test(email) || !Number.isFinite(issuedAt) || Date.now() - issuedAt > 1000 * 60 * 60 * 24 * 365) return null;
    
    const expected = createHmac("sha256", tokenSecret()).update(payload).digest("base64url");
    
    const a = Buffer.from(signature), b = Buffer.from(expected); return a.length === b.length && timingSafeEqual(a, b) ? email : null;
    
  } catch { return null; }
  
}



export async function GET(request: NextRequest) {
  
  const email = readToken(request.nextUrl.searchParams.get("token") || "");
  
  if (!email) return new NextResponse("Ugyldigt eller udløbet afmeldingslink.", { status: 400 });
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL; const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!url || !key) return new NextResponse("Afmelding er midlertidigt utilgængelig.", { status: 503 });
  
  const response = await fetch(`${url}/rest/v1/newsletter_subscribers?email=eq.${encodeURIComponent(email)}`, { method: "DELETE", headers: { apikey: key, Authorization: `Bearer ${key}` } });
  
  if (!response.ok) return new NextResponse("Afmelding kunne ikke gennemføres.", { status: 502 });
  
  const resendKey = process.env.RESEND_API_KEY; const from = process.env.RESEND_FROM_EMAIL;
  
  if (resendKey && from) await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from, to: [email], subject: "Du er afmeldt TilbudJagt VIP-listen", html: `<div style="font-family:Arial,sans-serif;line-height:1.7;color:#172033"><h2>Din afmelding er bekræftet</h2><p>Du er nu afmeldt TilbudJagt VIP-listen og vil ikke modtage flere VIP-beskeder.</p><p>Hvis du senere ønsker at tilmelde dig igen, kan du besøge <a href="https://www.tilbudjagt.dk/">TilbudJagt.dk</a>.</p><hr><p style="color:#667085">TilbudJagt.dk</p></div>` }) });
  
  return new NextResponse(`<!doctype html><html lang="da"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Afmelding bekræftet | TilbudJagt</title><style>body{margin:0;background:#f5f7fb;color:#172033;font-family:Arial,sans-serif;min-height:100vh;display:grid;place-items:center}.card{width:min(92%,520px);box-sizing:border-box;background:#fff;border:1px solid #e6eaf0;border-radius:24px;padding:42px 30px;text-align:center;box-shadow:0 14px 40px #17203318}.icon{width:68px;height:68px;margin:0 auto 20px;border-radius:50%;display:grid;place-items:center;background:#e8f8ef;color:#16834b;font-size:38px;font-weight:700}h1{margin:0 0 14px;font-size:28px}p{font-size:17px;line-height:1.7;color:#526071;margin:10px 0}.note{margin:24px 0;padding:14px 16px;background:#f3f7ff;border-radius:14px;font-size:15px;color:#40516a}a{display:inline-block;margin-top:14px;padding:13px 22px;background:#1769e0;color:#fff;text-decoration:none;border-radius:12px;font-weight:700}small{display:block;margin-top:24px;color:#8792a2}</style></head><body><main class="card"><div class="icon">✓</div><h1>Din afmelding er bekræftet</h1><p>Du er nu afmeldt TilbudJagt VIP-listen.</p><p>Du vil ikke modtage flere VIP-beskeder fra os.</p><div class="note">En bekræftelse er sendt til din e-mailadresse. Hvis du senere ønsker at tilmelde dig igen, kan du altid besøge TilbudJagt.</div><a href="https://www.tilbudjagt.dk/">Tilbage til TilbudJagt</a><small>TilbudJagt.dk · Tak fordi du var med</small></main></body></html>`, { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } });
  
}



export async function POST(request: NextRequest) {
  
  try {
    
    const body = await request.json(); const email = String(body?.email ?? "").trim().toLowerCase();
    
    if (!emailPattern.test(email) || body?.consent !== true) return NextResponse.json({ error: "Valid email and consent are required." }, { status: 400 });
    
    const resendKey = process.env.RESEND_API_KEY; const from = process.env.RESEND_FROM_EMAIL;
    
    if (!resendKey || !from) return NextResponse.json({ error: "Email service is not configured yet." }, { status: 503 });
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (supabaseUrl && serviceKey) { const dbResponse = await fetch(`${supabaseUrl}/rest/v1/newsletter_subscribers`, { method: "POST", headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json", Prefer: "resolution=merge-duplicates,return=minimal" }, body: JSON.stringify({ email, consent_at: new Date().toISOString(), source: "vip_waitlist" }) }); if (!dbResponse.ok && dbResponse.status !== 409) return NextResponse.json({ error: "Could not save subscription." }, { status: 502 }); }
    
    const unsubscribeUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.tilbudjagt.dk"}/api/newsletter?token=${makeToken(email)}`;
    
    const emailResponse = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from, to: [email], subject: "Velkommen til TilbudJagt VIP-listen", html: `<div style="font-family:Arial,sans-serif;line-height:1.7;color:#172033"































