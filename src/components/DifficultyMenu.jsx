import React from 'react';

export default function DifficultyMenu({ onSelectDifficulty, onBack }) {
  return (
    <div className="start-menu">
      <div className="menu-container">
        <h1>Select Difficulty</h1>
        <div className="menu-options">
          <button onClick={() => onSelectDifficulty('easy')}>Easy</button>
          <button onClick={() => onSelectDifficulty('medium')}>Medium</button>
          <button onClick={() => onSelectDifficulty('hard')}>Hard</button>
          <button onClick={onBack}>🔙 Back</button>
        </div>
      </div>
    </div>
  );
}
