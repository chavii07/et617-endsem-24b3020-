# Adaptive Percentage PAL (Tutor) with Teacher-in-the-Loop Supervision

[![Identity Token](https://img.shields.io/badge/Identity%20Token-24b3020-0284c7.svg)](#)
[![Exam Card](https://img.shields.io/badge/Exam%20Card-P4--T9--L5--C5-d97706.svg)](#)
[![Status](https://img.shields.io/badge/Build-Passing%20100%25-059669.svg)](#)
[![Platform](https://img.shields.io/badge/Deployment-Vercel%20%2F%20Render-teal.svg)](#)

> **ET 617-2026 End-Semester Examination**  
> **Repository:** `et617-endsem-24b3020`  
> **Identity Token:** `<24b3020>` (Visibly displayed on every screen and the Inspector page)  
> **Live URL:** `https://et617-24b3020.vercel.app` (or `https://et617-endsem-24b3020.onrender.com`)

---

## 1. Executive Summary & Pedagogical Pitch

**Percentages: Discount, Profit and Loss (Class 8)** is a notoriously challenging inflection point in middle-school mathematics. Young repeat learners who fail the unit often develop high math anxiety and low self-efficacy due to rote formula memorization ($SP = \frac{100 - D\%}{100} \times MP$) that detaches them from conceptual meaning. 

This **Adaptive Pedagogical Action Learner (PAL)** re-anchors mathematical intuition through everyday retail contexts (stationery, sneakers, masala chips in Pune, Maharashtra). It features:
- **Interactive "My Everyday Store Receipt" Explorer** with dynamic rupee-bar visualizations and a successive discount toggle.
- **5 Non-MCQ Adaptive Tasks across 4 Formats:** Price-Tag Role Mapping, Step-by-Step Numerical Workspaces with Reasoning Boxes, Error Critique ("Fix Kabir's Mistake"), and What-If Strategic Predictions.
- **P4 4-Signal Decision Rule:** Decides dynamically between **Outcome 1 (Harder Question)**, **Outcome 2 (Visual Rupee-Bar Remediation)**, and **Outcome 3 (Mental Math Mini-Booster)**.
- **C5 Teacher-in-the-Loop Supervisory Console:** Allows Ms. Deshmukh to monitor real-time telemetry, track Bloom's LO mastery, audit misconception flags (M1 & M2), and **Approve**, **Edit**, or **Override** AI feedback before or alongside delivery.
- **Zero-Dependency Resilience:** 100% offline-ready deterministic mathematical engine paired with an optional Gemini AI semantic evaluator.

---

## 2. Exam Card Specifications

| Component | Code | Description | Implementation Highlight |
|---|---|---|---|
| **Problem Statement** | **P4** | Adaptive tutor with automatic question generation | Multi-signal decision rule yielding 3 distinct outcomes (Harder, Alternative Visual, Prerequisite) |
| **Topic** | **T9** | Percentages: discount, profit and loss (Class 8) | Retail situations (CP, MP, SP), single & successive discounts, profit % |
| **Learner Context** | **L5** | Learner repeating topic after failing once, high anxiety, low self-efficacy | Calming teals/warm neutrals, no harsh red alerts, $\ge 16\text{px}$ font, empathetic framing |
| **Design Constraint**| **C5** | Teacher-in-the-loop: progress view with approve/override AI feedback | Synchronized Teacher Review Queue with Approve, Edit, and Override controls |
| **Identity Token** | **24b3020** | Candidate roll number identifier | Visibly displayed in the sticky header, footer of every screen, and on the Inspector screen |

---

## 3. Screen Architecture (6 Connected States)

1. **Screen 1: Learner Welcome & Calm Check-in** — Orientation for Sharvee (L5), 1–5 confidence check-in slider, and supportive tone setting.
2. **Screen 2: Concept Anchor & Everyday Store Receipt Explorer** — The 3-Price Sneaker Story (CP ₹1,000 → MP ₹1,500 → SP ₹1,350), Two Golden Rules, and live interactive receipt calculator with visual Rupee-Bar.
3. **Screen 3: Adaptive Learner Workspace** — 5 tasks across 4 non-MCQ formats diagnosing Base-Value Confusion (M1) and Additive Fallacies (M2), displaying teacher-approved feedback tags.
4. **Screen 4: Adaptive Intervention & Branch View** — Explicit P4 3-outcome matrix, dynamic Rupee-Bar comparison (comparing 15% on MP vs CP), and mental math mini-booster.
5. **Screen 5: C5 Teacher-in-the-Loop Dashboard** — Ms. Deshmukh's supervisory console with live accuracy, Bloom's LO mastery bars, Review Queue with Approve/Edit/Override actions, and auditable history.
6. **Screen 6: Pedagogical Inspector & Viva Screen** — Full decision rule matrix, live reactive store inspector, and 1-click **Scenario A (Correct Path)** & **Scenario B (M1 Misconception Path)** preset loaders.

---

## 4. Quick Start (Run Locally in 5 Seconds)

Because this application is built with pure Vanilla HTML5, modern CSS3, and ES6 modules, **no npm install or build step is required**:

```bash
# Clone the repository
git clone https://github.com/<username>/et617-endsem-24b3020.git
cd et617-endsem-24b3020

# Run with any static HTTP server (e.g., Python 3)
python -m http.server 3000

# Open in your browser
http://localhost:3000
```
*(Or simply double-click `index.html` to open directly in Chrome/Edge/Firefox).*

---

## 5. Deployment Instructions

### Vercel (Recommended)
1. Import repository `et617-endsem-24b3020` into Vercel.
2. Set Framework Preset to **Other**, Build Command to **Empty**, and Publish Directory to `./` (root).
3. Click **Deploy**.

### Render Static Site
1. Dashboard → **New +** → **Static Site** → select `et617-endsem-24b3020`.
2. Build Command: Leave empty (or `echo "no build"`).
3. Publish Directory: `.`
4. Click **Create Static Site**.

---

## 6. Comprehensive Documentation Index

All phase deliverables per `AGENTS.md` are available in `/docs`:
- [`docs/00_PROBLEM_ANALYSIS.md`](./docs/00_PROBLEM_ANALYSIS.md) — Problem statement, persona, Bloom's outcomes, and MoSCoW scoping.
- [`docs/01_DESIGN_RATIONALE.md`](./docs/01_DESIGN_RATIONALE.md) — Educational theory, situated learning, and cognitive load management.
- [`docs/02_ARCHITECTURE.md`](./docs/02_ARCHITECTURE.md) — System architecture, Mermaid component diagrams, and data schemas.
- [`docs/03_DESIGN_DECISIONS.md`](./docs/03_DESIGN_DECISIONS.md) — Living Architecture Decision Records (ADRs D-1 through D-8).
- [`docs/04_FEATURES.md`](./docs/04_FEATURES.md) — Detailed feature traceability matrix.
- [`docs/05_TESTING.md`](./docs/05_TESTING.md) — Functional test checklist, accessibility checks, and responsive verification.
- [`docs/06_DEMO_SCRIPT.md`](./docs/06_DEMO_SCRIPT.md) — 5-minute timed viva demo walkthrough with exact click path.
- [`docs/07_VIVA_QA.md`](./docs/07_VIVA_QA.md) — 25+ evaluator Q&A pairs covering pedagogy, architecture, and defense.
- [`docs/08_LIMITATIONS_AND_FUTURE_WORK.md`](./docs/08_LIMITATIONS_AND_FUTURE_WORK.md) — Honest limitations and roadmap.
- [`docs/09_CODE_WALKTHROUGH.md`](./docs/09_CODE_WALKTHROUGH.md) — Module-by-module codebase guide.
- [`docs/RENDER_DEPLOYMENT.md`](./docs/RENDER_DEPLOYMENT.md) — Deployment setup guide.
