import React, { useContext, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { AppStore } from '../../common/store';
import { IContext } from '../../common/types';

import Window from '../Window';
import Menu from '../Menu';
import Header from './Header';
import Grid from './Grid';

import gameMenu from './menu';
import Game from './engine/Game';
import Tile from './engine/Tile';

const useStyles = createUseStyles({
  game: {
    margin: 2,
    border: '4px solid #999',
    borderTopColor: 'white',
    borderLeftColor: 'white',
    padding: 6,
  },
});

const defaultSettings = {
  width: 8,
  height: 8,
  mines: 10,
  allowMarks: true,
  useColor: true,
};

const offsets = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]];

const Reactsweeper = () => {
  const [status, setStatus] = useState('idle');
  const [game, setGame] = useState(new Game(defaultSettings));
  const [settings, setSettings] = useState(defaultSettings);
  const { state, dispatch }: IContext = useContext(AppStore);
  const classes = useStyles();

  const app = state.apps.find((a) => a.id === 'reactsweeper');
  if (!app) return null;

  const handleClose = () => {
    alert('No quitting!');
  };

  const handleMinimize = () => {
    // todo: pause game
    dispatch({
      type: 'MINIMIZE_APP',
      id: app.id,
    } as any);
  };

  const restartGame = (): void => {
    setGame(new Game(settings));
    // todo: reset & pause timer
  };

  const menu = gameMenu(settings);

  const handleMenuClick = (id: string) => {
    switch (id) {
      case 'new':
        restartGame();
        break;
      case 'beginner':
        setSettings({
          ...settings,
          width: 8,
          height: 8,
          mines: 10,
        });
        restartGame();
        break;
      case 'intermediate':
        setSettings({
          ...settings,
          width: 16,
          height: 16,
          mines: 40,
        });
        restartGame();
        break;
      case 'expert':
        setSettings({
          ...settings,
          width: 30,
          height: 16,
          mines: 99,
        });
        restartGame();
        break;
      case 'custom':
        alert('Custom game'); // todo
        break;
      case 'marks':
        setSettings({
          ...settings,
          allowMarks: !settings.allowMarks,
        });
        break;
      case 'color':
        setSettings({
          ...settings,
          useColor: !settings.useColor,
        });
        break;
      case 'best-times':
        alert('Best Times'); // todo
        break;
      case 'exit':
        handleClose();
        break;
      default:
        break;
    }
  };

  const handleGridMouseDown = () => {
    setStatus('down');
  };

  const handleGridMouseUp = () => {
    setStatus('idle');
  };

  const handleTileClick = (tile: Tile, toggleFlag: boolean) => {
    console.log('tileclick', tile);
    if (toggleFlag) {
      if (!settings.allowMarks) return;
      game.flag(tile.x, tile.y);
      setGame(game);
      return;
    }

    // todo
    if (tile.value === -1) {
      alert('DED');
      return;
    }
    // reveal
    game.reveal(tile.x, tile.y);
    console.log(game);
    setGame(game);
  };

  return (
    <Window
      title={app.title}
      icon={app.icon}
      isMinimized={app.isMinimized}
      onClose={handleClose}
      onMinimize={handleMinimize}
    >
      <Menu items={menu} onClick={handleMenuClick} />
      <div className={classes.game}>
        <Header onReset={restartGame} status={status} />
        <Grid
          game={game}
          settings={settings}
          onMouseDown={handleGridMouseDown}
          onMouseUp={handleGridMouseUp}
          onClick={handleTileClick}
        />
      </div>
    </Window>
  );
};

export default Reactsweeper;
