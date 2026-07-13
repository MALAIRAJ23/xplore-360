import React from 'react';
// Corrected relative path to go up two levels out of "shared" and "components"
import logoImg from '../../assets/logo.png'; 

export default function Logo() {
  return (
    <a href="/" className="flex items-center gap-3 no-underline">
      {/* Logo Icon Asset */}
      <img 
        src={logoImg} 
        alt="XPLORE-360 Logo" 
        className="h-[49px] w-auto object-contain block" 
      />
      
      {/* Logo Text */}
      <span className="font-extrabold text-xl text-slate-900 tracking-[-0.03em]">
        
      </span>
    </a>
  );
}