import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WASTE_ITEMS, POPULAR_WASTES } from '../../data/wastes';
import { CONTAINERS } from '../../data/containers';
import { WasteItem } from '../../types';
import { 
  Search, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles, 
  AlertTriangle, 
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';

export const WhereDoIDumpItView: React.FC = () => {
  const { searchWasteQuery, setSearchWasteQuery, setCurrentView, setSelectedContainerId } = useApp();
  
  const [query, setQuery] = useState(searchWasteQuery);
  const [selectedWaste, setSelectedWaste] = useState<WasteItem | null>(null);

  const filteredWastes = query.trim() === ''
    ? []
    : WASTE_ITEMS.filter(w => 
        w.name.toLowerCase().includes(query.toLowerCase()) ||
        w.category.toLowerCase().includes(query.toLowerCase()) ||
        w.description.toLowerCase().includes(query.toLowerCase())
      );

  const activeItem = selectedWaste || (filteredWastes.length > 0 ? filteredWastes[0] : null);
  const matchedContainer = activeItem ? CONTAINERS[activeItem.containerId] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title & Prompt Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Consulta Rápida Oficial NTP 900.058:2019</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          ¿Dónde lo boto?
        </h1>
        <p className="text-sm text-slate-600">
          Escribe el residuo que deseas desechar y obtén al instante el contenedor correspondiente y la recomendación técnica recomendada.
        </p>
      </div>

      {/* Instant Search Box with Live Results */}
      <div className="relative max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedWaste(null);
            }}
            placeholder="Escribe el residuo... (ej. botella de plástico, lata de atún, waype, tecnopor, ticket)"
            className="w-full px-5 py-4 pl-12 text-base rounded-2xl border-2 border-slate-300 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 shadow-sm transition-all"
            autoFocus
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4.5" />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSelectedWaste(null);
              }}
              className="absolute right-4 top-4 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-100 px-2 py-1 rounded-md"
            >
              Borrar
            </button>
          )}
        </div>

        {/* Popular waste pills for fast lookup */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-slate-400 text-[11px] uppercase tracking-wider">
            Residuos frecuentes:
          </span>
          {POPULAR_WASTES.slice(0, 7).map((pop) => (
            <button
              key={pop.id}
              onClick={() => {
                setQuery(pop.name);
                setSelectedWaste(pop);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 transition-colors font-medium"
            >
              {pop.icon} {pop.name.split(' ')[0]} {pop.name.split(' ')[1] || ''}
            </button>
          ))}
        </div>
      </div>

      {/* Result Card */}
      {activeItem && matchedContainer ? (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 max-w-2xl mx-auto animate-in zoom-in-95">
          
          {/* Header of Item */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="text-5xl p-2 rounded-2xl bg-slate-50 border border-slate-200">
                {activeItem.icon}
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Residuo Identificado
                </span>
                <h2 className="text-2xl font-black text-slate-900">
                  {activeItem.name.toUpperCase()}
                </h2>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {activeItem.description}
                </p>
              </div>
            </div>
          </div>

          {/* Visual Container Highlight */}
          <div 
            className="p-5 sm:p-6 rounded-2xl border text-white flex flex-col sm:flex-row items-center gap-6"
            style={{ 
              backgroundColor: matchedContainer.id === 'blanco' ? '#334155' : matchedContainer.colorHex 
            }}
          >
            {/* Visual Bin Graphic */}
            <div 
              className="w-16 h-24 rounded-b-2xl rounded-t-sm p-2 flex flex-col justify-between shrink-0 shadow-md text-center"
              style={{
                backgroundColor: matchedContainer.id === 'blanco' ? '#FFFFFF' : matchedContainer.colorHex,
                border: matchedContainer.id === 'blanco' ? '2px solid #CBD5E1' : '2px solid rgba(255,255,255,0.4)',
                color: matchedContainer.id === 'blanco' ? '#0F172A' : '#FFFFFF'
              }}
            >
              <div className="w-10 h-1 bg-black/20 rounded-full mx-auto"></div>
              <span className="text-[11px] font-black uppercase">
                {matchedContainer.colorName}
              </span>
              <div className="w-full h-1 bg-black/10 rounded-full"></div>
            </div>

            <div className="space-y-1 text-center sm:text-left">
              <div className="text-[11px] font-bold uppercase tracking-wider opacity-85">
                Destino Oficial de Segregación
              </div>
              <h3 className="text-2xl font-black text-white">
                CONTENEDOR {matchedContainer.colorName.toUpperCase()}
              </h3>
              <p className="text-sm font-semibold text-white/95">
                Categoría: {matchedContainer.category}
              </p>
              <p className="text-xs text-white/80">
                {matchedContainer.subtitle}
              </p>
            </div>
          </div>

          {/* Recommendation Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
            <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Disposición Técnica Recomendada:</span>
            </h4>
            <p className="text-sm font-semibold text-slate-800 italic">
              “{activeItem.recommendation}”
            </p>
            <p className="text-xs text-slate-600 pt-1">
              {activeItem.educationalExplanation}
            </p>
          </div>

          {/* Learn More Action */}
          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => {
                setSelectedContainerId(matchedContainer.id);
                setCurrentView('aprender');
              }}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
            >
              <span>Ver guía completa del contenedor {matchedContainer.colorName}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setCurrentView('clasificar')}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold"
            >
              Practicar clasificación
            </button>
          </div>

        </div>
      ) : query.trim() !== '' ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3 max-w-lg mx-auto">
          <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">
            No encontramos el residuo exacto "{query}"
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Intenta buscar con palabras clave simples como: "botella", "papel", "lata", "frasco", "waype", "plátano", "tecnopor", o revisa nuestro catálogo completo en el Módulo Aprender.
          </p>
          <button
            onClick={() => setCurrentView('aprender')}
            className="mt-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold inline-block"
          >
            Explorar Catálogo Completo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {POPULAR_WASTES.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setQuery(item.name);
                setSelectedWaste(item);
              }}
              className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-emerald-500 hover:shadow-xs transition-all text-left flex items-start gap-3 group"
            >
              <span className="text-3xl shrink-0 p-1.5 bg-slate-50 rounded-xl border border-slate-100">
                {item.icon}
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 truncate">
                  {item.name}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                  {item.category}
                </p>
                <span className="inline-block mt-2 text-[10px] font-bold text-emerald-700 uppercase">
                  Tacho {CONTAINERS[item.containerId].colorName} →
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

    </div>
  );
};
