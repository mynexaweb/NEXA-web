"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Star, Check, Shield, Award, Clock, AlertTriangle, ArrowRight } from "lucide-react";

const C = {
  bg: "#0c1525", bgAlt: "#0f1d30", bgCard: "rgba(255,255,255,0.04)",
  accent: "#f97316", accentDark: "#c2620f", accentPale: "rgba(249,115,22,0.12)",
  gold: "#fbbf24",
  text: "#ffffff", body: "rgba(255,255,255,0.65)", muted: "rgba(255,255,255,0.35)",
  border: "rgba(255,255,255,0.08)", borderMed: "rgba(255,255,255,0.13)",
};

const SERVICES = [
  { name: "Roof Replacement", icon: "🏠", desc: "Full residential & commercial reroof with premium materials and lifetime workmanship warranty." },
  { name: "Storm Damage Repair", icon: "⛈️", desc: "24/7 emergency response. We handle insurance claims — you shouldn't have to fight that battle alone." },
  { name: "Free Roof Inspection", icon: "🔍", desc: "No-obligation, 40-point inspection with a full written report and photos — even if you don't use us." },
  { name: "Insurance Claims", icon: "📋", desc: "We work directly with your insurance adjuster. 96% of our storm clients pay $0 out of pocket." },
  { name: "Gutters & Fascia", icon: "🪣", desc: "Complete gutter replacement, seamless aluminum, copper, and full fascia board restoration." },
  { name: "Commercial Roofing", icon: "🏢", desc: "TPO, EPDM, metal roofing for commercial buildings. Maintenance contracts available." },
];

const REVIEWS = [
  { name: "Michael H.", location: "Austin, TX", rating: 5, text: "Ridge sent someone out within 3 hours of the storm. By the time my adjuster came, they already had the full damage documented with photos. I paid my deductible and that was it. Lifesavers." },
  { name: "Sandra L.", location: "Round Rock, TX", rating: 5, text: "The inspection found damage my previous roofer said wasn't there. It saved me from a catastrophic leak. The whole team was professional, clean, and done in two days flat." },
  { name: "James K.", location: "Cedar Park, TX", rating: 5, text: "5 bids. Ridge was mid-range on price and hands-down the best quality. The crew cleaned everything. You'd never know they were here except for the beautiful new roof." },
];

const TRUST = [
  { value: "22+", label: "Years in Business" },
  { value: "3,800+", label: "Roofs Replaced" },
  { value: "A+", label: "BBB Rating" },
  { value: "96%", label: "Insurance Win Rate" },
];

interface Props { isOpen: boolean; onClose: () => void; }

