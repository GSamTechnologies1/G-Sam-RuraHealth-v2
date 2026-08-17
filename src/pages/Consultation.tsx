import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Consultation() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [chiefComplaint, setChiefComplaint] = useState("");
  const [vitalSigns, setVitalSigns] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [laboratoryRequest, setLaboratoryRequest] = useState("");
  const [doctorNotes, setDoctorNotes] = useState("");

  const handleSaveConsultation = () => {
    console.log({
      appointmentId: id,
      chiefComplaint,
      vitalSigns,
      diagnosis,
      prescription,
      laboratoryRequest,
      doctorNotes,
    });

    alert("Consultation saved successfully.");

    navigate("/doctor-dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7f6",
        padding: "30px 20px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#ffffff",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
        }}
      >
        {/* HEADER */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
            marginBottom: "30px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                color: "#0B8457",
              }}
            >
              👨‍⚕️ Patient Consultation
            </h1>

            <p
              style={{
                marginTop: "8px",
                color: "#666",
              }}
            >
              Appointment ID: {id || "N/A"}
            </p>
          </div>

          <button
            onClick={() => navigate("/doctor-dashboard")}
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "8px",
              background: "#e9f5ef",
              color: "#0B8457",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            ← Doctor Dashboard
          </button>
        </div>

        {/* CHIEF COMPLAINT */}

        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>Chief Complaint</strong>
          </label>

          <textarea
            value={chiefComplaint}
            onChange={(e) => setChiefComplaint(e.target.value)}
            rows={3}
            placeholder="Enter patient's chief complaint..."
            style={{
              width: "100%",
              marginTop: "8px",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              resize: "vertical",
            }}
          />
        </div>

        {/* VITAL SIGNS */}

        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>Vital Signs</strong>
          </label>

          <textarea
            value={vitalSigns}
            onChange={(e) => setVitalSigns(e.target.value)}
            rows={3}
            placeholder="e.g. BP: 120/80, Pulse: 72 bpm, Temperature: 36.5°C..."
            style={{
              width: "100%",
              marginTop: "8px",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              resize: "vertical",
            }}
          />
        </div>

        {/* DIAGNOSIS */}

        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>Diagnosis</strong>
          </label>

          <textarea
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            rows={4}
            placeholder="Enter diagnosis..."
            style={{
              width: "100%",
              marginTop: "8px",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              resize: "vertical",
            }}
          />
        </div>

        {/* PRESCRIPTION */}

        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>Prescription</strong>
          </label>

          <textarea
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
            rows={4}
            placeholder="Enter prescribed medications and instructions..."
            style={{
              width: "100%",
              marginTop: "8px",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              resize: "vertical",
            }}
          />
        </div>

        {/* LABORATORY REQUEST / INVESTIGATION FINDINGS */}

        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>Laboratory Request / Investigation Findings</strong>
          </label>

          <textarea
            value={laboratoryRequest}
            onChange={(e) => setLaboratoryRequest(e.target.value)}
            rows={4}
            placeholder="Enter laboratory requests or investigation findings..."
            style={{
              width: "100%",
              marginTop: "8px",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              resize: "vertical",
            }}
          />
        </div>

        {/* DOCTOR NOTES */}

        <div style={{ marginBottom: "25px" }}>
          <label>
            <strong>Doctor Notes</strong>
          </label>

          <textarea
            value={doctorNotes}
            onChange={(e) => setDoctorNotes(e.target.value)}
            rows={5}
            placeholder="Additional clinical notes..."
            style={{
              width: "100%",
              marginTop: "8px",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              resize: "vertical",
            }}
          />
        </div>

        {/* SAVE */}

        <button
          onClick={handleSaveConsultation}
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "10px",
            background: "#0B8457",
            color: "#ffffff",
            fontSize: "17px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          💾 Save Consultation
        </button>
      </div>
    </div>
  );
}