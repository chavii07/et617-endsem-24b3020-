# Phase P1: Educational Design Rationale

- **Identity Token:** `<24b3020>`
- **Exam Card:** `P4-T9-L5-C5`
- **Application:** Adaptive Percentage PAL with Teacher-in-the-Loop Supervision

---

## 1. Target Learner Profile (Persona L5: Sharvee Kulkarni)

- **Demographics:** 13 years old, Class 8, Pune, Maharashtra.
- **Academic State:** Scored 28/100 on initial percentages unit test. Lacks intuitive grasp of retail math; textbook drills induced memorization of disconnected formulas ($SP = \frac{100 - D\%}{100} \times MP$).
- **Affective & Psychological State:** High math anxiety, low self-efficacy ("I'm just bad at math; formulas confuse me"). High sensitivity to harsh red "WRONG" banners and abrupt AI judgments.
- **Cognitive Strengths:** Solid foundational arithmetic (multiplication tables, fractions like $1/2 = 50\%$, $1/10 = 10\%$, and calculating $10\%$ or $5\%$ of round numbers).
- **Two Core Misconceptions:**
  1. **M1 (Base-Value Confusion):** Anchoring discounts to Cost Price (CP) instead of Marked Price (MP), or profit to Selling Price (SP).
  2. **M2 (Additive / Symmetric Percentage Fallacy):** Believing repeated discounts ($10\% + 10\%$) equal a flat $20\%$ off, or that $+20\%$ followed by $-20\%$ cancels out to the original price.

---

## 2. Measurable Learning Objectives (Bloom's Taxonomy)

