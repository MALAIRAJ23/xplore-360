import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  full = false,
  style = {},
  className = '',
  ...props
}) {
  // Base structural classes
  const baseClasses = 
    "inline-flex items-center justify-center gap-2 font-bold rounded-full cursor-pointer transition-all duration-300 ease-out outline-none no-underline whitespace-nowrap box-border [-webkit-tap-highlight-color:transparent] focus-visible:ring-4 focus-visible:ring-[#635BFF]/30 disabled:opacity-50 disabled:cursor-not-allowed";

  // Refined paddings for a premium feel
  const sizeClasses = {
    sm: "py-2 px-5 text-[13px] min-h-[36px]",
    md: "py-3 px-6 text-[14.5px] md:text-[15px] min-h-[44px]",
    lg: "py-3.5 px-8 text-[16px] min-h-[52px]"
  };

  // Luxury color variants matching your brand hex (#635BFF)
  const variantClasses = {
    primary: "border-0 bg-[#635BFF] text-white shadow-[0_8px_20px_-6px_rgba(99,91,255,0.4)] hover:bg-[#4A44D4] hover:shadow-[0_14px_28px_-6px_rgba(99,91,255,0.5)] hover:-translate-y-[1px] active:translate-y-0 active:shadow-[0_4px_10px_-2px_rgba(99,91,255,0.4)]",
    outline: "border border-slate-200/80 bg-white text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 hover:-translate-y-[1px] active:translate-y-0"
  };

  const widthClasses = full ? "w-full" : "w-auto";

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClasses} max-w-full ${className}`}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}