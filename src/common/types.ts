export interface IApp {
  id: string
  title: string
  icon: string
  isMinimized: boolean
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

export interface IGameConfig {
  width: number
  height: number
  mines: number
}
