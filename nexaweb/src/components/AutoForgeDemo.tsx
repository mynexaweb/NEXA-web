"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Star, Check, ArrowRight, Shield, Clock, Wrench, Calendar } from "lucide-react";

const C = {
  bg: "#0a0c0e", bgAlt: "#0f1214", bgCard: "rgba(255,255,255,0.04)",
  accent: "#dc2626", accentPale: "rgba(220,38,38,0.1)",
  steel: "#64748b", steelLight: "#94a3b8", steelPale: "rgba(100,116,139,0.12)",
  text: "#ffffff", body: "rgba(255,255,255,0.62)", muted: "rgba(255,255,255,0.32)",
  border: "rgba(255,255,255,0.07)", borderMed: "rgba(220,38,38,0.3)",
};

const SERVICES = [
  { name: "Oil Change & Lube", price: "from $59", time: "~30 min", tag: "Most Common", icon: "🛢️", features: ["Full synthetic available", "Filter included", "21-point inspection", "Tire pressure check"] },
  { name: "Brake Service", price: "from $149", time: "~90 min", tag: null, icon: "🔴", features: ["Pad & rotor inspection", "Fluid flush available", "Brake line check", "Road test included"] },
  { name: "Engine Diagnostics", price: "from $99", time: "~45 min", tag: "Book Online", icon: "🔧", features: ["OBD-II scan", "Full written report", "Repair estimate included", "No-fix no-pay guarantee"] },
  { name: "Transmission", price: "from $249", time: "~2 hrs", tag: null, icon: "⚙️", features: ["Fluid drain & refill", "Pan gasket inspect", "Shift quality test", "24-mo warranty"] },
  { name: "Tires & Alignment", price: "from $25/tire", time: "~45 min", tag: null, icon: "⭕", features: ["Balance included", "TPMS reset", "4-wheel alignment avail.", "All major brands stocked"] },
  { name: "AC & Heating", price: "from $129", time: "~60 min", tag: null, icon: "❄️", features: ["Recharge included", "Leak detection", "Cabin air filter", "Full system test"] },
];

const SPECIALS = [
  { title: "Oil Change Special", desc: "Full synthetic + filter + inspection", was: "$89", now: "$59", code: "OIL30" },
  { title: "Brake Inspection", desc: "Free 10-point brake system check", was: "$75", now: "FREE", code: "BRAKE0" },
  { title: "New Customer Deal", desc: "15% off any service over $150", was: null, now: "15% OFF", code: "NEW15" },
];

const CERTS = ["ASE Certified Master Tech", "AAA Approved Shop", "NAPA AutoCare Center", "24-Month / 24,000 Mile Warranty"];

const REVIEWS = [
  { name: "Carlos M.", vehicle: "2020 F-150", rating: 5, text: "Took my truck in for a mystery noise — they found it in 20 minutes, showed me on a screen exactly what was wrong, gave me a written estimate before touching anything. Fixed it same day. First honest shop I've found." },
  { name: "Stephanie L.", vehicle: "2019 RAV4", rating: 5, text: "Booked online at midnight, confirmed by 8am. The tech sent a video of the issue before calling me. Never seen that before. Felt like I actually knew what I was paying for. Will come back for everything." },
  { name: "Omar T.", vehicle: "2021 Accord", rating: 5, text: "They matched the dealer price on brakes AND gave a longer warranty. Work was done 45 minutes faster than promised. Shuttle service back to my office was a nice bonus. My whole family brings their cars here now." },
];

interface Props { isOpen: boolean; onClose: () => void; }

