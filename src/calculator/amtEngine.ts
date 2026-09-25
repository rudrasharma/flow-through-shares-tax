import { AmtCalculationResult, ProvinceCode } from './types';

// Statutory Bill C-69 (2024+) Alternative Minimum Tax Parameters
export const AMT_FEDERAL_EXEMPTION = 173205; // Indexed 4th bracket threshold
export const AMT_FEDERAL_RATE = 0.205; // 20.5% flat rate
export const ONTARIO_AMT_RATIO = 0.3367; // 33.67% of federal AMT

/**
 * Computes standard Canadian federal progressive tax on taxable income.
 */
function calculateFederalRegularTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  let tax = 0;

  // Bracket 1: 15% up to 55,867
  const b1 = Math.min(taxableIncome, 55867);
  tax += b1 * 0.15;

  // Bracket 2: 20.5% from 55,867 to 111,733
  if (taxableIncome > 55867) {
    const b2 = Math.min(taxableIncome - 55867, 111733 - 55867);
    tax += b2 * 0.205;
  }

  // Bracket 3: 26% from 111,733 to 173,205
  if (taxableIncome > 111733) {
    const b3 = Math.min(taxableIncome - 111733, 173205 - 111733);
    tax += b3 * 0.26;
  }

  // Bracket 4: 29% from 173,205 to 246,752
  if (taxableIncome > 173205) {
    const b4 = Math.min(taxableIncome - 173205, 246752 - 173205);
    tax += b4 * 0.29;
  }

  // Bracket 5: 33% over 246,752
  if (taxableIncome > 246752) {
    const b5 = taxableIncome - 246752;
    tax += b5 * 0.33;
  }

  return tax;
}

/**
 * Computes standard Ontario provincial tax with surtaxes.
 */
function calculateOntarioRegularTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  let basicTax = 0;

  if (taxableIncome <= 51446) {
    basicTax = taxableIncome * 0.0505;
  } else if (taxableIncome <= 102894) {
    basicTax = 51446 * 0.0505 + (taxableIncome - 51446) * 0.0915;
  } else if (taxableIncome <= 150000) {
    basicTax = 51446 * 0.0505 + (102894 - 51446) * 0.0915 + (taxableIncome - 102894) * 0.1116;
  } else if (taxableIncome <= 220000) {
    basicTax = 51446 * 0.0505 + (102894 - 51446) * 0.0915 + (150000 - 102894) * 0.1116 + (taxableIncome - 150000) * 0.1216;
  } else {
    basicTax = 51446 * 0.0505 + (102894 - 51446) * 0.0915 + (150000 - 102894) * 0.1116 + (220000 - 150000) * 0.1216 + (taxableIncome - 220000) * 0.1316;
  }

  // Ontario Surtaxes:
  let surtax = 0;
  if (basicTax > 5315) {
    surtax += (basicTax - 5315) * 0.20;
  }
  if (basicTax > 6802) {
    surtax += (basicTax - 6802) * 0.36;
  }

  return basicTax + surtax;
}

export interface AmtInputs {
  estimatedIncome: number;
  province: ProvinceCode;
  purchaseAmount: number; // AA
  liquidityProceeds: number; // BB
  feesPayable: number; // CC
  federalItc: number; // DD
  netCashOutlay: number;
  netTaxSavings2026: number;
}

/**
 * Full Canadian Alternative Minimum Tax (AMT) calculation under 2024 Bill C-69 rules.
 * Pursuant to ITA s. 127.5 and Form ON428.
 */
