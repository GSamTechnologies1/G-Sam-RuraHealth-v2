import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

export default function EditPatient() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  useEffect(() => {

    const loadPatient = async () => {

      if (!id) return;

      try {

        const patientRef = doc(
          db,
          "patients",
          id
        );

        const patientSnapshot =
          await getDoc(patientRef);

        if (!patientSnapshot.exists()) {

          alert("Patient record not found.");

          navigate("/patients");

          return;
        }

        const patient =
          patientSnapshot.data();

        setFullName(patient.fullName || "");
        setDateOfBirth(patient.dateOfBirth || "");
        setGender(patient.gender || "");
        setPhone(patient.phone || "");
        setVillage(patient.village || "");
        setBloodGroup(patient.bloodGroup || "");
        setOccupation(patient.occupation || "");
        setMaritalStatus(patient.maritalStatus || "");
        setNextOfKin(patient.nextOfKin || "");
        setRelationship(patient.relationship || "");
        setNextOfKinPhone(
          patient.nextOfKinPhone || ""
        );

      } catch (error) {

        console.error(
          "Error loading patient:",
          error
        );

        alert(
          "Unable to load patient record."
        );

      } finally {

        setLoading(false);

      }

    };

    loadPatient();

  }, [id, navigate]);


  const calculateAge = (dob: string) => {

    const birthDate = new Date(dob);
    const today = new Date();

    let months =
      (today.getFullYear() -
        birthDate.getFullYear()) *
        12 +
      (today.getMonth() -
        birthDate.getMonth());

    if (
      today.getDate() <
      birthDate.getDate()
    ) {
      months--;
    }

    const years =
      Math.floor(months / 12);

    const remainingMonths =
      months % 12;

    if (years === 0) {

      return `${remainingMonths} month${
        remainingMonths !== 1
          ? "s"
          : ""
      }`;

    }

    if (remainingMonths === 0) {

      return `${years} year${
        years !== 1
          ? "s"
          : ""
      }`;

    }

    return `${years} year${
      years !== 1
        ? "s"
        : ""
    }, ${remainingMonths} month${
      remainingMonths !== 1
        ? "s"
        : ""
    }`;

  };


  const handleUpdate = async () => {

    if (!id) return;

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

      alert(
        "Please complete all fields."
      );

      return;
    }

    setSaving(true);

    try {

      const patientRef = doc(
        db,
        "patients",
        id
      );

      await updateDoc(
        patientRef,
        {
          fullName,
          dateOfBirth,
          age: calculateAge(
            dateOfBirth
          ),
          gender,
          phone,
          village,
          bloodGroup,
          occupation,
          maritalStatus,
          nextOfKin,
          relationship,
          nextOfKinPhone,
        }
      );

      alert(
        "Patient record updated successfully."
      );

      navigate("/patients");

    } catch (error) {

      console.error(
        "Error updating patient:",
        error
      );

      alert(
        "Unable to update patient record."
      );

    } finally {

      setSaving(false);

    }

  };


  if (loading) {

    return (
      <div style={{ padding: "30px" }}>
        Loading patient record...
      </div>
    );

  }


  return (

    <div
      style={{
        maxWidth: "700px",
        margin: "30px auto",
        padding: "25px",
      }}
    >

      <h2>
        ✏️ Edit Patient
      </h2>

      <p>
        Update patient information below.
      </p>


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
            e.target.value.replace(
              /\D/g,
              ""
            )
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
        onChange={(e) =>
          setOccupation(
            e.target.value
          )
        }
      />


      <select
        value={maritalStatus}
        onChange={(e) =>
          setMaritalStatus(
            e.target.value
          )
        }
      >
        <option value="">
          Marital Status
        </option>

        <option>Single</option>
        <option>Married</option>
        <option>Divorced</option>
        <option>Widowed</option>

      </select>


      <input
        type="text"
        placeholder="Next of Kin"
        value={nextOfKin}
        onChange={(e) =>
          setNextOfKin(
            e.target.value
          )
        }
      />


      <input
        type="text"
        placeholder="Relationship"
        value={relationship}
        onChange={(e) =>
          setRelationship(
            e.target.value
          )
        }
      />


      <input
        type="tel"
        maxLength={11}
        placeholder="Next of Kin Phone"
        value={nextOfKinPhone}
        onChange={(e) =>
          setNextOfKinPhone(
            e.target.value.replace(
              /\D/g,
              ""
            )
          )
        }
      />


      <button
        onClick={handleUpdate}
        disabled={saving}
      >
        {saving
          ? "Saving..."
          : "💾 Save Changes"}
      </button>


      <button
        onClick={() =>
          navigate("/patients")
        }
        disabled={saving}
      >
        ← Cancel
      </button>

    </div>

  );
}