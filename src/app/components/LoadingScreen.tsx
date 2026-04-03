import { motion } from "motion/react";
import { Logo } from "./Logo";
import { useState, useEffect } from "react";

export function LoadingScreen() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Secure. Innovate. Scale.";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 80); // Speed of typing (80ms per character)

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[10000] bg-[#0B0F1A] flex flex-col items-center justify-center"
    >
      {/* Background Gradient Blur */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6C5CE7]/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00D4FF]/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
      
      {/* Logo Animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: [0.8, 1.1, 1],
          opacity: [0, 1, 1],
        }}
        transition={{ 
          duration: 1.5,
          times: [0, 0.6, 1],
          ease: "easeOut"
        }}
        className="relative z-10"
      >
        <motion.div
          animate={{ 
            rotate: 360,
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Logo className="w-24 h-24 md:w-32 md:h-32" />
        </motion.div>
        
        {/* Pulse Ring */}
        <motion.div
          className="absolute inset-0 border-2 border-[#6C5CE7]/30 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Typing Animation for Slogan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-8 relative z-10"
      >
        <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#6C5CE7] to-[#00D4FF] bg-clip-text text-transparent">
          {typedText}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-0.5 h-6 md:h-8 bg-gradient-to-b from-[#6C5CE7] to-[#00D4FF] ml-1 align-middle"
          />
        </p>
      </motion.div>
    </motion.div>
  );
}