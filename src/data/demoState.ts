import { CompanyConfig, UserProfile, Achievement, EvaluationRecord } from '../types';

export const INITIAL_COMPANY: CompanyConfig = {
  id: 'ind-demo-01',
  name: 'INDUSTRIAS DEMO S.A.C.',
  ruc: '20601234567',
  shortName: 'Industrias Demo',
  sedes: ['Sede Central - Lima (Callao)', 'Planta Sur - Arequipa', 'Sede Norte - Trujillo'],
  areas: ['Operaciones', 'SSOMA', 'Almacén y Logística', 'Mantenimiento', 'Administración y Finanzas'],
  primaryColor: '#059669', // Emerald
  contactEmail: 'ssoma@industriasdemo.pe'
};

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user-01',
    name: 'Carlos Mendoza Ramos',
    email: 'carlos.mendoza@industriasdemo.pe',
    company: 'INDUSTRIAS DEMO S.A.C.',
    area: 'Operaciones',
    headquarters: 'Sede Central - Lima (Callao)',
    position: 'Operador de Maquinaria Industrial',
    role: 'trabajador',
    pointsXP: 1450,
    level: 3,
    completedTrainings: 4,
    accuracyRate: 92,
    streak: 8,
    achievements: ['ach-1', 'ach-2', 'ach-3', 'ach-4'],
    evaluationScore: 18,
    evaluationPassed: true,
    certificateCode: 'CERT-PERU-2026-90058-8831',
    certificateDate: '15/03/2026'
  },
  {
    id: 'user-02',
    name: 'Andrea Paredes Ruiz',
    email: 'andrea.paredes@industriasdemo.pe',
    company: 'INDUSTRIAS DEMO S.A.C.',
    area: 'Almacén y Logística',
    headquarters: 'Sede Central - Lima (Callao)',
    position: 'Supervisora de Almacén y Despacho',
    role: 'supervisor',
    pointsXP: 2180,
    level: 4,
    completedTrainings: 7,
    accuracyRate: 96,
    streak: 15,
    achievements: ['ach-1', 'ach-2', 'ach-3', 'ach-4', 'ach-5', 'ach-6'],
    evaluationScore: 20,
    evaluationPassed: true,
    certificateCode: 'CERT-PERU-2026-90058-8842',
    certificateDate: '18/03/2026'
  },
  {
    id: 'user-03',
    name: 'Ing. Sofía Cárdenas Vega',
    email: 'sofia.cardenas@industriasdemo.pe',
    company: 'INDUSTRIAS DEMO S.A.C.',
    area: 'SSOMA',
    headquarters: 'Sede Central - Lima (Callao)',
    position: 'Jefa de Seguridad y Medio Ambiente (SSOMA)',
    role: 'responsable_ambiental',
    pointsXP: 3400,
    level: 5,
    completedTrainings: 12,
    accuracyRate: 99,
    streak: 22,
    achievements: ['ach-1', 'ach-2', 'ach-3', 'ach-4', 'ach-5', 'ach-6', 'ach-7', 'ach-8'],
    evaluationScore: 20,
    evaluationPassed: true,
    certificateCode: 'CERT-PERU-2026-90058-8801',
    certificateDate: '02/02/2026'
  },
  {
    id: 'user-04',
    name: 'Roberto Vidal Solís',
    email: 'roberto.vidal@industriasdemo.pe',
    company: 'INDUSTRIAS DEMO S.A.C.',
    area: 'Administración y Finanzas',
    headquarters: 'Sede Central - Lima (Callao)',
    position: 'Gerente de Administración y RRHH',
    role: 'admin',
    pointsXP: 2800,
    level: 4,
    completedTrainings: 6,
    accuracyRate: 94,
    streak: 10,
    achievements: ['ach-1', 'ach-2', 'ach-3', 'ach-4', 'ach-5'],
    evaluationScore: 19,
    evaluationPassed: true,
    certificateCode: 'CERT-PERU-2026-90058-8815',
    certificateDate: '10/02/2026'
  },
  {
    id: 'user-05',
    name: 'Jorge Quispe Huamán',
    email: 'jorge.quispe@industriasdemo.pe',
    company: 'INDUSTRIAS DEMO S.A.C.',
    area: 'Mantenimiento',
    headquarters: 'Planta Sur - Arequipa',
    position: 'Técnico Electromecánico',
    role: 'trabajador',
    pointsXP: 820,
    level: 2,
    completedTrainings: 2,
    accuracyRate: 84,
    streak: 4,
    achievements: ['ach-1', 'ach-2'],
    evaluationScore: 16,
    evaluationPassed: true,
    certificateCode: 'CERT-PERU-2026-90058-8874',
    certificateDate: '22/03/2026'
  },
  {
    id: 'user-06',
    name: 'Lucía Benavides Castro',
    email: 'lucia.benavides@industriasdemo.pe',
    company: 'INDUSTRIAS DEMO S.A.C.',
    area: 'Operaciones',
    headquarters: 'Sede Norte - Trujillo',
    position: 'Asistente de Control de Calidad',
    role: 'trabajador',
    pointsXP: 650,
    level: 2,
    completedTrainings: 2,
    accuracyRate: 88,
    streak: 5,
    achievements: ['ach-1'],
    evaluationScore: 17,
    evaluationPassed: true,
    certificateCode: 'CERT-PERU-2026-90058-8889',
    certificateDate: '24/03/2026'
  },
  {
    id: 'user-07',
    name: 'Miguel Ángel Tello',
    email: 'miguel.tello@industriasdemo.pe',
    company: 'INDUSTRIAS DEMO S.A.C.',
    area: 'Mantenimiento',
    headquarters: 'Sede Central - Lima (Callao)',
    position: 'Auxiliar de Mantenimiento',
    role: 'trabajador',
    pointsXP: 410,
    level: 1,
    completedTrainings: 1,
    accuracyRate: 72,
    streak: 2,
    achievements: ['ach-1'],
    evaluationScore: 14,
    evaluationPassed: false // Requires re-evaluation
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Primer paso verde',
    description: 'Completaste tu primera sesión de práctica o clasificación.',
    icon: '🌱',
    requirement: '1 práctica completada',
    points: 100
  },
  {
    id: 'ach-2',
    title: '10 residuos correctos',
    description: 'Clasificaste 10 residuos seguidos sin cometer errores.',
    icon: '🎯',
    requirement: '10 aciertos',
    points: 150
  },
  {
    id: 'ach-3',
    title: 'Racha de 10',
    description: 'Lograste un combo de 10 aciertos consecutivos en el Reto Rápido.',
    icon: '🔥',
    requirement: 'Combo x10',
    points: 200
  },
  {
    id: 'ach-4',
    title: 'Experto en plástico',
    description: 'Clasificaste correctamente botellas PET, PEAD y stretch film.',
    icon: '🧴',
    requirement: '100% en polímeros',
    points: 250
  },
  {
    id: 'ach-5',
    title: 'Manejo de Peligrosos',
    description: 'Identificaste con precisión waypes, pilas y luminarias.',
    icon: '⚠️',
    requirement: 'Cero fallas en residuos rojos',
    points: 300
  },
  {
    id: 'ach-6',
    title: 'Experto en segregación',
    description: 'Aprobaste la evaluación oficial de 20 preguntas con más del 90%.',
    icon: '🏆',
    requirement: 'Nota ≥ 18 en evaluación',
    points: 400
  },
  {
    id: 'ach-7',
    title: 'Guardián Ambiental',
    description: 'Alcanzaste el Nivel 4 en el Reto Rápido y dominas la NTP 900.058:2019.',
    icon: '🛡️',
    requirement: 'Superar Reto Experto',
    points: 500
  },
  {
    id: 'ach-8',
    title: 'Cero errores',
    description: 'Obtuviste nota perfecta 20/20 en la evaluación corporativa.',
    icon: '⭐',
    requirement: '100% en evaluación oficial',
    points: 600
  }
];

