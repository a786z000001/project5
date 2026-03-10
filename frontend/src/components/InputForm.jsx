import { useState } from "react";
import { evaluateCandidate } from "../api";

export default function InputForm({ onResult }) {
  // 🔐 Access gate
  const [accessGranted, setAccessGranted] = useState(false);
  const [password, setPassword] = useState("");

  // 📋 Form state
  const [githubUsername, setGithubUsername] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);

  const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY || "local-demo";

  // 🔐 PASSWORD SCREEN
  if (!accessGranted) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h2>Private Demo</h2>

        <input
          type="password"
          placeholder="Access key"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={styles.input}
        />

        <br /><br />

        <button
          style={styles.button}
          onClick={() =>
            password === ACCESS_KEY
              ? setAccessGranted(true)
              : alert("Invalid access key")
          }
        >
          Enter
        </button>
      </div>
    );
  }

  // 🚀 Submit handler
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const skillClaims = skills
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);

      const result = await evaluateCandidate({
        githubUsername,
        skillClaims
      });

      onResult(result);
    } catch (err) {
      console.error(err);
      alert("Evaluation failed");
    } finally {
      setLoading(false);
    }
  }

  // 📋 MAIN FORM
  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        style={styles.input}
        placeholder="GitHub username"
        value={githubUsername}
        onChange={e => setGithubUsername(e.target.value)}
        required
      />

      <input
        style={styles.input}
        placeholder="Skills (comma separated)"
        value={skills}
        onChange={e => setSkills(e.target.value)}
        required
      />

      <button style={styles.button} disabled={loading}>
        {loading ? "Evaluating..." : "Evaluate"}
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    marginTop: "24px"
  },
  input: {
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    width: "100%"
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#b00b1b",
    color: "#ffffff",
    fontSize: "16px",
    cursor: "pointer"
  }
};
