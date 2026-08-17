import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      <header>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1>🏥 G-Sam RuraHealth</h1>

            <h2>Akwa Ibom State Digital Health Platform</h2>

            <p>Connecting Every Citizen to Quality Healthcare</p>
          </div>

          <button
            style={{
              padding: "10px 18px",
              borderRadius: "10px",
              border: "none",
              background: "#0B8457",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={() => navigate("/language")}
          >
            🌐 Language
          </button>
        </div>

      </header>

      <div className="cards">

        <div
          className="card"
          onClick={() => navigate("/register")}
        >
          <h2>👨</h2>

          <h3>Citizens Portal</h3>

          <p>
            Register, Book Appointment,
            Access AI Health Assistant,
            View Your Health Records
          </p>
        </div>

        <div
          className="card"
          onClick={() => navigate("/staff-portal")}
        >
          <h2>👨‍⚕️</h2>

          <h3>Health Workers Portal</h3>

          <p>
            Receptionist • Doctor • Laboratory • Pharmacy • Admin
          </p>
        </div>

      </div>

    </div>
  );
}