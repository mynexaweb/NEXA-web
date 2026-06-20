"use client"

import { useState, useRef, useEffect, use } from "react"
import Link from "next/link"

const PROJECT_TYPES = [
  "New website",
  "Redesign existing site",
  "E-commerce store",
  "Landing page",
  "Web app",
  "Other",
]

// Mirror of the public Terms of Service — kept here so we can submit the exact
// text the client saw + signed alongside their signature, for evidence value.
const TERMS_SECTIONS: Array<{ title: string; body: string }> = [
  { title: "1. Acceptance of Terms",      body: "By submitting an inquiry, paying a deposit, or otherwise engaging our services, you (\"Client\") agree to be bound by these Terms. If you do not agree, do not engage our services. These Terms, together with any written project scope we exchange (email is sufficient), form the complete agreement between us." },
  { title: "2. Services",                 body: "NexaWeb designs and develops websites for local businesses and individuals. The specific pages, features, and scope of each project are confirmed in writing before work begins. Client is responsible for providing all content needed for the project, including text, images, logos, and any other materials." },
  { title: "3. Your Responsibilities",    body: "You must provide accurate, timely, and lawful content for your project. You represent and warrant that you own or have permission to use all content you provide, including any text, images, logos, trademarks, and third-party material. You agree not to provide content that is illegal, infringing, defamatory, or otherwise harmful." },
  { title: "4. Payment",                  body: "A 50% deposit is required before work begins. The remaining 50% is due upon project completion. Work will not begin until the deposit is received. Invoices are due upon receipt. If payment is more than 14 days past due, we may pause work on your project until the balance is resolved." },
  { title: "5. Refunds",                  body: "You may cancel your project at any time before work begins for a full refund of your deposit. Once work has commenced, your deposit is considered earned and reflects our scheduling commitment and initial work allocated to your project. If we are unable to deliver the agreed-upon scope due to our own actions, you will receive a pro-rated refund based on work completed at the time of cancellation." },
  { title: "6. Revisions",                body: "Each project includes up to two (2) rounds of revisions on the agreed-upon design and content. Additional revisions beyond that are billed at our standard hourly rate, quoted in writing before any extra work begins." },
  { title: "7. Timeline",                 body: "Projects are typically completed within 5–7 business days after we receive both the deposit and all required content from you. Delays caused by Client — including slow content delivery, slow approvals, or scope changes — extend the timeline accordingly. We will communicate revised timelines as soon as reasonably possible." },
  { title: "8. Intellectual Property",    body: "Upon receipt of full payment, you receive a perpetual, worldwide license to use the delivered website for your business. Any third-party assets we use (fonts, stock images, plugins, code libraries) remain subject to their original licenses. We retain ownership of any reusable tools, code components, or templates we developed independently. You retain full ownership of all content you provide to us." },
  { title: "9. Portfolio Rights",         body: "Unless you request otherwise in writing before work begins, we may display your completed project in our portfolio, on our website, and in marketing materials. We will not disclose private business information, credentials, or behind-the-scenes materials." },
  { title: "10. Monthly Retainer",        body: "Clients on a monthly maintenance plan may cancel at any time by providing 30 days' written notice. Fees for the current billing period are non-refundable, and services continue through the end of the paid period." },
  { title: "11. Warranty Disclaimer",     body: "Our services and the websites we deliver are provided \"as-is\" and \"as-available.\" To the maximum extent permitted by law, we disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that your website will be error-free, uninterrupted, or compatible with every browser, device, or future platform change. We make no guarantees about specific business results, conversions, search engine rankings, or revenue." },
  { title: "12. Limitation of Liability", body: "To the maximum extent permitted by California law, our total liability to you for any claim arising from or related to our services is limited to the amount you have paid us for the specific project giving rise to the claim. We are not liable for any indirect, incidental, consequential, special, or punitive damages — including lost profits, lost data, or business interruption — even if we were advised of the possibility of such damages." },
  { title: "13. Indemnification",         body: "You agree to defend, indemnify, and hold us harmless from any claims, damages, losses, or costs (including reasonable attorney fees) arising from: (a) content you provided to us; (b) your use of the website we built; (c) your business operations or products; or (d) your violation of these Terms or any law." },
  { title: "14. Termination",             body: "Either party may terminate the engagement in writing at any time. Upon termination, you will pay for all work completed up to the termination date. Sections 5, 8, 11, 12, 13, and 15 survive termination of this agreement." },
  { title: "15. Governing Law & Disputes",body: "These Terms are governed by the laws of the State of California, without regard to its conflict of laws principles. Before either party initiates legal action, both parties agree to attempt in good faith to resolve the dispute through direct communication for a period of at least 30 days. If unresolved, any dispute shall be brought in the state or federal courts located in California; nothing in this section prevents either party from bringing a qualifying claim in California small claims court." },
  { title: "16. General",                 body: "If any provision of these Terms is held to be unenforceable, the remainder will remain in full force and effect. Our failure to enforce any right or provision is not a waiver of that right. These Terms may be updated from time to time; the current version will always be posted at our public Terms URL with a \"Last updated\" date. Your continued use of our services after an update constitutes acceptance of the updated Terms." },
]

