import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import GamePage from './components/GamePage';

const App = () => {
  const [players, setPlayers] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage setPlayers={setPlayers} />} />
        <Route path="/game" element={<GamePage players={players} />} />
      </Routes>
    </Router>
  );
};

export default App;
