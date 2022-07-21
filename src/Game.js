import React from "react";
import Board from "./Board";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1]
        const squares = current.squares.slice();

        if (squares[i] || calculateDraw(squares) || calculateWinner(squares)[0] !== null) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState(
            {
                history: history.concat([{
                    squares: squares,
                }]),
                stepNumber: history.length,
                xIsNext: !this.state.xIsNext,
            }
        );
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    paintSquares([winnerPos1, winnerPos2, winnerPos3]) {
        const history = this.state.history;
        const current = history[history.length - 1];

        // pintar quadrados
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const draw = calculateDraw(current.squares);
        const [winnerPos1, winnerPos2, winnerPos3] = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (!draw) {
            if (winnerPos1 !== null) {
                status = 'Winner: ' + current.squares[winnerPos1];
                this.paintSquares([winnerPos1, winnerPos2, winnerPos3]);
            } else {
                status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
            }
        } else {
            status = 'The game is a draw!';
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

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
    if (!squares.includes(null) && calculateWinner(squares)[0] === null) {
        return true;
    }
    return false;
}

export default Game;