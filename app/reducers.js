import { combineReducers } from 'redux'

import {
    GET_LAUNCH_DATA_REQUEST,
	GET_LAUNCH_DATA_SUCCESS,
    GET_LAUNCH_DATA_FAILURE,
} from './actions'

import { getMappedData } from './services/utils'


export function launchData (state = { loading: false }, action) {
	switch(action.type) {
	case GET_LAUNCH_DATA_REQUEST:
		return {
			loading: true
		}
	case GET_LAUNCH_DATA_SUCCESS:
		return {
			loading: false,
			data: getMappedData(action.data)
		}
	case GET_LAUNCH_DATA_FAILURE:
		return {
			loading: false,
			err: action.err
		}
	default:
		return state 
	}
}

const rootReducer = combineReducers({
	launchData
})

export default rootReducer