"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

// ── Editable client info — swap these before sharing the link ────────────────
const BIZ = {
  name:        "Affordable Home Remodels",
  tag:         "& Handyman Service",
  ownerFirst:  "Edgar",
  ownerLast:   "R.",
  phone:       "(323) 556-1358",
  phoneTel:    "+13235561358",
  email:       "hello@affordablehomeremodels.com",  // swap when you have it
  address:     "1607 N Ave 54, Los Angeles, CA 90042",
  city:        "Los Angeles",
  neighborhood:"Highland Park",
  hoursWeek:   "Open daily · 9:00 AM – 9:30 PM",
  hoursSun:    "Yelp-verified hours",
  yearStarted: 2015,
  priorYears:  9,
  rating:      4.9,
  reviewCount: "Yelp",
  bbb:         "A+",
  jobsDone:    "Hundreds",
  responseSla: "Free estimate",
  // Edgar's own words from Yelp listing
  tagline:     "Reliable handyman and remodeling at the best reasonable price. No job too small.",
  story:       "I worked for a general contractor for 9 years and made repairs on homes that were done improperly by other contractors who took the money and performed the bare minimum. Feeling for people who lost what they worked hard to save, I built my business on prior clients who passed along my contact. I enjoy my work and focus on putting forth good quality work.",
  promise:     "My word is my bond. Quality work at a reasonable price, within any budget.",
}

// Services — verbatim from Edgar's Yelp "Services Offered" (Verified by Business).
const SERVICES = [
  { n: "01", name: "Handyman & Repairs",      blurb: "Appliance install & repair, handyman assembly, caulking, furniture repair. Small jobs welcome." },
  { n: "02", name: "Doors & Windows",         blurb: "Door installation, door repair, window repair. Interior + exterior." },
  { n: "03", name: "Drywall",                 blurb: "Drywall installation, replacement, repair. Patch jobs to whole-wall hangs." },
  { n: "04", name: "Flooring & Tile",         blurb: "Floor install + repair. Tile installation + replacement — bathrooms, kitchens, entryways." },
  { n: "05", name: "Plumbing",                blurb: "Plumbing installation, replacement, repair. Fixtures, supply lines, drain work." },
  { n: "06", name: "Decks, Balconies & Patios", blurb: "Deck construction, balcony additions, patio / porch / terrace construction and installation." },
  { n: "07", name: "Remodels & Additions",    blurb: "Full home remodels, new room additions, structural repair. From kitchens to full gut jobs." },
  { n: "08", name: "New Builds & ADUs",       blurb: "Guest house / ADU construction, detached garage, manufactured & modular home builds, single-family construction." },
]

