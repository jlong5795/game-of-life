import React, { useState, useCallback, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@material-ui/core";
import produce from "immer";

import { createGrid, createRandomGrid } from "../helpers/grid_utils";

const GameGrid = () => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      numRows: 25,
      numCols: 25,
      speed: 500,
    },
  });
  const history = useHistory();

  // minimum number of rows and cols
  const [numRows, setNumRows] = useState(25);
  const numRowsRef = useRef(numRows);
  numRowsRef.current = numRows;

  const [numCols, setNumCols] = useState(25);
  const numColsRef = useRef(numCols);
  numColsRef.current = numCols;

  const [speed, setSpeed] = useState(500);
  const speedRef = useRef(speed);
  speedRef.current = speed;

  console.log(numRows);
  console.log(numCols);
  console.log(speed);

  // represents all of the cells to be checked from each cell
  const operations = [
    [0, 1],
    [0, -1],
    [1, 0],
    [1, 1],
    [1, -1],
    [-1, 0],
    [-1, 1],
    [-1, -1],
  ];

  useEffect(() => {
    clearGrid(numRows, numCols);
  }, [numRows, numCols]);

  // create state to store the values in our grid
  const [grid, setGrid] = useState(() => {
    return createGrid(numRows, numCols);
  });

  // so we can see if the game is active or not
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  // set state to track generation counter
  const [generation, setGeneration] = useState(0);

  // reset the game completely
  const resetGame = (numRows, numCols) => {
    setGrid(createRandomGrid(numRows, numCols));
    setGeneration(0);
  };

  const clearGrid = (numRows, numCols) => {
    setGrid(createGrid(numRows, numCols));
    setGeneration(0);
  };

  async function onSubmit(data) {
    console.log(data);
    await setNumRows(parseInt(data.numRows));
    await setNumCols(parseInt(data.numCols));
    await setSpeed(parseInt(data.speed));
  }

  // when using a callback the current state value isn't read so use a ref bc it's always current
  const runSim = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    // tracks the current generation
    setGeneration((prevState) => (prevState += 1));
    setGrid((currentGrid) => {
      // need a way to iterate over every cell

      return produce(currentGrid, (gridCopy) => {
        for (let i = 0; i < numRowsRef.current; i++) {
          for (let j = 0; j < numColsRef.current; j++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (
                newI >= 0 &&
                newI < numRowsRef.current &&
                newJ >= 0 &&
                newJ < numColsRef.current
              ) {
                neighbors += currentGrid[newI][newJ]; // adds the value of a cell. Live = 1, dead = 0
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0; // over or under population dies
            } else if (currentGrid[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1; // if dead and has 3 live neighbors becomes alive
            }
          }
        }
      });
    });

    setTimeout(runSim, speedRef.current); // hey look recursion!
  }, []);

  return (
    <div>
      <div className='button-rules'>
        <Button
          variant='contained'
          color='default'
          onClick={() => history.push("/")}
        >
          View Rules
        </Button>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Num Rows:
            <input type='text' name='numRows' ref={register} />
          </label>
          <label>
            Num Cols:
            <input type='text' name='numCols' ref={register} />
          </label>
          <label>
            Game Speed:
            <input type='text' name='speed' ref={register} />
          </label>
          <Button variant='contained' color='default' type='submit'>
            Update Settings
          </Button>
        </form>
      </div>
      <div
        className='grid'
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
                onClick={
                  !running
                    ? () => {
                        const newGrid = produce(grid, (gridCopy) => {
                          gridCopy[row_index][col_index] = gridCopy[row_index][
                            col_index
                          ]
                            ? 0
                            : 1;
                        });

                        setGrid(newGrid); // newGrid is my double buffer
                      }
                    : null
                } // make sure you can't click if the sim is running
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: grid[row_index][col_index]
                    ? "blue"
                    : "#216869",
                  border: "solid 1px #DCE1DE",
                }}
              />
            );
          })
        )}
      </div>
      <div>
        <p>Generation: {generation}</p>
        <span className='button-group'>
          <span className='game-button'>
            <Button
              variant='contained'
              color='default'
              onClick={() => {
                setRunning(!running);
                if (!running) {
                  runningRef.current = true;
                  runSim();
                }
              }}
            >
              {running ? "Stop" : "Start"}
            </Button>
          </span>
          <span className='game-button'>
            <Button
              variant='contained'
              color='default'
              onClick={() => {
                clearGrid(numRows, numCols);
              }}
            >
              Clear Grid
            </Button>
          </span>
          <span className='game-button'>
            <Button
              variant='contained'
              color='default'
              onClick={() => {
                resetGame(numRows, numCols);
              }}
            >
              Generate Random
            </Button>
          </span>
        </span>
      </div>
    </div>
  );
};

export default GameGrid;
