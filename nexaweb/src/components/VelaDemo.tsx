"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Heart, Search, Star, ArrowRight, Check, Truck, RefreshCw, Shield, ChevronDown } from "lucide-react";

const C = {
  bg: "#faf9f7", bgAlt: "#f3f0eb", bgCard: "#ffffff",
  dark: "#0f0e0d", body: "#4a4540", muted: "#9c9590",
  accent: "#c9184a", accentPale: "rgba(201,24,74,0.08)",
  gold: "#b8966a", border: "rgba(0,0,0,0.08)", borderMed: "rgba(0,0,0,0.13)",
};

const CATEGORIES = [
  { name: "New In", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80", count: "142 styles" },
  { name: "Dresses", img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80", count: "89 styles" },
  { name: "Outerwear", img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80", count: "54 styles" },
  { name: "Accessories", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80", count: "210 styles" },
];

const PRODUCTS = [
  { name: "Silk Wrap Midi Dress", price: "$285", original: null, badge: "New", img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&q=80" },
  { name: "Merino Wool Blazer", price: "$195", original: "$340", badge: "Sale", img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80" },
  { name: "Tailored Wide-Leg Trousers", price: "$165", original: null, badge: null, img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80" },
  { name: "Cashmere Turtleneck", price: "$240", original: "$380", badge: "Limited", img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&q=80" },
];

const TRUST = [
  { icon: Truck, label: "Free Shipping", sub: "On orders over $150" },
  { icon: RefreshCw, label: "Free Returns", sub: "30-day hassle-free" },
  { icon: Shield, label: "Secure Checkout", sub: "256-bit SSL encryption" },
  { icon: Star, label: "4.8 Stars", sub: "From 12,000+ reviews" },
];

const REVIEWS = [
  { name: "Charlotte W.", rating: 5, text: "The quality is genuinely exceptional — I can feel the difference from anything I've found on the high street. My Silk Wrap Dress arrived beautifully packaged and fits like it was made for me.", item: "Silk Wrap Midi Dress" },
  { name: "Isabelle M.", rating: 5, text: "Free returns made me confident trying a new size. The Merino Blazer is incredible — structured, warm, and endlessly versatile. I've worn it three times this week.", item: "Merino Wool Blazer" },
  { name: "Priya T.", rating: 5, text: "Next-day delivery arrived exactly when promised. The packaging is a gift in itself. This is my new go-to for anything that needs to look effortlessly perfect.", item: "Cashmere Turtleneck" },
];

interface Props { isOpen: boolean; onClose: () => void; }

export function VelaDemo({ isOpen, onClose }: Props) {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [size, setSize] = useState("S");
  const [bagCount, setBagCount] = useState(0);

  const toggleWishlist = (name: string) => setWishlist(prev => {
    const next = new Set(prev);
    next.has(name) ? next.delete(name) : next.add(name);
    return next;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] overflow-y-auto"
          style={{ background: C.bg, fontFamily: "'Georgia', serif" }}
        >
          {/* NAV */}
          <nav style={{ background: C.bgCard, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 50 }}>
            {/* Top bar */}
            <div style={{ background: C.dark, padding: "8px 20px", textAlign: "center" }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Free shipping on orders over $150 · Free 30-day returns</span>
            </div>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
                {["Women", "Men", "Collections", "Sale"].map(n => (
                  <span key={n} style={{ fontSize: 13, fontWeight: 400, color: C.body, cursor: "pointer", fontFamily: "'system-ui',sans-serif", letterSpacing: "0.04em" }}>{n}</span>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 26, fontWeight: 700, color: C.dark, letterSpacing: "-0.04em", fontFamily: "'Georgia',serif" }}>VELA</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <Search size={18} color={C.body} style={{ cursor: "pointer" }} />
                <Heart size={18} color={C.body} style={{ cursor: "pointer" }} />
                <div style={{ position: "relative", cursor: "pointer" }} onClick={() => setBagCount(b => b + 1)}>
                  <ShoppingBag size={18} color={C.dark} />
                  {bagCount > 0 && <div style={{ position: "absolute", top: -6, right: -6, background: C.accent, color: "white", borderRadius: "50%", width: 16, height: 16, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>{bagCount}</div>}
                </div>
                <button onClick={onClose} style={{ background: "rgba(0,0,0,0.06)", border: "none", borderRadius: 999, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <X size={15} color={C.dark} />
                </button>
              </div>
            </div>
          </nav>

          {/* DEMO SITE BANNER — sticky, prominent */}
          <div style={{
            position: "sticky", top: 64, zIndex: 49,
            background: "linear-gradient(90deg, #0a0700 0%, #1a1000 50%, #0a0700 100%)",
            borderBottom: "1px solid rgba(252,211,77,0.32)",
            padding: "10px 20px", textAlign: "center",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          }}>
            <span style={{ fontSize: 15 }}>⚠️</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#fcd34d", letterSpacing: "0.01em", fontFamily: "sans-serif" }}>
              DEMO SITE — Not a real business.{" "}
              <span style={{ color: "#fb923c" }}>Built by NexaWeb</span> to showcase what we can build for you.
            </span>
          </div>

          {/* HERO */}
          <section style={{ position: "relative", height: 620, overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80')", backgroundSize: "cover", backgroundPosition: "center 20%" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(15,14,13,0.75) 0%, rgba(15,14,13,0.2) 60%, transparent 100%)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", paddingLeft: "8vw" }}>
              <div style={{ maxWidth: 480 }}>
                <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 16, fontFamily: "sans-serif" }}>New Collection — SS25</p>
                <h1 style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)", fontWeight: 300, color: "white", lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.02em", fontStyle: "italic" }}>
                  Effortless<br /><em style={{ fontStyle: "normal", fontWeight: 700 }}>Elegance.</em>
                </h1>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.72)", marginBottom: 36, lineHeight: 1.65, fontFamily: "sans-serif", maxWidth: 360 }}>
                  Considered pieces. Exceptional quality. Designed to move with you through every occasion.
                </p>
                <div style={{ display: "flex", gap: 12 }}>
                  <button style={{ background: C.bgCard, color: C.dark, border: "none", padding: "14px 32px", fontSize: 13, fontWeight: 600, cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "sans-serif" }}>
                    Shop Collection
                  </button>
                  <button style={{ background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.4)", padding: "14px 24px", fontSize: 13, fontWeight: 400, cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "sans-serif" }}>
                    View Lookbook
                  </button>
                </div>
              </div>
            </div>
            {/* sale badge */}
            <div style={{ position: "absolute", top: 32, right: 40, background: C.accent, color: "white", padding: "10px 20px", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "sans-serif" }}>
              Up to 40% off sale styles
            </div>
          </section>

          {/* CATEGORIES — Bento Grid */}
          <section style={{ padding: "60px 24px", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 32 }}>
              <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 300, color: C.dark, letterSpacing: "-0.02em" }}>Shop by Category</h2>
              <a href="#" style={{ fontSize: 12, color: C.muted, textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "sans-serif" }}>View All</a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "260px 260px", gap: 12 }}>
              {CATEGORIES.map((cat, i) => (
                <div key={cat.name} style={{ position: "relative", overflow: "hidden", borderRadius: 4, cursor: "pointer", gridRow: i === 0 ? "1 / 3" : "auto" }}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${cat.img}')`, backgroundSize: "cover", backgroundPosition: "center", transition: "transform 0.6s ease" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,14,13,0.6) 0%, transparent 50%)" }} />
                  <div style={{ position: "absolute", bottom: 24, left: 24 }}>
                    <div style={{ fontSize: i === 0 ? 22 : 16, fontWeight: 600, color: "white", marginBottom: 4, letterSpacing: "-0.01em" }}>{cat.name}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "sans-serif" }}>{cat.count}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* TRUST BADGES */}
          <section style={{ background: C.bgAlt, padding: "32px 24px" }}>
            <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
              {TRUST.map(({ icon: Icon, label, sub }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <Icon size={22} color={C.dark} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.dark, fontFamily: "sans-serif" }}>{label}</div>
                    <div style={{ fontSize: 11, color: C.muted, fontFamily: "sans-serif" }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PRODUCTS */}
          <section style={{ padding: "60px 24px", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 40 }}>
              <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 300, color: C.dark, letterSpacing: "-0.02em" }}>Bestsellers</h2>
              <a href="#" style={{ fontSize: 12, color: C.muted, textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "sans-serif" }}>Shop All</a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
              {PRODUCTS.map((p) => (
                <div key={p.name} style={{ cursor: "pointer" }}>
                  <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", borderRadius: 4, marginBottom: 14 }}>
                    <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${p.img}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
                    {p.badge && (
                      <div style={{ position: "absolute", top: 12, left: 12, background: p.badge === "Sale" ? C.accent : C.dark, color: "white", fontSize: 10, fontWeight: 700, padding: "3px 10px", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "sans-serif" }}>{p.badge}</div>
                    )}
                    <button onClick={() => toggleWishlist(p.name)} style={{ position: "absolute", top: 12, right: 12, background: "white", border: "none", borderRadius: "50%", width: 34, height: 34, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Heart size={15} fill={wishlist.has(p.name) ? C.accent : "none"} color={wishlist.has(p.name) ? C.accent : C.body} />
                    </button>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 400, color: C.dark, marginBottom: 4, lineHeight: 1.3 }}>{p.name}</div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: p.original ? C.accent : C.dark, fontFamily: "sans-serif" }}>{p.price}</span>
                    {p.original && <span style={{ fontSize: 13, color: C.muted, textDecoration: "line-through", fontFamily: "sans-serif" }}>{p.original}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* QUICK ADD TO BAG */}
          <section style={{ background: C.dark, padding: "60px 24px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 12, fontFamily: "sans-serif" }}>Featured Piece</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 300, color: "white", letterSpacing: "-0.02em", marginBottom: 16, fontStyle: "italic" }}>Silk Wrap<br /><strong style={{ fontStyle: "normal" }}>Midi Dress</strong></h2>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.62)", lineHeight: 1.7, marginBottom: 28, fontFamily: "sans-serif" }}>
                  Bias-cut 100% silk charmeuse. Adjustable wrap front. Hand wash or dry clean. Available in 6 colourways.
                </p>
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 10, fontFamily: "sans-serif" }}>Select Size</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    {["XS", "S", "M", "L", "XL"].map(s => (
                      <button key={s} onClick={() => setSize(s)} style={{ width: 40, height: 40, border: `1px solid ${size === s ? "white" : "rgba(255,255,255,0.2)"}`, background: size === s ? "white" : "transparent", color: size === s ? C.dark : "white", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "sans-serif" }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={() => setBagCount(b => b + 1)} style={{ background: C.accent, color: "white", border: "none", padding: "15px 32px", fontSize: 13, fontWeight: 600, cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "sans-serif", display: "flex", alignItems: "center", gap: 8 }}>
                  <ShoppingBag size={15} /> Add to Bag — $285
                </button>
                <div style={{ display: "flex", gap: 16, marginTop: 14, flexWrap: "wrap" }}>
                  {["Free delivery", "Free 30-day returns", "In stock — ships today"].map(t => (
                    <span key={t} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "sans-serif" }}>
                      <Check size={11} color="rgba(255,255,255,0.5)" /> {t}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ aspectRatio: "3/4", backgroundImage: "url('https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80')", backgroundSize: "cover", backgroundPosition: "center", borderRadius: 4 }} />
            </div>
          </section>

          {/* REVIEWS */}
          <section style={{ padding: "70px 24px", background: C.bgAlt }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 14 }}>
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} fill="#c9184a" color="#c9184a" />)}
                </div>
                <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 300, color: C.dark, letterSpacing: "-0.02em" }}>4.8 Stars · 12,000+ Reviews</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
                {REVIEWS.map((r) => (
                  <div key={r.name} style={{ background: C.bgCard, padding: 28, borderRadius: 4 }}>
                    <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                      {Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={12} fill="#c9184a" color="#c9184a" />)}
                    </div>
                    <p style={{ fontSize: 14, color: C.body, lineHeight: 1.75, marginBottom: 18, fontFamily: "sans-serif" }}>"{r.text}"</p>
                    <div style={{ fontWeight: 600, fontSize: 13, color: C.dark, fontFamily: "sans-serif" }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: C.muted, fontFamily: "sans-serif" }}>Verified purchase · {r.item}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* NEWSLETTER */}
          <section style={{ padding: "60px 24px", textAlign: "center", background: C.bg }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 300, color: C.dark, letterSpacing: "-0.02em", marginBottom: 10 }}>Join the Edit</h2>
            <p style={{ fontSize: 14, color: C.muted, marginBottom: 28, fontFamily: "sans-serif" }}>Be the first to discover new arrivals, exclusive sales, and style notes from our team.</p>
            <div style={{ display: "flex", gap: 0, maxWidth: 400, margin: "0 auto" }}>
              <input placeholder="Your email address" style={{ flex: 1, padding: "13px 16px", border: `1px solid ${C.borderMed}`, borderRight: "none", fontSize: 14, color: C.dark, background: C.bgCard, outline: "none", fontFamily: "sans-serif" }} />
              <button style={{ background: C.dark, color: "white", border: "none", padding: "13px 24px", fontSize: 12, fontWeight: 600, cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "sans-serif", whiteSpace: "nowrap" }}>Subscribe</button>
            </div>
            <p style={{ fontSize: 11, color: C.muted, marginTop: 12, fontFamily: "sans-serif" }}>No spam. Unsubscribe anytime. We never share your data.</p>
          </section>

          {/* FOOTER */}
          <footer style={{ background: C.dark, padding: "40px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: "white", letterSpacing: "-0.04em", marginBottom: 8 }}>VELA</div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, fontFamily: "sans-serif" }}>London · New York · Paris · hello@velastudio.co</p>
            <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 11, marginTop: 10, fontFamily: "sans-serif" }}>Demo site by NexaWeb · Not a real business</p>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
