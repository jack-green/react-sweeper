import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import useInterval from '@rooks/use-interval';

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

const formateDate = (date: Date) => {
  let hours = date.getHours();
  const ampm = hours < 12 ? 'AM' : 'PM';
  if (hours > 12) hours -= 12;
  return `${hours}:${date.getMinutes().toString().padStart(2, '0')} ${ampm}`;
};

const Clock = () => {
  const classes = useStyles();
  const [date, setDate] = useState(new Date());

  useInterval(() => {
    setDate(new Date());
  }, 1000, true);

  return (
    <div className={classes.clock}>
      <Emoji alt="Speaker" emoji="🔉" />
      <span className={classes.time}>
        {formateDate(date)}
      </span>
    </div>
  );
};

export default Clock;
