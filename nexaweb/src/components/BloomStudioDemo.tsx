"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check, Menu } from "lucide-react";

const C = {
  bg: "#07080f",
  bgAlt: "#0d0f1a",
  bgCard: "rgba(255,255,255,0.04)",
  border: "rgba(255,255,255,0.08)",
  text: "#f0f2ff",
  muted: "rgba(240,242,255,0.45)",
  accent: "#63b3ed",
  accentGlow: "rgba(99,179,237,0.18)",
  green: "#68d391",
};

const CAMPAIGNS = [
  {
    name: "SolaraFit",
    type: "Fitness Brand",
    tag: "Instagram + TikTok Ads",
    result: "4.2× ROAS",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=80",
    color: "#0a0500",
  },
  {
    name: "Oak & Stone",
    type: "Home Goods",
    tag: "Meta Ad Campaign",
    result: "+$180K Revenue",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=80",
    color: "#050400",
  },
  {
    name: "Nexis Finance",
    type: "Fintech",
    tag: "Google + LinkedIn Ads",
    result: "3× Lead Volume",
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=700&q=80",
    color: "#020510",
  },
  {
    name: "Maison Roux",
    type: "Luxury Fashion",
    tag: "Creative Direction",
    result: "2.8× CTR Lift",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
    color: "#050003",
  },
];

const SERVICES = [
  {
    name: "Ad Creative",
    price: "From $1,200/mo",
    desc: "Scroll-stopping static and video ad creatives for Meta, TikTok, and Google. Tested angles, fresh concepts every month.",
    features: ["8–16 creatives/month", "Static + video formats", "A/B test variants", "Platform-optimised sizes"],
  },
  {
    name: "Full Campaign Management",
    price: "From $2,800/mo",
    desc: "Strategy, creative, and hands-on media buying. We run your paid ads end-to-end and obsess over your ROAS.",
    features: ["Ad creative included", "Media buying & optimisation", "Weekly performance reports", "Dedicated account manager", "Landing page guidance"],
    popular: true,
  },
  {
    name: "Creative Sprint",
    price: "From $1,800",
    desc: "A one-time batch of high-quality ad creatives — great for product launches, seasonal pushes, or testing a new angle.",
    features: ["20 static creatives", "4 video ad scripts", "Brand asset pack", "Usage rights included"],
  },
];

const STATS = [
  { value: "4.1×", label: "Average client ROAS" },
  { value: "60+", label: "Brands scaled" },
  { value: "$8M+", label: "Ad spend managed" },
];

