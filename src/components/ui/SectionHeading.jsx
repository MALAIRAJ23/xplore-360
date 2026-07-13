import React from 'react';

export default function SectionHeading({ title, subtitle, align = 'center' }) {
  const isCentered = align === 'center';

  return (
    <div className={`flex flex-col mb-12 max-w-[700px] ${
      isCentered ? 'text-center mx-auto items-center' : 'text-left mx-0 items-start'
    }`}>
      <h2 className="text-[clamp(1.75rem,3.5vw+1rem,2.5rem)] font-extrabold text-[#0f172a] leading-[1.2] mb-4 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[clamp(0.95rem,1.5vw+0.5rem,1.125rem)] text-[#64748b] leading-relaxed max-w-[600px]">
          {subtitle}
        </p>
      )}
    </div>
  );
}