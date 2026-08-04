import { useEffect, useState } from "react";
import { getDashboard } from "../bot/stats";

export default function Dashboard() {

  const [stats, setStats] = useState(getDashboard());

  useEffect(() => {

    const interval = setInterval(() => {

      setStats(getDashboard());

    }, 500);

    return () => clearInterval(interval);

  }, []);
  return (
    <div
      style={{
        padding: "30px",
        background: "#f5f7fb",
        minHeight: "100vh",
        fontFamily: "Arial"
      }}
    >
      <h1
        style={{
          color: "#1e3a8a",
          marginBottom: "30px"
        }}
      >
        📊 G-Sam RuraHealth Dashboard
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap"
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            width: "220px",
            boxShadow: "0 3px 10px rgba(0,0,0,.1)"
          }}
        >
          <h3>Total Consultations</h3>

          <h1 style={{ color: "#2563eb" }}>
            {stats.consultations}
          </h1>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            width: "220px",
            boxShadow: "0 3px 10px rgba(0,0,0,.1)"
          }}
        >
          <h3>Diseases Recorded</h3>

          <h1 style={{ color: "#059669" }}>
            {Object.keys(stats.diseases).length}
          </h1>
        </div>
      </div>

      <div
        style={{
          marginTop: "40px",
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 3px 10px rgba(0,0,0,.1)"
        }}
      >
        <h2>Disease Statistics</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse"
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                  padding: "10px"
                }}
              >
                Disease
              </th>

              <th
                style={{
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                  padding: "10px"
                }}
              >
                Cases
              </th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(stats.diseases).map(([disease, count]) => (
              <tr key={disease}>
                <td style={{ padding: "10px" }}>
                  {disease}
                </td>

                <td style={{ padding: "10px" }}>
                  {count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}