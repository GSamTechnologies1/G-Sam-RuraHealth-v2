import { useNavigate } from "react-router-dom";
import "./PharmacyDashboard.css";

export default function PharmacyDashboard() {
  const navigate = useNavigate();

  return (
    <div className="pharmacy-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="pharmacy-header">
        <div className="pharmacy-header-content">
          <div>
            <h1>💊 G-Sam RuraHealth</h1>

            <p>Pharmacy Dashboard</p>
          </div>

          <button
            className="pharmacy-back-btn"
            onClick={() => navigate("/staff-portal")}
          >
            ← Staff Portal
          </button>
        </div>
      </header>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="pharmacy-main">
        <h2 className="pharmacy-title">
          Prescription Management
        </h2>

        <p className="pharmacy-subtitle">
          Review and dispense patient prescriptions
        </p>

        {/* =====================================================
            STATISTICS
        ===================================================== */}

        <div className="pharmacy-stat-grid">
          {/* PENDING */}

          <div className="pharmacy-stat-card">
            <div className="pharmacy-stat-icon">
              📋
            </div>

            <div>
              <h3>Pending</h3>

              <h2>0</h2>
            </div>
          </div>

          {/* DISPENSED */}

          <div className="pharmacy-stat-card">
            <div className="pharmacy-stat-icon">
              💊
            </div>

            <div>
              <h3>Dispensed</h3>

              <h2>0</h2>
            </div>
          </div>

          {/* PATIENTS */}

          <div className="pharmacy-stat-card">
            <div className="pharmacy-stat-icon">
              👥
            </div>

            <div>
              <h3>Patients</h3>

              <h2>0</h2>
            </div>
          </div>

          {/* TODAY */}

          <div className="pharmacy-stat-card">
            <div className="pharmacy-stat-icon">
              📅
            </div>

            <div>
              <h3>Today</h3>

              <h2>0</h2>
            </div>
          </div>
        </div>

        {/* =====================================================
            SEARCH
        ===================================================== */}

        <section className="pharmacy-search-section">
          <h2>🔍 Search Prescription</h2>

          <input
            type="text"
            placeholder="Search by Patient ID, Name or Prescription ID"
            className="pharmacy-search-input"
          />
        </section>

        {/* =====================================================
            PRESCRIPTION QUEUE
        ===================================================== */}

        <section className="pharmacy-prescription-section">
          <div className="pharmacy-section-header">
            <div>
              <h2>📋 Prescription Queue</h2>

              <p>
                Prescriptions awaiting pharmacy processing
              </p>
            </div>
          </div>

          {/* =====================================================
              TABLE
          ===================================================== */}

          <div className="pharmacy-table-container">
            <table className="pharmacy-table">
              <thead>
                <tr>
                  <th>Prescription ID</th>

                  <th>Patient</th>

                  <th>Patient ID</th>

                  <th>Doctor</th>

                  <th>Medication</th>

                  <th>Date</th>

                  <th>Status</th>

                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td colSpan={8}>
                    <div className="pharmacy-empty">
                      <div className="pharmacy-empty-icon">
                        💊
                      </div>

                      <h3>No Prescriptions</h3>

                      <p>
                        There are currently no prescriptions
                        waiting for pharmacy processing.
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}