/**
 * Defines actions related to timetable.
 *
 * This approach is refered from Redux creator - gaearon's comments :
 * https://github.com/rackt/redux/issues/291
 */
import Parse from '../modules/parse/index';

export const REQUEST_SET_AVAILABLE_TIME = 'REQUEST_SET_AVAILABLE_TIME';
export function requestSetAvailableTime() {
	return {
		type: REQUEST_SET_AVAILABLE_TIME,
		payload: {}
	}
}

export const CANCEL_SET_AVAILABLE_TIME = 'CANCEL_SET_AVAILABLE_TIME';
export function cancelSetAvailableTime() {
	return {
		type: CANCEL_SET_AVAILABLE_TIME,
		payload: {}
	}
}

export const SET_AVAILABLE_TIME = 'SET_AVAILABLE_TIME';
export function setAvailableTime(row, col) {
	return {
		type: SET_AVAILABLE_TIME,
		payload: { row, col }
	}
}
