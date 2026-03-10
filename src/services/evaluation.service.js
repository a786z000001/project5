const { collectGithubEvidence } = require("./githubEvidence.service");
const { scoreSkill } = require("../engines/scoring.engine");

/**
 * Evaluates a candidate's claimed skills using GitHub evidence
 */
async function evaluateSkills({ githubUsername, skillClaims }) {
  // 1️⃣ Collect ALL evidence (flat array)
  const allEvidence = await collectGithubEvidence(
    githubUsername,
    skillClaims
  );

  // 2️⃣ Score EACH skill independently
  const evaluations = skillClaims.map(skill => {
    const evidenceForSkill = allEvidence.filter(
      e => e.skill === skill
    );

    const scored = scoreSkill(skill, evidenceForSkill);

    return {
      ...scored,
      evidence: evidenceForSkill
    };
  });

  return {
    githubUsername,
    evaluations
  };
}

module.exports = {
  evaluateSkills
};
