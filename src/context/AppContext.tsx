import React, { createContext, useContext, useState, useEffect } from 'react';
import { CompanyConfig, UserProfile, EvaluationRecord, Achievement } from '../types';
import { INITIAL_COMPANY, INITIAL_USERS, ACHIEVEMENTS, DEMO_EVALUATION_RECORDS } from '../data/demoState';

export type AppView = 
  | 'inicio'
  | 'login'
  | 'dashboard'
  | 'aprender'
  | 'clasificar'
  | 'reto'
  | 'escenarios'
  | 'donde-lo-boto'
  | 'evaluacion'
  | 'resultados'
  | 'logros'
  | 'certificado'
  | 'dashboard-ambiental'
  | 'administracion'
  | 'vision-ai';

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  users: UserProfile[];
  company: CompanyConfig;
  updateCompany: (newConfig: Partial<CompanyConfig>) => void;
  evaluationRecords: EvaluationRecord[];
  addEvaluationRecord: (record: EvaluationRecord) => void;
  addPoints: (points: number) => void;
  unlockAchievement: (achievementId: string) => void;
  achievements: Achievement[];
  selectedContainerId: string | null;
  setSelectedContainerId: (id: string | null) => void;
  searchWasteQuery: string;
  setSearchWasteQuery: (query: string) => void;
  switchUserRole: (userId: string) => void;
  addWorker: (worker: Omit<UserProfile, 'id' | 'pointsXP' | 'level' | 'completedTrainings' | 'accuracyRate' | 'streak' | 'achievements'>) => void;
  updateWorker: (id: string, updates: Partial<UserProfile>) => void;
  deleteWorker: (id: string) => void;
  resetAllDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CURRENT_USER: 'ecosort_current_user',
  USERS: 'ecosort_users',
  COMPANY: 'ecosort_company',
  RECORDS: 'ecosort_records',
  VIEW: 'ecosort_view'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.VIEW);
    return (saved as AppView) || 'inicio';
  });

  const [company, setCompany] = useState<CompanyConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COMPANY);
    return saved ? JSON.parse(saved) : INITIAL_COMPANY;
  });

  const [users, setUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_USERS[0];
  });

  const [evaluationRecords, setEvaluationRecords] = useState<EvaluationRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RECORDS);
    return saved ? JSON.parse(saved) : DEMO_EVALUATION_RECORDS;
  });

  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(null);
  const [searchWasteQuery, setSearchWasteQuery] = useState<string>('');

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VIEW, currentView);
  }, [currentView]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPANY, JSON.stringify(company));
  }, [company]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(evaluationRecords));
  }, [evaluationRecords]);

  const updateCompany = (newConfig: Partial<CompanyConfig>) => {
    setCompany(prev => ({ ...prev, ...newConfig }));
  };

  const addPoints = (points: number) => {
    setCurrentUser(prev => {
      const newPoints = prev.pointsXP + points;
      const newLevel = Math.floor(newPoints / 500) + 1;
      const updated = {
        ...prev,
        pointsXP: newPoints,
        level: newLevel
      };
      setUsers(uList => uList.map(u => u.id === prev.id ? updated : u));
      return updated;
    });
  };

  const unlockAchievement = (achievementId: string) => {
    setCurrentUser(prev => {
      if (prev.achievements.includes(achievementId)) return prev;
      const updated = {
        ...prev,
        achievements: [...prev.achievements, achievementId],
        pointsXP: prev.pointsXP + 100
      };
      setUsers(uList => uList.map(u => u.id === prev.id ? updated : u));
      return updated;
    });
  };

  const addEvaluationRecord = (record: EvaluationRecord) => {
    setEvaluationRecords(prev => [record, ...prev]);
    // update current user evaluation score & certificate if passed
    setCurrentUser(prev => {
      const updated: UserProfile = {
        ...prev,
        completedTrainings: prev.completedTrainings + 1,
        evaluationScore: record.score,
        evaluationPassed: record.passed,
        certificateCode: record.passed ? record.certificateCode : prev.certificateCode,
        certificateDate: record.passed ? record.date : prev.certificateDate,
        pointsXP: prev.pointsXP + (record.passed ? 300 : 100),
        accuracyRate: Math.round(((prev.accuracyRate * prev.completedTrainings) + record.percentage) / (prev.completedTrainings + 1))
      };
      if (record.score === 20) {
        if (!updated.achievements.includes('ach-8')) updated.achievements.push('ach-8');
      }
      if (record.passed && !updated.achievements.includes('ach-6')) {
        updated.achievements.push('ach-6');
      }
      setUsers(uList => uList.map(u => u.id === prev.id ? updated : u));
      return updated;
    });
  };

  const switchUserRole = (userId: string) => {
    const found = users.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
    }
  };

  const addWorker = (workerData: Omit<UserProfile, 'id' | 'pointsXP' | 'level' | 'completedTrainings' | 'accuracyRate' | 'streak' | 'achievements'>) => {
    const newWorker: UserProfile = {
      ...workerData,
      id: `user-${Date.now()}`,
      pointsXP: 0,
      level: 1,
      completedTrainings: 0,
      accuracyRate: 0,
      streak: 0,
      achievements: ['ach-1']
    };
    setUsers(prev => [newWorker, ...prev]);
  };

  const updateWorker = (id: string, updates: Partial<UserProfile>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
    if (currentUser.id === id) {
      setCurrentUser(prev => ({ ...prev, ...updates }));
    }
  };

  const deleteWorker = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    if (currentUser.id === id) {
      const remaining = users.filter(u => u.id !== id);
      if (remaining.length > 0) setCurrentUser(remaining[0]);
    }
  };

  const resetAllDemoData = () => {
    localStorage.clear();
    setCompany(INITIAL_COMPANY);
    setUsers(INITIAL_USERS);
    setCurrentUser(INITIAL_USERS[0]);
    setEvaluationRecords(DEMO_EVALUATION_RECORDS);
    setCurrentView('inicio');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        currentUser,
        setCurrentUser,
        users,
        company,
        updateCompany,
        evaluationRecords,
        addEvaluationRecord,
        addPoints,
        unlockAchievement,
        achievements: ACHIEVEMENTS,
        selectedContainerId,
        setSelectedContainerId,
        searchWasteQuery,
        setSearchWasteQuery,
        switchUserRole,
        addWorker,
        updateWorker,
        deleteWorker,
        resetAllDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
