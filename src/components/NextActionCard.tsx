import React, { useState } from 'react';
import { Target, ChevronRight } from 'lucide-react';
import { COURSES } from '../data';
import { cn } from '../lib/utils';

interface NextActionCardProps {
  completedModules: Record<string, boolean>;
}

export function NextActionCard({ completedModules }: NextActionCardProps) {
  const [showNext, setShowNext] = useState(false);
  
  const getNextAction = () => {
    for (const course of COURSES) {
      for (const mod of course.modules) {
        if (!completedModules[mod.id]) {
          return { course, mod };
        }
      }
    }
    return null;
  };
  
  const nextAction = getNextAction();

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg mb-8 print:hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-500/10 rounded-lg">
            <Target className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-100">Sistema Anti-Parálisis</h2>
            <p className="text-gray-400 text-sm">¿No sabes por dónde empezar?</p>
          </div>
        </div>
        
        {!showNext ? (
          <button 
            onClick={() => setShowNext(true)}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg transition-colors shadow-lg shadow-cyan-500/20"
          >
            Siguiente Acción Recomendada
          </button>
        ) : (
          <div className="flex-1 max-w-lg w-full bg-gray-900 border border-cyan-500/30 rounded-lg p-4 animate-in fade-in slide-in-from-right-4 duration-300">
            {nextAction ? (
              <div>
                <p className="text-xs text-cyan-400 font-semibold mb-1 uppercase tracking-wider">Tu próximo objetivo:</p>
                <p className="text-gray-200 font-medium">{nextAction.course.title}</p>
                <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                  <ChevronRight className="w-4 h-4 text-green-400" />
                  <span>{nextAction.mod.title}</span>
                </div>
              </div>
            ) : (
              <div className="text-green-400 font-medium flex items-center gap-2">
                ¡Felicidades! Has completado todos los módulos.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
