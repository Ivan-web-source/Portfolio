// src/data/projects.js

export const PROJECTS = [
  {
    id: 1,
    title: "FinWise",
    subtitle: "AI-Powered Finance Tracker",
    status: "Ongoing",
    year: "2026–",
    description:
      "A cross-platform mobile app helping users track transactions and visualize spending habits. Features AI-driven personalized insights via self-hosted Ollama LLM models, real-time sync across devices, and intelligent rate-limiting for AI inference workloads.",
    tech: ["React Native", "FastAPI", "Ollama (LLM)", "Python", "REST API"],
    demoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    githubUrl: "https://github.com/Ivan-web-source",
    color: "#d9f2e3",
    accentColor: "#22915a",
  },
  {
    id: 2,
    title: "Dynamic Polar Renderer",
    subtitle: "Persistence of Vision Rendering",
    status: "Completed",
    year: "2026",
    description:
      "A rendering system that reconstructs images using a single rotating LED column driven by real-time encoder angle data. Developed timing-critical C++ firmware on ESP32 for drift correction, with full end-to-end flow from web input to embedded output.",
    tech: ["C++", "ESP32", "Embedded Firmware", "Python", "WebSocket"],
    demoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    githubUrl: "https://github.com/Ivan-web-source",
    color: "#e8f5e9",
    accentColor: "#1a7247",
  },
  {
    id: 3,
    title: "WasteNot",
    subtitle: "Food Donation and Recycle System",
    status: "Completed",
    year: "2025",
    description:
      "A system designed to help people donate or reuse surplus foods. Implemented relational schemas in Oracle with full CRUD operations, secured with bind variables to prevent SQL injection attacks.",
    tech: ["FastAPI", "Oracle DB", "Python", "SQL", "REST API"],
    demoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    githubUrl: "https://github.com/Ivan-web-source",
    color: "#f0faf4",
    accentColor: "#3db370",
  },
  {
    id: 4,
    title: "InsightUBC",
    subtitle: "Course Analysis Platform",
    status: "Completed",
    year: "2025",
    description:
      "A full-stack course analysis website built with React frontend and FastAPI + TypeScript backend. Developed using agile sprints and user stories, with automated end-to-end testing via Selenium to validate all user workflows.",
    tech: ["React", "TypeScript", "FastAPI", "Selenium", "Agile"],
    demoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    githubUrl: "https://github.com/Ivan-web-source",
    color: "#d9f2e3",
    accentColor: "#22915a",
  },
  {
    id: 5,
    title: "MatchMind",
    subtitle: "Educational Tic-Tac-Toe Game",
    status: "Completed",
    year: "2025",
    description:
      "An educational tic-tac-toe game that combines learning with gameplay. Built with a FastAPI backend and vanilla JS frontend, deployed on AWS EC2 with a custom HTTPS domain for production access.",
    tech: ["JavaScript", "FastAPI", "Python", "AWS EC2", "HTTPS"],
    demoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    githubUrl: "https://github.com/Ivan-web-source/matchmind",
    color: "#e8f5e9",
    accentColor: "#1a7247",
  },
  {
    id: 6,
    title: "M-List",
    subtitle: "Film Discovery & Tracker",
    status: "Completed",
    year: "2024",
    description:
      "A personal film tracking application to discover, organize, and review movies. A project born from a passion for cinema — users can curate watchlists, log films they've seen, and share their viewing history.",
    tech: ["JavaScript", "HTML/CSS", "REST API", "Local Storage"],
    demoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    githubUrl: "https://github.com/Ivan-web-source/Movie-List",
    color: "#f0faf4",
    accentColor: "#3db370",
  },
];

export const EXPERIENCE = [
  {
    role: "Undergraduate Teaching Assistant",
    org: "University of British Columbia",
    location: "Vancouver, BC",
    period: "January 2025 – Present",
    bullets: [
      "Developed and tested lab problems using JavaScript and Python, improving 600+ students' understanding of multiplexer circuits.",
      "Validated course content using Docker-based environments, ensuring consistency across development and production systems.",
      "Led weekly labs, tutorials, and office hours, mentoring undergraduate students on computation logic and proof.",
      "Collaborated with a 35-member instructional team to standardize lab structure and tutorial delivery across course sections.",
    ],
  },
];

export const SKILLS = {
  languages: ["Java", "Python", "JavaScript", "TypeScript", "C/C++", "R", "Kotlin", "SQL"],
  frameworks: ["React", "React Native", "FastAPI", "Node.js", "Selenium", "Docker"],
  tools: ["Git/GitHub", "AWS EC2", "Oracle DB", "Android Studio", "JupyterHub", "Ollama"],
};
