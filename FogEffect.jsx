import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SequenceGame({ challenge, onComplete }) {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (challenge.checkAnswer(answer)) {
      onComplete();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="space-y-5">
      {/* Sequence display */}
      <div className="p-5 bg-background/50 border border-border/30 rounded-lg">
        <p className="text-xs font-display tracking-widest text-muted-foreground uppercase mb-4 text-center">The Sequence</p>
        <div className="flex flex-wrap gap-2 justify-center items-center">
          {challenge.sequence.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`px-3 py-2 rounded border font-mono text-sm
                ${item === "?" ? "border-secondary bg-secondary/10 text-secondary font-bold animate-pulse" : "border-border/50 bg-card/60 text-foreground/90"}
              `}
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>

      {challenge.hint && (
        <p className="text-muted-foreground text-xs text-center">{challenge.hint}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter the next value..."
          className={`bg-background/50 border-border/50 text-center font-mono text-xl py-6 tracking-widest
            ${error ? "border-destructive animate-pulse" : ""}
          `}
        />
        <Button
          type="submit"
          disabled={!answer.trim()}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display tracking-widest uppercase py-5"
        >
          Submit Answer
        </Button>
      </form>
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-destructive text-center text-sm font-body italic"
        >
          "The pattern remains unsolved."
        </motion.p>
      )}
    </div>
  );
}