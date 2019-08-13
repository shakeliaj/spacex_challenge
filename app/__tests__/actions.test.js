import { 
  GET_LAUNCH_DATA_REQUEST, 
  getLaunchData } from '../actions';

describe('getLaunchData', () => {
  test('returns GET_LAUNCH_DATA_REQUEST', () => {
    expect(getLaunchData()).toEqual({
      type: GET_LAUNCH_DATA_REQUEST
    });
  });
});