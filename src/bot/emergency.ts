export function isEmergency(symptoms: string[]): boolean {

  const emergencySymptoms = [

    "chest pain",

    "difficulty breathing",

    "stroke",

    "heavy bleeding",

    "unconscious"

  ];

  return symptoms.some(symptom =>
    emergencySymptoms.includes(symptom)
  );

}