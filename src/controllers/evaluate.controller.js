const { evaluateSkills } = require("../services/evaluation.service");

/**
 * Handle candidate evaluation request
 */
async function evaluateController(req, res, next) {
  console.log("➡️ /evaluate hit", req.body);

  try {
    const { githubUsername, skillClaims } = req.body;

    if (!githubUsername || !Array.isArray(skillClaims)) {
      return res.status(400).json({
        error: "githubUsername and skillClaims[] are required"
      });
    }

    // 🔧 NORMALIZATION
    const normalize = s =>
      s.trim().toLowerCase().replace(/\s+/g, " ");

    const CANONICAL = {
      "node.js": "Node.js",
      "mongodb": "MongoDB",
      "rest api": "REST API"
    };

    const finalSkills = [
      ...new Set(skillClaims.map(normalize))
    ]
      .map(s => CANONICAL[s])
      .filter(Boolean);

    const report = await evaluateSkills({
      githubUsername,
      skillClaims: finalSkills   // ✅ FIXED
    });

    res.json(report);
  } catch (err) {
    console.error("🔥 Evaluation error:", err);
    next(err);
  }
}

module.exports = {
  evaluateController
};
