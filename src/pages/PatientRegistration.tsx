import { useState } from "react";
import "../components/PatientRegistration/PatientRegistration.css";

import { patients } from "../data/patients";

import { db } from "../firebase/firebaseConfig";

import { collection, addDoc } from "firebase/firestore";

export default function PatientRegistration() {
  const [fullName, setFullName] = useState("");

const [dateOfBirth, setDateOfBirth] = useState("");

const [gender, setGender] = useState("");

const [phone, setPhone] = useState("");

const [village, setVillage] = useState("");

const [bloodGroup, setBloodGroup] = useState("");

const [occupation, setOccupation] = useState("");

const [maritalStatus, setMaritalStatus] = useState("");

const [nextOfKin, setNextOfKin] = useState("");

const [relationship, setRelationship] = useState("");

const [nextOfKinPhone, setNextOfKinPhone] = useState("");

const generatePatientId = () => {
  return `GSRH-${String(patients.length + 1).padStart(6, "0")}`;
};

const calculateAge = (dob: string) => {
  const birthDate = new Date(dob);

  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 &&
      today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

  const handleRegister = async () => {

  if (
    !fullName ||
    !dateOfBirth ||
    !gender ||
    !phone ||
    !village ||
    !bloodGroup ||
    !occupation ||
    !maritalStatus ||
    !nextOfKin ||
    !relationship ||
    !nextOfKinPhone
  ) {
    alert("Please complete all fields.");
    return;
  }

 const newPatient = {
  patientId: generatePatientId(),
  registrationDate: new Date().toLocaleDateString(),
  fullName,
  dateOfBirth,
  age: calculateAge(dateOfBirth),
  gender,
  phone,
  village,
  bloodGroup,
  occupation,
  maritalStatus,
  nextOfKin,
  relationship,
  nextOfKinPhone,
};

  await addDoc(

  collection(db, "patients"),

  newPatient

);

  console.log(newPatient);

  alert(
  `Patient Registered Successfully!

Patient ID: ${newPatient.patientId}

Registration Date: ${newPatient.registrationDate}`
);

  setFullName("");
  setDateOfBirth("");
  setGender("");
  setPhone("");
  setVillage("");
  setBloodGroup("");
  setOccupation("");
  setMaritalStatus("");
  setNextOfKin("");
  setRelationship("");
  setNextOfKinPhone("");

};

  return (
    <div className="registration-container">

      <div className="registration-card">

        <h2>🩺 Patient Registration</h2>

        <input
  type="text"
  placeholder="Full Name"
  value={fullName}
  onChange={(e) => setFullName(e.target.value)}
/>

<input
  type="date"
  value={dateOfBirth}
  onChange={(e) => setDateOfBirth(e.target.value)}
/>

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <input
  type="text"
  maxLength={11}
  placeholder="Phone Number"
  value={phone}
  onChange={(e) =>
    setPhone(e.target.value.replace(/\D/g, ""))
  }
/>

        <input
          type="text"
          placeholder="Village"
          value={village}
          onChange={(e) => setVillage(e.target.value)}
        />

        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
        >
          <option value="">Blood Group</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>
        </select>

<input
  type="text"
  placeholder="Occupation"
  value={occupation}
  onChange={(e) => setOccupation(e.target.value)}
/>

<select
  value={maritalStatus}
  onChange={(e) => setMaritalStatus(e.target.value)}
>
  <option value="">Marital Status</option>
  <option>Single</option>
  <option>Married</option>
  <option>Divorced</option>
  <option>Widowed</option>
</select>

<input
  type="text"
  placeholder="Next of Kin"
  value={nextOfKin}
  onChange={(e) => setNextOfKin(e.target.value)}
/>

<input
  type="text"
  placeholder="Relationship"
  value={relationship}
  onChange={(e) => setRelationship(e.target.value)}
/>

<input
  type="tel"
  placeholder="Next of Kin Phone"
  value={nextOfKinPhone}
  maxLength={11}
  onChange={(e) =>
    setNextOfKinPhone(
      e.target.value.replace(/\D/g, "")
    )
  }
/>

        <button onClick={handleRegister}>
          Register Patient
        </button>

      </div>

    </div>
  );
}