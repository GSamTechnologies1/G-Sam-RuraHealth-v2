import {
  recordConsultation,
  recordDisease,
  recordEmergency,
  recordHighRisk,
  recordModerateRisk,
  recordLowRisk,
} from "./stats";

import { knowledge } from "../data/knowledge";

import {
  conversationMemory,
  rememberTopic,
  rememberSeverity,
  rememberDuration,
  rememberSymptoms,
  rememberCurrentSymptoms,
  previousSymptoms,
  currentSymptoms,
  askNext,
  resetConversation,
} from "./memory";

import {
  extractSymptoms,
  detectPatient,
  detectPregnancyMonths,
} from "./parser";

import { calculateRisk } from "./risk";

import { isEmergency } from "./emergency";

export function getBotReply(userInput: string): string {

  const input = userInput.toLowerCase().trim();

  // ==========================
  // Greeting
  // ==========================

  if (
    input === "hello" ||
    input === "hi" ||
    input === "hey" ||
    input === "good morning" ||
    input === "good afternoon" ||
    input === "good evening"
  ) {
    return randomReply([
      "👋 Hello! Welcome to G-Sam RuraHealth. How can I help you today?",
      "😊 Hi there! I'm Dr. RuraAI. Tell me how you're feeling today.",
      "🩺 Hello! I'm here to answer your health questions."
    ]);
  }

  // ==========================
  // Thanks
  // ==========================

  if (input.includes("thank")) {
    return "😊 You're welcome. Stay healthy.";
  }

  // ==========================
  // Bye
  // ==========================

  if (
    input.includes("bye") ||
    input.includes("goodbye")
  ) {
    resetConversation();
    return "👋 Goodbye. Stay safe and healthy.";
  }

  // ==========================
  // Patient Detection
  // ==========================

  const patient = detectPatient(input);

  if (patient) {
    conversationMemory.patient = patient;
  }

  // ==========================
  // Pregnancy
  // ==========================

  if (
    input.includes("pregnant") ||
    input.includes("pregnancy")
  ) {
    rememberTopic("pregnancy");
    return "🤰 I understand. How many months pregnant is she?";
  }

  const months = detectPregnancyMonths(input);

  if (
    months &&
    conversationMemory.topic === "pregnancy"
  ) {
    conversationMemory.pregnancyMonths = months;

    return `🤰 Thanks. At ${months} months of pregnancy, mild swelling and tiredness can occur. However, bleeding, severe headache, blurred vision or severe swelling requires immediate medical attention.`;
  }

  // ==========================
  // Extract Symptoms
  // ==========================

  const symptoms = extractSymptoms(input);

  const oldSymptoms = previousSymptoms();

  const activeSymptoms = currentSymptoms();

  const newSymptoms = symptoms.filter(
    symptom => !oldSymptoms.includes(symptom)
  );

   // ==========================
  // Save Consultation
  // ==========================

  if (symptoms.length > 0) {

    recordConsultation();

    rememberSymptoms(symptoms);

    rememberCurrentSymptoms(symptoms);

    rememberTopic(symptoms[0]);

    symptoms.forEach(symptom => {
      recordDisease(symptom);
    });

  }

  // ==========================
  // Emergency Detection
  // ==========================

  if (isEmergency(symptoms)) {

    recordEmergency();
    recordHighRisk();

    const item = knowledge.find(
      k => k.topic === symptoms[0]
    );

    let reply = "🚨 EMERGENCY WARNING\n\n";

    if (item) {
      reply += item.responses[0];
    }

    reply +=
      "\n\n⚠ Please go to the nearest hospital immediately.";

    reply +=
      "\n\nDo NOT wait for more chatbot advice.";

    return reply;
  }

  // ==========================
  // Severity
  // ==========================

  if (conversationMemory.followUpQuestion === "severity") {

    rememberSeverity(input);

    askNext("duration");

    return "⏳ How long have you had these symptoms? (Example: 2 days or 1 week)";
  }

  // ==========================
  // Duration
  // ==========================

  if (conversationMemory.followUpQuestion === "duration") {

    rememberDuration(input);

    const item = knowledge.find(
      k => k.topic === conversationMemory.topic
    );

    if (!item) {

      resetConversation();

      return "Please explain your symptoms again.";

    }

    askNext("moreSymptoms");

    return `${item.responses[0]}

Severity: ${conversationMemory.severity}

Duration: ${conversationMemory.duration}

🤔 Apart from the ${conversationMemory.topic}, do you have any other symptoms?

Examples:
• Vomiting
• Cough
• Headache

If not, simply type **No**.`;
  }

   // ==========================
  // More Symptoms
  // ==========================

  if (conversationMemory.followUpQuestion === "moreSymptoms") {

    if (
      input === "no" ||
      input === "none" ||
      input === "nope"
    ) {

      const risk = calculateRisk(
        currentSymptoms(),
        conversationMemory.severity,
        conversationMemory.duration
      );

      if (risk.level.includes("HIGH")) {

        recordHighRisk();

      } else if (risk.level.includes("MODERATE")) {

        recordModerateRisk();

      } else {

        recordLowRisk();

      }

      let reply = "🩺 Symptoms Recorded:\n\n";

      currentSymptoms().forEach(symptom => {

        reply += `• ${symptom}\n`;

      });

      reply += `\nSeverity: ${conversationMemory.severity}`;

      reply += `\nDuration: ${conversationMemory.duration}`;

      reply += `\n\n${risk.level}`;

      reply += `\n${risk.advice}`;

      resetConversation();

      return reply;
    }

    // User entered another symptom instead of "No"
    // Continue with normal symptom processing below.
  }

  // ==========================
  // Multiple Symptoms
  // ==========================

  if (symptoms.length > 1) {

    let reply = "";

    if (oldSymptoms.length > 0) {

      reply += "🧠 Earlier you mentioned:\n\n";

      oldSymptoms.forEach(symptom => {

        reply += `• ${symptom}\n`;

      });

      reply += "\n";

    }

    if (newSymptoms.length > 0) {

      reply += "🆕 You've now added:\n\n";

      newSymptoms.forEach(symptom => {

        reply += `• ${symptom}\n`;

      });

      reply += "\n";

    }

    reply += "🩺 These symptoms may be related.\n\n";

    const risk = calculateRisk(
      activeSymptoms,
      conversationMemory.severity,
      conversationMemory.duration
    );

    reply += `${risk.level}\n`;

    reply += risk.advice;

    return reply;

  }

  // ==========================
  // Single Symptom
  // ==========================

  if (symptoms.length === 1) {

    const item = knowledge.find(
      k => k.topic === symptoms[0]
    );

    if (!item) {

      return "Please explain your symptoms further.";

    }

    rememberTopic(symptoms[0]);

    askNext("severity");

    return `🩺 I understand you have ${item.topic}.

How severe is it?

• Mild
• Moderate
• Severe`;

  }

  // ==========================
  // Default
  // ==========================

  return "🤖 I understand your message, but I need a little more information. Please explain your symptoms in more detail.";

}

// ==========================
// Random Reply
// ==========================

function randomReply(replies: string[]): string {

  return replies[
    Math.floor(Math.random() * replies.length)
  ];

}