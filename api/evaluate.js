export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { githubUsername, skillClaims } = req.body;

  res.status(200).json({
    username: githubUsername,
    skills: skillClaims,
    score: 82
  });
}
