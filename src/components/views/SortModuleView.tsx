import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WASTE_ITEMS } from '../../data/wastes';
import { CONTAINERS, CONTAINER_LIST } from '../../data/containers';
import { ContainerType, WasteItem } from '../../types';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Sparkles, 
  Flame, 
  ArrowRight,
  Info,
  Lightbulb,
  MousePointer
} from 'lucide-react';

export const SortModuleView: React.FC = () => {
  const { addPoints, unlockAchievement } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWasteForMobile, setSelectedWasteForMobile] = useState<WasteItem | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<{
    status: 'idle' | 'correct' | 'wrong';
    message: string;
    explanation?: string;
  }>({ status: 'idle', message: '' });
  
  const [sessionScore, setSessionScore] = useState(0);
  const [consecutiveStreak, setConsecutiveStreak] = useState(0);
  const [dragOverBin, setDragOverBin] = useState<ContainerType | null>(null);

  const currentItem = WASTE_ITEMS[currentIndex % WASTE_ITEMS.length];

  const handleContainerChoice = (chosenBinId: ContainerType) => {
    const isCorrect = chosenBinId === currentItem.containerId;
    const correctBin = CONTAINERS[currentItem.containerId];

    if (isCorrect) {
      // Correct!
      const earnedXP = attempts === 0 ? 30 : 15;
      addPoints(earnedXP);
      setSessionScore(prev => prev + earnedXP);
      const newStreak = consecutiveStreak + 1;
      setConsecutiveStreak(newStreak);

      if (newStreak >= 10) {
        unlockAchievement('ach-3');
      }
      unlockAchievement('ach-1');

      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {
        // Safe fallback
      }

      setFeedback({
        status: 'correct',
        message: '¡Correcto!',
        explanation: `Este residuo pertenece a la categoría "${correctBin.category}" y corresponde al contenedor ${correctBin.colorName.toUpperCase()}.`
      });
    } else {
      // Wrong!
      const nextAttempt = attempts + 1;
      setAttempts(nextAttempt);
      setConsecutiveStreak(0);

      let msg = 'Inténtalo nuevamente.';
      if (nextAttempt >= 2) {
        msg = `Pista: ${currentItem.hint}`;
      }

      setFeedback({
        status: 'wrong',
        message: msg,
        explanation: nextAttempt >= 3 
          ? `Observación: Este residuo corresponde al contenedor ${correctBin.colorName.toUpperCase()} (${correctBin.category}).` 
          : undefined
      });
    }
  };

  const handleNextItem = () => {
    setFeedback({ status: 'idle', message: '' });
    setAttempts(0);
    setSelectedWasteForMobile(null);
    setCurrentIndex(prev => prev + 1);
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', currentItem.id);
  };

  const handleDropOnBin = (e: React.DragEvent, binId: ContainerType) => {
    e.preventDefault();
    setDragOverBin(null);
    if (feedback.status === 'correct') return;
    handleContainerChoice(binId);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Header & Session Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
            Práctica Interactiva NTP 900.058:2019
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Clasifica el Residuo
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Arrastra el residuo hacia el tacho o selecciónalo y toca el contenedor.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
            <Flame className="w-4 h-4 text-amber-600" />
            <span>Racha: {consecutiveStreak}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="tabular-nums">+{sessionScore} XP</span>
          </div>

          <span className="text-slate-400 tabular-nums">
            Residuo {(currentIndex % WASTE_ITEMS.length) + 1} de {WASTE_ITEMS.length}
          </span>
        </div>
      </div>

      {/* Central Interactive Waste Card */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
        
        {/* Context Chip */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Dificultad: {currentItem.difficulty.toUpperCase()}
          </span>
          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
            {currentItem.category}
          </span>
        </div>

        {/* Draggable/Selectable Card Element */}
        <div
          draggable={feedback.status !== 'correct'}
          onDragStart={handleDragStart}
          onClick={() => setSelectedWasteForMobile(currentItem)}
          className={`cursor-grab active:cursor-grabbing p-6 sm:p-8 rounded-2xl border-2 transition-all select-none max-w-sm w-full ${
            selectedWasteForMobile?.id === currentItem.id
              ? 'border-emerald-500 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500'
              : 'border-slate-200 bg-slate-50/80 hover:border-slate-300 hover:shadow-sm'
          }`}
        >
          <div className="text-5xl sm:text-6xl mb-3 animate-bounce duration-1000">
            {currentItem.icon}
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            {currentItem.name}
          </h2>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            {currentItem.description}
          </p>

          <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-400">
            <MousePointer className="w-3.5 h-3.5" />
            <span>Arrastra o toca para seleccionar</span>
          </div>
        </div>

        {/* Feedback Alert Overlay / Bar */}
        {feedback.status !== 'idle' && (
          <div 
            className={`mt-6 w-full max-w-xl p-4 sm:p-5 rounded-2xl border animate-in zoom-in-95 transition-all text-left ${
              feedback.status === 'correct' 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}
          >
            <div className="flex items-start gap-3">
              {feedback.status === 'correct' ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <Lightbulb className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <p className="font-extrabold text-sm">{feedback.message}</p>
                {feedback.explanation && (
                  <p className="text-xs leading-relaxed opacity-90">{feedback.explanation}</p>
                )}
                {currentItem.recommendation && (
                  <p className="text-[11px] font-semibold text-emerald-800 pt-1">
                    Recomendación: {currentItem.recommendation}
                  </p>
                )}
              </div>
            </div>

            {feedback.status === 'correct' && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleNextItem}
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
                >
                  <span>Siguiente residuo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Target Containers Dock */}
      <div>
        <p className="text-xs font-bold text-slate-500 text-center uppercase tracking-wider mb-3">
          ¿En qué contenedor debe depositarse? (Toca o suelta el residuo)
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {CONTAINER_LIST.map((bin) => {
            const isHovered = dragOverBin === bin.id;
            return (
              <div
                key={bin.id}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverBin(bin.id);
                }}
                onDragLeave={() => setDragOverBin(null)}
                onDrop={(e) => handleDropOnBin(e, bin.id)}
                onClick={() => {
                  if (feedback.status === 'correct') return;
                  handleContainerChoice(bin.id);
                }}
                className={`cursor-pointer p-4 rounded-2xl border-2 flex flex-col items-center justify-between transition-all select-none group text-center ${
                  isHovered 
                    ? 'scale-105 ring-2 ring-slate-900 border-slate-900 shadow-lg' 
                    : 'border-slate-200 bg-white hover:border-slate-400 hover:shadow-md'
                }`}
              >
                {/* Visual Bin Cylinder */}
                <div 
                  className="w-14 h-20 rounded-b-2xl rounded-t-md flex flex-col justify-between p-2 shadow-sm transition-transform group-hover:scale-105"
                  style={{
                    backgroundColor: bin.id === 'blanco' ? '#FFFFFF' : bin.colorHex,
                    border: bin.id === 'blanco' ? '2px solid #94A3B8' : 'none',
                    color: bin.id === 'blanco' ? '#0F172A' : '#FFFFFF'
                  }}
                >
                  {/* Bin handle */}
                  <div className="w-8 h-1 bg-black/20 rounded-full mx-auto"></div>
                  
                  {/* Category Code */}
                  <span className="text-[10px] font-black uppercase tracking-tight leading-tight">
                    {bin.colorName}
                  </span>

                  {/* Bin base groove */}
                  <div className="w-full h-1 bg-black/10 rounded-full"></div>
                </div>

                <div className="mt-3">
                  <span className="block text-xs font-extrabold text-slate-900 leading-tight">
                    {bin.category}
                  </span>
                  <span className="block text-[10px] text-slate-500 mt-0.5">
                    {bin.colorName}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
