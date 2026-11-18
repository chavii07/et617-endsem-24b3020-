# DESIGN.md — Adaptive Tutor for Percentages: Discount, Profit & Loss

- **Identity Token:** `<24b3020>`
- **Exam Card:** `P4` (Adaptive tutor with automatic question generation) | `T9` (Percentages: discount, profit and loss) | `L5` (Learner repeating the topic after failing it once, high anxiety and low self-efficacy) | `C5` (Teacher-in-the-loop: teacher view showing learner progress and letting the teacher approve or override AI feedback)
- **Repository:** `et617-endsem-24b3020`

---

## D1. Educational Problem & Learning Outcomes

### Problem Statement

Young learners repeating *Percentages: Discount, Profit, and Loss* after an initial failure often struggle not from a lack of effort, but because standard drills force them to memorize formulas without building intuition around Cost Price (CP), Marked Price (MP), and Selling Price (SP). For an anxious learner with low self-efficacy, automated "Wrong Answer" alerts trigger cognitive overload, while generic AI feedback can occasionally feel abrupt or intimidating.

This adaptive tutor pairs intuitive real-world price exploration with misconception diagnosis. It continuously analyses the learner's numerical answers, written explanations, hint usage and repeated mistakes to identify specific learning gaps. Based on this evidence, it either provides a harder question, presents an alternative explanation, or revisits prerequisite concepts. A Teacher-in-the-Loop (C5) review layer allows the teacher to monitor progress and approve, edit or override AI-generated feedback before it reaches the learner.

### Measurable Learning Outcomes

By the end of the learning session, the learner will be able to:

1. **Distinguish** between Cost Price (CP), Marked Price (MP), and Selling Price (SP) in everyday retail scenarios and identify the correct base value for percentage calculations.
2. **Calculate** net Selling Price, profit/loss percentage, and single or successive (repeated) discounts using step-by-step intuition rather than rote formulas.
3. **Predict and explain** why successive percentage changes—such as a markup followed by an equal discount (+20% then -20%) or two repeated discounts (10% off followed by another 10% off)—do not simply add or cancel out.

### Context of Use

- **Where:** Remedial after-school math clinic or supervised home homework portal.
- **When:** Weekday 30-minute evening remedial slot (4:30 PM – 5:00 PM) where a mathematics teacher oversees repeating learners working asynchronously.
- **Device:** School tablet or home laptop on Wi-Fi via a responsive web browser with a role switcher (`Learner View` / `Teacher View`) for live human-in-the-loop supervision.

---

## D2. Expanded Learner Persona (Seed: L5)

- **Name & Age:** Sharvee Kulkarni, 13 years old (Class 8 student in Pune, Maharashtra).

- **Academic Background & Prior Knowledge:**
  - *Knows:* Comfortable with basic arithmetic and simple fractions (1/2 = 50%, 1/4 = 25%), and computing simple percentages of whole numbers (e.g., 10% of 200 = 20).
  - *Gaps:* Scored 28/100 on her first unit test; freezes when three prices (CP, MP, SP) appear together and finds it difficult to remember formulas because she lacks the underlying intuition behind how shopkeepers price and discount items.

- **Two Core Misconceptions:**

  1. **M1 — Base-Value Confusion (Calculating Discount on CP instead of MP, or Profit% on SP):** Sharvee treats all percentages in a problem as operating on the first number she sees (usually CP), rather than anchoring Profit/Loss % to CP and Discount % to MP.

  2. **M2 — Additive / Symmetric Percentage Fallacy (Repeated Discounting & Markup-Discount Cancellation):** Sharvee assumes percentages always add or cancel linearly—believing that two repeated discounts of 10% + 10% equal a flat 20% discount, or that raising a price by 20% and giving a 20% discount returns to the original price. She fails to notice that the second percentage applies to the new, changed price rather than the original price.

- **Device & Connectivity:** Uses a school tablet or home laptop on Wi-Fi.
- **Language:** Comfortable in conversational English with familiar Indian rupee (₹) retail examples (chips packets, stationery, sneakers); prefers calm, short, jargon-free explanations over textbook formulas.
- **Motivation & Affective State:** High math anxiety and low self-efficacy ("I always forget which formula goes where"). Motivated by seeing how math connects to real items she and her parents buy, calm non-judgmental hints, and knowing her teacher (Ms. Deshmukh) is reviewing her work.

---

## D3. Educational Content & Learning Activity Plan

### 1. Concept Explanation & Interactive "My Everyday Store Receipt" Explorer

