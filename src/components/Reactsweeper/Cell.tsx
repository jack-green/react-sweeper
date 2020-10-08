import React from 'react';
import { createUseStyles } from 'react-jss';

import Tile from './engine/Tile';
import Button from '../Button';
import Emoji from '../Emoji';

const useStyles = createUseStyles({
  cell: {
    position: 'relative',
    width: 30,
    height: 30,
    backgroundColor: '#ccc',
    borderRight: '1px solid black',
    borderBottom: '1px solid black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    display: 'block',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  revealed: {

  },
});

interface IProps {
  tile: Tile
  onMouseDown: () => void
  onMouseUp: () => void
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, tile: Tile) => void
}

const Cell = ({ tile, onClick, onMouseDown, onMouseUp }: IProps) => {
  const classes = useStyles();

  if (tile.isRevealed) {
    return (
      <div className={`${classes.cell} ${classes.revealed}`}>
        {tile.value === -1 ? <Emoji alt="Bomb" emoji="💣" /> : tile.value}
      </div>
    );
  }

  return (
    <div className={classes.cell}>
      <Button
        className={classes.button}
        onMouseDown={() => onMouseDown()}
        onMouseUp={() => onMouseUp()}
        onMouseLeave={() => onMouseUp()}
        onClick={(e) => onClick(e, tile)}>
        {tile.isFlagged ? 'F' : tile.value}
      </Button>
    </div>
  );
};

export default Cell;