export function RidgeRoofingDemo({ isOpen, onClose }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [issue, setIssue] = useState("Storm/Hail Damage");

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
          {/* EMERGENCY BAR */}
          <div style={{ background: C.accent, padding: "10px 20px", textAlign: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: "white" }}>
              ⛈️ Storm damage? Don't wait — call NOW: <a href="tel:5552478763" style={{ color: "white", textDecoration: "underline" }}>(555) 247-ROOF</a> · 24/7 Emergency Response
            </span>
          </div>

          {/* NAV */}
          <nav style={{ background: C.bgAlt, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 50 }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 62 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🏠</div>
                <div>
                  <div style={{ fontWeight: 900, fontSize: 16, color: C.text, letterSpacing: "-0.01em", lineHeight: 1.1 }}>Ridge Roofing</div>
                  <div style={{ fontSize: 10, color: C.muted, fontWeight: 600, letterSpacing: "0.05em" }}>Licensed · Insured · Since 2002</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 26, alignItems: "center" }}>
                {["Services", "Gallery", "Reviews", "Contact"].map(n => (
                  <a key={n} href={`#rr-${n.toLowerCase()}`} style={{ fontSize: 13, fontWeight: 500, color: C.body, textDecoration: "none" }}>{n}</a>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <a href="tel:5552478763" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: C.accent, textDecoration: "none" }}>
                  <Phone size={14} /> (555) 247-ROOF
                </a>
                <a href="#rr-quote" style={{ background: C.accent, color: "white", textDecoration: "none", borderRadius: 999, padding: "9px 18px", fontSize: 13, fontWeight: 700 }}>Free Inspection</a>
                <button onClick={onClose} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999, width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <X size={16} color="white" />
                </button>
              </div>
            </div>
          </nav>

          {/* DEMO SITE BANNER — sticky, prominent */}
          <div style={{
            position: "sticky", top: 102, zIndex: 49,
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
            <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80')", backgroundSize: "cover", backgroundPosition: "center" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(12,21,37,0.97) 40%, rgba(12,21,37,0.75) 70%, rgba(12,21,37,0.4) 100%)" }} />
            <div style={{ position: "relative", maxWidth: 580, margin: "0 auto", padding: "90px 20px 80px" }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
                {["🏆 A+ BBB Rating", "⭐ 4.9/5 (800+ Reviews)", "✅ Licensed & Insured"].map(b => (
                  <div key={b} style={{ background: "rgba(255,255,255,0.08)", border: `1px solid ${C.border}`, borderRadius: 999, padding: "5px 12px", fontSize: 11, fontWeight: 700, color: C.body }}>{b}</div>
                ))}
              </div>
              <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 900, color: C.text, lineHeight: 1.08, marginBottom: 20, letterSpacing: "-0.025em" }}>
                Protect What<br />Matters Most.
              </h1>
              <p style={{ fontSize: 17, color: C.body, marginBottom: 14, lineHeight: 1.65, maxWidth: 460 }}>
                Austin&apos;s most trusted roofing contractor. Storm damage, full replacements, free inspections — we do it all, and we do it right.
              </p>
              <p style={{ fontSize: 14, color: C.accent, fontWeight: 700, marginBottom: 32 }}>⚡ 96% of insurance claims we handle result in $0 out of pocket for homeowners.</p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <a href="#rr-quote" style={{ background: C.accent, color: "white", textDecoration: "none", borderRadius: 12, padding: "16px 32px", fontSize: 16, fontWeight: 900, boxShadow: "0 8px 36px rgba(249,115,22,0.45)", display: "flex", alignItems: "center", gap: 8 }}>
                  Get FREE Roof Inspection <ArrowRight size={16} />
                </a>
                <a href="tel:5552478763" style={{ background: "rgba(255,255,255,0.08)", color: C.text, textDecoration: "none", border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 24px", fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                  <Phone size={16} /> Call 24/7
                </a>
              </div>
              <div style={{ display: "flex", gap: 22, marginTop: 28, flexWrap: "wrap" }}>
                {["No obligation", "Full written report", "Insurance guidance included", "Photos provided"].map(t => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 5, color: C.muted, fontSize: 12 }}>
                    <Check size={12} color={C.accent} strokeWidth={2.5} /> {t}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* TRUST STATS */}
          <section style={{ background: C.accent, padding: "28px 20px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, textAlign: "center" }}>
              {TRUST.map(({ value, label }) => (
                <div key={label}><div style={{ fontSize: "1.9rem", fontWeight: 900, color: "white" }}>{value}</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.78)", marginTop: 2 }}>{label}</div></div>
              ))}
            </div>
          </section>

          {/* SERVICES */}
          <section id="rr-services" style={{ padding: "70px 20px", background: C.bgAlt }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.accent, marginBottom: 10 }}>What We Do</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, color: C.text, letterSpacing: "-0.02em" }}>Complete Roofing Solutions</h2>
                <p style={{ color: C.body, marginTop: 10, fontSize: 15, maxWidth: 500, margin: "10px auto 0" }}>From storm emergencies to full replacements — one call handles everything.</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
                {SERVICES.map((s) => (
                  <div key={s.name} style={{ background: C.bgCard, borderRadius: 16, padding: 26, border: `1px solid ${C.border}`, transition: "border-color 0.2s" }}>
                    <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                    <div style={{ fontWeight: 800, fontSize: 15, color: C.text, marginBottom: 8 }}>{s.name}</div>
                    <p style={{ fontSize: 13, color: C.body, lineHeight: 1.65 }}>{s.desc}</p>
                    <a href="#rr-quote" style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 16, fontSize: 13, fontWeight: 700, color: C.accent, textDecoration: "none" }}>
                      Get Free Quote <ArrowRight size={13} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* REVIEWS */}
          <section id="rr-reviews" style={{ padding: "70px 20px", background: C.bg }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 14 }}>
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={20} fill={C.gold} color={C.gold} />)}
                </div>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900, color: C.text, letterSpacing: "-0.02em" }}>4.9 Stars · 800+ Verified Reviews</h2>
                <p style={{ color: C.body, marginTop: 8, fontSize: 14 }}>Google, HomeAdvisor, BBB — consistently top-rated across every platform.</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
                {REVIEWS.map((r) => (
                  <div key={r.name} style={{ background: C.bgCard, borderRadius: 18, padding: 28, border: `1px solid ${C.border}` }}>
                    <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                      {Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={14} fill={C.gold} color={C.gold} />)}
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

          {/* QUOTE FORM */}
          <section id="rr-quote" style={{ padding: "70px 20px", background: C.bgAlt }}>
            <div style={{ maxWidth: 680, margin: "0 auto" }}>
              <div style={{ background: C.bgCard, borderRadius: 24, padding: 40, border: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                  <div style={{ background: C.accentPale, borderRadius: 10, padding: "8px 10px" }}>
                    <Shield size={20} color={C.accent} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: C.text, letterSpacing: "-0.01em" }}>Free Roof Inspection</h2>
                    <p style={{ fontSize: 13, color: C.muted }}>No obligation · Full written report · Usually within 24 hours</p>
                  </div>
                </div>
                <div style={{ height: 1, background: C.border, margin: "20px 0" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 5, textTransform: "uppercase" }}>Your Name</label>
                      <input value={name} onChange={e => setName(e.target.value)} placeholder="John Smith" style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${C.borderMed}`, fontSize: 14, color: C.text, background: "rgba(255,255,255,0.06)", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 5, textTransform: "uppercase" }}>Phone</label>
                      <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="(555) 000-0000" style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${C.borderMed}`, fontSize: 14, color: C.text, background: "rgba(255,255,255,0.06)", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 5, textTransform: "uppercase" }}>Property Address</label>
                    <input value={address} onChange={e => setAddress(e.target.value)} placeholder="123 Main St, Austin TX" style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${C.borderMed}`, fontSize: 14, color: C.text, background: "rgba(255,255,255,0.06)", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 5, textTransform: "uppercase" }}>Reason for Inspection</label>
                    <select value={issue} onChange={e => setIssue(e.target.value)} style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${C.borderMed}`, fontSize: 14, color: C.text, background: "#0f1d30", outline: "none" }}>
                      {["Storm/Hail Damage", "Active Leak", "Insurance Claim", "Routine Inspection", "Planning Replacement", "Buying/Selling Home"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <button style={{ background: C.accent, color: "white", border: "none", borderRadius: 12, padding: "16px 0", fontSize: 16, fontWeight: 900, cursor: "pointer", boxShadow: `0 8px 30px rgba(249,115,22,0.35)`, marginTop: 4 }}>
                    Schedule My Free Inspection →
                  </button>
                  <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
                    {["✓ No obligation", "✓ Usually within 24 hrs", "✓ Full written report + photos"].map(t => (
                      <span key={t} style={{ fontSize: 12, color: C.muted }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: 20 }}>
                <p style={{ fontSize: 14, color: C.body }}>Emergency? Call us right now: <a href="tel:5552478763" style={{ color: C.accent, fontWeight: 800, textDecoration: "none" }}>(555) 247-ROOF</a></p>
                <p style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Available 24/7 for storm emergencies</p>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer style={{ background: "rgba(0,0,0,0.4)", padding: "36px 20px", textAlign: "center", borderTop: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: C.text, marginBottom: 6 }}>🏠 Ridge Roofing</div>
            <p style={{ color: C.muted, fontSize: 13 }}>Austin, TX · (555) 247-ROOF · Licensed #ROO-48291 · A+ BBB</p>
            <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 11, marginTop: 10 }}>Demo site by NexaWeb · Not a real business</p>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
