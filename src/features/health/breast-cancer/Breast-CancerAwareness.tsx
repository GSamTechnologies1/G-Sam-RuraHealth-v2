import { useNavigate } from "react-router-dom";
import "../../../styles/BreastCancerAwareness.css";

export default function BreastCancerAwareness() {
  const navigate = useNavigate();

  return (
    <div className="breast-cancer-page">

      {/* =========================
          HEADER
      ========================= */}
      <header className="breast-cancer-header">

        <button
          className="breast-cancer-back"
          onClick={() => navigate("/citizen-dashboard")}
        >
          ←
        </button>

        <div>
          <p className="breast-cancer-label">
            G-Sam RuraHealth
          </p>

          <h1>🎗️ Breast Cancer Awareness</h1>

          <p>
            Learn the warning signs. Know your body. Seek care early.
          </p>
        </div>

      </header>


      {/* =========================
          HERO
      ========================= */}
      <section className="breast-cancer-hero">

        <div className="breast-cancer-hero-icon">
          🎗️
        </div>

        <div>
          <span className="breast-cancer-badge">
            HEALTH EDUCATION
          </span>

          <h2>
            Early awareness can save lives.
          </h2>

          <p>
            Breast cancer is a disease in which abnormal breast cells
            grow uncontrollably. Knowing changes in your breasts and
            seeking professional care when something is unusual can
            help you get appropriate evaluation early.
          </p>
        </div>

      </section>


      {/* =========================
          WARNING SIGNS
      ========================= */}
      <section className="breast-cancer-section">

        <div className="breast-cancer-section-title">
          <span>🔎</span>

          <div>
            <h2>Know the Warning Signs</h2>
            <p>Changes that should not be ignored.</p>
          </div>
        </div>


        <div className="breast-cancer-signs-grid">

          <article className="breast-cancer-info-card">
            <span>🔵</span>
            <h3>New Lump</h3>
            <p>
              A new lump or thickened area in the breast or underarm
              should be evaluated by a healthcare professional.
            </p>
          </article>


          <article className="breast-cancer-info-card">
            <span>👩‍⚕️</span>
            <h3>Breast Changes</h3>
            <p>
              Noticeable changes in the size, shape or appearance of
              a breast deserve attention.
            </p>
          </article>


          <article className="breast-cancer-info-card">
            <span>🔴</span>
            <h3>Skin Changes</h3>
            <p>
              Dimpling, unusual redness, swelling or changes in the
              skin of the breast should be checked.
            </p>
          </article>


          <article className="breast-cancer-info-card">
            <span>💧</span>
            <h3>Nipple Changes</h3>
            <p>
              An unusual nipple discharge or a newly inverted nipple
              should be discussed with a healthcare professional.
            </p>
          </article>

        </div>

      </section>


      {/* =========================
          BREAST SELF-AWARENESS
      ========================= */}
      <section className="breast-cancer-section">

        <div className="breast-cancer-highlight">

          <div className="highlight-icon">
            💗
          </div>

          <div>
            <h2>Practice Breast Self-Awareness</h2>

            <p>
              Become familiar with how your breasts normally look and
              feel. This can help you notice changes that are unusual
              for you.
            </p>

            <p>
              If you notice a new or persistent change, do not panic.
              Many breast changes are not cancer, but a healthcare
              professional should evaluate concerning changes.
            </p>
          </div>

        </div>

      </section>


      {/* =========================
          RISK FACTORS
      ========================= */}
      <section className="breast-cancer-section">

        <div className="breast-cancer-section-title">
          <span>⚠️</span>

          <div>
            <h2>Some Risk Factors</h2>
            <p>
              Having a risk factor does not mean someone will develop
              breast cancer.
            </p>
          </div>
        </div>


        <div className="breast-cancer-risk-list">

          <div>
            <span>1</span>
            <p>
              Increasing age can increase the risk of breast cancer.
            </p>
          </div>

          <div>
            <span>2</span>
            <p>
              A family history of breast or certain other cancers may
              increase risk.
            </p>
          </div>

          <div>
            <span>3</span>
            <p>
              Some inherited genetic changes can increase breast cancer
              risk.
            </p>
          </div>

          <div>
            <span>4</span>
            <p>
              Some hormonal, reproductive and lifestyle factors may
              influence risk.
            </p>
          </div>

        </div>

      </section>


      {/* =========================
          WHAT TO DO
      ========================= */}
      <section className="breast-cancer-action">

        <div>
          <span className="action-icon">🩺</span>

          <h2>
            Notice Something Unusual?
          </h2>

          <p>
            Do not wait for symptoms to become severe. Speak with a
            qualified healthcare professional for appropriate
            assessment and advice.
          </p>
        </div>

        <button
          onClick={() => navigate("/health-centres")}
        >
          Find a Health Centre →
        </button>

      </section>


      {/* =========================
          MYTH & FACT
      ========================= */}
      <section className="breast-cancer-section">

        <div className="breast-cancer-section-title">
          <span>💡</span>

          <div>
            <h2>Myth & Fact</h2>
            <p>Let's replace fear with informed awareness.</p>
          </div>
        </div>


        <div className="breast-cancer-myth-grid">

          <article>
            <span>❌ Myth</span>

            <h3>
              A breast lump always means cancer.
            </h3>

            <p>
              Many breast lumps are caused by conditions that are not
              cancer. However, a new or concerning lump should be
              professionally assessed.
            </p>
          </article>


          <article>
            <span>✅ Fact</span>

            <h3>
              Early evaluation matters.
            </h3>

            <p>
              Prompt assessment of unusual breast changes can help
              healthcare professionals determine the appropriate next
              steps.
            </p>
          </article>

        </div>

      </section>


      {/* =========================
          FOOTER
      ========================= */}
      <footer className="breast-cancer-footer">

        <p>
          🎗️ Breast Cancer Awareness • G-Sam RuraHealth
        </p>

        <p>
          This information is for health education and does not replace
          advice, diagnosis or treatment from a qualified healthcare
          professional.
        </p>

      </footer>

    </div>
  );
}