import React from 'react';
import { createUseStyles } from 'react-jss';

import Button from '../Button';
import Emoji from '../Emoji';

const useStyles = createUseStyles({
  start: {
    height: 30,
    padding: '0 8px',
    marginRight: 4,
  },
  icon: {
    marginRight: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

const Start = () => {
  const classes = useStyles();

  return (
    <Button className={classes.start}>
      <Emoji alt="Start" emoji="💻" className={classes.icon} />
      <span className={classes.label}>Start</span>
    </Button>
  );
};

export default Start;
