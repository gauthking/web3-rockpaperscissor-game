import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from './LoginPage';
import Game from './Game';
import About from './About';
// import Home from './Home';
// import { useEffect, useState } from 'react';
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/game' element={<Game />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </Router>
  );


}

export default App;
