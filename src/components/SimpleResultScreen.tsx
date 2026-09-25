import { FlowThroughOutputs } from '../calculator/types';
import { ArrowDownRight, CheckCircle2, ChevronRight, AlertTriangle, History } from 'lucide-react';

interface SimpleResultScreenProps {
  outputs: FlowThroughOutputs;
  onReset: () => void;
  onShowAdvanced: () => void;
}

export function SimpleResultScreen({ outputs, onReset, onShowAdvanced }: SimpleResultScreenProps) {
  const isAmtTriggered = outputs.amt.isAmtTriggered;
  const hasRetroactiveRefund = outputs.carryBackDetails && outputs.carryBackDetails.totalRetroactiveRefund > 0;

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500 w-full">
      
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-3 bg-emerald-500/20 text-emerald-400 rounded-full mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight text-white">Your Flow-Through Result</h2>
        <p className="text-slate-400 text-lg">Here is the bottom line on your investment.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        {isAmtTriggered && !hasRetroactiveRefund && (
          <div className="bg-amber-950/40 border-b border-amber-900/50 p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-200">
              <span className="font-semibold text-amber-400">AMT Triggered:</span> Your tax deductions are so high they triggered the Alternative Minimum Tax. Your final profit accounts for this, but some tax savings are delayed to future years.
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8 space-y-8">
          {/* 1. Investment */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-slate-400 font-medium mb-1">1. You Invest</div>
              <div className="text-slate-500 text-sm">Initial purchase amount</div>
            </div>
            <div className="text-2xl font-bold text-white">
              ${Math.round(outputs.purchaseAmount).toLocaleString()}
            </div>
          </div>

          {/* Flow visual */}
          <div className="relative pl-4 ml-2 border-l-2 border-slate-800 space-y-6 py-2">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center -ml-8 ring-8 ring-slate-900">
                  <ArrowDownRight className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="text-emerald-400 font-medium">Tax Savings (2026)</div>
                  <div className="text-slate-500 text-sm text-left">Reduces this year's tax bill</div>
                </div>
              </div>
              <div className="text-lg font-semibold text-emerald-400">
                -${Math.round(outputs.netTaxSavings2026).toLocaleString()}
              </div>
            </div>

            {hasRetroactiveRefund && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center -ml-8 ring-8 ring-slate-900">
                    <History className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-blue-400 font-medium">Retroactive Refund</div>
                    <div className="text-slate-500 text-sm text-left">Cheque from CRA for past taxes</div>
                  </div>
                </div>
                <div className="text-lg font-semibold text-blue-400">
                  -${Math.round(outputs.carryBackDetails!.totalRetroactiveRefund).toLocaleString()}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center -ml-8 ring-8 ring-slate-900">
                  <ArrowDownRight className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-blue-400 font-medium">Liquidity Sale</div>
                  <div className="text-slate-500 text-sm text-left">Cash back from selling shares</div>
                </div>
              </div>
              <div className="text-lg font-semibold text-blue-400">
                -${Math.round(outputs.netCashProceeds).toLocaleString()}
              </div>
            </div>
          </div>

          {/* 2. Net Outlay */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800">
            <div>
              <div className="text-slate-300 font-medium mb-1">2. Your True Net Cost</div>
              <div className="text-slate-500 text-sm">After all tax savings and liquidity</div>
            </div>
            <div className="text-2xl font-bold text-slate-300">
              ${Math.round(outputs.netCashOutlay - (outputs.carryBackDetails?.totalRetroactiveRefund || 0)).toLocaleString()}
            </div>
          </div>

          {/* 3. Profit */}
          <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex items-center justify-between mt-4">
            <div>
              <div className="text-emerald-400 font-bold text-lg mb-1">3. Your Final Profit</div>
              <div className="text-slate-400 text-sm">Net gain in your pocket</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-extrabold text-emerald-400">
                +${Math.round(outputs.profit2026).toLocaleString()}
              </div>
              <div className="text-emerald-500/80 text-sm font-medium mt-1">
                {(outputs.afterTaxReturn2026).toFixed(1)}% Return
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <button
          onClick={onReset}
          className="text-slate-400 hover:text-white font-medium px-4 py-2 transition-colors"
        >
          Start Over
        </button>

        <button
          onClick={onShowAdvanced}
          className="flex items-center gap-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-xl font-medium transition-all"
        >
          Show the Math <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
