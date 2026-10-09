import React from 'react';
import { useApp } from '../../context/AppContext';
import { CONTAINER_LIST } from '../../data/containers';
import { 
  Play, 
  BookOpen, 
  CheckCircle2, 
  Search, 
  BarChart3, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Building2,
  Scan,
  Compass
} from 'lucide-react';

export const HeroView: React.FC = () => {
  const { setCurrentView, setSelectedContainerId, company, setSearchWasteQuery } = useApp();

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-12 lg:pt-10 lg:pb-16 bg-gradient-to-b from-emerald-50/40 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Regulatory Kicker */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-800 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100/80 rounded-full border border-emerald-200/80">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              Norma Técnica Peruana NTP 900.058:2019
            </span>
            <span className="hidden sm:inline text-slate-400">·</span>
            <span className="text-slate-600">Ámbito no municipal / Centros de trabajo</span>
            <span className="hidden sm:inline text-slate-400">·</span>
            <span className="text-slate-600 flex items-center gap-1">
              <Building2 className="w-3 h-3 text-slate-400" />
              {company.name}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]" style={{ textWrap: 'balance' }}>
                Aprende a segregar. <br className="hidden sm:block" />
                <span className="text-emerald-700">Cada residuo tiene su lugar.</span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Aprende, practica y mejora tus conocimientos sobre segregación de residuos sólidos. Plataforma corporativa interactiva diseñada para capacitar a los colaboradores, certificar competencias y fomentar una cultura de economía circular.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <button
                  onClick={() => setCurrentView('clasificar')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm shadow-emerald-600/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>COMENZAR</span>
                </button>

                <button
                  onClick={() => setCurrentView('aprender')}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-sm shadow-xs transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>APRENDER</span>
                </button>

                <button
                  onClick={() => setCurrentView('clasificar')}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-sm shadow-xs transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>CLASIFICAR</span>
                </button>

                <button
                  onClick={() => {
                    setSearchWasteQuery('');
                    setCurrentView('donde-lo-boto');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-sm shadow-xs transition-colors"
                >
                  <Search className="w-4 h-4 text-amber-600" />
                  <span>¿DÓNDE LO BOTO?</span>
                </button>

                <button
                  onClick={() => setCurrentView('resultados')}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-sm shadow-xs transition-colors"
                >
                  <BarChart3 className="w-4 h-4 text-slate-600" />
                  <span>MIS RESULTADOS</span>
                </button>
              </div>

              {/* Sub-features Kicker */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Evaluación con nota mínima 80%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>Certificado oficial con código QR</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>42+ residuos mapeados</span>
                </div>
              </div>
            </div>

            {/* Right Image / Hero Visual Column */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-900 group">
                <img
                  src="/src/assets/images/hero_circular_economy_1791557890992.jpg"
                  alt="Ilustración de economía circular y gestión de residuos industriales"
                  className="w-full h-80 sm:h-96 object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Economía Circular & Sostenibilidad
                  </span>
                  <h3 className="text-lg font-bold mt-1 text-white">
                    Código de Colores Oficial NTP 900.058:2019
                  </h3>
                  <p className="text-xs text-slate-200 mt-1 line-clamp-2">
                    7 contenedores estandarizados para clasificar papel, plástico, metales, orgánicos, vidrio, peligrosos y no aprovechables.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7 NTP Containers Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Los 7 Contenedores Oficiales
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            Reconoce cada contenedor y su categoría
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Haz clic en cualquiera para explorar sus especificaciones técnicas, ejemplos y errores frecuentes.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {CONTAINER_LIST.map((bin) => {
            return (
              <button
                key={bin.id}
                onClick={() => {
                  setSelectedContainerId(bin.id);
                  setCurrentView('aprender');
                }}
                className="flex flex-col items-center p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-400 hover:shadow-md transition-all text-center group"
              >
                {/* Visual Bin Representation */}
                <div 
                  className="w-12 h-16 rounded-b-xl rounded-t-sm flex flex-col justify-between p-1.5 shadow-sm transition-transform group-hover:scale-105"
                  style={{
                    backgroundColor: bin.id === 'blanco' ? '#FFFFFF' : bin.colorHex,
                    border: bin.id === 'blanco' ? '2px solid #CBD5E1' : 'none',
                    color: bin.id === 'blanco' ? '#0F172A' : '#FFFFFF'
                  }}
                >
                  <div className="w-full h-1 bg-black/20 rounded-full mx-auto"></div>
                  <div className="text-center font-bold text-[10px] uppercase leading-none">
                    {bin.colorName}
                  </div>
                  <div className="w-full h-0.5 bg-black/10 rounded-full"></div>
                </div>

                <span className="text-xs font-bold text-slate-900 mt-2 leading-tight">
                  {bin.category}
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">
                  Tacho {bin.colorName}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Interactive Pathways Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Módulo Clasifica el Residuo</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Interactúa arrastrando o tocando cada residuo hacia su contenedor. Recibe retroalimentación inmediata, pistas educativas y gana puntos.
              </p>
            </div>
            <button
              onClick={() => setCurrentView('clasificar')}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800"
            >
              <span>Jugar ahora</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Reto Rápido Contrarreloj</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Pon a prueba tu agilidad mental: 15 residuos en 60 segundos con 4 niveles progresivos, desde Básico hasta Experto Ambiental.
              </p>
            </div>
            <button
              onClick={() => setCurrentView('reto')}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800"
            >
              <span>Aceptar el reto</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Escenarios en tu Trabajo</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Oficina, Comedor, Almacén, Taller, Planta u Obra. Aprende a identificar residuos in situ en ambientes reales de tu empresa.
              </p>
            </div>
            <button
              onClick={() => setCurrentView('escenarios')}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-800"
            >
              <span>Explorar escenarios</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* Future Roadmap / AI Vision banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
              <Scan className="w-3 h-3" />
              <span>Funcionalidad Inteligente</span>
            </div>
            <h3 className="text-xl font-bold">EcoSort Vision AI — Reconocimiento por Cámara</h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Prueba el simulador de inteligencia artificial que identifica residuos mediante captura fotográfica, clasifica la categoría y calcula el nivel de confianza.
            </p>
          </div>
          <button
            onClick={() => setCurrentView('vision-ai')}
            className="shrink-0 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
          >
            Abrir Simulador Vision AI
          </button>
        </div>
      </section>

    </div>
  );
};
