import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HealthRecords.css";

type HealthRecord = {
  id: string;
  date: string;
  facility: string;
  service: string;
  diagnosis: string;
  outcome: string;
  status: "Completed" | "Follow-up";
};

type LabResult = {
  id: string;
  test: string;
  result: string;
  date: string;
  facility: string;
};

type Medication = {
  id: string;
  name: string;
  dosage: string;
  status: "Active" | "Completed";
};

type Appointment = {
  id: string;
  facility: string;
  purpose: string;
  date: string;
  status: "Upcoming" | "Completed";
};

type Referral = {
  id: string;
  from: string;
  to: string;
  reason: string;
  status: "Pending" | "Completed";
};

/* =========================================================
   DEMO DATA
   ---------------------------------------------------------
   Temporary data for designing the page.
   Later, this will come from Firebase.
========================================================= */

const healthRecords: HealthRecord[] = [
  {
    id: "visit-001",
    date: "12 Aug 2026",
    facility: "General Hospital, Ikot Abasi",
    service: "Medical Consultation",
    diagnosis: "Malaria",
    outcome: "Medication prescribed",
    status: "Completed",
  },
  {
    id: "visit-002",
    date: "03 Aug 2026",
    facility: "Ikot Akan Primary Health Centre",
    service: "Routine Health Visit",
    diagnosis: "No major condition detected",
    outcome: "Routine follow-up recommended",
    status: "Follow-up",
  },
];

const labResults: LabResult[] = [
  {
    id: "lab-001",
    test: "Malaria Test",
    result: "Negative",
    date: "12 Aug 2026",
    facility: "General Hospital, Ikot Abasi",
  },
  {
    id: "lab-002",
    test: "Packed Cell Volume (PCV)",
    result: "38%",
    date: "12 Aug 2026",
    facility: "General Hospital, Ikot Abasi",
  },
];

const medications: Medication[] = [
  {
    id: "med-001",
    name: "Prescribed Medication",
    dosage: "As directed by clinician",
    status: "Active",
  },
];

const appointments: Appointment[] = [
  {
    id: "appointment-001",
    facility: "Ikot Akan Primary Health Centre",
    purpose: "Routine follow-up",
    date: "31 Aug 2026",
    status: "Upcoming",
  },
];

const referrals: Referral[] = [
  {
    id: "referral-001",
    from: "General Hospital, Uyo",
    to: "University of Uyo Teaching Hospital",
    reason: "Further clinical evaluation",
    status: "Pending",
  },
];

/* =========================================================
   HEALTH RECORDS PAGE
========================================================= */

