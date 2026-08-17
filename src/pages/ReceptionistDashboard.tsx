import "./ReceptionistDashboard.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

import type { Patient } from "../types/Patient";
import type { Appointment } from "../types/Appointment";


export default function ReceptionistDashboard() {

  const navigate = useNavigate();

  const [patients, setPatients] =
    useState<Patient[]>([]);

  const [appointments, setAppointments] =
    useState<Appointment[]>([]);

  const [search, setSearch] =
    useState("");


  /* =====================================================
     LOAD FIREBASE DATA
  ===================================================== */

  useEffect(() => {
    loadData();
  }, []);


  const loadData = async () => {

    try {

      const patientSnapshot =
        await getDocs(
          collection(db, "patients")
        );

      const appointmentSnapshot =
        await getDocs(
          collection(db, "appointments")
        );


      setPatients(
        patientSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Patient[]
      );


      setAppointments(
        appointmentSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Appointment[]
      );

    } catch (error) {

      console.error(
        "Error loading receptionist data:",
        error
      );

    }

  };


  /* =====================================================
     SEARCH
  ===================================================== */

  const filteredPatients =
    patients.filter((patient) => {

      const searchValue =
        search.toLowerCase();

      return (
        patient.patientId
          ?.toLowerCase()
          .includes(searchValue) ||

        patient.fullName
          ?.toLowerCase()
          .includes(searchValue) ||

        patient.phone
          ?.toLowerCase()
          .includes(searchValue)
      );

    });


  /* =====================================================
     TODAY
  ===================================================== */

  const today =
    new Date()
      .toISOString()
      .split("T")[0];


  const todaysAppointments =
    appointments.filter(
      (appointment) =>
        appointment.appointmentDate === today
    );


  /* =====================================================
     COUNTS
  ===================================================== */

  const waitingCount =
    todaysAppointments.filter(
      (appointment) =>
        appointment.status === "Waiting"
    ).length;


  const completedCount =
    todaysAppointments.filter(
      (appointment) =>
        appointment.status === "Completed"
    ).length;


  /* =====================================================
     UI
  ===================================================== */

  return (

    <div className="receptionist-page">


      {/* HEADER */}

      <header className="receptionist-header">

        <div className="receptionist-header-content">

          <div>

            <h1>
              🏥 G-Sam RuraHealth
            </h1>

            <p>
              Receptionist Dashboard
            </p>

          </div>


          <button
            className="dashboard-back-btn"
            onClick={() =>
              navigate("/staff-portal")
            }
          >
            ← Staff Portal
          </button>

        </div>

      </header>


      <main className="receptionist-main">


        {/* =================================================
            STATISTICS
        ================================================= */}

        <div className="stat-grid">

          <div className="stat-card">

            <h3>Total Patients</h3>

            <h2>
              {patients.length}
            </h2>

          </div>


          <div className="stat-card">

            <h3>Today's Appointments</h3>

            <h2>
              {todaysAppointments.length}
            </h2>

          </div>


          <div className="stat-card">

            <h3>Waiting</h3>

            <h2>
              {waitingCount}
            </h2>

          </div>


          <div className="stat-card">

            <h3>Completed</h3>

            <h2>
              {completedCount}
            </h2>

          </div>

        </div>


        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <h2 className="section-title">
          Quick Actions
        </h2>


        <div className="quick-actions">


          <button
            className="quick-action"
            onClick={() =>
              navigate("/patient-registration")
            }
          >

            <div className="quick-action-icon">
              👤
            </div>

            <strong>
              Register Patient
            </strong>

            <span>
              Add a new patient to the system
            </span>

          </button>


          <button
            className="quick-action"
            onClick={() =>
              navigate("/patients")
            }
          >

            <div className="quick-action-icon">
              📋
            </div>

            <strong>
              Patients Records
            </strong>

            <span>
              View registered patients
            </span>

          </button>


          <button
            className="quick-action"
            onClick={() =>
              navigate("/book-appointment")
            }
          >

            <div className="quick-action-icon">
              📅
            </div>

            <strong>
              Book Appointment
            </strong>

            <span>
              Schedule a patient appointment
            </span>

          </button>


        </div>


        {/* =================================================
            PATIENT SEARCH
        ================================================= */}

        <div className="search-section">

          <h2 className="section-title">
            🔍 Search Patient
          </h2>


          <input
            className="search-input"
            type="text"
            placeholder="Search by Patient ID, Name or Phone"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />


          {search && (

            filteredPatients.length === 0 ? (

              <p>
                No patient found.
              </p>

            ) : (

              filteredPatients.map(
                (patient) => (

                  <div
                    className="patient-result"
                    key={patient.id}
                  >

                    <div className="patient-result-info">

                      <strong>
                        {patient.fullName}
                      </strong>

                      <p>
                        Patient ID: {patient.id}
                      </p>

                      <p>
                        Phone: {patient.phone}
                      </p>

                    </div>


                    <button
                      className="book-small-btn"
                      onClick={() =>
                        navigate(
                          `/book-appointment?patientId=${patient.id}`
                        )
                      }
                    >
                      Book Appointment
                    </button>

                  </div>

                )
              )

            )

          )}

        </div>

{/* =================================================
        TODAY'S APPOINTMENTS
    ================================================= */}

    <div className="appointments-section">

      <h2 className="section-title">
        📅 Today's Appointments
      </h2>

      <table className="appointments-table">

        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Patient ID</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {todaysAppointments.length === 0 ? (

            <tr>
              <td colSpan={6}>
                No appointments scheduled for today.
              </td>
            </tr>

          ) : (

            todaysAppointments.map(
              (appointment) => (

                <tr key={appointment.id}>

                  <td>
                    {appointment.bookingId}
                  </td>

                  <td>
                    {appointment.patientId}
                  </td>

                  <td>
                    {appointment.doctor}
                  </td>

                  <td>
                    {appointment.appointmentDate}
                  </td>

                  <td>
                    {appointment.appointmentTime}
                  </td>

                  <td>

                    <span
                      className={`status ${
                        appointment.status ===
                        "Completed"
                          ? "status-completed"
                          : "status-waiting"
                      }`}
                    >
                      {appointment.status}
                    </span>

                  </td>

                </tr>

              )
            )

          )}

        </tbody>

      </table>

    </div>

  </main>

</div>
);
}