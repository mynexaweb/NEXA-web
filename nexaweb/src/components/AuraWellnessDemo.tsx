"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Menu, AlertTriangle, ArrowRight, Leaf, Flame,
  Star, CheckCircle, MapPin, Phone, Mail, ChevronDown,
  Globe, MessageCircle, Share2, Heart, Activity,
  Clock, Users, Quote, Zap, Shield, Calendar, Gift,
} from "lucide-react";

interface AuraWellnessDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

// ── Color tokens (light luxury theme) ─────────────────
const C = {
  bg:        "#faf8f5",
  bgAlt:     "#f0ece5",
  bgCard:    "#ffffff",
  heading:   "#1c1a17",
  body:      "#6b6560",
  muted:     "#a09890",
  sage:      "#4a6741",
  sageLight: "#6d8f6a",
  sagePale:  "rgba(74,103,65,0.08)",
  sageBorder:"rgba(74,103,65,0.22)",
  gold:      "#b8966a",
  goldPale:  "rgba(184,150,106,0.12)",
  border:    "rgba(0,0,0,0.07)",
  borderMed: "rgba(0,0,0,0.1)",
};

const NAV_ITEMS = [
  { label: "Treatments", id: "treatments" },
  { label: "Experience", id: "experience" },
  { label: "Therapists", id: "therapists" },
  { label: "FAQ",        id: "faq"        },
];

const PRESS = ["Vogue", "Harper's Bazaar", "Condé Nast Traveller", "The Times", "Tatler", "Evening Standard"];

const EXPERIENCE_STEPS = [
  { n: "01", title: "Arrive & Unwind",       desc: "You're welcomed with a hand-pressed botanical tea and shown to your private changing suite. No rush, no noise — just stillness." },
  { n: "02", title: "Your Consultation",     desc: "Your therapist spends 15 minutes learning your body, your goals, and what you need most. Every session is different because every person is." },
  { n: "03", title: "Your Treatment",        desc: "A private treatment room designed for complete sensory disconnection. Organic products, expert hands, total restoration." },
  { n: "04", title: "The Thermal Journey",   desc: "Finish your visit in the thermal suite — herbal steam, cold plunge, relaxation pool. Leave when you're ready. There's no rush." },
];

