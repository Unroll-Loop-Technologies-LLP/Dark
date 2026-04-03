import { motion } from "motion/react";
import { Brain, Code2, ShieldCheck, Cloud, Smartphone, GitBranch, Shield } from "lucide-react";

export function Services() {
  const services = [
    {
      icon: ShieldCheck,
      title: "Cybersecurity",
      description: "Comprehensive security audits, penetration testing, and implementation of security best practices.",
      featured: true
    },
    {
      icon: Brain,
      title: "AI/ML Solutions",
      description: "Custom machine learning models, NLP, computer vision, and AI-powered automation for your business."
    },
    {
      icon: Code2,
      title: "Full Stack Development",
      description: "End-to-end web applications with modern frameworks, scalable architecture, and beautiful UX."
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "AWS, Azure, GCP deployment, serverless architecture, and cloud-native application development."
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Native and cross-platform mobile apps for iOS and Android with seamless user experiences."
    },
    {
      icon: GitBranch,
      title: "DevOps & CI/CD",
      description: "Automated pipelines, containerization, monitoring, and infrastructure as code implementation."
    }
  ];

  return (
    <section id="services" className="py-20 px-6 md:px-20 bg-white/[0.02]">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive technology solutions to power your digital transformation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`group p-8 rounded-2xl bg-gradient-to-br transition-all hover:-translate-y-2 cursor-pointer relative overflow-hidden ${
                service.featured
                  ? 'from-[#6C5CE7]/10 to-[#00D4FF]/10 border-2 border-[#6C5CE7] shadow-lg shadow-[#6C5CE7]/20'
                  : 'from-white/5 to-white/[0.02] border border-white/10 hover:border-[#6C5CE7]/50'
              }`}
            >
              {service.featured && (
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 rounded-full bg-gradient-to-r from-[#6C5CE7] to-[#00D4FF] text-white text-xs font-bold flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Featured
                  </div>
                </div>
              )}
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#6C5CE7] to-[#00D4FF] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}