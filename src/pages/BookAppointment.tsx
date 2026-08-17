import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

export default function BookAppointment() {
  const [patientId, setPatientId] = useState("");
  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [reason, setReason] = useState("");

  const [patients, setPatients] = useState<any[]>([]);

  // =====================================================
  // LOAD PATIENTS
  // =====================================================

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "patients")
        );

        const patientList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPatients(patientList);

      } catch (error) {
        console.error(
          "Error loading patients:",
          error
        );
      }
    };

    fetchPatients();
  }, []);

  // =====================================================
  // GENERATE BOOKING ID
  // =====================================================

  const generateBookingId = () => {
    return `APT-${Date.now()}`;
  };

  // =====================================================
  // BOOK APPOINTMENT
  // =====================================================

  const handleBookAppointment = async () => {
    if (
      !patientId ||
      !department ||
      !doctor ||
      !appointmentDate ||
      !appointmentTime ||
      !reason
    ) {
      alert("Please complete all fields.");
      return;
    }

    try {
      // Find patient using G-Sam Patient ID
      const patientExists = patients.find(
        (patient) =>
          patient.patientId?.toLowerCase() ===
          patientId.trim().toLowerCase()
      );

      if (!patientExists) {
        alert("Patient ID not found.");
        return;
      }

      // Generate separate Booking ID
      const bookingId = generateBookingId();

      const newAppointment = {
        bookingId: bookingId,

        patientId: patientExists.patientId,

        department: department,

        doctor: doctor,

        appointmentDate: appointmentDate,

        appointmentTime: appointmentTime,

        reason: reason,

        status: "Waiting",

        createdAt: new Date().toISOString(),
      };

      // Save appointment to Firestore
      console.log("ABOUT TO SAVE APPOINTMENT:", newAppointment);

const appointmentRef = await addDoc(
  collection(db, "appointments"),
  newAppointment
);

console.log(
  "FIRESTORE APPOINTMENT CREATED:",
  appointmentRef.id
);
      alert(
        `Appointment Booked Successfully!\n\n` +
        `Booking ID: ${bookingId}\n` +
        `Patient ID: ${patientExists.patientId}`
      );

      // Clear form
      setPatientId("");
      setDepartment("");
      setDoctor("");
      setAppointmentDate("");
      setAppointmentTime("");
      setReason("");

    } catch (error) {
      console.error(
        "ERROR BOOKING APPOINTMENT:",
        error
      );

      alert(
        "Appointment could not be booked. " +
        "Please check your Firebase connection and try again."
      );
    }
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "700px",
        margin: "auto",
        fontFamily: "Arial",
      }}
    >
      <h2>📅 Book Appointment</h2>

      <input
        type="text"
        placeholder="Patient ID"
        value={patientId}
        onChange={(e) =>
          setPatientId(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
        }}
      />

      <select
        value={department}
        onChange={(e) =>
          setDepartment(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
        }}
      >
        <option value="">
          Select Department
        </option>

        <option>
          General Outpatient
        </option>

        <option>
          Pediatrics
        </option>

        <option>
          Obstetrics & Gynecology
        </option>

        <option>
          Internal Medicine
        </option>

        <option>
          Surgery
        </option>

        <option>
          Dental
        </option>

        <option>
          Laboratory
        </option>
      </select>

      <input
        type="text"
        placeholder="Doctor"
        value={doctor}
        onChange={(e) =>
          setDoctor(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
        }}
      />

      <input
        type="date"
        value={appointmentDate}
        onChange={(e) =>
          setAppointmentDate(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
        }}
      />

      <input
        type="time"
        value={appointmentTime}
        onChange={(e) =>
          setAppointmentTime(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
        }}
      />

      <textarea
        placeholder="Reason for Visit"
        value={reason}
        onChange={(e) =>
          setReason(e.target.value)
        }
        rows={5}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
        }}
      />

      <button
        onClick={handleBookAppointment}
        style={{
          padding: "12px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Book Appointment
      </button>
    </div>
  );
}