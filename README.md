# Proof-Based Engineering Signal Engine (ScoreR)

> **Proof over keywords. Signal over noise.**  
A backend-first system that evaluates engineering candidates by verifying resume claims against **verifiable public evidence** and produces **transparent, explainable confidence scores**.

---

## Why this exists
Traditional resume screeners optimize for keywords and speed. They reward claims over proof and often miss real engineering signal.

**ScoreR flips the model:**

**Claim → Evidence → Confidence**

When evidence is missing, the system does **not guess**. It explains why.

---

## What ScoreR does (MVP)
- Accepts claimed skills and a GitHub username
- Collects **public evidence** from GitHub repositories
- Scores each skill as **LOW / MEDIUM / HIGH**
- Generates a **human-readable explanation** for every score

**Non-goals (by design):**
- Auto-rejecting candidates  
- Black-box AI decisions  
- Scraping private data  

---

## Architecture (backend-first)

Client → REST API → Evaluation Service  
       ↳ GitHub Evidence Service  
       ↳ Scoring Engine (pure, deterministic)  

- Routes are thin  
- Services orchestrate  
- Engine decides  
- Observability via request IDs  

---

## Scoring logic (deterministic)
- **LOW**: Claim present, no or superficial evidence
- **MEDIUM**: Some practical usage, limited depth or breadth
- **HIGH**: Strong, repeated evidence across projects

The scoring engine contains **no I/O** and is **unit-tested**.

---

## GitHub evidence (hardened)
- Handles `main` and `master` branches
- Gracefully skips missing files
- Maps concrete signals (dependencies) to skills
- Avoids vanity metrics (stars, followers)

---

## API

### POST `/evaluate`

**Request**
```json
{
  "githubUsername": "octocat",
  "skillClaims": ["Node.js", "MongoDB"]
}


