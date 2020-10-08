import React from 'react';
import { createUseStyles } from 'react-jss';

import Button from '../Button';
import Emoji from '../Emoji';

import SegmentNumber from './SegmentNumber/SegmentNumber';

const useStyles = createUseStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 4,
    border: '4px solid #999',
    borderBottomColor: 'white',
    borderRightColor: 'white',
    marginBottom: 6,
  },
  number: {
    backgroundColor: 'black',
    color: 'red',
    padding: 2,
  },
});

interface IProps {
  status: string
  onReset: () => void
}

const Header = ({ onReset, status }: IProps) => {
  const classes = useStyles();
  let emoji = '😊';
  if (status === 'down') emoji = '😲';
  else if (status === 'dead') emoji = '💀';
  return (
    <div className={classes.header}>
      <div className={classes.number}>
        <SegmentNumber value={10} digits={3} />
      </div>
      <Button onClick={() => onReset()}><Emoji alt="Smiley Face" emoji={emoji} /></Button>
      <div className={classes.number}>
        <SegmentNumber value={0} digits={3} />
      </div>
    </div>
  );
};

export default Header;
