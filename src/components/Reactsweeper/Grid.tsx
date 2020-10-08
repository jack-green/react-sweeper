import React from 'react';
import { createUseStyles } from 'react-jss';
import { ITile } from '../../common/types';

import Cell from './Cell';

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
}

const Grid = ({ game }: IProps) => {
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, tile: ITile) => {
    if (event.shiftKey) {
      // right click / flag
      return;
    }
    console.log(tile);

  };

  const rows: Array<React.ReactNode> = [];
  for (let y = 0; y < game.height; y += 1) {
    const cells: Array<React.ReactNode> = [];
    for (let x = 0; x < game.width; x += 1) {
      const tile = game.get(x, y);
      cells.push(<Cell key={`cell-${x}`} onClick={handleClick} tile={tile} />);
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
