/**
 * App.js
 * Main Controller & View Synchronizer
 * Identity Token: 24b3020
 * Exam Card: P4-T9-L5-C5
 */

import { appStore } from './state.js';
import { MathEngine } from './mathEngine.js';
import { DiagnosticEngine } from './diagnosticEngine.js';
import { AdaptiveRules } from './adaptiveRules.js';
import { QuestionGenerator } from './questionBank.js';

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements Cache ---
  const navTabs = document.querySelectorAll('.nav-tab');
  const screenViews = document.querySelectorAll('.screen-view');
  const roleLearnerBtn = document.getElementById('role-learner-btn');
  const roleTeacherBtn = document.getElementById('role-teacher-btn');
  const pendingCounter = document.getElementById('pending-badge-counter');

  // Screen 1 Elements
  const confidenceRange = document.getElementById('confidence-range');
  const confidenceIndicator = document.getElementById('confidence-indicator');
  const startLearningBtn = document.getElementById('start-learning-btn');
  const welcomeSwitchTeacherBtn = document.getElementById('welcome-switch-teacher-btn');

  // Screen 2 Receipt Elements
  const rcptItemName = document.getElementById('rcpt-item-name');
  const rcptMRP = document.getElementById('rcpt-mrp');
  const rcptSP = document.getElementById('rcpt-sp');
  const rcptExtraToggle = document.getElementById('rcpt-extra-discount-toggle');
  const saveReceiptBtn = document.getElementById('save-receipt-entry-btn');
  const goToWorkspaceBtn = document.getElementById('go-to-workspace-btn');

  const slipItemName = document.getElementById('slip-item-name');
  const slipMRPDisplay = document.getElementById('slip-mrp-display');
  const slipRupeeSavings = document.getElementById('slip-rupee-savings');
  const slipDiscountPct = document.getElementById('slip-discount-pct');
  const slipExtraRow = document.getElementById('slip-extra-discount-row');
  const slipExtraSavings = document.getElementById('slip-extra-savings');
  const slipFinalSP = document.getElementById('slip-final-sp');
  const barPaidSegment = document.getElementById('bar-paid-segment');
  const barDiscountSegment = document.getElementById('bar-discount-segment');
  const barPercentageLabel = document.getElementById('bar-percentage-label');

  // Screen 3 Workspace Elements
  const taskTabBtns = document.querySelectorAll('.task-tab-btn');
  const taskContainers = document.querySelectorAll('.task-container');
  const autoApproveToggle = document.getElementById('auto-approve-toggle');
  const hintTriggers = document.querySelectorAll('.hint-trigger');

  // Screen 5 Teacher Elements
  const telemetryAccuracy = document.getElementById('telemetry-accuracy');
  const telemetryTasks = document.getElementById('telemetry-tasks');
  const telemetryFlags = document.getElementById('telemetry-flags');
  const telemetryFlagsDetail = document.getElementById('telemetry-flags-detail');
  const telemetryPending = document.getElementById('telemetry-pending');
  const masteryLO1Val = document.getElementById('mastery-lo1-val');
  const masteryLO1Fill = document.getElementById('mastery-lo1-fill');
  const masteryLO2Val = document.getElementById('mastery-lo2-val');
  const masteryLO2Fill = document.getElementById('mastery-lo2-fill');
  const masteryLO3Val = document.getElementById('mastery-lo3-val');
  const masteryLO3Fill = document.getElementById('mastery-lo3-fill');
  const reviewQueueContainer = document.getElementById('review-queue-container');
  const auditLogContainer = document.getElementById('audit-log-container');

  // Screen 6 Inspector Elements
  const loadScenarioABtn = document.getElementById('load-scenario-a-btn');
  const loadScenarioBBtn = document.getElementById('load-scenario-b-btn');
  const resetStateBtn = document.getElementById('reset-state-btn');
  const stateInspectorOutput = document.getElementById('state-inspector-output');
  const geminiApiKeyInput = document.getElementById('gemini-api-key-input');
  const saveApiKeyBtn = document.getElementById('save-api-key-btn');
  const activeEngineBadge = document.getElementById('active-engine-badge');

  // --- Helper: Switch Screen View ---
  function switchScreen(screenId) {
    screenViews.forEach(view => {
      view.classList.toggle('active', view.id === screenId);
    });
    navTabs.forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-screen') === screenId);
    });
    appStore.setScreen(screenId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- Helper: Switch Task Tab ---
  function switchTaskTab(taskIndex) {
    taskTabBtns.forEach((btn, idx) => {
      btn.classList.toggle('active', idx === taskIndex);
    });
    taskContainers.forEach((panel, idx) => {
      panel.classList.toggle('active', idx === taskIndex);
    });
  }

  // --- Attach Navigation Events ---
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const screenId = tab.getAttribute('data-screen');
      switchScreen(screenId);
    });
  });

  taskTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-task-tab'), 10);
      switchTaskTab(idx);
    });
  });

  // Role Switchers
  roleLearnerBtn.addEventListener('click', () => {
    roleLearnerBtn.classList.add('active');
    roleTeacherBtn.classList.remove('active');
    appStore.setRole('learner');
    switchScreen('screen_welcome');
  });

  roleTeacherBtn.addEventListener('click', () => {
    roleTeacherBtn.classList.add('active');
    roleLearnerBtn.classList.remove('active');
    appStore.setRole('teacher');
    switchScreen('screen_teacher');
  });

  // Screen 1: Confidence Check-in & CTAs
  confidenceRange.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    const messages = {
      1: '1 / 5 — "A bit anxious, but I\'m willing to try gentle steps."',
      2: '2 / 5 — "A bit nervous, but ready to take it one step at a time."',
      3: '3 / 5 — "Feeling okay! Ready to look at everyday receipts."',
      4: '4 / 5 — "Feeling pretty good! I want to understand the three prices."',
      5: '5 / 5 — "Calm and confident! Let\'s master discount and profit!"'
    };
    confidenceIndicator.textContent = messages[val] || `${val} / 5`;
    appStore.setConfidenceScore(val);
  });

  startLearningBtn.addEventListener('click', () => {
    switchScreen('screen_receipt');
  });

  welcomeSwitchTeacherBtn.addEventListener('click', () => {
    roleTeacherBtn.click();
  });

  // --- Screen 2: Interactive Receipt Calculator Logic ---
  function updateReceiptCalculator() {
    const itemName = rcptItemName.value.trim() || 'Store Item';
    const mrp = Math.max(1, parseFloat(rcptMRP.value) || 0);
    const sp = Math.max(0, parseFloat(rcptSP.value) || 0);
    const hasExtra = rcptExtraToggle.checked;

    slipItemName.textContent = itemName;
    slipMRPDisplay.textContent = `₹${mrp.toFixed(2)}`;

    const directRupeeSavings = Math.max(0, mrp - sp);
    slipRupeeSavings.textContent = `-₹${directRupeeSavings.toFixed(2)}`;

    const discountPct = mrp > 0 ? (directRupeeSavings / mrp) * 100 : 0;
    slipDiscountPct.textContent = `${discountPct.toFixed(2)}%`;

    if (hasExtra) {
      slipExtraRow.style.display = 'flex';
      const extraDiscountAmount = sp * 0.10;
      const finalPrice = sp - extraDiscountAmount;
      slipExtraSavings.textContent = `-₹${extraDiscountAmount.toFixed(2)}`;
      slipFinalSP.textContent = `₹${finalPrice.toFixed(2)}`;

      const totalSaved = mrp - finalPrice;
      const totalPct = (totalSaved / mrp) * 100;
      const paidPct = (finalPrice / mrp) * 100;

      barPaidSegment.style.width = `${Math.min(100, Math.max(0, paidPct))}%`;
      barPaidSegment.textContent = `₹${finalPrice.toFixed(0)} Paid`;
      barDiscountSegment.style.width = `${Math.min(100, Math.max(0, totalPct))}%`;
      barDiscountSegment.textContent = `₹${totalSaved.toFixed(0)} Off`;
      barPercentageLabel.textContent = `Paid: ${paidPct.toFixed(0)}% | Total Saved: ${totalPct.toFixed(1)}%`;
    } else {
      slipExtraRow.style.display = 'none';
      slipFinalSP.textContent = `₹${sp.toFixed(2)}`;

      const paidPct = mrp > 0 ? (sp / mrp) * 100 : 0;
      const savedPct = 100 - paidPct;

      barPaidSegment.style.width = `${Math.min(100, Math.max(0, paidPct))}%`;
      barPaidSegment.textContent = `₹${sp.toFixed(0)} Paid`;
      barDiscountSegment.style.width = `${Math.min(100, Math.max(0, savedPct))}%`;
      barDiscountSegment.textContent = `₹${directRupeeSavings.toFixed(0)} Off`;
      barPercentageLabel.textContent = `Paid: ${paidPct.toFixed(0)}% | Saved: ${savedPct.toFixed(0)}%`;
    }
  }

  rcptItemName.addEventListener('input', updateReceiptCalculator);
  rcptMRP.addEventListener('input', updateReceiptCalculator);
  rcptSP.addEventListener('input', updateReceiptCalculator);
  rcptExtraToggle.addEventListener('change', updateReceiptCalculator);

  saveReceiptBtn.addEventListener('click', () => {
    const itemName = rcptItemName.value.trim() || 'Store Item';
    const mrp = parseFloat(rcptMRP.value) || 0;
    const sp = parseFloat(rcptSP.value) || 0;
    const hasExtra = rcptExtraToggle.checked;
    const savings = mrp - sp;
    const pct = mrp > 0 ? (savings / mrp) * 100 : 0;

    appStore.addReceiptEntry({
      id: Date.now(),
      item: itemName,
      mrp,
      sp,
      discountRupees: savings,
      discountPct: MathEngine.round2(pct),
      hasExtra10: hasExtra
    });

    saveReceiptBtn.textContent = '✅ Saved to Journal!';
    setTimeout(() => {
      saveReceiptBtn.textContent = '💾 Save to Sharvee\'s Learning Journal';
    }, 1800);
  });

  goToWorkspaceBtn.addEventListener('click', () => {
    switchScreen('screen_workspace');
  });

  // Hints toggling
  hintTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.getAttribute('data-hint');
      const body = document.getElementById(`hint-body-${idx}`);
      if (body) {
        body.classList.toggle('open');
      }
    });
  });

  // Auto-Approve Toggle
  autoApproveToggle.addEventListener('change', (e) => {
    appStore.toggleAutoApprove(e.target.checked);
  });

  // --- Task Submissions Handler ---
  function renderLearnerFeedback(boxId, diagnosticResult, submissionRecord) {
    const box = document.getElementById(boxId);
    if (!box) return;

    box.classList.remove('correct', 'encouraging');
    box.classList.add('visible');
    box.classList.add(diagnosticResult.isCorrect ? 'correct' : 'encouraging');

    let badgeHtml = '';
    if (submissionRecord && submissionRecord.reviewStatus === 'approved') {
      badgeHtml = `<div class="teacher-approval-tag tag-verified"><span>🛡️</span> Verified by Ms. Deshmukh</div>`;
    } else if (submissionRecord && submissionRecord.reviewStatus === 'edited') {
      badgeHtml = `<div class="teacher-approval-tag tag-edited"><span>✏️</span> Teacher Feedback (Edited by Ms. Deshmukh)</div>`;
    } else if (submissionRecord && submissionRecord.reviewStatus === 'overridden') {
      badgeHtml = `<div class="teacher-approval-tag tag-edited"><span>⚡</span> Teacher Override (Ms. Deshmukh)</div>`;
    } else {
      badgeHtml = `<div class="teacher-approval-tag tag-pending"><span>⏳</span> Sent to Ms. Deshmukh for review</div>`;
    }

    const textToDisplay = (submissionRecord && submissionRecord.teacherFeedback) 
      ? submissionRecord.teacherFeedback 
      : diagnosticResult.feedback;

    box.innerHTML = `
      ${badgeHtml}
      <h4 style="font-size: 1rem; margin-bottom: 4px; font-weight: 700;">
        ${diagnosticResult.isCorrect ? '🌟 Splendid work, Sharvee!' : '💡 Let\'s look at this together:'}
      </h4>
      <p style="font-size: 0.95rem; line-height: 1.5;">${textToDisplay}</p>
      <div style="margin-top: 10px; font-size: 0.8rem; color: #64748b; font-family: var(--font-mono);">
        Diagnostic: ${diagnosticResult.classification} | Engine: ${diagnosticResult.engine}
      </div>
    `;
  }

  // Submit Task 1
  document.getElementById('submit-task-0-btn').addEventListener('click', () => {
    const assignedCP = document.getElementById('t1-cp-select').value;
    const assignedMP = document.getElementById('t1-mp-select').value;
    const assignedSP = document.getElementById('t1-sp-select').value;
    const discountBase = document.querySelector('input[name="t1-discount-base"]:checked').value;

    const result = DiagnosticEngine.evaluateTask1({ assignedCP, assignedMP, assignedSP, discountBase });
    const pathway = AdaptiveRules.evaluateNextPathway(appStore.getState(), { diagnosticResult: result });
    
    const subRecord = appStore.submitTask({
      taskId: 'task_1',
      taskTitle: 'Geometry Box Price-Tag Detective',
      learnerInputs: { assignedCP, assignedMP, assignedSP, discountBase },
      diagnosticResult: result,
      hintsUsed: 0
    }, pathway);

    renderLearnerFeedback('feedback-box-0', result, subRecord);
    document.getElementById('tab-status-0').className = 'task-badge-status done';
  });

  // Submit Task 2
  document.getElementById('submit-task-1-btn').addEventListener('click', () => {
    const sp = document.getElementById('t2-sp-input').value;
    const profitPct = document.getElementById('t2-profit-input').value;
    const explanation = document.getElementById('t2-explanation-input').value;

    const result = DiagnosticEngine.evaluateTask2({ sp, profitPct, explanation });
    const pathway = AdaptiveRules.evaluateNextPathway(appStore.getState(), { diagnosticResult: result });

    const subRecord = appStore.submitTask({
      taskId: 'task_2',
      taskTitle: 'School Bag Monsoon Sale Calculation',
      learnerInputs: { sp, profitPct, explanation },
      diagnosticResult: result,
      hintsUsed: 0
    }, pathway);

    renderLearnerFeedback('feedback-box-1', result, subRecord);
    document.getElementById('tab-status-1').className = 'task-badge-status done';
  });

  // Submit Task 3
  document.getElementById('submit-task-2-btn').addEventListener('click', () => {
    const kabirClaim = document.querySelector('input[name="t3-kabir-claim"]:checked').value;
    const priceAfterFirstDiscount = document.getElementById('t3-price1-input').value;
    const finalSellingPrice = document.getElementById('t3-final-sp-input').value;
    const explanation = document.getElementById('t3-explanation-input').value;

    const result = DiagnosticEngine.evaluateTask3({ kabirClaim, priceAfterFirstDiscount, finalSellingPrice, explanation });
    const pathway = AdaptiveRules.evaluateNextPathway(appStore.getState(), { diagnosticResult: result });

    const subRecord = appStore.submitTask({
      taskId: 'task_3',
      taskTitle: 'Festive Chocolate Box: Kabir\'s Claim',
      learnerInputs: { kabirClaim, priceAfterFirstDiscount, finalSellingPrice, explanation },
      diagnosticResult: result,
      hintsUsed: 0
    }, pathway);

    renderLearnerFeedback('feedback-box-2', result, subRecord);
    document.getElementById('tab-status-2').className = 'task-badge-status done';
  });

  // Submit Task 4
  document.getElementById('submit-task-3-btn').addEventListener('click', () => {
    const maxDiscountPct = document.getElementById('t4-max-discount-input').value;
    const explanation = document.getElementById('t4-explanation-input').value;

    const result = DiagnosticEngine.evaluateTask4({ maxDiscountPct, explanation });
    const pathway = AdaptiveRules.evaluateNextPathway(appStore.getState(), { diagnosticResult: result });

    const subRecord = appStore.submitTask({
      taskId: 'task_4',
      taskTitle: 'Headphones Store Strategy: Max Discount',
      learnerInputs: { maxDiscountPct, explanation },
      diagnosticResult: result,
      hintsUsed: 0
    }, pathway);

    renderLearnerFeedback('feedback-box-3', result, subRecord);
    document.getElementById('tab-status-3').className = 'task-badge-status done';
  });

  // Submit Task 5
  document.getElementById('submit-task-4-btn').addEventListener('click', () => {
    const sp = document.getElementById('t5-sp-input').value;
    const secondaryValue = document.getElementById('t5-secondary-input').value;
    const explanation = document.getElementById('t5-explanation-input').value;

    const currentState = appStore.getState();
    const taskData = QuestionGenerator.generateM1Scenario();
    const result = DiagnosticEngine.evaluateTask5(taskData, { sp, secondaryValue, explanation });
    const pathway = AdaptiveRules.evaluateNextPathway(currentState, { diagnosticResult: result });

    const subRecord = appStore.submitTask({
      taskId: 'task_5',
      taskTitle: 'Adaptive Retail Capstone Challenge',
      learnerInputs: { sp, secondaryValue, explanation },
      diagnosticResult: result,
      hintsUsed: 0
    }, pathway);

    renderLearnerFeedback('feedback-box-4', result, subRecord);
    document.getElementById('tab-status-4').className = 'task-badge-status done';
  });

  // Screen 4 Branch Buttons
  document.getElementById('branch-retry-btn').addEventListener('click', () => {
    switchScreen('screen_workspace');
    switchTaskTab(4); // Switch to Task 5
  });

  document.getElementById('branch-view-teacher-btn').addEventListener('click', () => {
    roleTeacherBtn.click();
  });

  // --- Screen 6: Viva Presets & Inspector Actions ---
  loadScenarioABtn.addEventListener('click', () => {
    appStore.loadScenarioA();
    switchScreen('screen_workspace');
  });

  loadScenarioBBtn.addEventListener('click', () => {
    appStore.loadScenarioB();
    switchScreen('screen_branch');
  });

  resetStateBtn.addEventListener('click', () => {
    if (confirm('Reset all progress and return to fresh session?')) {
      appStore.resetState();
      switchScreen('screen_welcome');
    }
  });

  saveApiKeyBtn.addEventListener('click', () => {
    const key = geminiApiKeyInput.value.trim();
    appStore.setApiKey(key);
    if (key) {
      activeEngineBadge.textContent = 'Live Gemini AI Key Saved';
      activeEngineBadge.className = 'badge badge-amber';
    } else {
      activeEngineBadge.textContent = 'Offline Deterministic Active';
      activeEngineBadge.className = 'badge badge-teal';
    }
    alert('API key setting updated!');
  });

  // --- Render Teacher Review Queue (Constraint C5) ---
  function renderTeacherDashboard(state) {
    const { submissions = [], mastery, flags, auditLog = [] } = state;

    // Telemetry accuracy
    const totalSubs = submissions.length;
    const correctSubs = submissions.filter(s => s.diagnosticResult && s.diagnosticResult.isCorrect).length;
    const accuracy = totalSubs > 0 ? Math.round((correctSubs / totalSubs) * 100) : 100;
    telemetryAccuracy.textContent = `${accuracy}%`;

    telemetryTasks.textContent = `${totalSubs} / 5`;

    // Active flags
    const activeFlags = [];
    if (flags.M1_BaseValueConfusion) activeFlags.push('M1: Base Confusion');
    if (flags.M2_AdditiveFallacy) activeFlags.push('M2: Additive Fallacy');
    
    if (activeFlags.length === 0) {
      telemetryFlags.textContent = 'None';
      telemetryFlags.className = 'telemetry-val text-green';
      telemetryFlagsDetail.textContent = 'Solid base clarity';
    } else {
      telemetryFlags.textContent = activeFlags.join(', ');
      telemetryFlags.className = 'telemetry-val text-amber';
      telemetryFlagsDetail.textContent = 'Targeted remediation active';
    }

    // Pending reviews
    const pendingSubs = submissions.filter(s => s.reviewStatus === 'pending');
    telemetryPending.textContent = `${pendingSubs.length} Pending`;
    if (pendingCounter) {
      if (pendingSubs.length > 0) {
        pendingCounter.style.display = 'inline-block';
        pendingCounter.textContent = pendingSubs.length;
      } else {
        pendingCounter.style.display = 'none';
      }
    }

    // Mastery bars
    const lo1 = Math.round((mastery.LO1_DistinguishPrices || 0) * 100);
    const lo2 = Math.round((mastery.LO2_CalculateDiscountProfit || 0) * 100);
    const lo3 = Math.round((mastery.LO3_ExplainSuccessiveChanges || 0) * 100);

    masteryLO1Val.textContent = `${lo1}%`;
    masteryLO1Fill.style.width = `${lo1}%`;

    masteryLO2Val.textContent = `${lo2}%`;
    masteryLO2Fill.style.width = `${lo2}%`;

    masteryLO3Val.textContent = `${lo3}%`;
    masteryLO3Fill.style.width = `${lo3}%`;

    // Review Queue Container
    if (submissions.length === 0) {
      reviewQueueContainer.innerHTML = `
        <div style="text-align: center; padding: 24px; color: var(--text-muted);">
          <p>No learner submissions yet. As Sharvee solves tasks, submissions will appear here for review.</p>
          <div style="margin-top: 12px;">
            <button id="quick-seed-sub-btn" class="btn-teacher btn-edit">Load Sample Submission for Review</button>
          </div>
        </div>
      `;
      const quickBtn = document.getElementById('quick-seed-sub-btn');
      if (quickBtn) {
        quickBtn.addEventListener('click', () => {
          appStore.loadScenarioB();
        });
      }
    } else {
      reviewQueueContainer.innerHTML = submissions.map(sub => {
        const diag = sub.diagnosticResult || {};
        const isApproved = sub.reviewStatus === 'approved';
        const isEdited = sub.reviewStatus === 'edited';
        const isOverridden = sub.reviewStatus === 'overridden';

        let statusBadge = `<span class="badge badge-amber">Pending Review</span>`;
        if (isApproved) statusBadge = `<span class="badge badge-teal">Verified by Teacher</span>`;
        if (isEdited) statusBadge = `<span class="badge badge-teal">Teacher Edited</span>`;
        if (isOverridden) statusBadge = `<span class="badge" style="background:#fee2e2; color:#b91c1c;">Teacher Overridden</span>`;

        return `
          <div class="queue-item" data-submission-id="${sub.submissionId}">
            <div class="queue-item-header">
              <div>
                <strong style="font-size: 1rem;">${sub.taskTitle || sub.taskId}</strong>
                <span style="font-size: 0.8rem; color: #64748b; margin-left: 8px;">${sub.timestamp}</span>
              </div>
              <div>${statusBadge}</div>
            </div>

            <div class="queue-body-grid">
              <!-- Left Col: Learner Answer -->
              <div class="queue-col">
                <div class="queue-col-title">Learner Inputs & Explanation</div>
                <div style="margin-bottom: 6px;">
                  ${Object.entries(sub.learnerInputs || {}).map(([k, v]) => `<div><strong>${k}:</strong> ${v}</div>`).join('')}
                </div>
              </div>

              <!-- Right Col: AI Diagnosis & Generated Feedback -->
              <div class="queue-col">
                <div class="queue-col-title">AI Diagnosis & Suggested Feedback</div>
                <div style="margin-bottom: 6px;">
                  <strong>Classification:</strong> <span class="badge badge-gray">${diag.classification || 'None'}</span>
                  ${diag.misconceptionDetected ? `<div style="color: #b45309; font-weight: 600; margin-top: 4px;">${diag.misconceptionDetected}</div>` : ''}
                </div>
                <p style="font-size: 0.9rem; color: #334155; margin-top: 6px;">
                  <em>"${diag.feedback || ''}"</em>
                </p>
                ${sub.teacherFeedback ? `
                  <div style="margin-top: 8px; padding-top: 6px; border-top: 1px dashed #cbd5e1; color: #0d9488; font-weight: 600;">
                    ${sub.teacherFeedback}
                  </div>
                ` : ''}
              </div>
            </div>

            <!-- Functional Teacher Controls (Constraint C5) -->
            <div class="teacher-action-bar">
              <button class="btn-teacher btn-approve" data-action="approve" data-id="${sub.submissionId}">
                <span>✅</span> Approve AI Feedback
              </button>
              <button class="btn-teacher btn-edit" data-action="toggle-edit" data-id="${sub.submissionId}">
                <span>✏️</span> Edit Feedback
              </button>
              <button class="btn-teacher btn-override" data-action="toggle-override" data-id="${sub.submissionId}">
                <span>⚡</span> Override Feedback & Pathway
              </button>
            </div>

            <!-- Inline Edit Box -->
            <div class="inline-edit-box" id="edit-box-${sub.submissionId}">
              <label class="form-label" style="font-size: 0.85rem;">Modify Feedback text for Sharvee:</label>
              <textarea class="form-control" id="edit-textarea-${sub.submissionId}">${sub.teacherFeedback || diag.feedback || ''}</textarea>
              <div style="margin-top: 8px; display: flex; gap: 8px;">
                <button class="btn-teacher btn-approve" data-action="save-edit" data-id="${sub.submissionId}">Save & Send to Sharvee</button>
                <button class="btn-teacher btn-edit" data-action="cancel-edit" data-id="${sub.submissionId}">Cancel</button>
              </div>
            </div>

            <!-- Inline Override Box -->
            <div class="inline-edit-box" id="override-box-${sub.submissionId}">
              <div style="font-weight: 700; margin-bottom: 6px; color: #92400e;">Full Pedagogical Override:</div>
              <div class="form-group">
                <label class="form-label" style="font-size: 0.85rem;">Forced Misconception Diagnosis:</label>
                <select class="form-control" id="override-class-${sub.submissionId}">
                  <option value="Sound Reasoning">Sound Reasoning</option>
                  <option value="M1_BaseValueConfusion" ${diag.classification === 'M1_BaseValueConfusion' ? 'selected' : ''}>M1: Base-Value Confusion</option>
                  <option value="M2_AdditiveFallacy" ${diag.classification === 'M2_AdditiveFallacy' ? 'selected' : ''}>M2: Additive Percentage Fallacy</option>
                  <option value="Prerequisite_Gap">Prerequisite Arithmetic Gap</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" style="font-size: 0.85rem;">Forced Adaptive Pathway Outcome:</label>
                <select class="form-control" id="override-outcome-${sub.submissionId}">
                  <option value="OUTCOME_1">Outcome 1: Harder Question</option>
                  <option value="OUTCOME_2" selected>Outcome 2: Alternative Visual Explanation (Rupee-Bar)</option>
                  <option value="OUTCOME_3">Outcome 3: Prerequisite Instruction (Mental Booster)</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" style="font-size: 0.85rem;">Teacher's Custom Explanation for Sharvee:</label>
                <textarea class="form-control" id="override-textarea-${sub.submissionId}">Sharvee dear, remember that the discount is always off the printed sticker tag (₹1,000), not the shopkeeper's cost. Check the visual comparison on the next screen!</textarea>
              </div>
              <div style="margin-top: 8px; display: flex; gap: 8px;">
                <button class="btn-teacher btn-override" data-action="save-override" data-id="${sub.submissionId}">Execute Full Override</button>
                <button class="btn-teacher btn-edit" data-action="cancel-override" data-id="${sub.submissionId}">Cancel</button>
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Attach Teacher Action Listeners
      reviewQueueContainer.querySelectorAll('button[data-action]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const action = btn.getAttribute('data-action');
          const subId = btn.getAttribute('data-id');

          if (action === 'approve') {
            appStore.approveSubmission(subId);
          } else if (action === 'toggle-edit') {
            const editBox = document.getElementById(`edit-box-${subId}`);
            if (editBox) editBox.classList.toggle('open');
          } else if (action === 'cancel-edit') {
            const editBox = document.getElementById(`edit-box-${subId}`);
            if (editBox) editBox.classList.remove('open');
          } else if (action === 'save-edit') {
            const txt = document.getElementById(`edit-textarea-${subId}`).value;
            appStore.editSubmission(subId, txt);
          } else if (action === 'toggle-override') {
            const ovBox = document.getElementById(`override-box-${subId}`);
            if (ovBox) ovBox.classList.toggle('open');
          } else if (action === 'cancel-override') {
            const ovBox = document.getElementById(`override-box-${subId}`);
            if (ovBox) ovBox.classList.remove('open');
          } else if (action === 'save-override') {
            const forcedClassification = document.getElementById(`override-class-${subId}`).value;
            const forcedOutcome = document.getElementById(`override-outcome-${subId}`).value;
            const customFeedback = document.getElementById(`override-textarea-${subId}`).value;
            appStore.overrideSubmission(subId, { forcedClassification, forcedOutcome, customFeedback });
          }
        });
      });
    }

    // Audit Log
    if (auditLogContainer) {
      auditLogContainer.innerHTML = auditLog.map(log => `
        <div style="margin-bottom: 6px; padding: 4px 0; border-bottom: 1px dotted #e2e8f0;">
          <span style="color: #0d9488;">[${log.timestamp}]</span> ${log.action}
        </div>
      `).join('');
    }
  }

  // --- Screen 4 Branch View Synchronization ---
  function updateBranchScreen(state) {
    const pathway = state.latestPathway || {};
    const code = pathway.outcomeCode || 'OUTCOME_STANDARD';

    const pill1 = document.getElementById('pill-outcome-1');
    const pill2 = document.getElementById('pill-outcome-2');
    const pill3 = document.getElementById('pill-outcome-3');
    const card1 = document.getElementById('matrix-card-1');
    const card2 = document.getElementById('matrix-card-2');
    const card3 = document.getElementById('matrix-card-3');
    const badgeCode = document.getElementById('active-pathway-code-badge');
    const titleElem = document.getElementById('remediation-title');
    const badgeElem = document.getElementById('remediation-badge');
    const rationaleElem = document.getElementById('remediation-rationale-text');
    const boosterBox = document.getElementById('prerequisite-booster-box');

    // Reset cards
    [card1, card2, card3].forEach(c => c.classList.remove('active-branch'));
    [pill1, pill2, pill3].forEach(p => p.style.display = 'none');

    badgeCode.textContent = code;

    if (code === 'OUTCOME_1') {
      card1.classList.add('active-branch');
      pill1.style.display = 'inline-block';
      titleElem.textContent = 'Outcome 1: Higher Challenge Micro-Scenario';
      badgeElem.textContent = 'Sound Reasoning Demonstrated';
      badgeElem.className = 'badge badge-teal';
      rationaleElem.textContent = pathway.pedagogicalRationale || 'Sharvee is ready for higher-complexity multi-step markup and discount problems.';
      boosterBox.style.display = 'none';
    } else if (code === 'OUTCOME_3') {
      card3.classList.add('active-branch');
      pill3.style.display = 'inline-block';
      titleElem.textContent = 'Outcome 3: Prerequisite Mini-Lesson (Mental Math Booster)';
      badgeElem.textContent = 'Prerequisite Gap Detected';
      badgeElem.className = 'badge badge-green';
      rationaleElem.textContent = pathway.pedagogicalRationale || 'Rebuilding foundational 10% and 5% arithmetic confidence.';
      boosterBox.style.display = 'block';
    } else {
      // Outcome 2 is default or M1/M2 remediation
      card2.classList.add('active-branch');
      pill2.style.display = 'inline-block';
      titleElem.textContent = pathway.title || 'Outcome 2: Alternative Visual Explanation (Rupee-Bar)';
      badgeElem.textContent = pathway.misconception ? `${pathway.misconception} Active` : 'M1 Base Confusion';
      badgeElem.className = 'badge badge-amber';
      rationaleElem.textContent = pathway.pedagogicalRationale || 'Visualizing the difference between Cost Price base and Marked Price base.';
      boosterBox.style.display = 'none';
    }
  }

  // --- Inspector State Output ---
  function updateInspectorView(state) {
    if (stateInspectorOutput) {
      stateInspectorOutput.textContent = JSON.stringify(state, null, 2);
    }
  }

  // --- Subscribe to App Store ---
  appStore.subscribe((state) => {
    renderTeacherDashboard(state);
    updateBranchScreen(state);
    updateInspectorView(state);

    // Sync submissions back to learner views if open
    state.submissions.forEach((sub, idx) => {
      // Find corresponding feedback box
      const taskIndex = sub.taskId ? parseInt(sub.taskId.replace('task_', ''), 10) - 1 : idx;
      if (taskIndex >= 0 && taskIndex <= 4) {
        renderLearnerFeedback(`feedback-box-${taskIndex}`, sub.diagnosticResult, sub);
        const tabStatus = document.getElementById(`tab-status-${taskIndex}`);
        if (tabStatus) tabStatus.className = 'task-badge-status done';
      }
    });
  });

  // Initial render
  updateReceiptCalculator();
  const initialState = appStore.getState();
  renderTeacherDashboard(initialState);
  updateBranchScreen(initialState);
  updateInspectorView(initialState);
});
