import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { createClient } from "@supabase/supabase-js"
import { rateLimit } from "@/lib/rate-limit"
import {
  checkMethod, checkContentType, checkOrigin, checkBotUA,
  parseBody, stripControlChars, apiSecurityHeaders, getClientIp,
} from "@/lib/api-security"

const resend = new Resend(process.env.RESEND_API_KEY)
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

const VALID_PROJECT_TYPES = ["New website", "Redesign existing site", "E-commerce store", "Landing page", "Web app", "Other"]
const VALID_BUDGETS       = ["Under $1,000", "$1,000 – $3,000", "$3,000 – $6,000", "$6,000 – $12,000", "$12,000+"]
const VALID_TIMELINES     = ["ASAP", "Within 1 month", "1–3 months", "3+ months", "No deadline yet"]

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

  // Rate limit — 10 per hour per IP (using non-spoofable Vercel header)
  const ip = getClientIp(req)
  const { allowed, retryAfter } = rateLimit(`intake:${ip}`, 10, 60 * 60 * 1000)
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { ...headers, "Retry-After": String(retryAfter) } }
    )
  }

  const body = await parseBody(req)
  if (body instanceof NextResponse) return body

  // Honeypot — multiple decoy fields
  if (body.website || body.url_field || body.company_url) {
    return NextResponse.json({ success: true }, { headers })
  }

  const str = (v: unknown, max = 500) =>
    stripControlChars(typeof v === "string" ? v.slice(0, max) : "")

  const data = {
    business_name: str(body.business_name, 200),
    email:         str(body.email, 254),
    phone:         str(body.phone, 32),
    website_url:   str(body.website_url, 500),
    project_type:  str(body.project_type, 100),
    pages_needed:  str(body.pages_needed, 500),
    budget:        str(body.budget, 100),
    timeline:      str(body.timeline, 100),
    competitors:   str(body.competitors, 500),
    goals:         str(body.goals, 5000),
    extra:         str(body.extra, 1000),
  }

  if (!data.business_name) {
    return NextResponse.json({ error: "Business name required" }, { status: 400, headers })
  }
  if (!data.email || !EMAIL_RE.test(data.email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400, headers })
  }
  if (!VALID_PROJECT_TYPES.includes(data.project_type)) {
    return NextResponse.json({ error: "Invalid project type" }, { status: 400, headers })
  }
  if (!VALID_BUDGETS.includes(data.budget)) {
    return NextResponse.json({ error: "Invalid budget" }, { status: 400, headers })
  }
  if (!VALID_TIMELINES.includes(data.timeline)) {
    return NextResponse.json({ error: "Invalid timeline" }, { status: 400, headers })
  }
  if (!data.goals) {
    return NextResponse.json({ error: "Goals required" }, { status: 400, headers })
  }
  // website_url is free-form text — stored, never rendered as a clickable URL
  // server-side. Length-capped + control-char-stripped already, so accept as-is.

  try {
    await supabase.from("intake_submissions").insert(data)
  } catch {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503, headers })
  }

  // Admin notification — fire-and-forget, don't block the response if it fails
  try {
    await resend.emails.send({
      from: "NexaWeb <onboarding@resend.dev>",
      to: "mynexaweb@gmail.com",
      replyTo: data.email,
      subject: `New intake: ${escapeHtml(data.business_name)}`,
      html: `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f4f4f4;font-family:'Inter',Arial,sans-serif;">
        <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
          <h2 style="font-size:22px;font-weight:900;color:#0d0c0a;margin:0 0 20px;">&#x1F4CB; New Intake Form</h2>
          <div style="background:#ffffff;border-radius:12px;padding:24px;border:1px solid #e5e5e5;">
            <p style="margin:0 0 10px;font-size:14px;color:#666;"><strong style="color:#0d0c0a;">Business:</strong> ${escapeHtml(data.business_name)}</p>
            <p style="margin:0 0 10px;font-size:14px;color:#666;"><strong style="color:#0d0c0a;">Email:</strong> <a href="mailto:${escapeHtml(data.email)}" style="color:#1447e6;">${escapeHtml(data.email)}</a></p>
            ${data.phone ? `<p style="margin:0 0 10px;font-size:14px;color:#666;"><strong style="color:#0d0c0a;">Phone:</strong> ${escapeHtml(data.phone)}</p>` : ""}
            ${data.website_url ? `<p style="margin:0 0 10px;font-size:14px;color:#666;"><strong style="color:#0d0c0a;">Current site:</strong> ${escapeHtml(data.website_url)}</p>` : ""}
            <p style="margin:0 0 10px;font-size:14px;color:#666;"><strong style="color:#0d0c0a;">Project type:</strong> ${escapeHtml(data.project_type)}</p>
            <p style="margin:0 0 10px;font-size:14px;color:#666;"><strong style="color:#0d0c0a;">Budget:</strong> ${escapeHtml(data.budget)}</p>
            <p style="margin:0 0 10px;font-size:14px;color:#666;"><strong style="color:#0d0c0a;">Timeline:</strong> ${escapeHtml(data.timeline)}</p>
            ${data.pages_needed ? `<p style="margin:0 0 10px;font-size:14px;color:#666;"><strong style="color:#0d0c0a;">Pages:</strong> ${escapeHtml(data.pages_needed)}</p>` : ""}
            ${data.competitors ? `<p style="margin:0 0 10px;font-size:14px;color:#666;"><strong style="color:#0d0c0a;">Inspirations:</strong> ${escapeHtml(data.competitors)}</p>` : ""}
            <p style="margin:0 0 10px;font-size:14px;color:#666;"><strong style="color:#0d0c0a;">Goals:</strong><br/>${escapeHtml(data.goals)}</p>
            ${data.extra ? `<p style="margin:0;font-size:14px;color:#666;"><strong style="color:#0d0c0a;">Notes:</strong><br/>${escapeHtml(data.extra)}</p>` : ""}
          </div>
          <p style="font-size:12px;color:#999;margin-top:16px;">Sent from NexaWeb intake form</p>
        </div></body></html>`,
    })
  } catch {
    // Saved to DB; email failure shouldn't fail the request
  }

  return NextResponse.json({ success: true }, { headers })
}
