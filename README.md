# Proof-Based Engineering Signal Engine

## One-line summary

A backend-first system that evaluates engineering candidates by verifying resume claims against real evidence (code, commits, projects) and produces **transparent, explainable confidence scores**.

---

## Problem

Traditional resume screeners optimize for keywords and speed. They reward claims over proof, leading to false positives, bias, and missed talent. Good engineers get filtered out because signal is buried under noise.

---

## Core Idea

**Claim → Evidence → Confidence**

Instead of asking *“Is a skill mentioned?”*, the system asks *“Is there verifiable evidence for this skill?”* and explains **why** a score was assigned.

---

## What This System Does (MVP)

* Accepts resume text (PDF/text)
* Extracts 5–10 skill claims
* Collects public evidence (GitHub repos, commits, files)
* Scores each skill (Low / Medium / High)
* Generates a human-readable explanation per skill

---

## What This System Will NOT Do (Non-goals)

* Auto-reject candidates
* Permanently store resumes by default
* Hide decisions behind black-box AI
* Scrape private data

---

## High-Level Architecture

1. **Resume Ingestion** → Convert resume to raw text
2. **Claim Extraction** → Structured skill claims (LLM-assisted)
3. **Evidence Collector** → GitHub API, repo & commit analysis
4. **Evaluation Engine** → Deterministic scoring rules
5. **Explanation Generator** → Clear, auditable feedback
6. **Report Output** → JSON (UI optional)

---

## Technology Stack

* Backend: Node.js + Express
* Database: MongoDB (optional persistence)
* External APIs: GitHub REST API
* AI Usage: Limited to parsing & explanation (not decision-making)

---

## Data Model (Conceptual)

* **SkillClaim**: name, source, initial confidence
* **Evidence**: type (repo/commit/file), reference URL, strength
* **Evaluation**: skill, evidence[], final confidence, explanation

---

## Evaluation Philosophy

* Deterministic, explainable rules
* Depth > breadth
* Penalize unverifiable claims, not missing pedigree
* Bias-aware by design

---

## Privacy & Ethics

* Opt-in persistence
* No analytics or trackers
* Clear data boundaries
* Respect confidentiality of proprietary work

---

## Roadmap

* MVP: Claim extraction + GitHub evidence + scoring
* Stretch: Configurable weights, comparison reports, UI

---

## Status

Project initialized. README-first design.
