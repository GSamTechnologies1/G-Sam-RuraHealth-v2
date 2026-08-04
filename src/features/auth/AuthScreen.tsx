import "./AuthScreen.css";

function AuthScreen() {
  return (
    <div className="auth-screen">

      <div className="auth-card">

        <div className="logo">
          🏥
        </div>

        <h1>Welcome to G-Sam RuraHealth</h1>

        <p>
          Your trusted healthcare companion for rural communities.
        </p>

        <button className="create-btn">
          Create Account
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        <button className="signin-btn">
          Sign In
        </button>

        <small>
          Secure • Reliable • Multilingual
        </small>

      </div>

    </div>
  );
}

export default AuthScreen;