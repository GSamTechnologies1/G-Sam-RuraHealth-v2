import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LanguageScreen.css";

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

export default function LanguageScreen() {
  const navigate = useNavigate();

  const [selectedLanguage, setSelectedLanguage] = useState("");

  // Select a language
  const selectLanguage = (language: string) => {
    setSelectedLanguage(language);
  };

  // Continue to citizen authentication
  const continueToAuth = () => {
    if (!selectedLanguage) {
      alert("Please select a language first.");
      return;
    }

    localStorage.setItem("language", selectedLanguage);

    navigate("/auth");
  };

  return (
    <div className="language-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="language-header">

        <div className="language-logo">
          🌍
        </div>

        <h1>
          G-Sam RuraHealth
        </h1>

        <p>
          Your health. Your language. Your community.
        </p>

      </div>


      {/* =========================
          LANGUAGE CARD
      ========================= */}

      <main className="language-container">

        <div className="language-card">

          <div className="language-icon">
            🗣️
          </div>

          <h2>
            Select Your Language
          </h2>

          <p className="language-description">
            Choose the language you want to use throughout
            G-Sam RuraHealth.
          </p>


          {/* =========================
              LANGUAGE OPTIONS
          ========================= */}

          <div className="language-list">

            {languages.map((language) => (

              <button
                key={language}
                type="button"
                className={
                  selectedLanguage === language
                    ? "language-option selected"
                    : "language-option"
                }
                onClick={() => selectLanguage(language)}
              >

                <span>
                  {language}
                </span>

                {selectedLanguage === language && (
                  <span className="language-check">
                    ✓
                  </span>
                )}

              </button>

            ))}

          </div>


          {/* =========================
              CONTINUE
          ========================= */}

          <button
            type="button"
            className="language-continue"
            onClick={continueToAuth}
          >
            Continue →
          </button>


          <p className="language-footer">
            You can change your language later from Settings.
          </p>

        </div>

      </main>

    </div>
  );
}