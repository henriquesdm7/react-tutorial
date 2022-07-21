import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Game from './Game';

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    if (squares)

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];

            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return [a, b, c];
            }
        }

    return [null, null, null];
}

function calculateDraw(squares) {
    if (!squares.includes(null)) {
        return true;
    }
    return false;
}

// =====================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);