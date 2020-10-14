import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  notes: {
    position: 'absolute',
    left: 20,
    top: 20,
    whiteSpace: 'pre',
    fontFamily: 'monospace',
    fontSize: 12,
  },
});

const Notes = () => {
  const classes = useStyles();
  return (
    <div className={classes.notes}>
      {`TODO:
~~~~~~~~~~~
* Responsivify
* Test
* Move hard-coded colours to a JSS theme, allowing for hotdog.
* Refactor giant ugly Reactsweeper.tsx file
* Best Times window
* About window
* Help window
* Inactive window title bar colour
* Dummy start menu
* Keyboard shortcuts
`}
    </div>
  );
};

export default Notes;