**Part A — The Three-Price Story (Intuition First, No Formulas!)**

Imagine you run a neighborhood snack and sneaker shop:

- **Cost Price (CP):** What the shopkeeper paid the factory (say, ₹1,000).
- **Marked Price (MP / MRP):** The price printed on the packet or tag (say, ₹1,500).
- **Selling Price (SP):** What you actually pay at the counter after a discount (say, 10% off the tag = ₹1,350).

**Two Golden Rules:**

1. Discount is always taken off the Marked Price / MRP (MP).
2. Profit or Loss is always measured from the Cost Price (CP).

**Part B — Interactive Feature: "My Everyday Store Receipt Explorer"**

Before solving textbook tasks, Sharvee enters an everyday item she or her parents actually bought at the local store (e.g., a ₹50 packet of chips bought for ₹45, or a ₹200 notebook bought for ₹170).

- **Inputs:** Item Name (e.g., "Masala Chips"), MRP / Marked Price (₹), and Price You Paid / SP (₹).
- **Live Visual Output:** The app visually shows the rupee gap saved (MRP - SP), computes the exact Discount % on MRP without forcing a formula, and optionally lets her toggle "What if the shopkeeper also gave an extra 10% festive discount on top?" to visually see repeated discounting in action.

### 2. Question Bank (5 Tasks across 4 Non-MCQ Formats)

The tutor uses these five tasks as initial question templates. New questions are generated by varying numerical values, retail contexts, difficulty and the misconception being tested.

#### Task 1 — Format: Interactive Price-Tag Mapping (Assign Roles) [Warm-up / Prerequisite Check]

- **Prompt:** A stationery shopkeeper buys a geometry box for ₹400, prints an MRP sticker of ₹500 on the box, and sells it to Sharvee for ₹450. Assign each amount (₹400, ₹500, ₹450) to CP, MP, and SP, and select which number the 10% discount was calculated on.
- **Model Answer:** CP = ₹400, MP = ₹500, SP = ₹450. The 10% discount (₹50) was calculated on MP (₹500).
- **Feedback:**
  - *Correct:* "Spot on, Sharvee! You anchored the discount to the MRP sticker (MP = ₹500). Notice that even after giving a ₹50 discount, the shopkeeper still earned ₹50 above the ₹400 CP!"
  - *M1 Triggered (Selected CP = ₹400 as discount base):* "Remember: customers see the MRP / Marked Price (₹500) on the box. Discounts always come off the MP, not the shopkeeper's Cost Price."

#### Task 2 — Format: Step-by-Step Numerical Workspace with Reasoning Box [Core Skill]

- **Prompt:** A school bag costs a shopkeeper ₹800 (CP). She puts an MRP tag of ₹1,000 (MP) and offers a 15% discount during a monsoon sale.
  - (a) Calculate the Selling Price (SP).
  - (b) Calculate her actual Profit % on CP.
  - (c) In 1–2 sentences, explain why you subtracted the 15% from ₹1,000 instead of ₹800.

- **Model Answer:**
  - (a) Discount = 15% of 1000 = ₹150. SP = 1000 - 150 = ₹850.
  - (b) Profit = 850 - 800 = ₹50. Profit% = (50/800) × 100 = 6.25%.
  - (c) Discount is offered to the buyer on the Marked Price (₹1,000), whereas Profit % compares the gain (₹50) to the shopkeeper's Cost Price (₹800).

- **Feedback:**
  - *Correct:* "Clean calculation and clear reasoning! You separated the customer's discount base (MP = ₹1,000) from the shopkeeper's profit base (CP = ₹800)."
  - *M1 Triggered (Calculated 15% of ₹800 = ₹120):* "You found 15% of ₹800, which is the shopkeeper's Cost Price. Check the price tag again: the discount applies to the Marked Price (₹1,000). Try finding 15% of ₹1,000 first!"
  - *Incorrect SP due to subtracting ₹120 from MP:* "You found the percentage correctly, but used the wrong base. The discount is ₹150 because it is calculated on ₹1,000. Let's try subtracting ₹150 from the marked price."
  - *Correct calculation but weak reasoning:* "Your calculation is right! Now remember why: the discount is based on the price printed on the tag, while profit is measured against what the shopkeeper originally paid."

#### Task 3 — Format: Error-Spotting & Critique ("Fix the Mistake") [Targeting Misconception M2: Repeated Discounting]

