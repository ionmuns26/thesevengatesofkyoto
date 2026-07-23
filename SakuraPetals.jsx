import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChoiceGame({ challenge, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [wrong, setWrong] = useState(false);

  const handleSelect = (i) => {
    if (submitted) return;
    setSelected(i);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    if (selected === challenge.correctIndex) {
      setSubmitted(true);
      setTimeout(() => onComplete(), 1000);
    } else {
      setWrong(true);
      setTimeout(() => { setWrong(false); setSelected(null); }, 1500);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {challenge.choices.map((choice, i) => {
          const isSelected = selected === i;
          const isCorrect = submitted && i === challenge.correctIndex;
          const isWrong = wrong && isSelected;
          return (
            <motion.button
              key={i}
              onClick={() => handleSelect(i)}
              whileHover={!submitted ? { x: 4 } : {}}
              whileTap={!submitted ? { scale: 0.98 } : {}}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 font-body text-sm
                ${isCorrect ? "border-secondary bg-secondary/10 text-secondary" : ""}
                ${isWrong ? "border-destructive bg-destructive/10 text-destructive" : ""}
                ${isSelected && !isCorrect && !isWrong ? "border-primary bg-primary/10 text-foreground" : ""}
                ${!isSelected && !submitted ? "border-border/40 bg-card/50 text-foreground/80 hover:border-border hover:bg-card/80" : ""}
                ${submitted && !isCorrect ? "opacity-40" : ""}
              `}
            >
              <span className="font-display text-xs tracking-widest text-muted-foreground mr-3">
                {["I", "II", "III", "IV"][i]}.
              </span>
              {choice}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {wrong && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-destructive text-center text-sm font-body italic"
          >
            "The samurai reconsiders."
          </motion.p>
        )}
      </AnimatePresence>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="w-full py-3 bg-primary hover:bg-primary/90 disabled:opacity-40 text-primary-foreground font-display tracking-widest text-xs uppercase rounded-lg transition-colors"
        >
          Declare Answer
        </button>
      )}
      {submitted && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-secondary text-center text-sm font-body italic"
        >
          "The master nods in approval."
        </motion.p>
      )}
    </div>
  );
}