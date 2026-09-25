import { ProvinceCode, ProvinceInfo, TaxBracketRate } from './types';

export const PROVINCES: Record<ProvinceCode, ProvinceInfo> = {
  ON: { code: 'ON', name: 'Ontario', topMarginalRate: 0.2053, defaultProvincialItcRate: 0.0 },
  BC: { code: 'BC', name: 'British Columbia', topMarginalRate: 0.2050, defaultProvincialItcRate: 0.0 },
  AB: { code: 'AB', name: 'Alberta', topMarginalRate: 0.1500, defaultProvincialItcRate: 0.0 },
  QC: { code: 'QC', name: 'Quebec', topMarginalRate: 0.2575, defaultProvincialItcRate: 0.0 },
  SK: { code: 'SK', name: 'Saskatchewan', topMarginalRate: 0.1450, defaultProvincialItcRate: 0.0 },
  MB: { code: 'MB', name: 'Manitoba', topMarginalRate: 0.1740, defaultProvincialItcRate: 0.0 },
  NB: { code: 'NB', name: 'New Brunswick', topMarginalRate: 0.1950, defaultProvincialItcRate: 0.0 },
  NS: { code: 'NS', name: 'Nova Scotia', topMarginalRate: 0.2100, defaultProvincialItcRate: 0.0 },
  PE: { code: 'PE', name: 'Prince Edward Island', topMarginalRate: 0.1875, defaultProvincialItcRate: 0.0 },
  NL: { code: 'NL', name: 'Newfoundland & Labrador', topMarginalRate: 0.2180, defaultProvincialItcRate: 0.0 },
  YT: { code: 'YT', name: 'Yukon', topMarginalRate: 0.1500, defaultProvincialItcRate: 0.0 },
  NT: { code: 'NT', name: 'Northwest Territories', topMarginalRate: 0.1405, defaultProvincialItcRate: 0.0 },
  NU: { code: 'NU', name: 'Nunavut', topMarginalRate: 0.1150, defaultProvincialItcRate: 0.0 },
};

/**
 * Computes marginal tax rates for a given taxable income and province.
 */
export function getMarginalTaxRates(income: number, provinceCode: ProvinceCode): TaxBracketRate {
  // Federal marginal rate
  let fedRate = 0.15;
  if (income > 246752) {
    fedRate = 0.33;
  } else if (income > 173205) {
    fedRate = 0.29;
  } else if (income > 111733) {
    fedRate = 0.26;
  } else if (income > 55867) {
    fedRate = 0.205;
  }

  // Provincial marginal rate
  let provRate = PROVINCES[provinceCode]?.topMarginalRate ?? 0.2053;

  if (provinceCode === 'ON') {
    // Ontario progressive marginal rate with surtax
    if (income > 220000) {
      // 13.16% * (1 + 0.20 + 0.36) = 20.5296% = 20.53%
      provRate = 0.2053;
    } else if (income > 150000) {
      provRate = 0.1216 * 1.56; // ~18.97%
    } else if (income > 102894) {
      provRate = 0.1116 * 1.56; // ~17.41%
    } else if (income > 86000) {
      provRate = 0.0915 * 1.56; // ~14.27%
    } else if (income > 51446) {
      provRate = 0.0915;
    } else {
      provRate = 0.0505;
    }
  } else {
    // For other provinces, if income is lower than their top bracket, scale proportionally or use top bracket if above $250k
    if (income < 100000) {
      provRate = provRate * 0.6;
    } else if (income < 170000) {
      provRate = provRate * 0.8;
    }
  }

  // Round combined to 4 decimals (e.g. 0.5353)
  const combined = Number((fedRate + provRate).toFixed(4));

  return {
    federalMarginalRate: Number(fedRate.toFixed(4)),
    provincialMarginalRate: Number(provRate.toFixed(4)),
    combinedMarginalRate: combined,
  };
}

/**
 * Calculates exact tax savings from a deduction by stepping down through tax brackets.
 * Returns the refund amount.
 */
export function calculateTaxSavings(initialIncome: number, deduction: number, provinceCode: ProvinceCode): number {
  if (deduction <= 0 || initialIncome <= 0) return 0;
  
  let savings = 0;
  let currentIncome = initialIncome;
  let remainingDeduction = Math.min(deduction, initialIncome);

  // Chunking by $100 is fast and extremely accurate for tax brackets
  while (remainingDeduction > 0 && currentIncome > 0) {
    const chunk = Math.min(remainingDeduction, 100);
    const rates = getMarginalTaxRates(currentIncome, provinceCode);
    
    savings += chunk * rates.combinedMarginalRate;
    currentIncome -= chunk;
    remainingDeduction -= chunk;
  }
  
  return Number(savings.toFixed(2));
}

/**
 * Estimates total tax paid for an income level.
 */
export function estimateTotalTax(income: number, provinceCode: ProvinceCode): number {
  // We can just calculate the savings from deducting all the income down to $0
  // Technically personal amounts exempt the first ~$15k, but this is close enough for ITC carryback capacity.
  return calculateTaxSavings(income, income, provinceCode);
}
