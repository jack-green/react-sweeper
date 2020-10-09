import React from 'react';
import { createUseStyles } from 'react-jss';

// see https://www.electronics-tutorials.ws/blog/7-segment-display-tutorial.html
const segmentMap = [
  'ABCDEF',
  'BC',
  'ABGED',
  'ABGCD',
  'FBGC',
  'AFGCD',
  'AFGCDE',
  'ABC',
  'ABCDEFG',
  'ABCGF',
];

const useStyle = createUseStyles({
  svg: {
    width: 16,
    height: 'auto',
  },
});

const svgStyle = {
  fillRule: 'evenodd' as const,
  stroke: 'black',
  strokeWidth: 0.25,
  strokeOpacity: 1,
  strokeLinecap: 'butt' as const,
  strokeLinejoin: 'miter' as const,
};

interface IDigitProps {
  value: number
}

const SegmentDigit = ({ value }: IDigitProps) => {
  const classes = useStyle();
  const segments = segmentMap[value];

  const getColor = (letter: string) => {
    const enabled = segments.indexOf(letter) > -1;
    return enabled ? '#f00' : '#400';
  };

  return (
    <svg className={classes.svg} xmlns="http://www.w3.org/2000/svg" width="192px" height="320px" viewBox="-1 -1 12 20">
      <g style={svgStyle}>
        <polygon points=" 1, 1  2, 0  8, 0  9, 1  8, 2  2, 2" fill={getColor('A')} />
        <polygon points=" 9, 1 10, 2 10, 8  9, 9  8, 8  8, 2" fill={getColor('B')} />
        <polygon points=" 9, 9 10,10 10,16  9,17  8,16  8,10" fill={getColor('C')} />
        <polygon points=" 9,17  8,18  2,18  1,17  2,16  8,16" fill={getColor('D')} />
        <polygon points=" 1,17  0,16  0,10  1, 9  2,10  2,16" fill={getColor('E')} />
        <polygon points=" 1, 9  0, 8  0, 2  1, 1  2, 2  2, 8" fill={getColor('F')} />
        <polygon points=" 1, 9  2, 8  8, 8  9, 9  8,10  2,10" fill={getColor('G')} />
      </g>
    </svg>
  );
};

export default SegmentDigit;
