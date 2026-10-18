// src/components/Work.js
// Rises over the last screen of the pinned opening with an arched top that
// flattens as it lands (the reference's colour field), then pins itself while
// scrolling wipes each project up over the last.
import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap, scrollToY, setAnchor, DESKTOP_QUERY, blur } from '../lib/motion';
import { PROJECTS } from '../data/projects';
import { PROJECT_SHOTS } from '../data/media';
import './Work.css';

const STEP = 1;    // timeline seconds per project

export default function Work() {
  const ref = useRef(null);
  const tlRef = useRef(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(ref);
    mm.add('all', () => {
      const rise = { trigger: ref.current, start: 'top bottom', end: 'top top', scrub: 1 };
      gsap.fromTo(ref.current,
        { borderTopLeftRadius: '50% 22vh', borderTopRightRadius: '50% 22vh' },
        { borderTopLeftRadius: '50% 0vh', borderTopRightRadius: '50% 0vh', ease: 'power1.in', scrollTrigger: rise });
      gsap.fromTo('.work__title',
        { opacity: 0, y: 60, filter: blur(14) },
        { opacity: 1, y: 0, filter: blur(0), ease: 'power2.out', scrollTrigger: { ...rise, start: 'top 80%', end: 'top 15%' } });
    });
    mm.add(DESKTOP_QUERY, () => {
      const shots = gsap.utils.toArray('.work__shot');
      gsap.set(shots.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' });
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * 0.8 * PROJECTS.length}`,
          pin: true,
          scrub: 1,
        },
        onUpdate: () => {
          const i = gsap.utils.clamp(0, PROJECTS.length - 1, Math.floor(tl.time() / STEP + 0.25));
          setActive((prev) => (prev === i ? prev : i));
        },
      });
      shots.slice(1).forEach((shot, i) => {
        const at = STEP * (i + 0.45);
        tl.to(shot, { clipPath: 'inset(0% 0% 0% 0%)', duration: STEP * 0.6, ease: 'power2.inOut' }, at);
        tl.fromTo(shot.querySelector('img'), { scale: 1.15 }, { scale: 1, duration: STEP * 0.8, ease: 'power2.out' }, at);
      });
      tl.to({}, { duration: STEP * 0.5 });
      tlRef.current = tl;
      return () => { tlRef.current = null; };
    });

    // While pinned the section is position: fixed, so prefer the trigger's own start
    setAnchor('#work', () => tlRef.current?.scrollTrigger.start
      ?? ref.current.getBoundingClientRect().top + window.scrollY);
    return () => mm.revert();
  }, []);

  // Clicking a name scrolls to the moment that project is on show
  const jumpTo = (i) => {
    const tl = tlRef.current;
    if (!tl) { setActive(i); return; }
    const st = tl.scrollTrigger;
    scrollToY(st.start + ((STEP * (i + 0.1)) / tl.duration()) * (st.end - st.start));
  };

  const project = PROJECTS[active];

  return (
    <section className="work" id="work" ref={ref}>
      <h2 className="headline work__title">Selected work</h2>
      <div className="work__body">
        <div className="work__side">
          <ol className="work__list">
            {PROJECTS.map((p, i) => (
              <li key={p.id}>
                <button
                  type="button"
                  className={`work__item${i === active ? ' is-active' : ''}`}
                  aria-current={i === active}
                  onClick={() => jumpTo(i)}
                >
                  <span className="work__name">{p.title}</span>
                  <span className="work__role">{p.subtitle}, {p.year}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="work__card">
          <div className="work__frame">
            {PROJECTS.map((p, i) => (
              <figure className={`work__shot${i === active ? ' is-active' : ''}`} key={p.id}>
                <img src={PROJECT_SHOTS[p.glyph]} alt={`${p.title} placeholder screenshot`} width="1600" height="1000" loading="lazy" />
              </figure>
            ))}
          </div>
          <div className="work__detail" key={project.id} aria-live="polite">
            <h3 className="work__detail-title">{project.title}</h3>
            <p>{project.description}</p>
            <p className="work__tech">{project.tech.join(' · ')}</p>
            <a className="work__link" href={project.githubUrl} target="_blank" rel="noreferrer">Code on GitHub ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}
