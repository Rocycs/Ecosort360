import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Trophy, Award, CheckCircle2, Lock } from 'lucide-react';

export const AchievementsView: React.FC = () => {
  const { achievements, currentUser, setCurrentView } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
            <Trophy className="w-4 h-4" />
            <span>Gamificación Ambiental</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
            Mis Logros y Medallas de Reconocimiento
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Completa desafíos, mantén rachas y supera evaluaciones para desbloquear insignias y sumar puntos XP.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-2xl text-amber-900 shrink-0">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Puntaje Total</p>
            <p className="text-xl font-black tabular-nums">{currentUser.pointsXP} XP</p>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((ach) => {
          const isUnlocked = currentUser.achievements.includes(ach.id);
          return (
            <div
              key={ach.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-white border-amber-300 shadow-sm'
                  : 'bg-slate-50/70 border-slate-200 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-4xl p-2 rounded-2xl ${
                    isUnlocked ? 'bg-amber-50 border border-amber-200' : 'bg-slate-100 grayscale'
                  }`}>
                    {ach.icon}
                  </span>

                  {isUnlocked ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Desbloqueado</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      <Lock className="w-3 h-3" />
                      <span>Bloqueado</span>
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-black text-slate-900">{ach.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{ach.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">{ach.requirement}</span>
                <span className="font-bold text-amber-700 tabular-nums">+{ach.points} XP</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold">¿Quieres desbloquear más logros?</h3>
          <p className="text-xs text-slate-300">
            Juega al Reto Rápido en modo Experto o rinde la Evaluación Oficial para obtener 100%.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('reto')}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
          >
            Ir al Reto Rápido
          </button>
          <button
            onClick={() => setCurrentView('evaluacion')}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
          >
            Rendir Evaluación
          </button>
        </div>
      </div>

    </div>
  );
};
