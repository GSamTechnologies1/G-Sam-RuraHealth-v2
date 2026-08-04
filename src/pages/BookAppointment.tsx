import { useEffect, useState } from "react";
import type { Appointment } from "../data/appointments";
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

  useEffect(() => {
    const fetchPatients = async () => {
      const snapshot = await getDocs(collection(db, "patients"));

      const patientList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPatients(patientList);
    };

    fetchPatients();
  }, []);

  const generateAppointmentId = () => {
    return `APT-${Date.now()}`;
  };

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

    const patientExists = patients.find(
      (patient) =>
        patient.patientId === patientId ||
        patient.id === patientId
    );

    if (!patientExists) {
      alert("Patient ID not found.");
      return;
    }

    const newAppointment: Appointment = {
      appointmentId: generateAppointmentId(),
      patientId,
      department,
      doctor,
      appointmentDate,
      appointmentTime,
      reason,
      status: "Pending",
    };

    await addDoc(
      collection(db, "appointments"),
      newAppointment
    );

    alert(
      `Appointment Booked Successfully!

Booking ID: ${newAppointment.appointmentId}`
    );

    setPatientId("");
    setDepartment("");
    setDoctor("");
    setAppointmentDate("");
    setAppointmentTime("");
    setReason("");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>📅 Book Appointment</h1>

      <input
        type="text"
        placeholder="Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
      />

      <br />
      <br />

      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        <option value="">Select Department</option>
        <option>General Outpatient</option>
        <option>Pediatrics</option>
        <option>Obstetrics & Gynecology</option>
        <option>Internal Medicine</option>
        <option>Surgery</option>
        <option>Dental</option>
        <option>Laboratory</option>
      </select>

      <br />
      <br />

      <input
        type="text"
        placeholder="Doctor"
        value={doctor}
        onChange={(e) => setDoctor(e.target.value)}
      />

      <br />
      <br />

      <input
        type="date"
        value={appointmentDate}
        onChange={(e) => setAppointmentDate(e.target.value)}
      />

      <br />
      <br />

      <input
        type="time"
        value={appointmentTime}
        onChange={(e) => setAppointmentTime(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Reason for Visit"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleBookAppointment}>
        Book Appointment
      </button>
    </div>
  );
}