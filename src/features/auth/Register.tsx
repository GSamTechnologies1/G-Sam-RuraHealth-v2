import "./Register.css";
import { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../firebase/firebaseConfig";

export default function Register() {

  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const handleRegister = async () => {

  console.log("Button clicked");

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {

    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Account created successfully!");

  } catch (error: any) {
  console.error("Firebase Error:", error);
}

};


  return (
    <div className="register-container">

      <div className="register-card">

        <h1>Create Account</h1>

        <p>
          Join G-Sam RuraHealth and enjoy trusted healthcare services.
        </p>

        <form
  onSubmit={(e) => {
    e.preventDefault();
    handleRegister();
  }}
>

          <input
  type="email"
  placeholder="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

          <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

          <input
  type="password"
  placeholder="Confirm Password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
/>

          <select>
            <option>Select Country</option>
            <option>Nigeria</option>
            <option>Ghana</option>
            <option>Kenya</option>
          </select>

          <select>
            <option>Select State</option>
            <option>Akwa Ibom</option>
            <option>Lagos</option>
            <option>Abuja (FCT)</option>
            <option>Rivers</option>
          </select>

          <select>
            <option>Preferred Language</option>
            <option>English</option>
            <option>Ibibio</option>
            <option>Igbo</option>
            <option>Yoruba</option>
            <option>Hausa</option>
            <option>French</option>
            <option>Mandarin</option>
            <option>Arabic</option>
          </select>

          <button type="submit">
  Create Account
</button>

        </form>

      </div>

    </div>
  );
}