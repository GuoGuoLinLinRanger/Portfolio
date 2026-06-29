// Single source of truth for all portfolio content.
// Sourced from Portfolio-loop/resume.md — keep numbers honest.

export const profile = {
  name: "Tian Yi Tong",
  role: "Full-Stack Engineer",
  tagline: "I build full-stack systems and keep them running.",
  headline: "Software Engineer @ BusPlanner — CS @ Waterloo.",
  blurb:
    "I've been inside a 500K-line production codebase, kept a platform live for 3,000+ students, and had a trading system on my home server running for 4 months without touching it.",
  email: "tyttong@uwaterloo.ca",
  linkedin: "https://www.linkedin.com/in/tian-yi-tong/",
  github: "https://github.com/GuoGuoLinLinRanger",
  photo: "/img/Linkedn.png",
  location: "Waterloo, ON",
}

// Glanceable headline stats for the hero — proof, not adjectives.
export const headlineStats = [
  {
    value: "4+ mo",
    label: "autonomous trading system, unattended",
    sub: "Osmia · ~64% directional accuracy live",
  },
  {
    value: "3,000+",
    label: "students on a platform I keep up",
    sub: "UW CS Club · ~99.5% uptime",
  },
  {
    value: "500K+",
    label: "lines of production code shipped into",
    sub: "BusPlanner · C++/C#/ASP.NET, 4-month co-op",
  },
  {
    value: "<100ms",
    label: "real-time sync across 20+ users",
    sub: "Collaborative whiteboard · 0 divergence bugs",
  },
]

// Supporting credibility — chips, NOT the headline.
export const awards = [
  { place: "1st", title: "Citadel Trading Challenge", detail: "~120 people" },
  { place: "2nd", title: "Jane Street Trading Competition", detail: "~100 people" },
  { place: "Top 10%", title: "Putnam Mathematical Competition", detail: "~4,000 entrants" },
]

export type SkillGroup = {
  title: string
  hue: number // anchors this group to a point on the color flow
  skills: { name: string; level: number; note?: string }[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    hue: 272,
    skills: [
      { name: "React", level: 5, note: "3 production apps" },
      { name: "Next.js", level: 4 },
      { name: "TypeScript", level: 5 },
      { name: "Tailwind / shadcn", level: 4 },
      { name: "Figma → build", level: 3 },
    ],
  },
  {
    title: "Backend",
    hue: 230,
    skills: [
      { name: "Python / FastAPI", level: 5 },
      { name: "Node.js / Express", level: 4 },
      { name: "C# / ASP.NET", level: 4, note: "production co-op" },
      { name: "C / C++", level: 4 },
      { name: "WebSockets", level: 4 },
    ],
  },
  {
    title: "Infra & DevOps",
    hue: 192,
    skills: [
      { name: "Docker", level: 4 },
      { name: "GitHub Actions / CI", level: 4 },
      { name: "GCP", level: 3 },
      { name: "Linux / systemd", level: 4, note: "24/7 services" },
      { name: "PowerShell tooling", level: 4 },
    ],
  },
  {
    title: "Data & ML",
    hue: 152,
    skills: [
      { name: "PostgreSQL / SQL Server", level: 4 },
      { name: "DuckDB / Supabase", level: 4 },
      { name: "scikit-learn / PyTorch", level: 3 },
      { name: "LLM orchestration", level: 4, note: "GPT · Claude · Gemini" },
      { name: "Monte Carlo / backtesting", level: 4 },
    ],
  },
]

export type Project = {
  id: string
  name: string
  tagline: string
  year: string
  stack: string[]
  flagship?: boolean
  status?: "live" | "active"
  image?: string
  link?: { label: string; href: string }
  // structured links shown as a row in the case-study modal
  links?: { kind: "github" | "live" | "demo" | "devpost" | "docs"; label: string; href: string }[]
  problem: string
  approach: string
  result: string
  metrics: { value: string; label: string }[]
  // optional simple architecture diagram (rendered as CSS/SVG nodes)
  architecture?: { nodes: string[]; caption: string }
  // screenshots shown in the case-study modal gallery
  gallery?: { src: string; caption: string }[]
  // deeper "under the hood" bullets — the in-depth layer behind the card
  highlights?: string[]
}

