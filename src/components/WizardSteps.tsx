import { useState } from 'react';
import { CalculatorInputs, ProvinceCode } from '../calculator/types';
import { ChevronDown, ChevronUp, Settings2, History, HelpCircle } from 'lucide-react';

interface WizardStepsProps {
  step: number;
  inputs: CalculatorInputs;
  onChange: (inputs: CalculatorInputs) => void;
  onNext: () => void;
  onBack: () => void;
}

export function WizardSteps({ step, inputs, onChange, onNext, onBack }: WizardStepsProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Step 1: Income and Province
  if (step === 1) {
    return (
      <div className="max-w-xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-white">Let's find out your tax bracket</h2>
          <p className="text-slate-400">Your tax savings depend on your income and where you live.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-300">Estimated 2026 Annual Income</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg">$</span>
              <input
                type="number"
                value={inputs.estimatedIncome}
                onChange={(e) => onChange({ ...inputs, estimatedIncome: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-8 pr-4 text-white text-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-300">Province</label>
            <select
              value={inputs.province}
              onChange={(e) => onChange({ ...inputs, province: e.target.value as ProvinceCode })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white text-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all appearance-none"
            >
              <option value="ON">Ontario</option>
              <option value="BC">British Columbia</option>
              <option value="AB">Alberta</option>
              <option value="QC">Quebec</option>
              <option value="NS">Nova Scotia</option>
              <option value="NB">New Brunswick</option>
              <option value="MB">Manitoba</option>
              <option value="SK">Saskatchewan</option>
              <option value="PE">Prince Edward Island</option>
              <option value="NL">Newfoundland and Labrador</option>
            </select>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <button
                onClick={() => onChange({ ...inputs, enableRetroactive: !inputs.enableRetroactive })}
                className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                <History className="w-4 h-4" />
                Optional: Retroactive Tax Recovery
                {inputs.enableRetroactive ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
            
            {inputs.enableRetroactive && (
              <div className="mt-4 space-y-4 p-4 bg-slate-950/50 rounded-xl border border-blue-900/30">
                <p className="text-xs text-slate-400">
                  If your investment deductions exceed your 2026 income, we can automatically carry the excess back to recover taxes paid in the previous 3 years.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-500">2025 Income</label>
                    <input
                      type="number"
                      value={inputs.incomeYearMinus1 || ''}
                      placeholder="0"
                      onChange={(e) => onChange({ ...inputs, incomeYearMinus1: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-500">2024 Income</label>
                    <input
                      type="number"
                      value={inputs.incomeYearMinus2 || ''}
                      placeholder="0"
                      onChange={(e) => onChange({ ...inputs, incomeYearMinus2: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-500">2023 Income</label>
                    <input
                      type="number"
                      value={inputs.incomeYearMinus3 || ''}
                      placeholder="0"
                      onChange={(e) => onChange({ ...inputs, incomeYearMinus3: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onNext}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-4 rounded-xl shadow-lg shadow-emerald-900/20 transition-all text-lg"
        >
          Next: Investment Amount
        </button>
      </div>
    );
  }

  // Step 2: Investment Amount
  if (step === 2) {
    const presets = [25000, 50000, 100000, 250000];

    return (
      <div className="max-w-xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-white">How much do you want to invest?</h2>
          <p className="text-slate-400">Select or enter the amount of Flow-Through shares you want to buy.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="grid grid-cols-2 gap-4">
            {presets.map(amount => (
              <button
                key={amount}
                onClick={() => onChange({ ...inputs, purchaseAmount: amount })}
                className={`py-3 px-4 rounded-xl border text-lg font-medium transition-all ${
                  inputs.purchaseAmount === amount
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600'
                }`}
              >
                ${(amount / 1000).toFixed(0)}k
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-400">Or enter a custom amount:</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg">$</span>
              <input
                type="number"
                value={inputs.purchaseAmount}
                onChange={(e) => onChange({ ...inputs, purchaseAmount: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 pl-8 pr-4 text-white text-xl font-semibold focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <Settings2 className="w-4 h-4" />
              Advanced Deal Terms
              {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {showAdvanced && (
              <div className="mt-4 space-y-4 p-4 bg-slate-950/50 rounded-xl border border-slate-800">
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
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-medium text-slate-400">
                      Legal & Dealer Fee Rate
                    </label>
                    <span className="text-xs font-mono text-emerald-400">
                      {((inputs.feeRate ?? 0.102245) * 100).toFixed(2)}%
                    </span>
                  </div>

                  {/* Quick percentage buttons */}
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

                  {/* Percentage number input with % suffix */}
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
                  <p className="text-[10px] text-slate-500">Industry standard is ~10.22% (approx. ${Math.round(inputs.purchaseAmount * (inputs.feeRate ?? 0.102245)).toLocaleString()})</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="w-1/3 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-4 rounded-xl transition-all"
          >
            Back
          </button>
          <button
            onClick={onNext}
            className="w-2/3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-4 rounded-xl shadow-lg shadow-emerald-900/20 transition-all text-lg"
          >
            See My Return
          </button>
        </div>
      </div>
    );
  }

  return null;
}
