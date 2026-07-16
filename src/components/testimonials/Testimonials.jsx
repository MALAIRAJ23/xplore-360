import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Quote, Star, Plus, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Xplore 360 has given us better control over our institution's operations. We now have complete visibility into student management through a single platform, enabling us to streamline processes and make better administrative decisions.",
    name: 'Dr. Ramesh Kumar',
    role: 'Principal',
    rating: 5,
    // image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80&fit=crop',
    // avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 2,
    quote:"Xplore 360 is simple and easy to use. The automation features have helped our team save valuable time, streamline academic operations, and improve communication with both students and parents.",
    name: 'Priya Nair',
    role: 'Academic Coordinator',
    rating: 5,
    // image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80&fit=crop',
    // avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  // {
  //   id: 3,
  //   quote: "The seamless integration of fee collection, attendance, and parent communication into one dashboard has saved our faculty hundreds of hours every single month. Pure magic.",
  //   name: 'David Chen',
  //   role: 'Principal',
  //   rating: 5,
  //   image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&fit=crop',
  //   avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
  // }
];

const TRUSTED_CLIENTS = [
  'https://randomuser.me/api/portraits/men/11.jpg',
  'https://randomuser.me/api/portraits/women/12.jpg',
  'https://randomuser.me/api/portraits/men/13.jpg',
  'https://randomuser.me/api/portraits/women/14.jpg',
];

// --- LUXURY ANIMATION VARIANTS ---
const contentVariants = {
  enter: { opacity: 0, x: 20, filter: 'blur(4px)' },
  center: { 
    opacity: 1, 
    x: 0, 
    filter: 'blur(0px)', 
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
  },
  exit: { 
    opacity: 0, 
    x: -20, 
    filter: 'blur(4px)', 
    transition: { duration: 0.3, ease: "easeIn" } 
  }
};

