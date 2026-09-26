import { useState } from 'react';
import { CalculatorInputs, ProvinceCode } from '../calculator/types';
import { ChevronDown, ChevronUp, Settings2, History, HelpCircle, Sparkles, Shield, ArrowRight, TrendingUp } from 'lucide-react';

interface WizardStepsProps {
  step: number;
  inputs: CalculatorInputs;
  onChange: (inputs: CalculatorInputs) => void;
  onNext: () => void;
  onBack: () => void;
}

export function WizardSteps({ step, inputs, onChange, onNext, onBack }: WizardStepsProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showExplainer, setShowExplainer] = useState(true);

  // Step 1: Income and Province
  if (step === 1) {
    return (
      <div className="max-w-xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
        {/* Mark McGrath-style Plain English Overview Card */}
        {showExplainer && (
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-900/40 rounded-2xl p-5 shadow-xl relative">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>How Flow-Through Shares Work (in 30 seconds)</span>
              </div>
              <button 
                onClick={() => setShowExplainer(false)}
                className="text-xs text-slate-500 hover:text-slate-300"
              >
                Dismiss
              </button>
            </div>
            
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Canadian resource companies explore for critical minerals. Because they have huge exploration expenses they can't use, <strong>the government lets them "flow through" the 100% tax deductions to you</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3 pt-3 border-t border-slate-800/80 text-xs">
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <span className="font-semibold text-emerald-300 block mb-0.5">1. Write-off Today</span>
                <span className="text-slate-400 text-[11px]">100% deduction against your high-tax employment income.</span>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <span className="font-semibold text-blue-300 block mb-0.5">2. Same-Day Exit</span>
                <span className="text-slate-400 text-[11px]">Pre-arranged liquidity provider buys your shares in ~5 days. Zero market holding risk.</span>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <span className="font-semibold text-purple-300 block mb-0.5">3. Tax Arbitrage</span>
                <span className="text-slate-400 text-[11px]">Deduct income at ~53%, pay the exit at 50% capital gains rate (~26%).</span>
              </div>
            </div>
          </div>
        )}

        <div className="text-center space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Let's find your tax bracket</h2>
          <p className="text-slate-400 text-sm">Flow-through shares are most effective for earners in top provincial tax brackets.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-slate-300">Estimated 2026 Annual Income</label>
              <span className="text-xs text-slate-500 font-mono">CAD</span>
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg">$</span>
              <input
                type="number"
                step="5000"
                value={inputs.estimatedIncome}
                onChange={(e) => onChange({ ...inputs, estimatedIncome: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-8 pr-4 text-white text-lg font-semibold focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              Include salary, bonus, corporate dividends, and realized capital gains.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Province of Residence</label>
            <select
              value={inputs.province}
              onChange={(e) => onChange({ ...inputs, province: e.target.value as ProvinceCode })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white text-base focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="ON">Ontario (Top rate 53.53% with surtax)</option>
              <option value="BC">British Columbia (Top rate 53.50%)</option>
              <option value="AB">Alberta (Top rate 48.00%)</option>
              <option value="QC">Quebec (Top rate 53.31%)</option>
              <option value="NS">Nova Scotia (Top rate 54.00%)</option>
              <option value="NB">New Brunswick (Top rate 52.50%)</option>
              <option value="MB">Manitoba (Top rate 50.40%)</option>
              <option value="SK">Saskatchewan (Top rate 47.50%)</option>
              <option value="PE">Prince Edward Island (Top rate 51.75%)</option>
              <option value="NL">Newfoundland & Labrador (Top rate 54.80%)</option>
            </select>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => onChange({ ...inputs, enableRetroactive: !inputs.enableRetroactive })}
                className="flex items-center gap-2 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                <History className="w-4 h-4" />
                <span>Optional: Retroactive Tax Recovery (Past 3 Years)</span>
                {inputs.enableRetroactive ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
            
            {inputs.enableRetroactive && (
              <div className="mt-4 space-y-4 p-4 bg-slate-950/60 rounded-xl border border-blue-900/30">
                <p className="text-xs text-slate-400 leading-relaxed">
                  If your flow-through deductions exceed your 2026 income, CRA allows you to carry back non-capital losses and ITCs up to 3 years to trigger a cash refund on past tax paid.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-500">2025 Income</label>
                    <input
                      type="number"
                      value={inputs.incomeYearMinus1 || ''}
                      placeholder="0"
                      onChange={(e) => onChange({ ...inputs, incomeYearMinus1: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-2.5 text-white text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-500">2024 Income</label>
                    <input
                      type="number"
                      value={inputs.incomeYearMinus2 || ''}
                      placeholder="0"
                      onChange={(e) => onChange({ ...inputs, incomeYearMinus2: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-2.5 text-white text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-500">2023 Income</label>
                    <input
                      type="number"
                      value={inputs.incomeYearMinus3 || ''}
                      placeholder="0"
                      onChange={(e) => onChange({ ...inputs, incomeYearMinus3: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-2.5 text-white text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onNext}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-emerald-900/30 transition-all text-base flex items-center justify-center gap-2 group"
        >
          <span>Next: Choose Investment Size</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    );
  }

  // Step 2: Investment Amount
  if (step === 2) {
    const presets = [25000, 50000, 105000, 200000];

    // Calculate smart recommended range based on estimated income
    const maxRecommended = Math.max(25000, Math.round((inputs.estimatedIncome * 0.40) / 5000) * 5000);
    const minRecommended = Math.max(15000, Math.round((inputs.estimatedIncome * 0.15) / 5000) * 5000);

    return (
      <div className="max-w-xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
        <div className="text-center space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">How much do you want to invest?</h2>
          <p className="text-slate-400 text-sm">Flow-through shares are purchased in lots and immediately sold for cash-back.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          {/* Smart Recommendation Banner */}
          <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-xl p-3 flex items-center gap-2.5 text-xs text-emerald-300">
            <TrendingUp className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>
              For a <strong>${inputs.estimatedIncome.toLocaleString()}</strong> income, a typical allocation is <strong>${minRecommended.toLocaleString()} – ${maxRecommended.toLocaleString()}</strong> to maximize deductions without triggering Alternative Minimum Tax (AMT).
            </span>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Quick Select</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {presets.map(amount => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => onChange({ ...inputs, purchaseAmount: amount })}
                  className={`py-3 px-3 rounded-xl border text-sm font-semibold transition-all ${
                    inputs.purchaseAmount === amount
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  ${(amount / 1000).toFixed(0)}k
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Or enter an exact amount:</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg">$</span>
              <input
                type="number"
                step="1000"
                value={inputs.purchaseAmount}
                onChange={(e) => onChange({ ...inputs, purchaseAmount: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-8 pr-4 text-white text-xl font-bold focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-mono"
              />
            </div>
          </div>

          {/* Zero Market Risk Explainer Box */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-400">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p>
              <strong>Zero Holding Risk:</strong> These shares are paired with an immediate liquidity contract. You do not hold junior mining stocks or take junior mining price volatility.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>Advanced Deal Terms (Liquidity Discount & Fees)</span>
              {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            
            {showAdvanced && (
              <div className="mt-4 space-y-4 p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs">
                {/* Liquidity Factor */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <label className="block text-xs font-medium text-slate-400">
                        Liquidity Factor
                      </label>
                      <div className="relative group">
                        <button
                          type="button"
                          className="text-slate-500 hover:text-slate-300 focus:outline-none"
                          aria-label="Liquidity Factor Info"
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                        </button>
                        <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block group-focus-within:block w-64 p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-300 shadow-xl z-50 pointer-events-none">
                          <p className="font-semibold text-white mb-1">What is Liquidity Factor?</p>
                          <p>
                            Determines the price a liquidity provider pays for your shares:
                          </p>
                          <p className="mt-1 font-mono text-[11px] text-emerald-400 bg-slate-950 p-1 rounded">
                            Proceeds = Investment ÷ Factor
                          </p>
                          <p className="mt-1 text-[11px] text-slate-400">
                            A factor of <strong>1.50</strong> means you receive ~66.67% of the original purchase price back in cash immediately.
                          </p>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {((1 / (inputs.liquidityFactor ?? 1.50)) * 100).toFixed(1)}% cash back
                    </span>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    min="1.0"
                    value={inputs.liquidityFactor ?? 1.50}
                    onChange={(e) => onChange({ ...inputs, liquidityFactor: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white text-sm focus:ring-1 focus:ring-emerald-500 outline-none"
                  />
                  <p className="text-[10px] text-slate-500">
                    Gross Cash Proceeds: ${Math.round(inputs.purchaseAmount / (inputs.liquidityFactor ?? 1.50)).toLocaleString()}
                  </p>
                </div>

                {/* Legal & Dealer Fee Rate */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-medium text-slate-400">
                      Legal & Dealer Fee Rate
                    </label>
                    <span className="text-xs font-mono text-emerald-400">
                      {((inputs.feeRate ?? 0.102245) * 100).toFixed(2)}%
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {[8, 10, 10.22, 12].map((pct) => {
                      const isSelected = Math.abs((inputs.feeRate ?? 0.102245) * 100 - pct) < 0.05;
                      return (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => onChange({ ...inputs, feeRate: Number((pct / 100).toFixed(6)) })}
                          className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${
                            isSelected
                              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                              : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                          }`}
                        >
                          {pct}%
                        </button>
                      );
                    })}
                  </div>

                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={Number(((inputs.feeRate ?? 0.102245) * 100).toFixed(4))}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        onChange({ ...inputs, feeRate: isNaN(val) ? 0 : Number((val / 100).toFixed(6)) });
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-3 pr-8 text-white text-sm focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">%</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Fees are tax-deductible (approx. ${Math.round(inputs.purchaseAmount * (inputs.feeRate ?? 0.102245)).toLocaleString()})
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="w-1/3 bg-slate-800 hover:bg-slate-700 text-white font-medium py-3.5 rounded-xl transition-all text-sm"
          >
            Back
          </button>
          <button
            type="button"
            onClick={onNext}
            className="w-2/3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-emerald-900/30 transition-all text-sm flex items-center justify-center gap-2 group"
          >
            <span>See My Return</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  return null;
}
