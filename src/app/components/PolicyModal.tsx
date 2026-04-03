import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "privacy" | "terms" | "cookies";
}

export function PolicyModal({ isOpen, onClose, type }: PolicyModalProps) {
  const content = {
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "April 3, 2026",
      sections: [
        {
          heading: "Information We Collect",
          content: "We collect information that you provide directly to us, including name, email address, phone number, and any other information you choose to provide when using our services or contacting us."
        },
        {
          heading: "How We Use Your Information",
          content: "We use the information we collect to provide, maintain, and improve our services, communicate with you, process transactions, and comply with legal obligations."
        },
        {
          heading: "Information Sharing",
          content: "We do not sell your personal information. We may share your information with service providers who assist us in operating our business, with your consent, or as required by law."
        },
        {
          heading: "Data Security",
          content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
        },
        {
          heading: "Your Rights",
          content: "You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing of your data. Contact us at contact@unrollloop.com to exercise these rights."
        },
        {
          heading: "Contact Us",
          content: "If you have questions about this Privacy Policy, please contact us at contact@unrollloop.com"
        }
      ]
    },
    terms: {
      title: "Terms of Service",
      lastUpdated: "April 3, 2026",
      sections: [
        {
          heading: "Acceptance of Terms",
          content: "By accessing or using Unroll Loop Technologies' services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services."
        },
        {
          heading: "Services Description",
          content: "Unroll Loop Technologies provides software engineering, AI/ML solutions, cybersecurity, and related technology consulting services. We reserve the right to modify or discontinue any service at any time."
        },
        {
          heading: "User Responsibilities",
          content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to use our services only for lawful purposes."
        },
        {
          heading: "Intellectual Property",
          content: "All content, trademarks, and data on our platform, including but not limited to software, text, images, and logos, are the property of Unroll Loop Technologies or our licensors."
        },
        {
          heading: "Limitation of Liability",
          content: "Unroll Loop Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services."
        },
        {
          heading: "Governing Law",
          content: "These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions."
        },
        {
          heading: "Contact Information",
          content: "For questions about these Terms of Service, please contact us at contact@unrollloop.com"
        }
      ]
    },
    cookies: {
      title: "Cookie Policy",
      lastUpdated: "April 3, 2026",
      sections: [
        {
          heading: "What Are Cookies",
          content: "Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site."
        },
        {
          heading: "Types of Cookies We Use",
          content: "Essential Cookies: Required for the website to function properly. Analytics Cookies: Help us understand how visitors interact with our website. Preference Cookies: Remember your settings and preferences. Marketing Cookies: Used to track visitors across websites to display relevant advertisements."
        },
        {
          heading: "How We Use Cookies",
          content: "We use cookies to authenticate users, remember preferences, analyze site traffic and usage patterns, and improve our services based on the information we collect."
        },
        {
          heading: "Third-Party Cookies",
          content: "We may use third-party services like Google Analytics that place cookies on your device. These third parties have their own privacy policies governing their use of information."
        },
        {
          heading: "Managing Cookies",
          content: "You can control and manage cookies through your browser settings. Note that disabling cookies may affect the functionality of our website and limit your user experience."
        },
        {
          heading: "Updates to This Policy",
          content: "We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated 'Last Updated' date."
        },
        {
          heading: "Contact Us",
          content: "If you have questions about our use of cookies, please contact us at contact@unrollloop.com"
        }
      ]
    }
  };

  const currentContent = content[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
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
            className="relative bg-[#0B0F1A] border border-white/10 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#0B0F1A]/95 backdrop-blur-sm border-b border-white/10 p-6 flex items-center justify-between z-10">
              <div>
                <h2 className="text-2xl font-bold text-white">{currentContent.title}</h2>
                <p className="text-sm text-gray-400 mt-1">Last updated: {currentContent.lastUpdated}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/5 transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              {currentContent.sections.map((section, index) => (
                <div key={index}>
                  <h3 className="text-lg font-bold text-[#6C5CE7] mb-3">{section.heading}</h3>
                  <p className="text-gray-300 leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}