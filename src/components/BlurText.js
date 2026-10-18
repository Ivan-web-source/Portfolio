// src/components/BlurText.js
// A heading whose words come out of a blur one after another as it scrolls in.
import React, { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';

export default function BlurText({ as: Tag = 'h2', text, className = '', ...rest }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current.querySelectorAll('.blur-word'),
        { opacity: 0, filter: 'blur(16px)', y: 24 },
        {
          opacity: 1, filter: 'blur(0px)', y: 0,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 88%', end: 'top 50%', scrub: 1 },
        });
    }, ref);
    return () => ctx.revert();
  }, [text]);

  const lines = text.split('\n');
  return (
    <Tag ref={ref} className={className} aria-label={text.replace(/\n/g, ' ')} {...rest}>
      {lines.map((line, li) => (
        <React.Fragment key={li}>
          {line.split(' ').map((word, wi) => (
            <React.Fragment key={wi}>
              <span className="blur-word" aria-hidden="true">{word}</span>{' '}
            </React.Fragment>
          ))}
          {li < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </Tag>
  );
}
