/**
 * State.js
 * Central Reactive Store & LocalStorage Manager
 * Identity Token: 24b3020
 * 
 * Synchronizes real-time state across:
 * - Learner View (Sharvee Kulkarni)
 * - Teacher Dashboard (Ms. Deshmukh)
 * - Inspector & About Screen
 */

import { MockScenarios } from './mockData.js';
import { SeededTasks } from './questionBank.js';

const STORAGE_KEY = 'et617_pal_state_24b3020';

const getDefaultState = () => ({
  studentId: 'L5_sharvee',
  name: 'Sharvee Kulkarni',
  grade: 8,
  school: 'Pune Vidyalaya, Maharashtra',
  confidenceScore: 3,
  currentTaskIndex: 0,
  activeRole: 'learner', // 'learner' | 'teacher'
  activeScreen: 'screen_welcome', // screen_welcome, screen_receipt, screen_workspace, screen_branch, screen_teacher, screen_inspector
  autoApproveMode: false,
  apiKey: '',
  tasks: SeededTasks,
  receiptEntries: [
    { id: 1, item: 'Masala Chips Packet', mrp: 50, sp: 45, discountRupees: 5, discountPct: 10, hasExtra10: false }
  ],
  mastery: {
    LO1_DistinguishPrices: 0.35,
    LO2_CalculateDiscountProfit: 0.25,
    LO3_ExplainSuccessiveChanges: 0.15
  },
  flags: {
    M1_BaseValueConfusion: false,
    M2_AdditiveFallacy: false
  },
  submissions: [],
  latestPathway: {
    outcome: 'Standard Progression',
    outcomeCode: 'OUTCOME_STANDARD',
    title: 'Orientation Stage',
    pedagogicalRationale: 'Sharvee is starting her learning journey with concrete retail examples and supportive scaffolding.',
    interventionType: 'standard_task',
    recommendedTaskId: 'task_1'
  },
  auditLog: [
    { timestamp: 'Initial System Seed', action: 'Session initialized for Sharvee Kulkarni (L5) under Ms. Deshmukh (C5)' }
  ]
});

