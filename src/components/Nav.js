// src/components/Nav.js — the fixed bar after the opening: the same wordmark
// and "Get in touch" pill as the hero, nothing else, like the reference.
// Slides away while you scroll down and comes back when you scroll up.
// During the opening it is hidden: the hero's own bar is the nav there.
import React, { useEffect, useState } from 'react';
import { Wordmark, TouchPill } from './Brand';
import './Nav.css';

export default function Nav() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // The opening scene fades the nav itself; sliding it as well would jump
      if (document.documentElement.classList.contains('in-opening')) {
        setHidden(false);
        last = y;
        return;
      }
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 120);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav${hidden ? ' is-hidden' : ''}`} onFocus={() => setHidden(false)}>
      <Wordmark />
      <TouchPill />
    </header>
  );
}
