import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const categories = [/* ... (mesmo conteúdo) ... */
  'Animal Marinho', 'Ave', 'Inseto'
];

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const playerColors = ['#FF5733', '#33C1FF', '#33FF57', '#FF33D1'];

const GamePage = ({ players }) => {
  const navigate = useNavigate();
  const [currentCategory, setCurrentCategory] = useState('');
  const [timer, setTimer] = useState(180);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState('');
  const [playerIndex, setPlayerIndex] = useState(0);
  const [scores, setScores] = useState(players.map(() => 0));
  const [usedLetters, setUsedLetters] = useState([]);

  useEffect(() => {
    let interval;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    if (timer === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleSortCategory = () => {
    const randomIndex = Math.floor(Math.random() * categories.length);
    setCurrentCategory(categories[randomIndex]);
    setIsRunning(true);
  };

  const handleLetterClick = (letter) => {
    if (!currentCategory) return;

    if (usedLetters.includes(letter)) {
      // Se clicar novamente, reativa a letra e remove ponto
      const lastPlayer = (playerIndex - 1 + players.length) % players.length;
      const newScores = [...scores];
      if (newScores[lastPlayer] > 0) newScores[lastPlayer] -= 1;
      setScores(newScores);
      setUsedLetters(usedLetters.filter(l => l !== letter));
    } else {
      setSelectedLetter(letter);
    }
  };

  const handleStop = () => {
    if (selectedLetter) {
      const newScores = [...scores];
      newScores[playerIndex] += 1;
      setScores(newScores);
      setPlayerIndex((prev) => (prev + 1) % players.length);
      setUsedLetters([...usedLetters, selectedLetter]);
      setSelectedLetter('');
    }
  };

  const handleReset = () => {
    setCurrentCategory('');
    setTimer(600);
    setIsRunning(false);
    setSelectedLetter('');
    setPlayerIndex(0);
    setScores(players.map(() => 0));
    setUsedLetters([]);
  };

  const allLettersUsed = usedLetters.length === alphabet.length;
  const maxScore = Math.max(...scores);
  const winnerIndices = scores.reduce((acc, score, i) => {
    if (score === maxScore) acc.push(i);
    return acc;
  }, []);

  return (
    <div className="game-page">
      <h1>Categoria: {currentCategory || 'Nenhuma selecionada'}</h1>
      <button className="sort-button" onClick={handleSortCategory}>Sortear Categoria</button>
      <button className="reset-button" onClick={handleReset}>Desistir / Reiniciar</button>

      <div className="alphabet-grid">
        {alphabet.map((letter) => {
          const isUsed = usedLetters.includes(letter);
          return (
            <button
              key={letter}
              className={`letter-button ${selectedLetter === letter ? 'selected' : ''}`}
              style={{
                backgroundColor: selectedLetter === letter
                  ? playerColors[playerIndex]
                  : isUsed
                    ? '#bbb'
                    : '#eee',
                cursor: (!currentCategory) ? 'not-allowed' : 'pointer',
                opacity: (!currentCategory) ? 0.5 : 1
              }}
              onClick={() => handleLetterClick(letter)}
              disabled={!currentCategory}
            >
              {letter}
            </button>
          );
        })}
      </div>

      <div className="center-panel">
        <h2>Tempo: {formatTime(timer)}</h2>
        <button className="stop-button" onClick={handleStop}>
          STOP
        </button>
      </div>

      <div className="score-panel">
        <h2>Pontuação:</h2>
        {players.map((player, index) => (
          <div key={index} style={{ color: playerColors[index % playerColors.length] }}>
            {player}: {scores[index]} pts
          </div>
        ))}
      </div>

      {(timer === 0 || allLettersUsed) && (
        <div className="winner-banner">
          🏆 {winnerIndices.length > 1
            ? `Empate entre ${winnerIndices.map(i => players[i]).join(', ')} com ${maxScore} pontos!`
            : `${players[winnerIndices[0]]} venceu com ${maxScore} pontos!`
          }
          <div>
            <button className="home-button" onClick={() => navigate('/')}>
              Voltar à Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;