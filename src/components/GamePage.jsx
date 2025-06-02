import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // para navegação
import '../styles/styles.css';

const categories = [
  'Nome', 'Cidade', 'Animal', 'Cor', 'Fruta', 'Profissão', 'Objeto',
  'País', 'Filme', 'Livro', 'Comida', 'Bebida', 'Marca', 'Carro',
  'Esporte', 'Instrumento Musical', 'Flor', 'Personagem Famoso',
  'Super-herói', 'Aplicativo', 'Jogo', 'Cantor', 'Banda', 'Série',
  'Desenho', 'Doença', 'Remédio', 'Parte do Corpo', 'Palavra em Inglês',
  'Lugar Turístico', 'Ingrediente', 'Peça de Roupa', 'Calçado',
  'Ferramenta', 'Peça de Computador', 'Software', 'Instrumento de Medição',
  'Animal Marinho', 'Ave', 'Inseto'
];

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const playerColors = ['#FF5733', '#33C1FF', '#33FF57', '#FF33D1'];

const GamePage = ({ players }) => {
  const navigate = useNavigate(); // hook do react-router
  const [currentCategory, setCurrentCategory] = useState('');
  const [timer, setTimer] = useState(600);
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
    setIsRunning(true); // começa o jogo automaticamente ao sortear categoria
  };

  const handleLetterClick = (letter) => {
    if (usedLetters.includes(letter)) return;
    setSelectedLetter(letter);
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
                cursor: isUsed ? 'not-allowed' : 'pointer',
                opacity: isUsed ? 0.5 : 1
              }}
              onClick={() => handleLetterClick(letter)}
              disabled={isUsed}
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
