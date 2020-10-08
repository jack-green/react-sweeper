import React from 'react';
import { createUseStyles } from 'react-jss';

import Cell from './Cell';
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
  game: any
  settings: any
  onMouseDown: () => void
  onMouseUp: () => void
  onClick: (tile: Tile, toggleFlag: boolean) => void
}

const Grid = ({
  game,
  onMouseDown,
  onMouseUp,
  onClick,
}: IProps) => {
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, tile: Tile) => {
    onClick(tile, event.shiftKey);
  };

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
          onClick={handleClick}
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
    <div className={classes.grid}>
      {rows}
    </div>
  );
};

export default Grid;
