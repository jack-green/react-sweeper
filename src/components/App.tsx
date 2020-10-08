import React from 'react';
import { createUseStyles } from 'react-jss';

import { AppStoreProvider } from '../common/store';

import TaskBar from './TaskBar/TaskBar';
import Reactsweeper from './Reactsweeper/Reactsweeper';

const useStyles = createUseStyles({
  app: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  desktop: {
    flexGrow: 1,
  },
  game: {
    margin: 2,
    border: '4px solid #999',
    borderTopColor: 'white',
    borderLeftColor: 'white',
    padding: 6,
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <AppStoreProvider>
      <div className={classes.app}>
        <div className={classes.desktop}>
          <Reactsweeper />
        </div>
        <TaskBar />
      </div>
    </AppStoreProvider>
  );
};

export default App;
