import SpaceX from '../spacex';

import mockAxios from 'jest-mock-axios';

const api = new SpaceX();

beforeEach(() => {
  mockAxios.reset();
});

afterEach(() => {
  jest.resetModules();
  jest.resetAllMocks();
});

describe('getLaunchData', () => {
  test('resolves', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve([{flight_number: 1}])
    );

    const data = await api.getLaunchData();

    expect(data).toEqual([{flight_number: 1}]);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      "https://api.spacexdata.com/v2/launches"
    );
  });

  test('returns error', async () => {
    mockAxios.get.mockImplementationOnce(() => 
      Promise.reject('Network Error')
    );

    const data = await api.getLaunchData();

    expect(data).toEqual('Network Error');
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      "https://api.spacexdata.com/v2/launches"
    );  
  });
});