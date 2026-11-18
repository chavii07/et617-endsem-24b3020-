# Phase P4/P5: Limitations & Future Work

- **Identity Token:** `<24b3020>`
- **Exam Card:** `P4-T9-L5-C5`
- **Application:** Adaptive Percentage PAL with Teacher-in-the-Loop Supervision

---

## 1. Honest Limitations

1. **Client-Side Simulation of Multi-Role Collaboration:** While the dual-role architecture perfectly synchronizes via `localStorage` and shared state on a single machine or browser, true multi-device synchronization (e.g. Ms. Deshmukh on her school laptop and Sharvee on a home tablet) currently requires a shared backend (such as WebSockets or Firebase/Supabase).
2. **Text Explanation Semantic Depth:** The offline diagnostic engine relies on heuristic keyword extraction and numerical cross-referencing. While it accurately differentiates between sound reasoning, M1, and M2, nuanced colloquial expressions in Marathi-English code-switching ("tag madhe baghitla") benefit from larger LLM embeddings when a live API key is supplied.
3. **Preset Scope of Initial Tasks:** The core curricular sequence is anchored around 5 rich retail scenarios. While the dynamic generator creates infinite parametric variants, the retail theme is currently centered on school supplies, footwear, sports gear, and electronics.

---

## 2. Planned Next 5 Improvements

1. **Lightweight WebSocket Sync:** Deploy a Node.js/Express socket relay allowing Ms. Deshmukh to supervise 30 students simultaneously from a single classroom screen.
2. **Marathi Language Localization Toggle:** Provide bilingual support (English ↔ Marathi) so Sharvee can read the everyday retail prompts and explanations in her native mother tongue.
3. **Voice Audio Read-Aloud:** Add Web Speech API integration to speak hints aloud in a warm, encouraging voice to further assist low-literacy or auditory learners.
4. **Interactive Bar Drag-and-Drop:** Allow students to physically slide the discount handle on the Rupee-Bar to visually feel the price drop.
5. **PDF Remedial Report Export:** Generate an auditable end-of-session progress summary for parents and school remedial coordinators.

---

## 3. Ethical & Pedagogical Considerations

- **Vulnerable Learner Protection:** Automated evaluation models must never be allowed to pass unmonitored judgment on repeat learners with low self-efficacy. Constraint C5 ensures the human teacher maintains ultimate pedagogical authority.
- **Data Privacy:** The application does not collect student PII, emails, or biometric data. All learning telemetry is retained locally in the user's browser sandbox.