- **Prompt:** At the supermarket, a ₹500 box of chocolates has a "10% OFF + Extra 10% OFF" festive offer. Your friend Kabir says: "10% + 10% means a flat 20% discount! So I just take 20% off ₹500 (₹100 off) and pay ₹400."
  - Identify whether Kabir is right or wrong, calculate the actual price after applying the first 10% discount and then the second 10% discount, and explain in your own words why repeated discounts of 10% + 10% do not equal 20%.

- **Model Answer:** Kabir is wrong. First 10% off ₹500 = ₹50 off, so the new price is ₹450. Second 10% off is taken on ₹450 (= ₹45 off), so final SP = ₹450 - ₹45 = ₹405. This is an effective 19% discount, not 20%. The second 10% is calculated on the already-reduced price of ₹450, not the original ₹500.

- **Feedback:**
  - *Correct:* "Great catch, Sharvee! Because the second 10% is taken on the smaller price of ₹450 (₹45 off instead of ₹50 off), you pay ₹405 instead of ₹400."
  - *M2 Triggered:* "It really looks like 10% + 10% should be 20%! Let's do it one step at a time: first take 10% off ₹500, which drops the price to ₹450. Now, the second 10% discount applies to that ₹450 tag. What is 10% of ₹450?"

#### Task 4 — Format: What-If Prediction & Explanation [Higher-Order / Harder Path]

- **Prompt:** A pair of headphones has CP = ₹1,200 and MP = ₹1,600. If the seller wants to earn at least a 10% profit on CP, what is the maximum discount percentage on MP they can offer? Show your steps and explain your strategy.

- **Model Answer:**
  - Target minimum SP = 1200 + 10% of 1200 = ₹1,320.
  - Maximum allowed Discount = 1600 - 1320 = ₹280.
  - Maximum Discount% = (280/1600) × 100 = 17.5%.

- **Feedback:**
  - *Correct:* "Awesome thinking! You worked backward from the required Profit % on CP to find the target SP, and then compared that gap against MP."
  - *M1 Triggered (Divided ₹280 discount by CP ₹1,200 instead of MP ₹1,600):* "You found the right rupee discount (₹280)! Just remember the final step: discount percentage is always measured out of the Marked Price (₹1,600), not the Cost Price (₹1,200)."

#### Task 5 — Format: AI-Generated Adaptive Micro-Scenario (Open Numeric + Explanation) [Dynamic Finale]

- **Prompt:** Dynamically generated based on Sharvee's previous responses and misconception history.

- **Example generated question (M1 remediation):** A cricket bat has a CP of ₹900 and an MP of ₹1,200. During a sale, the shopkeeper offers a 15% discount. Calculate the SP and profit percentage. Explain which price you used to calculate the discount and why.

- **Model Answer:**
  - Discount = 15% of ₹1,200 = ₹180.
  - SP = ₹1,200 - ₹180 = ₹1,020.
  - Profit = ₹1,020 - ₹900 = ₹120.
  - Profit% = (120/900) × 100 = 13.33%.
  - Explanation: Discount is calculated on MP, whereas profit percentage is calculated on CP.

- **Example generated question (M2 remediation):** A pair of sneakers costs ₹2,000. The store offers 15% off followed by an additional 10% off. Find the final price and explain why the total discount is not 25%.

- **Model Answer:**
  - First discount = 15% of ₹2,000 = ₹300.
  - New price = ₹1,700.
  - Second discount = 10% of ₹1,700 = ₹170.
  - Final price = ₹1,530.
  - Effective discount = ₹470/₹2,000 × 100 = 23.5%.
  - Explanation: The second discount is calculated on the reduced price, not the original price.

- **Example harder-path question:** A shopkeeper marks a jacket 25% above its CP of ₹1,000 and then offers a 10% discount. Calculate the final SP and profit percentage. Explain the effect of applying the discount after the markup.

- **Model Answer:**
  - MP = ₹1,000 + 25% of ₹1,000 = ₹1,250.
  - Discount = 10% of ₹1,250 = ₹125.
  - SP = ₹1,125.
  - Profit = ₹125.
  - Profit% = 12.5%.

- **Feedback:** The tutor evaluates both numerical accuracy and the learner's explanation, then provides supportive, misconception-specific feedback.

---

## P4 Design Challenge: Adaptive Decision Rule & 3 Outcomes

### Explicit Decision Rule

After each task submission, the tutor evaluates four signals:

