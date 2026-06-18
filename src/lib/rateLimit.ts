type Hit = { count: number; resetAt: number }

const buckets = new Map<string, Hit>()

/**
 * Best-effort in-memory fixed-window rate limiter. Returns true if allowed.
 *
 * State is per server instance, so on serverless this throttles bursts on a
 * warm instance rather than enforcing a hard global limit. For production-grade
 * limiting, back it with a shared store (e.g. Upstash Redis). Combined with the
 * honeypot on the form, it is enough to stop casual spam.
 */
export function rateLimit(key: string, limit = 5, windowMs = 60_000): boolean {
  const now = Date.now()

  // Opportunistic cleanup so the map can't grow unbounded.
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (now > v.resetAt) buckets.delete(k)
  }

  const hit = buckets.get(key)
  if (!hit || now > hit.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (hit.count >= limit) return false
  hit.count += 1
  return true
}

/** Best-effort client identifier from request headers. */
export function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}
