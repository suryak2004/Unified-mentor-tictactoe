import React, { useState, useEffect } from 'react';
import Cell from './Cell';

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export default function GameBoard({ mode, difficulty, onBackToMenu }) {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [status, setStatus] = useState("Player X's Turn");
  const [winner, setWinner] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (mode === 'pvc') {
      const seconds = difficulty === 'easy' ? 60 :
                      difficulty === 'medium' ? 90 : 120;
      setTimeLeft(seconds);
    }
  }, [mode, difficulty]);

  useEffect(() => {
    if (mode === 'pvc' && !isXTurn && !winner) {
      const timer = setTimeout(() => {
        makeComputerMove();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isXTurn, winner, cells]);

  function handleClick(index) {
    if (cells[index] || winner || (!isXTurn && mode === 'pvc')) return;

    const newCells = [...cells];
    newCells[index] = isXTurn ? 'X' : 'O';
    setCells(newCells);
    checkGameState(newCells, isXTurn ? 'X' : 'O');
    setIsXTurn(!isXTurn);
  }

  function makeComputerMove() {
    const emptyIndexes = cells
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);

    if (emptyIndexes.length === 0) return;

    const move = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    const newCells = [...cells];
    newCells[move] = 'O';
    setCells(newCells);
    checkGameState(newCells, 'O');
    setIsXTurn(true);
  }

  function checkGameState(updatedCells, currentPlayer) {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (
      updatedCells[a] &&
      updatedCells[a] === updatedCells[b] &&
      updatedCells[a] === updatedCells[c]
    ) {
      setWinner(updatedCells[a]);
      setStatus(`Player ${updatedCells[a]} Wins!`);
      alert(`Player ${updatedCells[a]} Wins!`);
      resetGame();
      return;
    }
  }

  if (updatedCells.every(cell => cell !== null)) {
    setStatus("It's a Draw!");
    alert("It's a Draw!");
    resetGame();
  } else {
    setStatus(`Player ${currentPlayer === 'X' ? 'O' : 'X'}'s Turn`);
  }
}

  function resetGame() {
    setCells(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
    setStatus("Player X's Turn");
  }

  return (
    <div className="game-container">
      <div className="container">
        <h1>Tic-Tac-Toe</h1>
        <div className="game-info">
          <p>{status}</p>
          {mode === 'pvc' && (
            <div>
              Time: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
          )}
          <button onClick={resetGame}>New Game</button>
        </div>
        <div className="board">
          {cells.map((mark, i) => (
            <Cell key={i} mark={mark} onClick={() => handleClick(i)} />
          ))}
        </div>
        <div style={{ marginTop: "1rem" }}>
          <button className="back-button" onClick={onBackToMenu}>Back to Menu</button>
        </div>
      </div>
    </div>
  );
}
