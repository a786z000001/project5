const skillMap = require("../config/skillMap");
const implicitSkillMap = require("../config/implicitSkillMap");

// ---------- helpers ----------

async function safeFetchText(url) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "ScoreR-App" }
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

async function safeFetchJson(url) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "ScoreR-App",
        "Accept": "*/*"
      }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function fetchPackageJson(username, repoName) {
  const branches = ["main", "master"];
  for (const branch of branches) {
    const url = `https://raw.githubusercontent.com/${username}/${repoName}/${branch}/package.json`;
    const pkg = await safeFetchJson(url);
    if (pkg) return pkg;
  }
  return null;
}

async function repoContainsMongoUri(username, repoName) {
  const paths = [
    "index.js",
    "app.js",
    "server.js",
    "src/index.js",
    "src/app.js",
    "src/server.js"
  ];

  for (const path of paths) {
    const url = `https://raw.githubusercontent.com/${username}/${repoName}/main/${path}`;
    const text = await safeFetchText(url);
    if (!text) continue;

    if (
      text.includes("mongodb://") ||
      text.includes("mongodb+srv://")
    ) {
      return true;
    }
  }
  return false;
}

function dedupeEvidence(evidence) {
  const priority = { strong: 3, medium: 2, weak: 1 };
  const map = {};

  for (const ev of evidence) {
    const key = `${ev.skill}:${ev.repoName}`;
    if (!map[key] || priority[ev.strength] > priority[map[key].strength]) {
      map[key] = ev;
    }
  }
  return Object.values(map);
}

// ---------- MAIN FUNCTION ----------

async function collectGithubEvidence(githubUsername, skillClaims = []) {
  console.log("🔍 Fetching evidence for:", githubUsername, skillClaims);

  const evidence = [];

  const repos = await safeFetchJson(
    `https://api.github.com/users/${githubUsername}/repos`
  );

  if (!Array.isArray(repos)) return evidence;

  for (const repo of repos) {
    if (repo.archived) continue;

    // Node.js weak language signal
    if (skillClaims.includes("Node.js") && repo.language === "JavaScript") {
      evidence.push({
        skill: "Node.js",
        repoName: repo.name,
        repoUrl: repo.html_url,
        strength: "weak",
        dependencies: ["language:JavaScript"]
      });
    }

    const pkg = await fetchPackageJson(githubUsername, repo.name);
    const dependencies = pkg
      ? { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) }
      : {};

    // Dependency-based evidence
    for (const skill of skillClaims) {
      const signals = skillMap[skill];
      if (!signals || !pkg) continue;

      const matched = signals.filter(dep => dependencies[dep]);
      if (matched.length > 0) {
        evidence.push({
          skill,
          repoName: repo.name,
          repoUrl: repo.html_url,
          strength: matched.length >= 2 ? "strong" : "medium",
          dependencies: matched
        });
      }
    }

    // Implicit evidence
    for (const skill of skillClaims) {
      const implicit = implicitSkillMap[skill];
      if (!implicit) continue;

      if (implicit.language?.includes(repo.language)) {
        evidence.push({
          skill,
          repoName: repo.name,
          repoUrl: repo.html_url,
          strength: "weak",
          dependencies: [`implicit:${implicit.reason}`]
        });
      }
    }

    // MongoDB strong evidence
    if (skillClaims.includes("MongoDB")) {
      const hasMongo = await repoContainsMongoUri(githubUsername, repo.name);
      if (hasMongo) {
        evidence.push({
          skill: "MongoDB",
          repoName: repo.name,
          repoUrl: repo.html_url,
          strength: "strong",
          dependencies: ["connection-string:mongodb"]
        });
      }
    }
  }

  return dedupeEvidence(evidence);
}

module.exports = { collectGithubEvidence };
