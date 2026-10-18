// src/components/Nav.js — wordmark, four links, one action.
// Slides away while you scroll down and comes back when you scroll up.
// During the opening it is hidden: the nav drawn on the laptop screen is the
// working nav there, and it can still open this one's phone menu.
import React, { useEffect, useState } from 'react';
import { scrollToHash } from '../lib/motion';
import './Nav.css';

export const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'FAQ', href: '#faq' },
];

// Lets the opening's on-screen nav open the phone menu
export const openMenu = () => window.dispatchEvent(new Event('ivan:open-menu'));

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    const onOpen = () => setMenuOpen(true);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('ivan:open-menu', onOpen);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('ivan:open-menu', onOpen);
    };
  }, []);

  // Close the phone menu with Escape; while it is open the on-screen nav in
  // the opening steps aside so the two bars don't print over each other
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', menuOpen);
    if (!menuOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const go = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToHash(href);
  };

  return (
    <header className={`nav${hidden && !menuOpen ? ' is-hidden' : ''}${menuOpen ? ' is-open' : ''}`} onFocus={() => setHidden(false)}>
      <a className="nav__mark" href="#top" onClick={(e) => go(e, '#top')}>Ivan Wijaya</a>
      <button
        type="button"
        className="pill nav__menu"
        aria-expanded={menuOpen}
        aria-controls="nav-links"
        onClick={() => setMenuOpen((v) => !v)}
      >
        {menuOpen ? 'Close' : 'Menu'}
      </button>
      <nav className="nav__links" id="nav-links" aria-label="Main">
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}>{l.label}</a>
        ))}
      </nav>
      <a className="pill nav__cta" href="#contact" onClick={(e) => go(e, '#contact')}>Get in touch</a>
    </header>
  );
}
