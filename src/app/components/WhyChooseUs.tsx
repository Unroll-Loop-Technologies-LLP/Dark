import { motion } from "motion/react";
import { Award, Users, Clock, Globe } from "lucide-react";

export function WhyChooseUs() {
  const stats = [
    { icon: Award, value: "127+", label: "Projects Delivered" },
    { icon: Users, value: "18+", label: "Expert Engineers" },
    { icon: Clock, value: "24/7", label: "Support Available" },
    { icon: Globe, value: "8+", label: "Countries Served" },
  ];

  return (
    <section className="py-20 px-6 md:px-20">
      {/* 🔥 Local styles (no global CSS needed) */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) scale(1); opacity: 0.4; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
          100% { transform: translateY(0px) scale(1); opacity: 0.4; }
        }
        .particle {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Why Choose Unroll Loop?
            </h2>

            <p className="text-xl text-gray-400 mb-12">
              We combine technical excellence with business understanding to deliver
              solutions that drive real growth.
            </p>

            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#00D4FF] flex items-center justify-center mb-4 mx-auto">
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>

                  <div className="text-4xl font-bold bg-gradient-to-r from-[#6C5CE7] to-[#00D4FF] bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>

                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full h-96 rounded-3xl overflow-hidden group">

              {/* Image with fallback */}
              <img
                src="/images/Enginnered.jpg" // 🔥 replace
                alt="Why Choose Us"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget.nextSibling;
                  if (fallback) fallback.style.opacity = "1";
                }}
                className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
              />

              {/* Fallback gradient */}
              <div
                style={{ opacity: 0 }}
                className="absolute inset-0 transition duration-500 bg-gradient-to-r from-[#6C5CE7]/20 to-[#00D4FF]/20"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#6C5CE7]/20 to-[#00D4FF]/20" />

              {/* Particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <span
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-white/40 rounded-full particle"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 5}s`,
                    }}
                  />
                ))}
              </div>

              {/* Rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute top-4 right-4 w-40 h-40 rounded-full border border-[#6C5CE7]/30"
              />

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-4 left-4 w-32 h-32 rounded-full border border-[#00D4FF]/30"
              />

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
