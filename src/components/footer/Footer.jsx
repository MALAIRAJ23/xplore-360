import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Mail } from 'lucide-react';
import logo from '../../assets/logo.png';
import DemoDialog from '../demo/DemoDialog';

const footerColumns = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Features', href: '#features' },
      { label: 'Modules', href: '#modules' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Admissions CRM', href: '#' },
      { label: 'Student Management', href: '#' },
      { label: 'Fee Management', href: '#' },
      { label: 'Attendance', href: '#' },
      { label: 'Reports', href: '#' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Demo', isDemo: true },
      { label: 'Blogs', href: '/blog' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Legal', href: '/legal' },
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
      {/* 1. CTA BANNER */}
      <section className="w-full px-5 sm:px-8 pt-16 pb-12 flex justify-center">
        <motion.div
          className="relative w-full max-w-[1200px] py-16 px-10 rounded-[3rem] bg-gradient-to-br from-[#7c3aed] to-[#635BFF] text-center overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">Ready to Digitize Your Institute?</h2>
          <p className="text-lg text-white/85 max-w-[600px] mx-auto mb-10 font-medium">Experience a smarter way to manage admissions, academics, communication, and administration with Xplore 360.</p>
          <motion.button onClick={() => setIsDemoOpen(true)} className="px-8 py-4 rounded-full bg-white text-[#635BFF] font-bold shadow-lg hover:scale-105 transition-transform">Book Free Demo</motion.button>
        </motion.div>
      </section>

      {/* 2. MAIN FOOTER */}
      <footer className="w-full pt-12 pb-8 px-6 lg:px-12">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-[1.5fr_3fr] gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <img src={logo} alt="Xplore 360" className="h-10 w-auto object-contain self-start" />
            <p className="text-[15px] text-slate-600 leading-relaxed max-w-[350px]">
              Xplore 360 is a complete institute management platform that simplifies admissions, academics, finance, communication, and administration for modern educational institutions.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footerColumns.map((col) => (
              <div key={col.title} className="flex flex-col">
                <h4 className="text-[13px] font-extrabold text-slate-900 mb-5 tracking-widest uppercase">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.isDemo ? (
                        <button onClick={() => setIsDemoOpen(true)} className="text-[14px] text-slate-500 hover:text-[#635BFF] transition-colors">{link.label}</button>
                      ) : (
                        <a href={link.href} className="text-[14px] text-slate-500 hover:text-[#635BFF] transition-colors">{link.label}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Column */}
            <div className="flex flex-col">
              <h4 className="text-[13px] font-extrabold text-slate-900 mb-5 tracking-widest uppercase">{contactInfo.title}</h4>
              <ul className="space-y-4">
                {contactInfo.addresses.map((addr, i) => (
                  <li key={i} className="flex gap-2.5">
                    <MapPin size={16} className="text-slate-400 mt-0.5 shrink-0" />
                    <span className="text-[13px] text-slate-500 leading-relaxed">{addr}</span>
                  </li>
                ))}
                <li className="flex gap-2.5">
                  <Phone size={16} className="text-slate-400 mt-0.5 shrink-0" />
                  <a href={`tel:${contactInfo.phone}`} className="text-[13px] text-slate-500 hover:text-[#635BFF]">{contactInfo.phone}</a>
                </li>
                <li className="flex gap-2.5">
                  <Mail size={16} className="text-slate-400 mt-0.5 shrink-0" />
                  <a href={`mailto:${contactInfo.email}`} className="text-[13px] text-slate-500 hover:text-[#635BFF] break-all">{contactInfo.email}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-[1300px] mx-auto border-t border-slate-200 mt-16 pt-8 text-center">
          <p className="text-[13px] text-slate-500">© {new Date().getFullYear()} Xplore Intellects Inc. All rights reserved.</p>
        </div>
      </footer>
      <DemoDialog isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  );
};

export default Footer;