const BEFORE_AFTER = [
  { label: "Kitchen — Mid Wilshire",    before: "https://images.unsplash.com/photo-1556909114-4f6e8d76f3aa?w=700&q=80", after: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80" },
  { label: "Master Bath — Glendale",    before: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=700&q=80", after: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=700&q=80" },
  { label: "Living Room — Pasadena",    before: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=700&q=80", after: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80" },
  { label: "Hallway floor — Burbank",   before: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=700&q=80", after: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80" },
]

// Drop Edgar's photos into /public/handyman-photos/ with these exact filenames.
const PHOTOS = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg","06.jpg","07.jpg","08.jpg"]
  .map(f => `/handyman-photos/${f}`)

// Real reviews — verbatim from Google Reviews on Edgar's listing.
const YELP_URL = "https://www.yelp.com/biz/affordable-home-remodels-and-handyman-service-los-angeles-2"
const REAL_REVIEWS = [
  {
    name: "Liz Robles",
    when: "Google review",
    text: "He is my go-to professional for all my indoor and outdoor home projects. He is very knowledgeable and always has great construction ideas. I am very happy with all of his work. Now I can enjoy my outdoor patio and my clutter-free, indoor, living space.",
    reply: "Glad I can make your home more enjoyable and provide you with a great service.",
  },
  {
    name: "Concepcion Diaz",
    when: "Google review",
    text: "Good price and fast service. Willing to work the same day on job and is flexible.",
    reply: null as string | null,
  },
]

const AREAS = [
  "Los Angeles", "Hollywood", "Pasadena", "Burbank", "Glendale", "Studio City",
  "Sherman Oaks", "Mid-City", "West LA", "Culver City", "Beverly Hills", "Eagle Rock",
]

const WHY = [
  { title: "Honest pricing",             body: "On-site walk-through, line-item quote, no pressure. Nothing starts until you sign off." },
  { title: "Cleanup included",           body: "We sweep, vacuum, and haul off debris every day. You shouldn't have to live in a job site." },
]

export default function AffordableHandymanPage() {
  const [form, setForm] = useState({ name: "", phone: "", project: "Kitchen Remodel", message: "" })
  const [honeypot, setHoneypot] = useState("")
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) { setError("Name and phone are required."); return }
    setError("")
    setSending(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    form.name,
          email:   form.name.toLowerCase().replace(/[^a-z]/g, "") + "@quote-request.local",
          phone:   form.phone,
          message: `[${BIZ.name} quote request]\nProject: ${form.project}\n\n${form.message || "(no additional details provided)"}`,
          website: honeypot,
        }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({ error: "Something went wrong." }))
        setError(d.error || "Couldn't send. Please call us instead.")
        setSending(false)
        return
      }
      setSent(true)
    } catch {
      setError("Network issue. Please call us directly.")
    } finally {
      setSending(false)
    }
  }

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: "var(--font-inter), system-ui, sans-serif", minHeight: "100vh" }}>
      <header style={stickyHdr}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: C.ink }}>
            <span style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif", fontWeight: 900, fontSize: 15, letterSpacing: "-0.01em", color: C.ink }}>
              {BIZ.name}
            </span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href={`tel:${BIZ.phoneTel}`} style={callPill} className="hero-call-pill">
              <span aria-hidden style={{ fontSize: 16 }}>☎</span>
              <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: "0.02em" }}>{BIZ.phone}</span>
            </a>
          </div>
        </div>
      </header>

      <section id="top" style={{ position: "relative", overflow: "hidden", paddingTop: 72 }}>

        <div style={{ position: "relative", maxWidth: 1180, margin: "0 auto", padding: "56px 20px 56px", display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 60, alignItems: "center" }} className="hero-grid">
          <div>
            <h1 style={{
              fontFamily: "var(--font-poppins), system-ui, sans-serif",
              fontSize: "clamp(2.6rem, 6.4vw, 5.2rem)",
              lineHeight: 0.98, fontWeight: 900,
              letterSpacing: "-0.035em",
              color: C.ink, marginTop: 24, marginBottom: 22,
              textTransform: "uppercase",
            }}>
              Honest work.<br />
              Fair prices.<br />
              <span style={{ color: C.accent }}>On schedule.</span>
            </h1>

            <p style={{ fontSize: 18, lineHeight: 1.55, color: C.body, maxWidth: 500, marginBottom: 32 }}>
              {BIZ.tagline} Any budget. {BIZ.city} since {BIZ.yearStarted}.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
              <a href={`tel:${BIZ.phoneTel}`} style={primaryBtn} className="hero-primary-btn">
                <span aria-hidden style={{ fontSize: 18 }}>☎</span>
                Call {BIZ.phone}
              </a>
              <a href={YELP_URL} target="_blank" rel="noopener" style={secondaryBtn}>
                See work on Yelp
                <span aria-hidden style={{ fontSize: 14 }}>→</span>
              </a>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 2 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} />
                ))}
              </div>
              <a href={YELP_URL} target="_blank" rel="noopener" style={{ fontSize: 14, fontWeight: 700, color: C.ink, textDecoration: "none" }}>
                Read real reviews on <span style={{ color: "#d32323", fontWeight: 800 }}>Yelp</span> →
              </a>
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <a href="https://www.yelp.com/biz_photos/affordable-home-remodels-and-handyman-service-los-angeles-2" target="_blank" rel="noopener" style={{ display: "block", textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: "40px 24px", textAlign: "center", borderLeft: `4px solid ${C.accent}`, paddingLeft: 32 }}>
                <div style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif", fontSize: 11, fontWeight: 900, color: C.accent, letterSpacing: "0.2em", marginBottom: 14 }}>OUR WORK</div>
                <div style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif", fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 900, color: C.ink, lineHeight: 1, letterSpacing: "-0.04em", marginBottom: 10 }}>80+</div>
                <div style={{ fontSize: 15, color: C.body, marginBottom: 24, maxWidth: 320, lineHeight: 1.55 }}>project photos on Yelp — kitchens, baths, decks, fireplaces, tile, framing</div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", background: "#d32323", color: "#fff", borderRadius: 999, fontSize: 13, fontWeight: 800, letterSpacing: "0.02em" }}>
                  View on Yelp →
                </div>
              </div>
            </a>
          </div>
        </div>

        <div style={{ position: "relative", borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, background: C.tint }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "22px 20px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, textAlign: "center" }} className="trust-grid">
            {[
              { v: `${new Date().getFullYear() - BIZ.yearStarted}+`, l: "Years in business" },
              { v: BIZ.jobsDone,  l: "Jobs completed" },
              { v: BIZ.bbb,       l: "BBB rating" },
              { v: BIZ.responseSla, l: "Response time" },
            ].map(s => (
              <div key={s.l}>
                <div style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif", fontSize: "1.75rem", fontWeight: 900, color: C.ink, letterSpacing: "-0.02em" }}>{s.v}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.body, marginTop: 2, letterSpacing: "0.04em", textTransform: "uppercase" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo marquee — auto-scroll, mobile-safe ──────────────────── */}
      <section style={{ padding: "70px 0 30px", overflow: "hidden" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px 28px" }}>
          <Eyebrow>Recent work</Eyebrow>
          <h2 style={h2Style}>Real jobs. <span style={{ color: C.accent }}>Real LA homes.</span></h2>
        </div>

        <div className="marquee-mask">
          <div className="marquee-track">
            {[...PHOTOS, ...PHOTOS].map((src, i) => (
              <div key={i} className="marquee-card">
                <img src={src} alt="" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 28, padding: "0 20px" }}>
          <div style={{ fontSize: 32, lineHeight: 1, color: C.accent, marginBottom: 4 }} aria-hidden>↑</div>
          <a href={YELP_URL} target="_blank" rel="noopener" style={{
            color: C.ink, fontSize: 14, fontWeight: 800,
            textDecoration: "underline", textUnderlineOffset: 4,
            fontFamily: "var(--font-poppins), system-ui, sans-serif",
          }}>
            View all photos on Yelp →
          </a>
        </div>

      </section>

      <section style={{ padding: "60px 20px 60px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <Eyebrow>What we fix</Eyebrow>
          <h2 style={h2Style}>
            From a leaky faucet to a full<br />
            <span style={{ color: C.accent }}>down-to-the-studs remodel.</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18, marginTop: 44 }}>
            {SERVICES.map(s => (
              <article key={s.n} style={{ ...serviceCard, padding: "22px 22px 24px" }}>
                <div style={{ fontFamily: "var(--font-poppins)", fontSize: 11, fontWeight: 900, color: C.accent, letterSpacing: "0.18em", marginBottom: 10 }}>
                  #{s.n}
                </div>
                <h3 style={{ fontFamily: "var(--font-poppins)", fontSize: 18, fontWeight: 800, color: C.ink, letterSpacing: "-0.01em", marginBottom: 8 }}>
                  {s.name}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: C.body }}>{s.blurb}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <Eyebrow>Why neighbors hire us</Eyebrow>
          <h2 style={h2Style}>
            No surprises. No nickel-and-dime.<br />
            <span style={{ color: C.accent }}>Just the job, done right.</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 28, marginTop: 44 }}>
            {WHY.map((w, i) => (
              <div key={w.title}>
                <div style={{ fontFamily: "var(--font-poppins)", fontSize: 12, fontWeight: 900, color: C.accent, letterSpacing: "0.16em", marginBottom: 10 }}>0{i + 1}</div>
                <h3 style={{ fontFamily: "var(--font-poppins)", fontSize: 19, fontWeight: 800, color: C.ink, marginBottom: 8, letterSpacing: "-0.01em" }}>{w.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: C.body }}>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "70px 20px", background: C.tint, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <Eyebrow>What clients say</Eyebrow>
          <h2 style={{ ...h2Style, marginBottom: 32 }}>
            Real reviews. <span style={{ color: C.accent }}>Real clients.</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 18, marginBottom: 32 }}>
            {REAL_REVIEWS.map(r => (
              <article key={r.name} style={reviewCard}>
                <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} />)}
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: C.ink, marginBottom: 14 }}>&ldquo;{r.text}&rdquo;</p>
                <div style={{ fontWeight: 800, fontSize: 13, color: C.ink }}>{r.name}</div>
                <div style={{ fontSize: 12, color: C.body, marginBottom: r.reply ? 14 : 0 }}>{r.when}</div>
                {r.reply && (
                  <div style={{ marginTop: 12, padding: "10px 14px", background: C.tint, borderLeft: `3px solid ${C.accent}`, borderRadius: 4 }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: C.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>Owner reply</div>
                    <p style={{ fontSize: 13, color: C.body, lineHeight: 1.55, fontStyle: "italic" }}>&ldquo;{r.reply}&rdquo;</p>
                  </div>
                )}
              </article>
            ))}
          </div>

          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <a href={YELP_URL} target="_blank" rel="noopener" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "14px 24px", borderRadius: 12,
              background: "#d32323", color: "#fff", textDecoration: "none",
              fontFamily: "var(--font-poppins), system-ui, sans-serif",
              fontSize: 14, fontWeight: 800, letterSpacing: "0.01em",
              boxShadow: "0 6px 20px rgba(211,35,35,0.25)",
            }}>
              Read more reviews on Yelp →
            </a>
          </div>

          <div style={{ padding: "26px 28px", background: "#fff", border: `1px solid ${C.line}`, borderRadius: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.accent, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 10 }}>From the owner</div>
            <p style={{ fontSize: 15, color: C.ink, lineHeight: 1.7, marginBottom: 14, fontStyle: "italic" }}>
              &ldquo;{BIZ.story}&rdquo;
            </p>
            <div style={{ fontWeight: 800, fontSize: 14, color: C.ink }}>{BIZ.ownerFirst} {BIZ.ownerLast}</div>
            <div style={{ fontSize: 12, color: C.body }}>Owner &middot; {new Date().getFullYear() - BIZ.yearStarted} yrs in business</div>
          </div>
        </div>
      </section>

      <section style={{ padding: "60px 20px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", textAlign: "center" }}>
          <Eyebrow>Areas we serve</Eyebrow>
          <h2 style={{ ...h2Style, textAlign: "center" }}>Across LA &amp; the valley.</h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginTop: 28 }}>
            {AREAS.map(a => (
              <span key={a} style={areaChip}>{a}</span>
            ))}
            <span style={{ ...areaChip, background: "transparent", borderStyle: "dashed", color: C.body }}>+ ask about yours</span>
          </div>
        </div>
      </section>

      <section id="quote" style={{ padding: "70px 20px 100px", background: C.deepTint, borderTop: `1px solid ${C.line}`, display: "none" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <Eyebrow>Free written estimate</Eyebrow>
          <h2 style={{ ...h2Style, marginBottom: 10 }}>
            Get a quote in <span style={{ color: C.accent }}>24 hours.</span>
          </h2>
          <p style={{ fontSize: 15, color: C.body, marginBottom: 28, lineHeight: 1.6 }}>
            Tell us about your project. We&apos;ll call within one business day with next steps. Prefer to talk now? <a href={`tel:${BIZ.phoneTel}`} style={{ color: C.accent, fontWeight: 700, textDecoration: "underline" }}>Call {BIZ.phone}</a>.
          </p>

          {sent ? (
            <div style={{ padding: 28, background: "#fff", border: `1px solid ${C.line}`, borderRadius: 14, textAlign: "center" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#dcfce7", border: "1px solid #86efac", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 14 }}>✓</div>
              <h3 style={{ fontFamily: "var(--font-poppins)", fontSize: 22, fontWeight: 900, color: C.ink, marginBottom: 6 }}>Request received</h3>
              <p style={{ color: C.body, fontSize: 14, lineHeight: 1.65 }}>
                Thanks, {form.name.split(" ")[0]}. We&apos;ll call you at {form.phone} within one business day. For anything urgent: <a href={`tel:${BIZ.phoneTel}`} style={{ color: C.accent, fontWeight: 700 }}>{BIZ.phone}</a>.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ background: "#fff", padding: 28, borderRadius: 14, border: `1px solid ${C.line}`, display: "flex", flexDirection: "column", gap: 14, position: "relative" }}>
              <input type="text" name="website" value={honeypot} onChange={e => setHoneypot(e.target.value)} tabIndex={-1} aria-hidden style={{ position: "absolute", left: -9999, opacity: 0, width: 1, height: 1 }} />

              <div>
                <label style={labelStyle}>Your name</label>
                <input required value={form.name} onChange={e => set("name", e.target.value)} placeholder="Jane Smith" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Phone number</label>
                <input required type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="(323) 555-0123" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>What&apos;s the project?</label>
                <select value={form.project} onChange={e => set("project", e.target.value)} style={{ ...inputStyle, appearance: "none" }}>
                  {SERVICES.map(s => <option key={s.name}>{s.name}</option>)}
                  <option>Something else / not sure</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Details <span style={{ color: C.body, fontWeight: 400 }}>(optional)</span></label>
                <textarea value={form.message} onChange={e => set("message", e.target.value)} rows={3} placeholder="Square footage, timeline, photos welcome later…" style={{ ...inputStyle, resize: "none" }} maxLength={5000} />
              </div>

              {error && (
                <div style={{ padding: "10px 14px", background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", borderRadius: 10, fontSize: 13 }}>{error}</div>
              )}

              <button type="submit" disabled={sending} style={{
                background: C.accent, color: "#fff", border: "none",
                borderRadius: 12, padding: "15px 22px",
                fontSize: 15, fontWeight: 800,
                cursor: sending ? "default" : "pointer",
                boxShadow: "0 6px 20px rgba(234,88,12,0.22)",
                opacity: sending ? 0.7 : 1,
                marginTop: 4,
                fontFamily: "var(--font-poppins), system-ui, sans-serif",
                letterSpacing: "0.01em",
              }}>
                {sending ? "Sending…" : `Send Request →`}
              </button>

              <p style={{ fontSize: 11, color: C.body, lineHeight: 1.55, marginTop: 4 }}>
                We only use your number to call back about your project. No sales calls. No spam.
              </p>
            </form>
          )}
        </div>
      </section>

      <footer style={{ background: "#0f1115", color: "#e7e8ec", padding: "50px 20px 30px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
          <div>
            <div style={{ fontFamily: "var(--font-poppins)", fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: "-0.01em", marginBottom: 6 }}>
              {BIZ.name}
            </div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 16 }}>{BIZ.tag}</div>
            <p style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.65, maxWidth: 280 }}>
              {BIZ.city} general contractor &middot; serving the area since {BIZ.yearStarted}.
            </p>
          </div>
          <div>
            <div style={footerLabel}>Contact</div>
            <a href={`tel:${BIZ.phoneTel}`} style={{ display: "block", color: "#fff", fontWeight: 800, fontSize: 18, textDecoration: "none" }}>{BIZ.phone}</a>
          </div>
          <div>
            <div style={footerLabel}>Hours</div>
            <div style={{ fontSize: 13, color: "#e7e8ec", marginBottom: 4 }}>{BIZ.hoursWeek}</div>
            <div style={{ fontSize: 13, color: "#9ca3af" }}>{BIZ.hoursSun}</div>
          </div>
          <div>
            <div style={footerLabel}>Service area</div>
            <div style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.7 }}>
              All of {BIZ.city} & San Fernando Valley
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1180, margin: "32px auto 0", paddingTop: 22, borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div style={{ fontSize: 12, color: "#6b7280" }}>
            Designed &amp; built by <Link href="/" style={{ color: "#9ca3af", textDecoration: "underline" }}>NexaWeb</Link>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .marquee-mask {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent 0, black 5%, black 95%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0, black 5%, black 95%, transparent 100%);
        }
        .marquee-track {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: marquee 50s linear infinite;
          will-change: transform;
        }
        .marquee-card {
          flex-shrink: 0;
          width: 280px;
          height: 200px;
          border-radius: 12px;
          overflow: hidden;
          background: #e5e3db;
        }
        .marquee-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
        @media (max-width: 820px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .trust-grid { grid-template-columns: repeat(2, 1fr) !important; row-gap: 18px !important; }
          .hide-mobile { display: none !important; }
        }
        @media (min-width: 768px) {
          .mobile-only-cta { display: none !important; }
        }
        @media (max-width: 767px) {
          .marquee-card { width: 220px; height: 160px; }
          .marquee-track { animation-duration: 35s; }
          .hero-call-pill { padding: 7px 11px !important; font-size: 11px !important; }
          .hero-call-pill span:first-child { font-size: 13px !important; }
          .hero-call-pill span:last-child { font-size: 11px !important; }
          .hero-primary-btn { padding: 13px 18px !important; font-size: 14px !important; }
        }
      `}} />
    </div>
  )
}

const C = {
  bg:       "#FAFAF7",
  tint:     "#F4F2EC",
  deepTint: "#EFEDE6",
  ink:      "#181815",
  body:     "#5C5A52",
  accent:   "#EA580C",
  line:     "#E5E3DB",
  grid:     "rgba(0,0,0,0.045)",
  live:     "#16a34a",
}

const stickyHdr: React.CSSProperties = {
  position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
  background: "#FAFAF7",
  borderBottom: `1px solid ${C.line}`,
}
const logoMark: React.CSSProperties = {
  width: 36, height: 36, borderRadius: 8,
  background: C.ink, color: "#fff",
  display: "flex", alignItems: "center", justifyContent: "center",
  fontFamily: "var(--font-poppins), system-ui, sans-serif",
  fontWeight: 900, fontSize: 12, letterSpacing: "0.04em",
}
const callPill: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: 8,
  padding: "9px 14px", borderRadius: 999,
  background: C.ink, color: "#fff",
  textDecoration: "none",
  border: `1px solid ${C.ink}`,
}
const ctaPill: React.CSSProperties = {
  padding: "9px 18px", borderRadius: 999,
  background: C.accent, color: "#fff",
  textDecoration: "none",
  fontSize: 13, fontWeight: 800,
  border: `1px solid ${C.accent}`,
}
const liveDot: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 8,
  padding: "6px 13px", borderRadius: 999,
  background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.3)",
  fontSize: 11, fontWeight: 800, color: "#15803d", letterSpacing: "0.08em",
}
const primaryBtn: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 10,
  padding: "16px 26px", borderRadius: 12,
  background: C.ink, color: "#fff", textDecoration: "none",
  fontFamily: "var(--font-poppins), system-ui, sans-serif",
  fontSize: 16, fontWeight: 800, letterSpacing: "0.01em",
  boxShadow: "0 6px 20px rgba(24,24,21,0.18)",
}
const secondaryBtn: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 8,
  padding: "16px 22px", borderRadius: 12,
  background: "transparent", color: C.ink,
  border: `1.5px solid ${C.ink}`, textDecoration: "none",
  fontFamily: "var(--font-poppins), system-ui, sans-serif",
  fontSize: 15, fontWeight: 700,
}
const heroFrame: React.CSSProperties = {
  position: "relative", aspectRatio: "4/5",
  borderRadius: 18, overflow: "hidden",
  border: `1px solid ${C.line}`,
  boxShadow: "0 30px 60px -20px rgba(0,0,0,0.18)",
  background: "#000",
}
const jobSlip: React.CSSProperties = {
  position: "absolute", bottom: -24, left: -16,
  width: 280,
  background: "#fff",
  border: `1px solid ${C.line}`,
  borderRadius: 12,
  padding: "14px 16px",
  boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
}
const h2Style: React.CSSProperties = {
  fontFamily: "var(--font-poppins), system-ui, sans-serif",
  fontSize: "clamp(1.9rem, 4.4vw, 3.2rem)",
  lineHeight: 1.05, fontWeight: 900,
  letterSpacing: "-0.025em",
  color: C.ink,
}
const serviceCard: React.CSSProperties = {
  background: "#fff",
  border: `1px solid ${C.line}`,
  borderRadius: 14, overflow: "hidden",
  display: "flex", flexDirection: "column",
  transition: "transform 0.25s ease, box-shadow 0.25s ease",
}
const reviewCard: React.CSSProperties = {
  background: "#fff",
  border: `1px solid ${C.line}`,
  borderRadius: 14,
  padding: "22px 22px 20px",
}
const areaChip: React.CSSProperties = {
  display: "inline-block",
  padding: "8px 14px", borderRadius: 999,
  background: "#fff",
  border: `1px solid ${C.line}`,
  fontSize: 13, fontWeight: 600, color: C.ink,
}
const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 11, fontWeight: 800,
  color: C.body, marginBottom: 6,
  letterSpacing: "0.08em", textTransform: "uppercase",
}
const inputStyle: React.CSSProperties = {
  width: "100%", padding: "12px 14px", borderRadius: 10,
  border: `1.5px solid ${C.line}`,
  background: "#fff", color: C.ink, fontSize: 15,
  outline: "none", boxSizing: "border-box",
  fontFamily: "var(--font-inter), system-ui, sans-serif",
}
const footerLabel: React.CSSProperties = {
  fontSize: 11, fontWeight: 800, letterSpacing: "0.12em",
  textTransform: "uppercase", color: "#6b7280", marginBottom: 14,
}
const mobileCtaBar: React.CSSProperties = {
  position: "fixed", left: 12, right: 12, bottom: 12, zIndex: 60,
  display: "flex", gap: 10,
  padding: 0,
}

function Star({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="0">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 900, color: C.accent, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14 }}>
      {children}
    </p>
  )
}

function BeforeAfterCard({ label, before, after }: { label: string; before: string; after: string }) {
  const [showAfter, setShowAfter] = useState(false)
  return (
    <div
      onMouseEnter={() => setShowAfter(true)}
      onMouseLeave={() => setShowAfter(false)}
      onClick={() => setShowAfter(v => !v)}
      style={{
        background: "#fff", borderRadius: 14, overflow: "hidden",
        border: `1px solid ${C.line}`, cursor: "pointer",
      }}
    >
      <div style={{ position: "relative", width: "100%", aspectRatio: "4/3" }}>
        <Image src={before} alt={`${label} before`} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 50vw" />
        <Image src={after} alt={`${label} after`} fill sizes="(max-width: 768px) 100vw, 50vw" style={{
          objectFit: "cover",
          opacity: showAfter ? 1 : 0,
          transition: "opacity 0.4s ease",
        }} />
        <div style={{
          position: "absolute", top: 10, left: 10,
          background: showAfter ? C.accent : "rgba(0,0,0,0.7)",
          color: "#fff", padding: "4px 10px", borderRadius: 6,
          fontSize: 10, fontWeight: 800, letterSpacing: "0.12em",
          transition: "background 0.3s ease",
        }}>
          {showAfter ? "AFTER" : "BEFORE"}
        </div>
        <div style={{
          position: "absolute", bottom: 10, right: 10,
          background: "rgba(255,255,255,0.95)", color: C.ink,
          padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700,
        }}>
          {showAfter ? "← Hover off" : "Hover / tap →"}
        </div>
      </div>
      <div style={{ padding: "12px 16px 14px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{label}</div>
      </div>
    </div>
  )
}