export const DEMO_EVALUATION_RECORDS: EvaluationRecord[] = [
  {
    id: 'eval-01',
    workerId: 'user-01',
    workerName: 'Carlos Mendoza Ramos',
    company: 'INDUSTRIAS DEMO S.A.C.',
    area: 'Operaciones',
    headquarters: 'Sede Central - Lima (Callao)',
    date: '15/03/2026',
    score: 18,
    totalQuestions: 20,
    percentage: 90,
    passed: true,
    certificateCode: 'CERT-PERU-2026-90058-8831',
    timeSpentSeconds: 380,
    categoryScores: {
      'Papel y Cartón': { correct: 4, total: 4 },
      'Plástico': { correct: 4, total: 4 },
      'Metales': { correct: 3, total: 3 },
      'Orgánicos': { correct: 2, total: 2 },
      'Vidrio': { correct: 2, total: 2 },
      'Peligrosos': { correct: 2, total: 3 },
      'No Aprovechables': { correct: 1, total: 2 }
    }
  },
  {
    id: 'eval-02',
    workerId: 'user-02',
    workerName: 'Andrea Paredes Ruiz',
    company: 'INDUSTRIAS DEMO S.A.C.',
    area: 'Almacén y Logística',
    headquarters: 'Sede Central - Lima (Callao)',
    date: '18/03/2026',
    score: 20,
    totalQuestions: 20,
    percentage: 100,
    passed: true,
    certificateCode: 'CERT-PERU-2026-90058-8842',
    timeSpentSeconds: 310,
    categoryScores: {
      'Papel y Cartón': { correct: 4, total: 4 },
      'Plástico': { correct: 4, total: 4 },
      'Metales': { correct: 3, total: 3 },
      'Orgánicos': { correct: 2, total: 2 },
      'Vidrio': { correct: 2, total: 2 },
      'Peligrosos': { correct: 3, total: 3 },
      'No Aprovechables': { correct: 2, total: 2 }
    }
  },
  {
    id: 'eval-03',
    workerId: 'user-03',
    workerName: 'Ing. Sofía Cárdenas Vega',
    company: 'INDUSTRIAS DEMO S.A.C.',
    area: 'SSOMA',
    headquarters: 'Sede Central - Lima (Callao)',
    date: '02/02/2026',
    score: 20,
    totalQuestions: 20,
    percentage: 100,
    passed: true,
    certificateCode: 'CERT-PERU-2026-90058-8801',
    timeSpentSeconds: 240,
    categoryScores: {
      'Papel y Cartón': { correct: 4, total: 4 },
      'Plástico': { correct: 4, total: 4 },
      'Metales': { correct: 3, total: 3 },
      'Orgánicos': { correct: 2, total: 2 },
      'Vidrio': { correct: 2, total: 2 },
      'Peligrosos': { correct: 3, total: 3 },
      'No Aprovechables': { correct: 2, total: 2 }
    }
  },
  {
    id: 'eval-04',
    workerId: 'user-04',
    workerName: 'Roberto Vidal Solís',
    company: 'INDUSTRIAS DEMO S.A.C.',
    area: 'Administración y Finanzas',
    headquarters: 'Sede Central - Lima (Callao)',
    date: '10/02/2026',
    score: 19,
    totalQuestions: 20,
    percentage: 95,
    passed: true,
    certificateCode: 'CERT-PERU-2026-90058-8815',
    timeSpentSeconds: 340,
    categoryScores: {
      'Papel y Cartón': { correct: 4, total: 4 },
      'Plástico': { correct: 4, total: 4 },
      'Metales': { correct: 3, total: 3 },
      'Orgánicos': { correct: 2, total: 2 },
      'Vidrio': { correct: 2, total: 2 },
      'Peligrosos': { correct: 3, total: 3 },
      'No Aprovechables': { correct: 1, total: 2 }
    }
  },
  {
    id: 'eval-05',
    workerId: 'user-05',
    workerName: 'Jorge Quispe Huamán',
    company: 'INDUSTRIAS DEMO S.A.C.',
    area: 'Mantenimiento',
    headquarters: 'Planta Sur - Arequipa',
    date: '22/03/2026',
    score: 16,
    totalQuestions: 20,
    percentage: 80,
    passed: true,
    certificateCode: 'CERT-PERU-2026-90058-8874',
    timeSpentSeconds: 420,
    categoryScores: {
      'Papel y Cartón': { correct: 3, total: 4 },
      'Plástico': { correct: 3, total: 4 },
      'Metales': { correct: 3, total: 3 },
      'Orgánicos': { correct: 2, total: 2 },
      'Vidrio': { correct: 1, total: 2 },
      'Peligrosos': { correct: 2, total: 3 },
      'No Aprovechables': { correct: 2, total: 2 }
    }
  },
  {
    id: 'eval-06',
    workerId: 'user-06',
    workerName: 'Lucía Benavides Castro',
    company: 'INDUSTRIAS DEMO S.A.C.',
    area: 'Operaciones',
    headquarters: 'Sede Norte - Trujillo',
    date: '24/03/2026',
    score: 17,
    totalQuestions: 20,
    percentage: 85,
    passed: true,
    certificateCode: 'CERT-PERU-2026-90058-8889',
    timeSpentSeconds: 390,
    categoryScores: {
      'Papel y Cartón': { correct: 4, total: 4 },
      'Plástico': { correct: 3, total: 4 },
      'Metales': { correct: 3, total: 3 },
      'Orgánicos': { correct: 2, total: 2 },
      'Vidrio': { correct: 2, total: 2 },
      'Peligrosos': { correct: 2, total: 3 },
      'No Aprovechables': { correct: 1, total: 2 }
    }
  },
  {
    id: 'eval-07',
    workerId: 'user-07',
    workerName: 'Miguel Ángel Tello',
    company: 'INDUSTRIAS DEMO S.A.C.',
    area: 'Mantenimiento',
    headquarters: 'Sede Central - Lima (Callao)',
    date: '25/03/2026',
    score: 14,
    totalQuestions: 20,
    percentage: 70,
    passed: false,
    timeSpentSeconds: 450,
    categoryScores: {
      'Papel y Cartón': { correct: 3, total: 4 },
      'Plástico': { correct: 2, total: 4 },
      'Metales': { correct: 2, total: 3 },
      'Orgánicos': { correct: 2, total: 2 },
      'Vidrio': { correct: 1, total: 2 },
      'Peligrosos': { correct: 2, total: 3 },
      'No Aprovechables': { correct: 2, total: 2 }
    }
  }
];

