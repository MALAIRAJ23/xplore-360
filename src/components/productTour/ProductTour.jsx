import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  BarChart3,
  Users,
  GraduationCap,
  Wallet,
  CalendarCheck,
  TrendingUp,
  Sparkles
} from 'lucide-react';

const tourItems = [
  {
    id: 0,
    icon: BarChart3,
    title: 'Dashboard',
    description: 'Real-time overview of every metric that matters.',
    stats: [
      { value: '2,847', label: 'Total Students', progress: '75%' },
      { value: '₹12.4L', label: 'Fee Collected', progress: '60%' },
      { value: '94%', label: 'Attendance', progress: '85%' },
      { value: '+18%', label: 'Growth', progress: '90%' },
    ]
  },
  {
    id: 1,
    icon: Users,
    title: 'Admission CRM',
    description: 'Capture leads, follow up, convert faster.',
    stats: [
      { value: '1,204', label: 'New Leads', progress: '80%' },
      { value: '450', label: 'Admissions', progress: '45%' },
      { value: '65%', label: 'Conversion Rate', progress: '65%' },
      { value: '12', label: 'Active Campaigns', progress: '30%' },
    ]
  },
  {
    id: 2,
    icon: GraduationCap,
    title: 'Student Profile',
    description: 'Complete academic & personal records.',
    stats: [
      { value: 'A+', label: 'Average Grade', progress: '95%' },
      { value: '100%', label: 'Profile Completion', progress: '100%' },
      { value: '24', label: 'Assignments Done', progress: '70%' },
      { value: '3', label: 'Pending Docs', progress: '20%' },
    ]
  },
  {
    id: 3,
    icon: Wallet,
    title: 'Fee Collection',
    description: 'Online payments, auto-receipts, reminders.',
    stats: [
      { value: '₹8.2L', label: 'Received This Month', progress: '80%' },
      { value: '₹1.5L', label: 'Overdue', progress: '15%' },
      { value: '850', label: 'Paid Students', progress: '85%' },
      { value: '120', label: 'Pending Students', progress: '12%' },
    ]
  },
  {
    id: 4,
    icon: CalendarCheck,
    title: 'Attendance Tracking',
    description: 'Biometric + mobile app integration.',
    stats: [
      { value: '96%', label: 'Today Present', progress: '96%' },
      { value: '4%', label: 'Today Absent', progress: '4%' },
      { value: '45', label: 'Staff Present', progress: '98%' },
      { value: '2', label: 'Staff on Leave', progress: '2%' },
    ]
  },
  {
    id: 5,
    icon: TrendingUp,
    title: 'Reports & Analytics',
    description: 'Drill-down into every department.',
    stats: [
      { value: '14', label: 'Custom Reports', progress: '100%' },
      { value: '3', label: 'Scheduled Exports', progress: '50%' },
      { value: '99%', label: 'Data Accuracy', progress: '99%' },
      { value: '1.2s', label: 'Query Speed', progress: '80%' },
    ]
  }
];

