import React, { useState } from 'react';
import { UserProvider, useUser } from './context/UserContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { AITutor } from './components/AITutor';
import { SubjectLibrary } from './components/SubjectLibrary';
import { QuizCenter } from './components/QuizCenter';
import { Flashcards } from './components/Flashcards';
import { StudyPlanner } from './components/StudyPlanner';
import { RegistrationModal } from './components/RegistrationModal';
import { SafetyDisclaimerModal } from './components/SafetyDisclaimerModal';
import { PwaInstallModal } from './components/PwaInstallModal';

function MainApp() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [safetyModalOpen, setSafetyModalOpen] = useState<boolean>(false);
  const [pwaModalOpen, setPwaModalOpen] = useState<boolean>(false);

  // States for cross-navigation (e.g. from Dashboard search to AI Tutor)
  const [tutorInitialPrompt, setTutorInitialPrompt] = useState<string>('');
  const [tutorSelectedSubject, setTutorSelectedSubject] = useState<string>('');
  const [librarySelectedSubject, setLibrarySelectedSubject] = useState<string>('');

  const handleNavigate = (tab: string, prompt?: string, subjectId?: string) => {
    if (tab === 'ai-tutor' && prompt) {
      setTutorInitialPrompt(prompt);
    }
    if (tab === 'subjects' && subjectId) {
      setLibrarySelectedSubject(subjectId);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskAIFromSubject = (prompt: string, subjectName: string) => {
    setTutorInitialPrompt(prompt);
    setTutorSelectedSubject(subjectName);
    setActiveTab('ai-tutor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        onOpenSafetyModal={() => setSafetyModalOpen(true)}
        onOpenPwaModal={() => setPwaModalOpen(true)}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onOpenSafetyModal={() => setSafetyModalOpen(true)}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' && (
            <Dashboard
              onNavigate={handleNavigate}
              onOpenSafetyModal={() => setSafetyModalOpen(true)}
            />
          )}

          {activeTab === 'ai-tutor' && (
            <AITutor
              initialPrompt={tutorInitialPrompt}
              selectedSubject={tutorSelectedSubject}
            />
          )}

          {activeTab === 'subjects' && (
            <SubjectLibrary
              onAskAI={handleAskAIFromSubject}
              initialSubjectId={librarySelectedSubject}
            />
          )}

          {activeTab === 'quizzes' && <QuizCenter />}

          {activeTab === 'flashcards' && <Flashcards />}

          {activeTab === 'planner' && <StudyPlanner />}
        </main>
      </div>

      {/* Global Interactive Modals */}
      <RegistrationModal />
      <SafetyDisclaimerModal
        isOpen={safetyModalOpen}
        onClose={() => setSafetyModalOpen(false)}
      />
      <PwaInstallModal
        isOpen={pwaModalOpen}
        onClose={() => setPwaModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <MainApp />
    </UserProvider>
  );
}
