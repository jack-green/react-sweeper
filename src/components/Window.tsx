import React, {
  useState, useCallback, useEffect, useRef,
} from 'react';
import { createUseStyles } from 'react-jss';
// import Draggable from 'react-draggable';

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
    position: 'absolute',
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
  isBlocking?: boolean
  className?: string
  startPosition?: string
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
  isBlocking,
  className,
  startPosition
}:IProps) => {
  const classes = useStyles();
  const winRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({
    isDragging: false,
    offset: { x: 0, y: 0 },
    position: { x: 0, y: 0 },
    opacity: 0,
  });

  useEffect(() => {
    // center window
    if (winRef.current && state.opacity === 0) {

      const winPos = { x: 0, y: 0 };
      const windowWidth = winRef.current.offsetWidth;
      const windowHeight = winRef.current.offsetHeight;
      const desktopWidth = window.innerWidth;
      const desktopHeight = window.innerHeight;

      if (startPosition === 'center') {
        winPos.x = (desktopWidth - windowWidth) / 2;
        winPos.y = (desktopHeight - windowHeight) / 2;
      } else if (startPosition === 'right') {
        winPos.x = (desktopHeight - windowWidth) - 20; // buffer
        winPos.y = 20;
      }
      setState((s) => ({
        ...s,
        position: winPos,
        opacity: 1,
      }));
    }
  }, [winRef]);

  const handleMouseDown = useCallback(({ clientX, clientY }) => {
    setState((s) => ({
      ...s,
      offset: {
        x: s.position.x - clientX,
        y: s.position.y - clientY,
      },
      isDragging: true,
    }));
  }, []);

  const handleMouseMove = useCallback(({ clientX, clientY }) => {
    setState((s) => ({
      ...s,
      position: {
        x: Math.max(0, clientX + s.offset.x),
        y: Math.max(0, clientY + s.offset.y),
      },
    }));
  }, []);

  const handleMouseUp = useCallback(() => {
    setState((s) => ({
      ...s,
      isDragging: false,
    }));
  }, []);

  useEffect(() => {
    if (state.isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      setState((s) => ({
        ...s,
        translation: { x: 0, y: 0 },
      }));
    }
  }, [state.isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      className={`${classes.window}  ${className}  ${isMinimized ? classes.windowMinimized : ''}`}
      style={{
        left: state.position.x,
        top: state.position.y,
        opacity: state.opacity,
      }}
      ref={winRef}
    >
      <div
        className={classes.bar}
        role="presentation"
        onMouseDown={handleMouseDown}
      >
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
  );
};

Window.defaultProps = {
  icon: '⬛',
  onMinimize: null,
  onMaximize: null,
  onClose: null,
  isMinimized: false,
  className: '',
  isBlocking: false,
  startPosition: 'center',
};

export default Window;
