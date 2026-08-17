import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [patientCount, setPatientCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);

  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const patientsSnapshot = await getDocs(
        collection(db, "patients")
      );

      const appointmentsSnapshot = await getDocs(
        collection(db, "appointments")
      );

      const staffSnapshot = await getDocs(
        collection(db, "staff")
      );

      setPatientCount(
        patientsSnapshot.size
      );

      setAppointmentCount(
        appointmentsSnapshot.size
      );

      setStaffCount(
        staffSnapshot.size
      );

    } catch (error) {
      console.error(
        "Error loading admin dashboard:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <div className="admin-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="admin-header">

        <div className="admin-header-content">

          <div>
            <h1>
              🏥 G-Sam RuraHealth
            </h1>

            <p>
              Administrator Dashboard
            </p>
          </div>

          <button
            className="admin-back-btn"
            onClick={() =>
              navigate("/staff-portal")
            }
          >
            ← Staff Portal
          </button>

        </div>

      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="admin-main">

        <h2 className="admin-title">
          System Overview
        </h2>

        <p className="admin-subtitle">
          Monitor and manage G-Sam RuraHealth
        </p>


        {/* =====================================================
            STATISTICS
        ===================================================== */}

        <div className="admin-stat-grid">

          {/* PATIENTS */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              👥
            </div>

            <div>
              <h3>
                Total Patients
              </h3>

              <h2>
                {loading
                  ? "..."
                  : patientCount}
              </h2>
            </div>

          </div>


          {/* APPOINTMENTS */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              📅
            </div>

            <div>
              <h3>
                Appointments
              </h3>

              <h2>
                {loading
                  ? "..."
                  : appointmentCount}
              </h2>
            </div>

          </div>


          {/* STAFF */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              👨‍⚕️
            </div>

            <div>
              <h3>
                Staff Members
              </h3>

              <h2>
                {loading
                  ? "..."
                  : staffCount}
              </h2>
            </div>

          </div>


          {/* SYSTEM */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              ⚙️
            </div>

            <div>
              <h3>
                System Status
              </h3>

              <h2 className="admin-status-online">
                Online
              </h2>
            </div>

          </div>

        </div>


        {/* =====================================================
            MANAGEMENT
        ===================================================== */}

        <h2 className="admin-section-title">
          System Management
        </h2>


        <div className="admin-action-grid">


          {/* PATIENT MANAGEMENT */}

          <button
            className="admin-action-card"
            onClick={() =>
              navigate("/patients")
            }
          >

            <div className="admin-action-icon">
              👥
            </div>

            <strong>
              Patient Records
            </strong>

            <span>
              View and manage registered patients
            </span>

          </button>


          {/* RECEPTIONIST */}

          <button
            className="admin-action-card"
            onClick={() =>
              navigate(
                "/receptionist-dashboard"
              )
            }
          >

            <div className="admin-action-icon">
              🧑‍💼
            </div>

            <strong>
              Receptionist
            </strong>

            <span>
              Manage registration and appointments
            </span>

          </button>


          {/* DOCTOR */}

          <button
            className="admin-action-card"
            onClick={() =>
              navigate(
                "/doctor-dashboard"
              )
            }
          >

            <div className="admin-action-icon">
              👨‍⚕️
            </div>

            <strong>
              Doctor Dashboard
            </strong>

            <span>
              View consultations and clinical activities
            </span>

          </button>


          {/* PHARMACY */}

          <button
            className="admin-action-card"
            onClick={() =>
              navigate(
                "/pharmacy-dashboard"
              )
            }
          >

            <div className="admin-action-icon">
              💊
            </div>

            <strong>
              Pharmacy
            </strong>

            <span>
              Manage prescriptions and medication dispensing
            </span>

          </button>


          {/* LABORATORY */}

          <button
            className="admin-action-card"
            onClick={() =>
              navigate(
                "/laboratory-dashboard"
              )
            }
          >

            <div className="admin-action-icon">
              🧪
            </div>

            <strong>
              Laboratory
            </strong>

            <span>
              Manage laboratory investigations and results
            </span>

          </button>


          {/* APPOINTMENTS */}

          <button
            className="admin-action-card"
            onClick={() =>
              navigate(
                "/book-appointment"
              )
            }
          >

            <div className="admin-action-icon">
              📅
            </div>

            <strong>
              Appointments
            </strong>

            <span>
              Book and manage patient appointments
            </span>

          </button>


        </div>


        {/* =====================================================
            ADMIN NOTICE
        ===================================================== */}

        <section className="admin-info-section">

          <div className="admin-info-icon">
            🔐
          </div>

          <div>

            <h3>
              Administrator Access
            </h3>

            <p>
              This dashboard provides administrative
              access to the major operational areas of
              G-Sam RuraHealth. Use the management
              options above to monitor system activities.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}