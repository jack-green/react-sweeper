import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

import { useClickOutside } from '../common/hooks';

import Emoji from './Emoji';

const useStyles = createUseStyles({
  menu: {
    display: 'flex',
    listStyle: 'none',
    fontSize: 14,
  },
  menuItem: {
    position: 'relative',
  },
  menuItemButton: {
    padding: '4px 8px',
  },
  menuItemButtonActive: {
    backgroundColor: 'darkblue',
    color: 'white',
  },
  subMenu: {
    backgroundColor: '#ccc',
    border: '2px solid white',
    borderRightColor: '#999',
    borderBottomColor: '#999',
    position: 'absolute',
    top: '100%',
    left: 0,
    opacity: 0,
    pointerEvents: 'none',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  active: {
    opacity: 1,
    pointerEvents: 'all',
  },
  subMenuItem: {
    padding: '4px 32px 4px 24px',
    position: 'relative',
    width: '100%',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
  },
  check: {
    position: 'absolute',
    left: 4,
  },
  shortcut: {
    position: 'absolute',
    right: 4,
  },
  subMenuItemLabel: {
    flexGrow: 1,
    whiteSpace: 'nowrap',
  },
  subMenuItemShortcut: {

  },
  hr: {
    display: 'block',
    width: '100%',
    borderTop: '1px solid #999',
    borderBottom: '1px solid #fff',
    margin: 0,
  },
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
  });

  const toggleMenu = (type: string) => {
    setMenuOpen(menuOpen === type ? '' : type);
  };

  const handleClick = (id: string) => {
    setMenuOpen('');
    if (onClick) onClick(id);
  };

  return (
    <div className={classes.menu} ref={ref}>
      {items.map((item: any) => (
        <div className={classes.menuItem} key={`item-${item.id}`}>
          <button
            className={`${classes.menuItemButton} ${menuOpen === item.id ? classes.menuItemButtonActive : ''}`}
            type="button"
            onClick={() => toggleMenu(item.id)}
          >
            {item.label}
          </button>
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
                    {child.shortcut && (
                      <div className={classes.shortcut}>{child.shortcut}</div>
                    )}
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
