import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { createClient } from "@supabase/supabase-js"
import { rateLimit } from "@/lib/rate-limit"
import { checkVpn } from "@/lib/ip-check"
import {
  checkMethod, checkContentType, checkOrigin, checkBotUA,
  parseBody, stripControlChars, apiSecurityHeaders, getClientIp,
} from "@/lib/api-security"

const resend   = new Resend(process.env.RESEND_API_KEY)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
)

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#039;")
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Bigger than the contact form's 10KB — a base64 PNG signature is sizable.
const MAX_BODY = 600_000 // ~600KB

const VALID_PROJECT_TYPES = ["New website", "Redesign existing site", "E-commerce store", "Landing page", "Web app", "Other"]

export async function GET()    { return NextResponse.json({ error: "Method not allowed" }, { status: 405 }) }
export async function PUT()    { return NextResponse.json({ error: "Method not allowed" }, { status: 405 }) }
export async function DELETE() { return NextResponse.json({ error: "Method not allowed" }, { status: 405 }) }

export async function POST(req: NextRequest) {
  const headers = apiSecurityHeaders()

  const methodErr = checkMethod(req, ["POST"])
  if (methodErr) return methodErr
  const ctErr = checkContentType(req)
  if (ctErr) return ctErr
  const originErr = checkOrigin(req)
  if (originErr) return originErr
  const botErr = checkBotUA(req)
  if (botErr) return botErr

  const ip = getClientIp(req)
  const { allowed, retryAfter } = rateLimit(`sign:${ip}`, 5, 60 * 60 * 1000)
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429, headers: { ...headers, "Retry-After": String(retryAfter) } }
    )
  }

  // Server-side VPN/proxy enforcement. The client-side modal is the friendly
  // first line of defense; this is the wall behind it that catches anyone who
  // disables JS or otherwise tries to bypass the UI block. Result is cached
  // per-IP for 10 min so this doesn't double-spend our proxycheck.io quota.
  const vpnCheck = await checkVpn(ip)
  if (vpnCheck.vpn) {
    return NextResponse.json(
      { error: "VPN, proxy, or anonymizing service detected. Please disable it and try again." , vpn: true },
      { status: 403, headers }
    )
  }

  // Custom body-size check because signature payloads are bigger than the
  // shared parseBody helper's 10KB cap allows.
  const contentLength = Number(req.headers.get("content-length") ?? 0)
  if (contentLength > MAX_BODY) {
    return NextResponse.json({ error: "Request too large" }, { status: 413, headers })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400, headers })
  }

  // Honeypot — silently succeed
  if (body.website) return NextResponse.json({ success: true }, { headers })

  const str = (v: unknown, max: number) =>
    stripControlChars(typeof v === "string" ? v.slice(0, max) : "")

  const token               = str(body.token, 256)
  const client_name         = str(body.client_name, 200)
  const business_name       = str(body.business_name, 200)
  const client_email        = str(body.client_email, 254)
  const project_type        = str(body.project_type, 100)
  const total_amount_raw    = str(body.total_amount, 32)
  const deposit_amount_raw  = str(body.deposit_amount, 32)
  const project_description = str(body.project_description, 5000)
  const terms_version       = str(body.terms_version, 32)
  const signed_at           = str(body.signed_at, 64)
  const signature_data_url  = typeof body.signature_data_url === "string" ? body.signature_data_url.slice(0, 500_000) : ""

  if (!token || token.length < 32) {
    return NextResponse.json({ error: "Invalid signing link" }, { status: 400, headers })
  }
  if (!client_name || !business_name) {
    return NextResponse.json({ error: "Name and business required" }, { status: 400, headers })
  }
  if (!client_email || !EMAIL_RE.test(client_email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400, headers })
  }
  if (project_type && !VALID_PROJECT_TYPES.includes(project_type)) {
    return NextResponse.json({ error: "Invalid project type" }, { status: 400, headers })
  }
  if (!signature_data_url.startsWith("data:image/png;base64,")) {
    return NextResponse.json({ error: "Signature missing or invalid" }, { status: 400, headers })
  }

  const total_amount   = parseFloat(total_amount_raw)   || null
  const deposit_amount = parseFloat(deposit_amount_raw) || null

  const record = {
    token,
    client_name,
    business_name,
    client_email,
    project_type,
    total_amount,
    deposit_amount,
    project_description,
    signature_data_url,
    terms_version,
    ip_address: ip,
    user_agent: (req.headers.get("user-agent") ?? "").slice(0, 500),
    signed_at: signed_at || new Date().toISOString(),
  }

  try {
    await supabase.from("signed_contracts").insert(record)
  } catch {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503, headers })
  }

  // Build the contract email — both admin and client get it
  const niceDate = new Date(record.signed_at).toLocaleString("en-US", {
    year: "numeric", month: "long", day: "numeric",
    hour: "numeric", minute: "2-digit", timeZoneName: "short",
  })

  const amountLine = total_amount !== null
    ? `<p style="margin:0 0 6px;font-size:14px;color:#444;"><strong style="color:#0d0c0a;">Total project cost:</strong> $${total_amount.toFixed(2)}</p>
       <p style="margin:0 0 6px;font-size:14px;color:#444;"><strong style="color:#0d0c0a;">Deposit (due now):</strong> $${(deposit_amount ?? 0).toFixed(2)}</p>`
    : ""

  const html = `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f4f4f4;font-family:'Inter',Arial,sans-serif;">
    <div style="max-width:640px;margin:0 auto;padding:40px 24px;">
      <h1 style="font-size:22px;font-weight:900;color:#0d0c0a;margin:0 0 6px;">NexaWeb · Signed Project Agreement</h1>
      <p style="font-size:12px;color:#666;margin:0 0 24px;">This email confirms a signed contract between NexaWeb and the client below.</p>

      <div style="background:#ffffff;border-radius:12px;padding:24px;border:1px solid #e5e5e5;margin-bottom:18px;">
        <h2 style="font-size:14px;font-weight:800;color:#0d0c0a;margin:0 0 10px;letter-spacing:0.06em;text-transform:uppercase;">Client</h2>
        <p style="margin:0 0 6px;font-size:14px;color:#444;"><strong style="color:#0d0c0a;">Name:</strong> ${escapeHtml(client_name)}</p>
        <p style="margin:0 0 6px;font-size:14px;color:#444;"><strong style="color:#0d0c0a;">Business:</strong> ${escapeHtml(business_name)}</p>
        <p style="margin:0;font-size:14px;color:#444;"><strong style="color:#0d0c0a;">Email:</strong> <a href="mailto:${escapeHtml(client_email)}" style="color:#1447e6;">${escapeHtml(client_email)}</a></p>
      </div>

      <div style="background:#ffffff;border-radius:12px;padding:24px;border:1px solid #e5e5e5;margin-bottom:18px;">
        <h2 style="font-size:14px;font-weight:800;color:#0d0c0a;margin:0 0 10px;letter-spacing:0.06em;text-transform:uppercase;">Project</h2>
        ${project_type ? `<p style="margin:0 0 6px;font-size:14px;color:#444;"><strong style="color:#0d0c0a;">Type:</strong> ${escapeHtml(project_type)}</p>` : ""}
        ${amountLine}
        ${project_description ? `<p style="margin:8px 0 0;font-size:14px;color:#444;"><strong style="color:#0d0c0a;">Description:</strong><br/>${escapeHtml(project_description).replace(/\n/g, "<br/>")}</p>` : ""}
      </div>

      <div style="background:#ffffff;border-radius:12px;padding:24px;border:1px solid #e5e5e5;margin-bottom:18px;">
        <h2 style="font-size:14px;font-weight:800;color:#0d0c0a;margin:0 0 10px;letter-spacing:0.06em;text-transform:uppercase;">Signature</h2>
        <div style="background:#070b18;border-radius:8px;padding:14px;text-align:center;">
          <img src="${signature_data_url}" alt="Client signature" style="max-width:100%;height:auto;display:inline-block;" />
        </div>
        <p style="margin:14px 0 4px;font-size:13px;color:#0d0c0a;"><strong>Signed by:</strong> ${escapeHtml(client_name)}</p>
        <p style="margin:0;font-size:13px;color:#666;"><strong>Date:</strong> ${escapeHtml(niceDate)}</p>
        <p style="margin:0;font-size:12px;color:#888;"><strong>IP:</strong> ${escapeHtml(ip)} &middot; <strong>Terms version:</strong> ${escapeHtml(terms_version || "—")}</p>
      </div>

      <div style="background:#ffffff;border-radius:12px;padding:24px;border:1px solid #e5e5e5;">
        <h2 style="font-size:14px;font-weight:800;color:#0d0c0a;margin:0 0 14px;letter-spacing:0.06em;text-transform:uppercase;">Terms Agreed To</h2>
        <p style="margin:0 0 14px;font-size:12px;color:#888;">The client read and signed the version below. Full text available at <a href="https://nexaweb-iota.vercel.app/terms" style="color:#1447e6;">nexaweb-iota.vercel.app/terms</a>.</p>
        ${TERMS_TEXT}
      </div>

      <p style="margin:24px 0 0;font-size:11px;color:#999;text-align:center;">
        Signing token: ${escapeHtml(token.slice(0, 12))}…
      </p>
    </div></body></html>`

  try {
    // To admin — with reply-to set to the client so you can reply directly
    await resend.emails.send({
      from: "NexaWeb <onboarding@resend.dev>",
      to: "mynexaweb@gmail.com",
      replyTo: client_email,
      subject: `Signed: ${business_name} — ${client_name}`,
      html,
    })
    // To client — copy of what they signed
    await resend.emails.send({
      from: "NexaWeb <onboarding@resend.dev>",
      to: client_email,
      subject: "Your signed NexaWeb project agreement",
      html,
    })
  } catch {
    // Saved to DB; email failure shouldn't fail the response
  }

  return NextResponse.json({ success: true }, { headers })
}

