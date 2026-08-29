import { useNavigate } from "react-router-dom";
import "./ChildHealth.css";

type ChildHealthTopic = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

type ImmunizationItem = {
  id: string;
  vaccine: string;
  purpose: string;
  status: "Recommended" | "Important";
};

const childHealthTopics: ChildHealthTopic[] = [
  {
    id: "topic-001",
    title: "Child Immunization",
    description: "Learn why routine childhood vaccination is important for protecting children from preventable diseases.",
    icon: "💉",
  },
  {
    id: "topic-002",
    title: "Nutrition",
    description: "Learn about balanced nutrition, healthy feeding and the importance of adequate growth support.",
    icon: "🥗",
  },
  {
    id: "topic-003",
    title: "Growth & Development",
    description: "Monitor important aspects of a child's physical, emotional and developmental progress.",
    icon: "📈",
  },
  {
    id: "topic-004",
    title: "Hygiene",
    description: "Learn practical hygiene habits that can help reduce infections and keep children healthy.",
    icon: "🧼",
  },
];

const immunizations: ImmunizationItem[] = [
  {
    id: "vaccine-001",
    vaccine: "BCG",
    purpose: "Protection against severe forms of tuberculosis.",
    status: "Recommended",
  },
  {
    id: "vaccine-002",
    vaccine: "Polio Vaccine",
    purpose: "Protection against poliovirus infection.",
    status: "Recommended",
  },
  {
    id: "vaccine-003",
    vaccine: "Pentavalent Vaccine",
    purpose: "Protection against several serious childhood infections.",
    status: "Important",
  },
  {
    id: "vaccine-004",
    vaccine: "Measles Vaccine",
    purpose: "Protection against measles infection and complications.",
    status: "Recommended",
  },
];

