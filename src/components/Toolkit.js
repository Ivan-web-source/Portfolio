// src/components/Toolkit.js
// Pinned on larger screens: scrolling down slides the cards sideways, and the
// card nearest the middle fills with blue. On phones it is a swipeable row.
import React, { useLayoutEffect, useRef, useState } from 'react';
import BlurText from './BlurText';
import { gsap, DESKTOP_QUERY } from '../lib/motion';
import { TOOLKIT } from '../data/content';
import './Toolkit.css';

export default function Toolkit() {
  const ref = useRef(null);
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_QUERY, () => {
      const track = trackRef.current;
      const distance = () => {
        const vp = track.parentElement;
        const cs = getComputedStyle(vp);
        const inner = vp.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        return Math.max(0, track.scrollWidth - inner);
      };
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: () => `+=${distance() + window.innerHeight * 0.5}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.round(self.progress * (TOOLKIT.length - 1));
            setActive((prev) => (prev === i ? prev : i));
          },
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="toolkit" id="toolkit" ref={ref}>
      <div className="toolkit__intro">
        <BlurText className="headline toolkit__title" text={'What I build with'} />
        <p className="toolkit__lede">
          The languages, models and hardware behind the projects above, grouped the way I reach for them.
        </p>
      </div>
      <div className="toolkit__viewport">
        <div className="toolkit__track" ref={trackRef}>
          {TOOLKIT.map((group, i) => (
            <article
              key={group.title}
              className={`toolkit__card${i === active ? ' is-active' : ''}`}
              onMouseEnter={() => setActive(i)}
            >
              <h3 className="toolkit__card-title">{group.title}</h3>
              <ul>
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
