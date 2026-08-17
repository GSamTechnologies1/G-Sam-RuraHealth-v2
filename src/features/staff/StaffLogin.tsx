import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./StaffLogin.css";

type StaffRole =
  | "receptionist"
  | "doctor"
  | "laboratory"
  | "pharmacy"
  | "administrator";

const roleNames: Record<StaffRole, string> = {
  receptionist: "Receptionist",
  doctor: "Doctor",
  laboratory: "Laboratory",
  pharmacy: "Pharmacy",
  administrator: "Administrator",
};

export default function StaffLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const roleParam = searchParams.get("role") as StaffRole | null;

  const role: StaffRole =
    roleParam && roleNames[roleParam]
      ? roleParam
      : "receptionist";

  const [facility, setFacility] = useState("");
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const roleName = roleNames[role];

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!facility || !staffId || !password) {
      alert("Please complete all fields.");
      return;
    }

    setLoading(true);

    /*
      PROTOTYPE STAFF VERIFICATION

      For now, we are only testing the workflow.
      Firebase/backend verification will come later.
    */

    const demoStaff = {
      receptionist: "AKH-REC-00142",
      doctor: "AKH-DR-00125",
      laboratory: "AKH-LAB-00307",
      pharmacy: "AKH-PH-00431",
      administrator: "AKH-ADM-00018",
    };

    setTimeout(() => {
      const expectedStaffId = demoStaff[role];

      if (staffId.trim().toUpperCase() !== expectedStaffId) {
        alert(
          `Access denied.\n\n` +
            `This Staff ID is not registered as ${roleName}.`
        );

        setLoading(false);
        return;
      }

      /*
        PROTOTYPE SUCCESS

        We will connect this to the appropriate
        dashboard after authentication is finalized.
      */

      setLoading(false);

      alert(
        `${roleName} verification successful!\n\n` +
          `Staff ID: ${expectedStaffId}\n` +
          `Facility: ${facility}`
      );

      if (role === "doctor") {
        navigate("/doctor-dashboard");
      }

      if (role === "receptionist") {
        navigate("/receptionist-dashboard");
      }

      if (role === "administrator") {
        navigate("/admin-dashboard");
      }

      if (role === "pharmacy") {
        alert("Pharmacy Dashboard will be connected next.");
      }

      if (role === "laboratory") {
        alert("Laboratory Dashboard will be connected next.");
      }
    }, 800);
  };

  return (
    <main className="staff-login-page">

      <section className="staff-login-card">

        {/* HEADER */}

        <div className="staff-login-icon">
          🏥
        </div>

        <h1>
          {roleName} Access
        </h1>

        <p className="staff-login-brand">
          G-Sam RuraHealth
        </p>

        <p className="staff-login-description">
          Health Workers Portal
        </p>

        <p className="staff-role-note">
          Authorized {roleName.toLowerCase()} personnel only.
        </p>


        {/* FORM */}

        <form onSubmit={handleLogin}>

          {/* FACILITY */}

          <div className="staff-form-group">

            <label htmlFor="facility">
              Facility / Hospital
            </label>

            <input
              id="facility"
              type="text"
              placeholder="Enter your facility or hospital"
              value={facility}
              onChange={(e) =>
                setFacility(e.target.value)
              }
              required
            />

          </div>


          {/* STAFF ID */}

          <div className="staff-form-group">

            <label htmlFor="staffId">
              Unique Staff ID
            </label>

            <input
              id="staffId"
              type="text"
              placeholder={`e.g. ${role === "doctor"
                ? "AKH-DR-00125"
                : role === "pharmacy"
                ? "AKH-PH-00431"
                : "Enter your Staff ID"
              }`}
              value={staffId}
              onChange={(e) =>
                setStaffId(e.target.value)
              }
              required
            />

          </div>


          {/* PASSWORD */}

          <div className="staff-form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="staff-login-button"
            disabled={loading}
          >
            {loading
              ? "Verifying..."
              : `Sign In as ${roleName}`}
          </button>

        </form>


        {/* BACK */}

        <button
          type="button"
          className="staff-back-button"
          onClick={() => navigate("/staff-portal")}
        >
          ← Back to Staff Portal
        </button>


        {/* SECURITY */}

        <div className="staff-security">
          🔒 Facility-issued credentials • Secure access
        </div>

      </section>

    </main>
  );
}