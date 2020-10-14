import React from 'react';
import { createUseStyles } from 'react-jss';

import Window from '../Window';

const useStyles = createUseStyles({
  bestTimes: {
    width: 400,
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface IProps {
  onClose: () => void
}

const BestTimes = ({ onClose }: IProps) => {
  const classes = useStyles();
  return (
    <Window title="Best Times" isModal onClose={onClose}>
      <div className={classes.bestTimes}>
        TODO
      </div>
    </Window>
  );
};

export default BestTimes;
