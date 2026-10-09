import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Recycle, ShieldCheck, Building2, User, Key, ArrowRight, Check } from 'lucide-react';

export const LoginView: React.FC = () => {
  const { users, currentUser, switchUserRole, setCurrentView, company } = useApp();
  const [username, setUsername] = useState('carlos.mendoza');
  const [password, setPassword] = useState('demo1234');
  const [selectedUserId, setSelectedUserId] = useState(currentUser.id);

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    switchUserRole(selectedUserId);
    setCurrentView('dashboard');
  };

  const handleDemoQuickLogin = (userId: string) => {
    switchUserRole(userId);
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        
        {/* Brand Lockup */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white mx-auto shadow-md">
            <Recycle className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Acceso Corporativo <span className="text-emerald-700">EcoSort 360</span>
          </h2>
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <span>{company.name}</span>
            <span>·</span>
            <span className="text-emerald-700 font-semibold">NTP 900.058:2019</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
          
          <form onSubmit={handleCustomLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Usuario Corporativo
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ej. usuario@empresa.pe"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 pl-10"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 pl-10"
                />
                <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <span>Ingresar al Sistema</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Demo Access Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-slate-500 font-medium">O ingresa de inmediato</span>
            </div>
          </div>

          <button
            onClick={() => handleDemoQuickLogin('user-01')}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Continuar como usuario demo (Carlos Mendoza)</span>
          </button>

          {/* Fast Role Switcher */}
          <div className="pt-2">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Perfiles pre-configurados por Rol:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {users.slice(0, 4).map((u) => {
                const isSelected = selectedUserId === u.id;
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => {
                      setSelectedUserId(u.id);
                      handleDemoQuickLogin(u.id);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected 
                        ? 'border-emerald-500 bg-emerald-50/50' 
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                        {u.role === 'admin' ? 'Administrador' : u.role === 'responsable_ambiental' ? 'Resp. Ambiental' : u.role === 'supervisor' ? 'Supervisor' : 'Trabajador'}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    </div>
                    <p className="text-xs font-bold text-slate-800 truncate mt-0.5">{u.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{u.area}</p>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        <p className="text-center text-[11px] text-slate-500">
          Cumplimiento legal ambiental empresarial · Sistema multisede y multiárea
        </p>

      </div>
    </div>
  );
};
