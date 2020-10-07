import React from 'react';

import { createUseStyles } from 'react-jss'


const useStyles = createUseStyles<string, string>({
  'variant-red': {
    backgroundColor: 'red',
  },
  'variant-green': {
    backgroundColor: 'green',
  },
  'variant-blue': {
    backgroundColor: 'blue',
  },
})

interface IProps {
  variant: 'red' | 'green' | 'blue'
}

const TestComponent = ({ variant }: IProps) => {
  const classes = useStyles()

  return (
    <div className={classes[`variant-${variant}`]}>
      Test Component
    </div>
  )
}

export default TestComponent
