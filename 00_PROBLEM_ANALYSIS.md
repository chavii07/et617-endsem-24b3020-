# Phase P0: Problem Analysis & Exploration

- **Identity Token:** `<24b3020>`
- **Exam Card:** `P4-T9-L5-C5`
- **Topic:** Percentages: discount, profit and loss (Class 8)
- **Learner:** Learner repeating the topic after failing it once, high anxiety and low self-efficacy (Sharvee Kulkarni, 13)
- **Constraint:** Teacher-in-the-loop: teacher view showing learner progress and letting the teacher approve or override AI feedback (Ms. Deshmukh)

---

## 1. Problem Statement

### Verbatim (from ET 617-2026 Card P4 & T9)
> **P4 – Adaptive tutor with automatic question generation:**
> Design a tutor for your card's topic that generates questions based on the learner's performance, misconceptions and previous responses. It must go beyond multiple-choice: support at least three question formats, evaluate learner explanations, diagnose misconceptions and adjust the difficulty or nature of the next task.
>
> *Design challenge:* How does the tutor decide whether the learner needs a harder question, an alternative explanation or prerequisite instruction? State the decision rule and show each of the three outcomes.
>
> **T9 – Topic:** Percentages: discount, profit and loss (Cl. 8)
>
> **L5 – Learner context:** Learner repeating the topic after failing it once, high anxiety and low self-efficacy.
>
> **C5 – Design constraint:** A teacher view that shows learner progress and lets the teacher approve or override AI feedback.

### Restated in 3 Lines
1. Class 8 repeat learners freeze when calculating retail percentages because they confuse base prices (CP vs MP) or treat successive discounts additively.
2. The adaptive tutor assesses both numeric answers and written explanations across diverse non-MCQ tasks, dynamically routing students to harder challenges, visual reframings, or prerequisite mini-lessons based on a transparent 4-signal decision rule.
3. A synchronized Teacher-in-the-Loop review portal enables teachers to audit telemetry, edit/approve AI-generated diagnostic feedback in real time, and safeguard anxious students from abrupt automated judgments.

---

## 2. Users and Needs

| User | Profile & Context | Core Needs |
|---|---|---|
| **Primary Learner:** Sharvee Kulkarni (13, Class 8) | Failed unit test (28/100); high math anxiety, fear of failure; comfortable with basic arithmetic but confuses CP, MP, and SP; assumes 10%+10%=20% off. | - Low-threat, calm feedback (no harsh red error banners).<br>- Concrete, familiar real-world anchors (everyday store receipts: chips, stationery, sneakers).<br>- Non-MCQ interactive reasoning tasks (role mapping, step workspaces, error critique).<br>- Adaptive pacing: gentle scaffolding when stuck, reassuring human teacher presence. |
| **Teacher Supervisor:** Ms. Deshmukh (Math Teacher) | Supervises 20–30 remedial students during 30-min after-school clinic; cannot hand-grade every line instantly, but cannot trust black-box AI with vulnerable learners. | - Clear real-time dashboard of student progress, error patterns, and active misconception flags (M1, M2).<br>- Teacher Review Queue with 1-click Approve, inline Edit, or full Override of AI feedback before or as learner sees it.<br>- Explicit audit trail showing AI vs Teacher-reviewed status. |

---

## 3. Measurable Learning Objectives (Bloom's Revised Taxonomy)

1. **Distinguish & Classify (Understand / Analyze):** Correctly map Cost Price (CP), Marked Price (MP), and Selling Price (SP) in everyday retail contexts and identify the correct base value (MP for discount, CP for profit/loss) with >= 80% accuracy (4/5 tasks).
2. **Calculate & Solve (Apply):** Compute single discounts, net Selling Price, and profit/loss percentages step-by-step using conceptual intuition without formula memorization with >= 80% accuracy.
3. **Predict & Explain (Evaluate / Create):** Predict the actual net reduction of successive discounts (e.g., 10% + 10% off) or markup-discount pairs, explaining in writing why percentage changes do not linearly add or cancel out.

---

## 4. Constraints and Assumptions

### Constraints
- **C5 Constraint:** Dual-role architecture (Learner View ↔ Teacher Dashboard) with live progress tracking, misconception telemetry, and actionable Approve / Edit / Override capabilities for all AI evaluations.
- **P4 Design Challenge:** The tutor must implement an explicit multi-signal decision rule yielding 3 distinct outcomes: (1) Harder Question, (2) Alternative Visual Explanation, (3) Prerequisite Mini-Lesson.
- **Non-MCQ Requirement:** App must support at least 3 distinct non-MCQ question formats (Interactive Role Mapper, Step-by-Step Workspace with Reasoning Box, Error Critique / "Fix the Mistake", What-If Predictor).
- **Identity Token Rule:** Display `<24b3020>` on the footer of every screen and on the dedicated About / Viva inspector screen.
- **Reliability:** Must work completely offline with robust deterministic math evaluation and instant fallback templates if external LLM APIs fail or have latency.

### Assumptions
- Learners access the app on school tablets or desktop browsers (>= 360px viewport up to 1440px desktop).
- Remedial sessions last 15–30 minutes, structured in short modular micro-tasks with progress auto-saved in browser `localStorage`.
- Teacher and learner operate in the same remedial room or asynchronously; role switcher allows seamless live demonstration of the C5 feedback loop.

---

## 5. Candidate Solutions & Scoring

