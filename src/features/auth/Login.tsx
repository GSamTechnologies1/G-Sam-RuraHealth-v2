import "./Login.css";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Successful STAFF login
      navigate("/staff-portal");

    } catch (error: any) {
      console.error(error);

      alert(error.message);
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h1>Staff Login</h1>

        <p>
          Sign in to access the G-Sam RuraHealth
          staff portal.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button type="submit">
            Sign In
          </button>

        </form>

      </div>

    </div>
  );
}