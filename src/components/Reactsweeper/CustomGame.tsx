import React from 'react';
import { createUseStyles } from 'react-jss';

import Window from '../Window';

const useStyles = createUseStyles({
  customGame: {},
});

const CustomGame = () => {
  const classes = useStyles();
  return (
    <Window title="Custom Game" className={classes.customGame}>
      CustomGame!
    </Window>
  );
};

export default CustomGame;
