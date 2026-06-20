"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, AlertTriangle } from "lucide-react";
import { LampContainer } from "@/components/ui/lamp";
import { GlowCard } from "@/components/ui/spotlight-card";
import { MomentumDemo } from "@/components/MomentumDemo";
import { AuraWellnessDemo } from "@/components/AuraWellnessDemo";
import { PawCoDemo } from "@/components/PawCoDemo";
import { RidgeRoofingDemo } from "@/components/RidgeRoofingDemo";
import { FlowFixDemo } from "@/components/FlowFixDemo";
import { BuildCoreDemo } from "@/components/BuildCoreDemo";
import { AutoForgeDemo } from "@/components/AutoForgeDemo";
import { VelaDemo } from "@/components/VelaDemo";
import { CipherDemo } from "@/components/CipherDemo";
import { BloomStudioDemo } from "@/components/BloomStudioDemo";
import { MeridianHealthDemo } from "@/components/MeridianHealthDemo";

type GlowColor = 'blue' | 'purple' | 'green' | 'red' | 'orange';

const DESIGNS: Array<{
  id: string;
  company: string;
  industry: string;
  desc: string;
  img: string;
  accent: string;
  tagBg: string;
  tagColor: string;
  nav: string[];
  hero: string;
  cta: string;
  glowColor: GlowColor;
}> = [
  {
    id: "wellness",
    company: "Aura Wellness",
    industry: "Spa & Wellness",
    desc: "Luxury spa with glassmorphic booking, treatment showcases, editorial testimonials, and a trust-first booking flow built to convert.",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=80",
    accent: "#10b981", tagBg: "rgba(16,185,129,0.15)", tagColor: "#34d399",
    nav: ["Treatments", "Book", "Offers", "About"],
    hero: "Restore.\nRenew. Revive.", cta: "Book a Treatment",
    glowColor: "green",
  },
  {
    id: "fitness",
    company: "Momentum",
    industry: "Fitness & Gym",
    desc: "High-energy gym brand with class scheduling, transparent membership tiers, trainer profiles, and a free-trial CTA built to fill classes.",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80",
    accent: "#ef4444", tagBg: "rgba(239,68,68,0.15)", tagColor: "#fca5a5",
    nav: ["Classes", "Membership", "Trainers", "App"],
    hero: "Train Hard.\nBe Relentless.", cta: "Start Free Trial",
    glowColor: "red",
  },
  {
    id: "grooming",
    company: "Paw & Co",
    industry: "Dog Grooming",
    desc: "Friendly pet salon with transparent package pricing, breed-specific booking, before/after gallery, and trust signals that fill the calendar.",
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&q=80",
    accent: "#c2622a", tagBg: "rgba(194,98,42,0.15)", tagColor: "#fb923c",
    nav: ["Services", "Book Now", "Pricing", "Gallery"],
    hero: "Your Dog Deserves\nthe Best Groom.", cta: "Book a Groom",
    glowColor: "orange",
  },
  {
    id: "roofing",
    company: "Ridge Roofing",
    industry: "Roofing",
    desc: "Trusted roofing contractor with free inspection as the lead magnet, insurance claim assistance, and a review-first trust strategy.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    accent: "#f97316", tagBg: "rgba(249,115,22,0.15)", tagColor: "#fdba74",
    nav: ["Services", "Free Inspection", "Gallery", "Contact"],
    hero: "Protect What\nMatters Most.", cta: "Get Free Inspection",
    glowColor: "orange",
  },
  {
    id: "plumbing",
    company: "FlowFix",
    industry: "Plumbing",
    desc: "24/7 emergency plumbing with a massive click-to-call hero, same-day booking, master-licensed techs, and upfront transparent pricing.",
    img: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=900&q=80",
    accent: "#0ea5e9", tagBg: "rgba(14,165,233,0.15)", tagColor: "#7dd3fc",
    nav: ["Services", "Emergency", "Pricing", "Book"],
    hero: "24/7 Plumbing\nYou Can Count On.", cta: "Call Now — We Answer",
    glowColor: "blue",
  },
  {
    id: "construction",
    company: "BuildCore",
    industry: "Construction",
    desc: "Full-service GC with on-budget guarantee, project portfolio, free quote form, and process transparency that converts high-value leads.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80",
    accent: "#eab308", tagBg: "rgba(234,179,8,0.15)", tagColor: "#fde047",
    nav: ["Projects", "Services", "Quote", "About"],
    hero: "Built Right.\nBuilt to Last.", cta: "Get Free Quote",
    glowColor: "orange",
  },
  {
    id: "auto",
    company: "AutoForge",
    industry: "Auto Repair",
    desc: "ASE-certified shop with 1-click online booking, service-specific pricing shown upfront, video diagnostics, and a 24-month warranty.",
    img: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=900&q=80",
    accent: "#dc2626", tagBg: "rgba(220,38,38,0.15)", tagColor: "#fca5a5",
    nav: ["Services", "Book Service", "Specials", "About"],
    hero: "Your Car in\nExpert Hands.", cta: "Book Service Online",
    glowColor: "red",
  },
  {
    id: "ecommerce",
    company: "Vela",
    industry: "E-Commerce",
    desc: "Fashion-forward store with smart product galleries, instant search, wishlist, and a frictionless checkout flow that maximizes cart value.",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80",
    accent: "#f59e0b", tagBg: "rgba(245,158,11,0.15)", tagColor: "#fcd34d",
    nav: ["Shop", "Collections", "Sale", "Account"],
    hero: "Style Built\nFor You.", cta: "Shop the Collection",
    glowColor: "orange",
  },
  {
    id: "fintech",
    company: "Cipher",
    industry: "FinTech & Banking",
    desc: "Digital-first bank with real-time analytics dashboards, sleek onboarding, and a trust-layered design that converts skeptical visitors.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
    accent: "#1447e6", tagBg: "rgba(20,71,230,0.15)", tagColor: "#93c5fd",
    nav: ["Products", "Business", "Pricing", "Login"],
    hero: "Banking Built\nFor Tomorrow.", cta: "Open an Account",
    glowColor: "blue",
  },
  {
    id: "agency",
    company: "Bloom Studio",
    industry: "Creative Agency",
    desc: "Boutique design studio with editorial case studies, team profiles, service packages, and client proposal flows that close deals.",
    img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=900&q=80",
    accent: "#a855f7", tagBg: "rgba(168,85,247,0.15)", tagColor: "#d8b4fe",
    nav: ["Work", "Studio", "Services", "Contact"],
    hero: "Ideas Made\nUnforgettable.", cta: "See Our Work",
    glowColor: "purple",
  },
  {
    id: "health",
    company: "Meridian Health",
    industry: "Healthcare SaaS",
    desc: "Patient-first platform with appointment booking, health records, telehealth video, and a trust-forward design that reduces no-shows.",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80",
    accent: "#06b6d4", tagBg: "rgba(6,182,212,0.15)", tagColor: "#67e8f9",
    nav: ["Services", "Doctors", "Book", "Portal"],
    hero: "Your Health,\nSimplified.", cta: "Book Appointment",
    glowColor: "blue",
  },
];