export const projects: Project[] = [
  {
    id: "osmia",
    name: "Osmia",
    tagline: "Autonomous LLM crypto-research system, running 24/7 for months",
    year: "2024 — Present",
    stack: ["Python", "DuckDB", "Qwen (self-hosted)", "systemd", "ccxt", "Linux"],
    flagship: true,
    status: "live",
    problem:
      "I wanted to know whether an LLM-driven research loop could actually hold up unattended — not in a notebook, but as real infrastructure that survives flaky data sources and runs while I sleep.",
    approach:
      "Seven systemd services on a home Linux box: ingest, a 4-cohort synthetic Fear & Greed index built from scratch, LLM analysis, scoring, and risk management with graceful degradation across 10 external sources. A closed learning loop scores its own past verdicts.",
    result:
      "~288 ingest runs and ~144 analysis cycles a day across 14 assets, unattended for 4+ months at ~99% pipeline availability. ~64% directional accuracy across 380+ scored verdicts. Grew from a 423-line prototype to ~5,000 lines over 13 documented versions.",
    metrics: [
      { value: "~64%", label: "directional accuracy (live)" },
      { value: "4+ mo", label: "unattended uptime" },
      { value: "~99%", label: "pipeline availability" },
      { value: "13", label: "documented versions" },
    ],
    architecture: {
      nodes: ["10 data sources", "Ingest ×7 systemd", "DuckDB (15 tables)", "Qwen LLM analysis", "Risk + scoring loop"],
      caption: "Graceful-degradation ingest → DuckDB → self-hosted LLM → closed scoring loop",
    },
    highlights: [
      "Seven systemd services run ingest, analysis, scoring and risk management 24/7 on a home Linux box — no babysitting.",
      "A 4-cohort synthetic Fear & Greed index built from scratch: retail, institutional, on-chain, and trader sentiment.",
      "Layered risk management — F&G-adaptive stop-losses, order-book depth analysis, and macro-aware position sizing.",
      "A closed learning loop scores its own past verdicts: ~64% directional accuracy across 380+ scored calls.",
      "10 external data sources with graceful degradation held pipeline availability at ~99% over 4+ months.",
      "Grew from a 423-line prototype to ~5,000 lines across 13 documented versions on a 15-table DuckDB schema.",
    ],
  },
  {
    id: "openby",
    name: "OpenBy",
    tagline: "AI-driven market forecasting platform — built the whole thing solo",
    year: "2024 — Present",
    stack: ["Python", "FastAPI", "React", "Supabase", "Docker", "GPT / Claude / Gemini"],
    flagship: true,
    status: "active",
    problem:
      "Forecasting tools either hide their math or can't explain a number. I wanted a platform that fuses many weak signals into a probability-weighted call you can actually interrogate.",
    approach:
      "Sole engineer across the stack: React frontend, FastAPI backend, Supabase, Docker. Multi-source signal fusion (CPI, volatility, sentiment, Google Trends, virality) feeding a Monte Carlo engine over 10,000+ paths, with multi-provider LLM orchestration so no single model is a point of failure.",
    result:
      "87% directional accuracy across 1,000+ backtested samples (a backtest, not a live record — stated honestly). Cut recomputation overhead 40% and API response from ~1.8s to ~1.1s while serving ~200 forecast requests/day at peak.",
    metrics: [
      { value: "87%", label: "accuracy (backtested)" },
      { value: "10K+", label: "Monte Carlo paths" },
      { value: "−40%", label: "recompute overhead" },
      { value: "1.8→1.1s", label: "API response" },
    ],
    architecture: {
      nodes: ["Signal sources", "FastAPI fusion", "Monte Carlo engine", "Multi-LLM orchestration", "React dashboard"],
      caption: "Signal fusion → Monte Carlo → multi-provider LLM → React",
    },
    highlights: [
      "Sole engineer across the whole stack: React frontend, FastAPI backend, Supabase, Docker.",
      "Multi-source signal fusion — CPI, volatility, sentiment, Google Trends, and social virality.",
      "A Monte Carlo engine over 10,000+ paths produces probability-weighted forecasts you can interrogate.",
      "Multi-provider LLM orchestration (GPT, Claude, Gemini) so no single model is a point of failure — ~200 requests/day at peak.",
      "Cut recomputation overhead 40% and API response from ~1.8s to ~1.1s.",
      "87% directional accuracy across 1,000+ backtested samples — a backtest, stated honestly, not a live record.",
    ],
  },
  {
    id: "uwcs",
    name: "UW CS Club Platform",
    tagline: "Production platform thousands of students rely on",
    year: "2025 — Present",
    stack: ["React", "Next.js", "TypeScript", "GCP", "Figma"],
    status: "live",
    image: "/img/home_UWCS.png",
    links: [{ kind: "live", label: "csclub.uwaterloo.ca", href: "https://csclub.uwaterloo.ca/" }],
    problem:
      "The club's site is the front door for 3,000+ CS students, but publishing updates was manual and slow, and the page carried unnecessary render cost.",
    approach:
      "Shipped 10+ dynamic content modules from requirements to production on 1–2 week turnarounds, reviewed 25+ PRs, and deployed to GCP via GitHub Actions with rollback procedures.",
    result:
      "~99.5% uptime serving 3,000+ active students, with ~20% less rendering overhead after eliminating unnecessary re-renders.",
    metrics: [
      { value: "3,000+", label: "active students" },
      { value: "~99.5%", label: "uptime" },
      { value: "−20%", label: "render overhead" },
      { value: "25+", label: "PRs reviewed" },
    ],
    highlights: [
      "Maintain a production platform 3,000+ active CS students rely on, at ~99.5% uptime.",
      "Shipped 10+ dynamic content modules from requirements to production on 1–2 week turnarounds.",
      "Reviewed 25+ PRs and cut page rendering overhead ~20% by eliminating unnecessary re-renders.",
      "Deploy to GCP via GitHub Actions with rollback procedures.",
    ],
    gallery: [
      { src: "/img/home_UWCS.png", caption: "Home — the front door for 3,000+ students" },
      { src: "/img/Screenshot 2026-01-13 150641.png", caption: "Events listing built from dynamic content modules" },
      { src: "/img/Screenshot 2026-01-13 150631.png", caption: "CSC merch storefront" },
    ],
  },
  {
    id: "whiteboard",
    name: "Real-Time Collaborative Whiteboard",
    tagline: "Sub-100ms multiplayer drawing with zero state divergence",
    year: "2024",
    stack: ["TypeScript", "WebSockets", "PostgreSQL", "JWT"],
    image: "/img/Socket.png",
    problem:
      "Real-time collaboration is easy to demo and hard to keep correct — state drifts the moment more than a few people draw at once.",
    approach:
      "Socket.io over WebSockets with room-based JWT auth; Node/Express/PostgreSQL with Prisma persisting every stroke so sessions survive reconnects.",
    result:
      "Sub-100ms sync across 20+ concurrent users and 1,000+ drawing events per session, with 0 state-divergence bugs across 200+ collaborative sessions.",
    metrics: [
      { value: "<100ms", label: "sync latency" },
      { value: "20+", label: "concurrent users" },
      { value: "0", label: "divergence bugs" },
      { value: "200+", label: "sessions" },
    ],
    highlights: [
      "Socket.io over WebSockets with room-based JWT auth keeps every session isolated and secure.",
      "Node/Express/PostgreSQL with Prisma persists every stroke, so sessions survive reconnects.",
      "Sub-100ms sync across 20+ concurrent users and 1,000+ drawing events per session.",
      "0 state-divergence bugs across 200+ collaborative sessions.",
    ],
    gallery: [
      { src: "/img/Socket.png", caption: "Real-time multiplayer canvas over WebSockets" },
    ],
  },
  {
    id: "quadcopter",
    name: "Autonomous Quadcopter",
    tagline: "A drone I built from scratch that lands itself within 30cm",
    year: "2025 — Present",
    stack: ["Python", "ArduPilot", "MAVLink", "OpenCV", "Raspberry Pi", "SITL", "pytest"],
    status: "active",
    problem:
      "I wanted the full robotics loop — airframe to autonomy — on a budget, with a control stack I could test without risking the hardware.",
    approach:
      "3D-printed ~850g airframe (~$300) on ArduPilot + Raspberry Pi. A hardware-abstracted simulator runs the exact same control stack in SITL and on the real drone; closed-loop PID + OpenCV marker detection handles landing.",
    result:
      "Precision autonomous landing within ~30cm, validated across 100+ SITL runs with a green pytest suite maintained over 30+ commits from 3 contributors.",
    metrics: [
      { value: "~30cm", label: "landing precision" },
      { value: "100+", label: "SITL runs" },
      { value: "~$300", label: "full build" },
      { value: "~850g", label: "airframe" },
    ],
    highlights: [
      "A 3D-printed ~850g airframe on ArduPilot + Raspberry Pi — the full robotics loop for ~$300.",
      "A hardware-abstracted simulator runs the exact same control stack in SITL and on the real drone.",
      "Closed-loop PID + OpenCV marker detection lands the drone within ~30cm.",
      "Validated across 100+ SITL runs with a green pytest suite over 30+ commits from 3 contributors.",
    ],
  },
  {
    id: "cloud9",
    name: "Cloud9 — 3D Scientific Visualization",
    tagline: "Custom WebGL render pipeline, built at a hackathon (2nd place)",
    year: "2024",
    stack: ["Python", "Flask", "Three.js", "WebGL"],
    links: [{ kind: "devpost", label: "View on Devpost", href: "https://devpost.com/software/cloud9" }],
    image: "/img/MNIST.png",
    problem:
      "Point-cloud and surface data is hard to reason about as numbers. We wanted to make it explorable in the browser in real time.",
    approach:
      "A 3D rendering pipeline written from the ground up — coordinate transforms, mesh triangulation, matrix projections — with a Flask backend normalizing real CSV datasets.",
    result:
      "60 FPS on 5,000–15,000-triangle scenes, demoed to 200+ hackathon participants. Took 2nd place at MariHacks.",
    metrics: [
      { value: "60 FPS", label: "real-time render" },
      { value: "15K", label: "triangles/scene" },
      { value: "200+", label: "people demoed" },
      { value: "2nd", label: "MariHacks" },
    ],
    highlights: [
      "A 3D rendering pipeline written from the ground up — coordinate transforms, mesh triangulation, matrix projections.",
      "A Flask backend normalizes real CSV datasets for in-browser exploration.",
      "60 FPS on 5,000–15,000-triangle scenes, demoed to 200+ hackathon participants.",
      "Took 2nd place at MariHacks.",
    ],
    gallery: [
      { src: "/img/MNIST.png", caption: "MNIST dataset rendered for visualization" },
      { src: "/img/FunctionNN.png", caption: "Neural-network structure visualized in the browser" },
    ],
  },
]

