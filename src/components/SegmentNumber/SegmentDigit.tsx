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

const svgStyle = {
  fillRule: 'evenodd',
  stroke: '#FFFFFF',
  strokeWidth: 0.25,
  strokeOpacity: 1,
  strokeLinecap: 'butt',
  strokeLinejoin: 'miter',
}

interface IDigitProps {
  value: number
};

const SegmentDigit = ({ value }: IDigitProps) => {
  const classes = useStyles();
  const segments = segmentMap[value];
  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="192px" height="320px" viewBox="-1 -1 12 20">
        <g style={svgStyle}>
          {segments.indexOf('A') > -1 && <polygon points=" 1, 1  2, 0  8, 0  9, 1  8, 2  2, 2" fill="currentColor" />}
          {segments.indexOf('B') > -1 && <polygon points=" 9, 1 10, 2 10, 8  9, 9  8, 8  8, 2" fill="currentColor" />}
          {segments.indexOf('C') > -1 && <polygon points=" 9, 9 10,10 10,16  9,17  8,16  8,10" fill="currentColor" />}
          {segments.indexOf('D') > -1 && <polygon points=" 9,17  8,18  2,18  1,17  2,16  8,16" fill="currentColor" />}
          {segments.indexOf('E') > -1 && <polygon points=" 1,17  0,16  0,10  1, 9  2,10  2,16" fill="currentColor" />}
          {segments.indexOf('F') > -1 && <polygon points=" 1, 9  0, 8  0, 2  1, 1  2, 2  2, 8" fill="currentColor" />}
          {segments.indexOf('G') > -1 && <polygon points=" 1, 9  2, 8  8, 8  9, 9  8,10  2,10" fill="currentColor" />}
        </g>
      </svg>
    </div>
  );
}

export default SegmentDigit;
