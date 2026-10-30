import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { ACADEMIC_LEVELS, DISCIPLINES, NIGERIAN_UNIVERSITIES, DEFAULT_USER_PROFILE } from '../data/mockData';
import { X, CheckCircle, UserCheck, Sparkles, GraduationCap, Building2, BookOpen, RotateCcw } from 'lucide-react';

export const RegistrationModal: React.FC = () => {
  const { user, registerUser, resetToDrAchi, isRegistrationModalOpen, closeRegistrationModal } = useUser();

  const [name, setName] = useState(user.name);
  const [title, setTitle] = useState(user.title || 'DR');
  const [university, setUniversity] = useState(user.university);
  const [customUniversity, setCustomUniversity] = useState('');
  const [discipline, setDiscipline] = useState(user.discipline || 'Medical Sciences');
  const [level, setLevel] = useState(user.level || '100L - Final Year');
  const [matricNumber, setMatricNumber] = useState(user.matricNumber || '');
  const [email, setEmail] = useState(user.email || '');
  const [avatarColor, setAvatarColor] = useState(user.avatarColor || 'from-teal-600 to-cyan-700');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isRegistrationModalOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUniversity = university === 'Other Nigerian Accredited Institution' && customUniversity.trim()
      ? customUniversity.trim()
      : university;

    registerUser({
      name: name.trim() || 'DR ACHI THE III',
      title: title.trim() || 'DR',
      university: finalUniversity,
      faculty: 'Faculty of Medical & Health Sciences',
      discipline: discipline,
      level: level,
      matricNumber: matricNumber.trim() || undefined,
      email: email.trim() || `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}@student.med.ng`,
      avatarColor: avatarColor,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      closeRegistrationModal();
    }, 1200);
  };

  const handleResetToDrAchi = () => {
    resetToDrAchi();
    setName(DEFAULT_USER_PROFILE.name);
    setTitle(DEFAULT_USER_PROFILE.title);
    setUniversity(DEFAULT_USER_PROFILE.university);
    setDiscipline(DEFAULT_USER_PROFILE.discipline);
    setLevel(DEFAULT_USER_PROFILE.level);
    setEmail(DEFAULT_USER_PROFILE.email);
    setMatricNumber(DEFAULT_USER_PROFILE.matricNumber || '');
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      closeRegistrationModal();
    }, 1000);
  };

  const avatarOptions = [
    { label: 'Medical Teal', value: 'from-teal-600 to-cyan-700' },
    { label: 'Deep Navy', value: 'from-blue-700 to-indigo-900' },
    { label: 'Emerald Health', value: 'from-emerald-600 to-teal-800' },
    { label: 'Royal Purple', value: 'from-purple-700 to-indigo-800' },
    { label: 'Clinical Amber', value: 'from-amber-600 to-rose-700' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header with Medical Gradient */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-teal-900 p-6 text-white relative">
          <button
            onClick={closeRegistrationModal}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <span className="p-2 bg-teal-500/20 text-teal-300 rounded-lg border border-teal-500/30">
              <UserCheck className="w-6 h-6" />
            </span>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Student Registration & Profile</h2>
              <p className="text-xs text-teal-200/80">
                Register with your own name, university, and medical level across Nigeria
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs bg-white/10 rounded-lg px-3 py-2 border border-white/10">
            <span>Currently Active: <strong className="text-teal-300">{user.name}</strong></span>
            <button
              type="button"
              onClick={handleResetToDrAchi}
              className="flex items-center gap-1 text-[11px] font-semibold text-emerald-300 hover:text-white hover:underline transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset to DR ACHI THE III
            </button>
          </div>
        </div>

        {/* Live Preview Card */}
        <div className="bg-slate-50 border-b border-slate-200 p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Live Student Badge Preview
          </p>
          <div className="flex items-center gap-3.5 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${avatarColor} text-white font-extrabold flex items-center justify-center text-base shadow-sm ring-2 ring-teal-500/20`}>
              {name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || 'DA'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 truncate text-base">
                  {name || 'DR ACHI THE III'}
                </span>
                <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-teal-200">
                  {level}
                </span>
              </div>
              <p className="text-xs text-slate-600 truncate flex items-center gap-1 mt-0.5">
                <Building2 className="w-3 h-3 text-teal-600 flex-shrink-0" />
                <span className="truncate">{university}</span>
              </p>
              <p className="text-[11px] text-teal-700 font-medium">
                {discipline}
              </p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="p-6 space-y-4">
          {/* Full Name & Title */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-1">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Title
              </label>
              <select
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                <option value="DR">DR</option>
                <option value="Student">Student</option>
                <option value="Scholar">Scholar</option>
                <option value="Dr. (Med)">Dr. (Med)</option>
              </select>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name (Will pop up on your dashboard) *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. DR ACHI THE III or your name"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none font-medium text-slate-900"
              />
            </div>
          </div>

          {/* Nigerian University Selector (Across all Nigeria) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-teal-600" />
                Nigerian University (All Universities Supported) *
              </span>
              <span className="text-[10px] text-slate-400">40+ Accredited Institutions</span>
            </label>
            <select
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              {NIGERIAN_UNIVERSITIES.map((uni) => (
                <option key={uni} value={uni}>
                  {uni}
                </option>
              ))}
            </select>
            {university === 'Other Nigerian Accredited Institution' && (
              <input
                type="text"
                value={customUniversity}
                onChange={(e) => setCustomUniversity(e.target.value)}
                placeholder="Type your University name..."
                className="mt-2 w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            )}
          </div>

          {/* Academic Discipline & Level (Medical Sciences 100L - Final Year) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                Discipline / Course *
              </label>
              <select
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                {DISCIPLINES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-teal-600" />
                Academic Level *
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none font-semibold text-teal-900"
              >
                {ACADEMIC_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Matric Number / Optional email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Student / Matric ID (Optional)
              </label>
              <input
                type="text"
                value={matricNumber}
                onChange={(e) => setMatricNumber(e.target.value)}
                placeholder="e.g. MED/SCI/2026/042"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Badge Color Theme
              </label>
              <div className="flex items-center gap-2 pt-1">
                {avatarOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setAvatarColor(opt.value)}
                    className={`w-7 h-7 rounded-full bg-gradient-to-br ${opt.value} transition-transform ${
                      avatarColor === opt.value ? 'ring-2 ring-offset-2 ring-teal-600 scale-110' : 'opacity-70 hover:opacity-100'
                    }`}
                    title={opt.label}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleResetToDrAchi}
              className="text-xs text-slate-600 hover:text-teal-700 font-semibold flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Set as DR ACHI THE III
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closeRegistrationModal}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 rounded-lg shadow-sm shadow-teal-700/20 flex items-center gap-1.5 transition-all"
              >
                {isSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-white" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-200" />
                    Register & Activate Profile
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
