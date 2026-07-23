import React from 'react';

export default function DragonBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">

      {/* ── Base parchment gradient ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 15% 85%, rgba(120,75,25,0.28) 0%, transparent 50%),
            radial-gradient(ellipse at 85% 15%, rgba(100,55,18,0.22) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 55%, rgba(80,40,10,0.14) 0%, transparent 65%),
            linear-gradient(165deg,
              rgba(22,12,5,1) 0%,
              rgba(28,15,6,1) 25%,
              rgba(24,13,5,1) 50%,
              rgba(32,18,7,1) 75%,
              rgba(18,10,4,1) 100%
            )
          `,
        }}
      />

      {/* ── Ink-wash paper grain ── */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.055,
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")
          `,
          backgroundSize: '400px 400px',
        }}
      />

      {/* ── Horizontal paper fiber lines (washi texture) ── */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            180deg,
            transparent 0px,
            transparent 3px,
            rgba(210,175,100,0.6) 3px,
            rgba(210,175,100,0.6) 3.5px
          )`,
        }}
      />

      {/* ── Diagonal ink wash streaks (brush strokes) ── */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            125deg,
            transparent 0px,
            transparent 18px,
            rgba(180,140,70,0.4) 18px,
            rgba(180,140,70,0.4) 18.8px,
            transparent 18.8px,
            transparent 36px
          )`,
        }}
      />

      {/* ── Ink bleed corners (aged paper) ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 0% 0%, rgba(90,50,15,0.22) 0%, transparent 35%),
            radial-gradient(ellipse at 100% 0%, rgba(80,40,12,0.18) 0%, transparent 30%),
            radial-gradient(ellipse at 0% 100%, rgba(100,55,18,0.25) 0%, transparent 35%),
            radial-gradient(ellipse at 100% 100%, rgba(90,50,15,0.20) 0%, transparent 32%)
          `,
        }}
      />

      {/* ── Main ink painting SVG ── */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 700"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Ink brush displacement — rough edges */}
          <filter id="inkBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="4" seed="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" result="disp"/>
            <feGaussianBlur stdDeviation="0.8" in="disp"/>
          </filter>
          {/* Soft brush bleed */}
          <filter id="softBlur">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
          {/* Mountain ink texture */}
          <filter id="mountainBlur" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.45" numOctaves="3" seed="5" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" result="rough"/>
            <feGaussianBlur stdDeviation="1.0" in="rough"/>
          </filter>
          {/* Mist / atmosphere */}
          <filter id="mistBlur">
            <feGaussianBlur stdDeviation="9" />
          </filter>
          {/* Rough brush-stroke edge for foreground elements */}
          <filter id="brushStroke" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="turbulence" baseFrequency="0.9" numOctaves="3" seed="8" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" result="rough"/>
            <feGaussianBlur stdDeviation="0.5" in="rough"/>
          </filter>
          <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,240,200,0.18)" />
            <stop offset="60%" stopColor="rgba(255,220,150,0.06)" />
            <stop offset="100%" stopColor="rgba(255,200,100,0)" />
          </radialGradient>
          <radialGradient id="moonCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,248,220,0.22)" />
            <stop offset="70%" stopColor="rgba(240,220,170,0.12)" />
            <stop offset="100%" stopColor="rgba(220,190,130,0)" />
          </radialGradient>
          <linearGradient id="mistGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(180,150,100,0)" />
            <stop offset="50%" stopColor="rgba(180,150,100,0.07)" />
            <stop offset="100%" stopColor="rgba(180,150,100,0)" />
          </linearGradient>
          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(30,50,80,0.15)" />
            <stop offset="100%" stopColor="rgba(10,20,40,0.25)" />
          </linearGradient>
          <clipPath id="screenClip">
            <rect width="1000" height="700" />
          </clipPath>
        </defs>

        <g clipPath="url(#screenClip)">

          {/* ── Distant moon / sun ── */}
          <ellipse cx="780" cy="100" rx="90" ry="90" fill="url(#moonGlow)" filter="url(#mistBlur)" />
          <ellipse cx="780" cy="100" rx="55" ry="55" fill="url(#moonCore)" filter="url(#softBlur)" />
          <ellipse cx="780" cy="100" rx="32" ry="32" fill="rgba(255,248,220,0.09)" />

          {/* ── Far distant mountains (lightest, farthest) ── */}
          <path
            d="M-50 480 Q80 300 180 340 Q260 370 320 290 Q380 210 450 260 Q510 300 560 240 Q620 170 680 220 Q730 260 780 190 Q830 130 900 180 Q950 220 1060 200 L1060 700 L-50 700 Z"
            fill="rgba(80,40,20,0.07)"
            filter="url(#mistBlur)"
          />

          {/* ── Mid mountains layer 1 ── */}
          <path
            d="M-50 520 Q60 370 150 400 Q220 425 290 350 Q350 285 420 320 Q480 350 530 280 Q590 210 650 255 Q700 290 750 230 Q800 170 870 210 Q920 240 1060 280 L1060 700 L-50 700 Z"
            fill="rgba(60,30,10,0.11)"
            filter="url(#mountainBlur)"
          />

          {/* ── Mid mountains layer 2 (ink-washed) ── */}
          <path
            d="M-50 560 Q40 420 130 450 Q210 475 270 400 Q330 330 400 370 Q460 400 510 340 Q560 280 620 315 Q670 345 720 285 Q770 228 840 260 Q900 290 1060 340 L1060 700 L-50 700 Z"
            fill="rgba(50,22,8,0.16)"
            filter="url(#inkBlur)"
          />

          {/* ── Foreground mountain left ── */}
          <path
            d="M-50 700 Q0 580 80 520 Q140 475 200 490 Q240 498 280 540 Q310 570 350 600 L350 700 Z"
            fill="rgba(30,12,4,0.55)"
          />

          {/* ── Foreground mountain right ── */}
          <path
            d="M700 700 Q750 580 830 510 Q890 460 950 480 Q990 495 1060 560 L1060 700 Z"
            fill="rgba(30,12,4,0.45)"
          />

          {/* ── Cliff / rocky outcrop center-left ── */}
          <path
            d="M120 700 Q150 640 180 610 Q210 582 240 595 Q265 606 280 640 Q295 665 300 700 Z"
            fill="rgba(25,10,3,0.7)"
          />

          {/* ── Mist bands across mid-ground ── */}
          <rect x="-50" y="420" width="1100" height="60" fill="url(#mistGrad)" filter="url(#mistBlur)" opacity="0.9" />
          <rect x="-50" y="490" width="1100" height="50" fill="url(#mistGrad)" filter="url(#mistBlur)" opacity="0.7" />
          <rect x="-50" y="540" width="1100" height="40" fill="rgba(160,130,90,0.04)" filter="url(#mistBlur)" />

          {/* ── Water / river at base ── */}
          <path
            d="M-50 640 Q200 620 400 635 Q600 650 800 628 Q950 615 1060 630 L1060 700 L-50 700 Z"
            fill="url(#waterGrad)"
          />
          {/* Water ripples */}
          {[0,1,2,3,4,5].map(i => (
            <line
              key={i}
              x1={80 + i * 150}
              y1={655 + (i % 2) * 8}
              x2={180 + i * 150}
              y2={655 + (i % 2) * 8}
              stroke="rgba(180,160,120,0.07)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          ))}

          {/* ── Bamboo left cluster ── */}
          <BambooCluster x={70} baseY={700} count={5} />

          {/* ── Bamboo right cluster ── */}
          <BambooCluster x={880} baseY={700} count={4} />

          {/* ── Pine trees on distant ridge ── */}
          <PineTree x={420} y={310} scale={0.7} opacity={0.12} />
          <PineTree x={460} y={295} scale={0.55} opacity={0.1} />
          <PineTree x={560} y={265} scale={0.65} opacity={0.1} />

          {/* ── Hanging willow / plum branch top-left ── */}
          <path
            d="M0 0 Q60 40 40 120 Q30 160 60 180"
            stroke="rgba(80,35,10,0.35)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M40 60 Q70 80 55 130" stroke="rgba(80,35,10,0.2)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M50 90 Q90 100 80 150" stroke="rgba(80,35,10,0.18)" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Plum blossoms */}
          {[[55,130],[80,150],[60,180],[45,110]].map(([bx,by],i) => (
            <circle key={i} cx={bx} cy={by} r="4" fill="rgba(200,80,80,0.18)" filter="url(#softBlur)" />
          ))}

          {/* ── Hanging branch top-right ── */}
          <path
            d="M1000 0 Q940 50 960 130 Q970 170 940 200"
            stroke="rgba(80,35,10,0.3)"
            strokeWidth="4.5"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M960 70 Q920 90 935 150" stroke="rgba(80,35,10,0.18)" strokeWidth="2" fill="none" strokeLinecap="round" />
          {[[935,150],[960,130],[940,200]].map(([bx,by],i) => (
            <circle key={i} cx={bx} cy={by} r="3.5" fill="rgba(200,80,80,0.15)" filter="url(#softBlur)" />
          ))}

          {/* ── Flying cranes ── */}
          <Crane x={320} y={155} scale={1} opacity={0.22} />
          <Crane x={360} y={140} scale={0.8} opacity={0.16} />
          <Crane x={295} y={170} scale={0.65} opacity={0.13} />

          {/* ── Ink splatter / wash marks ── */}
          <ellipse cx="500" cy="360" rx="280" ry="30" fill="rgba(40,18,5,0.05)" filter="url(#mistBlur)" />
          <ellipse cx="200" cy="500" rx="150" ry="20" fill="rgba(40,18,5,0.06)" filter="url(#mistBlur)" />

          {/* ── Chinese seal / stamp top right corner ── */}
          <rect x="900" y="30" width="55" height="55" rx="3" fill="rgba(160,30,30,0.12)" stroke="rgba(160,30,30,0.25)" strokeWidth="1" />
          <text x="927" y="67" textAnchor="middle" fontFamily="serif" fontSize="22" fill="rgba(160,30,30,0.3)" fontWeight="bold">京</text>

          {/* ── Vertical Chinese poetry text ── */}
          <text
            x="950" y="160"
            fontFamily="serif"
            fontSize="13"
            fill="rgba(180,140,80,0.12)"
            writingMode="tb"
            letterSpacing="6"
          >
            千年古都七門
          </text>
          <text
            x="930" y="160"
            fontFamily="serif"
            fontSize="13"
            fill="rgba(180,140,80,0.09)"
            writingMode="tb"
            letterSpacing="6"
          >
            帝王之路始今
          </text>

          {/* ── Ink wash drips / runs ── */}
          <path d="M200 0 Q202 40 199 80 Q197 110 201 140" stroke="rgba(30,12,4,0.08)" strokeWidth="8" fill="none" strokeLinecap="round" filter="url(#softBlur)" />
          <path d="M700 0 Q703 50 698 90" stroke="rgba(30,12,4,0.06)" strokeWidth="6" fill="none" strokeLinecap="round" filter="url(#softBlur)" />
          <path d="M450 0 Q447 30 452 60" stroke="rgba(30,12,4,0.05)" strokeWidth="5" fill="none" strokeLinecap="round" filter="url(#softBlur)" />

          {/* ── Large sweeping ink brush strokes across background ── */}
          <path
            d="M-50 180 Q200 155 400 170 Q600 185 800 162 Q950 148 1060 165"
            stroke="rgba(40,20,6,0.06)"
            strokeWidth="28"
            fill="none"
            strokeLinecap="round"
            filter="url(#mistBlur)"
          />
          <path
            d="M-50 320 Q150 300 350 318 Q550 336 750 310 Q900 292 1060 305"
            stroke="rgba(35,16,5,0.05)"
            strokeWidth="22"
            fill="none"
            strokeLinecap="round"
            filter="url(#mistBlur)"
          />
          <path
            d="M-50 480 Q250 460 500 472 Q720 484 1060 462"
            stroke="rgba(30,14,4,0.07)"
            strokeWidth="18"
            fill="none"
            strokeLinecap="round"
            filter="url(#mistBlur)"
          />

          {/* ── Parchment age stain blobs ── */}
          <ellipse cx="140" cy="280" rx="90" ry="50" fill="rgba(120,75,20,0.05)" filter="url(#mistBlur)" />
          <ellipse cx="820" cy="450" rx="110" ry="60" fill="rgba(100,60,15,0.04)" filter="url(#mistBlur)" />
          <ellipse cx="500" cy="200" rx="130" ry="45" fill="rgba(110,65,18,0.03)" filter="url(#mistBlur)" />
          <ellipse cx="300" cy="600" rx="80" ry="35" fill="rgba(90,50,12,0.05)" filter="url(#mistBlur)" />

          {/* ── Fine horizontal brush scratch lines ── */}
          {[90, 210, 330, 450, 560, 640].map((y, i) => (
            <path
              key={i}
              d={`M${20 + i * 30} ${y} Q${300 + i * 20} ${y + (i % 2 === 0 ? -8 : 8)} ${700 - i * 10} ${y + 3} Q${900} ${y - 5} ${1000} ${y}`}
              stroke={`rgba(50,25,8,${0.018 + i * 0.004})`}
              strokeWidth={0.6 + i * 0.1}
              fill="none"
              strokeLinecap="round"
            />
          ))}

        </g>
      </svg>

      {/* ── Warm parchment midtone wash ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 40% at 50% 60%, rgba(140,90,30,0.06) 0%, transparent 100%),
            radial-gradient(ellipse 100% 30% at 50% 100%, rgba(100,55,15,0.12) 0%, transparent 70%)
          `,
          mixBlendMode: 'screen',
        }}
      />

      {/* ── Ink seepage veins (very subtle crackle) ── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }}>
        <filter id="crackle">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="6" seed="12" result="noise"/>
          <feColorMatrix type="matrix"
            values="0 0 0 0 0.18
                    0 0 0 0 0.09
                    0 0 0 0 0.03
                    0 0 0 12 -9"
            in="noise"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#crackle)" />
      </svg>

      {/* ── Bottom ground dark band ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(0deg, rgba(8,3,1,0.95) 0%, transparent 100%)',
        }}
      />

      {/* ── Top vignette ── */}
      <div
        className="absolute top-0 left-0 right-0 h-48"
        style={{
          background: 'linear-gradient(180deg, rgba(8,3,1,0.6) 0%, transparent 100%)',
        }}
      />

      {/* ── Side vignetttes ── */}
      <div
        className="absolute inset-y-0 left-0 w-32"
        style={{ background: 'linear-gradient(90deg, rgba(8,3,1,0.5) 0%, transparent 100%)' }}
      />
      <div
        className="absolute inset-y-0 right-0 w-32"
        style={{ background: 'linear-gradient(270deg, rgba(8,3,1,0.5) 0%, transparent 100%)' }}
      />
    </div>
  );
}

