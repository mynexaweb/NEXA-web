"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Star, Check, ArrowRight, Shield, Award, Clock } from "lucide-react";

const C = {
  bg: "#0f0d08", bgAlt: "#161209", bgCard: "rgba(255,255,255,0.04)",
  accent: "#eab308", accentDark: "#a16207", accentPale: "rgba(234,179,8,0.1)",
  orange: "#f97316", orangePale: "rgba(249,115,22,0.1)",
  text: "#ffffff", body: "rgba(255,255,255,0.62)", muted: "rgba(255,255,255,0.32)",
  border: "rgba(255,255,255,0.07)", borderMed: "rgba(234,179,8,0.3)",
};

const SERVICES = [
  { icon: "🏠", name: "Custom Home Builds", tag: "Residential", desc: "From groundbreaking to move-in. We self-perform concrete, framing, and finishing — no blind subcontracting." },
  { icon: "🏢", name: "Commercial Construction", tag: "Commercial", desc: "Offices, retail, warehouses, hospitality. On-schedule delivery with certified project managers on every job." },
  { icon: "🔨", name: "Major Renovations", tag: "Residential", desc: "Full gut renovations, additions, and structural work. We pull permits, we handle inspections, you just move in." },
  { icon: "🏗️", name: "Site Development", tag: "Commercial", desc: "Land clearing, grading, utility installation, parking structures, and multi-phase commercial site work." },
];