// The signed terms text, rendered as a list inside the contract email so the
// recipient can see exactly what was agreed to without leaving their inbox.
const TERMS_TEXT = `
  <div style="font-size:12px;color:#444;line-height:1.65;">
    <p style="margin:0 0 10px;"><strong style="color:#0d0c0a;">1. Acceptance of Terms.</strong> By submitting an inquiry, paying a deposit, or otherwise engaging our services, Client agrees to be bound by these Terms.</p>
    <p style="margin:0 0 10px;"><strong style="color:#0d0c0a;">2. Services.</strong> NexaWeb designs and develops websites; project scope confirmed in writing before work begins. Client provides all content.</p>
    <p style="margin:0 0 10px;"><strong style="color:#0d0c0a;">3. Your Responsibilities.</strong> Client warrants ownership/right to use all content provided, and agrees not to supply illegal or infringing material.</p>
    <p style="margin:0 0 10px;"><strong style="color:#0d0c0a;">4. Payment.</strong> 50% deposit before work begins; 50% on completion. Late balances over 14 days pause work.</p>
    <p style="margin:0 0 10px;"><strong style="color:#0d0c0a;">5. Refunds.</strong> Full deposit refund before work begins; once started, deposit is earned. Pro-rated refund if NexaWeb fails to deliver agreed scope.</p>
    <p style="margin:0 0 10px;"><strong style="color:#0d0c0a;">6. Revisions.</strong> Up to 2 rounds of revisions included; additional rounds billed at standard hourly rate, quoted in advance.</p>
    <p style="margin:0 0 10px;"><strong style="color:#0d0c0a;">7. Timeline.</strong> Typically 5–7 business days from receipt of deposit AND all required content. Client delays extend the timeline.</p>
    <p style="margin:0 0 10px;"><strong style="color:#0d0c0a;">8. Intellectual Property.</strong> On full payment, Client receives a perpetual worldwide license to use the delivered site. Third-party assets keep their original licenses. NexaWeb retains rights to reusable code.</p>
    <p style="margin:0 0 10px;"><strong style="color:#0d0c0a;">9. Portfolio Rights.</strong> NexaWeb may showcase completed work unless Client opts out in writing before work begins.</p>
    <p style="margin:0 0 10px;"><strong style="color:#0d0c0a;">10. Monthly Retainer.</strong> Cancellable with 30 days written notice; current period non-refundable.</p>
    <p style="margin:0 0 10px;"><strong style="color:#0d0c0a;">11. Warranty Disclaimer.</strong> Services provided "as-is." All implied warranties disclaimed to the maximum extent permitted by law. No guarantees of specific business results.</p>
    <p style="margin:0 0 10px;"><strong style="color:#0d0c0a;">12. Limitation of Liability.</strong> NexaWeb's total liability capped at the amount Client paid for the project. No liability for indirect, incidental, consequential damages.</p>
    <p style="margin:0 0 10px;"><strong style="color:#0d0c0a;">13. Indemnification.</strong> Client defends and indemnifies NexaWeb for claims arising from Client's content, business, or use of the website.</p>
    <p style="margin:0 0 10px;"><strong style="color:#0d0c0a;">14. Termination.</strong> Either party may terminate in writing. Client pays for work completed. Sections 5, 8, 11, 12, 13, 15 survive.</p>
    <p style="margin:0 0 10px;"><strong style="color:#0d0c0a;">15. Governing Law & Disputes.</strong> California law. 30-day good-faith resolution attempt before legal action. California courts; California small claims permitted.</p>
    <p style="margin:0;"><strong style="color:#0d0c0a;">16. General.</strong> Severability, no-waiver, and update-by-posting provisions apply.</p>
  </div>
`
