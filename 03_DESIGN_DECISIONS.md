# Phase P1: Architecture & Design Decisions (ADRs)

- **Identity Token:** `<24b3020>`
- **Exam Card:** `P4-T9-L5-C5`
- **Application:** Adaptive Percentage PAL with Teacher-in-the-Loop Supervision

---

### D-1: Pure Vanilla Web Architecture (HTML5 + CSS3 + ES6) vs Complex Framework
- **Context:** Need to build, test, and deploy a robust educational application within a strict exam window without build-step fragility.
- **Options Considered:** 
  1. Full Next.js / React with Vite.
  2. Server-side Python / Flask.
  3. Pure modular Vanilla HTML5, modern CSS3, and ES6 JavaScript modules.
- **Decision:** Pure modular Vanilla HTML5/CSS3/ES6.
- **Why:** Zero npm dependency vulnerabilities, zero build or hydration failure risks, instant load times, 100% reliable deployment on Render/Vercel/GitHub Pages, and effortless code inspection during viva.
- **Trade-offs:** Manual DOM updating instead of JSX; solved via small helper render functions and reactive state observers.
- **Impact on Learning:** Instant response times (<100ms) prevent latency-induced frustration for an anxious learner.

---

### D-2: Deterministic Calculation Engine vs Pure LLM Arithmetic
- **Context:** The tutor must evaluate student calculations (SP, discount, profit %) without risk of calculation error.
- **Options Considered:**
  1. Sending calculations to an LLM API to evaluate.
  2. Deterministic client-side mathematical calculation engine.
  3. Pre-computed static answer keys.
- **Decision:** Deterministic client-side mathematical engine paired with an AI semantic reasoning evaluator.
- **Why:** LLMs are notorious for arithmetic slip-ups, especially with rounding and multi-step percentages. A deterministic engine computes exact mathematical truths (e.g., $MP - (D\% \times MP) = SP$) with zero hallucination.
- **Trade-offs:** Math formulas must be explicitly coded in JavaScript; this ensures 100% pedagogical precision.
- **Impact on Learning:** Sharvee never receives an incorrect "Wrong Answer" alert caused by AI hallucination.

---

### D-3: Shared Reactive State & LocalStorage for C5 Dual-Role Architecture
- **Context:** Constraint C5 demands a teacher view that reflects learner progress and lets the teacher approve or override AI feedback.
- **Options Considered:**
  1. Separate client and server apps with database polling or WebSockets.
  2. Single SPA with an instant role switcher (`Learner View` ↔ `Teacher Dashboard`) sharing a reactive state store backed by `localStorage`.
- **Decision:** Single SPA with an instant role switcher backed by a unified reactive store and `localStorage`.
- **Why:** Allows an examiner or teacher to toggle between Sharvee's screen and Ms. Deshmukh's screen with one click. Changes made by the teacher immediately update what the learner sees without network lag.
- **Trade-offs:** Simulates multi-device collaboration on a single device during evaluation; production would hook the same state store to a lightweight backend.
- **Impact on Learning:** Enables live demonstration of human-in-the-loop oversight.

---

### D-4: Explicit 4-Signal Decision Rule for P4 Design Challenge
- **Context:** P4 requires answering how the tutor decides whether the learner needs a harder question, an alternative explanation, or prerequisite instruction.
- **Options Considered:**
  1. Simple percentage score threshold (e.g., >80% = hard, <50% = easy).
  2. Multi-signal rule evaluating: (A) Numerical Accuracy, (E) Misconception Diagnosis (M1/M2), (I) Interaction telemetry (hints, attempts), and (M) Mastery history.
- **Decision:** Multi-signal 4-factor decision rule.
- **Why:** High score alone does not capture conceptual confusion (e.g., guessing right with wrong reasoning). Evaluating explanations reveals whether M1 or M2 is active, routing directly to visual reframing (Outcome 2) rather than formula drills.
- **Trade-offs:** Requires more diagnostic parsing logic.
- **Impact on Learning:** Provides precise, tailored remediation that matches Sharvee's exact Zone of Proximal Development.

---

### D-5: Diverse Non-MCQ Question Formats (Beyond Multiple Choice)
- **Context:** P4 explicitly requires supporting at least 3 question formats beyond standard multiple choice.
- **Options Considered:**
  1. Radio button MCQs with feedback.
  2. 4 distinct non-MCQ formats: (1) Interactive Price-Tag Mapping, (2) Step-by-Step Workspace with Written Explanation, (3) Error-Spotting & Critique ("Kabir's Mistake"), and (4) What-If Reverse Pricing Prediction.
- **Decision:** Implement all 4 rich non-MCQ formats plus an AI-generated micro-scenario.
- **Why:** Multiple choice allows lucky guessing and hides misconceptions. Tactile dragging/mapping and written critiques force active cognitive synthesis.
- **Trade-offs:** Takes more effort to code distinct input components.
- **Impact on Learning:** Sharvee experiences varied, engaging problem contexts that demystify textbook math.

---

### D-6: C5 Teacher Review Queue with 3-Way Action (Approve, Edit, Override)
- **Context:** The teacher must visibly oversee AI-generated feedback and have authority over the system.
- **Options Considered:**
  1. Read-only teacher dashboard with past analytics.
  2. Interactive review queue with 3 distinct actions: Approve (verifies AI text), Edit (modifies AI text), and Override (replaces text and re-routes adaptive path).
- **Decision:** Full 3-action Review Queue with clear provenance badges in the learner view.
- **Why:** Directly satisfies constraint C5. Gives the teacher meaningful agency over the AI rather than superficial observation.
- **Trade-offs:** Requires tracking feedback status (`pending`, `approved`, `edited`, `overridden`).
- **Impact on Learning:** The learner sees reassuring badges like `[Verified by Ms. Deshmukh]`, building trust and emotional safety.

---

### D-7: Anxiety-Attenuating Aesthetic & UI Design for Persona L5
- **Context:** Sharvee has high math anxiety and low self-efficacy after failing her first test.
- **Options Considered:**
  1. Gamified timer with point deductions and red alert sirens.
  2. Calm, supportive, conversational UI with pastel tones (teal, warm amber, soft slate), no timers, gentle microcopy, and progress indicators.
- **Decision:** Calm, low-threat aesthetic with friendly conversational microcopy and an initial anxiety check-in.
- **Why:** High cognitive arousal and stress paralyze working memory in math-anxious adolescents. Calming aesthetics foster psychological safety.
- **Trade-offs:** Less "arcade excitement"; far higher genuine learning efficacy.
- **Impact on Learning:** Lowers affective filters and encourages persistence.

---

### D-8: Pre-Seeded Contrasting Demonstration Scenarios (A & B) for Viva
- **Context:** Examiner and user must be able to observe both the Correct Learner Path (Scenario A) and Misconception Path (Scenario B) live on demand.
- **Options Considered:**
  1. Requiring manual typing of complex mathematical inputs every time.
  2. One-click Scenario Pre-loader buttons in the About / Viva screen allowing instant loading of Scenarios A and B.
- **Decision:** Implement one-click scenario loaders in addition to free manual input.
- **Why:** Enables rapid, flawless live demonstration during the 5-minute viva walkthrough without typing errors.
- **Trade-offs:** Small additional utility functions in mock data.
- **Impact on Learning:** Guarantees examiner can observe both adaptive pathways effortlessly.
