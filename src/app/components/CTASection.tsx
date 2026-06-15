import { motion } from "motion/react";
import ReCAPTCHA from "react-google-recaptcha";
import { ArrowRight, CalendarDays, CheckCircle2, Mail, ShieldCheck } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { openContact } from "../lib/contact-actions";
import { fetchJsonWithStructuredError } from "../lib/api-client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const defaultScheduleForm = () => ({
  inquiryType: "call",
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
  website: "",
  callDateTime: "",
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
});

export function CTASection() {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [scheduleForm, setScheduleForm] = useState(defaultScheduleForm);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setScheduleForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));

    if (submitError) {
      setSubmitError("");
    }
  };

  const handleScheduleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!recaptchaSiteKey) {
      setSubmitError("reCAPTCHA is not configured yet. Add VITE_RECAPTCHA_SITE_KEY to enable scheduling.");
      return;
    }

    if (!captchaToken) {
      setSubmitError("Please complete the reCAPTCHA check before scheduling the call.");
      return;
    }

    if (!scheduleForm.callDateTime) {
      setSubmitError("Please choose your preferred call date and time.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const result = await fetchJsonWithStructuredError<{ ok?: boolean; error?: string }>("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...scheduleForm,
          recaptchaToken: captchaToken,
        }),
      });

      // Handle error responses (4xx status codes - recoverable errors)
      if ("error" in result) {
        setSubmitError(result.error || "Unable to schedule your call right now.");
        setIsSubmitting(false);
        return;
      }

      // Handle success response
      if (!result?.ok) {
        setSubmitError("Unable to schedule your call right now.");
        setIsSubmitting(false);
        return;
      }

      setSubmittedEmail(scheduleForm.email);
      setScheduleForm(defaultScheduleForm());
      setCaptchaToken(null);
      setIsScheduleOpen(false);
      setIsSuccessOpen(true);
    } catch (error) {
      // Only reached on fatal 5xx errors after redirect attempt (unlikely)
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to schedule your call right now. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-6 md:px-20">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl p-16 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#6C5CE7] to-[#00D4FF]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10" />

          <div className="relative z-10">
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and explore how we can help you achieve your goals with cutting-edge technology.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                type="button"
                onClick={() => openContact("message")}
                className="group px-8 py-4 rounded-lg bg-white text-[#6C5CE7] font-semibold flex items-center gap-2 hover:bg-gray-100 transition-all hover:-translate-y-1 shadow-xl"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                type="button"
                onClick={() => setIsScheduleOpen(true)}
                className="px-8 py-4 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-all hover:-translate-y-1"
              >
                Schedule a Call
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
        <DialogContent className="border-white/10 bg-[#08111f] text-white shadow-2xl shadow-[#6C5CE7]/20 sm:max-w-2xl">
          <DialogHeader className="text-left">
            <DialogTitle className="text-2xl text-white">Schedule a Call</DialogTitle>
            <DialogDescription className="text-gray-300">
              Pick your preferred slot and we&apos;ll send a calendar invite through email.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleScheduleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="cta-name" className="mb-2 block text-white">Full Name *</label>
                <input
                  id="cta-name"
                  name="name"
                  type="text"
                  required
                  value={scheduleForm.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#6C5CE7] focus:outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="cta-email" className="mb-2 block text-white">Email *</label>
                <input
                  id="cta-email"
                  name="email"
                  type="email"
                  required
                  value={scheduleForm.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#6C5CE7] focus:outline-none"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="cta-phone" className="mb-2 block text-white">Phone</label>
                <input
                  id="cta-phone"
                  name="phone"
                  type="tel"
                  value={scheduleForm.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#6C5CE7] focus:outline-none"
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div>
                <label htmlFor="cta-company" className="mb-2 block text-white">Company</label>
                <input
                  id="cta-company"
                  name="company"
                  type="text"
                  value={scheduleForm.company}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#6C5CE7] focus:outline-none"
                  placeholder="Your Company"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-4 flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-[#6C5CE7]/25 to-[#00D4FF]/25 text-[#9F8BFF]">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Preferred Call Time</p>
                  <p className="text-sm text-gray-400">
                    Your invite will use timezone {scheduleForm.timeZone}.
                  </p>
                </div>
              </div>

              <input
                id="cta-callDateTime"
                name="callDateTime"
                type="datetime-local"
                required
                value={scheduleForm.callDateTime}
                onChange={handleChange}
                className="w-full rounded-lg border border-white/10 bg-[#0B0F1A] px-4 py-3 text-white focus:border-[#6C5CE7] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="cta-message" className="mb-2 block text-white">Call Agenda *</label>
              <textarea
                id="cta-message"
                name="message"
                required
                rows={5}
                value={scheduleForm.message}
                onChange={handleChange}
                className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#6C5CE7] focus:outline-none"
                placeholder="Tell us what you'd like to discuss on the call..."
              />
            </div>

            <div className="hidden" aria-hidden="true">
              <label htmlFor="cta-website">Website</label>
              <input
                id="cta-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={scheduleForm.website}
                onChange={handleChange}
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-3 flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-[#6C5CE7]/25 to-[#00D4FF]/25 text-[#9F8BFF]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Protected by Google reCAPTCHA</p>
                  <p className="text-sm text-gray-400">
                    This helps prevent automated scheduling spam.
                  </p>
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
                  Add <code className="font-mono">VITE_RECAPTCHA_SITE_KEY</code> to enable scheduling protection.
                </div>
              )}
            </div>

            {submitError ? (
              <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                {submitError}
              </p>
            ) : null}

            <DialogFooter className="mt-2">
              <button
                type="submit"
                disabled={!captchaToken || !recaptchaSiteKey || isSubmitting}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#00D4FF] px-6 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending Invite..." : "Schedule Call"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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
                  Call request received
                </DialogTitle>
                <DialogDescription className="text-base leading-7 text-gray-300">
                  Your preferred slot is on the way to our team. We&apos;ll use email to send the calendar invite.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-4 w-4 text-[#00D4FF]" />
                  reCAPTCHA completed before submission
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-[#00D4FF]" />
                  We&apos;ll follow up using {submittedEmail || "your email address"}
                </div>
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-4 w-4 text-[#00D4FF]" />
                  Calendar invite delivery requested
                </div>
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
