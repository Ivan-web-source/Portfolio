// src/components/Closing.js — the last card: how to get in touch
import React, { useEffect, useRef, useState } from 'react';
import BlurText from './BlurText';
import './Closing.css';

const EMAIL = 'wialbertusivan@gmail.com';
const LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/albertus-ivan-wijaya-7b2219274/' },
  { label: 'GitHub', href: 'https://github.com/Ivan-web-source' },
];

export default function Closing() {
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef(0);
  useEffect(() => () => clearTimeout(copiedTimer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section className="closing" id="contact">
      <div className="closing__card">
        <div className="closing__top">
          <p className="closing__mark">Ivan Wijaya</p>
          <div className="closing__ask">
            <BlurText as="h2" className="closing__title" text={'Ready to build\nsomething together?'} />
            <a className="pill" href={`mailto:${EMAIL}?subject=${encodeURIComponent('Hello from your portfolio')}`}>Email me</a>
          </div>
        </div>

        <div className="closing__bottom">
          <div>
            <p className="closing__label">Reach me</p>
            <button type="button" className="closing__email" onClick={copy} aria-live="polite">
              {copied ? 'Copied to clipboard' : EMAIL}
            </button>
            <p className="closing__where">Vancouver, British Columbia</p>
          </div>
          <nav className="closing__links" aria-label="Elsewhere">
            {LINKS.map((l) => (
              <a key={l.label} className="pill pill--dark" href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>
            ))}
          </nav>
        </div>
      </div>
      <p className="closing__legal">© {new Date().getFullYear()} Albertus Ivan Wijaya. Built with React.</p>
    </section>
  );
}
