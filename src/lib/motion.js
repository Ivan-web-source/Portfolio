// src/lib/motion.js
// Lenis smooth scrolling driven by GSAP's ticker, so ScrollTrigger scrubs and
// the scroll position always agree. Everything scroll-linked uses this.
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Keep in step with the `max-width: 860px` media queries in the CSS files
export const PHONE_QUERY = '(max-width: 860px)';
export const DESKTOP_QUERY = '(min-width: 861px)';
export const isPhone = () => window.matchMedia(PHONE_QUERY).matches;

// Blur used in scroll animations; none at all for reduced-motion visitors
export const blur = (px) => `blur(${prefersReducedMotion() ? 0 : px}px)`;

let lenis = null;

export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenis = null;
    };
  }, []);
}

export function scrollToY(y) {
  if (lenis) lenis.scrollTo(y, { duration: 1.4 });
  else window.scrollTo({ top: y, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

// Places inside pinned scenes have no fixed element to scroll to; a scene
// registers a function that returns the right scroll position instead.
const anchors = new Map();
export const setAnchor = (hash, getY) => anchors.set(hash, getY);

// In-page links go through Lenis so they glide instead of jumping
export function scrollToHash(hash) {
  if (anchors.has(hash)) return scrollToY(anchors.get(hash)());
  const target = document.querySelector(hash);
  if (!target) return;
  if (lenis) lenis.scrollTo(target, { duration: 1.4 });
  else target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}
