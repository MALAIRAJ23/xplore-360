import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Is the software cloud-based?',
    answer:
      'Yes — Xplore 360 is 100% cloud-based and accessible from any browser or device. No installation or local servers required.',
  },
  {
    question: 'Can I manage multiple branches?',
    answer:
      'Absolutely. Xplore 360 supports multi-branch management from a single dashboard, with branch-wise data, reports, and isolated permissions.',
  },
  {
    question: 'Is a mobile app available?',
    answer:
      'Yes, Xplore 360 offers dedicated iOS and Android mobile apps for staff, students, and parents to stay connected on the go.',
  },
  {
    question: 'Can fees be collected online?',
    answer:
      'Yes. Xplore 360 integrates seamlessly with major payment gateways so fees can be collected online with automatic receipts, reconciliation, and overdue reminders.',
  },
  {
    question: 'How long is the implementation process?',
    answer:
      'Most institutes are fully onboarded and live within 1–2 weeks. This includes historical data migration, system setup, and comprehensive staff orientation.',
  },
  {
    question: 'Is training provided for our staff?',
    answer:
      'Yes, every plan includes free onboarding training sessions along with ongoing access to video guides, weekly webinars, and 24/7 premium support.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); 
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const toggleIndex = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section 
      id="faq" 
      ref={sectionRef} 
className="w-full py-10 md:py-16 bg-page-bg relative overflow-hidden flex justify-center"    >
      {/* Background Dotted Radial Grid Pattern - Kept very faint to blend perfectly */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 z-0 pointer-events-none" />
      

      <div className="max-w-[1100px] w-full mx-auto px-6 relative z-10">
        <div className="flex flex-col md:grid md:grid-cols-[0.9fr_1.1fr] gap-12 md:gap-16 items-start w-full">
          
          {/* ================================================= */}
          {/* LEFT SIDE: COMPACT STICKY HEADER                  */}
          {/* ================================================= */}
          <motion.div 
            className="relative h-full w-full"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="md:sticky md:top-[120px] flex flex-col items-center md:items-start text-center md:text-left w-full">
              
              {/* Premium Eyebrow badge matching your image exactly */}
              <span className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-bold tracking-widest text-[#635BFF] bg-white border border-[#635BFF]/15 px-4 py-1.5 rounded-full mb-5 uppercase shadow-sm">
                <Sparkles size={13} className="text-[#635BFF]" />
                Got Questions?
              </span>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0f172a] leading-[1.15] m-0 mb-4 tracking-tight">
                Frequently Asked <br className="hidden md:block"/>
                <span className="text-[#635BFF]">Questions</span>
              </h2>
              
              <p className="text-[14px] md:text-[15px] text-[#64748b] font-medium leading-relaxed m-0 max-w-[90%] max-md:max-w-full">
                Everything you need to know about the product and billing. Can't find the answer you're looking for? Please contact our friendly support team.
              </p>
            </div>
          </motion.div>

          {/* ================================================= */}
          {/* RIGHT SIDE: BLENDED, LUXURY ACCORDION LIST        */}
          {/* ================================================= */}
          <motion.div 
            className="flex flex-col gap-2 w-full"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {faqs.map((faq, index) => {
              const isOpen = index === openIndex;
              return (
                <motion.div
                  key={faq.question}
                  variants={itemVariants}
                  // Clean, blended container. It's essentially invisible until hovered/active!
                  className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen 
                      ? 'bg-white shadow-[0_12px_24px_-8px_rgba(99,91,255,0.12)] border border-[#635BFF]/15' 
                      : 'bg-transparent border border-transparent hover:bg-white/60'
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 bg-transparent border-none cursor-pointer p-5 text-left outline-none -webkit-tap-highlight-color-transparent group"
                    onClick={() => toggleIndex(index)}
                    aria-expanded={isOpen}
                  >
                    <span className={`text-[15px] md:text-[1.05rem] font-bold leading-snug transition-colors duration-300 ${
                      isOpen ? 'text-[#635BFF]' : 'text-[#0f172a] group-hover:text-[#635BFF]'
                    }`}>
                      {faq.question}
                    </span>
                    
                    {/* Soft, blended Chevron Box matching your screenshot */}
                    <motion.div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen 
                          ? 'bg-[#635BFF]/10 text-[#635BFF]' 
                          : 'bg-slate-100 text-slate-400 group-hover:bg-[#635BFF]/10 group-hover:text-[#635BFF]'
                      }`}
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <ChevronDown size={16} strokeWidth={2.5} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-5 pb-5 pt-0">
                          <p className="m-0 text-[14px] text-[#64748b] leading-relaxed font-medium pr-8">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;