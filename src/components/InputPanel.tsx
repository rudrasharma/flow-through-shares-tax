import React, { useState } from 'react';
import { CalculatorInputs, ProvinceCode } from '../calculator/types';
import { PROVINCES } from '../calculator/taxEngine';
import { ChevronDown, ChevronUp, DollarSign, Sliders, Info, Sparkles, Building, Landmark, CheckCircle } from 'lucide-react';

interface InputPanelProps {
  inputs: CalculatorInputs;
  onChange: (inputs: CalculatorInputs) => void;
  marginalRates: {
    federalMarginalRate: number;
    provincialMarginalRate: number;
    combinedMarginalRate: number;
  };
}

export const InputPanel: React.FC<InputPanelProps> = ({ inputs, onChange, marginalRates }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const update = (partial: Partial<CalculatorInputs>) => {
    onChange({ ...inputs, ...partial });
  };

  const incomePresets = [150000, 250000, 350000, 500000, 1000000];
  const purchasePresets = [50000, 105000, 190000, 250000, 500000];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(val);
  };

  const isOptimalBracket = inputs.estimatedIncome >= 250000;

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl backdrop-blur-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
        <div className="flex items-center space-x-2">
          <Sliders className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">Your Profile & Investment Size</h2>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
          Live Recalculation
        </span>
      </div>

      {/* 1. Estimated Taxable Income */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
            <Landmark className="w-4 h-4 text-emerald-400" />
            Estimated Taxable Income
          </label>
          <span className="text-base font-bold text-emerald-300 font-mono">
            {formatCurrency(inputs.estimatedIncome)}
          </span>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            $
          </div>
          <input
            type="number"
            min={0}
            step={5000}
            value={inputs.estimatedIncome}
            onChange={(e) => update({ estimatedIncome: Math.max(0, Number(e.target.value) || 0) })}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 pl-8 pr-4 text-white font-mono font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
          />
        </div>

        {/* Quick select chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {incomePresets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => update({ estimatedIncome: preset })}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                inputs.estimatedIncome === preset
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-700/50'
                  : 'bg-slate-700/70 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              ${preset >= 1000000 ? `${preset / 1000000}M` : `${preset / 1000}k`}
            </button>
          ))}
        </div>

        {/* Suitability Badge */}
        <div className={`rounded-xl p-2.5 border text-xs flex items-center gap-2 ${
          isOptimalBracket
            ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-200'
            : 'bg-amber-950/50 border-amber-500/30 text-amber-200'
        }`}>
          {isOptimalBracket ? (
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
          )}
          <span>
            {isOptimalBracket
              ? 'Optimal high bracket: You qualify for the maximum 53.53% tax deduction value.'
              : 'Moderate bracket: Flow-through shares still work, but deductions yield slightly lower savings.'}
          </span>
        </div>

        {/* Dynamic Marginal Tax Rate Badge */}
        <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-700/60 flex items-center justify-between text-xs mt-1">
          <span className="text-slate-400">Your Marginal Tax Rate:</span>
          <div className="flex items-center gap-2 font-mono">
            <span className="text-slate-300">Fed: {(marginalRates.federalMarginalRate * 100).toFixed(1)}%</span>
            <span className="text-slate-500">+</span>
            <span className="text-slate-300">Prov: {(marginalRates.provincialMarginalRate * 100).toFixed(2)}%</span>
            <span className="text-slate-500">=</span>
            <span className="font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40">
              {(marginalRates.combinedMarginalRate * 100).toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      {/* 2. Province of Residence */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
          <Building className="w-4 h-4 text-emerald-400" />
          Province of Residence
        </label>
        <select
          value={inputs.province}
          onChange={(e) => update({ province: e.target.value as ProvinceCode })}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-3 text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all cursor-pointer"
        >
          {Object.values(PROVINCES).map((prov) => (
            <option key={prov.code} value={prov.code}>
              {prov.name} ({(prov.topMarginalRate * 100).toFixed(2)}% top prov. rate)
            </option>
          ))}
        </select>
      </div>

      {/* 3. Flow-Through Purchase Amount (AA) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            Flow-Through Subscription Size (AA)
          </label>
          <span className="text-base font-bold text-emerald-300 font-mono">
            {formatCurrency(inputs.purchaseAmount)}
          </span>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            $
          </div>
          <input
            type="number"
            min={1000}
            step={5000}
            value={inputs.purchaseAmount}
            onChange={(e) => update({ purchaseAmount: Math.max(0, Number(e.target.value) || 0) })}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 pl-8 pr-4 text-white font-mono font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
          />
        </div>

        {/* Quick select chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {purchasePresets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => {
                if (preset === 105000) {
                  update({ purchaseAmount: 105000, liquidityProceedsOverride: 70000.00, feeAmountOverride: 10735.73 });
                } else if (preset === 190000) {
                  update({ purchaseAmount: 190000.02, liquidityProceedsOverride: 126666.68, feeAmountOverride: 19426.55 });
                } else {
                  update({ purchaseAmount: preset, liquidityProceedsOverride: undefined, feeAmountOverride: undefined });
                }
              }}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                Math.round(inputs.purchaseAmount) === preset
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-700/50'
                  : 'bg-slate-700/70 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              ${preset / 1000}k {preset === 105000 || preset === 190000 ? '★ WCPD Benchmark' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Exploration Tax Credit Type */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          Government Exploration Credit
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => update({ creditType: 'critical_mineral' })}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              inputs.creditType === 'critical_mineral'
                ? 'bg-emerald-950/70 border-emerald-500 text-white ring-1 ring-emerald-500'
                : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-xs text-emerald-400">Critical Minerals</div>
            <div className="text-[11px] text-slate-400 font-mono">30% Cash Credit (CMETC)</div>
          </button>

          <button
            type="button"
            onClick={() => update({ creditType: 'standard_mineral' })}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              inputs.creditType === 'standard_mineral'
                ? 'bg-emerald-950/70 border-emerald-500 text-white ring-1 ring-emerald-500'
                : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-xs text-slate-200">Standard Minerals</div>
            <div className="text-[11px] text-slate-400 font-mono">15% Credit (METC)</div>
          </button>

          <button
            type="button"
            onClick={() => update({ creditType: 'none' })}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              inputs.creditType === 'none'
                ? 'bg-emerald-950/70 border-emerald-500 text-white ring-1 ring-emerald-500'
                : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-xs text-slate-200">Standard CEE</div>
            <div className="text-[11px] text-slate-400 font-mono">0% Additional Credit</div>
          </button>
        </div>
      </div>

      {/* 5. Collapsible Deal Terms & Structuring */}
      <div className="pt-2 border-t border-slate-700/60">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center justify-between w-full text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors py-1"
        >
          <span className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5" />
            Institutional Deal Structuring (WCPD Terms)
          </span>
          {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showAdvanced && (
          <div className="mt-3 p-3.5 bg-slate-900/80 rounded-xl border border-slate-700/70 space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-medium block mb-1">
                  Liquidity Sale Factor (BB / AA)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step={0.01}
                    value={inputs.liquidityFactor ?? 1.50}
                    onChange={(e) => update({ liquidityFactor: Number(e.target.value) || 1.50, liquidityProceedsOverride: undefined })}
                    className="w-20 bg-slate-800 border border-slate-700 rounded-lg p-1.5 text-white font-mono text-xs"
                  />
                  <span className="text-slate-400 text-[11px]">Factor (1.50 = 66.7% proceeds)</span>
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-medium block mb-1">
                  Advisory & Dealer Fees ($CC)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step={0.001}
                    value={((inputs.feeRate ?? 0.102245) * 100).toFixed(3)}
                    onChange={(e) => update({ feeRate: (Number(e.target.value) || 10.2245) / 100, feeAmountOverride: undefined })}
                    className="w-20 bg-slate-800 border border-slate-700 rounded-lg p-1.5 text-white font-mono text-xs"
                  />
                  <span className="text-slate-400 text-[11px]">% of Purchase (10.225%)</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Capital Gains Inclusion Rate:</span>
              <span className="font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                50.00% (Fixed statutory rate)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
