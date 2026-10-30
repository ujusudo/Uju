import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { STUDY_TASKS, SUBJECTS } from '../data/mockData';
import { StudyTask } from '../types';
import {
  CalendarCheck2,
  Plus,
  CheckCircle2,
  Circle,
  Clock,
  Calendar,
  AlertCircle,
  Trash2,
  TrendingUp,
  Award,
  Sparkles,
  School,
  X,
} from 'lucide-react';

const TASKS_STORAGE_KEY = 'nesyringe_study_tasks_v1';

export const StudyPlanner: React.FC = () => {
  const { user } = useUser();

  const [tasks, setTasks] = useState<StudyTask[]>(() => {
    try {
      const saved = localStorage.getItem(TASKS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load study tasks:', e);
    }
    return STUDY_TASKS;
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState(SUBJECTS[0].name);
  const [newDueDate, setNewDueDate] = useState('');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('high');
  const [newCategory, setNewCategory] = useState<'Exam Prep' | 'Ward Rounds' | 'Revision' | 'Practical / Viva'>('Exam Prep');

  useEffect(() => {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save study tasks:', e);
    }
  }, [tasks]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: StudyTask = {
      id: 'task_' + Date.now(),
      title: newTitle.trim(),
      subject: newSubject,
      dueDate: newDueDate.trim() || 'This Week',
      completed: false,
      priority: newPriority,
      category: newCategory,
    };

    setTasks((prev) => [newTask, ...prev]);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDueDate('');
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const upcomingExams = [
    {
      title: '2nd MB Professional Viva Voce (Physiology & Anatomy)',
      school: user.university,
      date: 'In 24 Days',
      status: 'High Stakes',
      color: 'border-l-teal-600',
    },
    {
      title: 'Pathology & Pharmacology Mid-Semester In-Course Test',
      school: 'Medical Sciences Faculty',
      date: 'In 11 Days',
      status: 'Continuous Assessment',
      color: 'border-l-blue-600',
    },
    {
      title: 'Clinical Ward Bedside Examination (Cardiology & Chest)',
      school: 'Teaching Hospital Wards',
      date: 'In 32 Days',
      status: 'Clinical Skills',
      color: 'border-l-purple-600',
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-50 text-amber-700">
                <CalendarCheck2 className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Study Planner & Exam Milestones
              </h1>
            </div>
            <p className="text-xs text-slate-500">
              Personalized revision schedule for {user.name} • {user.discipline} ({user.level})
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Study Goal</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Weekly Target Completion: {progressPercent}%</span>
            <span>
              {completedCount} of {tasks.length} tasks completed
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Task Checklist (Left 8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Active Study Tasks ({tasks.length})
            </h2>
            <span className="text-xs text-slate-500">Check off as you complete topics</span>
          </div>

          <div className="space-y-2.5">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  task.completed
                    ? 'bg-slate-50 border-slate-200 opacity-70'
                    : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <button
                    type="button"
                    className="mt-0.5 text-slate-400 hover:text-teal-600 transition-colors flex-shrink-0"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300" />
                    )}
                  </button>

                  <div className="space-y-1 min-w-0">
                    <p
                      className={`text-sm font-bold leading-snug truncate ${
                        task.completed ? 'line-through text-slate-400' : 'text-slate-900'
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-teal-700 font-semibold">{task.subject}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500">{task.category}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.dueDate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      task.priority === 'high'
                        ? 'bg-rose-100 text-rose-700'
                        : task.priority === 'medium'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {task.priority}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTask(task.id);
                    }}
                    className="p-1 text-slate-300 hover:text-rose-500 rounded-lg transition-colors"
                    title="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Nigerian Medical School Exams (Right 4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            Upcoming Nigerian Exams
          </h2>

          <div className="space-y-3">
            {upcomingExams.map((exam, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl p-4 border border-slate-200 border-l-4 shadow-2xs space-y-2 ${exam.color}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                    {exam.status}
                  </span>
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    {exam.date}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">
                  {exam.title}
                </h4>
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <School className="w-3 h-3 text-slate-400" />
                  {exam.school}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Motivational Study Tip */}
          <div className="bg-gradient-to-br from-slate-900 to-teal-950 text-white rounded-2xl p-4 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-teal-300">
              <Sparkles className="w-4 h-4" />
              <span>Nigerian Medical Study Tip</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              For 2nd MB viva and clinical OSCEs, practice explaining anatomical boundaries and physiological mechanisms out loud rather than just passive reading.
            </p>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">
                Add Study Task / Revision Goal
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Master Femoral Triangle Relations & Nerve block"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Subject *
                </label>
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
                >
                  {SUBJECTS.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
                  >
                    <option value="Exam Prep">Exam Prep</option>
                    <option value="Revision">Revision</option>
                    <option value="Ward Rounds">Ward Rounds</option>
                    <option value="Practical / Viva">Practical / Viva</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Due Time / Date
                </label>
                <input
                  type="text"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  placeholder="e.g. Tomorrow 7:00 PM, Saturday morning"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
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
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
