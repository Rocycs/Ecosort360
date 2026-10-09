import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CONTAINERS, CONTAINER_LIST } from '../../data/containers';
import { WASTE_ITEMS } from '../../data/wastes';
import { ContainerType } from '../../types';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ThumbsUp, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';

export const LearnModuleView: React.FC = () => {
  const { selectedContainerId, setSelectedContainerId, setCurrentView } = useApp();
  
  const [activeId, setActiveId] = useState<ContainerType>(
    (selectedContainerId as ContainerType) || 'azul'
  );

  const container = CONTAINERS[activeId];
  const itemsInContainer = WASTE_ITEMS.filter(w => w.containerId === activeId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title & Introduction */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Norma Técnica Peruana NTP 900.058:2019</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Módulo de Aprendizaje: <span className="text-emerald-700">Código de Colores de Residuos</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
          Explora los 7 contenedores oficiales establecidos para el almacenamiento de residuos en empresas y centros laborales. Conoce los materiales admitidos, errores frecuentes y buenas prácticas.
        </p>
      </div>

      {/* Container Selector Tabs (Accessible: Color + Name + Category) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {CONTAINER_LIST.map((bin) => {
          const isSelected = activeId === bin.id;
          return (
            <button
              key={bin.id}
              onClick={() => {
                setActiveId(bin.id);
                setSelectedContainerId(bin.id);
              }}
              className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected 
                  ? 'border-slate-900 bg-white ring-2 ring-slate-900 shadow-md' 
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {/* Colored top bar indicator */}
              <div 
                className="w-full h-1.5 rounded-full mb-2"
                style={{ 
                  backgroundColor: bin.id === 'blanco' ? '#CBD5E1' : bin.colorHex,
                  border: bin.id === 'blanco' ? '1px solid #94A3B8' : 'none'
                }}
              />

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {bin.colorName}
                </p>
                <p className="text-xs font-extrabold text-slate-900 leading-snug line-clamp-1 mt-0.5">
                  {bin.category}
                </p>
              </div>

              <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                <span>{bin.id.toUpperCase()}</span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Container Presentation Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        
        {/* Banner with container identity */}
        <div 
          className="p-6 sm:p-8 border-b border-slate-200 text-white relative"
          style={{ 
            backgroundColor: container.id === 'blanco' ? '#334155' : container.colorHex 
          }}
        >
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 text-white text-xs font-bold uppercase tracking-wider">
              <span>Contenedor {container.colorName}</span>
              <span>·</span>
              <span>NTP 900.058:2019</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {container.category}
            </h2>
            <p className="text-sm sm:text-base text-white/90 font-medium">
              {container.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed pt-1">
              {container.description}
            </p>
          </div>
        </div>

        {/* 4-Zone Matrix: Lo que va / Lo que NO va / Errores frecuentes / Buenas prácticas */}
        <div className="p-6 sm:p-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. What goes in */}
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-wider">
                  ¿Qué residuos SÍ corresponden?
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {container.whatGoesIn.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. What does NOT go in */}
            <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-3">
              <div className="flex items-center gap-2 text-rose-800">
                <XCircle className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-wider">
                  ¿Qué residuos NUNCA deben ir aquí?
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {container.whatDoesNotGoIn.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0 mt-1.5"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 3. Frequent Errors */}
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
              <div className="flex items-center gap-2 text-amber-900">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-wider">
                  Errores Frecuentes Detectados en Empresas
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {container.frequentErrors.map((err, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5"></span>
                    <span>{err}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Best Practices */}
            <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-3">
              <div className="flex items-center gap-2 text-blue-900">
                <ThumbsUp className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-wider">
                  Buenas Prácticas de Segregación
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {container.bestPractices.map((bp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5"></span>
                    <span>{bp}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Database Items Showcase for this container */}
          <div className="pt-4 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Residuos Típicos Catalogados ({itemsInContainer.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Elementos reales mapeados en nuestra plataforma para {container.category.toLowerCase()}.
                </p>
              </div>

              <button
                onClick={() => setCurrentView('clasificar')}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <span>Practicar en juego</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {itemsInContainer.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all flex items-start gap-3"
                >
                  <span className="text-2xl shrink-0 p-1 bg-white rounded-lg border border-slate-200">
                    {item.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-slate-900 truncate">{item.name}</p>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                      {item.educationalExplanation}
                    </p>
                    <p className="text-[10px] text-emerald-700 font-semibold mt-1">
                      💡 {item.recommendation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
