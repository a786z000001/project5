const { evaluateCandidate } = require("./src/services/evaluation.service");

(async () => {
  const report = await evaluateCandidate({
    githubUsername: "octocat",
    skillClaims: ["Node.js", "MongoDB"]
  });

  console.log(JSON.stringify(report, null, 2));
})();
