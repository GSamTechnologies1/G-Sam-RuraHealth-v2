type WelcomeMessageProps = {
  name: string;
  role: "citizen" | "staff";
};

export default function WelcomeMessage({
  name,
  role,
}: WelcomeMessageProps) {
  const roleLabel = role === "citizen" ? "Citizen" : "Staff";

  return (
    <section className="welcome-message">
      <h2>Welcome, {name}!</h2>
      <p>
        Welcome to your RuraHealth {roleLabel} Dashboard.
      </p>
    </section>
  );
}