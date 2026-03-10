import { useState } from "react";
import { evaluateCandidate } from "./api";

export default function InputForm({ onResult }) {
  const [githubUsername, setGithubUsername] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const skillClaims = skills.split(",").map(s => s.trim());
      const result = await evaluateCandidate({ githubUsername, skillClaims });
      onResult(result);
    } finally {
      setLoading(false);
    }
  }

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
    gap: "14px"
  },
  input: {
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "15px"
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#4f46e5",
    color: "#ffffff",
    fontSize: "16px",
    cursor: "pointer"
  }
};

