"use client";

import React, { useState } from "react";
import { GlassEffect, GlassButton, GlassFilter } from "@/components/ui/liquid-glass";

const SERVICES = [
  { id: "massage", name: "Deep Tissue Massage", duration: "60 min", price: "£85" },
  { id: "facial", name: "Radiance Facial", duration: "45 min", price: "£70" },
  { id: "body", name: "Body Wrap Ritual", duration: "90 min", price: "£110" },
  { id: "couple", name: "Couples Retreat", duration: "90 min", price: "£175" },
];

const DATES = [
  { day: "Mon", date: "9", full: "Mon 9 Jun" },
  { day: "Tue", date: "10", full: "Tue 10 Jun" },
  { day: "Wed", date: "11", full: "Wed 11 Jun" },
  { day: "Thu", date: "12", full: "Thu 12 Jun" },
  { day: "Fri", date: "13", full: "Fri 13 Jun" },
];

const TIMES = ["10:00", "10:30", "11:00", "12:30", "14:00", "14:30", "15:30", "16:00"];
const UNAVAILABLE = ["11:00", "14:00"];

export function ClientBookingDemo() {
  const [step, setStep] = useState<"service" | "datetime" | "confirm" | "done">("service");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const service = SERVICES.find((s) => s.id === selectedService);

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden"
      style={{ minHeight: 560 }}
    >
      <GlassFilter />

      {/* BG image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80')",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,8,20,0.55) 0%, rgba(10,8,20,0.3) 100%)" }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-6 md:p-10" style={{ minHeight: 560 }}>

        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-white/50 text-xs tracking-[0.2em] uppercase">Powered by NexaWeb</p>
            <h2 className="font-display font-bold text-white text-2xl tracking-tight mt-0.5">Aura Wellness</h2>
          </div>
          <GlassEffect className="rounded-2xl px-4 py-2 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              Accepting bookings
            </div>
          </GlassEffect>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {["Service", "Date & Time", "Confirm"].map((label, i) => {
            const stepIndex = step === "service" ? 0 : step === "datetime" ? 1 : 2;
            const done = i < stepIndex;
            const active = i === stepIndex;
            return (
              <React.Fragment key={label}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                    style={{
                      background: active ? "#1447e6" : done ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
                      color: "white",
                    }}
                  >
                    {done ? "✓" : i + 1}
                  </div>
                  <span className={`text-xs font-medium transition-colors ${active ? "text-white" : "text-white/40"}`}>{label}</span>
                </div>
                {i < 2 && <div className="flex-1 h-px" style={{ background: done ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)" }} />}
              </React.Fragment>
            );
          })}
        </div>

        {/* ── STEP 1: Service ── */}
        {step === "service" && (
          <div className="flex-1">
            <p className="text-white/60 text-sm mb-4" style={{ fontFamily: "var(--font-inter)" }}>Choose a treatment</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICES.map((s) => (
                <GlassEffect
                  key={s.id}
                  className={`rounded-2xl p-4 transition-all duration-300 ${selectedService === s.id ? "ring-2 ring-white/60" : "hover:ring-1 hover:ring-white/30"}`}
                  onClick={() => setSelectedService(s.id)}
                  style={{ background: selectedService === s.id ? "rgba(255,255,255,0.15)" : undefined }}
                >
                  <div className="flex items-start justify-between w-full text-white">
                    <div>
                      <p className="font-semibold text-sm">{s.name}</p>
                      <p className="text-white/60 text-xs mt-1" style={{ fontFamily: "var(--font-inter)" }}>{s.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white">{s.price}</p>
                      {selectedService === s.id && (
                        <span className="text-[10px] text-green-300 font-medium">Selected ✓</span>
                      )}
                    </div>
                  </div>
                </GlassEffect>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <GlassButton
                onClick={() => selectedService && setStep("datetime")}
                className={`px-8 py-3 text-white text-sm font-semibold ${!selectedService ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                Continue →
              </GlassButton>
            </div>
          </div>
        )}

        {/* ── STEP 2: Date & Time ── */}
        {step === "datetime" && (
          <div className="flex-1">
            <p className="text-white/60 text-sm mb-4" style={{ fontFamily: "var(--font-inter)" }}>Select a date</p>
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
              {DATES.map((d) => (
                <GlassEffect
                  key={d.full}
                  className={`rounded-2xl px-4 py-3 flex-shrink-0 text-center cursor-pointer transition-all ${selectedDate === d.full ? "ring-2 ring-white/70" : "hover:ring-1 hover:ring-white/30"}`}
                  onClick={() => { setSelectedDate(d.full); setSelectedTime(null); }}
                >
                  <p className="text-white/50 text-xs mb-1">{d.day}</p>
                  <p className="text-white font-bold text-lg leading-none">{d.date}</p>
                  <p className="text-white/40 text-[10px] mt-1">Jun</p>
                </GlassEffect>
              ))}
            </div>

            {selectedDate && (
              <>
                <p className="text-white/60 text-sm mb-3" style={{ fontFamily: "var(--font-inter)" }}>Available times for {selectedDate}</p>
                <div className="grid grid-cols-4 gap-2">
                  {TIMES.map((t) => {
                    const unavail = UNAVAILABLE.includes(t);
                    return (
                      <GlassEffect
                        key={t}
                        className={`rounded-xl py-2.5 text-center text-sm font-medium transition-all duration-200
                          ${unavail ? "opacity-30 cursor-not-allowed" : ""}
                          ${selectedTime === t ? "ring-2 ring-white/70" : !unavail ? "hover:ring-1 hover:ring-white/30" : ""}
                        `}
                        onClick={() => !unavail && setSelectedTime(t)}
                      >
                        <span className="text-white">{t}</span>
                      </GlassEffect>
                    );
                  })}
                </div>
              </>
            )}

            <div className="mt-6 flex justify-between items-center">
              <button className="text-white/40 hover:text-white text-sm transition-colors" onClick={() => setStep("service")}>← Back</button>
              <GlassButton
                onClick={() => selectedDate && selectedTime && setStep("confirm")}
                className={`px-8 py-3 text-white text-sm font-semibold ${!selectedDate || !selectedTime ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                Continue →
              </GlassButton>
            </div>
          </div>
        )}

        {/* ── STEP 3: Confirm ── */}
        {step === "confirm" && (
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <p className="text-white/60 text-sm mb-5" style={{ fontFamily: "var(--font-inter)" }}>Review your booking</p>
              <GlassEffect className="rounded-2xl p-5 mb-4">
                <div className="flex flex-col gap-3 w-full text-white text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                  <div className="flex justify-between">
                    <span className="text-white/60">Treatment</span>
                    <span className="font-semibold">{service?.name}</span>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex justify-between">
                    <span className="text-white/60">Date</span>
                    <span className="font-semibold">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Time</span>
                    <span className="font-semibold">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Duration</span>
                    <span className="font-semibold">{service?.duration}</span>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex justify-between text-base">
                    <span className="text-white/80 font-semibold">Total</span>
                    <span className="font-bold text-white">{service?.price}</span>
                  </div>
                </div>
              </GlassEffect>

              <GlassEffect className="rounded-2xl p-4">
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full bg-transparent text-white placeholder:text-white/30 text-sm outline-none"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </GlassEffect>
              <div className="h-2" />
              <GlassEffect className="rounded-2xl p-4">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-transparent text-white placeholder:text-white/30 text-sm outline-none"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </GlassEffect>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button className="text-white/40 hover:text-white text-sm transition-colors" onClick={() => setStep("datetime")}>← Back</button>
              <GlassButton
                onClick={() => setStep("done")}
                className="px-8 py-3 text-white text-sm font-semibold"
                style={{ background: "rgba(20,71,230,0.5)" }}
              >
                Confirm Booking
              </GlassButton>
            </div>
          </div>
        )}

        {/* ── DONE ── */}
        {step === "done" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{ background: "rgba(255,255,255,0.15)", boxShadow: "0 0 30px rgba(255,255,255,0.1)" }}>
              ✓
            </div>
            <h3 className="font-display font-bold text-white text-2xl">Booking Confirmed!</h3>
            <p className="text-white/60 text-sm max-w-xs" style={{ fontFamily: "var(--font-inter)" }}>
              Your {service?.name} is booked for {selectedDate} at {selectedTime}. A confirmation has been sent to your email.
            </p>
            <GlassButton
              onClick={() => { setStep("service"); setSelectedService(null); setSelectedDate(null); setSelectedTime(null); }}
              className="mt-2 px-8 py-3 text-white text-sm font-semibold"
            >
              Book Another →
            </GlassButton>
          </div>
        )}
      </div>
    </div>
  );
}
