import React from 'react';
import { createUseStyles } from 'react-jss';

import { IApp } from '../../common/types';

import Button from '../Button';
import Emoji from '../Emoji';

const useStyles = createUseStyles({
  active: {
    backgroundColor: '#eee',
    borderTopColor: '#999',
    borderLeftColor: '#999',
    borderRightColor: '#fff',
    borderBottomColor: '#fff',
  },
});

interface IProps {
  app: IApp
  onClick: () => void
}

const App = ({ app, onClick }: IProps) => {
  const classes = useStyles();
  return (
    <Button onClick={onClick} className={!app.isMinimized ? classes.active : ''}>
      <Emoji alt={app.title} emoji={app.icon} />
      {app.title}
      { app.isMinimized ? ' (minimized)' : ''}
    </Button>
  );
};

export default App;
