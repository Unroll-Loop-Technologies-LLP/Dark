import { motion } from "motion/react";
import { Quote } from "lucide-react";

export function TestimonialsScroll() {
  const testimonials = [
    {
      quote: "They were one of the few partners who could improve architecture, delivery speed, and security posture without bloating the process.",
      author: "Lisa Carter",
      role: "CTO, Flux Retail",
      avatar: "LC"
    },
    {
      quote: "Unroll Loop transformed our entire infrastructure. Their expertise in cloud architecture and AI integration helped us scale 10x faster than anticipated.",
      author: "Sarah Chen",
      role: "CTO, TechVision Inc",
      avatar: "SC"
    },
    {
      quote: "The team's attention to detail and technical prowess is unmatched. They delivered our MVP in half the time we expected.",
      author: "Michael Rodriguez",
      role: "Founder, StartupHub",
      avatar: "MR"
    },
    {
      quote: "Working with Unroll Loop was a game-changer. Their DevOps expertise streamlined our deployment process and reduced costs by 40%.",
      author: "Emily Watson",
      role: "VP Engineering, DataFlow",
      avatar: "EW"
    },
    {
      quote: "Outstanding security implementation. They helped us achieve SOC 2 compliance and built a robust security framework.",
      author: "Aarav Menon",
      role: "VP Product, NovaBank",
      avatar: "AM"
    },
    {
      quote: "Their AI solutions have revolutionized how we process data. The accuracy and speed improvements are remarkable.",
      author: "Ritika Sharma",
      role: "Director of Engineering, Astra Health",
      avatar: "RS"
    },
    {
      quote: "Professional, innovative, and always ahead of the curve. Best tech partner we've ever worked with.",
      author: "James Wilson",
      role: "CEO, CloudScale",
      avatar: "JW"
    },
    {
      quote: "The mobile app they built for us has a 4.9 rating with over 1M downloads. Exceptional quality and user experience.",
      author: "Priya Patel",
      role: "Product Manager, FitLife",
      avatar: "PP"
    }
  ];

  // Split testimonials into 3 columns
  const column1 = testimonials.slice(0, 3);
  const column2 = testimonials.slice(3, 6);
  const column3 = testimonials.slice(6, 8);

  const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 mb-6 hover:border-[#6C5CE7]/50 transition-all">
      <Quote className="w-8 h-8 text-[#6C5CE7] mb-4" />
      <p className="text-gray-300 mb-6 leading-relaxed">{testimonial.quote}</p>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#6C5CE7] to-[#00D4FF] flex items-center justify-center text-white font-bold">
          {testimonial.avatar}
        </div>
        <div>
          <div className="font-bold text-white">{testimonial.author}</div>
          <div className="text-sm text-gray-400">{testimonial.role}</div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="testimonials" className="py-20 px-6 md:px-20 bg-white/[0.02] overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 mb-4 uppercase tracking-wider">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Teams stay with us because the systems keep getting better.
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say.
          </p>
        </motion.div>

        {/* Scrolling Columns */}
        <div className="grid md:grid-cols-3 gap-6 max-h-[600px] overflow-hidden">
          {/* Column 1 - Scrolls Down */}
          <motion.div
            animate={{
              y: [0, -1000]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...column1, ...column1, ...column1].map((testimonial, index) => (
              <TestimonialCard key={`col1-${index}`} testimonial={testimonial} />
            ))}
          </motion.div>

          {/* Column 2 - Scrolls Up */}
          <motion.div
            animate={{
              y: [-1000, 0]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="hidden md:block"
          >
            {[...column2, ...column2, ...column2].map((testimonial, index) => (
              <TestimonialCard key={`col2-${index}`} testimonial={testimonial} />
            ))}
          </motion.div>

          {/* Column 3 - Scrolls Down */}
          <motion.div
            animate={{
              y: [0, -1000]
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear"
            }}
            className="hidden md:block"
          >
            {[...column3, ...column3, ...column3, ...column3].map((testimonial, index) => (
              <TestimonialCard key={`col3-${index}`} testimonial={testimonial} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}