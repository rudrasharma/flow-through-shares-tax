import { FlowThroughOutputs } from '../calculator/types';
import { AlertTriangle, CheckCircle2, ChevronRight, Info, History } from 'lucide-react';

interface PlainEnglishMathProps {
  outputs: FlowThroughOutputs;
}

export function PlainEnglishMath({ outputs }: PlainEnglishMathProps) {
  const { amt, carryBackDetails } = outputs;
  const hasCarryBack = carryBackDetails && carryBackDetails.totalRetroactiveRefund > 0;
  
  return (
    <div className="space-y-6 text-slate-300 text-sm">
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h4 className="font-bold text-white text-base flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          1. Your Investment & Tax Deductions
        </h4>
        <p>
          You purchased <strong>${outputs.purchaseAmount.toLocaleString()}</strong> of flow-through shares. This allows you to deduct the exploration expenses and claim tax credits against your regular income.
        </p>
        <ul className="space-y-2 border-l-2 border-slate-800 pl-4 ml-2">
          <li className="flex justify-between">
            <span>Federal Tax Savings:</span>
            <span className="font-medium text-white">${outputs.federalCeeSavings.toLocaleString()}</span>
          </li>
          <li className="flex justify-between">
            <span>Provincial Tax Savings:</span>
            <span className="font-medium text-white">${outputs.provincialCeeSavings.toLocaleString()}</span>
          </li>
          <li className="flex justify-between">
            <span>Federal Mineral Tax Credit (15-30%):</span>
            <span className="font-medium text-white">${outputs.federalItc.toLocaleString()}</span>
          </li>
          <li className="flex justify-between border-t border-slate-800 pt-2 font-semibold">
            <span>Total Base Deductions:</span>
            <span className="text-emerald-400">${(outputs.federalCeeSavings + outputs.provincialCeeSavings + outputs.federalItc).toLocaleString()}</span>
          </li>
        </ul>
      </div>

      {hasCarryBack && (
        <div className="bg-slate-950 border border-blue-900/50 rounded-2xl p-5 space-y-4">
          <h4 className="font-bold text-white text-base flex items-center gap-2">
            <History className="w-5 h-5 text-blue-500" />
            Retroactive Tax Recovery
          </h4>
          <p>
            Your deductions were larger than your 2026 income, generating a Non-Capital Loss and excess Investment Tax Credits. These were automatically carried back to optimize your refund from previous years.
          </p>
          <ul className="space-y-2 border-l-2 border-slate-800 pl-4 ml-2">
            <li className="flex justify-between">
              <span>Excess Deductions (CEE) Carried Back:</span>
              <span className="font-medium text-white">${carryBackDetails!.ceeCarriedBack.toLocaleString()}</span>
            </li>
            <li className="flex justify-between">
              <span>Excess Tax Credits Carried Back:</span>
              <span className="font-medium text-white">${carryBackDetails!.itcCarriedBack.toLocaleString()}</span>
            </li>
            <li className="flex justify-between border-t border-slate-800 pt-2 font-semibold">
              <span>Total Retroactive Refund:</span>
              <span className="text-blue-400">${carryBackDetails!.totalRetroactiveRefund.toLocaleString()}</span>
            </li>
          </ul>
        </div>
      )}

      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h4 className="font-bold text-white text-base flex items-center gap-2">
          <ChevronRight className="w-5 h-5 text-blue-500" />
          2. Liquidity Event & Fees
        </h4>
        <p>
          The shares are immediately sold to a liquidity provider at a discount. You also pay dealer and legal fees.
        </p>
        <ul className="space-y-2 border-l-2 border-slate-800 pl-4 ml-2">
          <li className="flex justify-between">
            <span>Gross Sale Proceeds:</span>
            <span className="font-medium text-white">${outputs.liquidityProceeds.toLocaleString()}</span>
          </li>
          <li className="flex justify-between text-rose-400">
            <span>Less: Dealer & Legal Fees:</span>
            <span>-${outputs.feesPayable.toLocaleString()}</span>
          </li>
          <li className="flex justify-between border-t border-slate-800 pt-2 font-semibold">
            <span>Net Cash Back:</span>
            <span className="text-blue-400">${outputs.netCashProceeds.toLocaleString()}</span>
          </li>
        </ul>
        <div className="bg-slate-900 p-3 rounded-lg flex gap-2 items-start text-xs text-slate-400">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <p>The fees you pay (${outputs.feesPayable.toLocaleString()}) are tax-deductible, providing an additional tax benefit of ${outputs.feeTaxBenefit.toLocaleString()}.</p>
        </div>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h4 className="font-bold text-white text-base flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          3. Capital Gains & AMT
        </h4>
        <p>
          Because your cost base is deemed to be $0, the entire sale proceeds are treated as a capital gain. We also calculate the 2024 Alternative Minimum Tax (AMT) rules which penalize excessive deductions.
        </p>
        <ul className="space-y-2 border-l-2 border-slate-800 pl-4 ml-2">
          <li className="flex justify-between">
            <span>Capital Gains Tax Owed:</span>
            <span className="font-medium text-rose-400">-${outputs.capitalGainsTaxPayable.toLocaleString()}</span>
          </li>
          {amt.isAmtTriggered ? (
            <li className="flex justify-between text-amber-400">
              <span>Additional AMT Payable:</span>
              <span>-${amt.additionalAmtPayable.toLocaleString()}</span>
            </li>
          ) : (
            <li className="flex justify-between text-emerald-400">
              <span>Additional AMT Payable:</span>
              <span>$0 (AMT Not Triggered)</span>
            </li>
          )}
        </ul>
      </div>

      <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <h4 className="font-bold text-white">Final Net Profit (Year 1)</h4>
          <p className="text-xs text-slate-400">After all taxes, refunds, fees, and liquidity events.</p>
        </div>
        <div className="text-2xl font-bold text-emerald-400">
          ${outputs.profit2026.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
