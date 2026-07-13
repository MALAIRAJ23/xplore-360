import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useMotionTemplate,
} from 'framer-motion';
import {
  Users,
  GraduationCap,
  Wallet,
  CalendarCheck,
  ClipboardList,
  MessageCircle,
  Briefcase,
  BarChart3,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';

const modules = [
  {
    key: 'admissions',
    label: 'Admissions CRM',
    Icon: Users,
    title: 'Admissions CRM',
    description: 'Streamline your entire admission process — from lead capture to enrollment. Track, nurture, and convert more leads efficiently.',
    features: ['Lead Management', 'Follow-up Tracking', 'Enquiry Management'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop', 
    accent: '#635BFF'
  },
  {
    key: 'student',
    label: 'Student Management',
    Icon: GraduationCap,
    title: 'Student Management',
    description: 'Maintain complete student records in one place — profiles, academics, and documents, all organized and easy to access.',
    features: ['Student Profiles', 'Document Management', 'Batch Allocation'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop', 
    accent: '#059669'
  },
  {
    key: 'fee',
    label: 'Fee Management',
    Icon: Wallet,
    title: 'Fee Management',
    description: 'Automate fee collection, invoicing, and reminders. Get a clear view of dues, payments, and outstanding balances.',
    features: ['Online Payments', 'Due Reminders', 'Receipt Generation'],
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop', 
    accent: '#EA580C'
  },
  {
    key: 'attendance',
    label: 'Attendance',
    Icon: CalendarCheck,
    title: 'Attendance',
    description: 'Track daily attendance with ease — biometric, manual, or app-based check-ins with real-time reports for staff and students.',
    features: ['Biometric Sync', 'Leave Requests', 'Automated Alerts'],
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop',
    accent: '#9333EA'
  },
  {
    key: 'staff',
    label: 'Staff Management',
    Icon: Briefcase,
    title: 'Staff Management',
    description: 'Manage staff records, roles, and performance — from onboarding to payroll — in a single unified module.',
    features: ['Role-based Access', 'Payroll Integration', 'Performance Tracking'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
    accent: '#D97706'
  },
  {
    key: 'reports',
    label: 'Reports',
    Icon: BarChart3,
    title: 'Reports',
    description: 'Get actionable insights with ready-made and custom reports across admissions, fees, attendance, and more.',
    features: ['Custom Dashboards', 'Export to Excel/PDF', 'Trend Analysis'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    accent: '#4F46E5'
  },
];

const getOptimizedImageUrl = (url, isDesktop) => {
  const targetWidth = isDesktop ? 960 : 640; 
  return url.replace(/([?&])w=\d+/, `$1w=${targetWidth}`).replace(/([?&])q=\d+/, '$1q=65');
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15, filter: 'blur(5px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)', 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  }
};

const itemVariantsNoBlur = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsDesktop(mq.matches);
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener ? mq.addEventListener('change', handler) : mq.addListener(handler);
    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', handler) : mq.removeListener(handler);
    };
  }, []);
  return isDesktop;
};

