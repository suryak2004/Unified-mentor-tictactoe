import React from 'react';

export default function StartMenu({ onPvP, onPvC }) {
  return (
    <div className="start-menu">
      <div className="menu-container">
        <h1>Tic-Tac-Toe</h1>
        <div className="menu-options">
          <button onClick={onPvC}>1 vs 🤖</button>
          <button onClick={onPvP}>2 Players</button>
        </div>
      </div>
    </div>
  );
}
