import React from 'react';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'black',
    border: '4px solid #999',
    borderBottomColor: 'white',
    borderRightColor: 'white',
  },
  cell: {
    position: 'relative',
    flexBasis: props => `calc(100% / ${props.width})`,
    '&:before': {
      content: '""',
      display: 'block',
      paddingTop: '100%',
    }
  },
  button: {
    position:'absolute',
    display: 'block',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    border: '2px solid #999',
    backgroundColor: '#ccc',
    borderTopColor: 'white',
    borderLeftColor: 'white',
  },
});

const Grid = () => {
  const width = 10;
  const height = 10;
  const classes = useStyles({ width });

  const cells: Array<React.ReactNode> = [];
  for(let y = 0; y < height; y += 1) {
    for(let x = 0; x < width; x += 1) {
      cells.push((
        <div className={classes.cell} key={`${x}-${y}`}>
          <button className={classes.button}></button>
        </div>
      ));
    }
  }
  return (
    <div className={classes.grid}>
      {cells}
    </div>
  )
};

export default Grid;
