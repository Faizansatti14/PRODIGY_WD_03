import React, { useState } from 'react';
import './Tictactoe.css';
import circle_icon from '../Assets/circle.jpeg'; // Corrected the extension
import cross_icon from '../Assets/cross.png';

const Tictactoe = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); //current state of board, array(9elements),initially set null.
  const [isXNext, setIsXNext] = useState(true); //keeps track of whose turn it is. Initially true, meaning X.

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return; //checks square is fill or game is end than donot make any change.
    
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (squares) => {
    const lines = [ //lines array contains all possible winning combinations(rows, columns, and diagonals).
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      //checks if all three squares in a combination (a, b, c) are the same (and not null), thanit returns the value ('X' or 'O') as the winner.
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { 
        return squares[a];
      }
    }
    return null;
  };

  const isBoardFull = (squares) => { //check if all the squares are not null than return true.  
    return squares.every(square => square !== null);
  };

  const winner = calculateWinner(board);
  const draw = !winner && isBoardFull(board);

  const status = winner 
    ? `Winner: ${winner}` //If there's a winner, status shows Winner.
    : draw //else if draw
      ? 'It\'s a draw!' 
      : `Next player: ${isXNext ? 'X' : 'O'}`; //else next turn.

  const renderSquare = (index) => {
    //If the square contains 'X' or 'O', it displays the corresponding image (cross_icon or circle_icon)
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index] === 'X' ? <img src={cross_icon} alt="X" /> : board[index] === 'O' ? <img src={circle_icon} alt="O" /> : null}
      </button>
    );
  };

  return (
    <div className="tictactoe">
      <div className="status">{status}</div>
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="reset" onClick={() => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
      }}>Reset Game</button>
    </div>
  );
};

export default Tictactoe;
