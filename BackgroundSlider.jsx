import React from "react";
import { motion } from "framer-motion";

function ToriiSVG({ unlocked, completed }) {
  const color = completed
    ? "hsl(var(--secondary))"
    : unlocked
    ? "hsl(var(--primary))"
    : "hsl(var(--muted-foreground)/0.3)";

  return (
    <svg width="52" height="68" viewBox="0 0 52 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top curved kasagi beam */}
      <path d="M2 13 Q26 3 50 13" stroke={color} strokeWidth="4.5" strokeLinecap="round" fill="none" />
      {/* Shimaki (second beam) */}
      <line x1="8" y1="21" x2="44" y2="21" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* Nuki (horizontal tie between pillars) */}
      <line x1="11" y1="38" x2="41" y2="38" stroke={color} strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" />
      {/* Left pillar */}
      <line x1="12" y1="21" x2="12" y2="68" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      {/* Right pillar */}
      <line x1="40" y1="21" x2="40" y2="68" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      {/* Glow dots at pillar tops (shimmer) */}
      {unlocked && (
        <>
          <circle cx="12" cy="21" r="3" fill={completed ? "hsl(var(--secondary))" : "hsl(var(--primary))"} opacity="0.5" />
          <circle cx="40" cy="21" r="3" fill={completed ? "hsl(var(--secondary))" : "hsl(var(--primary))"} opacity="0.5" />
        </>
      )}
    </svg>
  );
}

export default function ToriiGate({ number, title, unlocked, active, onClick }) {
  const isCompleted = active === "completed";

  return (
    <motion.button
      onClick={onClick}
      disabled={!unlocked}
      className={`relative flex flex-col items-center gap-1.5 px-3 py-4 rounded-xl transition-all duration-500 group
        ${unlocked ? "cursor-pointer" : "cursor-not-allowed"}
        ${isCompleted ? "bg-secondary/5 border border-secondary/20" : unlocked ? "bg-primary/5 border border-primary/20 hover:border-primary/40" : "opacity-35 border border-transparent"}
      `}
      whileHover={unlocked && !isCompleted ? { scale: 1.06, y: -4 } : isCompleted ? { scale: 1.02 } : {}}
      whileTap={unlocked ? { scale: 0.96 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Glow behind gate */}
      {unlocked && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={isCompleted
            ? { boxShadow: "0 0 20px hsl(var(--secondary)/0.2), 0 0 40px hsl(var(--secondary)/0.08)" }
            : { boxShadow: ["0 0 10px hsl(var(--primary)/0.1)", "0 0 20px hsl(var(--primary)/0.25)", "0 0 10px hsl(var(--primary)/0.1)"] }
          }
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* SVG Torii */}
      <motion.div
        animate={unlocked && !isCompleted ? { y: [0, -3, 0] } : {}}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ToriiSVG unlocked={unlocked} completed={isCompleted} />
      </motion.div>

      {/* Gate number */}
      <span className={`text-xs font-display tracking-[0.2em] uppercase
        ${isCompleted ? "text-secondary" : unlocked ? "text-primary/90" : "text-muted-foreground/40"}
      `}>
        Gate {number}
      </span>

      {/* Title */}
      <span className={`text-[10px] font-body tracking-wide
        ${isCompleted ? "text-secondary/70" : unlocked ? "text-foreground/60" : "text-muted-foreground/30"}
      `}>
        {title}
      </span>

      {/* Completed seal */}
      {isCompleted && (
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-secondary rounded-full flex items-center justify-center shadow-lg"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5 L4.5 7.5 L8 3" stroke="hsl(var(--secondary-foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      )}

      {/* Locked indicator */}
      {!unlocked && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl">
          <div className="w-4 h-4">
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="7" width="10" height="8" rx="1" fill="hsl(var(--muted-foreground)/0.2)" />
              <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="hsl(var(--muted-foreground)/0.3)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      )}
    </motion.button>
  );
}