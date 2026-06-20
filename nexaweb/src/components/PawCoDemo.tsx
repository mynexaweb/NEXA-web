"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Phone, Calendar, Check, ArrowRight, Clock, Shield, Award, Heart } from "lucide-react";

const C = {
  bg: "#faf6f0", bgAlt: "#f2e9dc", bgCard: "#ffffff",
  accent: "#c2622a", accentLight: "#f59542", accentPale: "rgba(194,98,42,0.08)",
  teal: "#0d7a6e", tealPale: "rgba(13,122,110,0.1)",
  dark: "#1a1108", body: "#5c4733", muted: "#9c7f68",
  border: "rgba(0,0,0,0.08)", borderMed: "rgba(0,0,0,0.13)",
};

const PACKAGES = [
  { name: "Bath & Brush", price: "$45+", time: "45–60 min", tag: null, features: ["Shampoo & condition", "Blow-dry & brush out", "Nail trim", "Ear cleaning", "Fresh-scent spritz"] },
  { name: "Full Groom", price: "$75+", time: "75–90 min", tag: "Most Popular", features: ["Everything in Bath & Brush", "Breed-specific haircut", "Paw pad trim", "Teeth brushing", "Bow or bandana"] },
  { name: "Luxury Spa", price: "$110+", time: "2–2.5 hrs", tag: "Best Value", features: ["Everything in Full Groom", "Deep conditioning mask", "Blueberry facial", "Paw balm treatment", "Take-home goodie bag"] },
];

const REVIEWS = [
  { name: "Jessica M.", breed: "Golden Retriever", rating: 5, text: "Milo has tried 6 groomers in this city. Paw & Co is the only one where he walks in without shaking. They're genuinely dog people. Results are also stunning — he looks show-ready." },
  { name: "Derek T.", breed: "French Bulldog", rating: 5, text: "Booked online in under a minute. Got a text reminder the morning of. Bruno came back smelling incredible and looking sharp. This is what every groomer should be." },
  { name: "Aisha R.", breed: "Standard Poodle", rating: 5, text: "My poodle has anxiety and I've been anxious about groomers too. The team here was so patient and communicated every step. I'll never go anywhere else. Period." },
];

