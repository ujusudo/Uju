import React, { useState } from 'react';
import { SUBJECTS, TOPICS } from '../data/mockData';
import { SubjectId, Topic } from '../types';
import {
  Search,
  BookOpen,
  CheckCircle,
  Sparkles,
  Bot,
  Bookmark,
  BookmarkCheck,
  Share2,
  Clock,
  ShieldCheck,
  X,
  ExternalLink,
  Brain,
  Filter,
} from 'lucide-react';

interface SubjectLibraryProps {
  onAskAI: (prompt: string, subjectName: string) => void;
  initialSubjectId?: string;
}

export const SubjectLibrary: React.FC<SubjectLibraryProps> = ({ onAskAI, initialSubjectId }) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId | 'all'>(
    (initialSubjectId as SubjectId) || 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTopic, setActiveTopic] = useState<Topic | null>(TOPICS[0] || null);
  const [bookmarkedTopics, setBookmarkedTopics] = useState<string[]>([]);

  const categories = ['All', 'Basic Medical', 'Paraclinical', 'Clinical', 'Allied Health'];

  const filteredSubjects = SUBJECTS.filter((s) => {
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredTopics = TOPICS.filter((t) => {
    const matchesSubject = selectedSubjectId === 'all' || t.subjectId === selectedSubjectId;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subjectName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const toggleBookmark = (topicId: string) => {
    setBookmarkedTopics((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Search Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-teal-50 text-teal-700">
                <BookOpen className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Subject Library & High-Yield Curriculum
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Curated for 100L through 600L Final Year across all 40+ accredited Nigerian universities.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 12 subjects, topics, mnemonics..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 no-scrollbar border-t border-slate-100">
          <Filter className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="text-xs font-semibold text-slate-500 flex-shrink-0">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 12 Subjects Selector Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
            Select Subject ({filteredSubjects.length})
          </h2>
          {selectedSubjectId !== 'all' && (
            <button
              onClick={() => setSelectedSubjectId('all')}
              className="text-xs font-semibold text-teal-700 hover:underline"
            >
              Show All Subjects
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          <button
            onClick={() => setSelectedSubjectId('all')}
            className={`p-3 rounded-xl text-left border transition-all ${
              selectedSubjectId === 'all'
                ? 'bg-teal-700 text-white border-teal-800 shadow-sm'
                : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
            }`}
          >
            <p className="text-xs font-bold truncate">All 12 Subjects</p>
            <p className={`text-[10px] mt-0.5 ${selectedSubjectId === 'all' ? 'text-teal-200' : 'text-slate-500'}`}>
              Full Curriculum
            </p>
          </button>

          {filteredSubjects.map((subj) => {
            const isSelected = selectedSubjectId === subj.id;
            return (
              <button
                key={subj.id}
                onClick={() => setSelectedSubjectId(subj.id)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-teal-700 text-white border-teal-800 shadow-sm'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-extrabold uppercase tracking-wide ${isSelected ? 'text-teal-200' : 'text-teal-700'}`}>
                    {subj.category}
                  </span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${isSelected ? 'bg-teal-800 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {subj.topicsCount}
                  </span>
                </div>
                <p className="text-xs font-bold truncate mt-1">
                  {subj.name}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area: Topic Cards & Detailed Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Topic List (Left Column) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">
              High-Yield Topics ({filteredTopics.length})
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">Click to study topic</span>
          </div>

          <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
            {filteredTopics.map((topic) => {
              const isActive = activeTopic?.id === topic.id;
              const isBookmarked = bookmarkedTopics.includes(topic.id);

              return (
                <div
                  key={topic.id}
                  onClick={() => setActiveTopic(topic)}
                  className={`p-4 rounded-2xl cursor-pointer border transition-all text-left space-y-2 ${
                    isActive
                      ? 'bg-white border-teal-600 ring-2 ring-teal-500/20 shadow-md'
                      : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                      {topic.subjectName}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {topic.readTimeMinutes} min
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(topic.id);
                        }}
                        className="text-slate-400 hover:text-amber-500 p-1"
                        title="Bookmark topic"
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-4 h-4 text-amber-500" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm leading-snug">
                    {topic.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {topic.summary}
                  </p>

                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                    <span className="font-medium text-slate-600">
                      {topic.levelRecommended}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      Verified
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Topic Reader (Right Column) */}
        <div className="lg:col-span-7">
          {activeTopic ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 sticky top-20">
              {/* Reader Header */}
              <div className="space-y-3 pb-4 border-b border-slate-100">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-teal-100 text-teal-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {activeTopic.subjectName}
                    </span>
                    <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2 py-0.5 rounded-md">
                      {activeTopic.levelRecommended}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Verified Curriculum Resource
                    </span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {activeTopic.title}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {activeTopic.summary}
                </p>
              </div>

              {/* High Yield Key Points */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-600" />
                  High-Yield Examination Key Points:
                </h3>
                <ul className="space-y-2">
                  {activeTopic.keyPoints.map((point, idx) => (
                    <li
                      key={idx}
                      className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-start gap-2.5"
                    >
                      <span className="font-bold text-teal-700 mt-0.5 flex-shrink-0">
                        {idx + 1}.
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clinical Correlations (Nigerian Context) */}
              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-1.5">
                <h4 className="text-xs font-bold text-sky-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  Clinical Ward Correlations & Nigerian Hospital Practice:
                </h4>
                <p className="text-xs text-sky-900 leading-relaxed">
                  {activeTopic.clinicalCorrelations}
                </p>
              </div>

              {/* Mnemonic Anchor */}
              {activeTopic.mnemonic && (
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-1">
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Brain className="w-3.5 h-3.5 text-amber-600" />
                    High-Yield Memory Anchor / Mnemonic:
                  </h4>
                  <p className="text-xs font-semibold text-amber-950 font-mono">
                    {activeTopic.mnemonic}
                  </p>
                </div>
              )}

              {/* Actions: Ask AI About This Topic */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-left w-full sm:w-auto">
                  <p className="text-xs font-bold text-slate-800">Need deeper breakdown?</p>
                  <p className="text-[11px] text-slate-500">
                    Ask NESYRINGE AI to explain this step-by-step or test you with questions
                  </p>
                </div>
                <button
                  onClick={() =>
                    onAskAI(
                      `Explain ${activeTopic.title} in ${activeTopic.subjectName} with step-by-step mechanisms, clinical examples in Nigeria, and 2 revision questions.`,
                      activeTopic.subjectName
                    )
                  }
                  className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-teal-700/20 flex items-center justify-center gap-2 transition-all"
                >
                  <Bot className="w-4 h-4 text-teal-200" />
                  <span>Ask AI About This Topic</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-700">Select a topic to start studying</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Choose from the curated Nigerian medical topics on the left to read verified clinical notes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
