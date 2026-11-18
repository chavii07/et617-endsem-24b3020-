# Phase P3: MoSCoW Feature Matrix & Traceability

- **Identity Token:** `<24b3020>`
- **Exam Card:** `P4-T9-L5-C5`
- **Application:** Adaptive Percentage PAL with Teacher-in-the-Loop Supervision

---

## 1. MoSCoW Feature Status Table

| Priority | Feature Name | Description & Pedagogical Purpose | Implementing Module(s) | Status |
|---|---|---|---|---|
| **Must Have** | **Learner Welcome & Calm Check-in (Screen 1)** | Introduces Sharvee (L5), captures pre-session confidence (1–5 slider), and establishes a psychologically safe environment. | `index.html`, `app.js`, `styles.css` | **DONE** |
| **Must Have** | **Three-Price Story & Receipt Explorer (Screen 2)** | Situates math in retail items (Masala Chips, Stationery). Renders live savings, discount % on MRP, and "+ Extra 10% discount" toggle for successive discounting. | `index.html`, `app.js`, `src/mathEngine.js` | **DONE** |
| **Must Have** | **Non-MCQ Adaptive Workspace (Screen 3)** | 5 tasks across 4 formats: Price-Tag Mapping, Step-by-Step Workspace, Error Critique (Kabir's fallacy), What-If Strategy, and Dynamic Scenario. | `index.html`, `app.js`, `src/questionBank.js`, `src/diagnosticEngine.js` | **DONE** |
| **Must Have** | **Deterministic Math Engine** | Exact pure JS computation of discount amount, Selling Price, profit amount, profit %, and successive discounts. Eliminates arithmetic hallucinations. | `src/mathEngine.js` | **DONE** |
| **Must Have** | **Misconception Diagnosis Engine (M1 & M2)** | Diagnoses Base-Value Confusion (M1), Additive Percentage Fallacy (M2), Prerequisite Gaps, and Sound Reasoning from numeric inputs & written explanations. | `src/diagnosticEngine.js` | **DONE** |
| **Must Have** | **P4 Decision Rule & 3 Outcomes (Screen 4)** | Evaluates (A) Accuracy, (E) Misconception, (I) Telemetry, and (M) Mastery history to route learner to: Outcome 1 (Harder), Outcome 2 (Visual Rupee-Bar), or Outcome 3 (Mental Booster). | `src/adaptiveRules.js`, `index.html`, `app.js` | **DONE** |
| **Must Have** | **C5 Teacher-in-the-Loop Dashboard (Screen 5)** | Real-time telemetry, Bloom's LO mastery bars, active misconception flags, and Teacher Review Queue with Approve, Edit, and Override actions. | `src/state.js`, `index.html`, `app.js` | **DONE** |
| **Must Have** | **Auditable Review Log** | Full chronological log of AI feedback proposals, teacher approvals, edits, and overrides. | `src/state.js`, `app.js` | **DONE** |
| **Must Have** | **Prominent Identity Token Display** | Token `24b3020` visibly displayed on the header, footer of every screen, and on the Inspector screen. | `index.html`, `styles.css` | **DONE** |
| **Should Have** | **Viva Preset Walkthrough Buttons (Screen 6)** | Instant 1-click loading of Scenario A (Correct Path) and Scenario B (M1 Misconception Path) for evaluator demonstrations. | `src/mockData.js`, `app.js` | **DONE** |
| **Should Have** | **Visual Rupee-Bar Base Comparison** | Graphical stacked bars comparing 15% discount on Marked Price (₹1,000) vs Cost Price (₹800). | `index.html`, `styles.css` | **DONE** |
| **Should Have** | **Optional Gemini AI with Fallback** | Allows entering optional `VITE_GEMINI_API_KEY` for semantic evaluation, with 100% offline fallback to deterministic rule engine. | `src/diagnosticEngine.js`, `app.js` | **DONE** |
| **Could Have** | **Mental Math Mini-Booster (Outcome 3)** | Interactive 3-step guide for calculating 10% and 5% mentally by zero-shifting. | `index.html`, `app.js` | **DONE** |
| **Could Have** | **Quick Demo: Auto-Approve Toggle** | Helper switch allowing single-user testing without switching between views manually. | `src/state.js`, `app.js` | **DONE** |
| **Won't Have** | External SQL Database / Backend Server | Omitted by design (D-1 & D-3) to ensure zero cold-start delay, 100% uptime, and instant static hosting. | N/A (State in `localStorage`) | **INTENTIONAL** |
| **Won't Have** | Generic User Login / Auth Wall | Omitted per AGENTS.md Section 3 Rule 7; direct dual-role switcher provided instead. | N/A | **INTENTIONAL** |

---

## 2. Objective Traceability Mapping

- **LO1 (Distinguish & Anchor CP vs MP vs SP):** Addressed by Screen 2 Sneaker Story, Task 1 Role Mapping, and Screen 4 Rupee-Bar comparison.
- **LO2 (Calculate Discount & Profit %):** Addressed by Screen 2 Receipt Calculator, Task 2 Step Workspace, Task 4 What-If Strategy, and `MathEngine.js`.
- **LO3 (Critique Successive Discounts & Fallacies):** Addressed by Screen 2 Festive Discount toggle, Task 3 Kabir Error Critique, and Task 5 Sneaker Scenario.
- **Constraint C5 (Teacher-in-the-Loop):** Addressed by Screen 5 Teacher Review Queue with functional Approve, Edit, and Override controls synchronized via `state.js`.
- **Problem P4 (Adaptive Decision Rule):** Addressed by `src/adaptiveRules.js` and Screen 4 displaying the explicit 3 outcomes.
