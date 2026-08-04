let totalConsultations = 0;

const diseaseStats: Record<string, number> = {};

export function recordConsultation() {
  totalConsultations++;
}

export function recordDisease(topic: string) {
  if (!diseaseStats[topic]) {
    diseaseStats[topic] = 0;
  }

  diseaseStats[topic]++;
}

export function getDashboard() {
  return {
    consultations: totalConsultations,
    diseases: diseaseStats
  };
}