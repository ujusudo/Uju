import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  variant?: 'light' | 'dark' | 'full';
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showTagline = false, variant = 'full' }) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }[size];

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  }[size];

  return (
    <div className="flex items-center gap-3">
      {/* Precision Syringe-Inspired AI Icon */}
      <div className={`relative flex items-center justify-center ${iconDimensions} rounded-xl bg-gradient-to-br from-slate-900 via-sky-950 to-teal-900 shadow-md shadow-teal-900/20 p-1.5 border border-teal-500/30 group`}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Subtle glow filter */}
          <defs>
            <linearGradient id="syringeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0EA5E9" />
              <stop offset="50%" stopColor="#0D9488" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="plungerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
          </defs>

          {/* Plunger Top Flange */}
          <rect x="18" y="6" width="28" height="4" rx="2" fill="url(#plungerGrad)" />
          {/* Plunger Shaft */}
          <rect x="29" y="10" width="6" height="12" fill="url(#plungerGrad)" />
          {/* Plunger Stopper */}
          <rect x="22" y="21" width="20" height="4" rx="1.5" fill="#38BDF8" />

          {/* Barrel Flange */}
          <rect x="16" y="24" width="32" height="4" rx="2" fill="#0284C7" />

          {/* Syringe Barrel (Glass / Polycarbonate body) */}
          <rect x="20" y="27" width="24" height="24" rx="2" fill="#0F172A" stroke="url(#syringeGrad)" strokeWidth="2" />

          {/* Graduation lines (measurement markers) */}
          <line x1="22" y1="31" x2="27" y2="31" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="22" y1="36" x2="30" y2="36" stroke="#2DD4BF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="22" y1="41" x2="27" y2="41" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="22" y1="46" x2="32" y2="46" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" />

          {/* Active Medical AI Energy Core / Medicine fluid level */}
          <path d="M 33 32 L 39 37 L 33 47 Z" fill="#14B8A6" opacity="0.8" />
          {/* Small Cross / Caduceus spark */}
          <path d="M 36 34 V 42 M 32 38 H 40" stroke="#FFFFFF" strokeWidth="1.75" strokeLinecap="round" />

          {/* Syringe Hub / Tapered Nozzle */}
          <path d="M 28 51 L 36 51 L 34 55 L 30 55 Z" fill="#0284C7" />

          {/* Precision Needle with AI spark dot */}
          <line x1="32" y1="55" x2="32" y2="61" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="32" cy="62" r="1.5" fill="#10B981" />
        </svg>

        {/* Outer subtle pulse indicator */}
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-extrabold tracking-tight font-sans text-slate-900 ${textSizes}`}>
            NESYRINGE
          </span>
          <span className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-extrabold text-[10px] px-1.5 py-0.5 rounded shadow-sm tracking-wider uppercase">
            AI
          </span>
        </div>
        {showTagline && (
          <p className="text-[11px] font-medium text-teal-800 tracking-tight">
            Understand Medicine. Master Science. Save Lives.
          </p>
        )}
      </div>
    </div>
  );
};
