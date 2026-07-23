import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { GATE_POOLS } from "@/lib/gateData";

const FINAL_CODE = "ionmun";

export default function FinalGate({ collectedClues, onComplete, onBack }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [victory, setVictory] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim().toLowerCase() === FINAL_CODE) {
      setVictory(true);
      onComplete();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (victory) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      >
        {/* Photo background */}
        <img
          src="https://media.base44.com/images/public/6a20600e5c93c896849d4c88/c3537abc7_images.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.65)' }} />

        {/* Radiating gold rings */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-secondary/30"
            initial={{ width: 80, height: 80, opacity: 0.8 }}
            animate={{ width: 800, height: 800, opacity: 0 }}
            transition={{ duration: 2.5, delay: i * 0.5, repeat: Infinity, ease: "easeOut" }}
          />
        ))}

        {/* Falling gold particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-secondary"
              initial={{ x: `${Math.random() * 100}vw`, y: -10, opacity: 0 }}
              animate={{ y: "110vh", opacity: [0, 0.8, 0] }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          className="text-center z-10 px-6 max-w-lg w-full overflow-y-auto max-h-screen py-8"
        >
          {/* Imperial crown — pure SVG, no emoji */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mb-8"
          >
            <svg width="64" height="48" viewBox="0 0 64 48" fill="none">
              <path d="M4 44 L4 28 L16 8 L32 28 L48 8 L60 28 L60 44 Z" fill="hsl(var(--secondary)/0.2)" stroke="hsl(var(--secondary))" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="4" cy="28" r="4" fill="hsl(var(--secondary))" />
              <circle cx="32" cy="28" r="4" fill="hsl(var(--secondary))" />
              <circle cx="60" cy="28" r="4" fill="hsl(var(--secondary))" />
              <circle cx="16" cy="8" r="3" fill="hsl(var(--secondary))" />
              <circle cx="48" cy="8" r="3" fill="hsl(var(--secondary))" />
              <line x1="4" y1="44" x2="60" y2="44" stroke="hsl(var(--secondary))" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="font-display text-2xl md:text-4xl lg:text-5xl text-secondary gold-pulse tracking-wider mb-6"
          >
            THE EMPEROR
            <br />
            HAS CHOSEN YOU.
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="space-y-3"
          >
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto" />
            <p className="font-body text-foreground/80 italic text-base">
              "You have proven yourself worthy of the Emperor's trust."
            </p>
            <p className="font-body text-foreground/50 text-sm">
              Your journey through the Seven Gates is complete.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="mt-8 bg-card/60 backdrop-blur-sm border border-secondary/30 rounded-xl p-6"
          >
            <h3 className="font-display text-secondary tracking-wider text-xs uppercase mb-4">Your Rewards</h3>
            <div className="space-y-3 text-left">
              {["Special Recognition by IONMUN'26", "A Surprise from the Executive Team"].map((r) => (
                <div key={r} className="flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center rounded-full bg-secondary/20 border border-secondary/40">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1 4 L3.5 6.5 L7 2" stroke="hsl(var(--secondary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="font-body text-foreground/90 text-sm">{r}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Screenshot instruction */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.0 }}
            className="mt-4 bg-secondary/10 backdrop-blur-sm border border-secondary/40 rounded-xl p-5 text-left"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="1" y="3" width="16" height="12" rx="2" stroke="hsl(var(--secondary))" strokeWidth="1.5"/>
                  <circle cx="9" cy="9" r="3" stroke="hsl(var(--secondary))" strokeWidth="1.5"/>
                  <rect x="12" y="4.5" width="2" height="1.5" rx="0.5" fill="hsl(var(--secondary))"/>
                </svg>
              </div>
              <div className="space-y-2">
                <p className="font-display text-secondary text-xs tracking-widest uppercase">Claim Your Prize</p>
                <p className="font-body text-foreground/85 text-sm leading-relaxed">
                  Take a screenshot of this page showing <span className="text-secondary font-semibold">"THE EMPEROR HAS CHOSEN YOU."</span> and send it to:
                </p>
                <p className="font-mono text-secondary text-sm font-bold tracking-wide">ionmuns26@gmail.com</p>
                <p className="font-body text-foreground/70 text-sm">
                  Include your <span className="text-foreground/90 font-semibold">full name as used in your IONMUN'26 application</span> in the email.
                </p>
                <div className="mt-2 pt-2 border-t border-secondary/20">
                  <p className="font-body text-secondary/80 text-xs italic">
                    By sending the screenshot, you will be entered into the draw for the Executive Team's surprise gift.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 relative"
    >
      <button
        onClick={onBack}
        className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-body">Return</span>
      </button>

      <div className="max-w-lg w-full">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          {/* Crown SVG */}
          <div className="flex justify-center mb-4">
            <svg width="42" height="32" viewBox="0 0 64 48" fill="none">
              <path d="M4 44 L4 28 L16 8 L32 28 L48 8 L60 28 L60 44 Z" fill="hsl(var(--secondary)/0.15)" stroke="hsl(var(--secondary))" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="4" cy="28" r="4" fill="hsl(var(--secondary))" />
              <circle cx="32" cy="28" r="4" fill="hsl(var(--secondary))" />
              <circle cx="60" cy="28" r="4" fill="hsl(var(--secondary))" />
              <line x1="4" y1="44" x2="60" y2="44" stroke="hsl(var(--secondary))" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="font-display text-2xl md:text-3xl text-secondary tracking-wider mb-2">
            Gate VII — Imperial Gate
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 md:p-8"
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          style={{ userSelect: "none", WebkitUserSelect: "none" }}
        >
          <p className="text-foreground/90 font-body text-base text-center italic mb-6">
            "Combine the clues from all six gates to reveal the Emperor's code."
          </p>

          <div className="mb-6 p-4 bg-background/50 rounded-lg border border-border/30">
            <p className="text-muted-foreground text-[10px] mb-4 text-center tracking-widest uppercase">Your Collected Fragments</p>
            <div className="grid grid-cols-3 gap-2" style={{ userSelect: "none", WebkitUserSelect: "none" }}>
              {collectedClues.map((clue, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center px-2 py-3 bg-primary/10 border border-primary/30 rounded-lg"
                  onCopy={(e) => e.preventDefault()}
                >
                  <span className="text-secondary font-mono text-2xl font-bold tracking-widest select-none">{clue}</span>
                  <span className="text-muted-foreground text-[10px] mt-1 text-center italic leading-tight select-none">
                    Gate {i + 1}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-background/40 rounded border border-border/20 text-center space-y-1">
              <p className="text-muted-foreground text-xs italic">
                "The fragments are scrambled. Unscramble them with the year of the conference."
              </p>
              <p className="text-muted-foreground text-[10px]">
                Each gate's clue is a single letter. Rearrange all {collectedClues.length} to form the name.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter the Emperor's code..."
              className={`bg-background/50 border-border/50 text-center font-mono text-xl tracking-[0.2em] py-6
                ${error ? "border-destructive animate-pulse" : ""}
              `}
            />
            <Button
              type="submit"
              disabled={!code.trim()}
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-display tracking-widest uppercase py-6"
            >
              Unlock the Emperor's Gate
            </Button>
          </form>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-destructive text-center text-sm mt-3 font-body italic"
            >
              "The Emperor's gate does not yield. Try again."
            </motion.p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}