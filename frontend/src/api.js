
const API_BASE =
  import.meta.env.VITE_ACCESS_KEY || "http://localhost:3001";

export async function evaluateCandidate(data) {
  const response = await fetch(`${API_BASE}/api/evaluate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
if (!response.ok) {
    throw new Error("Evaluation request failed");
  }
  return response.json();
}
