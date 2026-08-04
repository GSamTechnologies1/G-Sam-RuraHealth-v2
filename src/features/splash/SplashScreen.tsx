import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SplashScreen.css";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/language");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className="logo-circle">
        🏥
      </div>

      <h1>G-Sam RuraHealth</h1>

      <p>Your Community Health Companion</p>

      <div className="loader"></div>
    </div>
  );
}