class Store {
  constructor() {
    this.listeners = [];
    this.state = this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...getDefaultState(), ...parsed };
      }
    } catch (e) {
      console.warn('Failed to load state from localStorage:', e);
    }
    return getDefaultState();
  }

  saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Failed to save state to localStorage:', e);
    }
  }

  getState() {
    return { ...this.state };
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.saveToStorage();
    for (const listener of this.listeners) {
      try {
        listener(this.getState());
      } catch (err) {
        console.error('State listener error:', err);
      }
    }
  }

  setState(partial) {
    this.state = { ...this.state, ...partial };
    this.notify();
  }

  setRole(role) {
    this.setState({ activeRole: role });
  }

  setScreen(screenId) {
    this.setState({ activeScreen: screenId });
  }

  setConfidenceScore(score) {
    this.setState({ confidenceScore: Number(score) });
  }

  toggleAutoApprove(enabled) {
    this.setState({ autoApproveMode: Boolean(enabled) });
  }

  setApiKey(key) {
    this.setState({ apiKey: key.trim() });
  }

  addReceiptEntry(entry) {
    const receiptEntries = [entry, ...this.state.receiptEntries];
    // Boost LO1 mastery slightly for hands-on exploration
    const mastery = {
      ...this.state.mastery,
      LO1_DistinguishPrices: Math.min(1.0, this.state.mastery.LO1_DistinguishPrices + 0.1)
    };
    const auditLog = [
      { timestamp: new Date().toLocaleTimeString(), action: `Added receipt entry for "${entry.item}" (MRP: ₹${entry.mrp}, Paid: ₹${entry.sp})` },
      ...this.state.auditLog
    ];
    this.setState({ receiptEntries, mastery, auditLog });
  }

  submitTask(submissionData, pathwayData) {
    const isAutoApprove = this.state.autoApproveMode;
    const submissionId = 'sub_' + Date.now();

    const submission = {
      submissionId,
      timestamp: new Date().toLocaleTimeString(),
      ...submissionData,
      reviewStatus: isAutoApprove ? 'approved' : 'pending',
      teacherFeedback: isAutoApprove 
        ? `Verified by Ms. Deshmukh: ${submissionData.diagnosticResult.feedback}` 
        : null,
      reviewedBy: isAutoApprove ? 'Ms. Deshmukh (Auto-Verified)' : null,
      hintsUsed: submissionData.hintsUsed || 0
    };

    const submissions = [submission, ...this.state.submissions];

    // Update active flags
    const flags = { ...this.state.flags };
    if (submissionData.diagnosticResult.classification === 'M1_BaseValueConfusion') {
      flags.M1_BaseValueConfusion = true;
    }
    if (submissionData.diagnosticResult.classification === 'M2_AdditiveFallacy') {
      flags.M2_AdditiveFallacy = true;
    }

    // Update mastery dynamically
    const mastery = { ...this.state.mastery };
    if (submissionData.diagnosticResult.isCorrect) {
      if (submissionData.taskId === 'task_1') mastery.LO1_DistinguishPrices = Math.min(1.0, mastery.LO1_DistinguishPrices + 0.25);
      if (submissionData.taskId === 'task_2' || submissionData.taskId === 'task_4') mastery.LO2_CalculateDiscountProfit = Math.min(1.0, mastery.LO2_CalculateDiscountProfit + 0.25);
      if (submissionData.taskId === 'task_3') mastery.LO3_ExplainSuccessiveChanges = Math.min(1.0, mastery.LO3_ExplainSuccessiveChanges + 0.35);
    }

    const auditLog = [
      { timestamp: new Date().toLocaleTimeString(), action: `Task ${submissionData.taskId} submitted. Result: ${submissionData.diagnosticResult.classification}. Status: ${submission.reviewStatus}` },
      ...this.state.auditLog
    ];

    this.setState({
      submissions,
      flags,
      mastery,
      latestPathway: pathwayData,
      auditLog
    });

    return submission;
  }

  // Teacher C5 Actions:
  approveSubmission(submissionId) {
    const submissions = this.state.submissions.map(sub => {
      if (sub.submissionId === submissionId) {
        return {
          ...sub,
          reviewStatus: 'approved',
          teacherFeedback: `Verified by Ms. Deshmukh: ${sub.diagnosticResult.feedback}`,
          reviewedBy: 'Ms. Deshmukh',
          reviewedAt: new Date().toLocaleTimeString()
        };
      }
      return sub;
    });

    const auditLog = [
      { timestamp: new Date().toLocaleTimeString(), action: `Ms. Deshmukh APPROVED feedback for submission ${submissionId}` },
      ...this.state.auditLog
    ];

    this.setState({ submissions, auditLog });
  }

  editSubmission(submissionId, editedFeedback) {
    const submissions = this.state.submissions.map(sub => {
      if (sub.submissionId === submissionId) {
        return {
          ...sub,
          reviewStatus: 'edited',
          teacherFeedback: `Teacher Feedback (Edited by Ms. Deshmukh): ${editedFeedback}`,
          reviewedBy: 'Ms. Deshmukh',
          reviewedAt: new Date().toLocaleTimeString()
        };
      }
      return sub;
    });

    const auditLog = [
      { timestamp: new Date().toLocaleTimeString(), action: `Ms. Deshmukh EDITED feedback for submission ${submissionId}` },
      ...this.state.auditLog
    ];

    this.setState({ submissions, auditLog });
  }

  overrideSubmission(submissionId, overrideData) {
    const { customFeedback, forcedClassification, forcedOutcome } = overrideData;

    let pathwayUpdate = this.state.latestPathway;
    if (forcedOutcome === 'OUTCOME_1') {
      pathwayUpdate = {
        outcome: 'Outcome 1: Harder Question (Teacher Forced)',
        outcomeCode: 'OUTCOME_1',
        title: 'Ready for Higher Challenge! (Teacher Override)',
        pedagogicalRationale: 'Ms. Deshmukh manually routed Sharvee to a harder challenge based on clinical observation.',
        interventionType: 'harder_question',
        recommendedTaskId: 'task_harder_challenge'
      };
    } else if (forcedOutcome === 'OUTCOME_2') {
      pathwayUpdate = {
        outcome: 'Outcome 2: Alternative Visual Explanation (Teacher Forced)',
        outcomeCode: 'OUTCOME_2',
        title: 'Visual Rupee-Bar Remediation (Teacher Override)',
        pedagogicalRationale: 'Ms. Deshmukh identified a conceptual misconception and initiated visual Rupee-Bar scaffolding.',
        interventionType: 'visual_remediation',
        misconception: forcedClassification.includes('M1') ? 'M1' : 'M2',
        recommendedTaskId: 'retry_m1_parallel'
      };
    } else if (forcedOutcome === 'OUTCOME_3') {
      pathwayUpdate = {
        outcome: 'Outcome 3: Prerequisite Instruction (Teacher Forced)',
        outcomeCode: 'OUTCOME_3',
        title: 'Mental Math Mini-Booster (Teacher Override)',
        pedagogicalRationale: 'Ms. Deshmukh paused normal progression to strengthen foundational 10% and 5% arithmetic.',
        interventionType: 'prerequisite_booster',
        recommendedTaskId: 'booster_mental_math'
      };
    }

    const flags = { ...this.state.flags };
    if (forcedClassification === 'M1_BaseValueConfusion') flags.M1_BaseValueConfusion = true;
    if (forcedClassification === 'M2_AdditiveFallacy') flags.M2_AdditiveFallacy = true;

    const submissions = this.state.submissions.map(sub => {
      if (sub.submissionId === submissionId) {
        return {
          ...sub,
          reviewStatus: 'overridden',
          diagnosticResult: {
            ...sub.diagnosticResult,
            classification: forcedClassification
          },
          teacherFeedback: `Teacher Override (Ms. Deshmukh): ${customFeedback}`,
          reviewedBy: 'Ms. Deshmukh',
          reviewedAt: new Date().toLocaleTimeString()
        };
      }
      return sub;
    });

    const auditLog = [
      { timestamp: new Date().toLocaleTimeString(), action: `Ms. Deshmukh OVERRODE submission ${submissionId}: Set ${forcedClassification}, forced ${forcedOutcome}` },
      ...this.state.auditLog
    ];

    this.setState({
      submissions,
      flags,
      latestPathway: pathwayUpdate,
      auditLog
    });
  }

  loadScenarioA() {
    const scA = MockScenarios.scenarioA;
    this.setState({
      ...scA,
      tasks: SeededTasks,
      auditLog: [
        { timestamp: new Date().toLocaleTimeString(), action: 'Loaded Preset Scenario A (Sound Reasoning & Outcome 1: Harder Challenge)' },
        ...this.state.auditLog
      ]
    });
  }

  loadScenarioB() {
    const scB = MockScenarios.scenarioB;
    this.setState({
      ...scB,
      tasks: SeededTasks,
      auditLog: [
        { timestamp: new Date().toLocaleTimeString(), action: 'Loaded Preset Scenario B (M1 Misconception & Outcome 2: Visual Rupee-Bar Remediation)' },
        ...this.state.auditLog
      ]
    });
  }

  resetState() {
    const fresh = getDefaultState();
    this.state = fresh;
    this.notify();
  }
}

export const appStore = new Store();
