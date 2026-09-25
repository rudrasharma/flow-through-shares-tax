import { describe, it, expect } from 'vitest';
import { calculateAmt, AMT_FEDERAL_EXEMPTION, AMT_FEDERAL_RATE } from './amtEngine';

describe('2024 Alternative Minimum Tax (AMT) Engine', () => {
  it('should verify statutory constants under Bill C-69', () => {
    expect(AMT_FEDERAL_EXEMPTION).toBe(173205);
    expect(AMT_FEDERAL_RATE).toBe(0.205);
  });

  it('should confirm safe zone (No AMT triggered) for high earner with $350k income and $105k purchase', () => {
    const amtResult = calculateAmt({
      estimatedIncome: 350000,
      province: 'ON',
      purchaseAmount: 105000,
      liquidityProceeds: 70000,
      feesPayable: 10735.73,
      federalItc: 31500,
      netCashOutlay: 45735.73,
      netTaxSavings2026: 74717.83,
    });

    expect(amtResult.isAmtTriggered).toBe(false);
    expect(amtResult.additionalAmtPayable).toBe(0);
    expect(amtResult.headroomBeforeAmt).toBeGreaterThan(0);
    expect(amtResult.effectiveYear1Return).toBe(63.4);
    expect(amtResult.effectiveYear1Profit).toBeCloseTo(28982.10, 1);
  });

  it('should accurately detect AMT trigger and calculate carryforward credit when Net Federal AMT exceeds Regular Federal Tax', () => {
    // High earner ($400k) making large purchase ($200k) where deductions wipe out regular tax but AMT base is high
    const amtResult = calculateAmt({
      estimatedIncome: 400000,
      province: 'ON',
      purchaseAmount: 200000,
      liquidityProceeds: 133333.33,
      feesPayable: 20449.00,
      federalItc: 60000,
      netCashOutlay: 87115.67,
      netTaxSavings2026: 142000.00,
    });

    expect(amtResult.regularFederalTax).toBe(0);
    expect(amtResult.netFederalAmt).toBeGreaterThan(0);
    expect(amtResult.isAmtTriggered).toBe(true);
    expect(amtResult.additionalAmtPayable).toBeGreaterThan(20000);
    expect(amtResult.amtCarryforwardAvailable).toBe(amtResult.additionalAmtPayable);
    // Return in Year 1 is reduced by the AMT payment
    expect(amtResult.effectiveYear1Return).toBeLessThan(63.4);
  });
});
