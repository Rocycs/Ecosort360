import React from 'react';
import { useApp, AppView } from '../../context/AppContext';
import { 
  Home, 
  BookOpen, 
  CheckCircle2, 
  Zap, 
  Award, 
  User 
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { currentView, setCurrentView } = useApp();

  const items: { view: AppView; label: string; icon: React.ReactNode }[] = [
    { view: 'inicio', label: 'Inicio', icon: <Home className="w-5 h-5" /> },
    { view: 'aprender', label: 'Aprender', icon: <BookOpen className="w-5 h-5" /> },
    { view: 'clasificar', label: 'Clasificar', icon: <CheckCircle2 className="w-5 h-5" /> },
    { view: 'reto', label: 'Reto', icon: <Zap className="w-5 h-5" /> },
    { view: 'evaluacion', label: 'Examen', icon: <Award className="w-5 h-5" /> },
    { view: 'dashboard', label: 'Perfil', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 safe-area-inset-bottom">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const isActive = currentView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => setCurrentView(item.view)}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all ${
                isActive 
                  ? 'text-emerald-700 font-bold scale-105' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-emerald-50 text-emerald-700' : ''}`}>
                {item.icon}
              </div>
              <span className="text-[10px] mt-0.5 leading-none">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
