import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./KidneyHealth.css";

type KidneyHealthTopic = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

const kidneyHealthTopics: KidneyHealthTopic[] = [
  {
    id: "kidney-001",
    title: "What Do the Kidneys Do?",
    description: "Learn about the important functions of the kidneys.",
    icon: "🫘",
  },
  {
    id: "kidney-002",
    title: "Kidney Disease Risk Factors",
    description: "Understand conditions and habits that may increase kidney disease risk.",
    icon: "⚠️",
  },
  {
    id: "kidney-003",
    title: "Healthy Kidney Habits",
    description: "Learn practical habits that can support your overall health.",
    icon: "💚",
  },
  {
    id: "kidney-004",
    title: "Early Detection",
    description: "Understand why appropriate health checks can be important.",
    icon: "🔬",
  },
];

export default function KidneyHealth() {

  const navigate = useNavigate();

  const [selectedTopic, setSelectedTopic] = useState("All");

  const filteredTopics =
    selectedTopic === "All"
      ? kidneyHealthTopics
      : kidneyHealthTopics.filter(
          (topic) => topic.title === selectedTopic
        );

  return (

    <div className="kidney-health-page">

      <header className="kidney-health-header">

        <button
          type="button"
          className="kidney-back-button"
          onClick={() => navigate(-1)}
        >
          ←
        </button>

        <div>

          <h1>
            Kidney Health
          </h1>

          <p>
            Learn how to protect your kidneys
            and maintain good kidney health.
          </p>

        </div>

      </header>

      <main className="kidney-health-main">

        <section className="kidney-health-section">

          <div className="section-heading">

            <h2>
              Kidney Health Awareness
            </h2>

            <p>
              Learn about kidney health,
              prevention and early detection.
            </p>

          </div>

          <div className="kidney-topic-filter">

            <button
              type="button"
              className={
                selectedTopic === "All"
                  ? "selected"
                  : ""
              }
              onClick={() =>
                setSelectedTopic("All")
              }
            >
              All
            </button>

            {kidneyHealthTopics.map(
              (topic) => (

                <button
                  type="button"
                  key={topic.id}
                  className={
                    selectedTopic === topic.title
                      ? "selected"
                      : ""
                  }
                  onClick={() =>
                    setSelectedTopic(topic.title)
                  }
                >
                  {topic.title}
                </button>

              )
            )}

          </div>

        </section>

        <section className="kidney-health-section">

          <div className="section-heading">

            <h2>
              Kidney Health Information
            </h2>

            <p>
              Explore important kidney health topics.
            </p>

          </div>

          <div className="kidney-topics-list">

            {filteredTopics.map(
              (topic) => (

                <article
                  className="kidney-topic-card"
                  key={topic.id}
                >

                  <div className="kidney-topic-icon">

                    {topic.icon}

                  </div>

                  <div className="kidney-topic-content">

                    <h3>
                      {topic.title}
                    </h3>

                    <p>
                      {topic.description}
                    </p>

                  </div>

                </article>

              )
            )}

          </div>

        </section>

        <section className="kidney-health-section">

          <div className="kidney-check-card">

            <span>
              🔬
            </span>

            <div>

              <h2>
                Kidney Health Check
              </h2>

              <p>
                If you have concerns about
                your kidney health, speak with
                a qualified healthcare professional.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/health-centres")
                }
              >
                Find Health Centre
              </button>

            </div>

          </div>

        </section>

        <section className="kidney-health-notice">

          <span>
            ℹ️
          </span>

          <p>
            This page provides general health
            education and does not diagnose
            or treat kidney disease.
          </p>

        </section>

      </main>

      <nav className="kidney-health-bottom-nav">

        <button
          type="button"
          onClick={() =>
            navigate("/citizen-dashboard")
          }
        >
          🏠
          <span>
            Home
          </span>
        </button>

        <button
          type="button"
          className="active"
          onClick={() =>
            navigate("/health-education")
          }
        >
          ❤️
          <span>
            Health
          </span>
        </button>

        <button
          type="button"
          onClick={() =>
            navigate("/health-centres")
          }
        >
          🏥
          <span>
            Services
          </span>
        </button>

        <button
          type="button"
          onClick={() =>
            navigate("/emergency")
          }
        >
          🚨
          <span>
            Emergency
          </span>
        </button>

        <button
          type="button"
          onClick={() =>
            navigate("/citizen-dashboard")
          }
        >
          👤
          <span>
            Profile
          </span>
        </button>

      </nav>

    </div>
  );
}