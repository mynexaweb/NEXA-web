interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()
const MAX_ENTRIES = 10_000

function cleanup(now: number) {
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key)
  }
  // If still oversized after expiring entries, evict oldest (LRU-ish)
  if (store.size > MAX_ENTRIES) {
    const overflow = store.size - MAX_ENTRIES
    const keys = store.keys()
    for (let i = 0; i < overflow; i++) {
      const k = keys.next().value
      if (k !== undefined) store.delete(k)
    }
  }
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; retryAfter: number } {
  const now = Date.now()

  // Opportunistic cleanup — only runs when memory pressure rises.
  // Note: in-memory state on serverless is per-instance, so this is a
  // soft cap. For production-grade limiting use a shared store (Redis/KV).
  if (store.size >= MAX_ENTRIES) cleanup(now)

  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, retryAfter: 0 }
  }

  if (entry.count >= limit) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) }
  }

  entry.count++
  return { allowed: true, retryAfter: 0 }
}
