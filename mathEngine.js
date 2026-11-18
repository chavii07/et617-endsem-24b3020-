/**
 * MathEngine.js
 * Pure deterministic mathematics engine for Percentages: Discount, Profit & Loss.
 * Identity Token: 24b3020
 * Prevents any arithmetic hallucinations by computing exact retail formulas client-side.
 */

export const MathEngine = {
  // Round to 2 decimal places cleanly
  round2(val) {
    return Math.round((Number(val) + Number.EPSILON) * 100) / 100;
  },

  // Discount Amount = MP * (Discount% / 100)
  calcDiscountAmount(mp, discountPct) {
    const d = (Number(mp) * Number(discountPct)) / 100;
    return this.round2(d);
  },

  // Selling Price = MP - Discount Amount
  calcSellingPriceFromDiscount(mp, discountPct) {
    const discount = this.calcDiscountAmount(mp, discountPct);
    return this.round2(Number(mp) - discount);
  },

  // Profit Amount = SP - CP (positive = profit, negative = loss)
  calcProfitAmount(sp, cp) {
    return this.round2(Number(sp) - Number(cp));
  },

  // Profit % = (Profit / CP) * 100
  calcProfitPct(sp, cp) {
    const profit = this.calcProfitAmount(sp, cp);
    if (Number(cp) === 0) return 0;
    return this.round2((profit / Number(cp)) * 100);
  },

  // Successive Discounts: Price after Discount 1, then Discount 2 on that reduced price
  calcSuccessiveDiscounts(initialPrice, d1Pct, d2Pct) {
    const priceAfterD1 = this.calcSellingPriceFromDiscount(initialPrice, d1Pct);
    const priceAfterD2 = this.calcSellingPriceFromDiscount(priceAfterD1, d2Pct);
    const totalRupeesSaved = this.round2(Number(initialPrice) - priceAfterD2);
    const effectiveDiscountPct = this.round2((totalRupeesSaved / Number(initialPrice)) * 100);

    return {
      initialPrice: Number(initialPrice),
      d1Pct: Number(d1Pct),
      d2Pct: Number(d2Pct),
      priceAfterD1,
      discount1Amount: this.round2(Number(initialPrice) - priceAfterD1),
      priceAfterD2,
      discount2Amount: this.round2(priceAfterD1 - priceAfterD2),
      totalRupeesSaved,
      effectiveDiscountPct,
      // If someone mistakenly added d1 + d2
      naiveSumDiscountPct: this.round2(Number(d1Pct) + Number(d2Pct)),
      naiveSumPrice: this.calcSellingPriceFromDiscount(initialPrice, Number(d1Pct) + Number(d2Pct))
    };
  },

  // Markup: MP = CP + (Markup% / 100) * CP
  calcMarkedPriceFromMarkup(cp, markupPct) {
    const markupAmt = (Number(cp) * Number(markupPct)) / 100;
    return this.round2(Number(cp) + markupAmt);
  },

  // Max Discount % on MP while guaranteeing a minimum Profit % on CP
  calcMaxDiscountForMinProfit(cp, mp, minProfitPct) {
    const minSP = this.round2(Number(cp) * (1 + Number(minProfitPct) / 100));
    const maxDiscountRupees = this.round2(Number(mp) - minSP);
    const maxDiscountPct = this.round2((maxDiscountRupees / Number(mp)) * 100);
    return {
      minSP,
      maxDiscountRupees,
      maxDiscountPct
    };
  },

  // Evaluate if numeric answer matches expected within tolerance
  isClose(val1, val2, tolerance = 0.5) {
    return Math.abs(Number(val1) - Number(val2)) <= tolerance;
  }
};
