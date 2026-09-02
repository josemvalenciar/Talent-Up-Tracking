import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

export function PomodoroWidget() {
  const STUDY_TIME = 35 * 60;
  const BREAK_TIME = 10 * 60;
  
  const [timeLeft, setTimeLeft] = useState(STUDY_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'study' | 'break'>('study');
  
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            playNotificationSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const playNotificationSound = () => {
    // A simple beep sound using AudioContext
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
      console.warn("Audio not supported or permitted");
    }
  };

  const toggleTimer = () => setIsRunning(!isRunning);
  
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'study' ? STUDY_TIME : BREAK_TIME);
  };
  
  const toggleMode = (newMode: 'study' | 'break') => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(newMode === 'study' ? STUDY_TIME : BREAK_TIME);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 shadow-lg flex flex-col items-center print:hidden">
      <div className="flex items-center gap-2 mb-4 text-cyan-400">
        <Clock className="w-5 h-5" />
        <h3 className="font-semibold text-gray-200">Pomodoro</h3>
      </div>
      
      <div className="flex gap-2 mb-4 bg-gray-900 rounded-full p-1">
        <button
          onClick={() => toggleMode('study')}
          className={cn(
            "px-3 py-1 rounded-full text-sm font-medium transition-colors",
            mode === 'study' ? "bg-cyan-500/20 text-cyan-400" : "text-gray-400 hover:text-gray-200"
          )}
        >
          Estudio (35m)
        </button>
        <button
          onClick={() => toggleMode('break')}
          className={cn(
            "px-3 py-1 rounded-full text-sm font-medium transition-colors",
            mode === 'break' ? "bg-green-500/20 text-green-400" : "text-gray-400 hover:text-gray-200"
          )}
        >
          Descanso (10m)
        </button>
      </div>

      <div className={cn(
        "text-4xl font-bold mb-6 font-mono",
        mode === 'study' ? "text-cyan-400" : "text-green-400"
      )}>
        {formatTime(timeLeft)}
      </div>

      <div className="flex gap-3">
        <button
          onClick={toggleTimer}
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-full transition-colors",
            isRunning 
              ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" 
              : "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30"
          )}
        >
          {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
        </button>
        <button
          onClick={resetTimer}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
