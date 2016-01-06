jest.dontMock('parse');
jest.dontMock('../../modules/parse/config');
jest.dontMock('../../modules/parse/index');
jest.dontMock('../../actions/timetable');
jest.dontMock('../../reducers/timetable');

const _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

const TimetableActions = require('../../actions/timetable');
const timetable = _interopRequire(require('../../reducers/timetable'));

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

describe('timetable reducer', () => {

	it ('should handle initial state', () => {
		expect(timetable(undefined, {})).toEqual(initialState);
	})

	it ('should handle REQUEST_SET_AVAILABLE_TIME', () => {

		const state = initialState;

		expect(timetable(initialState, {
			type: 'REQUEST_SET_AVAILABLE_TIME',
			payload: {}
		})).toEqual(Object.assign({}, state, {
			isSetting: true
		}));
	})

	it ('should handle CANCEL_SET_AVAILABLE_TIME', () => {

		const state = initialState;

		expect(timetable(initialState, {
			type: 'CANCEL_SET_AVAILABLE_TIME',
			payload: {}
		})).toEqual(Object.assign({}, state, {
			isSetting: false,
			timetable: state.prevTimetable
		}));
	})

	it ('should handle SET_AVAILABLE_TIME', () => {

		const state = initialState;
		const newTimetable = JSON.parse(JSON.stringify(state.timetable));
		const row = 1, col = 1;

		newTimetable[row].cells[col].available = !newTimetable[row].cells[col].available;

		expect(timetable(initialState, {
			type: 'SET_AVAILABLE_TIME',
			payload: { row, col }
		})).toEqual(Object.assign({}, state, {
			timetable: newTimetable
		}));
	})

	it ('should handle CREATE_TIMETABLE_REQUEST', () => {

		const state = initialState;

		expect(timetable(state, {
			type: 'CREATE_TIMETABLE_REQUEST',
			payload: {}
		})).toEqual(Object.assign({}, state));
	})

	it ('should handle CREATE_TIMETABLE_SUCCESS', () => {

		const state = initialState;

		const timetableParseObjectMock = {
			data: '{}',
			get: function(property) { return this[`${property}`] }
		}

		expect(timetable(state, {
			type: 'CREATE_TIMETABLE_SUCCESS',
			payload: { timetable: timetableParseObjectMock }
		})).toEqual(Object.assign({}, state, {
			timetableParseObject: timetableParseObjectMock,
			timetable: JSON.parse(timetableParseObjectMock.get('data')),
			prevTimetable: JSON.parse(timetableParseObjectMock.get('data'))
		}));
	})

	it ('should handle CREATE_TIMETABLE_ERROR', () => {

		const state = initialState;

		expect(timetable(state, {
			type: 'CREATE_TIMETABLE_ERROR',
			payload: { error: {} } /* error mock */
		})).toEqual(Object.assign({}, state));
	})

	it ('should handle FETCH_TIMETABLE_REQUEST', () => {

		const state = initialState;

		expect(timetable(state, {
			type: 'FETCH_TIMETABLE_REQUEST',
			payload: {}
		})).toEqual(Object.assign({}, state));
	})

	it ('should handle FETCH_TIMETABLE_SUCCESS', () => {

		const state = initialState;

		const timetableParseObjectMock = {
			data: '{}',
			get: function(property) { return this[`${property}`] }
		}

		expect(timetable(state, {
			type: 'FETCH_TIMETABLE_SUCCESS',
			payload: { timetable: timetableParseObjectMock }
		})).toEqual(Object.assign({}, state, {
			timetableParseObject: timetableParseObjectMock,
			timetable: JSON.parse(timetableParseObjectMock.get('data')),
			prevTimetable: JSON.parse(timetableParseObjectMock.get('data'))
		}));
	})

	it ('should handle FETCH_TIMETABLE_ERROR', () => {

		const state = initialState;

		expect(timetable(state, {
			type: 'FETCH_TIMETABLE_ERROR',
			payload: { error: {} } /* error mock */
		})).toEqual(Object.assign({}, state));
	})

	it ('should handle SAVE_TIMETABLE_REQUEST', () => {

		const state = initialState;

		expect(timetable(state, {
			type: 'SAVE_TIMETABLE_REQUEST',
			payload: {}
		})).toEqual(Object.assign({}, state));
	})

	it ('should handle SAVE_TIMETABLE_SUCCESS', () => {

		const state = initialState;

		const timetableParseObjectMock = {
			data: '{}',
			get: function(property) { return this[`${property}`] }
		}

		expect(timetable(state, {
			type: 'SAVE_TIMETABLE_SUCCESS',
			payload: { timetable: timetableParseObjectMock }
		})).toEqual(Object.assign({}, state, {
			timetableParseObject: timetableParseObjectMock,
			timetable: JSON.parse(timetableParseObjectMock.get('data')),
			prevTimetable: JSON.parse(timetableParseObjectMock.get('data')),
			isSetting: false
		}));
	})

	it ('should handle SAVE_TIMETABLE_ERROR', () => {

		const state = initialState;

		expect(timetable(state, {
			type: 'SAVE_TIMETABLE_ERROR',
			payload: { error: {} } /* error mock */
		})).toEqual(Object.assign({}, state, {
			timetable: state.prevTimetable
		}));
	})

	it ('should handle RESET_TIMETABLE', () => {

		const state = {
			timetableParseObject: {},
			timetable: [],
			prevTimetable: [],
			othersTimetables: []
		};

		expect(timetable(state, {
			type: 'RESET_TIMETABLE',
			payload: {} 
		})).toEqual(Object.assign({}, state, {
			timetableParseObject: null,
			timetable: initTimetable(),
			prevTimetable: initTimetable(),
			othersTimetables: []
		}));
	})

	it ('should handle FETCH_OTHERS_TIMETABLES_REQUEST', () => {

		const state = initialState;

		expect(timetable(state, {
			type: 'FETCH_OTHERS_TIMETABLES_REQUEST',
			payload: {}
		})).toEqual(Object.assign({}, state));
	})

	it ('should handle FETCH_OTHERS_TIMETABLES_SUCCESS', () => {

		const state = initialState;

		const timetableParseObjectMock = {
			user: {
				username: '',
				get: function(property) { return this[`${property}`] }
			},
			data: '{}',
			get: function(property) { return this[`${property}`] }
		}

		const otherTimetablesParseObjectMock = [
			timetableParseObjectMock,
			timetableParseObjectMock,
			timetableParseObjectMock
		]

		expect(timetable(state, {
			type: 'FETCH_OTHERS_TIMETABLES_SUCCESS',
			payload: { timetables: otherTimetablesParseObjectMock }
		})).toEqual(Object.assign({}, state, {
			othersTimetables: otherTimetablesParseObjectMock.map(timetable => {
				return {
					timetableParseObject: timetable,
					userParseObject: timetable.get('user'),
					username: timetable.get('user').get('username'),
					timetable: JSON.parse(timetable.get('data')),
					visibility: false,
				}
			})
		}));
	})

	it ('should handle FETCH_OTHERS_TIMETABLES_ERROR', () => {

		const state = initialState;

		expect(timetable(state, {
			type: 'FETCH_OTHERS_TIMETABLES_ERROR',
			payload: { error: {} } /* error mock */
		})).toEqual(Object.assign({}, state));
	})

	it ('should handle TOGGLE_OTHERS_TIMETABLE', () => {

		/* Simplified timetable. Only focus on its visibility property */
		const timetableMock = {
			visibility: false
		}

		const state = {
			othersTimetables: [timetableMock, timetableMock, timetableMock]
		}

		expect(timetable(state, {
			type: 'TOGGLE_OTHERS_TIMETABLE',
			payload: { index: 1 }
		})).toEqual({
			othersTimetables: [
				{ visibility: false },
				{ visibility: true },
				{ visibility: false }
			]
		})
	})

	it ('should handle RESET_OTHERS_TIMETABLE_VISIBILITY', () => {

		/* Simplified timetable. Only focus on its visibility property */
		const timetableMock = {
			visibility: true
		}

		const state = {
			othersTimetables: [timetableMock, timetableMock, timetableMock]
		}

		expect(timetable(state, {
			type: 'RESET_OTHERS_TIMETABLE_VISIBILITY',
			payload: {}
		})).toEqual({
			othersTimetables: [
				{ visibility: false },
				{ visibility: false },
				{ visibility: false }
			]
		})
	})
})

