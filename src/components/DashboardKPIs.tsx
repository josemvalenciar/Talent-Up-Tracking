import React from 'react';
import { TOTAL_HOURS, TOTAL_MODULES, DEADLINE, COURSES } from '../data';
import { Calendar, Clock, Target } from 'lucide-react';

interface DashboardKPIsProps {
  completedModules: Record<string, boolean>;
}

export function DashboardKPIs({ completedModules }: DashboardKPIsProps) {
  const completedCount = Object.values(completedModules).filter(Boolean).length;
  
  const completedHours = COURSES.reduce((sum, course) => {
    const courseCompleted = course.modules.filter(m => completedModules[m.id]).length;
    // Assuming partial completion gives proportional hours, or we could only count fully completed courses.
    // The prompt says "horas completadas vs Total". Let's do proportional.
    const propHours = (courseCompleted / course.modules.length) * course.hours;
    return sum + propHours;
  }, 0);

  const progressPercent = (completedCount / TOTAL_MODULES) * 100;
  
  const daysRemaining = Math.ceil((DEADLINE.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 print:grid-cols-3 print:gap-4 print:mb-6">
      {/* Progress KPI */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 flex items-center gap-4 shadow-lg print:bg-white print:border-gray-300 print:shadow-none print:p-4">
        <div className="p-4 bg-cyan-500/10 rounded-full print:bg-transparent print:p-2 print:border print:border-cyan-200">
          <Target className="w-8 h-8 text-cyan-400 print:text-cyan-600" />
        </div>
        <div className="flex-1">
          <p className="text-gray-400 text-sm font-medium mb-1 print:text-gray-600">Progreso General</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-bold text-gray-100 print:text-black">{Math.round(progressPercent)}%</h3>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full mt-3 overflow-hidden print:bg-gray-200 print:border print:border-gray-300">
            <div 
              className="h-full bg-cyan-400 transition-all duration-1000 ease-out rounded-full print:bg-black"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Hours KPI */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 flex items-center gap-4 shadow-lg print:bg-white print:border-gray-300 print:shadow-none print:p-4">
        <div className="p-4 bg-green-500/10 rounded-full print:bg-transparent print:p-2 print:border print:border-green-200">
          <Clock className="w-8 h-8 text-green-400 print:text-green-600" />
        </div>
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1 print:text-gray-600">Horas Completadas</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-gray-100 print:text-black">{Math.round(completedHours)}</h3>
            <span className="text-gray-400 font-medium print:text-gray-600">/ {TOTAL_HOURS}h</span>
          </div>
        </div>
      </div>

      {/* Deadline KPI */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 flex items-center gap-4 shadow-lg print:bg-white print:border-gray-300 print:shadow-none print:p-4">
        <div className="p-4 bg-purple-500/10 rounded-full print:bg-transparent print:p-2 print:border print:border-purple-200">
          <Calendar className="w-8 h-8 text-purple-400 print:text-purple-600" />
        </div>
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1 print:text-gray-600">Días Restantes</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-gray-100 print:text-black">{Math.max(0, daysRemaining)}</h3>
            <span className="text-gray-400 font-medium print:text-gray-600">días</span>
          </div>
          <p className="text-xs text-gray-500 mt-1 print:text-gray-500">15 Oct 2026</p>
        </div>
      </div>
    </div>
  );
}
