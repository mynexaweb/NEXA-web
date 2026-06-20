"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

// ── Editable client info — swap these before sharing the link ────────────────
const BIZ = {
  name:        "Affordable Home Remodels",
  tag:         "& Handyman Service",
  phone:       "(323) 555-0140",   // PLACEHOLDER — replace w/ real Yelp number
  phoneTel:    "+13235550140",
  email:       "hello@affordablehomeremodels.com",  // PLACEHOLDER
  city:        "Los Angeles",
  hoursWeek:   "Mon – Sat · 7:00 AM – 7:00 PM",
  hoursSun:    "Sun · By appointment",
  yearStarted: 2015,
  rating:      4.9,
  reviewCount: "200+",
  bbb:         "A+",
  jobsDone:    "1,800+",
  responseSla: "Same-day",
}

const SERVICES = [
  { n: "01", name: "Kitchen Remodels",        blurb: "Cabinets, counters, backsplash, lighting — turnkey kitchen rebuilds with no hidden costs.",            img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80" },
  { n: "02", name: "Bathroom Renovations",    blurb: "Full bath remodels, tile work, vanity install, walk-in showers. ADA-accessible options available.",     img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=900&q=80" },
  { n: "03", name: "Drywall & Painting",      blurb: "Patch jobs to whole-house repaints. Interior, exterior, popcorn-ceiling removal, texture matching.",    img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=900&q=80" },
  { n: "04", name: "Flooring Installation",   blurb: "Hardwood, laminate, vinyl, tile. We pull permits, handle subfloor prep, and clean as we go.",          img: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=900&q=80" },
  { n: "05", name: "Electrical & Lighting",   blurb: "Outlets, fixtures, ceiling fans, recessed lighting, panel upgrades. Licensed work, code-compliant.",   img: "https://images.unsplash.com/photo-1565374395542-0ce18882c857?w=900&q=80" },
  { n: "06", name: "Plumbing Fixtures",       blurb: "Faucet swaps, toilet installs, garbage disposals, leak repairs. Upfront pricing before we start.",     img: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=900&q=80" },
  { n: "07", name: "Carpentry & Trim",        blurb: "Crown molding, baseboards, built-ins, custom shelving, door & window installation.",                    img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&q=80" },
  { n: "08", name: "Handyman Repairs",        blurb: "Drywall holes, squeaky doors, mounted TVs, picture hanging, deck repair — the short list jobs.",        img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&q=80" },
]

const BEFORE_AFTER = [
  { label: "Kitchen — Mid Wilshire",    before: "https://images.unsplash.com/photo-1556909114-4f6e8d76f3aa?w=700&q=80", after: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80" },
  { label: "Master Bath — Glendale",    before: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=700&q=80", after: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=700&q=80" },
  { label: "Living Room — Pasadena",    before: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=700&q=80", after: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80" },
  { label: "Hallway floor — Burbank",   before: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=700&q=80", after: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80" },
]

const REVIEWS = [
  { name: "Maria T.", area: "Pasadena",    stars: 5, text: "Fixed our kitchen cabinets that another contractor walked away from. Came on time, finished early, charged exactly what they quoted. The kind of contractor you tell your friends about." },
  { name: "Daniel R.", area: "Burbank",    stars: 5, text: "Whole bathroom remodel in 9 days. Tile work is perfect, plumbing pressure-tested, they pulled all the permits. Clean job site every single day. I would hire them again tomorrow." },
  { name: "Jennifer K.", area: "Mid-City", stars: 5, text: "Got three quotes for refinishing our hardwood floors. They were the most reasonable AND finished a day ahead of schedule. Honest people. Hard to find these days." },
  { name: "Ahmed S.", area: "Glendale",    stars: 5, text: "Called them on a Saturday morning for a leaking sink. Tech showed up at 11 AM, had it fixed in under an hour, fair price. Now they're doing our laundry-room remodel." },
]

const AREAS = [
  "Los Angeles", "Hollywood", "Pasadena", "Burbank", "Glendale", "Studio City",
  "Sherman Oaks", "Mid-City", "West LA", "Culver City", "Beverly Hills", "Eagle Rock",
]

const WHY = [
  { title: "Free written estimates",     body: "On-site walk-through, line-item quote, no pressure. We don't start until you sign off." },
  { title: "Licensed & insured",         body: "CSLB-licensed general contractor. Workers comp + $2M liability — your home is covered." },
  { title: "On-schedule guarantee",      body: "We hit the date we promise. If we're late on our end, we discount the labor." },
  { title: "Cleanup included",           body: "We sweep, vacuum, and haul off debris every day. You shouldn't have to live in a job site." },
]

export default function AffordableHandymanPage() {
  const [form, setForm] = useState({ name: "", phone: "", project: "Kitchen Remodel", message: "" })
  const [honeypot, setHoneypot] = useState("")
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

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
            <span style={logoMark}>AHR</span>
            <span style={{ fontWeight: 900, fontSize: 14, letterSpacing: "-0.01em" }} className="hide-mobile">
              {BIZ.name}
            </span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href={`tel:${BIZ.phoneTel}`} style={callPill}>
              <span aria-hidden style={{ fontSize: 16 }}>☎</span>
              <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: "0.02em" }}>{BIZ.phone}</span>
            </a>
            <a href="#quote" style={ctaPill}>Free Quote</a>
          </div>
        </div>
      </header>

      <section id="top" style={{ position: "relative", overflow: "hidden", paddingTop: 72 }}>
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(${C.grid} 1px, transparent 1px),
                            linear-gradient(90deg, ${C.grid} 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
          maskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
          opacity: 0.7,
        }} />

        <div style={{ position: "relative", maxWidth: 1180, margin: "0 auto", padding: "56px 20px 56px", display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 60, alignItems: "center" }} className="hero-grid">
          <div>
            <div style={liveDot}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.live, boxShadow: `0 0 10px ${C.live}` }} />
              ANSWERING NOW · {BIZ.responseSla} response
            </div>

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
              {BIZ.city} handyman and remodel contractor since {BIZ.yearStarted}. Free written estimates, no markup on materials, every job priced before we start.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
              <a href={`tel:${BIZ.phoneTel}`} style={primaryBtn}>
                <span aria-hidden style={{ fontSize: 18 }}>☎</span>
                Call {BIZ.phone}
              </a>
              <a href="#quote" style={secondaryBtn}>
                Request Free Quote
                <span aria-hidden style={{ fontSize: 14 }}>→</span>
              </a>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 2 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} />
                ))}
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>
                {BIZ.rating} <span style={{ color: C.body, fontWeight: 500 }}>· {BIZ.reviewCount} reviews on Yelp & Google</span>
              </span>
            </div>
          </div>

          <div style={{ position: "relative", transform: `translateY(${scrollY * -0.05}px)` }}>
            <div style={heroFrame}>
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85"
                alt="Recently completed kitchen remodel"
                width={900} height={1100}
                priority
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <div style={jobSlip}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: C.body, letterSpacing: "0.15em" }}>JOB #1847</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: C.live, letterSpacing: "0.1em" }}>● COMPLETE</span>
              </div>
              <div style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif", fontSize: 17, fontWeight: 800, color: C.ink, marginBottom: 4 }}>Kitchen remodel — Mid-Wilshire</div>
              <div style={{ fontSize: 12, color: C.body, marginBottom: 10 }}>Cabinets, quartz counters, backsplash, recessed lighting</div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, borderTop: `1px solid ${C.line}` }}>
                <div>
                  <div style={{ fontSize: 9, color: C.body, fontWeight: 700, letterSpacing: "0.1em" }}>FINISHED</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: C.ink }}>11 days</div>
                </div>
                <div>
                  <div style={{ fontSize: 9, color: C.body, fontWeight: 700, letterSpacing: "0.1em" }}>vs QUOTE</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: C.accent }}>$0 over</div>
                </div>
                <div>
                  <div style={{ fontSize: 9, color: C.body, fontWeight: 700, letterSpacing: "0.1em" }}>RATING</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: C.ink }}>★ 5.0</div>
                </div>
              </div>
            </div>
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

      <section style={{ padding: "80px 20px 60px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <Eyebrow>What we fix</Eyebrow>
          <h2 style={h2Style}>
            From a leaky faucet to a full<br />
            <span style={{ color: C.accent }}>down-to-the-studs remodel.</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18, marginTop: 44 }}>
            {SERVICES.map(s => (
              <article key={s.n} style={serviceCard}>
                <div style={{ position: "relative", width: "100%", height: 180, overflow: "hidden" }}>
                  <Image src={s.img} alt={s.name} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 33vw" />
                  <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(255,255,255,0.95)", color: C.ink, padding: "4px 10px", borderRadius: 6, fontSize: 10, fontWeight: 800, letterSpacing: "0.12em" }}>
                    #{s.n}
                  </div>
                </div>
                <div style={{ padding: "18px 20px 22px" }}>
                  <h3 style={{ fontFamily: "var(--font-poppins)", fontSize: 17, fontWeight: 800, color: C.ink, letterSpacing: "-0.01em", marginBottom: 6 }}>
                    {s.name}
                  </h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.6, color: C.body }}>{s.blurb}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "60px 20px", background: C.tint, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <Eyebrow>Before → After</Eyebrow>
          <h2 style={h2Style}>Recent jobs.</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginTop: 36 }}>
            {BEFORE_AFTER.map(ba => (
              <BeforeAfterCard key={ba.label} {...ba} />
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

      <section style={{ padding: "60px 20px", background: C.tint, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <Eyebrow>What neighbors say</Eyebrow>
          <h2 style={h2Style}>
            <span style={{ display: "inline-flex", gap: 4, marginRight: 14, verticalAlign: "middle" }}>
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={26} />)}
            </span>
            {BIZ.rating} from {BIZ.reviewCount} reviews.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18, marginTop: 36 }}>
            {REVIEWS.map(r => (
              <article key={r.name + r.area} style={reviewCard}>
                <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                  {Array.from({ length: r.stars }).map((_, i) => <Star key={i} size={14} />)}
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: C.ink, marginBottom: 16 }}>&ldquo;{r.text}&rdquo;</p>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 13, color: C.ink }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: C.body }}>{r.area} · verified review</div>
                </div>
              </article>
            ))}
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

      <section id="quote" style={{ padding: "70px 20px 100px", background: C.deepTint, borderTop: `1px solid ${C.line}` }}>
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
              Licensed, insured, and bonded general contractor serving {BIZ.city} since {BIZ.yearStarted}.
            </p>
          </div>
          <div>
            <div style={footerLabel}>Contact</div>
            <a href={`tel:${BIZ.phoneTel}`} style={{ display: "block", color: "#fff", fontWeight: 800, fontSize: 18, textDecoration: "none", marginBottom: 6 }}>{BIZ.phone}</a>
            <a href={`mailto:${BIZ.email}`} style={{ display: "block", color: "#9ca3af", fontSize: 13, textDecoration: "none" }}>{BIZ.email}</a>
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
          <div style={{ fontSize: 12, color: "#6b7280" }}>© {new Date().getFullYear()} {BIZ.name}. CSLB Licensed · Bonded · Insured.</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>
            Designed &amp; built by <Link href="/" style={{ color: "#9ca3af", textDecoration: "underline" }}>NexaWeb</Link>
          </div>
        </div>
      </footer>

      <div style={mobileCtaBar} className="mobile-only-cta">
        <a href={`tel:${BIZ.phoneTel}`} style={{ ...callPill, padding: "12px 16px", flex: 1, justifyContent: "center" }}>
          <span aria-hidden style={{ fontSize: 16 }}>☎</span>
          <span style={{ fontWeight: 800, fontSize: 14 }}>Call now</span>
        </a>
        <a href="#quote" style={{ ...ctaPill, padding: "12px 16px", flex: 1, justifyContent: "center", display: "flex", alignItems: "center" }}>
          Quote
        </a>
      </div>

      <style jsx global>{`
        @media (max-width: 820px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .trust-grid { grid-template-columns: repeat(2, 1fr) !important; row-gap: 18px !important; }
          .hide-mobile { display: none !important; }
        }
        @media (min-width: 768px) {
          .mobile-only-cta { display: none !important; }
        }
        @media (max-width: 767px) {
          body { padding-bottom: 70px; }
        }
      `}</style>
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
  background: "rgba(250,250,247,0.92)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
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
