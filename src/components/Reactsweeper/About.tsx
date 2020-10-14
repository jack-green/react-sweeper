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

const About = () => {
  const classes = useStyles();
  return (
    <Window title="About Reactsweeper">
      <div className={classes.about}>
        TODO
      </div>
    </Window>
  );
};

export default About;
