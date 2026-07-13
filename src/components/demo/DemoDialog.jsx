import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  ArrowRight, 
  CheckCircle2,
  GraduationCap,
  UsersRound,
  ChevronDown
} from 'lucide-react';

export default function DemoDialog({ isOpen, onClose = () => {} }) {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    institute: '',
    instituteType: '', 
    studentCount: ''   
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Lock body scroll when modal is open, and allow Escape to close it
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
      // Reset form after closing
      const timeoutId = setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', email: '', phone: '', institute: '', instituteType: '', studentCount: '' });
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, onClose]);

  // ========================================================
  // WHATSAPP SUBMISSION LOGIC
  // ========================================================
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Cleaned up WhatsApp message formatting (No emojis, bullet points, reduced spacing)
    const message = `*New Demo Request*
• *Name:* ${formData.name}
• *Email:* ${formData.email}
• *Phone:* ${formData.phone}
• *Institute:* ${formData.institute}
• *Institute Type:* ${formData.instituteType}
• *Students:* ${formData.studentCount}

Submitted from Xplore 360 Landing Page`;

    const whatsappNumber = "916374305567";

    // Open WhatsApp in a new tab
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    // Show success state on the website behind the new tab
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleCloseClick = useCallback((e) => {
    e.stopPropagation();
    onClose();
  }, [onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm pointer-events-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-[540px] bg-white rounded-[2rem] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.2)] overflow-hidden"
          >
            {/* Ambient Background Glow inside Modal */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[50%] bg-[#635BFF] opacity-[0.05] blur-[50px] rounded-full pointer-events-none" />
            
            {/* Close Button */}
            <button 
              type="button"
              onClick={handleCloseClick}
              aria-label="Close dialog"
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors z-20 cursor-pointer"
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            <div className="p-6 sm:p-10 relative z-10">
              
              {!isSuccess ? (
                <>
                  {/* Header */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">
                      Book a Free Demo
                    </h3>
                    <p className="text-sm text-slate-500 font-medium">
                      See how Xplore 360 can transform your institute. Fill out the form and our experts will tailor a tour for you.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    
                    {/* Full Name */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User size={16} className="text-slate-400" />
                      </div>
                      <input 
                        type="text" 
                        required
                        placeholder="Full Name" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF] transition-all"
                      />
                    </div>

                    {/* Grid for Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail size={16} className="text-slate-400" />
                        </div>
                        <input 
                          type="email" 
                          required
                          placeholder="Work Email" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF] transition-all"
                        />
                      </div>

                      {/* Phone */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Phone size={16} className="text-slate-400" />
                        </div>
                        <input 
                          type="tel" 
                          required
                          placeholder="Phone Number" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF] transition-all"
                        />
                      </div>
                    </div>

                    {/* Institute Name */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Building2 size={16} className="text-slate-400" />
                      </div>
                      <input 
                        type="text" 
                        required
                        placeholder="Institute Name" 
                        value={formData.institute}
                        onChange={(e) => setFormData({...formData, institute: e.target.value})}
                        className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF] transition-all"
                      />
                    </div>

                    {/* Grid for Scale & Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                      {/* Institute Type */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <GraduationCap size={16} className="text-slate-400" />
                        </div>
                        <select 
                          required
                          value={formData.instituteType}
                          onChange={(e) => setFormData({...formData, instituteType: e.target.value})}
                          className={`w-full pl-11 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF] transition-all appearance-none cursor-pointer ${formData.instituteType === '' ? 'text-slate-400' : 'text-slate-900'}`}
                        >
                          <option value="" disabled hidden>Institute Type</option>
                          <option value="K-12 School">K-12 School</option>
                          <option value="College/University">College / University</option>
                          <option value="Coaching/Tuition">Coaching / Tuition Center</option>
                          <option value="Training Institute">Training Institute</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                          <ChevronDown size={16} className="text-slate-400" />
                        </div>
                      </div>

                      {/* Student Count */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <UsersRound size={16} className="text-slate-400" />
                        </div>
                        <select 
                          required
                          value={formData.studentCount}
                          onChange={(e) => setFormData({...formData, studentCount: e.target.value})}
                          className={`w-full pl-11 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF] transition-all appearance-none cursor-pointer ${formData.studentCount === '' ? 'text-slate-400' : 'text-slate-900'}`}
                        >
                          <option value="" disabled hidden>Total Students</option>
                          <option value="1-500">1 - 500 Students</option>
                          <option value="501-2000">501 - 2,000 Students</option>
                          <option value="2001-5000">2,001 - 5,000 Students</option>
                          <option value="5000+">5,000+ Students</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                          <ChevronDown size={16} className="text-slate-400" />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-4 mt-2 bg-[#635BFF] text-white rounded-xl font-bold shadow-[0_8px_20px_-6px_rgba(99,91,255,0.4)] hover:bg-[#4A44D4] hover:shadow-[0_12px_24px_-6px_rgba(99,91,255,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Schedule My Demo 
                          <ArrowRight size={16} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-slate-400 font-medium mt-1">
                      No credit card required. 100% free consultation.
                    </p>
                  </form>
                </>
              ) : (
                /* Success State */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-6"
                >
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-5 shadow-sm">
                    <CheckCircle2 size={32} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Request Received!</h3>
                  <p className="text-sm text-slate-500 font-medium mb-8">
                    Thank you, {formData.name.split(' ')[0]}. Our product experts will analyze your requirements and contact you shortly to schedule your personalized tour.
                  </p>
                  <button 
                    type="button"
                    onClick={handleCloseClick}
                    className="w-full py-3.5 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                  >
                    Close Window
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}