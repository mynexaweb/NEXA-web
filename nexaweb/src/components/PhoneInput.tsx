"use client"

import { useState, useRef, useEffect } from "react"

const COUNTRIES = [
  { code: "US", flag: "🇺🇸", dial: "+1",   name: "United States" },
  { code: "CA", flag: "🇨🇦", dial: "+1",   name: "Canada" },
  { code: "GB", flag: "🇬🇧", dial: "+44",  name: "United Kingdom" },
  { code: "AU", flag: "🇦🇺", dial: "+61",  name: "Australia" },
  { code: "IE", flag: "🇮🇪", dial: "+353", name: "Ireland" },
  { code: "NZ", flag: "🇳🇿", dial: "+64",  name: "New Zealand" },
  { code: "MX", flag: "🇲🇽", dial: "+52",  name: "Mexico" },
  { code: "BR", flag: "🇧🇷", dial: "+55",  name: "Brazil" },
  { code: "DE", flag: "🇩🇪", dial: "+49",  name: "Germany" },
  { code: "FR", flag: "🇫🇷", dial: "+33",  name: "France" },
  { code: "ES", flag: "🇪🇸", dial: "+34",  name: "Spain" },
  { code: "IT", flag: "🇮🇹", dial: "+39",  name: "Italy" },
  { code: "NL", flag: "🇳🇱", dial: "+31",  name: "Netherlands" },
  { code: "SE", flag: "🇸🇪", dial: "+46",  name: "Sweden" },
  { code: "NO", flag: "🇳🇴", dial: "+47",  name: "Norway" },
  { code: "CH", flag: "🇨🇭", dial: "+41",  name: "Switzerland" },
  { code: "IN", flag: "🇮🇳", dial: "+91",  name: "India" },
  { code: "PH", flag: "🇵🇭", dial: "+63",  name: "Philippines" },
  { code: "SG", flag: "🇸🇬", dial: "+65",  name: "Singapore" },
  { code: "JP", flag: "🇯🇵", dial: "+81",  name: "Japan" },
  { code: "KR", flag: "🇰🇷", dial: "+82",  name: "South Korea" },
  { code: "CN", flag: "🇨🇳", dial: "+86",  name: "China" },
  { code: "AE", flag: "🇦🇪", dial: "+971", name: "UAE" },
  { code: "SA", flag: "🇸🇦", dial: "+966", name: "Saudi Arabia" },
  { code: "ZA", flag: "🇿🇦", dial: "+27",  name: "South Africa" },
  { code: "NG", flag: "🇳🇬", dial: "+234", name: "Nigeria" },
]

interface Props {
  value: string
  onChange: (combined: string) => void
  placeholder?: string
}

export function PhoneInput({ value, onChange, placeholder = "555 123 4567" }: Props) {
  const [open, setOpen] = useState(false)
  const [country, setCountry] = useState(COUNTRIES[0])
  const [search, setSearch] = useState("")
  const wrapRef = useRef<HTMLDivElement>(null)

  // Strip the dial prefix when reading the local-number portion back out
  const localNumber = value.startsWith(country.dial)
    ? value.slice(country.dial.length).trimStart()
    : value

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [open])

  const updateNumber = (raw: string) => {
    // Allow only digits, spaces, dashes, parens — strip everything else
    const cleaned = raw.replace(/[^\d\s\-()]/g, "").slice(0, 20)
    onChange(cleaned ? `${country.dial} ${cleaned}` : "")
  }

  const selectCountry = (c: typeof COUNTRIES[number]) => {
    setCountry(c)
    setOpen(false)
    setSearch("")
    onChange(localNumber ? `${c.dial} ${localNumber}` : "")
  }

  const filtered = search
    ? COUNTRIES.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.dial.includes(search) ||
        c.code.toLowerCase().includes(search.toLowerCase())
      )
    : COUNTRIES

  return (
    <div ref={wrapRef} style={{ position: "relative", width: "100%" }}>
      <div style={{ display: "flex", gap: 8, width: "100%" }}>
        {/* Country selector button */}
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          aria-label="Select country code"
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "11px 12px", borderRadius: 10,
            border: "1.5px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)", color: "#fff",
            fontSize: 14, fontWeight: 600, cursor: "pointer",
            whiteSpace: "nowrap", flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 18, lineHeight: 1 }}>{country.flag}</span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{country.dial}</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginLeft: 2, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}>
            <path d="M2 3.5L5 6.5L8 3.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Number input */}
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={localNumber}
          onChange={e => updateNumber(e.target.value)}
          placeholder={placeholder}
          style={{
            flex: 1, minWidth: 0,
            padding: "11px 14px", borderRadius: 10,
            border: "1.5px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)", color: "#fff",
            fontSize: 16, outline: "none", boxSizing: "border-box",
          }}
        />
      </div>

      {/* Country dropdown */}
      {open && (
        <div
          style={{
            position: "absolute", top: "calc(100% + 6px)", left: 0,
            width: "min(340px, 100%)", maxHeight: 280, overflowY: "auto",
            background: "#0d1424", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 12, boxShadow: "0 12px 36px rgba(0,0,0,0.6)",
            zIndex: 50,
          }}
        >
          <div style={{ padding: 8, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search country or code…"
              autoFocus
              style={{
                width: "100%", padding: "8px 10px", borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)", color: "#fff",
                fontSize: 13, outline: "none", boxSizing: "border-box",
              }}
            />
          </div>
          <div>
            {filtered.length === 0 && (
              <div style={{ padding: "14px 16px", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>No matches</div>
            )}
            {filtered.map(c => (
              <button
                key={c.code}
                type="button"
                onClick={() => selectCountry(c)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 14px", border: "none", background: "transparent",
                  color: "#fff", fontSize: 13, cursor: "pointer", textAlign: "left",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(20,71,230,0.12)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{ fontSize: 18, lineHeight: 1, width: 22 }}>{c.flag}</span>
                <span style={{ flex: 1 }}>{c.name}</span>
                <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>{c.dial}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
