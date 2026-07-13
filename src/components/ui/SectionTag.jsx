import React from 'react';

export default function SectionTag({ icon: Icon, text, className = '', style = {} }) {
  return (
    <div 
      className={`inline-flex items-center gap-1.5 py-1.5 px-3.5 bg-[#f3e8ff] text-[#7c3aed] border border-[#e9d5ff] rounded-full font-bold text-xs uppercase tracking-wider mb-4 w-fit ${className}`}
      style={style}
    >
      {Icon && <Icon size={14} strokeWidth={2.5} />}
      <span>{text}</span>
    </div>
  );
}