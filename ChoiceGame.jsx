import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ToriiGate from "@/components/ui/ToriiGate";
import { GATE_POOLS } from "@/lib/gateData";
import { getGateLockoutRemaining, formatLockoutTime } from "@/lib/gateLockout";

export default function GateMap({ completedGates, onSelectGate, onSelectFinal, lockedGates }) {
  const allSixComplete = completedGates.length === 6;
  const [tick, setTick] = useState(0);

  // Re-render every second to update countdown timers
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 py-10"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-10"
      >
        <p className="text-xs font-display tracking-[0.4em] text-muted-foreground uppercase mb-3">Your Journey</p>
        <h2 className="font-display text-2xl md:text-3xl text-secondary tracking-[0.15em]">
          THE SEVEN GATES
        </h2>
        <div className="mt-4 w-40 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        <p className="text-muted-foreground font-body text-xs italic mt-3">
          {completedGates.length} of 7 gates conquered
        </p>
      </motion.div>

      {/* Path connector background */}
      <div className="relative">
        {/* Gate grid */}
        <div className="grid grid-cols-3 gap-3 md:gap-5 max-w-sm mx-auto mb-4">
          {GATE_POOLS.map((gate, i) => {
            const isCompleted = completedGates.includes(i);
            const isUnlocked = i === 0 || completedGates.includes(i - 1);
            const lockRemaining = getGateLockoutRemaining(i);
            const isLockedOut = lockRemaining > 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, type: "spring", stiffness: 200, damping: 24 }}
                className="flex flex-col items-center gap-1"
              >
                <ToriiGate
                  number={gate.number}
                  title={gate.title}
                  unlocked={isUnlocked && !isLockedOut}
                  active={isCompleted ? "completed" : (isUnlocked && !isLockedOut) ? "active" : ""}
                  onClick={() => !isCompleted && isUnlocked && !isLockedOut && onSelectGate(i)}
                />
                {isLockedOut && !isCompleted && (
                  <div className="text-center">
                    <p className="text-destructive text-[9px] font-mono leading-tight">{formatLockoutTime(lockRemaining)}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Final Imperial Gate — centered below */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 180, damping: 22 }}
          className="flex justify-center mt-2"
        >
          <div className="relative">
            {allSixComplete && (
              <motion.div
                className="absolute -inset-4 rounded-2xl"
                animate={{ boxShadow: ["0 0 20px hsl(var(--secondary)/0.2)", "0 0 50px hsl(var(--secondary)/0.45)", "0 0 20px hsl(var(--secondary)/0.2)"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <ToriiGate
              number="VII"
              title="Imperial"
              unlocked={allSixComplete}
              active={allSixComplete ? "active" : ""}
              onClick={() => allSixComplete && onSelectFinal()}
            />
          </div>
        </motion.div>
      </div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10 w-full max-w-xs"
      >
        <div className="flex justify-between text-[10px] font-display tracking-widest text-muted-foreground uppercase mb-2">
          <span>Progress</span>
          <span>{Math.round((completedGates.length / 7) * 100)}%</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-primary to-secondary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(completedGates.length / 7) * 100}%` }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.9 }}
          />
        </div>
      </motion.div>

      {/* Collected clue letters */}
      {completedGates.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-6 text-center"
        >
          <p className="text-[10px] font-display tracking-[0.3em] text-muted-foreground uppercase mb-3">Collected Fragments</p>
          <div className="flex gap-2 justify-center flex-wrap">
            {completedGates.sort((a, b) => a - b).map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-8 h-8 flex items-center justify-center bg-primary/10 border border-primary/30 rounded font-mono text-sm font-bold text-secondary"
              >
                &#9619;
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {allSixComplete && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-4 text-xs font-body italic text-secondary text-center"
        >
          "All six gates have yielded. The Imperial Gate awaits."
        </motion.p>
      )}
    </motion.div>
  );
}