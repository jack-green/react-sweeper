import React from 'react';
import { createUseStyles } from 'react-jss';

import { IApp } from '../../common/types';

import Start from './Start';
import App from './App';
import Clock from './Clock';

const useStyles = createUseStyles({
  taskbar: {},
  start: {},
  apps: {},
});

interface IProps {
  trayApps?: IApp[]
}

const TaskBar = ({ trayApps }: IProps) => {
  const classes = useStyles();
  return (
    <div className={classes.taskbar}>
      <Start />
      <div className={classes.apps}>
        {trayApps && trayApps.map((app) => (
          <App app={app} />
        ))}
      </div>
      <Clock />
    </div>
  );
};

TaskBar.defaultProps = {
  trayApps: [],
};

export default TaskBar;
