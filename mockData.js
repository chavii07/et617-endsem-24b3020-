/**
 * MockData.js
 * Preloaded Contrasting Learner Scenarios for Live Viva Walkthrough
 * Identity Token: 24b3020
 * 
 * Scenario A: Correct Learner Path (Sound Reasoning -> Outcome 1: Harder Question)
 * Scenario B: Misconception Path (M1 Base Confusion -> Outcome 2: Visual Rupee-Bar Remediation)
 */

export const MockScenarios = {
  // Scenario A: Correct Learner Path
  scenarioA: {
    studentId: 'L5_sharvee',
    name: 'Sharvee Kulkarni',
    grade: 8,
    school: 'Pune Vidyalaya, Maharashtra',
    confidenceScore: 4,
    currentTaskIndex: 3, // Moving towards harder challenge
    activeRole: 'learner',
    activeScreen: 'screen_workspace',
    autoApproveMode: false,
    apiKey: '',
    receiptEntries: [
      { id: 1, item: 'Masala Chips Packet', mrp: 50, sp: 45, discountRupees: 5, discountPct: 10, hasExtra10: false },
      { id: 2, item: 'Exam Stationery Kit', mrp: 200, sp: 170, discountRupees: 30, discountPct: 15, hasExtra10: true, finalSpWithExtra: 153 }
    ],
    mastery: {
      LO1_DistinguishPrices: 0.95,
      LO2_CalculateDiscountProfit: 0.90,
      LO3_ExplainSuccessiveChanges: 0.85
    },
    flags: {
      M1_BaseValueConfusion: false,
      M2_AdditiveFallacy: false
    },
    latestPathway: {
      outcome: 'Outcome 1: Harder Question',
      outcomeCode: 'OUTCOME_1',
      title: 'Ready for Higher Challenge!',
      pedagogicalRationale: 'Sharvee scored 2 consecutive correct solutions with sound conceptual explanations and no hints. Moving to advanced multi-step markup and discount tasks.',
      interventionType: 'harder_question',
      recommendedTaskId: 'task_harder_challenge'
    },
    submissions: [
      {
        submissionId: 'sub_a_1',
        taskId: 'task_1',
        taskTitle: 'Geometry Box Price-Tag Detective',
        timestamp: '2026-11-18 19:22',
        learnerInputs: {
          assignedCP: 400,
          assignedMP: 500,
          assignedSP: 450,
          discountBase: 'MP'
        },
        diagnosticResult: {
          isCorrect: true,
          classification: 'Sound Reasoning',
          misconceptionDetected: null,
          feedback: 'Spot on, Sharvee! You anchored the ₹50 discount to the MRP sticker (MP = ₹500). Notice that even after giving a ₹50 discount, the shopkeeper still earned a ₹50 profit above their ₹400 Cost Price!',
          engine: 'Deterministic Rule-Engine'
        },
        reviewStatus: 'approved',
        teacherFeedback: 'Verified by Ms. Deshmukh: Spot on calculation and clear price mapping!',
        reviewedBy: 'Ms. Deshmukh',
        hintsUsed: 0
      },
      {
        submissionId: 'sub_a_2',
        taskId: 'task_2',
        taskTitle: 'School Bag Monsoon Sale Calculation',
        timestamp: '2026-11-18 19:26',
        learnerInputs: {
          sp: 850,
          profitPct: 6.25,
          explanation: 'Discount is taken off the printed tag of ₹1,000 (15% = ₹150 off), so SP is ₹850. The shopkeeper paid ₹800, so profit is ₹50 on ₹800 which is 6.25%.'
        },
        diagnosticResult: {
          isCorrect: true,
          classification: 'Sound Reasoning',
          misconceptionDetected: null,
          feedback: 'Wonderful work, Sharvee! You correctly took 15% off the Marked Price (₹1,000) to get SP = ₹850, and then measured the ₹50 profit from the Cost Price (₹800). Beautiful mathematical clarity!',
          engine: 'Deterministic Rule-Engine'
        },
        reviewStatus: 'approved',
        teacherFeedback: 'Verified by Ms. Deshmukh: Excellent step-by-step reasoning, Sharvee! You clearly separated the customer discount base from the seller profit base.',
        reviewedBy: 'Ms. Deshmukh',
        hintsUsed: 0
      },
      {
        submissionId: 'sub_a_3',
        taskId: 'task_3',
        taskTitle: 'Festive Chocolate Box: Kabir\'s Claim',
        timestamp: '2026-11-18 19:30',
        learnerInputs: {
          kabirClaim: 'wrong',
          priceAfterFirstDiscount: 450,
          finalSellingPrice: 405,
          explanation: 'Kabir is wrong because the second 10% discount is applied to the reduced price of ₹450 (which is ₹45 off), not on the original ₹500. So we pay ₹405, not ₹400.'
        },
        diagnosticResult: {
          isCorrect: true,
          classification: 'Sound Reasoning',
          misconceptionDetected: null,
          feedback: 'Brilliant critique, Sharvee! You spotted Kabir\'s mistake immediately. The second 10% is applied to the reduced ₹450 price (giving ₹45 off), so the final price is ₹405, not ₹400!',
          engine: 'Deterministic Rule-Engine'
        },
        reviewStatus: 'approved',
        teacherFeedback: 'Verified by Ms. Deshmukh: Outstanding! You mastered successive discounting intuition.',
        reviewedBy: 'Ms. Deshmukh',
        hintsUsed: 0
      }
    ]
  },

  // Scenario B: Misconception Path (M1 Base-Value Confusion)
  scenarioB: {
    studentId: 'L5_sharvee',
    name: 'Sharvee Kulkarni',
    grade: 8,
    school: 'Pune Vidyalaya, Maharashtra',
    confidenceScore: 2,
    currentTaskIndex: 1, // At Task 2 where M1 occurs
    activeRole: 'learner',
    activeScreen: 'screen_branch', // Viewing visual remediation
    autoApproveMode: false,
    apiKey: '',
    receiptEntries: [
      { id: 1, item: 'Masala Chips Packet', mrp: 50, sp: 45, discountRupees: 5, discountPct: 10, hasExtra10: false }
    ],
    mastery: {
      LO1_DistinguishPrices: 0.65,
      LO2_CalculateDiscountProfit: 0.35,
      LO3_ExplainSuccessiveChanges: 0.20
    },
    flags: {
      M1_BaseValueConfusion: true,
      M2_AdditiveFallacy: false
    },
    latestPathway: {
      outcome: 'Outcome 2: Alternative Visual Explanation',
      outcomeCode: 'OUTCOME_2',
      title: 'Visual Rupee-Bar Comparison: CP vs MP',
      pedagogicalRationale: 'Sharvee exhibited Base-Value Confusion (M1), taking 15% discount on Cost Price (₹800) instead of Marked Price (₹1,000). Pausing normal flow to provide interactive Rupee-Bar visual re-anchoring before parallel retry.',
      interventionType: 'visual_remediation',
      misconception: 'M1',
      recommendedTaskId: 'retry_m1_parallel'
    },
    submissions: [
      {
        submissionId: 'sub_b_1',
        taskId: 'task_1',
        taskTitle: 'Geometry Box Price-Tag Detective',
        timestamp: '2026-11-18 19:22',
        learnerInputs: {
          assignedCP: 400,
          assignedMP: 500,
          assignedSP: 450,
          discountBase: 'MP'
        },
        diagnosticResult: {
          isCorrect: true,
          classification: 'Sound Reasoning',
          misconceptionDetected: null,
          feedback: 'Spot on, Sharvee! You anchored the ₹50 discount to the MRP sticker (MP = ₹500).',
          engine: 'Deterministic Rule-Engine'
        },
        reviewStatus: 'approved',
        teacherFeedback: 'Verified by Ms. Deshmukh: Good start on price-tag roles!',
        reviewedBy: 'Ms. Deshmukh',
        hintsUsed: 1
      },
      {
        submissionId: 'sub_b_2',
        taskId: 'task_2',
        taskTitle: 'School Bag Monsoon Sale Calculation',
        timestamp: '2026-11-18 19:27',
        learnerInputs: {
          sp: 880,
          profitPct: 10,
          explanation: 'I took 15% of the bag cost ₹800 which gave ₹120. Then I subtracted ₹120 from ₹1000 to get ₹880.'
        },
        diagnosticResult: {
          isCorrect: false,
          classification: 'M1_BaseValueConfusion',
          misconceptionDetected: 'M1: Calculated 15% discount on Cost Price (₹800) instead of Marked Price (₹1,000)',
          feedback: 'You calculated 15% of ₹800 = ₹120, which is the shopkeeper\'s Cost Price. Remember the golden rule: customers get discounts from the printed tag (MP = ₹1,000). Try finding 15% of ₹1,000 first (₹150), then subtract that from ₹1,000!',
          engine: 'Deterministic Rule-Engine'
        },
        reviewStatus: 'edited',
        teacherFeedback: 'Teacher Feedback (Edited by Ms. Deshmukh): Sharvee dear, do not worry at all! Notice that you calculated 15% of ₹800 (the factory cost). When you walk into a shop, the tag you see is ₹1,000. Take 15% of ₹1,000 instead! Check the visual rupee-bar on the next screen.',
        reviewedBy: 'Ms. Deshmukh',
        hintsUsed: 0
      }
    ]
  }
};
