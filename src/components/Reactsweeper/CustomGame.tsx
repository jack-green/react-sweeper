import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { IGameConfig } from '../../common/types';
import Button from '../Button';

import Window from '../Window';

const minWidth = 8;
const maxWidth = 30;
const minHeight = 8;
const maxHeight = 24;
const minMines = 10;
// max mines is calculated by (width - 1) * (height - 1)

const useStyles = createUseStyles({
  customGame: {
    display: 'flex',
    padding: 10,
  },
  sizes: {},
  size: {
    display: 'flex',
    marginBottom: 15,
    fontSize: 14,
    '& span': {
      width: 60,
    },
    '& input': {
      width: 50,
      height: 26,
      border: '2px solid #999',
      borderRightColor: '#fff',
      borderBottomColor: '#fff',
      boxShadow: 'inset 0 0 1px #000',
    },
  },
  actions: {
    marginLeft: 15,
    '& button': {
      display: 'block',
      width: 60,
    },
  },
  action: {
    display: 'block',
    marginBottom: 5,
    fontSize: 12,
    padding: '5px 0',
  },
});

interface IProps {
  onClose: () => void
  onSubmit: (customConfig: IGameConfig) => void
  initialConfig: IGameConfig
}

const CustomGame = ({
  onClose,
  onSubmit,
  initialConfig,
}: IProps) => {
  const classes = useStyles();
  const [width, setWidth] = useState(initialConfig.width);
  const [height, setHeight] = useState(initialConfig.height);
  const [mines, setMines] = useState(initialConfig.mines);

  const handleSubmit = () => {
    onSubmit({ width, height, mines });
  };

  const constrainValues = () => {
    const constrainedWidth = Math.max(minWidth, Math.min(width, maxWidth));
    const constrainedHeight = Math.max(minHeight, Math.min(height, maxHeight));
    const maxMines = (constrainedWidth - 1) * (constrainedHeight - 1);
    const constrainedMines = Math.max(minMines, Math.min(mines, maxMines));
    setWidth(constrainedWidth);
    setHeight(constrainedHeight);
    setMines(constrainedMines);
  };

  return (
    <Window
      title="Custom Game"
      onClose={onClose}
      isModal
    >
      <div className={classes.customGame}>
        <div className={classes.sizes}>
          <label htmlFor="custom-height" className={classes.size}>
            <span>
              <u>H</u>
              eight
            </span>
            <input
              type="number"
              min="8"
              max="24"
              id="custom-height"
              value={height}
              onChange={(e) => setHeight(parseInt(e.currentTarget.value, 10))}
              onBlur={constrainValues}
            />
          </label>
          <label htmlFor="custom-width" className={classes.size}>
            <span>
              <u>W</u>
              idth
            </span>
            <input
              type="number"
              min="8"
              max="30"
              id="custom-width"
              value={width}
              onChange={(e) => setWidth(parseInt(e.currentTarget.value, 10))}
              onBlur={constrainValues}
            />
          </label>
          <label htmlFor="custom-mines" className={classes.size}>
            <span>
              <u>M</u>
              ines
            </span>
            <input
              type="number"
              min="10"
              max="30"
              id="custom-mines"
              value={mines}
              onChange={(e) => setMines(parseInt(e.currentTarget.value, 10))}
              onBlur={constrainValues}
            />
          </label>
        </div>
        <div className={classes.actions}>
          <Button className={classes.action} onClick={handleSubmit}>OK</Button>
          <Button className={classes.action} onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </Window>
  );
};

export default CustomGame;
