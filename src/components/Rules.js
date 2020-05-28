import React from 'react';
import { useHistory } from 'react-router-dom'
import {Button} from '@material-ui/core';

const Rules = () => {
    const history = useHistory();
    return (
        <>
        <div className='rules_container'>
            <h2>Rules for The Game of Life</h2>
            <p>The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead, (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:</p>
            <ul className='rules_list'>
                <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
                <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
                <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
            </ul>
            <p>If you'd like to know more about "Conway's Game of Life" visit the Wiki <a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'>here</a>.</p>
        </div>
         <div className='button'>
         <Button variant='contained' color='default' onClick={() => history.push('/game')}>Play the Game</Button>
         </div>
         </>
    )
};

export default Rules;