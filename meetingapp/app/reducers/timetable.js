/**
 * Defines actions related to timetable.
 *
 * This approach is refered from Redux creator - gaearon's comments :
 * https://github.com/rackt/redux/issues/291
 */

import * as Timetable from '../actions/timetable';

const initialState = {
	timetableParseObject: null,
	timetable: initTimetable(),		// your timetable
	prevTimetable: initTimetable(), // for undo(cancel) action
	isSetting: false,
	othersTimetables: []			// others' timetable (at meeting page)
}

/* See component Timetable.propTypes */
function initTimetable() {

	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday', 'Sunday'],
		  start = 10, 
		  end = 18,
		  diff = 1;

	let timetable = [];

	for (let i = start ; i < end ; i += diff) {

		let cells = [];

		for (let day in days) {
			cells.push({
				available: false
			});
		}

		timetable.push({
			start: i,
			end: i + diff,
			cells: cells
		});
	}

	return timetable;
}

export default function timetable(state = initialState, action) {

	switch(action.type) {

	case Timetable.REQUEST_SET_AVAILABLE_TIME:
		return Object.assign({}, state, {
			isSetting: true
		});

	case Timetable.CANCEL_SET_AVAILABLE_TIME:
		return Object.assign({}, state, {
			isSetting: false,
			timetable: state.prevTimetable
		});

	case Timetable.SET_AVAILABLE_TIME:

		/**
		 * let timetable = state.timetable.slice();
		 * NOT WORK in nested array ! It will still contain references to the nested array.
		 * http://blog.andrewray.me/how-to-clone-a-nested-array-in-javascript/
		 */
		
		var timetable = JSON.parse(JSON.stringify(state.timetable));

		const row = action.payload.row,
			  col = action.payload.col;

		timetable[row].cells[col].available = !timetable[row].cells[col].available;

		return Object.assign({}, state, { timetable });

	case Timetable.CREATE_TIMETABLE_REQUEST:
		console.log('creating timetable ...');
		return Object.assign({}, state);

	case Timetable.CREATE_TIMETABLE_SUCCESS:
		console.log('create timetable success', action.payload.timetable);
		return Object.assign({}, state, {
			timetableParseObject: action.payload.timetable,
			timetable: JSON.parse(action.payload.timetable.get('data')),
			prevTimetable: JSON.parse(action.payload.timetable.get('data'))
		});

	case Timetable.CREATE_TIMETABLE_ERROR:
		console.log('create timetable error', action.payload.error);
		return Object.assign({}, state);

	case Timetable.FETCH_TIMETABLE_REQUEST:
		console.log('fetching timetable ...');
		return Object.assign({}, state);

	case Timetable.FETCH_TIMETABLE_SUCCESS:
		console.log('fetch timetable success', action.payload.timetable);
		return Object.assign({}, state, {
			timetableParseObject: action.payload.timetable,
			timetable: JSON.parse(action.payload.timetable.get('data')),
			prevTimetable: JSON.parse(action.payload.timetable.get('data'))
		});

	case Timetable.FETCH_TIMETABLE_ERROR:
		console.log('fetch timetable error', action.payload.error);
		return Object.assign({}, state);

	case Timetable.SAVE_TIMETABLE_REQUEST:
		console.log('saving timetable ...');
		return Object.assign({}, state);

	case Timetable.SAVE_TIMETABLE_SUCCESS:
		console.log('save timetable success', action.payload.timetable);
		return Object.assign({}, state, {
			timetableParseObject: action.payload.timetable,
			timetable: JSON.parse(action.payload.timetable.get('data')),
			prevTimetable: JSON.parse(action.payload.timetable.get('data')),
			isSetting: false
		});

	case Timetable.SAVE_TIMETABLE_ERROR:
		console.log('save timetable error', action.payload.error);
		return Object.assign({}, state, {
			timetable: state.prevTimetable
		});

	case Timetable.RESET_TIMETABLE:
		console.log('reset timetable');
		return Object.assign({}, state, {
			timetableParseObject: null,
			timetable: initTimetable(),
			prevTimetable: initTimetable(),
			othersTimetables: []
		});

	case Timetable.FETCH_OTHERS_TIMETABLES_REQUEST:
		console.log('fetching others timetables ...');
		return Object.assign({}, state);

	case Timetable.FETCH_OTHERS_TIMETABLES_SUCCESS:
		console.log('fetch others timetables success', action.payload.timetables);
		return Object.assign({}, state, {
			othersTimetables: action.payload.timetables.map(timetable => {
				return {
					timetableParseObject: timetable,
					userParseObject: timetable.get('user'),
					username: timetable.get('user').get('username'),
					timetable: JSON.parse(timetable.get('data')),
					visibility: false,
				}
			})
		});

	case Timetable.FETCH_OTHERS_TIMETABLES_ERROR:
		console.log('fetch others timetable error', action.payload.error);
		return Object.assign({}, state);

	case Timetable.TOGGLE_OTHERS_TIMETABLE:

		var othersTimetables = JSON.parse(JSON.stringify(state.othersTimetables));
		othersTimetables[action.payload.index].visibility = !othersTimetables[action.payload.index].visibility;

		return Object.assign({}, state, { othersTimetables });

	case Timetable.RESET_OTHERS_TIMETABLE_VISIBILITY:

		var othersTimetables = JSON.parse(JSON.stringify(state.othersTimetables));	
		othersTimetables.map(othersTimetable => othersTimetable.visibility = false);

		return Object.assign({}, state, { othersTimetables });

	default:
		return Object.assign({}, state);
	}
}







































