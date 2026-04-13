import { motion } from "motion/react";

export function TrustedBy() {
  const companies = [
    {
      name: "Sony",
      local: "/logos/sony.png",
      fallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sony_logo.svg",
    },
    {
      name: "PlayStation",
      local: "/logos/ps.png",
      fallback: "https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg",
    },
    {
      name: "HAL",
      local: "/logos/hal.png",
      fallback: "https://upload.wikimedia.org/wikipedia/en/3/3e/Hindustan_Aeronautics_Limited_Logo.svg",
    },
    {
      name: "Accenture",
      local: "/logos/accenture.png",
      fallback: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Accenture_logo.svg",
    },
    {
      name: "Govt Of Karnataka",
      local: "/logos/goe.png",
      fallback: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Seal_of_Karnataka.svg",
    },
    {
      name: "OpenText",
      local: "/logos/ot.png",
      fallback: "https://upload.wikimedia.org/wikipedia/commons/1/1b/OpenText_logo.svg",
    },
    {
      name: "SBI",
      local: "/logos/sbi.png",
      fallback: "https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg",
    },
    {
      name: "Canara Bank",
      local: "/logos/canara.png",
      fallback: "https://upload.wikimedia.org/wikipedia/commons/5/50/Canara_Bank_Logo.svg",
    },
    {
      name: "Cuttech",
      local: "/logos/cuttech.png",
      fallback: "https://cuttech.solutions/CuttechSolLogo.png",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-20 border-y border-white/5 bg-gradient-to-b from-[#0B0F1A] to-black overflow-hidden">
      <div className="max-w-[1440px] mx-auto">

        {/* Heading */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 mb-14 uppercase tracking-[0.2em] text-xs"
        >
          Trusted by Industry Leaders
        </motion.p>

        {/* Marquee Wrapper */}
        <div className="relative">

          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#0B0F1A] via-[#0B0F1A]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#0B0F1A] via-[#0B0F1A]/80 to-transparent z-10 pointer-events-none" />

          {/* Marquee */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-20 pr-20"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 25,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {[...companies, ...companies].map((company, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center min-w-[180px] group"
                >
                  <img
                    src={company.local}
                    alt={company.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null; // prevent infinite loop
                      e.currentTarget.src = company.fallback;
                    }}
                    className="
                      h-10 w-auto object-contain
                      opacity-50 grayscale
                      group-hover:opacity-100 group-hover:grayscale-0
                      group-hover:scale-110
                      transition duration-300 ease-out
                    "
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
