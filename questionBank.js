/**
 * QuestionBank.js
 * Question definitions, seeded tasks (1-5), and dynamic scenario generator.
 * Identity Token: 24b3020
 */

import { MathEngine } from './mathEngine.js';

export const SeededTasks = [
  // Task 1: Price-Tag Mapping (Non-MCQ Role Assignment)
  {
    id: 'task_1',
    taskNumber: 1,
    title: 'Geometry Box Price-Tag Detective',
    format: 'Price-Tag Mapping',
    context: 'Stationery Shop in FC Road, Pune',
    prompt: 'A stationery shopkeeper buys a geometry box from the factory for ₹400, puts an MRP sticker of ₹500 on the box, and sells it to Sharvee at the counter for ₹450 with a ₹50 discount.',
    subPrompts: [
      'Assign each amount (₹400, ₹500, ₹450) to its retail role (Cost Price, Marked Price, Selling Price).',
      'Select which price the 10% discount (₹50) was calculated on.'
    ],
    hint: 'Think about who looks at which number! The customer sees the sticker on the box first.',
    expected: {
      cp: 400,
      mp: 500,
      sp: 450,
      discountBase: 'MP'
    }
  },

  // Task 2: Step-by-Step Numerical Workspace with Reasoning Box
  {
    id: 'task_2',
    taskNumber: 2,
    title: 'School Bag Monsoon Sale Calculation',
    format: 'Step-by-Step Numerical Workspace + Reasoning Box',
    context: 'Camp Market, Pune',
    prompt: 'A school bag costs the shopkeeper ₹800 (Cost Price, CP). She puts an MRP tag of ₹1,000 (Marked Price, MP) and offers a special 15% discount for school students.',
    subPrompts: [
      '(a) Calculate the actual Selling Price (SP) Sharvee pays.',
      '(b) Calculate the shopkeeper\'s actual Profit % earned on CP.',
      '(c) In 1–2 sentences, explain why the 15% discount is subtracted from ₹1,000 instead of ₹800.'
    ],
    hint: 'Step 1: Calculate 15% of ₹1,000 first. Step 2: Subtract it to get SP. Step 3: Compare SP with ₹800 to find the rupee profit.',
    expected: {
      discountAmt: 150,
      sp: 850,
      profitAmt: 50,
      profitPct: 6.25
    }
  },

  // Task 3: Error-Spotting & Critique ("Fix the Mistake")
  {
    id: 'task_3',
    taskNumber: 3,
    title: 'Festive Chocolate Box: Kabir\'s Claim',
    format: 'Error-Spotting & Critique ("Fix the Mistake")',
    context: 'Phoenix Mall Supermarket, Pune',
    prompt: 'At the supermarket, a ₹500 box of imported chocolates has a festive banner: "10% OFF + Extra 10% OFF at Checkout!". Kabir says: "10% + 10% is simply a flat 20% discount! So 20% of ₹500 is ₹100, and I will pay ₹400."',
    subPrompts: [
      '(a) Is Kabir Right or Wrong?',
      '(b) What is the intermediate price after applying the first 10% discount?',
      '(c) What is the true final Selling Price (SP) after the second 10% is applied?',
      '(d) Explain why 10% + 10% successive discounts do NOT equal a flat 20% discount.'
    ],
    hint: 'Does the cashier calculate the second 10% on the old ₹500 tag, or on the already-discounted counter price?',
    expected: {
      kabirClaim: 'wrong',
      priceAfterFirstDiscount: 450,
      finalSellingPrice: 405,
      effectiveDiscountPct: 19
    }
  },

  // Task 4: What-If Prediction & Strategic Explanation
  {
    id: 'task_4',
    taskNumber: 4,
    title: 'Headphones Store Strategy: Max Discount',
    format: 'What-If Prediction & Strategic Explanation',
    context: 'Electronics Bazar, Pune',
    prompt: 'A retailer purchases Bluetooth headphones at CP = ₹1,200 and prints an MRP tag of MP = ₹1,600. During a festive flash sale, the owner demands: "We must earn at least a 10% profit on our Cost Price!"',
    subPrompts: [
      '(a) What is the absolute lowest Selling Price (SP) allowed to guarantee a 10% profit on CP?',
      '(b) What is the maximum Rupee discount the retailer can offer off the ₹1,600 sticker?',
      '(c) What is the maximum Discount % on the Marked Price (MP) the retailer can print on the poster?',
      '(d) Explain your strategy step by step.'
    ],
    hint: 'First find the minimum cash needed in the drawer (CP + 10% of CP). Then subtract that from MP.',
    expected: {
      minSP: 1320,
      maxDiscountRupees: 280,
      maxDiscountPct: 17.5
    }
  },

  // Task 5: Dynamic Adaptive Micro-Scenario (Template Base)
  {
    id: 'task_5',
    taskNumber: 5,
    title: 'Adaptive Retail Capstone Challenge',
    format: 'Adaptive Micro-Scenario with Contextual Reasoning',
    context: 'Dynamic Pune Retail Store',
    prompt: 'This question adapts specifically to your learning trajectory and misconception diagnosis!',
    subPrompts: [
      'Calculate the requested Selling Price (SP) and secondary percentage.',
      'Explain your calculation base clearly.'
    ],
    hint: 'Remember the two golden rules: Discount is off MP; Profit is on CP!',
    expected: {
      sp: 1020,
      secondaryValue: 13.33
    }
  }
];

