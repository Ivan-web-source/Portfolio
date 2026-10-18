// src/components/Experience.js
// Rows on the left, one picture on the right. The picture lives in its own
// column and glides to whichever row you point at (or the open one), so it
// never covers the writing.
import React, { useLayoutEffect, useRef, useState } from 'react';
import BlurText from './BlurText';
import { gsap } from '../lib/motion';
import { EXPERIENCE } from '../data/projects';
import { EXPERIENCE_SHOTS } from '../data/media';
import './Experience.css';

export default function Experience() {
  const listRef = useRef(null);
  const cardRef = useRef(null);
  const rowRefs = useRef([]);
  const [hovered, setHovered] = useState(null);
  const [open, setOpen] = useState(0);
  const shown = hovered ?? open ?? 0;

  // Line the picture up with the row it belongs to
  useLayoutEffect(() => {
    const row = rowRefs.current[shown];
    const card = cardRef.current;
    if (!row || !card) return;
    const y = row.offsetTop + row.offsetHeight / 2 - card.offsetHeight / 2;
    const max = listRef.current.offsetHeight - card.offsetHeight;
    gsap.to(card, { y: gsap.utils.clamp(0, Math.max(0, max), y), duration: 0.7, ease: 'power3.out', overwrite: true });
  }, [shown, open]);

  return (
    <section className="experience" id="experience">
      <BlurText className="headline experience__title" text={'Where I’ve worked'} />

      <div className="experience__body">
        <div className="experience__list" ref={listRef} onMouseLeave={() => setHovered(null)}>
          {EXPERIENCE.map((job, i) => {
            const isOpen = open === i;
            return (
              <div
                key={job.org + job.role}
                ref={(el) => { rowRefs.current[i] = el; }}
                className={`job${isOpen ? ' is-open' : ''}${shown === i ? ' is-shown' : ''}`}
                onMouseEnter={() => setHovered(i)}
              >
                <button
                  type="button"
                  className="job__row"
                  aria-expanded={isOpen}
                  aria-controls={`job-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  onFocus={() => setHovered(i)}
                >
                  <span className="job__org">{job.org}</span>
                  <span className="job__meta">{job.role} · {job.period}</span>
                  <span className="job__toggle" aria-hidden="true" />
                </button>
                <div className="job__body" id={`job-${i}`} hidden={!isOpen}>
                  <ul>{job.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="experience__aside" aria-hidden="true">
          <div className="experience__card" ref={cardRef}>
            {EXPERIENCE.map((job, i) => (
              <img
                key={job.org}
                src={EXPERIENCE_SHOTS[job.org]}
                alt=""
                width="800"
                height="600"
                loading="lazy"
                className={shown === i ? 'is-current' : ''}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
