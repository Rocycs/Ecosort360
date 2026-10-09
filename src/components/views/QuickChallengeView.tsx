import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { WASTE_ITEMS } from '../../data/wastes';
import { CONTAINERS, CONTAINER_LIST } from '../../data/containers';
import { ContainerType, WasteItem, DifficultyLevel } from '../../types';
import confetti from 'canvas-confetti';
import { 
  Zap, 
  Timer, 
  Flame, 
  Trophy, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  XCircle,
  Play
} from 'lucide-react';

export const QuickChallengeView: React.FC = () => {
  const { addPoints, unlockAchievement } = useApp();

  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  // Filter pool based on difficulty level
  const getFilteredItems = (): WasteItem[] => {
    switch (selectedLevel) {
      case 1:
        return WASTE_ITEMS.filter(w => w.difficulty === 'basico');
      case 2:
        return WASTE_ITEMS.filter(w => w.difficulty === 'basico' || w.difficulty === 'intermedio');
      case 3:
        return WASTE_ITEMS.filter(w => w.difficulty === 'intermedio' || w.difficulty === 'avanzado');
      case 4:
      default:
        return WASTE_ITEMS; // All items
    }
  };

  const pool = getFilteredItems();
  const currentItem = pool[currentIndex % pool.length] || WASTE_ITEMS[0];

  // Timer countdown
  useEffect(() => {
    if (gameState !== 'playing') return;

    if (timeLeft <= 0) {
      setGameState('finished');
      addPoints(score);
      if (score >= 300) unlockAchievement('ach-2');
      if (selectedLevel === 4 && correctCount >= 12) unlockAchievement('ach-7');
      try {
        confetti({ particleCount: 50, spread: 70 });
      } catch (e) {}
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const startGame = () => {
    setTimeLeft(60);
    setScore(0);
    setCorrectCount(0);
    setErrorCount(0);
    setStreak(0);
    setMaxStreak(0);
    setCurrentIndex(0);
    setGameState('playing');
  };

  const handleSelectContainer = (chosenBin: ContainerType) => {
    if (gameState !== 'playing') return;

    const isCorrect = chosenBin === currentItem.containerId;

    if (isCorrect) {
      const bonusStreak = Math.floor(streak / 3) * 5;
      const pts = 20 + bonusStreak;
      setScore(s => s + pts);
      setCorrectCount(c => c + 1);
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > maxStreak) setMaxStreak(nextStreak);
      if (nextStreak >= 10) unlockAchievement('ach-3');
    } else {
      setErrorCount(e => e + 1);
      setStreak(0);
    }

    setCurrentIndex(i => i + 1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title & Level Selection */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
            <Zap className="w-4 h-4" />
            <span>Modalidad de Entrenamiento Rápido</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-0.5">
            Reto Rápido: 60 Segundos
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Pon a prueba tus reflejos ambientales y clasifica el mayor número de residuos sin equivocarte.
          </p>
        </div>

        {/* Level Selector */}
        {gameState === 'idle' && (
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {[
              { lvl: 1, name: 'Básico' },
              { lvl: 2, name: 'Intermedio' },
              { lvl: 3, name: 'Avanzado' },
              { lvl: 4, name: 'Experto' }
            ].map(l => (
              <button
                key={l.lvl}
                onClick={() => setSelectedLevel(l.lvl)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  selectedLevel === l.lvl
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Nivel {l.lvl}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Game States */}
      {gameState === 'idle' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto text-3xl shadow-xs">
            ⚡
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h2 className="text-2xl font-black text-slate-900">
              ¿Listo para el desafío de Nivel {selectedLevel}?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Dispones de 60 segundos continuos. Cada acierto suma puntos y combos de racha. Cada fallo reinicia tu racha.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto text-left text-xs text-slate-600">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-800">⏱ Tiempo:</span> 60s
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-800">🎯 Meta:</span> 15+ aciertos
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-800">🔥 Multiplicador:</span> Combos
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-800">🏆 Recompensa:</span> XP y Logros
            </div>
          </div>

          <button
            onClick={startGame}
            className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm inline-flex items-center gap-2 shadow-md transition-all hover:scale-105"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>¡INICIAR RETO AHORA!</span>
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="space-y-6">
          
          {/* Live HUD Dashboard */}
          <div className="grid grid-cols-4 gap-3">
            
            <div className={`p-4 rounded-2xl border text-center ${
              timeLeft <= 10 ? 'bg-red-50 border-red-300 text-red-700 animate-pulse' : 'bg-white border-slate-200 text-slate-800'
            }`}>
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-slate-500">
                <Timer className="w-3.5 h-3.5" />
                <span>Tiempo</span>
              </div>
              <div className="text-3xl font-black tabular-nums mt-0.5">
                {timeLeft}s
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center text-slate-800">
              <span className="text-[11px] font-bold text-slate-500">Puntaje</span>
              <div className="text-3xl font-black tabular-nums text-emerald-700 mt-0.5">
                {score}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center text-slate-800">
              <span className="text-[11px] font-bold text-slate-500">Aciertos / Fallos</span>
              <div className="text-2xl font-black tabular-nums mt-0.5">
                <span className="text-emerald-700">{correctCount}</span>
                <span className="text-slate-300 mx-1">/</span>
                <span className="text-rose-600">{errorCount}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center text-slate-800">
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-slate-500">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Racha</span>
              </div>
              <div className="text-3xl font-black tabular-nums text-amber-600 mt-0.5">
                x{streak}
              </div>
            </div>

          </div>

          {/* Rapid Active Item */}
          <div className="bg-white rounded-3xl border-2 border-slate-300 p-6 sm:p-8 text-center space-y-3 shadow-md animate-in zoom-in-95">
            <div className="text-6xl sm:text-7xl animate-pulse">
              {currentItem.icon}
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {currentItem.name}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {currentItem.description}
              </p>
            </div>
          </div>

          {/* Quick Container Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {CONTAINER_LIST.map((bin) => (
              <button
                key={bin.id}
                onClick={() => handleSelectContainer(bin.id)}
                className="p-3 rounded-2xl border-2 border-slate-200 hover:border-slate-800 bg-white hover:bg-slate-50 flex flex-col items-center justify-between text-center transition-transform active:scale-95 shadow-xs"
              >
                <div 
                  className="w-10 h-12 rounded-b-xl rounded-t-sm shadow-xs mb-1.5 flex items-center justify-center"
                  style={{
                    backgroundColor: bin.id === 'blanco' ? '#FFFFFF' : bin.colorHex,
                    border: bin.id === 'blanco' ? '2px solid #CBD5E1' : 'none',
                    color: bin.id === 'blanco' ? '#0F172A' : '#FFFFFF'
                  }}
                >
                  <span className="text-[9px] font-black uppercase">{bin.colorName.slice(0, 3)}</span>
                </div>
                <span className="text-xs font-extrabold text-slate-900 line-clamp-1">
                  {bin.category}
                </span>
                <span className="text-[10px] text-slate-500">
                  {bin.colorName}
                </span>
              </button>
            ))}
          </div>

        </div>
      )}

      {gameState === 'finished' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto text-3xl">
            🏆
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              ¡Tiempo terminado!
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              Resultados del Reto Rápido
            </h2>
            <p className="text-xs text-slate-500">
              Nivel de Dificultad: {selectedLevel}
            </p>
          </div>

          {/* Score metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 font-semibold">Puntaje Final</span>
              <p className="text-2xl font-black text-emerald-700 tabular-nums">+{score} XP</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 font-semibold">Aciertos</span>
              <p className="text-2xl font-black text-slate-900 tabular-nums">{correctCount}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 font-semibold">Errores</span>
              <p className="text-2xl font-black text-rose-600 tabular-nums">{errorCount}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 font-semibold">Racha Máxima</span>
              <p className="text-2xl font-black text-amber-600 tabular-nums">x{maxStreak}</p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Jugar de nuevo</span>
            </button>

            {selectedLevel < 4 && (
              <button
                onClick={() => {
                  setSelectedLevel(lvl => lvl + 1);
                  startGame();
                }}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span>Subir a Nivel {selectedLevel + 1}</span>
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