const ProductTour = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const menuRef = useRef(null); 
  const isInView = useInView(sectionRef, { amount: 0.25 });

  // Auto-play logic
  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % tourItems.length);
    }, 4500); 

    return () => clearInterval(timer);
  }, [isInView, activeIndex]);

  // Mobile horizontal scroll auto-centering (safe from jumping on reload)
  useEffect(() => {
    if (menuRef.current) {
      const activeElement = menuRef.current.querySelector('.tour-menu-item-active');
      if (activeElement) {
        const container = menuRef.current;
        if (container.scrollWidth > container.clientWidth) {
          const elementOffset = activeElement.offsetLeft;
          const elementWidth = activeElement.clientWidth;
          const containerWidth = container.clientWidth;

          container.scrollTo({
            left: elementOffset - (containerWidth / 2) + (elementWidth / 2),
            behavior: 'smooth'
          });
        }
      }
    }
  }, [activeIndex]);

  const activeData = tourItems[activeIndex];

  return (
    <section 
  ref={sectionRef} 
  className="relative w-full py-6 sm:py-10 lg:py-14 px-4 sm:px-6 bg-page-bg font-sans overflow-hidden flex justify-center"
>
      {/* BACKGROUND GRADIENT GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(139,92,246,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1140px] w-full relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#f3e8ff] text-[#7c3aed] py-1.5 px-4 rounded-full text-[0.8rem] font-semibold mb-3 sm:mb-4 shadow-sm">
            <Sparkles size={14} className="text-[#9333ea]" />
            Product Tour
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0f172a] font-bold mb-3 tracking-tight">
            Beautiful, <span className="bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] bg-clip-text text-transparent">Intuitive Interfaces</span>
          </h2>
          <p className="text-[#64748b] text-sm sm:text-base lg:text-lg m-0 max-w-2xl mx-auto leading-relaxed">
            Designed for real users — from front desk staff to principals.
          </p>
        </div>

        {/* MAIN LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-12 items-center">
          
          {/* ================================================= */}
          {/* DESKTOP SIDEBAR LIST (Hidden on mobile)         */}
          {/* ================================================= */}
          <div className="hidden lg:flex lg:flex-col gap-3.5 w-full">
            {tourItems.map((item, index) => {
              const isActive = index === activeIndex;
              const Icon = item.icon;
              return (
                <div 
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`flex items-center gap-3.5 p-3.5 lg:p-4 rounded-[16px] cursor-pointer transition-all duration-300 border bg-white ${
                    isActive 
                      ? 'border-[#8b5cf6]/20 shadow-[0_12px_24px_-10px_rgba(139,92,246,0.18)] bg-white' 
                      : 'border-slate-100 lg:border-transparent hover:bg-[#8b5cf6]/[0.03] lg:bg-transparent'
                  }`}
                >
                  <div className={`w-10 h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isActive ? 'bg-[#8b5cf6] text-white shadow-[0_8px_16px_rgba(139,92,246,0.25)]' : 'bg-[#f1f5f9] text-[#94a3b8]'
                  }`}>
                    <Icon size={18} strokeWidth={2.5} />
                  </div>
                  <div className="menu-text text-left">
                    <h4 className="m-0 mb-0.5 text-[0.95rem] lg:text-base font-bold text-[#1e293b]">{item.title}</h4>
                    <p className="m-0 text-[0.8rem] text-[#64748b] leading-normal">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================================================= */}
          {/* RIGHT COLUMN: MOBILE CHIPS HEADER + PREVIEW CARD   */}
          {/* ================================================= */}
          <div className="flex flex-col items-center gap-6 w-full">
            
            {/* MOBILE ONLY STEP SELECTOR GRID (Matches Modules logic) */}
            <div 
              ref={menuRef}
              className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 lg:hidden w-full"
            >
              {tourItems.map((item, index) => {
                const isActive = index === activeIndex;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(index)}
                    className={`tour-menu-item shrink-0 flex items-center justify-center p-3 rounded-xl border bg-white cursor-pointer transition-all duration-200 select-none text-center outline-none ${
                      isActive 
                        ? 'tour-menu-item-active border-[#8b5cf6]/20 shadow-[0_8px_20px_-6px_rgba(139,92,246,0.12)] bg-white' 
                        : 'border-slate-100 hover:bg-[#8b5cf6]/[0.02] bg-white/70'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1.5 w-full">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                        isActive ? 'bg-[#8b5cf6] text-white' : 'bg-[#f1f5f9] text-[#94a3b8]'
                      }`}>
                        <Icon size={14} strokeWidth={2.5} />
                      </div>
                      <span className={`text-[11px] sm:text-xs font-bold transition-colors duration-200 leading-tight ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                        {item.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* HIGH-FIDELITY LIVE PREVIEW CANVASES */}
            <div className="w-full bg-white border-[6px] sm:border-[8px] border-white/60 rounded-[24px] shadow-[0_24px_50px_-16px_rgba(139,92,246,0.15)] overflow-hidden relative min-h-[460px] md:min-h-[500px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className="bg-gradient-to-br from-[#f5f3ff] to-[#ede9fe] p-5 sm:p-7 rounded-2xl text-left flex flex-col justify-between"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Window Controls */}
                  <div className="flex gap-1.5 mb-5 shrink-0">
                    <span className="w-2.5 h-2.5 bg-[#d8b4fe] rounded-full"></span>
                    <span className="w-2.5 h-2.5 bg-[#d8b4fe] rounded-full"></span>
                    <span className="w-2.5 h-2.5 bg-[#d8b4fe] rounded-full"></span>
                  </div>

                  {/* Header */}
                  <div className="flex items-center gap-3.5 mb-6 shrink-0">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[#8b5cf6] text-white rounded-full flex items-center justify-center shadow-[0_8px_16px_rgba(139,92,246,0.25)] shrink-0">
                      <activeData.icon size={22} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="m-0 mb-0.5 text-base sm:text-lg font-bold text-[#1e293b]">{activeData.title}</h3>
                      <p className="m-0 text-xs text-[#64748b] leading-tight">{activeData.description}</p>
                    </div>
                  </div>

                  {/* Core Metrics Grid */}
                  <div className="grid grid-cols-2 max-[480px]:grid-cols-1 gap-4 mb-4">
                    {activeData.stats.map((stat, i) => (
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100/50" key={i}>
                        <h2 className="m-0 mb-2.5 text-lg sm:text-[1.3rem] font-bold text-slate-900 leading-none">{stat.value}</h2>
                        <span className="block text-[9px] sm:text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-2">{stat.label}</span>
                        <div className="w-full h-[5px] bg-[#f1f5f9] rounded-full overflow-hidden">
                          <div className="h-full bg-[#8b5cf6] rounded-full transition-all duration-1000 ease-out" style={{ width: stat.progress }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Ledger list module */}
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100/50 flex flex-col gap-3.5 shrink-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <div className="h-1.5 w-[50px] bg-[#e2e8f0] rounded-sm"></div>
                      <span className="text-[0.7rem] text-[#8b5cf6] font-bold cursor-pointer hover:underline">View all reports</span>
                    </div>
                    {[1, 2].map((_, i) => (
                      <div className="flex items-center gap-3" key={i}>
                        <div className="w-3.5 h-3.5 rounded-full bg-[#a78bfa]/60 shrink-0"></div>
                        <div className="h-1.5 bg-[#e2e8f0] rounded-sm w-full"></div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* CAROUSEL SEPARATOR DOTS */}
            <div className="flex gap-2 justify-center shrink-0">
              {tourItems.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                    i === activeIndex ? 'w-6 bg-[#8b5cf6]' : 'w-2 bg-[#d8b4fe]'
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductTour;