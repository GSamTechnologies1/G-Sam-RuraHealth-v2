import { useNavigate } from "react-router-dom";
import "./AntenatalCare.css";

type AntenatalAppointment = {
  id: string;
  date: string;
  time: string;
  facility: string;
  purpose: string;
  status: "Upcoming" | "Completed";
};

const appointments: AntenatalAppointment[] = [
  {
    id: "anc-001",
    date: "28 Aug 2026",
    time: "10:00 AM",
    facility: "Primary Health Centre",
    purpose: "Routine Antenatal Visit",
    status: "Upcoming",
  },
];

const warningSigns = [
  "Heavy vaginal bleeding",
  "Severe abdominal pain",
  "Severe headache or blurred vision",
  "Difficulty breathing",
  "Convulsions or loss of consciousness",
  "Reduced or no fetal movement",
  "Sudden swelling of the face or hands",
];

const antenatalTopics = [
  {
    icon: "🩺",
    title: "Routine Check-ups",
    description:
      "Attend scheduled antenatal visits so healthcare professionals can monitor your health and pregnancy.",
  },
  {
    icon: "💉",
    title: "Recommended Care",
    description:
      "Follow the advice of your healthcare provider regarding tests, vaccinations and prescribed supplements.",
  },
  {
    icon: "🥗",
    title: "Healthy Pregnancy",
    description:
      "Maintain a balanced diet, stay hydrated and follow appropriate guidance from your healthcare provider.",
  },
  {
    icon: "👶",
    title: "Baby Development",
    description:
      "Learn about pregnancy changes and important milestones as your pregnancy progresses.",
  },
];

