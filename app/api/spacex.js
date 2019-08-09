import * as axios from 'axios';

axios.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    return Promise.reject(err);
  }
);

export default class SpaceX {
  constructor() {
    this.getLaunchData = this.getLaunchData.bind(this);
  }

  async getLaunchData() {
    return axios.get('https://api.spacexdata.com/v2/launches');
  }
}
