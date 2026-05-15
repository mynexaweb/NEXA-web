"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Menu, AlertTriangle, Dumbbell, Users, Clock, ArrowRight,
  Flame, Zap, Heart, Activity, Target, Leaf,
  Star, CheckCircle, MapPin, Phone, Mail, ChevronDown,
  Trophy, Shield, Globe, MessageCircle, Share2, Play, Quote,
} from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { GymButton } from "@/components/ui/3d-button";

interface MomentumDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { label: "Classes",    id: "classes"  },
  { label: "Membership", id: "pricing"  },
  { label: "Trainers",   id: "trainers" },
  { label: "FAQ",        id: "faq"      },
];

const STATS = [
  { icon: Users,    value: "2,400+", label: "Active Members" },
  { icon: Dumbbell, value: "60+",    label: "Weekly Classes" },
  { icon: Clock,    value: "5:30am", label: "First Class"    },
];

const BENEFITS = [
  { icon: Trophy,   title: "Elite Equipment",  desc: "Over $2M in cutting-edge machines, free weights, and performance gear. Always maintained, never overcrowded." },
  { icon: Users,    title: "Expert Trainers",  desc: "10+ certified coaches with specialties in strength, HIIT, recovery, and sport-specific performance." },
  { icon: Shield,   title: "No Judgment Zone", desc: "A welcoming community for every fitness level. Day one or year five — you belong here." },
  { icon: Activity, title: "Real Results",     desc: "Structured programming with progress tracking. Members average 18 lbs lost in their first 90 days." },
];

