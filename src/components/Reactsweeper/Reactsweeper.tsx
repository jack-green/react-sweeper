import React, {
  useContext,
  useState,
  useEffect,
} from 'react';
import { createUseStyles } from 'react-jss';
import useInterval from '@rooks/use-interval';

import { AppStore } from '../../common/store';
import { IContext, IGameConfig } from '../../common/types';

import Window from '../Window';
import Menu from '../Menu';
import Header from './Header';
import Grid from './Grid';

import gameMenu from './menu';
import Game from './engine/Game';
import Tile, { TileStatus } from './engine/Tile';
import CustomGame from './CustomGame';
import Help from './Help';
import BestTimes from './BestTimes';
import About from './About';

const useStyles = createUseStyles({
  reactSweeper: {
    userSelect: 'none',
  },
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
  const [windows, setWindows] = useState({
    customGame: false,
    bestTimes: false,
    help: false,
    about: false,
  });
  const [interactive, setInteractive] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [status, setStatus] = useState('idle');
  const [timer, setTimer] = useState(0);
  const [gameData, setGameData] = useState('');
  const [settings, setSettings] = useState(defaultSettings);
  const { state, dispatch }: IContext = useContext(AppStore);
  const classes = useStyles();

  const { start: startTimer, stop: stopTimer } = useInterval(() => {
    setTimer(timer + 1);
  }, 1000, false);

  const onUpdate = (data: string) => {
    setGameData(data);
  };

  useEffect(() => {
    game.onUpdate = onUpdate;
    game.restart(settings);
  }, []);

  const app = state.apps.find((a) => a.id === 'reactsweeper');
  if (!app || !gameData.length) return null;

  const toggleWindow = (window: string, show: boolean) => {
    const newWindows: any = { ...windows };
    newWindows[window] = show;
    setWindows(newWindows);
  };

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

  const restartGame = (config?: IGameConfig): void => {
    setStatus('idle');
    setInteractive(true);
    setGameStarted(false);
    game.restart(config || settings);
    stopTimer();
    setTimer(0);
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
        toggleWindow('customGame', true);
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
        toggleWindow('bestTimes', true);
        break;
      case 'exit':
        handleClose();
        break;
      case 'help-topics':
        toggleWindow('help', true);
        break;
      case 'about':
        toggleWindow('about', true);
        break;
      default:
        break;
    }
  };

  const customGame = (customConfig: IGameConfig) => {
    toggleWindow('customGame', false);
    setSettings({
      ...settings,
      ...customConfig,
    });
    restartGame(customConfig);
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
    if (!gameStarted) {
      startTimer();
      setGameStarted(true);
    }
    if (toggleFlag) {
      game.flag(tile.x, tile.y, settings.allowMarks);
      return;
    }

    if (tile.status !== TileStatus.HIDDEN) return; // need to unflag first

    if (tile.value === -1) {
      game.dead(tile);
      setStatus('dead');
      setInteractive(false);
      stopTimer();
      // todo: stop timer
      return;
    }
    // reveal
    game.reveal(tile.x, tile.y);

    if (game.revealedTileCount === settings.width * settings.height - settings.mines) {
      game.win();
      setStatus('won');
      setInteractive(false);
      stopTimer();
      // todo: add score to fake high score table.
    }
  };

  const remaining = Math.max(0, settings.mines - game.flagCount);

  return (
    <>
      <Window
        title={app.title}
        icon={app.icon}
        isMinimized={app.isMinimized}
        onClose={handleClose}
        onMinimize={handleMinimize}
        className={classes.reactSweeper}
      >
        <Menu items={menu} onClick={handleMenuClick} />
        <div className={classes.game}>
          <Header
            onReset={restartGame}
            status={status}
            remaining={remaining}
            timer={timer}
          />
          <Grid
            game={game}
            onMouseDown={handleGridMouseDown}
            onMouseUp={handleGridMouseUp}
            onClick={handleTileClick}
          />
        </div>
      </Window>
      {windows.customGame && (
        <CustomGame
          onClose={() => toggleWindow('customGame', false)}
          onSubmit={customGame}
          initialConfig={{ width: settings.width, height: settings.height, mines: settings.mines }}
        />
      )}
      {windows.bestTimes && <BestTimes />}
      {windows.help && <Help />}
      {windows.about && <About />}
    </>
  );
};

export default Reactsweeper;
