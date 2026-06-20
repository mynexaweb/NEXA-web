"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Shield, Zap, TrendingUp, Globe, Lock, Check, Star, ChevronRight } from "lucide-react";

const C = {
  bg: "#05070f", bgAlt: "#080b16", bgCard: "rgba(255,255,255,0.04)",
  accent: "#6366f1", accentLight: "#818cf8", accentPale: "rgba(99,102,241,0.12)",
  green: "#22c55e", greenPale: "rgba(34,197,94,0.1)",
  text: "#ffffff", body: "rgba(255,255,255,0.65)", muted: "rgba(255,255,255,0.32)",
  border: "rgba(255,255,255,0.07)", borderMed: "rgba(99,102,241,0.3)",
};

const FEATURES = [
  { icon: Shield, title: "Bank-Grade Security", desc: "256-bit encryption. FDIC insured up to $250K. Biometric auth on every login. Your money is safer here than anywhere." },
  { icon: Zap, title: "Instant Transfers", desc: "Send money globally in seconds. Real exchange rates. No hidden fees. What you see is what gets sent." },
  { icon: TrendingUp, title: "Smart Savings", desc: "Automated savings rules. High-yield account (4.8% APY). Spend analysis with actionable insights, not just charts." },
  { icon: Globe, title: "Global Access", desc: "Use your Cipher card in 190+ countries. Zero foreign transaction fees. ATM fee reimbursement worldwide." },
];

const PLANS = [
  { name: "Essential", price: "$0", period: "forever free", color: C.accent, features: ["FDIC-insured account", "Instant transfers (US)", "1% cashback on all spend", "Mobile & web app", "24/7 chat support"], cta: "Open Free Account" },
  { name: "Pro", price: "$9", period: "per month", color: "#a855f7", popular: true, features: ["Everything in Essential", "4.8% APY savings", "Global transfers (190+ countries)", "2.5% cashback", "Priority phone support", "Virtual card numbers"], cta: "Start Free Trial" },
  { name: "Business", price: "$29", period: "per month", color: C.green, features: ["Everything in Pro", "Team accounts & permissions", "Bulk payment tools", "Expense management", "Dedicated account manager", "API access"], cta: "Talk to Sales" },
];

const STATS = [
  { value: "$8.2B+", label: "Transactions processed" },
  { value: "2.1M+", label: "Active accounts" },
  { value: "4.9★", label: "App store rating" },
  { value: "<0.01%", label: "Fraud rate" },
];

const REVIEWS = [
  { name: "Alex P.", role: "Freelance Designer", rating: 5, text: "Switched from my legacy bank 8 months ago. The instant global transfers alone saved me $400 in fees last quarter. The app is genuinely beautiful to use — feels like it was designed for humans." },
  { name: "Sarah K.", role: "Small Business Owner", rating: 5, text: "The business account changed how I manage payroll. What used to take 2 hours now takes 15 minutes. The cashback covers most of my subscription costs. Actual ROI from a bank account." },
  { name: "Marcus T.", role: "Startup Founder", rating: 5, text: "The API is clean, the docs are excellent, and the support team actually knows what they're talking about. Cipher is what every bank should be but won't be for another decade." },
];

interface Props { isOpen: boolean; onClose: () => void; }

