import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Download, 
  Printer, 
  ShieldCheck, 
  Award, 
  Building2, 
  QrCode, 
  CheckCircle2, 
  ArrowLeft,
  Calendar,
  Sparkles
} from 'lucide-react';

export const CertificateView: React.FC = () => {
  const { currentUser, company, setCurrentView } = useApp();

  const handlePrint = () => {
    window.print();
  };

  const certificateCode = currentUser.certificateCode || 'CERT-PERU-2026-90058-8831';
  const issueDate = currentUser.certificateDate || new Date().toLocaleDateString('es-PE');
  const score = currentUser.evaluationScore || 18;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Action Header (hidden in print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs print:hidden">
        <div>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 mb-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a mi Dashboard</span>
          </button>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Constancia Oficial de Capacitación
          </h1>
          <p className="text-xs text-slate-500">
            Acreditación conforme a la Ley N° 1278 y la Norma Técnica Peruana NTP 900.058:2019.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Guardar PDF</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>DESCARGAR CERTIFICADO</span>
          </button>
        </div>
      </div>

      {/* Printable Certificate Frame */}
      <div 
        id="printable-certificate"
        className="bg-white rounded-3xl border-8 border-slate-900 p-8 sm:p-14 shadow-2xl relative overflow-hidden text-slate-900 space-y-8"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.03) 0%, rgba(255, 255, 255, 1) 100%)'
        }}
      >
        {/* Ornate corner brackets */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-emerald-700"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-emerald-700"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-emerald-700"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-emerald-700"></div>

        {/* Certificate Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b-2 border-slate-200 pb-6 gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center font-black text-xl shadow-sm">
              E360
            </div>
            <div>
              <p className="text-xs font-black tracking-widest text-slate-500 uppercase">
                {company.name}
              </p>
              <h3 className="text-base font-extrabold text-slate-900">
                SISTEMA DE GESTIÓN AMBIENTAL & SSOMA
              </h3>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              CERTIFICACIÓN OFICIAL VÁLIDA
            </span>
            <p className="text-[11px] font-mono text-slate-500 mt-1">
              Registro: {certificateCode}
            </p>
          </div>
        </div>

        {/* Certificate Core Body */}
        <div className="text-center space-y-6 max-w-3xl mx-auto py-4">
          
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Otorga la presente constancia de aprobación a:
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif italic py-2">
              {currentUser.name}
            </h2>
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-600">
              <span>{currentUser.position}</span>
              <span>·</span>
              <span>Área de {currentUser.area}</span>
              <span>·</span>
              <span>{currentUser.headquarters}</span>
            </div>
          </div>

          <div className="space-y-2 max-w-2xl mx-auto text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              Por haber completado y aprobado satisfactoriamente el programa de entrenamiento técnico corporativo en:
            </p>
            <p className="text-base sm:text-lg font-black text-slate-900 leading-snug">
              “Segregación Adecuada de Residuos Sólidos en el Ámbito No Municipal conforme a la Norma Técnica Peruana NTP 900.058:2019”
            </p>
            <p className="text-xs text-slate-500 pt-1">
              Con un desempeño sobresaliente equivalente a una calificación aprobatoria de <strong className="text-slate-900 font-bold">{score}/20 ({Math.round((score/20)*100)}%)</strong>, acreditando competencias en identificación de residuos, código de colores para 7 contenedores y prevención de contaminación cruzada.
            </p>
          </div>

          {/* 7-Container color strip for authentication */}
          <div className="flex items-center justify-center gap-1.5 pt-2">
            {[
              { name: 'AZUL', hex: '#2563EB' },
              { name: 'BLANCO', hex: '#F1F5F9', border: true },
              { name: 'AMARILLO', hex: '#EAB308' },
              { name: 'MARRÓN', hex: '#854D0E' },
              { name: 'PLOMO', hex: '#64748B' },
              { name: 'ROJO', hex: '#DC2626' },
              { name: 'NEGRO', hex: '#1E293B' },
            ].map(b => (
              <div 
                key={b.name}
                className="w-7 h-2 rounded-xs"
                style={{ 
                  backgroundColor: b.hex,
                  border: b.border ? '1px solid #94A3B8' : 'none'
                }}
                title={b.name}
              />
            ))}
          </div>

        </div>

        {/* Certificate Footer with QR & Signatures */}
        <div className="pt-8 border-t-2 border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center text-center">
          
          {/* Signatory 1: SSOMA */}
          <div className="space-y-1">
            <div className="w-36 h-0.5 bg-slate-400 mx-auto mb-2"></div>
            <p className="text-xs font-bold text-slate-900">Ing. Sofía Cárdenas Vega</p>
            <p className="text-[10px] text-slate-500">Jefatura SSOMA & Medio Ambiente</p>
            <p className="text-[9px] text-slate-400">{company.name}</p>
          </div>

          {/* Center Security QR Code */}
          <div className="flex flex-col items-center justify-center space-y-1.5">
            <div className="p-2 bg-slate-50 border border-slate-300 rounded-xl shadow-xs">
              {/* Authenticated SVG QR Pattern */}
              <svg className="w-20 h-20 text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                <rect x="0" y="0" width="30" height="30" rx="4" />
                <rect x="5" y="5" width="20" height="20" fill="white" rx="2" />
                <rect x="9" y="9" width="12" height="12" rx="1" />
                
                <rect x="70" y="0" width="30" height="30" rx="4" />
                <rect x="75" y="5" width="20" height="20" fill="white" rx="2" />
                <rect x="79" y="9" width="12" height="12" rx="1" />
                
                <rect x="0" y="70" width="30" height="30" rx="4" />
                <rect x="5" y="75" width="20" height="20" fill="white" rx="2" />
                <rect x="9" y="79" width="12" height="12" rx="1" />

                <rect x="40" y="10" width="8" height="8" />
                <rect x="52" y="18" width="8" height="8" />
                <rect x="40" y="35" width="8" height="8" />
                <rect x="48" y="48" width="12" height="12" />
                <rect x="70" y="45" width="8" height="8" />
                <rect x="85" y="55" width="8" height="8" />
                <rect x="35" y="75" width="8" height="8" />
                <rect x="50" y="80" width="8" height="8" />
                <rect x="75" y="75" width="8" height="8" />
                <rect x="85" y="85" width="8" height="8" />
              </svg>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-600">
              {certificateCode}
            </span>
            <span className="text-[9px] text-slate-400">
              Escanea para validar autenticidad
            </span>
          </div>

          {/* Signatory 2: General Management */}
          <div className="space-y-1">
            <div className="w-36 h-0.5 bg-slate-400 mx-auto mb-2"></div>
            <p className="text-xs font-bold text-slate-900">Roberto Vidal Solís</p>
            <p className="text-[10px] text-slate-500">Gerencia General / Operaciones</p>
            <p className="text-[9px] text-slate-400">Fecha de emisión: {issueDate}</p>
          </div>

        </div>

      </div>

    </div>
  );
};
