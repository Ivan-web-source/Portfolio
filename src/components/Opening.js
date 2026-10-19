// src/components/Opening.js
// The first scene, pinned while you scroll:
//   1. The hero fills the window. It is the laptop's screen at full size.
//   2. Scrolling pulls the camera back: screen and laptop shrink together as
//      one object, in front of a wall of pictures that never stops drifting.
//   3. Scrolling on, the machine tips towards you and the lid closes. The
//      Work section then rises over the still-pinned scene (see Work.css).
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Laptop from './Laptop';
import { gsap, ScrollTrigger, isPhone, prefersReducedMotion } from '../lib/motion';
import { HERO_PORTRAIT, COLLAGE } from '../data/media';
import { Wordmark, TouchPill } from './Brand';
import './Opening.css';

// The laptop screen always covers the window at full size. Its shape follows
// the window, but stays within real laptop proportions (4:3 to 16:9).
function screenFor(vw, vh) {
  const a = vw / vh;
  if (a < 4 / 3) return { sw: vh * (4 / 3), sh: vh, vw, vh };
  if (a > 16 / 9) return { sw: vw, sh: vw / (16 / 9), vw, vh };
  return { sw: vw, sh: vh, vw, vh };
}
// clientWidth, not innerWidth: the screen must match the page, not the page plus
// its scrollbar, or the on-screen copy sits a scrollbar's width off
const measure = () => screenFor(document.documentElement.clientWidth, window.innerHeight);

const PIN_SCREENS = 3.4;   // how long the scene stays pinned, in window heights

// Split the collage into columns that scroll in alternating directions
const COLUMNS = 5;
const columns = Array.from({ length: COLUMNS }, (_, c) => COLLAGE.filter((_, i) => i % COLUMNS === c));

export default function Opening() {
  const stageRef = useRef(null);
  const rigRef = useRef(null);
  const bodyRef = useRef(null);
  const lidRef = useRef(null);
  const dimRef = useRef(null);
  const [{ sw, sh, vw, vh }, setSize] = useState(measure);

  // Keep the screen matched to the window
  useLayoutEffect(() => {
    let t = 0;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => setSize(measure()), 150);
    };
    window.addEventListener('resize', onResize);
    return () => { clearTimeout(t); window.removeEventListener('resize', onResize); };
  }, []);

  useLayoutEffect(() => {
    const b = sw * 0.014;           // bezel, as in Laptop.css
    const chin = sw * 0.02;
    const lidW = sw + 2 * b;
    const lidH = sh + b + chin;

    // Size of the whole laptop once the camera has pulled back
    const s1 = isPhone()
      ? (vw * 0.86) / lidW
      : Math.min((vw * 0.5) / lidW, (vh * 0.56) / lidH);
    // Re-centre on the whole machine (lid + visible deck), not just the screen
    const y1 = -((chin + sh * 0.16) / 2) * s1 - (isPhone() ? 0 : vh * 0.02);

    const ctx = gsap.context(() => {
      const rig = rigRef.current;
      const wall = stageRef.current.querySelector('.opening__wall');
      gsap.set(rig, { transformOrigin: `${b + sw / 2}px ${b + sh / 2}px` });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stageRef.current,
          start: 'top top',
          // One timeline second per window height of scroll. The last screen of
          // the pin is when the Work section slides up over it.
          end: () => `+=${window.innerHeight * PIN_SCREENS}`,
          pin: true,
          scrub: 0.6,   // Lenis already smooths the wheel; a light scrub avoids double lag
          // While pinned, the site nav's visibility belongs to this timeline
          // (see Nav.js). The wall stops when out of sight.
          onToggle: (self) => {
            document.documentElement.classList.toggle('in-opening', self.isActive);
            wall.classList.toggle('is-paused', !self.isActive);
          },
        },
      });

      // One continuous camera move, built from overlapping layers so there is
      // never a moment where everything has stopped:
      //   rig     pull-back from the full-screen first frame (starts from rest)
      //   machine a second, gentler shrink-and-lift that begins while the
      //           pull-back is still settling and carries through the fold
      //   body    tips towards the viewer, lid folds, screen dims, all
      //           overlapping the tail of the pull-back
      // Rig and machine scale different elements about the same point (the
      // screen's centre), so their effects multiply instead of fighting.
      const machine = rig.querySelector('.laptop');
      gsap.set(machine, { transformOrigin: `${b + sw / 2}px ${b + sh / 2}px` });

      tl.fromTo(rig, { scale: 1, y: 0 }, { scale: s1, y: y1, duration: 1.45, ease: 'sine.inOut' }, 0);
      // The wall is fully painted from page load (it sits behind the full-screen
      // laptop), so the first scroll never waits on painting thirty pictures
      tl.fromTo('.opening__wall', { scale: 1.35 }, { scale: 1, duration: 1.45, ease: 'sine.inOut' }, 0);
      // There is one nav in this scene: the one on the screen, which simply
      // shrinks with it. The fixed site nav stays hidden until the very end.
      const siteNav = document.querySelector('.nav');

      // The folded lid lies towards the viewer, so lift the machine as it
      // closes to keep it centred (y is inside the rig's scale, hence / s1)
      tl.fromTo(machine, { scale: 1, y: 0 },
        { scale: 0.8, y: -(vh * 0.26) / s1, duration: 1.55, ease: 'sine.inOut' }, 0.6);
      tl.to(bodyRef.current, { rotateX: -16, duration: 1.2, ease: 'sine.inOut' }, 0.65);
      tl.to(lidRef.current, { rotateX: -89, duration: 1.45, ease: 'sine.inOut' }, 0.75);
      tl.to(dimRef.current, { opacity: 0.9, duration: 1.3, ease: 'sine.inOut' }, 0.85);

      // Once the lid is shut, the hero's links can't be seen, so take them out
      // of the tab order (and put them back when scrolling up past the fold)
      const hero = machine.querySelector('.hero');
      tl.eventCallback('onUpdate', () => { hero.inert = tl.time() > 2.1; });

      // Hold the closed laptop while the Work section rises over it; the site
      // nav comes back as the section lands
      tl.to({}, { duration: PIN_SCREENS - tl.duration() });
      if (siteNav) tl.fromTo(siteNav, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, PIN_SCREENS - 0.3);
    }, stageRef);

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => {
      document.documentElement.classList.remove('in-opening');
      ctx.revert();
    };
  }, [sw, sh, vw, vh]);

  const b = sw * 0.014;

  return (
    <section className="opening" id="top" aria-label="Introduction">
      <div className="opening__stage" ref={stageRef}>
        {/* The wall of pictures behind the laptop. Moves by itself, always. */}
        <div className="opening__wall" aria-hidden="true">
          {columns.map((col, c) => (
            <WallColumn key={c} tiles={col} down={c % 2 === 1} seconds={46 + c * 7} />
          ))}
        </div>

        <div
          className="opening__rig"
          ref={rigRef}
          style={{ marginLeft: -(sw / 2 + b), marginTop: -(sh / 2 + b) }}
        >
          <Laptop
            style={{ '--sw': `${sw}px`, '--sh': `${sh}px` }}
            bodyRef={bodyRef}
            lidRef={lidRef}
            dimRef={dimRef}
          >
            <Hero pageW={vw} pageH={vh} sh={sh} />
          </Laptop>
        </div>

      </div>
    </section>
  );
}

