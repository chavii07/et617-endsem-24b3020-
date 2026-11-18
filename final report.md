# ET 617-2026 End-Semester Examination Report

---

## Identity Card

- **Student Roll Number / Identity Token:** `24b3020`
- **GitHub Repository:** `et617-endsem-24b3020` (Public: `https://github.com/chavi07/et617-endsem-24b3020`)
- **Live Deployed Application URL:** `https://et617-24b3020.vercel.app` (Alternative: `https://et617-endsem-24b3020.onrender.com`)
- **Exam Card Selected:**
  * **P (Problem Statement):** `P4` — Adaptive tutor with automatic question generation
  * **T (Topic):** `T9` — Percentages: discount, profit and loss (Class 8)
  * **L (Learner Context):** `L5` — Learner repeating the topic after failing it once, high anxiety and low self-efficacy
  * **C (Design Constraint):** `C5` — Teacher-in-the-loop: a teacher view that shows learner progress and lets the teacher approve or override AI feedback

---

## D1. Educational Problem & Learning Outcomes

### Problem Statement
Class 8 learners repeating *Percentages: Discount, Profit, and Loss* after failing their initial unit test struggle due to abstract rote formula memorization ($SP = \frac{100 - D\%}{100} \times MP$) that detaches mathematical calculation from retail intuition. When Cost Price (CP), Marked Price (MP), and Selling Price (SP) appear together, anxious students freeze and guess which base applies to which percentage. Automated learning systems often compound this anxiety with blunt "Wrong!" alerts and unvetted AI explanations. This system pairs intuitive everyday store receipt exploration with a multi-signal adaptive tutor and a real-time Teacher-in-the-Loop review portal (Ms. Deshmukh) that inspects, edits, and approves all diagnostic feedback before or alongside delivery to the learner.

### Three Measurable Learning Outcomes (Bloom's Revised Taxonomy)
1. **LO1 (Understand / Analyze):** **Distinguish** between Cost Price (CP), Marked Price (MP), and Selling Price (SP) in everyday retail contexts and **identify** the correct base value (MP for discount, CP for profit/loss) with $\ge 80\%$ accuracy across interactive role-mapping tasks.
2. **LO2 (Apply / Calculate):** **Calculate** net Selling Price, rupee savings, and profit/loss percentage using transparent step-by-step reasoning rather than formula substitution on $\ge 4$ out of 5 non-MCQ tasks.
3. **LO3 (Evaluate / Create):** **Predict and explain** why successive percentage operations (e.g., $10\% + 10\%$ successive discounts, or $+20\%$ markup followed by $-20\%$ discount) do not linearly add or cancel out, correctly critiquing simulated peer misconceptions in writing.

### Context of Use
- **Where:** Remedial after-school mathematics clinic and home homework portal in Pune, Maharashtra.
- **When:** Weekday 30-minute evening remedial sessions (4:30 PM – 5:00 PM) where a teacher supervises repeating learners working semi-asynchronously.
- **Device:** School Android tablet (screen width $360\text{px} - 768\text{px}$) or home laptop on standard Wi-Fi, running a responsive browser with a dual-role toggle (`Learner View` ↔ `Teacher View`).

---

## D2. Learner Persona (Expanded from L5 Seed)

- **Name & Age:** Sharvee Kulkarni, 13 years old.
- **Grade & Location:** Class 8, Pune Vidyalaya (English-medium state board), Pune, Maharashtra.
- **Academic Background & Prior Knowledge:**
  * *Strengths:* Solid basic arithmetic; comfortable with integer addition/multiplication, fractions ($1/2 = 50\%$, $1/4 = 25\%$, $1/10 = 10\%$), and computing simple single percentages of round numbers ($10\%$ of ₹$200 =$ ₹$20$).
  * *Gaps:* Scored $28/100$ on her first unit test; freezes when three prices (CP, MP, SP) appear simultaneously. Confuses percentage bases and relies on memorizing detached formulas.
- **Two Core Misconceptions:**
  1. **M1 — Base-Value Confusion:** Calculating Discount % on Cost Price (CP) instead of Marked Price (MP), or calculating Profit % on Selling Price (SP) instead of Cost Price. Sharvee treats the first price mentioned as the base for all calculations.
  2. **M2 — Additive / Symmetric Percentage Fallacy:** Assuming percentage changes operate linearly—believing that "10% OFF + Extra 10% OFF" equals a flat 20% discount, or that a 20% markup followed by a 20% discount returns the item to its original price. She misses that the second percentage operates on a diminished or augmented intermediate base.
