import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from '../reducers';

import storeConfig from '../storeConfig';

jest.mock('redux');
jest.mock('redux-logger');
jest.mock('redux-saga');
jest.mock('../reducers');

describe('storeConfig', () => {
  const state = { test: 'testState' };

  beforeAll(() => {
    createStore.mockReturnValue({
      text: 'store',
      close: Function(),
      dispatch: Function()
    });
    createLogger.mockReturnValue('logger');
    applyMiddleware.mockReturnValue('middleware');
    createSagaMiddleware.mockReturnValue({ run: 'saga' });
  });

  afterEach(() => {
    jest.resetModules();
  });

  test('env', () => {
    const toTest = storeConfig(state);
    expect(toTest.text).toEqual('store');
    expect(toTest.close).toEqual(expect.any(Function));
    expect(toTest.dispatch).toEqual(expect.any(Function));
    expect(toTest.runSaga).toEqual('saga');
    expect(createSagaMiddleware).toHaveBeenCalledWith();
    expect(createStore).toHaveBeenCalledWith(rootReducer, state, 'middleware');
  });

  test('calls store.dispatch with END', () => {
    const store = storeConfig(state);
    store.dispatch = jest.fn();
    store.close();
    expect(store.dispatch).toHaveBeenCalledWith(END);
  });
});