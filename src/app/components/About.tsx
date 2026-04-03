import { motion } from "motion/react";
import { Target, Lightbulb, Rocket, Heart } from "lucide-react";

export function About() {
  const values = [
    {
      icon: Target,
      title: "Mission Driven",
      description: "We're committed to delivering innovative solutions that drive real business value and transform digital experiences."
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We stay ahead of the curve, leveraging the latest technologies and methodologies to solve complex challenges."
    },
    {
      icon: Rocket,
      title: "Results Focused",
      description: "Your success is our success. We measure our impact by the tangible results we deliver to your business."
    },
    {
      icon: Heart,
      title: "Client Centric",
      description: "Building lasting partnerships through transparency, communication, and exceptional service delivery."
    }
  ];

  return (
    <section id="about" className="py-20 px-6 md:px-20 bg-white/[0.02]">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Unroll Loop Technologies
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're a team of passionate engineers, designers, and innovators dedicated to building 
            the future of digital products. Based in Bengaluru, we serve clients globally with 
            cutting-edge AI and engineering solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 mb-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">Who We Are</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              Founded with a vision to democratize access to world-class technology, Unroll Loop Technologies 
              has grown into a trusted partner for businesses looking to scale their digital presence.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              Our team brings together expertise in artificial intelligence, full-stack development, 
              cybersecurity, and cloud infrastructure to deliver comprehensive solutions that drive growth.
            </p>
            <p className="text-gray-400 leading-relaxed">
              We believe in the power of technology to transform businesses and improve lives. That's why 
              we're committed to staying at the forefront of innovation, constantly learning and adapting 
              to serve our clients better.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full h-96 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7]/20 to-[#00D4FF]/20 backdrop-blur-sm" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 p-8">
                  <div className="h-32 rounded-2xl bg-gradient-to-br from-[#6C5CE7]/30 to-transparent border border-white/10" />
                  <div className="h-32 rounded-2xl bg-gradient-to-br from-[#00D4FF]/30 to-transparent border border-white/10" />
                  <div className="h-32 rounded-2xl bg-gradient-to-br from-[#00D4FF]/30 to-transparent border border-white/10" />
                  <div className="h-32 rounded-2xl bg-gradient-to-br from-[#6C5CE7]/30 to-transparent border border-white/10" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[#6C5CE7]/50 transition-all hover:-translate-y-2"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#6C5CE7] to-[#00D4FF] flex items-center justify-center mb-4">
                <value.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{value.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