/* ── Helper: Bamboo cluster ── */
function BambooCluster({ x, baseY, count }) {
  const stalks = Array.from({ length: count }, (_, i) => ({
    dx: (i - count / 2) * 18 + (Math.random() * 6 - 3),
    height: 180 + Math.random() * 80,
    width: 5 + Math.random() * 4,
    opacity: 0.25 + Math.random() * 0.3,
    lean: (Math.random() - 0.5) * 20,
  }));

  return (
    <g>
      {stalks.map((s, i) => {
        const sx = x + s.dx;
        const topY = baseY - s.height;
        return (
          <g key={i}>
            {/* Stalk */}
            <path
              d={`M${sx} ${baseY} Q${sx + s.lean * 0.5} ${baseY - s.height * 0.5} ${sx + s.lean} ${topY}`}
              stroke={`rgba(40,70,30,${s.opacity})`}
              strokeWidth={s.width}
              fill="none"
              strokeLinecap="round"
            />
            {/* Nodes */}
            {[0.25, 0.5, 0.75].map((t, j) => {
              const ny = baseY - s.height * t;
              const nx = sx + s.lean * t;
              return (
                <line key={j}
                  x1={nx - s.width * 1.2} y1={ny}
                  x2={nx + s.width * 1.2} y2={ny}
                  stroke={`rgba(60,90,40,${s.opacity * 0.8})`}
                  strokeWidth={s.width * 0.8}
                />
              );
            })}
            {/* Leaves */}
            {[0.4, 0.65, 0.85].map((t, j) => {
              const ly = baseY - s.height * t;
              const lx = sx + s.lean * t;
              const dir = j % 2 === 0 ? 1 : -1;
              return (
                <path
                  key={j}
                  d={`M${lx} ${ly} Q${lx + dir * 25} ${ly - 15} ${lx + dir * 40} ${ly - 5}`}
                  stroke={`rgba(40,80,30,${s.opacity * 0.9})`}
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              );
            })}
          </g>
        );
      })}
    </g>
  );
}

