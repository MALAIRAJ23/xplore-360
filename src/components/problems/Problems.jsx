import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, MailOpen, 
  Calendar, CalendarCheck, 
  Folder, FolderOpen, 
  Wallet, CreditCard, 
  Book, BookOpen,
  MessageSquare,
  CheckCircle2,
  FileText,
  Database
} from 'lucide-react';

const CAROUSEL_DATA = [
  {
    id: 1,
    ClosedIcon: Mail,
    OpenIcon: MailOpen,
    SmallIcon: MessageSquare,
    title: 'COMMUNICATION GAP',
    desc: 'Parents unaware of progress, resulting in endless calls.',
    solution: 'Automated Notifications'
  },
  {
    id: 2,
    ClosedIcon: Calendar,
    OpenIcon: CalendarCheck,
    SmallIcon: CalendarCheck,
    title: 'ATTENDANCE TRACKING',
    desc: 'Manual registers, errors, and missing records.',
    solution: 'Biometric & App Attendance'
  },
  {
    id: 3,
    ClosedIcon: Folder,
    OpenIcon: FolderOpen,
    SmallIcon: FileText,
    title: 'MANUAL ADMISSION',
    desc: 'Paper forms, lost data, slow processing.',
    solution: 'Online Admission Portal'
  },
  {
    id: 4,
    ClosedIcon: Wallet,
    OpenIcon: CreditCard,
    SmallIcon: Wallet,
    title: 'FEE COLLECTION DELAYS',
    desc: 'Endless follow-ups and reconciliation pain.',
    solution: 'Auto Reminders & Gateways'
  },
  {
    id: 5,
    ClosedIcon: Book,
    OpenIcon: BookOpen,
    SmallIcon: Database,
    title: 'SCATTERED DATA',
    desc: 'Data spread across Excel sheets and registers.',
    solution: 'Centralized Cloud CRM'
  }
];

// Individual Card Component
const ProblemCard = ({ card }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // ANIMATION 1: Mouse Tracking Logic for the Spotlight
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-[300px] sm:w-[340px] md:w-[380px] shrink-0 bg-white p-[8px] rounded-[24px] shadow-[0_8px_24px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_24px_48px_-12px_rgba(99,91,255,0.2)] transition-shadow duration-500 flex flex-col border border-slate-100 cursor-pointer group overflow-hidden"
    >
      {/* ANIMATION 1: The Spotlight Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 z-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(138, 133, 255, 0.12), transparent 40%)`
        }}
      />

      {/* Top Purple Area */}
      <div className="w-full h-[160px] md:h-[190px] bg-gradient-to-br from-[#8A85FF] to-[#635BFF] rounded-[18px] flex items-center justify-center relative overflow-hidden">
        
        {/* Subtle noise grain */}
        <div 
          className="absolute inset-0 mix-blend-overlay opacity-15 pointer-events-none" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />
        
        <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center z-10">
          
          {/* CLOSED ICON */}
          <motion.div
            animate={isHovered ? { opacity: 0, scale: 0.5, rotate: -15 } : { opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <card.ClosedIcon className="text-white w-full h-full drop-shadow-md" strokeWidth={1.5} />
          </motion.div>

          {/* OPEN ICON */}
          <motion.div
            animate={isHovered ? { opacity: 1, scale: 1.1, rotate: 0 } : { opacity: 0, scale: 0.5, rotate: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <card.OpenIcon className="text-white w-full h-full drop-shadow-md" strokeWidth={1.5} />
          </motion.div>

        </div>
      </div>

      {/* Bottom Details Area */}
      <div className="px-4 md:px-6 py-5 md:py-6 flex flex-col gap-2 relative z-10">
        
        {/* ANIMATION 2: Title Row Lift */}
        <motion.div 
          animate={isHovered ? { y: -4 } : { y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-8 bg-[#635BFF]/10 rounded-lg flex items-center justify-center shrink-0">
            <card.SmallIcon className="text-[#635BFF] w-4 h-4" strokeWidth={2.5} />
          </div>
          <h3 className="font-display font-extrabold text-[14px] md:text-[16px] text-slate-800 tracking-wide uppercase truncate">
            {card.title}
          </h3>
        </motion.div>
        
        {/* ANIMATION 2: Description Lift */}
        <motion.p 
          animate={isHovered ? { y: -4 } : { y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.05 }}
          className="text-[12px] md:text-[13px] text-slate-500 font-medium pl-11 leading-snug"
        >
          {card.desc}
        </motion.p>

        {/* ANIMATION 2: Badge Lift */}
        <motion.div 
          animate={isHovered ? { y: -4 } : { y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.1 }}
          className="mt-2 ml-11 inline-flex items-center gap-1.5 bg-[#635BFF]/10 px-3 py-1.5 rounded-full w-max transition-colors group-hover:bg-[#635BFF]/15"
        >
          {/* ANIMATION 3: Pop & Spin Checkmark */}
          <motion.div
            animate={isHovered ? { rotate: 360, scale: 1.2 } : { rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="shrink-0 flex items-center justify-center"
          >
            <CheckCircle2 className="text-[#635BFF] w-3.5 h-3.5" strokeWidth={2.5} />
          </motion.div>
          
          <span className="text-[10px] md:text-[11px] text-[#635BFF] font-bold uppercase tracking-wider">
            {card.solution}
          </span>
        </motion.div>

      </div>
    </div>
  );
};

const Problems = () => {
  return (
    // FIX: Changed pb-32 to pb-12 md:pb-16
    <section className="relative w-full pt-8 pb-12 md:pb-16 overflow-hidden flex flex-col items-center justify-center bg-page-bg perspective-[1000px]">
        
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }
        .animate-scroll-left {
          animation: scroll-left 35s linear infinite;
        }
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* ANIMATION 4: Scroll-Triggered Entrance Reveal */}
      <motion.div 
        // FIX: Reduced y offset from 80 to 40, and amount to 0.1 so it triggers earlier
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }} 
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
        className="w-full max-w-[1600px] overflow-hidden py-8 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
      >
        
        <div className="flex w-max gap-6 animate-scroll-left px-6">
          {[...CAROUSEL_DATA, ...CAROUSEL_DATA].map((card, index) => (
            <ProblemCard key={`${card.id}-${index}`} card={card} />
          ))}
        </div>

      </motion.div>
      
    </section>
  );
};

export default Problems;