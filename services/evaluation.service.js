const { collectGithubEvidence } = require("./githubEvidence.service");
const { scoreSkill } = require("../engines/scoring.engine");

async function evaluateSkills({ githubUsername, skillClaims }) {
  const allEvidence = await collectGithubEvidence(
    githubUsername,
    skillClaims
  );

  // 🔥 GROUP BY SKILL (EXPLICIT)
  const evidenceBySkill = {};

  for (const ev of allEvidence) {
    if (!evidenceBySkill[ev.skill]) {
      evidenceBySkill[ev.skill] = [];
    }
    evidenceBySkill[ev.skill].push(ev);
  }

  const evaluations = skillClaims.map(skill => {
    const evidenceForSkill = evidenceBySkill[skill] || [];

    const scored = scoreSkill(skill, evidenceForSkill);

    return {
      ...scored,
      evidence: evidenceForSkill   // 👈 ALL repos, not one
    };
  });

  return {
    githubUsername,
    evaluations
  };
}

module.exports = { evaluateSkills };
