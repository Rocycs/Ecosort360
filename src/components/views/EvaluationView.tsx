import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EVALUATION_QUESTIONS } from '../../data/questions';
import { CONTAINERS } from '../../data/containers';
import { EvaluationRecord } from '../../types';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  ShieldCheck, 
  FileBadge, 
  AlertCircle,
  HelpCircle,
  Building2
} from 'lucide-react';

export const EvaluationView: React.FC = () => {
  const { currentUser, company, addEvaluationRecord, setCurrentView } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [resultRecord, setResultRecord] = useState<EvaluationRecord | null>(null);

  const totalQuestions = EVALUATION_QUESTIONS.length;
  const currentQuestion = EVALUATION_QUESTIONS[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishEvaluation();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const finishEvaluation = () => {
    let score = 0;
    const categoryScores: Record<string, { correct: number; total: number }> = {};

    EVALUATION_QUESTIONS.forEach((q, idx) => {
      const chosen = selectedAnswers[idx];
      const isCorrect = chosen === q.correctAnswer;
      if (isCorrect) score += 1;

      if (!categoryScores[q.category]) {
        categoryScores[q.category] = { correct: 0, total: 0 };
      }
      categoryScores[q.category].total += 1;
      if (isCorrect) categoryScores[q.category].correct += 1;
    });

    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 80; // 80% passing grade

    const newRecord: EvaluationRecord = {
      id: `eval-${Date.now()}`,
      workerId: currentUser.id,
      workerName: currentUser.name,
      company: company.name,
      area: currentUser.area,
      headquarters: currentUser.headquarters,
      date: new Date().toLocaleDateString('es-PE'),
      score,
      totalQuestions,
      percentage,
      passed,
      certificateCode: passed ? `CERT-PERU-2026-90058-${Math.floor(1000 + Math.random() * 9000)}` : undefined,
      timeSpentSeconds: 320,
      categoryScores
    };

    setResultRecord(newRecord);
    setIsCompleted(true);
    addEvaluationRecord(newRecord);

    if (passed) {
      try {
        confetti({
          particleCount: 80,
          spread: 90,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const resetEvaluation = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
    setResultRecord(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {!isCompleted ? (
        <div className="space-y-6">
          
          {/* Top Bar with Progress */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                  Evaluación Corporativa NTP 900.058:2019
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  Certificación de Competencias en Segregación
                </h1>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-slate-500">
                  Pregunta {currentIndex + 1} de {totalQuestions}
                </span>
                <p className="text-[11px] text-emerald-700 font-semibold">
                  Mínimo para aprobar: 80% (16/20)
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span>Categoría: {currentQuestion.category}</span>
                <span>·</span>
                <span>Dificultad: {currentQuestion.difficulty.toUpperCase()}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentIndex] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 rounded-2xl border-2 text-left font-medium text-xs sm:text-sm flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 text-emerald-950 shadow-xs ring-1 ring-emerald-600'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  currentIndex === 0
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentIndex] === undefined}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  selectedAnswers[currentIndex] === undefined
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                }`}
              >
                <span>{currentIndex === totalQuestions - 1 ? 'Finalizar Evaluación' : 'Siguiente Pregunta'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Quick Navigator Numbers */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Navegador de Preguntas:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {EVALUATION_QUESTIONS.map((_, i) => {
                const isAnswered = selectedAnswers[i] !== undefined;
                const isCurrent = currentIndex === i;
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-slate-900 text-white ring-2 ring-emerald-500'
                        : isAnswered
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      ) : resultRecord && (
        
        /* Results Report */
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 animate-in zoom-in-95">
          
          <div className="text-center space-y-2">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-3xl shadow-sm ${
              resultRecord.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {resultRecord.passed ? '🏆' : '📝'}
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Informe de Evaluación Corporativa
            </span>

            <h2 className="text-3xl font-black text-slate-900">
              {resultRecord.passed ? '¡Felicitaciones, completaste la capacitación!' : 'Capacitación pendiente de aprobación'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
              {resultRecord.passed
                ? 'Has superado el 80% mínimo requerido conforme a la NTP 900.058:2019. Tu constancia oficial ya se encuentra disponible para visualización y descarga.'
                : 'Obtuviste menos del 80% requerido. Revisa las categorías a reforzar y vuelve a intentar la evaluación para obtener tu certificado.'}
            </p>
          </div>

          {/* Score KPI Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[11px] font-bold text-slate-500">Nota Final</span>
              <p className="text-3xl font-black text-slate-900 mt-0.5 tabular-nums">
                {resultRecord.score}/{resultRecord.totalQuestions}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[11px] font-bold text-slate-500">Porcentaje</span>
              <p className={`text-3xl font-black mt-0.5 tabular-nums ${
                resultRecord.passed ? 'text-emerald-700' : 'text-amber-700'
              }`}>
                {resultRecord.percentage}%
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[11px] font-bold text-slate-500">Aciertos</span>
              <p className="text-3xl font-black text-emerald-700 mt-0.5 tabular-nums">
                {resultRecord.score}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[11px] font-bold text-slate-500">Errores</span>
              <p className="text-3xl font-black text-rose-600 mt-0.5 tabular-nums">
                {resultRecord.totalQuestions - resultRecord.score}
              </p>
            </div>
          </div>

          {/* Category Diagnostic Breakdown */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Diagnóstico por Categoría de Residuos:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(resultRecord.categoryScores).map(([cat, stats]) => {
                const isCatPassed = stats.correct === stats.total;
                return (
                  <div 
                    key={cat}
                    className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${
                      isCatPassed 
                        ? 'bg-emerald-50/50 border-emerald-200 text-slate-800' 
                        : 'bg-amber-50/50 border-amber-200 text-slate-800'
                    }`}
                  >
                    <div>
                      <p className="font-bold">{cat}</p>
                      <p className="text-[11px] text-slate-500">
                        {stats.correct} de {stats.total} preguntas correctas
                      </p>
                    </div>

                    <div className="text-right">
                      {isCatPassed ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Dominado</span>
                        </span>
                      ) : (
                        <span className="text-amber-700 font-bold flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          <span>Reforzar</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={resetEvaluation}
              className="px-5 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-2 transition-colors shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>VOLVER A PRACTICAR</span>
            </button>

            {resultRecord.passed ? (
              <button
                onClick={() => setCurrentView('certificado')}
                className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
              >
                <FileBadge className="w-4 h-4" />
                <span>VER MI CERTIFICADO OFICIAL</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentView('aprender')}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <span>Repasar Módulo Aprender</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

      )}

    </div>
  );
};
