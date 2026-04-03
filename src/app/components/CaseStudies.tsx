import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { CaseStudyModal } from "./CaseStudyModal";

interface CaseStudy {
  industry: string;
  company: string;
  tagline: string;
  context: string;
  challenge: string;
  solution: string;
  architecture: string[];
  timeline: string;
  outcomes: {
    metric: string;
    description: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  tags: string[];
  previewMetrics: {
    label: string;
    value: string;
  }[];
}

export function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const cases: CaseStudy[] = [
    {
      industry: "Manufacturing · Meridian Industrial",
      company: "Meridian Industrial",
      tagline: "Real-time supply chain visibility across 14 plants",
      context: "Meridian needed a single operational picture across plants with heterogeneous systems and strict uptime requirements.",
      challenge: "Fragmented data, manual reconciliations, and slow incident response were driving inventory risk and missed shipments.",
      solution: "We delivered an event-driven integration layer, standardized KPIs, and role-based dashboards with clear escalation paths.",
      architecture: [
        "Event streaming + idempotent consumers",
        "Domain services behind versioned APIs",
        "Observability stack with SLOs and on-call runbooks"
      ],
      timeline: "6 months to production; phased rollout by region",
      outcomes: [
        { metric: "−32%", description: "Time-to-detect supply exceptions" },
        { metric: "+18 pts", description: "On-time fulfillment (rolling 90-day)" },
        { metric: "4×", description: "Faster cross-plant incident triage" }
      ],
      testimonial: {
        quote: "Unroll Loop shipped like an embedded product team—clear tradeoffs, disciplined delivery, and operators actually use what we built.",
        author: "Elena Voss",
        role: "VP Operations, Meridian Industrial"
      },
      tags: ["IoT", "Real-time Systems", "Enterprise Integration"],
      previewMetrics: [
        { label: "Exception Detection", value: "−32%" },
        { label: "Fulfillment Rate", value: "+18 pts" },
        { label: "Incident Triage", value: "4×" }
      ]
    },
    {
      industry: "FinTech · NovaBank",
      company: "NovaBank",
      tagline: "Zero-downtime migration to microservices architecture",
      context: "NovaBank's monolithic platform was becoming a bottleneck for innovation, with deployment cycles stretching to 6 weeks and increasing outages during peak trading hours.",
      challenge: "Decompose a mission-critical financial system serving 2M+ users without service interruptions, while maintaining strict regulatory compliance and audit trails.",
      solution: "We implemented a strangler fig pattern with domain-driven design, gradually extracting bounded contexts into independent services with comprehensive observability and automated rollback capabilities.",
      architecture: [
        "Event-sourced transaction processing with CQRS",
        "Service mesh with mutual TLS and circuit breakers",
        "Distributed tracing and real-time anomaly detection",
        "Blue-green deployments with automated canary analysis"
      ],
      timeline: "9 months; 23 services extracted across 4 phases",
      outcomes: [
        { metric: "99.99%", description: "Uptime during migration" },
        { metric: "12×", description: "Faster feature deployment" },
        { metric: "−67%", description: "P95 latency reduction" }
      ],
      testimonial: {
        quote: "They understood that 'move fast' in banking means zero tolerance for data loss. The migration was invisible to our users and auditors.",
        author: "Rajesh Kumar",
        role: "CTO, NovaBank"
      },
      tags: ["Cloud Migration", "Microservices", "FinTech", "Security"],
      previewMetrics: [
        { label: "Uptime", value: "99.99%" },
        { label: "Deploy Speed", value: "12×" },
        { label: "Latency", value: "−67%" }
      ]
    },
    {
      industry: "Healthcare · Astra Health",
      company: "Astra Health",
      tagline: "AI-powered diagnostic assistant for 500+ clinics",
      context: "Astra Health wanted to augment physician decision-making with machine learning insights, but faced strict HIPAA requirements and integration with legacy EHR systems.",
      challenge: "Build a HIPAA-compliant ML platform that processes sensitive medical imaging and patient data while maintaining sub-second inference times and seamless EHR integration.",
      solution: "We architected a federated learning system with on-premise inference nodes, centralized model training with differential privacy, and HL7/FHIR adapters for bidirectional EHR sync.",
      architecture: [
        "Federated learning with encrypted gradient aggregation",
        "GPU-accelerated inference with model versioning",
        "HIPAA-compliant data pipelines with audit logging",
        "HL7 FHIR APIs with OAuth 2.0 + SMART on FHIR"
      ],
      timeline: "8 months to FDA submission; 3-month pilot rollout",
      outcomes: [
        { metric: "94%", description: "Diagnostic accuracy on pilot cohort" },
        { metric: "−40%", description: "Average diagnosis turnaround time" },
        { metric: "500+", description: "Clinics using the platform" }
      ],
      testimonial: {
        quote: "Unroll Loop balanced cutting-edge AI with the regulatory rigor we needed. The platform feels like a natural extension of our workflow.",
        author: "Dr. Priya Sharma",
        role: "Chief Medical Officer, Astra Health"
      },
      tags: ["AI/ML", "Healthcare", "HIPAA", "Privacy"],
      previewMetrics: [
        { label: "Accuracy", value: "94%" },
        { label: "Turnaround", value: "−40%" },
        { label: "Clinics", value: "500+" }
      ]
    },
    {
      industry: "E-Commerce · CartFlow",
      company: "CartFlow",
      tagline: "Global checkout platform handling 10K orders/minute",
      context: "CartFlow's checkout system was struggling with flash sales, experiencing cart abandonment spikes during high-traffic events due to performance degradation.",
      challenge: "Scale payment processing infrastructure to handle 10× traffic spikes during flash sales across 40+ countries, each with unique payment methods and tax regulations.",
      solution: "We built a geo-distributed checkout system with adaptive rate limiting, regional payment orchestration, and real-time inventory synchronization using CRDTs for conflict-free cart merges.",
      architecture: [
        "Multi-region active-active deployment with edge caching",
        "Event-driven payment orchestration with saga patterns",
        "CRDT-based cart state with vector clocks",
        "Redis + DynamoDB for session management at scale"
      ],
      timeline: "5 months; launched before Black Friday peak season",
      outcomes: [
        { metric: "10K/min", description: "Peak order processing capacity" },
        { metric: "−58%", description: "Cart abandonment during flash sales" },
        { metric: "99.95%", description: "Payment success rate globally" }
      ],
      testimonial: {
        quote: "Our Black Friday was flawless. The system handled 8× our normal traffic without breaking a sweat. Worth every penny.",
        author: "Marcus Johnson",
        role: "VP Engineering, CartFlow"
      },
      tags: ["E-Commerce", "Scalability", "Distributed Systems", "Payments"],
      previewMetrics: [
        { label: "Orders/Min", value: "10K" },
        { label: "Abandonment", value: "−58%" },
        { label: "Success Rate", value: "99.95%" }
      ]
    },
    {
      industry: "SaaS · CollabSpace",
      company: "CollabSpace",
      tagline: "Real-time collaboration platform for distributed teams",
      context: "CollabSpace needed to compete with established players by delivering millisecond-latency real-time collaboration features across video, documents, and whiteboards.",
      challenge: "Build a WebRTC-based collaboration suite that maintains sub-100ms latency for global teams while supporting offline mode, conflict resolution, and end-to-end encryption.",
      solution: "We implemented operational transformation for document editing, selective forwarding units for video optimization, and a hybrid CRDT/OT approach for whiteboard collaboration with end-to-end encryption.",
      architecture: [
        "WebRTC SFU with adaptive bitrate and simulcast",
        "Operational transformation with MongoDB for persistence",
        "WebAssembly-based crypto for client-side encryption",
        "WebSocket clusters with Redis pub/sub for presence"
      ],
      timeline: "7 months; beta launch with 50 enterprise customers",
      outcomes: [
        { metric: "<100ms", description: "P95 collaboration latency globally" },
        { metric: "2M+", description: "Monthly active users in 6 months" },
        { metric: "E2E", description: "End-to-end encryption maintained" }
      ],
      testimonial: {
        quote: "They didn't just build features—they solved the hard distributed systems problems that make real-time collaboration actually work at scale.",
        author: "Sarah Mitchell",
        role: "Co-founder & CTO, CollabSpace"
      },
      tags: ["Real-time", "WebRTC", "Collaboration", "SaaS"],
      previewMetrics: [
        { label: "Latency", value: "<100ms" },
        { label: "MAU", value: "2M+" },
        { label: "Security", value: "E2E" }
      ]
    }
  ];

  return (
    <>
      <section id="case-studies" className="py-20 px-6 md:px-20">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 mb-4 uppercase tracking-wider">
              Case Studies
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Real results from real projects
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See how we've helped businesses transform their operations and achieve measurable outcomes.
            </p>
          </motion.div>

          <div className="space-y-6">
            {cases.map((caseStudy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCase(caseStudy)}
                className="group p-8 rounded-2xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 hover:border-[#6C5CE7]/50 transition-all hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-2">{caseStudy.industry}</div>
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-white">{caseStudy.tagline}</h3>
                      <ArrowUpRight className="w-5 h-5 text-[#6C5CE7] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {caseStudy.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-white/5 text-sm text-gray-400 border border-white/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-8">
                    {caseStudy.previewMetrics.map((metric, i) => (
                      <div key={i} className="text-center">
                        <div className="text-3xl font-bold bg-gradient-to-r from-[#6C5CE7] to-[#00D4FF] bg-clip-text text-transparent mb-1">
                          {metric.value}
                        </div>
                        <div className="text-sm text-gray-500 whitespace-nowrap">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {selectedCase && (
        <CaseStudyModal
          caseStudy={selectedCase}
          onClose={() => setSelectedCase(null)}
        />
      )}
    </>
  );
}
