import React, {
  useContext,
  useState,
  useEffect,
} from 'react';
import { createUseStyles } from 'react-jss';

import { AppStore } from '../../common/store';
import { IContext } from '../../common/types';

import Window from '../Window';
import Menu from '../Menu';
import Header from './Header';
import Grid from './Grid';

import gameMenu from './menu';
import Game from './engine/Game';
import Tile, { TileStatus } from './engine/Tile';

const useStyles = createUseStyles({
  game: {
    margin: 2,
    border: '4px solid #999',
    borderTopColor: 'white',
    borderLeftColor: 'white',
    padding: 6,
  },
});

const presets = {
  beginner: {
    width: 8,
    height: 8,
    mines: 10,
  },
  intermediate: {
    width: 16,
    height: 16,
    mines: 40,
  },
  expert: {
    width: 30,
    height: 16,
    mines: 99,
  },
};

const defaultSettings = {
  ...presets.beginner,
  allowMarks: true,
  useColor: true,
};

const game = new Game();

const Reactsweeper = () => {
  const [interactive, setInteractive] = useState(true);
  const [status, setStatus] = useState('idle');
  const [gameData, setGameData] = useState('');
  const [settings, setSettings] = useState(defaultSettings);
  const { state, dispatch }: IContext = useContext(AppStore);
  const classes = useStyles();

  const onUpdate = (data: string) => {
    setGameData(data);
  };

  useEffect(() => {
    game.onUpdate = onUpdate;
    game.restart(settings);
  }, []);

  const app = state.apps.find((a) => a.id === 'reactsweeper');
  if (!app || !gameData.length) return null;

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

  const restartGame = (config?: any): void => {
    setStatus('idle');
    setInteractive(true);
    game.restart(config || settings);
    // todo: reset & pause timer
  };

  const menu = gameMenu(settings);

  const handleMenuClick = (id: string) => {
    switch (id) {
      case 'new':
        restartGame();
        break;
      case 'beginner':
      case 'intermediate':
      case 'expert':
        setSettings({
          ...settings,
          ...presets[id],
        });
        restartGame(presets[id]);
        break;
      case 'custom':
        alert('Custom game'); // todo
        break;
      case 'marks':
        if (settings.allowMarks) game.unmarkAll();
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
      case 'help-topics':
        alert('Help Topics'); // todo
        break;
      case 'about':
        alert('About'); // todo
        break;
      default:
        break;
    }
  };

  const handleGridMouseDown = () => {
    if (!interactive) return;
    setStatus('down');
  };

  const handleGridMouseUp = () => {
    if (!interactive) return;
    setStatus('idle');
  };

  const handleTileClick = (tile: Tile, toggleFlag: boolean) => {
    if (!interactive) return;
    if (toggleFlag) {
      game.flag(tile.x, tile.y, settings.allowMarks);
      return;
    }

    if (tile.status !== TileStatus.HIDDEN) return; // need to unflag first

    if (tile.value === -1) {
      game.dead(tile);
      setStatus('dead');
      setInteractive(false);
      // todo: stop timer
      return;
    }
    // reveal
    game.reveal(tile.x, tile.y);

    if (game.revealedTileCount === settings.width * settings.height - settings.mines) {
      // todo: stop timer, record score
      game.win();
      setStatus('won');
      setInteractive(false);
      alert('WIN!');
    }
  };

  const remaining = Math.max(0, settings.mines - game.flagCount);

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
        <Header onReset={restartGame} status={status} remaining={remaining} />
        <Grid
          game={game}
          onMouseDown={handleGridMouseDown}
          onMouseUp={handleGridMouseUp}
          onClick={handleTileClick}
        />
      </div>
    </Window>
  );
};

export default Reactsweeper;
