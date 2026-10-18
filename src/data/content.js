// src/data/content.js — words for the sections that aren't projects or jobs

export const PRACTICES = [
  {
    title: 'AI agents',
    body: 'Prompts, tools and evaluations for LLM agents that act on real accounts: order lookups, cancellations, retrieval over course material.',
  },
  {
    title: 'Full-stack apps',
    body: 'React and React Native on the front, FastAPI and SQL behind it, deployed and tested end to end with Selenium and Docker.',
  },
  {
    title: 'Embedded systems',
    body: 'Timing-critical C++ on the ESP32, like a single spinning LED column that redraws a picture from encoder angles.',
  },
];

export const TOOLKIT = [
  { title: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'Java', 'C/C++', 'Kotlin', 'R', 'SQL'] },
  { title: 'AI and LLMs', items: ['Claude', 'GPT', 'LangChain', 'Qwen', 'Ollama', 'Prompt evals', 'RAG'] },
  { title: 'Frameworks', items: ['React', 'React Native', 'FastAPI', 'Node.js', 'Selenium'] },
  { title: 'Hardware', items: ['ESP32', 'Embedded C++', 'Encoders', 'LED drivers', 'WebSocket control'] },
  { title: 'Platforms', items: ['Docker', 'AWS EC2', 'Oracle DB', 'Git and GitHub', 'Canvas LTI 1.3', 'CI/CD'] },
];

export const FAQ = [
  {
    q: 'What are you looking for right now?',
    a: 'Software engineering internships and co-op terms, especially work on AI agents, developer tools or anything where software meets hardware.',
  },
  {
    q: 'What does an AI agent engineer actually do day to day?',
    a: 'At Sendbird I write system prompts and tool definitions, wire customer APIs in as agent tools, and build evaluations that tell us whether a prompt change made the agent better or worse.',
  },
  {
    q: 'Do you prefer front end or back end?',
    a: 'Both, honestly. Most of my projects run the whole way from a React or React Native interface down to a FastAPI service and a database.',
  },
  {
    q: 'What is the spinning LED project?',
    a: 'A persistence-of-vision display: one column of LEDs spins fast while ESP32 firmware lights each LED for the exact angle it is passing, so a full picture appears in mid-air.',
  },
  {
    q: 'Where are you based?',
    a: 'Vancouver, British Columbia. I study Computer Science and Statistics at UBC.',
  },
];
