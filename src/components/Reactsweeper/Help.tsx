import React from 'react';
import { createUseStyles } from 'react-jss';

import Window from '../Window';

const useStyles = createUseStyles({
  help: {},
});

const Help = () => {
  const classes = useStyles();
  return (
    <Window title="Help" className={classes.help}>
      Help!
    </Window>
  );
};

export default Help;
