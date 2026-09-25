import React from 'react';
import { FlowThroughOutputs } from '../calculator/types';
import { Award, Percent, Wallet, ShieldCheck, AlertTriangle } from 'lucide-react';

interface MetricCardsProps {
  outputs: FlowThroughOutputs;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ outputs }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(val);
  };

  const isAmtTriggered = outputs.amt.isAmtTriggered;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Net Cash Outlay */}
      <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-600 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Real Cash Out of Pocket</span>
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
            <Wallet className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
            {formatCurrency(outputs.netCashOutlay)}
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Initial cheque minus {formatCurrency(outputs.netCashProceeds)} returned ~5 days later
          </p>
        </div>
      </div>

      {/* 2. Year 1 (2026) After-Tax Return */}
      <div className="bg-gradient-to-br from-slate-800/95 to-emerald-950/40 border border-emerald-500/40 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-emerald-400 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Year 1 Net Profit & Return</span>
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <TrendingUpIcon className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tracking-tight">
              {outputs.afterTaxReturn2026.toFixed(1)}%
            </span>
            <span className="text-sm font-semibold text-emerald-300 font-mono">
              (+{formatCurrency(outputs.profit2026)})
            </span>
          </div>
          <div className="mt-1.5 flex items-center gap-1.5">
            {!isAmtTriggered ? (
              <span className="inline-flex items-center text-[10px] font-semibold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                <ShieldCheck className="w-3 h-3 mr-1 text-emerald-400" /> 100% Tax Refund Safe (No AMT)
              </span>
            ) : (
              <span className="inline-flex items-center text-[10px] font-semibold text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-500/30">
                <AlertTriangle className="w-3 h-3 mr-1 text-amber-400" /> AMT Triggered ({formatCurrency(outputs.amt.additionalAmtPayable)})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 3. Overall Return (If program not repeated in 2027) */}
      <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-600 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Final Net Return (Exit Year 2)</span>
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
            <Award className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-teal-300 font-mono tracking-tight">
              {outputs.overallAfterTaxReturn.toFixed(1)}%
            </span>
            <span className="text-sm font-semibold text-slate-300 font-mono">
              (+{formatCurrency(outputs.overallProfit)})
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Net profit locked in after Year 2 tax on the federal credit
          </p>
        </div>
      </div>

      {/* 4. Equivalent Pre-Tax GIC Yield */}
      <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-600 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Guaranteed GIC Equivalent</span>
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20">
            <Percent className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-extrabold text-sky-300 font-mono tracking-tight">
            {outputs.equivalentGicReturn.toFixed(1)}%
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Pre-tax bank interest rate needed to match this after-tax return
          </p>
        </div>
      </div>
    </div>
  );
};

const TrendingUpIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);
