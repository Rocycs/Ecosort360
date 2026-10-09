import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WASTE_ITEMS } from '../../data/wastes';
import { CONTAINERS } from '../../data/containers';
import { UserProfile, UserRole } from '../../types';
import { 
  Users, 
  Trash2, 
  Plus, 
  Edit3, 
  Settings, 
  Building2, 
  FileText, 
  Search, 
  Check, 
  X, 
  ShieldCheck,
  Award,
  FileSpreadsheet,
  Download,
  ExternalLink,
  Copy,
  Table,
  CheckCircle2
} from 'lucide-react';

export const AdminManagementView: React.FC = () => {
  const { 
    users, 
    addWorker, 
    updateWorker, 
    deleteWorker, 
    company, 
    updateCompany, 
    evaluationRecords 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'trabajadores' | 'residuos' | 'evaluaciones' | 'empresa' | 'sheets'>('trabajadores');
  const [copiedScript, setCopiedScript] = useState(false);
  
  // Worker modal state
  const [showAddWorkerModal, setShowAddWorkerModal] = useState(false);
  const [editingWorkerId, setEditingWorkerId] = useState<string | null>(null);
  const [workerForm, setWorkerForm] = useState({
    name: '',
    email: '',
    area: company.areas[0] || 'Operaciones',
    headquarters: company.sedes[0] || 'Sede Central - Lima',
    position: '',
    role: 'trabajador' as UserRole
  });

  // Company settings state
  const [companyForm, setCompanyForm] = useState({
    name: company.name,
    ruc: company.ruc,
    shortName: company.shortName,
    primaryColor: company.primaryColor
  });

  const [workerSearch, setWorkerSearch] = useState('');
  const [wasteSearch, setWasteSearch] = useState('');

  // CSV download utility
  const downloadCSV = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportWorkersCSV = () => {
    const headers = ['ID', 'NOMBRES_APELLIDOS', 'CORREO', 'EMPRESA', 'SEDE', 'AREA', 'CARGO', 'ROL', 'PUNTOS_XP', 'NIVEL', 'EVALUACION_NOTA', 'ESTADO_CAPACITACION', 'CODIGO_CERTIFICADO'];
    const rows = users.map(u => [
      `"${u.id}"`,
      `"${u.name}"`,
      `"${u.email}"`,
      `"${u.company}"`,
      `"${u.headquarters}"`,
      `"${u.area}"`,
      `"${u.position}"`,
      `"${u.role}"`,
      u.pointsXP,
      u.level,
      u.evaluationScore || 0,
      u.evaluationPassed ? '"APROBADO"' : '"PENDIENTE"',
      `"${u.certificateCode || ''}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadCSV(`ECOSORT360_TRABAJADORES_${company.shortName.replace(/\s+/g, '_')}.csv`, csvContent);
  };

  const exportEvaluationsCSV = () => {
    const headers = ['ID_EVALUACION', 'FECHA', 'TRABAJADOR', 'EMPRESA', 'SEDE', 'AREA', 'PUNTAJE_OBTENIDO', 'TOTAL_PREGUNTAS', 'PORCENTAJE', 'ESTADO', 'CODIGO_CERTIFICADO', 'TIEMPO_SEGUNDOS'];
    const rows = evaluationRecords.map(r => [
      `"${r.id}"`,
      `"${r.date}"`,
      `"${r.workerName}"`,
      `"${r.company}"`,
      `"${r.headquarters}"`,
      `"${r.area}"`,
      r.score,
      r.totalQuestions,
      `${r.percentage}%`,
      r.passed ? '"APROBADO"' : '"DESAPROBADO"',
      `"${r.certificateCode || ''}"`,
      r.timeSpentSeconds
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadCSV(`ECOSORT360_EVALUACIONES_${company.shortName.replace(/\s+/g, '_')}.csv`, csvContent);
  };

  const exportWastesCSV = () => {
    const headers = ['ID', 'RESIDUO', 'CATEGORIA', 'CONTENEDOR_NTP', 'COLOR', 'DIFICULTAD', 'RECOMENDACION_SEGREGACION', 'EXPLICACION_EDUCATIVA'];
    const rows = WASTE_ITEMS.map(w => {
      const bin = CONTAINERS[w.containerId];
      return [
        `"${w.id}"`,
        `"${w.name}"`,
        `"${w.category}"`,
        `"${bin.category}"`,
        `"${bin.colorName}"`,
        `"${w.difficulty}"`,
        `"${w.recommendation}"`,
        `"${w.educationalExplanation}"`
      ];
    });
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadCSV('ECOSORT360_CATALOGO_RESIDUOS_NTP900058.csv', csvContent);
  };

  const filteredWorkers = users.filter(u => 
    u.name.toLowerCase().includes(workerSearch.toLowerCase()) ||
    u.area.toLowerCase().includes(workerSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(workerSearch.toLowerCase())
  );

  const filteredWastes = WASTE_ITEMS.filter(w =>
    w.name.toLowerCase().includes(wasteSearch.toLowerCase()) ||
    w.category.toLowerCase().includes(wasteSearch.toLowerCase())
  );

  const handleSaveWorker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workerForm.name || !workerForm.email) return;

    if (editingWorkerId) {
      updateWorker(editingWorkerId, workerForm);
    } else {
      addWorker({
        name: workerForm.name,
        email: workerForm.email,
        company: company.name,
        area: workerForm.area,
        headquarters: workerForm.headquarters,
        position: workerForm.position || 'Colaborador',
        role: workerForm.role
      });
    }

    setShowAddWorkerModal(false);
    setEditingWorkerId(null);
    setWorkerForm({
      name: '',
      email: '',
      area: company.areas[0] || 'Operaciones',
      headquarters: company.sedes[0] || 'Sede Central - Lima',
      position: '',
      role: 'trabajador'
    });
  };

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompany(companyForm);
    alert('Configuración de empresa actualizada correctamente.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Administración del Sistema
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
            Gestión Integral EcoSort 360
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Administra colaboradores, catálogo de residuos, historiales de evaluación y personalización empresarial.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('trabajadores')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'trabajadores' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Trabajadores ({users.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('residuos')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'residuos' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            <span>Residuos ({WASTE_ITEMS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('evaluaciones')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'evaluaciones' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Evaluaciones</span>
          </button>

          <button
            onClick={() => setActiveTab('empresa')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'empresa' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Personalizar Empresa</span>
          </button>

          <button
            onClick={() => setActiveTab('sheets')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'sheets' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Base Datos Google Sheets</span>
          </button>
        </div>
      </div>

      {/* TAB 1: TRABAJADORES */}
      {activeTab === 'trabajadores' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-xs">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative max-w-sm w-full">
              <input
                type="text"
                value={workerSearch}
                onChange={(e) => setWorkerSearch(e.target.value)}
                placeholder="Buscar por nombre, área o correo..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            <button
              onClick={() => {
                setEditingWorkerId(null);
                setWorkerForm({
                  name: '',
                  email: '',
                  area: company.areas[0],
                  headquarters: company.sedes[0],
                  position: '',
                  role: 'trabajador'
                });
                setShowAddWorkerModal(true);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Registrar Colaborador</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="pb-3 pl-2">Colaborador</th>
                  <th className="pb-3">Área / Sede</th>
                  <th className="pb-3">Cargo</th>
                  <th className="pb-3">Rol</th>
                  <th className="pb-3">Estado Examen</th>
                  <th className="pb-3 pr-2 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredWorkers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 pl-2 font-bold text-slate-900">
                      <div>{u.name}</div>
                      <div className="text-[11px] font-normal text-slate-400">{u.email}</div>
                    </td>
                    <td className="py-3.5">
                      <div className="font-semibold text-slate-800">{u.area}</div>
                      <div className="text-[11px] text-slate-400">{u.headquarters}</div>
                    </td>
                    <td className="py-3.5">{u.position}</td>
                    <td className="py-3.5 capitalize font-semibold text-slate-700">
                      {u.role.replace('_', ' ')}
                    </td>
                    <td className="py-3.5">
                      {u.evaluationPassed ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[10px]">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Aprobado ({u.evaluationScore}/20)</span>
                        </span>
                      ) : u.evaluationScore ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold text-[10px]">
                          <span>Pendiente ({u.evaluationScore}/20)</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 font-medium">Sin rendir</span>
                      )}
                    </td>
                    <td className="py-3.5 pr-2 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setEditingWorkerId(u.id);
                            setWorkerForm({
                              name: u.name,
                              email: u.email,
                              area: u.area,
                              headquarters: u.headquarters,
                              position: u.position,
                              role: u.role
                            });
                            setShowAddWorkerModal(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
                          title="Editar colaborador"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`¿Eliminar colaborador ${u.name}?`)) {
                              deleteWorker(u.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                          title="Eliminar colaborador"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* TAB 2: RESIDUOS */}
      {activeTab === 'residuos' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Catálogo de Residuos Tipificados (NTP 900.058:2019)
              </h2>
              <p className="text-xs text-slate-500">
                {WASTE_ITEMS.length} residuos mapeados con explicaciones y recomendaciones técnicas.
              </p>
            </div>

            <div className="relative max-w-sm w-full">
              <input
                type="text"
                value={wasteSearch}
                onChange={(e) => setWasteSearch(e.target.value)}
                placeholder="Filtrar residuos..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredWastes.map((w) => {
              const bin = CONTAINERS[w.containerId];
              return (
                <div key={w.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{w.icon}</span>
                    <span 
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                      style={{
                        backgroundColor: bin.id === 'blanco' ? '#F1F5F9' : `${bin.colorHex}20`,
                        color: bin.id === 'blanco' ? '#0F172A' : bin.colorHex,
                        border: `1px solid ${bin.id === 'blanco' ? '#CBD5E1' : bin.colorHex}`
                      }}
                    >
                      {bin.colorName} · {w.category}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{w.name}</h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{w.educationalExplanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: EVALUACIONES */}
      {activeTab === 'evaluaciones' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Historial de Evaluaciones y Certificaciones ({evaluationRecords.length})
            </h2>
            <p className="text-xs text-slate-500">
              Registro auditado de evaluaciones completadas para reportes OEFA y de auditoría interna.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="pb-3 pl-2">Fecha</th>
                  <th className="pb-3">Colaborador</th>
                  <th className="pb-3">Área</th>
                  <th className="pb-3">Nota</th>
                  <th className="pb-3">Resultado</th>
                  <th className="pb-3">Código Certificado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {evaluationRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/70">
                    <td className="py-3 pl-2 text-slate-500 font-mono">{r.date}</td>
                    <td className="py-3 font-bold text-slate-900">{r.workerName}</td>
                    <td className="py-3">{r.area}</td>
                    <td className="py-3 font-bold tabular-nums">{r.score}/20 ({r.percentage}%)</td>
                    <td className="py-3">
                      {r.passed ? (
                        <span className="text-emerald-700 font-bold">Aprobado</span>
                      ) : (
                        <span className="text-rose-600 font-bold">Desaprobado</span>
                      )}
                    </td>
                    <td className="py-3 font-mono text-[11px] text-slate-500">
                      {r.certificateCode || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: PERSONALIZAR EMPRESA */}
      {activeTab === 'empresa' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs max-w-2xl">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Personalización Multi-Empresa
            </h2>
            <p className="text-xs text-slate-500">
              Configura el nombre corporativo, RUC y sedes para que los certificados y reportes lleven el sello de tu organización.
            </p>
          </div>

          <form onSubmit={handleSaveCompany} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Razón Social de la Empresa
              </label>
              <input
                type="text"
                value={companyForm.name}
                onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  RUC
                </label>
                <input
                  type="text"
                  value={companyForm.ruc}
                  onChange={(e) => setCompanyForm({ ...companyForm, ruc: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nombre Comercial Corto
                </label>
                <input
                  type="text"
                  value={companyForm.shortName}
                  onChange={(e) => setCompanyForm({ ...companyForm, shortName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Sedes Registradas
              </label>
              <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                {company.sedes.map((s, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Áreas Operativas
              </label>
              <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                {company.areas.map((a, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs"
            >
              Guardar Cambios de Empresa
            </button>
          </form>
        </div>
      )}

      {/* TAB 5: BASE DE DATOS GOOGLE SHEETS / EXCEL */}
      {activeTab === 'sheets' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-8 shadow-xs">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
                <span>Google Sheets & Excel Cloud Integration</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Arquitectura de Base de Datos en Google Sheets
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Guía completa paso a paso, estructura de tablas, fórmulas y exportación directa en formato CSV/Excel para {company.name}.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://sheets.new"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Abrir Nuevo Google Sheets</span>
              </a>
            </div>
          </div>

          {/* 4-Step Visual Guide */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Pasos para crear la Base de Datos en Google Sheets desde cero:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center">
                  1
                </div>
                <h4 className="text-xs font-bold text-slate-900">Crear una nueva hoja</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Ingresa a <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-emerald-700 font-bold underline">sheets.new</a> en tu navegador. Nombra el archivo: <strong>"BD_EcoSort360_{company.shortName}"</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 font-black text-xs flex items-center justify-center">
                  2
                </div>
                <h4 className="text-xs font-bold text-slate-900">Crear las 4 Pestañas</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  En la parte inferior de Google Sheets, crea 4 hojas: <strong>TRABAJADORES</strong>, <strong>EVALUACIONES</strong>, <strong>RESIDUOS_NTP</strong> y <strong>METRICAS_SSOMA</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 font-black text-xs flex items-center justify-center">
                  3
                </div>
                <h4 className="text-xs font-bold text-slate-900">Descargar e Importar</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Usa los botones de abajo para descargar los CSV listos con las columnas exactas. En Google Sheets ve a <em>Archivo &gt; Importar &gt; Subir</em>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 font-black text-xs flex items-center justify-center">
                  4
                </div>
                <h4 className="text-xs font-bold text-slate-900">Aplicar Fórmulas</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Agrega formato condicional y la fórmula oficial NTP 900.058: <code>=SI(G2&gt;=16;"APROBADO";"DESAPROBADO")</code>.
                </p>
              </div>

            </div>
          </div>

          {/* Quick Export Action Bar */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                  Descarga Rápida de Archivos CSV Compatibles con Google Sheets / Excel
                </h4>
                <p className="text-xs text-slate-600">
                  Descarga los datos actuales ya formateados con cabeceras para importarlos en 1 clic.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={exportWorkersCSV}
                  className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-emerald-600 text-slate-800 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Trabajadores ({users.length})</span>
                </button>

                <button
                  onClick={exportEvaluationsCSV}
                  className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-blue-600 text-slate-800 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                  <span>Evaluaciones ({evaluationRecords.length})</span>
                </button>

                <button
                  onClick={exportWastesCSV}
                  className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-purple-600 text-slate-800 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-purple-600" />
                  <span>Catálogo Residuos ({WASTE_ITEMS.length})</span>
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Schema Blueprint for Google Sheets */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Estructura Oficial de Columnas para cada Pestaña:
            </h3>

            {/* Sheet 1: TRABAJADORES */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-md">
                  Pestaña 1: TRABAJADORES
                </span>
                <span className="text-[11px] text-slate-500">13 Columnas</span>
              </div>
              <p className="text-xs text-slate-600">
                Almacena el padrón de personal de la empresa, su área, cargo y estado de capacitación.
              </p>
              <div className="overflow-x-auto text-[11px] font-mono bg-white p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900">A1:M1 = </span>
                <span className="text-slate-600">
                  ID | NOMBRES_APELLIDOS | CORREO | EMPRESA | SEDE | AREA | CARGO | ROL | PUNTOS_XP | NIVEL | EVALUACION_NOTA | ESTADO_CAPACITACION | CODIGO_CERTIFICADO
                </span>
              </div>
            </div>

            {/* Sheet 2: EVALUACIONES */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-blue-800 bg-blue-100/80 px-2.5 py-0.5 rounded-md">
                  Pestaña 2: EVALUACIONES
                </span>
                <span className="text-[11px] text-slate-500">12 Columnas</span>
              </div>
              <p className="text-xs text-slate-600">
                Historial de cada intento de evaluación oficial de 20 preguntas conforme a la NTP 900.058:2019.
              </p>
              <div className="overflow-x-auto text-[11px] font-mono bg-white p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900">A1:L1 = </span>
                <span className="text-slate-600">
                  ID_EVALUACION | FECHA | TRABAJADOR | EMPRESA | SEDE | AREA | PUNTAJE_OBTENIDO | TOTAL_PREGUNTAS | PORCENTAJE | ESTADO | CODIGO_CERTIFICADO | TIEMPO_SEGUNDOS
                </span>
              </div>
              <p className="text-[11px] text-blue-900 font-sans">
                💡 <strong>Fórmula recomendada en columna J (ESTADO):</strong> <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[10px]">=SI(G2&gt;=16; "APROBADO"; "DESAPROBADO")</code>
              </p>
            </div>

            {/* Sheet 3: RESIDUOS_NTP */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-purple-800 bg-purple-100/80 px-2.5 py-0.5 rounded-md">
                  Pestaña 3: RESIDUOS_NTP
                </span>
                <span className="text-[11px] text-slate-500">8 Columnas</span>
              </div>
              <p className="text-xs text-slate-600">
                Diccionario oficial de residuos tipificados con su contenedor según el código de colores peruano.
              </p>
              <div className="overflow-x-auto text-[11px] font-mono bg-white p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900">A1:H1 = </span>
                <span className="text-slate-600">
                  ID | RESIDUO | CATEGORIA | CONTENEDOR_NTP | COLOR | DIFICULTAD | RECOMENDACION_SEGREGACION | EXPLICACION_EDUCATIVA
                </span>
              </div>
            </div>

            {/* Sheet 4: METRICAS_SSOMA */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-md">
                  Pestaña 4: METRICAS_SSOMA (Dashboard Resumen)
                </span>
                <span className="text-[11px] text-slate-500">Fórmulas directas de Google Sheets</span>
              </div>
              <p className="text-xs text-slate-600">
                Panel de control en Google Sheets para auditorías de SUNAFIL, OEFA y gerencia general.
              </p>
              <div className="space-y-1.5 text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200 font-mono text-[11px]">
                <p>• <strong>Total Trabajadores:</strong> <code>=CONTARA(TRABAJADORES!A2:A)</code></p>
                <p>• <strong>Total Capacitados:</strong> <code>=CONTAR.SI(TRABAJADORES!L2:L; "APROBADO")</code></p>
                <p>• <strong>% Cobertura de Planilla:</strong> <code>=CONTAR.SI(TRABAJADORES!L2:L; "APROBADO")/CONTARA(TRABAJADORES!A2:A)</code></p>
                <p>• <strong>Promedio Nota Evaluación:</strong> <code>=PROMEDIO(EVALUACIONES!G2:G)</code></p>
              </div>
            </div>

          </div>

          {/* Google Apps Script Integration Snippet */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Script de Conexión Automática (Google Apps Script)
                </h4>
                <p className="text-xs text-slate-300">
                  Opcional: Si deseas que cada evaluación completada en EcoSort 360 se registre automáticamente en tu Google Sheets en tiempo real.
                </p>
              </div>

              <button
                onClick={() => {
                  const code = `function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("EVALUACIONES");
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.id,
    new Date(),
    data.workerName,
    data.company,
    data.headquarters,
    data.area,
    data.score,
    data.totalQuestions,
    data.percentage + "%",
    data.passed ? "APROBADO" : "DESAPROBADO",
    data.certificateCode || "",
    data.timeSpentSeconds
  ]);
  return ContentService.createTextOutput(JSON.stringify({"status": "success"})).setMimeType(ContentService.MimeType.JSON);
}`;
                  navigator.clipboard.writeText(code);
                  setCopiedScript(true);
                  setTimeout(() => setCopiedScript(false), 2500);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                {copiedScript ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedScript ? '¡Copiado!' : 'Copiar Código Apps Script'}</span>
              </button>
            </div>

            <pre className="p-3 rounded-xl bg-slate-950 text-slate-300 font-mono text-[11px] overflow-x-auto leading-relaxed">
{`// Ve a Extensiones > Apps Script en tu Google Sheets y pega esto:
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("EVALUACIONES");
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.id, new Date(), data.workerName, data.company, data.headquarters,
    data.area, data.score, data.totalQuestions, data.percentage + "%",
    data.passed ? "APROBADO" : "DESAPROBADO", data.certificateCode || "", data.timeSpentSeconds
  ]);
  return ContentService.createTextOutput(JSON.stringify({"status":"ok"})).setMimeType(ContentService.MimeType.JSON);
}`}
            </pre>
          </div>

        </div>
      )}

      {/* Add / Edit Worker Modal */}
      {showAddWorkerModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                {editingWorkerId ? 'Editar Colaborador' : 'Registrar Nuevo Colaborador'}
              </h3>
              <button
                onClick={() => setShowAddWorkerModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveWorker} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nombres y Apellidos</label>
                <input
                  type="text"
                  required
                  value={workerForm.name}
                  onChange={(e) => setWorkerForm({ ...workerForm, name: e.target.value })}
                  placeholder="ej. Manuel Huamán Torres"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  value={workerForm.email}
                  onChange={(e) => setWorkerForm({ ...workerForm, email: e.target.value })}
                  placeholder="ej. m.huaman@empresa.pe"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Área</label>
                  <select
                    value={workerForm.area}
                    onChange={(e) => setWorkerForm({ ...workerForm, area: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {company.areas.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Sede</label>
                  <select
                    value={workerForm.headquarters}
                    onChange={(e) => setWorkerForm({ ...workerForm, headquarters: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {company.sedes.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Cargo</label>
                  <input
                    type="text"
                    value={workerForm.position}
                    onChange={(e) => setWorkerForm({ ...workerForm, position: e.target.value })}
                    placeholder="ej. Operador Técnico"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Rol</label>
                  <select
                    value={workerForm.role}
                    onChange={(e) => setWorkerForm({ ...workerForm, role: e.target.value as UserRole })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="trabajador">Trabajador</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="responsable_ambiental">Resp. Ambiental</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddWorkerModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
