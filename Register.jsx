import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import SakuraPetals from '@/components/effects/SakuraPetals';
import FogEffect from '@/components/effects/FogEffect';
import BackgroundSlider from '@/components/effects/BackgroundSlider';
import GateMap from '@/components/game/GateMap';
import GateChallenge from '@/components/game/GateChallenge';
import FinalGate from '@/components/game/FinalGate';
import { GATE_POOLS } from '@/lib/gateData';
import { getGateLockoutRemaining } from '@/lib/gateLockout';

const STORAGE_KEY = 'sevengates_progress';

function loadProgress() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);
  return { completedGates: [], gameStarted: false, victory: false };
}

function saveProgress(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function Home() {
  const [progress, setProgress] = useState(loadProgress);
  const [view, setView] = useState(progress.gameStarted ? 'map' : 'landing');
  const [currentGate, setCurrentGate] = useState(null);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Warn user if they try to leave mid-game
  useEffect(() => {
    if (!progress.gameStarted || progress.victory) return;
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [progress.gameStarted, progress.victory]);

  const startGame = () => {
    setProgress(p => ({ ...p, gameStarted: true }));
    setView('map');
  };

  const selectGate = (index) => {
    if (getGateLockoutRemaining(index) > 0) return;
    setCurrentGate(index);
    setView('challenge');
  };

  const completeGate = (clue) => {
    setProgress(p => ({
      ...p,
      completedGates: [...new Set([...p.completedGates, currentGate])],
    }));
    setCurrentGate(null);
    setView('map');
  };

  const openFinalGate = () => {
    setView('final');
  };

  const handleVictory = () => {
    setProgress(p => ({ ...p, victory: true }));
  };

  const collectedClues = progress.completedGates
    .sort((a, b) => a - b)
    .map(i => GATE_POOLS[i].clue);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Photo backgrounds — rotating between two images */}
      <div className="fixed inset-0 z-0">
        <BackgroundSlider />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.40)' }} />
      </div>

      <SakuraPetals count={18} />
      <FogEffect />

      {/* Subtle vignette */}
      <div className="fixed inset-0 pointer-events-none z-[3]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      <div className="relative z-20">
        <AnimatePresence mode="wait">
          {view === 'landing' && (
            <LandingView key="landing" onStart={startGame} />
          )}
          {view === 'map' && (
            <GateMap
              key="map"
              completedGates={progress.completedGates}
              onSelectGate={selectGate}
              onSelectFinal={openFinalGate}
              lockedGates={GATE_POOLS.map((_, i) => getGateLockoutRemaining(i))}
            />
          )}
          {view === 'challenge' && currentGate !== null && (
            <GateChallenge
              key={`gate-${currentGate}`}
              gate={GATE_POOLS[currentGate]}
              gateIndex={currentGate}
              onComplete={completeGate}
              onBack={() => { setCurrentGate(null); setView('map'); }}
            />
          )}
          {view === 'final' && (
            <FinalGate
              key="final"
              collectedClues={collectedClues}
              onComplete={handleVictory}
              onBack={() => setView('map')}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function LandingView({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      {/* IONMUN branding */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <span className="text-xs font-display tracking-[0.4em] text-muted-foreground uppercase">
          IONMUN'26 presents
        </span>
      </motion.div>

      {/* Main torii icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
        className="mb-8"
      >
        <div className="relative flex justify-center items-center">
          <div className="absolute inset-0 blur-3xl bg-primary/20 rounded-full" />
          <svg className="float-animation relative" width="88" height="112" viewBox="0 0 52 68" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 13 Q26 3 50 13" stroke="hsl(var(--primary))" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <line x1="8" y1="21" x2="44" y2="21" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />
            <line x1="11" y1="38" x2="41" y2="38" stroke="hsl(var(--primary)/0.4)" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" />
            <line x1="12" y1="21" x2="12" y2="68" stroke="hsl(var(--primary))" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="40" y1="21" x2="40" y2="68" stroke="hsl(var(--primary))" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="12" cy="21" r="4" fill="hsl(var(--secondary))" opacity="0.7" />
            <circle cx="40" cy="21" r="4" fill="hsl(var(--secondary))" opacity="0.7" />
          </svg>
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground tracking-wider leading-tight mb-8"
      >
        THE SEVEN GATES
        <br />
        <span className="text-secondary gold-pulse">OF KYOTO</span>
      </motion.h1>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="w-40 h-px bg-gradient-to-r from-transparent via-primary to-transparent mb-8"
      />

      {/* Lore text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="max-w-md space-y-4 mb-12"
      >
        <p className="font-body text-foreground/70 italic text-base md:text-lg">
          "For centuries the gates have remained closed."
        </p>
        <p className="font-body text-foreground/60 italic text-base md:text-lg">
          "Only those worthy of the Emperor's trust may enter."
        </p>
        <p className="font-body text-foreground/80 italic text-base md:text-lg">
          "Your journey begins now."
        </p>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.7 }}
      >
        <Button
          onClick={onStart}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-display tracking-[0.2em] uppercase text-sm md:text-base px-10 py-6 gate-glow transition-all duration-300"
        >
          Enter the First Gate
        </Button>
      </motion.div>

      {/* Rewards preview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="mt-16 space-y-3"
      >
        <p className="text-xs font-display tracking-[0.3em] text-muted-foreground uppercase">
          Rewards Await
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-foreground/50 font-body">
        <span>— Free Delegate Application</span>
        <span>— Special Recognition</span>
        <span>— Exclusive Winner Role</span>
        </div>
      </motion.div>

      {/* Bottom branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-6 left-0 right-0 text-center"
      >
        <p className="text-[10px] font-display tracking-[0.3em] text-muted-foreground/40 uppercase">
          IONMUN'26 · International Organization of Nations Model United Nations
        </p>
      </motion.div>
    </motion.div>
  );
}