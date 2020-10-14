import React from 'react';
import { createUseStyles } from 'react-jss';

import { AppStoreProvider } from '../common/store';

import TaskBar from './TaskBar/TaskBar';
import Reactsweeper from './Reactsweeper/Reactsweeper';
import Notes from './Notes';
import DesktopIcon from './DesktopIcon';
import GitHub from './Svg/GitHub';

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
    display: 'flex',
    padding: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
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
          <Notes />
          <DesktopIcon
            label="GitHub"
            icon={<GitHub />}
            onClick={() => { document.location.href = 'https://github.com/jack-green/react-sweeper'; }}
          />
          <Reactsweeper />
        </div>
        <TaskBar />
      </div>
    </AppStoreProvider>
  );
};

export default App;