| Code | Objective | Bloom Level | Success Metric |
|---|---|---|---|
| **LO1** | **Distinguish & Anchor:** Differentiate between Cost Price (CP), Marked Price (MP), and Selling Price (SP) in real-world retail problems, consistently identifying MP as the base for discounts and CP as the base for profit/loss. | *Understand / Analyze* | $\ge 80\%$ correct identification in price-tag mapping and open scenarios. |
| **LO2** | **Calculate & Deduce:** Calculate single discount amounts, net Selling Price, and profit/loss percentage using intuitive step-by-step reasoning rather than mechanical formulas. | *Apply* | Accurate multi-step calculations on at least 4 out of 5 non-MCQ tasks. |
| **LO3** | **Critique & Explain:** Predict and articulate in writing why successive discounts (e.g., $10\% + 10\%$) do not equal their sum, identifying that each discount operates on a diminished base. | *Evaluate / Create* | Successfully spot errors in simulated peer reasoning (Kabir's fallacy) and articulate the shifting base in $\ge 2$ tasks. |

---

## 3. Pedagogical Theory & Instructional Design

### A. Situated Cognition & Constructivism (Brown, Collins, & Duguid)
Instead of starting with abstract algebraic formulas, the learning journey grounds math in familiar Indian retail items (stationery, sneakers, masala chips). The "Everyday Store Receipt Explorer" allows Sharvee to input her own real-world purchases to see the rupee gap saved before abstract percentage representations are introduced.

### B. Cognitive Load Theory (Sweller)
- **Extraneous Load Reduction:** Clean, uncluttered typography ($\ge 16\text{px}$), calming teal and warm amber color palette, no ticking countdown clocks, no punitive red failure banners.
- **Intrinsic Load Management:** Chunking calculations into visible sub-steps (e.g., Step 1: Find Rupee Discount; Step 2: Subtract from Tag to find SP; Step 3: Compare SP with CP to find Profit).
- **Germane Load Optimization:** Asking Sharvee to write a 1–2 sentence explanation ("Why did you use ₹1,000 instead of ₹800?") forces deep schema construction.

### C. Vygotskian Scaffolding & Zone of Proximal Development (ZPD)
The tutor delivers dynamic scaffolding:
1. *Level 1 Scaffolding:* Gentle conceptual hint on demand ("Who looks at the price tag? The customer or the shopkeeper?").
2. *Level 2 Scaffolding (Outcome 2):* Interactive visual Rupee-Bar graphic displaying the proportion of MP vs CP.
3. *Level 3 Scaffolding (Outcome 3):* Prerequisite mental math booster (how to quickly calculate $10\%$ and $5\%$ mentally).

### D. Attribution Theory & Affective Safety (Weiner)
For an anxious repeat learner, errors are framed as natural stepping stones ("Great attempt! Let's check which price the customer sees first") rather than personal deficit indicators. Knowing her own teacher, Ms. Deshmukh, reviews and validates AI feedback provides reassurance and emotional safety.

---

## 4. End-to-End User Journey

```
[Screen 1: Welcome & Calm Check-in] 
        │ (Set self-efficacy slider, review friendly orientation)
        ▼
[Screen 2: Receipt Explorer & Sneaker Story] 
        │ (Experiment with real receipts: MRP, SP, Discount %, 10%+10% toggle)
        ▼
[Screen 3: Adaptive Learner Workspace (Tasks 1 to 5)]
        │ (Engage with Non-MCQ: Role Mapping, Step-by-Step, Error Critique, What-If)
        ▼
[Deterministic Math Engine + AI Diagnosis]
        │
   ┌────┴──────────────────────────────┐
   ▼                                   ▼
[Screen 4: Adaptive Branch]     [Screen 5: C5 Teacher Review Queue]
- Outcome 1: Harder Challenge    - Telemetry & Misconception Flags
- Outcome 2: Visual Rupee Bar    - Teacher: Approve / Edit / Override
- Outcome 3: Prerequisite Mini   - Syncs verified note to Learner
   └────┬──────────────────────────────┘
        ▼
[Screen 6: About & Pedagogical Viva Inspector]
```

---

## 5. Non-MCQ Question Formats (Beyond Multiple Choice)

1. **Format 1: Interactive Price-Tag Mapping (Drag/Click Role Assignment):** Assign physical rupee tags (₹400, ₹500, ₹450) to CP, MP, and SP, and click to declare the discount base.
2. **Format 2: Step-by-Step Workspace with Written Explanation:** Discrete numerical inputs for sub-steps (Discount ₹, Net SP, Profit ₹, Profit %) paired with a mandatory written justification textarea.
3. **Format 3: Error-Spotting & Peer Critique ("Fix Kabir's Mistake"):** Students evaluate an erroneous peer argument ($10\% + 10\% = 20\%$), specify whether Kabir is right or wrong, recalculate the true price, and explain the fallacy.
4. **Format 4: What-If Prediction & Boundary Explorer:** Students reverse-engineer target pricing: given target minimum profit, calculate the maximum allowable discount percentage on MP.
5. **Format 5: AI-Generated Dynamic Micro-Scenario:** Contextual problem tailored to the student's active misconception tag (M1, M2, or Harder).

---

## 6. C5 Constraint: Teacher-in-the-Loop Supervisory Workflow

1. **Telemetry Dashboard:** Live display of Sharvee's attempts, hints used, active misconception flags (M1, M2), and LO mastery gauges.
2. **Review Queue:** Every AI diagnosis and feedback draft enters the Teacher Queue in "Pending Review" state.
3. **Teacher Interventions:**
   - **Approve:** Marks AI feedback as "Verified by Ms. Deshmukh".
   - **Edit:** Allows Ms. Deshmukh to personalize tone, add encouraging phrases, or adjust the hint.
   - **Override:** Teacher can change the diagnosed misconception tag or reroute the adaptive branch outcome.
4. **Transparent Learner View:** Learner sees an explicit badge: `[Verified by Ms. Deshmukh]` or `[Teacher Note: Edited by Ms. Deshmukh]`.

---

## 7. Curriculum Traceability Matrix

| Component / Feature | Learning Objective | Pedagogical Theory / Rationale |
|---|---|---|
| **Everyday Store Receipt Explorer** | LO1, LO2 | Situated Cognition; grounds percentages in concrete everyday transactions before formulas. |
| **Task 1: Price-Tag Mapping** | LO1 | Cognitive Load Theory; separates identification of price roles from arithmetic burden. |
| **Task 2: Step-by-Step Workspace + Textarea** | LO1, LO2 | Germane Load & Schema Building; connects numeric operations to explicit verbal reasoning. |
| **Task 3: Error Critique (Kabir's Claim)** | LO3 | Productive Failure & Conceptual Conflict; confronts M2 additive fallacy directly. |
| **Task 4: What-If Maximum Discount** | LO1, LO2 | Higher-Order Reverse Reasoning; anchors understanding of CP/MP boundary conditions. |
| **Adaptive Decision Engine (3 Outcomes)** | LO1, LO2, LO3 | Vygotskian ZPD; matches cognitive challenge to learner readiness. |
| **C5 Teacher-in-the-Loop Review Queue** | All LOs | Affective Safety & Attribution Theory; human oversight prevents AI alienation for anxious learners. |

---

## 8. Evaluation & Impact Measurement Plan

- **Pre/Post Measure:** Diagnostic Task 1 accuracy vs Post-Intervention Task 5 accuracy.
- **Misconception Resolution Rate:** Frequency of M1/M2 errors from initial attempt to retry.
- **Scaffolding Index:** Hints requested vs unassisted correct answers over time.
- **Self-Efficacy Scale:** Pre-session confidence rating (1–5) compared with post-session confidence score.
- **Teacher Audit Factor:** Percentage of AI feedback approved without edit vs edited/overridden.
