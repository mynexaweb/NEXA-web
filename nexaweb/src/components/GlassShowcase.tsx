"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Phone, Star, MapPin, MessageCircle, X, ChevronRight } from "lucide-react";
import { GlassEffect, GlassFilter } from "@/components/ui/liquid-glass";
import { ClientBookingDemo } from "@/components/ClientBookingDemo";

const DOCK_ITEMS = [
  { id: "book",     label: "Book",    Icon: Calendar,      bg: "linear-gradient(145deg,#1447e6,#3b6fff)", glow: "rgba(20,71,230,0.7)",   panelTitle: "Book" },
  { id: "times",    label: "Hours",   Icon: Clock,         bg: "linear-gradient(145deg,#7c3aed,#a855f7)", glow: "rgba(124,58,237,0.7)",  panelTitle: "Hours" },
  { id: "call",     label: "Call",    Icon: Phone,         bg: "linear-gradient(145deg,#059669,#10b981)", glow: "rgba(5,150,105,0.7)",   panelTitle: "Contact" },
  { id: "reviews",  label: "Reviews", Icon: Star,          bg: "linear-gradient(145deg,#d97706,#f59e0b)", glow: "rgba(217,119,6,0.7)",   panelTitle: "Reviews" },
  { id: "location", label: "Find Us", Icon: MapPin,        bg: "linear-gradient(145deg,#dc2626,#ef4444)", glow: "rgba(220,38,38,0.7)",   panelTitle: "Find Us" },
  { id: "help",     label: "Help",    Icon: MessageCircle, bg: "linear-gradient(145deg,#0891b2,#06b6d4)", glow: "rgba(8,145,178,0.7)",   panelTitle: "Help" },
];

const QUICK_DOCK_IDS = ["book", "times", "call", "help"];

// ── Panel components ────────────────────────────────────────────
function TimesPanel() {
  const hours = [
    { day: "Monday – Friday", time: "9:00am – 8:00pm", open: true },
    { day: "Saturday",        time: "10:00am – 6:00pm", open: true },
    { day: "Sunday",          time: "11:00am – 5:00pm", open: true },
    { day: "Bank Holidays",   time: "Closed",            open: false },
  ];
  return (
    <div className="flex flex-col gap-2.5 w-full">
      {hours.map((h) => (
        <GlassEffect key={h.day} className="rounded-2xl px-4 py-3">
          <div className="flex items-center justify-between w-full">
            <div>
              <p className="text-white font-semibold text-xs">{h.day}</p>
              <p className="text-white/50 text-[10px] mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>{h.time}</p>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${h.open ? "bg-green-500/20 text-green-400" : "bg-white/10 text-white/40"}`}>
              {h.open ? "Open" : "Closed"}
            </span>
          </div>
        </GlassEffect>
      ))}
      <p className="text-white/30 text-[10px] text-center mt-1" style={{ fontFamily: "var(--font-inter)" }}>Last appointments 45 min before closing</p>
    </div>
  );
}

function CallPanel() {
  const contacts = [
    { label: "Main Line",  value: "+44 20 7946 0000", icon: "📞", action: "tel:+442079460000" },
    { label: "WhatsApp",   value: "+44 7700 900 000", icon: "💬", action: "#" },
    { label: "Reception",  value: "+44 20 7946 0001", icon: "🏨", action: "tel:+442079460001" },
  ];
  return (
    <div className="flex flex-col gap-2.5 w-full">
      {contacts.map((c) => (
        <a key={c.label} href="#" onClick={(e) => e.preventDefault()}>
          <GlassEffect className="rounded-2xl px-4 py-3 hover:ring-1 hover:ring-white/20 transition-all">
            <div className="flex items-center gap-3 w-full">
              <span className="text-xl">{c.icon}</span>
              <div className="flex-1">
                <p className="text-white/50 text-[10px]" style={{ fontFamily: "var(--font-inter)" }}>{c.label}</p>
                <p className="text-white font-semibold text-xs mt-0.5">{c.value}</p>
              </div>
              <ChevronRight size={13} className="text-white/30" />
            </div>
          </GlassEffect>
        </a>
      ))}
    </div>
  );
}

