import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import {
  Search,
  Sparkles,
  Bot,
  BookOpen,
  HelpCircle,
  Layers,
  CalendarCheck2,
  TrendingUp,
  Award,
  Clock,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  School,
  Flame,
  UserPlus,
} from 'lucide-react';
import { SUBJECTS } from '../data/mockData';

interface DashboardProps {
  onNavigate: (tab: string, initialPrompt?: string, subjectId?: string) => void;
  onOpenSafetyModal: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, onOpenSafetyModal }) => {
  const { user, openRegistrationModal } = useUser();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('ai-tutor', searchQuery.trim());
    }
  };

  const highYieldPrompts = [
    "Explain Starling's forces of capillary fluid exchange in simple terms",
    "Femoral triangle boundaries, contents (NAVEL), and femoral hernia",
    "Sickle cell crisis pathophysiology and Nigerian hospital management",
    "Antihypertensives classification and first-line drugs for Black patients",
    "Four bypass reactions of Gluconeogenesis and G6PD deficiency",
    "P. falciparum life cycle and mechanism of cerebral malaria",
  ];

  const recentSessions = [
    {
      title: 'Renal Physiology: Countercurrent Multiplication & Osmolarity',
      subject: 'Human Physiology',
      level: '200L - 300L',
      date: 'Today, 9:30 AM',
      score: '90%',
    },
    {
      title: 'Gross Anatomy of the Brachial Plexus & Erb’s Palsy',
      subject: 'Anatomy',
      level: '200L (2nd MB)',
      date: 'Yesterday, 8:15 PM',
      score: '85%',
    },
    {
      title: 'Vaso-occlusive Crisis & Hemoglobinopathies in West Africa',
      subject: 'Pathology',
      level: '300L - 400L',
      date: '2 days ago',
      score: '95%',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner with Personalized Greeting */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-teal-900/40">
        {/* Glow orb accents */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Top Nigerian University & Discipline Pill */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 text-xs font-semibold backdrop-blur-md">
              <School className="w-3.5 h-3.5 text-teal-400" />
              <span>{user.university}</span>
              <span className="text-teal-400/50">•</span>
              <span className="text-emerald-300 font-bold">{user.discipline} ({user.level})</span>
            </div>

            <button
              onClick={openRegistrationModal}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/10"
            >
              <UserPlus className="w-3.5 h-3.5 text-teal-300" />
              <span>Register / Change Name</span>
            </button>
          </div>

          {/* Main Greeting & Value Prop */}
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-teal-400 text-sm font-bold tracking-wide uppercase">
                NESYRINGE AI Study Companion
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-400/30">
                All Nigerian Universities
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-200">{user.name}</span>!
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Understand Medicine. Master Science. Save Lives. Built for medical & health-science students from <strong>100L through Final Year</strong> across all Nigerian universities.
            </p>
          </div>

          {/* Prominent "Ask NESYRINGE" Search & Chat Omnibox */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center bg-white/10 backdrop-blur-md rounded-2xl p-1.5 border border-white/20 shadow-lg focus-within:border-teal-400 focus-within:bg-white/15 transition-all max-w-3xl"
          >
            <div className="pl-3.5 pr-2 text-teal-300">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ask NESYRINGE anything (e.g. Starling forces, femoral triangle, sickle cell crisis, antihypertensives)..."
              className="w-full bg-transparent px-2 py-2.5 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="flex-shrink-0 flex items-center gap-1.5 px-4 sm:px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-teal-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI</span>
            </button>
          </form>

          {/* High-Yield One-Click Question Pills */}
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-teal-200/80">
              Trending High-Yield Medical Topics for Nigerian Exams:
            </p>
            <div className="flex flex-wrap gap-2">
              {highYieldPrompts.slice(0, 4).map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigate('ai-tutor', prompt)}
                  className="text-xs text-left px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 hover:border-teal-400/50 text-slate-200 hover:text-white transition-all truncate max-w-md flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span className="truncate">{prompt}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Metrics & Study Dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Study Streak */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-orange-50 text-orange-600 border border-orange-100">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Study Streak</p>
            <p className="text-xl font-bold text-slate-900">{user.studyStreakDays} Days</p>
            <p className="text-[10px] text-emerald-600 font-medium">Consistent Daily Review</p>
          </div>
        </div>

        {/* Quizzes Completed */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Quizzes Completed</p>
            <p className="text-xl font-bold text-slate-900">{user.quizzesCompleted}</p>
            <p className="text-[10px] text-blue-600 font-medium">Avg Score: {user.averageScore}%</p>
          </div>
        </div>

        {/* Flashcards Mastered */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-teal-50 text-teal-600 border border-teal-100">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Cards Mastered</p>
            <p className="text-xl font-bold text-slate-900">{user.flashcardsMastered}</p>
            <p className="text-[10px] text-teal-600 font-medium">Spaced Repetition</p>
          </div>
        </div>

        {/* Professional Exam Countdown */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Professional Exams</p>
            <p className="text-xl font-bold text-slate-900">24 Days</p>
            <p className="text-[10px] text-purple-600 font-medium">Medical Science MB</p>
          </div>
        </div>
      </div>

      {/* Main Feature Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Interactive Study Modules
            </h2>
            <p className="text-xs text-slate-500">
              Designed for Nigerian curriculum from 100L through 600L / Final Year
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* AI Study Assistant Card */}
          <div
            onClick={() => onNavigate('ai-tutor')}
            className="group cursor-pointer rounded-2xl bg-white p-6 border border-slate-200 shadow-xs hover:shadow-lg hover:border-teal-500/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-teal-700 transition-colors">
                    AI Study Assistant
                  </h3>
                  <span className="text-[10px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">
                    Interactive
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ask academic questions with simple explanations, step-by-step mechanisms, clinical vignettes, tables, mnemonics, and revision questions.
                </p>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700 group-hover:translate-x-1 transition-transform">
              <span>Start Tutoring Session</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* 12 Subjects Library Card */}
          <div
            onClick={() => onNavigate('subjects')}
            className="group cursor-pointer rounded-2xl bg-white p-6 border border-slate-200 shadow-xs hover:shadow-lg hover:border-blue-500/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-700 transition-colors">
                    Subject Library
                  </h3>
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                    12 Subjects
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Physiology, Anatomy, Biochemistry, Medical Biochem, Nursing, Med & Surgery, MLS, Pharmacology, Pathology, Micro, Immunology, Genetics.
                </p>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-700 group-hover:translate-x-1 transition-transform">
              <span>Browse Subjects & Topics</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Quiz & Exam Practice */}
          <div
            onClick={() => onNavigate('quizzes')}
            className="group cursor-pointer rounded-2xl bg-white p-6 border border-slate-200 shadow-xs hover:shadow-lg hover:border-emerald-500/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-emerald-700 transition-colors">
                    Quiz & Exam Practice
                  </h3>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Timed & Untimed
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Multiple-choice questions with 4 options, immediate explanations, performance score calculation, and review of incorrect answers.
                </p>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700 group-hover:translate-x-1 transition-transform">
              <span>Practice Questions Now</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Digital Flashcards */}
          <div
            onClick={() => onNavigate('flashcards')}
            className="group cursor-pointer rounded-2xl bg-white p-6 border border-slate-200 shadow-xs hover:shadow-lg hover:border-purple-500/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-purple-700 transition-colors">
                    Flashcards & Revision
                  </h3>
                  <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                    Flip & Recall
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  3D flip interaction with clinical questions on front, high-yield answers on back. Rate as Easy, Medium, or Difficult with targeted revision mode.
                </p>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-purple-700 group-hover:translate-x-1 transition-transform">
              <span>Launch Flashcard Deck</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Study Planner */}
          <div
            onClick={() => onNavigate('planner')}
            className="group cursor-pointer rounded-2xl bg-white p-6 border border-slate-200 shadow-xs hover:shadow-lg hover:border-amber-500/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <CalendarCheck2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-amber-700 transition-colors">
                    Study Planner
                  </h3>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                    Countdown
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Set revision schedules, monitor weekly study hours, manage upcoming in-course tests, 2nd MB viva, and clinical posting exams.
                </p>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-700 group-hover:translate-x-1 transition-transform">
              <span>View Examination Schedule</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Student Profile & Registration Quick Card */}
          <div
            onClick={openRegistrationModal}
            className="group cursor-pointer rounded-2xl bg-gradient-to-br from-slate-900 to-teal-950 text-white p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 text-teal-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                <School className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-lg">
                    Student Profile
                  </h3>
                  <span className="text-[10px] font-bold bg-teal-400 text-slate-950 px-2 py-0.5 rounded-full">
                    Active: {user.name}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Any student downloading NESYRINGE AI can register their name, university, and level to customize their learning dashboard.
                </p>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-teal-300 group-hover:translate-x-1 transition-transform">
              <span>Switch or Register Profile</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* 12 Subjects Quick Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Curriculum Core: 12 Medical Science Subjects
            </h3>
            <p className="text-xs text-slate-500">
              Structured from 100L Pre-Med through 600L Final Year Clinical Rotations
            </p>
          </div>
          <button
            onClick={() => onNavigate('subjects')}
            className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Subjects & Notes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {SUBJECTS.map((subj) => (
            <button
              key={subj.id}
              onClick={() => onNavigate('subjects', undefined, subj.id)}
              className="text-left p-3.5 rounded-xl border border-slate-100 hover:border-teal-300 hover:bg-teal-50/40 transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
                  {subj.category}
                </span>
                <p className="font-bold text-slate-900 text-sm group-hover:text-teal-800 transition-colors mt-0.5">
                  {subj.name}
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>{subj.topicsCount} Topics</span>
                <span className="text-teal-600 group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Sessions & Safety Callout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Study Sessions */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">
              Recent Study Sessions
            </h3>
            <span className="text-xs text-slate-400">Past 48 Hours</span>
          </div>

          <div className="space-y-2.5">
            {recentSessions.map((session, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/70 transition-colors"
              >
                <div className="space-y-0.5 min-w-0 pr-3">
                  <p className="font-semibold text-slate-900 text-sm truncate">
                    {session.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="text-teal-700 font-medium">{session.subject}</span>
                    <span>•</span>
                    <span>{session.level}</span>
                    <span>•</span>
                    <span>{session.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">
                    {session.score}
                  </span>
                  <button
                    onClick={() => onNavigate('ai-tutor', session.title)}
                    className="p-1.5 text-slate-400 hover:text-teal-700 rounded-lg hover:bg-white"
                    title="Review session"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Responsible Medical Education Badge */}
        <div className="bg-gradient-to-br from-teal-900 to-slate-950 text-white rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="inline-flex p-2.5 rounded-xl bg-white/10 text-teal-300">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-lg text-white">
              Academic & Clinical Accuracy
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              NESYRINGE AI is strictly an educational study companion designed for Nigerian university medical students.
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-1">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Verified vs AI-generated badges</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Cross-check with Guyton, Snell & Robbins</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Adheres to Nigerian Medical syllabi</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onOpenSafetyModal}
            className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-teal-200 hover:text-white rounded-xl text-xs font-bold transition-colors border border-white/15"
          >
            Read Safety & Curriculum Protocol
          </button>
        </div>
      </div>
    </div>
  );
};