export function CipherDemo({ isOpen, onClose }: Props) {
  const [tab, setTab] = useState<"personal" | "business">("personal");
  const [email, setEmail] = useState("");

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
          <nav style={{ background: "rgba(5,7,15,0.9)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 50 }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 62 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${C.accent}, #a855f7)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Lock size={16} color="white" />
                  </div>
                  <span style={{ fontWeight: 800, fontSize: 18, color: C.text, letterSpacing: "-0.03em" }}>Cipher</span>
                </div>
                <div className="hidden sm:flex" style={{ gap: 24 }}>
                  {["Personal", "Business", "Pricing", "Security"].map(n => (
                    <span key={n} style={{ fontSize: 13, fontWeight: 500, color: C.body, cursor: "pointer" }}>{n}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span className="hidden sm:inline" style={{ fontSize: 13, fontWeight: 500, color: C.body, cursor: "pointer" }}>Log in</span>
                <button className="hidden sm:block" style={{ background: C.accent, color: "white", border: "none", borderRadius: 8, padding: "9px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Open Account →</button>
                <button onClick={onClose} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
          <section style={{ padding: "90px 24px 70px", position: "relative", overflow: "hidden", textAlign: "center" }}>
            {/* Background glow */}
            <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: 800, height: 400, background: `radial-gradient(ellipse, ${C.accentPale} 0%, transparent 70%)`, pointerEvents: "none" }} />
            <div style={{ position: "relative", maxWidth: 780, margin: "0 auto" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.greenPale, border: `1px solid rgba(34,197,94,0.3)`, borderRadius: 999, padding: "6px 16px", marginBottom: 28 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, display: "inline-block" }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: C.green }}>Fully regulated · FDIC insured · SOC 2 Type II certified</span>
              </div>
              <h1 style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", fontWeight: 900, color: C.text, lineHeight: 1.05, marginBottom: 22, letterSpacing: "-0.04em" }}>
                Banking Built<br />
                <span style={{ background: `linear-gradient(135deg, ${C.accentLight}, #a855f7, #ec4899)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  For Tomorrow.
                </span>
              </h1>
              <p style={{ fontSize: 18, color: C.body, marginBottom: 40, lineHeight: 1.65, maxWidth: 560, margin: "0 auto 40px" }}>
                Instant transfers. 4.8% APY savings. Zero fees. Smart insights. Everything your old bank doesn&apos;t do — in one elegant app.
              </p>
              {/* Email signup */}
              <div style={{ display: "flex", gap: 0, maxWidth: 460, margin: "0 auto 20px", boxShadow: `0 0 0 1px ${C.borderMed}`, borderRadius: 12, overflow: "hidden" }}>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  style={{ flex: 1, padding: "15px 20px", background: "rgba(255,255,255,0.06)", border: "none", fontSize: 15, color: C.text, outline: "none" }}
                />
                <button style={{ background: C.accent, color: "white", border: "none", padding: "15px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
                  Open Free Account
                </button>
              </div>
              <p style={{ fontSize: 12, color: C.muted }}>Free forever · No credit check · Takes 3 minutes to open</p>

              {/* Dashboard preview */}
              <div style={{ marginTop: 60, position: "relative" }}>
                <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, maxWidth: 700, margin: "0 auto", textAlign: "left" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <div>
                      <div style={{ fontSize: 11, color: C.muted, marginBottom: 4, letterSpacing: "0.06em", textTransform: "uppercase" }}>Total Balance</div>
                      <div style={{ fontSize: "2.2rem", fontWeight: 900, color: C.text, letterSpacing: "-0.02em" }}>$24,891.40</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 4 }}>
                        <TrendingUp size={14} color={C.green} />
                        <span style={{ fontSize: 13, color: C.green, fontWeight: 600 }}>+$892.30 this month (4.8% APY)</span>
                      </div>
                    </div>
                    <button style={{ background: C.accent, color: "white", border: "none", borderRadius: 8, padding: "10px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Send Money</button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                    {[["Checking", "$8,240"], ["Savings", "$14,391"], ["Cashback", "$127.40"], ["This Month", "-$1,476"]].map(([label, val]) => (
                      <div key={label} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "14px 16px" }}>
                        <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>{label}</div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{val}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Glow under dashboard */}
                <div style={{ position: "absolute", bottom: -20, left: "50%", transform: "translateX(-50%)", width: "80%", height: 40, background: `radial-gradient(ellipse, ${C.accentPale} 0%, transparent 70%)`, filter: "blur(20px)" }} />
              </div>
            </div>
          </section>

          {/* STATS */}
          <section style={{ background: C.bgAlt, padding: "36px 24px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, textAlign: "center" }}>
              {STATS.map(({ value, label }) => (
                <div key={label}>
                  <div style={{ fontSize: "1.9rem", fontWeight: 900, color: C.text, letterSpacing: "-0.02em" }}>{value}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* FEATURES — Bento */}
          <section style={{ padding: "70px 24px", maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.accentLight, marginBottom: 12 }}>Features</p>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, color: C.text, letterSpacing: "-0.03em" }}>Everything your bank should do.<br />Nothing it does.</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div key={title} style={{ background: C.bgCard, borderRadius: 18, padding: 32, border: `1px solid ${C.border}` }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: C.accentPale, border: `1px solid ${C.borderMed}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    <Icon size={22} color={C.accentLight} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 10, letterSpacing: "-0.01em" }}>{title}</h3>
                  <p style={{ fontSize: 14, color: C.body, lineHeight: 1.7 }}>{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* PRICING */}
          <section style={{ padding: "70px 24px", background: C.bgAlt }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 52 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.accentLight, marginBottom: 12 }}>Pricing</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, color: C.text, letterSpacing: "-0.03em" }}>Simple, Transparent Pricing</h2>
                <p style={{ color: C.body, marginTop: 10, fontSize: 15 }}>No hidden fees. Cancel anytime. Upgrade when you need to.</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                {PLANS.map((plan) => (
                  <div key={plan.name} style={{ background: plan.popular ? `linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.1))` : C.bgCard, borderRadius: 20, padding: 32, border: plan.popular ? `1px solid ${C.borderMed}` : `1px solid ${C.border}`, position: "relative" }}>
                    {plan.popular && (
                      <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: `linear-gradient(135deg, ${C.accent}, #a855f7)`, color: "white", fontSize: 11, fontWeight: 800, padding: "5px 18px", borderRadius: 999, whiteSpace: "nowrap" }}>MOST POPULAR</div>
                    )}
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: plan.color, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>{plan.name}</div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                        <span style={{ fontSize: "2.4rem", fontWeight: 900, color: C.text, letterSpacing: "-0.02em" }}>{plan.price}</span>
                        <span style={{ fontSize: 13, color: C.muted }}>/{plan.period}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                      {plan.features.map(f => (
                        <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.body }}>
                          <Check size={14} color={plan.color} strokeWidth={2.5} /> {f}
                        </div>
                      ))}
                    </div>
                    <button style={{ width: "100%", background: plan.popular ? C.accent : "transparent", color: plan.popular ? "white" : C.accentLight, border: `1.5px solid ${plan.popular ? C.accent : C.borderMed}`, borderRadius: 10, padding: "12px 0", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                      {plan.cta}
                    </button>
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
                <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 900, color: C.text, letterSpacing: "-0.02em" }}>Loved by 2.1 Million People</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                {REVIEWS.map((r) => (
                  <div key={r.name} style={{ background: C.bgCard, borderRadius: 18, padding: 28, border: `1px solid ${C.border}` }}>
                    <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                      {Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={13} fill="#fbbf24" color="#fbbf24" />)}
                    </div>
                    <p style={{ fontSize: 14, color: C.body, lineHeight: 1.75, marginBottom: 18 }}>"{r.text}"</p>
                    <div style={{ fontWeight: 800, fontSize: 13, color: C.text }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: C.muted }}>{r.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section style={{ padding: "80px 24px", textAlign: "center", background: `linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.1) 100%)`, borderTop: `1px solid ${C.border}` }}>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: C.text, letterSpacing: "-0.03em", marginBottom: 16 }}>Ready to switch?<br />Takes 3 minutes.</h2>
            <p style={{ color: C.body, marginBottom: 36, fontSize: 16 }}>Join 2.1 million people banking smarter.</p>
            <button style={{ background: C.accent, color: "white", border: "none", borderRadius: 12, padding: "16px 40px", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: `0 8px 40px rgba(99,102,241,0.4)`, display: "inline-flex", alignItems: "center", gap: 10 }}>
              Open Your Free Account <ArrowRight size={18} />
            </button>
            <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 20, flexWrap: "wrap" }}>
              {["No credit check", "No minimum balance", "FDIC insured", "Cancel anytime"].map(t => (
                <span key={t} style={{ fontSize: 12, color: C.muted, display: "flex", alignItems: "center", gap: 5 }}>
                  <Check size={11} color={C.muted} /> {t}
                </span>
              ))}
            </div>
          </section>

          {/* FOOTER */}
          <footer style={{ background: "rgba(0,0,0,0.5)", padding: "36px 24px", textAlign: "center", borderTop: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginBottom: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: `linear-gradient(135deg, ${C.accent}, #a855f7)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Lock size={12} color="white" />
              </div>
              <span style={{ fontWeight: 800, fontSize: 16, color: C.text, letterSpacing: "-0.02em" }}>Cipher</span>
            </div>
            <p style={{ color: C.muted, fontSize: 12 }}>Member FDIC · SOC 2 Type II · Regulated by FinCEN</p>
            <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 11, marginTop: 10 }}>Demo site by NexaWeb · Not a real business</p>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
