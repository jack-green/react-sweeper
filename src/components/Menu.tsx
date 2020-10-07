import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'

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
  },
  active: {
    opacity: 1,
    pointerEvents: 'all',
  },
})

const Menu = () => {
  const classes = useStyles()
  const [menuOpen, setMenuOpen] = useState('')

  const toggleMenu = (type: string) => {
    setMenuOpen(menuOpen === type ? '' : type)
  }

  const menuStructure = [
    {
      id: 'game',
      label: 'Game',
      children: [
        {
          id: 'new',
          label: 'New...',
        },
        {
          id: 'quit',
          label: 'Quit',
        },
      ],
    },
    {
      id: 'help',
      label: 'Help'
    },
  ]
  
  return (
    <div className={classes.menu}>
      {menuStructure.map((item) => (
        <div className={classes.menuItem} key={`item-${item.id}`}>
          <button onClick={() => toggleMenu(item.id)}>{item.label}</button>
          {item.children && (
            <div className={`${classes.subMenu} ${menuOpen === item.id ? classes.active : ''}`}>
              {item.children.map((child) => (
                <button key={child.id}>{child.label}</button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Menu
