export type ContainerType = 'azul' | 'blanco' | 'amarillo' | 'marron' | 'plomo' | 'rojo' | 'negro';

export type DifficultyLevel = 'basico' | 'intermedio' | 'avanzado' | 'experto';

export type UserRole = 'trabajador' | 'supervisor' | 'responsable_ambiental' | 'admin';

export interface ContainerInfo {
  id: ContainerType;
  colorName: string;
  category: string;
  subtitle: string;
  colorHex: string;
  accentBg: string;
  badgeBg: string;
  borderClass: string;
  textColor: string;
  iconName: string;
  description: string;
  whatGoesIn: string[];
  whatDoesNotGoIn: string[];
  frequentErrors: string[];
  bestPractices: string[];
  ntpReference: string;
}

export interface WasteItem {
  id: string;
  name: string;
  category: string;
  containerId: ContainerType;
  description: string;
  icon: string;
  difficulty: DifficultyLevel;
  educationalExplanation: string;
  hint: string;
  recommendation: string;
  isPopular?: boolean;
  commonErrorRate?: number; // e.g. 35% error in corporate tests
  workplaceContexts: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  company: string;
  area: string;
  headquarters: string;
  position: string;
  role: UserRole;
  pointsXP: number;
  level: number;
  completedTrainings: number;
  accuracyRate: number;
  streak: number;
  achievements: string[];
  evaluationScore?: number;
  evaluationPassed?: boolean;
  certificateCode?: string;
  certificateDate?: string;
}

export interface CompanyConfig {
  id: string;
  name: string;
  ruc: string;
  shortName: string;
  sedes: string[];
  areas: string[];
  primaryColor: string;
  contactEmail: string;
}

export interface Question {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'identify_container';
  question: string;
  options: string[];
  correctAnswer: number; // Index in options
  explanation: string;
  category: string;
  difficulty: DifficultyLevel;
  relatedContainerId?: ContainerType;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: string;
  points: number;
}

export interface EvaluationRecord {
  id: string;
  workerId: string;
  workerName: string;
  company: string;
  area: string;
  headquarters: string;
  date: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  certificateCode?: string;
  timeSpentSeconds: number;
  categoryScores: Record<string, { correct: number; total: number }>;
}

export interface WorkplaceHotspot {
  id: string;
  wasteId: string;
  label: string;
  x: number; // percentage
  y: number; // percentage
  icon: string;
  hint: string;
}

export interface WorkplaceScenario {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  bgImageUrl?: string;
  hotspots: WorkplaceHotspot[];
  tips: string[];
}
