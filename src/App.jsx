import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Nav from './components/Nav';
import Hero from './components/Hero';
import HeroV2 from './components/HeroV2';
import HeroV3 from './components/HeroV3';

const App = () => {
  return (
    <>
    <Nav />
    <Routes>
      <Route path='/V3/practice' element={<HeroV3 />} />
      <Route path="/" element={<Navigate to='/V3/practice' replace />} />
      <Route path="/V1" element={<Hero />} />
      <Route path="/V2" element={<HeroV2 />} />
    </Routes>
    </>  )
}

export default App;