// Error map: residues with highest failure percentage in assessments
export const COMMON_ERROR_MAP = [
  {
    wasteName: 'Taza de cerámica o loza rota',
    wrongRate: 51,
    confusedWith: 'Plomo (Vidrio)',
    correctContainer: 'Negro (No aprovechables)',
    reason: 'La cerámica no funde a la misma temperatura que el vidrio y malogra los lotes de reciclaje.'
  },
  {
    wasteName: 'Envase de tecnopor de almuerzo',
    wrongRate: 48,
    confusedWith: 'Blanco (Plástico)',
    correctContainer: 'Negro (No aprovechables)',
    reason: 'El poliestireno expandido contaminado con comida no tiene cadena de reciclaje viable.'
  },
  {
    wasteName: 'Papel térmico de tickets de compras',
    wrongRate: 46,
    confusedWith: 'Azul (Papel y cartón)',
    correctContainer: 'Negro (No aprovechables)',
    reason: 'El recubrimiento químico de bisfenol A (BPA) invalida la pulpa de celulosa.'
  },
  {
    wasteName: 'Tubo fluorescente o lámpara rota',
    wrongRate: 44,
    confusedWith: 'Plomo (Vidrio)',
    correctContainer: 'Rojo (Peligrosos)',
    reason: 'Contiene vapor de mercurio y metales pesados altamente tóxicos.'
  },
  {
    wasteName: 'Servilleta de papel con grasa de comida',
    wrongRate: 42,
    confusedWith: 'Azul (Papel y cartón)',
    correctContainer: 'Negro (No aprovechables)',
    reason: 'La grasa impide la separación de fibras en las plantas de reciclaje de papel.'
  },
  {
    wasteName: 'Envoltura metalizada de galletas (snacks)',
    wrongRate: 40,
    confusedWith: 'Amarillo (Metales) o Blanco',
    correctContainer: 'Negro (No aprovechables)',
    reason: 'Es una lámina multicapa plástica con película de aluminio inseparable.'
  },
  {
    wasteName: 'Waype o trapo con grasa / aceite de motor',
    wrongRate: 38,
    confusedWith: 'Negro (No aprovechables)',
    correctContainer: 'Rojo (Peligrosos)',
    reason: 'El hidrocarburo es inflamable y tóxico; requiere gestión de residuo peligroso.'
  }
];
