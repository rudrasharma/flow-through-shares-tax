import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp, ShieldCheck, Sparkles, WalletCards } from 'lucide-react';

export const ExplainerBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-emerald-500/30 rounded-2xl p-5 shadow-xl relative overflow-hidden">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>New to Flow-Through Shares? Here's How the Tax Math Works</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                100% CRA-Sanctioned
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Why the Canadian government gives high-income earners a 63.4% after-tax return
            </p>
          </div>
        </div>

        <button type="button" className="text-slate-400 hover:text-white p-1">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Step 1 */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600/30 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-500/40">
                  1
                </span>
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">
                You Fund Canadian Exploration
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                The federal government wants Canada to lead in green tech minerals (lithium, copper, nickel). To fund exploration, mining companies "flow through" their <strong>100% tax write-offs</strong> plus a <strong>30% federal cash tax credit</strong> to you.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-teal-600/30 text-teal-400 font-bold text-xs flex items-center justify-center border border-teal-500/40">
                  2
                </span>
                <ShieldCheck className="w-4 h-4 text-teal-400" />
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">
                You Sell the Stock Immediately
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                You do <strong>not</strong> hold volatile junior mining shares! On closing day, a pre-arranged institutional buyer buys the shares back at a discount. You receive <strong>~66.7% of your cash back in ~5 days</strong>, transferring all 4-month market risk to them.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-sky-600/30 text-sky-400 font-bold text-xs flex items-center justify-center border border-sky-500/40">
                  3
                </span>
                <WalletCards className="w-4 h-4 text-sky-400" />
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">
                You Keep Massive Tax Credits
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                At tax time in April, CRA gives you tax write-offs and tax credits against your salary/bonus that far exceed your net cash outlay, producing your <strong>63.4% Year 1 after-tax return</strong>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
