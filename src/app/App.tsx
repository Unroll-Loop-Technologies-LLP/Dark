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
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Enable smooth scrolling
  useEffect(() => {
    // Set page title
    document.title = "Unroll Loop - Secure Innovate Scale";
    
    document.documentElement.style.scrollBehavior = "smooth";
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
      clearTimeout(timer);
    };
  }, []);

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