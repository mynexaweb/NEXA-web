'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function AndroidRobot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gaze, setGaze] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = (e.clientX - cx) / (rect.width * 0.5);
      const ny = (e.clientY - cy) / (rect.height * 0.5);
      setGaze({
        x: Math.max(-1, Math.min(1, nx)) * 16,
        y: Math.max(-1, Math.min(1, ny)) * 10,
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-end justify-center pb-4 overflow-hidden"
    >
      {/* floor reflection */}
      <div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 200,
          height: 16,
          background: 'rgba(239,68,68,0.25)',
          filter: 'blur(18px)',
          borderRadius: '50%',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: 'min(270px, 78%)',
          filter:
            'drop-shadow(0 0 36px rgba(239,68,68,0.45)) drop-shadow(0 14px 70px rgba(0,0,0,0.92))',
        }}
      >
        <svg
          viewBox="0 0 280 590"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: '100%',
            height: 'auto',
            transform: `perspective(1100px) rotateY(${gaze.x * 0.45}deg) rotateX(${-gaze.y * 0.28}deg)`,
            transition: 'transform 0.22s cubic-bezier(0.2, 0, 0, 1)',
          }}
        >
          <defs>
            {/* Glossy black — subtle blue-steel sheen, center light */}
            <radialGradient id="bkC" cx="42%" cy="28%" r="68%">
              <stop offset="0%" stopColor="#2c2c42" />
              <stop offset="48%" stopColor="#0e0e1c" />
              <stop offset="100%" stopColor="#04040a" />
            </radialGradient>
            {/* Limb — left-edge highlight */}
            <radialGradient id="bkL" cx="22%" cy="32%" r="78%">
              <stop offset="0%" stopColor="#383852" />
              <stop offset="42%" stopColor="#0c0c1a" />
              <stop offset="100%" stopColor="#030308" />
            </radialGradient>
            {/* Limb — right-edge highlight */}
            <radialGradient id="bkR" cx="78%" cy="32%" r="78%">
              <stop offset="0%" stopColor="#383852" />
              <stop offset="42%" stopColor="#0c0c1a" />
              <stop offset="100%" stopColor="#030308" />
            </radialGradient>
            {/* Chrome ball joint — bright specular */}
            <radialGradient id="ball" cx="33%" cy="26%" r="64%">
              <stop offset="0%" stopColor="#f4f4fc" />
              <stop offset="28%" stopColor="#c0c0d8" />
              <stop offset="62%" stopColor="#5a5a78" />
              <stop offset="100%" stopColor="#10101e" />
            </radialGradient>
            {/* Chrome horizontal bar */}
            <linearGradient id="chrH" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0c0c14" />
              <stop offset="22%" stopColor="#8888a8" />
              <stop offset="50%" stopColor="#e8e8f8" />
              <stop offset="78%" stopColor="#8888a8" />
              <stop offset="100%" stopColor="#0c0c14" />
            </linearGradient>
            {/* Chrome vertical bar */}
            <linearGradient id="chrV" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d0d0e8" />
              <stop offset="42%" stopColor="#686888" />
              <stop offset="100%" stopColor="#0a0a14" />
            </linearGradient>
            {/* Pauldron left */}
            <linearGradient id="plL" x1="0%" y1="0%" x2="105%" y2="100%">
              <stop offset="0%" stopColor="#545470" />
              <stop offset="32%" stopColor="#161628" />
              <stop offset="100%" stopColor="#04040c" />
            </linearGradient>
            {/* Pauldron right */}
            <linearGradient id="plR" x1="100%" y1="0%" x2="-5%" y2="100%">
              <stop offset="0%" stopColor="#545470" />
              <stop offset="32%" stopColor="#161628" />
              <stop offset="100%" stopColor="#04040c" />
            </linearGradient>
            {/* Reactor glow */}
            <radialGradient id="rc" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" />
              <stop offset="20%" stopColor="#ef4444" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>
            {/* Head dome */}
            <radialGradient id="head" cx="38%" cy="22%" r="72%">
              <stop offset="0%" stopColor="#363650" />
              <stop offset="44%" stopColor="#12121e" />
              <stop offset="100%" stopColor="#04040a" />
            </radialGradient>
          </defs>

          {/* ════════════════════ PAULDRONS ════════════════════ */}
          {/* Left */}
          <path
            d="M 10 70 C 14 54,34 52,56 55 L 124 63 C 132 65,136 73,136 82 L 130 124 C 128 132,120 135,110 132 L 16 122 C 8 120,4 114,6 106 Z"
            fill="url(#plL)"
          />
          <path d="M 10 70 L 124 63 L 124 73 L 12 79 Z" fill="rgba(200,200,235,0.18)" />
          <path d="M 122 65 L 130 122" stroke="rgba(150,150,200,0.28)" strokeWidth="1.2" />

          {/* Right */}
          <path
            d="M 270 70 C 266 54,246 52,224 55 L 156 63 C 148 65,144 73,144 82 L 150 124 C 152 132,160 135,170 132 L 264 122 C 272 120,276 114,274 106 Z"
            fill="url(#plR)"
          />
          <path d="M 270 70 L 156 63 L 156 73 L 268 79 Z" fill="rgba(200,200,235,0.18)" />
          <path d="M 158 65 L 150 122" stroke="rgba(150,150,200,0.28)" strokeWidth="1.2" />

          {/* ════════════════════ LEFT ARM ════════════════════ */}
          {/* Shoulder ball */}
          <circle cx="36" cy="122" r="24" fill="url(#ball)" />
          {/* Upper arm */}
          <path d="M 8 118 C 0 140,-2 178,4 222 L 68 222 C 74 178,72 140,64 118 Z" fill="url(#bkL)" />
          {/* Bicep highlight crease */}
          <path d="M 22 126 C 18 160,20 196,22 219" stroke="rgba(90,90,140,0.3)" strokeWidth="0.9" fill="none" />
          {/* Elbow ball */}
          <circle cx="36" cy="224" r="18" fill="url(#ball)" />
          {/* Forearm */}
          <path d="M 6 226 C 0 262,2 300,10 328 L 62 328 C 70 300,72 262,66 226 Z" fill="url(#bkL)" />
          {/* Wrist chrome ring */}
          <ellipse cx="36" cy="328" rx="28" ry="9" fill="url(#chrH)" opacity="0.82" />
          {/* Fist */}
          <path
            d="M 4 334 L 68 334 C 76 334,80 339,80 347 L 80 382 C 80 390,76 394,68 394 L 4 394 C -4 394,-8 390,-8 382 L -8 347 C -8 339,-4 334,4 334 Z"
            fill="url(#bkL)"
          />
          {/* Knuckle chrome */}
          <path d="M 0 334 L 76 334 L 76 344 L 0 344 Z" fill="url(#chrH)" opacity="0.72" />
          <line x1="24" y1="336" x2="24" y2="392" stroke="rgba(70,70,110,0.3)" strokeWidth="0.8" />
          <line x1="52" y1="336" x2="52" y2="392" stroke="rgba(70,70,110,0.3)" strokeWidth="0.8" />

          {/* ════════════════════ RIGHT ARM ════════════════════ */}
          <circle cx="244" cy="122" r="24" fill="url(#ball)" />
          <path d="M 272 118 C 280 140,282 178,276 222 L 212 222 C 206 178,208 140,216 118 Z" fill="url(#bkR)" />
          <path d="M 258 126 C 262 160,260 196,258 219" stroke="rgba(90,90,140,0.3)" strokeWidth="0.9" fill="none" />
          <circle cx="244" cy="224" r="18" fill="url(#ball)" />
          <path d="M 274 226 C 280 262,278 300,270 328 L 218 328 C 210 300,208 262,214 226 Z" fill="url(#bkR)" />
          <ellipse cx="244" cy="328" rx="28" ry="9" fill="url(#chrH)" opacity="0.82" />
          <path
            d="M 276 334 L 212 334 C 204 334,200 339,200 347 L 200 382 C 200 390,204 394,212 394 L 276 394 C 284 394,288 390,288 382 L 288 347 C 288 339,284 334,276 334 Z"
            fill="url(#bkR)"
          />
          <path d="M 280 334 L 204 334 L 204 344 L 280 344 Z" fill="url(#chrH)" opacity="0.72" />
          <line x1="256" y1="336" x2="256" y2="392" stroke="rgba(70,70,110,0.3)" strokeWidth="0.8" />
          <line x1="228" y1="336" x2="228" y2="392" stroke="rgba(70,70,110,0.3)" strokeWidth="0.8" />

          {/* ════════════════════ CHEST ════════════════════ */}
          {/* Main torso */}
          <path
            d="M 80 96 C 80 88,96 86,114 88 L 166 88 C 184 86,200 88,200 96 L 198 260 C 198 268,188 272,174 270 L 106 270 C 92 272,82 268,82 260 Z"
            fill="url(#bkC)"
          />
          {/* Left pec plate */}
          <path
            d="M 84 100 C 96 98,108 98,120 100 L 140 100 L 140 178 C 128 185,110 182,100 176 C 88 168,84 156,84 146 Z"
            fill="url(#bkL)"
            opacity="0.65"
          />
          {/* Right pec plate */}
          <path
            d="M 196 100 C 184 98,172 98,160 100 L 140 100 L 140 178 C 152 185,170 182,180 176 C 192 168,196 156,196 146 Z"
            fill="url(#bkR)"
            opacity="0.65"
          />
          {/* Sternum ridge */}
          <line x1="140" y1="92" x2="140" y2="268" stroke="rgba(55,55,90,0.55)" strokeWidth="1.6" />
          {/* Under-pec shadow */}
          <path
            d="M 86 186 C 104 200,124 205,140 205 C 156 205,176 200,194 186 L 194 200 C 176 215,156 219,140 219 C 124 219,104 215,86 200 Z"
            fill="rgba(0,0,10,0.52)"
          />

          {/* ════════════════════ REACTOR ════════════════════ */}
          <motion.circle
            cx="140" cy="164" r="34"
            fill="none" stroke="#ef4444" strokeWidth="0.8"
            animate={{ r: [34, 46, 34], opacity: [0.48, 0.04, 0.48] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <circle cx="140" cy="164" r="27" fill="none" stroke="#ef4444" strokeWidth="2.2" />
          <circle cx="140" cy="164" r="20" fill="none" stroke="#ef4444" strokeWidth="0.7" strokeDasharray="4 3.5" opacity="0.4" />
          <motion.circle
            cx="140" cy="164" r="20"
            fill="url(#rc)"
            animate={{ opacity: [0.28, 0.74, 0.28] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <circle cx="140" cy="164" r="10" fill="#ef4444" opacity="0.92" />
          <circle cx="140" cy="164" r="5" fill="white" opacity="0.97" />

          {/* ════════════════════ ABS ════════════════════ */}
          <path d="M 86 270 L 194 270 L 192 334 L 88 334 Z" fill="url(#bkC)" opacity="0.9" />
          <line x1="86" y1="290" x2="194" y2="290" stroke="rgba(50,50,80,0.42)" strokeWidth="1" />
          <line x1="86" y1="313" x2="194" y2="313" stroke="rgba(50,50,80,0.42)" strokeWidth="1" />
          <line x1="140" y1="270" x2="140" y2="334" stroke="rgba(50,50,80,0.48)" strokeWidth="1.2" />

          {/* ════════════════════ HIP BELT ════════════════════ */}
          <path d="M 84 334 L 196 334 L 198 362 L 82 362 Z" fill="url(#chrV)" opacity="0.88" />
          <path d="M 85 334 L 195 334 L 195 344 L 85 344 Z" fill="url(#chrH)" opacity="0.68" />

          {/* ════════════════════ THIGHS ════════════════════ */}
          {/* Left */}
          <path d="M 80 362 C 70 396,68 434,78 468 L 136 468 C 146 434,148 396,138 362 Z" fill="url(#bkL)" />
          <path d="M 96 366 C 92 398,94 434,96 466" stroke="rgba(55,55,88,0.28)" strokeWidth="0.9" fill="none" />
          {/* Right */}
          <path d="M 200 362 C 210 396,212 434,202 468 L 144 468 C 134 434,132 396,142 362 Z" fill="url(#bkR)" />
          <path d="M 184 366 C 188 398,186 434,184 466" stroke="rgba(55,55,88,0.28)" strokeWidth="0.9" fill="none" />

          {/* ════════════════════ KNEE BALLS ════════════════════ */}
          <circle cx="107" cy="470" r="23" fill="url(#ball)" />
          <circle cx="173" cy="470" r="23" fill="url(#ball)" />

          {/* ════════════════════ CALVES ════════════════════ */}
          {/* Left */}
          <path d="M 80 492 C 70 524,72 556,82 578 L 132 578 C 142 556,144 524,134 492 Z" fill="url(#bkL)" />
          {/* Right */}
          <path d="M 200 492 C 210 524,208 556,198 578 L 148 578 C 138 556,136 524,146 492 Z" fill="url(#bkR)" />

          {/* ════════════════════ BOOTS ════════════════════ */}
          <path
            d="M 62 576 L 144 576 C 154 576,158 580,158 587 L 158 586 C 158 588,154 590,144 590 L 62 590 C 52 590,48 588,48 586 L 48 587 C 48 580,52 576,62 576 Z"
            fill="url(#bkC)"
          />
          <path d="M 52 576 L 154 576 L 154 585 L 52 585 Z" fill="url(#chrH)" opacity="0.62" />
          <path
            d="M 136 576 L 218 576 C 228 576,232 580,232 587 L 232 586 C 232 588,228 590,218 590 L 136 590 C 126 590,122 588,122 586 L 122 587 C 122 580,126 576,136 576 Z"
            fill="url(#bkC)"
          />
          <path d="M 126 576 L 228 576 L 228 585 L 126 585 Z" fill="url(#chrH)" opacity="0.62" />

          {/* ════════════════════ NECK ════════════════════ */}
          <rect x="120" y="74" width="40" height="24" rx="7" fill="url(#bkC)" />
          <line x1="120" y1="80" x2="160" y2="80" stroke="rgba(85,85,130,0.42)" strokeWidth="0.9" />
          <line x1="120" y1="87" x2="160" y2="87" stroke="rgba(85,85,130,0.42)" strokeWidth="0.9" />
          <line x1="120" y1="93" x2="160" y2="93" stroke="rgba(85,85,130,0.42)" strokeWidth="0.9" />

          {/* ════════════════ HEAD — cursor tracking ════════════════ */}
          <g
            style={{
              transformOrigin: '140px 82px',
              transform: `rotate(${gaze.x * 0.65}deg) translateY(${gaze.y * 0.15}px)`,
              transition: 'transform 0.16s cubic-bezier(0.2, 0, 0, 1)',
            } as React.CSSProperties}
          >
            {/* Main skull dome */}
            <path
              d="M 106 20 C 106 7,120 3,140 3 C 160 3,174 7,174 20 L 176 68 C 176 77,162 80,140 80 C 118 80,104 77,104 68 Z"
              fill="url(#head)"
            />
            {/* Dome specular highlight */}
            <ellipse cx="137" cy="22" rx="22" ry="10" fill="rgba(110,110,160,0.26)" transform="rotate(-6 137 22)" />
            {/* Brow shadow */}
            <path d="M 106 32 L 174 32 L 174 38 L 106 38 Z" fill="rgba(0,0,8,0.55)" />
            {/* Temple panels */}
            <rect x="104" y="26" width="16" height="40" rx="4" fill="#080810" />
            <rect x="160" y="26" width="16" height="40" rx="4" fill="#080810" />
            <line x1="106" y1="36" x2="106" y2="62" stroke="rgba(75,75,120,0.38)" strokeWidth="0.8" />
            <line x1="174" y1="36" x2="174" y2="62" stroke="rgba(75,75,120,0.38)" strokeWidth="0.8" />
            {/* VISOR — red terminator slit */}
            <rect x="113" y="30" width="54" height="20" rx="5" fill="#ef4444" opacity="0.93" />
            <rect x="115" y="32" width="50" height="8" rx="3" fill="rgba(255,255,255,0.3)" />
            <rect x="111" y="28" width="58" height="24" rx="7" fill="none" stroke="#ef4444" strokeWidth="1.8" opacity="0.38" />
            {/* Chin plate */}
            <path
              d="M 114 54 L 166 54 C 171 54,174 57,174 62 L 174 74 C 174 79,171 82,166 82 L 114 82 C 109 82,106 79,106 74 L 106 62 C 106 57,109 54,114 54 Z"
              fill="#0a0a16"
            />
            <line x1="140" y1="54" x2="140" y2="82" stroke="rgba(65,65,105,0.32)" strokeWidth="0.8" />
            {/* Chin chrome edge */}
            <path d="M 110 80 L 170 80 L 170 82 L 110 82 Z" fill="url(#chrH)" opacity="0.45" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
