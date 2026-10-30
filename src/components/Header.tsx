import React from 'react';
import { useUser } from '../context/UserContext';
import { Logo } from './Logo';
import { UserPlus, Sparkles, Download, Menu, ShieldCheck, School } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  onOpenSafetyModal: () => void;
  onOpenPwaModal: () => void;
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  onOpenSafetyModal,
  onOpenPwaModal,
}) => {
  const { user, openRegistrationModal } = useUser();

  const userInitials = user.name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Left: Mobile Toggle & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Logo size="md" showTagline={false} />
        </div>

        {/* Center: Nigerian Universities & Level Banner (Hidden on very small mobile) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200/70 rounded-full text-xs">
          <span className="flex items-center gap-1.5 font-semibold text-slate-700">
            <School className="w-3.5 h-3.5 text-teal-600" />
            <span className="max-w-[210px] truncate" title={user.university}>
              {user.university}
            </span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="bg-teal-100/70 text-teal-800 font-bold px-2 py-0.5 rounded-full text-[11px]">
            {user.discipline} ({user.level})
          </span>
        </div>

        {/* Right: Actions & User Profile Card */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Download App / PWA trigger */}
          <button
            onClick={onOpenPwaModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg border border-teal-200 transition-colors"
            title="Download NESYRINGE AI for offline study"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download App</span>
          </button>

          {/* Medical Safety Disclaimer Link */}
          <button
            onClick={onOpenSafetyModal}
            className="p-1.5 text-slate-500 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="Medical Education & Accuracy Guidelines"
          >
            <ShieldCheck className="w-5 h-5" />
          </button>

          {/* Prominent Student Name Badge & Register Switcher */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <button
              onClick={openRegistrationModal}
              className="group flex items-center gap-2 p-1 sm:pr-3 rounded-full sm:rounded-xl hover:bg-slate-100 transition-all text-left border border-transparent hover:border-slate-200"
              title="Click to register your name or switch student profile"
            >
              <div
                className={`w-9 h-9 rounded-full bg-gradient-to-br ${user.avatarColor || 'from-teal-600 to-cyan-700'} text-white font-bold flex items-center justify-center text-xs shadow-sm ring-2 ring-white`}
              >
                {userInitials || 'DR'}
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-teal-700 transition-colors max-w-[130px] truncate">
                    {user.name}
                  </span>
                  <Sparkles className="w-3 h-3 text-amber-500 flex-shrink-0" />
                </div>
                <p className="text-[10px] text-slate-500 font-medium truncate max-w-[140px]">
                  {user.level}
                </p>
              </div>
            </button>

            {/* Register New Student Button */}
            <button
              onClick={openRegistrationModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-slate-900 to-teal-900 hover:from-slate-800 hover:to-teal-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-all"
              title="Register your own name and university"
            >
              <UserPlus className="w-3.5 h-3.5 text-teal-300" />
              <span className="hidden md:inline">Register / Switch</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
