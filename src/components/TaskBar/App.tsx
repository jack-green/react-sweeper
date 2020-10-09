import React from 'react';
import { createUseStyles } from 'react-jss';

import { IApp } from '../../common/types';

import Button from '../Button';
import Emoji from '../Emoji';

const useStyles = createUseStyles({
  app: {
    height: 30,
    padding: '0 8px',
  },
  active: {
    backgroundColor: '#eee',
    borderTopColor: '#999',
    borderLeftColor: '#999',
    borderRightColor: '#fff',
    borderBottomColor: '#fff',
  },
  icon: {
    marginRight: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

interface IProps {
  app: IApp
  onClick: () => void
}

const App = ({ app, onClick }: IProps) => {
  const classes = useStyles();
  return (
    <Button onClick={onClick} className={`${classes.app} ${!app.isMinimized ? classes.active : ''}`}>
      <Emoji alt={app.title} emoji={app.icon} className={classes.icon} />
      <span className={classes.label}>{app.title}</span>
    </Button>
  );
};

export default App;
