import React from 'react';

import { IApp } from '../../common/types';

interface IProps {
  app: IApp
}

const App = ({ app }: IProps) => (
  <div>{app.title}</div>
);

export default App;