// One column of the wall. Its photo sequence is repeated enough times to
// stay taller than the wall at every point of the loop, and the loop moves by
// exactly one sequence (measured, gaps included), so when it restarts the
// picture is identical and there is no jump. Neighbouring tiles are always
// different photos; the sequence itself simply comes round again.
const REPEATS = 6;
function WallColumn({ tiles, down, seconds }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const col = ref.current;
    const measure = () => {
      const first = col.children[0];
      const nextCopy = col.children[tiles.length];
      if (first && nextCopy) col.style.setProperty('--cycle', `${nextCopy.offsetTop - first.offsetTop}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);   // tiles change size as images load and on resize
    Array.from(col.children).slice(0, tiles.length + 1).forEach((el) => ro.observe(el));
    return () => ro.disconnect();
  }, [tiles.length]);

  const seq = Array.from({ length: REPEATS }, () => tiles).flat();
  return (
    <div ref={ref} className={`opening__col${down ? ' is-down' : ''}`} style={{ '--speed': `${seconds}s` }}>
      {seq.map((tile, i) => (
        <img key={i} src={tile.src} alt="" decoding="async" className={`opening__tile is-${tile.shape}`} />
      ))}
    </div>
  );
}

// What is on the screen: the site's first view, built like the reference as
// stacked layers: gradient field, title, the cut-out portrait in front of the
// title, then the nav and captions on top. The layers drift with the mouse at
// different strengths (portrait most), and keep doing so after the camera
// pulls back, since they live inside the screen.
function Hero({ pageW, pageH, sh }) {
  const bgRef = useRef(null);
  const textRef = useRef(null);
  const personRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia('(hover: hover)').matches) return undefined;
    const layer = (el, strength) => ({
      x: gsap.quickTo(el, 'x', { duration: 1.1, ease: 'power3.out' }),
      y: gsap.quickTo(el, 'y', { duration: 1.1, ease: 'power3.out' }),
      strength,
    });
    const layers = [layer(bgRef.current, 14), layer(textRef.current, 20), layer(personRef.current, 38)];
    const onMove = (e) => {
      // Only while the opening is on screen; the rest of the page stays still
      if (!document.documentElement.classList.contains('in-opening') && window.scrollY > 10) return;
      // Like the reference, layers move against the mouse: point up and the
      // scene sinks a little, as if you were looking over it
      const nx = 1 - (e.clientX / window.innerWidth) * 2;     // 1 … -1
      const ny = 1 - (e.clientY / window.innerHeight) * 2;
      layers.forEach((l) => { l.x(nx * l.strength); l.y(ny * l.strength * 0.6); });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // The window-sized copy box is centred on the screen; anything past it only
  // shows once the camera pulls back. The portrait stands on the screen's bottom
  // edge and reaches near the window's top.
  const extraY = Math.max(0, (sh - pageH) / 2);
  return (
    <div className="hero" style={{ '--page-h': `${pageH}px`, '--extra-y': `${extraY}px` }}>
      <div className="hero__bg" ref={bgRef} aria-hidden="true" />
      <div className="hero__inner" style={{ width: `min(100%, ${pageW}px)`, height: `min(100%, ${pageH}px)` }}>
        {/* The text layer (title and captions) drifts as one; the elements
            inside hold their own positions, so GSAP never touches a
            transform that CSS uses for layout */}
        <div className="hero__copy" ref={textRef}>
          <h1 className="hero__title" aria-label="Building Agents That Talk Back">
            <span aria-hidden="true">Building</span>
            <span aria-hidden="true">Agents That</span>
            <span aria-hidden="true">Talk Back</span>
          </h1>
          <p className="hero__tag hero__tag--top">AI Agent Engineer<br />at Sendbird</p>
          <p className="hero__tag hero__tag--bottom">CS + Statistics<br />UBC, Vancouver</p>
        </div>
        <div className="hero__person">
          <img ref={personRef} src={HERO_PORTRAIT} alt="Albertus Ivan Wijaya" width="1262" height="2009" decoding="async" />
        </div>
        <header className="hero__nav">
          <Wordmark />
          <TouchPill />
        </header>
      </div>
    </div>
  );
}
