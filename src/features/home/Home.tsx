import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  return (

    <div className="home">

      <header>

        <h1>🏥 G-Sam RuraHealth</h1>

        <p>Welcome Back!</p>

      </header>

      <div className="cards">

        <div
          className="card"
          onClick={() => navigate("/ai")}
        >
          <h2>❤️</h2>
          <h3>AI Health Assistant</h3>
        </div>

        <div className="card">
          <h2>🩺</h2>
          <h3>Symptom Checker</h3>
        </div>

        <div className="card">
          <h2>🗓️</h2>
          <h3>Appointments</h3>
        </div>

        <div className="card">
          <h2>💊</h2>
          <h3>Medication</h3>
        </div>

        <div className="card">
          <h2>📍</h2>
          <h3>Nearby Clinics</h3>
        </div>

        <div className="card">
          <h2>🚑</h2>
          <h3>Emergency</h3>
        </div>

        <div className="card">
          <h2>🌍</h2>
          <h3>Health Tips</h3>
        </div>

        <div className="card">
          <h2>👤</h2>
          <h3>Profile</h3>
        </div>

        <div
  className="card"
  onClick={() => navigate("/patient-registration")}
>
  <h2>📝</h2>
  <h3>Patient Registration</h3>
</div>

<div
  className="card"
  onClick={() => navigate("/patients")}
>
  <h2>📋</h2>
  <h3>Patient Records</h3>
</div>

<div
  className="card"
  onClick={() => navigate("/book-appointment")}
>
  <h2>📅</h2>
  <h3>Book Appointment</h3>
</div>

      </div>

    </div>

  );

}