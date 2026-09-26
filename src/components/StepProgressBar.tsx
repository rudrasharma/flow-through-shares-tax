import React from 'react';
import { User, DollarSign, CheckCircle2 } from 'lucide-react';

interface StepProgressBarProps {
  currentStep: 1 | 2 | 3;
  onStepClick: (step: 1 | 2 | 3) => void;
}

export const StepProgressBar: React.FC<StepProgressBarProps> = ({ currentStep, onStepClick }) => {
  const steps = [
    { num: 1 as const, title: 'Your Income', icon: User },
    { num: 2 as const, title: 'Investment Size', icon: DollarSign },
    { num: 3 as const, title: 'Your Net Return', icon: CheckCircle2 },
  ];

  return (
    <div className="w-full max-w-xl mx-auto mb-8 px-4">
      <div className="flex items-center justify-between relative">
        {/* Background track line */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 h-0.5 bg-slate-800 -z-0" />
        
        {/* Active track line */}
        <div 
          className="absolute top-1/2 left-0 -translate-y-1/2 h-0.5 bg-emerald-500 transition-all duration-500 -z-0"
          style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
        />

        {steps.map((s) => {
          const isCompleted = currentStep > s.num;
          const isActive = currentStep === s.num;
          const Icon = s.icon;

          return (
            <button
              key={s.num}
              type="button"
              onClick={() => onStepClick(s.num)}
              className="group flex flex-col items-center relative z-10 focus:outline-none"
            >
              <div 
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2 ${
                  isActive
                    ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-900/50 scale-110'
                    : isCompleted
                    ? 'bg-slate-900 border-emerald-500 text-emerald-400'
                    : 'bg-slate-900 border-slate-800 text-slate-500 group-hover:border-slate-700'
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>
              <span 
                className={`text-[11px] font-medium mt-1.5 transition-colors ${
                  isActive ? 'text-white font-semibold' : isCompleted ? 'text-emerald-400' : 'text-slate-500'
                }`}
              >
                {s.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
