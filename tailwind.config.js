import React from 'react';

export default function InkWashTexture() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">

      {/* ── Base parchment gradient — aged Chinese paper ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 160% 80% at 50% 0%,   rgba(60,25,8,0.55)  0%, transparent 60%),
            radial-gradient(ellipse 100% 60% at 0%   50%,  rgba(50,20,5,0.30)  0%, transparent 55%),
            radial-gradient(ellipse 100% 60% at 100% 50%,  rgba(45,18,5,0.25)  0%, transparent 55%),
            radial-gradient(ellipse 120% 80% at 50% 100%,  rgba(30,10,2,0.70)  0%, transparent 65%),
            linear-gradient(170deg, rgba(32,14,5,0.6) 0%, rgba(18,7,2,0.85) 55%, rgba(12,4,1,0.95) 100%)
          `,
        }}
      />

      {/* ── Parchment paper fibre texture via SVG feTurbulence ── */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <filter id="paper">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72 0.55"
            numOctaves="5"
            seed="3"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" in="noise" result="gray" />
          <feBlend in="SourceGraphic" in2="gray" mode="multiply" />
        </filter>
        <rect width="100%" height="100%" filter="url(#paper)" fill="rgba(220,185,130,1)" />
      </svg>

      {/* ── Ink bleed / wash edges — dark pooling at corners ── */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="inkBleed">
            <feTurbulence type="turbulence" baseFrequency="0.018 0.024" numOctaves="4" seed="7" result="turb" />
            <feDisplacementMap in="SourceGraphic" in2="turb" scale="28" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <radialGradient id="cornerTL" cx="0%" cy="0%" r="55%">
            <stop offset="0%"   stopColor="rgba(12,4,1,0.75)" />
            <stop offset="60%"  stopColor="rgba(12,4,1,0.15)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="cornerTR" cx="100%" cy="0%" r="50%">
            <stop offset="0%"   stopColor="rgba(12,4,1,0.65)" />
            <stop offset="60%"  stopColor="rgba(12,4,1,0.10)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="cornerBL" cx="0%" cy="100%" r="50%">
            <stop offset="0%"   stopColor="rgba(8,3,1,0.80)" />
            <stop offset="55%"  stopColor="rgba(8,3,1,0.18)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="cornerBR" cx="100%" cy="100%" r="50%">
            <stop offset="0%"   stopColor="rgba(8,3,1,0.80)" />
            <stop offset="55%"  stopColor="rgba(8,3,1,0.18)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Ink-bleed corner washes */}
        <rect width="100%" height="100%" fill="url(#cornerTL)" filter="url(#inkBleed)" />
        <rect width="100%" height="100%" fill="url(#cornerTR)" filter="url(#inkBleed)" />
        <rect width="100%" height="100%" fill="url(#cornerBL)" filter="url(#inkBleed)" />
        <rect width="100%" height="100%" fill="url(#cornerBR)" filter="url(#inkBleed)" />
      </svg>

      {/* ── Horizontal ink-wash bands — layered washes like Xieyi painting ── */}
      <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="washBlur">
            <feGaussianBlur stdDeviation="22" />
          </filter>
          <linearGradient id="wash1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(180,100,30,0)" />
            <stop offset="25%"  stopColor="rgba(80,30,8,0.18)" />
            <stop offset="75%"  stopColor="rgba(60,20,5,0.12)" />
            <stop offset="100%" stopColor="rgba(180,100,30,0)" />
          </linearGradient>
          <linearGradient id="wash2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(100,40,10,0)" />
            <stop offset="40%"  stopColor="rgba(50,18,4,0.14)" />
            <stop offset="70%"  stopColor="rgba(40,14,3,0.10)" />
            <stop offset="100%" stopColor="rgba(100,40,10,0)" />
          </linearGradient>
        </defs>
        <rect x="0" y="18%" width="100%" height="12%" fill="url(#wash1)" filter="url(#washBlur)" />
        <rect x="0" y="42%" width="100%" height="10%" fill="url(#wash2)" filter="url(#washBlur)" />
        <rect x="0" y="66%" width="100%" height="14%" fill="url(#wash1)" filter="url(#washBlur)" />
      </svg>

      {/* ── Subtle vertical brush strokes — like ink pressed into paper ── */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.055]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="strokeBlur">
            <feGaussianBlur stdDeviation="4 1" />
          </filter>
        </defs>
        {[8, 19, 31, 44, 56, 67, 79, 91].map((pct, i) => (
          <rect
            key={i}
            x={`${pct}%`}
            y={`${5 + (i % 3) * 8}%`}
            width={`${0.4 + (i % 2) * 0.3}%`}
            height={`${55 + (i % 4) * 10}%`}
            fill="rgba(200,160,90,0.9)"
            rx="4"
            filter="url(#strokeBlur)"
          />
        ))}
      </svg>

      {/* ── Gold/bronze ink-wash tonal glow at center ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 45%, rgba(100,55,12,0.10) 0%, transparent 70%)`,
        }}
      />

      {/* ── Aged paper foxing spots ── */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        {[
          [10,15,18],[88,8,12],[5,75,20],[92,82,14],[30,55,10],[72,30,16],
          [50,20,8],[15,90,12],[80,60,9],[40,80,15],[60,10,11],[25,40,7],
        ].map(([cx, cy, r], i) => (
          <circle key={i} cx={`${cx}%`} cy={`${cy}%`} r={r} fill="rgba(140,80,20,0.8)" />
        ))}
      </svg>

      {/* ── Final ink vignette ── */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 120px rgba(8,3,1,0.70), inset 0 0 60px rgba(8,3,1,0.40)',
        }}
      />
    </div>
  );
}