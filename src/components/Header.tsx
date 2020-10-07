import React from 'react';
import { createUseStyles } from 'react-jss'

import SegmentNumber from './SegmentNumber';

const useStyles = createUseStyles({
  header: {
    display: 'flex',
    padding: 4,
    border: '4px solid #999',
    borderBottomColor: 'white',
    borderRightColor: 'white',
    marginBottom: 6,
  },
});

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <div className="mines-remaining">
        <SegmentNumber value={10} digits={3} />
      </div>
      <button>😊</button>
      <div className="time">
        <SegmentNumber value={0} digits={3} />
      </div>
    </div>
  );
};

export default Header;