/* ── Helper: Pine tree silhouette ── */
function PineTree({ x, y, scale = 1, opacity = 0.15 }) {
  const h = 80 * scale;
  const w = 30 * scale;
  return (
    <g opacity={opacity}>
      <path
        d={`M${x} ${y} L${x - w} ${y + h} L${x + w} ${y + h} Z`}
        fill={`rgba(30,50,20,0.9)`}
      />
      <path
        d={`M${x} ${y + h * 0.3} L${x - w * 1.3} ${y + h * 0.9} L${x + w * 1.3} ${y + h * 0.9} Z`}
        fill={`rgba(30,50,20,0.9)`}
      />
      <rect x={x - 3 * scale} y={y + h * 0.9} width={6 * scale} height={15 * scale} fill={`rgba(50,30,10,0.8)`} />
    </g>
  );
}

/* ── Helper: Flying crane ── */
function Crane({ x, y, scale = 1, opacity = 0.2 }) {
  return (
    <g opacity={opacity} transform={`translate(${x},${y}) scale(${scale})`}>
      {/* Body */}
      <ellipse cx="0" cy="0" rx="10" ry="4" fill="rgba(220,210,190,0.9)" />
      {/* Left wing */}
      <path d="M-2 -1 Q-20 -18 -30 -8 Q-20 -4 -2 1" fill="rgba(220,210,190,0.85)" />
      {/* Right wing */}
      <path d="M2 -1 Q20 -18 30 -8 Q20 -4 2 1" fill="rgba(220,210,190,0.85)" />
      {/* Neck & head */}
      <path d="M8 -1 Q18 -8 22 -12" stroke="rgba(200,190,170,0.9)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="22" cy="-13" r="3" fill="rgba(200,190,170,0.9)" />
      {/* Red crown */}
      <circle cx="22" cy="-16" r="2" fill="rgba(180,30,30,0.7)" />
      {/* Tail */}
      <path d="M-10 0 Q-22 5 -28 10" stroke="rgba(200,190,170,0.8)" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  );
}