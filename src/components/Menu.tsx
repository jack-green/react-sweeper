import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

import { useClickOutside } from '../common/hooks';

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
    backgroundColor: '#ccc',
    position: 'absolute',
    top: '100%',
    left: 0,
    opacity: 0,
    pointerEvents: 'none',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingRight: 24,
  },
  active: {
    opacity: 1,
    pointerEvents: 'all',
  },
  subMenuItem: {
    paddingLeft: 24,
    position: 'relative',
    display: 'flex',
  },
  check: {
    position: 'absolute',
    left: 4,
  },
  subMenuItemLabel: {
    flexGrow: 1,
  },
  subMenuItemShortcut: {

  },
  hr: {
    display: 'block',
  }
});

interface IProps {
  items: object[]
  onClick: Function
}

const Menu = ({ items, onClick }:IProps) => {
  const classes = useStyles();
  const ref = React.createRef<HTMLDivElement>();
  const [menuOpen, setMenuOpen] = useState('');

  useClickOutside(ref, () => {
    setMenuOpen('');
  })

  const toggleMenu = (type: string) => {
    setMenuOpen(menuOpen === type ? '' : type);
  };

  const handleClick = (id: string) => {
    setMenuOpen('');
    if (onClick) onClick(id);
  }

  return (
    <div className={classes.menu} ref={ref}>
      {items.map((item: any) => (
        <div className={classes.menuItem} key={`item-${item.id}`}>
          <button type="button" onClick={() => toggleMenu(item.id)}>{item.label}</button>
          {item.children && (
            <div className={`${classes.subMenu} ${menuOpen === item.id ? classes.active : ''}`}>
              {item.children.map((child: any, i: number) => {
                if (child.divider) return <hr className={classes.hr} key={`hr-${i + 0}`} />;
                return (
                  <button
                    type="button"
                    key={child.id}
                    className={classes.subMenuItem}
                    onClick={() => handleClick(child.id)}
                  >
                    {child.checked && (
                      <Emoji alt="Checked" emoji="✔" className={classes.check} />
                    )}
                    <div className={classes.subMenuItemLabel}>{child.label}</div>
                    {child.shortcut && <div className={classes.subMenuItemShortcut}>{child.shortcut}</div>}
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
