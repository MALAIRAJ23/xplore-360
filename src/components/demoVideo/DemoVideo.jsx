import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Play } from 'lucide-react';

// Import the local video file. 
// Adjust the relative path if demoVideo.jsx is located in a deeper subdirectory.
import demoVideoSrc from '../../assets/demoVideo/demoVideo.mp4';

export default function DemoVideo() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const [isPlaying, setIsPlaying] = useState(false);

  // Handles playing the video and showing the native controls
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full py-20 md:py-32 bg-[#FAFBFF] overflow-hidden flex justify-center">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#635BFF] opacity-[0.03] rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#8A85FF] opacity-[0.04] rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-[1200px] w-full px-5 sm:px-8 relative z-10">
        
        {/* --- HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-[680px] mx-auto mb-10 lg:mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#635BFF]/10 border border-[#635BFF]/20 mb-4 md:mb-5 shadow-sm">
            <Sparkles size={13} className="text-[#635BFF]" />
            <span className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-[#635BFF]">
              See It In Action
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.2] tracking-tight mb-4">
            Experience the Power of <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#8A85FF] to-[#635BFF] bg-clip-text text-transparent italic pr-2">Xplore 360</span>
          </h2>
          <p className="text-[14px] sm:text-base md:text-lg text-slate-500 font-medium leading-relaxed m-0 px-4">
            Watch a quick 2-minute walkthrough of how our platform seamlessly connects your entire institute.
          </p>
        </motion.div>

        {/* --- CINEMATIC VIDEO PLAYER --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[1000px] mx-auto flex justify-center items-center"
        >
          {/* Luxury Frosted Glass Bezel */}
          <div className="w-full bg-white/40 backdrop-blur-xl border border-white rounded-[1.5rem] md:rounded-[2.5rem] p-2 sm:p-4 md:p-5 shadow-[0_20px_50px_-15px_rgba(99,91,255,0.2)]">
            
            {/* Inner Video Canvas */}
            <div className="w-full bg-slate-900 border border-slate-200/50 rounded-[1rem] md:rounded-[2rem] overflow-hidden relative shadow-inner aspect-video group cursor-pointer" onClick={!isPlaying ? handlePlay : undefined}>
              
              <video 
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
                preload="metadata"
                controls={isPlaying} 
                poster="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
              >
                {/* Local video source integration */}
                <source src={demoVideoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* CUSTOM LUXURY PLAY BUTTON OVERLAY */}
              {!isPlaying && (
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center transition-all duration-500 group-hover:bg-slate-900/20">
                  
                  {/* Outer Pulsing Ring */}
                  <div className="absolute w-[80px] h-[80px] md:w-[100px] md:h-[100px] bg-white/20 rounded-full animate-ping" />
                  
                  {/* Solid Play Button */}
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-[70px] h-[70px] md:w-[90px] md:h-[90px] bg-white/90 backdrop-blur-md rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex items-center justify-center pl-1.5 transition-colors group-hover:bg-white"
                  >
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-[#635BFF] fill-[#635BFF]" />
                  </motion.div>

                </div>
              )}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}