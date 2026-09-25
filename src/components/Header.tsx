import React from 'react';
import { Calculator, Printer, RotateCcw, ShieldCheck, Eye, FileSpreadsheet } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  onPrint: () => void;
  viewMode: 'simple' | 'accountant';
  onViewModeChange: (mode: 'simple' | 'accountant') => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset, onPrint, viewMode, onViewModeChange }) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 shadow-lg backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-900/40">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-tight">Flow-Through Shares Calculator</h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-900/60 text-emerald-300 border border-emerald-500/30">
                <ShieldCheck className="w-3 h-3 mr-1" /> Canadian Tax Model
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Calculate net cash outlay, CEE & ITC tax credits, capital gains tax, and 2024 AMT
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          {/* Mode Switcher */}
          <div className="bg-slate-800 p-1 rounded-xl border border-slate-700 flex items-center">
            <button
              onClick={() => onViewModeChange('simple')}
              type="button"
              className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'simple'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5 mr-1" />
              Simple Investor View
            </button>
            <button
              onClick={() => onViewModeChange('accountant')}
              type="button"
              className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'accountant'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 mr-1" />
              Accountant View
            </button>
          </div>

          <button
            onClick={onReset}
            type="button"
            className="inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1 text-slate-400" />
            Reset
          </button>

          <button
            onClick={onPrint}
            type="button"
            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-900/30 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 mr-1" />
            Print / PDF
          </button>
        </div>
      </div>
    </header>
  );
};