function ReviewsPanel() {
  const reviews = [
    { name: "Sophie M.", stars: 5, text: "Absolutely transformed my experience. Effortless booking and divine service.", date: "2d ago" },
    { name: "James T.",  stars: 5, text: "Best wellness centre in London. Already on my third visit.", date: "1w ago" },
    { name: "Anika P.",  stars: 5, text: "The app makes scheduling so simple. Completely obsessed.", date: "2w ago" },
  ];
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <div className="flex items-center gap-3 mb-1">
        <span className="font-display font-extrabold text-white text-3xl">4.9</span>
        <div>
          <div className="flex gap-0.5">{[...Array(5)].map((_,i) => <span key={i} className="text-amber-400">★</span>)}</div>
          <p className="text-white/40 text-[10px]" style={{ fontFamily: "var(--font-inter)" }}>284 reviews</p>
        </div>
      </div>
      {reviews.map((r) => (
        <GlassEffect key={r.name} className="rounded-2xl px-4 py-3">
          <div className="w-full">
            <div className="flex items-center justify-between mb-1">
              <p className="text-white font-semibold text-xs">{r.name}</p>
              <p className="text-white/30 text-[10px]">{r.date}</p>
            </div>
            <div className="flex gap-0.5 mb-1">{[...Array(r.stars)].map((_,i) => <span key={i} className="text-amber-400 text-[10px]">★</span>)}</div>
            <p className="text-white/60 text-[10px] leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>{r.text}</p>
          </div>
        </GlassEffect>
      ))}
    </div>
  );
}

function LocationPanel() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <GlassEffect className="rounded-2xl overflow-hidden">
        <div className="w-full h-32 relative" style={{ background: "linear-gradient(135deg, rgba(20,71,230,0.15), rgba(8,145,178,0.15))" }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "24px 24px" }}/>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center" style={{ boxShadow: "0 0 14px rgba(239,68,68,0.7)" }}>
                <div className="w-1.5 h-1.5 bg-white rounded-full"/>
              </div>
              <div className="w-px h-3 bg-red-400"/>
            </div>
          </div>
        </div>
      </GlassEffect>
      <GlassEffect className="rounded-2xl px-4 py-3">
        <div className="w-full flex flex-col gap-1.5">
          <p className="text-white font-semibold text-xs">Aura Wellness Centre</p>
          <p className="text-white/50 text-[10px] leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>14 Harley Street, Marylebone · London W1G 9PH</p>
          <div className="h-px bg-white/10 my-0.5"/>
          <div className="flex gap-3">
            <span className="text-[10px] text-white/50">🚇 2 min walk</span>
            <span className="text-[10px] text-white/50">🅿️ NCP nearby</span>
          </div>
        </div>
      </GlassEffect>
      <a href="#" className="block">
        <GlassEffect className="rounded-2xl px-4 py-2.5 hover:ring-1 hover:ring-white/20 transition-all">
          <div className="flex items-center justify-center gap-1.5 w-full">
            <MapPin size={12} className="text-white/60"/>
            <span className="text-white text-xs font-medium">Open in Google Maps</span>
          </div>
        </GlassEffect>
      </a>
    </div>
  );
}

