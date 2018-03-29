import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-dom';

import store from './store';

import './reset.css';
import './index.css';

import Game from './components/game';

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('root')
);