1. **Numerical Accuracy (A):** Correct or Incorrect.
2. **Explanation State (E):** Sound Reasoning, Misconception M1/M2, or Prerequisite Gap.
3. **Interaction History (I):** Attempts made, hints requested, repeated mistakes and time spent.
4. **Mastery History (M):** Previous correct and incorrect responses on the same concept.

### Three Adaptive Outcomes

| Condition | Tutor Decision | Pedagogical Rationale |
|---|---|---|
| Two consecutive correct responses with sound reasoning and no hints | **Outcome 1: Harder Question.** Generate a more challenging scenario involving multiple percentage operations or unfamiliar retail situations. | Builds self-efficacy and extends understanding without sudden formula jumps. |
| M1 or M2 detected in the answer or explanation | **Outcome 2: Alternative Explanation.** Present a visual rupee-bar comparison, price-tag illustration or step-by-step repeated discount explanation, followed by a parallel retry question. | Reframes the misconception visually rather than repeating textbook formulas. |
| Two consecutive errors on the same concept, or a prerequisite arithmetic/identification gap | **Outcome 3: Prerequisite Instruction.** Provide a short mini-lesson such as finding 10% and 5% mentally or sorting CP, MP and SP before returning to the original topic. | Reduces cognitive load and rebuilds foundational understanding. |

### Adaptive Question Generation Engine

The five designed tasks act as initial question templates. The application generates new questions by changing numerical values, retail contexts, difficulty and the misconception being tested.

**Inputs considered:**
- Previous answers and correctness.
- Written explanations and conceptual understanding.
- Number of attempts and hints requested.
- Misconceptions detected (M1 or M2).
- Time spent on each question.
- Current mastery level.

**Generation process:**

1. Identify the concept being tested.
2. Retrieve the learner's previous responses and misconception history.
3. Select the next learning pathway using the decision rules.
4. Generate a new contextual question with appropriate numerical values.
5. Independently calculate the expected answer using a deterministic calculation engine.
6. Validate the generated question and answer before presenting it to the learner.
7. Send the feedback for teacher review.

The tutor uses rule-based logic to determine the learning pathway. AI generates contextual question wording and evaluates written reasoning, while deterministic mathematical calculations verify numerical answers.

---

## C5 Design Constraint Implementation: Teacher-in-the-Loop

### 1. Dual-Role Navigation (Learner View ↔ Teacher Dashboard)

A clean navigation bar allows switching between Sharvee's Learner View and Ms. Deshmukh's Teacher Dashboard.

Both views access the same learner progress and submission records. Shared persistent storage is used so that teacher interventions are reflected in the learner's view.

### 2. Live Progress & Misconception Telemetry

The Teacher Dashboard displays:

- Learner name and session status.
- Overall accuracy and questions attempted.
- Current mastery level across Learning Outcomes 1–3.
- Active misconception flags:
  - M1: Base-Value Confusion.
  - M2: Repeated Discount / Symmetric Percentage Fallacy.
- Everyday Store Receipt entries.
- Full transcript of numerical answers and written explanations.
- Number of hints requested and repeated attempts.
- Current adaptive learning pathway.

### 3. AI Feedback Approval & Override Workflow

Every AI-generated diagnosis, feedback message and adaptive routing decision appears in a Teacher Review Queue.

Each submission displays:

- Original learner answer.
- Detected misconception.
- AI-generated feedback.
- Suggested next question.
- Current review status.

**Available Teacher Actions:**

- **Approve Feedback:** Marks the AI feedback as "Verified by Ms. Deshmukh" and makes it visible in the learner's view.
- **Edit Feedback:** Opens an inline editor where the teacher can modify the AI-generated explanation before approving it.
- **Override Feedback:** Allows the teacher to replace the AI feedback with a personalised explanation, change the diagnosed misconception tag or manually change the next learning pathway.

The updated feedback appears in the learner's view with the label "Teacher Feedback (Edited by Ms. Deshmukh)".

### 4. Feedback History

The application records whether each feedback item was:
- AI-generated and pending review.
- Approved by the teacher.
- Edited by the teacher.
- Overridden by the teacher.

This creates an auditable record of teacher intervention and ensures AI-generated explanations are not automatically treated as authoritative.

---

## D4. Application Architecture (6 Connected Screens/States)

1. **Screen 1: Learner Welcome & Calm Check-in**
   - Introduces Sharvee's profile.
   - Includes a confidence slider and supportive welcome message.
   - Quick toggle to Teacher Dashboard.
   - Identity Token displayed in footer.

