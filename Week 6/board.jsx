import React from "react";
import Button from "./button";

const Board = ({ sqrArr, boardClick, winningLine }) => {
  const renderSquare = (i) => {
    const isWinningSquare = winningLine.includes(i);
    return (
      <Button
        key={i}
        value={sqrArr[i]}
        squareClick={() => boardClick(i)}
        isHighlight={isWinningSquare}
      />
    );
  };

  return (
    <div className="board">
      {[...Array(3)].map((_, rowIndex) => (
        <div className="board-row" key={rowIndex}>
          {[...Array(3)].map((_, colIndex) => {
            const index = rowIndex * 3 + colIndex;
            return renderSquare(index);
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
