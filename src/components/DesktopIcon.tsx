import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  desktopIcon: {},
  icon: {
    width: 64,
    height: 64,
    '& svg': {
      width: 64,
      height: 64,
    },
  },
  label: {
    fontSize: 12,
    color: 'white',
  },
});

interface IProps {
  icon: React.ReactNode
  label: string
  onClick?: () => void
}

const DesktopIcon = ({
  icon,
  label,
  onClick,
}: IProps) => {
  const classes = useStyles();
  return (
    <button type="button" className={classes.desktopIcon} onClick={onClick}>
      <div className={classes.icon}>{icon}</div>
      <div className={classes.label}>{label}</div>
    </button>
  );
};

DesktopIcon.defaultProps = {
  onClick: () => {},
};

export default DesktopIcon;
