export async function evaluateCandidate(data) {
  const response = await fetch("./api/evaluate"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return response.json();
}


