import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import 'bootstrap';

import './scss/index.scss';

import App from './containers/App.jsx';

render (
  <App />,
  document.getElementById('app')
);