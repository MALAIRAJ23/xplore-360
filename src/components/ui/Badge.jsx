import React from 'react';

const Badge = ({ icon, text, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#e9d5ff] shadow-sm w-fit ${className}`}>
      {icon && (
        <span className="text-[#7c3aed] flex items-center justify-center">
          {icon}
        </span>
      )}
      <span className="text-sm font-medium text-[#4b5563]">
        {text}
      </span>
    </div>
  );
};

export default Badge;