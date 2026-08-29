import { useNavigate } from "react-router-dom";
import "./CitizenDashboard.css";

export default function CitizenDashboard() {
  const navigate = useNavigate();

  return (
    <div className="citizen-dashboard">

      {/* =========================
          HEADER
      ========================= */}
      <header className="citizen-header">
        <div className="citizen-header-content">

          <div>
            <h1>G-Sam RuraHealth</h1>
            <p>Citizen Health Portal</p>
          </div>

          <button
            className="citizen-profile-btn"
            onClick={() => navigate("/profile")}
          >
            👤
          </button>

        </div>
      </header>


      {/* =========================
          MAIN CONTENT
      ========================= */}
      <main className="citizen-main">

        {/* WELCOME */}
        <section className="citizen-welcome">

          <div>
            <p className="welcome-small">
              Welcome back 👋
            </p>

            <h2>
              Your Health, Your Community
            </h2>

            <p>
              Access healthcare services, health information
              and support from one place.
            </p>
          </div>

        </section>


        {/* =========================
            QUICK ACTIONS
        ========================= */}
        <section className="citizen-section">

          <h2>Quick Services</h2>

          <div className="citizen-service-grid">

            <button
              className="citizen-service-card"
              onClick={() => navigate("/book-appointment")}
            >
              <span>🩺</span>
              <strong>Book Appointment</strong>
              <small>See a healthcare professional</small>
            </button>


            <button
              className="citizen-service-card"
              onClick={() => navigate("/ai")}
            >
              <span>🤖</span>
              <strong>AI Health Assistant</strong>
              <small>Get health information</small>
            </button>


            <button
              className="citizen-service-card"
              onClick={() => navigate("/health-centres")}
            >
              <span>🏥</span>
              <strong>Find Health Centre</strong>
              <small>Locate healthcare services</small>
            </button>


            <button
              className="citizen-service-card emergency-card"
              onClick={() => navigate("/emergency")}
            >
              <span>🚨</span>
              <strong>Emergency / SOS</strong>
              <small>Get urgent assistance</small>
            </button>

          </div>

        </section>


        {/* =========================
            MY HEALTH
        ========================= */}
        <section className="citizen-section">

          <div className="citizen-section-heading">

            <div>
              <h2>My Health</h2>
              <p>Your personal health services</p>
            </div>

          </div>


          <div className="citizen-health-grid">

            <button 
  onClick={() => navigate("/health-records")} 
> 
  📋 
  <span>My Health Records</span> 
</button>

            <button
              onClick={() => navigate("/appointments")}
            >
              📅
              <span>My Appointments</span>
            </button>


            <button
              onClick={() => navigate("/referrals")}
            >
              🔄
              <span>My Referrals</span>
            </button>


            <button
              onClick={() => navigate("/profile")}
            >
              👤
              <span>My Profile</span>
            </button>

          </div>

        </section>


        {/* =========================
            MATERNAL & FAMILY HEALTH
        ========================= */}
        <section className="citizen-section">

          <h2>Maternal & Family Health</h2>

          <div className="citizen-feature-grid">

            <button
              onClick={() => navigate("/breastfeeding")}
            >
              <span>🤱</span>

              <div>
                <strong>
                  Exclusive Breastfeeding
                </strong>

                <p>
                  Daily guidance for the first six months.
                </p>
              </div>
            </button>


            <button
              onClick={() => navigate("/antenatal")}
            >
              <span>🤰</span>

              <div>
                <strong>
                  Antenatal Care
                </strong>

                <p>
                  Track appointments and maternal health reminders.
                </p>
              </div>
            </button>


            <button
              onClick={() => navigate("/child-health")}
            >
              <span>👶</span>

              <div>
                <strong>
                  Child Health
                </strong>

                <p>
                  Immunization and child health information.
                </p>
              </div>
            </button>

          </div>

        </section>


        {/* =========================
    HEALTH EDUCATION
========================= */}

<section className="citizen-section">

  <div className="citizen-section-heading">

    <div>
      <h2>Health Education</h2>
      <p>Learn. Prevent. Stay Healthy.</p>
    </div>

    <button
      onClick={() => navigate("/health-education")}
    >
      View All
    </button>

  </div>


  <div className="health-topic-grid">

    <button
      onClick={() => navigate("/health-education/breast-cancer")}
    >
      🎗️

      <strong>
        Breast Cancer Awareness
      </strong>

      <span>
        Know the warning signs.
      </span>

    </button>


    <button
      onClick={() => navigate("/immunization")}
    >
      💉

      <strong>
        Immunization
      </strong>

      <span>
        Protect yourself and your family.
      </span>

    </button>


    <button
      onClick={() => navigate("/health-education/kidney-health")}
    >
      🫘

      <strong>
        Kidney Health
      </strong>

      <span>
        Learn about kidney disease and prevention.
      </span>

    </button>


    <button
      onClick={() => navigate("/cardiac-arrest")}
    >
      ❤️

      <strong>
        Cardiac Arrest
      </strong>

      <span>
        Learn how to recognize and respond to cardiac arrest.
      </span>

    </button>

  </div>

</section>


        {/* =========================
    HEALTH SERVICES
========================= */}

<section className="citizen-section">

  <h2>More Services</h2>

  <div className="citizen-mini-grid">

    <button
      onClick={() => navigate("/medicine-availability")}
    >
      💊
      <span>Medicine Availability</span>
    </button>


    <button
      onClick={() => navigate("/laboratory")}
    >
      🧪
      <span>Laboratory</span>
    </button>


    <button
      onClick={() => navigate("/health-centres")}
    >
      📍
      <span>Health Centre Directory</span>
    </button>


    <button
      onClick={() => navigate("/notifications")}
    >
      🔔
      <span>Notifications</span>
    </button>

  </div>

</section>

      </main>

      {/* =========================
          BOTTOM NAVIGATION
      ========================= */}
      <nav className="citizen-bottom-nav">

        <button
          className="active"
          onClick={() => navigate("/citizen-dashboard")}
        >
          🏠
          <span>Home</span>
        </button>


        <button
          onClick={() => navigate("/health-education")}
        >
          ❤️
          <span>Health</span>
        </button>


        <button
          onClick={() => navigate("/health-centres")}
        >
          🏥
          <span>Services</span>
        </button>


        <button
          onClick={() => navigate("/notifications")}
        >
          🔔
          <span>Alerts</span>
        </button>


        <button
          onClick={() => navigate("/profile")}
        >
          👤
          <span>Profile</span>
        </button>

      </nav>

    </div>
  );
}