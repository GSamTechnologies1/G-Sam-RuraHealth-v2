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

  const selectLanguage = (language: string) => {
    localStorage.setItem("language", language);
    navigate("/onboarding");
  };

  return (
    <div className="language-screen">
      <h1>Select Your Language</h1>

      <p>
        Choose the language you want to use throughout the app.
      </p>

      <div className="language-list">
        {languages.map((language) => (
          <button
            key={language}
            onClick={() => selectLanguage(language)}
          >
            {language}
          </button>
        ))}
      </div>
    </div>
  );
}