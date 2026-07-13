import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  MessageSquareText, 
  PhoneCall, 
  FileCheck2, 
  UserPlus, 
  Wallet, 
  CalendarCheck,
  Navigation,
  CheckCircle2,
  BellRing,
  BarChart3,
  CreditCard,
  UserCheck,
  FileSignature,
  MessageCircle
} from 'lucide-react';

const WORKFLOW_STEPS = [
  { 
    id: 1, num: '01', title: 'Enquiry', desc: 'Capture leads and start conversations.', icon: MessageSquareText,
    side: 'left', tilt: -6, mockupIcon: BellRing, mockupTitle: 'New Lead', mockupColor: '#fef3c7', mockupIconColor: '#d97706'
  },
  { 
    id: 2, num: '02', title: 'Follow-Up', desc: 'Stay connected and nurture every lead.', icon: PhoneCall,
    side: 'right', tilt: 4, mockupIcon: BarChart3, mockupTitle: 'Call Logged', mockupColor: '#e0e7ff', mockupIconColor: '#4f46e5'
  },
  { 
    id: 3, num: '03', title: 'Admission', desc: 'Simplify admissions with smart workflows.', icon: FileCheck2,
    side: 'right', tilt: -5, mockupIcon: FileSignature, mockupTitle: 'Form Approved', mockupColor: '#dcfce7', mockupIconColor: '#16a34a'
  },
  { 
    id: 4, num: '04', title: 'Enrollment', desc: 'Onboard students effortlessly.', icon: UserPlus,
    side: 'left', tilt: 5, mockupIcon: UserCheck, mockupTitle: 'ID Generated', mockupColor: '#f3e8ff', mockupIconColor: '#9333ea'
  },
  { 
    id: 5, num: '05', title: 'Fee Collection', desc: 'Collect fees securely and on time.', icon: Wallet,
    side: 'left', tilt: -6, mockupIcon: CreditCard, mockupTitle: 'Payment Success', mockupColor: '#dbeafe', mockupIconColor: '#2563eb'
  },
  { 
    id: 6, num: '06', title: 'Attendance', desc: 'Track attendance in real-time.', icon: CalendarCheck,
    side: 'right', tilt: -4, mockupIcon: CheckCircle2, mockupTitle: 'Present Today', mockupColor: '#ecfccb', mockupIconColor: '#65a30d'
  },
  { 
    id: 7, num: '07', title: 'Communication', desc: 'Reach students and staff instantly.', icon: MessageCircle,
    side: 'right', tilt: 4, mockupIcon: MessageCircle, mockupTitle: 'Message Sent', mockupColor: '#e0f2fe', mockupIconColor: '#0284c7'
  },
  { 
    id: 8, num: '08', title: 'Reports', desc: 'Get actionable insights & analytics.', icon: BarChart3,
    side: 'left', tilt: -5, mockupIcon: BarChart3, mockupTitle: 'Report Ready', mockupColor: '#f3e8ff', mockupIconColor: '#9333ea'
  }
];

const GRID_BREAKPOINT = 768; 

