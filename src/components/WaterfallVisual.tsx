import React from 'react';
import { FlowThroughOutputs } from '../calculator/types';
import { BarChart3 } from 'lucide-react';

interface WaterfallVisualProps {
  outputs: FlowThroughOutputs;
}

export const WaterfallVisual: React.FC<WaterfallVisualProps> = ({ outputs }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(val);
  };

  const steps = [
    {
      label: '1. Gross Cheque',
      amount: outputs.purchaseAmount,
      type: 'neutral',
      color: 'bg-slate-600',
      desc: 'Subscription out of pocket'
    },
    {
      label: '2. Liquidity Return',
      amount: outputs.netCashProceeds,
      type: 'positive',
      color: 'bg-teal-500',
      desc: 'Cash returned ~5 days post-closing'
    },
    {
      label: '3. Net Cash Outlay',
      amount: outputs.netCashOutlay,
      type: 'warning',
      color: 'bg-amber-500',
      desc: 'Real net capital committed'
    },
    {
      label: '4. Net Tax Savings',
      amount: outputs.netTaxSavings2026,
      type: 'positive',
      color: 'bg-emerald-500',
      desc: 'Credits & deductions minus Cap Gains'
    },
    {
      label: '5. Year 1 Profit',
      amount: outputs.profit2026,
      type: 'profit',
      color: 'bg-emerald-400',
      desc: `${outputs.afterTaxReturn2026.toFixed(1)}% After-Tax Return (2026)`
    },
    {
      label: '6. Year 2 ITC Tax',
      amount: outputs.taxOnItcInclusion2027,
      type: 'negative',
      color: 'bg-rose-500',
      desc: 'Payable April 2028 if unsheltered'
    },
    {
      label: '7. Overall Profit',
      amount: outputs.overallProfit,
      type: 'final',
      color: 'bg-sky-400',
      desc: `${outputs.overallAfterTaxReturn.toFixed(1)}% Net Return (57% GIC Equiv)`
    }
  ];

  const maxVal = Math.max(...steps.map(s => s.amount));

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">Cash & Tax Savings Flow Visualizer</h2>
        </div>
        <span className="text-xs text-slate-400">Step-by-step capital flow</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 pt-2">
        {steps.map((step, idx) => {
          const heightPct = Math.max(20, Math.min(100, Math.round((step.amount / maxVal) * 100)));
          return (
            <div key={idx} className="bg-slate-900/80 border border-slate-700/70 rounded-xl p-3 flex flex-col justify-between hover:border-slate-500 transition-all">
              <div>
                <div className="text-[11px] font-semibold text-slate-400 truncate">{step.label}</div>
                <div className="text-sm font-bold font-mono text-white mt-1">
                  {formatCurrency(step.amount)}
                </div>
              </div>

              <div className="my-3 h-24 flex items-end justify-center bg-slate-950/60 rounded-lg p-1.5">
                <div 
                  className={`w-full rounded-md ${step.color} transition-all duration-500 shadow-sm`}
                  style={{ height: `${heightPct}%` }}
                />
              </div>

              <p className="text-[10px] text-slate-400 leading-tight">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