2. **Screen 2: Concept Anchor & My Everyday Store Receipt Explorer**
   - Interactive CP → MP → SP sneaker story.
   - Live calculator where Sharvee enters MRP and paid price of everyday items.
   - Shows discount amount, discount percentage and optional successive discount simulation.

3. **Screen 3: Adaptive Learner Workspace**
   - Renders non-MCQ formats:
     - Role Mapper.
     - Step-by-Step Numerical Workspace + Explanation Box.
     - Repeated-Discount Error Critique.
     - What-If Prediction.
     - AI-Generated Micro-Scenario.
   - Displays teacher-approved feedback and status.

4. **Screen 4: Adaptive Intervention / Branch View**
   - Displays the triggered P4 decision-rule outcome.
   - Shows one of:
     - Visual Bar Comparison (M1/M2).
     - Prerequisite Mini-Booster.
     - Next Challenge.
   - Explains why the tutor selected that learning pathway.

5. **Screen 5: C5 Teacher-in-the-Loop Dashboard**
   - Shows learner progress metrics and misconception flags.
   - Displays submission history and feedback review queue.
   - Includes functional Approve, Edit and Override controls.
   - Reflects teacher interventions in the learner view.

6. **Screen 6: About & Pedagogical Inspector Screen**
   - Displays Identity Token `<24b3020>`.
   - Displays exam card details `P4-T9-L5-C5`.
   - Shows the adaptive decision rules and recent learning-path decisions for viva inspection.

---

## D5. Two Contrasting Learner Scenarios

### Scenario A — Correct Learner Path

1. Sharvee correctly identifies CP, MP and SP in Task 1.
2. She calculates the discount and profit correctly in Task 2 and explains why the discount is calculated on MP.
3. She correctly identifies Kabir's error in Task 3 and calculates the successive discount.
4. The system records two consecutive correct responses with sound reasoning.
5. The adaptive engine routes her to a harder question.
6. The AI generates a new scenario with increased complexity.
7. The feedback is sent to the teacher review queue for approval.
8. Ms. Deshmukh approves the feedback.
9. Sharvee receives encouraging feedback and proceeds to the harder task.

**Expected system response:** Harder question with increased numerical and conceptual complexity.

### Scenario B — Misconception Learner Path (M1)

1. Sharvee correctly identifies CP, MP and SP in Task 1.
2. In Task 2, she incorrectly calculates 15% of ₹800 instead of ₹1,000.
3. The system identifies M1 (Base-Value Confusion).
4. The adaptive engine pauses the normal question sequence.
5. It generates a visual comparison showing why the discount applies to MP rather than CP.
6. A new parallel question with different numbers is generated.
7. The AI feedback enters the teacher review queue.
8. Ms. Deshmukh edits the feedback to provide a more personalised explanation.
9. Sharvee receives the teacher-approved explanation and retries the question.

**Expected system response:** Alternative explanation and targeted retry rather than a harder question.

Both scenarios will be demonstrated on the live application and captured through screenshots for the final report.

---

## D6. AI Functionality Specification

### AI Feature 1 — Adaptive Question Generation

**Purpose:** Generate new contextual questions based on the learner's previous performance and misconceptions.

**Input:** Topic, learner's previous answers, detected misconceptions, mastery level and selected difficulty.

**Example Prompt:**

"You are an educational question generator for a Class 8 learner studying percentages, discount, profit and loss. The learner has previously confused Cost Price and Marked Price when calculating discounts. Generate one new everyday retail scenario that tests this specific misconception. Use Indian rupees, simple language and age-appropriate contexts. Do not reveal the answer. Return the question, expected answer and step-by-step solution separately."

**Output:** A new contextual numerical question, model answer and solution.

**Validation:** A deterministic calculation engine checks the generated answer before the question is approved for use.

### AI Feature 2 — Explanation Evaluation & Misconception Diagnosis

**Purpose:** Evaluate written explanations and distinguish between conceptual understanding, M1, M2 and prerequisite gaps.

**Input:** Learner's numerical answer, written explanation, correct solution and previous misconception history.

**Example Prompt:**

"Evaluate this Class 8 learner's response to a profit and loss question. Determine whether the learner understands the distinction between CP and MP, or whether they have confused the percentage base. Also check whether the numerical calculation is correct. Classify the response as Sound Reasoning, M1, M2, or Prerequisite Gap. Give a short, supportive explanation suitable for an anxious learner. Do not shame or discourage the learner."

**Output:** Numerical correctness, misconception classification, explanation assessment and suggested feedback.

