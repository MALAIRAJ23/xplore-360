import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Mail } from 'lucide-react';
import logo from '../../assets/logo.png';
import DemoDialog from '../demo/DemoDialog';

const footerColumns = [
  {
    title: 'ABOUT',
    links: ['Demo', 'Blogs', 'Privacy Policy', 'Legal'],
  },
  {
    title: 'SOCIALS',
    links: [
      { label: 'Linkedin', href: 'https://www.linkedin.com/company/xplore-intellects-private-ltd/' },
      { label: 'Website', href: 'https://xploreintellects.com/' },
      { label: 'Instagram', href: 'https://www.instagram.com/xplore_intellects/' },
      { label: 'Pinterest', href: 'https://in.pinterest.com/Xplore_Intellects/' },
      { label: 'Medium', href: 'https://medium.com/@xploreintellect' },
      { label: 'Youtube', href: 'https://www.youtube.com/@XploreIntellects' },
    ],
  },
];

const contactInfo = {
  title: 'CONTACT US',
  addresses: [
    '12/46, 9th St, Siddhapudur, Tatabad, Coimbatore, Tamil Nadu 641012',
    'Musalla Tower, Musalla Area, Al Zahra Street, Sharjah, United Arab Emirates-61164.',
  ],
  phone: '+91 90257 84560',
  email: 'rubin.ebenezer@xploreintellects.com',
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

const Footer = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <div className="w-full bg-[#FAFBFF] overflow-hidden">
      {/* ========================================= */}
      {/* 1. THE PURPLE CTA BANNER                  */}
      {/* ========================================= */}
      <section className="w-full px-5 sm:px-8 pt-8 md:pt-12 lg:pt-16 pb-8 md:pb-12 flex justify-center">
        <motion.div
          className="relative w-full max-w-[1200px] py-12 px-5 sm:py-16 sm:px-10 md:py-20 md:px-12 rounded-[24px] sm:rounded-[2.5rem] md:rounded-[3rem] bg-gradient-to-br from-[#7c3aed] via-[#6d28d9] to-[#635BFF] shadow-[0_20px_40px_-12px_rgba(109,40,217,0.3)] text-center overflow-hidden"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] md:w-full h-[150px] md:h-[200px] bg-white opacity-[0.05] blur-[50px] md:blur-[60px] rounded-full pointer-events-none" />

          <h2 className="text-[1.75rem] sm:text-3xl md:text-5xl font-extrabold text-white m-0 mb-3 md:mb-5 tracking-tight relative z-10 leading-tight">
            Ready to Digitize Your Institute?
          </h2>
          <p className="text-[14px] sm:text-base md:text-lg text-white/85 max-w-[600px] mx-auto mb-8 md:mb-10 leading-relaxed font-medium relative z-10 px-2">
            Reduce administrative workload and streamline operations with one powerful CRM.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 md:gap-4 relative z-10 w-full px-2 sm:px-0">
            <motion.button
              type="button"
              onClick={() => setIsDemoOpen(true)}
              className="inline-flex items-center justify-center text-[14px] md:text-[15px] font-bold py-3.5 md:py-4 px-8 rounded-full border-none cursor-pointer transition-transform duration-200 bg-white text-[#6d28d9] w-full sm:w-auto shadow-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Book Free Demo
            </motion.button>
            <motion.a
              href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center justify-center gap-2 text-[14px] md:text-[15px] font-bold py-3.5 md:py-4 px-8 rounded-full cursor-pointer transition-colors duration-200 bg-transparent text-white border border-white/30 hover:bg-white/10 w-full sm:w-auto no-underline"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone size={16} strokeWidth={2.5} />
              Talk to an Expert
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* ========================================= */}
      {/* 2. THE STRICTLY RESPONSIVE FOOTER         */}
      {/* ========================================= */}
      <footer className="w-full pt-8 md:pt-12 pb-6 md:pb-8 px-6 md:px-8">
        <motion.div
          className="max-w-[1200px] mx-auto flex flex-col lg:flex-row justify-between gap-12 lg:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
        >
          {/* --- LEFT SIDE: BRAND & TAGLINE --- */}
          <motion.div className="flex flex-col w-full lg:w-1/3 max-w-[400px]" variants={itemVariants}>
            <div className="flex items-center gap-2.5 mb-6 md:mb-10">
              <img
                src={logo}
                alt="Xplore 360"
                className="h-10 sm:h-12 w-auto object-contain shrink-0"
              />
            </div>
            <h2 className="text-[1.8rem] sm:text-[2.2rem] md:text-[2.4rem] font-display font-medium text-slate-800 leading-[1.2] tracking-tight">
              Simplify Every Step <br className="hidden sm:block" />
              Of Institute <br className="hidden lg:block"/> Management
            </h2>
          </motion.div>

          {/* --- RIGHT SIDE: STRICT GRID SYSTEM --- */}
          <div className="w-full lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">

            {/* --- CONTACT COLUMN --- */}
            <motion.div className="flex flex-col text-left col-span-2" variants={itemVariants}>
              <h4 className="text-[14px] font-extrabold text-slate-900 m-0 mb-5 tracking-widest uppercase">
                {contactInfo.title}
              </h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-4 md:gap-5">
                {contactInfo.addresses.map((address, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <MapPin size={18} className="text-slate-400 shrink-0 mt-0.5" strokeWidth={2} />
                    <span className="text-[13.5px] md:text-[14px] text-slate-500 font-medium leading-relaxed pr-4">
                      {address}
                    </span>
                  </li>
                ))}
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-slate-400 shrink-0" strokeWidth={2} />
                  <a
                    href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
                    className="text-[13.5px] md:text-[14px] text-slate-500 hover:text-[#635BFF] no-underline font-medium transition-colors duration-200"
                  >
                    {contactInfo.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-slate-400 shrink-0" strokeWidth={2} />
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-[13.5px] md:text-[14px] text-slate-500 hover:text-[#635BFF] no-underline font-medium transition-colors duration-200"
                  >
                    {contactInfo.email}
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* --- ABOUT & SOCIALS COLUMNS --- */}
            {footerColumns.map((col) => (
              <motion.div key={col.title} className="flex flex-col text-left col-span-1" variants={itemVariants}>
                <h4 className="text-[14px] font-extrabold text-slate-900 m-0 mb-5 tracking-widest uppercase">
                  {col.title}
                </h4>
                <ul className="list-none p-0 m-0 flex flex-col gap-3 md:gap-4">
                  {col.links.map((link) => {
                    const isObject = typeof link === 'object';
                    const label = isObject ? link.label : link;
                    const href = isObject ? link.href : '#';

                    // "Demo" in the ABOUT column opens the same dialog
                    if (label === 'Demo') {
                      return (
                        <li key={label}>
                          <button
                            type="button"
                            onClick={() => setIsDemoOpen(true)}
                            className="text-[13.5px] md:text-[14px] text-slate-500 hover:text-[#635BFF] font-medium transition-colors duration-200 block bg-transparent border-none p-0 cursor-pointer text-left"
                          >
                            {label}
                          </button>
                        </li>
                      );
                    }

                    return (
                      <li key={label}>
                        <a
                          href={href}
                          target={isObject ? '_blank' : undefined}
                          rel={isObject ? 'noopener noreferrer' : undefined}
                          className="text-[13.5px] md:text-[14px] text-slate-500 hover:text-[#635BFF] no-underline font-medium transition-colors duration-200 block"
                        >
                          {label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}
          </div>

        </motion.div>

        {/* --- COPYRIGHT --- */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full max-w-[1200px] mx-auto border-t border-slate-200 mt-14 pt-8 text-center"
        >
          <p className="text-[13px] md:text-[14px] text-slate-500 font-medium m-0">
            © {new Date().getFullYear()} <b>Xplore Intellects Inc.</b> All rights reserved.
          </p>
        </motion.div>
      </footer>

      <DemoDialog isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  );
};

export default Footer;