- **Device, Language & Time:** Uses a parent's Android tablet or family laptop for 30 minutes in the evening; fluent in conversational English mixed with familiar Indian retail terms (MRP tags, chips packets, cash counter).
- **Motivation & Affective State:** High math anxiety and low self-efficacy ("I always mix up which formula goes where"). Sensitive to punitive red error banners. Motivated by relatable retail items (stationery, sneakers, snacks), step-by-step visual feedback, and knowing her teacher, Ms. Deshmukh, is actively validating her progress.

---

## D3. Educational Content & Complete Learning Activity Plan

### 1. Concept Explanation: "The Three-Price Retail Story & Two Golden Rules"
Before formulas are introduced, math is grounded in a relatable Pune sneaker shop:
- **Cost Price (CP = ₹1,000):** What the shopkeeper paid the factory to put the shoes on the shelf.
- **Marked Price (MP = ₹1,500):** The printed sticker tag on the shoebox before any sale.
- **Selling Price (SP = ₹1,350):** What the customer actually hands over at the counter after a 10% discount off the tag.

**The Two Golden Rules:**
1. *Rule 1:* **Discount is ALWAYS taken off the Marked Price (MP)** — customers only see the tag sticker!
2. *Rule 2:* **Profit or Loss is ALWAYS measured from the Cost Price (CP)** — shopkeepers measure gain from their initial factory investment!

### 2. Interactive Feature: "My Everyday Store Receipt Explorer"
Sharvee enters any real retail purchase (e.g., Masala Chips packet, MRP ₹50, Paid ₹45). The live interactive calculator renders:
- Direct Rupee Savings ($-₹5.00$)
- Calculated Discount % on MRP ($10.00\%$)
- Dynamic color-coded **Rupee-Bar** (Paid: 90% | Saved: 10%)
- **Successive Discount Toggle:** When toggling `+ Extra 10% Festive Counter Discount`, the calculator deducts 10% of ₹45 ($-₹4.50$) to arrive at ₹40.50, visually proving that total discount is $19\%$, not $20\%$.

### 3. Question Bank: 5 Tasks Across 4 Non-MCQ Formats

#### Task 1 (Format: Price-Tag Role Mapping — Non-MCQ Role Assignment)
- **Prompt:** A stationery shopkeeper buys a geometry box from the factory for ₹400, prints an MRP sticker of ₹500 on the box, and sells it to Sharvee for ₹450 with a ₹50 discount.
  * (a) Assign each amount (₹400, ₹500, ₹450) to its retail role (CP, MP, SP).
  * (b) Select which price the 10% discount was calculated on.
- **Model Answer:** CP = ₹400, MP = ₹500, SP = ₹450. Discount base = Marked Price (MP, ₹500).
- **Feedback (Correct):** *"Spot on, Sharvee! You anchored the ₹50 discount to the MRP sticker (MP = ₹500). Notice that even after giving a ₹50 discount, the shopkeeper still earned a ₹50 profit above their ₹400 Cost Price!"*
- **Feedback (M1 Error - Selected CP as base):** *"Take a gentle breath, Sharvee! Remember: customers see the printed MRP sticker (MP = ₹500) on the box. Discounts always come off the Marked Price (MP), not the shopkeeper's secret factory cost!"*
- **Feedback (Prerequisite Gap):** *"Let's sort the three prices step by step: CP is what the shopkeeper paid (₹400), MP is the tag sticker (₹500), and SP is what you pay at the counter (₹450)."*

#### Task 2 (Format: Step-by-Step Numerical Workspace with Reasoning Box)
- **Prompt:** A school bag costs a shopkeeper ₹800 (CP). She puts an MRP tag of ₹1,000 (MP) and offers a 15% discount during a monsoon sale.
  * (a) Calculate the Selling Price (SP).
  * (b) Calculate her actual Profit % on CP.
  * (c) In 1–2 sentences, explain why you subtracted the 15% from ₹1,000 instead of ₹800.
- **Model Answer:**
  * (a) Discount = $15\%$ of ₹$1,000 =$ ₹$150$. SP = ₹$1,000 - $ ₹$150 =$ ₹$850$.
  * (b) Profit = ₹$850 - $ ₹$800 =$ ₹$50$. Profit % = $(50 / 800) \times 100 = 6.25\%$.
  * (c) Explanation: The discount is offered to the buyer on the printed sticker tag (₹1,000), while the profit compares the rupee gain (₹50) against the shopkeeper's original cost price (₹800).
