import React, { useState } from 'react';
import { useApp, AppView } from '../../context/AppContext';
import { 
  Recycle, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  Award, 
  BarChart3, 
  Settings, 
  User, 
  LogOut, 
  Zap, 
  Building2,
  ChevronDown,
  Layers,
  Sparkles,
  Search
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    currentUser, 
    company, 
    users, 
    switchUserRole,
    setSearchWasteQuery
  } = useApp();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'responsable_ambiental': return 'Resp. Ambiental (SSOMA)';
      case 'supervisor': return 'Supervisor';
      default: return 'Trabajador';
    }
  };

  const navLinks: { view: AppView; label: string; icon: React.ReactNode }[] = [
    { view: 'inicio', label: 'Inicio', icon: <Recycle className="w-4 h-4" /> },
    { view: 'aprender', label: 'Aprender', icon: <BookOpen className="w-4 h-4" /> },
    { view: 'clasificar', label: 'Clasificar', icon: <CheckCircle2 className="w-4 h-4" /> },
    { view: 'reto', label: 'Reto Rápido', icon: <Zap className="w-4 h-4" /> },
    { view: 'escenarios', label: 'Escenarios', icon: <Layers className="w-4 h-4" /> },
    { view: 'donde-lo-boto', label: '¿Dónde lo boto?', icon: <Search className="w-4 h-4" /> },
    { view: 'evaluacion', label: 'Evaluación', icon: <Award className="w-4 h-4" /> },
    { view: 'dashboard-ambiental', label: 'Dashboard Ambiental', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Zone 1: Brand Wordmark & Company Context */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setCurrentView('inicio')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
                <Recycle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  EcoSort<span className="text-emerald-600">360</span>
                </span>
                <span className="block text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                  NTP 900.058:2019
                </span>
              </div>
            </button>

            {/* Company Tag */}
            <div className="hidden lg:flex items-center gap-1.5 pl-3 border-l border-slate-200 text-xs text-slate-600">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-700 truncate max-w-[150px]">{company.shortName}</span>
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => {
                    if (item.view === 'donde-lo-boto') setSearchWasteQuery('');
                    setCurrentView(item.view);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: User Role Switcher & Action Center */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Quick XP Pill */}
            <button
              onClick={() => setCurrentView('logros')}
              title="Ver mis logros y puntos XP"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/80 rounded-lg hover:bg-amber-100 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span className="tabular-nums">{currentUser.pointsXP} XP</span>
            </button>

            {/* Role / User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-left"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden md:block">
                  <p className="text-xs font-bold text-slate-800 leading-none truncate max-w-[120px]">
                    {currentUser.name.split(' ')[0]}
                  </p>
                  <p className="text-[10px] text-slate-500 leading-none mt-0.5 truncate max-w-[120px]">
                    {getRoleLabel(currentUser.role)}
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-800">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    <div className="mt-1 flex items-center gap-2 text-[10px] text-emerald-700 font-medium">
                      <span>{currentUser.area}</span>
                      <span>·</span>
                      <span>Nivel {currentUser.level}</span>
                    </div>
                  </div>

                  {/* Switch user demo */}
                  <div className="px-3 py-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">
                      Cambiar rol (Demostración)
                    </p>
                    <div className="space-y-1">
                      {users.slice(0, 4).map((u) => (
                        <button
                          key={u.id}
                          onClick={() => {
                            switchUserRole(u.id);
                            setRoleMenuOpen(false);
                          }}
                          className={`w-full text-left px-2 py-1.5 text-xs rounded-lg flex items-center justify-between ${
                            u.id === currentUser.id 
                              ? 'bg-emerald-50 text-emerald-800 font-semibold' 
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <div>
                            <p className="leading-tight">{u.name}</p>
                            <p className="text-[10px] text-slate-400">{getRoleLabel(u.role)} · {u.area}</p>
                          </div>
                          {u.id === currentUser.id && (
                            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-100 px-2 pt-1">
                    <button
                      onClick={() => {
                        setCurrentView('dashboard');
                        setRoleMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      Mi Dashboard de Trabajador
                    </button>
                    {(currentUser.role === 'admin' || currentUser.role === 'responsable_ambiental') && (
                      <button
                        onClick={() => {
                          setCurrentView('administracion');
                          setRoleMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                      >
                        <Settings className="w-4 h-4 text-slate-400" />
                        Panel de Administración
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setCurrentView('login');
                        setRoleMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <LogOut className="w-4 h-4" />
                      Cerrar sesión / Cambiar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile burger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Abrir menú"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className="w-full h-0.5 bg-slate-700 rounded-full"></span>
                <span className="w-full h-0.5 bg-slate-700 rounded-full"></span>
                <span className="w-full h-0.5 bg-slate-700 rounded-full"></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile dropdown navigation */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-3 border-t border-slate-200 grid grid-cols-2 gap-1.5 animate-in slide-in-from-top-2">
            {navLinks.map((item) => (
              <button
                key={item.view}
                onClick={() => {
                  setCurrentView(item.view);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg text-left ${
                  currentView === item.view
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
            <button
              onClick={() => {
                setCurrentView('dashboard');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-50"
            >
              <User className="w-4 h-4" />
              <span>Mi Perfil</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('administracion');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-50"
            >
              <Settings className="w-4 h-4" />
              <span>Admin</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