// --- INDIVIDUAL STACKING CARD COMPONENT ---
const StackedCard = ({ mod, index, progress, total }) => {
  const cardRef = useRef(null);
  const isDesktop = useIsDesktop();
  
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e) => {
    if (!isDesktop || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  
  const spotlightBackground = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(138,133,255,0.06), transparent 40%)`;

  const range = [index / total, 1]; 
  const targetScale = 1 - ((total - 1 - index) * 0.05); 
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div 
      className="sticky flex items-start sm:items-center justify-center w-full"
      style={{ top: `calc(8vh + ${index * 8}px)` }} 
    >
      <motion.div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        style={{
          scale,
          transformOrigin: 'top center',
          WebkitTransform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          willChange: 'transform'
        }}
        className="w-full bg-gradient-to-br from-purple-300 via-purple-200 to-indigo-100 rounded-[28px] sm:rounded-[40px] border border-slate-200/80 shadow-lg md:shadow-[0_0_40px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col md:flex-row items-center p-5 sm:p-8 md:p-12 h-auto min-h-min md:h-[65vh] md:min-h-[500px] group relative"
      >
        
        {isDesktop && (
          <motion.div 
            className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: spotlightBackground }}
          />
        )}

        <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12 relative z-10">
          
          <motion.div 
            className="flex-1 flex flex-col relative w-full order-2 md:order-1 mt-0"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={isDesktop ? itemVariants : itemVariantsNoBlur} className="flex items-center gap-2.5 sm:gap-3 mb-3 md:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105" style={{ backgroundColor: `${mod.accent}15`, color: mod.accent }}>
                <mod.Icon size={20} className="sm:w-6 sm:h-6" strokeWidth={2} />
              </div>
              <span className="text-[10px] sm:text-[12px] font-bold tracking-widest uppercase text-black">Module 0{index + 1}</span>
            </motion.div>

            <motion.h3 variants={isDesktop ? itemVariants : itemVariantsNoBlur} className="text-[1.35rem] sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 md:mb-4 tracking-tight leading-tight">
              {mod.title}
            </motion.h3>

            <motion.p variants={isDesktop ? itemVariants : itemVariantsNoBlur} className="text-[13px] sm:text-sm md:text-base text-slate-500 leading-relaxed mb-4 md:mb-8 font-medium">
              {mod.description}
            </motion.p>

            <motion.ul variants={isDesktop ? itemVariants : itemVariantsNoBlur} className="list-none p-0 m-0 mb-5 md:mb-8 flex flex-col gap-2.5 md:gap-3">
              {mod.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2.5 md:gap-3 text-[12.5px] sm:text-sm md:text-base font-bold text-slate-800">
                  <CheckCircle2 size={18} className="md:w-5 md:h-5 shrink-0" style={{ color: mod.accent }} strokeWidth={2.5} />
                  <span>{feature}</span>
                </li>
              ))}
            </motion.ul>

          </motion.div>

          <div className="flex-1 w-full flex justify-center items-center order-1 md:order-2">
            <motion.div 
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0, scale: 1, y: isDesktop ? [-4, 4, -4] : 0 }
                  : { opacity: 0, x: 20, scale: 0.95 }
              }
              transition={{ 
                opacity: { duration: 0.6, ease: "easeOut" },
                x: { duration: 0.6, ease: "easeOut" },
                scale: { duration: 0.6, ease: "easeOut" },
                y: isDesktop ? { repeat: Infinity, duration: 5, ease: "easeInOut" } : { duration: 0.4 }
              }}
              className="w-full max-w-[250px] sm:max-w-[360px] md:max-w-[480px] relative"
            >
              <div className="bg-[#1e1e1e] rounded-t-xl md:rounded-t-3xl pb-2 md:pb-3 pt-2 md:pt-3 px-2 md:px-3 shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_10px_20px_rgba(0,0,0,0.2)] md:shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.3)] relative transition-transform duration-500 group-hover:scale-[1.02]">
                <div className="absolute top-[4px] md:top-[8px] left-1/2 -translate-x-1/2 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#444]" />
                <div className="bg-black rounded-[4px] md:rounded-lg overflow-hidden aspect-[16/10] relative">
                  <img 
                    src={getOptimizedImageUrl(mod.image, isDesktop)} 
                    alt={mod.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top block border border-white/10"
                  />
                </div>
              </div>
              <div className="h-2.5 md:h-4 bg-slate-400 rounded-b-xl md:rounded-b-3xl relative w-[106%] -left-[3%] shadow-[inset_0_-2px_6px_rgba(0,0,0,0.2),0_10px_20px_rgba(0,0,0,0.2)] transition-transform duration-500 group-hover:scale-[1.02]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[15%] h-[3px] md:h-1.5 bg-slate-500 rounded-b-sm md:rounded-b-md" />
              </div>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};


export default function Modules() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    // FIX: Reduced main section padding from 'py-20 md:py-32' to 'py-10 md:py-16'
    <section id="modules" className="relative w-full bg-page-bg py-10 md:py-16">        
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        // FIX: Reduced margin-bottom below header
        className="relative z-10 max-w-2xl mx-auto text-center mb-6 md:mb-12 px-5"
      >
        <span className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-bold tracking-widest uppercase text-[#635BFF] bg-white border border-[#635BFF]/20 shadow-sm px-4 py-1.5 rounded-full mb-4 md:mb-6">
          Everything You Need
        </span>
        <h2 className="text-[1.8rem] sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.3] mb-4 md:mb-5 tracking-tight">
          One Platform. <br className="sm:hidden" />
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#8A85FF] to-[#635BFF] italic pr-2 pt-1 pb-1 leading-[1.3]">
            Six Modules.
          </span>
        </h2>
        <p className="text-[13.5px] sm:text-base md:text-lg text-slate-500 leading-relaxed font-medium">
          Powerful standalone modules that work seamlessly together to automate your entire institute.
        </p>
      </motion.div>

      <div 
        ref={containerRef} 
        className="relative w-full max-w-[1200px] mx-auto px-5 sm:px-8"
      >
        {/* FIX: Reduced bottom padding significantly from pb-[20vh] to pb-6 */}
        <div className="flex flex-col gap-[8vh] sm:gap-[12vh] md:gap-[18vh] pb-6">
          {modules.map((mod, index) => (
            <StackedCard 
              key={mod.key} 
              mod={mod} 
              index={index} 
              progress={scrollYProgress} 
              total={modules.length} 
            />
          ))}
        </div>
      </div>

    </section>
  );
}