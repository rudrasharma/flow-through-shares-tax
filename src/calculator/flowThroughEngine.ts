import { CalculatorInputs, FlowThroughOutputs, CarryBackDetails } from './types';
import { getMarginalTaxRates, calculateTaxSavings, estimateTotalTax, PROVINCES } from './taxEngine';
import { calculateAmt } from './amtEngine';

// Default WCPD deal parameters
export const DEFAULT_LIQUIDITY_FACTOR = 1.50;
export const DEFAULT_FEE_RATE = 0.102245;

export function calculateFlowThrough(inputs: CalculatorInputs): FlowThroughOutputs {
  const {
    estimatedIncome,
    province,
    purchaseAmount: AA,
    creditType,
    liquidityFactor = DEFAULT_LIQUIDITY_FACTOR,
    liquidityProceedsOverride,
    feeRate = DEFAULT_FEE_RATE,
    feeAmountOverride,
    provincialItcRateOverride,
    enableRetroactive = false,
    incomeYearMinus1 = 0,
    incomeYearMinus2 = 0,
    incomeYearMinus3 = 0,
  } = inputs;

  const BB = liquidityProceedsOverride !== undefined 
    ? liquidityProceedsOverride 
    : Number((AA / liquidityFactor).toFixed(2));

  const CC = feeAmountOverride !== undefined
    ? feeAmountOverride
    : Number((AA * feeRate).toFixed(2));

  const netCashProceeds = Number((BB - CC).toFixed(2));
  const netCashOutlay = Number((AA - netCashProceeds).toFixed(2));

  const { federalMarginalRate, provincialMarginalRate, combinedMarginalRate } = 
    getMarginalTaxRates(estimatedIncome, province);

  let federalItcRate = 0.30;
  if (creditType === 'standard_mineral') {
    federalItcRate = 0.15;
  } else if (creditType === 'none') {
    federalItcRate = 0.00;
  }

  const provInfo = PROVINCES[province];
  const provincialItcRate = provincialItcRateOverride !== undefined
    ? provincialItcRateOverride
    : (provInfo?.defaultProvincialItcRate ?? 0.0);

  const EE = Number((AA * provincialItcRate).toFixed(2));
  const ceeBase = AA - EE;

  // Year 0 Deduction Caps
  const totalDeductionsY0 = ceeBase + CC;
  const ceeUsedY0 = Math.min(totalDeductionsY0, estimatedIncome);
  const excessCee = Math.max(0, totalDeductionsY0 - estimatedIncome); // Non-Capital Loss

  // Tax Effects (Year 1 / 2026) using precise bracket integration
  const totalCeeSavingsY0 = calculateTaxSavings(estimatedIncome, ceeUsedY0, province);
  // Apportion to fed/prov based on marginal rates roughly
  const fedProvRatio = federalMarginalRate / combinedMarginalRate;
  const federalCeeSavings = Number((totalCeeSavingsY0 * fedProvRatio).toFixed(2));
  const provincialCeeSavings = Number((totalCeeSavingsY0 * (1 - fedProvRatio)).toFixed(2));

  const DD = Number((federalItcRate * ceeBase).toFixed(2));
  const provincialItc = EE;

  const feeTaxBenefit = Number((combinedMarginalRate * CC).toFixed(2));
  const capitalGainsTaxPayable = Number((combinedMarginalRate * BB * 0.50).toFixed(2));

  // Carry Back Engine
  let carryBackDetails: CarryBackDetails = {
    ceeCarriedBack: 0,
    itcCarriedBack: 0,
    refundFromYearMinus1: 0,
    refundFromYearMinus2: 0,
    refundFromYearMinus3: 0,
    totalRetroactiveRefund: 0
  };

  let netTaxSavings2026 = Number((
    totalCeeSavingsY0 +
    DD +
    provincialItc -
    capitalGainsTaxPayable
  ).toFixed(2));

  if (enableRetroactive) {
    let remainingLoss = excessCee;
    
    // 1. CEE Carry Back
    const pastYears = [
      { year: 1, income: incomeYearMinus1 },
      { year: 2, income: incomeYearMinus2 },
      { year: 3, income: incomeYearMinus3 }
    ];
    
    // Optimize: sort by highest income to wipe out top brackets first
    pastYears.sort((a, b) => b.income - a.income);

    for (const py of pastYears) {
      if (remainingLoss > 0 && py.income > 0) {
        const lossApplied = Math.min(remainingLoss, py.income);
        const refund = calculateTaxSavings(py.income, lossApplied, province);
        
        remainingLoss -= lossApplied;
        carryBackDetails.ceeCarriedBack += lossApplied;
        carryBackDetails.totalRetroactiveRefund += refund;
        
        if (py.year === 1) carryBackDetails.refundFromYearMinus1 += refund;
        if (py.year === 2) carryBackDetails.refundFromYearMinus2 += refund;
        if (py.year === 3) carryBackDetails.refundFromYearMinus3 += refund;
      }
    }

    // 2. ITC Carry Back
    // Estimate Y0 tax before ITCs to see if we have excess
    const estimatedY0Tax = estimateTotalTax(estimatedIncome - ceeUsedY0, province) + capitalGainsTaxPayable;
    const itcAvailable = DD + provincialItc;
    const itcUsedY0 = Math.min(itcAvailable, estimatedY0Tax);
    const excessItc = Math.max(0, itcAvailable - estimatedY0Tax);

    netTaxSavings2026 = Number((totalCeeSavingsY0 + itcUsedY0 - capitalGainsTaxPayable).toFixed(2));

    if (excessItc > 0) {
      let remainingItc = excessItc;
      for (const py of pastYears) {
        if (remainingItc > 0 && py.income > 0) {
          // How much tax was paid in that year AFTER CEE carryback?
          const ceeAppliedToThisYear = (carryBackDetails.ceeCarriedBack > 0) ? Math.min(py.income, excessCee) : 0; // rough estimate
          const taxRemaining = estimateTotalTax(py.income - ceeAppliedToThisYear, province);
          
          const itcApplied = Math.min(remainingItc, taxRemaining);
          remainingItc -= itcApplied;
          carryBackDetails.itcCarriedBack += itcApplied;
          carryBackDetails.totalRetroactiveRefund += itcApplied;
          
          if (py.year === 1) carryBackDetails.refundFromYearMinus1 += itcApplied;
          if (py.year === 2) carryBackDetails.refundFromYearMinus2 += itcApplied;
          if (py.year === 3) carryBackDetails.refundFromYearMinus3 += itcApplied;
        }
      }
    }
  }

  const profit2026 = Number((netTaxSavings2026 + carryBackDetails.totalRetroactiveRefund - netCashOutlay).toFixed(2));
  const afterTaxReturn2026 = netCashOutlay > 0 
    ? Number(((profit2026 / netCashOutlay) * 100).toFixed(1))
    : 0;

  const taxOnItcInclusion2027 = Number((combinedMarginalRate * DD).toFixed(2));
  const overallProfit = Number((profit2026 - taxOnItcInclusion2027).toFixed(2));
  const overallAfterTaxReturn = netCashOutlay > 0
    ? Number(((overallProfit / netCashOutlay) * 100).toFixed(1))
    : 0;

  const afterTaxReturnDecimal = overallAfterTaxReturn / 100;
  const taxComplement = 1 - combinedMarginalRate;
  const equivalentGicReturn = taxComplement > 0
    ? Number(((afterTaxReturnDecimal / taxComplement) * 100).toFixed(1))
    : 0;

  const amt = calculateAmt({
    estimatedIncome,
    province,
    purchaseAmount: AA,
    liquidityProceeds: BB,
    feesPayable: CC,
    federalItc: DD,
    netCashOutlay,
    netTaxSavings2026: netTaxSavings2026 + carryBackDetails.totalRetroactiveRefund,
  });

  return {
    purchaseAmount: AA,
    estimatedIncome,
    province,
    liquidityProceeds: BB,
    feesPayable: CC,
    netCashProceeds,
    netCashOutlay,
    federalMarginalRate,
    provincialMarginalRate,
    combinedMarginalRate,
    federalCeeSavings,
    provincialCeeSavings,
    federalItc: DD,
    provincialItc,
    feeTaxBenefit,
    capitalGainsTaxPayable,
    netTaxSavings2026,
    profit2026,
    afterTaxReturn2026,
    taxOnItcInclusion2027,
    overallProfit,
    overallAfterTaxReturn,
    equivalentGicReturn,
    amt,
    carryBackDetails: enableRetroactive ? carryBackDetails : undefined
  };
}
