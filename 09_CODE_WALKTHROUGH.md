# Phase P5: Code Walkthrough & Architectural Module Guide

- **Identity Token:** `<24b3020>`
- **Exam Card:** `P4-T9-L5-C5`
- **Application:** Adaptive Percentage PAL with Teacher-in-the-Loop Supervision

---

## 1. File & Directory Overview

```
et617-endsem-24b3020/
├── index.html                 # Complete SPA markup (all 6 screens & navigation)
├── styles.css                 # Calming design system, responsive layout, accessible typography
├── app.js                     # Main controller wiring DOM, events, and reactive store
├── src/
│   ├── mathEngine.js          # Pure deterministic mathematical retail formulas
│   ├── diagnosticEngine.js    # Misconception diagnosis (M1, M2, Sound) & feedback generator
│   ├── adaptiveRules.js       # P4 4-signal decision rule (Outcomes 1, 2, 3)
│   ├── questionBank.js        # Seeded tasks (1-5) and parametric scenario generator
│   ├── mockData.js            # Preloaded viva scenarios (Scenario A & B)
│   └── state.js               # Central store, local storage persistence, observer pattern
├── docs/                      # Complete evaluation documentation (00 to 09)
├── .gitignore                 # Standard clean git exclusions
├── AGENTS.md                  # Exam instructions and discipline rules
├── DESIGN.md                  # Comprehensive educational design specification
└── README.md                  # Project overview and quick start guide
```

---

## 2. Key Modules & Functional Responsibilities

### `src/mathEngine.js`
- **Purpose:** Pure mathematical calculation engine for retail percentages.
- **Key Functions:**
  - `calcDiscountAmount(mp, discountPct)`: Computes $MP \times \frac{D\%}{100}$.
  - `calcSellingPriceFromDiscount(mp, discountPct)`: Computes $MP - \text{Discount}$.
  - `calcProfitAmount(sp, cp)`: Computes $SP - CP$.
  - `calcProfitPct(sp, cp)`: Computes $\frac{SP - CP}{CP} \times 100$.
  - `calcSuccessiveDiscounts(initialPrice, d1, d2)`: Computes multi-step compound discounts and compares with the naive sum $d1 + d2$.
  - `calcMaxDiscountForMinProfit(cp, mp, minProfitPct)`: Solves reverse optimization for Target SP and Maximum Discount %.

### `src/diagnosticEngine.js`
- **Purpose:** Evaluates numerical answers and written explanations, identifying misconceptions.
- **Key Functions:**
  - `evaluateTask1(inputs)`: Checks geometry box role assignments and discount base.
  - `evaluateTask2(inputs)`: Checks school bag SP & Profit %, explicitly checking if learner took 15% of CP (₹800) yielding ₹120 (M1 error).
  - `evaluateTask3(inputs)`: Checks Kabir's 10%+10%=20% claim, checking intermediate ₹450 price and final ₹405 price (M2 error).
  - `evaluateTask4(inputs)`: Checks reverse headphones strategy, detecting if ₹280 was divided by CP ₹1,200 (M1 error).
  - `evaluateTask5(taskData, inputs)`: Parameterized evaluator for dynamically generated scenarios.
  - `evaluateWithGemini(apiKey, prompt, fallbackResult)`: Optional live LLM connector with automatic fallback.

### `src/adaptiveRules.js`
- **Purpose:** Implements the P4 4-signal decision rule.
- **Key Functions:**
  - `evaluateNextPathway(learnerState, latestSubmission)`: Evaluates Accuracy (A), Explanation (E), Telemetry (I), and Mastery (M).
  - **Returns:** Pathway object containing `outcomeCode` (`OUTCOME_1`, `OUTCOME_2`, `OUTCOME_3`), title, and pedagogical rationale.

### `src/state.js`
- **Purpose:** Unified reactive store and `localStorage` persistence.
- **Key Functions:**
  - `submitTask(submissionData, pathwayData)`: Records learner work, updates mastery and active flags.
  - `approveSubmission(submissionId)`: Teacher verifies AI feedback.
  - `editSubmission(submissionId, editedFeedback)`: Teacher customizes feedback text.
  - `overrideSubmission(submissionId, overrideData)`: Teacher overrides diagnosis and forces pathway.
  - `loadScenarioA()`, `loadScenarioB()`: Loads preset states for viva walkthroughs.

### `app.js`
- **Purpose:** Application controller.
- **Key Functions:**
  - Handles screen tab transitions and dual-role switching (`Learner View` ↔ `Teacher View`).
  - Powers interactive Receipt Explorer with live Rupee-Bar updates.
  - Manages task submissions and renders feedback boxes.
  - Synchronizes Teacher Review Queue, mastery tracks, and audit log.
