"use client"

import { WebGLShader } from "@/components/ui/web-gl-shader"
import { GlassShowcase } from "@/components/GlassShowcase"
import { DesignsGallery } from "@/components/DesignsGallery"
import { PhoneInput } from "@/components/PhoneInput"
import Image from "next/image"
import { useState, useEffect } from "react"

const NAV_LINKS = ["Services", "Process", "About", "Contact"]

const SERVICES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="4" width="24" height="16" rx="2" stroke="#1447e6" strokeWidth="2"/>
        <path d="M9 20v4M19 20v4M6 24h16" stroke="#1447e6" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 10l3 3 5-5" stroke="#3b6fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Web Design",
    desc: "Pixel-perfect interfaces crafted with intention. We design experiences that convert visitors into loyal customers.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M8 10L4 14l4 4M20 10l4 4-4 4M16 7l-4 14" stroke="#1447e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Development",
    desc: "High-performance code built on modern stacks. Fast, scalable, and engineered to grow with your business.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L25 8v12l-11 5L3 20V8l11-5z" stroke="#1447e6" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M14 3v17M3 8l11 5 11-5" stroke="#3b6fff" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "E-Commerce",
    desc: "Stores built to sell. From product pages to checkout flows, we eliminate friction and maximize revenue.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="#1447e6" strokeWidth="2"/>
        <path d="M14 4c0 0 4 4 4 10s-4 10-4 10M14 4c0 0-4 4-4 10s4 10 4 10M4 14h20" stroke="#3b6fff" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "SEO & Growth",
    desc: "Visibility that compounds. We bake performance and discoverability into every site we ship.",
  },
]

const PROCESS = [
  { num: "01", title: "Discovery", desc: "We dig into your goals, audience, and competitive landscape to build a bulletproof strategy." },
  { num: "02", title: "Design",    desc: "Wireframes to polished visuals. Every decision is intentional — no filler, no fluff." },
  { num: "03", title: "Build",     desc: "Clean, performant code shipped on schedule. We test obsessively before anything goes live." },
  { num: "04", title: "Grow",      desc: "Launch is just the start. We monitor, optimize, and iterate alongside your business." },
]

