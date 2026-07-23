import React from 'react';

export default function FogEffect() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      <div
        className="fog-layer absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(200,200,200,0.06) 30%, rgba(200,200,200,0.1) 50%, rgba(200,200,200,0.06) 70%, transparent)',
          height: '40%',
          top: '60%',
        }}
      />
      <div
        className="fog-layer absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(180,160,140,0.05) 40%, rgba(180,160,140,0.08) 60%, transparent)',
          height: '30%',
          top: '70%',
          animationDelay: '10s',
          animationDuration: '25s',
        }}
      />
    </div>
  );
}