import { NextRequest, NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body?.email ?? "").trim().toLowerCase();
    const consent = body?.consent === true;

    if (!emailPattern.test(email) || !consent) {
      return NextResponse.json(
        { error: "Valid email and consent are required." },
        { status: 400 },
      );
    }

    const resendKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    if (!resendKey || !from) {
      return NextResponse.json(
        { error: "Email service is not configured yet." },
        { status: 503 },
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (supabaseUrl && serviceKey) {
      const dbResponse = await fetch(`${supabaseUrl}/rest/v1/newsletter_subscribers`, {
        method: "POST",
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates,return=minimal",
        },
        body: JSON.stringify({ email, consent_at: new Date().toISOString(), source: "vip_waitlist" }),
      });
      if (!dbResponse.ok && dbResponse.status !== 409) {
        return NextResponse.json({ error: "Could not save subscription." }, { status: 502 });
      }
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [email],
        subject: "Velkommen til TilbudJagt VIP-listen",
        html: `<div style="font-family:Arial,sans-serif;line-height:1.7;color:#172033"><h2>Velkommen til TilbudJagt</h2><p>Tak fordi du tilmeldte dig vores VIP-interesseliste.</p><p>Dette er en gratis interesseliste uden betaling. Du modtager en ny besked, før et eventuelt betalt medlemskab lanceres.</p><p>Priser og tilbud skal altid kontrolleres hos den oprindelige butik.</p><p>Hvis du ikke selv tilmeldte dig, kan du ignorere denne e-mail.</p><hr><p style="color:#667085">TilbudJagt.dk</p></div>`,
      }),
    });

    if (!emailResponse.ok) {
      return NextResponse.json({ error: "The welcome email could not be sent." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
