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
  Sparkles,
  ArrowRight
} from 'lucide-react';

const INDUSTRIES = [
  { id: 1, title: 'Schools', desc: 'Admissions, attendance, fees, exams & parent communication.', icon: School, },
  { id: 2, title: 'Colleges & Universities', desc: 'Student lifecycle, departments, academics & administration.', icon: GraduationCap, },
  { id: 3, title: 'Coaching Centers', desc: 'Enquiries, batches, schedules, attendance & performance.', icon: BookOpen, },
  { id: 4, title: 'Training Institutes', desc: 'Courses, trainers, certifications & learner progress.', icon: Award, },
  { id: 5, title: 'Skill Development Centers', desc: 'Enrollments, placements, assessments & outcomes.', icon: Rocket, },
  { id: 6, title: 'Tuition Centers', desc: 'Batch management, fee collection & student tracking.', icon: Users, },
  { id: 7, title: 'Educational Trusts', desc: 'Centralized multi-branch management for large groups.', icon: Building2, },
];

export default function Industries() {


  return (
    <section id="industries" className="relative w-full py-10 md:py-16 bg-page-bg overflow-hidden" style={{ fontFamily: 'var(--font-primary)' }}>

      {/* Subtle ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#635BFF] opacity-[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 relative z-10">

        {/* Two-column layout: left header, right list */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

          {/* LEFT — Sticky header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full lg:w-[340px] shrink-0 lg:sticky lg:top-[100px] flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#635BFF]/10 border border-[#635BFF]/20 rounded-full mb-6">
              <Sparkles size={12} className="text-[#635BFF]" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#635BFF]">
                Ecosystem
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight mb-5">
              Built for{' '}
              <span className="bg-gradient-to-r from-[#8A85FF] to-[#635BFF] bg-clip-text text-transparent italic">
                every kind
              </span>{' '}
              of institute
            </h2>

            <p className="text-[15px] text-slate-500 leading-relaxed font-medium mb-8">
              One powerful platform tailored to the unique workflows of every educational institution — from small tuition centers to large university groups.
            </p>

            {/* Stat pills */}
            <div className="flex flex-col gap-3 w-fit mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#635BFF]/10 flex items-center justify-center shrink-0">
                  <span className="text-[13px] font-extrabold text-[#635BFF]">7+</span>
                </div>
                <span className="text-[13px] font-semibold text-slate-600">Institute types supported</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#635BFF]/10 flex items-center justify-center shrink-0">
                  <span className="text-[13px] font-extrabold text-[#635BFF]">100+</span>
                </div>
                <span className="text-[13px] font-semibold text-slate-600">Institutes trust Xplore 360</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#635BFF]/10 flex items-center justify-center shrink-0">
                  <span className="text-[13px] font-extrabold text-[#635BFF]">12+</span>
                </div>
                <span className="text-[13px] font-semibold text-slate-600">Years of industry experience</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Clean list */}
          <div className="flex-1 w-full">
            {INDUSTRIES.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
                  className="flex items-center gap-5 py-5 border-b border-slate-100 last:border-b-0"
                >
                  {/* Index number */}
                  <span className="text-[14px] font-extrabold text-slate-300 w-6 shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-[#F1F0FF] text-[#635BFF]">
                    <Icon size={20} strokeWidth={2} />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[19px] font-extrabold text-slate-900 tracking-tight mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-[15px] text-slate-400 font-medium leading-snug m-0">
                      {item.desc}
                    </p>
                  </div>

                  {/* Tag */}
                  <span className="hidden sm:block text-[10px] font-extrabold tracking-widest uppercase text-slate-400 bg-slate-100 px-3 py-1 rounded-full shrink-0">
                    {item.tag}
                  </span>

                  {/* Arrow */}
                  <ArrowRight size={16} strokeWidth={2.5} className="shrink-0 text-slate-300" />
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}