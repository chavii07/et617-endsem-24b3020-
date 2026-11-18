# Engineering & Pedagogical Development Log

- **Identity Token:** `<24b3020>`
- **Repository:** `et617-endsem-24b3020`
- **Exam Card:** `P4-T9-L5-C5`

---

## Phase Logs

### 2026-11-18 19:14 IST — Phase P0: Problem Analysis & Scoping
- Evaluated exam card P4-T9-L5-C5.
- Defined Bloom's revised taxonomy learning outcomes (LO1, LO2, LO3).
- Expanded Learner Persona L5 (Sharvee Kulkarni, 13, Class 8 repeat learner, Pune).
- Documented two core misconceptions: M1 (Base-Value Confusion) and M2 (Additive Fallacy).
- Output committed to `docs/00_PROBLEM_ANALYSIS.md` and `DESIGN.md`.

### 2026-11-18 19:16 IST — Phase P1: Design Rationale & Architecture
- Authored `docs/01_DESIGN_RATIONALE.md` mapping features to Sweller's Cognitive Load Theory, Vygotskian scaffolding, and situated learning.
- Developed Mermaid system component and data flow diagrams in `docs/02_ARCHITECTURE.md`.
- Established ADRs D-1 to D-8 in `docs/03_DESIGN_DECISIONS.md` selecting pure Vanilla ES6 for zero-build reliability and offline deterministic math execution.

### 2026-11-18 19:22 IST — Phase P2: Skeleton & Core Scaffolding
- Initialized clean `.gitignore` and deployment guide `docs/RENDER_DEPLOYMENT.md`.
- Engineered pure deterministic mathematics solver in `src/mathEngine.js` with exact percentage calculations and successive discount tracking.

### 2026-11-18 19:26 IST — Phase P3: Core Engine Implementation
- Built `src/diagnosticEngine.js` with heuristic explanation analysis and M1/M2 detection.
- Developed `src/adaptiveRules.js` implementing the P4 4-signal rule across all 3 outcomes.
- Scaffolded non-MCQ task bank and dynamic scenario generator in `src/questionBank.js`.
- Implemented central reactive store with `localStorage` in `src/state.js`.
- Preloaded viva test states for Scenario A and Scenario B in `src/mockData.js`.

### 2026-11-18 19:29 IST — Phase P4: UI/UX & Styling
- Designed calming teal and warm amber design system in `styles.css` with $\ge 16\text{px}$ typography and accessible contrast.
- Constructed complete 6-screen SPA in `index.html` featuring interactive receipt explorer, Rupee-Bar comparisons, teacher review queue, and viva inspector.
- Wired events and reactivity in `app.js`.

### 2026-11-18 19:32 IST — Phase P5: Documentation, Verification & Demo Prep
- Verified all 15 functional tests in `docs/05_TESTING.md`.
- Prepared 5-minute evaluator demo script in `docs/06_DEMO_SCRIPT.md`.
- Compiled 25+ evaluator viva Q&A pairs in `docs/07_VIVA_QA.md`.
- Finalized `docs/04_FEATURES.md`, `docs/08_LIMITATIONS_AND_FUTURE_WORK.md`, `docs/09_CODE_WALKTHROUGH.md`, and root `README.md`.
