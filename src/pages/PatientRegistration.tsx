import { useState } from "react";
import "../components/PatientRegistration/PatientRegistration.css";

import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

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
const [isSubmitting, setIsSubmitting] = useState(false);

const generatePatientId = () => {
  return `GSRH-${Date.now()}`;
};

  const calculateAge = (dob: string) => {
  const birthDate = new Date(dob);
  const today = new Date();

  let months =
    (today.getFullYear() - birthDate.getFullYear()) * 12 +
    (today.getMonth() - birthDate.getMonth());

  if (today.getDate() < birthDate.getDate()) {
    months--;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths} month${
      remainingMonths !== 1 ? "s" : ""
    }`;
  }

  if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? "s" : ""}`;
  }

  return `${years} year${
    years !== 1 ? "s" : ""
  }, ${remainingMonths} month${
    remainingMonths !== 1 ? "s" : ""
  }`;
};

  const handleRegister = async () => {
  if (isSubmitting) return;

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

  try {
    setIsSubmitting(true);

    // Check if this patient already exists
    const patientsRef = collection(db, "patients");

    const duplicateQuery = query(
      patientsRef,
      where("fullName", "==", fullName.trim()),
      where("dateOfBirth", "==", dateOfBirth),
      where("phone", "==", phone)
    );

    const duplicateSnapshot = await getDocs(duplicateQuery);

    if (!duplicateSnapshot.empty) {
      const existingPatient = duplicateSnapshot.docs[0].data();

      alert(
        `This patient is already registered.\n\nPatient ID: ${
          existingPatient.patientId
        }\n\nPlease use the existing Patient ID instead of registering again.`
      );

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

    await addDoc(patientsRef, newPatient);

    alert(
      `Patient Registered Successfully!\n\nPatient ID: ${newPatient.patientId}`
    );

    // Clear form
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

  } catch (error) {
    console.error("Patient registration error:", error);

    alert(
      "Patient registration failed. Please try again."
    );

  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="registration-card">

      <h2>🩺 Patient Registration</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) =>
          setFullName(e.target.value)
        }
      />

      <input
        type="date"
        value={dateOfBirth}
        onChange={(e) =>
          setDateOfBirth(e.target.value)
        }
      />

      <select
        value={gender}
        onChange={(e) =>
          setGender(e.target.value)
        }
      >
        <option value="">
          Select Gender
        </option>

        <option value="Male">
          Male
        </option>

        <option value="Female">
          Female
        </option>
      </select>

      <input
        type="text"
        maxLength={11}
        placeholder="Phone Number"
        value={phone}
        onChange={(e) =>
          setPhone(
            e.target.value.replace(/\D/g, "")
          )
        }
      />

      <input
        type="text"
        placeholder="Village"
        value={village}
        onChange={(e) =>
          setVillage(e.target.value)
        }
      />

      <select
        value={bloodGroup}
        onChange={(e) =>
          setBloodGroup(e.target.value)
        }
      >
        <option value="">
          Blood Group
        </option>

        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
      </select>

      <input
        type="text"
        placeholder="Occupation"
        value={occupation}
        onChange={(e) =>
          setOccupation(e.target.value)
        }
      />

      <select
        value={maritalStatus}
        onChange={(e) =>
          setMaritalStatus(e.target.value)
        }
      >
        <option value="">
          Marital Status
        </option>

        <option value="Single">
          Single
        </option>

        <option value="Married">
          Married
        </option>

        <option value="Divorced">
          Divorced
        </option>

        <option value="Widowed">
          Widowed
        </option>
      </select>

      <input
        type="text"
        placeholder="Next of Kin"
        value={nextOfKin}
        onChange={(e) =>
          setNextOfKin(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Relationship"
        value={relationship}
        onChange={(e) =>
          setRelationship(e.target.value)
        }
      />

      <input
        type="tel"
        placeholder="Next of Kin Phone"
        maxLength={11}
        value={nextOfKinPhone}
        onChange={(e) =>
          setNextOfKinPhone(
            e.target.value.replace(/\D/g, "")
          )
        }
      />

      <button
  onClick={handleRegister}
  disabled={isSubmitting}
>
  {isSubmitting ? "Registering..." : "Register Patient"}
</button>

    </div>
  );
}