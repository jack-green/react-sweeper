import React, { useReducer } from 'react';

import { IState, IContext } from './types';

const initialState: IState = {
  apps: [
    {
      id: 'reactsweeper',
      title: 'Reactsweeper',
      icon: '💣',
      isMinimized: false,
    },
  ],
};

export const AppStore = React.createContext({} as IContext);

const reducer = (state: IState, action: any) => {
  switch (action.type) {
    case 'MINIMIZE_APP':
    {
      const apps = [...state.apps];
      const app:any = apps.find((a:any) => a.id === action.id);
      if (app) app.isMinimized = true;
      return { ...state, apps };
    }
    case 'MAXIMIZE_APP':
    {
      const apps = [...state.apps];
      const app:any = apps.find((a:any) => a.id === action.id);
      app.isMinimized = false;
      return { ...state, apps };
    }
    default:
      return state;
  }
};

export function AppStoreProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <AppStore.Provider value={value}>
      {children}
    </AppStore.Provider>
  );
}
