import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { rateLimit } from "@/lib/rate-limit"
import {
  checkMethod, checkContentType, checkOrigin, checkBotUA,
  parseBody, stripControlChars, apiSecurityHeaders, getClientIp,
} from "@/lib/api-security"

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#039;")
}

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
  const { allowed, retryAfter } = rateLimit(`vpn-report:${ip}`, 3, 60 * 60 * 1000)
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many reports" },
      { status: 429, headers: { ...headers, "Retry-After": String(retryAfter) } }
    )
  }

  const body = await parseBody(req)
  if (body instanceof NextResponse) return body

  const path = stripControlChars(typeof body.path === "string" ? body.path.slice(0, 256) : "")
  const ua   = (req.headers.get("user-agent") ?? "").slice(0, 500)

  try {
    await resend.emails.send({
      from: "NexaWeb <onboarding@resend.dev>",
      to: "mynexaweb@gmail.com",
      subject: "VPN detection — false positive reported",
      html: `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f4f4f4;font-family:'Inter',Arial,sans-serif;">
        <div style="max-width:520px;margin:0 auto;padding:40px 24px;">
          <h2 style="font-size:20px;font-weight:900;color:#0d0c0a;margin:0 0 14px;">⚠️ VPN false-positive report</h2>
          <p style="font-size:14px;color:#555;margin:0 0 18px;">A visitor on the signing page reported that the VPN detection was incorrect — they say they're not using a VPN.</p>
          <div style="background:#ffffff;border-radius:12px;padding:20px;border:1px solid #e5e5e5;">
            <p style="margin:0 0 8px;font-size:13px;color:#444;"><strong style="color:#0d0c0a;">Page:</strong> ${escapeHtml(path)}</p>
            <p style="margin:0 0 8px;font-size:13px;color:#444;"><strong style="color:#0d0c0a;">IP:</strong> ${escapeHtml(ip)}</p>
            <p style="margin:0 0 8px;font-size:13px;color:#444;"><strong style="color:#0d0c0a;">User agent:</strong> ${escapeHtml(ua)}</p>
            <p style="margin:0;font-size:13px;color:#444;"><strong style="color:#0d0c0a;">Time:</strong> ${new Date().toISOString()}</p>
          </div>
          <p style="margin:18px 0 0;font-size:12px;color:#888;">You can investigate the IP via <a href="https://proxycheck.io/v2/${encodeURIComponent(ip)}?vpn=3" style="color:#1447e6;">proxycheck.io</a> or <a href="https://ipinfo.io/${encodeURIComponent(ip)}" style="color:#1447e6;">ipinfo.io</a>.</p>
        </div></body></html>`,
    })
  } catch {
    // Don't fail the request if email fails — user still wants to proceed
  }

  return NextResponse.json({ success: true }, { headers })
}
