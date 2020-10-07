import React from 'react';

import styles from './Window.module.scss';

interface IProps {
  title: String
  icon: String
  children: React.ReactNode
}

const Window = ({ title, icon, children }:IProps) => (
  <div className={styles.window}>
    <div className={styles.bar}>
      <span className={styles.icon} role="img" aria-label="Window Icon">{icon || '⬛'}</span>
      <div className={styles.title}>{title}</div>
      <div className={styles.controls}>
        <button>➖</button>
        <button>➕</button>
        <button>❌</button>
      </div>
    </div>
    {children}
  </div>
);

export default Window;
