import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga';

import rootReducer from './reducers';

const logger = createLogger();

export default function configureStore(state) {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];
    
  //this should only happen in development mode
  middleware.push(logger);

  const store = createStore(
    rootReducer,
    state,
    applyMiddleware(...middleware)
  );

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
}