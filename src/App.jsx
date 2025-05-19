import React, { useState } from 'react';
import StartMenu from './components/StartMenu';
import DifficultyMenu from './components/DifficultyMenu';
import GameBoard from './components/GameBoard';
import './styles/styles.css';

export default function App() {
  const [screen, setScreen] = useState('start'); // 'start', 'difficulty', 'game'
  const [mode, setMode] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const handleStartPvP = () => {
    setMode('pvp');
    setScreen('game');
  };

  const handleStartPVC = (level) => {
    setMode('pvc');
    setDifficulty(level);
    setScreen('game');
  };

  return (
    <>
      <div className="background"></div>
      {screen === 'start' && (
        <StartMenu
          onPvP={handleStartPvP}
          onPvC={() => setScreen('difficulty')}
        />
      )}
      {screen === 'difficulty' && (
        <DifficultyMenu
          onSelectDifficulty={handleStartPVC}
          onBack={() => setScreen('start')}
        />
      )}
      {screen === 'game' && (
        <GameBoard
          mode={mode}
          difficulty={difficulty}
          onBackToMenu={() => setScreen('start')}
        />
      )}
    </>
  );
}
