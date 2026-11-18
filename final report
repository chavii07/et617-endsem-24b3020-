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
  * (b) Profit =
