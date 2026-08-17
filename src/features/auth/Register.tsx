import { useState, type FormEvent } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebaseConfig";
import "./Register.css";

const akwaIbomLGAs = [
  "Abak",
  "Eastern Obolo",
  "Eket",
  "Esit Eket",
  "Essien Udim",
  "Etim Ekpo",
  "Etinan",
  "Ibeno",
  "Ibesikpo Asutan",
  "Ibiono Ibom",
  "Ika",
  "Ikono",
  "Ikot Abasi",
  "Ikot Ekpene",
  "Ini",
  "Itu",
  "Mbo",
  "Mkpat Enin",
  "Nsit Atai",
  "Nsit Ibom",
  "Nsit Ubium",
  "Obot Akara",
  "Okobo",
  "Onna",
  "Oron",
  "Oruk Anam",
  "Udung Uko",
  "Ukanafun",
  "Uruan",
  "Urue-Offong/Oruko",
  "Uyo",
];

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    state: "Akwa Ibom State",
    lga: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    if (!formData.lga) {
      setErrorMessage("Please select your Local Government Area.");
      return;
    }

    if (!formData.email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      /*
       * STEP 1
       * Create the Firebase Authentication account.
       */
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password
      );

      const user = userCredential.user;

      /*
       * STEP 2
       * Save the user's display name in Firebase Authentication.
       */
      await updateProfile(user, {
        displayName: formData.fullName.trim(),
      });

      /*
       * STEP 3
       * Save the citizen profile in Firestore.
       */
      await setDoc(doc(db, "citizens", user.uid), {
        uid: user.uid,
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        state: "Akwa Ibom State",
        lga: formData.lga,
        role: "patient",
        accountType: "citizen",
        createdAt: serverTimestamp(),
      });

      setSuccessMessage(
        "Account created successfully. Welcome to G-Sam RuraHealth!"
      );

      /*
       * Give Firebase a moment to finish updating the account
       * before moving the citizen to the dashboard.
       */
      setTimeout(() => {
        navigate("/citizen-dashboard");
      }, 1000);
    } catch (error: any) {
      console.error("Citizen registration error:", error);

      let message =
        "Account creation failed. Please try again.";

      switch (error?.code) {
        case "auth/email-already-in-use":
          message =
            "This email address is already registered. Please sign in instead.";
          break;

        case "auth/invalid-email":
          message =
            "The email address entered is not valid.";
          break;

        case "auth/weak-password":
          message =
            "The password is too weak. Please use at least 6 characters.";
          break;

        case "auth/network-request-failed":
          message =
            "Network connection failed. Please check your internet connection and try again.";
          break;

        case "auth/operation-not-allowed":
          message =
            "Email/password authentication is not enabled in Firebase.";
          break;

        case "auth/configuration-not-found":
          message =
            "Firebase Authentication is not properly configured.";
          break;

        case "permission-denied":
          message =
            "Your account was created, but the citizen profile could not be saved because of Firestore permissions.";
          break;

        default:
          message =
            error?.message ||
            "Account creation failed. Please try again.";
      }

      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-page">

      <button
        type="button"
        className="register-back"
        onClick={() => navigate("/auth")}
      >
        ← Back
      </button>

      <section className="register-card">

        <div className="register-logo">
          🏥
        </div>

        <h1>Create Citizen Account</h1>

        <p className="register-subtitle">
          G-Sam RuraHealth
        </p>

        <p className="register-description">
          Create your secure citizen account to access digital healthcare
          services.
        </p>

        {errorMessage && (
          <div className="register-error">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="register-success">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* FULL NAME */}

          <div className="form-group">
            <label htmlFor="fullName">
              Full Name
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* PHONE */}

          <div className="form-group">
            <label htmlFor="phone">
              Phone Number
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="08012345678"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* EMAIL */}

          <div className="form-group">
            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* STATE */}

          <div className="form-group">
            <label htmlFor="state">
              State
            </label>

            <input
              id="state"
              name="state"
              type="text"
              value="Akwa Ibom State"
              readOnly
            />
          </div>

          {/* LGA */}

          <div className="form-group">
            <label htmlFor="lga">
              Local Government Area
            </label>

            <select
              id="lga"
              name="lga"
              value={formData.lga}
              onChange={handleChange}
              required
            >
              <option value="">
                Select your LGA
              </option>

              {akwaIbomLGAs.map((lga) => (
                <option
                  key={lga}
                  value={lga}
                >
                  {lga}
                </option>
              ))}
            </select>
          </div>

          {/* PASSWORD */}

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          {/* CONFIRM PASSWORD */}

          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          {/* TERMS */}

          <label className="terms">
            <input
              type="checkbox"
              required
            />

            <span>
              I agree to the Terms of Service and Privacy Policy.
            </span>
          </label>

          {/* SUBMIT */}

          <button
            type="submit"
            className="register-submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <div className="register-login">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/auth")}
          >
            Sign In
          </button>
        </div>

        <div className="register-security">
          🔒 Secure • Private • Trusted
        </div>

      </section>
    </main>
  );
}