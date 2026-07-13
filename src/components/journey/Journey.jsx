import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Sparkles,
  MessageCircle,
  GraduationCap,
  Wallet,
  CalendarCheck,
  BarChart3
} from 'lucide-react';

const STEPS = [
  {
    id: 1,
    title: 'Lead Enquiry',
    desc: 'Auto-captured into CRM with intelligent source tracking.',
    tag: 'Lead Capture',
    icon: Sparkles,
    color: '#f59e0b', 
    bg: '#fef3c7',
    details: [
      'Real-time automated tracking of UTM referral parameters and campaign sources.',
      'Instant intelligent lead routing and assignment based on active counsellor loads.'
    ]
  },
  {
    id: 2,
    title: 'CRM Follow-Up',
    desc: 'Automated counsellor tasks & pre-built WhatsApp templates.',
    tag: 'ZERO LEAKAGE',
    icon: MessageCircle,
    color: '#3b82f6', 
    bg: '#dbeafe',
    details: [
      'Pre-scheduled WhatsApp nurture templates triggered instantly upon student enquiry.',
      'Automated reminder notifications to eliminate task leaks and missed callbacks.'
    ]
  },
  {
    id: 3,
    title: 'Admission Approval',
    desc: '100% digital application workflows with one-click approvals.',
    tag: 'PAPERLESS',
    icon: GraduationCap,
    color: '#10b981', 
    bg: '#d1fae5',
    details: [
      'OCR-driven extraction and authenticity match verification on uploaded certificates.',
      'Smooth registration document collection with modern digital enrollment triggers.'
    ]
  },
  {
    id: 4,
    title: 'Fee Collection',
    desc: 'Seamless online payments, auto receipts, and EMI setups.',
    tag: 'AUTO-RECONCILED',
    icon: Wallet,
    color: '#8b5cf6', 
    bg: '#ede9fe',
    details: [
      'Deep checkout support supporting key debit/credit gateways and instant UPI transfers.',
      'Real-time automated receipt generation mapped cleanly back to student ledgers.'
    ]
  },
  {
    id: 5,
    title: 'Attendance Tracking',
    desc: 'Biometric sync + parent SMS alerts in real-time.',
    tag: 'LIVE',
    icon: CalendarCheck,
    color: '#ec4899', 
    bg: '#fce7f3',
    details: [
      'Direct, lag-free RFID log sync recording active classroom or campus entry metrics.',
      'Immediate automated parent notification broadcasts for real-time check-in updates.'
    ]
  },
  {
    id: 6,
    title: 'Reports & Analytics',
    desc: 'Live intuitive dashboards for every single stakeholder.',
    tag: 'INSIGHTS',
    icon: BarChart3,
    color: '#06b6d4', 
    bg: '#cffafe',
    details: [
      'Live graphical breakdowns showing registrar yield ratios and ledger cash flows.',
      'Automated scheduled report dispatches configured to hit management inboxes.'
    ]
  },
];

// --- LUXURY ANIMATION VARIANTS ---
const panelVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.08, delayChildren: 0.05 }
  },
  exit: { 
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.2, ease: "easeIn" } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 350, damping: 30 } 
  }
};