| Idea | Pedagogical Value (1-5) | Feasibility in Build Window (1-5) | Demo & Viva Impact (1-5) | Total (/15) |
|---|---|---|---|---|
| **Idea 1: Pure LLM Chatbot with Teacher Slack-style view**<br>Conversational chatbot that answers and critiques everything via live prompt generation. | 3 (High hallucination risk for arithmetic; unpredictable pacing for anxious learner) | 2 (Fragile API dependencies, rate limits, difficult to grade deterministically) | 3 (Chatbots feel generic and lack interactive tactile math tools) | 8/15 |
| **Idea 2: Static Form-based Quiz with Admin Table**<br>Fixed set of 5 HTML forms with a basic table for the teacher to view submitted rows. | 2 (Lacks real adaptivity, no dynamic question generation, uninspiring for anxious student) | 5 (Very fast to build) | 2 (Fails P4 adaptive depth, boring demo) | 9/15 |
| **Idea 3: Modular Adaptive PAL Engine with Interactive Visual Explorers, Deterministic Math Engine, and Live C5 Review Queue**<br>Features: (1) Everyday Store Receipt Explorer, (2) 4 Non-MCQ question formats, (3) 4-signal P4 adaptive decision engine with 3 visible branch outcomes, (4) Deterministic mathematical validator + AI reasoning evaluator, (5) Real-time Teacher Review Queue with Approve/Edit/Override and shared telemetry. | **5** (Deeply aligned with constructivist learning, low-anxiety UX, explicit misconception remediation) | **4.5** (Clean Single-Page Application using modern reactive vanilla JS / CSS; zero fragile dependencies; instant offline mode with realistic LLM evaluator fallback) | **5** (Visually rich, immediate live switching between Sharvee and Ms. Deshmukh, full viva transparency) | **14.5/15** |

---

## 6. Chosen Idea & Scope Boundary

### Chosen: Idea 3 — Modular Adaptive PAL Engine with Teacher-in-the-Loop Supervision
- **Why:** Fully satisfies every requirement of P4, T9, L5, and C5. Delivers rich cognitive engagement (interactive receipt explorer, drag/click price tag sorting, step workspace, Kabir error critique) while ensuring 100% mathematical accuracy via deterministic computation. The C5 Teacher Dashboard features a live review queue where teacher edits directly alter the learner's feedback in real time.

### Out of Scope (Explicit Cut)
- Complex multi-user server backend / database authentication (simulated via synchronized reactive state in `localStorage` with dual-view switcher).
- Voice recognition or video processing (outside card requirements).
- Full Grade 8 mathematics curriculum (scoped strictly to T9: Percentages, Discount, Profit and Loss).

---

## 7. MoSCoW Feature Prioritisation

### Must Have (P0/P1 - MVP)
- [x] Dual-role toggle: Learner View (Sharvee) ↔ Teacher View (Ms. Deshmukh) on top navigation bar.
- [x] Identity token `<24b3020>` in persistent footer on every screen and on Screen 6 (About Screen).
- [x] Screen 1: Calm check-in, anxiety level slider, orientation for Sharvee.
- [x] Screen 2: Everyday Store Receipt Explorer (live interactive MRP, SP, Discount calculator and 10%+10% successive toggle).
- [x] Screen 3: Adaptive Learner Workspace with 4+ Non-MCQ formats:
  - Task 1: Interactive Price-Tag Mapping (Assign CP, MP, SP and identify discount base).
  - Task 2: Step-by-Step Numerical Workspace with open written Explanation Box.
  - Task 3: Error-Spotting & Critique ("Kabir's 10%+10%=20% Mistake").
  - Task 4: What-If Prediction & Strategy Workspace.
  - Task 5: Dynamic AI-generated scenario based on diagnosed misconception.
- [x] Screen 4: Adaptive Branch View showing explicit P4 outcomes (Harder Question, Alternative Visual Rupee Bar, Prerequisite Booster).
- [x] Screen 5: C5 Teacher Dashboard: Live telemetry, misconception flags (M1, M2), and Teacher Review Queue with functional Approve, Edit, and Override actions.
- [x] Screen 6: About & Pedagogical Inspector Screen displaying card specs, decision rules, and live telemetry audit.

### Should Have (P2 - Core Polish)
- [x] Interactive visual rupee-bar and price tag graphic demonstrating M1 and M2 visually.
- [x] "Ask Ms. Deshmukh for a Gentle Hint" scaffolding button with non-judgmental progressive hints.
- [x] Deterministic calculation engine ensuring zero mathematical hallucinations.
- [x] Instant Scenario A (Mastery path) and Scenario B (Misconception M1 path) quick-run buttons for live viva demonstration.

### Could Have (P3 - Delight)
- [x] Confidence self-rating gauge update after completing tasks.
- [x] Export session report as printable PDF or summary view.

### Won't Have (Deferred)
- External cloud user account logins.
- Complex third-party UI framework bloat (keeps bundle ultra-lightweight and 100% deploy-safe).

---

## 8. Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| **External LLM API latency / outage during exam or demo** | High | Built-in Hybrid AI architecture: If Gemini/OpenAI API key is unavailable or fails, system activates high-fidelity built-in diagnostic evaluator simulating the exact prompt-response contract with zero downtime. |
| **Mathematical inaccuracies in generated questions** | Critical | Deterministic Mathematical Rule Engine calculates and verifies all SP, MP, CP, discount %, and profit % values independently before rendering. |
| **Teacher-learner state divergence** | Medium | Single shared state model stored in reactive memory and mirrored to `localStorage`. Teacher approvals and edits immediately trigger re-rendering in the learner view. |
| **Cognitive overload for anxious learner** | Medium | Calming pastel UI palette, friendly conversational copy, incremental step reveals, no red "WRONG" alarms, and empathetic teacher notes. |
