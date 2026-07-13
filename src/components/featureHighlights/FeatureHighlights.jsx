import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Sparkles, 
  CheckCircle2, 
  Globe, 
  Smartphone, 
  BellRing, 
  MessageSquare, 
  ShieldCheck, 
  Building2 
} from 'lucide-react';

const FEATURES = [
  {
    id: 1,
    title: 'Online Admission Portal',
    desc: 'Students apply online with custom forms, document uploads, and automatic shortlisting. Reduce front-desk load by 70%.',
    icon: Globe,
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=1000&auto=format&fit=crop',
    accent: '#635BFF'
  },
  {
    id: 2,
    title: 'Parent Mobile Access',
    desc: 'Parents track attendance, fees, exam results, and announcements in real time from a dedicated mobile app.',
    icon: Smartphone,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    accent: '#059669'
  },
  {
    id: 3,
    title: 'Automated Fee Reminders',
    desc: 'Schedule SMS, email, and WhatsApp reminders. Cut overdue collections in half — without lifting a finger.',
    icon: BellRing,
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop',
    accent: '#EA580C'
  },
  {
    id: 4,
    title: 'WhatsApp Integration',
    desc: 'Send instant updates, fee receipts, and announcements directly via WhatsApp Business API.',
    icon: MessageSquare,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
    accent: '#9333EA'
  },
  {
    id: 5,
    title: 'Role-Based Access',
    desc: 'Fine-grained permissions for Admin, Principal, Faculty, Accountant — everyone sees only what they need.',
    icon: ShieldCheck,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop',
    accent: '#E11D48'
  },
  {
    id: 6,
    title: 'Multi-Branch Management',
    desc: 'Operate every campus from one dashboard. Centralized data, decentralized control.',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    accent: '#D97706'
  }
];

const STANDARD_BULLETS = [
  'Setup in minutes',
  'Works on any device',
  'Premium support included'
];

// --- ANIMATION CHOREOGRAPHY ---
const contentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  }
};

const bulletListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } }
};

const bulletItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

// --- TEXT BLOCK COMPONENT ---
const TextBlock = ({ feature, index, activeIndex, setActiveIndex }) => {
  const ref = useRef(null);
  const isActive = activeIndex === index;

  const isInView = useInView(ref, {
    margin: "-35% 0px -35% 0px"
  });

  useEffect(() => {
    if (isInView) {
      setActiveIndex(index);
    }
  }, [isInView, index, setActiveIndex]);

  const content = (
    <motion.div
      variants={contentVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
    >
      <motion.div
        variants={itemVariants}
        className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-4 md:mb-6"
        style={{ backgroundColor: `${feature.accent}15`, color: feature.accent }}
      >
        <feature.icon className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2} />
      </motion.div>

      <motion.h3
        variants={itemVariants}
        className="text-[1.5rem] leading-[1.2] md:text-4xl lg:text-[2.6rem] md:leading-tight font-extrabold text-slate-900 mb-3 tracking-tight max-w-[400px] md:max-w-none"
      >
        {feature.title}
      </motion.h3>

      <motion.p
        variants={itemVariants}
        className="text-[14px] md:text-lg text-slate-500 leading-relaxed mb-6 md:mb-8 font-medium max-w-[360px] md:max-w-[480px]"
      >
        {feature.desc}
      </motion.p>

      <motion.ul
        variants={bulletListVariants}
        className="flex flex-col gap-3 m-0 p-0 list-none"
      >
        {STANDARD_BULLETS.map((bullet, bIdx) => (
          <motion.li
            key={bIdx}
            variants={bulletItemVariants}
            className="flex items-center gap-3 text-[13px] md:text-[15px] font-bold text-slate-700"
          >
            <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 shrink-0" style={{ color: feature.accent }} strokeWidth={2.5} />
            <span>{bullet}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );

  return (
    <div 
      ref={ref} 
      className="relative w-full min-h-[130vh] md:min-h-[140vh]"
    >
<div className="sticky top-[42vh] md:top-[8vh] h-[58vh] md:h-[84vh] bg-page-bg px-1 md:px-0 flex flex-col justify-center">        {content}
      </div>
    </div>
  );
};


export default function FeatureHighlights() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFeature = FEATURES[activeIndex];

  useEffect(() => {
    FEATURES.forEach((feature) => {
      const img = new Image();
      img.src = feature.image;
    });
  }, []);

  return (
    <section 
      id="features" /* <==== ADDED ID HERE to link with your Navbar! */
className="relative w-full bg-page-bg py-8 md:py-16"    >
      
      {/* --- HEADER --- */}
      <div className="w-full flex flex-col items-center text-center px-6 mb-6 md:mb-10 z-10 relative">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#635BFF]/10 border border-[#635BFF]/20 mb-4 md:mb-6">
          <Sparkles size={13} className="text-[#635BFF]" />
          <span className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-[#635BFF]">
            Feature Highlights
          </span>
        </div>
        <h2 className="text-[1.8rem] sm:text-3xl md:text-5xl lg:text-[3.2rem] font-extrabold text-slate-900 tracking-tight leading-tight px-4">
          Built for the <span className="text-[#635BFF]">Modern Institute</span>
        </h2>
      </div>

      {/* --- SPLIT SCREEN SCROLL CONTAINER --- */}
      <div className="relative w-full max-w-[1320px] mx-auto flex flex-col md:flex-row px-5 md:px-8">
        
        {/* ================================================= */}
        {/* LEFT SIDE: THE STICKY IMAGE (Pinned)              */}
        {/* ================================================= */}
<div className="w-full md:w-1/2 sticky top-0 md:top-[8vh] h-[42vh] md:h-[84vh] flex items-center justify-center z-20 bg-page-bg md:bg-transparent pt-4 md:pt-0">          
          <div className="relative w-full max-w-[360px] md:max-w-[600px] lg:max-w-[640px] aspect-[4/3] md:aspect-[5/4.6] flex items-center justify-center">
            
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.06, clipPath: 'inset(8% 8% 8% 8% round 20px)' }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  clipPath: 'inset(0% 0% 0% 0% round 20px)',
                  transition: {
                    clipPath: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                    scale: { type: 'spring', stiffness: 140, damping: 18 },
                    opacity: { duration: 0.4 }
                  }
                }}
                exit={{
                  opacity: 0,
                  scale: 0.96,
                  transition: { duration: 0.35, ease: [0.4, 0, 1, 1] }
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative rounded-[1.25rem] md:rounded-[2rem] overflow-hidden shadow-[0_25px_60px_-15px_rgba(99,91,255,0.25)] w-full h-full aspect-[4/3] md:aspect-auto">
                  <img 
                    src={activeFeature.image} 
                    alt={activeFeature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] opacity-20 blur-[50px] md:blur-[90px] -z-10 rounded-full"
              animate={{ backgroundColor: activeFeature.accent }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          </div>
        </div>

        {/* ================================================= */}
        {/* RIGHT SIDE: THE TEXT                              */}
        {/* ================================================= */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start z-10 mt-0 md:pl-16 lg:pl-24">
          
          {FEATURES.map((feature, index) => (
            <TextBlock 
              key={feature.id} 
              feature={feature} 
              index={index} 
              activeIndex={activeIndex} 
              setActiveIndex={setActiveIndex}
            />
          ))}

          <div className="h-[10vh] md:h-[20vh] w-full" />

        </div>

      </div>
    </section>
  );
}