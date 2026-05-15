"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Star, Check, Clock, Shield, Zap, ArrowRight, AlertTriangle } from "lucide-react";

const C = {
  bg: "#050e1a", bgAlt: "#071524", bgCard: "rgba(255,255,255,0.04)",
  accent: "#0ea5e9", accentDark: "#0284c7", accentPale: "rgba(14,165,233,0.1)",
  green: "#22c55e", greenPale: "rgba(34,197,94,0.12)",
  text: "#ffffff", body: "rgba(255,255,255,0.65)", muted: "rgba(255,255,255,0.35)",
  border: "rgba(255,255,255,0.08)", borderMed: "rgba(14,165,233,0.3)",
};

const SERVICES = [
  { icon: "🚨", name: "Emergency Plumbing", price: "From $149", desc: "Burst pipes, flooding, sewage backup — we're on-site in under 60 minutes." },
  { icon: "🚿", name: "Drain Cleaning", price: "From $129", desc: "Power hydro-jetting + camera inspection. We clear it and show you the proof." },
  { icon: "🔥", name: "Water Heater", price: "From $799", desc: "Tank & tankless install, repair, and replacement. Same-day service available." },
  { icon: "🔍", name: "Leak Detection", price: "From $199", desc: "Non-invasive electronic detection. Find the leak before it destroys the wall." },
  { icon: "🪠", name: "Sewer & Sump", price: "From $299", desc: "Sewer line repair, replacement, and sump pump installation & service." },
  { icon: "🛁", name: "Bathroom & Kitchen", price: "From $99", desc: "Faucet, toilet, garbage disposal, dishwasher connection — anything you need." },
];

const PRICING = [
  { name: "Service Call", price: "$89", note: "Waived with any repair over $250", features: ["Diagnosis included", "Upfront written estimate", "No hidden fees"] },
  { name: "Drain Clearing", price: "from $129", note: "Most drains done in under 30 min", features: ["Camera inspection included", "90-day guarantee", "Roots, grease, buildup"] },
  { name: "Emergency Call-Out", price: "from $199", note: "After-hours, weekends & holidays", features: ["60-min response time", "Full repair on first visit", "Parts on the truck"] },
];

const REVIEWS = [
  { name: "Tom V.", location: "Phoenix, AZ", rating: 5, text: "2am on a Sunday. Water pouring through my kitchen ceiling. FlowFix had someone at my door in 47 minutes. Fixed by 4am. Pricing was completely fair given the emergency. Absolute legends." },
  { name: "Rachel M.", location: "Scottsdale, AZ", rating: 5, text: "Called 3 plumbers. Only FlowFix gave me a price before they came out. No surprises on the bill. The tech even showed me on camera exactly where the blockage was. Trust built." },
  { name: "David C.", location: "Tempe, AZ", rating: 5, text: "Been using them for 4 years. They've done my water heater, two drain cleanouts, and a toilet replacement. Every single time: professional, on time, no mess. That's rare." },
];

interface Props { isOpen: boolean; onClose: () => void; }