- **Feedback (Correct):** *"Wonderful work, Sharvee! You correctly took 15% off the Marked Price (₹1,000) to get SP = ₹850, and then measured the ₹50 profit from the Cost Price (₹800). Beautiful mathematical clarity!"*
- **Feedback (M1 Error - Took 15% of ₹800 = ₹120, yielding SP = ₹880):** *"You calculated 15% of ₹800 = ₹120, which is the shopkeeper's Cost Price. Remember the golden rule: customers get discounts from the printed tag (MP = ₹1,000). Try finding 15% of ₹1,000 first (₹150), then subtract that from ₹1,000!"*
- **Feedback (M1 Error on Profit - Divided ₹50 by SP ₹850 = 5.88%):** *"Your Selling Price (₹850) is right on the money! But for Profit %, remember: the shopkeeper measures gain from what they originally invested (CP = ₹800). Divide ₹50 by ₹800!"*

#### Task 3 (Format: Error-Spotting & Critique — "Fix Kabir's Mistake")
- **Prompt:** At the supermarket, a ₹500 box of chocolates has a festive banner: *"10% OFF + Extra 10% OFF at Checkout!"*. Your friend Kabir says: *"10% + 10% means a flat 20% discount! So 20% of ₹500 is ₹100, and I will pay ₹400."*
  * (a) Is Kabir Right or Wrong?
  * (b) What is the intermediate price after the first 10% discount?
  * (c) What is the true final Selling Price after the second 10% discount?
  * (d) Explain why 10% + 10% successive discounts do not equal a flat 20% discount.
- **Model Answer:**
  * (a) Kabir is WRONG.
  * (b) Intermediate price after 1st discount = ₹$500 - (10\% \text{ of } 500) =$ ₹$450$.
  * (c) Final SP = ₹$450 - (10\% \text{ of } 450) = 450 - 45 =$ ₹$405$.
  * (d) Explanation: The second 10% discount operates on the already-reduced price of ₹450, saving ₹45 instead of ₹50. The effective discount is 19% (₹95 saved), not 20% (₹100 saved).
- **Feedback (Correct):** *"Brilliant critique, Sharvee! You spotted Kabir's mistake immediately. The second 10% is applied to the reduced ₹450 price (giving ₹45 off), so the final price is ₹405, not ₹400!"*
- **Feedback (M2 Error - Agreed with Kabir or entered ₹400):** *"It is so tempting to just add 10% + 10% = 20%! But look at what happens at the cash counter: First, 10% comes off ₹500, making it ₹450. The computer then takes the second 10% off the NEW price (₹450), which is only ₹45 off, not ₹50. So you pay ₹405!"*

#### Task 4 (Format: What-If Prediction & Strategy Explanation)
- **Prompt:** A retailer purchases Bluetooth headphones at CP = ₹1,200 and prints an MRP tag of MP = ₹1,600. During a festive sale, the owner demands: *"We must earn at least a 10% profit on our Cost Price!"*
  * (a) What is the lowest allowed Selling Price (SP)?
  * (b) What is the maximum Rupee discount allowed off the sticker?
  * (c) What is the maximum Discount % on Marked Price (MP) the retailer can offer?
  * (d) Explain your strategy step by step.
- **Model Answer:**
  * (a) Minimum SP = $1200 + (10\% \text{ of } 1200) =$ ₹$1,320$.
  * (b) Maximum discount in rupees = ₹$1,600 - $ ₹$1,320 =$ ₹$280$.
  * (c) Maximum Discount % on MP = $(280 / 1600) \times 100 = 17.5\%$.
  * (d) Explanation: First calculate the minimum revenue required to cover CP plus 10% profit (₹1,320). Next find the headroom between the MRP (₹1,600) and ₹1,320 (₹280). Finally divide the ₹280 discount by the Marked Price (₹1,600).
- **Feedback (Correct):** *"Outstanding higher-order thinking, Sharvee! You accurately computed the required minimum Selling Price (₹1,320), found the maximum discount buffer (₹280), and anchored the 17.5% discount to the Marked Price (₹1,600)!"*
- **Feedback (M1 Error - Divided ₹280 by CP ₹1,200 = 23.33%):** *"You were so close! You found the exact ₹280 maximum rupee discount. Just remember the golden anchor: discount percentage is always the discount divided by the Marked Price (₹1,600), not the Cost Price (₹1,200). Divide 280 by 1600!"*

