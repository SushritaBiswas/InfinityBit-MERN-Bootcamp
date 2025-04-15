import React, { useState } from "react";
import Board from "./board";

const Game = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [moves, setMoves] = useState([]);
    const [winnerInfo, setWinnerInfo] = useState({ winner: null, line: [] });

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const checkWinner = (squares) => {
        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return { winner: squares[a], line: combo };
            }
        }
        return { winner: null, line: [] };
    };

    const handleClick = (index) => {
        if (squares[index] || winnerInfo.winner) return;

        const newSquares = [...squares];

        let currentPlayer;
        if (isXNext) {
            currentPlayer = "X";
        } else {
            currentPlayer = "O";
        }

        newSquares[index] = currentPlayer;

        const row = Math.floor(index / 3) + 1;
        const col = (index % 3) + 1;
        const moveText = `Player ${currentPlayer} → ${row}, ${col}`;

        setSquares(newSquares);
        setIsXNext(!isXNext);
        setMoves([...moves, moveText]);

        const result = checkWinner(newSquares);
        if (result.winner) {
            setWinnerInfo(result);
        }
    };

    const handleRestart = () => {
        setSquares(Array(9).fill(null));
        setIsXNext(true);
        setMoves([]);
        setWinnerInfo({ winner: null, line: [] });
    };

    return (
        <>
            <div className="game">
                <div className="game-board">
                    {winnerInfo.winner && (
                        <div className="winner-msg">🎉 Player {winnerInfo.winner} Wins!</div>
                    )}
                    <Board
                        sqrArr={squares}
                        boardClick={handleClick}
                        winningLine={winnerInfo.line}
                    />
                </div>

                <div className="move-tracker">
                    <h3>Move History</h3>
                    <ul className="move-list">
                        {moves.map((move, index) => (
                            <li key={index}>{move}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <button className="restart-btn" onClick={handleRestart}>Restart Game</button>
        </>
    );
};

export default Game;
