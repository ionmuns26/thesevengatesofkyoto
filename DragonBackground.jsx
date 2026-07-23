import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CipherGame({ challenge, onComplete }) {
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
      {challenge.hint && (
        <p className="text-muted-foreground text-xs text-center">{challenge.hint}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter decoded answer..."
          className={`bg-background/50 border-border/50 text-center font-mono text-xl py-6 tracking-widest
            ${error ? "border-destructive animate-pulse" : ""}
          `}
        />
        <Button
          type="submit"
          disabled={!answer.trim()}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display tracking-widest uppercase py-5"
        >
          Decode and Submit
        </Button>
      </form>
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-destructive text-center text-sm font-body italic"
        >
          "The cipher remains unbroken."
        </motion.p>
      )}
    </div>
  );
}