const DEMO_IDS = new Set(["fitness", "wellness", "grooming", "roofing", "plumbing", "construction", "auto", "ecommerce", "fintech", "agency", "health"]);

function DesignCard({ d, index, onClick }: { d: typeof DESIGNS[number]; index: number; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : undefined }}
    >
      <GlowCard
        customSize
        glowColor={d.glowColor}
        className="w-full min-h-[430px]"
        radius={24}
      >
        {/* Row 1 — website mockup preview */}
        <div className="relative overflow-hidden rounded-2xl min-h-0">
          {/* BG image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${d.img}')`, filter: "brightness(0.42)" }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.65) 100%)" }} />

          {/* Fake nav */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-3.5 py-2.5"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}>
            <span className="text-white font-bold text-[11px] tracking-tight" style={{ fontFamily: "var(--font-poppins)" }}>{d.company}</span>
            <div className="hidden sm:flex items-center gap-2.5">
              {d.nav.slice(0, 3).map((n) => (
                <span key={n} className="text-white/50 text-[9px] font-medium" style={{ fontFamily: "var(--font-inter)" }}>{n}</span>
              ))}
            </div>
            <div className="px-2 py-0.5 rounded-full text-[9px] font-semibold text-white" style={{ background: d.accent }}>
              {d.nav[1]}
            </div>
          </div>

          {/* Fake hero */}
          <div className="absolute inset-0 flex flex-col justify-center px-4 pt-8">
            <p
              className="text-white font-bold leading-tight mb-2.5 whitespace-pre-line"
              style={{ fontSize: 18, fontFamily: "var(--font-poppins)", textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}
            >
              {d.hero}
            </p>
            <div
              className="inline-flex items-center gap-1.5 text-white text-[10px] font-semibold px-3 py-1.5 rounded-full w-fit"
              style={{ background: d.accent, boxShadow: `0 4px 14px ${d.accent}55` }}
            >
              {d.cta} <ArrowRight size={9} />
            </div>
          </div>
        </div>

        {/* Row 2 — info */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-poppins)" }}>{d.company}</h3>
            <div className="flex items-center gap-1.5">
              {/* Demo badge — sits in the header row, never overlaps the image */}
              {onClick && (
                <div
                  className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase"
                  style={{ background: "rgba(255,200,0,0.13)", border: "1px solid rgba(255,200,0,0.28)", color: "#fcd34d" }}
                >
                  <AlertTriangle size={7} />
                  Demo
                </div>
              )}
              <span
                className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                style={{ background: d.tagBg, color: d.tagColor, border: `1px solid ${d.accent}28` }}
              >
                {d.industry}
              </span>
            </div>
          </div>
          <p className="text-white/45 text-[11px] leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>{d.desc}</p>

          {/* Desktop: Framer Motion drop-down */}
          {onClick && (
            <div className="hidden sm:block overflow-hidden">
              <AnimatePresence initial={false}>
                {hovered && (
                  <motion.div
                    key="demo-btn"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div
                      className="flex items-center justify-center gap-2 mt-2 py-2.5 rounded-xl text-[12px] font-bold text-white"
                      style={{ background: d.accent, boxShadow: `0 4px 20px ${d.accent}55` }}
                    >
                      View Demo Site <ArrowRight size={12} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Mobile: always-visible tap hint */}
          {onClick && (
            <div
              className="sm:hidden flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-semibold"
              style={{ background: `${d.accent}22`, color: d.tagColor, border: `1px solid ${d.accent}40` }}
            >
              Tap to view demo <ArrowRight size={10} />
            </div>
          )}
        </div>
      </GlowCard>
    </motion.div>
  );
}

interface DesignsGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DesignsGallery({ isOpen, onClose }: DesignsGalleryProps) {
  const [momentumOpen,     setMomentumOpen]     = useState(false);
  const [auraOpen,         setAuraOpen]         = useState(false);
  const [groomingOpen,     setGroomingOpen]     = useState(false);
  const [roofingOpen,      setRoofingOpen]      = useState(false);
  const [plumbingOpen,     setPlumbingOpen]     = useState(false);
  const [constructionOpen, setConstructionOpen] = useState(false);
  const [autoOpen,         setAutoOpen]         = useState(false);
  const [velaOpen,         setVelaOpen]         = useState(false);
  const [cipherOpen,       setCipherOpen]       = useState(false);
  const [bloomOpen,        setBloomOpen]        = useState(false);
  const [meridianOpen,     setMeridianOpen]     = useState(false);


  const openMomentum     = () => { setMomentumOpen(true);     window.history.pushState(null, '', '#momentum');     };
  const closeMomentum    = () => { setMomentumOpen(false);    window.history.pushState(null, '', '#gallery');      };
  const openAura         = () => { setAuraOpen(true);         window.history.pushState(null, '', '#aura');         };
  const closeAura        = () => { setAuraOpen(false);        window.history.pushState(null, '', '#gallery');      };
  const openGrooming     = () => { setGroomingOpen(true);     window.history.pushState(null, '', '#grooming');     };
  const closeGrooming    = () => { setGroomingOpen(false);    window.history.pushState(null, '', '#gallery');      };
  const openRoofing      = () => { setRoofingOpen(true);      window.history.pushState(null, '', '#roofing');      };
  const closeRoofing     = () => { setRoofingOpen(false);     window.history.pushState(null, '', '#gallery');      };
  const openPlumbing     = () => { setPlumbingOpen(true);     window.history.pushState(null, '', '#plumbing');     };
  const closePlumbing    = () => { setPlumbingOpen(false);    window.history.pushState(null, '', '#gallery');      };
  const openConstruction = () => { setConstructionOpen(true); window.history.pushState(null, '', '#construction'); };
  const closeConstruction = () => { setConstructionOpen(false); window.history.pushState(null, '', '#gallery');   };
  const openAuto         = () => { setAutoOpen(true);         window.history.pushState(null, '', '#auto');         };
  const closeAuto        = () => { setAutoOpen(false);        window.history.pushState(null, '', '#gallery');      };
  const openVela         = () => { setVelaOpen(true);         window.history.pushState(null, '', '#ecommerce');    };
  const closeVela        = () => { setVelaOpen(false);        window.history.pushState(null, '', '#gallery');      };
  const openCipher       = () => { setCipherOpen(true);       window.history.pushState(null, '', '#fintech');      };
  const closeCipher      = () => { setCipherOpen(false);      window.history.pushState(null, '', '#gallery');      };
  const openBloom        = () => { setBloomOpen(true);        window.history.pushState(null, '', '#agency');       };
  const closeBloom       = () => { setBloomOpen(false);       window.history.pushState(null, '', '#gallery');      };
  const openMeridian     = () => { setMeridianOpen(true);     window.history.pushState(null, '', '#health');       };
  const closeMeridian    = () => { setMeridianOpen(false);    window.history.pushState(null, '', '#gallery');      };

  const anyDemoOpen = momentumOpen || auraOpen || groomingOpen || roofingOpen || plumbingOpen || constructionOpen || autoOpen || velaOpen || cipherOpen || bloomOpen || meridianOpen;

  const closeCurrentDemo = () => {
    if (momentumOpen)          closeMomentum();
    else if (auraOpen)         closeAura();
    else if (groomingOpen)     closeGrooming();
    else if (roofingOpen)      closeRoofing();
    else if (plumbingOpen)     closePlumbing();
    else if (constructionOpen) closeConstruction();
    else if (autoOpen)         closeAuto();
    else if (velaOpen)         closeVela();
    else if (cipherOpen)       closeCipher();
    else if (bloomOpen)        closeBloom();
    else if (meridianOpen)     closeMeridian();
  };

  const OPENERS: Record<string, () => void> = {
    fitness: openMomentum,
    wellness: openAura,
    grooming: openGrooming,
    roofing: openRoofing,
    plumbing: openPlumbing,
    construction: openConstruction,
    auto: openAuto,
    ecommerce: openVela,
    fintech: openCipher,
    agency: openBloom,
    health: openMeridian,
  };

  useEffect(() => {
    const scrollY = window.scrollY;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const top = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(top || '0') * -1);
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const h = window.location.hash;
      if (h === '#momentum')     setMomentumOpen(true);
      if (h === '#aura')         setAuraOpen(true);
      if (h === '#grooming')     setGroomingOpen(true);
      if (h === '#roofing')      setRoofingOpen(true);
      if (h === '#plumbing')     setPlumbingOpen(true);
      if (h === '#construction') setConstructionOpen(true);
      if (h === '#auto')         setAutoOpen(true);
      if (h === '#ecommerce')    setVelaOpen(true);
      if (h === '#fintech')      setCipherOpen(true);
      if (h === '#agency')       setBloomOpen(true);
      if (h === '#health')       setMeridianOpen(true);
    }
    if (!isOpen) {
      setMomentumOpen(false);
      setAuraOpen(false);
      setGroomingOpen(false);
      setRoofingOpen(false);
      setPlumbingOpen(false);
      setConstructionOpen(false);
      setAutoOpen(false);
      setVelaOpen(false);
      setCipherOpen(false);
      setBloomOpen(false);
      setMeridianOpen(false);
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating "Close Demo" button — always visible on mobile when any demo is open */}
      <AnimatePresence>
        {anyDemoOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed z-[300]"
            style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 20px)", right: 20 }}
          >
            <button
              onClick={closeCurrentDemo}
              className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white"
              style={{ background: "rgba(7,11,24,0.88)", border: "1px solid rgba(255,255,255,0.16)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
            >
              <X size={15} />
              Close Demo
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <MomentumDemo     isOpen={momentumOpen}     onClose={closeMomentum}     />
      <AuraWellnessDemo isOpen={auraOpen}         onClose={closeAura}         />
      <PawCoDemo        isOpen={groomingOpen}     onClose={closeGrooming}     />
      <RidgeRoofingDemo isOpen={roofingOpen}      onClose={closeRoofing}      />
      <FlowFixDemo      isOpen={plumbingOpen}     onClose={closePlumbing}     />
      <BuildCoreDemo    isOpen={constructionOpen} onClose={closeConstruction} />
      <AutoForgeDemo    isOpen={autoOpen}         onClose={closeAuto}         />
      <VelaDemo         isOpen={velaOpen}         onClose={closeVela}         />
      <CipherDemo       isOpen={cipherOpen}       onClose={closeCipher}       />
      <BloomStudioDemo  isOpen={bloomOpen}        onClose={closeBloom}        />
      <MeridianHealthDemo isOpen={meridianOpen}   onClose={closeMeridian}     />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] overflow-hidden"
            style={{ background: "#070b18" }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-[110] w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}
            >
              <X size={18} color="white" />
            </button>

            {/* Scrollable content */}
            <div className="w-full h-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>

              {/* Lamp hero */}
              <LampContainer>
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Demo notice */}
                  <div
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold"
                    style={{ background: "rgba(255,200,0,0.1)", border: "1px solid rgba(255,200,0,0.25)", color: "#fcd34d" }}
                  >
                    <AlertTriangle size={12} />
                    All designs below are demos — not real companies
                  </div>

                  <h1
                    className="font-display font-extrabold text-white text-center leading-tight mb-4"
                    style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)", letterSpacing: "-0.03em" }}
                  >
                    Design styles<br />
                    <span style={{ background: "linear-gradient(135deg, #fff 0%, #a8c0ff 50%, #1447e6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                      we can build.
                    </span>
                  </h1>
                  <p className="text-white/50 max-w-lg text-base leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                    11 demo concepts across industries — each built with real conversion strategy. Hover to explore.
                  </p>
                </motion.div>
              </LampContainer>

              {/* Cards grid */}
              <div className="px-6 pb-8 max-w-6xl mx-auto -mt-8">
                <div className="flex flex-wrap justify-center gap-5">
                  {DESIGNS.map((d, i) => (
                    <div key={d.id} className="relative group w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
                      <DesignCard
                        d={d}
                        index={i}
                        onClick={OPENERS[d.id]}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA footer */}
              <div className="px-6 py-20 flex flex-col items-center text-center">
                <div className="w-full max-w-4xl h-px mb-16" style={{ background: "linear-gradient(to right, transparent, rgba(20,71,230,0.4), transparent)" }} />

                <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: "#1447e6" }}>Don&apos;t see what you want?</p>
                <h2
                  className="font-display font-extrabold text-white mb-4 leading-tight"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.02em" }}
                >
                  We&apos;ll build it<br />from scratch.
                </h2>
                <p className="text-white/50 mb-10 max-w-md text-base leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                  If none of these styles match your vision, tell us. Every project starts with a blank canvas — we design specifically for you.
                </p>
                <a
                  href="#contact"
                  onClick={onClose}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: "#1447e6", boxShadow: "0 0 40px rgba(20,71,230,0.45)", fontSize: 15 }}
                >
                  Contact Us <ArrowRight size={16} />
                </a>
                <p className="text-white/25 text-xs mt-5" style={{ fontFamily: "var(--font-inter)" }}>
                  We reply within 24 hours · No commitment required
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
