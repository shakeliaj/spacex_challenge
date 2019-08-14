import { launchData } from '../reducers';
import {
  GET_LAUNCH_DATA_REQUEST,
  GET_LAUNCH_DATA_SUCCESS,
  GET_LAUNCH_DATA_FAILURE,
} from '../actions';
  
//   export function launchData (state = { loading: false }, action) {
//     switch(action.type) {
//     case GET_LAUNCH_DATA_REQUEST:
//       return {
//         loading: true
//       }
//     case GET_LAUNCH_DATA_SUCCESS:
//       return {
//         loading: false,
//         launches: getMappedData(action.data)
//       }
//     case GET_LAUNCH_DATA_FAILURE:
//       return {
//         loading: false,
//         err: action.err
//       }
//     default:
//       return state 
//     }
//   }

describe('launchData', () => {
  test('returns state from GET_LAUNCH_DATA_REQUEST', () => {
    const action = { type: GET_LAUNCH_DATA_REQUEST };
    expect(launchData(undefined, action)).toEqual({
      loading: true
    });
  });

  //   const { 
  //     flight_number,
  //     details,
  //     launch_date_utc,
  //     rocket,
  //     links,
  //     reuse
  //   } = item;
  //   return {
  //     badge: links.mission_patch,
  //     article_link: links.article_link,
  //     with_reddit: getRedditDetails(links),
  //     id: flight_number,
  //     details,
  //     launch_date: moment(launch_date_utc).format('L'),
  //     rocket,
  //     links,
  //     land_success: rocket.first_stage.cores[0].land_success,
  //     reusedItems: getReused(reuse)
  //   }

  test('returns state from GET_LAUNCH_DATA_SUCCESS', () => {
    const action = {
      type: GET_LAUNCH_DATA_SUCCESS,
      data: [
        {
          flight_number: '1',
          details: 'details',
          launch_date_utc: '2006-03-24T22:30:00.000Z',
          rocket: {
            first_stage: {
              cores: [
                {
                  land_success: true
                }
              ]
            }
          },
          links: {
            mission_patch: 'mission_patch',
            article_link: 'article_link',
            reddit: null
          },
          reuse: {
            item1: false
          }
        }
      ]
    };
    expect(launchData(undefined, action)).toEqual({
      loading: false,
      launches: [
        {
          article_link: 'article_link',
          badge: 'mission_patch',
          details: 'details',
          id: '1',
          land_success: true,
          launch_date: '03/24/2006',
          reusedItems: false,
          rocket: {
            first_stage: {
              cores: [
                {
                  land_success: true,
                },
              ],
            },
          },
          with_reddit: false,
        },
      ]
    });
  });

  test('returns state from GET_LAUNCH_DATA_FAILURE', () => {
    const action = {
      type: GET_LAUNCH_DATA_FAILURE,
      err: 'Error'
    };

    expect(launchData(undefined, action)).toEqual({
      loading: false,
      err: 'Error'
    });
  });

  test('returns default state', () => {
    const action = { type: 'NOT_GET_LAUNCH_RELATED' };
    expect(launchData(undefined, action)).toEqual({
      loading: false
    });
  });
});