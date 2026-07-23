import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { setGateLockout } from "@/lib/gateLockout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RunnerGame from "./minigames/RunnerGame";
import InvestigationGame from "./minigames/InvestigationGame";
import ChoiceGame from "./minigames/ChoiceGame";
import SequenceGame from "./minigames/SequenceGame";
import CipherGame from "./minigames/CipherGame";

// Simple timeout trigger component
function GateOpenTrigger({ onDone }) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [onDone]);
  return null;
}

// Gate open animation overlay
function GateOpenAnimation({ gate, onDone }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Ink burst */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 6 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        style={{ background: "radial-gradient(circle, hsl(var(--primary)/0.3) 0%, transparent 70%)" }}
      />

      {/* Torii gate doors opening */}
      <div className="relative w-48 h-64 flex items-start justify-center">
        {/* Crossbeam top */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-4 bg-primary rounded"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 1.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        <motion.div
          className="absolute top-5 left-4 right-4 h-2.5 bg-primary/70 rounded"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 1.15 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        {/* Left door panel swinging open */}
        <motion.div
          className="absolute left-4 top-8 bottom-0 w-14 bg-primary/30 border border-primary/40 rounded-sm origin-left"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: -70 }}
          transition={{ duration: 0.9, delay: 0.4, ease: "easeInOut" }}
          style={{ perspective: 600 }}
        />
        {/* Right door panel swinging open */}
        <motion.div
          className="absolute right-4 top-8 bottom-0 w-14 bg-primary/30 border border-primary/40 rounded-sm origin-right"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 70 }}
          transition={{ duration: 0.9, delay: 0.4, ease: "easeInOut" }}
          style={{ perspective: 600 }}
        />

        {/* Left pillar */}
        <motion.div
          className="absolute left-4 top-8 bottom-0 w-3 bg-primary"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 1 }}
        />
        {/* Right pillar */}
        <motion.div
          className="absolute right-4 top-8 bottom-0 w-3 bg-primary"
        />

        {/* Light from within */}
        <motion.div
          className="absolute inset-x-7 top-8 bottom-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{ background: "linear-gradient(to bottom, hsl(var(--secondary)/0.4), transparent)" }}
        />
      </div>

      {/* Text */}
      <motion.div
        className="absolute bottom-24 text-center space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <p className="font-display text-secondary tracking-[0.4em] uppercase text-sm">Gate {gate.number} Opens</p>
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto" />
      </motion.div>

      {/* Trigger done after animation */}
      <GateOpenTrigger onDone={onDone} />
    </motion.div>
  );
}