export default function Home() {
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [galleryOpen, setGalleryOpen] = useState(false)

  // Contact form state
  const [contact, setContact] = useState({ name: "", email: "", phone: "", message: "" })
  const [contactHoneypot, setContactHoneypot] = useState("")
  const [contactSending, setContactSending]   = useState(false)
  const [contactSent, setContactSent]         = useState(false)
  const [contactError, setContactError]       = useState("")

  const setC = (key: keyof typeof contact, val: string) =>
    setContact(c => ({ ...c, [key]: val }))

  const submitContact = async (e: React.FormEvent) => {
    e.preventDefault()
    setContactSending(true)
    setContactError("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, website: contactHoneypot }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Something went wrong. Please try again." }))
        setContactError(data.error || "Something went wrong. Please try again.")
        setContactSending(false)
        return
      }
      setContactSent(true)
      setContactSending(false)
    } catch {
      setContactError("Network error. Please check your connection and try again.")
      setContactSending(false)
    }
  }

  const openGallery = () => {
    setGalleryOpen(true)
    window.history.pushState(null, '', '#gallery')
  }

  const closeGallery = () => {
    setGalleryOpen(false)
    window.history.pushState(null, '', '/')
  }

  useEffect(() => {
    const DEMO_HASHES = ['#gallery', '#momentum', '#aura', '#grooming', '#roofing', '#plumbing', '#construction', '#auto', '#ecommerce', '#fintech', '#agency', '#health']
    if (DEMO_HASHES.includes(window.location.hash)) {
      setGalleryOpen(true)
    }
    const onPop = () => {
      const h = window.location.hash
      setGalleryOpen(DEMO_HASHES.includes(h))
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "#070b18" }}>
      <DesignsGallery isOpen={galleryOpen} onClose={closeGallery} />

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 sm:py-4 glass border-b border-white/[0.06]">
        <a href="#" className="flex items-center gap-2 group">
          {/* Browser icon mark */}
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" className="flex-shrink-0">
            <rect width="30" height="30" rx="7" fill="#1447e6"/>
            <rect x="4" y="4" width="22" height="3" rx="1.5" fill="white" fillOpacity="0.9"/>
            <circle cx="7" cy="5.5" r="1" fill="white" fillOpacity="0.5"/>
            <circle cx="10.5" cy="5.5" r="1" fill="white" fillOpacity="0.5"/>
            <circle cx="14" cy="5.5" r="1" fill="white" fillOpacity="0.5"/>
            <rect x="4" y="9" width="22" height="17" rx="1" fill="white" fillOpacity="0.08"/>
            <path d="M4 14 L10 18 L16 12 L22 16 L26 13 L26 26 L4 26 Z" fill="#1447e6" fillOpacity="0.7"/>
            <path d="M4 17 L10 21 L16 15 L22 19 L26 16 L26 26 L4 26 Z" fill="white" fillOpacity="0.18"/>
          </svg>
          <span className="font-display font-bold text-base sm:text-[17px] tracking-tight">
            <span className="text-white">Nexa</span><span style={{ color: "#1447e6" }}>Web</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200">
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="/intake"
            className="hidden md:flex items-center gap-2 h-9 px-5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "#1447e6", boxShadow: "0 0 20px rgba(20,71,230,0.35)" }}
          >
            Get Started
          </a>

          {/* Mobile CTA — compact */}
          <a
            href="/intake"
            className="md:hidden flex items-center h-8 px-3.5 rounded-full text-xs font-semibold text-white"
            style={{ background: "#1447e6" }}
          >
            Get Started
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-full text-white/70 hover:text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="16" height="16" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4l14 14M18 4L4 18"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 6h16M3 11h16M3 16h16"/>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 glass border-t border-white/[0.06] px-5 py-4 flex flex-col gap-1 md:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-white/70 hover:text-white font-medium py-2.5 text-sm border-b border-white/[0.05] last:border-0"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative flex items-center justify-center overflow-hidden min-h-screen" style={{ minHeight: "100svh" }}>
        <div className="absolute inset-0 opacity-30">
          <WebGLShader />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 60%, transparent 0%, #070b18 70%)" }}
        />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[300px] sm:h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(20,71,230,0.18) 0%, transparent 70%)", filter: "blur(40px)" }}
        />

        <div className="relative z-10 text-center px-5 sm:px-6 max-w-5xl mx-auto pt-20 sm:pt-24">
          <h1
            className="animate-fade-up font-display font-extrabold text-white leading-[1.06] tracking-[-0.03em] mb-5 sm:mb-6"
            style={{ fontSize: "clamp(2.2rem, 9vw, 6rem)" }}
          >
            Websites Built<br />
            <span className="text-gradient">for Growth.</span>
          </h1>

          <p
            className="animate-fade-up delay-200 text-white/60 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-10"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            We design and develop high-performance digital experiences that drive revenue,
            earn trust, and scale with your ambitions.
          </p>

          <div className="animate-fade-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="/intake"
              className="flex items-center justify-center gap-2 h-13 px-8 rounded-full font-semibold text-base text-white w-full sm:w-auto transition-all duration-200 hover:opacity-90 hover:scale-[1.04] active:scale-[0.97]"
              style={{ background: "#1447e6", boxShadow: "0 0 40px rgba(20,71,230,0.5)" }}
            >
              Start a Project
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M8 3l5 5-5 5"/>
              </svg>
            </a>
            <a
              href="#designs"
              className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors group"
            >
              See our work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                <path d="M3 8h10M8 3l5 5-5 5"/>
              </svg>
            </a>
          </div>

          <div className="animate-fade-in delay-500 mt-10 sm:mt-16 flex justify-center">
            <div className="flex flex-col items-center gap-2 text-white/30">
              <span className="text-xs tracking-widest uppercase">Scroll</span>
              <div className="w-px h-10 sm:h-12 rounded-full" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }}/>
            </div>
          </div>
        </div>
      </section>

      {/* ── DESIGNS WE'VE DONE ── */}
      <section id="designs" className="relative z-10 py-14 sm:py-20 md:py-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 sm:mb-4" style={{ color: "#1447e6" }}>Designs We&apos;ve Done</p>
            <h2 className="font-display font-bold text-white text-3xl sm:text-4xl md:text-5xl tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              Built with craft.<br />Shipped with intent.
            </h2>
          </div>

          {/* Horizontal scroll showcase */}
          <div className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>

            {/* Glass showcase card — responsive width */}
            <div
              className="flex-shrink-0 snap-start rounded-2xl sm:rounded-3xl overflow-hidden relative"
              style={{ width: "min(480px, calc(100vw - 32px))", height: 480 }}
            >
              <GlassShowcase />
              {/* Demo badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-semibold tracking-widest uppercase text-white/80" style={{ fontFamily: "var(--font-inter)" }}>Interactive Demo</span>
              </div>
            </div>

            {/* Browse all styles card — visible on desktop scroll, hidden on mobile (shown as button below) */}
            <button
              className="hidden sm:flex flex-shrink-0 snap-start rounded-2xl sm:rounded-3xl flex-col items-center justify-center gap-4 sm:gap-5 group border border-dashed border-white/10 hover:border-[#1447e6]/40 transition-all duration-300"
              style={{ width: "min(260px, calc(100vw - 32px))", height: 480, background: "rgba(255,255,255,0.02)" }}
              onClick={openGallery}
            >
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background: "rgba(20,71,230,0.12)", border: "1px solid rgba(20,71,230,0.25)" }}
              >
                <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="#3b6fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="8" height="8" rx="1.5"/>
                  <rect x="12" y="2" width="8" height="8" rx="1.5"/>
                  <rect x="2" y="12" width="8" height="8" rx="1.5"/>
                  <rect x="12" y="12" width="8" height="8" rx="1.5"/>
                </svg>
              </div>
              <div className="text-center px-5 sm:px-6">
                <p className="font-display font-semibold text-white text-sm sm:text-base mb-1">Browse All Styles</p>
                <p className="text-white/35 text-xs leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>11 demo concepts across industries</p>
              </div>
              <div
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white"
                style={{ background: "#1447e6", boxShadow: "0 0 24px rgba(20,71,230,0.35)" }}
              >
                Explore styles
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 7h10M8 3l4 4-4 4"/>
                </svg>
              </div>
            </button>

          </div>

          {/* Mobile-only: View All Demos button below scroll */}
          <div className="sm:hidden mt-4">
            <button
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-semibold text-sm text-white transition-all duration-200 active:scale-[0.98]"
              style={{ background: "rgba(20,71,230,0.15)", border: "1px solid rgba(20,71,230,0.35)" }}
              onClick={openGallery}
            >
              <svg width="16" height="16" viewBox="0 0 22 22" fill="none" stroke="#3b6fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="8" height="8" rx="1.5"/>
                <rect x="12" y="2" width="8" height="8" rx="1.5"/>
                <rect x="2" y="12" width="8" height="8" rx="1.5"/>
                <rect x="12" y="12" width="8" height="8" rx="1.5"/>
              </svg>
              View All Demo Styles
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 7h10M8 3l4 4-4 4"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="relative z-10 py-14 sm:py-20 md:py-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 sm:mb-14 md:mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 sm:mb-4" style={{ color: "#1447e6" }}>What We Do</p>
            <h2 className="font-display font-bold text-white leading-tight tracking-tight text-3xl sm:text-4xl md:text-5xl" style={{ letterSpacing: "-0.02em" }}>
              Everything you need<br />to dominate online.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="group relative p-5 sm:p-6 rounded-2xl border hover:border-[#1447e6]/50 transition-all duration-300 hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: "radial-gradient(ellipse at top left, rgba(20,71,230,0.08) 0%, transparent 60%)" }}/>
                <div className="mb-4 sm:mb-5 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(20,71,230,0.1)", border: "1px solid rgba(20,71,230,0.2)" }}>
                  {s.icon}
                </div>
                <h3 className="font-display font-semibold text-white text-base sm:text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>{s.desc}</p>
                <div className="mt-5 sm:mt-6 flex items-center gap-1.5 text-xs font-medium opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity" style={{ color: "#3b6fff" }}>
                  Learn more
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 6h8M6 2l4 4-4 4"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="relative z-10 py-14 sm:py-20 md:py-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14 md:mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 sm:mb-4" style={{ color: "#1447e6" }}>How It Works</p>
            <h2 className="font-display font-bold text-white text-3xl sm:text-4xl md:text-5xl tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              A process built for<br />speed and quality.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-4 relative">
            {/* Connector line — desktop only */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px" style={{ background: "linear-gradient(to right, transparent, rgba(20,71,230,0.4), rgba(20,71,230,0.4), transparent)" }}/>

            {PROCESS.map((step) => (
              <div key={step.num} className="flex flex-col items-start md:items-center md:text-center">
                <div className="relative mb-4 sm:mb-6 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center glass-blue border border-[#1447e6]/30 glow-blue-sm">
                  <span className="font-display font-extrabold text-base sm:text-lg" style={{ color: "#3b6fff" }}>{step.num}</span>
                </div>
                <h3 className="font-display font-semibold text-white text-base sm:text-xl mb-2">{step.title}</h3>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="relative z-10 py-14 sm:py-20 md:py-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 sm:gap-14 md:gap-16 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 sm:mb-4" style={{ color: "#1447e6" }}>About Us</p>
            <h2 className="font-display font-bold text-white text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight mb-5 sm:mb-6" style={{ letterSpacing: "-0.02em" }}>
              We obsess over<br />digital craft.
            </h2>
            <p className="text-white/60 leading-relaxed mb-4 sm:mb-5 text-sm sm:text-base" style={{ fontFamily: "var(--font-inter)" }}>
              NexaWeb is a boutique digital studio founded on one principle: every pixel should earn its place. We partner with startups and scale-ups to build websites that don&apos;t just look great — they work hard.
            </p>
            <p className="text-white/60 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base" style={{ fontFamily: "var(--font-inter)" }}>
              No bloated teams, no offshore handoffs. You work directly with senior designers and engineers who genuinely care about your outcomes.
            </p>
            <a
              href="/intake"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full font-semibold text-sm text-white transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{ background: "#1447e6", boxShadow: "0 0 24px rgba(20,71,230,0.35)" }}
            >
              Work with us
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 7h10M7 2l5 5-5 5"/>
              </svg>
            </a>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                alt="NexaWeb team at work"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(20,71,230,0.15) 0%, rgba(0,0,0,0.1) 100%)" }}/>
            </div>
          </div>
        </div>
      </section>


      {/* ── CONTACT ── */}
      <section id="contact" className="relative z-10 py-14 sm:py-20 md:py-28 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 sm:mb-4" style={{ color: "#1447e6" }}>Get in Touch</p>
            <h2 className="font-display font-bold text-white text-3xl sm:text-4xl md:text-5xl tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              Have a question?<br />Let&apos;s talk.
            </h2>
            <p className="text-white/55 text-sm sm:text-base mt-4 sm:mt-5 max-w-lg mx-auto leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
              Drop us a message and we&apos;ll respond within 24 hours. Ready to start a project? <a href="/intake" style={{ color: "#3b6fff" }}>Use the intake form →</a>
            </p>
          </div>

          {contactSent ? (
            <div
              className="rounded-2xl p-8 sm:p-10 text-center"
              style={{ background: "rgba(20,71,230,0.08)", border: "1px solid rgba(20,71,230,0.25)" }}
            >
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(20,71,230,0.15)", border: "1px solid rgba(20,71,230,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b6fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              <h3 className="font-display font-bold text-white text-xl sm:text-2xl mb-2" style={{ letterSpacing: "-0.02em" }}>Message received</h3>
              <p className="text-white/55 text-sm" style={{ fontFamily: "var(--font-inter)" }}>We&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form
              onSubmit={submitContact}
              className="rounded-2xl p-6 sm:p-8 flex flex-col gap-4"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={contactHoneypot}
                onChange={e => setContactHoneypot(e.target.value)}
                tabIndex={-1}
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              />

              <div>
                <label style={contactLabelStyle}>Your Name</label>
                <input
                  required
                  value={contact.name}
                  onChange={e => setC("name", e.target.value)}
                  placeholder="Jane Smith"
                  style={contactInputStyle}
                />
              </div>

              <div>
                <label style={contactLabelStyle}>Email</label>
                <input
                  required
                  type="email"
                  value={contact.email}
                  onChange={e => setC("email", e.target.value)}
                  placeholder="you@yourbusiness.com"
                  style={contactInputStyle}
                />
              </div>

              <div>
                <label style={contactLabelStyle}>Phone <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 400 }}>(optional)</span></label>
                <PhoneInput value={contact.phone} onChange={v => setC("phone", v)} />
              </div>

              <div>
                <label style={contactLabelStyle}>Message</label>
                <textarea
                  required
                  value={contact.message}
                  onChange={e => setC("message", e.target.value)}
                  placeholder="Tell us a bit about what you're looking for…"
                  rows={4}
                  maxLength={5000}
                  style={{ ...contactInputStyle, resize: "none" }}
                />
              </div>

              {contactError && (
                <div
                  style={{
                    padding: "11px 14px", borderRadius: 10,
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.25)",
                    color: "#fca5a5", fontSize: 13,
                  }}
                >
                  {contactError}
                </div>
              )}

              <button
                type="submit"
                disabled={contactSending || !contact.name || !contact.email || !contact.message}
                className="mt-2 transition-all hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "#1447e6", color: "#fff",
                  border: "none", borderRadius: 12,
                  padding: "14px 24px", fontSize: 15, fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 0 28px rgba(20,71,230,0.35)",
                }}
              >
                {contactSending ? "Sending…" : "Send Message →"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-white/[0.06] px-4 sm:px-6 py-10 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Top row */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <svg width="26" height="26" viewBox="0 0 30 30" fill="none">
                  <rect width="30" height="30" rx="7" fill="#1447e6"/>
                  <rect x="4" y="4" width="22" height="3" rx="1.5" fill="white" fillOpacity="0.9"/>
                  <circle cx="7" cy="5.5" r="1" fill="white" fillOpacity="0.5"/>
                  <circle cx="10.5" cy="5.5" r="1" fill="white" fillOpacity="0.5"/>
                  <circle cx="14" cy="5.5" r="1" fill="white" fillOpacity="0.5"/>
                  <rect x="4" y="9" width="22" height="17" rx="1" fill="white" fillOpacity="0.08"/>
                  <path d="M4 14 L10 18 L16 12 L22 16 L26 13 L26 26 L4 26 Z" fill="#1447e6" fillOpacity="0.7"/>
                  <path d="M4 17 L10 21 L16 15 L22 19 L26 16 L26 26 L4 26 Z" fill="white" fillOpacity="0.18"/>
                </svg>
                <span className="font-display font-bold text-base tracking-tight">
                  <span className="text-white">Nexa</span><span style={{ color: "#1447e6" }}>Web</span>
                </span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs" style={{ fontFamily: "var(--font-inter)" }}>
                Websites built for growth. Design. Development. Results.
              </p>
            </div>

            <div>
              <p className="text-white/80 text-sm font-semibold mb-3 sm:mb-4">Company</p>
              <ul className="flex flex-col gap-2 sm:gap-3">
                {["Services", "Process", "About"].map((l) => (
                  <li key={l}>
                    <a href={`#${l.toLowerCase()}`} className="text-white/40 hover:text-white text-sm transition-colors" style={{ fontFamily: "var(--font-inter)" }}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-white/80 text-sm font-semibold mb-3 sm:mb-4">Legal</p>
              <ul className="flex flex-col gap-2 sm:gap-3">
                <li>
                  <a href="/terms" className="text-white/40 hover:text-white text-sm transition-colors" style={{ fontFamily: "var(--font-inter)" }}>Terms of Service</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-8 sm:mt-10 pt-6 border-t border-white/[0.06]">
            <p className="text-white/30 text-xs text-center" style={{ fontFamily: "var(--font-inter)" }}>
              © 2025 NexaWeb. All rights reserved. · United States
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const contactLabelStyle: React.CSSProperties = {
  display: "block", fontSize: 11, fontWeight: 700,
  color: "rgba(255,255,255,0.4)", marginBottom: 7,
  textTransform: "uppercase", letterSpacing: "0.06em",
}
const contactInputStyle: React.CSSProperties = {
  width: "100%", padding: "11px 14px", borderRadius: 10,
  border: "1.5px solid rgba(255,255,255,0.1)", fontSize: 16,
  color: "#fff", background: "rgba(255,255,255,0.05)",
  outline: "none", boxSizing: "border-box",
  fontFamily: "var(--font-inter), system-ui, sans-serif",
}