export function calculateAmt(inputs: AmtInputs): AmtCalculationResult {
  const {
    estimatedIncome,
    purchaseAmount: AA,
    liquidityProceeds: BB,
    feesPayable: CC,
    federalItc: DD,
    netCashOutlay,
    netTaxSavings2026,
  } = inputs;

  // 1. Regular Tax Calculation on Post-Investment Taxable Income
  const taxableCapGain = BB * 0.50;
  const ceeDeduction = AA;
  const feeDeduction = CC;

  const regularTaxableIncome = Math.max(0, estimatedIncome + taxableCapGain - ceeDeduction - feeDeduction);

  const grossFedRegularTax = calculateFederalRegularTax(regularTaxableIncome);
  // Basic personal amount credit (~$15,705 * 15% = $2,355.75)
  const bpaCredit = 15705 * 0.15;
  // Net regular federal tax after non-refundable CMETC credit
  const regularFederalTax = Math.max(0, grossFedRegularTax - bpaCredit - DD);

  const regularProvincialTax = calculateOntarioRegularTax(regularTaxableIncome);
  const totalRegularTax = Number((regularFederalTax + regularProvincialTax).toFixed(2));

  // 2. AMT Calculation (Bill C-69 2024+ Rules)
  // - 100% Capital Gains inclusion (full BB included)
  // - 50% limit on CEE deduction (50% added back)
  // - 50% limit on fees/carrying charges (50% added back)
  const amtAdjustedTaxableIncome = Math.max(
    0,
    estimatedIncome + (1.00 * BB) - (0.50 * ceeDeduction) - (0.50 * feeDeduction)
  );

  const amtExemption = AMT_FEDERAL_EXEMPTION;
  const amtTaxableBase = Math.max(0, amtAdjustedTaxableIncome - amtExemption);

  // Gross Federal AMT at flat 20.5% rate
  const grossFederalAmt = Number((amtTaxableBase * AMT_FEDERAL_RATE).toFixed(2));

  // Allowed AMT Credits: Under Bill C-69, non-refundable credits are limited to 50%
  const amtBpaCredit = 15705 * 0.205 * 0.50;
  const amtCmetcCredit = 0.50 * DD;
  const allowedAmtCredits = Number((amtBpaCredit + amtCmetcCredit).toFixed(2));

  const netFederalAmt = Math.max(0, Number((grossFederalAmt - allowedAmtCredits).toFixed(2)));
  const provincialAmt = Number((netFederalAmt * ONTARIO_AMT_RATIO).toFixed(2));
  const totalAmt = Number((netFederalAmt + provincialAmt).toFixed(2));

  // 3. Statutory Trigger Comparison (ITA s. 127.5)
  // Federal minimum tax is payable when Net Federal AMT > Net Federal Regular Tax
  const isAmtTriggered = netFederalAmt > regularFederalTax;
  const federalAdditionalAmt = isAmtTriggered ? Number((netFederalAmt - regularFederalTax).toFixed(2)) : 0;
  const provincialAdditionalAmt = Number((federalAdditionalAmt * ONTARIO_AMT_RATIO).toFixed(2));
  const additionalAmtPayable = Number((federalAdditionalAmt + provincialAdditionalAmt).toFixed(2));

  const federalHeadroom = isAmtTriggered ? 0 : Number((regularFederalTax - netFederalAmt).toFixed(2));
  const headroomBeforeAmt = Number((federalHeadroom * (1 + ONTARIO_AMT_RATIO)).toFixed(2));

  // 4. Adjusted Year 1 Cash Flow
  const effectiveYear1NetTaxSavings = Number((netTaxSavings2026 - additionalAmtPayable).toFixed(2));
  const effectiveYear1Profit = Number((effectiveYear1NetTaxSavings - netCashOutlay).toFixed(2));
  const effectiveYear1Return = netCashOutlay > 0 
    ? Number(((effectiveYear1Profit / netCashOutlay) * 100).toFixed(1))
    : 0;

  return {
    regularFederalTax: Number(regularFederalTax.toFixed(2)),
    regularProvincialTax: Number(regularProvincialTax.toFixed(2)),
    totalRegularTax,
    amtAdjustedTaxableIncome: Number(amtAdjustedTaxableIncome.toFixed(2)),
    amtExemption,
    amtTaxableBase: Number(amtTaxableBase.toFixed(2)),
    grossFederalAmt,
    allowedAmtCredits,
    netFederalAmt,
    provincialAmt,
    totalAmt,
    isAmtTriggered,
    additionalAmtPayable,
    headroomBeforeAmt,
    effectiveYear1NetTaxSavings,
    effectiveYear1Profit,
    effectiveYear1Return,
    amtCarryforwardAvailable: additionalAmtPayable,
  };
}