export function AutoForgeDemo({ isOpen, onClose }: Props) {
  const [bookDate, setBookDate] = useState("Tomorrow");
  const [bookTime, setBookTime] = useState("9:00 AM");
  const [bookService, setBookService] = useState("Oil Change & Lube");
  const [vehicle, setVehicle] = useState("");

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
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 62 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🔧</div>
                <div>
                  <div style={{ fontWeight: 900, fontSize: 17, color: C.text, letterSpacing: "-0.02em" }}>AUTO<span style={{ color: C.accent }}>FORGE</span></div>
                  <div style={{ fontSize: 10, color: C.muted, fontWeight: 600, letterSpacing: "0.06em" }}>ASE CERTIFIED AUTO REPAIR</div>
                </div>
              </div>
              <div className="hidden sm:flex items-center" style={{ gap: 24 }}>
                {["Services", "Specials", "Book Online", "Reviews"].map(n => (
                  <a key={n} href={`#af-${n.toLowerCase().replace(" ", "-")}`} style={{ fontSize: 13, fontWeight: 500, color: C.body, textDecoration: "none" }}>{n}</a>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <a href="#" onClick={(e) => e.preventDefault()} className="hidden sm:flex items-center" style={{ gap: 6, fontSize: 13, fontWeight: 700, color: C.accent, textDecoration: "none" }}>
                  <Phone size={14} /> (555) 428-6743
                </a>
                <a href="#af-book-online" className="hidden sm:block" style={{ background: C.accent, color: "white", textDecoration: "none", borderRadius: 999, padding: "9px 18px", fontSize: 13, fontWeight: 700 }}>Book Service</a>
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
          <section style={{ position: "relative", overflow: "hidden", minHeight: 560 }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=1400&q=80')", backgroundSize: "cover", backgroundPosition: "center 40%" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,12,14,0.98) 40%, rgba(10,12,14,0.80) 65%, rgba(10,12,14,0.3) 100%)" }} />
            <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", padding: "90px 20px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
              <div>
                <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
                  {["🏅 ASE Certified", "⭐ 4.9/5 Rating", "🔒 24-Mo Warranty"].map(b => (
                    <div key={b} style={{ background: "rgba(255,255,255,0.07)", border: `1px solid ${C.border}`, borderRadius: 999, padding: "5px 12px", fontSize: 11, fontWeight: 700, color: C.body }}>{b}</div>
                  ))}
                </div>
                <h1 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", fontWeight: 900, color: C.text, lineHeight: 1.08, marginBottom: 18, letterSpacing: "-0.025em" }}>
                  Your Car in<br /><span style={{ color: C.accent }}>Expert Hands.</span>
                </h1>
                <p style={{ fontSize: 16, color: C.body, marginBottom: 14, lineHeight: 1.7, maxWidth: 440 }}>
                  ASE-certified technicians. Transparent diagnostics with video reports. 24-month warranty on all parts and labor. No surprises, ever.
                </p>
                <p style={{ fontSize: 14, fontWeight: 700, color: C.accent, marginBottom: 32 }}>⚡ Book online and get confirmed in under 10 minutes.</p>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <a href="#af-book-online" style={{ background: C.accent, color: "white", textDecoration: "none", borderRadius: 12, padding: "15px 30px", fontSize: 15, fontWeight: 800, boxShadow: "0 8px 30px rgba(220,38,38,0.4)", display: "flex", alignItems: "center", gap: 8 }}>
                    <Calendar size={16} /> Book Service Online
                  </a>
                  <a href="#" onClick={(e) => e.preventDefault()} style={{ background: "rgba(255,255,255,0.07)", color: C.text, textDecoration: "none", border: `1px solid ${C.border}`, borderRadius: 12, padding: "15px 22px", fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                    <Phone size={15} /> Call Us
                  </a>
                </div>
                <div style={{ display: "flex", gap: 20, marginTop: 28, flexWrap: "wrap" }}>
                  {["Free diagnosis", "Video inspection reports", "Price match guarantee", "Loaner cars available"].map(t => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 5, color: C.muted, fontSize: 12 }}>
                      <Check size={12} color={C.accent} strokeWidth={2.5} /> {t}
                    </div>
                  ))}
                </div>
              </div>
              {/* CERTS */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {CERTS.map(c => (
                  <div key={c} style={{ background: C.bgCard, borderRadius: 12, padding: "16px 20px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12 }}>
                    <Shield size={18} color={C.accent} />
                    <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* STATS */}
          <section style={{ background: C.accent, padding: "28px 20px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, textAlign: "center" }}>
              {[["5,200+", "Cars Serviced"], ["4.9 ★", "Google Rating"], ["24-Mo", "Parts Warranty"], ["98%", "Same-Day Completion"]].map(([n, l]) => (
                <div key={l}><div style={{ fontSize: "1.7rem", fontWeight: 900, color: "white" }}>{n}</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>{l}</div></div>
              ))}
            </div>
          </section>

          {/* SPECIALS */}
          <section id="af-specials" style={{ padding: "60px 20px", background: C.bgAlt }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 36 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.accent, marginBottom: 10 }}>Limited Time</p>
                <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 900, color: C.text, letterSpacing: "-0.02em" }}>Current Deals &amp; Specials</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
                {SPECIALS.map((s) => (
                  <div key={s.title} style={{ background: C.bgCard, borderRadius: 18, padding: 26, border: `1px solid rgba(220,38,38,0.2)`, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, right: 0, background: C.accent, color: "white", fontSize: 16, fontWeight: 900, padding: "8px 16px", borderBottomLeftRadius: 12 }}>{s.now}</div>
                    <div style={{ fontWeight: 800, fontSize: 16, color: C.text, marginBottom: 6, marginTop: 4, paddingRight: 60 }}>{s.title}</div>
                    <p style={{ fontSize: 13, color: C.body, marginBottom: 16 }}>{s.desc}</p>
                    {s.was && <p style={{ fontSize: 12, color: C.muted }}>Reg. price: <span style={{ textDecoration: "line-through" }}>{s.was}</span></p>}
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.accentPale, border: `1px solid rgba(220,38,38,0.2)`, borderRadius: 8, padding: "5px 10px", marginTop: 10 }}>
                      <span style={{ fontSize: 11, color: C.accent, fontWeight: 700 }}>Code: {s.code}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SERVICES */}
          <section id="af-services" style={{ padding: "70px 20px", background: C.bg }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.accent, marginBottom: 10 }}>What We Fix</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, color: C.text, letterSpacing: "-0.02em" }}>Full-Service Auto Repair</h2>
                <p style={{ color: C.body, marginTop: 10, fontSize: 15 }}>All prices shown upfront. No surprise fees. Written estimate before we touch your car.</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
                {SERVICES.map((s) => (
                  <div key={s.name} style={{ background: C.bgCard, borderRadius: 18, padding: 26, border: `1px solid ${C.border}`, position: "relative" }}>
                    {s.tag && <div style={{ position: "absolute", top: 16, right: 16, background: s.tag === "Most Common" ? C.accent : "rgba(255,255,255,0.1)", color: "white", fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 999 }}>{s.tag}</div>}
                    <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                    <div style={{ fontWeight: 800, fontSize: 15, color: C.text, marginBottom: 4 }}>{s.name}</div>
                    <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.accent }}>{s.price}</span>
                      <span style={{ fontSize: 12, color: C.muted, display: "flex", alignItems: "center", gap: 4 }}><Clock size={11} /> {s.time}</span>
                    </div>
                    {s.features.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: C.body, marginBottom: 7 }}>
                        <Check size={12} color={C.accent} strokeWidth={2.5} /> {f}
                      </div>
                    ))}
                    <a href="#af-book-online" style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 16, fontSize: 13, fontWeight: 700, color: C.accent, textDecoration: "none" }}>
                      Book This Service <ArrowRight size={13} />
                    </a>
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
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 900, color: C.text, letterSpacing: "-0.02em" }}>5,200+ Cars. Thousands of Happy Drivers.</h2>
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
                      <div style={{ fontSize: 12, color: C.muted }}>{r.vehicle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* BOOK ONLINE */}
          <section id="af-book-online" style={{ padding: "70px 20px", background: C.bg }}>
            <div style={{ maxWidth: 620, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.accent, marginBottom: 10 }}>Book Online</p>
                <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 900, color: C.text, letterSpacing: "-0.02em" }}>Schedule Your Service</h2>
                <p style={{ color: C.body, marginTop: 8, fontSize: 14 }}>Confirmed in under 10 minutes. A tech bio is sent to you the morning of.</p>
              </div>
              <div style={{ background: C.bgCard, borderRadius: 24, padding: 36, border: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[
                      { label: "Date", value: bookDate, set: setBookDate, opts: ["Today", "Tomorrow", "In 2 days", "This weekend", "Next week"] },
                      { label: "Time", value: bookTime, set: setBookTime, opts: ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"] },
                    ].map(({ label, value, set, opts }) => (
                      <div key={label}>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 5, textTransform: "uppercase" }}>{label}</label>
                        <select value={value} onChange={e => set(e.target.value)} style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${C.borderMed}`, fontSize: 14, color: C.text, background: C.bgAlt, outline: "none" }}>
                          {opts.map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                    ))}
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 5, textTransform: "uppercase" }}>Service Needed</label>
                    <select value={bookService} onChange={e => setBookService(e.target.value)} style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${C.borderMed}`, fontSize: 14, color: C.text, background: C.bgAlt, outline: "none" }}>
                      {["Oil Change & Lube", "Brake Service", "Engine Diagnostics", "Transmission Service", "Tires & Alignment", "AC & Heating", "State Inspection", "Pre-Purchase Inspection", "Other / Not Sure"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <input value={vehicle} onChange={e => setVehicle(e.target.value)} placeholder="Year, Make, Model (e.g. 2020 Toyota Camry)" style={{ padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${C.borderMed}`, fontSize: 14, color: C.text, background: "rgba(255,255,255,0.05)", outline: "none" }} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <input placeholder="Your name" style={{ padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${C.borderMed}`, fontSize: 14, color: C.text, background: "rgba(255,255,255,0.05)", outline: "none" }} />
                    <input placeholder="Phone number" style={{ padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${C.borderMed}`, fontSize: 14, color: C.text, background: "rgba(255,255,255,0.05)", outline: "none" }} />
                  </div>
                  <button style={{ background: C.accent, color: "white", border: "none", borderRadius: 12, padding: "16px 0", fontSize: 16, fontWeight: 900, cursor: "pointer", boxShadow: `0 8px 30px rgba(220,38,38,0.35)`, marginTop: 4 }}>
                    Book My Service →
                  </button>
                  <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                    {["✓ Confirmed in 10 min", "✓ Free cancellation", "✓ No payment until service"].map(t => (
                      <span key={t} style={{ fontSize: 12, color: C.muted }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer style={{ background: "rgba(0,0,0,0.6)", padding: "36px 20px", textAlign: "center", borderTop: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: C.text, marginBottom: 6 }}>🔧 AUTO<span style={{ color: C.accent }}>FORGE</span></div>
            <p style={{ color: C.muted, fontSize: 13 }}>Miami, FL · (555) 428-6743 · ASE Certified · Open Mon–Sat 8am–6pm</p>
            <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 11, marginTop: 10 }}>Demo site by NexaWeb · Not a real business</p>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
