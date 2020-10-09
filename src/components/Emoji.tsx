import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  emoji: {
    fontSize: 14,
    lineHeight: 1,
    display: 'inline-block',
  },
});

interface IProps {
  emoji: string
  alt: string
  className?: string
}

const Emoji = ({ emoji, alt, className }: IProps) => {
  const classes = useStyles();
  return (
    <span
      className={`${classes.emoji}  ${className}`}
      role="img"
      aria-label={alt}
    >
      {emoji}
    </span>
  );
};

Emoji.defaultProps = {
  className: '',
};

export default Emoji;
