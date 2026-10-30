import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { DEFAULT_USER_PROFILE } from '../data/mockData';

interface UserContextType {
  user: UserProfile;
  updateUser: (updated: Partial<UserProfile>) => void;
  registerUser: (newUser: Omit<UserProfile, 'id' | 'joinedDate' | 'studyStreakDays' | 'quizzesCompleted' | 'averageScore' | 'flashcardsMastered'>) => void;
  resetToDrAchi: () => void;
  isRegisteredUser: boolean;
  isRegistrationModalOpen: boolean;
  openRegistrationModal: () => void;
  closeRegistrationModal: () => void;
}

const STORAGE_KEY = 'nesyringe_active_user_profile_v2';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure default DR ACHI THE III values if old version had adeleke or 400L
        if (parsed.name.toLowerCase().includes('adeleke')) {
          return DEFAULT_USER_PROFILE;
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to load user profile from localStorage:', e);
    }
    return DEFAULT_USER_PROFILE;
  });

  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save user profile to localStorage:', e);
    }
  }, [user]);

  const updateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  const registerUser = (newUser: Omit<UserProfile, 'id' | 'joinedDate' | 'studyStreakDays' | 'quizzesCompleted' | 'averageScore' | 'flashcardsMastered'>) => {
    const formattedProfile: UserProfile = {
      ...newUser,
      id: 'student_' + Date.now(),
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      studyStreakDays: 1,
      quizzesCompleted: 0,
      averageScore: 0,
      flashcardsMastered: 0,
      avatarColor: newUser.avatarColor || 'from-teal-600 to-emerald-700',
    };
    setUser(formattedProfile);
    setIsRegistrationModalOpen(false);
  };

  const resetToDrAchi = () => {
    setUser(DEFAULT_USER_PROFILE);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_USER_PROFILE));
  };

  const isRegisteredUser = user.name !== DEFAULT_USER_PROFILE.name;

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        registerUser,
        resetToDrAchi,
        isRegisteredUser,
        isRegistrationModalOpen,
        openRegistrationModal: () => setIsRegistrationModalOpen(true),
        closeRegistrationModal: () => setIsRegistrationModalOpen(false),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