const PROJECTS = [
  { name: "The Ridgeline Residences", type: "Custom Homes · 12-Unit Development", value: "$4.2M", time: "14 months", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" },
  { name: "Vertex Commerce Center", type: "Commercial · 48,000 sq ft", value: "$8.7M", time: "22 months", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80" },
  { name: "Cedar Falls Modern", type: "Custom Renovation · 4,800 sq ft", value: "$980K", time: "8 months", img: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=600&q=80" },
];

const REVIEWS = [
  { name: "Patricia W.", role: "Homeowner", rating: 5, text: "BuildCore built our dream home in 14 months — two weeks ahead of schedule. Budget was honored to the dollar. Every trade showed up, every punch list item was handled before we moved in. Rare." },
  { name: "Michael S.", role: "Commercial Developer", rating: 5, text: "Third project with BuildCore. They're the only GC I've worked with who can go from design approval to final CO without the usual nightmare. My bank loves them too. Professional at every level." },
  { name: "Anna R.", role: "Homeowner", rating: 5, text: "Major addition — we added 1,800 sq ft and an entire kitchen. They were transparent about timeline, communicated weekly, and the craftsmanship is exceptional. All our neighbors have asked for the card." },
];

const STATS = [["15+", "Years Building"], ["$120M+", "Projects Delivered"], ["400+", "Homes & Buildings"], ["98%", "On-Time Rate"]];

interface Props { isOpen: boolean; onClose: () => void; }

export function BuildCoreDemo({ isOpen, onClose }: Props) {
  const [pType, setPType] = useState("Custom Home Build");
  const [budget, setBudget] = useState("$500K – $1M");
  const [timeline, setTimeline] = useState("Within 6 months");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] overflow-y-auto"
          style={{ background: C.bg }}
        >
          {/* NAV */}
          <nav style={{ background: C.bgAlt, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 50 }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🏗️</div>
                <div>
                  <div style={{ fontWeight: 900, fontSize: 17, color: C.text, letterSpacing: "-0.02em" }}>BUILD<span style={{ color: C.accent }}>CORE</span></div>
                  <div style={{ fontSize: 10, color: C.muted, fontWeight: 600, letterSpacing: "0.06em" }}>GENERAL CONTRACTORS</div>
                </div>
              </div>
              <div className="hidden sm:flex items-center" style={{ gap: 26 }}>
                {["Projects", "Services", "Process", "About"].map(n => (
                  <a key={n} href={`#bc-${n.toLowerCase()}`} style={{ fontSize: 13, fontWeight: 500, color: C.body, textDecoration: "none" }}>{n}</a>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <a href="#" onClick={(e) => e.preventDefault()} className="hidden sm:flex items-center" style={{ gap: 6, fontSize: 13, fontWeight: 700, color: C.accent, textDecoration: "none" }}>
                  <Phone size={14} /> (555) 482-6273
                </a>
                <a href="#bc-quote" className="hidden sm:block" style={{ background: C.accent, color: "#0f0d08", textDecoration: "none", borderRadius: 999, padding: "9px 18px", fontSize: 13, fontWeight: 800 }}>Free Quote</a>
                <button onClick={onClose} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999, width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <X size={16} color="white" />
                </button>
              </div>
            </div>
          </nav>

          {/* DEMO SITE BANNER — sticky, prominent */}
          <div style={{
            position: "sticky", top: 62, zIndex: 49,
            background: "linear-gradient(90deg, #0a0700 0%, #1a1000 50%, #0a0700 100%)",
            borderBottom: "1px solid rgba(252,211,77,0.32)",
            padding: "10px 20px", textAlign: "center",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          }}>
            <span style={{ fontSize: 15 }}>⚠️</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#fcd34d", letterSpacing: "0.01em" }}>
              DEMO SITE — Not a real business.{" "}
              <span style={{ color: "#fb923c" }}>Built by NexaWeb</span> to showcase what we can build for you.
            </span>
          </div>

          {/* HERO */}
          <section style={{ position: "relative", overflow: "hidden", minHeight: 580 }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80')", backgroundSize: "cover", backgroundPosition: "center" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(15,13,8,0.97) 45%, rgba(15,13,8,0.8) 65%, rgba(15,13,8,0.3) 100%)" }} />
            <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", padding: "90px 20px 80px" }}>
              <div style={{ maxWidth: 560 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
                  {["🏆 Top-Rated GC", "✅ Licensed & Bonded", "📋 On-Budget Guarantee"].map(b => (
                    <div key={b} style={{ background: "rgba(255,255,255,0.07)", border: `1px solid ${C.border}`, borderRadius: 999, padding: "5px 12px", fontSize: 11, fontWeight: 700, color: C.body }}>{b}</div>
                  ))}
                </div>
                <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 900, color: C.text, lineHeight: 1.05, marginBottom: 20, letterSpacing: "-0.03em" }}>
                  Built Right.<br /><span style={{ color: C.accent }}>Built to Last.</span>
                </h1>
                <p style={{ fontSize: 17, color: C.body, marginBottom: 14, lineHeight: 1.65, maxWidth: 460 }}>
                  General contractors you can actually trust. Custom homes, commercial builds, and major renovations — delivered on time, on budget, every time.
                </p>
                <p style={{ fontSize: 14, color: C.accent, fontWeight: 700, marginBottom: 32 }}>
                  15+ years · $120M+ delivered · 98% on-time completion rate
                </p>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <a href="#bc-quote" style={{ background: C.accent, color: "#0f0d08", textDecoration: "none", borderRadius: 12, padding: "16px 32px", fontSize: 16, fontWeight: 900, boxShadow: "0 8px 36px rgba(234,179,8,0.35)", display: "flex", alignItems: "center", gap: 8 }}>
                    Get Free Quote <ArrowRight size={16} />
                  </a>
                  <a href="#bc-projects" style={{ background: "rgba(255,255,255,0.07)", color: C.text, textDecoration: "none", border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 24px", fontSize: 15, fontWeight: 700 }}>
                    View Our Work
                  </a>
                </div>
                <div style={{ display: "flex", gap: 20, marginTop: 28, flexWrap: "wrap" }}>
                  {["No upfront deposits", "Written price guarantee", "Weekly progress updates", "Permit & inspection handled"].map(t => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 5, color: C.muted, fontSize: 12 }}>
                      <Check size={12} color={C.accent} strokeWidth={2.5} /> {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* STATS */}
          <section style={{ background: C.accent, padding: "28px 20px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, textAlign: "center" }}>
              {STATS.map(([n, l]) => (
                <div key={l}><div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f0d08" }}>{n}</div><div style={{ fontSize: 12, color: "rgba(15,13,8,0.65)", marginTop: 2 }}>{l}</div></div>
              ))}
            </div>
          </section>

          {/* SERVICES */}
          <section id="bc-services" style={{ padding: "70px 20px", background: C.bgAlt }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.accent, marginBottom: 10 }}>What We Build</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, color: C.text, letterSpacing: "-0.02em" }}>Residential &amp; Commercial</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
                {SERVICES.map((s) => (
                  <div key={s.name} style={{ background: C.bgCard, borderRadius: 18, padding: 28, border: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 32, marginBottom: 14 }}>{s.icon}</div>
                    <div style={{ display: "inline-block", background: C.accentPale, border: `1px solid rgba(234,179,8,0.2)`, borderRadius: 999, padding: "3px 10px", fontSize: 10, fontWeight: 700, color: C.accent, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.tag}</div>
                    <div style={{ fontWeight: 800, fontSize: 16, color: C.text, marginBottom: 10 }}>{s.name}</div>
                    <p style={{ fontSize: 13, color: C.body, lineHeight: 1.65 }}>{s.desc}</p>
                    <a href="#bc-quote" style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 16, fontSize: 13, fontWeight: 700, color: C.accent, textDecoration: "none" }}>
                      Get a Quote <ArrowRight size={13} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FEATURED PROJECTS */}
          <section id="bc-projects" style={{ padding: "70px 20px", background: C.bg }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.accent, marginBottom: 10 }}>Featured Work</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900, color: C.text, letterSpacing: "-0.02em" }}>Projects We&apos;re Proud Of</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 22 }}>
                {PROJECTS.map((p) => (
                  <div key={p.name} style={{ background: C.bgCard, borderRadius: 20, overflow: "hidden", border: `1px solid ${C.border}` }}>
                    <div style={{ height: 200, backgroundImage: `url('${p.img}')`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)" }} />
                    </div>
                    <div style={{ padding: 24 }}>
                      <div style={{ fontWeight: 800, fontSize: 15, color: C.text, marginBottom: 4 }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>{p.type}</div>
                      <div style={{ display: "flex", gap: 20 }}>
                        <div><div style={{ fontSize: 12, color: C.muted }}>Project Value</div><div style={{ fontWeight: 800, color: C.accent, fontSize: 15 }}>{p.value}</div></div>
                        <div><div style={{ fontSize: 12, color: C.muted }}>Timeline</div><div style={{ fontWeight: 800, color: C.text, fontSize: 15 }}>{p.time}</div></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* REVIEWS */}
          <section style={{ padding: "70px 20px", background: C.bgAlt }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 14 }}>
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={20} fill="#fbbf24" color="#fbbf24" />)}
                </div>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 900, color: C.text, letterSpacing: "-0.02em" }}>What Our Clients Say</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
                {REVIEWS.map((r) => (
                  <div key={r.name} style={{ background: C.bgCard, borderRadius: 18, padding: 28, border: `1px solid ${C.border}` }}>
                    <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                      {Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />)}
                    </div>
                    <p style={{ fontSize: 14, color: C.body, lineHeight: 1.75, marginBottom: 18 }}>"{r.text}"</p>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 13, color: C.text }}>{r.name}</div>
                      <div style={{ fontSize: 12, color: C.muted }}>{r.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* QUOTE FORM */}
          <section id="bc-quote" style={{ padding: "70px 20px", background: C.bg }}>
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 36 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.accent, marginBottom: 10 }}>Start Your Project</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900, color: C.text, letterSpacing: "-0.02em" }}>Get a Free Project Quote</h2>
                <p style={{ color: C.body, marginTop: 10, fontSize: 14 }}>We respond within 4 business hours with a preliminary scope review.</p>
              </div>
              <div style={{ background: C.bgCard, borderRadius: 24, padding: 40, border: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 5, textTransform: "uppercase" }}>Name</label>
                      <input placeholder="Your name" style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${C.borderMed}`, fontSize: 14, color: C.text, background: "rgba(255,255,255,0.05)", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 5, textTransform: "uppercase" }}>Phone</label>
                      <input placeholder="(555) 000-0000" style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${C.borderMed}`, fontSize: 14, color: C.text, background: "rgba(255,255,255,0.05)", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 5, textTransform: "uppercase" }}>Project Type</label>
                    <select value={pType} onChange={e => setPType(e.target.value)} style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${C.borderMed}`, fontSize: 14, color: C.text, background: "#161209", outline: "none" }}>
                      {["Custom Home Build", "Major Renovation", "Commercial Build", "Site Development", "Addition / ADU", "Not Sure Yet"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 5, textTransform: "uppercase" }}>Budget Range</label>
                      <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${C.borderMed}`, fontSize: 14, color: C.text, background: "#161209", outline: "none" }}>
                        {["Under $250K", "$250K – $500K", "$500K – $1M", "$1M – $5M", "$5M+", "Not Sure"].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 5, textTransform: "uppercase" }}>Start Timeline</label>
                      <select value={timeline} onChange={e => setTimeline(e.target.value)} style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${C.borderMed}`, fontSize: 14, color: C.text, background: "#161209", outline: "none" }}>
                        {["Within 6 months", "6–12 months", "1–2 years", "Just exploring"].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>
                  <textarea placeholder="Tell us about your project..." rows={3} style={{ padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${C.borderMed}`, fontSize: 14, color: C.text, background: "rgba(255,255,255,0.05)", outline: "none", resize: "none" }} />
                  <button style={{ background: C.accent, color: "#0f0d08", border: "none", borderRadius: 12, padding: "16px 0", fontSize: 16, fontWeight: 900, cursor: "pointer", boxShadow: `0 8px 30px rgba(234,179,8,0.3)` }}>
                    Request Free Quote →
                  </button>
                  <p style={{ textAlign: "center", fontSize: 12, color: C.muted }}>✓ Response within 4 hrs · Written estimate included · No obligation</p>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer style={{ background: "rgba(0,0,0,0.5)", padding: "36px 20px", textAlign: "center", borderTop: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: C.text, marginBottom: 6 }}>🏗️ BUILD<span style={{ color: C.accent }}>CORE</span></div>
            <p style={{ color: C.muted, fontSize: 13 }}>Dallas, TX · (555) 482-6273 · General Contractor Lic. #GC-29481 · Bonded &amp; Insured</p>
            <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 11, marginTop: 10 }}>Demo site by NexaWeb · Not a real business</p>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
