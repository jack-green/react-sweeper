import React from 'react';
import { createUseStyles } from 'react-jss'

import SegmentDigit from './SegmentDigit'

const useStyles = createUseStyles<string, string>({
  number: {
    display: 'flex',
  }
})


interface INumberProps {
  value: number
  digits: number
}

const SegmentNumber = ({ value, digits }: INumberProps) => {
  const classes = useStyles()
  const paddedNumber = value.toString().padStart(digits, '0')
  return (
    <div className={classes.number}>
      {paddedNumber.split('').map((number, i) => (
        <SegmentDigit value={parseInt(number, 10)} key={`digit-${i}`} />
      ))}
    </div>
  )
}

export default SegmentNumber
