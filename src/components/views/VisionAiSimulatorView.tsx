import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WASTE_ITEMS } from '../../data/wastes';
import { CONTAINERS } from '../../data/containers';
import { WasteItem } from '../../types';
import { 
  Camera, 
  Scan, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  QrCode, 
  BarChart, 
  FileSpreadsheet, 
  Layers,
  ArrowRight,
  Upload,
  RefreshCw
} from 'lucide-react';

export const VisionAiSimulatorView: React.FC = () => {
  const { setCurrentView, setSelectedContainerId } = useApp();

  const sampleItems: WasteItem[] = [
    WASTE_ITEMS.find(w => w.id === 'w-07')!, // Botella PET
    WASTE_ITEMS.find(w => w.id === 'w-13')!, // Lata de aluminio
    WASTE_ITEMS.find(w => w.id === 'w-29')!, // Waype con aceite
    WASTE_ITEMS.find(w => w.id === 'w-37')!, // Tecnopor
    WASTE_ITEMS.find(w => w.id === 'w-24')!, // Botella de vidrio
  ];

  const [selectedSample, setSelectedSample] = useState<WasteItem>(sampleItems[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    waste: WasteItem;
    confidence: number;
    detectedAt: string;
  } | null>(null);

  const handleSimulateScan = (item: WasteItem) => {
    setSelectedSample(item);
    setIsScanning(true);
    setAnalysisResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setAnalysisResult({
        waste: item,
        confidence: Math.round(94 + Math.random() * 5.5),
        detectedAt: new Date().toLocaleTimeString('es-PE')
      });
    }, 1200);
  };

  const matchedContainer = analysisResult ? CONTAINERS[analysisResult.waste.containerId] : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <Scan className="w-4 h-4" />
            <span>Prototipo de Reconocimiento Visual Automatizado</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            EcoSort Vision AI — Detección por Cámara
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Simulador de visión artificial para clasificar residuos en tiempo real a través de cámaras móviles o puntos ecológicos inteligentes.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold shrink-0">
          Módulo de Innovación Tecnológica
        </span>
      </div>

      {/* Camera Simulator Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Viewport Camera Box */}
        <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-6 text-white space-y-6 shadow-xl relative overflow-hidden">
          
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
            <span className="flex items-center gap-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              SENSOR_OPTICAL_CAM: ONLINE
            </span>
            <span>NTP 900.058:2019 ML MODEL</span>
          </div>

          {/* Camera Frame */}
          <div className="relative h-64 sm:h-80 rounded-2xl bg-slate-900 border-2 border-dashed border-slate-700 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
            
            {/* Viewfinder Reticle */}
            <div className="absolute inset-6 border border-emerald-500/30 rounded-xl pointer-events-none">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>
            </div>

            {/* Target Display Icon */}
            <div className="text-6xl sm:text-7xl mb-2 transition-transform">
              {selectedSample.icon}
            </div>
            <p className="text-sm font-bold text-slate-200">
              {selectedSample.name}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Objeto posicionado dentro del campo visual
            </p>

            {/* Scanning Laser Line */}
            {isScanning && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse top-1/2"></div>
            )}
          </div>

          {/* Sample Picker Strip */}
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Probar escaneo con residuos muestra:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {sampleItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSimulateScan(item)}
                  disabled={isScanning}
                  className={`p-2 rounded-xl border text-left transition-all text-xs flex flex-col items-center text-center ${
                    selectedSample.id === item.id
                      ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                      : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <span className="text-2xl mb-1">{item.icon}</span>
                  <span className="font-semibold line-clamp-1 text-[11px]">{item.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleSimulateScan(selectedSample)}
            disabled={isScanning}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors"
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Analizando espectro del material con IA...</span>
              </>
            ) : (
              <>
                <Camera className="w-4 h-4" />
                <span>Capturar Fotografía y Analizar</span>
              </>
            )}
          </button>
        </div>

        {/* Right: AI Output & Technical Card */}
        <div className="lg:col-span-5 space-y-4">
          
          {analysisResult && matchedContainer ? (
            <div className="bg-white rounded-3xl border-2 border-emerald-500 p-6 shadow-md space-y-4 animate-in zoom-in-95">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Análisis Exitoso
                </span>
                <span className="font-mono text-xs text-slate-400">
                  {analysisResult.detectedAt}
                </span>
              </div>

              {/* Confidence Score */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Nivel de Confianza:</span>
                  <span className="font-mono font-black text-emerald-700 tabular-nums">
                    {analysisResult.confidence}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-600 rounded-full"
                    style={{ width: `${analysisResult.confidence}%` }}
                  />
                </div>
              </div>

              {/* Matched Details */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Residuo Detectado</span>
                  <p className="text-base font-black text-slate-900">{analysisResult.waste.name}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Categoría Técnica</span>
                  <p className="text-xs font-bold text-slate-700">{analysisResult.waste.category}</p>
                </div>
              </div>

              {/* Visual Container */}
              <div 
                className="p-4 rounded-2xl text-white flex items-center gap-3"
                style={{ backgroundColor: matchedContainer.id === 'blanco' ? '#334155' : matchedContainer.colorHex }}
              >
                <div 
                  className="w-10 h-14 rounded-b-xl rounded-t-sm flex items-center justify-center text-xs font-black shrink-0"
                  style={{
                    backgroundColor: matchedContainer.id === 'blanco' ? '#FFFFFF' : matchedContainer.colorHex,
                    border: matchedContainer.id === 'blanco' ? '2px solid #CBD5E1' : '1px solid rgba(255,255,255,0.4)',
                    color: matchedContainer.id === 'blanco' ? '#0F172A' : '#FFFFFF'
                  }}
                >
                  {matchedContainer.colorName.slice(0, 3).toUpperCase()}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">Contenedor Asignado</span>
                  <p className="text-base font-black leading-tight">
                    {matchedContainer.colorName.toUpperCase()} · {matchedContainer.category}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 italic">
                “{analysisResult.waste.recommendation}”
              </p>

              <button
                onClick={() => {
                  setSelectedContainerId(matchedContainer.id);
                  setCurrentView('aprender');
                }}
                className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
              >
                Consultar Ficha Técnica del Contenedor
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto text-xl">
                📷
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Presiona "Capturar Fotografía y Analizar"
              </h3>
              <p className="text-xs text-slate-500">
                El modelo de IA procesará la geometría, textura y características del residuo para entregarte el resultado normativo según la NTP 900.058:2019.
              </p>
            </div>
          )}

          {/* Planned Corporate Features Roadmap */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>Arquitectura Prevista para Empresas:</span>
            </h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <QrCode className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Códigos QR en estaciones y puntos ecológicos de planta</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Conectores Power BI para reportes de sostenibilidad ESG</span>
              </div>
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Libro de registro diario de generación de residuos (Ley 1278)</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
