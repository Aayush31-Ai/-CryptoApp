"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export const TypewriterEffectSmooth = ({ words, className }) => {
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }));

  return (
    <div className={cn("flex flex-wrap justify-center my-6", className)}>
      {wordsArray.map((word, wordIdx) => (
        <div
          key={`word-${wordIdx}`}
          className="inline-block mx-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
        >
          {word.text.map((char, charIdx) => (
            <motion.span
              key={`char-${charIdx}`}
              className={cn("dark:text-white text-white", word.className)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: (wordIdx * word.text.length + charIdx) * 0.05, // sequential
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
};
