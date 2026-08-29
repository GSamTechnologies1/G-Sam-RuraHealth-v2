import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Immunization.css";

type ImmunizationRecord = {
  id: string;
  vaccine: string;
  dose: string;
  date: string;
  status: "Completed" | "Due" | "Upcoming";
};

const immunizationRecords: ImmunizationRecord[] = [
  {
    id: "imm-001",
    vaccine: "BCG",
    dose: "Birth dose",
    date: "12 Aug 2026",
    status: "Completed",
  },
  {
    id: "imm-002",
    vaccine: "Polio",
    dose: "Dose 1",
    date: "12 Aug 2026",
    status: "Completed",
  },
  {
    id: "imm-003",
    vaccine: "PCV",
    dose: "Dose 2",
    date: "20 Sep 2026",
    status: "Upcoming",
  },
  {
    id: "imm-004",
    vaccine: "Measles",
    dose: "Routine dose",
    date: "Due according to schedule",
    status: "Due",
  },
];

const vaccineCategories = [
  "BCG",
  "Polio",
  "Pentavalent",
  "PCV",
  "Rotavirus",
  "Measles",
  "Yellow Fever",
  "Vitamin A",
];

export default function Immunization() {
  const navigate = useNavigate();

  const [selectedVaccine, setSelectedVaccine] = useState("All");

  const filteredRecords =
    selectedVaccine === "All"
      ? immunizationRecords
      : immunizationRecords.filter(
          (record) => record.vaccine === selectedVaccine
        );

  return (
    <div className="immunization-page">
      

      <header className="immunization-header">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ←
        </button>

        <div>
          <h1>Immunization</h1>
          <p>
            Keep track of vaccinations and important
            immunization information.
          </p>
        </div>
      </header>

      <main className="immunization-main">

        <section className="immunization-section">
          <div className="section-heading">
            <h2>Immunization Overview</h2>
            <p>View vaccination information and records.</p>
          </div>

          <div className="overview-grid">

            <article className="overview-card">
              <strong>
                {
                  immunizationRecords.filter(
                    (record) => record.status === "Completed"
                  ).length
                }
              </strong>
              <span>Completed</span>
            </article>

            <article className="overview-card">
              <strong>
                {
                  immunizationRecords.filter(
                    (record) => record.status === "Upcoming"
                  ).length
                }
              </strong>
              <span>Upcoming</span>
            </article>

            <article className="overview-card">
              <strong>
                {
                  immunizationRecords.filter(
                    (record) => record.status === "Due"
                  ).length
                }
              </strong>
              <span>Due</span>
            </article>

          </div>
        </section>

        <section className="immunization-section">

          <div className="section-heading">
            <h2>Vaccines & Child Health</h2>
            <p>Select a category to view relevant records.</p>
          </div>

          <div className="vaccine-filter">

            <button
              type="button"
              className={selectedVaccine === "All" ? "selected" : ""}
              onClick={() => setSelectedVaccine("All")}
            >
              All
            </button>

            {vaccineCategories.map((vaccine) => (
              <button
                type="button"
                key={vaccine}
                className={
                  selectedVaccine === vaccine ? "selected" : ""
                }
                onClick={() => setSelectedVaccine(vaccine)}
              >
                {vaccine}
              </button>
            ))}

          </div>
        </section>

        <section className="immunization-section">

          <div className="section-heading">
            <h2>Immunization Records</h2>
            <p>Your recorded vaccination information.</p>
          </div>

          <div className="records-list">

            {filteredRecords.map((record) => (
              <article
                className="immunization-card"
                key={record.id}
              >

                <div className="vaccine-icon">
                  💉
                </div>

                <div className="record-content">

                  <div className="record-title-row">
                    <h3>{record.vaccine}</h3>

                    <span
                      className={`status-badge ${record.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {record.status}
                    </span>
                  </div>

                  <p>
                    <strong>Dose:</strong> {record.dose}
                  </p>

                  <p>
                    <strong>Date:</strong> {record.date}
                  </p>

                </div>

              </article>
            ))}

          </div>
        </section>

        <section className="immunization-section">

          <div className="action-card">

            <span>🏥</span>

            <div>
              <h2>Find an Immunization Centre</h2>

              <p>
                Locate healthcare facilities that may provide
                immunization services.
              </p>

              <button
                type="button"
                onClick={() => navigate("/health-centres")}
              >
                Find Health Centres
              </button>
            </div>

          </div>

        </section>

        <section className="immunization-section">

          <div className="section-heading">
            <h2>Immunization Information</h2>
            <p>Learn more about vaccines and child health.</p>
          </div>

          <div className="education-grid">

            <article>
              <span>🛡️</span>
              <h3>Why Immunization Matters</h3>
              <p>
                Vaccination helps protect children and communities
                from preventable diseases.
              </p>
            </article>

            <article>
              <span>👶</span>
              <h3>For Parents & Caregivers</h3>
              <p>
                Keep immunization records safe and follow guidance
                from qualified healthcare workers.
              </p>
            </article>

            <article>
              <span>📅</span>
              <h3>Missed a Vaccination?</h3>
              <p>
                Speak with an authorized healthcare worker about
                the appropriate next step.
              </p>
            </article>

          </div>
        </section>

        <section className="immunization-notice">

          <span>ℹ️</span>

          <p>
            Immunization schedules and clinical decisions should
            be confirmed with an authorized healthcare professional
            and applicable public-health guidance.
          </p>

        </section>

      </main>

      <nav className="immunization-bottom-nav">

        <button
          type="button"
          onClick={() => navigate("/citizen-dashboard")}
        >
          🏠
          <span>Home</span>
        </button>

        <button
          type="button"
          className="active"
          onClick={() => navigate("/health-education")}
        >
          ❤️
          <span>Health</span>
        </button>

        <button
          type="button"
          onClick={() => navigate("/health-centres")}
        >
          🏥
          <span>Services</span>
        </button>

        <button
          type="button"
          onClick={() => navigate("/emergency")}
        >
          🚨
          <span>Emergency</span>
        </button>

        <button
          type="button"
          onClick={() => navigate("/citizen-dashboard")}
        >
          👤
          <span>Profile</span>
        </button>

      </nav>

    </div>
  );
}