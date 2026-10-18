// src/App.js
import React from 'react';
import Nav from './components/Nav';
import Opening from './components/Opening';
import Work from './components/Work';
import Approach from './components/Approach';
import Experience from './components/Experience';
import Toolkit from './components/Toolkit';
import Faq from './components/Faq';
import Closing from './components/Closing';
import { useSmoothScroll } from './lib/motion';

export default function App() {
  useSmoothScroll();

  return (
    <>
      <Nav />
      <main>
        <Opening />
        <Work />
        <Approach />
        <Experience />
        <Toolkit />
        <Faq />
        <Closing />
      </main>
    </>
  );
}
