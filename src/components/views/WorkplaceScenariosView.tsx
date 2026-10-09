import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WORKPLACE_SCENARIOS } from '../../data/scenarios';
import { WASTE_ITEMS } from '../../data/wastes';
import { CONTAINERS, CONTAINER_LIST } from '../../data/containers';
import { ContainerType, WasteItem, WorkplaceScenario, WorkplaceHotspot } from '../../types';
import confetti from 'canvas-confetti';
import { 
  Building, 
  Coffee, 
  Package, 
  Wrench, 
  Factory, 
  HardHat, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';

export const WorkplaceScenariosView: React.FC = () => {
  const { addPoints, unlockAchievement } = useApp();

  const [activeScenarioId, setActiveScenarioId] = useState<string>('oficina');
  const [selectedHotspot, setSelectedHotspot] = useState<WorkplaceHotspot | null>(null);
  const [resolvedHotspots, setResolvedHotspots] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    message: string;
  } | null>(null);

  const scenario = WORKPLACE_SCENARIOS.find(s => s.id === activeScenarioId) || WORKPLACE_SCENARIOS[0];

  const getScenarioIcon = (id: string) => {
    switch (id) {
      case 'oficina': return <Building className="w-4 h-4" />;
      case 'comedor': return <Coffee className="w-4 h-4" />;
      case 'almacen': return <Package className="w-4 h-4" />;
      case 'taller': return <Wrench className="w-4 h-4" />;
      case 'planta': return <Factory className="w-4 h-4" />;
      case 'obra': default: return <HardHat className="w-4 h-4" />;
    }
  };

  const handleHotspotClick = (hs: WorkplaceHotspot) => {
    setSelectedHotspot(hs);
    setFeedback(null);
  };

  const handleContainerSubmit = (chosenBin: ContainerType) => {
    if (!selectedHotspot) return;

    const waste = WASTE_ITEMS.find(w => w.id === selectedHotspot.wasteId);
    if (!waste) return;

    const isCorrect = chosenBin === waste.containerId;
    const correctBin = CONTAINERS[waste.containerId];

    if (isCorrect) {
      addPoints(25);
      setResolvedHotspots(prev => ({ ...prev, [selectedHotspot.id]: true }));
      setFeedback({
        correct: true,
        message: `¡Excelente! El residuo "${waste.name}" pertenece al contenedor ${correctBin.colorName.toUpperCase()} (${correctBin.category}).`
      });

      try {
        confetti({ particleCount: 30, spread: 50 });
      } catch (e) {}

      setTimeout(() => {
        setSelectedHotspot(null);
        setFeedback(null);
      }, 2500);
    } else {
      setFeedback({
        correct: false,
        message: `No es el contenedor indicado. Pista: ${waste.hint}`
      });
    }
  };

  const currentWaste = selectedHotspot ? WASTE_ITEMS.find(w => w.id === selectedHotspot.wasteId) : null;
  const completedInScenario = scenario.hotspots.filter(h => resolvedHotspots[h.id]).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title & Introduction */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
          Entrenamiento Contextualizado
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
          Aprende en tu Lugar de Trabajo
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1">
          Identifica los residuos comunes en cada ambiente corporativo y resuélvelos directamente en la escena.
        </p>
      </div>

      {/* Scenario Tabs */}
      <div className="flex flex-wrap gap-2">
        {WORKPLACE_SCENARIOS.map((sc) => {
          const isSelected = activeScenarioId === sc.id;
          const countDone = sc.hotspots.filter(h => resolvedHotspots[h.id]).length;
          return (
            <button
              key={sc.id}
              onClick={() => {
                setActiveScenarioId(sc.id);
                setSelectedHotspot(null);
                setFeedback(null);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {getScenarioIcon(sc.id)}
              <span>{sc.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {countDone}/{sc.hotspots.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage & Scene Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Interactive Visual Canvas with Hotspots */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">{scenario.name}</h2>
              <p className="text-xs text-slate-500">{scenario.subtitle}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-700 tabular-nums">
                {completedInScenario} de {scenario.hotspots.length} residuos segregados
              </span>
              <div className="w-32 h-2 bg-slate-100 rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                  style={{ width: `${(completedInScenario / scenario.hotspots.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Interactive Scene Area */}
          <div className="relative w-full h-[360px] sm:h-[440px] bg-slate-900 select-none overflow-hidden">
            {scenario.bgImageUrl ? (
              <img
                src={scenario.bgImageUrl}
                alt={scenario.name}
                className="w-full h-full object-cover opacity-85"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-950 text-slate-500">
                <p className="text-sm font-semibold">Entorno interactivo: {scenario.name}</p>
              </div>
            )}

            {/* Darkness Scrim for hotspot readability */}
            <div className="absolute inset-0 bg-slate-950/25 pointer-events-none" />

            {/* Hotspots overlay pins */}
            {scenario.hotspots.map((hs) => {
              const isResolved = resolvedHotspots[hs.id];
              const isSelected = selectedHotspot?.id === hs.id;

              return (
                <button
                  key={hs.id}
                  onClick={() => handleHotspotClick(hs)}
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-2xl flex items-center gap-1.5 transition-all z-20 ${
                    isResolved 
                      ? 'bg-emerald-600 text-white shadow-md scale-95 opacity-80' 
                      : isSelected 
                      ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-300/80 scale-110 shadow-xl' 
                      : 'bg-white/95 text-slate-900 hover:scale-105 shadow-lg border border-slate-200'
                  }`}
                >
                  <span className="text-lg">{hs.icon}</span>
                  <span className="text-[11px] font-bold hidden sm:inline whitespace-nowrap">
                    {hs.label}
                  </span>
                  {isResolved && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-white ml-0.5" />
                  )}
                </button>
              );
            })}

            {/* Instruction tooltip in scene */}
            <div className="absolute bottom-3 left-3 right-3 sm:right-auto px-3.5 py-2 rounded-xl bg-slate-950/80 backdrop-blur-md text-white text-xs pointer-events-none flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Haz clic en los residuos dispersos en el área para clasificarlos.</span>
            </div>
          </div>

        </div>

        {/* Right: Decision Panel & Context Info */}
        <div className="lg:col-span-4 space-y-4">
          
          {selectedHotspot && currentWaste ? (
            <div className="bg-white rounded-3xl border-2 border-emerald-500 p-6 shadow-md space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Residuo detectado
                </span>
                <span className="text-xs text-slate-400">{selectedHotspot.hint}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-4xl p-2 rounded-2xl bg-slate-50 border border-slate-200">
                  {currentWaste.icon}
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                    {currentWaste.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {currentWaste.description}
                  </p>
                </div>
              </div>

              {/* Feedback alert if any */}
              {feedback && (
                <div className={`p-3 rounded-xl text-xs font-semibold ${
                  feedback.correct ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                  {feedback.message}
                </div>
              )}

              {/* Container selection */}
              <div>
                <p className="text-xs font-bold text-slate-700 mb-2">
                  ¿A qué contenedor debe ir según la NTP?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {CONTAINER_LIST.map((bin) => (
                    <button
                      key={bin.id}
                      onClick={() => handleContainerSubmit(bin.id)}
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-800 hover:bg-slate-50 text-left transition-all flex items-center gap-2 group"
                    >
                      <div 
                        className="w-3.5 h-3.5 rounded-full shrink-0"
                        style={{
                          backgroundColor: bin.id === 'blanco' ? '#FFFFFF' : bin.colorHex,
                          border: bin.id === 'blanco' ? '1px solid #94A3B8' : 'none'
                        }}
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate group-hover:text-emerald-700">
                          {bin.category}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {bin.colorName}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mx-auto text-xl">
                📍
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Selecciona un residuo en la escena
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Toca cualquier ícono flotante en la imagen para analizar el residuo e indicar su contenedor correspondiente.
              </p>
            </div>
          )}

          {/* Scenario Tips */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-emerald-600" />
              <span>Consejos SSOMA para este ambiente:</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              {scenario.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
