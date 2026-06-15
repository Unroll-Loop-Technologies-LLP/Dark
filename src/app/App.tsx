import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TrustedBy } from "./components/TrustedBy";
import { ProblemSection } from "./components/ProblemSection";
import { Services } from "./components/Services";
import { SecurityHighlight } from "./components/SecurityHighlight";
import { CaseStudies } from "./components/CaseStudies";
import { TechStack } from "./components/TechStack";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { TestimonialsScroll } from "./components/TestimonialsScroll";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { CyberCursor } from "./components/CyberCursor";
import { LoadingScreen } from "./components/LoadingScreen";
import { PrivacyPage } from "./components/legal/PrivacyPage";
import { TermsPage } from "./components/legal/TermsPage";
import { CookiesPage } from "./components/legal/CookiesPage";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { redirectToErrorPage } from "./lib/error-redirect";
import { getCurrentRoute, isLegalRoute } from "./lib/routing";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentRoute, setCurrentRoute] = useState<string | null>(null);

  // Enable smooth scrolling
  useEffect(() => {
    // Set page title
    document.title = "Unroll Loop - Secure Innovate Scale";

    document.documentElement.style.scrollBehavior = "smooth";

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason);
      redirectToErrorPage((event.reason as any)?.status || 500);
    };

    const handleWindowError = (event: ErrorEvent) => {
      console.error("Unhandled error:", event.error || event.message, event.filename, event.lineno, event.colno);
      redirectToErrorPage(500);
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    window.addEventListener("error", handleWindowError);

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
      window.removeEventListener("error", handleWindowError);
      clearTimeout(timer);
    };
  }, []);

  // Setup route listener
  useEffect(() => {
    const handleHashChange = () => {
      const route = getCurrentRoute();
      setCurrentRoute(route);
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Call immediately on mount

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Render legal pages as full-page routes
  if (currentRoute === "privacy") {
    return (
      <>
        <CyberCursor />
        <Navbar />
        <PrivacyPage />
        <WhatsAppButton />
      </>
    );
  }

  if (currentRoute === "terms") {
    return (
      <>
        <CyberCursor />
        <Navbar />
        <TermsPage />
        <WhatsAppButton />
      </>
    );
  }

  if (currentRoute === "cookies") {
    return (
      <>
        <CyberCursor />
        <Navbar />
        <CookiesPage />
        <WhatsAppButton />
      </>
    );
  }

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      <div className="min-h-screen bg-[#0B0F1A] overflow-x-hidden">
        <CyberCursor />
        <Navbar />
        <Hero />
        <TrustedBy />
        <About />
        <ProblemSection />
        <Services />
        <SecurityHighlight />
        <CaseStudies />
        <TechStack />
        <WhyChooseUs />
        <TestimonialsScroll />
        <Contact />
        <CTASection />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}