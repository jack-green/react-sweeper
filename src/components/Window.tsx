import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import Draggable from 'react-draggable';

import Button from './Button';
import Emoji from './Emoji';

const useStyles = createUseStyles({
  window: {
    display: 'inline-flex',
    flexDirection: 'column',
    backgroundColor: '#ccc',
    border: '2px solid #999',
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    opacity: 1,
  },
  bar: {
    display: 'flex',
    padding: 4,
    border: '2px solid #ccc',
    backgroundColor: 'darkblue',
    color: 'white',
    alignItems: 'center',
  },
  icon: {
    marginRight: 2,
  },
  title: {
    marginLeft: 2,
    fontSize: 14,
  },
  controls: {
    marginLeft: 'auto',
    display: 'flex',
  },
  control: {
    marginLeft: 2,
    padding: 0,
    width: 20,
    height: 20,
  },
  controlIcon: {
    fontSize: 10,
    position: 'relative',
    top: 1,
  },
  content: {

  },
  windowMinimized: {
    opacity: 0,
    pointerEvents: 0,
  },
  contentMinimized: {
    height: 0,
    overflow: 'hidden',
  },
});

interface IProps {
  title: string
  icon?: string
  isMinimized?: boolean
  children: React.ReactNode
  onMinimize?: () => void
  onMaximize?: () => void
  onClose?: () => void
}

const Window = ({
  title,
  icon,
  children,
  onClose,
  isMinimized,
  onMinimize,
  onMaximize,
}:IProps) => {
  const classes = useStyles();

  const defaultPosition = { x: 0, y: 0 };

  useEffect(() => {
    // center window
  }, []);

  return (
    <Draggable
      handle={`.${classes.bar}`}
      defaultPosition={defaultPosition}
      scale={1}
      bounds="parent"
      disabled={isMinimized}
    >
      <div className={`${classes.window} ${isMinimized ? classes.windowMinimized : ''}`}>
        <div className={classes.bar}>
          {icon && <Emoji alt="Window Icon" className={classes.icon} emoji={icon || '⬛'} />}
          <div className={classes.title}>{title}</div>
          <div className={classes.controls}>
            {(onMinimize || onMaximize) && (
              <>
                <Button disabled={!onMinimize} onClick={onMinimize} className={classes.control}>
                  <Emoji alt="Minimize" emoji="➖" className={classes.controlIcon} />
                </Button>
                <Button disabled={!onMaximize} onClick={onMaximize} className={classes.control}>
                  <Emoji alt="Maximize" emoji="➕" className={classes.controlIcon} />
                </Button>
              </>
            )}
            {onClose && (
              <Button onClick={onClose} className={classes.control}>
                <Emoji alt="Close" emoji="❌" className={classes.controlIcon} />
              </Button>
            )}
          </div>
        </div>
        <div className={classes.content}>
          {children}
        </div>
      </div>
    </Draggable>
  );
};

Window.defaultProps = {
  icon: '⬛',
  onMinimize: null,
  onMaximize: null,
  onClose: null,
  isMinimized: false,
};

export default Window;
