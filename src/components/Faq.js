// src/components/Faq.js
import React, { useState } from 'react';
import BlurText from './BlurText';
import { FAQ } from '../data/content';
import './Faq.css';

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="faq" id="faq">
      <BlurText className="headline faq__title" text={'Questions people ask me'} />
      <div className="faq__list">
        {FAQ.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className={`faq__item${isOpen ? ' is-open' : ''}`}>
              <h3>
                <button
                  type="button"
                  className="faq__q"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  {item.q}
                  <span className="faq__icon" aria-hidden="true" />
                </button>
              </h3>
              <div className="faq__a" id={`faq-${i}`} role="region" aria-hidden={!isOpen}>
                <div><p>{item.a}</p></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