export function FlowFixDemo({ isOpen, onClose }: Props) {
  const [bookDate, setBookDate] = useState("Today");
  const [bookTime, setBookTime] = useState("ASAP");
  const [bookService, setBookService] = useState("Emergency Plumbing");

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
          {/* TOP BAR */}
          <div style={{ background: C.accent, padding: "10px 20px", textAlign: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: "white" }}>
              🔧 24/7 EMERGENCY LINE — Call Now: <a href="tel:5553562394" style={{ color: "white", textDecoration: "underline" }}>(555) FLO-WFIX</a> · We Answer Every Call
            </span>
          </div>

          {/* NAV */}
          <nav style={{ background: C.bgAlt, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 50 }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 62 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🔧</div>
                <div>
                  <div style={{ fontWeight: 900, fontSize: 17, color: C.text, letterSpacing: "-0.02em" }}>FlowFix</div>
                  <div style={{ fontSize: 10, color: C.accent, fontWeight: 700, letterSpacing: "0.05em" }}>MASTER PLUMBERS</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 26, alignItems: "center" }}>
                {["Services", "Pricing", "Book Online", "Reviews"].map(n => (
                  <a key={n} href={`#ff-${n.toLowerCase().replace(" ", "-")}`} style={{ fontSize: 13, fontWeight: 500, color: C.body, textDecoration: "none" }}>{n}</a>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <a href="tel:5553562394" style={{ display: "flex", alignItems: "center", gap: 6, background: C.accent, color: "white", textDecoration: "none", borderRadius: 999, padding: "9px 18px", fontSize: 13, fontWeight: 800 }}>
                  <Phone size={14} /> Call Now
                </a>
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
          <section style={{ padding: "70px 20px 60px", background: `linear-gradient(160deg, ${C.bgAlt} 0%, ${C.bg} 60%)`, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 600, height: 600, background: "radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
              <div>
                {/* LIVE indicator */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.greenPale, border: `1px solid rgba(34,197,94,0.3)`, borderRadius: 999, padding: "7px 16px", marginBottom: 24 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, display: "inline-block", boxShadow: `0 0 8px ${C.green}` }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: C.green }}>We&apos;re live right now — phones answered immediately</span>
                </div>
                <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 900, color: C.text, lineHeight: 1.05, marginBottom: 20, letterSpacing: "-0.03em" }}>
                  24/7 Plumbing<br /><span style={{ color: C.accent }}>You Can Count On.</span>
                </h1>
                <p style={{ fontSize: 17, color: C.body, marginBottom: 32, lineHeight: 1.7, maxWidth: 460 }}>
                  Same-day service. Upfront pricing. Master-licensed plumbers. No emergency is too big or too small — we fix it right the first time.
                </p>
                {/* BIG PHONE NUMBER */}
                <a href="tel:5553562394" style={{ display: "flex", alignItems: "center", gap: 14, background: C.accent, color: "white", textDecoration: "none", borderRadius: 16, padding: "20px 32px", fontSize: "1.6rem", fontWeight: 900, boxShadow: "0 8px 40px rgba(14,165,233,0.4)", letterSpacing: "-0.01em", marginBottom: 14, width: "fit-content" }}>
                  <Phone size={26} /> (555) FLO-WFIX
                </a>
                <a href="#ff-book-online" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.accent, textDecoration: "none", fontSize: 15, fontWeight: 700, border: `1px solid ${C.borderMed}`, borderRadius: 12, padding: "12px 22px" }}>
                  📅 Book Online <ArrowRight size={15} />
                </a>
                <div style={{ display: "flex", gap: 22, marginTop: 28, flexWrap: "wrap" }}>
                  {["Master-Licensed", "60-Min Response", "Upfront Pricing", "No Overtime Fees"].map(t => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, color: C.muted, fontSize: 12 }}>
                      <Check size={12} color={C.accent} strokeWidth={2.5} /> {t}
                    </div>
                  ))}
                </div>
              </div>
              {/* STATS CARD */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  { value: "60 min", label: "Emergency Response", icon: Zap, color: C.accent },
                  { value: "4.9 ★", label: "Google Rating", icon: Star, color: "#fbbf24" },
                  { value: "15 yrs", label: "In Business", icon: Shield, color: C.green },
                  { value: "0 hidden", label: "Fees. Ever.", icon: Check, color: "#a78bfa" },
                ].map(({ value, label, icon: Icon, color }) => (
                  <div key={label} style={{ background: C.bgCard, borderRadius: 16, padding: 22, border: `1px solid ${C.border}`, textAlign: "center" }}>
                    <Icon size={22} color={color} style={{ margin: "0 auto 10px" }} />
                    <div style={{ fontSize: "1.5rem", fontWeight: 900, color: C.text, lineHeight: 1 }}>{value}</div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 5 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SERVICES */}
          <section id="ff-services" style={{ padding: "70px 20px", background: C.bgAlt }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.accent, marginBottom: 10 }}>Services</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, color: C.text, letterSpacing: "-0.02em" }}>Every Plumbing Problem Solved</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
                {SERVICES.map((s) => (
                  <div key={s.name} style={{ background: C.bgCard, borderRadius: 16, padding: 26, border: `1px solid ${C.border}`, display: "flex", gap: 18, alignItems: "flex-start" }}>
                    <div style={{ fontSize: 30, flexShrink: 0 }}>{s.icon}</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 15, color: C.text, marginBottom: 4 }}>{s.name}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: C.accent, marginBottom: 8 }}>{s.price}</div>
                      <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6 }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PRICING */}
          <section id="ff-pricing" style={{ padding: "70px 20px", background: C.bg }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.accent, marginBottom: 10 }}>Transparent Pricing</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900, color: C.text, letterSpacing: "-0.02em" }}>You Know the Price Before We Start</h2>
                <p style={{ color: C.body, marginTop: 10, fontSize: 14 }}>We give you a written estimate before touching anything. No surprises, period.</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
                {PRICING.map((p) => (
                  <div key={p.name} style={{ background: C.bgCard, borderRadius: 18, padding: 28, border: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: "1.8rem", fontWeight: 900, color: C.accent }}>{p.price}</div>
                    <div style={{ fontWeight: 800, fontSize: 15, color: C.text, marginBottom: 4, marginTop: 4 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: C.muted, marginBottom: 20 }}>{p.note}</div>
                    {p.features.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.body, marginBottom: 8 }}>
                        <Check size={14} color={C.green} strokeWidth={2.5} /> {f}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* REVIEWS */}
          <section id="ff-reviews" style={{ padding: "70px 20px", background: C.bgAlt }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 14 }}>
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={20} fill="#fbbf24" color="#fbbf24" />)}
                </div>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 900, color: C.text, letterSpacing: "-0.02em" }}>Trusted by 1,200+ Homeowners</h2>
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
                      <div style={{ fontSize: 12, color: C.muted }}>{r.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* BOOK ONLINE */}
          <section id="ff-book-online" style={{ padding: "70px 20px", background: C.bg }}>
            <div style={{ maxWidth: 600, margin: "0 auto" }}>
              <div style={{ background: C.bgCard, borderRadius: 24, padding: 40, border: `1px solid ${C.border}` }}>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 900, color: C.text, marginBottom: 6 }}>Book a Plumber Online</h2>
                <p style={{ fontSize: 13, color: C.muted, marginBottom: 28 }}>We'll confirm your slot within 30 minutes and send a tech bio before arrival.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { label: "Date", value: bookDate, set: setBookDate, opts: ["Today", "Tomorrow", "In 2 days", "This weekend", "Next week"] },
                    { label: "Preferred Time", value: bookTime, set: setBookTime, opts: ["ASAP", "Morning (8–12)", "Afternoon (12–5)", "Evening (5–8)"] },
                    { label: "Service Needed", value: bookService, set: setBookService, opts: ["Emergency Plumbing", "Drain Cleaning", "Water Heater", "Leak Detection", "Sewer / Sump", "Bathroom or Kitchen", "Not Sure — Need Diagnosis"] },
                  ].map(({ label, value, set, opts }) => (
                    <div key={label}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 5, textTransform: "uppercase" }}>{label}</label>
                      <select value={value} onChange={e => set(e.target.value)} style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${C.borderMed}`, fontSize: 14, color: C.text, background: C.bgAlt, outline: "none" }}>
                        {opts.map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                  <input placeholder="Your name" style={{ padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${C.borderMed}`, fontSize: 14, color: C.text, background: "rgba(255,255,255,0.06)", outline: "none" }} />
                  <input placeholder="Phone number" style={{ padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${C.borderMed}`, fontSize: 14, color: C.text, background: "rgba(255,255,255,0.06)", outline: "none" }} />
                  <button style={{ background: C.accent, color: "white", border: "none", borderRadius: 12, padding: "16px 0", fontSize: 16, fontWeight: 900, cursor: "pointer", boxShadow: `0 8px 30px rgba(14,165,233,0.35)`, marginTop: 4 }}>
                    Book My Plumber →
                  </button>
                  <p style={{ textAlign: "center", fontSize: 12, color: C.muted }}>Confirmed within 30 min · Tech bio sent before arrival · Upfront pricing always</p>
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: 24 }}>
                <p style={{ fontSize: 16, color: C.body, fontWeight: 700 }}>Emergency right now? Don&apos;t wait.</p>
                <a href="tel:5553562394" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "white", textDecoration: "none", background: C.accent, borderRadius: 12, padding: "14px 30px", fontSize: "1.2rem", fontWeight: 900, marginTop: 12, boxShadow: "0 6px 24px rgba(14,165,233,0.35)" }}>
                  <Phone size={20} /> (555) FLO-WFIX
                </a>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer style={{ background: "rgba(0,0,0,0.5)", padding: "36px 20px", textAlign: "center", borderTop: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: C.text, marginBottom: 6 }}>🔧 FlowFix Plumbing</div>
            <p style={{ color: C.muted, fontSize: 13 }}>Phoenix, AZ · (555) 356-2394 · Master License #MP-48291 · Serving Greater Phoenix</p>
            <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 11, marginTop: 10 }}>Demo site by NexaWeb · Not a real business</p>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
