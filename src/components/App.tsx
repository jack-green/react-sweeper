import React from 'react';
import { createUseStyles } from 'react-jss'

import Window from './Window';
import Menu from './Menu';
import Header from './Header';
import Grid from './Grid';

const useStyles = createUseStyles({
  app: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  game: {
    margin: 2,
    border: '4px solid #999',
    borderTopColor: 'white',
    borderLeftColor: 'white',
    padding: 6,
  },
})

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <Window title="Reactsweeper" icon="💣">
        <Menu />
        <div className={classes.game}>
          <Header />
          <Grid />
        </div>
      </Window>
    </div>
  );
}

export default App;
