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

export const CREATE_TIMETABLE_REQUEST = 'CREATE_TIMETABLE_REQUEST';
export function createTimetableRequest() {
	return {
		type: CREATE_TIMETABLE_REQUEST,
		payload: {}
	}
}

export const CREATE_TIMETABLE_SUCCESS = 'CREATE_TIMETABLE_SUCCESS';
export function createTimetableSuccess(timetable) {
	return {
		type: CREATE_TIMETABLE_SUCCESS,
		payload: { timetable }
	}
}

export const CREATE_TIMETABLE_ERROR = 'CREATE_TIMETABLE_ERROR';
export function createTimetableError(error) {
	return {
		type: CREATE_TIMETABLE_ERROR,
		payload: { error }
	}
}

export function createTimetable() {

	const Timetable = new Parse.Object.extend('Timetable');

	let timetable = new Timetable();
	timetable.set('user', Parse.User.current());
	
	return (dispatch, getState) => {

		const state = getState();
		const timetableData = state.timetable.timetable; // Get inital timetable data we defined in timetable reducer.
		timetable.set('data', JSON.stringify(timetableData)); // Serialize timetable data to string, then store it to Parse database.

		dispatch(createTimetableRequest());

		return timetable.save(null, {
			success: function(timetable) {
				dispatch(createTimetableSuccess(timetable));
			},
			error: function(timetable, error) {
				dispatch(createTimetableError(error));
			}		
		})
	}
}

export const FETCH_TIMETABLE_REQUEST = 'FETCH_TIMETABLE_REQUEST';
export function fetchTimetableRequest() {
	return {
		type: FETCH_TIMETABLE_REQUEST,
		payload: {}
	}
}

export const FETCH_TIMETABLE_SUCCESS = 'FETCH_TIMETABLE_SUCCESS';
export function fetchTimetableSuccess(timetable) {
	return {
		type: FETCH_TIMETABLE_SUCCESS,
		payload: { timetable }
	}
}

export const FETCH_TIMETABLE_ERROR = 'FETCH_TIMETABLE_ERROR';
export function fetchTimetableError(error) {
	return {
		type: FETCH_TIMETABLE_ERROR,
		payload: { error }
	}
}

export function fetchTimetable() {

	const Timetable = new Parse.Object.extend('Timetable');

	let query = new Parse.Query(Timetable);
	query.equalTo('user', Parse.User.current());

	return (dispatch, getState) => {

		dispatch(fetchTimetableRequest());

		return query.first({
			success: function(timetable) {
				dispatch(fetchTimetableSuccess(timetable));
			},
			error: function(error) {
				dispatch(fetchTimetableError(error));
			}
		})
	}
}

export const SAVE_TIMETABLE_REQUEST = 'SAVE_TIMETABLE_REQUEST';
export function saveTimetableRequest() {
	return {
		type: SAVE_TIMETABLE_REQUEST,
		payload: {}
	}
}

export const SAVE_TIMETABLE_SUCCESS = 'SAVE_TIMETABLE_SUCCESS';
export function saveTimetableSuccess(timetable) {
	return {
		type: SAVE_TIMETABLE_SUCCESS,
		payload: { timetable }
	}
}

export const SAVE_TIMETABLE_ERROR = 'SAVE_TIMETABLE_ERROR';
export function saveTimetableError(error) {
	return {
		type: SAVE_TIMETABLE_ERROR,
		payload: { error }
	}
}

export function saveTimetable() {

	return (dispatch, getState) => {

		const state = getState();
		const timetableParseObject = state.timetable.timetableParseObject;
		const timetableData = state.timetable.timetable;

		timetableParseObject.set('data', JSON.stringify(timetableData));

		dispatch(saveTimetableRequest());

		return timetableParseObject.save(null, {
			success: function(timetable) {
				dispatch(saveTimetableSuccess(timetable));
			},
			error: function(timetable, error) {
				dispatch(saveTimetableError(error))
			}
		})
	}
}

export const RESET_TIMETABLE = 'RESET_TIMETABLE';
export function resetTimetable() {
	return {
		type: RESET_TIMETABLE,
		payload: {}
	}
}

export const FETCH_OTHERS_TIMETABLES_REQUEST = 'FETCH_OTHERS_TIMETABLES_REQUEST';
export function fetchOthersTimetablesRequest() {
	return {
		type: FETCH_OTHERS_TIMETABLES_REQUEST,
		payload: {}
	}
}

export const FETCH_OTHERS_TIMETABLES_SUCCESS = 'FETCH_OTHERS_TIMETABLES_SUCCESS';
export function fetchOthersTimetablesSuccess(timetables) {
	return {
		type: FETCH_OTHERS_TIMETABLES_SUCCESS,
		payload: { timetables }
	}
}

export const FETCH_OTHERS_TIMETABLES_ERROR = 'FETCH_OTHERS_TIMETABLES_ERROR';
export function fetchOthersTimetablesError(error) {
	return {
		type: FETCH_OTHERS_TIMETABLES_ERROR,
		payload: { error }
	}
}

export function fetchOthersTimetables() {
	
	const Timetable = new Parse.Object.extend('Timetable');

	let query = new Parse.Query(Timetable);
	query.notEqualTo('user', Parse.User.current());
	query.include('user');

	return (dispatch, getState) => {

		dispatch(fetchOthersTimetablesRequest());

		return query.find({
			success: function(timetables) {
				dispatch(fetchOthersTimetablesSuccess(timetables));
			},
			error: function(error) {
				dispatch(fetchOthersTimetablesError(error));
			}
		})
	}
}

export const TOGGLE_OTHERS_TIMETABLE = 'TOGGLE_OTHERS_TIMETABLE';
export function toggleOthersTimetable(index) {
	return {
		type: TOGGLE_OTHERS_TIMETABLE,
		payload: { index }
	}
}

export const RESET_OTHERS_TIMETABLE_VISIBILITY = 'RESET_OTHERS_TIMETABLE_VISIBILITY';
export function resetOthersTimetableVisibility() {
	return {
		type: RESET_OTHERS_TIMETABLE_VISIBILITY,
		payload: {}
	}
}
