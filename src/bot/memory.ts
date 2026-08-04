export const conversationMemory = {

  topic: "",
  patient: "",
  pregnancyMonths: "",
  severity: "",
  duration: "",
  followUpQuestion: "",

  symptoms: [] as string[],
  history: [] as string[],

  lastSymptoms: [] as string[],
  currentSymptoms: [] as string[],

  progress: ""

};

// ===========================
// Reset Memory
// ===========================

export function resetConversation() {

  conversationMemory.topic = "";
  conversationMemory.patient = "";
  conversationMemory.pregnancyMonths = "";
  conversationMemory.severity = "";
  conversationMemory.duration = "";

  conversationMemory.followUpQuestion = "";

  conversationMemory.currentSymptoms = [];

}

// ===========================
// Save Topic
// ===========================

export function rememberTopic(topic: string) {

  conversationMemory.topic = topic;

}

// ===========================
// Save Severity
// ===========================

export function rememberSeverity(level: string) {

  conversationMemory.severity = level;

}

// ===========================
// Save Duration
// ===========================

export function rememberDuration(duration: string) {

  conversationMemory.duration = duration;

}

// ===========================
// Save Follow-up
// ===========================

export function askNext(question: string) {

  conversationMemory.followUpQuestion = question;

}

// ===========================
// Save Symptoms (History)
// ===========================

export function rememberSymptoms(symptoms: string[]) {

  symptoms.forEach(symptom => {

    if (!conversationMemory.lastSymptoms.includes(symptom)) {

      conversationMemory.lastSymptoms.push(symptom);

    }

  });

}

// ===========================
// Save Current Consultation
// ===========================

export function rememberCurrentSymptoms(symptoms: string[]) {

  symptoms.forEach(symptom => {

    if (!conversationMemory.currentSymptoms.includes(symptom)) {

      conversationMemory.currentSymptoms.push(symptom);

    }

  });

}

// ===========================
// Previous Symptoms
// ===========================

export function previousSymptoms(): string[] {

  return conversationMemory.lastSymptoms;

}

// ===========================
// Current Symptoms
// ===========================

export function currentSymptoms(): string[] {

  return conversationMemory.currentSymptoms;

}

// ===========================
// Progress
// ===========================

export function rememberProgress(progress: string) {

  conversationMemory.progress = progress;

}