### AI Feature 3 — Supportive Feedback Generation

**Purpose:** Generate calm, personalised feedback based on the diagnosed misconception.

**Input:** Learner response, misconception classification, correct mathematical solution and learner profile.

**Output:** Short, encouraging feedback with a hint or alternative explanation.

### Human Validation and Fallback

- AI-generated feedback is sent to the Teacher Review Queue before reaching the learner.
- The teacher can approve, edit or override the feedback.
- Numerical calculations are verified independently using deterministic logic.
- If an AI service fails, the application uses predefined feedback and recorded sample question outputs.
- The fallback is clearly labelled and does not pretend to be a live AI response.

---

## D7. Pedagogical Rationale

### 1. Learning Through Familiar Contexts

The Everyday Store Receipt Explorer connects abstract percentage calculations to familiar retail situations such as stationery, snacks and sneakers. This helps the learner develop intuition around CP, MP and SP before encountering formulas.

### 2. Addressing Alternate Conceptions

The two major misconceptions (M1 and M2) are explicitly tested through different question formats. The tutor identifies the specific error and provides a targeted explanation instead of simply displaying the correct answer.

### 3. Adaptive Scaffolding

The tutor adjusts the difficulty and nature of the next task based on numerical performance, written reasoning and previous interactions. A learner demonstrating mastery receives a harder question, a learner showing a misconception receives an alternative explanation, and a learner struggling with prerequisites receives a mini-lesson.

### 4. Supporting an Anxious Learner

The application avoids harsh correctness indicators and uses calm, conversational feedback. Small achievable tasks, hints and visible progress help rebuild confidence and self-efficacy.

### 5. Teacher-in-the-Loop

The teacher dashboard ensures human supervision of AI-generated feedback. Ms. Deshmukh can monitor progress, identify recurring difficulties and personalise explanations. This is particularly important for a learner with high anxiety and low self-confidence.

### 6. Answer to the P4 Design Challenge

The tutor uses an explicit decision rule based on numerical accuracy, explanation quality and interaction history. It demonstrates three distinct adaptive outcomes: harder questions, alternative explanations and prerequisite instruction. This ensures that adaptation is based on the learner's actual understanding rather than merely counting correct answers.

### 7. C5 Constraint

The teacher dashboard is an integral part of the learning workflow, not just an additional analytics page. The teacher can approve or override feedback, and the learner sees the final teacher-reviewed explanation.

---

## D8. Evaluation Plan

The effectiveness of the application will be evaluated using three measurable learning outcomes.

### Outcome 1 — Distinguish CP, MP and SP

**Assessment:** Interactive Price-Tag Mapping and new retail scenarios.

**Success Criterion:** Learner correctly identifies all three prices and the correct discount base in at least 4 out of 5 assessment items.

### Outcome 2 — Calculate Selling Price and Profit/Loss

**Assessment:** Step-by-Step Numerical Workspace and What-If Prediction tasks.

**Success Criterion:** Learner correctly calculates SP and Profit/Loss percentage in at least 4 out of 5 assessment items, showing the correct percentage base.

### Outcome 3 — Explain Successive Percentage Changes

**Assessment:** Error-Spotting task and generated successive discount scenarios.

**Success Criterion:** Learner correctly explains why successive discounts are not additive and solves at least 2 consecutive successive percentage questions.

### Data to Be Collected

- Initial diagnostic accuracy.
- Final assessment accuracy.
- Number of attempts per question.
- Misconceptions detected and resolved.
- Number of hints requested.
- Time spent on each activity.
- Number of successful adaptive transitions.
- Teacher approvals, edits and overrides.
- Learner confidence rating before and after the session.

### Overall Success

The application will be considered successful if the learner demonstrates improvement from the initial diagnostic assessment, meets the three learning outcome criteria, and shows a reduction in repeated M1 and M2 errors.

The teacher dashboard will also be evaluated based on whether the teacher can correctly identify learner difficulties, approve AI feedback and successfully override an incorrect or unsuitable explanation.

---

## AI-Use Log and Reflection

AI tools are used for:
- Generating contextual questions based on learner performance.
- Evaluating written explanations and diagnosing misconceptions.
- Producing personalised, supportive feedback.
- Assisting with application development and debugging.

AI-generated numerical answers are not blindly trusted. A deterministic calculation engine independently verifies mathematical answers, while the teacher reviews feedback before it reaches the learner.

The application combines rule-based adaptation, AI-assisted content generation and human oversight to create a safer and more personalised remedial learning experience.
