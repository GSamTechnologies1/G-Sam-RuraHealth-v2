export const dashboardStats = {
  consultations: 0,
  emergencies: 0,
  highRisk: 0,
  moderateRisk: 0,
  lowRisk: 0
};

export const diseases: Record<string, number> = {};

// =========================
// Consultation
// =========================

export function recordConsultation() {
  dashboardStats.consultations++;
}

// =========================
// Disease
// =========================

export function recordDisease(disease: string) {
  diseases[disease] = (diseases[disease] || 0) + 1;
}

// =========================
// Emergency
// =========================

export function recordEmergency() {
  dashboardStats.emergencies++;
}

// =========================
// Risk Levels
// =========================

export function recordHighRisk() {
  dashboardStats.highRisk++;
}

export function recordModerateRisk() {
  dashboardStats.moderateRisk++;
}

export function recordLowRisk() {
  dashboardStats.lowRisk++;
}

// =========================
// Dashboard Data
// =========================

export function getDashboard() {
  return {
    consultations: dashboardStats.consultations,
    emergencies: dashboardStats.emergencies,
    highRisk: dashboardStats.highRisk,
    moderateRisk: dashboardStats.moderateRisk,
    lowRisk: dashboardStats.lowRisk,
    diseases
  };
}