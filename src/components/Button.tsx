import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  button: {
    display: 'block',
    listStyle: 'none',
    backgroundColor: '#ccc',
    border: '2px solid #fff',
    borderRightColor: '#999',
    borderBottomColor: '#999',
    '&:active:not(:disabled)': {
      border: '2px solid #999',
      borderRightColor: '#fff',
      borderBottomColor: '#fff',
    },
    '&:disabled': {
      cursor: 'default',
      '& >*': {
        opacity: 0.5,
      },
    },
  },
  content: {

  },
});

interface IProps {
  children?: React.ReactNode
  className?: string
}

const Button: React.FC<IProps & React.HTMLProps<HTMLButtonElement>> = ({ className, children, ...nativeProps }:IProps) => {
  const classes = useStyles();

  return (
    <button
      type="button"
      className={`${classes.button} ${className}`}
      {...nativeProps}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  children: null,
  className: '',
};

export default Button;
