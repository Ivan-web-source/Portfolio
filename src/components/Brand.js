// src/components/Brand.js — the wordmark and the "Get in touch" pill, shared by
// the hero (drawn on the laptop screen) and the fixed site nav, so the two are
// identical when one hands over to the other.
import React from 'react';
import { scrollToHash } from '../lib/motion';
import './Brand.css';

const go = (e, href) => { e.preventDefault(); scrollToHash(href); };

export function Wordmark({ className = '' }) {
  return (
    <a className={`wordmark ${className}`} href="#top" onClick={(e) => go(e, '#top')} aria-label="Ivan Wijaya, back to top">
      <span className="wordmark__first">IVAN</span><span className="wordmark__last">WIJAYA</span>
    </a>
  );
}

// White pill with a dot. On hover a dark fill sweeps in from the dot's side,
// the label turns white and the dot swells, without needing a click.
export function TouchPill({ className = '' }) {
  return (
    <a className={`touch ${className}`} href="#contact" onClick={(e) => go(e, '#contact')}>
      <span className="touch__fill" aria-hidden="true" />
      <span className="touch__dot" aria-hidden="true" />
      <span className="touch__label">Get in touch</span>
    </a>
  );
}
