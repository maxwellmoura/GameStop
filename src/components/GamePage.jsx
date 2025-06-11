import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [currentCategory, setCurrentCategory] = useState('');
  const [timer, setTimer] = useState(180);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState('');
  const [playerIndex, setPlayerIndex] = useState(0);
  const [scores, setScores] = useState(players.map(() => 0));
  const [usedLetters, setUsedLetters] = useState([]); // letras confirmadas (pontuadas)
  const [letterOwners, setLetterOwners] = useState({}); // letra -> jogador dono
  const [letterTimes, setLetterTimes] = useState({}); // letra -> tempo da jogada

  // Controle do timer
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
    setTimer(180);
    setIsRunning(true);
    setSelectedLetter('');
    setUsedLetters([]);
    setLetterOwners({});
    setLetterTimes({});
    setScores(players.map(() => 0));
    setPlayerIndex(0);
  };

  // Clique na letra: só pode clicar se timer rodando, e só pode selecionar uma letra por jogador
  const handleLetterClick = (letter) => {
    if (!currentCategory || !isRunning || timer === 0) return;
    if (selectedLetter) return; // já selecionou letra nesta rodada, aguarda STOP

    if (usedLetters.includes(letter)) return; // letra já confirmada, não pode mais selecionar

    setSelectedLetter(letter);
  };

  // Botão STOP: computa ponto se tem letra selecionada, passa a vez e pausa timer
  const handleStop = () => {
    if (timer === 0) return;

    if (isRunning) {
      // parar o timer
      setIsRunning(false);

      // computar ponto da letra selecionada, se houver
      if (selectedLetter) {
        const newScores = [...scores];
        newScores[playerIndex] += 1;
        setScores(newScores);

        setUsedLetters([...usedLetters, selectedLetter]);
        setLetterOwners({ ...letterOwners, [selectedLetter]: playerIndex });
        setLetterTimes({ ...letterTimes, [selectedLetter]: timer });
        setSelectedLetter('');
        setPlayerIndex((prev) => (prev + 1) % players.length);
      }
    } else {
      // se timer está parado, inicia timer para próxima rodada
      setIsRunning(true);
      setSelectedLetter('');
    }
  };

  // Correção: duplo clique em letra já usada para remover ponto e restaurar tempo
  const handleLetterDoubleClick = (letter) => {
    if (isRunning) return; // só pode corrigir com timer parado

    if (!usedLetters.includes(letter)) return; // só corrige letras confirmadas

    const owner = letterOwners[letter];
    if (owner === undefined) return;

    // Remove ponto do dono original
    const newScores = [...scores];
    newScores[owner] = Math.max(0, newScores[owner] - 1);
    setScores(newScores);

    // Remove letra das usadas, dono e tempo
    setUsedLetters(usedLetters.filter((l) => l !== letter));
    const newOwners = { ...letterOwners };
    delete newOwners[letter];
    setLetterOwners(newOwners);

    const newTimes = { ...letterTimes };
    const restoredTime = newTimes[letter];
    delete newTimes[letter];
    setLetterTimes(newTimes);

    // Restaura tempo da jogada removida e deixa o dono da letra como jogador atual
    setTimer(restoredTime);
    setPlayerIndex(owner);

    setSelectedLetter('');
  };

  const handleRestart = () => {
    setCurrentCategory('');
    setTimer(180);
    setIsRunning(false);
    setSelectedLetter('');
    setPlayerIndex(0);
    setScores(players.map(() => 0));
    setUsedLetters([]);
    setLetterOwners({});
    setLetterTimes({});
  };

  const allLettersUsed = usedLetters.length === alphabet.length;
  const maxScore = Math.max(...scores);
  const winnerIndices = scores.reduce((acc, score, i) => {
    if (score === maxScore) acc.push(i);
    return acc;
  }, []);

  const gameEnded = timer === 0 || allLettersUsed;

  return (
    <div className="game-page">
      <h1>Categoria: {currentCategory || 'Nenhuma selecionada'}</h1>

      <button
        className="sort-button"
        onClick={handleSortCategory}
        disabled={gameEnded || isRunning}
      >
        Sortear Categoria
      </button>

      <button className="reset-button" onClick={handleRestart}>
        Desistir / Reiniciar
      </button>

      <button className="home-button" onClick={() => navigate('/')}>
        Voltar à Home
      </button>

      <div className="alphabet-grid">
        {alphabet.map((letter) => {
          const isUsed = usedLetters.includes(letter);
          const isSelected = selectedLetter === letter;

          return (
            <button
              key={letter}
              className={`letter-button ${isUsed ? 'used' : ''}`}
              style={{
                backgroundColor: isUsed
                  ? '#bbb'
                  : isSelected
                  ? playerColors[playerIndex]
                  : '#eee',
                cursor:
                  !currentCategory || gameEnded || !isRunning || selectedLetter
                    ? 'not-allowed'
                    : 'pointer',
                opacity: !currentCategory || gameEnded ? 0.5 : 1,
              }}
              onClick={() => handleLetterClick(letter)}
              onDoubleClick={() => handleLetterDoubleClick(letter)}
              disabled={
                !currentCategory || gameEnded || !isRunning || selectedLetter || isUsed
              }
              title={isUsed ? 'Letra já confirmada, clique duplo para corrigir' : ''}
            >
              {letter}
            </button>
          );
        })}
      </div>

      <div className="center-panel">
        <h2>Tempo: {formatTime(timer)}</h2>
        <button
          className="stop-button"
          onClick={handleStop}
          style={{
            backgroundColor: isRunning ? 'green' : 'red',
            color: '#fff',
          }}
          disabled={gameEnded}
        >
          {isRunning ? 'STOP' : 'START'}
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

      {gameEnded && (
        <div className="winner-banner">
          🏆{' '}
          {winnerIndices.length > 1
            ? `Empate entre ${winnerIndices.map((i) => players[i]).join(', ')} com ${maxScore} pontos!`
            : `${players[winnerIndices[0]]} venceu com ${maxScore} pontos!`}
        </div>
      )}
    </div>
  );
};

export default GamePage;
