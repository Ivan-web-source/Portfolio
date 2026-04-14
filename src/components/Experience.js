// src/components/Experience.js
import React, { useEffect, useRef, useState } from 'react';
import { EXPERIENCE } from '../data/projects';
import './Experience.css';

export default function Experience() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    // id="experience" so the nav "Experience" link works correctly
    // id="about" lives on the invisible anchor above so "About" also scrolls here
    <section id="experience" className="experience" ref={sectionRef}>
      {/* "About" nav anchor — sits 80px above so it lands cleanly below the navbar */}
      <span id="about" style={{ position: 'absolute', marginTop: '-80px' }} />

      <div className="experience__inner">
        <div className={`section-label${visible ? ' visible' : ''}`}>Experience</div>
        <h2 className={`section-title${visible ? ' visible' : ''}`}>
          Where I've <em>contributed</em>
        </h2>

        <div className={`experience__timeline${visible ? ' visible' : ''}`}>
          {EXPERIENCE.map((item, i) => (
            <ExperienceCard key={i} item={item} index={i} visible={visible} />
          ))}

          
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ item, index, visible }) {
  return (
    <div
      className={`exp-card${visible ? ' exp-card--visible' : ''}`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="exp-card__left">
        <div className="exp-card__dot" />
        <div className="exp-card__line" />
      </div>
      <div className="exp-card__body">
        <div className="exp-card__meta">
          <span className="exp-card__period">{item.period}</span>
          <span className="exp-card__badge">Work</span>
        </div>
        <h3 className="exp-card__role">{item.role}</h3>
        <p className="exp-card__org">{item.org} · {item.location}</p>
        <ul className="exp-card__bullets">
          {item.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