export default function ChildHealth() {
  const navigate = useNavigate();

  return (
    <div className="child-health-page">
      <header className="child-health-header">
        <div className="child-health-header-content">
          <button type="button" className="child-health-back-btn" onClick={() => navigate("/citizen-dashboard")} aria-label="Go back">
            ← Back
          </button>
          <div>
            <h1>Child Health</h1>
            <p>Information and guidance for keeping children healthy and protected.</p>
          </div>
        </div>
      </header>

      <main className="child-health-main">
        <section className="child-health-hero">
          <div className="child-health-hero-icon">👶</div>
          <div>
            <span className="child-health-label">CHILD HEALTH</span>
            <h2>Supporting Your Child's Healthy Growth</h2>
            <p>Access important information about immunization, nutrition, hygiene, growth and development.</p>
          </div>
        </section>

        <section className="child-health-section">
          <div className="child-health-section-heading">
            <div>
              <h2>Child Health Topics</h2>
              <p>Important areas every parent or caregiver should understand.</p>
            </div>
          </div>

          <div className="child-health-topic-grid">
            {childHealthTopics.map((topic) => (
              <article className="child-health-topic-card" key={topic.id}>
                <div className="child-health-topic-icon">{topic.icon}</div>
                <div>
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="child-health-section">
          <div className="child-health-section-heading">
            <div>
              <h2>Immunization</h2>
              <p>Routine immunization helps protect children from serious preventable diseases.</p>
            </div>
            <span className="child-health-count">{immunizations.length}</span>
          </div>

          <div className="child-health-immunization-list">
            {immunizations.map((item) => (
              <article className="child-health-immunization-card" key={item.id}>
                <div className="child-health-vaccine-icon">💉</div>
                <div className="child-health-vaccine-content">
                  <div className="child-health-vaccine-title-row">
                    <h3>{item.vaccine}</h3>
                    <span className={item.status === "Recommended" ? "child-health-status recommended" : "child-health-status important"}>
                      {item.status}
                    </span>
                  </div>
                  <p>{item.purpose}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="child-health-action-area">
            <button type="button" className="child-health-primary-btn" onClick={() => navigate("/immunization")}>
              View Immunization Information →
            </button>
          </div>
        </section>

        <section className="child-health-section">
          <div className="child-health-section-heading">
            <div>
              <h2>Healthy Child Practices</h2>
              <p>Simple practices that support everyday child health.</p>
            </div>
          </div>

          <div className="child-health-practices-grid">
            <article className="child-health-practice-card">
              <span>🍼</span>
              <h3>Healthy Feeding</h3>
              <p>Provide age-appropriate and nutritious food while following appropriate infant and child feeding guidance.</p>
            </article>

            <article className="child-health-practice-card">
              <span>💧</span>
              <h3>Safe Water</h3>
              <p>Ensure children have access to safe drinking water and maintain good food and water hygiene.</p>
            </article>

            <article className="child-health-practice-card">
              <span>🧼</span>
              <h3>Good Hygiene</h3>
              <p>Encourage regular handwashing, clean surroundings and appropriate personal hygiene.</p>
            </article>

            <article className="child-health-practice-card">
              <span>😴</span>
              <h3>Rest & Sleep</h3>
              <p>Children need adequate sleep and rest to support healthy physical and cognitive development.</p>
            </article>
          </div>
        </section>

        <section className="child-health-section">
          <div className="child-health-section-heading">
            <div>
              <h2>When to Seek Medical Care</h2>
              <p>Some symptoms require prompt assessment by a qualified healthcare professional.</p>
            </div>
          </div>

          <div className="child-health-warning-card">
            <div className="child-health-warning-icon">⚠️</div>
            <div>
              <h3>Seek urgent medical attention when necessary</h3>
              <p>Contact an appropriate healthcare facility if a child has serious or worsening symptoms, difficulty breathing, severe weakness, persistent vomiting, convulsions, loss of consciousness or other signs of a medical emergency.</p>
              <button type="button" className="child-health-emergency-btn" onClick={() => navigate("/emergency")}>
                🚨 Emergency / SOS
              </button>
            </div>
          </div>
        </section>

        <section className="child-health-section">
          <div className="child-health-section-heading">
            <div>
              <h2>Healthcare Services</h2>
              <p>Find healthcare services that can support your child's needs.</p>
            </div>
          </div>

          <div className="child-health-service-grid">
            <button type="button" onClick={() => navigate("/health-centres")}>
              <span>🏥</span>
              <strong>Find Health Centre</strong>
              <small>Locate nearby healthcare facilities.</small>
            </button>

            <button type="button" onClick={() => navigate("/book-appointment")}>
              <span>📅</span>
              <strong>Book Appointment</strong>
              <small>Request a healthcare appointment.</small>
            </button>

            <button type="button" onClick={() => navigate("/immunization")}>
              <span>💉</span>
              <strong>Immunization</strong>
              <small>Access immunization information.</small>
            </button>

            <button type="button" onClick={() => navigate("/emergency")}>
              <span>🚨</span>
              <strong>Emergency Assistance</strong>
              <small>Get urgent assistance when needed.</small>
            </button>
          </div>
        </section>

        <section className="child-health-notice">
          <span>🔐</span>
          <div>
            <h3>Important Information</h3>
            <p>This page provides general health education. It does not replace examination, diagnosis or treatment by a qualified healthcare professional.</p>
          </div>
        </section>
      </main>

      <nav className="child-health-bottom-nav">
        <button type="button" onClick={() => navigate("/citizen-dashboard")}>
          🏠
          <span>Home</span>
        </button>

        <button type="button" className="active" onClick={() => navigate("/health-education")}>
          ❤️
          <span>Health</span>
        </button>

        <button type="button" onClick={() => navigate("/health-centres")}>
          🏥
          <span>Services</span>
        </button>

        <button type="button" onClick={() => navigate("/emergency")}>
          🚨
          <span>Emergency</span>
        </button>

        <button type="button" onClick={() => navigate("/profile")}>
          👤
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
}