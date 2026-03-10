const { evaluateSkill } = require("./src/engines/scoring.engine");

const result = evaluateSkill("Node.js", [
  { strength: "strong" },
  { strength: "medium" }
]);

console.log(result);
