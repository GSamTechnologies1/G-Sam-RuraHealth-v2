import "./AuthPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";

type AuthMode = "signin" | "signup";

const AKWA_IBOM_LGAS = [
  "Abak",
  "Eastern Obolo",
  "Eket",
  "Esit Eket",
  "Essien Udim",
  "Etim Ekpo",
  "Etinan",
  "Ibeno",
  "Ibesikpo Asutan",
  "Ibiono-Ibom",
  "Ika",
  "Ikono",
  "Ikot Abasi",
  "Ikot Ekpene",
  "Ini",
  "Itu",
  "Mbo",
  "Mkpat-Enin",
  "Nsit-Atai",
  "Nsit-Ibom",
  "Nsit-Ubium",
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

export default function AuthPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<AuthMode>("signin");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    state: "Akwa Ibom",
    lga: "",
    password: "",
    confirmPassword: "",
  });

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =====================================================
     CREATE CITIZEN ACCOUNT
     ===================================================== */

const handleSignup = async () => {
  if (
    !formData.fullName ||
    !formData.phone ||
    !formData.email ||
    !formData.state ||
    !formData.lga ||
    !formData.password ||
    !formData.confirmPassword
  ) {
    alert("Please complete all required fields.");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  if (formData.password.length < 6) {
    alert("Password must contain at least 6 characters.");
    return;
  }

  try {
    setLoading(true);

    /* CREATE FIREBASE AUTH ACCOUNT */

    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password
      );

    const user = userCredential.user;

    /* SAVE CITIZEN PROFILE */

    await setDoc(doc(db, "citizens", user.uid), {
      uid: user.uid,
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      state: "Akwa Ibom",
      lga: formData.lga,
      role: "citizen",
      accountType: "citizen",
      createdAt: new Date().toISOString(),
    });

    /* SEND EMAIL VERIFICATION */

    await sendEmailVerification(user);

    alert(
      "Account created successfully.\n\n" +
        "A verification email has been sent to your email address."
    );

    /* GO TO CITIZEN DASHBOARD */

    navigate("/citizen-dashboard");
  } catch (error: any) {
    console.error("Citizen signup error:", error);

    if (error?.code === "auth/email-already-in-use") {
      alert(
        "This email address is already registered. Please sign in instead."
      );
    } else if (error?.code === "auth/invalid-email") {
      alert("Please enter a valid email address.");
    } else if (error?.code === "auth/weak-password") {
      alert("Password must contain at least 6 characters.");
    } else if (error?.code === "auth/network-request-failed") {
      alert(
        "Firebase could not connect to the authentication server. Please check your internet connection and try again."
      );
    } else if (error?.code === "permission-denied") {
      alert(
        "The account was created, but the citizen profile could not be saved. Please check Firestore permissions."
      );
    } else {
      alert(
        error?.message ||
          "Account creation failed. Please try again."
      );
    }
  } finally {
    setLoading(false);
  }
};

  /* =====================================================
     CITIZEN SIGN IN
     ===================================================== */

  const handleSignin = async () => {
    if (!loginEmail || !loginPassword) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        loginEmail.trim(),
        loginPassword
      );

      /* SUCCESSFUL CITIZEN LOGIN */

      navigate("/citizen-dashboard");
    } catch (error: any) {
      console.error("CITIZEN LOGIN ERROR:", error);

      if (error.code === "auth/invalid-credential") {
        alert(
          "Incorrect email or password."
        );
      } else if (error.code === "auth/user-not-found") {
        alert(
          "No citizen account was found with this email."
        );
      } else if (error.code === "auth/wrong-password") {
        alert(
          "Incorrect password."
        );
      } else {
        alert(
          "Sign in failed.\n\n" +
            "Please check your internet connection and try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     FORM SUBMISSION
     ===================================================== */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (mode === "signup") {
      await handleSignup();
    } else {
      await handleSignin();
    }
  };

  return (
    <main className="auth-page">

      {/* BACK TO LANDING */}

      <button
        type="button"
        className="auth-back"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>


      {/* AUTH CARD */}

      <section className="auth-card">

        {/* LOGO */}

        <div className="auth-logo">
          🏥
        </div>

        <h1>
          G-Sam RuraHealth
        </h1>

        <p className="auth-subtitle">
          Citizen Portal
        </p>

        <p className="auth-description">
          Access trusted healthcare services
          for you and your community.
        </p>


        {/* AUTH TABS */}

        <div className="auth-tabs">

          <button
            type="button"
            className={
              mode === "signin"
                ? "auth-tab active"
                : "auth-tab"
            }
            onClick={() => setMode("signin")}
          >
            Sign In
          </button>

          <button
            type="button"
            className={
              mode === "signup"
                ? "auth-tab active"
                : "auth-tab"
            }
            onClick={() => setMode("signup")}
          >
            Create Account
          </button>

        </div>


        {/* FORM */}

        <form onSubmit={handleSubmit}>

          {/* =========================
              CREATE ACCOUNT
          ========================= */}

          {mode === "signup" && (
            <>

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


              <div className="form-row">

                {/* STATE */}

                <div className="form-group">

                  <label htmlFor="state">
                    State
                  </label>

                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  >
                    <option value="Akwa Ibom">
                      Akwa Ibom
                    </option>
                  </select>

                </div>


                {/* LGA */}

                <div className="form-group">

                  <label htmlFor="lga">
                    LGA
                  </label>

                  <select
                    id="lga"
                    name="lga"
                    value={formData.lga}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select LGA
                    </option>

                    {AKWA_IBOM_LGAS.map(
                      (lga) => (
                        <option
                          key={lga}
                          value={lga}
                        >
                          {lga}
                        </option>
                      )
                    )}

                  </select>

                </div>

              </div>

            </>
          )}


          {/* =========================
              SIGN IN
          ========================= */}

          {mode === "signin" && (
            <div className="form-group">

              <label htmlFor="loginEmail">
                Email Address
              </label>

              <input
                id="loginEmail"
                type="email"
                placeholder="Enter your email"
                value={loginEmail}
                onChange={(e) =>
                  setLoginEmail(e.target.value)
                }
                required
              />

            </div>
          )}


          {/* PASSWORD */}

          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={
                mode === "signup"
                  ? formData.password
                  : loginPassword
              }
              onChange={(e) => {

                if (mode === "signup") {

                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));

                } else {

                  setLoginPassword(
                    e.target.value
                  );

                }

              }}
              required
            />

          </div>


          {/* CONFIRM PASSWORD */}

          {mode === "signup" && (
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
              />

            </div>
          )}


          {/* FORGOT PASSWORD */}

          {mode === "signin" && (
            <div className="forgot-password">

              <button
                type="button"
                onClick={() =>
                  alert(
                    "Password reset will be activated next."
                  )
                }
              >
                Forgot Password?
              </button>

            </div>
          )}


          {/* TERMS */}

          {mode === "signup" && (
            <label className="terms">

              <input
                type="checkbox"
                required
              />

              <span>
                I agree to the Terms of Service
                and Privacy Policy.
              </span>

            </label>
          )}


          {/* SUBMIT */}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : mode === "signin"
              ? "Sign In"
              : "Create Account"}
          </button>

        </form>


        {/* SWITCH */}

        <div className="auth-switch">

          {mode === "signin" ? (
            <>
              Don't have an account?{" "}

              <button
                type="button"
                onClick={() =>
                  setMode("signup")
                }
              >
                Create Account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}

              <button
                type="button"
                onClick={() =>
                  setMode("signin")
                }
              >
                Sign In
              </button>
            </>
          )}

        </div>


        {/* SECURITY */}

        <div className="auth-security">
          🔒 Secure • Private • Trusted
        </div>

      </section>

    </main>
  );
}