export type Experience = {
  company: string
  role: string
  period: string
  stack: string[]
  bullets: string[]
}

export const experience: Experience[] = [
  {
    company: "BusPlanner",
    role: "Software Engineer Intern",
    period: "May 2026 – Aug 2026",
    stack: ["C++", "C#", "ASP.NET", "SQL Server", "PowerShell", "GitHub Actions"],
    bullets: [
      "Owned enrollment/eligibility workflows across ASP.NET, C# business logic, legacy C++/MFC and SQL Server — ~15,000 student records across 100+ districts daily.",
      "Traced and fixed a production data-corruption defect across the C# service and stored-procedure layers, preventing integrity failures across ~8 districts.",
      "Rewrote 3 high-frequency queries, cutting enrollment page load ~35%.",
      "Led the full migration from Azure DevOps to GitHub + Jira (CI/CD, branching, traceability) — cut average PR cycle time ~2 days across 8 engineers.",
      "Built a PowerShell provisioning tool that took new-dev onboarding from ~1 day to under 2 hours.",
      "Closed ~40 production defects in a 500,000+ line codebase over a 4-month term.",
    ],
  },
  {
    company: "UWaterloo CS Club",
    role: "Platform Engineer",
    period: "Sept 2025 – Present",
    stack: ["React", "Next.js", "TypeScript", "GCP", "Figma"],
    bullets: [
      "Maintain a production platform serving 3,000+ active CS students at ~99.5% uptime.",
      "Built the LLM pipeline that turns messy Discord event posts into schema-validated JSON — a validation layer makes bad output fail loudly instead of slipping downstream, and a confidence check just asks the poster to reformat when it's unsure. I also wrote the JSON/Markdown data contract the three subteams built against, so everyone could work in parallel.",
      "Shipped 10+ dynamic content modules from requirements to production within 1–2 week turnarounds.",
      "Reviewed 25+ PRs; cut page rendering overhead ~20% by eliminating unnecessary re-renders.",
      "Deploy to GCP via GitHub Actions with rollback procedures.",
    ],
  },
  {
    company: "Midnight Sun Solar Car Team",
    role: "Firmware Test Engineer",
    period: "Sept 2025 – Present",
    stack: ["C", "GDB", "Unity Test", "Embedded"],
    bullets: [
      "Brought test coverage from ~0% to ~70% across ~12 safety-critical modules using the Unity framework.",
      "Diagnosed 6 firmware defects with GDB down to register-level root causes on a competition solar vehicle.",
      "Built a simulated test environment enabling 4× faster iteration than on-hardware testing.",
    ],
  },
]

// "What I'm building right now" — signals active momentum.
export const nowBuilding = [
  {
    title: "Solar-car firmware",
    detail: "Pushing battery-monitoring test coverage and chasing register-level bugs with GDB on Midnight Sun.",
  },
  {
    title: "Autonomous quadcopter",
    detail: "Tightening the OpenCV + PID landing loop and keeping SITL and hardware behaving identically.",
  },
  {
    title: "Osmia & OpenBy",
    detail: "Still live. Refining the scoring loop and signal fusion, version by documented version.",
  },
]

export const education = {
  school: "University of Waterloo",
  program: "Honours Computer Science",
  period: "Sept 2025 – Apr 2029",
  coursework: [
    "Data Structures & Algorithms",
    "Probability & Statistics",
    "Real Analysis",
    "Abstract Algebra",
    "Multivariable Calculus",
  ],
}