#### Task 5 (Format: Dynamic Adaptive Micro-Scenario — Parametrically Generated)
- **Prompt (M1 Remediation Variant - Cricket Bat):** A sports shopkeeper buys a Kashmir willow cricket bat for CP = ₹900 and tags it with an MRP of ₹1,200. During the season, he offers a 15% discount.
  * (a) Find the actual Selling Price (SP).
  * (b) Calculate the shopkeeper's Profit % on CP.
  * (c) Which price (₹900 or ₹1,200) did you use to calculate the discount, and why?
- **Model Answer:**
  * Discount = $15\%$ of ₹$1,200 =$ ₹$180$. SP = ₹$1,200 - $ ₹$180 =$ ₹$1,020$.
  * Profit = ₹$1,020 - $ ₹$900 =$ ₹$120$. Profit % = $(120 / 900) \times 100 = 13.33\%$.
  * Base Explanation: Discount is calculated on MP (₹1,200) because that is the price tag customers see; profit is measured from CP (₹900).
- **Feedback (Correct):** *"Superb achievement, Sharvee! Expected SP was ₹1,020 and profit rate was 13.33%. Your explanation clearly demonstrated conceptual mastery without relying on formula memorization!"*
- **Feedback (M1 Error):** *"Notice the price anchor: discount is taken from the Marked Price (₹1,200), not the Cost Price (₹900). Keep this rule close to your heart!"*

---

## D4. Working Application & Screen Architecture

- **Public Live Application URL:** `https://et617-24b3020.vercel.app`
- **Identity Token:** `24b3020` (Rendered in sticky top header, bottom footer of all 6 screens, and on the Inspector screen)

### Screen Map (6 Connected Screens / States)

### Screen Map Table

| Screen ID | Title & Role | Key Learner / Teacher Inputs | System Outputs & Transitions |
|---|---|---|---|
| **Screen 1** | **Learner Welcome & Calm Check-in** (`Learner`) | 1–5 confidence check-in slider; "Start Learning" CTA button; "Open Teacher View" button. | Reactive slider message; sets initial self-efficacy telemetry; transitions to Screen 2. |
| **Screen 2** | **Receipt Explorer & Concept Anchor** (`Learner`) | Item name, MRP (₹), Paid SP (₹), "+ Extra 10% Festive Discount" checkbox toggle, "Save to Journal" button. | Live savings calculation, discount % on MRP, animated Rupee-Bar progress segment, transitions to Screen 3. |
| **Screen 3** | **Adaptive Workspace** (`Learner`) | Dropdown price mappers, numerical inputs (SP, Profit %, Discount %), explanation textareas, hint toggles, "Auto-Approve" toggle. | Immediate calm diagnostic evaluation; "Sent to Ms. Deshmukh for review" badge; verified teacher tags once approved; task status badges. |
| **Screen 4** | **Adaptive Intervention / Branch View** (`Learner` & `Teacher`) | "Try Parallel Retry Question" button; "See Teacher Dashboard Status" button. | Active P4 outcome highlight (Outcome 1, 2, or 3); visual Rupee-Bar base comparison (MP vs CP); 3-step mental math booster. |
| **Screen 5** | **C5 Teacher-in-the-Loop Dashboard** (`Teacher`) | [Approve Feedback] button; [Edit Feedback] inline textarea & save; [Override] custom text, misconception tag & outcome dropdowns. | Live accuracy %, tasks completed, Bloom's LO1–LO3 mastery bars, active M1/M2 flags, real-time sync with Learner view, auditable log. |
| **Screen 6** | **Pedagogical Inspector & Viva Screen** (`Inspector`) | [Load Scenario A] preset button; [Load Scenario B] preset button; [Reset State] button; optional Gemini API key input. | Full live JSON state tree rendering; P4 decision matrix display; instant walkthrough state injection. |

---

## D5. Two Contrasting Learner Scenarios (Live Walkthrough)