const REVIEWS = [
  {
    text: "We were burning cash on ads that did nothing. Bloom came in, rewrote our creative strategy, and our ROAS jumped from 1.3 to 4.8 in six weeks. Unreal.",
    name: "Tyler B.",
    company: "SolaraFit",
  },
  {
    text: "The creatives they produce actually stop people mid-scroll. Our CTR doubled in the first month and hasn't dropped. These people understand performance.",
    name: "Camille D.",
    company: "Oak & Stone",
  },
  {
    text: "They think like marketers, not just designers. Every creative has a hook, an angle, and a purpose. That makes all the difference.",
    name: "Ravi S.",
    company: "Nexis Finance",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

interface Props { isOpen: boolean; onClose: () => void; }

export function BloomStudioDemo({ isOpen, onClose }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="fixed inset-0 z-[200] overflow-y-auto"
          style={{ background: C.bg, fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          {/* NAV */}
          <nav className="sticky top-0 z-50" style={{ background: "rgba(7,8,15,0.9)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${C.border}` }}>
            <div className="flex items-center justify-between px-5 sm:px-6 h-16" style={{ maxWidth: 1180, margin: "0 auto" }}>
              {/* Logo */}
              <div className="flex items-center gap-2.5 flex-shrink-0">
                <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${C.accent} 0%, #4299e1 100%)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M2 13 L6 7 L9 10 L12 5 L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="14" cy="4" r="2" fill="white" fillOpacity="0.8"/>
                  </svg>
                </div>
                <span style={{ fontWeight: 800, fontSize: 16, color: C.text, letterSpacing: "-0.02em" }}>Bloom Studio</span>
              </div>

              {/* Desktop nav links */}
              <div className="hidden md:flex items-center gap-7">
                {["Work", "Services", "Results"].map(n => (
                  <a key={n} href={`#bs-${n.toLowerCase()}`} style={{ fontSize: 13, fontWeight: 500, color: C.muted, textDecoration: "none" }}>{n}</a>
                ))}
              </div>

              {/* Right buttons */}
              <div className="flex items-center gap-2">
                <a href="#bs-contact" className="hidden sm:inline-flex items-center" style={{ background: C.accent, color: "#07080f", textDecoration: "none", borderRadius: 999, padding: "9px 20px", fontSize: 13, fontWeight: 800 }}>
                  Get a Quote
                </a>
                {/* Mobile hamburger */}
                <button
                  className="md:hidden w-9 h-9 flex items-center justify-center rounded-full"
                  style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${C.border}` }}
                  onClick={() => setMenuOpen(v => !v)}
                >
                  {menuOpen ? <X size={15} color={C.muted} /> : <Menu size={15} color={C.muted} />}
                </button>
                <button
                  onClick={onClose}
                  className="w-9 h-9 flex items-center justify-center rounded-full"
                  style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${C.border}` }}
                >
                  <X size={15} color={C.muted} />
                </button>
              </div>
            </div>

            {/* Mobile menu dropdown */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="md:hidden border-t"
                  style={{ background: "rgba(10,10,18,0.98)", borderColor: C.border }}
                >
                  <div className="flex flex-col py-2">
                    {["Work", "Services", "Results"].map(n => (
                      <a
                        key={n}
                        href={`#bs-${n.toLowerCase()}`}
                        onClick={() => setMenuOpen(false)}
                        className="px-6 py-3.5 text-sm font-medium"
                        style={{ color: C.muted, textDecoration: "none" }}
                      >
                        {n}
                      </a>
                    ))}
                    <div className="px-6 pt-2 pb-4">
                      <a
                        href="#bs-contact"
                        onClick={() => setMenuOpen(false)}
                        className="block text-center w-full py-2.5 rounded-xl text-sm font-bold"
                        style={{ background: C.accent, color: "#07080f", textDecoration: "none" }}
                      >
                        Get a Quote
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>

          {/* DEMO BANNER */}
          <div
            className="sticky z-40 flex items-center justify-center gap-2 py-2.5 px-4 text-center flex-wrap"
            style={{
              top: 64,
              background: "linear-gradient(90deg, #0a0700 0%, #1a1000 50%, #0a0700 100%)",
              borderBottom: "1px solid rgba(252,211,77,0.32)",
            }}
          >
            <span style={{ fontSize: 14 }}>⚠️</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#fcd34d", letterSpacing: "0.01em" }}>
              DEMO SITE — Not a real business.{" "}
              <span style={{ color: "#fb923c" }}>Built by NexaWeb</span>
            </span>
          </div>

          {/* HERO */}
          <section style={{ maxWidth: 1180, margin: "0 auto", padding: "60px 20px 56px" }}>
            <motion.div variants={stagger} initial="hidden" animate="visible">
              <motion.div variants={fadeUp} style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${C.border}`, borderRadius: 999, padding: "6px 14px", marginBottom: 28 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: C.muted, fontWeight: 500 }}>Taking new clients · Performance-driven creative</span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                style={{ fontSize: "clamp(2.4rem, 7vw, 5.5rem)", fontWeight: 900, color: C.text, lineHeight: 1.0, letterSpacing: "-0.04em", marginBottom: 24, maxWidth: 820 }}
              >
                Ads that<br />
                <span style={{ color: C.accent }}>actually convert.</span>
              </motion.h1>

              <motion.p variants={fadeUp} style={{ fontSize: "clamp(15px, 2vw, 18px)", color: C.muted, lineHeight: 1.7, maxWidth: 520, marginBottom: 36 }}>
                We create paid ad campaigns and scroll-stopping creatives for brands that are serious about growth. Strategy, creative, and media buying — all under one roof.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <motion.a
                  href="#bs-contact"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  style={{ background: C.accent, color: "#07080f", textDecoration: "none", borderRadius: 12, padding: "14px 24px", fontSize: 15, fontWeight: 800, display: "inline-flex", alignItems: "center", gap: 8, boxShadow: `0 0 32px ${C.accentGlow}` }}
                >
                  Start Growing <ArrowRight size={16} />
                </motion.a>
                <motion.a
                  href="#bs-work"
                  whileHover={{ scale: 1.02 }}
                  style={{ color: C.text, textDecoration: "none", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "14px 20px", fontSize: 15, fontWeight: 600 }}
                >
                  See Results
                </motion.a>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-8 sm:gap-12"
                style={{ marginTop: 48, paddingTop: 40, borderTop: `1px solid ${C.border}` }}
              >
                {STATS.map(s => (
                  <div key={s.label}>
                    <div style={{ fontSize: "clamp(1.6rem, 4vw, 2rem)", fontWeight: 900, color: C.text, letterSpacing: "-0.03em" }}>{s.value}</div>
                    <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </section>

          {/* WORK */}
          <section id="bs-work" style={{ padding: "20px 20px 64px", maxWidth: 1180, margin: "0 auto" }}>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
              <motion.div variants={fadeUp} className="flex justify-between items-baseline mb-8 flex-wrap gap-2">
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: C.accent, marginBottom: 8 }}>Case Studies</p>
                  <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", fontWeight: 900, color: C.text, letterSpacing: "-0.03em" }}>Campaigns We&apos;ve Run</h2>
                </div>
                <span style={{ fontSize: 12, color: C.muted }}>2024</span>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CAMPAIGNS.map((p, i) => (
                  <motion.div
                    key={p.name}
                    variants={fadeUp}
                    style={{ position: "relative", borderRadius: 16, overflow: "hidden", cursor: "pointer", aspectRatio: i % 3 === 0 ? "16/9" : "4/3" }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 26 }}
                  >
                    <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${p.img}')`, backgroundSize: "cover", backgroundPosition: "center", transform: hovered === i ? "scale(1.05)" : "scale(1)", transition: "transform 0.6s ease" }} />
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${p.color}f0 0%, ${p.color}88 50%, transparent 100%)` }} />
                    <div style={{ position: "absolute", top: 14, left: 14 }}>
                      <span style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.85)", letterSpacing: "0.1em", textTransform: "uppercase" as const, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", borderRadius: 999, padding: "4px 10px" }}>{p.tag}</span>
                    </div>
                    <div style={{ position: "absolute", bottom: 20, left: 20, right: 20, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8 }}>
                      <div>
                        <div style={{ fontSize: "clamp(15px, 2.5vw, 19px)", fontWeight: 800, color: "white", letterSpacing: "-0.01em" }}>{p.name}</div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 3 }}>{p.type}</div>
                      </div>
                      <div style={{ padding: "5px 12px", background: C.accentGlow, border: `1px solid rgba(99,179,237,0.35)`, borderRadius: 999, fontSize: 12, fontWeight: 800, color: C.accent, backdropFilter: "blur(8px)", flexShrink: 0 }}>
                        {p.result}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* SERVICES */}
          <section id="bs-services" style={{ padding: "64px 20px", background: C.bgAlt }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
                <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 48 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: C.accent, marginBottom: 10 }}>Services</p>
                  <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", fontWeight: 900, color: C.text, letterSpacing: "-0.03em" }}>How We Work</h2>
                  <p style={{ color: C.muted, marginTop: 12, fontSize: 15 }}>Performance creative for brands that want results, not just impressions.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {SERVICES.map((s) => (
                    <motion.div
                      key={s.name}
                      variants={fadeUp}
                      whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(0,0,0,0.4)" }}
                      transition={{ type: "spring", stiffness: 280, damping: 22 }}
                      style={{
                        background: s.popular ? `linear-gradient(135deg, ${C.accent} 0%, #4299e1 100%)` : C.bgCard,
                        borderRadius: 20,
                        padding: "28px 24px",
                        border: s.popular ? "none" : `1px solid ${C.border}`,
                        position: "relative",
                      }}
                    >
                      {s.popular && (
                        <div style={{ position: "absolute", top: -11, right: 20, background: C.bg, color: C.accent, fontSize: 10, fontWeight: 800, padding: "4px 14px", borderRadius: 999, letterSpacing: "0.06em" }}>MOST POPULAR</div>
                      )}
                      <div style={{ fontSize: 17, fontWeight: 800, color: s.popular ? "#07080f" : C.text, marginBottom: 4, letterSpacing: "-0.01em" }}>{s.name}</div>
                      <div style={{ fontSize: 18, fontWeight: 900, color: s.popular ? "#07080f" : C.accent, marginBottom: 14, letterSpacing: "-0.02em" }}>{s.price}</div>
                      <p style={{ fontSize: 13, color: s.popular ? "rgba(7,8,15,0.7)" : C.muted, lineHeight: 1.7, marginBottom: 20 }}>{s.desc}</p>
                      {s.features.map(f => (
                        <div key={f} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: s.popular ? "rgba(7,8,15,0.75)" : "rgba(240,242,255,0.65)", marginBottom: 9 }}>
                          <Check size={13} color={s.popular ? "#07080f" : C.green} strokeWidth={2.5} />
                          {f}
                        </div>
                      ))}
                      <a href="#bs-contact" style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 24, fontSize: 14, fontWeight: 800, color: s.popular ? "#07080f" : C.accent, textDecoration: "none" }}>
                        Get a Quote <ArrowRight size={14} />
                      </a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* REVIEWS */}
          <section id="bs-results" style={{ padding: "64px 20px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
                <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 40 }}>
                  <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", fontWeight: 900, color: C.text, letterSpacing: "-0.03em" }}>What Clients Say</h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {REVIEWS.map((r) => (
                    <motion.div
                      key={r.name}
                      variants={fadeUp}
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 280, damping: 22 }}
                      style={{ background: C.bgCard, borderRadius: 18, padding: 24, border: `1px solid ${C.border}` }}
                    >
                      <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg key={i} width="13" height="13" viewBox="0 0 13 13" fill={C.accent}><path d="M6.5 1l1.4 2.9L11 4.4l-2.2 2.1.5 3.1L6.5 8.2 4.2 9.6l.5-3.1L2.5 4.4l3.1-.5L6.5 1z"/></svg>
                        ))}
                      </div>
                      <p style={{ fontSize: 14, color: "rgba(240,242,255,0.65)", lineHeight: 1.75, marginBottom: 18 }}>&ldquo;{r.text}&rdquo;</p>
                      <div style={{ fontWeight: 700, fontSize: 13, color: C.text }}>{r.name}</div>
                      <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{r.company}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* CONTACT */}
          <section id="bs-contact" style={{ padding: "64px 20px", background: C.bgAlt }}>
            <div style={{ maxWidth: 600, margin: "0 auto" }}>
              <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
                <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 36 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: C.accent, marginBottom: 10 }}>Get Started</p>
                  <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", fontWeight: 900, color: C.text, letterSpacing: "-0.03em" }}>Ready to Scale<br />Your Ads?</h2>
                  <p style={{ color: C.muted, marginTop: 12, fontSize: 15 }}>Tell us about your brand — we&apos;ll reply within 24 hours with a strategy and honest pricing.</p>
                </motion.div>

                {formSent ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "48px 0" }}>
                    <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.accentGlow, border: `1px solid rgba(99,179,237,0.4)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                      <Check size={24} color={C.accent} />
                    </div>
                    <div style={{ fontWeight: 800, fontSize: 18, color: C.text }}>Message sent!</div>
                    <div style={{ color: C.muted, fontSize: 14, marginTop: 6 }}>We&apos;ll be in touch within 24 hours.</div>
                  </motion.div>
                ) : (
                  <motion.form
                    variants={fadeUp}
                    onSubmit={e => { e.preventDefault(); setFormSent(true); }}
                    style={{ background: C.bgCard, borderRadius: 20, padding: "28px 24px", border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 14 }}
                  >
                    {/* Name + Email — side by side on sm+, stacked on mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 5, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Name</label>
                        <input
                          required
                          placeholder="Your name"
                          style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${C.border}`, fontSize: 16, color: C.text, background: "rgba(255,255,255,0.05)", outline: "none", boxSizing: "border-box" as const }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 5, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Email</label>
                        <input
                          type="email"
                          required
                          placeholder="you@brand.com"
                          style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${C.border}`, fontSize: 16, color: C.text, background: "rgba(255,255,255,0.05)", outline: "none", boxSizing: "border-box" as const }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 5, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>What do you need?</label>
                      <select style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${C.border}`, fontSize: 16, color: C.text, background: C.bg, outline: "none" }}>
                        {["Ad Creative", "Full Campaign Management", "Creative Sprint", "Not Sure Yet"].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 5, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Tell us about your brand</label>
                      <textarea
                        required
                        placeholder="What do you sell, who's your audience, and what platforms are you running on?"
                        rows={4}
                        style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${C.border}`, fontSize: 16, color: C.text, background: "rgba(255,255,255,0.05)", outline: "none", resize: "none", boxSizing: "border-box" as const }}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      style={{ background: C.accent, color: "#07080f", border: "none", borderRadius: 12, padding: "15px 0", fontSize: 15, fontWeight: 900, cursor: "pointer", boxShadow: `0 0 28px ${C.accentGlow}` }}
                    >
                      Send Brief →
                    </motion.button>
                    <p style={{ textAlign: "center", fontSize: 12, color: C.muted }}>No obligation · We respond within 1 business day</p>
                  </motion.form>
                )}
              </motion.div>
            </div>
          </section>

          {/* FOOTER */}
          <footer style={{ background: C.bg, borderTop: `1px solid ${C.border}`, padding: "32px 20px", textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginBottom: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, background: `linear-gradient(135deg, ${C.accent} 0%, #4299e1 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                  <path d="M2 13 L6 7 L9 10 L12 5 L16 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="14" cy="4" r="2" fill="white" fillOpacity="0.8"/>
                </svg>
              </div>
              <span style={{ fontWeight: 800, fontSize: 14, color: C.text, letterSpacing: "-0.02em" }}>Bloom Studio</span>
            </div>
            <p style={{ color: C.muted, fontSize: 12 }}>Performance Creative Agency</p>
            <p style={{ color: "rgba(240,242,255,0.15)", fontSize: 11, marginTop: 10 }}>Demo site by NexaWeb · Not a real business</p>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
