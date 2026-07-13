import React from 'react';
import { motion } from 'framer-motion';
import {
  School,
  GraduationCap,
  BookOpen,
  Award,
  Rocket,
  Users,
  Building2,
  Sparkles
} from 'lucide-react';

const INDUSTRIES = [
  {
    id: 1,
    title: 'Schools',
    desc: 'Manage admissions, attendance, fees, exams, and parent communication.',
    icon: School
  },
  {
    id: 2,
    title: 'Colleges',
    desc: 'Handle student lifecycle, departments, academics, and administration.',
    icon: GraduationCap
  },
  {
    id: 3,
    title: 'Coaching Centers',
    desc: 'Track enquiries, batches, schedules, attendance, and performance.',
    icon: BookOpen
  },
  {
    id: 4,
    title: 'Training Institutes',
    desc: 'Manage courses, trainers, certifications, and learner progress.',
    icon: Award
  },
  {
    id: 5,
    title: 'Skill Development Centers',
    desc: 'Monitor enrollments, placements, assessments, and outcomes.',
    icon: Rocket
  },
  {
    id: 6,
    title: 'Tuition Centers',
    desc: 'Simplify batch management, fee collection, and student tracking.',
    icon: Users
  },
  {
    id: 7,
    title: 'Educational Trusts',
    desc: 'Centralized management for multiple institutions and branches.',
    icon: Building2
  },
];

// Duplicate the list so the loop is completely seamless
const LOOP_ITEMS = [...INDUSTRIES, ...INDUSTRIES];

export default function Industries() {
  return (
    // FIX: Reduced main padding from (py-16 lg:py-32) to (py-10 lg:py-20)
    <section className="relative w-full py-10 md:py-16 lg:py-20 bg-page-bg overflow-hidden font-sans">
      
      {/* --- Ambient Background Glows --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#635BFF] opacity-[0.03] rounded-full blur-[100px] pointer-events-none" />

      {/* --- Header Section --- */}
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          // FIX: Reduced margin-bottom from (mb-12 md:mb-16) to (mb-8 md:mb-12)
          className="max-w-2xl mx-auto text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#635BFF]/10 border border-[#635BFF]/20 shadow-sm rounded-full mb-5">
            <Sparkles size={12} className="text-[#635BFF]" />
            <span className="text-[10px] md:text-[11px] font-extrabold uppercase tracking-widest text-[#635BFF]">
              Ecosystem
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight mb-4">
            Built for{' '}
            <span className="bg-gradient-to-r from-[#8A85FF] to-[#635BFF] bg-clip-text text-transparent italic pr-2">Every Kind of Institute</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-500 leading-relaxed font-medium">
            Explore dynamic modules designed to cater directly to your specific learning framework.
          </p>
        </motion.div>
      </div>

      {/* --- Infinite Marquee Row --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full max-w-[1800px] mx-auto"
      >
        
        {/* CSS for Seamless Infinite Scroll */}
        <style dangerouslySetInnerHTML={{__html: `
          .marquee-track {
            /* 12px handles exactly half of the 24px (gap-6) to make the loop perfectly seamless */
            animation: marquee-scroll 40s linear infinite;
          }
          .marquee-track:hover, .marquee-track:active {
            animation-play-state: paused;
          }
          @keyframes marquee-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(calc(-50% - 12px)); } 
          }
        `}} />

        {/* Fade Edges (Dynamically sized for mobile vs desktop) */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-32 md:w-48 bg-gradient-to-r from-page-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-32 md:w-48 bg-gradient-to-l from-page-bg to-transparent z-10 pointer-events-none" />

        <div className="marquee-track flex gap-6 w-max px-4">
          {LOOP_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`${item.id}-${idx}`}
                className="group shrink-0 w-[260px] sm:w-[300px] md:w-[320px] bg-white border border-slate-200/80 rounded-[24px] px-6 py-7 flex flex-col gap-4 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(99,91,255,0.15)] hover:border-[#635BFF]/30 transition-all duration-300 cursor-pointer hover:-translate-y-1.5"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#635BFF]/15">
                  <Icon size={22} className="md:w-6 md:h-6" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col flex-1 mt-1">
                  <h3 className="text-[16px] md:text-[18px] font-extrabold text-slate-900 tracking-tight mb-2 transition-colors duration-300 group-hover:text-[#635BFF]">
                    {item.title}
                  </h3>
                  <p className="text-[13px] md:text-[14px] text-slate-500 leading-relaxed font-medium m-0">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

    </section>
  );
}