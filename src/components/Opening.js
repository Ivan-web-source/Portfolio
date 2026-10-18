// src/components/Opening.js
// The first scene, pinned while you scroll:
//   1. The hero fills the window. It is the laptop's screen at full size.
//   2. Scrolling pulls the camera back: screen and laptop shrink together as
//      one object, in front of a wall of pictures that never stops drifting.
//   3. Scrolling on, the machine tips towards you and the lid closes. The
//      Work section then rises over the still-pinned scene (see Work.css).
import React, { useLayoutEffect, useRef, useState } from 'react';
import Laptop from './Laptop';
import { gsap, ScrollTrigger, isPhone, scrollToHash } from '../lib/motion';
import { HERO_PORTRAIT, COLLAGE } from '../data/media';
import { NAV_LINKS, openMenu } from './Nav';
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
            <div className={`opening__col${c % 2 ? ' is-down' : ''}`} key={c} style={{ '--speed': `${46 + c * 7}s` }}>
              {[...col, ...col].map((tile, i) => (
                <img key={i} src={tile.src} alt="" decoding="async" className={`opening__tile is-${tile.shape}`} />
              ))}
            </div>
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
            <Hero pageW={vw} pageH={vh} />
          </Laptop>
        </div>

      </div>
    </section>
  );
}

// What is on the screen: a whole site's first view, nav included. This nav is
// live: it is the page's navigation for as long as the opening is pinned.
function Hero({ pageW, pageH }) {
  const go = (e, href) => { e.preventDefault(); scrollToHash(href); };
  return (
    <div className="hero">
      <img className="hero__portrait" src={HERO_PORTRAIT} alt="Ivan in the snow beside a husky" />
      {/* The copy fills exactly the visible window, centred on the screen. When
          the screen is wider (phones) or taller (very wide windows) than the
          window, the extra screen only shows once the camera pulls back, so the
          first frame is never cropped. */}
      <div className="hero__inner" style={{ width: `min(100%, ${pageW}px)`, height: `min(100%, ${pageH}px)` }}>
        <header className="hero__nav">
          <a className="hero__mark" href="#top" onClick={(e) => go(e, '#top')}>Ivan Wijaya</a>
          <nav className="hero__links" aria-label="Main">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}>{l.label}</a>
            ))}
          </nav>
          <div className="hero__actions">
            <button type="button" className="pill hero__menu" onClick={openMenu}>Menu</button>
            <a className="pill hero__pill" href="#contact" onClick={(e) => go(e, '#contact')}>Get in touch</a>
          </div>
        </header>
        <h1 className="hero__title">Agents that talk,<br />LEDs that spin</h1>
        <p className="hero__lede">
          I’m Albertus Ivan Wijaya. I build AI agents at Sendbird and
          study Computer Science and Statistics at UBC.
        </p>
        <ul className="hero__facts">
          <li>Vancouver, BC</li>
          <li>Open to co-op</li>
        </ul>
        <p className="hero__cue">Scroll</p>
      </div>
    </div>
  );
}
