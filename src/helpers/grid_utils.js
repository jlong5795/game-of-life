// create empty grid
export const createGrid = (numRows, numCols) => {
    const rows = []; // generic row
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  }

// create random grid
export const createRandomGrid = (numRows, numCols) => {
    const rows = []; // generic row
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => Math.random() > 0.5 ? 1 : 0));
    }
    return rows;
  }