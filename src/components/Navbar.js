// src/components/Navbar.js
import React, { useState, useEffect, useCallback } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  // Show navbar after scrolling 60% past hero height
  useEffect(() => {
    const handleScroll = () => {
      const heroH = document.getElementById('hero')?.offsetHeight || window.innerHeight;
      setScrolled(window.scrollY > heroH * 0.6);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLink = useCallback((e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    // Small delay lets the drawer close before scrolling
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  }, []);

  return (
    <>
      <nav className={`navbar${scrolled ? ' navbar--visible' : ''}`} role="navigation">
        <div className="navbar__inner">
          <a href="#hero" className="navbar__logo" onClick={(e) => handleLink(e, '#hero')}>
            Ivan
          </a>

          {/* Desktop links */}
          <ul className="navbar__links" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a href={href} onClick={(e) => handleLink(e, href)}>{label}</a>
              </li>
            ))}
          </ul>

          {/* Hamburger — mobile only */}
          <button
            className={`navbar__burger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer — separate from navbar so it can be full-height */}
      <div
        id="mobile-menu"
        className={`mobile-drawer${menuOpen ? ' mobile-drawer--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        {/* Backdrop */}
        <div
          className="mobile-drawer__backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Panel */}
        <div className="mobile-drawer__panel">
          <div className="mobile-drawer__header">
            <span className="mobile-drawer__logo">Ivan</span>
            <button
              className="mobile-drawer__close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <nav className="mobile-drawer__nav">
            {NAV_LINKS.map(({ label, href }, i) => (
              <a
                key={href}
                href={href}
                className="mobile-drawer__link"
                style={{ animationDelay: menuOpen ? `${i * 0.06}s` : '0s' }}
                onClick={(e) => handleLink(e, href)}
              >
                <span className="mobile-drawer__link-num">0{i + 1}</span>
                {label}
              </a>
            ))}
          </nav>

          <div className="mobile-drawer__footer">
            <a href="mailto:wialbertusivan@gmail.com" className="mobile-drawer__cta">
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