export default function Journey() {
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const isAutoPlayActive = useInView(sectionRef, { amount: 0.3 });

  const [activeStep, setActiveStep] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  // AUTO-PLAY LOGIC
  useEffect(() => {
    if (!isAutoPlayActive || isInteracting) return; 
    
    const timer = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 4500); 

    return () => clearTimeout(timer);
  }, [activeStep, isInteracting, isAutoPlayActive]);

  const activeData = STEPS[activeStep];

  return (
    // FIX: Significantly reduced top and bottom padding (py-12 md:py-16 lg:py-20)
<section ref={sectionRef} className="py-12 md:py-16 lg:py-20 bg-page-bg overflow-hidden relative w-full flex items-center">
        <div className="max-w-[1200px] mx-auto px-6 w-full">
        
        {/* SECTION HEADER */}
        <motion.div 
          // FIX: Reduced margin bottom to keep header closer to content (mb-10 md:mb-14)
          className="text-center max-w-[680px] mx-auto mb-10 md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-[#635BFF] bg-white border border-[#635BFF]/20 shadow-sm px-4 py-1.5 rounded-full mb-5">
            The Flow
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.8rem] font-extrabold text-slate-900 leading-[1.3] mb-4 tracking-tight py-1">
            From <span className="bg-gradient-to-r from-[#8A85FF] to-[#635BFF] bg-clip-text text-transparent italic pb-2 inline-block">Enquiry</span> to Insights
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-slate-500 leading-relaxed font-medium m-0 px-2">
            One unified platform that choreographs every student journey — from the first parent enquiry to final enrollment, fees, and outcomes.
          </p>
        </motion.div>

        {/* MAIN LAYOUT GATEWAYS */}
        <div 
          className="w-full"
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => setTimeout(() => setIsInteracting(false), 2000)}
        >
          
          {/* ================================================= */}
          {/* DESKTOP LAYOUT                                    */}
          {/* ================================================= */}
          <div className="hidden md:grid grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-start w-full">
            
            {/* LEFT SIDE: STEPPER ACCORDIONS */}
            <div className="flex flex-col gap-2 w-full">
              {STEPS.map((step, index) => {
                const isActive = index === activeStep;
                const Icon = step.icon;

                return (
                  <motion.button
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`group w-full text-left bg-transparent border border-transparent rounded-2xl px-5 py-4 cursor-pointer outline-none transition-all duration-300 select-none flex flex-col justify-center ${
                      isActive ? 'bg-white border-slate-200 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.08)] scale-[1.02]' : 'hover:bg-slate-100/50 hover:translate-x-1'
                    }`}
                    onClick={() => setActiveStep(index)}
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon Container */}
                      <motion.div 
                        className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 relative"
                        animate={{ 
                          backgroundColor: isActive ? step.color : '#f1f5f9',
                          color: isActive ? '#fff' : '#64748b',
                          scale: isActive ? 1 : 0.95
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        {isActive && (
                          <motion.div 
                            layoutId="iconGlow"
                            className="absolute inset-0 rounded-[12px] blur-md opacity-40 -z-10"
                            style={{ backgroundColor: step.color }}
                          />
                        )}
                        <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                      </motion.div>
                      
                      <span className={`text-[1rem] transition-colors duration-300 ${isActive ? 'text-slate-900 font-extrabold' : 'text-slate-600 font-bold'}`}>
                        {step.title}
                      </span>
                    </div>

                    {/* Desktop Accordion content */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden pl-14 w-full"
                        >
                          <p className="text-[13px] text-slate-500 leading-relaxed mt-2 mb-4 font-medium">{step.desc}</p>
                          
                          {/* Desktop progress track */}
                          <div className="w-full max-w-[200px] h-[3px] bg-slate-100 rounded-full overflow-hidden">
                            {!isInteracting && isAutoPlayActive ? (
                              <motion.div
                                key={`progress-desktop-${activeStep}`}
                                className="h-full rounded-full"
                                style={{ backgroundColor: step.color }}
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 4.5, ease: "linear" }}
                              />
                            ) : (
                              <div className="h-full rounded-full w-full opacity-40" style={{ backgroundColor: step.color }} />
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>

            {/* RIGHT SIDE: PREMIUM DETAIL PREVIEW */}
            <div className="relative min-h-[460px] w-full flex items-start justify-center">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeStep}
                  className="w-full bg-white rounded-[32px] border border-slate-100 p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden"
                  variants={panelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div 
                    className="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] opacity-[0.06] rounded-full pointer-events-none z-0" 
                    style={{ backgroundColor: STEPS[activeStep].color }}
                  />

                  <motion.div variants={itemVariants} className="flex items-center justify-between mb-8 relative z-10">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm border border-white/50" 
                      style={{ backgroundColor: STEPS[activeStep].bg, color: STEPS[activeStep].color }}
                    >
                      {React.createElement(STEPS[activeStep].icon, { size: 32, strokeWidth: 2 })}
                    </div>
                    <span 
                      className="text-[11px] font-extrabold tracking-widest uppercase bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full"
                      style={{ color: STEPS[activeStep].color }}
                    >
                      {STEPS[activeStep].tag}
                    </span>
                  </motion.div>

                  <motion.h3 variants={itemVariants} className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight relative z-10">
                    {STEPS[activeStep].title}
                  </motion.h3>
                  
                  <motion.p variants={itemVariants} className="text-[1.05rem] text-slate-500 leading-relaxed mb-6 font-medium relative z-10">
                    {STEPS[activeStep].desc}
                  </motion.p>

                  <motion.div variants={itemVariants} className="pt-6 border-t border-slate-100 flex flex-col gap-4 relative z-10">
                    <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">Key Capabilities</h4>
                    <ul className="flex flex-col gap-3.5 p-0 m-0 list-none">
                      {STEPS[activeStep].details.map((detail, dIdx) => (
                        <motion.li 
                          key={dIdx} 
                          variants={itemVariants}
                          className="flex items-start gap-3 text-slate-600 text-[14px] leading-relaxed font-medium m-0"
                        >
                          <span className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: STEPS[activeStep].color }} />
                          <span>{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ================================================= */}
          {/* MOBILE VIEWPORT                                   */}
          {/* ================================================= */}
          <div className="md:hidden flex flex-col gap-6 w-full mt-6">

            <div className="grid grid-cols-2 gap-3">
              {STEPS.map((step, index) => {
                const isActive = index === activeStep;
                const Icon = step.icon;

                return (
                  <motion.button
                    key={step.id}
                    onClick={() => setActiveStep(index)}
                    className="relative w-full min-h-[52px] flex items-center justify-center p-0 rounded-2xl bg-white border border-slate-100 shadow-sm cursor-pointer outline-none [WebkitTapHighlightColor:transparent] overflow-hidden"
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeMobPill"
                        className="absolute inset-0 z-[1]"
                        style={{ backgroundColor: step.color }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      />
                    )}
                    <span className={`relative z-10 flex items-center justify-center gap-2 px-3 py-2.5 w-full transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-slate-600'
                    }`}>
                      <Icon size={16} strokeWidth={isActive ? 2.5 : 2} className="shrink-0" />
                      <span className="text-[12px] font-bold leading-tight">
                        {step.title}
                      </span>
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <div className="relative w-full min-h-[400px]">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeStep}
                  variants={panelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full bg-white border border-slate-100 rounded-[28px] p-6 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.06)] relative overflow-hidden"
                >
                  <div 
                    className="absolute top-0 right-0 w-[150px] h-[150px] opacity-[0.06] rounded-full pointer-events-none"
                    style={{ backgroundColor: activeData.color }}
                  />

                  <motion.div variants={itemVariants} className="flex items-center justify-between mb-5 relative z-10">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: activeData.bg, color: activeData.color }}
                    >
                      <activeData.icon size={24} strokeWidth={2.5} />
                    </div>
                    <span className="text-[10px] font-extrabold text-slate-500 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full uppercase tracking-wider">
                      {activeData.tag}
                    </span>
                  </motion.div>

                  <motion.h4 variants={itemVariants} className="text-[1.35rem] font-extrabold text-slate-900 m-0 leading-tight relative z-10 mb-2">
                    {activeData.title}
                  </motion.h4>
                  
                  <motion.p variants={itemVariants} className="text-[13.5px] text-slate-500 font-medium leading-relaxed mb-5 relative z-10">
                    {activeData.desc}
                  </motion.p>

                  <motion.div variants={itemVariants} className="pt-5 border-t border-slate-100 flex flex-col gap-3 relative z-10 w-full">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                      Capabilities
                    </span>
                    <ul className="flex flex-col gap-3 p-0 m-0 list-none">
                      {activeData.details.map((detail, dIdx) => (
                        <motion.li key={dIdx} variants={itemVariants} className="flex items-start gap-3 text-[13px] font-medium text-slate-600 leading-relaxed m-0">
                          <span 
                            className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" 
                            style={{ backgroundColor: activeData.color }}
                          />
                          <span className="flex-1">{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Mobile active progress bar */}
                  <motion.div variants={itemVariants} className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-start relative z-10">
                    <div className="w-full h-[4px] bg-slate-100 rounded-full overflow-hidden shrink-0">
                      {!isInteracting && isAutoPlayActive ? (
                        <motion.div
                          key={`progress-mob-card-${activeStep}`}
                          className="h-full rounded-full"
                          style={{ backgroundColor: activeData.color }}
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 4.5, ease: "linear" }}
                        />
                      ) : (
                        <div className="h-full rounded-full w-full opacity-40" style={{ backgroundColor: activeData.color }} />
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}