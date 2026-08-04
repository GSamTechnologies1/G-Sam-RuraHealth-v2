import { knowledge } from "../data/knowledge";

// =========================
// Extract Symptoms
// =========================

export function extractSymptoms(input: string): string[] {

  const text = input.toLowerCase();

  const symptoms: string[] = [];

  for (const item of knowledge) {

    const matched = item.keywords.some(keyword =>
      text.includes(keyword.toLowerCase())
    );

    if (matched && !symptoms.includes(item.topic)) {
      symptoms.push(item.topic);
    }

  }

  return symptoms;

}

// =========================
// Detect Duration
// =========================

export function detectDuration(input: string): string {

  const text = input.toLowerCase();

  const patterns = [
    /\b\d+\s*day[s]?\b/,
    /\b\d+\s*week[s]?\b/,
    /\b\d+\s*month[s]?\b/,
    /\b\d+\s*year[s]?\b/,
    /\btoday\b/,
    /\byesterday\b/
  ];

  for (const pattern of patterns) {

    const match = text.match(pattern);

    if (match) {
      return match[0];
    }

  }

  return "";

}

// =========================
// Detect Severity
// =========================

export function detectSeverity(input: string): string {

  const text = input.toLowerCase();

  if (
    text.includes("severe") ||
    text.includes("terrible") ||
    text.includes("worst") ||
    text.includes("unbearable")
  ) {
    return "severe";
  }

  if (
    text.includes("moderate") ||
    text.includes("average")
  ) {
    return "moderate";
  }

  if (
    text.includes("mild") ||
    text.includes("slight")
  ) {
    return "mild";
  }

  return "";

}

// =========================
// Detect Patient
// =========================

export function detectPatient(input: string): string {

  const text = input.toLowerCase();

  if (text.includes("my wife")) return "wife";
  if (text.includes("my husband")) return "husband";
  if (text.includes("my son")) return "son";
  if (text.includes("my daughter")) return "daughter";
  if (text.includes("my child")) return "child";

  if (
    text.includes("i am") ||
    text.includes("i'm") ||
    text.includes("i have")
  ) {
    return "self";
  }

  return "";

}

// =========================
// Detect Pregnancy Months
// =========================

export function detectPregnancyMonths(input: string): string {

  const text = input.toLowerCase();

  const match = text.match(/([1-9])\s*month/);

  if (match) {
    return match[1];
  }

  return "";

}

// =========================
// Detect Progress
// =========================

export function detectProgress(input: string): string {

  const text = input.toLowerCase();

  if (
    text.includes("better") ||
    text.includes("improving") ||
    text.includes("improved")
  ) {
    return "better";
  }

  if (
    text.includes("worse") ||
    text.includes("worsening") ||
    text.includes("getting worse")
  ) {
    return "worse";
  }

  if (
    text.includes("same") ||
    text.includes("still")
  ) {
    return "same";
  }

  return "";

}