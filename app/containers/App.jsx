import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import configureStore from '../storeConfig';
import { root } from '../sagas';

const store = configureStore();
store.runSaga(root);

import LaunchList from './LaunchList.jsx';

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LaunchList} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;