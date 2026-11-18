/**
 * DiagnosticEngine.js
 * Misconception Diagnosis & Feedback Generator
 * Identity Token: 24b3020
 * 
 * Specifically diagnoses:
 * - M1: Base-Value Confusion (e.g. taking discount on CP instead of MP, or dividing profit by SP instead of CP)
 * - M2: Additive / Symmetric Percentage Fallacy (e.g. 10% + 10% = 20%, or +20% then -20% = original)
 * - Prerequisite Arithmetic Gap (e.g. basic percentage calculation difficulty)
 * - Sound Reasoning (correct base + correct math + clear explanation)
 */

import { MathEngine } from './mathEngine.js';

export const DiagnosticEngine = {
  // Evaluates Task 1: Price-Tag Mapping
  evaluateTask1(inputs) {
    const { assignedCP, assignedMP, assignedSP, discountBase } = inputs;
    const isCPCorrect = Number(assignedCP) === 400;
    const isMPCorrect = Number(assignedMP) === 500;
    const isSPCorrect = Number(assignedSP) === 450;
    const isDiscountBaseCorrect = discountBase === 'MP' || discountBase === '500';

    let classification = 'Sound Reasoning';
    let misconceptionDetected = null;
    let feedback = '';

    if (isCPCorrect && isMPCorrect && isSPCorrect && isDiscountBaseCorrect) {
      classification = 'Sound Reasoning';
      feedback = 'Spot on, Sharvee! You anchored the ₹50 discount to the MRP sticker (MP = ₹500). Notice that even after giving a ₹50 discount, the shopkeeper still earned a ₹50 profit above their ₹400 Cost Price!';
    } else if (discountBase === 'CP' || discountBase === '400') {
      classification = 'M1_BaseValueConfusion';
      misconceptionDetected = 'M1: Calculated discount base on Cost Price (CP) instead of Marked Price (MP)';
      feedback = 'Take a gentle breath, Sharvee! Remember: customers see the printed MRP sticker (MP = ₹500) on the box. Discounts always come off the Marked Price (MP), not the shopkeeper\'s secret Cost Price!';
    } else {
      classification = 'Prerequisite_Gap';
      misconceptionDetected = 'Difficulty distinguishing between CP, MP, and SP';
      feedback = 'Let\'s sort the three prices step by step: CP is what the shopkeeper paid (₹400), MP is the tag sticker (₹500), and SP is what you pay at the cash counter (₹450).';
    }

    return {
      isCorrect: classification === 'Sound Reasoning',
      classification,
      misconceptionDetected,
      feedback,
      engine: 'Deterministic Rule-Engine'
    };
  },

  // Evaluates Task 2: Step-by-Step Numerical Workspace + Reasoning Box
  // Bag: CP=800, MP=1000, 15% discount.
  // Correct: SP = 850, Profit% = (50/800)*100 = 6.25%
  // M1 Error: 15% of 800 = 120 -> SP = 880 (or 680), or profit on SP
  evaluateTask2(inputs) {
    const sp = Number(inputs.sp);
    const profitPct = Number(inputs.profitPct);
    const explanation = (inputs.explanation || '').trim().toLowerCase();

    // Check numericals
    const isSPCorrect = MathEngine.isClose(sp, 850, 1);
    const isProfitCorrect = MathEngine.isClose(profitPct, 6.25, 0.5);

    // M1 detection triggers:
    // Did learner calculate 15% of 800 (= 120)? Then SP = 1000 - 120 = 880, or 800 - 120 = 680
    const m1SPDetected = MathEngine.isClose(sp, 880, 1) || MathEngine.isClose(sp, 680, 1);
    // Did learner divide profit by SP (50 / 850 * 100 = 5.88%) instead of CP (800)?
    const m1ProfitDetected = MathEngine.isClose(profitPct, 5.88, 0.5);

    // Textual clues in explanation
    const mentionsCPBaseForDiscount = explanation.includes('800') && (explanation.includes('discount') || explanation.includes('15%'));
    const mentionsMPBaseCorrectly = (explanation.includes('1000') || explanation.includes('marked') || explanation.includes('tag') || explanation.includes('mrp')) && (explanation.includes('discount') || explanation.includes('subtracted'));

    let classification = 'Sound Reasoning';
    let misconceptionDetected = null;
    let feedback = '';

    if (isSPCorrect && isProfitCorrect) {
      classification = 'Sound Reasoning';
      feedback = 'Wonderful work, Sharvee! You correctly took 15% off the Marked Price (₹1,000) to get SP = ₹850, and then measured the ₹50 profit from the Cost Price (₹800). Beautiful mathematical clarity!';
    } else if (m1SPDetected || mentionsCPBaseForDiscount) {
      classification = 'M1_BaseValueConfusion';
      misconceptionDetected = 'M1: Calculated 15% discount on Cost Price (₹800) instead of Marked Price (₹1,000)';
      feedback = 'You calculated 15% of ₹800 = ₹120, which is the shopkeeper\'s Cost Price. Remember the golden rule: customers get discounts from the printed tag (MP = ₹1,000). Try finding 15% of ₹1,000 first (₹150), then subtract that from ₹1,000!';
    } else if (m1ProfitDetected) {
      classification = 'M1_BaseValueConfusion';
      misconceptionDetected = 'M1: Calculated Profit % on Selling Price (₹850) instead of Cost Price (₹800)';
      feedback = 'Your Selling Price (₹850) is right on the money! But for Profit %, remember: the shopkeeper measures gain from what they originally invested (CP = ₹800). So divide ₹50 profit by ₹800!';
    } else {
      classification = 'Prerequisite_Gap';
      misconceptionDetected = 'Calculation or arithmetic step error';
      feedback = 'Let\'s break it down into two friendly steps: Step 1: Find 15% of ₹1,000 = ₹150 discount. So SP = ₹1,000 - ₹150 = ₹850. Step 2: Profit is ₹850 - ₹800 = ₹50. Now divide ₹50 by ₹800!';
    }

    return {
      isCorrect: classification === 'Sound Reasoning',
      classification,
      misconceptionDetected,
      feedback,
      engine: 'Deterministic Rule-Engine'
    };
  },

  // Evaluates Task 3: Error-Spotting & Critique ("Fix the Mistake")
  // Chocolate box: MRP=500, "10% OFF + Extra 10% OFF". Kabir claims flat 20% off = 400.
  // Correct: Kabir is WRONG. Step 1 (after 1st 10%) = 450. Step 2 (final SP) = 405. Effective 19% off.
  evaluateTask3(inputs) {
    const isKabirCorrect = inputs.kabirClaim === 'wrong';
    const price1 = Number(inputs.priceAfterFirstDiscount);
    const finalPrice = Number(inputs.finalSellingPrice);
    const explanation = (inputs.explanation || '').trim().toLowerCase();

    const isPrice1Correct = MathEngine.isClose(price1, 450, 1);
    const isFinalCorrect = MathEngine.isClose(finalPrice, 405, 1);

    // M2 trigger: Learner thinks Kabir is right or entered 400 for final price
    const m2Triggered = inputs.kabirClaim === 'right' || MathEngine.isClose(finalPrice, 400, 1);

    let classification = 'Sound Reasoning';
    let misconceptionDetected = null;
    let feedback = '';

    if (isKabirCorrect && isPrice1Correct && isFinalCorrect) {
      classification = 'Sound Reasoning';
      feedback = 'Brilliant critique, Sharvee! You spotted Kabir\'s mistake immediately. The second 10% is applied to the reduced ₹450 price (giving ₹45 off), so the final price is ₹405, not ₹400!';
    } else if (m2Triggered) {
      classification = 'M2_AdditiveFallacy';
      misconceptionDetected = 'M2: Additive Percentage Fallacy (assumed 10% + 10% = flat 20% discount)';
      feedback = 'It is so tempting to just add 10% + 10% = 20%! But look at what happens at the cash counter: First, 10% comes off ₹500, making it ₹450. The computer then takes the second 10% off the NEW price (₹450), which is only ₹45 off, not ₹50. So you pay ₹405!';
    } else {
      classification = 'Prerequisite_Gap';
      misconceptionDetected = 'Step-by-step successive discount arithmetic gap';
      feedback = 'Let\'s follow the rupee savings one by one: 10% of ₹500 is ₹50, so the intermediate price is ₹450. Next, 10% of ₹450 is ₹45. Subtract ₹45 from ₹450 to get the real final price!';
    }

    return {
      isCorrect: classification === 'Sound Reasoning',
      classification,
      misconceptionDetected,
      feedback,
      engine: 'Deterministic Rule-Engine'
    };
  },

  // Evaluates Task 4: What-If Prediction & Strategy Explanation
  // Headphones: CP = 1200, MP = 1600. Min 10% profit on CP.
  // Target min SP = 1200 * 1.10 = 1320. Max discount rupees = 1600 - 1320 = 280.
  // Max discount % = (280 / 1600) * 100 = 17.5%.
  // M1 Error: divided 280 by 1200 = 23.33%
  evaluateTask4(inputs) {
    const maxDiscountPct = Number(inputs.maxDiscountPct);
    const explanation = (inputs.explanation || '').trim().toLowerCase();

    const isCorrect = MathEngine.isClose(maxDiscountPct, 17.5, 0.5);
    const m1DividedByCP = MathEngine.isClose(maxDiscountPct, 23.33, 0.5);

    let classification = 'Sound Reasoning';
    let misconceptionDetected = null;
    let feedback = '';

    if (isCorrect) {
      classification = 'Sound Reasoning';
      feedback = 'Outstanding higher-order thinking, Sharvee! You accurately computed the required minimum Selling Price (₹1,320), found the maximum discount buffer (₹280), and anchored the 17.5% discount to the Marked Price (₹1,600)!';
    } else if (m1DividedByCP) {
      classification = 'M1_BaseValueConfusion';
      misconceptionDetected = 'M1: Calculated maximum discount % by dividing ₹280 by Cost Price (₹1,200) instead of Marked Price (₹1,600)';
      feedback = 'You were so close! You found the exact ₹280 maximum rupee discount. Just remember the golden anchor: discount percentage is always the discount divided by the Marked Price (₹1,600). Try dividing 280 by 1600 and multiplying by 100!';
    } else {
      classification = 'Prerequisite_Gap';
      misconceptionDetected = 'Multi-step reverse percentage calculation gap';
      feedback = 'Let\'s take this in two calm stages: Stage 1: 10% profit on ₹1,200 is ₹120, so minimum SP = ₹1,320. Stage 2: From MP of ₹1,600 down to ₹1,320 is a ₹280 gap. Now find what percent ₹280 is of ₹1,600!';
    }

    return {
      isCorrect: classification === 'Sound Reasoning',
      classification,
      misconceptionDetected,
      feedback,
      engine: 'Deterministic Rule-Engine'
    };
  },

  // Evaluates Task 5: Dynamic Scenario (Generated Question)
  evaluateTask5(taskData, inputs) {
    const sp = Number(inputs.sp);
    const profitOrDiscount = Number(inputs.secondaryValue);
    const explanation = (inputs.explanation || '').trim().toLowerCase();

    const expected = taskData.expected;
    const isSPCorrect = MathEngine.isClose(sp, expected.sp, 1);
    const isSecondaryCorrect = MathEngine.isClose(profitOrDiscount, expected.secondaryValue, 0.8);

    let classification = 'Sound Reasoning';
    let misconceptionDetected = null;
    let feedback = '';

    if (isSPCorrect && isSecondaryCorrect) {
      classification = 'Sound Reasoning';
      feedback = `Superb achievement, Sharvee! You mastered this adaptive challenge with flying colors! Expected SP was ₹${expected.sp} and secondary rate was ${expected.secondaryValue}%. Your explanation clearly demonstrated conceptual mastery without relying on formula memorization!`;
    } else if (taskData.targetMisconception === 'M1' && (inputs.usedBase === 'CP' || explanation.includes('cp') || explanation.includes('cost'))) {
      classification = 'M1_BaseValueConfusion';
      misconceptionDetected = 'M1: Base-Value Confusion in adaptive scenario';
      feedback = `Notice the price anchor here: discount is taken from the Marked Price (₹${taskData.params.mp}), not the Cost Price (₹${taskData.params.cp}). Keep this rule close to your heart!`;
    } else if (taskData.targetMisconception === 'M2') {
      classification = 'M2_AdditiveFallacy';
      misconceptionDetected = 'M2: Additive Fallacy in adaptive scenario';
      feedback = `Remember that each successive discount shrinks the base for the next discount! That is why the total discount is always less than the sum of the two percentages.`;
    } else {
      classification = 'Prerequisite_Gap';
      misconceptionDetected = 'Adaptive scenario arithmetic gap';
      feedback = `Good effort on this dynamic problem! Let's check the numbers: the correct SP is ₹${expected.sp}. Notice how step-by-step calculation keeps everything clear.`;
    }

    return {
      isCorrect: classification === 'Sound Reasoning',
      classification,
      misconceptionDetected,
      feedback,
      engine: 'Deterministic Rule-Engine'
    };
  },

  // Optional Live Gemini AI Evaluator with automatic deterministic fallback
  async evaluateWithGemini(apiKey, prompt, fallbackResult) {
    if (!apiKey) {
      return fallbackResult;
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an empathetic mathematics tutor for Sharvee, an anxious Class 8 student.
Here is the context and evaluation task:
${prompt}
Analyze the response. Return JSON only with format:
{
  "isCorrect": boolean,
  "classification": "Sound Reasoning" | "M1_BaseValueConfusion" | "M2_AdditiveFallacy" | "Prerequisite_Gap",
  "misconceptionDetected": string or null,
  "feedback": "calm, encouraging 2-sentence feedback"
}`
            }]
          }]
        })
      });

      if (!response.ok) {
        console.warn('Gemini API call failed, falling back to deterministic engine');
        return { ...fallbackResult, engine: 'Deterministic Engine (Fallback after API error)' };
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);

      return {
        isCorrect: parsed.isCorrect,
        classification: parsed.classification || fallbackResult.classification,
        misconceptionDetected: parsed.misconceptionDetected || fallbackResult.misconceptionDetected,
        feedback: parsed.feedback || fallbackResult.feedback,
        engine: 'Live Gemini AI'
      };
    } catch (err) {
      console.warn('Error during Gemini evaluation, using fallback:', err);
      return { ...fallbackResult, engine: 'Deterministic Engine (Fallback after network/parse exception)' };
    }
  }
};
