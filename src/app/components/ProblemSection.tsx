import { motion } from "motion/react";
import { Zap, Shield, TrendingUp } from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      icon: Zap,
      title: "Slow Development",
      description: "Traditional development cycles take months. We deliver in weeks with agile methodologies."
    },
    {
      icon: Shield,
      title: "Security Concerns",
      description: "Data breaches cost millions. Our security-first approach protects your digital assets."
    },
    {
      icon: TrendingUp,
      title: "Scalability Issues",
      description: "Growth shouldn't break your app. We build systems that scale with your success."
    }
  ];

  return (
    <section className="py-20 px-6 md:px-20">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Challenges We Solve
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Modern businesses face complex technical challenges. We provide solutions that matter.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#6C5CE7]/50 transition-all hover:-translate-y-2"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#00D4FF] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <problem.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{problem.title}</h3>
              <p className="text-gray-400 leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}