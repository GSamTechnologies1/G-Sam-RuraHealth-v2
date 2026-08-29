import { useNavigate } from "react-router-dom";
import "./CardiacArrest.css";

type EmergencyStep = {
  id: string;
  title: string;
  description: string;
};

const emergencySteps: EmergencyStep[] = [
  {
    id: "step-001",
    title: "Check for responsiveness",
    description:
      "Tap the person gently and ask loudly if they are okay.",
  },
  {
    id: "step-002",
    title: "Call for emergency help",
    description:
      "If the person is unresponsive and not breathing normally, call emergency services immediately.",
  },
  {
    id: "step-003",
    title: "Begin CPR",
    description:
      "Start chest compressions if you are trained and continue until qualified help arrives.",
  },
  {
    id: "step-004",
    title: "Use an AED if available",
    description:
      "If an automated external defibrillator is available, switch it on and follow its instructions.",
  },
];

const warningSigns = [
  "Sudden collapse",
  "Unresponsiveness",
  "No normal breathing",
  "Gasping or abnormal breathing",
];

export default function CardiacArrest() {
  const navigate = useNavigate();

  return (
    <div className="cardiac-arrest-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="cardiac-arrest-header">

        <div className="cardiac-arrest-header-content">

          <button
            type="button"
            className="cardiac-arrest-back-btn"
            onClick={() => navigate(-1)}
          >
            ←
          </button>

          <div>
            <h1>Cardiac Arrest</h1>

            <p>
              Recognize the emergency and know what to do
              while waiting for professional help.
            </p>
          </div>

        </div>

      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="cardiac-arrest-main">


        {/* ===================================================
            EMERGENCY ALERT
        =================================================== */}

        <section className="cardiac-emergency-alert">

          <div className="cardiac-alert-icon">
            🚨
          </div>

          <div>

            <h2>
              Cardiac Arrest Is an Emergency
            </h2>

            <p>
              Cardiac arrest occurs when the heart suddenly
              stops pumping blood effectively. Immediate
              emergency action is critical.
            </p>

            <button
              type="button"
              onClick={() => navigate("/emergency")}
            >
              Open Emergency / SOS
            </button>

          </div>

        </section>


        {/* ===================================================
            WARNING SIGNS
        =================================================== */}

        <section className="cardiac-arrest-section">

          <div className="section-heading">

            <h2>
              Recognize the Signs
            </h2>

            <p>
              These signs require immediate emergency action.
            </p>

          </div>


          <div className="cardiac-warning-list">

            {warningSigns.map((sign) => (

              <article
                className="cardiac-warning-card"
                key={sign}
              >

                <span>
                  ⚠️
                </span>

                <p>
                  {sign}
                </p>

              </article>

            ))}

          </div>

        </section>


        {/* ===================================================
            WHAT TO DO
        =================================================== */}

        <section className="cardiac-arrest-section">

          <div className="section-heading">

            <h2>
              What to Do
            </h2>

            <p>
              Act quickly while waiting for emergency
              medical assistance.
            </p>

          </div>


          <div className="cardiac-steps-list">

            {emergencySteps.map((step, index) => (

              <article
                className="cardiac-step-card"
                key={step.id}
              >

                <div className="cardiac-step-number">
                  {index + 1}
                </div>

                <div>

                  <h3>
                    {step.title}
                  </h3>

                  <p>
                    {step.description}
                  </p>

                </div>

              </article>

            ))}

          </div>

        </section>


        {/* ===================================================
            CPR
        =================================================== */}

        <section className="cardiac-arrest-section">

          <div className="cardiac-cpr-card">

            <span className="cardiac-cpr-icon">
              ❤️
            </span>

            <div>

              <h2>
                CPR Can Help
              </h2>

              <p>
                If a person is unresponsive and not breathing
                normally, immediate CPR can help maintain blood
                circulation until professional medical help
                arrives.
              </p>

              <p>
                If you are not trained in CPR, follow the
                instructions provided by the emergency
                dispatcher.
              </p>

            </div>

          </div>

        </section>


        {/* ===================================================
            AED
        =================================================== */}

        <section className="cardiac-arrest-section">

          <div className="cardiac-aed-card">

            <span className="cardiac-aed-icon">
              ⚡
            </span>

            <div>

              <h2>
                Automated External Defibrillator
              </h2>

              <p>
                An AED can analyze the heart rhythm and may
                deliver a shock when appropriate. If an AED
                is available, turn it on and follow its
                instructions.
              </p>

            </div>

          </div>

        </section>


        {/* ===================================================
            IMPORTANT NOTICE
        =================================================== */}

        <section className="cardiac-arrest-notice">

          <span>
            ℹ️
          </span>

          <div>

            <h3>
              Important
            </h3>

            <p>
              This page provides general emergency information
              and does not replace professional emergency
              medical care or CPR training. In a suspected
              cardiac arrest, contact emergency services
              immediately.
            </p>

          </div>

        </section>


      </main>


      {/* =====================================================
          BOTTOM NAVIGATION
      ===================================================== */}

      <nav className="cardiac-arrest-bottom-nav">

        <button
          type="button"
          onClick={() =>
            navigate("/citizen-dashboard")
          }
        >
          🏠
          <span>
            Home
          </span>
        </button>


        <button
          type="button"
          className="active"
          onClick={() =>
            navigate("/health-education")
          }
        >
          ❤️
          <span>
            Health
          </span>
        </button>


        <button
          type="button"
          onClick={() =>
            navigate("/health-centres")
          }
        >
          🏥
          <span>
            Services
          </span>
        </button>


        <button
          type="button"
          onClick={() =>
            navigate("/emergency")
          }
        >
          🚨
          <span>
            Emergency
          </span>
        </button>


        <button
          type="button"
          onClick={() =>
            navigate("/profile")
          }
        >
          👤
          <span>
            Profile
          </span>
        </button>

      </nav>

    </div>
  );
}