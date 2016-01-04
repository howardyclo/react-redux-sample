/**
 * Defines actions related to timetable.
 *
 * This approach is refered from Redux creator - gaearon's comments :
 * https://github.com/rackt/redux/issues/291
 */

import * as Timetable from '../actions/timetable';

const initialState = {
	timetable: initTimetable(),
	settable: false,
	isSetting: false
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
			cells.push({ available: false });
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
			settable: true,
			isSetting: true
		});

	case Timetable.CANCEL_SET_AVAILABLE_TIME:
		return Object.assign({}, state, {
			settable: false,
			isSetting: false
		});

	case Timetable.SET_AVAILABLE_TIME:

		let timetable = Object.assign([], state.timetable);

		const row = action.payload.row,
			  col = action.payload.col;

		timetable[row].cells[col].available = !timetable[row].cells[col].available;

		return Object.assign({}, state, {
			timetable: timetable
		})

	default:
		return state;
	}
}







































