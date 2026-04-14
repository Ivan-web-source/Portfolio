// src/components/Intro.js
// Camera-lens intro animation: dark bg → circle expands → zooms through → hero reveals
import React, { useEffect, useRef, useState } from 'react';
import './Intro.css';

/**
 * IntroOverlay
 * Phase 0 (0–0.6s):  Dark screen fades in, circular lens appears with profile photo + text
 * Phase 1 (0.8–2.2s): Circle scales up (zoom through lens effect)
 * Phase 2 (2.2–3.2s): Dark overlay fades out revealing the hero beneath
 * Phase 3 (3.2s+):    Overlay unmounts, hero text fades in
 *
 * Props:
 *   onComplete: () => void   — called when overlay is done and should be removed
 */
export default function IntroOverlay({ onComplete }) {
  const overlayRef = useRef(null);
  // phase: 'enter' | 'zoom' | 'fadeout' | 'done'
  const [phase, setPhase] = useState('enter');

  useEffect(() => {
    // Small initial delay so the page is rendered
    const t0 = setTimeout(() => setPhase('zoom'), 900);
    const t1 = setTimeout(() => setPhase('fadeout'), 2400);
    const t2 = setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, 3600);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div
      ref={overlayRef}
      className={`intro-overlay intro-overlay--${phase}`}
      aria-hidden="true"
    >
      {/* Dark background */}
      <div className="intro-dark" />

      {/* The lens circle */}
      <div className={`intro-lens intro-lens--${phase}`}>
        {/* Profile photo inside the lens */}
        <div className="intro-lens__inner">
          <div className="intro-lens__placeholder">
            <img src="/assets/profile-pic.jpg" alt="" className="intro-lens__photo" />
          </div>
          {/* Lens reflection ring */}
          <div className="intro-lens__ring intro-lens__ring--1" />
          <div className="intro-lens__ring intro-lens__ring--2" />
        </div>
        {/* Outer beveled ring of the camera lens */}
        <div className="intro-lens__bevel" />
      </div>

      {/* Text around the lens — fades out as circle expands */}
      <div className={`intro-text intro-text--${phase}`}>
        <div className="intro-text__tl">
          <span className="intro-eyebrow">Hello, I'm</span>
          <h1 className="intro-name">
            Albertus<br /><em>Ivan</em>
          </h1>
        </div>
        <div className="intro-text__br">
          <p className="intro-tagline">CS &amp; Statistics · UBC</p>
          <p className="intro-tagline intro-tagline--sub">Software Developer</p>
        </div>
      </div>

      {/* Scroll hint */}
      <div className={`intro-scroll-hint intro-scroll-hint--${phase}`}>
        <span>scroll to explore</span>
        <div className="intro-scroll-line" />
      </div>
    </div>
  );
}
