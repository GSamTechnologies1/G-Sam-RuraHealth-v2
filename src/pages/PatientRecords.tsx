import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


export default function PatientRecords() {
  const [patients, setPatients] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      const querySnapshot = await getDocs(
        collection(db, "patients")
      );

      const patientList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPatients(patientList);
    };

    fetchPatients();
  }, []);

  return (
    <div style={{ padding: "20px" }}>

      <h2>🏥 G-Sam RuraHealth</h2>

      <h3>Patient Records</h3>

      <table
        border={1}
        cellPadding={10}
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >

        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {patients.map((patient) => (

            <tr key={patient.id}>

              <td>
                {patient.patientId}
              </td>

              <td>
                {patient.fullName}
              </td>

              <td>
                {patient.age}
              </td>

              <td>
                {patient.gender}
              </td>

              <td>
                {patient.phone}
              </td>

              <td>

                <button
                  onClick={() =>
                    navigate(
                      `/edit-patient/${patient.id}`
                    )
                  }
                >
                  ✏️ Edit
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}