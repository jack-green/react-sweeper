import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

import Emoji from './Emoji';

const useStyles = createUseStyles({
  menu: {
    display: 'flex',
    listStyle: 'none',
  },
  menuItem: {
    position: 'relative',
  },
  subMenu: {
    backgroundColor: '#666',
    position: 'absolute',
    top: '100%',
    left: 0,
    opacity: 0,
    pointerEvents: 'none',
    zIndex: 10,
  },
  active: {
    opacity: 1,
    pointerEvents: 'all',
  },
  subMenuItem: {},
  check: {},
});

const Menu = () => {
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState('');

  const toggleMenu = (type: string) => {
    setMenuOpen(menuOpen === type ? '' : type);
  };

  const menuStructure = [
    {
      id: 'game',
      label: (
        <span>
          <u>G</u>
          ame
        </span>
      ),
      children: [
        {
          id: 'new',
          label: (
            <span>
              <u>N</u>
              ew
            </span>
          ),
          shortcut: 'F2',
        },
        {
          divider: true,
        },
        {
          id: 'beginner',
          label: (
            <span>
              <u>B</u>
              eginner
            </span>
          ),
          checked: true,
        },
        {
          id: 'intermediate',
          label: (
            <span>
              <u>I</u>
              ntermediate
            </span>
          ),
          checked: false,
        },
        {
          id: 'expert',
          label: (
            <span>
              <u>E</u>
              xpert
            </span>
          ),
          checked: false,
        },
        {
          id: 'custom',
          label: (
            <span>
              <u>C</u>
              ustom...
            </span>
          ),
        },
        {
          divider: true,
        },
        {
          id: 'marks',
          label: (
            <span>
              <u>M</u>
              arks (?)
            </span>
          ),
          checked: true,
        },
        {
          id: 'color',
          label: (
            <span>
              Co
              <u>l</u>
              or
            </span>
          ),
          checked: true,
        },
        {
          divider: true,
        },
        {
          id: 'best-times',
          label: (
            <span>
              Best
              <u>T</u>
              imes
            </span>
          ),
        },
        {
          divider: true,
        },
        {
          id: 'exit',
          label: (
            <span>
              E
              <u>x</u>
              it
            </span>
          ),
        },
      ],
    },
    {
      id: 'help',
      label: (
        <span>
          <u>H</u>
          elp
        </span>
      ),
      children: [
        {
          id: 'help-topics',
          label: (
            <span>
              <u>H</u>
              elp Topics
            </span>
          ),
        },
        {
          id: 'about',
          label: (
            <span>
              <u>A</u>
              bout Reactsweeper
            </span>
          ),
        },
      ],
    },
  ];

  return (
    <div className={classes.menu}>
      {menuStructure.map((item) => (
        <div className={classes.menuItem} key={`item-${item.id}`}>
          <button type="button" onClick={() => toggleMenu(item.id)}>{item.label}</button>
          {item.children && (
            <div className={`${classes.subMenu} ${menuOpen === item.id ? classes.active : ''}`}>
              {item.children.map((child) => {
                if (child.divider) return <hr />;
                return (
                  <button type="button" key={child.id} className={classes.subMenuItem}>
                    {child.checked && (
                      <Emoji alt="Checked" emoji="✔" className={classes.check} />
                    )}
                    {child.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Menu;
