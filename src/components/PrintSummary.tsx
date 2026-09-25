import React from 'react';
import { FlowThroughOutputs } from '../calculator/types';

interface PrintSummaryProps {
  outputs: FlowThroughOutputs;
}

export const PrintSummary: React.FC<PrintSummaryProps> = ({ outputs }) => {
  const formatCurrency = (val: number, negative: boolean = false) => {
    const formatted = new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 2 }).format(Math.abs(val));
    if (val < 0 || negative) {
      return `(${formatted})`;
    }
    return formatted;
  };

  const formatRound = (val: number) => {
    return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(Math.round(val));
  };

  return (
    <div className="print-only bg-white text-black p-8 font-serif leading-tight">
      {/* Document 1: Summary Sheet */}
      <div className="border-4 border-green-900 p-6 mb-8 min-h-[900px] flex flex-col justify-between">
        <div>
          {/* Header Banner */}
          <div className="border-2 border-black p-3 text-center mb-6">
            <h1 className="text-xl font-bold uppercase tracking-wider">
              CRITICAL MINERAL PURE INVESTMENT
            </h1>
            <h2 className="text-base font-bold uppercase tracking-wide mt-1">
              ONTARIO SURTAX | {formatRound(outputs.netCashOutlay)} NET INVESTMENT | {outputs.afterTaxReturn2026.toFixed(1)}% AFTER-TAX RETURN IN 2026
            </h2>
          </div>

          <div className="border border-black p-3 text-center font-bold text-sm bg-gray-50 mb-6">
            2 Easy Steps providing you with an after-tax return of {formatRound(outputs.profit2026)} on a net investment of {formatRound(outputs.netCashOutlay)} in 2026 or {formatRound(outputs.overallProfit)} overall if not repeated in 2027
          </div>

          {/* Step 1 Box */}
          <div className="border border-black mb-4">
            <div className="bg-green-100/60 p-2 font-bold text-xs border-b border-black">
              Step 1: Purchase: Flow-Through Shares in a tax deductible Canadian resource company
            </div>
            <div className="p-3 flex justify-between text-sm font-semibold">
              <span>Flow-Through Share purchase for immediate sale & cash-back (initial cash outlay)</span>
              <span className="font-mono">{formatCurrency(outputs.purchaseAmount, true)}</span>
            </div>
          </div>

          {/* Step 2 Box */}
          <div className="border border-black mb-4">
            <div className="bg-green-100/60 p-2 font-bold text-xs border-b border-black">
              Step 2: Sell: Your Flow-Through Shares to a pre-arranged liquidity provider
            </div>
            <div className="p-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Cash-back to investor from immediate sale of flow-through shares to pre-arranged liquidity provider</span>
                <span className="font-mono">{formatCurrency(outputs.liquidityProceeds)}</span>
              </div>
              <div className="flex justify-between">
                <span>Fees payable by investor (including: investment banking, legal, accounting and dealer) *</span>
                <span className="font-mono">{formatCurrency(outputs.feesPayable, true)}</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t border-gray-300">
                <span>Net cash-back to investor approximately 5 days after closing</span>
                <span className="font-mono">{formatCurrency(outputs.netCashProceeds)}</span>
              </div>
            </div>
            <div className="text-[11px] p-2 bg-gray-50 border-t border-gray-300 italic">
              * Fees are tax deductible
            </div>
          </div>

          {/* Result Box */}
          <div className="border border-black mb-4">
            <div className="bg-green-100/60 p-2 font-bold text-xs border-b border-black">
              Result: Maximizing your tax savings with an attractive after-tax return
            </div>
            <div className="p-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Write a cheque for your flow-through share purchase (initial cash outlay)</span>
                <span className="font-mono">{formatCurrency(outputs.purchaseAmount, true)}</span>
              </div>
              <div className="flex justify-between">
                <span>Net cash-back to investor after immediate sale of flow-through shares</span>
                <span className="font-mono">{formatCurrency(outputs.netCashProceeds)}</span>
              </div>
              <div className="flex justify-between font-bold border-t border-gray-300 pt-1">
                <span>Net cash outlay</span>
                <span className="font-mono">{formatCurrency(outputs.netCashOutlay, true)}</span>
              </div>
              <div className="flex justify-between text-green-800 font-semibold">
                <span>Net tax savings in 2026 (tax credits & deductions to be included in your income tax return)</span>
                <span className="font-mono">{formatCurrency(outputs.netTaxSavings2026)}</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t-2 border-black pt-1">
                <span>Total after-tax return in 2026 or {outputs.afterTaxReturn2026.toFixed(1)}% After-Tax Return</span>
                <span className="font-mono">{formatCurrency(outputs.profit2026)}</span>
              </div>
              <div className="flex justify-between text-rose-800 pt-1">
                <span>Less: Taxes on ITC Income Inclusion 2027 (payable April 2028)*</span>
                <span className="font-mono">{formatCurrency(outputs.taxOnItcInclusion2027, true)}</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t-2 border-black pt-1">
                <span>Total after-tax return in 2026 if program is not repeated</span>
                <span className="font-mono">{formatCurrency(outputs.overallProfit)}</span>
              </div>
            </div>
          </div>

          {/* Big Highlight Box */}
          <div className="border-2 border-green-800 bg-green-50 p-4 text-center">
            <div className="text-xl font-extrabold text-green-900">
              {outputs.afterTaxReturn2026.toFixed(1)}% 2026 After-Tax Return on a net cash investment of {formatRound(outputs.netCashOutlay)}
            </div>
            <div className="text-sm font-semibold text-gray-700 my-1">or</div>
            <div className="text-base font-bold text-gray-900">
              {outputs.overallAfterTaxReturn.toFixed(1)}% After-Tax Return if program is not repeated in 2027.
              This {outputs.overallAfterTaxReturn.toFixed(1)}% After-Tax return is the equivalent to a {outputs.equivalentGicReturn.toFixed(1)}% before tax GIC Return
            </div>
          </div>
        </div>

        <div className="text-[10px] text-gray-500 pt-4 border-t border-gray-300">
          The sale is below stock market price due to a securities commission hold restricting the shares from being sold on the stock market for 4 months (liquidity provider assumes risk for the next 4 months).
        </div>
      </div>

      {/* Document 2: Detailed Breakdown Sheet */}
      <div className="border-4 border-black p-6 min-h-[900px] flex flex-col justify-between">
        <div>
          <div className="border-2 border-black p-3 text-center mb-6">
            <h1 className="text-xl font-bold uppercase tracking-wider">
              CRITICAL MINERAL PURE INVESTMENT
            </h1>
            <h2 className="text-base font-bold uppercase tracking-wide mt-1">
              ONTARIO SURTAX | DETAILED CASH-FLOW ILLUSTRATION
            </h2>
          </div>

          <table className="w-full text-xs border border-black mb-6">
            <tbody>
              <tr className="border-b border-black">
                <td className="p-2 font-semibold">Flow-Through Share Purchase for Immediate Sale by investor</td>
                <td className="p-2 font-bold text-center">AA</td>
                <td className="p-2 font-mono text-right font-bold">{formatCurrency(outputs.purchaseAmount, true)}</td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-2">Cash Proceeds from Sale to Liquidity Provider</td>
                <td className="p-2 font-bold text-center">BB</td>
                <td className="p-2 font-mono text-right">{formatCurrency(outputs.liquidityProceeds)}</td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-2">Fees & transaction costs (investment banking, legal, accounting, dealer)</td>
                <td className="p-2 font-bold text-center">CC</td>
                <td className="p-2 font-mono text-right">{formatCurrency(outputs.feesPayable, true)}</td>
              </tr>
              <tr className="border-b border-black bg-gray-50">
                <td colSpan={2} className="p-2 font-semibold">Net Cash Proceeds from Sale of Flow-Through Shares (same day, net of fees)</td>
                <td className="p-2 font-mono text-right font-bold">{formatCurrency(outputs.netCashProceeds)}</td>
              </tr>
              <tr className="bg-gray-100 font-bold border-b-2 border-black">
                <td colSpan={2} className="p-2 text-sm">Net Cash Outlay</td>
                <td className="p-2 font-mono text-right text-sm">{formatCurrency(outputs.netCashOutlay, true)}</td>
              </tr>
            </tbody>
          </table>

          <div className="border border-black p-2 font-bold text-center bg-gray-100 text-xs mb-4">
            Tax Effects resulting from your Flow-Through Share Purchase & Immediate Sale
          </div>

          <table className="w-full text-xs border border-black mb-6">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="p-2 font-semibold" colSpan={4}>Canadian Exploration Expense (CEE):</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-2 pl-6">Federal Savings</td>
                <td className="p-2">{(outputs.federalMarginalRate * 100).toFixed(2)}% × (AA - EE)</td>
                <td className="p-2"></td>
                <td className="p-2 font-mono text-right">{formatCurrency(outputs.federalCeeSavings)}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-2 pl-6">Provincial Savings</td>
                <td className="p-2">{(outputs.provincialMarginalRate * 100).toFixed(2)}% × (AA - EE) × 100%</td>
                <td className="p-2"></td>
                <td className="p-2 font-mono text-right">{formatCurrency(outputs.provincialCeeSavings)}</td>
              </tr>

              <tr className="border-b border-gray-300">
                <td className="p-2 font-semibold" colSpan={4}>Exploration Investment Tax Credit (ITC):</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-2 pl-6">Federal ITC</td>
                <td className="p-2">30.00% × (AA - EE)</td>
                <td className="p-2 font-bold text-center">DD</td>
                <td className="p-2 font-mono text-right">{formatCurrency(outputs.federalItc)}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-2 pl-6">Provincial ITC</td>
                <td className="p-2">0.00% × AA</td>
                <td className="p-2 font-bold text-center">EE</td>
                <td className="p-2 font-mono text-right">{formatCurrency(outputs.provincialItc)}</td>
              </tr>

              <tr className="border-b border-gray-300">
                <td className="p-2">Tax benefit on Fee</td>
                <td className="p-2">{(outputs.combinedMarginalRate * 100).toFixed(2)}% × CC</td>
                <td className="p-2"></td>
                <td className="p-2 font-mono text-right">{formatCurrency(outputs.feeTaxBenefit)}</td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-2">Less: Capital Gains Tax Payable</td>
                <td className="p-2">{(outputs.combinedMarginalRate * 100).toFixed(2)}% × BB × 50.00%</td>
                <td className="p-2"></td>
                <td className="p-2 font-mono text-right">{formatCurrency(outputs.capitalGainsTaxPayable, true)}</td>
              </tr>

              <tr className="bg-gray-100 font-bold border-b border-black">
                <td colSpan={3} className="p-2 text-sm">Net Tax Savings (2026)</td>
                <td className="p-2 font-mono text-right text-sm">{formatCurrency(outputs.netTaxSavings2026)}</td>
              </tr>
              <tr className="bg-green-50 font-bold border-b border-black">
                <td className="p-2 text-sm">Profit on Sale of Shares (2026)</td>
                <td className="p-2"></td>
                <td className="p-2 font-bold text-center">FF</td>
                <td className="p-2 font-mono text-right text-sm text-green-900">{formatCurrency(outputs.profit2026)}</td>
              </tr>
              <tr className="bg-green-100 font-bold border-b-2 border-black">
                <td colSpan={3} className="p-2">After-Tax Rate of Return in 2026</td>
                <td className="p-2 font-mono text-right">{outputs.afterTaxReturn2026.toFixed(1)}%</td>
              </tr>

              <tr className="border-b border-gray-300">
                <td className="p-2">Less: Taxes on ITC Income Inclusion (2027)*</td>
                <td className="p-2">{(outputs.combinedMarginalRate * 100).toFixed(2)}% × DD</td>
                <td className="p-2 font-bold text-center">GG</td>
                <td className="p-2 font-mono text-right">{formatCurrency(outputs.taxOnItcInclusion2027, true)}</td>
              </tr>
              <tr className="bg-gray-100 font-bold border-b border-black">
                <td className="p-2">Overall Profit on Sale of Flow-Through Shares if program is not repeated in 2027</td>
                <td className="p-2"></td>
                <td className="p-2 font-bold text-center">HH (FF + GG)</td>
                <td className="p-2 font-mono text-right">{formatCurrency(outputs.overallProfit)}</td>
              </tr>
              <tr className="bg-gray-200 font-bold">
                <td colSpan={3} className="p-2">Overall After-Tax Rate of Return if program is not repeated in 2027</td>
                <td className="p-2 font-mono text-right text-sm">{outputs.overallAfterTaxReturn.toFixed(1)}%</td>
              </tr>
            </tbody>
          </table>

          <div className="border-2 border-black p-3 bg-gray-50 text-center font-bold text-sm">
            <div>{formatRound(outputs.profit2026)} total profit on a {formatRound(outputs.netCashOutlay)} net investment in 2026</div>
            <div className="text-xs font-normal text-gray-700">{outputs.afterTaxReturn2026.toFixed(1)}% after-tax rate of return (as a percentage of net cash outlay)</div>
            <div className="mt-1">{formatRound(outputs.overallProfit)} total profit on a {formatRound(outputs.netCashOutlay)} net investment in 2027 if program is not repeated</div>
          </div>
        </div>

        <div className="text-[9px] text-gray-500 pt-4 border-t border-gray-300">
          Assumptions: Investor is accredited and meets all regulations to receive the benefits outlined in this cash flow illustration; investor has sufficient taxable income at the top marginal rate to benefit from the tax advantages outlined. *The income inclusion can be sheltered if you purchase in 2027.
        </div>
      </div>
    </div>
  );
};
