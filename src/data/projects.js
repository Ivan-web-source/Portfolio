// src/data/projects.js

export const PROJECTS = [
  {
    id: 1,
    title: "FinWise",
    subtitle: "AI-Powered Finance Tracker",
    status: "Ongoing",
    year: "2025–",
    description:
      "A cross-platform mobile app helping users track transactions and visualize spending habits. Features AI-driven personalized insights via self-hosted Ollama LLM models, real-time sync across devices, and intelligent rate-limiting for AI inference workloads.",
    tech: ["React Native", "FastAPI", "Ollama (LLM)", "Python", "REST API"],
    demoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    githubUrl: "https://github.com/Ivan-web-source",
    color: "#eef5ec",
    accentColor: "#3d6438",
  },
  {
    id: 2,
    title: "Dynamic Polar Renderer",
    subtitle: "Embedded Systems & Firmware",
    status: "Completed",
    year: "2024",
    description:
      "A persistence-of-vision rendering system that reconstructs images using a single rotating LED column driven by real-time encoder angle data. Developed timing-critical C++ firmware on ESP32 for drift correction, with full end-to-end flow from web input to embedded output.",
    tech: ["C++", "ESP32", "Embedded Firmware", "Python", "WebSocket"],
    demoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    githubUrl: "https://github.com/Ivan-web-source",
    color: "#f0ead6",
    accentColor: "#615a21",
  },
  {
    id: 3,
    title: "WasteNot",
    subtitle: "Food Donation Backend System",
    status: "Completed",
    year: "2024",
    description:
      "A backend system designed to track surplus food inventory and manage donation workflows. Implemented relational schemas in Oracle with full CRUD operations, secured with bind variables to prevent SQL injection attacks.",
    tech: ["FastAPI", "Oracle DB", "Python", "SQL", "REST API"],
    demoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    githubUrl: "https://github.com/Ivan-web-source",
    color: "#eef5ec",
    accentColor: "#527a4c",
  },
  {
    id: 4,
    title: "InsightUBC",
    subtitle: "Course Analysis Platform",
    status: "Completed",
    year: "2024",
    description:
      "A full-stack course analysis website built with React frontend and FastAPI + TypeScript backend. Developed using agile sprints and user stories, with automated end-to-end testing via Selenium to validate all user workflows.",
    tech: ["React", "TypeScript", "FastAPI", "Selenium", "Agile"],
    demoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    githubUrl: "https://github.com/Ivan-web-source",
    color: "#f3f1e8",
    accentColor: "#4a4317",
  },
  {
    id: 5,
    title: "MatchMind",
    subtitle: "Educational Tic-Tac-Toe Game",
    status: "Completed",
    year: "2023",
    description:
      "An educational tic-tac-toe game that combines learning with gameplay. Built with a FastAPI backend and vanilla JS frontend, deployed on AWS EC2 with a custom HTTPS domain for production access.",
    tech: ["JavaScript", "FastAPI", "Python", "AWS EC2", "HTTPS"],
    demoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    githubUrl: "https://github.com/Ivan-web-source",
    color: "#eef5ec",
    accentColor: "#3d6438",
  },
  {
    id: 6,
    title: "Movie List",
    subtitle: "Film Discovery & Tracker",
    status: "Completed",
    year: "2023",
    description:
      "A personal film tracking application to discover, organize, and review movies. Users can curate watchlists, log films they've seen, and share their viewing history.",
    tech: ["JavaScript", "HTML/CSS", "REST API", "Local Storage"],
    demoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    githubUrl: "https://github.com/Ivan-web-source",
    color: "#f0ead6",
    accentColor: "#877e3b",
  },
];

export const EXPERIENCE = [
  {
    role: "Undergraduate Teaching Assistant",
    org: "University of British Columbia",
    location: "Vancouver, BC",
    period: "January 2025 – Present",
    bullets: [
      "Developed and tested lab problems using JavaScript and Python, improving 580+ students' understanding of multiplexer circuits.",
      "Validated course content using Docker-based environments, ensuring consistency across development and production systems.",
      "Led weekly labs, tutorials, and office hours, mentoring 600 undergraduate students on computation logic and proof.",
      "Collaborated with a 35-member instructional team to standardize lab structure and tutorial delivery across course sections.",
    ],
  },
];

export const SKILLS = {
  languages:  ["Java", "Python", "JavaScript", "TypeScript", "C/C++", "R", "Kotlin", "SQL"],
  frameworks: ["React", "React Native", "FastAPI", "Node.js", "Selenium", "Docker"],
  tools:      ["Git/GitHub", "AWS EC2", "Oracle DB", "Android Studio", "JupyterHub", "Ollama"],
};
