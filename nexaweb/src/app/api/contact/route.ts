import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { createClient } from "@supabase/supabase-js"
import { rateLimit } from "@/lib/rate-limit"
import {
  checkMethod, checkContentType, checkOrigin, checkBotUA,
  parseBody, stripControlChars, apiSecurityHeaders, getClientIp,
} from "@/lib/api-security"

const resend  = new Resend(process.env.RESEND_API_KEY)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
)

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#039;")
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

  // Rate limit — 5 per hour per IP (using non-spoofable Vercel header)
  const ip = getClientIp(req)
  const { allowed, retryAfter } = rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000)
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { ...headers, "Retry-After": String(retryAfter) } }
    )
  }

  const body = await parseBody(req)
  if (body instanceof NextResponse) return body

  // Honeypot — multiple decoy fields, any of which trip an automated submission
  if (body.website || body.url_field || body.company_url) {
    return NextResponse.json({ success: true }, { headers })
  }

  const name    = stripControlChars(typeof body.name    === "string" ? body.name    : "")
  const email   = stripControlChars(typeof body.email   === "string" ? body.email   : "")
  const phone   = stripControlChars(typeof body.phone   === "string" ? body.phone.slice(0, 32) : "")
  const message = stripControlChars(typeof body.message === "string" ? body.message : "")

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400, headers })
  }
  if (name.length > 100) {
    return NextResponse.json({ error: "Name too long" }, { status: 400, headers })
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400, headers })
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message too long" }, { status: 400, headers })
  }

  const safeName    = escapeHtml(name)
  const safeEmail   = escapeHtml(email)
  const safePhone   = escapeHtml(phone)
  const safeMessage = escapeHtml(message)

  // Persist submission — failure shouldn't leak internals to caller
  try {
    await supabase.from("contact_submissions").insert({ name, email, phone, message })
  } catch {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503, headers })
  }

  // Admin notification only. We deliberately do NOT auto-reply to the submitted
  // email address: that would let an attacker use our domain to send unsolicited
  // mail to arbitrary recipients (email-enumeration / spam-relay abuse).
  // The form's success UI is all the confirmation the user needs.
  try {
    await resend.emails.send({
      from: "NexaWeb <onboarding@resend.dev>",
      to: "mynexaweb@gmail.com",
      replyTo: email,
      subject: `New lead: ${safeName}`,
      html: `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f4f4f4;font-family:'Inter',Arial,sans-serif;">
        <div style="max-width:520px;margin:0 auto;padding:40px 24px;">
          <h2 style="font-size:22px;font-weight:900;color:#0d0c0a;margin:0 0 20px;">&#x1F514; New Client Lead</h2>
          <div style="background:#ffffff;border-radius:12px;padding:24px;border:1px solid #e5e5e5;">
            <p style="margin:0 0 10px;font-size:14px;color:#666;"><strong style="color:#0d0c0a;">Name:</strong> ${safeName}</p>
            <p style="margin:0 0 10px;font-size:14px;color:#666;"><strong style="color:#0d0c0a;">Email:</strong> <a href="mailto:${safeEmail}" style="color:#1447e6;">${safeEmail}</a></p>
            ${safePhone ? `<p style="margin:0 0 10px;font-size:14px;color:#666;"><strong style="color:#0d0c0a;">Phone:</strong> ${safePhone}</p>` : ""}
            <p style="margin:0;font-size:14px;color:#666;"><strong style="color:#0d0c0a;">Message:</strong><br/>${safeMessage}</p>
          </div>
          <p style="font-size:12px;color:#999;margin-top:16px;">Sent from NexaWeb contact form</p>
        </div></body></html>`,
    })
  } catch {
    // Email failed but the submission is saved — don't fail the whole request
  }

  return NextResponse.json({ success: true }, { headers })
}
