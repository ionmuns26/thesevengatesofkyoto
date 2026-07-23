import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function InvestigationGame({ challenge, onComplete }) {
  const [step, setStep] = useState("clues"); // clues | answer
  const [revealedClues, setRevealedClues] = useState([]);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);

  const revealClue = (i) => {
    if (!revealedClues.includes(i)) setRevealedClues([...revealedClues, i]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (challenge.checkAnswer(answer.trim().toLowerCase())) {
      onComplete();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="space-y-5">
      {/* Story */}
      <div className="p-4 bg-background/60 border border-border/40 rounded-lg">
        <p className="text-xs font-display tracking-widest text-muted-foreground uppercase mb-2">The Incident</p>
        <p className="font-body text-foreground/90 text-sm leading-relaxed">{challenge.story}</p>
      </div>

      {/* Clues to examine */}
      <div>
        <p className="text-xs font-display tracking-widest text-muted-foreground uppercase mb-3 flex items-center gap-2">
          <Search className="w-3 h-3" /> Examine Witness Testimonies
        </p>
        <div className="space-y-2">
          {challenge.clues.map((clue, i) => (
            <motion.div key={i} layout className="rounded-lg border border-border/40 overflow-hidden">
              <button
                onClick={() => revealClue(i)}
                className="w-full flex items-center justify-between p-3 text-left bg-card/60 hover:bg-card transition-colors"
              >
                <span className="font-display text-xs tracking-widest text-secondary uppercase">
                  Witness {i + 1}
                </span>
                <ChevronRight
                  className={`w-4 h-4 text-muted-foreground transition-transform ${revealedClues.includes(i) ? "rotate-90" : ""}`}
                />
              </button>
              <AnimatePresence>
                {revealedClues.includes(i) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-3 pb-3 bg-background/40"
                  >
                    <p className="font-body text-foreground/80 text-sm italic mt-2 leading-relaxed">
                      "{clue}"
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <p className="font-body text-foreground/90 text-sm leading-relaxed italic">{challenge.question}</p>
        <p className="text-muted-foreground text-xs mt-2">{challenge.hint}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Name the primary suspect..."
          className={`bg-background/50 border-border/50 text-center font-body py-5 ${error ? "border-destructive animate-pulse" : ""}`}
        />
        <Button
          type="submit"
          disabled={!answer.trim()}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display tracking-widest uppercase"
        >
          Deliver Judgment
        </Button>
      </form>
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-destructive text-center text-sm font-body italic"
        >
          "The evidence does not support this conclusion."
        </motion.p>
      )}
    </div>
  );
}