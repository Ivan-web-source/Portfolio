// src/components/Skills.js
import React, { useEffect, useRef, useState } from 'react';
import { SKILLS } from '../data/projects';
import './Skills.css';

/**
 * Skills section — clean scannable grid of skill pills.
 * Three categories: Languages, Frameworks & Libraries, Tools.
 * Each pill has a subtle level indicator so it reads at a glance.
 */

// Proficiency levels per skill (1–5 dots)
const LEVELS = {
  // Languages
  'Java':         4,
  'Python':       5,
  'JavaScript':   4,
  'TypeScript':   3,
  'C/C++':        3,
  'R':            4,
  'Kotlin':       3,
  'SQL':          4,
  // Frameworks
  'React':        4,
  'React Native': 4,
  'FastAPI':      4,
  'Node.js':      3,
  'Selenium':     3,
  'Docker':       3,
  // Tools
  'Git/GitHub':   5,
  'AWS EC2':      3,
  'Oracle DB':    3,
  'Android Studio': 3,
  'JupyterHub':   3,
  'Ollama':       3,
};

const CATEGORIES = [
  {
    key: 'languages',
    label: 'Languages',
    icon: <CodeIcon />,
    items: SKILLS.languages,
  },
  {
    key: 'frameworks',
    label: 'Frameworks & Libraries',
    icon: <LayersIcon />,
    items: SKILLS.frameworks,
  },
  {
    key: 'tools',
    label: 'Tools & Platforms',
    icon: <WrenchIcon />,
    items: SKILLS.tools,
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      <div className="skills__inner">
        <div className={`section-label${visible ? ' visible' : ''}`}>Skills</div>
        <h2 className={`section-title${visible ? ' visible' : ''}`}>
          What I <em>work with</em>
        </h2>

        <div className="skills__grid">
          {CATEGORIES.map((cat, ci) => (
            <div
              key={cat.key}
              className={`skill-cat${visible ? ' skill-cat--visible' : ''}`}
              style={{ transitionDelay: `${ci * 0.1}s` }}
            >
              <div className="skill-cat__header">
                <span className="skill-cat__icon">{cat.icon}</span>
                <h3 className="skill-cat__label">{cat.label}</h3>
              </div>
              <div className="skill-cat__pills">
                {cat.items.map((skill, si) => (
                  <SkillPill
                    key={skill}
                    name={skill}
                    level={LEVELS[skill] || 3}
                    visible={visible}
                    delay={ci * 0.1 + si * 0.04}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillPill({ name, level, visible, delay }) {
  return (
    <div
      className={`skill-pill${visible ? ' skill-pill--visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <span className="skill-pill__name">{name}</span>
      <span className="skill-pill__dots" aria-label={`Level ${level} of 5`}>
        {[1,2,3,4,5].map(d => (
          <span
            key={d}
            className={`skill-pill__dot${d <= level ? ' skill-pill__dot--on' : ''}`}
          />
        ))}
      </span>
    </div>
  );
}

/* ── Icons ── */
function CodeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  );
}
function LayersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
  );
}
function WrenchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  );
}
