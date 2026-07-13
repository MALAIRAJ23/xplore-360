import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../shared/Logo';
import Button from '../ui/Button';
import { NAV_LINKS } from '../../data/navLinks';
import DemoDialog from '../demo/DemoDialog';

// Framer Motion variants for the mobile menu stagger effect
const mobileMenuVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.05, delayChildren: 0.1 } 
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    scale: 0.98,
    transition: { duration: 0.2, ease: "easeIn" } 
  }
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 1024) setMenuOpen(false); // Auto-close mobile menu on desktop
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleScrollToSection = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        setMenuOpen(false);
        const navbarOffset = 100; 
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleOpenDemo = () => {
    setMenuOpen(false); // close mobile menu if it's open, so it doesn't sit behind the dialog
    setIsDemoOpen(true);
  };

  const isCompact = windowWidth <= 1024; // Use standard lg breakpoint

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-4 sm:pt-5 pointer-events-none">
      
      {/* --- DESKTOP / MAIN NAVBAR --- */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto flex items-center justify-between w-full max-w-[1200px] py-2 pl-5 pr-2.5 sm:pr-3 rounded-full transition-all duration-500 ease-out border ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-xl border-slate-200/80 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)]' 
            : 'bg-white/40 backdrop-blur-md border-white/40 shadow-sm'
        }`}
      >
        <div className="flex items-center cursor-pointer" onClick={(e) => handleScrollToSection(e, '#hero')}>
          <Logo />
        </div>

        {/* Desktop Links */}
        <ul className={`${isCompact ? 'hidden' : 'flex'} items-center gap-1 list-none m-0 p-0 relative`}>
          {NAV_LINKS.map((link) => (
            <li key={link.id} className="relative z-10">
              <a
                href={link.href}
                onClick={(e) => handleScrollToSection(e, link.href)}
                onMouseEnter={() => setHoveredLink(link.id)}
                onMouseLeave={() => setHoveredLink(null)}
                // FIX: Changed to text-black and font-extrabold for a strong, punchy look
                className={`relative px-4 py-2 text-[14px] font-extrabold transition-colors duration-300 block ${
                  hoveredLink === link.id ? 'text-[#635BFF]' : 'text-black'
                }`}
              >
                {link.label}
              </a>
              
              {/* Apple-style floating pill hover effect */}
              {hoveredLink === link.id && (
                <motion.div
                  layoutId="navHoverPill"
                  className="absolute inset-0 bg-[#635BFF]/10 rounded-full -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="flex items-center gap-3">
          <div className={`${isCompact ? 'hidden' : 'block'}`}>
            <Button variant="primary" size="sm" onClick={handleOpenDemo}>
              Book a Demo
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
              isCompact ? 'flex' : 'hidden'
            } ${menuOpen ? 'bg-[#635BFF]/10 text-[#635BFF]' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                  <X size={20} strokeWidth={2.5} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                  <Menu size={20} strokeWidth={2.5} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isCompact && menuOpen && (
          <>
            {/* Blurred Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 pointer-events-auto"
              onClick={() => setMenuOpen(false)}
            />

            {/* Dropdown Menu */}
            <motion.div 
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-[80px] left-4 right-4 sm:left-6 sm:right-6 bg-white p-5 rounded-[24px] border border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] flex flex-col gap-2 z-50 pointer-events-auto overflow-hidden"
            >
              <ul className="flex flex-col gap-1 list-none m-0 p-0 mb-4">
                {NAV_LINKS.map((link) => (
                  <motion.li key={`mobile-${link.id}`} variants={mobileItemVariants}>
                    <a
                      href={link.href}
                      onClick={(e) => handleScrollToSection(e, link.href)}
                      // FIX: Changed mobile links to text-black and font-extrabold
                      className="block w-full text-[15px] font-extrabold text-black px-4 py-3.5 rounded-xl hover:bg-[#635BFF]/10 hover:text-[#635BFF] transition-colors"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              
              <motion.div variants={mobileItemVariants}>
                <Button variant="primary" full size="md" onClick={handleOpenDemo}>
                  Book a Demo
                </Button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <DemoDialog isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />

    </header>
  );
}