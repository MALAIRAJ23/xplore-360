import React, { useRef, useMemo, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Users, Database, Settings, GraduationCap, Headphones, Rocket, Sparkles } from 'lucide-react';

// ---- Geometry Helpers for the Circular Orbit ----
const NODE_R = 42; 

const getPos = (radius, angleDeg) => {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    left: `${50 + radius * Math.sin(rad)}%`,
    top: `${50 - radius * Math.cos(rad)}%`,
  };
};

const days = [
  { day: 'DAY 01', title: 'Requirement Gathering', Icon: Users, angle: 315 },
  { day: 'DAY 02', title: 'Data Migration', Icon: Database, angle: 45 },
  { day: 'DAY 03', title: 'Configuration Setup', Icon: Settings, angle: 115 },
  { day: 'DAY 04', title: 'User Training', Icon: GraduationCap, angle: 245 },
  { day: 'DAY 05-07', title: 'Go Live & Support', Icon: Headphones, angle: 180 },
];

// Floating dust particles scattered around the scene for extra depth
const particles = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: 2 + Math.random() * 3,
  duration: 6 + Math.random() * 8,
  delay: Math.random() * 4,
}));

const ImplementationProcess = () => {
  const sectionRef = useRef(null);
  const orbitWrapRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax background blobs
  const blobY1 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const orbitY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // ---- Mouse-driven 3D tilt for the whole orbit scene ----
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const tiltX = useSpring(rawX, { stiffness: 120, damping: 18, mass: 0.4 });
  const tiltY = useSpring(rawY, { stiffness: 120, damping: 18, mass: 0.4 });

  const rotateX = useTransform(tiltY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-12, 12]);
  const glowX = useTransform(tiltX, [-0.5, 0.5], [30, 70]);
  const glowY = useTransform(tiltY, [-0.5, 0.5], [30, 70]);

  const handlePointerMove = useCallback((e) => {
    const el = orbitWrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(px);
    rawY.set(py);
  }, [rawX, rawY]);

  const handlePointerLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  // Calculate mathematical coordinates once for the nodes
  const nodePositions = useMemo(
    () => days.map((d) => ({ ...d, pos: getPos(NODE_R, d.angle) })),
    []
  );

  return (
    <section
      ref={sectionRef}
className="relative w-full px-5 py-20 md:py-32 bg-page-bg flex flex-col items-center overflow-hidden [perspective:1600px]"    >

      {/* 3D Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-earth {
          0% { transform: rotateX(60deg) rotateY(0deg); }
          100% { transform: rotateX(60deg) rotateY(360deg); }
        }
        @keyframes spin-earth-rev {
          0% { transform: rotateX(60deg) rotateZ(0deg) rotateY(360deg); }
          100% { transform: rotateX(60deg) rotateZ(0deg) rotateY(0deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.9); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 0.2; }
          100% { transform: scale(0.9); opacity: 0.8; }
        }
        @keyframes pulse-ring-slow {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.35); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        @keyframes float-dust {
          0%, 100% { transform: translate3d(0,0,0); opacity: 0.15; }
          50% { transform: translate3d(6px,-14px,0); opacity: 0.6; }
        }
        @keyframes dash-flow {
          to { stroke-dashoffset: -20; }
        }
        @keyframes shimmer-sweep {
          0% { transform: translateX(-120%) rotate(20deg); }
          100% { transform: translateX(220%) rotate(20deg); }
        }
      `}} />

      {/* Ambient Background Grid & Glows */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
     

      {/* Floating dust particles */}
      <div className="absolute inset-0 z-[1] pointer-events-none hidden sm:block">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-[#8A85FF]"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animation: `float-dust ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ---- Header ---- */}
      <motion.div
        className="relative z-10 w-full max-w-[640px] text-center mb-16 md:mb-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-bold tracking-widest uppercase text-[#635BFF] bg-white border border-[#635BFF]/20 shadow-sm px-4 py-1.5 rounded-full mb-4">
          <Sparkles size={13} />
          Implementation
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-[2.8rem] font-extrabold text-slate-900 leading-[1.2] mb-4 tracking-tight">
          Go Live In Just <span className="bg-gradient-to-r from-[#8A85FF] to-[#635BFF] bg-clip-text text-transparent">7 Days</span>
        </h2>
        <p className="text-sm md:text-base text-slate-500 leading-relaxed m-0 font-medium px-4">
          Fast, effortless deployment with zero operational disruption. Your institute runs smoothly while we set everything up.
        </p>
      </motion.div>

      {/* ---- 3D Globe & Orbit Diagram ---- */}
      <motion.div
        ref={orbitWrapRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative z-10 w-[75%] sm:w-full max-w-[600px] lg:max-w-[750px] flex flex-col items-center aspect-square mx-auto [transform-style:preserve-3d]"
        style={{ y: orbitY, rotateX, rotateY }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >

        {/* Soft cursor-reactive glow beneath the scene, adds depth */}
        <motion.div
          className="absolute w-[70%] h-[70%] rounded-full blur-[60px] opacity-[0.15] pointer-events-none z-0"
          style={{
            left: glowX,
            top: glowY,
            translateX: '-50%',
            translateY: '-50%',
            background: 'radial-gradient(circle, rgba(99,91,255,0.5), transparent 70%)',
          }}
        />

        {/* 1. The Orbit Track (double ring for depth) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[84%] h-[84%] rounded-full border-[1.5px] md:border-2 border-dashed border-[#635BFF]/35 z-[1] [transform:translateZ(10px)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full border md:border-2 border-[#8A85FF]/15 z-[1] [transform:translateZ(-10px)]" />

        {/* 2. The 3D Spinning Globe Wireframe (layered, counter-rotating for parallax depth) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[44%] aspect-square [perspective:1000px] z-[2]">
          <div className="w-full h-full relative [transform-style:preserve-3d] animate-[spin-earth_20s_linear_infinite]">
            <div className="absolute inset-0 rounded-full border-[1.5px] md:border-2 border-[#635BFF]/45 [transform:rotateY(0deg)]" />
            <div className="absolute inset-0 rounded-full border-[1.5px] md:border-2 border-[#635BFF]/35 [transform:rotateY(45deg)]" />
            <div className="absolute inset-0 rounded-full border-[1.5px] md:border-2 border-[#8A85FF]/35 [transform:rotateY(90deg)]" />
            <div className="absolute inset-0 rounded-full border-[1.5px] md:border-2 border-[#8A85FF]/25 [transform:rotateY(135deg)]" />
            <div className="absolute inset-0 rounded-full border-[1.5px] md:border-2 border-dashed border-[#635BFF]/50 [transform:rotateX(90deg)]" />
          </div>
          {/* inner counter-spinning halo for parallax richness */}
          <div className="absolute inset-[15%] [transform-style:preserve-3d] animate-[spin-earth-rev_28s_linear_infinite]">
            <div className="absolute inset-0 rounded-full border-[1.5px] md:border-2 border-dashed border-[#635BFF]/40 [transform:rotateX(90deg)]" />
          </div>
          {/* soft glow core so the globe reads as a lit sphere, not flat lines */}
          <div className="absolute inset-[18%] rounded-full bg-gradient-to-br from-[#8A85FF]/20 to-transparent blur-md" />
        </div>

        {/* 3. SVG Connecting Lines — flowing energy toward the hub */}
        <svg className="absolute inset-0 w-full h-full z-[2] overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="lineFade" cx="50" cy="50" r="45" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#635BFF" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#635BFF" stopOpacity="0.12" />
            </radialGradient>
          </defs>
          {nodePositions.map((n, idx) => (
            <line
              key={n.day}
              x1="50"
              y1="50"
              x2={parseFloat(n.pos.left)}
              y2={parseFloat(n.pos.top)}
              stroke="url(#lineFade)"
              strokeWidth="0.9"
              strokeDasharray="3 4"
              style={{ animation: `dash-flow ${2.5 + idx * 0.3}s linear infinite` }}
            />
          ))}
        </svg>

        {/* 4. Center Hub (GO LIVE) */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[22%] max-w-[110px] aspect-square flex items-center justify-center z-10 [transform:translateZ(40px)]"
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          {/* Outer slow pulse ring (radar sweep feel) */}
          <div className="absolute inset-[-35%] rounded-full border border-[#8A85FF]/25 animate-[pulse-ring-slow_3s_ease-out_infinite]" />
          {/* Pulsing ring */}
          <div className="absolute inset-[-15%] rounded-full border border-dashed border-[#635BFF]/30 animate-[pulse-ring_4s_linear_infinite]" />

          {/* Solid Core */}
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-br from-[#8A85FF] to-[#635BFF] border-[3px] sm:border-[4px] border-white shadow-[0_10px_25px_-5px_rgba(99,91,255,0.45)] flex flex-col items-center justify-center gap-0.5 sm:gap-1 text-white relative z-10 overflow-hidden"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* diagonal shimmer sweep across the core */}
            <span
              className="absolute top-[-50%] left-[-20%] w-[40%] h-[200%] bg-white/25 blur-sm"
              style={{ animation: 'shimmer-sweep 3.5s ease-in-out infinite' }}
            />
            <Rocket className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" strokeWidth={2.5} />
            <span className="text-[8px] sm:text-[10px] font-extrabold tracking-widest uppercase relative z-10">Go Live</span>
          </motion.div>
        </motion.div>

        {/* 5. Day Nodes (Cards) — 3D flip-in entrance for extra depth */}
        {nodePositions.map((n, idx) => {
          const { Icon } = n;
          return (
            <motion.div
              key={n.day}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 sm:gap-3 cursor-pointer z-20 whitespace-nowrap group bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-[0_8px_24px_-8px_rgba(15,23,42,0.12)] py-1.5 px-3 pl-1.5 sm:py-2 sm:px-4 sm:pl-2 rounded-full [transform-style:preserve-3d]"
              style={{ top: n.pos.top, left: n.pos.left, transform: 'translateZ(25px)' }}

              initial={{ opacity: 0, scale: 0.4, rotateX: -60, z: -40 }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 0, z: 25 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 + idx * 0.12, type: 'spring', stiffness: 240, damping: 20 }}
              whileHover={{ scale: 1.07, y: -6, boxShadow: '0 16px 32px -10px rgba(99,91,255,0.3)' }}
            >
              {/* Icon Circle */}
              <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center transition-colors group-hover:bg-[#635BFF] group-hover:text-white">
                <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={2.5} />
              </div>

              {/* Text Info */}
              <div className="flex flex-col items-start gap-0 sm:gap-0.5 pr-1 sm:pr-2">
                <span className="text-[8px] sm:text-[10px] font-extrabold tracking-widest text-[#635BFF] uppercase">
                  {n.day}
                </span>
                <span className="text-[11px] sm:text-[14px] font-bold text-slate-900 leading-tight">
                  {n.title}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

    </section>
  );
};

export default ImplementationProcess;