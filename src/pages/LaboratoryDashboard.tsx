import { useNavigate } from "react-router-dom";
import "./LaboratoryDashboard.css";

export default function LaboratoryDashboard() {
  const navigate = useNavigate();

  return (
    <div className="laboratory-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="laboratory-header">
        <div className="laboratory-header-content">

          <div>
            <h1>🧪 G-Sam RuraHealth</h1>

            <p>Laboratory Dashboard</p>
          </div>

          <button
            className="laboratory-back-btn"
            onClick={() => navigate("/staff-portal")}
          >
            ← Staff Portal
          </button>

        </div>
      </header>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="laboratory-main">

        <h2 className="laboratory-title">
          Laboratory Management
        </h2>

        <p className="laboratory-subtitle">
          Review laboratory requests and record investigation
          findings
        </p>


        {/* =====================================================
            STATISTICS
        ===================================================== */}

        <div className="laboratory-stat-grid">

          {/* PENDING */}

          <div className="laboratory-stat-card">

            <div className="laboratory-stat-icon">
              📋
            </div>

            <div>
              <h3>Pending</h3>

              <h2>0</h2>
            </div>

          </div>


          {/* PROCESSING */}

          <div className="laboratory-stat-card">

            <div className="laboratory-stat-icon">
              🔬
            </div>

            <div>
              <h3>Processing</h3>

              <h2>0</h2>
            </div>

          </div>


          {/* COMPLETED */}

          <div className="laboratory-stat-card">

            <div className="laboratory-stat-icon">
              ✅
            </div>

            <div>
              <h3>Completed</h3>

              <h2>0</h2>
            </div>

          </div>


          {/* TODAY */}

          <div className="laboratory-stat-card">

            <div className="laboratory-stat-icon">
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

        <section className="laboratory-search-section">

          <h2>
            🔍 Search Laboratory Request
          </h2>

          <input
            type="text"
            placeholder="Search by Patient ID, Name or Laboratory Request ID"
            className="laboratory-search-input"
          />

        </section>


        {/* =====================================================
            LABORATORY REQUEST QUEUE
        ===================================================== */}

        <section className="laboratory-request-section">

          <div className="laboratory-section-header">

            <div>

              <h2>
                🧪 Laboratory Request Queue
              </h2>

              <p>
                Laboratory investigations awaiting processing
              </p>

            </div>

          </div>


          {/* =================================================
              TABLE
          ================================================= */}

          <div className="laboratory-table-container">

            <table className="laboratory-table">

              <thead>

                <tr>

                  <th>
                    Request ID
                  </th>

                  <th>
                    Patient
                  </th>

                  <th>
                    Patient ID
                  </th>

                  <th>
                    Doctor
                  </th>

                  <th>
                    Investigation
                  </th>

                  <th>
                    Date
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                <tr>

                  <td colSpan={8}>

                    <div className="laboratory-empty">

                      <div className="laboratory-empty-icon">
                        🧪
                      </div>

                      <h3>
                        No Laboratory Requests
                      </h3>

                      <p>
                        There are currently no laboratory
                        investigations waiting for processing.
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