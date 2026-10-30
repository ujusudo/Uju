import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { QUIZ_QUESTIONS, SUBJECTS } from '../data/mockData';
import { QuizQuestion, SubjectId } from '../types';
import {
  HelpCircle,
  Timer,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ChevronRight,
  Play,
  Filter,
  Check,
  AlertCircle,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

export const QuizCenter: React.FC = () => {
  const { user, updateUser } = useUser();

  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [isTimedMode, setIsTimedMode] = useState<boolean>(false);
  const [quizState, setQuizState] = useState<'setup' | 'active' | 'completed'>('setup');

  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: number }>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect'>('all');

  // Filter pool
  const filteredPool = QUIZ_QUESTIONS.filter((q) => {
    const matchSubject = selectedSubject === 'all' || q.subjectId === selectedSubject;
    const matchLevel = selectedLevel === 'all' || q.level === selectedLevel || q.level === 'All Levels';
    return matchSubject && matchLevel;
  });

  // Start Quiz
  const handleStartQuiz = () => {
    const questionsToUse = filteredPool.length > 0 ? filteredPool : QUIZ_QUESTIONS;
    setActiveQuestions(questionsToUse);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setHasSubmittedAnswer(false);
    setUserAnswers({});
    setScore(0);
    setTimeRemaining(60);
    setQuizState('active');
  };

  // Timer countdown in timed mode
  useEffect(() => {
    if (quizState !== 'active' || !isTimedMode || hasSubmittedAnswer) return;

    if (timeRemaining <= 0) {
      handleAnswerSubmit(null);
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [quizState, isTimedMode, timeRemaining, hasSubmittedAnswer]);

  const currentQ = activeQuestions[currentIndex];

  const handleSelectOption = (index: number) => {
    if (hasSubmittedAnswer) return;
    setSelectedAnswer(index);
  };

  const handleAnswerSubmit = (chosenIndex: number | null) => {
    if (!currentQ || hasSubmittedAnswer) return;

    const answerToRecord = chosenIndex !== null ? chosenIndex : selectedAnswer;
    setHasSubmittedAnswer(true);

    if (answerToRecord !== null) {
      setUserAnswers((prev) => ({ ...prev, [currentQ.id]: answerToRecord }));
      if (answerToRecord === currentQ.correctAnswerIndex) {
        setScore((prev) => prev + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setHasSubmittedAnswer(false);
      setTimeRemaining(60);
    } else {
      // Complete quiz
      const finalScore = score + (selectedAnswer === currentQ.correctAnswerIndex ? 1 : 0);
      const percentage = Math.round((finalScore / activeQuestions.length) * 100);
      
      // Update persistent stats
      updateUser({
        quizzesCompleted: user.quizzesCompleted + 1,
        averageScore: Math.round((user.averageScore * user.quizzesCompleted + percentage) / (user.quizzesCompleted + 1)),
      });

      setQuizState('completed');
    }
  };

  const calculateGrade = (pct: number) => {
    if (pct >= 70) return { label: 'Distinction (Excellent)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (pct >= 60) return { label: 'Credit (Very Good)', color: 'text-teal-700 bg-teal-50 border-teal-200' };
    if (pct >= 50) return { label: 'Pass (Nigerian MB Benchmark)', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    return { label: 'Needs Revision (Under 50% Pass Mark)', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  };

  const finalPercentage = activeQuestions.length > 0 ? Math.round((score / activeQuestions.length) * 100) : 0;
  const gradeInfo = calculateGrade(finalPercentage);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-teal-50 text-teal-700">
                <HelpCircle className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Medical Science MCQ & Exam Practice
              </h1>
            </div>
            <p className="text-xs text-slate-500">
              Benchmarked for 100L through Final Year MBBS, BDS, Nursing, MLS, and Health Sciences.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
            <Award className="w-4 h-4 text-amber-500" />
            <span className="font-semibold text-slate-700">Student: {user.name}</span>
            <span className="text-slate-300">•</span>
            <span className="text-teal-700 font-bold">Avg: {user.averageScore}%</span>
          </div>
        </div>
      </div>

      {/* SETUP SCREEN */}
      {quizState === 'setup' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">
              Configure Practice Session
            </h2>
            <p className="text-xs text-slate-500">
              Select your subject and target difficulty level to test clinical concepts.
            </p>
          </div>

          <div className="space-y-4">
            {/* Subject Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none font-medium"
              >
                <option value="all">All Medical Science Subjects (Random Mix)</option>
                {SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Academic Level Target
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none font-medium"
              >
                <option value="all">All Levels (100L - Final Year)</option>
                <option value="100L-200L">100L - 200L (Pre-Clinical Fundamentals)</option>
                <option value="200L-300L">200L - 300L (2nd MB Physiology, Anatomy, Biochem)</option>
                <option value="300L-400L">300L - 400L (Pathology, Pharmacology, Micro)</option>
                <option value="500L-Final Year">500L - Final Year (Clinical Medicine, Surgery, Paediatrics, Obs & Gynae)</option>
              </select>
            </div>

            {/* Timed Mode Toggle */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Timer className="w-4 h-4 text-teal-600" />
                  Timed Exam Simulation (60s / Question)
                </p>
                <p className="text-[11px] text-slate-500">
                  Simulates realistic Nigerian university multiple choice examination pressure
                </p>
              </div>
              <input
                type="checkbox"
                checked={isTimedMode}
                onChange={(e) => setIsTimedMode(e.target.checked)}
                className="w-5 h-5 accent-teal-600 cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              Available Questions in Bank: <strong>{filteredPool.length}</strong>
            </span>
            <button
              onClick={handleStartQuiz}
              className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-teal-700/20 flex items-center gap-2 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Begin Practice Quiz</span>
            </button>
          </div>
        </div>
      )}

      {/* ACTIVE QUIZ SCREEN */}
      {quizState === 'active' && currentQ && (
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Top Progress & Timer Bar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-700">
                Question {currentIndex + 1} of {activeQuestions.length}
              </span>
              <span className="bg-teal-50 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-teal-200">
                {currentQ.subjectName}
              </span>
            </div>

            {isTimedMode && (
              <div
                className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${
                  timeRemaining <= 15
                    ? 'bg-rose-100 text-rose-800 animate-pulse'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Timer className="w-3.5 h-3.5" />
                <span>{timeRemaining}s</span>
              </div>
            )}
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-700">
                {currentQ.topic}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                {currentQ.question}
              </h2>
            </div>

            {/* 4 Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === currentQ.correctAnswerIndex;

                let optionStyles = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
                if (isSelected && !hasSubmittedAnswer) {
                  optionStyles = 'border-teal-600 bg-teal-50/70 text-teal-900 ring-2 ring-teal-500/20';
                } else if (hasSubmittedAnswer) {
                  if (isCorrect) {
                    optionStyles = 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20';
                  } else if (isSelected && !isCorrect) {
                    optionStyles = 'border-rose-600 bg-rose-50 text-rose-950 ring-2 ring-rose-500/20';
                  } else {
                    optionStyles = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={hasSubmittedAnswer}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${optionStyles}`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 border ${
                        isSelected
                          ? 'bg-teal-700 text-white border-teal-700'
                          : 'bg-slate-100 text-slate-600 border-slate-300'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-snug">{opt}</span>
                    {hasSubmittedAnswer && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    )}
                    {hasSubmittedAnswer && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Rationale & Explanation (revealed immediately on submit) */}
            {hasSubmittedAnswer && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  {selectedAnswer === currentQ.correctAnswerIndex ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-4 h-4" />
                      Correct Answer!
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-100/70 px-2.5 py-1 rounded-full">
                      <XCircle className="w-4 h-4" />
                      Incorrect Choice
                    </span>
                  )}
                  <span className="text-[11px] text-slate-500 font-medium">
                    Correct Option: {String.fromCharCode(65 + currentQ.correctAnswerIndex)}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <p>
                    <strong>Clinical Explanation:</strong> {currentQ.explanation}
                  </p>
                  <p className="text-teal-900 bg-teal-50/80 p-2.5 rounded-xl border border-teal-100 text-xs">
                    <strong>Nigerian Exam Relevance:</strong> {currentQ.clinicalRelevance}
                  </p>
                  <p className="text-[11px] text-slate-500 italic">
                    Source: {currentQ.referenceSource}
                  </p>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setQuizState('setup')}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Quit Quiz
              </button>

              {!hasSubmittedAnswer ? (
                <button
                  disabled={selectedAnswer === null}
                  onClick={() => handleAnswerSubmit(selectedAnswer)}
                  className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white transition-all ${
                    selectedAnswer !== null
                      ? 'bg-teal-700 hover:bg-teal-800 shadow-md shadow-teal-700/20'
                      : 'bg-slate-300 cursor-not-allowed'
                  }`}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 shadow-md shadow-teal-700/20 flex items-center gap-1.5 transition-all"
                >
                  <span>
                    {currentIndex < activeQuestions.length - 1 ? 'Next Question' : 'View Results'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* RESULTS SCREEN */}
      {quizState === 'completed' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto shadow-xs">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Exam Simulation Completed
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Quiz Results for {user.name}
            </h2>
            <p className="text-xs text-slate-500">
              {user.university} • {user.discipline} ({user.level})
            </p>
          </div>

          {/* Score Circle Card */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm mx-auto space-y-3">
            <div className="text-4xl font-black text-slate-900 tracking-tight">
              {finalPercentage}%
            </div>
            <p className="text-xs text-slate-600">
              Scored <strong>{score}</strong> out of <strong>{activeQuestions.length}</strong> questions correct
            </p>
            <div className={`text-xs font-bold px-3 py-1 rounded-full border ${gradeInfo.color}`}>
              {gradeInfo.label}
            </div>
          </div>

          {/* Performance Summary Details */}
          <div className="text-xs text-slate-600 bg-teal-50/50 p-4 rounded-xl border border-teal-100 text-left space-y-1.5">
            <p className="font-bold text-teal-900">Nigerian Medical College Standard:</p>
            <p>
              In all accredited Nigerian medical faculties, the standard pass mark for professional examinations (MBBS / BDS / Health Sciences) is <strong>50%</strong>. A score of 70% or above constitutes an Honors / Distinction mark.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleStartQuiz}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 shadow-md shadow-teal-700/20 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
            <button
              onClick={() => setQuizState('setup')}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Back to Quiz Setup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
