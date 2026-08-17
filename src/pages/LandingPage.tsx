import "./LandingPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import sky from "../assets/sky.png";
import monument from "../assets/monument.png";
import hospital from "../assets/hospital.png";
import stateLogoAndArise from "../assets/state-logo-and-arise.png";
import waveBottom from "../assets/wave-bottom.png";

const languages = [
  "🇬🇧 English",
  "🇳🇬 Ibibio",
  "🇳🇬 Igbo",
  "🇳🇬 Yoruba",
  "🇳🇬 Hausa",
  "🇫🇷 French",
  "🇨🇳 Mandarin",
  "العربية (Arabic)",
];

const translations: Record<
  string,
  {
    platform: string;
    citizen: string;
    healthcare: string;
    citizensPortal: string;
    staffPortal: string;
    getStarted: string;
    staffLogin: string;
  }
> = {
  "🇬🇧 English": {
    platform: "Akwa Ibom State Digital Health Platform",
    citizen: "Healthcare for Every Citizen",
    healthcare: "Healthcare for Every Citizen",
    citizensPortal: "CITIZENS PORTAL",
    staffPortal: "STAFF PORTAL",
    getStarted: "Get Started",
    staffLogin: "Staff Login",
  },

  "🇳🇬 Ibibio": {
    platform: "Akwa Ibom State Digital Health Platform",
    citizen: "Udo ke ukot emi kiet kiet",
    healthcare: "Udo ke ukot emi kiet kiet",
    citizensPortal: "CITIZENS PORTAL",
    staffPortal: "STAFF PORTAL",
    getStarted: "Bẹrẹ",
    staffLogin: "Staff Login",
  },

  "🇳🇬 Igbo": {
    platform: "Akwa Ibom State Digital Health Platform",
    citizen: "Ahụike maka nwa amaala ọ bụla",
    healthcare: "Ahụike maka nwa amaala ọ bụla",
    citizensPortal: "CITIZENS PORTAL",
    staffPortal: "STAFF PORTAL",
    getStarted: "Malite",
    staffLogin: "Staff Login",
  },

  "🇳🇬 Yoruba": {
    platform: "Akwa Ibom State Digital Health Platform",
    citizen: "Ilera fun gbogbo ara ilu",
    healthcare: "Ilera fun gbogbo ara ilu",
    citizensPortal: "CITIZENS PORTAL",
    staffPortal: "STAFF PORTAL",
    getStarted: "Bẹrẹ",
    staffLogin: "Staff Login",
  },

  "🇳🇬 Hausa": {
    platform: "Akwa Ibom State Digital Health Platform",
    citizen: "Lafiya ga kowane ɗan ƙasa",
    healthcare: "Lafiya ga kowane ɗan ƙasa",
    citizensPortal: "CITIZENS PORTAL",
    staffPortal: "STAFF PORTAL",
    getStarted: "Fara",
    staffLogin: "Staff Login",
  },

  "🇫🇷 French": {
    platform: "Plateforme numérique de santé de l'État d'Akwa Ibom",
    citizen: "Des soins de santé pour chaque citoyen",
    healthcare: "Des soins de santé pour chaque citoyen",
    citizensPortal: "PORTAIL CITOYENS",
    staffPortal: "PORTAIL DU PERSONNEL",
    getStarted: "Commencer",
    staffLogin: "Connexion du personnel",
  },

  "🇨🇳 Mandarin": {
    platform: "阿夸伊博姆州数字健康平台",
    citizen: "为每一位公民提供医疗服务",
    healthcare: "为每一位公民提供医疗服务",
    citizensPortal: "公民门户",
    staffPortal: "工作人员门户",
    getStarted: "开始",
    staffLogin: "工作人员登录",
  },

  "العربية (Arabic)": {
    platform: "منصة أكوا إيبوم الصحية الرقمية",
    citizen: "رعاية صحية لكل مواطن",
    healthcare: "رعاية صحية لكل مواطن",
    citizensPortal: "بوابة المواطنين",
    staffPortal: "بوابة الموظفين",
    getStarted: "ابدأ",
    staffLogin: "دخول الموظفين",
  },
};

