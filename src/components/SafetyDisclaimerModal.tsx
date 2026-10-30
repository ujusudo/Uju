import React from 'react';
import { ShieldCheck, BookOpen, AlertTriangle, CheckCircle2, X } from 'lucide-react';

interface SafetyDisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyDisclaimerModal: React.FC<SafetyDisclaimerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-100 my-8 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-teal-50 text-teal-700 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </span>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                Medical Accuracy & Safety Protocol
              </h3>
              <p className="text-xs text-slate-500">
                NESYRINGE AI Educational Standards for Nigerian Medical Students
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Strictly an Educational Study Tool</span>
            </div>
            <p className="text-xs">
              NESYRINGE AI is created to assist university students in understanding difficult academic concepts, preparing for examinations, and revising medical sciences. It is <strong>not</strong> a medical consultation service and cannot diagnose, treat, or formulate patient management protocols outside the supervised clinical teaching framework.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">
              Principles of Academic Responsibility:
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Curriculum Verification:</strong> Study materials are modeled after the accredited West African and Nigerian Medical and Dental Council (MDCN) syllabus.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Standard Reference Benchmarks:</strong> Students are urged to cross-verify all clinical doses, anatomical boundaries, and mechanisms with standard textbooks (Guyton & Hall, Snell's Clinical Anatomy, Robbins Pathology, Katzung Pharmacology).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Faculty Primacy:</strong> In university professional examinations (1st MB, 2nd MB, 3rd MB, Final MB), always prioritize the specific instructions and notes of your department professors and consultants.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
