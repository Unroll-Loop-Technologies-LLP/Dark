import { motion } from "motion/react";
import { Shield, Lock, Eye, FileCheck, AlertTriangle, KeyRound } from "lucide-react";

export function SecurityHighlight() {
  const securityServices = [
    {
      icon: Shield,
      title: "Penetration Testing",
      description: "Comprehensive security assessments to identify vulnerabilities before attackers do."
    },
    {
      icon: Lock,
      title: "Application Security",
      description: "Secure coding practices, code reviews, and security testing throughout development."
    },
    {
      icon: Eye,
      title: "Security Monitoring",
      description: "24/7 threat detection and incident response to protect your digital assets."
    },
    {
      icon: FileCheck,
      title: "Compliance & Audits",
      description: "GDPR, SOC 2, ISO 27001 compliance consulting and security audits."
    },
    {
      icon: AlertTriangle,
      title: "Vulnerability Management",
      description: "Continuous scanning, assessment, and remediation of security vulnerabilities."
    },
    {
      icon: KeyRound,
      title: "Identity & Access Management",
      description: "Robust authentication, authorization, and access control implementation."
    }
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-[#0B0F1A] via-[#1a1f3a] to-[#0B0F1A] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6C5CE7]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00D4FF]/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#6C5CE7]/20 to-[#00D4FF]/20 border border-[#6C5CE7]/30 mb-6">
            <Shield className="w-5 h-5 text-[#6C5CE7]" />
            <span className="text-[#6C5CE7] font-semibold">Security First Approach</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Enterprise-Grade <span className="bg-gradient-to-r from-[#6C5CE7] to-[#00D4FF] bg-clip-text text-transparent">Cybersecurity</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Protect your digital assets with our comprehensive security solutions. We implement industry-leading 
            practices to safeguard your applications, data, and infrastructure from evolving threats.
          </p>
        </motion.div>

        {/* Security Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { value: "99.9%", label: "Uptime Guarantee" },
            { value: "24/7", label: "Security Monitoring" },
            { value: "Zero", label: "Data Breaches" },
            { value: "ISO 27001", label: "Certified" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#6C5CE7] to-[#00D4FF] bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Security Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#6C5CE7]/50 transition-all hover:-translate-y-2 cursor-pointer relative overflow-hidden"
            >
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#6C5CE7]/0 to-[#00D4FF]/0 group-hover:from-[#6C5CE7]/5 group-hover:to-[#00D4FF]/5 transition-all" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#00D4FF] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-[#6C5CE7] to-[#00D4FF] text-white font-semibold shadow-lg shadow-[#6C5CE7]/50 hover:shadow-xl hover:shadow-[#6C5CE7]/70 transition-all hover:-translate-y-1"
          >
            <Shield className="w-5 h-5" />
            Schedule a Security Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
}