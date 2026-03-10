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

    const report = await evaluateSkills({
      githubUsername,
      skillClaims
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
