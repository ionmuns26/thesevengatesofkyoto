import React, { useMemo } from 'react';

export default function SakuraPetals({ count = 20 }) {
  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 8 + Math.random() * 12,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 15,
      alt: Math.random() > 0.5,
      opacity: 0.3 + Math.random() * 0.5,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className={p.alt ? 'sakura-petal-alt' : 'sakura-petal'}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: '-20px',
            width: `${p.size}px`,
            height: `${p.size * 0.7}px`,
            background: `radial-gradient(ellipse at 30% 30%, rgba(255, 183, 197, ${p.opacity}), rgba(255, 130, 150, ${p.opacity * 0.6}))`,
            borderRadius: '50% 0 50% 0',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  );
}