const TREATMENTS = [
  { icon: Heart,    name: "Swedish Bliss",       desc: "A gentle, flowing full-body massage that melts tension and restores effortless calm.",                                     time: "60 or 90 min", from: "$95",  intensity: "Gentle",   img: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&h=340&fit=crop&q=80" },
  { icon: Flame,    name: "Hot Stone Ritual",    desc: "Heated volcanic stones placed along energy meridians to release deep tension and restore balance.",                        time: "90 min",       from: "$135", intensity: "Deep",     img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=340&fit=crop&q=80" },
  { icon: Zap,      name: "Deep Tissue",         desc: "Focused pressure on deep muscle layers — built for chronic tension, postural stress, and active recovery.",               time: "60 or 90 min", from: "$110", intensity: "Intense",  img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&h=340&fit=crop&q=80" },
  { icon: Star,     name: "Radiance Facial",     desc: "A bespoke facial using certified organic botanicals to cleanse, restore, and reveal your skin's natural luminosity.",      time: "75 min",       from: "$120", intensity: "Gentle",   img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=340&fit=crop&q=80" },
  { icon: Leaf,     name: "Aromatherapy Journey",desc: "A full-body sensory ritual using therapeutic essential oils to rebalance your nervous system and restore inner peace.",     time: "90 min",       from: "$125", intensity: "Gentle",   img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=340&fit=crop&q=80" },
  { icon: Activity, name: "Revive Body Wrap",    desc: "Sea clay and algae applied head to toe — detoxifying, hydrating, and completely renewing the skin.",                       time: "100 min",      from: "$150", intensity: "Moderate", img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=340&fit=crop&q=80" },
];

const STATS = [
  { value: "800+",  label: "Clients transformed",  sub: "since 2013"         },
  { value: "4.97",  label: "Average review score",  sub: "from 1,200+ reviews"},
  { value: "35+",   label: "Signature treatments",  sub: "across all modalities"},
  { value: "98%",   label: "Would recommend us",    sub: "client survey 2024" },
];

const TESTIMONIALS = [
  { name: "Amelia R.",   result: "Stress-free",       duration: "member, 8 months",  stars: 5, photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face&q=80", review: "I've visited spas across London and New York. Nothing compares to Aura. The therapists understand your body better than you do. I leave feeling like a completely new person every single time." },
  { name: "Sophie K.",   result: "Chronic pain gone", duration: "member, 6 months",  stars: 5, photo: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=120&h=120&fit=crop&crop=face&q=80", review: "Three years of back pain from desk work. Four sessions at Aura and it was gone. I don't say that lightly — I had seen physios, chiropractors, and osteopaths. The therapists here are in a different league." },
  { name: "Marcus T.",   result: "Better sleep",      duration: "member, 3 months",  stars: 5, photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face&q=80", review: "I was deeply sceptical about aromatherapy. The team walked me through the science and the process. I now sleep 7–8 hours a night without medication. The Renew package has genuinely changed my quality of life." },
  { name: "Isabelle W.", result: "Skin transformed",  duration: "member, 5 months",  stars: 5, photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face&q=80", review: "The Radiance Facial is the only treatment that has ever worked on my skin. People constantly ask what I've changed. The answer is always just: Aura." },
];

const PACKAGES = [
  {
    name: "Restore", price: 95, period: "per visit", desc: "For the occasional escape.",
    features: ["Any single treatment", "Thermal suite access", "Botanical tea ceremony", "Organic product samples"],
    highlight: false, badge: undefined as string | undefined,
  },
  {
    name: "Renew", price: 199, period: "/ month", desc: "The ritual most members choose.",
    features: ["2 treatments per month", "Full thermal suite access", "Priority booking (24hrs early)", "15% off retail products", "Monthly wellness check-in", "One guest pass / month"],
    highlight: true, badge: "Most Popular",
  },
  {
    name: "Revive", price: 349, period: "/ month", desc: "Unlimited. Unrestricted.",
    features: ["Unlimited treatments", "Private suite access", "Custom wellness program", "Unlimited guest passes", "Monthly at-home kit", "Dedicated personal therapist"],
    highlight: false, badge: undefined,
  },
];

const THERAPISTS = [
  { name: "Isabelle Chen", role: "Lead Therapist",    exp: "11 yrs", certs: "CNHC · ITEC Dip.",       photo: "https://images.unsplash.com/photo-1571388208497-71bedc66e932?w=400&h=400&fit=crop&crop=face&q=80" },
  { name: "Naomi West",    role: "Aromatherapy",       exp: "8 yrs",  certs: "IFA · Dip. Aromatherapy", photo: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop&crop=face&q=80" },
  { name: "Theo Laurent",  role: "Deep Tissue",        exp: "9 yrs",  certs: "BTEC · Sports Massage",   photo: "https://images.unsplash.com/photo-1567013127542-490d757e51cd?w=400&h=400&fit=crop&crop=face&q=80" },
  { name: "Priya Sharma",  role: "Skin & Facial",      exp: "7 yrs",  certs: "CIDESCO · ITEC",          photo: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop&crop=face&q=80" },
];

const GALLERY = [
  { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=400&fit=crop&q=80", label: "Treatment Suite"   },
  { src: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&h=400&fit=crop&q=80", label: "Thermal Pool"      },
  { src: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&h=400&fit=crop&q=80", label: "Massage Studio"    },
  { src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=400&fit=crop&q=80", label: "Relaxation Lounge" },
];

const FAQS = [
  { q: "What should I expect on my first visit?",  a: "Your first visit begins with a private 15-minute wellness consultation. Your therapist will discuss your health history, areas of focus, and goals before showing you to the thermal suite. Robe, slippers, and organic toiletries are provided — you need only bring yourself." },
  { q: "How far in advance should I book?",         a: "We recommend booking 48–72 hours ahead for weekdays and at least 5 days for weekends. Renew and Revive members receive priority access 24 hours before general availability opens." },
  { q: "What should I wear or bring?",              a: "Nothing — we provide everything. Robes, slippers, towels, and a full range of organic toiletries. For body treatments, you'll always be modestly and comfortably draped throughout." },
  { q: "Are your products truly organic?",          a: "Yes, without exception. Every product used is third-party certified organic and free from synthetic fragrances, parabens, and sulfates. We partner exclusively with Bamford, Voya, and Augustinus Bader." },
  { q: "Do you offer gift vouchers?",               a: "Yes. Gift vouchers are available for any treatment, package, or custom monetary value. Valid for 12 months, beautifully gift-boxed, and available online or in person." },
  { q: "Do you offer couples treatments?",          a: "Yes. Our couples suite accommodates two guests simultaneously for any treatment combination. Packages include a private thermal soak, botanical menu, and complimentary champagne. Book at least 5 days ahead." },
];

const BOOKING_TREATMENTS = ["Swedish Bliss (60 min)", "Swedish Bliss (90 min)", "Hot Stone Ritual", "Deep Tissue (60 min)", "Radiance Facial", "Aromatherapy Journey", "Revive Body Wrap"];
const BOOKING_TIMES = ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM", "6:30 PM"];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: C.sage }}>
      {children}
    </p>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => <Star key={i} size={11} fill={C.gold} color={C.gold} />)}
    </div>
  );
}

export function AuraWellnessDemo({ isOpen, onClose }: AuraWellnessDemoProps) {
  const scrollRef    = useRef<HTMLDivElement>(null);
  const [faqOpen,    setFaqOpen]    = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeTest, setActiveTest] = useState(0);
  const [bookDate,   setBookDate]   = useState("Tomorrow");
  const [bookTime,   setBookTime]   = useState("2:00 PM");
  const [bookTreat,  setBookTreat]  = useState("Swedish Bliss (60 min)");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => { if (!isOpen) { setMobileMenu(false); setActiveTest(0); } }, [isOpen]);

  const scrollTo = (id: string) => {
    setMobileMenu(false);
    setTimeout(() => {
      scrollRef.current?.querySelector(`#a-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex flex-col"
          style={{ background: C.bg, fontFamily: "var(--font-inter)", color: C.body }}
        >
          {/* ── Navbar ── */}
          <nav
            className="relative flex-shrink-0 flex items-center justify-between px-4 sm:px-8 h-14 sm:h-16 border-b z-20"
            style={{ borderColor: C.border, background: "rgba(250,248,245,0.97)", backdropFilter: "blur(12px)" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: C.sage }}>
                <Leaf size={14} color="white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-sm sm:text-base tracking-tight" style={{ color: C.heading }}>
                Aura <span style={{ color: C.sage }}>Wellness</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-7">
              {NAV_ITEMS.map((n) => (
                <button key={n.id} onClick={() => scrollTo(n.id)}
                  className="text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: C.body }}>
                  {n.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollTo("booking")}
                className="hidden md:flex h-9 px-5 rounded-full text-sm font-semibold text-white items-center gap-1.5 transition-all hover:opacity-90"
                style={{ background: C.sage }}>
                <Calendar size={13} /> Book Now
              </button>
              <button onClick={() => setMobileMenu((v) => !v)}
                className="md:hidden w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.05)", border: `1px solid ${C.border}` }}>
                {mobileMenu ? <X size={15} color={C.heading} /> : <Menu size={15} color={C.heading} />}
              </button>
              <button onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                style={{ background: "rgba(0,0,0,0.05)", border: `1px solid ${C.border}` }}>
                <X size={15} color={C.body} />
              </button>
            </div>

            <AnimatePresence>
              {mobileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}
                  className="absolute top-full left-0 right-0 md:hidden border-b"
                  style={{ background: C.bg, borderColor: C.border }}>
                  <div className="flex flex-col py-3">
                    {NAV_ITEMS.map((n) => (
                      <button key={n.id} onClick={() => scrollTo(n.id)}
                        className="px-6 py-3.5 text-left text-sm font-medium transition-colors hover:bg-black/5"
                        style={{ color: C.body }}>
                        {n.label}
                      </button>
                    ))}
                    <div className="px-6 pt-2 pb-4">
                      <button onClick={() => { setMobileMenu(false); scrollTo("booking"); }}
                        className="w-full h-10 rounded-xl text-sm font-semibold text-white"
                        style={{ background: C.sage }}>
                        Book Your Treatment
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>

          {/* ── Demo site banner — prominent ── */}
          <div
            className="flex-shrink-0 flex items-center justify-center gap-2.5 py-2.5 px-4 text-center"
            style={{
              background: "linear-gradient(90deg, #0a0700 0%, #1a1000 50%, #0a0700 100%)",
              borderBottom: "1px solid rgba(252,211,77,0.32)",
            }}
          >
            <span style={{ fontSize: 15 }}>⚠️</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#fcd34d", letterSpacing: "0.01em" }}>
              DEMO SITE — Not a real business.{" "}
              <span style={{ color: "#fb923c" }}>Built by NexaWeb</span> to showcase what we can build for you.
            </span>
          </div>

          {/* ── Scrollable body ── */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto">

            {/* ───── HERO ───── split layout */}
            <section className="relative flex min-h-[calc(100svh-96px)] overflow-hidden" style={{ background: C.bg }}>
              {/* Right: spa photo */}
              <div className="absolute inset-y-0 right-0 w-full md:w-[55%] pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=900&fit=crop&q=80"
                  alt="Aura Wellness spa interior"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
                {/* Fade left edge into cream bg */}
                <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${C.bg} 0%, rgba(250,248,245,0.4) 25%, transparent 55%)` }} />
                {/* Slight warm overlay */}
                <div className="absolute inset-0" style={{ background: "rgba(250,245,235,0.15)" }} />
              </div>
              {/* Mobile: image behind text */}
              <div className="absolute inset-0 md:hidden pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&h=700&fit=crop&q=80" alt="" className="w-full h-full object-cover opacity-15" />
              </div>

              {/* Left: content */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-20 py-16 max-w-xl"
              >
                {/* Pulsing availability badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-7 w-fit"
                  style={{ background: C.sagePale, border: `1px solid ${C.sageBorder}`, color: C.sage }}>
                  <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                    <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: C.sage }} />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: C.sage }} />
                  </span>
                  Accepting new clients — Spring 2025
                </div>

                <h1 className="font-display font-black leading-[0.9] tracking-tighter mb-5" style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: C.heading }}>
                  Restore.<br />
                  <span style={{ color: C.sage }}>Renew.</span><br />
                  Revive.
                </h1>

                <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-md" style={{ color: C.body }}>
                  A luxury wellness sanctuary in the heart of New York. Master therapists, certified organic products, and a space designed for complete restoration.
                </p>

                {/* Trust line */}
                <div className="flex items-center gap-2 mb-8">
                  <div className="flex -space-x-2">
                    {["photo-1494790108377-be9c29b29330", "photo-1554151228-14d9def656e4", "photo-1507003211169-0a1dd7228f2d"].map((id) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={id} src={`https://images.unsplash.com/${id}?w=60&h=60&fit=crop&crop=face&q=80`}
                        alt="" className="w-8 h-8 rounded-full object-cover ring-2" style={{ ringColor: C.bg } as React.CSSProperties} />
                    ))}
                  </div>
                  <div>
                    <div className="flex gap-0.5 mb-0.5">
                      {[1,2,3,4,5].map(i => <Star key={i} size={11} fill={C.gold} color={C.gold} />)}
                    </div>
                    <p className="text-xs" style={{ color: C.muted }}>
                      <span style={{ color: C.heading, fontWeight: 600 }}>4.97</span> · 1,200+ reviews
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => scrollTo("booking")}
                    className="flex items-center gap-2 h-12 px-7 rounded-full font-semibold text-sm text-white transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                    style={{ background: C.sage, boxShadow: `0 8px 32px rgba(74,103,65,0.3)` }}>
                    Book a Treatment <ArrowRight size={14} />
                  </button>
                  <button onClick={() => scrollTo("treatments")}
                    className="flex items-center gap-2 text-sm font-semibold transition-colors h-12 px-6 rounded-full border"
                    style={{ color: C.body, borderColor: C.borderMed }}>
                    Explore Treatments
                  </button>
                </div>
              </motion.div>
            </section>

            {/* ───── PRESS BAR ───── */}
            <div className="border-y py-4 px-5 sm:px-8" style={{ borderColor: C.border, background: C.bgCard }}>
              <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] mr-2" style={{ color: C.muted }}>As featured in</span>
                {PRESS.map((p) => (
                  <span key={p} className="font-display font-bold text-sm tracking-wide cursor-default transition-colors hover:opacity-70" style={{ color: C.muted }}>{p}</span>
                ))}
              </div>
            </div>

            {/* ───── THE AURA EXPERIENCE ───── */}
            <section id="a-experience" className="px-5 sm:px-8 md:px-12 lg:px-20 py-16 md:py-24" style={{ background: C.bg }}>
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mb-12 md:mb-16">
                <SectionLabel>What to Expect</SectionLabel>
                <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight" style={{ color: C.heading }}>
                  The Aura<br /><span style={{ color: C.sage }}>Experience.</span>
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                {EXPERIENCE_STEPS.map((s, i) => (
                  <motion.div key={s.n} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.09 }}>
                    <div className="font-display font-black mb-4 leading-none" style={{ fontSize: "3.5rem", color: C.sagePale, WebkitTextStroke: `1.5px ${C.sage}`, WebkitTextFillColor: "transparent" }}>
                      {s.n}
                    </div>
                    <h3 className="font-display font-bold text-base mb-2" style={{ color: C.heading }}>{s.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: C.body }}>{s.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ───── GALLERY STRIP ───── */}
            <section className="border-t border-b" style={{ borderColor: C.border }}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5">
                {GALLERY.map((g, i) => (
                  <motion.div key={g.label} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.06 }}
                    className="relative overflow-hidden aspect-[4/3] group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={g.src} alt={g.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 transition-colors duration-300" style={{ background: "rgba(28,26,23,0.35)" }} />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(28,26,23,0.15)" }} />
                    <div className="absolute bottom-3 left-3">
                      <span className="text-white/80 text-xs font-semibold tracking-wide uppercase">{g.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ───── TREATMENTS ───── */}
            <section id="a-treatments" className="px-5 sm:px-8 md:px-12 lg:px-20 py-16 md:py-24" style={{ background: C.bgAlt }}>
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mb-12 md:mb-16">
                <SectionLabel>Treatments</SectionLabel>
                <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight" style={{ color: C.heading }}>
                  35+ treatments.<br /><span style={{ color: C.muted }}>Every body. Every need.</span>
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {TREATMENTS.map((t, i) => (
                  <motion.div key={t.name} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.06 }}
                    className="group rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-md"
                    style={{ background: C.bgCard, border: `1px solid ${C.border}` }}>
                    <div className="relative h-44 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={t.img} alt={t.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(28,26,23,0.55) 100%)" }} />
                      {/* Intensity badge */}
                      <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{
                          background: t.intensity === "Intense" ? "rgba(220,60,60,0.9)" : t.intensity === "Deep" ? "rgba(184,150,106,0.9)" : t.intensity === "Moderate" ? "rgba(74,103,65,0.9)" : "rgba(255,255,255,0.88)",
                          color: t.intensity === "Gentle" ? C.sage : "white",
                          backdropFilter: "blur(4px)",
                        }}>
                        {t.intensity}
                      </span>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.92)" }}>
                          <t.icon size={13} color={C.sage} />
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-display font-bold text-base" style={{ color: C.heading }}>{t.name}</h3>
                        <span className="font-display font-black text-sm shrink-0 mt-0.5" style={{ color: C.sage }}>from {t.from}</span>
                      </div>
                      <p className="text-sm leading-relaxed mb-3" style={{ color: C.body }}>{t.desc}</p>
                      <div className="flex items-center gap-1.5 text-xs" style={{ color: C.muted }}>
                        <Clock size={10} /><span>{t.time}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ───── STATS BAND ───── */}
            <section className="border-y px-5 sm:px-8 md:px-12 lg:px-20 py-12 md:py-16" style={{ borderColor: C.border, background: C.bgCard }}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
                {STATS.map((s, i) => (
                  <motion.div key={s.label} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.08 }}
                    className="text-center md:text-left">
                    <div className="font-display font-black mb-1" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: C.sage, lineHeight: 1 }}>{s.value}</div>
                    <div className="font-semibold text-sm mb-0.5" style={{ color: C.heading }}>{s.label}</div>
                    <div className="text-xs" style={{ color: C.muted }}>{s.sub}</div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ───── QUOTE BANNER ───── */}
            <section className="relative h-52 sm:h-64 overflow-hidden" style={{ borderColor: C.border }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1600&h=600&fit=crop&q=80" alt=""
                className="w-full h-full object-cover object-center" loading="lazy" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(28,26,23,0.88) 0%, rgba(28,26,23,0.55) 60%, rgba(28,26,23,0.2) 100%)" }} />
              <div className="absolute inset-0 flex items-center px-5 sm:px-8 md:px-12 lg:px-20">
                <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }} className="max-w-xl">
                  <Quote size={26} color={C.gold} className="mb-3 opacity-80" />
                  <blockquote className="font-display font-black text-white text-xl sm:text-2xl md:text-3xl leading-tight tracking-tight">
                    Rest is not a luxury. It is a biological necessity.
                  </blockquote>
                  <p className="text-sm mt-3" style={{ color: "rgba(255,255,255,0.45)" }}>— Aura Wellness philosophy</p>
                </motion.div>
              </div>
            </section>

            {/* ───── PRICING ───── */}
            <section id="a-pricing" className="px-5 sm:px-8 md:px-12 lg:px-20 py-16 md:py-24" style={{ background: C.bg }}>
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mb-12 md:mb-16">
                <SectionLabel>Membership</SectionLabel>
                <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight" style={{ color: C.heading }}>
                  Simple packages.<br /><span style={{ color: C.muted }}>Cancel anytime.</span>
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
                {PACKAGES.map((p, i) => (
                  <motion.div key={p.name} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.09 }}
                    className="relative rounded-2xl p-6 border flex flex-col"
                    style={{
                      background: p.highlight ? C.bgCard        : C.bgCard,
                      border:     p.highlight ? `2px solid ${C.sage}` : `1px solid ${C.border}`,
                      boxShadow:  p.highlight ? `0 8px 40px rgba(74,103,65,0.12)` : "none",
                    }}>
                    {p.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap"
                        style={{ background: C.sage }}>
                        {p.badge}
                      </div>
                    )}
                    <div className="mb-5">
                      <h3 className="font-display font-bold text-lg mb-1" style={{ color: C.heading }}>{p.name}</h3>
                      <p className="text-sm" style={{ color: C.muted }}>{p.desc}</p>
                    </div>
                    <div className="flex items-end gap-1 mb-6">
                      <span className="font-display font-black" style={{ fontSize: "2.6rem", lineHeight: 1, color: C.heading }}>${p.price}</span>
                      <span className="text-sm mb-1" style={{ color: C.muted }}>{p.period}</span>
                    </div>
                    <ul className="flex flex-col gap-2.5 mb-7 flex-1">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm" style={{ color: C.body }}>
                          <CheckCircle size={13} color={C.sage} className="mt-0.5 flex-shrink-0" />{f}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full h-11 rounded-xl font-semibold text-sm transition-all active:scale-95"
                      style={p.highlight
                        ? { background: C.sage, color: "white" }
                        : { background: C.bgAlt, color: C.heading, border: `1px solid ${C.border}` }}>
                      Book Now
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Gift cards nudge */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
                className="mt-6 flex items-center gap-4 p-5 rounded-2xl border"
                style={{ background: C.goldPale, border: `1px solid rgba(184,150,106,0.25)` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(184,150,106,0.2)" }}>
                  <Gift size={18} color={C.gold} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm mb-0.5" style={{ color: C.heading }}>Give the gift of Aura</p>
                  <p className="text-xs" style={{ color: C.body }}>Gift vouchers available for any treatment or value — valid 12 months, beautifully packaged.</p>
                </div>
                <button className="shrink-0 flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full transition-all hover:opacity-80"
                  style={{ background: C.gold, color: "white" }}>
                  Buy Gift Card <ArrowRight size={11} />
                </button>
              </motion.div>
            </section>

            {/* ───── TESTIMONIALS ── editorial pull-quote style ───── */}
            <section className="px-5 sm:px-8 md:px-12 lg:px-20 py-16 md:py-24 border-t" style={{ borderColor: C.border, background: C.bgCard }}>
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mb-12 text-center">
                <SectionLabel>Client Stories</SectionLabel>
                <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight" style={{ color: C.heading }}>
                  Real people.<br /><span style={{ color: C.muted }}>Real restoration.</span>
                </h2>
              </motion.div>

              {/* Featured quote (large) */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
                className="max-w-3xl mx-auto text-center mb-10">
                <div className="font-display font-black mb-4" style={{ fontSize: "5rem", lineHeight: 1, color: C.sagePale, WebkitTextStroke: `2px ${C.sage}`, WebkitTextFillColor: "transparent" }}>"</div>
                <AnimatePresence mode="wait">
                  <motion.div key={activeTest} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
                    <blockquote className="font-display font-bold text-xl sm:text-2xl leading-snug mb-6 tracking-tight" style={{ color: C.heading }}>
                      {TESTIMONIALS[activeTest].review}
                    </blockquote>
                    <div className="flex items-center justify-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={TESTIMONIALS[activeTest].photo} alt={TESTIMONIALS[activeTest].name}
                        className="w-10 h-10 rounded-full object-cover" style={{ border: `2px solid ${C.border}` }} loading="lazy" />
                      <div className="text-left">
                        <div className="font-semibold text-sm" style={{ color: C.heading }}>{TESTIMONIALS[activeTest].name}</div>
                        <div className="text-xs" style={{ color: C.muted }}>
                          {TESTIMONIALS[activeTest].result} · {TESTIMONIALS[activeTest].duration}
                        </div>
                      </div>
                      <div className="ml-2"><Stars n={5} /></div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Selector dots */}
              <div className="flex items-center justify-center gap-3">
                {TESTIMONIALS.map((t, i) => (
                  <button key={t.name} onClick={() => setActiveTest(i)}
                    className="transition-all duration-200"
                    style={{ width: activeTest === i ? 24 : 8, height: 8, borderRadius: 4, background: activeTest === i ? C.sage : C.border }}>
                  </button>
                ))}
              </div>
            </section>

            {/* ───── THERAPISTS ───── */}
            <section id="a-therapists" className="px-5 sm:px-8 md:px-12 lg:px-20 py-16 md:py-24 border-t" style={{ borderColor: C.border, background: C.bg }}>
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mb-12">
                <SectionLabel>Our Team</SectionLabel>
                <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight" style={{ color: C.heading }}>
                  Expert hands.<br /><span style={{ color: C.muted }}>Certified minds.</span>
                </h2>
              </motion.div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {THERAPISTS.map((tr, i) => (
                  <motion.div key={tr.name} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.07 }}
                    className="group rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-md"
                    style={{ background: C.bgCard, border: `1px solid ${C.border}` }}>
                    <div className="relative aspect-square overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={tr.photo} alt={tr.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(28,26,23,0.5) 0%, transparent 50%)" }} />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-bold text-sm sm:text-base mb-0.5" style={{ color: C.heading }}>{tr.name}</h3>
                      <p className="text-xs mb-2 font-medium" style={{ color: C.sage }}>{tr.role}</p>
                      <div className="hidden sm:flex flex-col gap-0.5">
                        <span className="text-xs" style={{ color: C.muted }}>{tr.exp} experience</span>
                        <span className="text-xs" style={{ color: C.muted }}>{tr.certs}</span>
                      </div>
                      <span className="sm:hidden text-xs" style={{ color: C.muted }}>{tr.exp}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ───── FAQ ───── */}
            <section id="a-faq" className="px-5 sm:px-8 md:px-12 lg:px-20 py-16 md:py-24 border-t" style={{ borderColor: C.border, background: C.bgAlt }}>
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mb-12">
                <SectionLabel>FAQ</SectionLabel>
                <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight" style={{ color: C.heading }}>
                  Questions.<br /><span style={{ color: C.muted }}>Honest answers.</span>
                </h2>
              </motion.div>

              <div className="max-w-3xl flex flex-col gap-2">
                {FAQS.map((f, i) => (
                  <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-30px" }} transition={{ delay: i * 0.04 }}
                    className="rounded-2xl border overflow-hidden"
                    style={{ background: C.bgCard, border: `1px solid ${C.border}` }}>
                    <button onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left">
                      <span className="font-semibold text-sm leading-snug" style={{ color: C.heading }}>{f.q}</span>
                      <ChevronDown size={15} color={C.muted}
                        style={{ transform: faqOpen === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s ease", flexShrink: 0 }} />
                    </button>
                    <AnimatePresence>
                      {faqOpen === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                          style={{ overflow: "hidden" }}>
                          <p className="px-5 pb-5 sm:px-6 text-sm leading-relaxed" style={{ color: C.body }}>{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ───── BOOKING CTA with fake widget ───── */}
            <section id="a-booking" className="px-5 sm:px-8 md:px-12 lg:px-20 py-16 md:py-24 border-t relative overflow-hidden" style={{ borderColor: C.border, background: C.bgCard }}>
              <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, rgba(74,103,65,0.05) 0%, transparent 100%)` }} />

              <div className="relative z-10 max-w-5xl mx-auto">
                <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="text-center mb-12">
                  <SectionLabel>Reserve Your Visit</SectionLabel>
                  <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight mb-4" style={{ color: C.heading }}>
                    Your first treatment<br />
                    <span style={{ color: C.sage }}>is on us.</span>
                  </h2>
                  <p className="text-base leading-relaxed max-w-md mx-auto" style={{ color: C.body }}>
                    No credit card required. No commitment. Just arrive, exhale, and let us take care of the rest.
                  </p>
                </motion.div>

                {/* Booking widget */}
                <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  className="rounded-2xl border p-6 md:p-8 shadow-sm max-w-2xl mx-auto"
                  style={{ background: C.bgCard, border: `1px solid ${C.borderMed}`, boxShadow: "0 4px 32px rgba(0,0,0,0.06)" }}>
                  <h3 className="font-display font-bold text-lg mb-5" style={{ color: C.heading }}>Check Availability</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    {/* Date */}
                    <div>
                      <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: C.muted }}>Date</label>
                      <select
                        value={bookDate}
                        onChange={(e) => setBookDate(e.target.value)}
                        className="w-full rounded-xl px-4 py-3 text-sm font-medium appearance-none cursor-pointer"
                        style={{ background: C.bgAlt, border: `1px solid ${C.border}`, color: C.heading, outline: "none" }}>
                        {["Today", "Tomorrow", "In 2 days", "In 3 days", "This Saturday", "This Sunday"].map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                    {/* Time */}
                    <div>
                      <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: C.muted }}>Time</label>
                      <select
                        value={bookTime}
                        onChange={(e) => setBookTime(e.target.value)}
                        className="w-full rounded-xl px-4 py-3 text-sm font-medium appearance-none cursor-pointer"
                        style={{ background: C.bgAlt, border: `1px solid ${C.border}`, color: C.heading, outline: "none" }}>
                        {BOOKING_TIMES.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    {/* Treatment */}
                    <div>
                      <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: C.muted }}>Treatment</label>
                      <select
                        value={bookTreat}
                        onChange={(e) => setBookTreat(e.target.value)}
                        className="w-full rounded-xl px-4 py-3 text-sm font-medium appearance-none cursor-pointer"
                        style={{ background: C.bgAlt, border: `1px solid ${C.border}`, color: C.heading, outline: "none" }}>
                        {BOOKING_TREATMENTS.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <button className="w-full h-12 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all hover:opacity-92 active:scale-[0.99]"
                    style={{ background: C.sage, boxShadow: `0 4px 20px rgba(74,103,65,0.25)` }}>
                    Check Availability <ArrowRight size={14} />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 mt-4">
                    <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#22c55e" }} />
                    <p className="text-xs text-center" style={{ color: C.muted }}>
                      <span style={{ color: C.sage, fontWeight: 600 }}>3 slots available {bookDate.toLowerCase()}</span> · Free cancellation up to 24 hours before
                    </p>
                  </div>
                </motion.div>

                {/* Contact info */}
                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-8 mt-10" style={{ color: C.muted }}>
                  <div className="flex items-center gap-2 text-sm"><Phone size={13} /><span>(555) 241-8830</span></div>
                  <div className="flex items-center gap-2 text-sm"><Mail size={13} /><span>hello@aurawellness.co</span></div>
                  <div className="flex items-center gap-2 text-sm"><MapPin size={13} /><span>48 Garden Mews, New York</span></div>
                </div>
              </div>
            </section>

            {/* ───── FOOTER ───── */}
            <footer className="px-5 sm:px-8 md:px-12 lg:px-20 py-8 border-t" style={{ borderColor: C.border, background: C.bgAlt }}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: C.sage }}>
                    <Leaf size={13} color="white" strokeWidth={2.5} />
                  </div>
                  <span className="font-display font-bold text-sm tracking-tight" style={{ color: C.body }}>
                    Aura <span style={{ color: C.sage }}>Wellness</span>
                  </span>
                </div>
                <p className="text-xs text-center order-3 sm:order-2" style={{ color: C.muted }}>
                  Mon–Sat 8am–9pm · Sun 9am–7pm · Members get extended hours
                </p>
                <div className="flex items-center gap-2.5 order-2 sm:order-3">
                  {([Globe, MessageCircle, Share2] as const).map((Icon, i) => (
                    <button key={i} className="w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90"
                      style={{ background: "rgba(0,0,0,0.05)", border: `1px solid ${C.border}` }}>
                      <Icon size={13} color={C.muted} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-5 pt-5 border-t text-center text-xs" style={{ borderColor: C.border, color: C.muted }}>
                © 2025 Aura Wellness. Demo site built by NexaWeb.
              </div>
            </footer>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
