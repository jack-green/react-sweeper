import React from 'react';
import { createUseStyles } from 'react-jss';

import Window from '../Window';

const useStyles = createUseStyles({
  about: {},
});

const About = () => {
  const classes = useStyles();
  return (
    <Window title="About Reactsweeper" className={classes.about}>
      About
    </Window>
  );
};

export default About;
