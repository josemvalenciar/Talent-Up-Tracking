import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { DashboardKPIs } from './components/DashboardKPIs';
import { CourseList } from './components/CourseList';
import { NextActionCard } from './components/NextActionCard';
import { PomodoroWidget } from './components/PomodoroWidget';

export default function App() {
  const [completedModules, setCompletedModules] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('talentup-progress');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [notes, setNotes] = useState(() => {
    try {
      return localStorage.getItem('talentup-notes') || "";
    } catch (e) {
      return "";
    }
  });

  useEffect(() => {
    localStorage.setItem('talentup-progress', JSON.stringify(completedModules));
  }, [completedModules]);

  useEffect(() => {
    localStorage.setItem('talentup-notes', notes);
  }, [notes]);

  const toggleModule = (id: string) => {
    setCompletedModules(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans selection:bg-cyan-500/30 print:bg-white print:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 tracking-tight print:text-black print:bg-none print:!bg-clip-border print:!text-black">
              Talent Up Panamá
            </h1>
            <p className="text-gray-400 mt-1 print:text-gray-700">Ruta Cero - Sector Servicios Globales</p>
          </div>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm font-medium transition-colors print:hidden shadow-sm"
          >
            <Download className="w-4 h-4" />
            Guardar PDF / Imprimir
          </button>
        </header>

        <DashboardKPIs completedModules={completedModules} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-8 lg:col-start-1 space-y-8">
            <NextActionCard completedModules={completedModules} />
            
            <section className="print:block">
              <h2 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                Roadmap de Cursos
              </h2>
              <CourseList completedModules={completedModules} toggleModule={toggleModule} />
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8 print:hidden">
            <PomodoroWidget />
            
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg flex flex-col h-[400px]">
              <h3 className="font-semibold text-gray-200 mb-4">Notas Rápidas</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Escribe tus apuntes aquí... (Se guardan automáticamente)"
                className="flex-1 w-full bg-gray-900 border border-gray-700 rounded-lg p-4 text-gray-300 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none resize-none transition-all placeholder:text-gray-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
