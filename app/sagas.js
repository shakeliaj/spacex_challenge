import { all, fork, takeLatest, put, call } from 'redux-saga/effects'
import * as actions from './actions'

import SpaceX from './api/spacex';

const api = new SpaceX();

export function* getLaunchData() {
  try {
    const { data } = yield call(api.getLaunchData)
    yield put({ type: actions.GET_LAUNCH_DATA_SUCCESS, data })
  } catch (err) {
    yield put({ type: actions.GET_LAUNCH_DATA_FAILURE, err })
  }
}

export function* watchGetLaunchData() {
  yield takeLatest(actions.GET_LAUNCH_DATA_REQUEST, getLaunchData)
}

export function* root() {
  yield all([
    fork(watchGetLaunchData)
  ])
}