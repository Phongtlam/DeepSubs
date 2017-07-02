import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import Chessboard from './Chessboard';
import configureStore from '../redux/store';

// import store from './redux/store';

const store = configureStore();

const Routing = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/home" component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Routing;
