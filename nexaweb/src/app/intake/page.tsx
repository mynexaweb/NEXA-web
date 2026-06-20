"use client"

import { useState } from "react"
import { PhoneInput } from "@/components/PhoneInput"

const BUDGETS = ["Under $1,000", "$1,000 – $3,000", "$3,000 – $6,000", "$6,000 – $12,000", "$12,000+"]
const TIMELINES = ["ASAP", "Within 1 month", "1–3 months", "3+ months", "No deadline yet"]
const PROJECT_TYPES = ["New website", "Redesign existing site", "E-commerce store", "Landing page", "Web app", "Other"]

export default function IntakePage() {
  const [step, setStep] = useState(1)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const [honeypot, setHoneypot] = useState("")
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    business_name: "",
    email: "",
    phone: "",
    website_url: "",
    project_type: "",
    pages_needed: "",
    budget: "",
    timeline: "",
    competitors: "",
    goals: "",
    extra: "",
  })

  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: honeypot }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Something went wrong. Please try again." }))
        setError(data.error || "Something went wrong. Please try again.")
        setLoading(false)
        return
      }
      setLoading(false)
      setSent(true)
    } catch {
      setError("Network error. Please check your connection and try again.")
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div style={{ minHeight: "100vh", background: "#070b18", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif" }}>
        <div style={{ textAlign: "center", padding: "0 24px" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(20,71,230,0.15)", border: "1px solid rgba(20,71,230,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b6fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", marginBottom: 10 }}>You&apos;re all set!</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.7, maxWidth: 380, margin: "0 auto 28px" }}>
            We have everything we need. Expect to hear from us within 24 hours with a plan and honest pricing.
          </p>
          <a href="/" style={{ display: "inline-block", background: "#1447e6", color: "#fff", textDecoration: "none", borderRadius: 12, padding: "13px 26px", fontSize: 14, fontWeight: 700 }}>
            Back to NexaWeb →
          </a>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: "#070b18", fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 720, margin: "0 auto" }}>
        <a href="/" style={{ textDecoration: "none", fontWeight: 900, fontSize: 17, letterSpacing: "-0.02em" }}>
          <span style={{ color: "#fff" }}>Nexa</span><span style={{ color: "#1447e6" }}>Web</span>
        </a>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>Project Intake Form</span>
      </div>

      <div style={{ maxWidth: 620, margin: "0 auto", padding: "52px 24px 80px" }}>
        {/* Progress */}
        <div style={{ display: "flex", gap: 6, marginBottom: 44 }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{ flex: 1, height: 3, borderRadius: 99, background: s <= step ? "#1447e6" : "rgba(255,255,255,0.08)", transition: "background 0.3s" }} />
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={e => setHoneypot(e.target.value)}
            tabIndex={-1}
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
          />
          {/* Step 1 — About your business */}
          {step === 1 && (
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#1447e6", marginBottom: 10 }}>Step 1 of 3</p>
              <h1 style={{ fontSize: 28, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", marginBottom: 8 }}>About your business</h1>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, marginBottom: 36, lineHeight: 1.6 }}>Help us understand who you are and what you do.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Business Name</label>
                  <input required value={form.business_name} onChange={e => set("business_name", e.target.value)} placeholder="e.g. Smith Plumbing Co." style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Your Email</label>
                  <input required type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="you@yourbusiness.com" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Phone <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 400 }}>(optional)</span></label>
                  <PhoneInput value={form.phone} onChange={v => set("phone", v)} />
                </div>
                <div>
                  <label style={labelStyle}>Current Website (if any)</label>
                  <input value={form.website_url} onChange={e => set("website_url", e.target.value)} placeholder="https://yoursite.com" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Project Type</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {PROJECT_TYPES.map(t => (
                      <button type="button" key={t} onClick={() => set("project_type", t)}
                        style={{ ...chipStyle, background: form.project_type === t ? "#1447e6" : "rgba(255,255,255,0.04)", border: `1px solid ${form.project_type === t ? "#1447e6" : "rgba(255,255,255,0.1)"}`, color: form.project_type === t ? "#fff" : "rgba(255,255,255,0.55)" }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button type="button" onClick={() => setStep(2)} disabled={!form.business_name || !form.email || !form.project_type} style={{ ...btnStyle, marginTop: 32 }}>
                Continue →
              </button>
            </div>
          )}

          {/* Step 2 — Project details */}
          {step === 2 && (
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#1447e6", marginBottom: 10 }}>Step 2 of 3</p>
              <h1 style={{ fontSize: 28, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", marginBottom: 8 }}>Project details</h1>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, marginBottom: 36, lineHeight: 1.6 }}>Tell us about the scope and timeline.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Pages needed <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 400 }}>(optional)</span></label>
                  <input value={form.pages_needed} onChange={e => set("pages_needed", e.target.value)} placeholder="e.g. Home, About, Services, Contact" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Budget Range</label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {BUDGETS.map(b => (
                      <button type="button" key={b} onClick={() => set("budget", b)}
                        style={{ ...chipStyle, justifyContent: "flex-start", background: form.budget === b ? "#1447e6" : "rgba(255,255,255,0.04)", border: `1px solid ${form.budget === b ? "#1447e6" : "rgba(255,255,255,0.1)"}`, color: form.budget === b ? "#fff" : "rgba(255,255,255,0.55)" }}>
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Timeline</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {TIMELINES.map(t => (
                      <button type="button" key={t} onClick={() => set("timeline", t)}
                        style={{ ...chipStyle, background: form.timeline === t ? "#1447e6" : "rgba(255,255,255,0.04)", border: `1px solid ${form.timeline === t ? "#1447e6" : "rgba(255,255,255,0.1)"}`, color: form.timeline === t ? "#fff" : "rgba(255,255,255,0.55)" }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 32 }}>
                <button type="button" onClick={() => setStep(1)} style={{ ...btnOutlineStyle }}>← Back</button>
                <button type="button" onClick={() => setStep(3)} disabled={!form.budget || !form.timeline} style={{ ...btnStyle, flex: 1 }}>Continue →</button>
              </div>
            </div>
          )}

          {/* Step 3 — Goals */}
          {step === 3 && (
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#1447e6", marginBottom: 10 }}>Step 3 of 3</p>
              <h1 style={{ fontSize: 28, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", marginBottom: 8 }}>Goals & inspiration</h1>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, marginBottom: 36, lineHeight: 1.6 }}>Last step — this helps us hit the ground running.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Competitors or sites you like</label>
                  <input value={form.competitors} onChange={e => set("competitors", e.target.value)} placeholder="e.g. apple.com, competitor.com" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>What&apos;s the #1 goal of this website?</label>
                  <textarea required maxLength={5000} value={form.goals} onChange={e => set("goals", e.target.value)} placeholder="e.g. Get more leads, sell products online, look more professional..." rows={3} style={{ ...inputStyle, resize: "none", height: "auto", padding: "12px 14px" }} />
                </div>
                <div>
                  <label style={labelStyle}>Anything else we should know? <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 400 }}>(optional)</span></label>
                  <textarea maxLength={1000} value={form.extra} onChange={e => set("extra", e.target.value)} placeholder="Special requests, must-haves, or context..." rows={3} style={{ ...inputStyle, resize: "none", height: "auto", padding: "12px 14px" }} />
                </div>
              </div>

              {error && (
                <div style={{ marginTop: 20, padding: "12px 16px", borderRadius: 10, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", color: "#fca5a5", fontSize: 13 }}>
                  {error}
                </div>
              )}
              <div style={{ display: "flex", gap: 10, marginTop: 32 }}>
                <button type="button" onClick={() => setStep(2)} style={btnOutlineStyle}>← Back</button>
                <button type="submit" disabled={loading || !form.goals} style={{ ...btnStyle, flex: 1 }}>
                  {loading ? "Submitting..." : "Submit Intake →"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 11, fontWeight: 700,
  color: "rgba(255,255,255,0.4)", marginBottom: 7,
  textTransform: "uppercase", letterSpacing: "0.06em",
}
const inputStyle: React.CSSProperties = {
  width: "100%", padding: "11px 14px", borderRadius: 10,
  border: "1.5px solid rgba(255,255,255,0.1)", fontSize: 16,
  color: "#fff", background: "rgba(255,255,255,0.05)",
  outline: "none", boxSizing: "border-box",
}
const chipStyle: React.CSSProperties = {
  padding: "10px 14px", borderRadius: 10, fontSize: 13,
  fontWeight: 600, cursor: "pointer", textAlign: "center",
  display: "flex", alignItems: "center", justifyContent: "center",
  transition: "all 0.15s",
}
const btnStyle: React.CSSProperties = {
  background: "#1447e6", color: "#fff", border: "none",
  borderRadius: 12, padding: "14px 24px", fontSize: 15,
  fontWeight: 800, cursor: "pointer",
  boxShadow: "0 0 28px rgba(20,71,230,0.35)",
}
const btnOutlineStyle: React.CSSProperties = {
  background: "transparent", color: "rgba(255,255,255,0.5)",
  border: "1.5px solid rgba(255,255,255,0.1)",
  borderRadius: 12, padding: "14px 20px", fontSize: 15,
  fontWeight: 600, cursor: "pointer",
}
