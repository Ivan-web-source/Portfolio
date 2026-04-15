// src/components/Intro.js
import React, { useEffect, useRef, useState } from 'react';
import './Intro.css';

/**
 * IntroOverlay — camera lens zoom-through entrance.
 *
 * Phases:
 *   enter   (0 → 1s)    : dark bg + lens visible, text fades in
 *   zoom    (1s → 2.4s) : lens scales up (zoom-through effect)
 *   fadeout (2.4s → 3.4s): overlay fades out AND lens scales back to normal
 *                          so the zoomed photo doesn't bleed into the hero
 *   done    (3.4s+)     : component unmounts entirely
 *
 * Two separate photo slots:
 *   intro photo → src/assets/intro-photo.jpg  (shown inside the lens during the animation)
 *   hero  photo → public/assets/profile-pic.jpg (shown in the main hero frame)
 *
 * To customise: see PHOTO CUSTOMISATION comment below.
 */
export default function IntroOverlay({ onComplete }) {
  const [phase, setPhase] = useState('enter');

  useEffect(() => {
    const t0 = setTimeout(() => setPhase('zoom'),    1000);
    const t1 = setTimeout(() => setPhase('fadeout'), 2500);
    const t2 = setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, 3500);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div
      className={`intro-overlay intro-overlay--${phase}`}
      aria-hidden="true"
    >
      <div className="intro-dark" />

      {/* ── Lens circle ── */}
      <div className={`intro-lens intro-lens--${phase}`}>
        <div className="intro-lens__inner">

        <img src="/assets/intro-photo.jpg" alt="" className="intro-lens__photo" />

          <div className="intro-lens__ring intro-lens__ring--1" />
          <div className="intro-lens__ring intro-lens__ring--2" />
        </div>
        <div className="intro-lens__bevel" />
      </div>

      {/* ── Surrounding text ── */}
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

      {/* ── Scroll hint ── */}
      <div className={`intro-scroll-hint intro-scroll-hint--${phase}`}>
        <span>scroll to explore</span>
        <div className="intro-scroll-line" />
      </div>
    </div>
  );
}
