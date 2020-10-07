import React from 'react';
import { createUseStyles } from 'react-jss'

// see https://www.electronics-tutorials.ws/blog/7-segment-display-tutorial.html
const segmentMap = [
  'ABCDEF',
  'BC',
  'ABGED',
  'ABGCD',
  'FBGC',
  'AFGCD',
  'AFGCDE',
  'AFGCDE',
  'ABC',
  'ABCDEFG',
  'ABCGF'
];
// .map((letters) => {
//   return letters.split('').map((char) => {
//     return char.charCodeAt(0) - 65;
//   });
// });

const useStyles = createUseStyles<string, string>({
  header: {
    display: 'flex',
    padding: 4,
    border: '4px solid #999',
    borderBottomColor: 'white',
    borderRightColor: 'white',
    marginBottom: 6,
  },
  segment: {
    backgroundColor: 'red',
    position: 'absolute',
  },
  'segment-A': {},
  'segment-B': {},
  'segment-C': {},
  'segment-D': {},
  'segment-E': {},
  'segment-F': {},
  'segment-G': {},
});

interface IDigitProps {
  value: number
};


const SegmentDigit = ({ value }: IDigitProps) => {
  const classes = useStyles();
  const segments = segmentMap[value];
  return (
    <div>
      {segments.split('').map((segment) => (
        <span className={`${classes.segment}  ${classes[`segment-${segment}`]}`} key={`segment-${segment}`} />
      ))}
    </div>
  );
}

interface INumberProps {
  value: number
  digits: number
};

const SegmentNumber = ({ value, digits }: INumberProps) => {
  const paddedNumber = value.toString().padStart(digits, '0');
  return (
    <div>
      {paddedNumber.split('').map((number, i) => (
        <SegmentDigit value={parseInt(number, 10)} key={`digit-${i}`} />
      ))}
    </div>
  );
}

export default SegmentNumber;