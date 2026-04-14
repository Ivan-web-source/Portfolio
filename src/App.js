// src/App.js
import React, { useState } from 'react';
import IntroOverlay from './components/Intro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {/* Intro overlay — sits above everything, unmounts when done */}
      <IntroOverlay onComplete={() => setIntroDone(true)} />

      {/* Main site — navbar hides on hero, shows after scroll */}
      <Navbar />

      <main>
        {/* Hero receives `visible` to trigger its fade-in after intro */}
        <Hero visible={introDone} />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