export default function Workflow() {
  const sectionRef = useRef(null);
  const mockupRefs = useRef([]);
  const [layout, setLayout] = useState('mobile'); 
  const [mockupsFit, setMockupsFit] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setLayout(window.innerWidth < GRID_BREAKPOINT ? 'mobile' : 'grid');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = layout === 'mobile';

  const checkMockupFit = () => {
    const section = sectionRef.current;
    if (!section || isMobile) {
      setMockupsFit(false);
      return;
    }
    const sectionRect = section.getBoundingClientRect();
    const buffer = 6; 
    let fits = true;
    for (const el of mockupRefs.current) {
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0) continue; 
      if (r.left < sectionRect.left + buffer || r.right > sectionRect.right - buffer) {
        fits = false;
        break;
      }
    }
    setMockupsFit(fits);
  };

  useLayoutEffect(() => {
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(checkMockupFit);
    });
    return () => cancelAnimationFrame(raf1);
  }, [layout]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let rafId;
    const scheduleCheck = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(checkMockupFit);
    };
    const ro = new ResizeObserver(scheduleCheck);
    ro.observe(section);
    window.addEventListener('resize', scheduleCheck);
    window.addEventListener('orientationchange', scheduleCheck);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', scheduleCheck);
      window.removeEventListener('orientationchange', scheduleCheck);
    };
  }, [layout]);

  const { scrollYProgress: workflowProgress } = useScroll({
    target: sectionRef,
    // Adjusted offset so the animation finishes slightly earlier
    offset: ['start 65%', 'end 95%'] 
  });

  const smoothWorkflow = useSpring(workflowProgress, { stiffness: 80, damping: 20, restDelta: 0.001 });

  // S-CURVE MATH
  const desktopArrowX = useTransform(
    smoothWorkflow, 
    [0, 0.14, 0.28, 0.43, 0.57, 0.71, 0.86, 1], 
    ["25%", "75%", "75%", "25%", "25%", "75%", "75%", "25%"]
  );
  
  const desktopArrowY = useTransform(
    smoothWorkflow, 
    [0, 0.14, 0.28, 0.43, 0.57, 0.71, 0.86, 1], 
    ["12.5%", "12.5%", "37.5%", "37.5%", "62.5%", "62.5%", "87.5%", "87.5%"]
  );

  const desktopArrowRotate = useTransform(
    smoothWorkflow,
    [0, 0.12, 0.16, 0.26, 0.30, 0.41, 0.45, 0.55, 0.59, 0.69, 0.73, 0.84, 0.88, 1],
    [90, 90,  180,  180,  270,  270,  180,  180,  90,   90,   180,  180,  270,  270] 
  );

  return (
    // FIX: Reduced bottom padding (pb-20 md:pb-32 -> pb-12 md:pb-16)
    <section id="workflow" ref={sectionRef} className="relative w-full pt-10 sm:pt-12 md:pt-16 pb-12 md:pb-16 bg-page-bg overflow-hidden [perspective:1200px]">
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6">
        
        <div className="relative z-20 max-w-[640px] text-center mx-auto mb-6 sm:mb-8 lg:mb-12">
          <h2 className="text-[clamp(1.5rem,3.5vw,2.4rem)] font-extrabold text-slate-900 leading-[1.25] mb-3">
            From <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Enquiry</span> to Insights
          </h2>
          <p className="text-[clamp(0.88rem,1.5vw,1rem)] text-slate-500 leading-relaxed px-2">
            Every step of the student journey, beautifully connected.
          </p>
        </div>

        <div className="relative w-full max-w-[850px] xl:max-w-[980px] mx-auto py-5">
          
          {/* DESKTOP/TABLET S-CURVE */}
          <svg className="hidden md:block absolute top-0 left-0 w-full h-full z-[1] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path 
              d="M 25 12.5 L 75 12.5 L 75 37.5 L 25 37.5 L 25 62.5 L 75 62.5 L 75 87.5 L 25 87.5" 
              fill="none" stroke="#e2e8f0" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeDasharray="6, 6" 
            />
          </svg>
          <svg className="hidden md:block absolute top-0 left-0 w-full h-full z-[1] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path 
              d="M 25 12.5 L 75 12.5 L 75 37.5 L 25 37.5 L 25 62.5 L 75 62.5 L 75 87.5 L 25 87.5" 
              fill="none" stroke="url(#gradient-desktop)" strokeWidth="3" vectorEffect="non-scaling-stroke"
              style={{ pathLength: smoothWorkflow }} 
            />
            <defs>
              <linearGradient id="gradient-desktop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
            </defs>
          </svg>

          {/* MOBILE VERTICAL LINE */}
          <svg className="md:hidden absolute top-0 left-0 w-full h-full z-[1] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 15 5 L 15 95" fill="none" stroke="#e2e8f0" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeDasharray="6, 6" />
          </svg>
          <svg className="md:hidden absolute top-0 left-0 w-full h-full z-[1] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path 
              d="M 15 5 L 15 95" 
              fill="none" stroke="url(#gradient-mob)" strokeWidth="3" vectorEffect="non-scaling-stroke"
              style={{ pathLength: smoothWorkflow }} 
            />
            <defs>
              <linearGradient id="gradient-mob" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
            </defs>
          </svg>

          {/* MOVING ARROW */}
          <motion.div 
            className="hidden md:flex absolute w-[26px] h-[26px] lg:w-[30px] lg:h-[30px] bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full items-center justify-center z-[15] shadow-[0_4px_10px_rgba(124,58,237,0.4)] -translate-x-1/2 -translate-y-1/2"
            style={{ left: desktopArrowX, top: desktopArrowY, rotate: desktopArrowRotate }}
          >
            <div className="absolute inset-0 rounded-full bg-violet-400 animate-ping opacity-60" />
            <Navigation size={14} className="text-white fill-white relative z-10" />
          </motion.div>

          {/* CARDS GRID */}
          <div className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-4 gap-y-10 md:gap-y-16 xl:gap-y-20 md:gap-x-0 relative z-20">
            {WORKFLOW_STEPS.map((step, index) => {
              const Icon = step.icon;
              const MockupIcon = step.mockupIcon;
              
              const cardRevealPoint = index / (WORKFLOW_STEPS.length - 1); 
              
              const cardOpacity = useTransform(smoothWorkflow, [cardRevealPoint - 0.1, cardRevealPoint], [0.1, 1]);
              const cardScale = useTransform(smoothWorkflow, [cardRevealPoint - 0.1, cardRevealPoint], [0.8, 1]);
              const cardY = useTransform(smoothWorkflow, [cardRevealPoint - 0.1, cardRevealPoint], [50, 0]); 
              const cardRotateX = useTransform(smoothWorkflow, [cardRevealPoint - 0.1, cardRevealPoint], [25, 0]);
              const cardX = useTransform(smoothWorkflow, [cardRevealPoint - 0.1, cardRevealPoint], [80, 0]);

              const gridPlacementClass = 
                step.id === 1 ? 'md:col-start-1 md:row-start-1' :
                step.id === 2 ? 'md:col-start-2 md:row-start-1' :
                step.id === 3 ? 'md:col-start-2 md:row-start-2' :
                step.id === 4 ? 'md:col-start-1 md:row-start-2' :
                step.id === 5 ? 'md:col-start-1 md:row-start-3' :
                step.id === 6 ? 'md:col-start-2 md:row-start-3' :
                step.id === 7 ? 'md:col-start-2 md:row-start-4' :
                step.id === 8 ? 'md:col-start-1 md:row-start-4' : '';

              const cardAnimationStyle = isMobile
                ? { opacity: cardOpacity, x: cardX }
                : { opacity: cardOpacity, scale: cardScale, y: cardY, rotateX: cardRotateX };

              return (
                <motion.div
                  key={step.id}
                  className={`min-h-[130px] sm:min-h-[140px] md:h-auto w-full md:w-[240px] lg:w-[260px] relative flex md:flex-col items-center md:text-center md:p-5 md:mx-auto [transform-style:preserve-3d] group cursor-default ${gridPlacementClass}`}
                  style={cardAnimationStyle}
                >
                  <div className="absolute top-1/2 left-[15%] md:static md:top-auto md:left-auto -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white border-2 border-slate-100 shadow-[0_4px_12px_rgba(0,0,0,0.06)] flex items-center justify-center text-violet-600 z-30 transition-all duration-300 group-hover:scale-110 group-hover:border-violet-300 group-hover:bg-violet-50 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] shrink-0">
                    <Icon size={22} strokeWidth={1.5} className="sm:hidden transition-transform duration-300 group-hover:rotate-12" />
                    <Icon size={24} strokeWidth={1.5} className="hidden sm:block transition-transform duration-300 group-hover:rotate-12" />
                  </div>
                  
                  <div className="absolute top-1/2 -translate-y-1/2 left-[27%] sm:left-[28%] md:static md:top-auto md:translate-y-0 md:left-auto w-[70%] sm:w-[68%] md:w-auto bg-white p-3.5 sm:p-4 md:p-0 rounded-xl md:rounded-none shadow-[0_4px_16px_rgba(0,0,0,0.06)] md:shadow-none border border-slate-50 md:border-none z-20 text-left md:text-center md:bg-white md:p-4 md:rounded-xl md:mt-[-10px] transition-all duration-300 group-hover:-translate-y-1 md:group-hover:shadow-[0_12px_30px_-5px_rgba(124,58,237,0.15)] group-hover:border-violet-200">
                    <span className="block text-[10px] sm:text-[11px] font-bold text-slate-400 mb-1.5 transition-colors duration-300 group-hover:text-violet-600">{step.num}</span>
                    <h4 className="text-[0.95rem] sm:text-base md:text-[1.05rem] font-bold text-slate-900 mb-1.5">{step.title}</h4>
                    <p className="text-[11.5px] sm:text-[12px] md:text-[0.85rem] text-slate-500 leading-normal md:leading-relaxed m-0">{step.desc}</p>
                  </div>

                  <motion.div 
                    ref={(el) => { mockupRefs.current[index] = el; }}
                    aria-hidden="true"
                    className={`hidden md:block absolute w-[150px] pointer-events-none z-[5] top-5 transition-opacity duration-300 ${
                      mockupsFit ? 'opacity-100' : 'opacity-0'
                    } ${
                      step.side === 'left' ? 'right-full mr-6' : 'left-full ml-6'
                    }`}
                    style={{ rotate: step.tilt }}
                    animate={{ y: [-8, 8, -8] }} 
                    transition={{ repeat: Infinity, duration: 4 + (index * 0.5), ease: "easeInOut" }}
                  >
                    <div className="transition-all duration-500 group-hover:scale-[1.05] group-hover:-translate-y-2 group-hover:drop-shadow-[0_20px_30px_rgba(124,58,237,0.25)] rounded-2xl overflow-hidden">
                      <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl p-4 shadow-[0_14px_30px_-5px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,1)]">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: step.mockupColor, color: step.mockupIconColor }}>
                            <MockupIcon size={14} strokeWidth={2.5} />
                          </div>
                          <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                            <div className="h-1.5 bg-slate-300 rounded-[4px]" style={{ width: '60%' }} />
                            <div className="h-1 bg-slate-200 rounded-[4px]" style={{ width: '80%' }} />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-md text-[10px] font-bold text-emerald-800 w-fit">
                            <CheckCircle2 size={10} className="text-emerald-600 shrink-0" />
                            <span>{step.mockupTitle}</span>
                          </div>
                          <div className="h-1 bg-slate-200 rounded-[4px] w-full mt-3" />
                          <div className="h-1 bg-slate-200 rounded-[4px] w-[70%] mt-1.5" />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}