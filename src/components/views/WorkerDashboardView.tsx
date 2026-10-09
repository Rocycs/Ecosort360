import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  Target, 
  Building2, 
  MapPin, 
  Briefcase, 
  ArrowRight,
  FileBadge,
  AlertCircle
} from 'lucide-react';

export const WorkerDashboardView: React.FC = () => {
  const { currentUser, company, setCurrentView, achievements } = useApp();

  const userAchievements = achievements.filter(a => currentUser.achievements.includes(a.id));
  const nextAchievement = achievements.find(a => !currentUser.achievements.includes(a.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1 text-emerald-800">
              <Building2 className="w-3.5 h-3.5" />
              {company.name}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {currentUser.headquarters}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
              {currentUser.area}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Bienvenido, <span className="text-emerald-700">{currentUser.name}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            {currentUser.position} · Capacitación Oficial en Segregación NTP 900.058:2019
          </p>
        </div>

        {/* Action Button Strip */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => setCurrentView('aprender')}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Continuar aprendiendo</span>
          </button>

          <button
            onClick={() => setCurrentView('clasificar')}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Practicar clasificación</span>
          </button>

          <button
            onClick={() => setCurrentView('evaluacion')}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Evaluación Oficial</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Nivel Actual</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            Nivel {currentUser.level}
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold tabular-nums">
            {currentUser.pointsXP} XP acumulados
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Precisión en Prácticas</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {currentUser.accuracyRate}%
          </div>
          <p className="text-[11px] text-slate-500">
            {currentUser.completedTrainings} sesiones completadas
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Racha de Aciertos</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {currentUser.streak} seguidos
          </div>
          <p className="text-[11px] text-amber-700 font-medium">
            ¡Mantén la constancia diaria!
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Evaluación Oficial</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {currentUser.evaluationPassed ? (
              <span className="text-emerald-700">{currentUser.evaluationScore}/20 (Aprobado)</span>
            ) : currentUser.evaluationScore ? (
              <span className="text-amber-700">{currentUser.evaluationScore}/20 (Por repetir)</span>
            ) : (
              <span className="text-slate-400">Pendiente</span>
            )}
          </div>
          <p className="text-[11px] text-slate-500">
            Nota mínima requerida: 16/20 (80%)
          </p>
        </div>

      </div>

      {/* Main Split: Evaluation & Certificate status / Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Certificate & Progress Card */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileBadge className="w-5 h-5 text-emerald-700" />
              <span>Constancia de Capacitación NTP 900.058:2019</span>
            </h2>
            {currentUser.evaluationPassed && (
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                Vigente 2026
              </span>
            )}
          </div>

          {currentUser.evaluationPassed ? (
            <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-50/70 to-teal-50/50 border border-emerald-200 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold text-emerald-800">
                    Certificación Aprobada
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">
                    Segregación de Residuos en el Ámbito No Municipal
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Código de verificación: <span className="font-mono font-bold">{currentUser.certificateCode}</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500">Calificación</span>
                  <p className="text-xl font-black text-emerald-700">{currentUser.evaluationScore}/20</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => setCurrentView('certificado')}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-xs"
                >
                  <FileBadge className="w-4 h-4" />
                  <span>Ver y Descargar Certificado</span>
                </button>
                <button
                  onClick={() => setCurrentView('evaluacion')}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
                >
                  Rendir nuevamente para mejorar nota
                </button>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Aún no cuentas con la certificación oficial activa
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Rinde la evaluación de 20 preguntas sobre la NTP 900.058:2019. Al obtener 80% (16 correctas) o más, tu certificado se generará automáticamente con firma y código QR.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCurrentView('evaluacion')}
                className="mt-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2"
              >
                <span>Comenzar Evaluación Oficial</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Quick learning checklist */}
          <div className="pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Ruta sugerida de aprendizaje:
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">1</span>
                  <span className="font-semibold text-slate-800">Conoce los 7 contenedores</span>
                </div>
                <button 
                  onClick={() => setCurrentView('aprender')}
                  className="text-emerald-700 font-bold hover:underline"
                >
                  Repasar
                </button>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px]">2</span>
                  <span className="font-semibold text-slate-800">Práctica interactiva de arrastre</span>
                </div>
                <button 
                  onClick={() => setCurrentView('clasificar')}
                  className="text-blue-700 font-bold hover:underline"
                >
                  Entrenar
                </button>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-[10px]">3</span>
                  <span className="font-semibold text-slate-800">Escenarios en tu área de trabajo</span>
                </div>
                <button 
                  onClick={() => setCurrentView('escenarios')}
                  className="text-purple-700 font-bold hover:underline"
                >
                  Explorar
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right: Gamification & Achievements */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Mis Logros ({userAchievements.length}/{achievements.length})</span>
            </h2>
            <button
              onClick={() => setCurrentView('logros')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
            >
              Ver todos
            </button>
          </div>

          {/* Unlocked badges list */}
          <div className="grid grid-cols-2 gap-2.5">
            {userAchievements.map((ach) => (
              <div 
                key={ach.id}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center gap-2.5"
              >
                <span className="text-2xl">{ach.icon}</span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">{ach.title}</p>
                  <p className="text-[10px] text-amber-700 font-semibold tabular-nums">+{ach.points} XP</p>
                </div>
              </div>
            ))}
          </div>

          {/* Next target badge */}
          {nextAchievement && (
            <div className="p-3.5 rounded-xl border border-dashed border-slate-300 bg-slate-50/30">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Próximo logro a desbloquear:
              </p>
              <div className="flex items-center gap-2.5">
                <span className="text-2xl grayscale opacity-60">{nextAchievement.icon}</span>
                <div>
                  <p className="text-xs font-bold text-slate-700">{nextAchievement.title}</p>
                  <p className="text-[11px] text-slate-500">{nextAchievement.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* Fast search shortcut */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>¿Dudas con un residuo específico?</span>
            <button
              onClick={() => setCurrentView('donde-lo-boto')}
              className="font-bold text-emerald-700 hover:underline"
            >
              Consultar ¿Dónde lo boto?
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