const imageVariants = {
  enter: { opacity: 0, scale: 0.95, filter: 'blur(8px)' },
  center: { 
    opacity: 1, 
    scale: 1, 
    filter: 'blur(0px)', 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  },
  exit: { 
    opacity: 0, 
    scale: 1.05, 
    filter: 'blur(8px)', 
    transition: { duration: 0.4, ease: "easeIn" } 
  }
};

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const testimonial = TESTIMONIALS[active];

  const handleNext = () => {
    setActive((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    // FIX: Optimized padding to fit nicely on standard laptop monitors (py-16 to py-24)
<section id="reviews" ref={sectionRef} className="relative w-full py-8 lg:py-12 overflow-hidden bg-page-bg">      
      
      <div className="relative w-full max-w-[1250px] mx-auto px-5 sm:px-8 z-10">
        
        {/* --- HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-6 md:mb-10"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#635BFF]/10 border border-[#635BFF]/20 mb-4 md:mb-5 shadow-sm">
            <Sparkles size={13} className="text-[#635BFF]" />
            <span className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-[#635BFF]">
              Our Testimonials
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-slate-900 leading-[1.2] tracking-tight">
            Trusted by Educational Institutions <br className="hidden sm:block" />
          </h2>
           <p className="text-slate-500 text-base sm:text-lg max-w-[600px] mx-auto leading-relaxed">
    See how schools, colleges, and training institutes are simplifying daily operations with Xplore 360.
  </p>
        </motion.div>

        {/* --- CONTENT GRID --- */}
        {/* FIX: Changed to lg:grid-cols. Meaning Tablets (md) now stack gracefully instead of squishing horizontally! */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-20 items-center max-w-[1050px] mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setTimeout(() => setIsHovered(false), 2000)}
        >
          
          {/* --- LEFT: IMAGE CARD --- */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            // FIX: Removed fixed heights entirely. It now perfectly scales to a 4/5 aspect ratio.
            className="relative w-full max-w-[480px] mx-auto lg:max-w-none rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-15px_rgba(99,91,255,0.2)] aspect-[4/5] bg-slate-100"
          >
            <AnimatePresence mode="popLayout">
              <motion.img
                key={testimonial.id}
                src={testimonial.image}
                alt={testimonial.name}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Glassmorphic Trusted Clients Pill */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 bg-white/70 backdrop-blur-xl border border-white/50 rounded-full pl-4 sm:pl-5 pr-1.5 sm:pr-2 py-1.5 sm:py-2 flex items-center gap-3 sm:gap-4 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)]">
              <span className="text-[11px] sm:text-[13px] font-bold text-slate-800 tracking-tight">
                Trusted Clients
              </span>
              <div className="flex items-center -space-x-2 sm:-space-x-3">
                {TRUSTED_CLIENTS.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Client"
                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-[2px] border-white object-cover shadow-sm"
                  />
                ))}
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-[2px] border-white bg-[#635BFF] text-white flex items-center justify-center shadow-md relative z-10">
                  <Plus size={14} strokeWidth={3} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT: QUOTE TEXT --- */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="relative flex flex-col justify-center w-full"
          >
            <div className="flex flex-col w-full">
              
              {/* Top Row: Quote Icon & Stars */}
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <div className="flex items-center gap-1 bg-[#635BFF]/10 px-3.5 py-1.5 rounded-full">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="text-[#635BFF] fill-[#635BFF]"
                    />
                  ))}
                </div>
                <span className="text-[11px] md:text-[12px] font-extrabold text-slate-400 uppercase tracking-widest">Client Story</span>
              </div>

              {/* Animated Quote Text */}
              {/* FIX: Removed fixed min-heights. Text box adapts perfectly to content now. */}
              <div className="relative mb-8 md:mb-10 w-full">
                <Quote
                  size={60}
                  className="absolute top-[-10px] md:top-[-20px] left-[-10px] md:left-[-20px] text-[#635BFF]/5 fill-[#635BFF]/5 -scale-x-100 z-0 pointer-events-none"
                  strokeWidth={0}
                />
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={testimonial.id}
                    variants={contentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="text-[1.1rem] sm:text-[1.25rem] lg:text-[1.5rem] text-slate-800 leading-[1.6] font-medium m-0 relative z-10"
                  >
                    "{testimonial.quote}"
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Bottom Row: Author & Controls */}
              {/* FIX: Allows flex to wrap on ultra-small phones so it never breaks layout */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-slate-200/60 w-full">
                
                {/* Author Info */}
                <div className="flex items-center gap-3.5 sm:gap-4 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={testimonial.id}
                      variants={contentVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shadow-sm shrink-0 border border-slate-100"
                    />
                  </AnimatePresence>
                  
                  <div className="flex flex-col min-w-0">
                    <AnimatePresence mode="wait">
                      <motion.span 
                        key={testimonial.id}
                        variants={contentVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="text-[15px] sm:text-[16px] font-extrabold text-slate-900 truncate"
                      >
                        {testimonial.name}
                      </motion.span>
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                      <motion.span 
                        key={testimonial.id}
                        variants={contentVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="text-[12px] sm:text-[13px] text-[#635BFF] font-bold truncate mt-0.5"
                      >
                        {testimonial.role}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous review"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-slate-500 hover:text-[#635BFF] hover:bg-[#635BFF]/10 flex items-center justify-center border border-slate-200 cursor-pointer shadow-sm transition-all duration-300"
                  >
                    <ArrowLeft size={18} strokeWidth={2.5} />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next review"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#635BFF] text-white flex items-center justify-center border-none cursor-pointer shadow-[0_8px_20px_-6px_rgba(99,91,255,0.5)] hover:bg-[#4A44D4] hover:shadow-[0_12px_24px_-6px_rgba(99,91,255,0.6)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </button>
                </div>

              </div>
            </div>
          </motion.div>
        </div>

        {/* --- PAGINATION DOTS --- */}
        <div className="flex items-center justify-center gap-2.5 mt-10 md:mt-16">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full border-none cursor-pointer transition-all duration-500 outline-none ${
                i === active ? 'w-8 bg-[#635BFF]' : 'w-2 bg-slate-200 hover:bg-slate-300'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}