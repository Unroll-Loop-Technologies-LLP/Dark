import { X } from "lucide-react";
import { useEffect } from "react";
import { PolicyContent } from "./PrivacyPolicyContent";

interface LegalPageProps {
  content: PolicyContent;
  isModal?: boolean;
  onClose?: () => void;
}

export function LegalPage({ content, isModal = false, onClose }: LegalPageProps) {
  useEffect(() => {
    if (!isModal) {
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      document.title = `${content.title} - Unroll Loop`;
    }
  }, [content, isModal]);

  const mainContent = (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">{content.title}</h1>
        <p className="text-sm text-gray-400">Last updated: {content.lastUpdated}</p>
      </div>
      
      {content.sections.map((section, index) => (
        <div key={index}>
          <h2 className="text-lg font-bold text-[#6C5CE7] mb-3">{section.heading}</h2>
          <p className="text-gray-300 leading-relaxed">{section.content}</p>
        </div>
      ))}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <div className="relative bg-[#0B0F1A] border border-white/10 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="sticky top-0 bg-[#0B0F1A]/95 backdrop-blur-sm border-b border-white/10 p-6 flex items-center justify-between z-10">
            <div>
              <h2 className="text-2xl font-bold text-white">{content.title}</h2>
              <p className="text-sm text-gray-400 mt-1">Last updated: {content.lastUpdated}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/5 transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto">
            {mainContent}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <div className="max-w-3xl mx-auto px-6 md:px-20 py-16">
        {mainContent}
      </div>
    </div>
  );
}
