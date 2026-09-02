import React, { useState } from 'react';
import { COURSES } from '../data';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, BookOpen, Award } from 'lucide-react';
import { cn } from '../lib/utils';

interface CourseListProps {
  completedModules: Record<string, boolean>;
  toggleModule: (id: string) => void;
}

export function CourseList({ completedModules, toggleModule }: CourseListProps) {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(COURSES[0].id);

  return (
    <div className="space-y-4">
      {COURSES.map((course) => {
        const completedCount = course.modules.filter(m => completedModules[m.id]).length;
        const isCompleted = completedCount === course.modules.length;
        const isExpanded = expandedCourse === course.id;
        
        return (
          <div 
            key={course.id} 
            className={cn(
              "bg-gray-800 rounded-xl border overflow-hidden transition-colors print:bg-white print:border-gray-300 print:text-black print:mb-4 print:break-inside-avoid",
              isCompleted ? "border-green-500/30 print:border-green-600" : "border-gray-700",
              isExpanded ? "shadow-lg shadow-black/20 print:shadow-none" : ""
            )}
          >
            <button
              onClick={() => setExpandedCourse(isExpanded ? null : course.id)}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-800 hover:bg-gray-750 transition-colors print:bg-white"
            >
              <div className="flex items-center gap-4 text-left">
                <div className={cn(
                  "p-2 rounded-lg flex-shrink-0 print:border print:border-gray-200",
                  isCompleted ? "bg-green-500/10 text-green-400 print:text-green-700 print:bg-green-50" : "bg-gray-700 text-cyan-400 print:text-cyan-700 print:bg-cyan-50"
                )}>
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-100 print:text-black">{course.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-400 mt-1 print:text-gray-600">
                    <span>{course.provider}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-600 print:bg-gray-400"></span>
                    <span>{course.hours}h</span>
                    {course.badge && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-gray-600 print:bg-gray-400"></span>
                        <span className="flex items-center gap-1 text-cyan-400 print:text-cyan-700">
                          <Award className="w-3.5 h-3.5" />
                          {course.badge}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-medium text-gray-300 print:text-gray-800">
                    {completedCount} / {course.modules.length}
                  </span>
                  <div className="w-24 h-1.5 bg-gray-700 rounded-full mt-1 overflow-hidden print:bg-gray-200 print:border print:border-gray-300">
                    <div 
                      className={cn(
                        "h-full transition-all duration-500 rounded-full print:bg-black",
                        isCompleted ? "bg-green-400" : "bg-cyan-400"
                      )}
                      style={{ width: `${(completedCount / course.modules.length) * 100}%` }}
                    />
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 print:hidden" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 print:hidden" />
                )}
              </div>
            </button>
            
            {/* Force expand in print mode via CSS */}
            <div className={cn(
              "px-6 py-4 bg-gray-900/50 border-t border-gray-700 space-y-3 print:bg-white print:border-gray-200 print:block",
              isExpanded ? "block" : "hidden"
            )}>
              {course.modules.map(mod => {
                const isModCompleted = completedModules[mod.id];
                return (
                  <button
                    key={mod.id}
                    onClick={() => toggleModule(mod.id)}
                    className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors text-left group print:p-1"
                  >
                    <div className="mt-0.5">
                      {isModCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400 print:text-black" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors print:text-gray-400" />
                      )}
                    </div>
                    <span className={cn(
                      "font-medium transition-colors print:text-black",
                      isModCompleted ? "text-gray-400 line-through print:text-gray-600 print:no-underline" : "text-gray-200"
                    )}>
                      {mod.title} {isModCompleted && <span className="hidden print:inline text-xs font-normal text-gray-500">(Completado)</span>}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
