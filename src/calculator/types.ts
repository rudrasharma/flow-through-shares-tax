export type ProvinceCode = 'ON' | 'BC' | 'AB' | 'SK' | 'MB' | 'QC' | 'NB' | 'NS' | 'PE' | 'NL' | 'YT' | 'NT' | 'NU';

export interface ProvinceInfo {
  code: ProvinceCode;
  name: string;
  topMarginalRate: number; // e.g. 0.2053 for Ontario with surtax
  defaultProvincialItcRate: number; // usually 0, e.g. for critical minerals
}

export type ExplorationCreditType = 'critical_mineral' | 'standard_mineral' | 'none';

export interface CalculatorInputs {
  estimatedIncome: number;
  province: ProvinceCode;
  purchaseAmount: number; // AA
  creditType: ExplorationCreditType;
  
  // Retroactive Tax Recovery
  enableRetroactive?: boolean;
  incomeYearMinus1?: number; // 2025
  incomeYearMinus2?: number; // 2024
  incomeYearMinus3?: number; // 2023

  // Advanced deal term overrides (optional)
  liquidityFactor?: number; // default 1.50 (BB = AA / 1.50)
  liquidityProceedsOverride?: number; // exact BB if specified
  feeRate?: number; // default 0.102245 (CC = AA * 0.102245)
  feeAmountOverride?: number; // exact CC if specified
  provincialItcRateOverride?: number; // exact EE rate if specified
}

export interface TaxBracketRate {
  federalMarginalRate: number;
  provincialMarginalRate: number;
  combinedMarginalRate: number;
}

export interface AmtCalculationResult {
  regularFederalTax: number;
  regularProvincialTax: number;
  totalRegularTax: number;

  amtAdjustedTaxableIncome: number;
  amtExemption: number;
  amtTaxableBase: number;
  grossFederalAmt: number;
  allowedAmtCredits: number;
  netFederalAmt: number;
  provincialAmt: number;
  totalAmt: number;

  isAmtTriggered: boolean;
  additionalAmtPayable: number;
  headroomBeforeAmt: number; // how much extra income or lower deduction before AMT triggers

  // Year 1 cash flow adjustment with AMT
  effectiveYear1NetTaxSavings: number;
  effectiveYear1Profit: number;
  effectiveYear1Return: number;
  amtCarryforwardAvailable: number; // 7-year recoverable credit
}

export interface CarryBackDetails {
  ceeCarriedBack: number;
  itcCarriedBack: number;
  refundFromYearMinus1: number;
  refundFromYearMinus2: number;
  refundFromYearMinus3: number;
  totalRetroactiveRefund: number;
}

export interface FlowThroughOutputs {
  // Inputs reflected
  purchaseAmount: number; // AA
  estimatedIncome: number;
  province: ProvinceCode;

  // Step 2: Sale & Outlay
  liquidityProceeds: number; // BB
  feesPayable: number; // CC
  netCashProceeds: number; // BB - CC
  netCashOutlay: number; // AA - (BB - CC)

  // Marginal Tax Profile
  federalMarginalRate: number; // e.g. 0.33
  provincialMarginalRate: number; // e.g. 0.2053
  combinedMarginalRate: number; // e.g. 0.5353

  // Tax Effects (Year 1 / 2026)
  federalCeeSavings: number; // 33% * (AA - EE)
  provincialCeeSavings: number; // 20.53% * (AA - EE)
  federalItc: number; // DD = 30% * (AA - EE)
  provincialItc: number; // EE
  feeTaxBenefit: number; // 53.53% * CC
  capitalGainsTaxPayable: number; // 53.53% * BB * 50%
  netTaxSavings2026: number;

  // Year 1 Profit & Return
  profit2026: number; // FF = netTaxSavings2026 - netCashOutlay
  afterTaxReturn2026: number; // FF / netCashOutlay (e.g. 63.4%)

  // Year 2 Tax & Overall Return
  taxOnItcInclusion2027: number; // GG = 53.53% * DD
  overallProfit: number; // HH = FF - GG
  overallAfterTaxReturn: number; // HH / netCashOutlay (e.g. 26.5%)
  equivalentGicReturn: number; // overallAfterTaxReturn / (1 - combinedMarginalRate) (e.g. 57.0%)

  // Alternative Minimum Tax (AMT) 2024 Bill C-69 analysis
  amt: AmtCalculationResult;
  
  // Retroactive tax recovery details
  carryBackDetails?: CarryBackDetails;
}
