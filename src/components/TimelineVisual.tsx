import React from 'react';
import { FlowThroughOutputs } from '../calculator/types';
import { Calendar, CheckCircle2, ArrowRight, DollarSign, Sparkles, TrendingUp } from 'lucide-react';

interface TimelineVisualProps {
  outputs: FlowThroughOutputs;
}

export const TimelineVisual: React.FC<TimelineVisualProps> = ({ outputs }) => {
  const formatCurrency = (val: number, negative: boolean = false) => {
    const formatted = new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(Math.abs(val));
    if (val < 0 || negative) return `(${formatted})`;
    return formatted;
  };

  const steps = [
    {
      timing: 'Day 1 (Closing Day)',
      title: 'Initial Subscription Cheque',
      amount: formatCurrency(outputs.purchaseAmount, true),
      amountClass: 'text-rose-400',
      badge: 'Out of Pocket',
      badgeClass: 'bg-rose-950/70 text-rose-300 border-rose-500/30',
      desc: 'You write a cheque to purchase flow-through shares in an eligible critical mineral project.',
      icon: DollarSign,
    },
    {
      timing: 'Day 5 (~5 Business Days)',
      title: 'Liquidity Cash-Back Deposit',
      amount: `+${formatCurrency(outputs.netCashProceeds)}`,
      amountClass: 'text-teal-400',
      badge: 'Cash Returned',
      badgeClass: 'bg-teal-950/70 text-teal-300 border-teal-500/30',
      desc: `Institutional liquidity provider buys your shares and deposits proceeds net of fees. Your real net capital at risk is now only ${formatCurrency(outputs.netCashOutlay)}.`,
      icon: CheckCircle2,
    },
    {
      timing: 'April 2027 (Tax Season)',
      title: 'CRA Tax Refund Received',
      amount: `+${formatCurrency(outputs.profit2026)}`,
      amountClass: 'text-emerald-400',
      badge: `${outputs.afterTaxReturn2026.toFixed(1)}% Year 1 Return`,
      badgeClass: 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40 font-bold',
      desc: `CRA processes your 100% CEE deduction and 30% federal tax credit, delivering a ${formatCurrency(outputs.netTaxSavings2026)} tax reduction. You are now in net profit.`,
      icon: Sparkles,
    },
    {
      timing: 'April 2028 (Subsequent Year)',
      title: 'ITC Income Tax (If Not Repeated)',
      amount: formatCurrency(outputs.overallProfit),
      amountClass: 'text-sky-300 font-bold',
      badge: `${outputs.overallAfterTaxReturn.toFixed(1)}% Final Return (57% GIC)`,
      badgeClass: 'bg-sky-950/80 text-sky-300 border-sky-500/30',
      desc: `Federal tax on Year 1 credit is payable (${formatCurrency(outputs.taxOnItcInclusion2027, true)}), unless you purchase new shares in 2027 to roll over and shelter it.`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">Your Real-World Cash Journey & Calendar Timeline</h2>
        </div>
        <span className="text-xs text-slate-400">When does money move?</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-4 flex flex-col justify-between hover:border-slate-500 transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-slate-400">{step.timing}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${step.badgeClass}`}>
                    {step.badge}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  {step.title}
                </h3>

                <div className={`text-xl font-black font-mono my-2 ${step.amountClass}`}>
                  {step.amount}
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                <span>Step {idx + 1} of 4</span>
                {idx < 3 && <ArrowRight className="w-3 h-3 text-slate-600" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
