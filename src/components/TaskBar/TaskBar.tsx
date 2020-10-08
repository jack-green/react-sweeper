import React, { useContext } from 'react';
import { createUseStyles } from 'react-jss';

import { IApp, IContext } from '../../common/types';
import { AppStore } from '../../common/store';

import Start from './Start';
import App from './App';
import Clock from './Clock';

const useStyles = createUseStyles({
  taskbar: {
    display: 'flex',
    backgroundColor: '#ccc',
    padding: 2,
  },
  start: {},
  apps: {
    flexGrow: 1,
  },
});

const TaskBar = () => {
  const { state, dispatch }: IContext = useContext(AppStore);
  const classes = useStyles();

  const toggleApp = (app: IApp): void => {
    if (app.isMinimized) {
      dispatch({ type: 'MAXIMIZE_APP', id: app.id } as any);
    } else {
      dispatch({ type: 'MINIMIZE_APP', id: app.id } as any);
    }
  };

  return (
    <div className={classes.taskbar}>
      <Start />
      <div className={classes.apps}>
        {state.apps && state.apps.map((app: IApp) => (
          <App key={app.id} app={app} onClick={() => toggleApp(app)} />
        ))}
      </div>
      <Clock />
    </div>
  );
};

export default TaskBar;
