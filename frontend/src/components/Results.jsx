export default function Results({ data }) {
  // 🛡️ FULL SAFETY GUARDS
  if (!data) return null;
  if (!Array.isArray(data.evaluations)) return null;

  return (
    <div style={{ marginTop: "24px" }}>
      <h3>Evaluation Results</h3>

      {data.evaluations.map(ev => (
        <div
          key={ev.skill}
          style={{
            ...styles.card,
            borderLeft: `6px solid ${color(ev.confidence)}`
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <strong>{ev.skill}</strong>

            <span
              style={{
                marginLeft: "8px",
                padding: "2px 8px",
                borderRadius: "12px",
                fontSize: "12px",
                background: color(ev.confidence),
                color: "#fff"
              }}
            >
              {ev.confidence}
            </span>
          </div>

          <p style={{ marginTop: "6px", color: "#374151" }}>
            {ev.explanation}
          </p>

          {/* ✅ VERIFIED REPOSITORIES */}
          {Array.isArray(ev.evidence) && ev.evidence.length > 0 && (
            <div style={{ marginTop: "10px" }}>
              <strong>Verified Repositories:</strong>
              <ul style={{ marginTop: "6px" }}>
                {ev.evidence.map((repo, i) => (
                  <li key={i}>
                    <a
                      href={repo.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {repo.repoName}
                    </a>
                    <div style={{ fontSize: "13px", color: "#555" }}>
                      Dependencies: {repo.dependencies.join(", ")}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function color(conf) {
  if (conf === "HIGH") return "#16a34a";
  if (conf === "MEDIUM") return "#f59e0b";
  return "#dc2626";
}

const styles = {
  card: {
    background: "#f9fafb",
    padding: "12px",
    borderRadius: "8px",
    marginTop: "12px"
  }
};















