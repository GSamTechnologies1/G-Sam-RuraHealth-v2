import Dashboard from "./components/Dashboard";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        alignItems: "flex-start"
      }}
    >
      {/* Chatbot */}
      <div
        style={{
          flex: 2
        }}
      >
        <AppRouter />
      </div>

      {/* Dashboard */}
      <div
        style={{
          flex: 1
        }}
      >
        <Dashboard />
      </div>
    </div>
  );
}

export default App;