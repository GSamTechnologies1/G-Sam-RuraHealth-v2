export interface RiskResult {
  level: string;
  advice: string;
}

export function calculateRisk(
  symptoms: string[],
  severity: string,
  duration: string
): RiskResult {

  // ==========================
  // EMERGENCY CONDITIONS
  // ==========================

  const emergencySymptoms = [
    "chest pain",
    "difficulty breathing",
    "stroke",
    "heavy bleeding",
    "unconscious"
  ];

  if (
    symptoms.some(symptom =>
      emergencySymptoms.includes(symptom)
    )
  ) {
    return {
      level: "🚨 MEDICAL EMERGENCY",
      advice:
        "Please go to the nearest emergency department immediately or call emergency medical services."
    };
  }

  // ==========================
  // HIGH RISK
  // ==========================

  if (severity === "severe") {
    return {
      level: "🔴 HIGH RISK",
      advice:
        "Because your symptoms are severe, please seek urgent medical attention today."
    };
  }

  // ==========================
  // MODERATE RISK
  // ==========================

  if (symptoms.length >= 3) {
    return {
      level: "🟡 MODERATE RISK",
      advice:
        "Multiple symptoms may indicate an underlying illness. Please schedule a medical evaluation."
    };
  }

  if (symptoms.includes("fever")) {

    const days = parseInt(duration);

    if (!isNaN(days) && days >= 3) {

      return {
        level: "🟡 MODERATE RISK",
        advice:
          "A fever lasting 3 days or more should be evaluated by a healthcare professional."
      };

    }

  }

  if (
    symptoms.includes("vomiting") &&
    duration.includes("day")
  ) {

    const days = parseInt(duration);

    if (!isNaN(days) && days >= 2) {

      return {
        level: "🟡 MODERATE RISK",
        advice:
          "Persistent vomiting may cause dehydration. Please visit a healthcare provider."
      };

    }

  }

  if (
    symptoms.includes("diarrhea") &&
    duration.includes("day")
  ) {

    const days = parseInt(duration);

    if (!isNaN(days) && days >= 2) {

      return {
        level: "🟡 MODERATE RISK",
        advice:
          "Persistent diarrhea can cause dehydration. Please seek medical care."
      };

    }

  }

  // ==========================
  // LOW RISK
  // ==========================

  return {

    level: "🟢 LOW RISK",

    advice:
      "Continue monitoring your symptoms, drink enough water, rest well, and seek medical attention if symptoms worsen."

  };

}