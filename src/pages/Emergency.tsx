import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Emergency.css";

type EmergencyService = {
  id: string;
  icon: string;
  name: string;
  description: string;
  phone: string;
  phoneDisplay: string;
  verified?: boolean;
};

type PoliceContact = {
  lga: string;
  command: string;
  phone: string;
  phoneDisplay: string;
  verified: boolean;
};

/*
 * Police contacts are intentionally kept with blank phone numbers
 * until each local command is properly researched and verified.
 */
const policeContacts: PoliceContact[] = [
  { lga: "Abak", command: "Abak Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Eastern Obolo", command: "Eastern Obolo Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Eket", command: "Eket Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Esit Eket", command: "Esit Eket Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Essien Udim", command: "Essien Udim Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Etim Ekpo", command: "Etim Ekpo Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Etinan", command: "Etinan Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Ibeno", command: "Ibeno Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Ibesikpo Asutan", command: "Ibesikpo Asutan Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Ibiono Ibom", command: "Ibiono Ibom Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Ika", command: "Ika Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Ikono", command: "Ikono Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Ikot Abasi", command: "Ikot Abasi Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Ikot Ekpene", command: "Ikot Ekpene Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Ini", command: "Ini Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Itu", command: "Itu Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Mbo", command: "Mbo Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Mkpat Enin", command: "Mkpat Enin Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Nsit Atai", command: "Nsit Atai Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Nsit Ibom", command: "Nsit Ibom Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Nsit Ubium", command: "Nsit Ubium Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Obot Akara", command: "Obot Akara Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Okobo", command: "Okobo Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Onna", command: "Onna Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Oron", command: "Oron Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Oruk Anam", command: "Oruk Anam Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Udung Uko", command: "Udung Uko Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Ukanafun", command: "Ukanafun Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Uruan", command: "Uruan Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Urue-Offong/Oruko", command: "Urue-Offong/Oruko Police Command", phone: "", phoneDisplay: "", verified: false },
  { lga: "Uyo", command: "Uyo Police Command", phone: "", phoneDisplay: "", verified: false },
];

const STATE_POLICE_PHONE = "08039213071";
const STATE_POLICE_DISPLAY = "0803 921 3071";

const emergencyServices: EmergencyService[] = [
  {
    id: "ambulance",
    icon: "🚑",
    name: "State Ambulance",
    description: "Akwa Ibom Emergency Medical Service",
    phone: "08000022322",
    phoneDisplay: "0800 002 2322",
    verified: true,
  },
  {
    id: "fire",
    icon: "🔥",
    name: "Fire & Rescue",
    description: "Akwa Ibom State Fire Service",
    phone: "09153143381",
    phoneDisplay: "0915 314 3381",
    verified: false,
  },
  {
    id: "frsc",
    icon: "🚗",
    name: "FRSC / Road Safety",
    description: "Road accidents and highway emergencies",
    phone: "122",
    phoneDisplay: "122",
    verified: true,
  },
  {
    id: "nema",
    icon: "🆘",
    name: "NEMA",
    description: "Disaster & emergency management",
    phone: "08035698886",
    phoneDisplay: "0803 569 8886",
    verified: true,
  },
];

