import React from 'react';
import Window from './Window';
import Menu from './Menu';
import Header from './Header';
import Grid from './Grid';

import styles from './App.module.scss';

const App = () => {
  return (
    <div className={styles.app}>
      <Window title="Reactsweeper" icon="💣">
        <Menu />
        <div className={styles.game}>
          <Header />
          <Grid />
        </div>
      </Window>
    </div>
  );
}

export default App;
