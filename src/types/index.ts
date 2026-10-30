export interface UserProfile {
  id: string;
  name: string;
  title: string; // e.g. "DR" or "Student"
  university: string;
  faculty: string;
  discipline: string; // e.g. "Medical Sciences"
  level: string; // "100L" | "200L" | "300L" | "400L" | "500L" | "600L / Final Year" | "100L - Final Year"
  matricNumber?: string;
  email: string;
  avatarColor: string;
  joinedDate: string;
  studyStreakDays: number;
  quizzesCompleted: number;
  averageScore: number;
  flashcardsMastered: number;
}

export type SubjectId =
  | 'physiology'
  | 'anatomy'
  | 'biochemistry'
  | 'medical-biochemistry'
  | 'nursing-sciences'
  | 'medicine-surgery'
  | 'medical-lab-science'
  | 'pharmacology'
  | 'pathology'
  | 'microbiology-parasitology'
  | 'immunology'
  | 'genetics';

export interface Topic {
  id: string;
  title: string;
  subjectId: SubjectId;
  subjectName: string;
  levelRecommended: string; // e.g. "200L - 300L (2nd MB)"
  summary: string;
  keyPoints: string[];
  clinicalCorrelations: string;
  mnemonic?: string;
  detailedContent: string;
  isVerified: boolean; // Verified curriculum resource vs AI-generated
  verifiedBy?: string;
  readTimeMinutes: number;
}

export interface SubjectInfo {
  id: SubjectId;
  name: string;
  category: 'Basic Medical' | 'Paraclinical' | 'Clinical' | 'Allied Health';
  description: string;
  iconName: string;
  levelsCovered: string; // "100L - Final Year"
  topicsCount: number;
  accentColor: string;
}

export interface QuizQuestion {
  id: string;
  subjectId: SubjectId;
  subjectName: string;
  topic: string;
  level: '100L-200L' | '200L-300L' | '300L-400L' | '500L-Final Year' | 'All Levels';
  question: string;
  options: [string, string, string, string];
  correctAnswerIndex: number;
  explanation: string;
  clinicalRelevance: string;
  referenceSource: string;
}

export interface Flashcard {
  id: string;
  subjectId: SubjectId;
  subjectName: string;
  topic: string;
  front: string; // Question or Clinical presentation
  back: string; // High-yield answer & mechanism
  mnemonic?: string;
  clinicalPearl?: string;
  status?: 'easy' | 'medium' | 'difficult' | 'unreviewed';
  lastReviewed?: string;
}

export interface StudyTask {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'Exam Prep' | 'Ward Rounds' | 'Revision' | 'Practical / Viva';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: string;
  mode?: 'standard' | 'simple' | 'clinical' | 'mnemonic' | 'exam';
  subject?: string;
  isAiGenerated?: boolean;
}
