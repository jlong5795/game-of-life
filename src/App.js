import React from "react";
import { Route, Link } from "react-router-dom";

import GameGrid from "./components/GameGrid";
import Rules from "./components/Rules";

import "./App.css";

function App() {
  return (
    <div className='App'>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/game'>Play</Link>
      </nav>
      <h1>Conway's Game of Life</h1>
      <Route exact path='/'>
        <Rules />
      </Route>
      <Route path='/game'>
        <GameGrid />
      </Route>
    </div>
  );
}

export default App;
