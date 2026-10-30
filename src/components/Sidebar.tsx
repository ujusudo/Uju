import React from 'react';
import { useUser } from '../context/UserContext';
import {
  LayoutDashboard,
  Bot,
  BookOpen,
  HelpCircle,
  Layers,
  CalendarCheck2,
  ShieldCheck,
  UserPlus,
  Sparkles,
  School,
  X,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onOpenSafetyModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  onClose,
  onOpenSafetyModal,
}) => {
  const { user, openRegistrationModal } = useUser();

  const navItems = [
    {
      id: 'dashboard',
      label: 'Home & Dashboard',
      icon: LayoutDashboard,
      badge: 'Main',
    },
    {
      id: 'ai-tutor',
      label: 'AI Study Assistant',
      icon: Bot,
      badge: 'Gemini 3.8',
      highlight: true,
    },
    {
      id: 'subjects',
      label: 'Subject Library',
      icon: BookOpen,
      badge: '12 Subjects',
    },
    {
      id: 'quizzes',
      label: 'Quiz & Exam Practice',
      icon: HelpCircle,
      badge: 'MCQ Bank',
    },
    {
      id: 'flashcards',
      label: 'Flashcards & Revision',
      icon: Layers,
      badge: 'Spaced Rep',
    },
    {
      id: 'planner',
      label: 'Study Planner',
      icon: CalendarCheck2,
      badge: 'Goals',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed md:sticky top-0 md:top-16 z-40 h-[100dvh] md:h-[calc(100vh-4rem)] w-72 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {/* Mobile Top Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 md:hidden">
            <span className="text-sm font-bold text-slate-800">Navigation Menu</span>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Active Student Profile Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 via-sky-950 to-teal-950 text-white shadow-md relative overflow-hidden">
            {/* Subtle background spark */}
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-20 h-20 rounded-full bg-teal-500/20 blur-xl pointer-events-none" />

            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${user.avatarColor || 'from-teal-500 to-cyan-600'} text-white font-extrabold flex items-center justify-center text-sm shadow-sm ring-2 ring-white/20`}
              >
                {user.name
                  .split(' ')
                  .filter(Boolean)
                  .map((w) => w[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold truncate text-white">
                    {user.name}
                  </span>
                  <Sparkles className="w-3 h-3 text-amber-400 flex-shrink-0" />
                </div>
                <p className="text-[11px] text-teal-300 font-medium truncate">
                  {user.discipline}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-slate-300 truncate mt-0.5">
                  <School className="w-3 h-3 text-teal-400 flex-shrink-0" />
                  <span className="truncate">{user.university}</span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-teal-200 bg-teal-900/60 px-2 py-0.5 rounded-md border border-teal-500/30">
                {user.level}
              </span>
              <button
                onClick={() => {
                  openRegistrationModal();
                  onClose();
                }}
                className="text-[11px] font-semibold text-white/90 hover:text-white flex items-center gap-1 hover:underline"
              >
                <UserPlus className="w-3 h-3 text-teal-400" />
                Register / Switch
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="space-y-1">
            <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Medical Learning Hub
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-teal-50 text-teal-900 font-semibold border border-teal-200/80 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive
                          ? 'text-teal-700'
                          : item.highlight
                          ? 'text-teal-600'
                          : 'text-slate-500'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-teal-700 text-white'
                          : item.highlight
                          ? 'bg-teal-100 text-teal-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Nigerian Universities Curriculum Callout */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-600 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Universities in Nigeria</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500">
              Covers 100L through Final Year (MBBS, BDS, Nursing, MLS & Medical Sciences) across UI, UNN, ABU, UNILAG, OAU, UNIBEN & all 40+ medical schools.
            </p>
          </div>
        </div>

        {/* Bottom Safety & Disclaimer Link */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/60">
          <button
            onClick={() => {
              onOpenSafetyModal();
              onClose();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-teal-700 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200"
          >
            <ShieldCheck className="w-4 h-4 text-teal-600 flex-shrink-0" />
            <div className="text-left">
              <span className="block leading-tight">Safety & Accuracy</span>
              <span className="text-[10px] text-slate-400 font-normal">
                Educational study companion
              </span>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
};
