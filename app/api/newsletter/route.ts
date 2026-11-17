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
    
    const end = decoded.lastIndexOf("|");
    
    const signature = decoded.slice(end + 1);
    
    const payload = decoded.slice(0, end);
    
    const split = payload.lastIndexOf("|");
    
    const email = payload.slice(0, split);
    
    const issuedAt = Number(payload.slice(split + 1));
    
    if (!emailPattern.test(email) || !Number.isFinite(issuedAt) || Date.now() - issuedAt > 1000 * 60 * 60 * 24 * 365) return null;
    
    const expected = createHmac("sha256", tokenSecret()).update(payload).digest("base64url");
    
    const a = Buffer.from(signature), b = Buffer.from(expected);
    
    return a.length === b.length && timingSafeEqual(a, b) ? email : null;
    
  } catch { return null; }
  
}



export async function GET(request: NextRequest) {
  
  const email = readToken(request.nextUrl.searchParams.get("token") || "");
  
  if (!email) return new NextResponse("Ugyldigt eller udløbet afmeldingslink.", { status: 400 });
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!url || !key) return new NextResponse("Afmelding er midlertidigt utilgængelig.", { status: 503 });
  
  const response = await fetch(`${url}/rest/v1/newsletter_subscribers?email=eq.${encodeURIComponent(email)}`, { method: "DELETE", headers: { apikey: key, Authorization: `Bearer ${key}` } });
  
  if (!response.ok) return new NextResponse("Afmelding kunne ikke gennemføres.", { status: 502 });
  
  return new NextResponse("Du er nu afmeldt TilbudJagt VIP-listen.", { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  
}



export async function POST(request: NextRequest) {
  
  try {
    
    const body = await request.json();
    
    const email = String(body?.email ?? "").trim().toLowerCase();
    
    if (!emailPattern.test(email) || body?.consent !== true) return NextResponse.json({ error: "Valid email and consent are required." }, { status: 400 });
    
    const resendKey = process.env.RESEND_API_KEY;
    
    const from = process.env.RESEND_FROM_EMAIL;
    
    if (!resendKey || !from) return NextResponse.json({ error: "Email service is not configured yet." }, { status: 503 });
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (supabaseUrl && serviceKey) {
      
      const dbResponse = await fetch(`${supabaseUrl}/rest/v1/newsletter_subscribers`, { method: "POST", headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json", Prefer: "resolution=merge-duplicates,return=minimal" }, body: JSON.stringify({ email, consent_at: new Date().toISOString(), source: "vip_waitlist" }) });
      
      if (!dbResponse.ok && dbResponse.status !== 409) return NextResponse.json({ error: "Could not save subscription." }, { status: 502 });
      
    }
    
    const unsubscribeUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.tilbudjagt.dk"}/api/newsletter?token=${makeToken(email)}`;
    
    const emailResponse = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from, to: [email], subject: "Velkommen til TilbudJagt VIP-listen", html: `<div style="font-family:Arial,sans-serif;line-height:1.7;color:#172033"><h2>Velkommen til TilbudJagt</h2><p>Tak fordi du tilmeldte dig vores VIP-interesseliste.</p><p>Dette er en gratis interesseliste uden betaling. Du modtager en ny besked, før et eventuelt betalt medlemskab lanceres.</p><p>Priser og tilbud skal altid kontrolleres hos den oprindelige butik.</p><p><a href="${unsubscribeUrl}">Afmeld VIP-listen</a></p><hr><p style="color:#667085">TilbudJagt.dk</p></div>` }) });
    
    if (!emailResponse.ok) return NextResponse.json({ error: "The welcome email could not be sent." }, { status: 502 });
    
    return NextResponse.json({ ok: true });
    
  } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  
}















































