import { motion, AnimatePresence } from "motion/react";
import { X, ArrowLeft } from "lucide-react";

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
}

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

export function CaseStudyModal({ caseStudy, onClose }: CaseStudyModalProps) {
  if (!caseStudy) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-[#0B0F1A] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-[#0B0F1A]/95 backdrop-blur-sm border-b border-white/10 p-6 flex items-center justify-between z-10">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>All case studies</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/5 transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10 space-y-8">
            {/* Title Section */}
            <div>
              <div className="text-sm text-gray-400 mb-2">
                {caseStudy.industry}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {caseStudy.tagline}
              </h2>
              <div className="flex flex-wrap gap-2">
                {caseStudy.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-white/5 text-sm text-gray-400 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Context */}
            <div>
              <h3 className="text-lg font-bold text-[#6C5CE7] mb-3">Context</h3>
              <p className="text-gray-300 leading-relaxed">{caseStudy.context}</p>
            </div>

            {/* Challenge */}
            <div>
              <h3 className="text-lg font-bold text-[#6C5CE7] mb-3">Challenge</h3>
              <p className="text-gray-300 leading-relaxed">{caseStudy.challenge}</p>
            </div>

            {/* Solution */}
            <div>
              <h3 className="text-lg font-bold text-[#6C5CE7] mb-3">Solution</h3>
              <p className="text-gray-300 leading-relaxed">{caseStudy.solution}</p>
            </div>

            {/* Architecture */}
            <div>
              <h3 className="text-lg font-bold text-[#6C5CE7] mb-3">Architecture</h3>
              <ul className="space-y-2">
                {caseStudy.architecture.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <span className="text-[#00D4FF] mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-lg font-bold text-[#6C5CE7] mb-3">Timeline</h3>
              <p className="text-gray-300 leading-relaxed">{caseStudy.timeline}</p>
            </div>

            {/* Outcomes */}
            <div>
              <h3 className="text-lg font-bold text-[#6C5CE7] mb-6">Outcomes</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {caseStudy.outcomes.map((outcome, i) => (
                  <div key={i} className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#6C5CE7] to-[#00D4FF] bg-clip-text text-transparent mb-2">
                      {outcome.metric}
                    </div>
                    <div className="text-sm text-gray-400">{outcome.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#6C5CE7]/10 to-[#00D4FF]/5 border border-[#6C5CE7]/20">
              <p className="text-xl text-gray-300 italic mb-6 leading-relaxed">
                "{caseStudy.testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#6C5CE7] to-[#00D4FF] flex items-center justify-center text-white font-bold">
                  {caseStudy.testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-bold text-white">{caseStudy.testimonial.author}</div>
                  <div className="text-sm text-gray-400">{caseStudy.testimonial.role}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
