import { describe, it, expect } from 'vitest';
import { calculateFlowThrough } from './flowThroughEngine';

describe('Flow-Through Engine - WCPD Benchmarks', () => {
  it('should match the $105,000 WCPD Critical Mineral Pure Investment illustration exactly', () => {
    const result = calculateFlowThrough({
      estimatedIncome: 350000, // Top Ontario bracket (33% + 20.53% = 53.53%)
      province: 'ON',
      purchaseAmount: 105000.00,
      creditType: 'critical_mineral',
      liquidityProceedsOverride: 70000.00,
      feeAmountOverride: 10735.73,
    });

    // Check Step 1 & 2
    expect(result.purchaseAmount).toBe(105000.00);
    expect(result.liquidityProceeds).toBe(70000.00);
    expect(result.feesPayable).toBe(10735.73);
    expect(result.netCashProceeds).toBe(59264.27);
    expect(result.netCashOutlay).toBe(45735.73);

    // Check Marginal Tax Rates
    expect(result.federalMarginalRate).toBe(0.33);
    expect(result.provincialMarginalRate).toBe(0.2053);
    expect(result.combinedMarginalRate).toBe(0.5353);

    // Check Tax Effects (Year 1)
    expect(result.federalCeeSavings).toBe(34650.00);
    expect(result.provincialCeeSavings).toBe(21556.50);
    expect(result.federalItc).toBe(31500.00);
    expect(result.provincialItc).toBe(0.00);
    expect(result.feeTaxBenefit).toBeCloseTo(5746.83, 1);
    expect(result.capitalGainsTaxPayable).toBe(18735.50);

    // Check Net Tax Savings
    expect(result.netTaxSavings2026).toBeCloseTo(74717.83, 1);

    // Check 2026 Profit & Return
    expect(Math.round(result.profit2026)).toBe(28982); // $28,982
    expect(result.afterTaxReturn2026).toBe(63.4);

    // Check 2027 Taxes on ITC Income Inclusion
    expect(result.taxOnItcInclusion2027).toBeCloseTo(16861.95, 1);

    // Check Overall Profit & Return
    expect(Math.round(result.overallProfit)).toBe(12120); // $12,120
    expect(result.overallAfterTaxReturn).toBe(26.5);

    // Check GIC Equivalent
    expect(result.equivalentGicReturn).toBe(57.0);
  });

  it('should match the $190,000.02 WCPD Critical Mineral Pure Investment illustration exactly', () => {
    const result = calculateFlowThrough({
      estimatedIncome: 500000, // Top Ontario bracket
      province: 'ON',
      purchaseAmount: 190000.02,
      creditType: 'critical_mineral',
      liquidityProceedsOverride: 126666.68,
      feeAmountOverride: 19426.55,
    });

    // Check Step 1 & 2
    expect(result.purchaseAmount).toBe(190000.02);
    expect(result.liquidityProceeds).toBe(126666.68);
    expect(result.feesPayable).toBe(19426.55);
    expect(result.netCashProceeds).toBe(107240.13);
    expect(result.netCashOutlay).toBe(82759.89);

    // Check Tax Effects
    expect(result.federalCeeSavings).toBe(62700.01);
    expect(result.provincialCeeSavings).toBe(39007.00);
    expect(result.federalItc).toBe(57000.01);
    expect(result.feeTaxBenefit).toBeCloseTo(10399.03, 1);
    expect(result.capitalGainsTaxPayable).toBe(33902.34);

    // Check Net Tax Savings
    expect(result.netTaxSavings2026).toBeCloseTo(135203.71, 1);

    // Check Profit & Return 2026
    expect(Math.round(result.profit2026)).toBe(52444); // $52,444
    expect(result.afterTaxReturn2026).toBe(63.4);

    // Check 2027 ITC Tax
    expect(result.taxOnItcInclusion2027).toBeCloseTo(30512.10, 1);

    // Check Overall Profit & Return
    expect(Math.round(result.overallProfit)).toBe(21932); // $21,932
    expect(result.overallAfterTaxReturn).toBe(26.5);

    // Check GIC Equivalent
    expect(result.equivalentGicReturn).toBe(57.0);
  });
});
