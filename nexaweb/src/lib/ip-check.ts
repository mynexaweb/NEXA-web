// Shared VPN/proxy/hosting-IP detection. Used both by /api/ip-check (called
// from the signing page on load) and /api/sign (server-side enforcement at
// submit time). Per-IP in-memory cache so we don't burn proxycheck.io's free
// 100-queries/day quota when the same person hits both endpoints.

type CacheEntry = { vpn: boolean; type: string | null; expiresAt: number }
const cache = new Map<string, CacheEntry>()
const TTL_MS = 10 * 60 * 1000 // 10 minutes

function isPrivate(ip: string): boolean {
  if (!ip || ip === "unknown" || ip === "::1") return true
  if (ip.startsWith("127.") || ip.startsWith("10.") || ip.startsWith("192.168.")) return true
  if (ip.startsWith("172.")) {
    const second = parseInt(ip.split(".")[1] ?? "0", 10)
    if (second >= 16 && second <= 31) return true
  }
  return false
}

export interface IpCheckResult {
  vpn: boolean
  type: string | null
  ip: string
  reason?: string
}

export async function checkVpn(ip: string): Promise<IpCheckResult> {
  if (isPrivate(ip)) return { vpn: false, type: null, ip, reason: "local" }

  // Cache hit?
  const cached = cache.get(ip)
  if (cached && cached.expiresAt > Date.now()) {
    return { vpn: cached.vpn, type: cached.type, ip, reason: "cache" }
  }

  const key = process.env.PROXYCHECK_API_KEY ?? ""
  const url = `https://proxycheck.io/v2/${encodeURIComponent(ip)}?vpn=3${key ? `&key=${encodeURIComponent(key)}` : ""}`

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "NexaWeb-Signing/1.0" },
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    })
    if (!res.ok) return { vpn: false, type: null, ip, reason: "api-error" }
    const data = await res.json()
    if (data?.status !== "ok") return { vpn: false, type: null, ip, reason: "no-result" }

    const ipData = data[ip] ?? {}
    // proxycheck returns TWO separate flags. The `vpn` flag catches
    // commercial VPN providers (Mullvad, Nord, ExpressVPN, Cloudflare Warp,
    // iCloud Private Relay…). The `proxy` flag catches public/web proxies and
    // datacenter hosting. We block on either — both indicate an anonymized
    // connection unsuitable for contract signing.
    const isVpn = ipData.vpn === "yes" || ipData.proxy === "yes"
    const type = typeof ipData.type === "string"
      ? ipData.type
      : (ipData.operator?.name ?? null)

    cache.set(ip, { vpn: isVpn, type, expiresAt: Date.now() + TTL_MS })
    return { vpn: isVpn, type, ip }
  } catch {
    // Fail open: detector hiccup must never block a legitimate signer
    return { vpn: false, type: null, ip, reason: "exception" }
  }
}
