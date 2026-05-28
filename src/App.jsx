import React from 'react';
import { Routes, Route } from "react-router-dom";
import Nav from './components/Nav';
import Hero from './components/Hero';
import HeroV2 from './components/HeroV2';

const App = () => {
  return (
    <>
    <Nav />
    <Routes>
      <Route path="/" element={<HeroV2 />} />
      <Route path="/v1" element={<Hero />} />
    </Routes>
    </>  )
}

export default App;