### Scenario A — Correct Learner Path (Sound Conceptual Mastery)
1. **Initial Check-in (Screen 1):** Sharvee sets her confidence slider to $3/5$.
2. **Receipt Exploration (Screen 2):** She explores a ₹50 chips packet bought for ₹45, verifying a 10% discount on the visual Rupee-Bar.
3. **Task 1 Submission (Screen 3):** Sharvee correctly maps CP = ₹400, MP = ₹500, SP = ₹450, and designates Marked Price (MP) as the discount base.
4. **Task 2 Submission (Screen 3):** On the school bag problem, she enters SP = ₹850, Profit % = 6.25%, and writes: *"Discount is taken off the printed tag of ₹1,000 (15% = ₹150 off), so SP is ₹850. The shopkeeper paid ₹800, so profit is ₹50 on ₹800 which is 6.25%."*
5. **Task 3 Submission (Screen 3):** In Kabir's chocolate box critique, she marks Kabir as WRONG, enters intermediate price ₹450, final SP ₹405, and writes: *"Kabir is wrong because the second 10% is applied to ₹450, not ₹500."*
6. **Adaptive Decision Triggered (P4):**
   * *Signal Evaluation:* Accuracy = 100%, Explanations = Sound Reasoning, Hints Used = 0, Consecutive Correct = 3.
   * *Outcome:* **Outcome 1 (Harder Question)** triggered.
7. **Teacher Oversight (Screen 5):** Ms. Deshmukh inspects the Review Queue, notes the high accuracy and sound reasoning, and clicks **[Approve Feedback]**.
8. **Learner Experience:** Sharvee sees green shields with *"Verified by Ms. Deshmukh"* and is routed to a higher-order markup challenge.

### Scenario B — Misconception Learner Path (M1 Base-Value Confusion)
1. **Initial Check-in (Screen 1):** Sharvee sets confidence to $2/5$ ("A bit nervous").
2. **Task 1 Submission (Screen 3):** She completes Task 1 with 1 hint requested.
3. **Task 2 Submission with M1 Error (Screen 3):** On the school bag problem, Sharvee calculates $15\%$ of the Cost Price ₹$800 =$ ₹$120$. She enters SP = ₹880 and writes: *"I took 15% of the bag cost ₹800 which gave ₹120. Then I subtracted ₹120 from ₹1000 to get ₹880."*
4. **Diagnostic Evaluation:** The deterministic engine identifies that ₹120 is $15\%$ of CP (₹800). It immediately flags **`M1_BaseValueConfusion`**.
5. **Adaptive Decision Triggered (P4):**
   * *Signal Evaluation:* Accuracy = Incorrect, Misconception = M1 Active, Hints = 0.
   * *Outcome:* **Outcome 2 (Alternative Visual Explanation)** triggered. Normal task progression is paused.
6. **Teacher Intervention (Screen 5 - Constraint C5):**
   * In the Review Queue, Ms. Deshmukh sees the M1 tag and the AI draft feedback.
   * Rather than approving generic text, Ms. Deshmukh clicks **[Edit Feedback]** and enters: *"Sharvee dear, do not worry at all! Notice that you calculated 15% of ₹800 (the factory cost). When you walk into a shop, the tag you see is ₹1,000. Take 15% of ₹1,000 instead! Check the visual rupee-bar on the next screen."*
   * She saves the edited feedback, which updates the submission status to `Teacher Edited`.
7. **Learner Experience (Screens 3 & 4):**
   * Sharvee's feedback box displays: *"Teacher Feedback (Edited by Ms. Deshmukh)"*.
   * Sharvee navigates to Screen 4, where the system highlights **Outcome 2** and displays the interactive **Visual Rupee-Bar Base Comparison**, visually placing the 15% on MP (₹150 off) directly above the incorrect 15% on CP (₹120 off) to re-anchor her mental model before she attempts the parallel retry question.

*(Both scenarios can be loaded instantly during viva using the "Load Scenario A" and "Load Scenario B" buttons on Screen 6).*

---

## D6. AI Functionality Specification

### Feature 1: Adaptive Question Generation
- **What it does:** Generates contextual retail word problems targeted at either M1 remediation (e.g., sports gear), M2 remediation (e.g., footwear successive sales), or Harder Challenges (e.g., apparel markup + discount), varying the numerical values.
- **Input (Prompt / Model Call):**
  ```text
  "You are an empathetic math question generator for Sharvee, a Class 8 learner in Pune repeating percentages.
  Target: Misconception M1 (Base-Value Confusion).
  Generate one real-world retail scenario involving an Indian retail item (e.g., Cricket Bat, Badminton Racket).
  Requirements: Include Cost Price (CP) and Marked Price (MP) where MP > CP, and a discount percentage.
  Do not reveal the answer. Format as JSON with: item, context, cp, mp, discountPct, questionText."
