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
  face: {
    width: 31,
    height: 31,
  },
});

interface IProps {
  status: string
  remaining: number
  timer: number
  onReset: () => void
}

const Header = ({
  onReset,
  remaining,
  timer,
  status,
}: IProps) => {
  const classes = useStyles();
  let emoji = '😊';
  if (status === 'down') emoji = '😲';
  else if (status === 'dead') emoji = '💀';
  else if (status === 'won') emoji = '😎';

  return (
    <div className={classes.header}>
      <div className={classes.number}>
        <SegmentNumber value={remaining} digits={3} />
      </div>
      <Button
        onClick={() => onReset()}
        className={classes.face}
      >
        <Emoji alt="Emoji" emoji={emoji} />
      </Button>
      <div className={classes.number}>
        <SegmentNumber value={Math.min(999, timer)} digits={3} />
      </div>
    </div>
  );
};

export default Header;
