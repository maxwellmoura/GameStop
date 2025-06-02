import '../styles/styles.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ setPlayers }) => {
  const [numPlayers, setNumPlayers] = useState(0);
  const [names, setNames] = useState([]);
  const navigate = useNavigate();

  const handleNumChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setNumPlayers(count);
    setNames(Array(count).fill(''));
  };

  const handleNameChange = (index, value) => {
    const updatedNames = [...names];
    updatedNames[index] = value;
    setNames(updatedNames);
  };

  const handleStartGame = () => {
    if (names.some(name => name.trim() === '')) {
      alert('Preencha todos os nomes!');
      return;
    }
    setPlayers(names);
    navigate('/game');
  };

  return (
    <div className="homepage">
      <h1>Jogo Stop - Configuração</h1>
      
      <div>
        <label>Quantas pessoas vão jogar?</label>
        <input
          type="number"
          min="1"
          value={numPlayers}
          onChange={handleNumChange}
        />
      </div>

      {numPlayers > 0 && (
        <div>
          <h2>Insira os nomes dos participantes:</h2>
          {names.map((name, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder={`Jogador ${index + 1}`}
                value={name}
                onChange={(e) => handleNameChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      {numPlayers > 0 && (
        <button onClick={handleStartGame}>
          Iniciar Jogo
        </button>
      )}
    </div>
  );
};

export default HomePage;
