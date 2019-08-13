import { fork, takeLatest, call } from 'redux-saga/effects';      
import { testSaga } from 'redux-saga-test-plan';      
import * as actions from '../actions';      
import { watchGetLaunchData, getLaunchData, root } from '../sagas';      
import SpaceX from '../api/spacex';      

const api = new SpaceX();      

describe('getLaunchData', () => {
  test('resolves', () => {
    const data = call(api.getLaunchData);      
    const result = [{
      flight_number: 1,
      details: 'details',
      launch_date_utc: '2006-03-24T22:30:00.000Z',
      reuse: { item1: false, item2: true },
      links: {
        mission_patch: 'mission_patch',
        article_link: 'article_link',
        redditWeb: 'redditWeb',
        redditLink: 'redditLink'
      },
      rocket: {
        first_stage: {
          cores: [{ land_success: null }]
        }
      }
    }];
  
    testSaga(getLaunchData)
      .next(data)
      .next({ data: result })
      .put({
        type: actions.GET_LAUNCH_DATA_SUCCESS,
        data: result
      })
      .next()
      .isDone();      
  });      
  
  test('it throws an error', () => {
    const data = call(api.getLaunchData);      
  
    testSaga(getLaunchData)
      .next(data)
      .throw(new Error('Internal Server Error'))
      .put({
        type: actions.GET_LAUNCH_DATA_FAILURE,
        err: new Error('Internal Server Error')
      })
      .next()
      .isDone();      
  });      
});      


describe('watchGetLaunchData', () => {
  test('takes latest GET_LAUNCH_DATA_REQUEST', () => {
    const data = takeLatest(
      actions.GET_LAUNCH_DATA_REQUEST,
      getLaunchData
    );      
    testSaga(watchGetLaunchData)
      .next(data)
      .next()
      .isDone();      
  });      
});      
  
describe('root', () => {
  test('forks all watch functions', () => {
    testSaga(root)
      .next()
      .all([
        fork(watchGetLaunchData)
      ])
      .next()
      .isDone();      
  });      
});      