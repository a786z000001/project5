/**
 * Deterministic scoring engine
 * Input: skill + array of evidence
 * Output: confidence + explanation
 */
function scoreSkill(skill, evidence = []) {
  if (!Array.isArray(evidence) || evidence.length === 0) {
    return {
      skill,
      confidence: "LOW",
      explanation: `No public repositories with verifiable ${skill} usage were found.`
    };
  }

  const strongCount = evidence.filter(e => e.strength === "strong").length;
  const mediumCount = evidence.filter(e => e.strength === "medium").length;

  // count unique repos
  const repoCount = new Set(evidence.map(e => e.repoName)).size;

  // HIGH confidence conditions
  if (strongCount >= 1 || repoCount >= 1) {
    return {
      skill,
      confidence: "HIGH",
      explanation: `${skill} verified across ${repoCount} repositories with real dependency usage.`
    };
  }

  // MEDIUM confidence
  return {
    skill,
    confidence: "MEDIUM",
    explanation: `${skill} verified in ${repoCount} repository using production dependencies.`
  };
}

module.exports = {
  scoreSkill
};
