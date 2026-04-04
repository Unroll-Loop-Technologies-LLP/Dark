import { motion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { openContact, scrollToSection } from "../lib/contact-actions";

export function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-20 px-6 md:px-20 overflow-hidden">
      {/* Background Gradient Blur */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#6C5CE7]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#00D4FF]/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Build Scalable & Secure Digital Products Powered by{" "}
            <span className="bg-gradient-to-r from-[#6C5CE7] to-[#00D4FF] bg-clip-text text-transparent">
              AI & Engineering
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
            We transform ideas into powerful, secure digital solutions using cutting-edge technology, 
            artificial intelligence, cybersecurity best practices, and world-class engineering.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => openContact("message")}
              className="group px-8 py-4 rounded-lg bg-gradient-to-r from-[#6C5CE7] to-[#00D4FF] text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#6C5CE7]/50 hover:shadow-xl hover:shadow-[#6C5CE7]/70 transition-all hover:-translate-y-1"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("#case-studies")}
              className="px-8 py-4 rounded-lg border border-white/10 text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/5 transition-all hover:-translate-y-1"
            >
              <Play className="w-5 h-5" />
              View Case Studies
            </button>
          </div>
        </motion.div>

        {/* Right Column - Abstract Gradient Blobs */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative hidden md:block"
        >
          <div className="relative w-full h-[500px]">
            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-64 h-64 rounded-3xl bg-gradient-to-br from-[#6C5CE7]/30 to-[#00D4FF]/30 backdrop-blur-xl border border-white/10 p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#00D4FF] mb-4" />
              <div className="space-y-2">
                <div className="h-3 bg-white/20 rounded w-3/4" />
                <div className="h-3 bg-white/10 rounded w-1/2" />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 left-0 w-64 h-64 rounded-3xl bg-gradient-to-br from-[#00D4FF]/30 to-[#6C5CE7]/30 backdrop-blur-xl border border-white/10 p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#6C5CE7] mb-4" />
              <div className="space-y-2">
                <div className="h-3 bg-white/20 rounded w-2/3" />
                <div className="h-3 bg-white/10 rounded w-full" />
              </div>
            </motion.div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-r from-[#6C5CE7]/20 to-[#00D4FF]/20 blur-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
