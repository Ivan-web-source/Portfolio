// src/components/Approach.js — three kinds of work. As the columns arrive they
// rise out of a blur together, a beat apart, and a bar fills under each.
import React, { useLayoutEffect, useRef } from 'react';
import BlurText from './BlurText';
import { gsap, blur } from '../lib/motion';
import { PRACTICES } from '../data/content';
import './Approach.css';

export default function Approach() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Plays once, on arrival, and is done in about a second and a half,
      // so all three are readable before the section scrolls away
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '.approach__cols', start: 'top 82%', toggleActions: 'play none none none' },
      });
      tl.fromTo('.approach__col', { opacity: 0, y: 36, filter: blur(10) },
        { opacity: 1, y: 0, filter: blur(0), duration: 0.8, stagger: 0.12, ease: 'power3.out' });
      tl.fromTo('.approach__bar span', { scaleX: 0 },
        { scaleX: 1, duration: 0.9, stagger: 0.12, ease: 'power2.inOut' }, 0.35);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="approach" id="about" ref={ref}>
      <BlurText className="headline approach__title" text={'Three kinds of things\nI like to build'} />
      <p className="approach__lede">
        Most of my work sits where software meets a person talking back, or a piece of hardware.
      </p>
      <div className="approach__cols">
        {PRACTICES.map((p) => (
          <article className="approach__col" key={p.title}>
            <h3 className="approach__col-title">{p.title}</h3>
            <p>{p.body}</p>
            <div className="approach__bar" aria-hidden="true"><span /></div>
          </article>
        ))}
      </div>
    </section>
  );
}
