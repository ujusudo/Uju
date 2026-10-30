import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { FLASHCARDS, SUBJECTS } from '../data/mockData';
import { Flashcard, SubjectId } from '../types';
import {
  Layers,
  RotateCw,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  Plus,
  Filter,
  Brain,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Flame,
  X,
} from 'lucide-react';

const FLASHCARDS_STORAGE_KEY = 'nesyringe_flashcards_deck_v1';

export const Flashcards: React.FC = () => {
  const { user, updateUser } = useUser();

  const [cards, setCards] = useState<Flashcard[]>(() => {
    try {
      const saved = localStorage.getItem(FLASHCARDS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load flashcards:', e);
    }
    return FLASHCARDS;
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [isDifficultOnly, setIsDifficultOnly] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // New Card Form state
  const [newFront, setNewFront] = useState('');
  const [newBack, setNewBack] = useState('');
  const [newSubject, setNewSubject] = useState<SubjectId>('physiology');
  const [newTopic, setNewTopic] = useState('');
  const [newMnemonic, setNewMnemonic] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(cards));
    } catch (e) {
      console.error('Failed to save flashcards:', e);
    }
  }, [cards]);

  // Filter cards
  const filteredCards = cards.filter((c) => {
    const matchSubject = selectedSubject === 'all' || c.subjectId === selectedSubject;
    const matchDifficult = !isDifficultOnly || c.status === 'difficult';
    return matchSubject && matchDifficult;
  });

  const currentCard = filteredCards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1);
    }
  };

  const handleRate = (status: 'easy' | 'medium' | 'difficult') => {
    if (!currentCard) return;

    setCards((prev) =>
      prev.map((c) => (c.id === currentCard.id ? { ...c, status, lastReviewed: 'Just now' } : c))
    );

    if (status === 'easy') {
      updateUser({ flashcardsMastered: user.flashcardsMastered + 1 });
    }

    handleNext();
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFront.trim() || !newBack.trim()) return;

    const subj = SUBJECTS.find((s) => s.id === newSubject);
    const created: Flashcard = {
      id: 'custom_fc_' + Date.now(),
      subjectId: newSubject,
      subjectName: subj?.name || 'General Medical',
      topic: newTopic.trim() || 'Custom Clinical Pearl',
      front: newFront.trim(),
      back: newBack.trim(),
      mnemonic: newMnemonic.trim() || undefined,
      status: 'unreviewed',
    };

    setCards((prev) => [created, ...prev]);
    setIsAddModalOpen(false);
    setNewFront('');
    setNewBack('');
    setNewTopic('');
    setNewMnemonic('');
    setCurrentIndex(0);
  };

  const difficultCount = cards.filter((c) => c.status === 'difficult').length;
  const easyCount = cards.filter((c) => c.status === 'easy').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-50 text-purple-700">
                <Layers className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Digital Flashcards & Spaced Revision
              </h1>
            </div>
            <p className="text-xs text-slate-500">
              Active recall system for rapid medical exam retention • {user.discipline} ({user.level})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create Card</span>
            </button>
          </div>
        </div>

        {/* Filter Bar & Counters */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 font-medium text-slate-700 focus:outline-none"
            >
              <option value="all">All Subjects ({cards.length} cards)</option>
              {SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setIsDifficultOnly(!isDifficultOnly);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isDifficultOnly
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Revision Mode ({difficultCount} Difficult)</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              <CheckCircle className="w-3.5 h-3.5" />
              {easyCount} Easy
            </span>
            <span className="flex items-center gap-1 text-rose-700 font-semibold bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
              <AlertTriangle className="w-3.5 h-3.5" />
              {difficultCount} Difficult
            </span>
          </div>
        </div>
      </div>

      {/* Main Flashcard Deck */}
      {filteredCards.length > 0 && currentCard ? (
        <div className="max-w-2xl mx-auto space-y-5">
          {/* Deck Counter */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-2">
            <span>
              Card {currentIndex + 1} of {filteredCards.length}
            </span>
            <span className="bg-teal-50 text-teal-800 px-2.5 py-0.5 rounded-full font-bold border border-teal-200">
              {currentCard.subjectName}
            </span>
          </div>

          {/* 3D Flip Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="group cursor-pointer min-h-[300px] sm:min-h-[340px] bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md hover:shadow-xl hover:border-teal-500/40 transition-all flex flex-col justify-between relative overflow-hidden"
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
                {currentCard.topic}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-teal-700 transition-colors">
                <RotateCw className="w-3.5 h-3.5" />
                <span>{isFlipped ? 'Show Question' : 'Flip for Answer'}</span>
              </span>
            </div>

            {/* Card Content (Front vs Back) */}
            <div className="my-auto py-6 text-center space-y-4">
              {!isFlipped ? (
                // FRONT
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    QUESTION / VIGNETTE
                  </span>
                  <p className="text-base sm:text-xl font-bold text-slate-900 leading-relaxed px-2">
                    {currentCard.front}
                  </p>
                </div>
              ) : (
                // BACK
                <div className="space-y-3 animate-in fade-in zoom-in-95 duration-150">
                  <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">
                    HIGH-YIELD CLINICAL ANSWER
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed px-2">
                    {currentCard.back}
                  </p>

                  {currentCard.mnemonic && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl max-w-md mx-auto text-xs text-amber-950 font-mono">
                      <strong>Mnemonic:</strong> {currentCard.mnemonic}
                    </div>
                  )}

                  {currentCard.clinicalPearl && (
                    <div className="p-2.5 bg-teal-50 border border-teal-100 rounded-xl max-w-md mx-auto text-xs text-teal-900">
                      <strong>Clinical Pearl:</strong> {currentCard.clinicalPearl}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Card Footer status tag */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-3">
              <span>Click anywhere on card to flip</span>
              <span className="capitalize font-semibold text-slate-600">
                Status: {currentCard.status || 'Unreviewed'}
              </span>
            </div>
          </div>

          {/* Rating Buttons (Easy, Medium, Difficult) */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleRate('difficult')}
              className="py-3 px-2 rounded-2xl bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-rose-700 font-bold text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Difficult (Review Again)</span>
            </button>

            <button
              onClick={() => handleRate('medium')}
              className="py-3 px-2 rounded-2xl bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-amber-700 font-bold text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Medium (Somewhat clear)</span>
            </button>

            <button
              onClick={() => handleRate('easy')}
              className="py-3 px-2 rounded-2xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-emerald-700 font-bold text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Easy (Mastered)</span>
            </button>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between px-2 pt-2">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors"
            >
              <span>Next Card</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4">
          <Layers className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800">No flashcards found</h3>
          <p className="text-xs text-slate-500">
            {isDifficultOnly
              ? 'Awesome! You have cleared all difficult cards in this category.'
              : 'Try changing the subject filter or create your own custom study cards.'}
          </p>
          {isDifficultOnly && (
            <button
              onClick={() => setIsDifficultOnly(false)}
              className="px-4 py-2 bg-teal-700 text-white rounded-xl text-xs font-bold"
            >
              Exit Revision Mode
            </button>
          )}
        </div>
      )}

      {/* Add Custom Flashcard Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">
                Create New Flashcard
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCard} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subject
                  </label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value as SubjectId)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Topic Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    placeholder="e.g. Femoral Hernia, PFK-1"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Front (Question / Clinical Scenario) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={newFront}
                  onChange={(e) => setNewFront(e.target.value)}
                  placeholder="e.g. What is the classic presentation and nerve involved in Wrist Drop?"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Back (High-Yield Answer & Mechanism) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={newBack}
                  onChange={(e) => setNewBack(e.target.value)}
                  placeholder="e.g. Radial nerve injury at spiral groove of humerus; loss of forearm/wrist extensor tone."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mnemonic (Optional)
                </label>
                <input
                  type="text"
                  value={newMnemonic}
                  onChange={(e) => setNewMnemonic(e.target.value)}
                  placeholder="e.g. NAVEL, PFK-1"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm"
                >
                  Save Flashcard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
