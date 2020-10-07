import React from 'react';

interface IProps {
  emoji: string
  alt: string
  className?: string
}

const Emoji = ({ emoji, alt, className }: IProps) => (
  <span role="img" aria-label={alt} className={className || ''}>{emoji}</span>
);

Emoji.defaultProps = {
  className: '',
};

export default Emoji;