export default function GateChallenge({ gate, onComplete, onBack, gateIndex }) {
  // Randomly pick one challenge from the pool on mount
  const challenge = useMemo(() => {
    const pool = gate.challenges;
    return pool[Math.floor(Math.random() * pool.length)];
  }, [gate]);

  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showGateOpen, setShowGateOpen] = useState(false);

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (challenge.checkAnswer(answer.trim().toLowerCase())) {
      triggerSuccess();
    } else {
      setError(true);
      if (gateIndex !== undefined) setGateLockout(gateIndex);
      setTimeout(() => {
        setError(false);
        onBack();
      }, 3000);
    }
  };

  const handleMinigameFail = () => {
    if (gateIndex !== undefined) setGateLockout(gateIndex);
    setTimeout(() => onBack(), 3000);
  };

  const triggerSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setShowGateOpen(true);
    }, 600);
  };

  const handleGateOpenDone = () => {
    onComplete(gate.clue);
  };

  const typeLabel = {
    riddle: "Sacred Riddle",
    runner: "Trial of Speed",
    investigation: "Investigation Trial",
    cipher: "Cipher Trial",
    sequence: "Pattern Trial",
    choice: "Trial of Judgment",
  };

  return (
    <>
      <AnimatePresence>
        {showGateOpen && (
          <GateOpenAnimation key="gate-open" gate={gate} onDone={handleGateOpenDone} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, x: -40 }}
        className="min-h-screen flex flex-col items-center justify-center p-4 relative"
      >
        {/* Back */}
        <button
          onClick={onBack}
          className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors z-20"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-body">Return</span>
        </button>

        <div
        className="max-w-xl w-full"
        onCopy={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
        style={{ userSelect: "none", WebkitUserSelect: "none" }}
      >
          {/* Gate header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-center mb-8"
          >
            {/* Ink-brush torii SVG */}
            <div className="flex justify-center mb-4">
              <Torii color="hsl(var(--primary))" size={56} />
            </div>
            <h2 className="font-display text-xl md:text-3xl text-secondary tracking-wider mb-1">
              Gate {gate.number}
            </h2>
            <p className="font-body text-muted-foreground text-sm tracking-[0.2em] uppercase">{gate.title}</p>
            <div className="mt-3 flex items-center justify-center gap-3">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-primary/40 max-w-[80px]" />
              <span className="text-xs font-display tracking-widest text-primary/70 uppercase">{typeLabel[challenge.type] || "Trial"}</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-primary/40 max-w-[80px]" />
            </div>
          </motion.div>

          {/* Challenge card */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 md:p-8 shadow-xl"
          >
            {/* Question text */}
            <div className="mb-6" style={{ userSelect: "none", WebkitUserSelect: "none" }}>
              <p className="font-body text-foreground/90 text-base md:text-lg leading-relaxed whitespace-pre-line text-center italic select-none">
                "{challenge.question}"
              </p>
              {challenge.hint && challenge.type !== "runner" && challenge.type !== "investigation" && (
                <p className="text-muted-foreground text-xs mt-3 text-center select-none">{challenge.hint}</p>
              )}
            </div>

            {/* Mini-game by type */}
            {challenge.type === "runner" && (
              <RunnerGame onComplete={triggerSuccess} onFail={() => {}} />
            )}
            {challenge.type === "investigation" && (
              <InvestigationGame challenge={challenge} onComplete={triggerSuccess} />
            )}
            {challenge.type === "choice" && !success && (
              <ChoiceGame challenge={challenge} onComplete={triggerSuccess} />
            )}
            {challenge.type === "sequence" && !success && (
              <SequenceGame challenge={challenge} onComplete={triggerSuccess} />
            )}
            {challenge.type === "cipher" && !success && (
              <CipherGame challenge={challenge} onComplete={triggerSuccess} />
            )}
            {challenge.type === "riddle" && !success && (
              <form onSubmit={handleTextSubmit} className="space-y-4">
                <Input
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter your answer..."
                  className={`bg-background/50 border-border/50 text-center font-body text-lg py-6
                    ${error ? "border-destructive animate-pulse" : ""}
                  `}
                />
                <Button
                  type="submit"
                  disabled={!answer.trim()}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display tracking-widest uppercase py-6"
                >
                  Submit Answer
                </Button>
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center space-y-1"
                  >
                    <p className="text-destructive text-sm font-body italic">
                      "The gate remains sealed. You are banished for 24 hours."
                    </p>
                    <p className="text-muted-foreground text-xs">Returning to the map...</p>
                  </motion.div>
                )}
              </form>
            )}

            {/* Success state */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-3 py-4"
              >
                <p className="text-secondary font-display tracking-widest text-sm uppercase">The gate opens before you</p>
                <div className="w-16 h-px bg-secondary mx-auto" />
                <div className="inline-block mt-2 px-5 py-4 bg-primary/10 border border-primary/30 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-2 tracking-widest uppercase">{gate.clueLabel}</p>
                  <p className="text-secondary font-mono text-3xl tracking-[0.5em] font-bold">&#9619;</p>
                  <p className="text-muted-foreground text-xs mt-2 italic">{gate.clueHint}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

function Torii({ color = "hsl(var(--primary))", size = 48 }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 48 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top curved beam */}
      <path d="M2 10 Q24 2 46 10" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* Second beam */}
      <line x1="6" y1="18" x2="42" y2="18" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* Left pillar */}
      <line x1="10" y1="18" x2="10" y2="62" stroke={color} strokeWidth="4" strokeLinecap="round" />
      {/* Right pillar */}
      <line x1="38" y1="18" x2="38" y2="62" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}