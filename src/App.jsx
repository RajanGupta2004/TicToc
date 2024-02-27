import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [matrix, setMatrix] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleUserClick = (e) => {
    let position = e.target.id;
    let copymatrix = [...matrix];
    copymatrix[position] = isXTurn ? "X" : "O";
    setMatrix(copymatrix);
    setIsXTurn((prev) => !prev);
  };

  const winnerofGame = () => {
    const line = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < line.length; i++) {
      const [a, b, c] = line[i];
      if (matrix[a] && matrix[a] === matrix[b] && matrix[a] === matrix[c]) {
        setWinner(matrix[a]);
      }
    }
  };

  const handleRestart = () => {
    setMatrix(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
  };

  useEffect(() => {
    winnerofGame();
  }, [matrix]);

  return (
    <>
      <div className="app">
        <h1>Tic Toc Game</h1>
        <div className="board" onClick={handleUserClick}>
          {matrix.map((item, idx) => (
            <div className="box" key={idx} id={idx}>
              {item}
            </div>
          ))}
        </div>
        <div className="game-info">
          <button onClick={handleRestart}>Restart</button>
          <h3>Next Turn : {isXTurn ? "X" : "O"}</h3>
          {winner && <h3>{winner} won the Match</h3>}
        </div>
      </div>
    </>
  );
}

export default App;
