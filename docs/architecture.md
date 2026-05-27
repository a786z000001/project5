Frontend Layer (React)
│
├── InputForm.jsx
├── Results.jsx
├── accessGate.jsx
├── State & API Handling
│
▼
REST API Layer (Node.js + Express)
│
├── evaluate.routes.js
├── health.routes.js
├── requestId.middleware.js
├── error.middleware.js
│
▼
Business Logic / Evaluation Engine
│
├── scoring.engine.js
├── evaluation.service.js
├── explanation.service.js
├── githubEvidence.service.js
├── claimExtractor.service.js
│
▼
Validation & Skill Mapping Layer
│
├── implicitSkillMap.js
├── skillMap.js
│
▼
Database Layer (MongoDB)
│
├── Evaluation.model.js
├── Evidence.model.js
├── SkillClaim.model.js
│
▼
Output Generation
│
├── Credibility Evaluation
├── Skill Alignment Analysis
├── Structured Evidence Scoring
└── Explanation Generation
