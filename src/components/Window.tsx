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
    zIndex: 11,
  },
  modalWindow: {
    zIndex: 13,
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
  modalBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 12,
  },
});

interface IProps {
  title: string
  icon?: string
  isMinimized?: boolean
  isModal?: boolean
  className?: string
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
  isModal,
  isMinimized,
  onMinimize,
  onMaximize,
  className,
}:IProps) => {
  const classes = useStyles();
  const winRef = useRef<HTMLDivElement>(null);
  const [initialized, setInitialized] = useState(false);
  const [state, setState] = useState({
    isDragging: false,
    offset: { x: 0, y: 0 },
    position: { x: 0, y: 0 },
  });

  useEffect(() => {
    // center window
    if (winRef.current && !initialized) {
      const winPos = { x: 0, y: 0 };
      const windowWidth = winRef.current.offsetWidth;
      const windowHeight = winRef.current.offsetHeight;
      winPos.x = (window.innerWidth - windowWidth) / 2;
      winPos.y = (window.innerHeight - windowHeight) / 2;
      setState((s) => ({
        ...s,
        position: winPos,
      }));
      setInitialized(true);
    }
  }, [winRef, initialized]);

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

  const classNames = [classes.window];
  if (isMinimized) classNames.push(classes.windowMinimized);
  if (isModal) classNames.push(classes.modalWindow);
  if (className) classNames.push(className);

  return (
    <>
      <div
        className={classNames.join('  ')}
        style={{
          left: state.position.x,
          top: state.position.y,
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
      {isModal && <div className={classes.modalBackground} />}
    </>
  );
};

Window.defaultProps = {
  icon: '',
  onMinimize: null,
  onMaximize: null,
  onClose: null,
  isMinimized: false,
  className: '',
  isModal: false,
};

export default Window;
