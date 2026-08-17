import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

import type { Appointment } from "../types/Appointment";
import type { Patient } from "../types/Patient";

export default function DoctorsDashboard() {
  const navigate = useNavigate();

  const [appointments, setAppointments] =
    useState<Appointment[]>([]);

  const [patients, setPatients] =
    useState<Patient[]>([]);

  /* =====================================================
     LOAD APPOINTMENTS + PATIENTS
  ===================================================== */

  const loadData = async () => {
    try {
      const appointmentSnapshot =
        await getDocs(
          collection(db, "appointments")
        );

      const patientSnapshot =
        await getDocs(
          collection(db, "patients")
        );

      const appointmentData =
        appointmentSnapshot.docs.map(
          (docItem) => ({
            id: docItem.id,
            ...docItem.data(),
          })
        ) as Appointment[];

      const patientData =
        patientSnapshot.docs.map(
          (docItem) => ({
            id: docItem.id,
            ...docItem.data(),
          })
        ) as Patient[];

      setAppointments(appointmentData);
      setPatients(patientData);

    } catch (error) {
      console.error(
        "Error loading doctor data:",
        error
      );
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
     FIND PATIENT
  ===================================================== */

  const getPatient = (
    patientId: string
  ) => {
    return patients.find(
      (patient) =>
        patient.patientId === patientId
    );
  };

  /* =====================================================
     COUNTS
  ===================================================== */

  const waitingCount =
    todaysAppointments.filter(
      (appointment) =>
        appointment.status === "Waiting"
    ).length;

  const consultationCount =
    todaysAppointments.filter(
      (appointment) =>
        appointment.status ===
        "In Consultation"
    ).length;

  const completedCount =
    todaysAppointments.filter(
      (appointment) =>
        appointment.status === "Completed"
    ).length;

  /* =====================================================
     UPDATE APPOINTMENT STATUS
  ===================================================== */

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    try {
      await updateDoc(
        doc(db, "appointments", id),
        {
          status,
        }
      );

      await loadData();

    } catch (error) {
      console.error(
        "Error updating appointment:",
        error
      );
    }
  };

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7f9",
        fontFamily:
          "Arial, Helvetica, sans-serif",
      }}
    >

      {/* HEADER */}

      <header
        style={{
          background: "#0B8457",
          color: "#fff",
          padding: "20px 30px",
        }}
      >

        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            gap: "20px",
          }}
        >

          <div>

            <h1
              style={{
                margin: 0,
                fontSize: "28px",
              }}
            >
              🏥 G-Sam RuraHealth
            </h1>

            <p
              style={{
                margin:
                  "6px 0 0",
                opacity: 0.9,
              }}
            >
              Doctor Dashboard
            </p>

          </div>

          <button
            onClick={() =>
              navigate(
                "/staff-portal"
              )
            }
            style={{
              padding:
                "10px 18px",
              border: "none",
              borderRadius: "8px",
              background: "#fff",
              color: "#0B8457",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            ← Staff Portal
          </button>

        </div>

      </header>


      {/* MAIN */}

      <main
        style={{
          maxWidth: "1200px",
          margin: "auto",
          padding: "30px 20px",
        }}
      >

        <h2>
          👨‍⚕️ Doctor's Workspace
        </h2>

        <p
          style={{
            color: "#666",
          }}
        >
          Manage today's
          appointments and
          patient consultations.
        </p>


        {/* STATISTICS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginTop: "25px",
            marginBottom: "35px",
          }}
        >

          <div style={statCardStyle}>
            <h3>
              Today's Appointments
            </h3>

            <h1
              style={{
                color: "#0B8457",
                margin: 0,
              }}
            >
              {todaysAppointments.length}
            </h1>
          </div>


          <div style={statCardStyle}>
            <h3>
              Waiting
            </h3>

            <h1
              style={{
                color: "#d97706",
                margin: 0,
              }}
            >
              {waitingCount}
            </h1>
          </div>


          <div style={statCardStyle}>
            <h3>
              In Consultation
            </h3>

            <h1
              style={{
                color: "#2563eb",
                margin: 0,
              }}
            >
              {consultationCount}
            </h1>
          </div>


          <div style={statCardStyle}>
            <h3>
              Completed
            </h3>

            <h1
              style={{
                color: "#16a34a",
                margin: 0,
              }}
            >
              {completedCount}
            </h1>
          </div>

        </div>


        {/* APPOINTMENTS */}

        <div
          style={{
            background: "#fff",
            borderRadius: "14px",
            padding: "20px",
            boxShadow:
              "0 3px 12px rgba(0,0,0,.08)",
            overflowX: "auto",
          }}
        >

          <h2>
            📅 Today's Appointments
          </h2>

          <table
            style={{
              width: "100%",
              borderCollapse:
                "collapse",
              marginTop: "15px",
              minWidth: "950px",
            }}
          >

            <thead>

              <tr
                style={{
                  background:
                    "#f0f4f2",
                }}
              >

                <th style={thStyle}>
                  Patient
                </th>

                <th style={thStyle}>
                  Patient ID
                </th>

                <th style={thStyle}>
                  Doctor
                </th>

                <th style={thStyle}>
                  Time
                </th>

                <th style={thStyle}>
                  Status
                </th>

                <th style={thStyle}>
                  Update
                </th>

                <th style={thStyle}>
                  Consultation
                </th>

              </tr>

            </thead>


            <tbody>

              {todaysAppointments.length ===
              0 ? (

                <tr>

                  <td
                    colSpan={7}
                    style={{
                      textAlign:
                        "center",
                      padding:
                        "30px",
                      color:
                        "#777",
                    }}
                  >
                    No Appointments
                    for Today
                  </td>

                </tr>

              ) : (

                todaysAppointments.map(
                  (appointment) => {

                    const patient =
                      getPatient(
                        appointment.patientId
                      );

                    return (

                      <tr
                        key={
                          appointment.id
                        }
                      >

                        {/* PATIENT */}

                        <td style={tdStyle}>

                          <strong>
                            {patient
                              ?.fullName ||
                              "Patient not found"}
                          </strong>

                        </td>


                        {/* PATIENT ID */}

                        <td style={tdStyle}>
                          {
                            appointment.patientId
                          }
                        </td>


                        {/* DOCTOR */}

                        <td style={tdStyle}>
                          {
                            appointment.doctor
                          }
                        </td>


                        {/* TIME */}

                        <td style={tdStyle}>
                          {
                            appointment.appointmentTime
                          }
                        </td>


                        {/* STATUS */}

                        <td style={tdStyle}>

                          <span
                            style={{
                              padding:
                                "6px 10px",
                              borderRadius:
                                "20px",

                              background:
                                appointment.status ===
                                "Completed"
                                  ? "#dcfce7"
                                  : appointment.status ===
                                    "In Consultation"
                                  ? "#dbeafe"
                                  : "#fef3c7",

                              color:
                                appointment.status ===
                                "Completed"
                                  ? "#166534"
                                  : appointment.status ===
                                    "In Consultation"
                                  ? "#1d4ed8"
                                  : "#92400e",

                              fontWeight:
                                "600",

                              fontSize:
                                "13px",
                            }}
                          >
                            {
                              appointment.status
                            }
                          </span>

                        </td>


                        {/* STATUS BUTTONS */}

                        <td style={tdStyle}>

                          <div
                            style={{
                              display:
                                "flex",
                              gap: "6px",
                              flexWrap:
                                "wrap",
                            }}
                          >

                            <button
                              onClick={() =>
                                updateStatus(
                                  appointment.id!,
                                  "Waiting"
                                )
                              }
                            >
                              Waiting
                            </button>

                            <button
                              onClick={() =>
                                updateStatus(
                                  appointment.id!,
                                  "In Consultation"
                                )
                              }
                            >
                              Consult
                            </button>

                            <button
                              onClick={() =>
                                updateStatus(
                                  appointment.id!,
                                  "Completed"
                                )
                              }
                            >
                              Complete
                            </button>

                          </div>

                        </td>


                        {/* CONSULTATION */}

                        <td style={tdStyle}>

                          <button
                            onClick={() =>
                              navigate(
                                `/consultation/${appointment.id}`
                              )
                            }
                            style={{
                              background:
                                "#0B8457",
                              color:
                                "#fff",
                              border:
                                "none",
                              padding:
                                "9px 14px",
                              borderRadius:
                                "7px",
                              cursor:
                                "pointer",
                              fontWeight:
                                "600",
                            }}
                          >
                            🩺 Open
                          </button>

                        </td>

                      </tr>

                    );
                  }
                )

              )}

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}


/* =====================================================
   STYLES
===================================================== */

const statCardStyle: React.CSSProperties = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow:
    "0 3px 10px rgba(0,0,0,.08)",
};

const thStyle: React.CSSProperties = {
  padding: "12px",
  textAlign: "left",
  borderBottom:
    "1px solid #ddd",
};

const tdStyle: React.CSSProperties = {
  padding: "12px",
  borderBottom:
    "1px solid #eee",
};