const CLASSES = [
  { icon: Flame,    name: "HIIT Blast",    desc: "High-intensity intervals that torch calories and build elite conditioning.",   time: "Mon/Wed/Fri · 6am, 12pm, 6pm", intensity: "High",   img: "https://images.unsplash.com/photo-1571019614242-c5c5dee81abb?w=600&h=280&fit=crop&q=80" },
  { icon: Zap,      name: "Power Lift",    desc: "Barbell-based strength training with expert coaching on form and programming.", time: "Tue/Thu/Sat · 7am, 5pm",        intensity: "High",   img: "https://images.unsplash.com/photo-1534438327167-1dcbe6c2ce68?w=600&h=280&fit=crop&q=80" },
  { icon: Heart,    name: "Cardio Flow",   desc: "Steady-state and dynamic cardio designed to improve endurance and burn fat.",   time: "Daily · 8am, 4pm",              intensity: "Medium", img: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=600&h=280&fit=crop&q=80" },
  { icon: Activity, name: "Spin Cycle",    desc: "High-energy indoor cycling to driving beats. 45 minutes, zero excuses.",        time: "Mon/Wed/Fri · 7am, 7pm",        intensity: "High",   img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=280&fit=crop&q=80" },
  { icon: Target,   name: "Boxing Fit",    desc: "Combat-inspired cardio that sharpens reflexes and burns serious calories.",     time: "Tue/Thu · 6pm · Sat 10am",      intensity: "Medium", img: "https://images.unsplash.com/photo-1549719566-fdad92d78b3c?w=600&h=280&fit=crop&q=80" },
  { icon: Leaf,     name: "Recovery Yoga", desc: "Deep stretching and mindful movement to restore your body and sharpen focus.",   time: "Sun/Wed · 9am",                 intensity: "Low",    img: "https://images.unsplash.com/photo-1544367652-6abcdee6a5a3?w=600&h=280&fit=crop&q=80" },
];

const TIERS = [
  {
    name: "Starter", price: 39, desc: "Everything you need to get moving.",
    features: ["Full gym access (5am–11pm)", "Locker room & showers", "3 group classes/week", "Fitness assessment", "App access"],
    highlight: false, badge: undefined as string | undefined,
  },
  {
    name: "Pro", price: 69, desc: "The most popular choice for serious results.",
    features: ["Everything in Starter", "Unlimited group classes", "2 PT sessions/month", "Nutrition guidance", "Guest passes (2/mo)", "Priority class booking"],
    highlight: true, badge: "Best Value",
  },
  {
    name: "Elite", price: 99, desc: "Maximum support for maximum performance.",
    features: ["Everything in Pro", "Unlimited PT sessions", "Custom meal plans", "Recovery suite access", "Unlimited guest passes", "24/7 coach messaging"],
    highlight: false, badge: undefined,
  },
];

const TESTIMONIALS = [
  { name: "Sarah M.",  result: "Lost 42 lbs",    duration: "6 months", stars: 5, photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face&q=80", review: "I tried three gyms before Momentum. The coaches actually know your name and your goals. I've lost 42 pounds and more importantly I feel strong." },
  { name: "Jordan K.", result: "+18 lbs muscle", duration: "8 months", stars: 5, photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face&q=80", review: "As a complete beginner I was terrified. Within two weeks the trainers had me on a real program. Eight months later I've put on 18 lbs of lean muscle." },
  { name: "Priya L.",  result: "First marathon", duration: "1 year",   stars: 5, photo: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=120&h=120&fit=crop&crop=face&q=80", review: "Ran my first marathon at 45. I never thought that was possible. Momentum's cardio and HIIT programming built an engine I didn't know I had." },
  { name: "Carlos D.", result: "Down 3 sizes",   duration: "4 months", stars: 5, photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=face&q=80", review: "The community here is different. Everyone's cheering each other on. I dropped three clothing sizes and gained confidence I haven't had since my 20s." },
];

const TRAINERS = [
  { name: "Marcus Cole", role: "Strength & Conditioning", exp: "8 yrs",  certs: "CSCS, NASM-CPT",             photo: "https://images.unsplash.com/photo-1571388208497-71bedc66e932?w=400&h=400&fit=crop&crop=face&q=80", color: "#ef4444" },
  { name: "Aria Santos",  role: "HIIT & Cardio",           exp: "6 yrs",  certs: "ACE-CPT, Precision Nutrition", photo: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop&crop=face&q=80", color: "#f97316" },
  { name: "Derek Walsh",  role: "Power Lifting",            exp: "12 yrs", certs: "IPF Coach, NSCA",             photo: "https://images.unsplash.com/photo-1567013127542-490d757e51cd?w=400&h=400&fit=crop&crop=face&q=80", color: "#ef4444" },
  { name: "Naomi Price",  role: "Yoga & Recovery",          exp: "9 yrs",  certs: "RYT-500, FMS",               photo: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop&crop=face&q=80", color: "#f97316" },
];

const GALLERY = [
  { src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&h=400&fit=crop&q=80", label: "Training Floor" },
  { src: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&h=400&fit=crop&q=80", label: "Functional Zone" },
  { src: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=600&h=400&fit=crop&q=80", label: "Free Weights" },
  { src: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=600&h=400&fit=crop&q=80", label: "Power Racks" },
];

const BRANDS = ["Rogue", "Life Fitness", "Peloton", "Concept2", "TechnoGym", "Eleiko"];

const FAQS = [
  { q: "Do I need prior experience to join?",  a: "Not at all. We welcome every fitness level — from complete beginners to competitive athletes. Your first session includes a free fitness assessment so we can build a plan that fits exactly where you are." },
  { q: "Can I cancel my membership anytime?",  a: "Yes. No lock-in contracts, no cancellation fees. Month-to-month memberships can be paused or cancelled with 7 days notice. Elite annual plans have a 30-day satisfaction guarantee." },
  { q: "What equipment do you have?",          a: "Over 200 pieces of equipment including Rogue free weights, Life Fitness machines, Concept2 rowers, Peloton bikes, turf sleds, and a full functional training rig. We reinvest 15% of revenue annually into new equipment." },
  { q: "Are group classes included?",          a: "Starter members get 3 classes/week. Pro and Elite members get unlimited access to all 60+ weekly classes including HIIT, Spin, Boxing, Power Lift, and Yoga." },
  { q: "What are your operating hours?",       a: "Weekdays 5am–11pm. Weekends 6am–9pm. Elite members get 24/7 keycard access." },
  { q: "Do you offer personal training?",      a: "Yes. Every Pro membership includes 2 PT sessions per month. Elite includes unlimited. Additional sessions can be booked à la carte from $75/session." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
      style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#ef4444" }}
    >
      {children}
    </div>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => <Star key={i} size={12} fill="#f97316" color="#f97316" />)}
    </div>
  );
}

export function MomentumDemo({ isOpen, onClose }: MomentumDemoProps) {
  const scrollRef   = useRef<HTMLDivElement>(null);
  const [faqOpen,    setFaqOpen]    = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => { if (!isOpen) setMobileMenu(false); }, [isOpen]);

  const scrollTo = (id: string) => {
    setMobileMenu(false);
    setTimeout(() => {
      scrollRef.current?.querySelector(`#m-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
          style={{ background: "#080808", fontFamily: "var(--font-inter)" }}
        >
          {/* ── Navbar ── */}
          <nav
            className="relative flex-shrink-0 flex items-center justify-between px-4 sm:px-8 h-14 sm:h-16 border-b z-20"
            style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(8,8,8,0.97)", backdropFilter: "blur(12px)" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#ef4444", boxShadow: "0 0 14px rgba(239,68,68,0.5)" }}>
                <Dumbbell size={14} color="white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-black text-white text-xs sm:text-sm uppercase" style={{ letterSpacing: "0.16em" }}>Momentum</span>
            </div>

            <div className="hidden md:flex items-center gap-7">
              {NAV_ITEMS.map((n) => (
                <button key={n.id} onClick={() => scrollTo(n.id)} className="text-white/50 text-sm font-medium hover:text-white/80 transition-colors">
                  {n.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                className="hidden md:flex h-9 px-5 rounded-full text-sm font-semibold text-white items-center transition-all hover:opacity-90"
                style={{ background: "#ef4444", boxShadow: "0 0 20px rgba(239,68,68,0.35)" }}
              >
                Join Now
              </button>
              <button
                onClick={() => setMobileMenu((v) => !v)}
                className="md:hidden w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                {mobileMenu ? <X size={15} color="white" /> : <Menu size={15} color="white" />}
              </button>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <X size={15} color="rgba(255,255,255,0.7)" />
              </button>
            </div>

            <AnimatePresence>
              {mobileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-0 right-0 md:hidden border-b"
                  style={{ background: "rgba(10,10,10,0.98)", borderColor: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}
                >
                  <div className="flex flex-col py-3">
                    {NAV_ITEMS.map((n) => (
                      <button key={n.id} onClick={() => scrollTo(n.id)} className="px-6 py-3.5 text-left text-white/60 text-sm font-medium hover:text-white hover:bg-white/5 transition-colors">
                        {n.label}
                      </button>
                    ))}
                    <div className="px-6 pt-2 pb-4">
                      <button className="w-full h-10 rounded-xl text-sm font-semibold text-white" style={{ background: "#ef4444", boxShadow: "0 0 20px rgba(239,68,68,0.3)" }}>
                        Join Now — Free Trial
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

            {/* ───── HERO ───── */}
            <section id="m-hero" className="relative flex items-center min-h-[calc(100svh-96px)] overflow-hidden">
              {/* Right-side hero image (desktop) */}
              <div className="absolute inset-y-0 right-0 w-full md:w-3/5 pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=900&fit=crop&q=80"
                  alt="Momentum gym interior"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
                {/* Left fade to bg */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #080808 0%, rgba(8,8,8,0.85) 30%, rgba(8,8,8,0.3) 60%, rgba(8,8,8,0.05) 100%)" }} />
                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-32" style={{ background: "linear-gradient(to top, #080808, transparent)" }} />
              </div>
              {/* Mobile: full-bleed image behind content */}
              <div className="absolute inset-0 md:hidden pointer-events-none">
                <div className="absolute inset-0" style={{ background: "rgba(8,8,8,0.8)" }} />
              </div>

              <Spotlight className="-top-40 left-0 md:-top-20 md:left-10" fill="#ef4444" />

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 px-5 sm:px-8 md:px-12 lg:px-20 py-16 max-w-2xl"
              >
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 sm:mb-8"
                  style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444" }}
                >
                  <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                  </span>
                  New Member Special — First Month Free
                </div>

                <h1 className="font-display font-black text-white leading-[0.9] tracking-tighter mb-5 sm:mb-6" style={{ fontSize: "clamp(2.6rem, 8vw, 6.5rem)" }}>
                  Transform Your
                  <br />
                  <span style={{ WebkitTextStroke: "2px #ef4444", WebkitTextFillColor: "transparent" }}>Body & Mind.</span>
                </h1>

                <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-lg">
                  Elite coaching, world-class equipment, and a community that pushes you past every limit you thought you had. No judgment. Just results.
                </p>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 sm:mb-14">
                  <GymButton text1="Start Free Trial" text2="Join Now!" />
                  <button
                    onClick={() => scrollTo("classes")}
                    className="flex items-center gap-2 text-white/55 hover:text-white text-sm font-semibold transition-colors border border-white/15 rounded-full px-4 sm:px-5 py-2.5 hover:border-white/30"
                  >
                    Schedule a Tour <ArrowRight size={13} />
                  </button>
                </div>

                <div className="flex items-center gap-5 sm:gap-10">
                  {STATS.map((s) => (
                    <div key={s.label} className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1.5">
                        <s.icon size={12} style={{ color: "#ef4444" }} />
                        <span className="font-display font-bold text-white text-base sm:text-xl leading-none">{s.value}</span>
                      </div>
                      <span className="text-white/35 text-xs">{s.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* ───── EQUIPMENT BRANDS ───── */}
            <div className="border-y py-5 px-5 sm:px-8" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                <span className="text-white/20 text-xs uppercase tracking-widest mr-2 sm:mr-4">Equipment by</span>
                {BRANDS.map((b) => (
                  <span key={b} className="font-display font-bold text-white/25 text-sm tracking-wide hover:text-white/40 transition-colors cursor-default">{b}</span>
                ))}
              </div>
            </div>

            {/* ───── BENEFITS ───── */}
            <section className="px-5 sm:px-8 md:px-12 lg:px-20 py-14 md:py-24 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mb-10 md:mb-14">
                <SectionLabel>Why Momentum</SectionLabel>
                <h2 className="font-display font-black text-white text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
                  Built Different.<br /><span className="text-white/40">For People Who Are Too.</span>
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {BENEFITS.map((b, i) => (
                  <motion.div
                    key={b.title}
                    variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.07 }}
                    className="group rounded-2xl p-5 sm:p-6 border transition-all duration-300 hover:border-red-500/30"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ background: "rgba(239,68,68,0.12)" }}>
                      <b.icon size={18} color="#ef4444" />
                    </div>
                    <h3 className="font-display font-bold text-white text-base mb-2">{b.title}</h3>
                    <p className="text-white/45 text-sm leading-relaxed">{b.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ───── PHOTO GALLERY STRIP ───── */}
            <section className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5">
                {GALLERY.map((g, i) => (
                  <motion.div
                    key={g.label}
                    variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.06 }}
                    className="relative overflow-hidden aspect-[4/3] group"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={g.src}
                      alt={g.label}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
                    <div className="absolute bottom-3 left-3">
                      <span className="text-white/70 text-xs font-semibold tracking-wide uppercase">{g.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ───── CLASSES ───── */}
            <section id="m-classes" className="px-5 sm:px-8 md:px-12 lg:px-20 py-14 md:py-24 border-t" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.012)" }}>
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mb-10 md:mb-14">
                <SectionLabel>Classes</SectionLabel>
                <h2 className="font-display font-black text-white text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
                  60+ Classes.<br /><span className="text-white/40">Zero Excuses.</span>
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {CLASSES.map((c, i) => (
                  <motion.div
                    key={c.name}
                    variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.06 }}
                    className="group rounded-2xl border overflow-hidden transition-all duration-300 hover:border-red-500/25"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    {/* Class photo */}
                    <div className="relative h-40 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={c.img}
                        alt={c.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(8,8,8,0.7) 100%)" }} />
                      <span
                        className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{
                          background: c.intensity === "High" ? "rgba(239,68,68,0.85)" : c.intensity === "Medium" ? "rgba(249,115,22,0.85)" : "rgba(34,197,94,0.85)",
                          color: "white",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        {c.intensity}
                      </span>
                      <div className="absolute bottom-3 left-3 w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
                        <c.icon size={15} color="#ef4444" />
                      </div>
                    </div>

                    {/* Class info */}
                    <div className="p-5">
                      <h3 className="font-display font-bold text-white text-base mb-1.5">{c.name}</h3>
                      <p className="text-white/45 text-sm leading-relaxed mb-3">{c.desc}</p>
                      <div className="flex items-center gap-1.5 text-white/30 text-xs">
                        <Clock size={10} /><span>{c.time}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ───── FULL-WIDTH ATMOSPHERE BANNER ───── */}
            <section className="relative h-56 sm:h-72 overflow-hidden border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1600&h=600&fit=crop&q=80"
                alt="Training at Momentum"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.6) 50%, rgba(8,8,8,0.3) 100%)" }} />
              <div className="absolute inset-0 flex items-center px-5 sm:px-8 md:px-12 lg:px-20">
                <motion.div
                  variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  className="max-w-xl"
                >
                  <Quote size={28} color="#ef4444" className="mb-3 opacity-70" />
                  <blockquote className="font-display font-black text-white text-xl sm:text-2xl md:text-3xl leading-tight tracking-tight">
                    The only bad workout is the one that didn&apos;t happen.
                  </blockquote>
                  <p className="text-white/40 text-sm mt-3">— Momentum community motto</p>
                </motion.div>
              </div>
            </section>

            {/* ───── PRICING ───── */}
            <section id="m-pricing" className="px-5 sm:px-8 md:px-12 lg:px-20 py-14 md:py-24 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mb-10 md:mb-14">
                <SectionLabel>Membership</SectionLabel>
                <h2 className="font-display font-black text-white text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
                  Simple Pricing.<br /><span className="text-white/40">No Hidden Fees.</span>
                </h2>
                <p className="text-white/40 mt-3 max-w-md text-sm">All plans include a 7-day free trial. Cancel anytime.</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {TIERS.map((t, i) => (
                  <motion.div
                    key={t.name}
                    variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.09 }}
                    className="relative rounded-2xl p-6 border flex flex-col"
                    style={{
                      background:  t.highlight ? "rgba(239,68,68,0.07)"          : "rgba(255,255,255,0.03)",
                      border:      t.highlight ? "1px solid rgba(239,68,68,0.35)" : "1px solid rgba(255,255,255,0.07)",
                      boxShadow:   t.highlight ? "0 0 50px rgba(239,68,68,0.1)"   : "none",
                    }}
                  >
                    {t.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap" style={{ background: "#ef4444", boxShadow: "0 0 16px rgba(239,68,68,0.5)" }}>
                        {t.badge}
                      </div>
                    )}
                    <div className="mb-5">
                      <h3 className="font-display font-bold text-white text-lg mb-1">{t.name}</h3>
                      <p className="text-white/40 text-sm">{t.desc}</p>
                    </div>
                    <div className="flex items-end gap-1 mb-6">
                      <span className="font-display font-black text-white" style={{ fontSize: "2.6rem", lineHeight: 1 }}>${t.price}</span>
                      <span className="text-white/40 text-sm mb-1">/mo</span>
                    </div>
                    <ul className="flex flex-col gap-2.5 mb-7 flex-1">
                      {t.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-white/65">
                          <CheckCircle size={13} color="#ef4444" className="mt-0.5 flex-shrink-0" />{f}
                        </li>
                      ))}
                    </ul>
                    <button
                      className="w-full h-11 rounded-xl font-semibold text-sm transition-all active:scale-95"
                      style={t.highlight
                        ? { background: "#ef4444", color: "white", boxShadow: "0 0 24px rgba(239,68,68,0.4)" }
                        : { background: "rgba(255,255,255,0.07)", color: "white", border: "1px solid rgba(255,255,255,0.12)" }
                      }
                    >
                      Start Free Trial
                    </button>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ───── TESTIMONIALS ───── */}
            <section className="px-5 sm:px-8 md:px-12 lg:px-20 py-14 md:py-24 border-t" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.012)" }}>
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mb-10 md:mb-14">
                <SectionLabel>Member Results</SectionLabel>
                <h2 className="font-display font-black text-white text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
                  Real People.<br /><span className="text-white/40">Real Transformations.</span>
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TESTIMONIALS.map((t, i) => (
                  <motion.div
                    key={t.name}
                    variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.07 }}
                    className="rounded-2xl p-5 sm:p-6 border"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <Stars n={t.stars} />
                    <p className="text-white/65 text-sm leading-relaxed my-3">"{t.review}"</p>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={t.photo}
                          alt={t.name}
                          className="w-8 h-8 rounded-full object-cover"
                          loading="lazy"
                          style={{ border: "1.5px solid rgba(255,255,255,0.15)" }}
                        />
                        <div>
                          <span className="font-semibold text-white text-sm">{t.name}</span>
                          <span className="text-white/35 text-xs ml-2">· {t.duration}</span>
                        </div>
                      </div>
                      <div className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(239,68,68,0.12)", color: "#ef4444" }}>
                        {t.result}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ───── TRAINERS ───── */}
            <section id="m-trainers" className="px-5 sm:px-8 md:px-12 lg:px-20 py-14 md:py-24 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mb-10 md:mb-14">
                <SectionLabel>Trainers</SectionLabel>
                <h2 className="font-display font-black text-white text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
                  Expert Coaches.<br /><span className="text-white/40">Real Accountability.</span>
                </h2>
              </motion.div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {TRAINERS.map((tr, i) => (
                  <motion.div
                    key={tr.name}
                    variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.07 }}
                    className="group rounded-2xl border overflow-hidden transition-all duration-300 hover:border-red-500/30"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    {/* Photo */}
                    <div className="relative aspect-square overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={tr.photo}
                        alt={tr.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 50%)" }} />
                      <div
                        className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full"
                        style={{ background: tr.color, boxShadow: `0 0 6px ${tr.color}` }}
                      />
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-display font-bold text-white text-sm sm:text-base mb-0.5">{tr.name}</h3>
                      <p className="text-white/40 text-xs mb-2" style={{ color: tr.color + "cc" }}>{tr.role}</p>
                      <div className="hidden sm:flex flex-col gap-0.5">
                        <span className="text-white/30 text-xs">{tr.exp} experience</span>
                        <span className="text-white/20 text-xs">{tr.certs}</span>
                      </div>
                      <span className="sm:hidden text-white/30 text-xs">{tr.exp}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ───── FAQ ───── */}
            <section id="m-faq" className="px-5 sm:px-8 md:px-12 lg:px-20 py-14 md:py-24 border-t" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.012)" }}>
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mb-10 md:mb-14">
                <SectionLabel>FAQ</SectionLabel>
                <h2 className="font-display font-black text-white text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
                  Common Questions.<br /><span className="text-white/40">Honest Answers.</span>
                </h2>
              </motion.div>

              <div className="max-w-3xl flex flex-col gap-2.5">
                {FAQS.map((f, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-30px" }}
                    transition={{ delay: i * 0.04 }}
                    className="rounded-2xl border overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <button
                      onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left"
                    >
                      <span className="font-semibold text-white text-sm leading-snug">{f.q}</span>
                      <ChevronDown
                        size={15}
                        color="rgba(255,255,255,0.4)"
                        style={{ transform: faqOpen === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s ease", flexShrink: 0 }}
                      />
                    </button>
                    <AnimatePresence>
                      {faqOpen === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <p className="px-5 pb-5 sm:px-6 text-white/45 text-sm leading-relaxed">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ───── CTA ───── */}
            <section className="px-5 sm:px-8 md:px-12 lg:px-20 py-16 md:py-28 border-t text-center relative overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(239,68,68,0.08) 0%, transparent 100%)" }} />
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="relative z-10 max-w-2xl mx-auto">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 sm:mb-8"
                  style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444" }}
                >
                  Limited Time Offer
                </div>
                <h2 className="font-display font-black text-white leading-[0.9] tracking-tighter mb-5 sm:mb-6" style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)" }}>
                  Your First Month<br />
                  <span style={{ WebkitTextStroke: "2px #ef4444", WebkitTextFillColor: "transparent" }}>Is On Us.</span>
                </h2>
                <p className="text-white/45 text-base leading-relaxed mb-8 sm:mb-10">
                  No commitment. No credit card required for your trial.<br className="hidden sm:block" />
                  Just show up, work hard, and see what you&apos;re capable of.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 mb-10 sm:mb-14">
                  <GymButton text1="Start Free Trial" text2="Let's Go!" />
                  <button className="flex items-center gap-2 text-white/50 hover:text-white text-sm font-semibold transition-colors border border-white/10 rounded-full px-4 sm:px-5 py-2.5 hover:border-white/25">
                    Schedule a Tour <ArrowRight size={13} />
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-8 text-white/30 text-sm">
                  <div className="flex items-center gap-2"><Phone size={13} /><span>(555) 483-2291</span></div>
                  <div className="flex items-center gap-2"><Mail size={13} /><span>hello@momentumfit.com</span></div>
                  <div className="flex items-center gap-2"><MapPin size={13} /><span>1240 Commerce Blvd, Austin TX</span></div>
                </div>
              </motion.div>
            </section>

            {/* ───── FOOTER ───── */}
            <footer className="px-5 sm:px-8 md:px-12 lg:px-20 py-8 border-t" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#ef4444" }}>
                    <Dumbbell size={13} color="white" strokeWidth={2.5} />
                  </div>
                  <span className="font-display font-black text-white/70 text-xs uppercase tracking-widest">Momentum</span>
                </div>
                <p className="text-white/25 text-xs text-center order-3 sm:order-2">
                  Mon–Fri 5am–11pm · Sat–Sun 6am–9pm · Elite: 24/7
                </p>
                <div className="flex items-center gap-2.5 order-2 sm:order-3">
                  {([Globe, MessageCircle, Share2, Play] as const).map((Icon, i) => (
                    <button
                      key={i}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      <Icon size={13} color="rgba(255,255,255,0.5)" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-5 pt-5 border-t text-center text-white/20 text-xs" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                © 2025 Momentum Fitness. Demo site built by NexaWeb.
              </div>
            </footer>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
