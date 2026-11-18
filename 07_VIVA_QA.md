# Phase P5: Comprehensive Viva Q&A Guide (25+ Questions & Answers)

- **Identity Token:** `<24b3020>`
- **Exam Card:** `P4-T9-L5-C5`
- **Application:** Adaptive Percentage PAL with Teacher-in-the-Loop Supervision

---

## Category 1: Problem & Pedagogical Relevance (P4, T9, L5)

### Q1: Why did you pick Percentages (Discount, Profit & Loss) for Class 8?
**Answer:** Class 8 is the pivotal transition from single-base percentage calculations (like simple interest or 10% of a number) to multi-base retail reasoning involving Cost Price (factory), Marked Price (sticker), and Selling Price (counter). Many students fail here because standard curricula force formula memorization without intuitive grounding.

### Q2: How did the L5 persona (anxious repeat learner) shape your interface?
**Answer:** Learners repeating a topic after failing carry high affective filter and fear of failure. We eliminated all harsh red "WRONG" alerts, countdown timers, and penalty scores. We used calming teals, warm neutrals, body fonts $\ge 16\text{px}$, step-by-step chunking, and gentle hints. Furthermore, the knowledge that her teacher (Ms. Deshmukh) is reviewing her work provides emotional safety.

### Q3: What is Misconception M1 and how do you diagnose it?
**Answer:** M1 is *Base-Value Confusion*. The learner calculates discounts using Cost Price (CP) instead of Marked Price (MP), or computes profit percentage on Selling Price (SP) instead of CP. In Task 2, if Sharvee calculates 15% of ₹800 = ₹120 instead of 15% of ₹1,000 = ₹150, our deterministic diagnostic engine immediately flags M1.

### Q4: What is Misconception M2 and how is it addressed?
**Answer:** M2 is the *Additive Percentage Fallacy*. Learners assume that two successive discounts (e.g., 10% + 10%) simply add up to a flat 20% discount. In Task 3 ("Fix Kabir's Mistake") and the Receipt Explorer, we break the price drop into two distinct chronological steps, visually demonstrating that the second 10% operates on the diminished price (₹450), yielding ₹45 off rather than ₹50.

### Q5: Why did you avoid traditional Multiple Choice Questions (MCQs)?
**Answer:** MCQs allow guessing and hide whether a student arrived at an answer through sound reasoning or through an algebraic misconception that happened to match a distractor. Our non-MCQ formats (Price-Tag Role Mapping, Numerical Step Workspaces, Error Critique, What-If Strategy) force active cognitive engagement and reveal intermediate reasoning.

---

## Category 2: Adaptive Engine & Decision Rule (P4 Design Challenge)

### Q6: How does the tutor decide between a Harder Question, Alternative Explanation, or Prerequisite Instruction?
**Answer:** The tutor evaluates a 4-signal decision rule:
1. *Signal A (Accuracy):* Is the numerical calculation correct within tolerance?
2. *Signal E (Explanation & Misconception):* Does the written reasoning reflect sound logic, M1, M2, or a prerequisite gap?
3. *Signal I (Interaction):* How many hints were requested and attempts made?
4. *Signal M (Mastery History):* Were previous tasks on this learning outcome solved consecutively?

### Q7: What triggers Outcome 1 (Harder Question)?
**Answer:** Two consecutive correct tasks with sound reasoning and zero hints used. The system routes the learner to multi-step retail challenges such as markup followed by discount (e.g., +25% markup on CP, then 10% discount on MP).

### Q8: What triggers Outcome 2 (Alternative Explanation)?
**Answer:** The detection of either M1 (Base Confusion) or M2 (Additive Fallacy) in the learner's calculation or written explanation. The system pauses standard question progression and renders an interactive visual Rupee-Bar comparing CP vs MP bases before offering a parallel retry.

### Q9: What triggers Outcome 3 (Prerequisite Instruction)?
**Answer:** Two consecutive calculation errors on the same concept or an arithmetic identification gap. The system provides an interactive 2-minute "Mental Math Mini-Booster" teaching zero-shifting to calculate 10% and 5% mentally.

### Q10: How does question generation avoid arithmetic hallucinations?
**Answer:** The AI generator (or template engine) creates contextual retail scenarios, but all expected numerical values (discounts, SP, profit %) are computed and verified deterministically by `MathEngine.js` before presentation.

---

## Category 3: Constraint C5 (Teacher-in-the-Loop)

