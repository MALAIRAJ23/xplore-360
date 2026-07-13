import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, X, Check, ArrowRight } from 'lucide-react';
import DemoDialog from '../demo/DemoDialog';

const OLD_WAY = [
  'Messy Manual Registers',
  'Fee Tracking & Reconciliation Errors',
  'Delayed, Inaccurate Reports',
  'Slow Paper-Based Admissions',
];

const MODERN_WAY = [
  '100% Digital Cloud Records',
  'Automated Reminders & Collection',
  'Real-Time Live Analytics',
  'Instant Online Admission Portals',
];

// --- LUXURY ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemLeftVariants = {
  hidden: { opacity: 0, x: -20, filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const itemRightVariants = {
  hidden: { opacity: 0, x: 20, filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Transformation() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Controls the Book a Demo modal
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
<section ref={sectionRef} className="relative py-10 md:py-16 overflow-hidden bg-page-bg">

     
      <div className="relative w-full max-w-[1100px] mx-auto px-5 sm:px-8 z-10">
        
        {/* --- HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10 md:mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#635BFF]/10 border border-[#635BFF]/20 mb-4 md:mb-5 shadow-sm">
            <Sparkles size={13} className="text-[#635BFF]" />
            <span className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-[#635BFF]">
              The Transformation
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-extrabold text-slate-900 leading-[1.15] tracking-tight">
            Stop Chasing <span className="bg-gradient-to-r from-[#8A85FF] to-[#635BFF] bg-clip-text text-transparent italic pr-2">Paperwork.</span>
          </h2>
          <p className="text-base md:text-lg text-slate-500 leading-relaxed font-medium mt-4 max-w-[600px] mx-auto">
            See the exact difference a unified CRM makes to your daily operations and staff bandwidth.
          </p>
        </motion.div>

        {/* --- COMPARISON GRID --- */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          
          {/* THE "VS" BADGE (Centered exactly between the cards) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.5, rotate: -45 }}
            transition={{ duration: 0.6, delay: 0.4, type: 'spring', stiffness: 200 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-14 h-14 rounded-full bg-white border border-slate-100 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)]"
          >
            <span className="text-sm font-extrabold text-slate-400 italic">VS</span>
          </motion.div>

          {/* ================================================= */}
          {/* LEFT: THE OLD WAY (The Problem)                   */}
          {/* ================================================= */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="group bg-white rounded-[2rem] p-8 md:p-10 lg:p-12 border border-slate-200/80 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[1.35rem] md:text-[1.5rem] font-extrabold text-slate-800 tracking-tight">
                The Old Way
              </h3>
              <span className="inline-block text-[10px] md:text-[11px] font-extrabold tracking-widest text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full uppercase">
                Before
              </span>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex flex-col gap-3.5"
            >
              {OLD_WAY.map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemLeftVariants}
                  className="flex items-center gap-3.5 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 transition-colors group-hover:bg-white group-hover:border-slate-200"
                >
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0">
                    <X size={14} strokeWidth={3} />
                  </div>
                  <span className="text-[13px] md:text-[14px] font-bold text-slate-600 leading-snug">
                    {item}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ================================================= */}
          {/* RIGHT: THE MODERN WAY (The Solution)              */}
          {/* ================================================= */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="group bg-gradient-to-br from-[#8A85FF] to-[#635BFF] rounded-[2rem] p-8 md:p-10 lg:p-12 shadow-[0_20px_40px_-15px_rgba(99,91,255,0.4)] hover:shadow-[0_30px_50px_-15px_rgba(99,91,255,0.5)] transition-all duration-500 hover:-translate-y-1 relative overflow-hidden"
          >
            {/* Subtle inner glow */}
            <div className="absolute top-0 left-[-20%] w-[150%] h-[150px] bg-white opacity-[0.06] blur-[50px] rounded-full pointer-events-none" />

            <div className="flex items-center justify-between mb-8 relative z-10">
              <h3 className="text-[1.35rem] md:text-[1.5rem] font-extrabold text-white tracking-tight">
                Xplore 360
              </h3>
              <span className="inline-block text-[10px] md:text-[11px] font-extrabold tracking-widest text-[#635BFF] bg-white px-3 py-1.5 rounded-full uppercase shadow-sm">
                After
              </span>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex flex-col gap-3.5 relative z-10"
            >
              {MODERN_WAY.map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemRightVariants}
                  className="flex items-center gap-3.5 bg-white/10 border border-white/20 rounded-2xl px-4 py-4 backdrop-blur-sm transition-colors group-hover:bg-white/15"
                >
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-white text-[#635BFF] flex items-center justify-center shrink-0 shadow-sm">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span className="text-[13px] md:text-[14px] font-bold text-white leading-snug">
                    {item}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Micro Call-to-action button inside the right card */}
            <motion.div 
              className="mt-8 pt-6 border-t border-white/20 relative z-10 flex justify-end"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.8 }}
            >
              <button
                type="button"
                onClick={() => setIsDemoOpen(true)}
                className="flex items-center gap-1.5 text-[12px] md:text-[13px] font-extrabold text-white uppercase tracking-wider group/btn cursor-pointer bg-transparent border-none p-0"
              >
                Book a Demo
                <ArrowRight size={14} strokeWidth={3} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* Demo Dialog — controlled entirely by isDemoOpen state above.
          setIsDemoOpen(false) is passed as the real close handler, so the
          dialog's internal close button (and Escape / backdrop click)
          actually closes it. */}
      <DemoDialog isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </section>
  );
}