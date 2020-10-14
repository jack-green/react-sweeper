import React from 'react';
import { createUseStyles } from 'react-jss';

import Window from '../Window';

const useStyles = createUseStyles({
  bestTimes: {},
});

const BestTimes = () => {
  const classes = useStyles();
  return (
    <Window title="Best Times" className={classes.bestTimes}>
      BestTimes
    </Window>
  );
};

export default BestTimes;
