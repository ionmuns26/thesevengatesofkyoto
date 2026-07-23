import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IMAGES = [
  "https://media.base44.com/images/public/6a20600e5c93c896849d4c88/d517d83c3_Ekrangrnts2026-06-07173424.png",
  "https://media.base44.com/images/public/6a20600e5c93c896849d4c88/c1d0a0717_IMG_6168JPG.jpg",
];

export default function BackgroundSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % IMAGES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="sync">
      <motion.img
        key={index}
        src={IMAGES[index]}
        alt=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{
          imageRendering: "crisp-edges",
          filter: "contrast(1.1) saturate(1.15) brightness(0.95)",
        }}
      />
    </AnimatePresence>
  );
}