import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

import "./App.css";

function App() {
  const numRows = 20;
  const numCols = 20;

  // create state to store the values in our grid
  const [grid, setGrid] = useState(() => {
    const rows = []; // generic row
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });

  // so we can see if the game is active or not
  const [running, setRunning] = useState(false);
  const runningRef = useRef();

  runningRef.current = running

  // when using a callback the current state value isn't read so use a ref bc it's always current
  const runSim = useCallback(() => {
      if (!runningRef.current) {
        return
      }
      // simulate
      setTimeout(runSim, 1000);
    },[]);

  return (
    <div className='App'>
      <button onClick={() => {
        setRunning(!running)
      }}>{running ? 'Stop' : 'Start'}</button>
      <div className='grid'
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
      >
        {grid.map((rows, row_index) =>
          rows.map((col, col_index) => {
            return (
              <div
                key={`${col_index}-${col_index}`}
                onClick={() => {
                  const newGrid = produce(grid, (gridCopy) => {
                    gridCopy[row_index][col_index] = gridCopy[row_index][
                      col_index
                    ]
                      ? 0
                      : 1;
                  });

                  setGrid(newGrid);
                }}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: grid[row_index][col_index]
                    ? "blue"
                    : undefined,
                  border: "solid 1px black",
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
