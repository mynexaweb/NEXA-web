"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Star, Check, Shield, Video, Calendar, Clock, ChevronDown, ArrowRight } from "lucide-react";

const C = {
  bg: "#f0f7ff", bgAlt: "#e4f0fd", bgCard: "#ffffff",
  accent: "#0c6ef5", accentDark: "#0a58c4", accentPale: "rgba(12,110,245,0.08)",
  teal: "#0891b2", tealPale: "rgba(8,145,178,0.1)",
  dark: "#0f1f3d", body: "#3d5273", muted: "#7a92ad",
  border: "rgba(12,110,245,0.1)", borderMed: "rgba(12,110,245,0.25)",
  green: "#059669",
};

const SPECIALTIES = [
  { icon: "🫀", name: "Cardiology", docs: 12, wait: "Next day" },
  { icon: "🧠", name: "Neurology", docs: 8, wait: "2–3 days" },
  { icon: "🦷", name: "Dental Care", docs: 15, wait: "Same day" },
  { icon: "👁️", name: "Ophthalmology", docs: 6, wait: "Next day" },
  { icon: "🩺", name: "Primary Care", docs: 28, wait: "Same day" },
  { icon: "🧬", name: "Oncology", docs: 9, wait: "2 days" },
];

const DOCTORS = [
  { name: "Dr. Rachel Kim", spec: "Primary Care", rating: 4.9, reviews: 312, img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=80", available: "Today 2:30 PM", insurance: "Most plans accepted" },
  { name: "Dr. Marcus Webb", spec: "Cardiology", rating: 4.8, reviews: 218, img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&q=80", available: "Tomorrow 10:00 AM", insurance: "Most plans accepted" },
  { name: "Dr. Aisha Patel", spec: "Neurology", rating: 5.0, reviews: 156, img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&q=80", available: "Today 4:00 PM", insurance: "Most plans accepted" },
];

const FEATURES = [
  { icon: Calendar, title: "Book in 60 Seconds", desc: "Real-time availability. No hold music. No callbacks. Confirm your appointment instantly online." },
  { icon: Video, title: "Telehealth Visits", desc: "See a doctor from your phone or laptop. Same-day video appointments available 7am–9pm." },
  { icon: Shield, title: "HIPAA Secure", desc: "Your health data is encrypted and protected. We never share, sell, or misuse your information." },
  { icon: Clock, title: "On-Time Guarantee", desc: "If your doctor is more than 15 minutes late, your next visit is free. We respect your schedule." },
];

const REVIEWS = [
  { name: "Patricia L.", spec: "Primary Care patient", rating: 5, text: "I've been putting off a doctor for two years because I hate making appointments. Meridian let me book in literally one minute, I got a reminder 24 hours before, and the doctor was on time. This is how healthcare should work." },
  { name: "Robert G.", spec: "Cardiology patient", rating: 5, text: "Dr. Webb explained my condition in a way no doctor ever had. I could access my test results and notes the same day through the app. The telehealth follow-up saved me a 90-minute commute." },
  { name: "Mei S.", spec: "Telehealth patient", rating: 5, text: "I was skeptical about seeing a doctor online. Within 10 minutes Dr. Patel had a diagnosis, a prescription sent to my pharmacy, and a follow-up booked. I didn't leave my kitchen. Incredible." },
];

interface Props { isOpen: boolean; onClose: () => void; }

export function MeridianHealthDemo({ isOpen, onClose }: Props) {
  const [bookSpec, setBookSpec] = useState("Primary Care");
  const [bookType, setBookType] = useState("In-Person Visit");
  const [bookDate, setBookDate] = useState("Today");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const FAQS = [
    ["Do you accept my insurance?", "We accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, and Medicare. Enter your insurance at booking to see covered options instantly."],
    ["How does telehealth work?", "After booking, you'll receive a secure video link by email and text. Join from any device — phone, tablet, or computer. No app download required."],
    ["Can I get a prescription online?", "Yes. Our licensed physicians can prescribe for most non-controlled conditions during telehealth visits. Prescriptions are sent directly to your preferred pharmacy."],
    ["What if I need to cancel?", "Cancel or reschedule up to 2 hours before your appointment at no charge — directly through your confirmation email or patient portal."],
  ];

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
          <nav style={{ background: C.bgCard, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 50 }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 62 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "white", fontSize: 18 }}>⚕️</span>
                </div>
                <div>
                  <span style={{ fontWeight: 800, fontSize: 16, color: C.dark, letterSpacing: "-0.02em" }}>Meridian<span style={{ color: C.accent }}>Health</span></span>
                  <div style={{ fontSize: 9, color: C.muted, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>HIPAA Compliant · Trusted Care</div>
                </div>
              </div>
              <div className="hidden sm:flex" style={{ gap: 26 }}>
                {["Find a Doctor", "Specialties", "Telehealth", "Patient Portal"].map(n => (
                  <a key={n} href={`#mh-${n.toLowerCase().replace(/ /g, "-")}`} style={{ fontSize: 13, fontWeight: 500, color: C.body, textDecoration: "none" }}>{n}</a>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <a href="#" onClick={(e) => e.preventDefault()} className="hidden sm:flex items-center" style={{ gap: 6, fontSize: 13, fontWeight: 700, color: C.accent, textDecoration: "none" }}>
                  <Phone size={13} /> (555) 463-7426
                </a>
                <a href="#mh-book" className="hidden sm:block" style={{ background: C.accent, color: "white", textDecoration: "none", borderRadius: 999, padding: "9px 18px", fontSize: 13, fontWeight: 700 }}>Book Appointment</a>
                <button onClick={onClose} style={{ background: "rgba(12,110,245,0.08)", border: "none", borderRadius: 999, width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <X size={16} color={C.dark} />
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
          <section style={{ padding: "80px 24px 70px", background: `linear-gradient(160deg, ${C.bg} 0%, ${C.bgAlt} 100%)`, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 500, height: 500, background: `radial-gradient(circle, rgba(12,110,245,0.07) 0%, transparent 70%)`, pointerEvents: "none" }} />
            <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
              <div>
                <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
                  {["✅ HIPAA Compliant", "🏥 Joint Commission Accredited", "⭐ 4.9/5 Patient Rating"].map(b => (
                    <div key={b} style={{ background: C.accentPale, border: `1px solid ${C.border}`, borderRadius: 999, padding: "5px 12px", fontSize: 11, fontWeight: 700, color: C.accent }}>{b}</div>
                  ))}
                </div>
                <h1 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", fontWeight: 900, color: C.dark, lineHeight: 1.1, marginBottom: 18, letterSpacing: "-0.025em" }}>
                  Your Health,<br /><span style={{ color: C.accent }}>Simplified.</span>
                </h1>
                <p style={{ fontSize: 17, color: C.body, marginBottom: 32, lineHeight: 1.7, maxWidth: 440 }}>
                  Book same-day appointments. See doctors in person or by video. Access your records instantly. One platform for your entire health journey.
                </p>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <a href="#mh-book" style={{ background: C.accent, color: "white", textDecoration: "none", borderRadius: 12, padding: "15px 28px", fontSize: 15, fontWeight: 800, boxShadow: `0 8px 30px rgba(12,110,245,0.3)`, display: "flex", alignItems: "center", gap: 8 }}>
                    <Calendar size={16} /> Book Appointment
                  </a>
                  <a href="#mh-telehealth" style={{ background: "white", color: C.accent, textDecoration: "none", border: `1.5px solid ${C.borderMed}`, borderRadius: 12, padding: "15px 22px", fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                    <Video size={15} /> Start Telehealth Visit
                  </a>
                </div>
                <div style={{ display: "flex", gap: 20, marginTop: 24, flexWrap: "wrap" }}>
                  {["Most insurance accepted", "Same-day availability", "No referral needed", "Prescriptions online"].map(t => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 5, color: C.body, fontSize: 12 }}>
                      <Check size={12} color={C.green} strokeWidth={2.5} /> {t}
                    </div>
                  ))}
                </div>
              </div>
              {/* BOOKING WIDGET */}
              <div style={{ background: C.bgCard, borderRadius: 20, padding: 30, boxShadow: "0 20px 60px rgba(12,110,245,0.12)", border: `1px solid ${C.border}` }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: C.dark, marginBottom: 20 }}>Find & Book a Doctor</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { label: "Specialty", value: bookSpec, set: setBookSpec, opts: ["Primary Care", "Cardiology", "Neurology", "Dental Care", "Ophthalmology", "Oncology"] },
                    { label: "Visit Type", value: bookType, set: setBookType, opts: ["In-Person Visit", "Telehealth (Video)", "Urgent Care"] },
                    { label: "Availability", value: bookDate, set: setBookDate, opts: ["Today", "Tomorrow", "This Week", "Next Week"] },
                  ].map(({ label, value, set, opts }) => (
                    <div key={label}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</label>
                      <select value={value} onChange={e => set(e.target.value)} style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${C.border}`, fontSize: 14, color: C.dark, background: C.bg, outline: "none" }}>
                        {opts.map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                  <input placeholder="ZIP code or city" style={{ padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${C.border}`, fontSize: 14, color: C.dark, background: C.bg, outline: "none" }} />
                  <button style={{ background: C.accent, color: "white", border: "none", borderRadius: 12, padding: "14px 0", fontSize: 15, fontWeight: 800, cursor: "pointer", boxShadow: `0 6px 24px rgba(12,110,245,0.3)` }}>
                    Search Doctors →
                  </button>
                </div>
                <div style={{ display: "flex", gap: 4, alignItems: "center", justifyContent: "center", marginTop: 14 }}>
                  <Shield size={12} color={C.muted} />
                  <span style={{ fontSize: 11, color: C.muted }}>HIPAA compliant · Your data stays private</span>
                </div>
              </div>
            </div>
          </section>

          {/* STATS */}
          <section style={{ background: C.accent, padding: "28px 24px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, textAlign: "center" }}>
              {[["85+", "Specialist Doctors"], ["4.9★", "Patient Rating"], ["Same Day", "Appointment Availability"], ["50K+", "Patients Served"]].map(([n, l]) => (
                <div key={l}><div style={{ fontSize: "1.7rem", fontWeight: 900, color: "white" }}>{n}</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>{l}</div></div>
              ))}
            </div>
          </section>

          {/* FEATURES */}
          <section style={{ padding: "70px 24px", background: C.bg }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.accent, marginBottom: 10 }}>How It Works</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, color: C.dark, letterSpacing: "-0.025em" }}>Healthcare That Works for You</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
                {FEATURES.map(({ icon: Icon, title, desc }) => (
                  <div key={title} style={{ background: C.bgCard, borderRadius: 18, padding: 24, border: `1px solid ${C.border}`, textAlign: "center" }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: C.accentPale, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                      <Icon size={22} color={C.accent} />
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: C.dark, marginBottom: 8 }}>{title}</h3>
                    <p style={{ fontSize: 13, color: C.body, lineHeight: 1.65 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* DOCTORS */}
          <section id="mh-find-a-doctor" style={{ padding: "70px 24px", background: C.bgAlt }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.accent, marginBottom: 10 }}>Our Physicians</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900, color: C.dark, letterSpacing: "-0.025em" }}>Meet Your Care Team</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                {DOCTORS.map((d) => (
                  <div key={d.name} style={{ background: C.bgCard, borderRadius: 20, overflow: "hidden", border: `1px solid ${C.border}` }}>
                    <div style={{ height: 200, backgroundImage: `url('${d.img}')`, backgroundSize: "cover", backgroundPosition: "center top" }} />
                    <div style={{ padding: 24 }}>
                      <div style={{ fontWeight: 800, fontSize: 16, color: C.dark, marginBottom: 2 }}>{d.name}</div>
                      <div style={{ fontSize: 13, color: C.accent, fontWeight: 600, marginBottom: 12 }}>{d.spec}</div>
                      <div style={{ display: "flex", gap: 2, alignItems: "center", marginBottom: 10 }}>
                        {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} fill="#fbbf24" color="#fbbf24" />)}
                        <span style={{ fontSize: 12, color: C.body, marginLeft: 6 }}>{d.rating} ({d.reviews} reviews)</span>
                      </div>
                      <div style={{ background: "rgba(5,150,105,0.08)", border: "1px solid rgba(5,150,105,0.2)", borderRadius: 8, padding: "7px 12px", marginBottom: 14 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: C.green }}>✓ Available: {d.available}</span>
                      </div>
                      <div style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>🩺 {d.insurance}</div>
                      <button style={{ width: "100%", background: C.accent, color: "white", border: "none", borderRadius: 10, padding: "11px 0", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Book with {d.name.split(" ")[1]}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* REVIEWS */}
          <section style={{ padding: "70px 24px", background: C.bg }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 14 }}>
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={20} fill="#fbbf24" color="#fbbf24" />)}
                </div>
                <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 900, color: C.dark, letterSpacing: "-0.025em" }}>4.9 Stars from 50,000+ Patients</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                {REVIEWS.map((r) => (
                  <div key={r.name} style={{ background: C.bgCard, borderRadius: 18, padding: 28, border: `1px solid ${C.border}` }}>
                    <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                      {Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={13} fill="#fbbf24" color="#fbbf24" />)}
                    </div>
                    <p style={{ fontSize: 14, color: C.body, lineHeight: 1.75, marginBottom: 18 }}>"{r.text}"</p>
                    <div style={{ fontWeight: 800, fontSize: 13, color: C.dark }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: C.muted }}>{r.spec}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section style={{ padding: "70px 24px", background: C.bgAlt }}>
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 900, color: C.dark, letterSpacing: "-0.025em", textAlign: "center", marginBottom: 40 }}>Common Questions</h2>
              {FAQS.map(([q, a], i) => (
                <div key={q} style={{ background: C.bgCard, borderRadius: 14, marginBottom: 10, border: `1px solid ${C.border}`, overflow: "hidden" }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: C.dark }}>{q}</span>
                    <ChevronDown size={18} color={C.muted} style={{ transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                  </button>
                  {openFaq === i && <div style={{ padding: "0 22px 18px", fontSize: 14, color: C.body, lineHeight: 1.7 }}>{a}</div>}
                </div>
              ))}
            </div>
          </section>

          {/* BOOK CTA */}
          <section id="mh-book" style={{ padding: "70px 24px", background: C.accent }}>
            <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "white", letterSpacing: "-0.025em", marginBottom: 16 }}>Ready to See a Doctor?</h2>
              <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 16, marginBottom: 36 }}>Most appointments available today. Same-day telehealth always available.</p>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <button style={{ background: "white", color: C.accent, border: "none", borderRadius: 12, padding: "16px 32px", fontSize: 16, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                  <Calendar size={18} /> Book In-Person Visit
                </button>
                <button style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 12, padding: "16px 28px", fontSize: 16, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                  <Video size={16} /> Start Telehealth Now
                </button>
              </div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginTop: 20 }}>📞 Prefer to call? <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "white", fontWeight: 700 }}>(555) 463-7426</a></p>
            </div>
          </section>

          {/* FOOTER */}
          <footer style={{ background: C.dark, padding: "36px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 6 }}>Meridian<span style={{ color: "#60a5fa" }}>Health</span></div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>HIPAA Compliant · Joint Commission Accredited · (555) 463-7426</p>
            <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 11, marginTop: 10 }}>Demo site by NexaWeb · Not a real business</p>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