### Q11: How is the Teacher-in-the-Loop constraint satisfied in the app?
**Answer:** We implemented a dual-role architecture (`Learner View` ↔ `Teacher Dashboard`) sharing a reactive state store. When Sharvee submits work, it enters Ms. Deshmukh's Review Queue. Ms. Deshmukh has three functional actions: **Approve Feedback**, **Edit Feedback**, and **Override Feedback & Pathway**.

### Q12: What happens when the teacher clicks "Approve Feedback"?
**Answer:** The submission is stamped as `Verified by Ms. Deshmukh` in the audit log, and a green shield badge appears in Sharvee's view verifying the explanation.

### Q13: What happens when the teacher clicks "Edit Feedback"?
**Answer:** An inline editor opens allowing Ms. Deshmukh to personalize the explanation in her own pedagogical voice (e.g., adding words of encouragement). Once saved, the feedback badge in Sharvee's view updates to `Teacher Feedback (Edited by Ms. Deshmukh)`.

### Q14: How does the "Override" feature work?
**Answer:** Ms. Deshmukh can override both the diagnostic classification (e.g., changing it from M1 to Prerequisite Gap) and manually force the adaptive routing outcome (forcing Outcome 1, 2, or 3). The action is recorded in the permanent auditable log.

### Q15: Why is a Teacher-in-the-Loop essential for vulnerable learners?
**Answer:** AI models can sometimes generate pedantic, abrupt, or subtly inaccurate feedback that damages the self-efficacy of an anxious student. Having human-in-the-loop validation ensures emotional safety, pedagogical accountability, and professional teacher agency.

---

## Category 4: System Architecture & Implementation

### Q16: Why did you choose Vanilla ES6 JavaScript over React/Next.js?
**Answer:** Vanilla HTML5, CSS3, and ES6 JavaScript modules have zero external build dependencies, zero npm package vulnerability risks, and zero hydration errors. It compiles in 0 seconds, runs locally and on any static CDN (Vercel, Render) with 100% reliability, and allows evaluators to inspect the code cleanly.

### Q17: How is state synchronized between Learner and Teacher views?
**Answer:** `src/state.js` implements a centralized Observer store pattern backed by browser `localStorage`. When state changes in either view, subscribers re-render their respective UI components reactively without network latency.

### Q18: What is the purpose of the "Quick Demo: Auto-Approve" toggle?
**Answer:** It allows a single examiner or user to test the learner workspace seamlessly without having to switch tabs back and forth to approve every single task, while keeping the full teacher workflow functional when disabled.

### Q19: How are API keys handled?
**Answer:** Per AGENTS.md rules, no API secrets are ever committed to git. The application runs 100% offline via its rich deterministic engine. Users can optionally input a key into the Inspector screen, stored only in client memory/localStorage.

### Q20: How does the app ensure accessibility (WCAG AA)?
**Answer:** High contrast ratios ($>4.5:1$ for normal text), large body typography ($\ge 16\text{px}$), semantic HTML (`<header>`, `<main>`, `<section>`, `<nav>`, `<button>`, `<label>`), full keyboard tab navigation, and clear visual indicator cues on all inputs.

---

## Category 5: Hostile & Stress Evaluation Questions

### Q21: "Isn't an offline deterministic fallback just hardcoding answers?"
**Answer:** Not at all. The deterministic engine is a parameterized mathematical solver (`MathEngine.calcSuccessiveDiscounts`, `MathEngine.calcSellingPriceFromDiscount`) that handles arbitrary numeric inputs. The question generator dynamically generates new numbers and contexts, while the math engine guarantees mathematical truth.

### Q22: "What if the student types a nonsense answer in the explanation box?"
**Answer:** The diagnostic engine checks for semantic retail keywords (e.g., '1000', 'tag', 'mrp', 'marked', 'cost', 'cp', 'base'). If random characters or irrelevant text are entered while the numbers are correct, the engine flags "Correct calculation with weak reasoning" and requests conceptual elaboration.

### Q23: "Why isn't this connected to a live multi-tenant backend database?"
**Answer:** Per AGENTS.md rules for a timed exam build, a static client-side reactive store guarantees zero cold-start failures, zero database migration bottlenecks, and instantaneous performance during viva. In production, the store's methods (`submitTask`, `approveSubmission`) map directly to REST or WebSocket endpoints.

### Q24: "Can the teacher accidentally break the learner's state?"
**Answer:** No. All state transitions pass through immutable updater methods with schema guards and audit logging, ensuring no invalid state can crash the learner view.

### Q25: "Where is your identity token displayed?"
**Answer:** Token `24b3020` is permanently visible in the header badge, on the bottom footer of EVERY screen, and on the dedicated About / Inspector screen (Screen 6).
