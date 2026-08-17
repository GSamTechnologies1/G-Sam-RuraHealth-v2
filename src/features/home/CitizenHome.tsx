import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function CitizenHome() {
  const navigate = useNavigate();

  return (
    <div className="home">

      <header>
        <h1>🏥 G-Sam RuraHealth</h1>

        <h2>Akwa Ibom State Digital Health Platform</h2>

        <p>Citizen Services</p>
      </header>

      <div className="cards">

        <div
          className="card"
          onClick={() => navigate("/patient-registration")}
        >
          <h2>📝</h2>
          <h3>Register as a Patient</h3>
        </div>

        <div
          className="card"
          onClick={() => navigate("/patients")}
        >
          <h2>📋</h2>
          <h3>My Health Record</h3>
        </div>

        <div
          className="card"
          onClick={() => navigate("/ai")}
        >
          <h2>🤖</h2>
          <h3>AI Health Assistant</h3>
        </div>

        <div className="card">
          <h2>🩺</h2>
          <h3>Symptom Checker</h3>
        </div>

        <div className="card">
          <h2>🏥</h2>
          <h3>Find Nearby Clinics</h3>
        </div>

        <div className="card">
          <h2>🚑</h2>
          <h3>Emergency</h3>
        </div>

        <div className="card">
          <h2>💡</h2>
          <h3>Health Tips</h3>
        </div>

      </div>
    </div>
  );
}