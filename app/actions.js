export const GET_LAUNCH_DATA_REQUEST = 'GET_LAUNCH_DATA_REQUEST';
export const GET_LAUNCH_DATA_SUCCESS = 'GET_LAUNCH_DATA_SUCCESS';
export const GET_LAUNCH_DATA_FAILURE = 'GET_LAUNCH_DATA_FAILURE';

export function getLaunchData() {
    return { type: GET_LAUNCH_DATA_REQUEST }
}