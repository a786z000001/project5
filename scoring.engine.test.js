const { describe, test, expect } = require("@jest/globals");
const { evaluateSkill, CONFIDENCE } = require("../engines/scoring.engine");

describe("Scoring Engine", () => {

  test("returns LOW when no evidence exists", () => {
    const result = evaluateSkill("Node.js", []);
    expect(result.confidence).toBe(CONFIDENCE.LOW);
  });

  test("returns MEDIUM when medium evidence exists", () => {
    const result = evaluateSkill("Node.js", [
      { strength: "medium" }
    ]);
    expect(result.confidence).toBe(CONFIDENCE.MEDIUM);
  });

  test("returns HIGH when strong evidence exists", () => {
    const result = evaluateSkill("Node.js", [
      { strength: "strong" },
      { strength: "medium" }
    ]);
    expect(result.confidence).toBe(CONFIDENCE.HIGH);
  });

});
