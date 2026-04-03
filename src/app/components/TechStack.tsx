import { motion } from "motion/react";

export function TechStack() {
  const technologies = [
    "React", "TypeScript", "Node.js", "Python", "TensorFlow",
    "AWS", "Docker", "Kubernetes", "PostgreSQL", "MongoDB",
    "GraphQL", "Next.js", "Flutter", "PyTorch", "Redis",
    "Terraform", "Jenkins", "FastAPI", "Vue.js", "Go"
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-white/[0.02]">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Our Tech Stack
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We work with cutting-edge technologies to deliver the best solutions
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:border-[#6C5CE7]/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}