const TRUST = [
  { icon: Award, label: "Certified Groomers", sub: "IPG & NDGAA certified" },
  { icon: Shield, label: "Fully Insured", sub: "Every visit covered" },
  { icon: Heart, label: "Fear-Free Trained", sub: "Low-stress techniques" },
  { icon: Clock, label: "Same-Week Booking", sub: "Often next-day slots" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const SPRING = { type: "spring" as const, stiffness: 260, damping: 22 };

interface Props { isOpen: boolean; onClose: () => void; }

export function PawCoDemo({ isOpen, onClose }: Props) {
  const [bookDate, setBookDate] = useState("Tomorrow");
  const [bookSize, setBookSize] = useState("Medium (20–50 lbs)");
  const [bookService, setBookService] = useState("Full Groom ($75+)");

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
          {/* DEMO BANNER — prominent sticky bar */}
          <div style={{
            position: "sticky", top: 0, zIndex: 200,
            background: "linear-gradient(90deg, #1a0e00 0%, #2d1800 50%, #1a0e00 100%)",
            borderBottom: "1px solid rgba(252,211,77,0.35)",
            padding: "10px 20px", textAlign: "center",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          }}>
            <span style={{ fontSize: 15 }}>⚠️</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#fcd34d", letterSpacing: "0.01em" }}>
              DEMO SITE — Not a real business.{" "}
              <span style={{ color: "#fb923c" }}>Built by NexaWeb</span> to showcase what we can build for you.
            </span>
          </div>

          {/* NAV */}
          <nav style={{ background: C.bgCard, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 41, zIndex: 50 }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 62 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🐾</div>
                <span style={{ fontWeight: 800, fontSize: 17, color: C.dark, letterSpacing: "-0.01em" }}>Paw<span style={{ color: C.accent }}>&amp;Co</span></span>
              </div>
              <div className="hidden sm:flex items-center" style={{ gap: 26 }}>
                {["Services", "Pricing", "Gallery", "About"].map(n => (
                  <a key={n} href={`#pc-${n.toLowerCase()}`} style={{ fontSize: 13, fontWeight: 500, color: C.body, textDecoration: "none" }}>{n}</a>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <a href="#" onClick={(e) => e.preventDefault()} className="hidden sm:flex items-center" style={{ gap: 6, fontSize: 13, fontWeight: 700, color: C.teal, textDecoration: "none" }}>
                  <Phone size={14} /> (555) 742-7929
                </a>
                <motion.a href="#pc-book" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} transition={SPRING}
                  className="hidden sm:block"
                  style={{ background: C.accent, color: "white", textDecoration: "none", borderRadius: 999, padding: "9px 20px", fontSize: 13, fontWeight: 700 }}>
                  Book Now
                </motion.a>
                <button onClick={onClose} style={{ background: "rgba(0,0,0,0.06)", border: "none", borderRadius: 999, width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <X size={16} color={C.dark} />
                </button>
              </div>
            </div>
          </nav>

          {/* HERO */}
          <section style={{ position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1400&q=80')", backgroundSize: "cover", backgroundPosition: "center" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,17,8,0.88) 0%, rgba(26,17,8,0.55) 60%, rgba(26,17,8,0.3) 100%)" }} />
            <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", padding: "90px 20px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>

              {/* Left: staggered hero text */}
              <motion.div variants={stagger} initial="hidden" animate="visible">
                <motion.div variants={fadeUp} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 999, padding: "6px 14px", marginBottom: 22 }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#fbbf24" color="#fbbf24" />)}
                  <span style={{ fontSize: 12, color: "white", fontWeight: 600, marginLeft: 4 }}>4.9 · 800+ reviews</span>
                </motion.div>

                <motion.h1 variants={fadeUp} style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: 18, letterSpacing: "-0.02em" }}>
                  Your Dog Deserves<br /><span style={{ color: "#f59542" }}>the Best Groom.</span>
                </motion.h1>

                <motion.p variants={fadeUp} style={{ fontSize: 16, color: "rgba(255,255,255,0.72)", marginBottom: 32, lineHeight: 1.7, maxWidth: 420 }}>
                  Certified groomers. Fear-free techniques. Online booking in 60 seconds. We treat every dog like our own.
                </motion.p>

                <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <motion.a href="#pc-book" whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(194,98,42,0.6)" }} whileTap={{ scale: 0.96 }} transition={SPRING}
                    style={{ background: C.accent, color: "white", textDecoration: "none", borderRadius: 999, padding: "14px 30px", fontSize: 15, fontWeight: 800, boxShadow: "0 8px 30px rgba(194,98,42,0.45)", display: "flex", alignItems: "center", gap: 8 }}>
                    <Calendar size={16} /> Book a Groom
                  </motion.a>
                  <motion.a href="#" onClick={(e) => e.preventDefault()} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} transition={SPRING}
                    style={{ background: "rgba(255,255,255,0.1)", color: "white", textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 999, padding: "14px 24px", fontSize: 15, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                    <Phone size={15} /> Call Us
                  </motion.a>
                </motion.div>

                <motion.div variants={fadeUp} style={{ display: "flex", gap: 20, marginTop: 28, flexWrap: "wrap" }}>
                  {["IPG Certified", "Fear-Free Trained", "Fully Insured", "Same-Week Slots"].map(t => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.65)", fontSize: 12 }}>
                      <Check size={12} color="#f59542" /> {t}
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right: booking widget floats in */}
              <motion.div initial={{ opacity: 0, x: 40, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ background: C.bgCard, borderRadius: 20, padding: 28, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
                <p style={{ fontWeight: 800, fontSize: 16, color: C.dark, marginBottom: 4 }}>Quick Book</p>
                <p style={{ fontSize: 12, color: C.muted, marginBottom: 20 }}>Same-week appointments available</p>
                {[
                  { label: "Date", value: bookDate, set: setBookDate, opts: ["Today", "Tomorrow", "In 2 days", "This weekend", "Next week"] },
                  { label: "Dog Size", value: bookSize, set: setBookSize, opts: ["Small (under 20 lbs)", "Medium (20–50 lbs)", "Large (50–80 lbs)", "XL (80+ lbs)"] },
                  { label: "Service", value: bookService, set: setBookService, opts: ["Bath & Brush ($45+)", "Full Groom ($75+)", "Luxury Spa ($110+)"] },
                ].map(({ label, value, set, opts }) => (
                  <div key={label} style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</label>
                    <select value={value} onChange={e => set(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${C.borderMed}`, fontSize: 14, color: C.dark, background: C.bg, outline: "none", cursor: "pointer" }}>
                      {opts.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
                <motion.button whileHover={{ scale: 1.03, boxShadow: `0 10px 32px rgba(194,98,42,0.5)` }} whileTap={{ scale: 0.97 }} transition={SPRING}
                  style={{ width: "100%", background: C.accent, color: "white", border: "none", borderRadius: 12, padding: "14px 0", fontSize: 15, fontWeight: 800, cursor: "pointer", boxShadow: `0 6px 24px rgba(194,98,42,0.35)`, marginTop: 4 }}>
                  Check Availability →
                </motion.button>
                <p style={{ textAlign: "center", fontSize: 11, color: C.muted, marginTop: 10 }}>✓ Free cancellation · We confirm within 2 hrs</p>
              </motion.div>
            </div>
          </section>

          {/* STATS */}
          <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            style={{ background: C.accent, padding: "28px 20px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, textAlign: "center" }}>
              {[["800+", "Happy Dogs"], ["4.9 ★", "Avg Rating"], ["10 yrs", "Experience"], ["100%", "Insured & Certified"]].map(([n, l]) => (
                <motion.div key={l} variants={fadeUp}>
                  <div style={{ fontSize: "1.7rem", fontWeight: 900, color: "white" }}>{n}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.78)", marginTop: 2 }}>{l}</div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* TRUST PILLARS */}
          <section style={{ padding: "60px 20px", background: C.bgAlt }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
              <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} style={{ textAlign: "center", marginBottom: 40 }}>
                <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.teal, marginBottom: 10 }}>Why Dog Parents Choose Us</motion.p>
                <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 900, color: C.dark, letterSpacing: "-0.02em" }}>Safe, Gentle, Professional</motion.h2>
              </motion.div>
              <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 18 }}>
                {TRUST.map(({ icon: Icon, label, sub }) => (
                  <motion.div key={label} variants={fadeUp}
                    whileHover={{ y: -8, boxShadow: "0 16px 40px rgba(0,0,0,0.1)" }} transition={SPRING}
                    style={{ background: C.bgCard, borderRadius: 16, padding: 24, border: `1px solid ${C.border}`, textAlign: "center", cursor: "default" }}>
                    <motion.div whileHover={{ scale: 1.12 }} transition={SPRING}
                      style={{ width: 48, height: 48, borderRadius: 14, background: C.accentPale, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                      <Icon size={22} color={C.accent} />
                    </motion.div>
                    <div style={{ fontWeight: 800, fontSize: 14, color: C.dark, marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 12, color: C.muted }}>{sub}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* PACKAGES */}
          <section id="pc-pricing" style={{ padding: "70px 20px", background: C.bg }}>
            <div style={{ maxWidth: 1050, margin: "0 auto" }}>
              <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} style={{ textAlign: "center", marginBottom: 48 }}>
                <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.teal, marginBottom: 10 }}>Grooming Packages</motion.p>
                <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 900, color: C.dark, letterSpacing: "-0.02em" }}>Transparent Pricing. Zero Surprises.</motion.h2>
                <motion.p variants={fadeUp} style={{ color: C.body, marginTop: 10, fontSize: 14 }}>Prices vary slightly by breed coat type. Final quote at drop-off — always agreed before we start.</motion.p>
              </motion.div>
              <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22 }}>
                {PACKAGES.map((s) => (
                  <motion.div key={s.name} variants={fadeUp}
                    whileHover={{ y: -8, boxShadow: s.tag === "Most Popular" ? "0 20px 50px rgba(194,98,42,0.2)" : "0 16px 40px rgba(0,0,0,0.1)" }} transition={SPRING}
                    style={{ background: C.bgCard, borderRadius: 20, padding: 28, border: s.tag === "Most Popular" ? `2px solid ${C.accent}` : `1px solid ${C.border}`, position: "relative", boxShadow: s.tag === "Most Popular" ? `0 8px 40px rgba(194,98,42,0.1)` : "0 2px 12px rgba(0,0,0,0.04)" }}>
                    {s.tag && (
                      <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: s.tag === "Most Popular" ? C.accent : C.teal, color: "white", fontSize: 11, fontWeight: 800, padding: "4px 16px", borderRadius: 999, whiteSpace: "nowrap" }}>{s.tag}</div>
                    )}
                    <div style={{ fontSize: "1.9rem", fontWeight: 900, color: C.accent, marginBottom: 4 }}>{s.price}</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: C.dark, marginBottom: 4 }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: C.muted, marginBottom: 20, display: "flex", alignItems: "center", gap: 5 }}><Clock size={12} /> {s.time}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 24 }}>
                      {s.features.map(f => (
                        <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.body }}>
                          <Check size={14} color={C.teal} strokeWidth={2.5} /> {f}
                        </div>
                      ))}
                    </div>
                    <motion.a href="#pc-book" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={SPRING}
                      style={{ display: "block", textAlign: "center", background: s.tag === "Most Popular" ? C.accent : "transparent", color: s.tag === "Most Popular" ? "white" : C.accent, textDecoration: "none", border: `1.5px solid ${C.accent}`, borderRadius: 12, padding: "11px 0", fontSize: 14, fontWeight: 700 }}>
                      Book This Package
                    </motion.a>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* REVIEWS */}
          <section style={{ padding: "70px 20px", background: C.bgAlt }}>
            <div style={{ maxWidth: 1050, margin: "0 auto" }}>
              <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} style={{ textAlign: "center", marginBottom: 48 }}>
                <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 14 }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="#fbbf24" color="#fbbf24" />)}
                </motion.div>
                <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 900, color: C.dark, letterSpacing: "-0.02em" }}>800+ Five-Star Reviews</motion.h2>
                <motion.p variants={fadeUp} style={{ color: C.body, marginTop: 8, fontSize: 14 }}>From real dog parents in your neighborhood.</motion.p>
              </motion.div>
              <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
                {REVIEWS.map((r) => (
                  <motion.div key={r.name} variants={fadeUp}
                    whileHover={{ y: -6, boxShadow: "0 14px 36px rgba(0,0,0,0.09)" }} transition={SPRING}
                    style={{ background: C.bgCard, borderRadius: 20, padding: 28, border: `1px solid ${C.border}` }}>
                    <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                      {[...Array(r.rating)].map((_, i) => <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />)}
                    </div>
                    <p style={{ fontSize: 14, color: C.body, lineHeight: 1.75, marginBottom: 18 }}>"{r.text}"</p>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 13, color: C.dark }}>{r.name}</div>
                      <div style={{ fontSize: 12, color: C.muted }}>{r.breed} parent</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* BOOK SECTION */}
          <section id="pc-book" style={{ padding: "70px 20px", background: C.bg }}>
            <div style={{ maxWidth: 680, margin: "0 auto" }}>
              <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} style={{ textAlign: "center", marginBottom: 36 }}>
                <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.teal, marginBottom: 10 }}>Book an Appointment</motion.p>
                <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 900, color: C.dark, letterSpacing: "-0.02em" }}>Ready to Book? We&apos;re Ready for You.</motion.h2>
                <motion.p variants={fadeUp} style={{ color: C.body, marginTop: 8, fontSize: 14 }}>We confirm within 2 hours. Same-week slots open every Monday morning.</motion.p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ background: C.bgCard, borderRadius: 24, padding: 36, border: `1px solid ${C.border}`, boxShadow: "0 8px 50px rgba(0,0,0,0.05)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 5, textTransform: "uppercase" }}>Date</label>
                    <select value={bookDate} onChange={e => setBookDate(e.target.value)} style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${C.borderMed}`, fontSize: 14, color: C.dark, background: C.bg, outline: "none" }}>
                      {["Today", "Tomorrow", "In 2 days", "This weekend", "Next week"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 5, textTransform: "uppercase" }}>Dog Size</label>
                    <select value={bookSize} onChange={e => setBookSize(e.target.value)} style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${C.borderMed}`, fontSize: 14, color: C.dark, background: C.bg, outline: "none" }}>
                      {["Small (under 20 lbs)", "Medium (20–50 lbs)", "Large (50–80 lbs)", "XL (80+ lbs)"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 5, textTransform: "uppercase" }}>Package</label>
                  <select value={bookService} onChange={e => setBookService(e.target.value)} style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${C.borderMed}`, fontSize: 14, color: C.dark, background: C.bg, outline: "none" }}>
                    {["Bath & Brush ($45+)", "Full Groom ($75+)", "Luxury Spa ($110+)"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <input placeholder="Your name" style={{ padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${C.borderMed}`, fontSize: 14, color: C.dark, background: C.bg, outline: "none" }} />
                  <input placeholder="Dog's name" style={{ padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${C.borderMed}`, fontSize: 14, color: C.dark, background: C.bg, outline: "none" }} />
                </div>
                <input placeholder="Phone number (for confirmation)" style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${C.borderMed}`, fontSize: 14, color: C.dark, background: C.bg, outline: "none", boxSizing: "border-box", marginBottom: 16 }} />
                <motion.button whileHover={{ scale: 1.03, boxShadow: `0 12px 36px rgba(194,98,42,0.5)` }} whileTap={{ scale: 0.97 }} transition={SPRING}
                  style={{ width: "100%", background: C.accent, color: "white", border: "none", borderRadius: 12, padding: "15px 0", fontSize: 15, fontWeight: 800, cursor: "pointer", boxShadow: `0 8px 28px rgba(194,98,42,0.35)` }}>
                  Request Appointment →
                </motion.button>
                <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 14, flexWrap: "wrap" }}>
                  {["✓ No deposit required", "✓ Free cancellation 24hrs", "✓ Confirmation in 2 hrs"].map(t => (
                    <span key={t} style={{ fontSize: 12, color: C.muted }}>{t}</span>
                  ))}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.4 }}
                style={{ textAlign: "center", marginTop: 24, padding: 20, background: C.accentPale, borderRadius: 14, border: `1px solid rgba(194,98,42,0.15)` }}>
                <p style={{ fontSize: 14, color: C.body, fontWeight: 600 }}>Prefer to call? <a href="#" onClick={(e) => e.preventDefault()} style={{ color: C.accent, fontWeight: 800, textDecoration: "none" }}>📞 (555) 742-7929</a></p>
                <p style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Mon–Sat 8am–6pm · We love talking about dogs</p>
              </motion.div>
            </div>
          </section>

          {/* FOOTER */}
          <footer style={{ background: C.dark, padding: "36px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: "white", marginBottom: 6 }}>🐾 Paw<span style={{ color: "#f59542" }}>&amp;Co.</span></div>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>123 Bark Street · (555) 742-7929 · Open Mon–Sat 8am–6pm</p>
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, marginTop: 10 }}>Demo site by NexaWeb · Not a real business</p>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
