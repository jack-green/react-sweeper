import React from 'react';
import { createUseStyles } from 'react-jss';

import Window from '../Window';

const useStyles = createUseStyles({
  help: {
    width: 400,
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Help = () => {
  const classes = useStyles();
  return (
    <Window title="Help">
      <div className={classes.help}>
        TODO
      </div>
    </Window>
  );
};

export default Help;
