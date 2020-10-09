import React from 'react';
import { createUseStyles } from 'react-jss';
import Emoji from '../Emoji';

const useStyles = createUseStyles({
  clock: {
    display: 'flex',
    alignItems: 'center',
    height: 30,
    padding: '0 4px 0 8px',
    border: '2px solid #999',
    borderRightColor: '#fff',
    borderBottomColor: '#fff',
  },
  time: {
    width: 70,
    textAlign: 'center',
    fontSize: 14,
  },
});

const Clock = () => {
  const classes = useStyles();
  return (
    <div className={classes.clock}>
      <Emoji alt="Speaker" emoji="🔉" />
      <span className={classes.time}>05:54am</span>
    </div>
  );
};

export default Clock;
