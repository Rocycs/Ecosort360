import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COMMON_ERROR_MAP } from '../../data/demoState';
import { CONTAINERS } from '../../data/containers';
import { 
  BarChart3, 
  Users, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Building2, 
  ShieldCheck, 
  ChevronRight,
  Filter,
  Download
} from 'lucide-react';

export const EnvironmentalDashboardView: React.FC = () => {
  const { users, evaluationRecords, company } = useApp();

  const [selectedPeriod, setSelectedPeriod] = useState<'mes' | 'trimestre' | 'año'>('trimestre');

  // KPI calculations
  const totalWorkers = users.length;
  const trainedWorkers = users.filter(u => u.completedTrainings > 0).length;
  const passedWorkers = users.filter(u => u.evaluationPassed).length;
  const passingRate = Math.round((passedWorkers / (trainedWorkers || 1)) * 100);
  
  const avgScore = evaluationRecords.length > 0
    ? (evaluationRecords.reduce((acc, r) => acc + r.score, 0) / evaluationRecords.length).toFixed(1)
    : '17.5';

  // Category accuracy data
  const categoryStats = [
    { category: 'Papel y Cartón', accuracy: 94, container: 'azul' },
    { category: 'Plástico', accuracy: 91, container: 'blanco' },
    { category: 'Metales', accuracy: 96, container: 'amarillo' },
    { category: 'Orgánicos', accuracy: 89, container: 'marron' },
    { category: 'Vidrio', accuracy: 78, container: 'plomo' },
    { category: 'Peligrosos', accuracy: 74, container: 'rojo' },
    { category: 'No Aprovechables', accuracy: 65, container: 'negro' },
  ];

  // Area performance ranking
  const areaRanking = [
    { area: 'SSOMA', accuracy: 99, workers: 1, status: 'Sobresaliente' },
    { area: 'Almacén y Logística', accuracy: 96, workers: 1, status: 'Óptimo' },
    { area: 'Operaciones', accuracy: 91, workers: 2, status: 'Bueno' },
    { area: 'Administración y Finanzas', accuracy: 89, workers: 1, status: 'Bueno' },
    { area: 'Mantenimiento', accuracy: 78, workers: 2, status: 'Atención requerida' },
  ];

  // Learning progress curve (last 6 weeks)
  const timelineData = [
    { week: 'Sem 1', passingRate: 52, totalTrained: 8 },
    { week: 'Sem 2', passingRate: 64, totalTrained: 14 },
    { week: 'Sem 3', passingRate: 72, totalTrained: 21 },
    { week: 'Sem 4', passingRate: 81, totalTrained: 29 },
    { week: 'Sem 5', passingRate: 85, totalTrained: 35 },
    { week: 'Sem 6', passingRate: 89, totalTrained: 42 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <ShieldCheck className="w-4 h-4" />
            <span>Indicadores de Gestión Ambiental SSOMA</span>
            <span>·</span>
            <span className="text-slate-500">{company.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Dashboard Ambiental & Analítica de Segregación
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Métricas de cumplimiento NTP 900.058:2019, tasas de aprobación y mapa de fallas críticas.
          </p>
        </div>

        {/* Filter Period & Export */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-bold">
            {(['mes', 'trimestre', 'año'] as const).map(p => (
              <button
                key={p}
                onClick={() => setSelectedPeriod(p)}
                className={`px-3 py-1.5 rounded-lg transition-colors capitalize ${
                  selectedPeriod === p ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button 
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar Informe</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Colaboradores Capacitados</span>
            <Users className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-3xl font-black text-slate-900 tabular-nums">
            {trainedWorkers} <span className="text-sm font-semibold text-slate-400">/ {totalWorkers}</span>
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold">
            {Math.round((trainedWorkers / totalWorkers) * 100)}% de cobertura en planilla
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Tasa de Aprobación</span>
            <Award className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-emerald-700 tabular-nums">
            {passingRate}%
          </div>
          <p className="text-[11px] text-slate-500">
            Nota mínima requerida ≥ 80% (16/20)
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Promedio de Calificación</span>
            <CheckCircle2 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 tabular-nums">
            {avgScore} <span className="text-sm font-semibold text-slate-400">/ 20</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Basado en {evaluationRecords.length} evaluaciones oficiales
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Categoría Crítica</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-700">
            No Aprovechables
          </div>
          <p className="text-[11px] text-rose-600 font-medium">
            35% de margen de error en tecnopor y tickets
          </p>
        </div>

      </div>

      {/* Main Charts Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* GRÁFICO 1: Precisión por Categoría de Residuos */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Gráfico 1 · Desempeño
            </span>
            <h2 className="text-base font-bold text-slate-900">
              Precisión de Segregación por Contenedor y Material
            </h2>
            <p className="text-xs text-slate-500">
              Porcentaje de aciertos registrados por los colaboradores en cada flujo de residuos.
            </p>
          </div>

          <div className="space-y-3.5 pt-2">
            {categoryStats.map((item) => {
              const bin = CONTAINERS[item.container as keyof typeof CONTAINERS];
              return (
                <div key={item.category} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-bold text-slate-800">
                      <span 
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{
                          backgroundColor: bin.id === 'blanco' ? '#FFFFFF' : bin.colorHex,
                          border: bin.id === 'blanco' ? '1px solid #94A3B8' : 'none'
                        }}
                      />
                      <span>{item.category}</span>
                      <span className="text-[11px] font-normal text-slate-400">({bin.colorName})</span>
                    </div>
                    <span className="font-mono font-bold text-slate-900 tabular-nums">
                      {item.accuracy}%
                    </span>
                  </div>

                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-700"
                      style={{ 
                        width: `${item.accuracy}%`,
                        backgroundColor: item.accuracy >= 90 ? '#10B981' : item.accuracy >= 75 ? '#F59E0B' : '#EF4444'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* GRÁFICO 2: Ranking y Desempeño por Área */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Gráfico 2 · Áreas Corporativas
            </span>
            <h2 className="text-base font-bold text-slate-900">
              Ranking de Segregación por Áreas
            </h2>
            <p className="text-xs text-slate-500">
              Promedio ponderado por departamento sin revelar datos individuales sensibles.
            </p>
          </div>

          <div className="space-y-3">
            {areaRanking.map((ar, idx) => (
              <div 
                key={ar.area}
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                    idx === 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {idx + 1}
                  </span>
                  <div>
                    <p className="font-bold text-slate-900">{ar.area}</p>
                    <p className="text-[11px] text-slate-500">{ar.status}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-black text-slate-900 tabular-nums">
                    {ar.accuracy}%
                  </span>
                  <p className="text-[10px] text-emerald-700 font-medium">Aprobado</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* GRÁFICO 3 & MAPA DE ERRORES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* GRÁFICO 3: Evolución Histórica del Aprendizaje */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Gráfico 3 · Evolución Temporal
            </span>
            <h2 className="text-base font-bold text-slate-900">
              Curva de Madurez Ambiental en el Tiempo
            </h2>
            <p className="text-xs text-slate-500">
              Evolución semanal de la tasa de aprobación tras aplicar los módulos interactivos.
            </p>
          </div>

          {/* SVG Trend Line Visual */}
          <div className="pt-4">
            <div className="h-44 flex items-end justify-between gap-2 border-b border-slate-200 pb-2">
              {timelineData.map((d) => (
                <div key={d.week} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-bold text-slate-600 tabular-nums">
                    {d.passingRate}%
                  </span>
                  <div 
                    className="w-full max-w-[32px] bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-md transition-all duration-500"
                    style={{ height: `${(d.passingRate / 100) * 120}px` }}
                  />
                  <span className="text-[10px] font-medium text-slate-400">
                    {d.week}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-3">
              <span>Inicio Campaña: 52%</span>
              <span className="font-bold text-emerald-700">Actual: 89% (+37 pts)</span>
            </div>
          </div>
        </div>

        {/* MAPA DE ERRORES: "¿En qué nos estamos equivocando?" */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
              Diagnóstico SSOMA
            </span>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Mapa de Errores: “¿En qué nos estamos equivocando?”</span>
            </h2>
            <p className="text-xs text-slate-500">
              Los 7 residuos con mayor tasa de confusión detectados para enfocar charlas de 5 minutos.
            </p>
          </div>

          <div className="space-y-2.5">
            {COMMON_ERROR_MAP.map((err, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">
                    {err.wasteName}
                  </span>
                  <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 tabular-nums">
                    {err.wrongRate}% de error
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                  <span className="text-rose-600 font-semibold">❌ Confunden con: {err.confusedWith}</span>
                  <span>·</span>
                  <span className="text-emerald-700 font-semibold">✅ Correcto: {err.correctContainer}</span>
                </div>

                <p className="text-[11px] text-slate-500 italic">
                  Motivo técnico: {err.reason}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
