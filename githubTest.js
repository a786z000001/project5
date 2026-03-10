const { collectGithubEvidence } = require("./src/services/githubEvidence.service");

(async () => {
  const evidence = await collectGithubEvidence("octocat", ["Node.js", "MongoDB"]);
  console.log(evidence);
})();
