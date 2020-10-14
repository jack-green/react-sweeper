import React from 'react';
import { createUseStyles } from 'react-jss';

import Window from '../Window';

const useStyles = createUseStyles({
  about: {
    width: 400,
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface IProps {
  onClose: () => void
}

const About = ({ onClose }: IProps) => {
  const classes = useStyles();
  return (
    <Window title="About Reactsweeper" onClose={onClose} isModal>
      <div className={classes.about}>
        TODO
      </div>
    </Window>
  );
};

export default About;