export default function LandingPage() {
  const navigate = useNavigate();

  const [languageOpen, setLanguageOpen] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("language") || "🇬🇧 English"
  );

  const currentText =
    translations[selectedLanguage] || translations["🇬🇧 English"];

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    localStorage.setItem("language", language);
    setLanguageOpen(false);
  };

  return (
    <main className="landingPage">

      {/* ===============================
          SKY / BACKGROUND
      =============================== */}
      <img
        src={sky}
        alt=""
        className="skyLayer"
      />

      {/* ===============================
          MAIN SCENE
      =============================== */}
      <section className="heroScene">

        {/* GOVERNMENT + ARISE LOGOS */}
        <img
          src={stateLogoAndArise}
          alt="Akwa Ibom State Government and ARISE Akwa Ibom"
          className="stateLogos"
        />

        {/* ===============================
            LANGUAGE BUTTON
        =============================== */}
        <div className="languageWrapper">

          <button
            type="button"
            className="languageBtn"
            onClick={() => setLanguageOpen(!languageOpen)}
          >
            🌐 {selectedLanguage.replace(/^.*? /, "")}

            <span className="languageArrow">
              {languageOpen ? "▲" : "▼"}
            </span>
          </button>

          {languageOpen && (
            <div className="languageDropdown">

              {languages.map((language) => (
                <button
                  key={language}
                  type="button"
                  className={
                    selectedLanguage === language
                      ? "languageItem active"
                      : "languageItem"
                  }
                  onClick={() => handleLanguageSelect(language)}
                >
                  <span>{language}</span>

                  {selectedLanguage === language && (
                    <span className="languageCheck">
                      ✓
                    </span>
                  )}
                </button>
              ))}

            </div>
          )}

        </div>

        {/* ===============================
            MAIN TITLE
        =============================== */}
        <div className="heroText">

          <h1>
            G-Sam RuraHealth
          </h1>

          <p>
            {currentText.platform}
          </p>

          <span>
            {currentText.healthcare}
          </span>

        </div>

        {/* ===============================
            MONUMENT
        =============================== */}
        <img
          src={monument}
          alt="Akwa Ibom Monument"
          className="monumentLayer"
        />

        {/* ===============================
            HOSPITAL
        =============================== */}
        <img
          src={hospital}
          alt="Akwa Ibom International Hospital"
          className="hospitalLayer"
        />

      </section>

      {/* ===============================
          PORTAL SECTION
      =============================== */}
      <section className="portalSection">

        {/* ===============================
            CITIZENS PORTAL
        =============================== */}
        <div className="portalCard citizenCard">

          <div className="portalContent">

            <div className="portalLogo">
              👤
            </div>

            <h2>
              {currentText.citizensPortal}
            </h2>

            <div className="portalDivider">
              <span></span>
              <div className="dividerDot"></div>
              <span></span>
            </div>

            <ul>
              <li>Register</li>
              <li>Book Appointment</li>
              <li>AI Health Assistant</li>
              <li>Find Clinics</li>
              <li>Emergency Help</li>
            </ul>

            <button
              type="button"
              className="greenBtn"
              onClick={() => navigate("/auth")}
            >
              {currentText.getStarted}
            </button>

          </div>

        </div>

        {/* ===============================
            STAFF PORTAL
        =============================== */}
        <div className="portalCard staffCard">

          <div className="portalContent">

            <div className="portalLogo">
              🏥
            </div>

            <h2>
              {currentText.staffPortal}
            </h2>

            <div className="portalDivider">
              <span></span>
              <div className="dividerDot"></div>
              <span></span>
            </div>

            <ul>
              <li>Receptionist</li>
              <li>Doctor</li>
              <li>Laboratory</li>
              <li>Pharmacy</li>
              <li>Administration</li>
            </ul>

            {/* ===============================
                STAFF LOGIN
                LANDING → STAFF PORTAL
            =============================== */}
            <button
              type="button"
              className="orangeBtn"
              onClick={() => navigate("/staff-portal")}
            >
              {currentText.staffLogin}
            </button>

          </div>

        </div>

      </section>

      {/* ===============================
          BOTTOM WAVE
      =============================== */}
      <img
        src={waveBottom}
        alt=""
        className="waveBottom"
      />

    </main>
  );
}