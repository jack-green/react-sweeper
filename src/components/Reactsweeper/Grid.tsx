import React from 'react';
import { createUseStyles } from 'react-jss';

import Cell from './Cell';
import Game from './engine/Game';
import Tile from './engine/Tile';

const useStyles = createUseStyles({
  grid: {
    backgroundColor: 'black',
    border: '4px solid #999',
    borderBottomColor: 'white',
    borderRightColor: 'white',
  },
  row: {
    display: 'flex',
  },
});

interface IProps {
  game: Game
  onMouseDown: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, tile: Tile) => void
  onMouseUp: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, tile: Tile) => void
}

const Grid = ({
  game,
  onMouseDown,
  onMouseUp,
}: IProps) => {
  const classes = useStyles();

  const rows: Array<React.ReactNode> = [];
  for (let y = 0; y < game.height; y += 1) {
    const cells: Array<React.ReactNode> = [];
    for (let x = 0; x < game.width; x += 1) {
      const tile = game.get(x, y);
      cells.push((
        <Cell
          key={`cell-${x}`}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          tile={tile}
        />
      ));
    }
    rows.push((
      <div className={classes.row} key={`row-${y}`}>
        {cells}
      </div>
    ));
  }
  return (
    <div className={classes.grid} onContextMenu={(e) => e.preventDefault()}>
      {rows}
    </div>
  );
};

export default Grid;
