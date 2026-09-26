import React from 'react';
import { FlowThroughOutputs } from '../calculator/types';
import { Clock, ShieldCheck, CheckCircle2, DollarSign, ArrowRight, AlertCircle } from 'lucide-react';

interface CapitalTiedUpTimelineProps {
  outputs: FlowThroughOutputs;
}

export const CapitalTiedUpTimeline: React.FC<CapitalTiedUpTimelineProps> = ({ outputs }) => {
  const purchase = Math.round(outputs.purchaseAmount);
  const netProceeds = Math.round(outputs.netCashProceeds);
  const netFloat = Math.round(outputs.netCashOutlay);
  const year1CashProfit = Math.round(outputs.profit2026);
  const overallProfit = Math.round(outputs.overallProfit);
  const year2Tax = Math.round(outputs.taxOnItcInclusion2027);
  const floatPercent = ((outputs.netCashOutlay / outputs.purchaseAmount) * 100).toFixed(0);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">How Long Is Your Cash Tied Up?</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Your full investment is only locked for 5 business days, not years.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-semibold self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Full capital returned by Spring</span>
        </div>
      </div>

      {/* Visual Timeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
        {/* Phase 1 */}
        <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between relative group hover:border-slate-700 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                Phase 1: ~5 Days
              </span>
              <span className="text-xs font-mono text-slate-500">Day 1 – 5</span>
            </div>

            <div>
              <div className="text-xs text-slate-400 font-medium">100% Capital Tied Up</div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mt-1">
                ${purchase.toLocaleString()}
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              You wire the subscription amount to buy the shares. The shares are issued and immediately sold to the pre-arranged liquidity buyer.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 text-slate-400">
              <DollarSign className="w-3.5 h-3.5 text-amber-400" />
              Full investment wire
            </span>
            <ArrowRight className="w-4 h-4 text-slate-600 hidden md:block -mr-2" />
          </div>
        </div>

        {/* Phase 2 */}
        <div className="bg-slate-950 rounded-2xl p-5 border border-blue-900/40 flex flex-col justify-between relative group hover:border-blue-700/60 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                Phase 2: 4–5 Months
              </span>
              <span className="text-xs font-mono text-slate-500">Nov – April</span>
            </div>

            <div>
              <div className="text-xs text-slate-400 font-medium">Only ~{floatPercent}% Tied Up</div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-400 mt-1">
                ${netFloat.toLocaleString()}
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              On <strong>Day 5</strong>, the liquidity buyer deposits <strong>${netProceeds.toLocaleString()}</strong> back to you. Only the remaining ${netFloat.toLocaleString()} is out-of-pocket until tax time.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 text-blue-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              +${netProceeds.toLocaleString()} back Day 5
            </span>
            <ArrowRight className="w-4 h-4 text-slate-600 hidden md:block -mr-2" />
          </div>
        </div>

        {/* Phase 3 */}
        <div className="bg-gradient-to-b from-slate-950 to-emerald-950/30 rounded-2xl p-5 border border-emerald-500/30 flex flex-col justify-between relative group hover:border-emerald-500/50 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                Phase 3: Spring Filing
              </span>
              <span className="text-xs font-mono text-emerald-400">April / May</span>
            </div>

            <div>
              <div className="text-xs text-emerald-400/90 font-medium">$0 Tied Up • In Bank Account</div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 mt-1">
                +${year1CashProfit.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Year 1 Cash Profit received at tax filing
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Subsequent Year Tax*:</span>
                <span className="font-mono text-rose-400">-${year2Tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center font-semibold pt-1 border-t border-slate-800 text-emerald-300">
                <span>Final Guaranteed Profit:</span>
                <span className="font-mono">+${overallProfit.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-slate-500 pt-0.5 leading-tight">
                *The ${year2Tax.toLocaleString()} tax on the 30% credit can be fully sheltered if you roll over into new shares next year.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-900/80 flex items-center justify-between text-xs font-medium text-emerald-400">
            <span>Capital returned + gain</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Summary Reassurance Bar */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-slate-300">
        <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Key Takeaway:</strong> Unlike traditional private equity or lock-in real estate, <strong>over half your investment (${netProceeds.toLocaleString()}) returns to your account within 5 business days</strong>. You only carry an out-of-pocket float of ${netFloat.toLocaleString()} through the winter until CRA tax filing in the spring.
        </p>
      </div>
    </div>
  );
};
