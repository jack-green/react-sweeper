export interface IApp {
  id: string
  title: string
  icon: string
  isMinimized: boolean
}

export interface ITile {
  index: number
  value: number
  isRevealed: boolean
  isFlagged: boolean
}

export interface IState {
  apps: IApp[]
}

export interface IAction {
  type: string
}

export interface IContext {
  state: IState;
  dispatch: ({ type }:{type:string}) => void;
}