// Adaptive Question Generator for Task 5 and Branch Scenarios
export const QuestionGenerator = {
  // Generates M1 remediation scenario (Cricket Bat)
  generateM1Scenario(seed = 1) {
    const cp = 900;
    const mp = 1200;
    const discountPct = 15;
    const discountAmt = MathEngine.calcDiscountAmount(mp, discountPct); // 180
    const sp = mp - discountAmt; // 1020
    const profitAmt = sp - cp; // 120
    const profitPct = MathEngine.round2((profitAmt / cp) * 100); // 13.33%

    return {
      id: 'dynamic_m1_' + Date.now(),
      taskNumber: 5,
      targetMisconception: 'M1',
      title: 'Targeted Practice: Cricket Bat Discount & Profit',
      item: 'Kashmir Willow Cricket Bat',
      context: 'Deccan Gymkhana Sports Mart, Pune',
      params: { cp, mp, discountPct },
      prompt: `A sports shopkeeper buys a cricket bat for CP = ₹${cp} and tags it with an MRP of ₹${mp}. During the cricket season, he offers a ${discountPct}% discount.`,
      questionText: `(a) Find the actual Selling Price (SP). (b) Calculate the shopkeeper's Profit % on CP. (c) Which price (₹${cp} or ₹${mp}) did you use to calculate the discount, and why?`,
      expected: {
        discountAmt,
        sp,
        profitAmt,
        profitPct,
        secondaryValue: profitPct,
        correctBase: 'MP'
      }
    };
  },

  // Generates M2 remediation scenario (Sneakers Successive Discount)
  generateM2Scenario(seed = 1) {
    const originalPrice = 2000;
    const d1 = 15;
    const d2 = 10;
    const calc = MathEngine.calcSuccessiveDiscounts(originalPrice, d1, d2);

    return {
      id: 'dynamic_m2_' + Date.now(),
      taskNumber: 5,
      targetMisconception: 'M2',
      title: 'Targeted Practice: Running Sneakers Festive Offer',
      item: 'Pro Running Sneakers',
      context: 'JM Road Footwear Store, Pune',
      params: { originalPrice, d1, d2 },
      prompt: `A pair of sneakers is tagged at ₹${originalPrice}. The store offers a ${d1}% monsoon discount followed by an additional ${d2}% app-payment discount.`,
      questionText: `(a) Find the price after the first ${d1}% discount. (b) Find the final Selling Price after the second ${d2}% discount. (c) Explain why the final price is ₹${calc.priceAfterD2} instead of taking 25% off ₹${originalPrice} (₹1,500).`,
      expected: {
        priceAfterD1: calc.priceAfterD1,
        sp: calc.priceAfterD2,
        secondaryValue: calc.effectiveDiscountPct,
        effectiveDiscountPct: calc.effectiveDiscountPct
      }
    };
  },

  // Generates Harder Challenge scenario (Jacket Markup + Discount)
  generateHarderChallenge(seed = 1) {
    const cp = 1000;
    const markupPct = 25;
    const mp = MathEngine.calcMarkedPriceFromMarkup(cp, markupPct); // 1250
    const discountPct = 10;
    const discountAmt = MathEngine.calcDiscountAmount(mp, discountPct); // 125
    const sp = mp - discountAmt; // 1125
    const profitAmt = sp - cp; // 125
    const profitPct = MathEngine.round2((profitAmt / cp) * 100); // 12.5%

    return {
      id: 'dynamic_harder_' + Date.now(),
      taskNumber: 5,
      targetMisconception: 'NONE_HARDER',
      title: 'Advanced Retail Strategy: Winter Jacket Markup & Discount',
      item: 'Fleece Winter Jacket',
      context: 'Boutique Apparel, MG Road, Pune',
      params: { cp, markupPct, discountPct },
      prompt: `A boutique owner buys a winter jacket for CP = ₹${cp}. She marks it up by ${markupPct}% above Cost Price to set the MRP tag. Then, on weekends, she offers a ${discountPct}% discount on the MRP tag.`,
      questionText: `(a) Find the Marked Price (MP). (b) Find the final Selling Price (SP). (c) Find her net Profit %. (d) Explain why a ${markupPct}% markup followed by a ${discountPct}% discount does not simply give a 15% profit!`,
      expected: {
        mp,
        sp,
        profitAmt,
        profitPct,
        secondaryValue: profitPct
      }
    };
  }
};
