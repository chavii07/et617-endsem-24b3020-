# Phase P5: 5-Minute Evaluator Demo Script & Viva Flow

- **Identity Token:** `<24b3020>`
- **Exam Card:** `P4-T9-L5-C5`
- **Application:** Adaptive Percentage PAL with Teacher-in-the-Loop Supervision
- **Target URL:** `https://et617-24b3020.vercel.app` (or live Render URL / local demo)

---

## 1. Quick Timing Overview (5 Minutes Total)

| Minute | Screen / Phase | Core Action & Talking Points |
|---|---|---|
| **0:00 – 0:45** | **Identity & Screen 1** | Point out Identity Token `<24b3020>`, Exam Card `P4-T9-L5-C5`, and explain Sharvee's profile (L5: 13, Class 8 repeat learner, high anxiety). Show the 1–5 confidence check-in slider. |
| **0:45 – 1:30** | **Screen 2: Receipt Explorer** | Walk through the Sneaker Story (CP ₹1,000 → MP ₹1,500 → SP ₹1,350) and Two Golden Rules. Type "Masala Chips", MRP ₹50, Paid ₹45. Toggle "+ Extra 10% Festive Discount" to show successive discounting live on the Rupee-Bar. |
| **1:30 – 2:45** | **Screen 3: Non-MCQ Tasks** | Demonstrate Task 1 (Price-Tag Mapping) and Task 2 (School Bag Workspace). Show how the tutor diagnoses M1 (Base Confusion) if ₹120 is subtracted from ₹800 instead of ₹1,000. Show Task 3 Kabir Error Critique (refuting 10%+10%=20%). |
| **2:45 – 3:30** | **Screen 4: P4 Decision Rule** | Explain the 4 signals (A, E, I, M) and demonstrate the 3 outcomes: Outcome 1 (Harder Challenge), Outcome 2 (Visual Rupee-Bar base comparison), and Outcome 3 (Mental Math Booster). |
| **3:30 – 4:30** | **Screen 5: C5 Teacher Loop** | Switch to Ms. Deshmukh's view. Point out live telemetry, Bloom's mastery bars, and active M1 flag. In the Review Queue, show functional **Approve**, **Edit**, and **Override** controls. Show how edits immediately update Sharvee's screen. |
| **4:30 – 5:00** | **Screen 6: Inspector Screen** | Click "Scenario A" and "Scenario B" preset buttons to demonstrate instant state transitions. Show live reactive state inspector and confirm offline deterministic engine resilience. |

---

## 2. Step-by-Step Viva Click Path & Exact Script

### Step 1: Orientation & Persona Setup (Screen 1)
- **Click:** Top navigation tab "1. Calm Welcome" (or start on welcome screen).
- **Say:** *"Good afternoon. My identity token is `<24b3020>`, visibly displayed in the header, footer of every screen, and on the inspector page. My exam card is P4-T9-L5-C5: an adaptive tutor for Class 8 Percentages, designed for an anxious repeat learner named Sharvee Kulkarni, supervised by her teacher Ms. Deshmukh under a Teacher-in-the-Loop constraint."*
- **Action:** Move the confidence slider from 2 to 4 to show reactive feedback.

### Step 2: Concrete Intuition (Screen 2)
- **Click:** "2. Receipt Explorer".
- **Say:** *"Textbook drills fail anxious learners because they force formulas ($SP = \frac{100 - D\%}{100} \times MP$) before intuition. In Part A, we anchor the Two Golden Rules using a three-price sneaker story. In Part B, Sharvee enters real items like Masala Chips. When I toggle '+ Extra 10% festive discount', the visual rupee-bar immediately demonstrates that the second 10% applies to the reduced price (₹45), debunking the additive fallacy without formulas."*

### Step 3: Adaptive Non-MCQ Workspace (Screen 3)
- **Click:** "3. Adaptive Workspace".
- **Say:** *"P4 requires at least 3 non-MCQ formats. We provide 5 tasks across 4 formats: Price-Tag Mapping, Step Workspace with Reasoning Box, Error Critique ('Fix Kabir's Mistake'), What-If Prediction, and a Dynamic Scenario. Notice that when an answer is submitted, the learner sees an immediate supportive preliminary check alongside a clear badge: 'Sent to Ms. Deshmukh for review'."*

### Step 4: The P4 Decision Challenge (Screen 4)
- **Click:** "4. Adaptive Branch & Visual Bar".
- **Say:** *"Our P4 decision rule evaluates 4 signals: Numerical Accuracy (A), Explanation & Misconceptions (E), Interaction telemetry (I), and Mastery history (M). This triggers one of three pedagogical outcomes: Outcome 1 provides a harder question after consecutive unassisted mastery; Outcome 2 presents an interactive visual Rupee-Bar re-anchoring when M1 or M2 is detected; and Outcome 3 provides a 2-minute mental math booster if prerequisite arithmetic stalls."*

### Step 5: C5 Teacher-in-the-Loop Supervision (Screen 5)
- **Click:** "5. Teacher-in-the-Loop" (or click the role switcher "Teacher View").
- **Say:** *"Under Constraint C5, AI is never an unchecked authority over an anxious child. Ms. Deshmukh sees real-time telemetry, Bloom's LO bars, and active misconception flags. In the Review Queue, she can click 'Approve' to verify AI feedback, click 'Edit' to personalize the explanation in her own voice, or click 'Override' to manually reroute the learning pathway."*
- **Action:** Click "Approve AI Feedback" or "Edit Feedback" and point out the audit log update.

### Step 6: Viva Inspector & Instant Presets (Screen 6)
- **Click:** "6. Inspector & Viva".
- **Say:** *"To easily verify both contrasting paths during evaluation, we built instant preset loaders: clicking 'Scenario A' loads the high-mastery pathway leading to Outcome 1, while clicking 'Scenario B' immediately loads the M1 misconception pathway with visual Rupee-Bar remediation. The complete state store is visible in real-time on the right."*

---

## 3. Evaluator Backup Plan
- If internet connectivity drops: The app operates 100% offline with its deterministic pure JavaScript engine and local storage store.
- If running locally: Run `python -m http.server 3000` or open `index.html` directly in Chrome/Edge.
