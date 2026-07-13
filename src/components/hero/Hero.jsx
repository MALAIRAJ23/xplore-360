import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

import logo from '../../assets/logo.png';

import imgMobile1 from '../../assets/hero/mobile-image-1.png';
import imgMobile2 from '../../assets/hero/mobile-image-2.png';
import imgMobile3 from '../../assets/hero/mobile-image-3.png';
import imgMobile4 from '../../assets/hero/mobile-image-4.png';
import imgMobile5 from '../../assets/hero/mobile-image-5.png';
import imgMobile6 from '../../assets/hero/mobile-image-6.png';
import imgMobile7 from '../../assets/hero/mobile-image-7.png';
import DemoDialog from '../demo/DemoDialog';

const AnimatedNumber = ({ end, suffix = '', start = false }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTimestamp = null;
    const duration = 2000;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4); 
      setValue(Math.floor(ease * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, start]);

  return <>{value.toLocaleString()}{suffix}</>;
};

const DEVICE_IMAGES = [
  { key: 'showcase-1', src: imgMobile1, alt: 'Mobile Interface 1' },
  { key: 'showcase-2', src: imgMobile2, alt: 'Mobile Interface 2' },
  { key: 'showcase-3', src: imgMobile3, alt: 'Mobile Interface 3' },
  { key: 'showcase-4', src: imgMobile4, alt: 'Mobile Interface 4' },
  { key: 'showcase-5', src: imgMobile5, alt: 'Mobile Interface 5' },
  { key: 'showcase-6', src: imgMobile6, alt: 'Mobile Interface 6' },
  { key: 'showcase-7', src: imgMobile7, alt: 'Mobile Interface 7' },
];

const STATS_DATA = [
  { end: 100, suffix: '+', label: 'Institutes' },
  { end: 50000, suffix: '+', label: 'Students' },
  { end: 10, suffix: '+ Yrs', label: 'Experience' },
  { end: 95, suffix: '%', label: 'Retention' },
];

// Animation variants for staggered text reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  // Using a smooth ease out instead of heavy spring for text entrance
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const Hero = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DEVICE_IMAGES.length);
    }, 3500);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, []);

  const isMobile = windowWidth <= 640;

  const getDeviceStyle = (index) => {
    const total = DEVICE_IMAGES.length;
    let diff = (index - activeIndex) % total;
    if (diff < 0) diff += total;
    if (diff > total / 2) diff -= total;

    const xOffset = isMobile ? 46 : 55;
    const sideScale = isMobile ? 0.78 : 0.82;

    if (diff === 0) return { x: '0%', scale: 1, opacity: 1, zIndex: 10 };
    if (diff === 1) return { x: `${xOffset}%`, scale: sideScale, opacity: 0.5, zIndex: 5 };
    if (diff === -1) return { x: `-${xOffset}%`, scale: sideScale, opacity: 0.5, zIndex: 5 };
    
    return { x: diff > 0 ? `${xOffset * 2}%` : `-${xOffset * 2}%`, scale: sideScale - 0.1, opacity: 0, zIndex: 1 };
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-[90vh] flex items-center">

      {/* Dynamic Keyframes for Left-to-Right Scrolling */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-scroll-right {
          animation: scroll-right 45s linear infinite;
          width: max-content;
        }
        .marquee-container:hover .animate-scroll-right {
          animation-play-state: paused;
        }
      `}} />

      <div className="w-full max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-16 px-5 sm:px-8 xl:px-12 relative z-10">
        
        {/* Left Column: Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full lg:col-span-6 flex flex-col items-center text-center lg:items-start lg:text-left order-1"
        >
          

          {/* UPDATED CONTENT MATCHING YOUR IMAGE */}
          <motion.h1 variants={itemVariants} className="text-slate-900 font-extrabold tracking-tight leading-[1.1] mb-6 text-[2.2rem] sm:text-4xl md:text-5xl lg:text-[3.6rem]">
            Complete <span className="text-[#635BFF]">Institute Management CRM</span> for Schools, Colleges &amp; Training Centers
          </motion.h1>

          <motion.p variants={itemVariants} className="text-slate-500 leading-relaxed text-base md:text-[1.1rem] max-w-[540px] mb-8 mx-auto lg:mx-0">
            Manage Admissions, Students, Fees, Attendance, Staff, Exams, and Communication from a single, beautifully designed platform.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
            <button
              onClick={() => setIsDemoOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#635BFF] hover:bg-[#4A44D4] text-white rounded-xl font-semibold shadow-[0_10px_20px_rgba(99,91,255,0.25)] hover:shadow-[0_15px_25px_rgba(99,91,255,0.35)] transition-all flex items-center justify-center gap-2 group"
            >
              Book Free Demo <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 w-full pt-8 border-t border-slate-200/60 gap-6">
            {STATS_DATA.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center lg:items-start">
                <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
                  <AnimatedNumber end={stat.end} suffix={stat.suffix} start={mounted} />
                </h4>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: Device Showcase */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:col-span-6 h-[480px] sm:h-[600px] flex items-center justify-center relative order-2 mt-4 lg:mt-0 isolate"
        >
          {DEVICE_IMAGES.map((img, index) => {
            const style = getDeviceStyle(index);
            // Optimization: If opacity is 0, don't render it interactively to save mobile resources
            if (style.opacity === 0 && isMobile) return null;

            return (
              <motion.div 
                key={img.key} 
                className="absolute flex items-center justify-center will-change-[transform,opacity]"
                initial={false}
                animate={{ 
                  x: style.x, 
                  scale: style.scale, 
                  opacity: style.opacity,
                  zIndex: style.zIndex 
                }}
                // Switched from heavy physics 'spring' to hardware-friendly 'tween'
                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              >
                {/* iPhone Frame */}
                <div className="w-[220px] sm:w-[280px] aspect-[9/19] bg-slate-900 rounded-[30px] sm:rounded-[35px] p-[6px] sm:p-[8px] relative shadow-[0_15px_30px_-10px_rgba(0,0,0,0.3)] sm:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.4)] border border-slate-800">
                  {/* Dynamic Island / Notch */}
                  <div className="absolute top-[10px] sm:top-[12px] left-1/2 -translate-x-1/2 w-[30%] h-[16px] sm:h-[20px] bg-slate-900 rounded-full z-20" />
                  
                  {/* Screen Content */}
                  <div className="w-full h-full bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden relative">
                    <img 
                      src={img.src} 
                      alt={img.alt} 
                      className="w-full h-full object-cover object-top"
                      decoding="async" 
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>

      {/* ======================================================== */}
      {/* INFINITE LEFT-TO-RIGHT MARQUEE (Clickable & Slimmer)     */}
      {/* ======================================================== */}
     <div 
  className="marquee-container absolute bottom-0 left-0 w-full overflow-hidden py-2 cursor-pointer z-20 group"
  onClick={() => setIsDemoOpen(true)}
>
        <div className="flex animate-scroll-right items-center">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="text-[12px] md:text-[13px] font-extrabold tracking-[0.2em] uppercase text-[#635BFF] px-6 md:px-10 transition-colors duration-300">
                Book Your Free Demo Now
              </span>
              <img 
                src={logo} 
                alt="Xplore 360 Logo" 
                className="h-8 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110" 
              />
            </div>
          ))}
        </div>
      </div>

      <DemoDialog isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </section>
  );
};

export default Hero;