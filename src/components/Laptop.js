// src/components/Laptop.js
// A space-black laptop built in CSS 3D. The screen size is set from outside
// (--sw / --sh in px) so the screen can match the viewport exactly; every other
// dimension is derived from it. The lid closes by rotating `lidRef` about its
// hinge, and `bodyRef` tilts the whole machine towards the viewer.
import React from 'react';
import './Laptop.css';

const KEY_ROWS = [14, 14, 13, 12, 10];

export default function Laptop({ children, lidRef, bodyRef, dimRef, className = '', style }) {
  return (
    <div className={`laptop ${className}`} style={style}>
      <div className="laptop__shadow" aria-hidden="true" />
      <div className="laptop__scene">
        <div className="laptop__body" ref={bodyRef}>
          <div className="laptop__lid" ref={lidRef}>
            <div className="laptop__front">
              <span className="laptop__camera" aria-hidden="true" />
              <div className="laptop__screen">
                {children}
                <div className="laptop__glare" aria-hidden="true" />
                <div className="laptop__dim" ref={dimRef} aria-hidden="true" />
              </div>
            </div>
            <div className="laptop__back" aria-hidden="true" />
          </div>

          <div className="laptop__deck" aria-hidden="true">
            <div className="laptop__keys">
              {KEY_ROWS.map((n, r) => (
                <div className="laptop__row" key={r}>
                  {Array.from({ length: n }, (_, k) => <span key={k} />)}
                </div>
              ))}
              <div className="laptop__row laptop__row--space"><span /><span /><span className="is-space" /><span /><span /></div>
            </div>
            <div className="laptop__pad" />
            <div className="laptop__lip" />
          </div>
        </div>
      </div>
    </div>
  );
}
