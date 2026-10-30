import React from 'react';
import { Download, Smartphone, Monitor, CheckCircle, Sparkles, X, UserPlus } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface PwaInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PwaInstallModal: React.FC<PwaInstallModalProps> = ({ isOpen, onClose }) => {
  const { user, openRegistrationModal } = useUser();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-100 my-8 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-teal-50 text-teal-700 rounded-xl">
              <Download className="w-6 h-6" />
            </span>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                Download NESYRINGE AI
              </h3>
              <p className="text-xs text-slate-500">
                Install as a mobile or desktop app for easy daily revision
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

        <div className="p-4 bg-teal-50/70 border border-teal-200/80 rounded-2xl text-xs space-y-1.5 text-teal-950">
          <p className="font-bold flex items-center gap-1.5 text-teal-900">
            <Sparkles className="w-4 h-4 text-teal-600" />
            Personalized For Every Nigerian Student
          </p>
          <p>
            When anyone downloads or opens this app, they can immediately click <strong>"Register / Switch"</strong> to input their own name, university (UI, UNN, UNILAG, ABU, etc.), discipline, and level. Their name will pop up on the dashboard just the way it shows <strong>DR ACHI THE III</strong>!
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Installation Steps:
          </h4>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
            <Smartphone className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <p className="font-bold text-slate-900">On Android / Google Chrome:</p>
              <p className="text-slate-600">
                Tap the 3 dots menu in Chrome browser and select <strong>"Add to Home screen"</strong> or <strong>"Install App"</strong>.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
            <Smartphone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <p className="font-bold text-slate-900">On iPhone / Safari iOS:</p>
              <p className="text-slate-600">
                Tap the <strong>Share</strong> button at bottom of Safari, scroll down, and tap <strong>"Add to Home Screen"</strong>.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
            <Monitor className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <p className="font-bold text-slate-900">On Laptops & Desktops:</p>
              <p className="text-slate-600">
                Click the install icon in the right side of the browser URL bar to install as a standalone desktop app.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              openRegistrationModal();
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register Profile First</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
