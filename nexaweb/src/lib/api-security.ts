import { NextRequest, NextResponse } from "next/server"

const BOT_UA_PATTERNS = [
  /curl\//i, /python-requests/i, /scrapy/i, /httpx/i,
  /bot/i, /crawler/i, /spider/i, /wget/i, /libwww/i,
]

const MAX_BODY_BYTES = 10_240 // 10 KB

// Production origins explicitly allowed. Same-origin requests (origin host
// equals request host) are also accepted, which covers preview deployments.
const ALLOWED_ORIGINS = new Set<string>([
  "https://nexaweb.co",
  "https://www.nexaweb.co",
  "https://nexaweb-iota.vercel.app",
])

const isDev = process.env.NODE_ENV === "development"

export function stripControlChars(str: string): string {
  // Remove null bytes, control chars (except tab/newline), and zero-width chars
  return str
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .replace(/[​-‍﻿­]/g, "")
    .trim()
}

export function apiSecurityHeaders(): Record<string, string> {
  return {
    "Cache-Control": "no-store, no-cache, must-revalidate",
    "Pragma": "no-cache",
    "X-Content-Type-Options": "nosniff",
  }
}

export function checkMethod(
  req: NextRequest,
  allowed: string[]
): NextResponse | null {
  if (!allowed.includes(req.method)) {
    return NextResponse.json(
      { error: "Method not allowed" },
      { status: 405, headers: { Allow: allowed.join(", "), ...apiSecurityHeaders() } }
    )
  }
  return null
}

export function checkContentType(req: NextRequest): NextResponse | null {
  const ct = req.headers.get("content-type") ?? ""
  if (!ct.includes("application/json")) {
    return NextResponse.json(
      { error: "Invalid content type" },
      { status: 415, headers: apiSecurityHeaders() }
    )
  }
  return null
}

export function checkOrigin(req: NextRequest): NextResponse | null {
  const origin = req.headers.get("origin")
  const host   = req.headers.get("host") ?? ""

  // Browsers always send Origin on POST. Missing origin = curl/script attack.
  if (!origin) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403, headers: apiSecurityHeaders() }
    )
  }

  // Parse origin; reject malformed
  let originHost: string
  try {
    originHost = new URL(origin).host
  } catch {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403, headers: apiSecurityHeaders() }
    )
  }

  // Allow strict host match (covers preview deploys + production) OR allowlist
  if (originHost === host || ALLOWED_ORIGINS.has(origin)) {
    return null
  }

  // Dev convenience: localhost
  if (isDev && originHost.startsWith("localhost")) {
    return null
  }

  return NextResponse.json(
    { error: "Forbidden" },
    { status: 403, headers: apiSecurityHeaders() }
  )
}

export function checkBotUA(req: NextRequest): NextResponse | null {
  const ua = req.headers.get("user-agent") ?? ""
  if (!ua || BOT_UA_PATTERNS.some(p => p.test(ua))) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403, headers: apiSecurityHeaders() }
    )
  }
  return null
}

// Returns the client IP using only headers Vercel sets server-side.
// `x-forwarded-for[0]` is user-spoofable (Vercel appends, doesn't replace),
// so we prefer `x-vercel-forwarded-for` (Vercel-only, not user-controllable)
// then `x-real-ip`, and as last resort take the LAST entry in x-forwarded-for
// (closest to our server — the entry Vercel added).
export function getClientIp(req: NextRequest): string {
  const vercelIp = req.headers.get("x-vercel-forwarded-for")
  if (vercelIp) return vercelIp.split(",")[0].trim()

  const realIp = req.headers.get("x-real-ip")
  if (realIp) return realIp.trim()

  const fwd = req.headers.get("x-forwarded-for")
  if (fwd) {
    const ips = fwd.split(",").map(s => s.trim()).filter(Boolean)
    return ips[ips.length - 1] || "unknown"
  }

  return "unknown"
}

export async function parseBody(
  req: NextRequest
): Promise<Record<string, unknown> | NextResponse> {
  const contentLength = Number(req.headers.get("content-length") ?? 0)
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "Request too large" },
      { status: 413, headers: apiSecurityHeaders() }
    )
  }
  try {
    return await req.json()
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400, headers: apiSecurityHeaders() }
    )
  }
}
