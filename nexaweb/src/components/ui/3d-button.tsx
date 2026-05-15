'use client';

import React from 'react';

interface GymButtonProps {
  text1?: string;
  text2?: string;
  onClick?: () => void;
  className?: string;
}

export function GymButton({
  text1 = 'Start Free Trial',
  text2 = 'Join Now',
  onClick,
  className = '',
}: GymButtonProps) {
  const chars1 = Array.from(text1);
  const chars2 = Array.from(text2);

  return (
    <button className={`gym-btn ${className}`} onClick={onClick} type="button">
      <div className="gym-btn__bg" />

      {/* Click splash rays */}
      <svg
        className="gym-btn__splash"
        xmlns="http://www.w3.org/2000/svg"
        width="280"
        height="120"
        viewBox="0 0 280 120"
        fill="none"
        aria-hidden="true"
      >
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 140 + Math.cos(angle) * 22;
          const y1 = 60 + Math.sin(angle) * 13;
          const x2 = 140 + Math.cos(angle) * 56;
          const y2 = 60 + Math.sin(angle) * 32;
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#ef4444"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      <div className="gym-btn__wrap">
        <div className="gym-btn__outline" />

        <div className="gym-btn__content">
          {/* Text state container */}
          <div className="gym-btn__texts">
            <span className="gym-btn__text gym-btn__text--1">
              {chars1.map((char, i) => (
                <span key={i} style={{ '--i': i } as React.CSSProperties}>
                  {char === ' ' ? ' ' : char}
                </span>
              ))}
            </span>
            <span className="gym-btn__text gym-btn__text--2" aria-hidden="true">
              {chars2.map((char, i) => (
                <span key={i} style={{ '--i': i } as React.CSSProperties}>
                  {char === ' ' ? ' ' : char}
                </span>
              ))}
            </span>
          </div>

          {/* Arrow */}
          <span className="gym-btn__arrow" aria-hidden="true">
            <span className="gym-btn__arrow-shaft" />
          </span>
        </div>
      </div>
    </button>
  );
}
