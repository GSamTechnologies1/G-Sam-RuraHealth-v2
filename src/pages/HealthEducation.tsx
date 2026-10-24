import { useNavigate } from "react-router-dom";
import "./HealthEducation.css";

const healthTopics = [
  {
    title: "Breastfeeding",
    description:
      "Learn about breastfeeding, infant nutrition and maternal support.",
    icon: "🤱",
    path: "/breastfeeding",
    category: "Maternal Health",
  },
  {
    title: "Pregnancy & Antenatal Care",
    description:
      "Explore pregnancy guidance, antenatal visits and maternal wellbeing.",
    icon: "🤰",
    path: "/antenatal",
    category: "Maternal Health",
  },
  {
    title: "Breast Health",
    description:
      "Learn about breast changes, awareness and when to seek medical advice.",
    icon: "💗",
    path: "/health-education/breast-cancer",
    category: "Preventive Health",
  },
  {
    title: "Immunization",
    description:
      "Understand vaccines and recommended immunization for children and adults.",
    icon: "💉",
    path: "/immunization",
    category: "Prevention",
  },
  {
    title: "Kidney Health",
    description:
      "Discover healthy habits, risk factors and kidney warning signs.",
    icon: "🫘",
    path: "/health-education/kidney-health",
    category: "Healthy Living",
  },
  {
    title: "Cardiac Arrest",
    description:
      "Recognize a possible cardiac arrest and learn why emergency action matters.",
    icon: "❤️",
    path: "/cardiac-arrest",
    category: "Emergency Awareness",
  },
];

export default function HealthEducation() {
  const navigate = useNavigate();

  return (
    <main className="health-education-page">
      <header className="education-header">
        <button
          className="education-back-button"
          onClick={() => navigate("/citizen-dashboard")}
        >
          ← Dashboard
        </button>

        <p className="education-eyebrow">
          G-SAM RURAHEALTH
        </p>

        <h1>Health Education</h1>

        <p className="education-subtitle">
          Learn. Prevent. Stay Healthy.
        </p>

        <p className="education-intro">
          Explore reliable health information to help you
          make informed decisions about your health and
          the wellbeing of your family.
        </p>
      </header>

      <section className="education-content">
        <div className="education-section-heading">
          <div>
            <h2>Explore Health Topics</h2>
            <p>
              Choose a topic to learn more.
            </p>
          </div>
        </div>

        <div className="health-topic-grid">
          {healthTopics.map((topic) => (
            <button
              type="button"
              className="health-topic-card"
              key={topic.title}
              onClick={() => navigate(topic.path)}
            >
              <span className="health-topic-icon">
                {topic.icon}
              </span>

              <span className="health-topic-category">
                {topic.category}
              </span>

              <span className="health-topic-title">
                {topic.title}
              </span>

              <span className="health-topic-description">
                {topic.description}
              </span>

              <span className="health-topic-link">
                Explore topic →
              </span>
            </button>
          ))}
        </div>

        <div className="education-notice">
          <span className="education-notice-icon">
            ℹ️
          </span>

          <div>
            <h3>Important Health Information</h3>

            <p>
              This section provides educational information
              and does not replace professional medical
              advice, diagnosis or treatment. Contact a
              qualified healthcare professional when you
              have health concerns.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}