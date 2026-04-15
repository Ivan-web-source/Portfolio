// src/components/Hero.js
import React from 'react';
import './Hero.css';

export default function Hero({ visible }) {
  const scrollDown = () =>
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className={`hero${visible ? ' hero--visible' : ''}`}>

<img src="/assets/hero-bg.jpg" alt="" className="hero__bg-img" />

      {/* Dark gradient overlay — keeps text readable over any photo */}
      <div className="hero__bg-overlay" />

      {/* Animated birds */}
      <Birds />

      <div className="hero__content">
        {/* Left — text */}
        <div className="hero__left">
          <span className="hero__eyebrow">Hello, I'm</span>
          <h1 className="hero__name">
            Albertus<br /><em>Ivan Wijaya</em>
          </h1>
          <p className="hero__tagline">
            Software Developer &amp; CS + Statistics student at UBC.
            I build full-stack applications, embedded systems,
            and AI-powered tools that solve real problems.
          </p>

          <div className="hero__badges">
            {['React / React Native', 'FastAPI', 'Python', 'C++'].map(b => (
              <span key={b} className="badge">{b}</span>
            ))}
          </div>

          <div className="hero__actions">
            <a href="mailto:wialbertusivan@gmail.com" className="btn btn--primary">
              Get in Touch
            </a>
            <a
              href="https://github.com/Ivan-web-source"
              target="_blank"
              rel="noreferrer"
              className="btn btn--ghost"
            >
              GitHub ↗
            </a>
          </div>

          <div className="hero__socials">
            <a href="https://www.linkedin.com/in/albertus-ivan-wijaya-7b2219274/"
               target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
            <a href="https://github.com/Ivan-web-source"
               target="_blank" rel="noreferrer" aria-label="GitHub">
              <GitHubIcon />
            </a>
          </div>
        </div>

        {/* Right — lens circle */}
        <div className="hero__right">
          <div className="hero__lens">
            <div className="hero__lens-bezel hero__lens-bezel--outer" />
            <div className="hero__lens-bezel hero__lens-bezel--inner" />

            <div className="hero__lens-photo">
              <img src="/assets/profile-pic.jpg" alt="Albertus Ivan Wijaya" className="hero__lens-img"/>

              <div className="hero__lens-ring hero__lens-ring--1" />
              <div className="hero__lens-ring hero__lens-ring--2" />
            </div>

            <div className="hero__stat hero__stat--tl">
              <span className="stat-num">6+</span>
              <span className="stat-lbl">Projects</span>
            </div>
            <div className="hero__stat hero__stat--br">
              <span className="stat-num">600+</span>
              <span className="stat-lbl">Mentored</span>
            </div>
          </div>
        </div>
      </div>

      <button className="hero__scroll-cue" onClick={scrollDown} aria-label="Scroll down">
        <span className="scroll-line" />
        <span className="scroll-dot" />
      </button>
    </section>
  );
}

/* ── Birds ── */
function Birds() {
  return (
    <div className="birds" aria-hidden="true">
      <div className="bird bird--1"><BirdSVG /></div>
      <div className="bird bird--2"><BirdSVG /></div>
    </div>
  );
}

function BirdSVG() {
  return (
    <svg className="bird-svg" viewBox="0 0 64 24" xmlns="http://www.w3.org/2000/svg" fill="none">
      <ellipse cx="32" cy="13" rx="5" ry="2.8" fill="rgba(111,202,150,0.55)" />
      <path className="bird-wing bird-wing--left"  d="M27 13 Q18 4 8 9 Q16 13 27 13Z"  fill="rgba(111,202,150,0.45)" />
      <path className="bird-wing bird-wing--right" d="M37 13 Q46 4 56 9 Q48 13 37 13Z" fill="rgba(111,202,150,0.45)" />
      <path d="M36 14.5 Q40 17 38 20 Q34 16 36 14.5Z" fill="rgba(111,202,150,0.3)" />
      <circle cx="27.5" cy="11.5" r="2.2" fill="rgba(111,202,150,0.6)" />
      <path d="M25.5 11 L22 10.5 L25.2 12Z" fill="rgba(111,202,150,0.7)" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  );
}
