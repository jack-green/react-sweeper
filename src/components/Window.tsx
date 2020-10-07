import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import Draggable from 'react-draggable';

import Emoji from './Emoji';

const useStyles = createUseStyles({
  window: {
    backgroundColor: '#ccc',
    border: '2px solid #999',
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    // position: 'absolute',

    // temp
    // left: 200,
    // top: 200,
    width: 400,
  },
  bar: {
    display: 'flex',
    padding: 4,
    border: '2px solid #ccc',
    backgroundColor: 'darkblue',
    color: 'white',
    alignItems: 'center',
  },
  icon: {},
  title: {
    marginLeft: 2,
  },
  controls: {
    marginLeft: 'auto',
    button: {
      marginLeft: 2,
    },
  },
  content: {

  },
  windowMinimized: {
    position: 'absolute',
    left: 20,
    bottom: 0,
  },
  contentMinimized: {
    height: 0,
    overflow: 'hidden',
  },
});

interface IProps {
  title: string
  icon?: string
  children: React.ReactNode
}

const Window = ({ title, icon, children }:IProps) => {
  const [minimized, setMinimized] = useState(false);
  const classes = useStyles();

  const handleStop = () => {

  };

  const defaultPosition = { x: 0, y: 0 };

  return (
    <Draggable
      handle={`.${classes.bar}`}
      defaultPosition={defaultPosition}
      position={minimized ? { x: 0, y: 0 } : undefined}
      scale={1}
      axis={minimized ? 'x' : 'both'}
      onStop={handleStop}
      bounds="parent"
      disabled={minimized}
    >
      <div className={`${classes.window} ${minimized ? classes.windowMinimized : ''}`}>
        <div className={classes.bar}>
          <Emoji alt="Window Icon" className={classes.icon} emoji={icon || '⬛'} />
          <div className={classes.title}>{title}</div>
          <div className={classes.controls}>
            <button type="button" onClick={() => setMinimized(!minimized)}><Emoji alt="Minimize" emoji="➖" /></button>
            <button type="button" disabled><Emoji alt="Maximize" emoji="➕" /></button>
            <button type="button"><Emoji alt="Close" emoji="❌" /></button>
          </div>
        </div>
        <div className={`${classes.content} ${minimized ? classes.contentMinimized : ''}`}>
          {children}
        </div>
      </div>
    </Draggable>
  );
};

Window.defaultProps = {
  icon: '⬛',
};

export default Window;
