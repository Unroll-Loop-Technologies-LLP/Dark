import { motion } from "motion/react";

export function TrustedBy() {
  const companies = [
    {
      name: "Microsoft",
      local: "/logos/microsoft.png",
      fallback: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    },
    {
      name: "Google",
      local: "/logos/google.png",
      fallback: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      name: "Amazon",
      local: "/logos/amazon.png",
      fallback: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    {
      name: "Meta",
      local: "/logos/meta.png",
      fallback: "https://upload.wikimedia.org/wikipedia/commons/0/05/Meta_Platforms_Inc._logo.svg",
    },
    {
      name: "Apple",
      local: "/logos/apple.png",
      fallback: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    {
      name: "Netflix",
      local: "/logos/netflix.png",
      fallback: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    },
    {
      name: "Spotify",
      local: "/logos/spotify.png",
      fallback: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
    },
    {
      name: "Airbnb",
      local: "/logos/airbnb.png",
      fallback: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg",
    },
    {
      name: "IBM",
      local: "/logos/ibm.png",
      fallback: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
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