function HelpPanel() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = [
    { q: "How far in advance can I book?", a: "Up to 8 weeks ahead. Same-day available based on availability." },
    { q: "Cancellation policy?", a: "Free cancellation up to 24 hours prior. Late cancellations may incur a 50% fee." },
    { q: "Gift vouchers?", a: "Yes — any amount, online or in person." },
    { q: "Is parking available?", a: "NCP car park 2 min away. Regent's Park tube is a 2 min walk." },
    { q: "Medical needs?", a: "Mention conditions when booking so we can tailor your treatment safely." },
  ];
  return (
    <div className="flex flex-col gap-2 w-full">
      {faqs.map((faq, i) => (
        <GlassEffect key={i} className="rounded-2xl overflow-hidden" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
          <div className="w-full px-4 py-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-white text-xs font-medium">{faq.q}</p>
              <span className={`text-white/50 text-base flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
            </div>
            {openFaq === i && (
              <p className="text-white/50 text-[10px] leading-relaxed mt-2 border-t border-white/10 pt-2" style={{ fontFamily: "var(--font-inter)" }}>{faq.a}</p>
            )}
          </div>
        </GlassEffect>
      ))}
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────
export function GlassShowcase() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [zoomId, setZoomId]         = useState<string | null>(null);

  const item      = DOCK_ITEMS.find((d) => d.id === activePanel);
  const quickDock = DOCK_ITEMS.filter((d) => QUICK_DOCK_IDS.includes(d.id));

  const handleClick = (id: string) => {
    setZoomId(id);
    setTimeout(() => { setActivePanel(id); setZoomId(null); }, 420);
  };

  const handleClose = () => setActivePanel(null);

  // Escape key to dismiss panel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden rounded-3xl">
      <GlassFilter />

      {/* Water wallpaper */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('https://images.unsplash.com/photo-1432251407527-504a6b4174a2?w=800&q=80')",
        backgroundSize: "cover", backgroundPosition: "center",
        filter: "brightness(0.82)",
      }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,8,0.45) 100%)" }} />

      {/* App title */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "32px 0 0" }}>
        <p style={{ color: "white", fontSize: 22, fontWeight: 700, fontFamily: "var(--font-poppins)", letterSpacing: "-0.02em", textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}>
          Aura Wellness
        </p>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, fontFamily: "var(--font-inter)", marginTop: 3 }}>
          Tap to explore
        </p>
      </div>

      {/* App icon grid — 3 × 2 */}
      <div style={{
        position: "relative", zIndex: 10,
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        rowGap: 26, padding: "28px 44px 0",
      }}>
        {DOCK_ITEMS.map((d) => {
          const isHov  = hoveredId === d.id;
          const isZoom = zoomId === d.id;
          return (
            <button
              key={d.id}
              onMouseEnter={() => setHoveredId(d.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleClick(d.id)}
              style={{ outline: "none", border: "none", background: "transparent", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
            >
              <motion.div
                animate={{ scale: isZoom ? 10 : isHov ? 1.13 : 1, opacity: isZoom ? 0 : 1 }}
                transition={isZoom ? { duration: 0.4, ease: [0.22, 1, 0.36, 1] } : { type: "spring", stiffness: 420, damping: 26 }}
                style={{
                  width: 66, height: 66, borderRadius: 17,
                  background: d.bg, display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: isHov ? `0 8px 24px ${d.glow}, 0 0 0 2px rgba(255,255,255,0.2)` : "0 4px 16px rgba(0,0,0,0.55)",
                }}
              >
                <d.Icon size={30} color="white" strokeWidth={1.7} />
              </motion.div>
              <span style={{ color: "white", fontSize: 11, fontWeight: 500, fontFamily: "var(--font-inter)", textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>
                {d.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom dock */}
      <div style={{ position: "absolute", bottom: 20, left: 16, right: 16, zIndex: 10 }}>
        <div style={{
          borderRadius: 28, padding: 8,
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {quickDock.map((d) => {
              const isHov = hoveredId === `q-${d.id}`;
              return (
                <button
                  key={d.id}
                  onMouseEnter={() => setHoveredId(`q-${d.id}`)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleClick(d.id)}
                  style={{ outline: "none", border: "none", background: "transparent", cursor: "pointer" }}
                >
                  <motion.div
                    animate={{ scale: isHov ? 1.15 : 1 }}
                    transition={{ type: "spring", stiffness: 420, damping: 26 }}
                    style={{
                      width: 54, height: 54, borderRadius: 14,
                      background: d.bg, display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: isHov ? `0 4px 18px ${d.glow}` : "0 2px 10px rgba(0,0,0,0.45)",
                    }}
                  >
                    <d.Icon size={24} color="white" strokeWidth={1.7} />
                  </motion.div>
                </button>
              );
            })}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
          <div style={{ width: 120, height: 4, background: "rgba(255,255,255,0.28)", borderRadius: 2 }} />
        </div>
      </div>

      {/* Click-outside dim overlay — clicking this closes the panel */}
      <AnimatePresence>
        {activePanel && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 25, cursor: "pointer" }}
          >
            {/* Dismiss hint */}
            <div style={{ position: "absolute", top: "6%", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 20, padding: "6px 14px",
              }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
                  <path d="M6 2v8M2 6l4 4 4-4"/>
                </svg>
                <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, fontFamily: "var(--font-inter)", fontWeight: 500 }}>Tap to close</span>
              </div>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, fontFamily: "var(--font-inter)" }}>or press Esc</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel — iOS-style bottom sheet */}
      <AnimatePresence>
        {activePanel && (
          <motion.div
            key={activePanel}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              height: "82%",
              background: "rgba(8,10,20,0.95)",
              backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)",
              borderRadius: "24px 24px 0 0",
              zIndex: 30, display: "flex", flexDirection: "column",
            }}
          >
            {/* Drag handle */}
            <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 4px" }}>
              <div style={{ width: 36, height: 4, background: "rgba(255,255,255,0.18)", borderRadius: 2 }} />
            </div>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 20px 2px" }}>
              <div style={{ height: 46, flex: 1, display: "flex", alignItems: "center" }}>
                {item && (
                  <motion.h2
                    key={activePanel}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ margin: 0, fontSize: 30, fontWeight: 700, color: "white", fontFamily: "var(--font-poppins), sans-serif", lineHeight: 1 }}
                  >
                    {item.panelTitle}
                  </motion.h2>
                )}
              </div>
              <button
                onClick={handleClose}
                style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.14)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", flexShrink: 0,
                }}
              >
                <X size={14} color="white" />
              </button>
            </div>

            {/* Subtitle */}
            {item && (
              <div style={{ padding: "2px 20px 10px", display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 18, height: 18, borderRadius: 5, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <item.Icon size={10} color="white" />
                </div>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "var(--font-inter)" }}>
                  Aura Wellness · {item.label}
                </span>
              </div>
            )}

            {/* Content */}
            <div style={{ flex: 1, padding: "0 16px 16px", overflowY: "auto", scrollbarWidth: "none" }}>
              {activePanel === "book"     && <ClientBookingDemo />}
              {activePanel === "times"    && <TimesPanel />}
              {activePanel === "call"     && <CallPanel />}
              {activePanel === "reviews"  && <ReviewsPanel />}
              {activePanel === "location" && <LocationPanel />}
              {activePanel === "help"     && <HelpPanel />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