export default function Emergency() {
  const navigate = useNavigate();

  const [locationLoading, setLocationLoading] = useState(false);
  const [selectedPoliceLga, setSelectedPoliceLga] = useState("Uyo");

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const selectedPoliceContact = policeContacts.find(
    (contact) => contact.lga === selectedPoliceLga
  );

  const handleEmergencyCall = () => {
    window.location.href = "tel:112";
  };

  const handleServiceCall = (phone: string) => {
    if (!phone) {
      alert("Phone number is not available yet. It is pending verification.");
      return;
    }

    window.location.href = `tel:${phone}`;
  };

  const handleStatePoliceCall = () => {
    window.location.href = `tel:${STATE_POLICE_PHONE}`;
  };

  const handleLocalPoliceCall = () => {
    if (!selectedPoliceContact?.phone) {
      alert(
        `${selectedPoliceContact?.command || "Selected local Police Command"} phone number is currently pending verification.`
      );
      return;
    }

    window.location.href = `tel:${selectedPoliceContact.phone}`;
  };

  const handleShareLocation = () => {
    if (!navigator.geolocation) {
      alert("Location services are not supported by this browser.");
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setUserLocation({ latitude, longitude });
        setLocationLoading(false);

        const locationText =
          `My emergency location:\n` +
          `https://www.google.com/maps?q=${latitude},${longitude}`;

        if (navigator.share) {
          try {
            await navigator.share({
              title: "G-Sam RuraHealth Emergency Location",
              text: locationText,
            });
          } catch {
            // User cancelled sharing.
          }
        } else {
          try {
            await navigator.clipboard.writeText(locationText);
            alert(
              "Emergency location copied. You can now send it to your emergency contact."
            );
          } catch {
            alert(`Your location:\n${locationText}`);
          }
        }
      },
      (error) => {
        console.error("Emergency location error:", error);
        setLocationLoading(false);

        alert(
          "Unable to access your location. Please allow location permission and try again."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  const handleEmergencyContact = () => {
    alert(
      "Emergency Contact will be connected to the citizen's profile."
    );
  };

  const handleMedicalInformation = () => {
    alert(
      "Emergency Medical Information will be available from the citizen's health profile."
    );
  };

  return (
    <div className="emergency-page">
      <header className="emergency-header">
        <button
          type="button"
          className="emergency-back-btn"
          onClick={() => navigate("/citizen-dashboard")}
        >
          ←
        </button>

        <div>
          <h1>Emergency / SOS</h1>
          <p>Get urgent assistance when you need it.</p>
        </div>
      </header>

      <main className="emergency-main">
        <section className="emergency-hero">
          <div className="emergency-icon">🚨</div>

          <h2>Need Emergency Help?</h2>

          <p>
            If you or someone around you is experiencing a serious or
            life-threatening emergency, get help immediately.
          </p>

          <button
            type="button"
            className="emergency-call-btn"
            onClick={handleEmergencyCall}
          >
            📞 Call Emergency Services
          </button>

          <small>National Emergency Number: 112</small>
        </section>

        <section className="emergency-section">
          <div className="section-heading">
            <div>
              <h2>Emergency Services</h2>
              <p>Contact the service that matches your emergency.</p>
            </div>

            <span className="service-count">
              {emergencyServices.length + 1}
            </span>
          </div>

          <div className="emergency-services-grid">
            {/* =====================================================
                POLICE
            ===================================================== */}
            <article className="service-card police-service-card">
              <div className="service-icon">👮</div>

              <div className="service-content">
                <div className="service-title-row">
                  <h3>Police</h3>

                  <span className="local-badge">
                    Local LGA Selection
                  </span>
                </div>

                <p>
                  Contact the Police Command serving your location.
                </p>

                {/* STATE POLICE COMMAND */}
                <div className="police-option state-police-option">
                  <div className="police-option-header">
                    <div>
                      <strong>🇳🇬 State Police Command</strong>
                      <small>
                        Akwa Ibom State Police Command
                      </small>
                    </div>

                    <span className="verified-badge">
                      ✓ Verified
                    </span>
                  </div>

                  <strong className="service-phone">
                    {STATE_POLICE_DISPLAY}
                  </strong>

                  <button
                    type="button"
                    className="service-call-btn"
                    onClick={handleStatePoliceCall}
                  >
                    📞 Call State Command
                  </button>
                </div>

                <div className="police-divider">
                  <span>OR</span>
                </div>

                {/* LOCAL POLICE COMMAND */}
                <div className="police-option local-police-option">
                  <div className="local-police-heading">
                    <div>
                      <strong>📍 Local Police Command</strong>
                      <small>
                        Select the LGA where the emergency is occurring.
                      </small>
                    </div>
                  </div>

                  <label
                    htmlFor="police-lga"
                    className="police-select-label"
                  >
                    Select your Local Government Area
                  </label>

                  <select
                    id="police-lga"
                    className="police-lga-select"
                    value={selectedPoliceLga}
                    onChange={(event) =>
                      setSelectedPoliceLga(event.target.value)
                    }
                  >
                    {policeContacts.map((contact) => (
                      <option key={contact.lga} value={contact.lga}>
                        {contact.lga}
                      </option>
                    ))}
                  </select>

                  {selectedPoliceContact && (
                    <div className="selected-police-command">
                      <strong>
                        {selectedPoliceContact.command}
                      </strong>

                      {selectedPoliceContact.phone ? (
                        <span>
                          {selectedPoliceContact.phoneDisplay}
                        </span>
                      ) : (
                        <span className="phone-pending">
                          Phone number pending verification
                        </span>
                      )}
                    </div>
                  )}

                  <button
                    type="button"
                    className="service-call-btn local-police-call-btn"
                    onClick={handleLocalPoliceCall}
                    disabled={!selectedPoliceContact?.phone}
                  >
                    📞 Call Local Police Command
                  </button>
                </div>
              </div>
            </article>

            {/* OTHER EMERGENCY SERVICES */}
            {emergencyServices.map((service) => (
              <article
                className={`service-card ${
                  service.id === "ambulance"
                    ? "service-card-primary"
                    : ""
                }`}
                key={service.id}
              >
                <div className="service-icon">{service.icon}</div>

                <div className="service-content">
                  <div className="service-title-row">
                    <h3>{service.name}</h3>

                    {service.verified ? (
                      <span className="verified-badge">
                        ✓ Verified
                      </span>
                    ) : (
                      <span className="pending-badge">
                        Verification pending
                      </span>
                    )}
                  </div>

                  <p>{service.description}</p>

                  <strong className="service-phone">
                    {service.phoneDisplay}
                  </strong>

                  <button
                    type="button"
                    className="service-call-btn"
                    onClick={() => handleServiceCall(service.phone)}
                  >
                    📞 Call
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="emergency-section">
          <div className="section-heading">
            <div>
              <h2>Emergency Assistance</h2>
              <p>Tools that can help during an emergency.</p>
            </div>
          </div>

          <div className="assistance-list">
            <button
              type="button"
              className="assistance-card"
              onClick={handleShareLocation}
              disabled={locationLoading}
            >
              <span className="assistance-icon">📍</span>

              <span className="assistance-content">
                <strong>
                  {locationLoading
                    ? "Detecting Location..."
                    : "Share My Location"}
                </strong>

                <small>
                  Send your current location to someone you trust.
                </small>

                {userLocation && (
                  <small className="location-confirmed">
                    ✓ Location detected
                  </small>
                )}
              </span>

              <span className="assistance-arrow">→</span>
            </button>

            <button
              type="button"
              className="assistance-card"
              onClick={handleEmergencyContact}
            >
              <span className="assistance-icon">👤</span>

              <span className="assistance-content">
                <strong>Emergency Contact</strong>

                <small>
                  Call your selected emergency contact.
                </small>
              </span>

              <span className="assistance-arrow">→</span>
            </button>

            <button
              type="button"
              className="assistance-card"
              onClick={handleMedicalInformation}
            >
              <span className="assistance-icon">🩸</span>

              <span className="assistance-content">
                <strong>Emergency Medical Information</strong>

                <small>
                  View important medical information stored in your profile.
                </small>
              </span>

              <span className="assistance-arrow">→</span>
            </button>
          </div>
        </section>

        <section className="emergency-section">
          <h2 className="section-title">
            When to Seek Emergency Help
          </h2>

          <div className="emergency-grid">
            <div className="emergency-card">
              <span>❤️</span>
              <strong>Chest Pain</strong>
              <p>
                Severe or persistent chest pain, pressure or discomfort.
              </p>
            </div>

            <div className="emergency-card">
              <span>🫁</span>
              <strong>Difficulty Breathing</strong>
              <p>
                Severe difficulty breathing or sudden shortness of breath.
              </p>
            </div>

            <div className="emergency-card">
              <span>🧠</span>
              <strong>Loss of Consciousness</strong>
              <p>
                Someone is unconscious, unresponsive or difficult to wake.
              </p>
            </div>

            <div className="emergency-card">
              <span>🩸</span>
              <strong>Severe Bleeding</strong>
              <p>
                Heavy bleeding that does not stop with direct pressure.
              </p>
            </div>
          </div>
        </section>

        <section className="emergency-notice">
          <span>⚠️</span>

          <div>
            <h3>Important</h3>

            <p>
              This page provides emergency contact information and guidance.
              Do not delay professional emergency care when a situation is serious.
            </p>
          </div>
        </section>
      </main>

      <nav className="emergency-bottom-nav">
        <button
          type="button"
          onClick={() => navigate("/citizen-dashboard")}
        >
          🏠
          <span>Home</span>
        </button>

        <button
          type="button"
          onClick={() => navigate("/health-education")}
        >
          ❤️
          <span>Health</span>
        </button>

        <button
          type="button"
          onClick={() => navigate("/health-centres")}
        >
          🏥
          <span>Services</span>
        </button>

        <button type="button" className="active">
          🚨
          <span>Emergency</span>
        </button>

        <button
          type="button"
          onClick={() => navigate("/notifications")}
        >
          🔔
          <span>Alerts</span>
        </button>
      </nav>
    </div>
  );
}