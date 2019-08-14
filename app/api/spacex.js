import axios from 'axios';

export default class SpaceX {
  constructor() {
    this.getLaunchData = this.getLaunchData.bind(this);
  }

  async getLaunchData() {
    return axios.get('https://api.spacexdata.com/v2/launches')
      .then(res => res)
      .catch(err => err);
  }
}
