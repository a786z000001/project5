import InputForm from "./InputForm";
import Results from "./Results";
import { useState } from "react";

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>ScoreR</h1>
        <p style={styles.subtitle}>
          Proof-based skill verification using real GitHub evidence
        </p>

        <InputForm onResult={setResult} />
        <Results data={result} />
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #eef2ff, #f8fafc)"
  },
  card: {
    width: "100%",
    maxWidth: "520px",
    background: "#ffffff",
    padding: "32px",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)"
  },
  title: {
    marginBottom: "4px",
    fontSize: "32px"
  },
  subtitle: {
    marginBottom: "24px",
    color: "#6b7280"
  }
};

