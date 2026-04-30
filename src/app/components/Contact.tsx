import { motion } from "motion/react";
import ReCAPTCHA from "react-google-recaptcha";
import { CalendarDays, CheckCircle2, Mail, MapPin, Phone, Send, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { onContactIntent } from "../lib/contact-actions";

export function Contact() {
  const [formData, setFormData] = useState({
    inquiryType: "message" as "message" | "call",
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    website: "",
    callDateTime: "",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMode, setSuccessMode] = useState<"message" | "call">("message");
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    return onContactIntent((intent) => {
      setFormData((current) => ({
        ...current,
        inquiryType: intent,
      }));
      setSubmitError("");
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recaptchaSiteKey) {
      setSubmitError("reCAPTCHA is not configured yet. Add VITE_RECAPTCHA_SITE_KEY to enable the form.");
      return;
    }

    if (!captchaToken) {
      setSubmitError("Please complete the reCAPTCHA check before sending your message.");
      return;
    }

    if (formData.inquiryType === "call" && !formData.callDateTime) {
      setSubmitError("Please choose your preferred call date and time.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: captchaToken,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || "Unable to send your message right now.");
      }

      setSubmittedEmail(formData.email);
      setSuccessMode(formData.inquiryType);
      setIsSuccessOpen(true);
      setFormData({
        inquiryType: "message",
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        website: "",
        callDateTime: "",
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
      });
      setCaptchaToken(null);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to send your message right now. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (submitError) {
      setSubmitError("");
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      content: "Bengaluru, IN"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 760 462 5955"
    },
    {
      icon: Mail,
      title: "Email",
      content: "contact@unrollloop.com"
    }
  ];

  const isCallMode = formData.inquiryType === "call";
  const sectionHeading = isCallMode ? "Schedule a Call" : "Get In Touch";
  const sectionDescription = isCallMode
    ? "Share a preferred time and we’ll send a calendar invite to continue the conversation."
    : "Have a project in mind? Let's discuss how we can help you achieve your goals.";
  const messageLabel = isCallMode ? "What would you like to cover? *" : "Message *";
  const messagePlaceholder = isCallMode
    ? "Tell us what you'd like to discuss on the call..."
    : "Tell us about your project...";

  return (
    <section id="contact" className="py-20 px-6 md:px-20">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {sectionHeading}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {sectionDescription}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#6C5CE7] to-[#00D4FF] flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{info.title}</h4>
                    <p className="text-gray-400">{info.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#6C5CE7]/10 to-[#00D4FF]/10 border border-white/10">
              <h4 className="text-white font-bold mb-4">Office Hours</h4>
              <div className="space-y-2 text-gray-400">
                <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                <p>Saturday: 10:00 AM - 4:00 PM IST</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-1">
                <button
                  type="button"
                  onClick={() => setFormData((current) => ({ ...current, inquiryType: "message" }))}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                    !isCallMode ? "bg-white text-[#0B0F1A]" : "text-gray-300 hover:text-white"
                  }`}
                >
                  Contact Us
                </button>
                <button
                  type="button"
                  onClick={() => setFormData((current) => ({ ...current, inquiryType: "call" }))}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                    isCallMode ? "bg-white text-[#0B0F1A]" : "text-gray-300 hover:text-white"
                  }`}
                >
                  Schedule a Call
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#6C5CE7] transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#6C5CE7] transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-white mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#6C5CE7] transition-colors"
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-white mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#6C5CE7] transition-colors"
                  placeholder="Your Company"
                />
              </div>

                {isCallMode ? (
                  <div className="sm:col-span-2">
                    <label htmlFor="callDateTime" className="mb-2 block text-white">
                      Preferred Call Time *
                    </label>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="mb-4 flex items-start gap-3">
                        <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-[#6C5CE7]/25 to-[#00D4FF]/25 text-[#9F8BFF]">
                          <CalendarDays className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">Calendar invite delivery</p>
                          <p className="text-sm text-gray-400">
                            We’ll send an email invite for your selected slot and use timezone {formData.timeZone}.
                          </p>
                        </div>
                      </div>

                      <input
                        type="datetime-local"
                        id="callDateTime"
                        name="callDateTime"
                        required={isCallMode}
                        value={formData.callDateTime}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-white/10 bg-[#0B0F1A] px-4 py-3 text-white focus:outline-none focus:border-[#6C5CE7] transition-colors"
                      />
                    </div>
                  </div>
                ) : null}
              </div>

              <div>
                <label htmlFor="message" className="block text-white mb-2">
                  {messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#6C5CE7] transition-colors resize-none"
                  placeholder={messagePlaceholder}
                />
              </div>

              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <div className="mb-3 flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-[#6C5CE7]/25 to-[#00D4FF]/25 text-[#9F8BFF]">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Protected by Google reCAPTCHA</p>
                  </div>
                </div>

                {recaptchaSiteKey ? (
                  <div className="overflow-x-auto">
                    <ReCAPTCHA
                      sitekey={recaptchaSiteKey}
                      theme="dark"
                      onChange={(token) => {
                        setCaptchaToken(token);
                        if (submitError) {
                          setSubmitError("");
                        }
                      }}
                      onExpired={() => setCaptchaToken(null)}
                    />
                  </div>
                ) : (
                  <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
                    Add <code className="font-mono">VITE_RECAPTCHA_SITE_KEY</code> to your environment to enable bot protection.
                  </div>
                )}
              </div>

              {submitError ? (
                <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                  {submitError}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={!captchaToken || !recaptchaSiteKey || isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#6C5CE7] to-[#00D4FF] px-8 py-4 font-semibold text-white shadow-lg shadow-[#6C5CE7]/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#6C5CE7]/70 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

                <p className="text-xs leading-6 text-gray-500">
                Messages are verified with reCAPTCHA and sent through the secure server-side contact endpoint.
              </p>
            </form>
          </motion.div>
        </div>
      </div>

      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="overflow-hidden border-white/10 bg-[#08111f] p-0 text-white shadow-2xl shadow-[#6C5CE7]/20 sm:max-w-xl">
          <div className="relative">
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-r from-[#6C5CE7]/30 via-[#0c1830] to-[#00D4FF]/30 blur-2xl" />
            <div className="relative px-6 pb-6 pt-8 sm:px-8">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-[#6C5CE7] to-[#00D4FF] shadow-lg shadow-[#6C5CE7]/30">
                <CheckCircle2 className="h-8 w-8 text-white" />
              </div>

              <DialogHeader className="space-y-3 text-left">
                <DialogTitle className="text-2xl font-bold text-white">
                  {successMode === "call" ? "Call request received" : "Thanks for reaching out"}
                </DialogTitle>
                <DialogDescription className="text-base leading-7 text-gray-300">
                  {successMode === "call"
                    ? "Your preferred time has been shared with our team. A calendar invite will be sent through email once the slot is processed."
                    : "Your message is queued for review. We&apos;ll get back to you soon with the next steps."}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-[#00D4FF]" />
                  We'll follow up using {submittedEmail || "your email address"}
                </div>
                {successMode === "call" ? (
                  <div className="flex items-center gap-3">
                    <CalendarDays className="h-4 w-4 text-[#00D4FF]" />
                    Calendar invite delivery requested
                  </div>
                ) : null}
              </div>

              <DialogFooter className="mt-8">
                <button
                  type="button"
                  onClick={() => setIsSuccessOpen(false)}
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#00D4FF] px-6 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  Close
                </button>
              </DialogFooter>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
