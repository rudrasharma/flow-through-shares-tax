import { useState } from 'react';
import { FlowThroughOutputs } from '../calculator/types';
import { CapitalTiedUpTimeline } from './CapitalTiedUpTimeline';
import { 
  CheckCircle2, 
  ChevronRight, 
  AlertTriangle, 
  HelpCircle, 
  Clock, 
  Coins, 
  FileText,
  RotateCcw,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface SimpleResultScreenProps {
  outputs: FlowThroughOutputs;
  onReset: () => void;
  onShowAdvanced: () => void;
}

export function SimpleResultScreen({ outputs, onReset, onShowAdvanced }: SimpleResultScreenProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const isAmtTriggered = outputs.amt.isAmtTriggered;
  const hasRetroactiveRefund = outputs.carryBackDetails && outputs.carryBackDetails.totalRetroactiveRefund > 0;

  const faqs = [
    {
      q: "Do I take any stock market or junior mining risk?",
      a: "No. In this liquidity-backed format, you do not hold the junior mining shares. A pre-arranged institutional buyer contractually agrees to purchase the shares from you immediately at closing. You receive your cash back in ~5 business days."
    },
    {
      q: "Where does the profit come from?",
      a: "Tax arbitrage. You get a 100% deduction against your high-bracket income (taxed up to 54%). When you immediately sell the shares, the sale is taxed as a capital gain (which is only 50% taxable, effectively ~27%). You pocket the difference between your ordinary income tax savings and the capital gains tax payable."
    },
    {
      q: "What is the catch with the Year 2 tax credit inclusion?",
      a: "The federal government provides a 30% Critical Mineral exploration tax credit this year. However, under CRA rules, you must add that credit back to your taxable income in Year 2. Our 'Overall Profit' calculation already deducts this future tax, so your final return is 100% net of all taxes."
    },
    {
      q: "Is this CRA approved and legal?",
      a: "Yes. Flow-through shares were introduced by the Canadian government in the 1970s and are explicitly defined under sections 66(12.6) and 127(9) of the Income Tax Act to incentivize resource and critical mineral exploration across Canada."
    }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500 w-full">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 text-emerald-400 rounded-full mb-2 ring-1 ring-emerald-500/30">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Your Investment Outcome</h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Here is your bottom line based on a <strong>{(outputs.combinedMarginalRate * 100).toFixed(1)}%</strong> marginal tax rate in <strong>{outputs.province}</strong>.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* AMT Notification if triggered */}
        {isAmtTriggered && (
          <div className="bg-amber-950/40 border-b border-amber-900/50 p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200 leading-relaxed">
              <span className="font-semibold text-amber-300">Alternative Minimum Tax (AMT) Triggered:</span> Because your deductions exceed typical limits, CRA calculates AMT for this year. Your final profit already accounts for this, and the additional ${Math.round(outputs.amt.additionalAmtPayable).toLocaleString()} can be carried forward up to 7 years to reduce future taxes.
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Top Big Result Highlight */}
          <div className="bg-gradient-to-br from-slate-950 via-slate-950 to-emerald-950/40 border border-emerald-500/30 rounded-2xl p-6 text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30 inline-block mb-2">
              Net After-Tax Profit
            </span>
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono">
              +${Math.round(outputs.overallProfit).toLocaleString()}
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-3 mt-3 text-xs text-slate-300">
              <span className="font-semibold text-emerald-400">
                {(outputs.overallAfterTaxReturn).toFixed(1)}% After-Tax Return
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">
                Equivalent to a <strong className="text-white">{(outputs.equivalentGicReturn).toFixed(1)}%</strong> pre-tax GIC
              </span>
            </div>
          </div>

          {/* 3-Step Cash Journey Flow */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Step-by-Step Cash & Tax Flow</span>
            </h4>

            <div className="space-y-3 text-sm">
              {/* 1. Initial Outlay */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-200">1. Purchase Flow-Through Shares</div>
                  <div className="text-xs text-slate-500">Initial investment outlay at closing</div>
                </div>
                <div className="text-base font-bold font-mono text-slate-200">
                  ${Math.round(outputs.purchaseAmount).toLocaleString()}
                </div>
              </div>

              {/* 2. Immediate Cash Back */}
              <div className="bg-slate-950 p-4 rounded-xl border border-blue-900/30 flex items-center justify-between">
                <div>
                  <div className="font-medium text-blue-300 flex items-center gap-1.5">
                    <Coins className="w-3.5 h-3.5" />
                    <span>2. Immediate Cash-Back (~5 Days)</span>
                  </div>
                  <div className="text-xs text-slate-400">Sale proceeds from liquidity provider (net of fees)</div>
                </div>
                <div className="text-base font-bold font-mono text-blue-400">
                  +${Math.round(outputs.netCashProceeds).toLocaleString()}
                </div>
              </div>

              {/* 3. Out-of-pocket cost */}
              <div className="bg-slate-950/40 px-4 py-2.5 rounded-lg border border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span>Your Out-of-Pocket Cost (before tax filing):</span>
                <span className="font-mono font-medium text-slate-300">
                  ${Math.round(outputs.netCashOutlay).toLocaleString()}
                </span>
              </div>

              {/* 4. Tax Savings */}
              <div className="bg-slate-950 p-4 rounded-xl border border-emerald-900/30 flex items-center justify-between">
                <div>
                  <div className="font-medium text-emerald-300 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>3. Net CRA Tax Savings (April Filing)</span>
                  </div>
                  <div className="text-xs text-slate-400">Deductions & 30% Critical Mineral credits minus capital gains tax</div>
                </div>
                <div className="text-base font-bold font-mono text-emerald-400">
                  +${Math.round(outputs.netTaxSavings2026).toLocaleString()}
                </div>
              </div>

              {/* 5. Retroactive refund if present */}
              {hasRetroactiveRefund && (
                <div className="bg-slate-950 p-4 rounded-xl border border-purple-900/30 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-purple-300">4. Retroactive Tax Cheque (Past 3 Years)</div>
                    <div className="text-xs text-slate-400">CRA refund from carrying back excess deductions</div>
                  </div>
                  <div className="text-base font-bold font-mono text-purple-400">
                    +${Math.round(outputs.carryBackDetails!.totalRetroactiveRefund).toLocaleString()}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions inside Card */}
        <div className="p-6 bg-slate-950/70 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start Over / New Scenario</span>
          </button>

          <button
            onClick={onShowAdvanced}
            className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 px-5 py-2.5 rounded-xl border border-slate-700 transition-all shadow-sm"
          >
            <span>Show the Math & Tax Details</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Capital At Risk / Tied Up Duration Timeline */}
      <CapitalTiedUpTimeline outputs={outputs} />

      {/* Plain-English FAQ Accordion inspired by Mark McGrath's thread */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-white font-semibold text-sm">
          <HelpCircle className="w-4 h-4 text-emerald-400" />
          <span>Frequently Asked Questions for First-Time Buyers</span>
        </div>

        <div className="divide-y divide-slate-800">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-3">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left flex items-center justify-between gap-2 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-3.5 h-3.5 shrink-0 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 shrink-0 text-slate-400" />}
                </button>
                {isOpen && (
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed pr-4 animate-in fade-in duration-200">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
