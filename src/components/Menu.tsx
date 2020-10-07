import React, { useState } from 'react';

import styles from './Menu.module.scss';

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState('');

  const toggleMenu = (type: string) => {
    setMenuOpen(menuOpen === type ? '' : type);
  }
  
  return (
    <ul className={styles.menu}>
      <li className={menuOpen === 'game' ? styles.active : ''}>
        <button onClick={() => toggleMenu('game')}>Game</button>
        <ul>
          <li><button>New...</button></li>
          <li><button>Quit</button></li>
        </ul>
      </li>
      <li className={menuOpen === 'help' ? styles.active : ''}>
        <button onClick={() => toggleMenu('help')}>Help</button>
      </li>
    </ul>
  );
};

export default Menu;