import React from 'react';
import { createUseStyles } from 'react-jss';

import { ITile } from '../../common/types';
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
  tile: ITile
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, tile: ITile) => void
}

const Cell = ({ tile, onClick }: IProps) => {
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
      <Button className={classes.button} onClick={(e) => onClick(e, tile)}>
        {tile.isFlagged ? 'F' : tile.value}
      </Button>
    </div>
  );
};

export default Cell;
