# Phase P4: Verification & Test Results

- **Identity Token:** `<24b3020>`
- **Exam Card:** `P4-T9-L5-C5`
- **Application:** Adaptive Percentage PAL with Teacher-in-the-Loop Supervision

---

## 1. Functional Verification Checklist

| Test ID | Test Case Description | Input Data | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| **FT-01** | **Screen 1 Check-in & Navigation** | Slide confidence to 4; click "Start Learning" | Slider updates message to "4 / 5"; navigates to Screen 2 Receipt Explorer | Works smoothly; updates reactive state | **PASS** |
| **FT-02** | **Receipt Calculator: Direct Discount** | MRP: ₹50, Paid SP: ₹45 | Rupee savings: -₹5.00; Discount %: 10.00%; Rupee bar: 90% paid / 10% saved | Exact math verified deterministically | **PASS** |
| **FT-03** | **Receipt Calculator: Successive Discount Toggle** | Check "+ Extra 10% Festive Discount" | Extra discount: -₹4.50 (10% of ₹45); Final SP: ₹40.50; Total saved: ₹9.50 (19.0%) | Matches mathematical reality; refutes 20% fallacy | **PASS** |
| **FT-04** | **Task 1: Correct Price-Tag Mapping** | CP=₹400, MP=₹500, SP=₹450, Base=MP | Diagnostic: Sound Reasoning; Positive calm feedback rendered; Tab status marked done | Correctly identified; no harsh alerts | **PASS** |
| **FT-05** | **Task 1: M1 Base-Value Error Trigger** | Base selected as CP (₹400) | Diagnostic: `M1_BaseValueConfusion`; Warm hint explaining customer sees tag | Misconception M1 accurately flagged | **PASS** |
| **FT-06** | **Task 2: Correct School Bag Calculation** | SP: ₹850, Profit %: 6.25% | Diagnostic: Sound Reasoning; Explains discount on MP and profit on CP | Exact mathematical match | **PASS** |
| **FT-07** | **Task 2: M1 Base Error (15% of CP 800)** | SP: ₹880 (from 1000 - 120) | Diagnostic: `M1_BaseValueConfusion`; Explains ₹120 was taken from shopkeeper's cost | Accurately catches M1 calculation | **PASS** |
| **FT-08** | **Task 3: Kabir Successive Error Spotting** | Kabir=wrong, Price1=₹450, Final SP=₹405 | Diagnostic: Sound Reasoning; Commends critique of Kabir's 20% fallacy | Exact match on intermediate & final values | **PASS** |
| **FT-09** | **Task 3: M2 Fallacy (Kabir is Right)** | Kabir=right, Final SP=₹400 | Diagnostic: `M2_AdditiveFallacy`; Visual explanation of diminishing base | M2 accurately detected | **PASS** |
| **FT-10** | **Task 4: What-If Headphones Strategy** | Max Discount %: 17.5% | Diagnostic: Sound Reasoning; Validates min SP ₹1,320 and discount on MP | Exact calculation verified | **PASS** |
| **FT-11** | **C5 Teacher Approval Action** | Click "Approve AI Feedback" in Teacher View | Status changes to "Verified by Teacher"; badge updates in Learner View | Instantly synchronized via store | **PASS** |
| **FT-12** | **C5 Teacher Edit Action** | Click "Edit Feedback", type text, save | Status changes to "Teacher Edited"; Learner View displays teacher's custom text | Verified; text reflects in learner view | **PASS** |
| **FT-13** | **C5 Teacher Override Action** | Force Outcome 1, change diagnosis to Sound | Telemetry and branch view update to Outcome 1; audit log records override | Full human-in-the-loop override confirmed | **PASS** |
| **FT-14** | **Viva Preset Scenario A** | Click "Load Scenario A" | State populates 3 correct submissions, Outcome 1 active, telemetry 100% accuracy | Ready for viva walkthrough | **PASS** |
| **FT-15** | **Viva Preset Scenario B** | Click "Load Scenario B" | State populates M1 submission, Outcome 2 active, Rupee-Bar comparison visible | Ready for viva walkthrough | **PASS** |

---

## 2. Usability & Affective Persona Safety (L5)

- **Harsh Error Elimination:** Replaced all conventional red "WRONG ANSWER / FAILED" dialogs with calm amber and teal cards ("Let's check the price tag together, Sharvee!").
- **Font Legibility:** Minimum font size across all body paragraphs is $\ge 16\text{px}$ (1.0rem to 1.05rem) with $1.6$ line-height.
- **Visual Cues:** Uses color-coded rupee-bars, perforated receipt borders, and intuitive dropdowns.

---

## 3. Responsive & Device Compatibility

- **360px Mobile Viewport:** Tested with narrow screen dimensions. All grid layouts collapse gracefully to single-column flex; no horizontal overflow.
- **Tablet / Laptop (768px – 1200px):** 2-column and 3-column layouts display cleanly.
- **Browser Compatibility:** Works across Chrome, Edge, Firefox, Safari with zero polyfills or build dependencies.
