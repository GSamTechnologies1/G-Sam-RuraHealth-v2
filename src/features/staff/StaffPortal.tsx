import "./StaffPortal.css";
import { useNavigate } from "react-router-dom";

export default function StaffPortal() {
  const navigate = useNavigate();

  return (
    <div className="staffPortalPage">
      <div className="staffPortalCard">

        {/* Header */}
        <div className="staffPortalHeader">
          <div className="staffIcon">
            🏥
          </div>

          <h1>G-Sam RuraHealth</h1>

          <p>Health Workers Portal</p>

          <span>
            Select your department to continue
          </span>
        </div>

        {/* Staff Roles */}
        <div className="staffRoles">

          {/* Receptionist */}
          <button
            className="staffRole receptionist"
            onClick={() =>
              navigate("/staff-login?role=receptionist")
            }
          >
            <span>🏥</span>

            <div>
              <strong>Receptionist</strong>
              <small>
                Patient registration & appointments
              </small>
            </div>
          </button>

          {/* Doctor */}
          <button
            className="staffRole doctor"
            onClick={() =>
              navigate("/staff-login?role=doctor")
            }
          >
            <span>🩺</span>

            <div>
              <strong>Doctor</strong>
              <small>
                Patient consultation & records
              </small>
            </div>
          </button>

          {/* Laboratory */}
          <button
            className="staffRole laboratory"
            onClick={() =>
              navigate("/staff-login?role=laboratory")
            }
          >
            <span>🧪</span>

            <div>
              <strong>Laboratory</strong>
              <small>
                Tests & laboratory records
              </small>
            </div>
          </button>

          {/* Pharmacy */}
          <button
            className="staffRole pharmacy"
            onClick={() =>
              navigate("/staff-login?role=pharmacy")
            }
          >
            <span>💊</span>

            <div>
              <strong>Pharmacy</strong>
              <small>
                Prescriptions & medication
              </small>
            </div>
          </button>

          {/* Administrator */}
          <button
            className="staffRole admin"
            onClick={() =>
              navigate("/staff-login?role=administrator")
            }
          >
            <span>⚙️</span>

            <div>
              <strong>Administrator</strong>
              <small>
                System management
              </small>
            </div>
          </button>

        </div>

        {/* Back */}
        <button
          className="backButton"
          onClick={() => navigate("/")}
        >
          ← Back to Landing Page
        </button>

      </div>
    </div>
  );
}