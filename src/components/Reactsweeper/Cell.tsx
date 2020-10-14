import React from 'react';
import { createUseStyles } from 'react-jss';

import Tile, { TileStatus } from './engine/Tile';
import Button from '../Button';
import Emoji from '../Emoji';

const numberColors = ['', 'blue', 'green', 'red', 'purple', 'maroon', 'turquoise', 'black', 'gray'];

const useStyles = createUseStyles({
  cell: {
    position: 'relative',
    width: 30,
    height: 30,
    backgroundColor: '#bbb',
    borderRight: '1px solid black',
    borderBottom: '1px solid black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  revealed: {
    borderRight: '1px dotted #000',
    borderBottom: '1px dotted #000',
  },
  boom: {
    backgroundColor: 'red',
  },
  num: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

interface IProps {
  tile: Tile
  onMouseDown: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, tile: Tile) => void
  onMouseUp: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, tile: Tile) => void
}

interface INumProps {
  value: number
}

const Cell = ({
  tile,
  onMouseDown,
  onMouseUp,
}: IProps) => {
  const classes = useStyles();

  const Num = ({ value }: INumProps) => (
    <span
      className={classes.num}
      style={{ color: numberColors[value] }}
    >
      {value}
    </span>
  );

  let content = null;
  if (tile.status === TileStatus.REVEALED || tile.status === TileStatus.DEAD_REVEALED) {
    if (tile.value === -1) {
      content = <Emoji alt="Bomb" emoji="💣" />;
    } else if (tile.value > 0) {
      content = <Num value={tile.value} />;
    }
  } else if (tile.status === TileStatus.FLAGGED) {
    content = <Emoji alt="Flag" emoji="🚩" />;
  } else if (tile.status === TileStatus.MARKED) {
    content = <Emoji alt="Flag" emoji="❓" />;
  } else {
    // todo: content = null
    // content = <Num value={tile.value} />;
  }

  if (tile.status === TileStatus.BOOM) {
    return (
      <div className={`${classes.cell} ${classes.revealed} ${classes.boom}`}>
        {content}
      </div>
    );
  }

  if (tile.status === TileStatus.REVEALED) {
    return (
      <div className={`${classes.cell} ${classes.revealed}`}>
        {content}
      </div>
    );
  }

  return (
    <div className={classes.cell}>
      <Button
        className={classes.button}
        onMouseDown={(e) => onMouseDown(e, tile)}
        onMouseUp={(e) => onMouseUp(e, tile)}
      >
        {content}
      </Button>
    </div>
  );
};

export default Cell;