export default function AntenatalCare() {
  const navigate = useNavigate();

  return (
    <div className="antenatal-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="antenatal-header">
        <div className="antenatal-header-content">
          <button
            type="button"
            className="antenatal-back-btn"
            onClick={() => navigate("/citizen-dashboard")}
            aria-label="Go back"
          >
            ←
          </button>

          <div>
            <h1>Antenatal Care</h1>
            <p>
              Pregnancy care, appointments and important maternal health
              information.
            </p>
          </div>
        </div>
      </header>

      <main className="antenatal-main">
        {/* =====================================================
            INTRODUCTION
        ===================================================== */}

        <section className="antenatal-intro">
          <div className="antenatal-intro-icon">🤰</div>

          <div>
            <h2>Your Pregnancy Care Journey</h2>

            <p>
              Antenatal care helps pregnant women receive appropriate
              healthcare throughout pregnancy and prepare for childbirth.
            </p>

            <button
              type="button"
              className="antenatal-primary-btn"
              onClick={() => navigate("/book-appointment")}
            >
              📅 Book Antenatal Appointment
            </button>
          </div>
        </section>

        {/* =====================================================
            PREGNANCY OVERVIEW
        ===================================================== */}

        <section className="antenatal-section">
          <div className="antenatal-section-heading">
            <div>
              <h2>Pregnancy Overview</h2>

              <p>
                Keep track of important information throughout your pregnancy.
              </p>
            </div>
          </div>

          <div className="antenatal-overview-grid">
            <article className="antenatal-overview-card">
              <span className="antenatal-overview-icon">🤰</span>

              <div>
                <small>Pregnancy Status</small>
                <strong>Active</strong>
              </div>
            </article>

            <article className="antenatal-overview-card">
              <span className="antenatal-overview-icon">📅</span>

              <div>
                <small>Next Appointment</small>
                <strong>28 Aug 2026</strong>
              </div>
            </article>

            <article className="antenatal-overview-card">
              <span className="antenatal-overview-icon">🏥</span>

              <div>
                <small>Care Facility</small>
                <strong>Not confirmed</strong>
              </div>
            </article>

            <article className="antenatal-overview-card">
              <span className="antenatal-overview-icon">📋</span>

              <div>
                <small>Visits Recorded</small>
                <strong>1</strong>
              </div>
            </article>
          </div>
        </section>

        {/* =====================================================
            APPOINTMENTS
        ===================================================== */}

        <section className="antenatal-section">
          <div className="antenatal-section-heading">
            <div>
              <h2>Antenatal Appointments</h2>

              <p>
                Upcoming and previous appointments related to your pregnancy.
              </p>
            </div>

            <span className="antenatal-count">
              {appointments.length}
            </span>
          </div>

          <div className="antenatal-appointments">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <article
                  className="antenatal-appointment-card"
                  key={appointment.id}
                >
                  <div className="appointment-date-box">
                    <span>📅</span>
                    <strong>{appointment.date}</strong>
                  </div>

                  <div className="appointment-info">
                    <div className="appointment-title-row">
                      <h3>{appointment.purpose}</h3>

                      <span
                        className={
                          appointment.status === "Upcoming"
                            ? "antenatal-status upcoming"
                            : "antenatal-status completed"
                        }
                      >
                        {appointment.status}
                      </span>
                    </div>

                    <p>🏥 {appointment.facility}</p>

                    <strong>🕐 {appointment.time}</strong>
                  </div>
                </article>
              ))
            ) : (
              <div className="antenatal-empty">
                <span>📅</span>

                <h3>No antenatal appointments</h3>

                <p>
                  Your antenatal appointments will appear here when recorded.
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/book-appointment")}
                >
                  Book Appointment
                </button>
              </div>
            )}
          </div>
        </section>

        {/* =====================================================
            ANTENATAL EDUCATION
        ===================================================== */}

        <section className="antenatal-section">
          <div className="antenatal-section-heading">
            <div>
              <h2>Pregnancy Care Information</h2>

              <p>
                Important areas to discuss with your healthcare provider.
              </p>
            </div>
          </div>

          <div className="antenatal-topic-grid">
            {antenatalTopics.map((topic) => (
              <article
                className="antenatal-topic-card"
                key={topic.title}
              >
                <div className="antenatal-topic-icon">
                  {topic.icon}
                </div>

                <div>
                  <h3>{topic.title}</h3>

                  <p>{topic.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =====================================================
            WARNING SIGNS
        ===================================================== */}

        <section className="antenatal-warning-section">
          <div className="antenatal-warning-header">
            <span>⚠️</span>

            <div>
              <h2>Important Warning Signs</h2>

              <p>
                Seek urgent medical attention if you experience serious or
                unusual symptoms during pregnancy.
              </p>
            </div>
          </div>

          <div className="antenatal-warning-list">
            {warningSigns.map((warning) => (
              <div
                className="antenatal-warning-item"
                key={warning}
              >
                <span>•</span>
                <strong>{warning}</strong>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="antenatal-emergency-btn"
            onClick={() => navigate("/emergency")}
          >
            🚨 Emergency / SOS
          </button>
        </section>

        {/* =====================================================
            HEALTHCARE FACILITY
        ===================================================== */}

        <section className="antenatal-facility-section">
          <div className="antenatal-facility-icon">🏥</div>

          <div>
            <h2>Find Antenatal Care</h2>

            <p>
              Locate healthcare facilities where you can seek maternal and
              antenatal care.
            </p>

            <button
              type="button"
              onClick={() => navigate("/health-centres")}
            >
              Find Health Centre →
            </button>
          </div>
        </section>

        {/* =====================================================
            INFORMATION NOTICE
        ===================================================== */}

        <section className="antenatal-notice">
          <span>🔐</span>

          <div>
            <h3>Important Health Information</h3>

            <p>
              This page provides general health education and appointment
              support. It does not replace professional medical assessment,
              diagnosis or treatment. Always follow the advice of your
              qualified healthcare provider.
            </p>
          </div>
        </section>
      </main>

      {/* =====================================================
          BOTTOM NAVIGATION
      ===================================================== */}

      <nav className="antenatal-bottom-nav">
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
          onClick={() => navigate("/profile")}
        >
          👤
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
}