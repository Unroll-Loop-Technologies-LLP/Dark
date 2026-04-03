import { motion } from "motion/react";
import { Award, Users, Clock, Globe } from "lucide-react";

export function WhyChooseUs() {
  const stats = [
    {
      icon: Award,
      value: "150+",
      label: "Projects Delivered"
    },
    {
      icon: Users,
      value: "50+",
      label: "Expert Engineers"
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Support Available"
    },
    {
      icon: Globe,
      value: "30+",
      label: "Countries Served"
    }
  ];

  return (
    <section className="py-20 px-6 md:px-20">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Stats */}
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

          {/* Right - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full h-96">
              {/* Decorative Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 right-0 w-64 h-64 rounded-full border-2 border-[#6C5CE7]/30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-0 left-0 w-48 h-48 rounded-full border-2 border-[#00D4FF]/30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#6C5CE7]/10 to-[#00D4FF]/10 rounded-3xl backdrop-blur-sm" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}