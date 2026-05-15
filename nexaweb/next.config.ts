import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  // Prevents clickjacking — no embedding this site in iframes anywhere
  { key: "X-Frame-Options", value: "DENY" },
  // Prevents MIME-type sniffing attacks
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Controls referrer info sent to external sites
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // HSTS: enforce HTTPS for 2 years, all subdomains, allow preload list inclusion
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Restrict browser feature APIs — deny everything not explicitly needed
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "browsing-topics=()",
      "interest-cohort=()",
      "payment=()",
      "usb=()",
      "bluetooth=()",
      "display-capture=()",
      "fullscreen=(self)",
    ].join(", "),
  },
  // Prevents Adobe/cross-domain policy file access
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  // Disable DNS prefetching to prevent info leakage
  { key: "X-DNS-Prefetch-Control", value: "off" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // unsafe-eval removed in production; Next.js/Framer Motion need it only in dev
      isDev
        ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
        : "script-src 'self' 'unsafe-inline'",
      // unsafe-inline required for Tailwind CSS and inline React styles
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      // Removed blob: — not needed; kept data: only for SVG data URIs used by WebGL
      "img-src 'self' data: https://images.unsplash.com https://parsefiles.back4app.com",
      // Only connect to self; no external APIs called from client
      "connect-src 'self'",
      // WebGL shaders need worker-src for OffscreenCanvas in some browsers
      "worker-src blob:",
      // Absolute lockdown on framing
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  images: {
    remotePatterns: [
      // Locked to Unsplash photo paths only — no wildcard subdomains
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-*" },
      { protocol: "https", hostname: "parsefiles.back4app.com" },
    ],
    // Prevent hotlinking to arbitrary external image URLs
    dangerouslyAllowSVG: false,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'none'; script-src 'none'; sandbox;",
  },
  // Disable powered-by header to avoid advertising the stack
  poweredByHeader: false,
};

export default nextConfig;