export default function HealthRecords() {
  const navigate = useNavigate();

  const [selectedRecord, setSelectedRecord] =
    useState<HealthRecord | null>(null);

const [selectedLab, setSelectedLab] =
 useState<LabResult | null>(null);

  return (
    <div className="health-records-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="health-records-header">

        <button
          type="button"
          className="health-records-back-btn"
          onClick={() => navigate("/citizen-dashboard")}
          aria-label="Go back"
        >
          ←
        </button>

        <div>
          <h1>My Health Records</h1>

          <p>
            Your personal history of healthcare visits,
            tests, treatments and follow-up care.
          </p>
        </div>

      </header>

      <main className="health-records-main">

        {/* ===================================================
            HEALTH OVERVIEW
        =================================================== */}

        <section className="health-records-section">

          <div className="section-heading">
            <div>
              <h2>Health Overview</h2>

              <p>
                Important health information available
                for your care.
              </p>
            </div>
          </div>

          <div className="health-overview-grid">

            <article className="health-overview-card">
              <span className="overview-icon">🩸</span>

              <div>
                <small>Blood Group</small>
                <strong>Not provided</strong>
              </div>
            </article>

            <article className="health-overview-card">
              <span className="overview-icon">🧬</span>

              <div>
                <small>Genotype</small>
                <strong>Not provided</strong>
              </div>
            </article>

            <article className="health-overview-card">
              <span className="overview-icon">⚠️</span>

              <div>
                <small>Allergies</small>
                <strong>None recorded</strong>
              </div>
            </article>

            <article className="health-overview-card">
              <span className="overview-icon">💊</span>

              <div>
                <small>Current Medication</small>

                <strong>
                  {
                    medications.filter(
                      (medication) =>
                        medication.status === "Active"
                    ).length
                  }
                </strong>
              </div>
            </article>

          </div>

        </section>

        {/* ===================================================
            RECENT HEALTH ACTIVITY
        =================================================== */}

        <section className="health-records-section">

          <div className="section-heading">

            <div>
              <h2>Recent Health Activity</h2>

              <p>
                Your latest healthcare encounters.
              </p>
            </div>

            <span className="record-count">
              {healthRecords.length}
            </span>

          </div>

          <div className="health-timeline">

            {healthRecords.length > 0 ? (
  healthRecords.map((record) => (
  <button
    type="button"
    className="health-record-card"
    key={record.id}
    onClick={() => setSelectedRecord(record)}
  >
    <div className="record-date">
      <span>📅</span>
      <strong>{record.date}</strong>
    </div>

    <div className="record-main">

      <div className="record-title-row">

        <h3>
          {record.service}
        </h3>

        <span
          className={
            record.status === "Completed"
              ? "status-badge completed"
              : "status-badge follow-up"
          }
        >
          {record.status}
        </span>

      </div>

      <p className="record-facility">
        🏥 {record.facility}
      </p>

      <div className="record-details">

        <div>
          <small>Diagnosis</small>

          <strong>
            {record.diagnosis}
          </strong>
        </div>

        <div>
          <small>Outcome</small>

          <strong>
            {record.outcome}
          </strong>
        </div>

      </div>

      <span className="record-view-link">
        View full details →
      </span>

    </div>
  </button>
))

            ) : (

              <div className="empty-state">

                <span>📋</span>

                <h3>No health records yet</h3>

                <p>
                  Your healthcare visits, diagnoses,
                  laboratory results and treatments will
                  appear here when recorded by an
                  authorized healthcare provider.
                </p>

              </div>

            )}

          </div>

        </section>

        {/* ===================================================
            LABORATORY RESULTS
        =================================================== */}

        <section className="health-records-section">
  <div className="section-heading">
    <div>
      <h2>Laboratory Results</h2>
      <p>
        Tests and results recorded during your healthcare visits.
      </p>
    </div>

    <span className="section-count">
      {labResults.length}
    </span>
  </div>

  {labResults.length > 0 ? (

    <div className="lab-results-list">

      {labResults.map((lab: LabResult) => (

        <button
          type="button"
          className="lab-result-card"
          key={lab.id}
          onClick={() => setSelectedLab(lab)}
        >

          <div className="lab-icon">
            🧪
          </div>

          <div className="lab-content">

            <div className="lab-title-row">
              <h3>{lab.test}</h3>

              <span className="lab-view">
                View →
              </span>
            </div>

            <strong className="lab-result-value">
              {lab.result}
            </strong>

            <p>
              🏥 {lab.facility}
            </p>

            <small>
              📅 {lab.date}
            </small>

          </div>

        </button>

      ))}

    </div>

  ) : (

    <div className="empty-state">
      <span>🧪</span>

      <h3>No laboratory results</h3>

      <p>
        Laboratory tests and results recorded by
        authorized healthcare providers will appear here.
      </p>
    </div>

  )}

</section>

        {/* ===================================================
    MEDICATIONS
=================================================== */}

<section className="health-records-section">

  <div className="section-heading">

    <div>
      <h2>Medications</h2>

      <p>
        Medicines prescribed during your healthcare visits.
      </p>
    </div>

    <span className="section-count">
      {medications.length}
    </span>

  </div>

  {medications.length > 0 ? (

    <div className="medications-list">

      {medications.map((medication) => (

        <article
          className="medication-card"
          key={medication.id}
        >

          <div className="medication-icon">
            💊
          </div>

          <div className="medication-content">

            <div className="medication-title-row">

              <h3>
                {medication.name}
              </h3>

              <span
                className={
                  medication.status === "Active"
                    ? "status-badge active"
                    : "status-badge completed"
                }
              >
                {medication.status}
              </span>

            </div>

            <div className="medication-details">

              <div>

                <small>
                  Dosage / Instructions
                </small>

                <strong>
                  {medication.dosage}
                </strong>

              </div>

              <div>

                <small>
                  Status
                </small>

                <strong>
                  {medication.status}
                </strong>

              </div>

            </div>

            <p className="medication-notice">

              🔐 Medication information is recorded by
              authorized healthcare providers. Do not
              change your prescribed dosage without
              appropriate clinical guidance.

            </p>

          </div>

        </article>

      ))}

    </div>

  ) : (

    <div className="empty-state compact">

      <span>
        💊
      </span>

      <h3>
        No medications recorded
      </h3>

      <p>
        Medicines prescribed by authorized healthcare
        providers will appear here.
      </p>

    </div>

  )}

</section>

        {/* ===================================================
    APPOINTMENTS & FOLLOW-UP
=================================================== */}

<section className="health-records-section">

  <div className="section-heading">

    <div>

      <h2>
        Appointments & Follow-up
      </h2>

      <p>
        Your upcoming and previous healthcare appointments.
      </p>

    </div>

    <span className="section-count">
      {appointments.length}
    </span>

  </div>

  {appointments.length > 0 ? (

    <div className="appointments-list">

      {appointments.map((appointment) => (

        <article
          className="appointment-card"
          key={appointment.id}
        >

          <div className="appointment-icon">
            📅
          </div>

          <div className="appointment-content">

            <div className="appointment-title-row">

              <div>

                <h3>
                  {appointment.purpose}
                </h3>

                <p>
                  🏥 {appointment.facility}
                </p>

              </div>

              <span
                className={
                  appointment.status === "Upcoming"
                    ? "status-badge upcoming"
                    : "status-badge completed"
                }
              >
                {appointment.status}
              </span>

            </div>

            <div className="appointment-details">

              <div>

                <small>
                  Appointment Date
                </small>

                <strong>
                  {appointment.date}
                </strong>

              </div>

              <div>

                <small>
                  Healthcare Facility
                </small>

                <strong>
                  {appointment.facility}
                </strong>

              </div>

            </div>

            {appointment.status === "Upcoming" && (

              <p className="appointment-notice">

                📌 Please arrive at the healthcare facility
                on time and follow the instructions provided
                by the facility.

              </p>

            )}

          </div>

        </article>

      ))}

    </div>

  ) : (

    <div className="empty-state">

      <span>
        📅
      </span>

      <h3>
        No appointments yet
      </h3>

      <p>
        Your appointment requests and confirmed
        appointments will appear here.
      </p>

      <button
        type="button"
        className="empty-state-action"
        onClick={() => navigate("/appointments")}
      >
        Book an Appointment
      </button>

    </div>

  )}

</section>

        {/* ===================================================
    REFERRALS
=================================================== */}

<section className="health-records-section">

  <div className="section-heading">

    <div>

      <h2>
        Referrals
      </h2>

      <p>
        Referrals between authorized healthcare providers.
      </p>

    </div>

    <span className="section-count">
      {referrals.length}
    </span>

  </div>

  {referrals.length > 0 ? (

    <div className="referrals-list">

      {referrals.map((referral) => (

        <article
          className="referral-card"
          key={referral.id}
        >

          <div className="referral-icon">
            🔄
          </div>

          <div className="referral-content">

            <div className="referral-title-row">

              <div>

                <h3>
                  {referral.reason}
                </h3>

                <p>
                  Healthcare Referral
                </p>

              </div>

              <span
                className={
                  referral.status === "Pending"
                    ? "status-badge pending"
                    : "status-badge completed"
                }
              >
                {referral.status}
              </span>

            </div>

            <div className="referral-details">

              <div>

                <small>
                  Referred From
                </small>

                <strong>
                  {referral.from}
                </strong>

              </div>

              <div>

                <small>
                  Referred To
                </small>

                <strong>
                  {referral.to}
                </strong>

              </div>

            </div>

            <p className="referral-notice">

              🔐 Referral information is created and
              updated by authorized healthcare providers.
              Citizens cannot modify clinical referral
              information.

            </p>

          </div>

        </article>

      ))}

    </div>

  ) : (

    <div className="empty-state">

      <span>
        🔄
      </span>

      <h3>
        No referrals yet
      </h3>

      <p>
        Referrals made by authorized healthcare providers
        will appear here when required.
      </p>

    </div>

  )}

</section>

        {/* ===================================================
            INFORMATION NOTICE
        =================================================== */}

        <section className="health-records-notice">

          <span>🔐</span>

          <div>

            <h3>Your health information</h3>

            <p>
              Health records are private information.
              Only authorized healthcare providers and
              the citizen, subject to applicable access
              controls, should be able to view or update
              clinical records.
            </p>

          </div>

        </section>

        {selectedRecord && (
  <div
    className="health-record-modal-overlay"
    onClick={() => setSelectedRecord(null)}
  >

    <section
      className="health-record-modal"
      onClick={(event) =>
        event.stopPropagation()
      }
    >

      <div className="health-record-modal-header">

        <div>
          <span className="modal-icon">
            🏥
          </span>

          <div>
            <h2>
              Health Visit Details
            </h2>

            <p>
              {selectedRecord.service}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="modal-close-btn"
          onClick={() =>
            setSelectedRecord(null)
          }
          aria-label="Close"
        >
          ×
        </button>

      </div>


      <div className="health-record-modal-body">

        <div className="modal-status-row">

          <span>
            Status
          </span>

          <strong
            className={
              selectedRecord.status === "Completed"
                ? "status-badge completed"
                : "status-badge follow-up"
            }
          >
            {selectedRecord.status}
          </strong>

        </div>


        <div className="modal-detail-card">

          <small>
            Date
          </small>

          <strong>
            {selectedRecord.date}
          </strong>

        </div>


        <div className="modal-detail-card">

          <small>
            Healthcare Facility
          </small>

          <strong>
            {selectedRecord.facility}
          </strong>

        </div>


        <div className="modal-detail-card">

          <small>
            Service
          </small>

          <strong>
            {selectedRecord.service}
          </strong>

        </div>


        <div className="modal-detail-card">

          <small>
            Diagnosis
          </small>

          <strong>
            {selectedRecord.diagnosis}
          </strong>

        </div>


        <div className="modal-detail-card">

          <small>
            Outcome
          </small>

          <strong>
            {selectedRecord.outcome}
          </strong>

        </div>


        <div className="modal-information">

          <span>
            🔐
          </span>

          <p>
            This information is intended for
            the citizen and authorized healthcare
            providers. Clinical records should be
            updated only through authorized
            healthcare workflows.
          </p>

        </div>

      </div>


      <div className="health-record-modal-footer">

        <button
          type="button"
          onClick={() =>
            setSelectedRecord(null)
          }
        >
          Close
        </button>

      </div>

    </section>

  </div>
)}

      </main>

     {/* =====================================================
    LABORATORY RESULT MODAL
===================================================== */}

{selectedLab && (
  <div
    className="modal-overlay"
    onClick={() => setSelectedLab(null)}
  >

    <div
      className="health-modal"
      onClick={(event) => event.stopPropagation()}
    >

      <div className="modal-header">

        <div className="modal-title">

          <span className="modal-icon">
            🧪
          </span>

          <div>
            <h2>Laboratory Result</h2>
           <p>{selectedLab.test}</p>
          </div>

        </div>

        <button
          type="button"
          className="modal-close"
          onClick={() => setSelectedLab(null)}
        >
          ✕
        </button>

      </div>


      <div className="modal-body">

        <div className="detail-box">
          <small>Test</small>
          {selectedLab.test}
        </div>

        <div className="detail-box">
          <small>Result</small>
          <strong>{selectedLab.result}</strong>
        </div>

        <div className="detail-box">
          <small>Date</small>
          <strong>{selectedLab.date}</strong>
        </div>

        <div className="detail-box">
          <small>Healthcare Facility</small>
          <strong>{selectedLab.facility}</strong>
        </div>

        <div className="information-note">
          🔐 This result is provided for the citizen's
          personal health information and should only be
          updated through an authorized healthcare workflow.
        </div>

      </div>


      <button
        type="button"
        className="modal-action"
        onClick={() => setSelectedLab(null)}
      >
        Close
      </button>

    </div>

  </div>
)}

</div>
);
}