// src/App.js
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero is always visible — no intro overlay */}
        <Hero visible={true} />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