const TERMS_VERSION = "2026-05-30"

export default function SignPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params)

  // Token-gate: anything under 32 chars 404s. The token IS the access
  // credential — there are no other links to this page.
  if (!token || token.length < 32) {
    return (
      <div style={{ minHeight: "100vh", background: "#070b18", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
        <div style={{ textAlign: "center", padding: "0 24px" }}>
          <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 10 }}>404</h1>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>Page not found.</p>
        </div>
      </div>
    )
  }

  const [form, setForm] = useState({
    client_name:         "",
    business_name:       "",
    client_email:        "",
    project_type:        PROJECT_TYPES[0],
    total_amount:        "",
    deposit_amount:      "",
    project_description: "",
  })
  const [sending, setSending]       = useState(false)
  const [signed, setSigned]         = useState(false)
  const [error, setError]           = useState("")
  const [hasInk, setHasInk]         = useState(false)
  const [honeypot, setHoneypot]     = useState("")
  const [vpnDetected, setVpnDetected]   = useState(false)
  const [vpnType, setVpnType]           = useState<string | null>(null)
  const [vpnReporting, setVpnReporting] = useState(false)
  const [vpnReportSent, setVpnReportSent] = useState(false)

  // VPN / proxy / hosting-IP check — runs once on mount. Shows a blocking
  // modal if detected; user can either acknowledge and disable, or report
  // the detection as a false positive (sends an email to the admin).
  useEffect(() => {
    if (!token || token.length < 32) return
    let cancelled = false
    fetch("/api/ip-check")
      .then(r => r.json())
      .then(d => {
        if (cancelled) return
        if (d?.vpn) {
          setVpnDetected(true)
          if (typeof d.type === "string") setVpnType(d.type)
        }
      })
      .catch(() => { /* fall open — never block on detector failure */ })
    return () => { cancelled = true }
  }, [token])

  const reportVpnMistake = async () => {
    setVpnReporting(true)
    try {
      await fetch("/api/vpn-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: typeof window !== "undefined" ? window.location.pathname : "" }),
      })
      setVpnReportSent(true)
    } catch {
      // ignore — let them proceed anyway
    }
    setVpnReporting(false)
  }

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawingRef = useRef(false)
  const lastPtRef = useRef<{ x: number; y: number } | null>(null)

  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }))

  // Auto-derive deposit as half the total when the total changes
  useEffect(() => {
    const n = parseFloat(form.total_amount)
    if (!isNaN(n) && n > 0) {
      setForm(f => ({ ...f, deposit_amount: (n / 2).toFixed(2) }))
    }
  }, [form.total_amount])

  // Set up canvas size + white-on-dark drawing context
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      ctx.scale(dpr, dpr)
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.lineWidth = 2.2
      ctx.strokeStyle = "#ffffff"
    }
    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  const getPos = (e: React.MouseEvent | React.TouchEvent): { x: number; y: number } => {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    if ("touches" in e) {
      const t = e.touches[0] || e.changedTouches[0]
      return { x: t.clientX - rect.left, y: t.clientY - rect.top }
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    drawingRef.current = true
    lastPtRef.current = getPos(e)
  }
  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawingRef.current) return
    e.preventDefault()
    const pos = getPos(e)
    const ctx = canvasRef.current!.getContext("2d")!
    ctx.beginPath()
    ctx.moveTo(lastPtRef.current!.x, lastPtRef.current!.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    lastPtRef.current = pos
    setHasInk(true)
  }
  const endDraw = () => {
    drawingRef.current = false
    lastPtRef.current = null
  }
  const clearSig = () => {
    const c = canvasRef.current!
    const ctx = c.getContext("2d")!
    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, c.width, c.height)
    ctx.restore()
    setHasInk(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!hasInk) { setError("Please sign in the signature box above before submitting."); return }
    if (!form.client_name || !form.client_email || !form.business_name) {
      setError("Please fill in your name, business, and email.")
      return
    }
    setSending(true)
    try {
      const signature_data_url = canvasRef.current!.toDataURL("image/png")
      const res = await fetch("/api/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          ...form,
          signature_data_url,
          terms_version: TERMS_VERSION,
          signed_at: new Date().toISOString(),
          website: honeypot,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Something went wrong." }))
        // Server-side VPN rejection — re-surface the blocking modal even if
        // the client-side check passed (e.g. user enabled VPN after the page loaded)
        if (data?.vpn) setVpnDetected(true)
        setError(data.error || "Something went wrong. Please try again.")
        setSending(false)
        return
      }
      setSigned(true)
      setSending(false)
    } catch {
      setError("Network error. Please check your connection and try again.")
      setSending(false)
    }
  }

  if (signed) {
    return (
      <div style={{ minHeight: "100vh", background: "#070b18", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
        <div style={{ textAlign: "center", padding: "0 24px", maxWidth: 460 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(20,71,230,0.15)", border: "1px solid rgba(20,71,230,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b6fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", marginBottom: 10 }}>Contract signed</h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 1.7, marginBottom: 22 }}>
            A copy of the signed contract has been emailed to <strong style={{ color: "#fff" }}>{form.client_email}</strong> and to NexaWeb. Welcome aboard, {form.client_name.split(" ")[0]}.
          </p>
          <Link href="/" style={{ display: "inline-block", background: "#1447e6", color: "#fff", textDecoration: "none", borderRadius: 12, padding: "13px 26px", fontSize: 14, fontWeight: 700 }}>
            Visit NexaWeb →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: "#070b18", fontFamily: "var(--font-inter), system-ui, sans-serif", color: "#fff" }}>
      {/* VPN detection modal — HARD BLOCK. No dismiss. They either disable
          their VPN and refresh, or they get nothing. Server enforces the same
          rule at submit time. */}
      {vpnDetected && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(7,11,24,0.92)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            style={{
              maxWidth: 480, width: "100%",
              background: "#0d1424",
              border: "1px solid rgba(251,146,60,0.3)",
              borderRadius: 18, padding: "28px 24px",
              boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
              textAlign: "center",
            }}
          >
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "rgba(239,68,68,0.12)",
              border: "1px solid rgba(239,68,68,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 18px", fontSize: 30,
              boxShadow: "0 0 32px rgba(239,68,68,0.25)",
            }}>
              ⚠️
            </div>
            <h2 style={{
              fontSize: 28, fontWeight: 900, color: "#fff",
              letterSpacing: "-0.02em", marginBottom: 14,
              textTransform: "uppercase",
            }}>
              VPN Detected
            </h2>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "7px 16px", borderRadius: 999,
              background: "rgba(239,68,68,0.12)",
              border: "1px solid rgba(239,68,68,0.4)",
              marginBottom: 18,
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "#ef4444",
                boxShadow: "0 0 10px #ef4444",
              }} />
              <span style={{
                fontSize: 12, fontWeight: 800, color: "#fca5a5",
                letterSpacing: "0.14em", textTransform: "uppercase",
              }}>
                {vpnType ? `VPN · ${vpnType}` : "VPN"}
              </span>
            </div>
            <p style={{
              fontSize: 14, color: "rgba(255,255,255,0.65)",
              lineHeight: 1.65, marginBottom: 14, padding: "0 4px",
            }}>
              Your connection appears to be routed through a VPN, proxy, or anonymizing service (including Cloudflare Warp / 1.1.1.1).
            </p>
            <p style={{
              fontSize: 14, color: "#fff",
              lineHeight: 1.65, marginBottom: 22, padding: "0 4px",
              fontWeight: 700,
            }}>
              You cannot sign while this is active. Please disable it and refresh.
            </p>

            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 11, padding: "14px 16px",
              marginBottom: 18, textAlign: "left",
            }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.55)", marginBottom: 8, letterSpacing: "0.04em", textTransform: "uppercase" }}>How to fix this</p>
              <ol style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, paddingLeft: 18, margin: 0 }}>
                <li>Turn off your VPN, proxy, or Cloudflare Warp (1.1.1.1)</li>
                <li>Tap the button below to refresh</li>
              </ol>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button
                type="button"
                onClick={() => typeof window !== "undefined" && window.location.reload()}
                style={{
                  background: "#1447e6", color: "#fff",
                  border: "none", borderRadius: 11,
                  padding: "13px 20px", fontSize: 14, fontWeight: 800,
                  cursor: "pointer", boxShadow: "0 0 22px rgba(20,71,230,0.3)",
                }}
              >
                Refresh page
              </button>

              {vpnReportSent ? (
                <div style={{
                  background: "rgba(34,197,94,0.08)",
                  border: "1px solid rgba(34,197,94,0.25)",
                  color: "#86efac", fontSize: 13,
                  borderRadius: 11, padding: "11px 14px",
                }}>
                  ✓ Reported. NexaWeb has been notified and may reach out shortly. Please still disable your VPN to continue.
                </div>
              ) : (
                <button
                  type="button"
                  onClick={reportVpnMistake}
                  disabled={vpnReporting}
                  style={{
                    background: "transparent",
                    color: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 11,
                    padding: "13px 20px", fontSize: 13, fontWeight: 600,
                    cursor: vpnReporting ? "default" : "pointer",
                    opacity: vpnReporting ? 0.6 : 1,
                  }}
                >
                  {vpnReporting ? "Sending…" : "I think this is a mistake — let NexaWeb know"}
                </button>
              )}
            </div>

            <p style={{
              fontSize: 11, color: "rgba(255,255,255,0.35)",
              marginTop: 18, lineHeight: 1.55,
            }}>
              If you believe this detection is wrong, please report it using the button above and we&apos;ll reach out. Reporting does not unlock the form — for contract integrity, we still require a non-VPN connection to sign.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
          <Link href="/" style={{ textDecoration: "none" }} className="font-display font-bold text-base sm:text-[17px] tracking-tight">
            <span style={{ color: "#fff" }}>Nexa</span>
            <span style={{ color: "#1447e6" }}>Web</span>
          </Link>
          <span className="text-xs text-white/30 font-medium uppercase tracking-[0.12em]">Private · Contract</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-6 py-10 sm:py-14">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: "#1447e6" }}>Project Agreement</p>
        <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight mb-3" style={{ letterSpacing: "-0.02em" }}>
          Sign your contract
        </h1>
        <p className="text-white/55 text-sm sm:text-base mb-10 leading-relaxed max-w-xl">
          Fill in your details below, review the Terms, and sign at the bottom. Once submitted, you and NexaWeb will both receive a signed copy by email.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={e => setHoneypot(e.target.value)}
            tabIndex={-1}
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
          />

          {/* Client info */}
          <section style={panel}>
            <h2 style={sectionTitle}>Your Information</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
              <div>
                <label style={lbl}>Full Legal Name</label>
                <input required value={form.client_name}   onChange={e => set("client_name",   e.target.value)} placeholder="Jane R. Smith"             style={inp} />
              </div>
              <div>
                <label style={lbl}>Business Name</label>
                <input required value={form.business_name} onChange={e => set("business_name", e.target.value)} placeholder="Smith Plumbing Co."         style={inp} />
              </div>
              <div>
                <label style={lbl}>Email</label>
                <input required type="email" value={form.client_email} onChange={e => set("client_email", e.target.value)} placeholder="you@yourbusiness.com" style={inp} />
              </div>
            </div>
          </section>

          {/* Project info */}
          <section style={panel}>
            <h2 style={sectionTitle}>Project Details</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
              <div>
                <label style={lbl}>Project Type</label>
                <select value={form.project_type} onChange={e => set("project_type", e.target.value)} style={{ ...inp, appearance: "none" }}>
                  {PROJECT_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={lbl}>Total Project Cost (USD)</label>
                  <input type="number" min="0" step="0.01" value={form.total_amount} onChange={e => set("total_amount", e.target.value)} placeholder="1500.00" style={inp} />
                </div>
                <div>
                  <label style={lbl}>Deposit (50%)</label>
                  <input type="number" min="0" step="0.01" value={form.deposit_amount} onChange={e => set("deposit_amount", e.target.value)} placeholder="750.00" style={inp} />
                </div>
              </div>
              <div>
                <label style={lbl}>Project Description <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 400 }}>(optional)</span></label>
                <textarea value={form.project_description} onChange={e => set("project_description", e.target.value)} rows={3} placeholder="Pages, features, timeline notes…" style={{ ...inp, resize: "none" }} />
              </div>
            </div>
          </section>

          {/* Terms */}
          <section style={panel}>
            <h2 style={sectionTitle}>Terms of Service</h2>
            <p className="text-white/45 text-xs mb-3">Version dated {TERMS_VERSION}. Please read in full before signing.</p>
            <div style={{ maxHeight: 320, overflowY: "auto", padding: "16px 18px", background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10 }}>
              {TERMS_SECTIONS.map(s => (
                <div key={s.title} style={{ marginBottom: 16 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, color: "#fff" }}>{s.title}</h3>
                  <p style={{ fontSize: 12.5, lineHeight: 1.6, color: "rgba(255,255,255,0.65)" }}>{s.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Signature */}
          <section style={panel}>
            <h2 style={sectionTitle}>Your Signature</h2>
            <p className="text-white/45 text-xs mb-3">Sign with your mouse or finger. Drawing here means you agree to all Terms above and to the project details you entered.</p>
            <div style={{ position: "relative", borderRadius: 10, border: "1.5px dashed rgba(255,255,255,0.18)", background: "rgba(0,0,0,0.25)", overflow: "hidden" }}>
              <canvas
                ref={canvasRef}
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={endDraw}
                style={{ display: "block", width: "100%", height: 180, touchAction: "none", cursor: "crosshair" }}
              />
              {!hasInk && (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", color: "rgba(255,255,255,0.25)", fontStyle: "italic", fontSize: 13 }}>
                  Sign here
                </div>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
              <button type="button" onClick={clearSig} style={{ background: "transparent", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                Clear signature
              </button>
              <span className="text-white/35 text-xs">
                {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>
          </section>

          {error && (
            <div style={{ padding: "12px 14px", borderRadius: 10, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", color: "#fca5a5", fontSize: 13 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={sending}
            style={{
              background: "#1447e6", color: "#fff", border: "none", borderRadius: 12,
              padding: "16px 24px", fontSize: 15, fontWeight: 800, cursor: "pointer",
              boxShadow: "0 0 28px rgba(20,71,230,0.35)",
              opacity: sending ? 0.6 : 1,
            }}
          >
            {sending ? "Submitting…" : "Agree, Sign & Submit"}
          </button>

          <p className="text-white/30 text-[11px] text-center leading-relaxed">
            By submitting this form, you legally bind yourself to the Terms of Service above. A copy will be emailed to you and to NexaWeb with a timestamp and the IP address from which it was signed.
          </p>
        </form>
      </div>
    </div>
  )
}

const panel: React.CSSProperties = {
  background: "rgba(255,255,255,0.025)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 16,
  padding: 22,
}
const sectionTitle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 700,
  letterSpacing: "-0.01em",
  color: "#fff",
  marginBottom: 14,
}
const lbl: React.CSSProperties = {
  display: "block", fontSize: 11, fontWeight: 700,
  color: "rgba(255,255,255,0.45)", marginBottom: 6,
  textTransform: "uppercase", letterSpacing: "0.06em",
}
const inp: React.CSSProperties = {
  width: "100%", padding: "11px 14px", borderRadius: 10,
  border: "1.5px solid rgba(255,255,255,0.1)", fontSize: 15,
  color: "#fff", background: "rgba(255,255,255,0.04)",
  outline: "none", boxSizing: "border-box",
  fontFamily: "var(--font-inter), system-ui, sans-serif",
}
