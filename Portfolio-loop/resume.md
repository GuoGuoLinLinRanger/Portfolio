# Tian Yi Tong — Portfolio Data

## Contact

- Email: tyttong@uwaterloo.ca
- LinkedIn: https://www.linkedin.com/in/tian-yi-tong/
- GitHub: https://github.com/GuoGuoLinLinRanger

## Education

- University of Waterloo — Honors Computer Science, Sept 2025 – Apr 2029
- GPA: 3.93 / 4.00
- Coursework: Data Structures & Algorithms, Probability & Statistics, Real Analysis, Abstract Algebra, Multivariable Calculus
- Marianopolis College — Pure & Applied Science, 2023–2025

## Awards (lead with these — they are exceptional)

- Citadel Trading Challenge — 1st Place Overall, ~120 competing teams
- Jane Street Trading Competition — 2nd Place Overall, ~80 competing teams
- Putnam Mathematical Competition — Top 500 nationally (~top 10% of ~4,000 participants)
- Fraser Institute Essay Competition — Top finalist

## Experience

### BusPlanner | Software Engineer Intern | May 2024 – Aug 2025

Stack: C++ · C# · ASP.NET · SQL Server · PowerShell · GitHub Actions

- Owned enrollment/eligibility workflows across ASP.NET, C# business logic, legacy C++/MFC, and SQL Server — ~15,000 student records across 100+ school districts daily
- Resolved a production data corruption defect traced across C# service and stored procedure layers; prevented data integrity failures across ~8 districts
- Rewrote 3 high-frequency queries; reduced enrollment page load time by ~35%
- Led full migration from Azure DevOps to GitHub + Jira — CI/CD pipelines, branching strategy, work-item traceability; reduced average PR cycle time ~2 days across 8 engineers
- Built PowerShell environment provisioning tool; cut new-developer onboarding from ~1 day to under 2 hours
- Closed ~40 production defects across C++/C#/ASP.NET over 15 months in a 500,000+ line codebase
- Used Claude Code to reduce average root-cause analysis time by ~30% on unfamiliar legacy modules

### UWaterloo CS Club | Platform Engineer | Sept 2025 – Present

Stack: React · Next.js · TypeScript · GCP · Figma

- Maintained production platform serving 3,000+ active CS students; ~99.5% uptime
- Shipped 10+ dynamic content modules from requirements through production within 1–2 week turnarounds
- Reviewed 25+ pull requests; reduced page rendering overhead ~20% by eliminating unnecessary re-renders
- Deployed to GCP via GitHub Actions with rollback procedures

### Midnight Sun Solar Car Team | Firmware Test Engineer | Sept 2025 – Present

Stack: C · GDB · Unity Testing Framework · Embedded Systems

- Brought test coverage from ~0% to ~70% across ~12 safety-critical modules using Unity framework
- Diagnosed 6 firmware defects with GDB — register-level root causes on a competition solar vehicle
- Built simulated test environment enabling 4x faster iteration vs on-hardware testing

## Projects

### Osmia — Autonomous LLM Trading System (2024–Present)

Stack: Python · DuckDB · Qwen (self-hosted LLM) · systemd · ccxt · Linux

- Fully autonomous crypto research system running 24/7 on home Linux server via 7 systemd services
- ~288 ingest runs and ~144 LLM analysis cycles per day across 14 monitored assets — unattended 4+ months
- ~64% directional accuracy across 380+ scored verdicts via closed learning loop
- 4-cohort synthetic Fear & Greed index from scratch (Retail, Institutional, On-chain, Trader sentiment)
- 10 external data sources with graceful-degradation; ~99% pipeline availability over 4 months
- Layered risk management: F&G-adaptive stop-losses, order-book depth analysis, macro-aware position sizing
- Evolved from 423-line prototype to ~5,000 lines across 13 documented versions; 15-table DuckDB schema

### OpenBy — AI-Driven Market Forecasting Platform (2024–Present)

Stack: Python · FastAPI · React · Supabase · Docker · GPT / Claude / Gemini

- 87% directional accuracy across 1,000+ backtested samples
- Multi-source signal fusion: CPI, volatility, sentiment, Google Trends, social virality
- Monte Carlo simulation over 10,000+ paths for probability-weighted forecasts
- Multi-provider LLM orchestration (GPT, Claude, Gemini) — ~200 forecast requests/day at peak
- Reduced recomputation overhead 40%; API response time from ~1.8s to ~1.1s
- Sole engineer across React frontend, FastAPI backend, Supabase, Docker

### Real-Time Collaborative Whiteboard (2024)

Stack: TypeScript · WebSockets · PostgreSQL · JWT

- Sub-100ms sync latency across 20+ concurrent users; 1,000+ drawing events/session with no lag
- 0 state divergence bugs across 200+ collaborative sessions

### Remy — Multi-Agent AI Orchestration Layer (2024–Present)

Stack: Python · LangChain · OpenAI API

- Decomposes high-level goals into sub-tasks dispatched to specialized agents
- ~45% reduction in task completion latency vs single-agent sequential execution
- Pipelines of up to 6 concurrent sub-agents; failure rate under 3%

### Autonomous Quadcopter (2025–Present)

Stack: Python · ArduPilot · MAVLink · OpenCV · Raspberry Pi · SITL · pytest

- Custom quadcopter from scratch — 3D-printed airframe, ArduPilot, Raspberry Pi; ~$300 build, ~850g
- Hardware-abstracted flight simulator; full control stack runs identically in SITL and on hardware
- Precision autonomous landing within ~30cm via closed-loop PID + OpenCV marker detection
- Validated across 100+ SITL runs; green pytest suite maintained across 30+ commits from 3 contributors

### Cloud9 — 3D Scientific Visualization | MariHacks 2nd Place (2024)

Stack: Python · Flask · Three.js · WebGL

- Custom 3D rendering pipeline from scratch — coordinate transforms, mesh triangulation, matrix projections
- 60 FPS real-time on 5,000–15,000 triangle scenes; demoed to 200+ hackathon participants

### Loan Default Prediction Model (2024)

Stack: Python · scikit-learn · pandas

- ~82% AUC-ROC on 10,000-record dataset; full precision/recall/calibration evaluation

## Technical Skills

Languages: Python, C++, C#, SQL, TypeScript, JavaScript, PowerShell, HTML/CSS, C
Frameworks: ASP.NET, React, Next.js, FastAPI, LangChain, Docker, GitHub Actions, GCP, Supabase, SQL Server, PostgreSQL, DuckDB
Robotics: MAVLink, ArduPilot, SITL, PID control, OpenCV, GPS navigation
ML/AI: Supervised learning, backtesting, Monte Carlo, multi-agent orchestration, LLM integration
Math: Real analysis, multivariable calculus, probability theory, abstract algebra, linear algebra
