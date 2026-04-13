import { Github, Linkedin, Mail, Facebook, Instagram } from "lucide-react";
import { Logo } from "./Logo";
import { useState } from "react";
import { PolicyModal } from "./PolicyModal";

export function Footer() {
  const [policyModal, setPolicyModal] = useState<"privacy" | "terms" | "cookies" | null>(null);

  return (
    <>
      <footer className="py-16 px-6 md:px-20 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Logo className="w-10 h-10" />
                <span className="text-xl font-bold text-white">Unroll Loop</span>
              </div>
              <p className="text-gray-400 mb-4">
                Building the future with AI-powered engineering solutions.
              </p>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/unrollloop" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/unrollloop/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/company/unrollloop" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://x.com/unrollloop" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">AI/ML Solutions</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Full Stack Development</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Cybersecurity</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Cloud Infrastructure</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#case-studies" className="text-gray-400 hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="https://blog.unrollloop.com" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">Bengaluru, IN</li>
                <li className="text-gray-400">+1 760 462 5955</li>
                <li className="text-gray-400">contact@unrollloop.com</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2024-2026 Unroll Loop Technologies. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <button onClick={() => setPolicyModal("privacy")} className="text-gray-500 hover:text-white transition-colors">
                Privacy Policy
              </button>
              <button onClick={() => setPolicyModal("terms")} className="text-gray-500 hover:text-white transition-colors">
                Terms of Service
              </button>
              <button onClick={() => setPolicyModal("cookies")} className="text-gray-500 hover:text-white transition-colors">
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </footer>

      {policyModal && (
        <PolicyModal
          isOpen={true}
          onClose={() => setPolicyModal(null)}
          type={policyModal}
        />
      )}
    </>
  );
}
