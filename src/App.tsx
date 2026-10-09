/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';

import { HeroView } from './components/views/HeroView';
import { LoginView } from './components/views/LoginView';
import { WorkerDashboardView } from './components/views/WorkerDashboardView';
import { LearnModuleView } from './components/views/LearnModuleView';
import { SortModuleView } from './components/views/SortModuleView';
import { QuickChallengeView } from './components/views/QuickChallengeView';
import { WorkplaceScenariosView } from './components/views/WorkplaceScenariosView';
import { WhereDoIDumpItView } from './components/views/WhereDoIDumpItView';
import { EvaluationView } from './components/views/EvaluationView';
import { AchievementsView } from './components/views/AchievementsView';
import { CertificateView } from './components/views/CertificateView';
import { EnvironmentalDashboardView } from './components/views/EnvironmentalDashboardView';
import { AdminManagementView } from './components/views/AdminManagementView';
import { VisionAiSimulatorView } from './components/views/VisionAiSimulatorView';
import { Recycle, ShieldCheck, Heart } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, setCurrentView, company } = useApp();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'inicio':
        return <HeroView />;
      case 'login':
        return <LoginView />;
      case 'dashboard':
        return <WorkerDashboardView />;
      case 'aprender':
        return <LearnModuleView />;
      case 'clasificar':
        return <SortModuleView />;
      case 'reto':
        return <QuickChallengeView />;
      case 'escenarios':
        return <WorkplaceScenariosView />;
      case 'donde-lo-boto':
        return <WhereDoIDumpItView />;
      case 'evaluacion':
      case 'resultados':
        return <EvaluationView />;
      case 'logros':
        return <AchievementsView />;
      case 'certificado':
        return <CertificateView />;
      case 'dashboard-ambiental':
        return <EnvironmentalDashboardView />;
      case 'administracion':
        return <AdminManagementView />;
      case 'vision-ai':
        return <VisionAiSimulatorView />;
      default:
        return <HeroView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Navbar */}
      <Navbar />

      {/* Main View Area */}
      <main className="flex-1 pb-20 md:pb-12">
        {renderCurrentView()}
      </main>

      {/* Corporate Environmental Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              <Recycle className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-900">EcoSort 360</span>
            <span>·</span>
            <span>Normativa Peruana NTP 900.058:2019</span>
            <span>·</span>
            <span className="font-semibold text-slate-700">{company.name}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button 
              onClick={() => setCurrentView('aprender')}
              className="hover:text-slate-900"
            >
              Los 7 Contenedores
            </button>
            <button 
              onClick={() => setCurrentView('evaluacion')}
              className="hover:text-slate-900"
            >
              Evaluación Oficial
            </button>
            <button 
              onClick={() => setCurrentView('dashboard-ambiental')}
              className="hover:text-slate-900"
            >
              Métricas SSOMA
            </button>
            <button 
              onClick={() => setCurrentView('administracion')}
              className="hover:text-slate-900"
            >
              Administración
            </button>
          </div>
        </div>
      </footer>

      {/* Mobile Fixed Bottom Nav */}
      <MobileNav />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
