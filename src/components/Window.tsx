import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  window: {
    backgroundColor: '#ccc',
    border: '2px solid rgb(196, 148, 148)',
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    position: 'absolute',
  
    // temp
    left: 200,
    top: 200,
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
    'button': {
      marginLeft: 2,
    },
  },
})

interface IProps {
  title: String
  icon: String
  children: React.ReactNode
}

const Window = ({ title, icon, children }:IProps) => {
  const classes = useStyles();
  return (
    <div className={classes.window}>
      <div className={classes.bar}>
        <span className={classes.icon} role="img" aria-label="Window Icon">{icon || '⬛'}</span>
        <div className={classes.title}>{title}</div>
        <div className={classes.controls}>
          <button>➖</button>
          <button>➕</button>
          <button>❌</button>
        </div>
      </div>
      {children}
    </div>
  );
}

export default Window
