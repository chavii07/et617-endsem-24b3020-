/**
 * AdaptiveRules.js
 * P4 4-Signal Adaptive Decision Rule Engine
 * Identity Token: 24b3020
 * 
 * Signals Evaluated:
 * 1. Signal A: Numerical Accuracy (isCorrect)
 * 2. Signal E: Explanation & Misconception State (Sound, M1, M2, Prerequisite)
 * 3. Signal I: Interaction Telemetry (attempts count, hints used)
 * 4. Signal M: Mastery History (consecutive correct / error count on current LO)
 * 
 * 3 Outcomes Generated:
 * - Outcome 1: Harder Question (Advanced retail problem with multi-step markup/discount)
 * - Outcome 2: Alternative Visual Explanation (Interactive Rupee-Bar + Parallel Retry)
 * - Outcome 3: Prerequisite Mini-Lesson (Mental 10% & 5% Math Booster + Role Sorting)
 */

export const AdaptiveRules = {
  evaluateNextPathway(learnerState, latestSubmission) {
    const { history = [] } = learnerState;
    const currentTaskIndex = learnerState.currentTaskIndex || 0;
    
    // Recent submissions on current topic
    const recentSubmissions = [...history, latestSubmission];
    const lastTwo = recentSubmissions.slice(-2);

    const isCurrentCorrect = latestSubmission.diagnosticResult.isCorrect;
    const classification = latestSubmission.diagnosticResult.classification;
    const hintsUsed = latestSubmission.hintsUsed || 0;

    // Check condition for Outcome 1: Harder Question
    // 2 consecutive correct responses with sound reasoning and no hints used on latest
    const twoConsecutiveCorrect = lastTwo.length >= 2 &&
      lastTwo.every(sub => sub.diagnosticResult && sub.diagnosticResult.isCorrect && sub.diagnosticResult.classification === 'Sound Reasoning');
    
    if ((twoConsecutiveCorrect || (isCurrentCorrect && currentTaskIndex >= 3)) && hintsUsed === 0) {
      return {
        outcome: 'Outcome 1: Harder Question',
        outcomeCode: 'OUTCOME_1',
        title: 'Ready for Higher Challenge!',
        pedagogicalRationale: 'Sharvee demonstrated consecutive mastery with sound conceptual reasoning and zero hints. Advancing to a higher-complexity scenario with combined markup and discounts builds self-efficacy without cognitive overload.',
        interventionType: 'harder_question',
        recommendedTaskId: 'task_harder_challenge'
      };
    }

    // Check condition for Outcome 2: Alternative Visual Explanation
    // M1 or M2 detected in the latest submission
    if (classification === 'M1_BaseValueConfusion' || classification === 'M2_AdditiveFallacy') {
      const isM1 = classification === 'M1_BaseValueConfusion';
      return {
        outcome: 'Outcome 2: Alternative Visual Explanation',
        outcomeCode: 'OUTCOME_2',
        title: isM1 ? 'Visual Rupee-Bar Comparison: CP vs MP' : 'Visual Rupee-Bar: Step-by-Step Repeated Discount',
        pedagogicalRationale: isM1 
          ? 'Sharvee exhibited Base-Value Confusion (M1), calculating percentage on Cost Price rather than Marked Price. Presenting an interactive visual Rupee-Bar re-anchors the base before a parallel retry.'
          : 'Sharvee exhibited the Additive Fallacy (M2), assuming successive discounts add linearly. Renders a step-by-step price decomposition bar showing the diminishing base.',
        interventionType: 'visual_remediation',
        misconception: isM1 ? 'M1' : 'M2',
        recommendedTaskId: isM1 ? 'retry_m1_parallel' : 'retry_m2_parallel'
      };
    }

    // Check condition for Outcome 3: Prerequisite Instruction
    // 2 consecutive errors on the same concept OR Prerequisite Gap detected
    const twoConsecutiveErrors = lastTwo.length >= 2 &&
      lastTwo.every(sub => sub.diagnosticResult && !sub.diagnosticResult.isCorrect);

    if (classification === 'Prerequisite_Gap' || twoConsecutiveErrors) {
      return {
        outcome: 'Outcome 3: Prerequisite Instruction',
        outcomeCode: 'OUTCOME_3',
        title: 'Mental Math & Price Sorting Mini-Booster',
        pedagogicalRationale: 'Detected foundational calculation hesitation or two consecutive incorrect attempts. Providing a gentle 2-minute booster on finding 10% and 5% mentally reduces extraneous cognitive load.',
        interventionType: 'prerequisite_booster',
        recommendedTaskId: 'booster_mental_math'
      };
    }

    // Default supportive progression
    return {
      outcome: 'Standard Progression',
      outcomeCode: 'OUTCOME_STANDARD',
      title: 'Next Practice Step',
      pedagogicalRationale: 'Learner is progressing steadily. Proceeding to the next contextual retail practice task.',
      interventionType: 'standard_task',
      recommendedTaskId: `task_${currentTaskIndex + 1}`
    };
  }
};
