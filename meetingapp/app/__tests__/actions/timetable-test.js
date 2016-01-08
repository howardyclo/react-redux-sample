jest.dontMock('redux');
jest.dontMock('redux-thunk');
jest.dontMock('../../modules/parse/config');
jest.dontMock('../../modules/parse/index');
jest.dontMock('../../actions/auth');
jest.dontMock('../../actions/timetable');

const applyMiddleware = require('redux').applyMiddleware;
const thunk = require('redux-thunk');
const mockStore = configureMockStore([ thunk ]);

const Auth = require('../../actions/auth');
const Timetable = require('../../actions/timetable');

/**
 * Creates a mock of Redux store with middleware.
 * https://github.com/arnaudbenard/redux-mock-store => this module will cause a bug :
 * 'Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.',
 * since done() might not be called inside the module.
 *
 * This code is copied from this thread and has been revised:
 * http://stackoverflow.com/questions/33011729/how-to-unit-test-async-redux-actions-to-mock-ajax-response
 */

function configureMockStore(middlewares = []) {

	return function mockStore(getState, expectedActions, done) {

		if (!Array.isArray(expectedActions)) {
			throw new Error('expectedActions should be an array of expected actions.');
		}

		if (typeof done !== 'undefined' && typeof done !== 'function') {
			throw new Error('done should either be undefined or function.');
		}

		function mockStoreWithoutMiddleware() {
			return {
				getState() {
					return typeof getState === 'function' ? getState() : getState;
				},

				dispatch(action) {

					const expectedAction = expectedActions.shift();

					/* Customize for auth action test */
					switch(action.type) {

					case 'CREATE_TIMETABLE_REQUEST':
					case 'FETCH_TIMETABLE_REQUEST':
					case 'SAVE_TIMETABLE_REQUEST':
					case 'FETCH_OTHERS_TIMETABLES_REQUEST':
						expect(action).toEqual(expectedAction);
						break;
					case 'CREATE_TIMETABLE_SUCCESS':
					case 'FETCH_TIMETABLE_SUCCESS':
					case 'SAVE_TIMETABLE_SUCCESS':
						expect(action.type).toEqual(expectedAction.type);
						expect(action.payload.timetable).toBeDefined();
						break;
					case 'FETCH_OTHERS_TIMETABLES_SUCCESS':
						expect(action.type).toEqual(expectedAction.type);
						expect(action.payload.timetables).toBeDefined();
						break;
					}

					if (done && !expectedActions.length) {
						done();
					}

					return action;
				}
			}
		}

		const mockStoreWithMiddleware = applyMiddleware(
			...middlewares
		)(mockStoreWithoutMiddleware);

		return mockStoreWithMiddleware();
	}
}

describe('timetable actions', () => {

	it('should create REQUEST_SET_AVAILABLE_TIME when requestSetAvailableTime', () => {
		expect(Timetable.requestSetAvailableTime()).toEqual({
			type: 'REQUEST_SET_AVAILABLE_TIME',
			payload: {}
		})
	})

	it('should create CANCEL_SET_AVAILABLE_TIME when cancelSetAvailableTime', () => {
		expect(Timetable.cancelSetAvailableTime()).toEqual({
			type: 'CANCEL_SET_AVAILABLE_TIME',
			payload: {}
		})
	})

	it('should create SET_AVAILABLE_TIME when setAvailableTime', () => {
		expect(Timetable.setAvailableTime(1,1)).toEqual({
			type: 'SET_AVAILABLE_TIME',
			payload: { row: 1, col: 1 }
		})
	})

	it('should create CREATE_TIMETABLE_REQUEST and CREATE_TIMETABLE_SUCCESS when createTimetable', (done) => {

		const expectedActions = [
			{ type: 'CREATE_TIMETABLE_REQUEST', payload: {} },
			{ type: 'CREATE_TIMETABLE_SUCCESS', payload: { timetable: { /* whatever. Anyway, it needs to be defined */ } } }
		];
		    
		const store = mockStore({
			timetable: {
				timetable: [] /* Mock timetable */
			}
		}, expectedActions, done);

    	store.dispatch(Timetable.createTimetable());
	})

	it('should create FETCH_TIMETABLE_REQUEST and FETCH_TIMETABLE_SUCCESS when fetchTimetable', (done) => {

		const expectedActions = [
			{ type: 'FETCH_TIMETABLE_REQUEST', payload: {} },
			{ type: 'FETCH_TIMETABLE_SUCCESS', payload: { timetable: { /* whatever. Anyway, it needs to be defined */ } } }
		];
		    
		const store = mockStore({
			timetable: {
				timetable: [] /* Mock timetable */
			}
		}, expectedActions, done);

    	store.dispatch(Timetable.fetchTimetable());
	})

	it('should create SAVE_TIMETABLE_REQUEST and SAVE_TIMETABLE_SUCCESS when fetchTimetable', (done) => {

		const expectedActions = [
			{ type: 'SAVE_TIMETABLE_REQUEST', payload: {} },
			{ type: 'SAVE_TIMETABLE_SUCCESS', payload: { timetable: { /* whatever. Anyway, it needs to be defined */ } } }
		];
		    
		const store = mockStore({
			timetable: {
				/* Mock Parse Object */
				timetableParseObject: { 
					/* Mock Functions */
					set: function() {},
					save:  function(attrs, options) {
						var timetable = [];
						options.success(timetable);
					}
				},
				/* Mock timetable */
				timetable: [] 
			}
		}, expectedActions, done);

    	store.dispatch(Timetable.saveTimetable());
	})

	it('should create RESET_TIMETABLE when resetTimetable', () => {
		expect(Timetable.resetTimetable()).toEqual({
			type: 'RESET_TIMETABLE',
			payload: {}
		})
	})

	it('should create FETCH_OTHERS_TIMETABLES_REQUEST and FETCH_OTHERS_TIMETABLES_SUCCESS when fetchOthersTimetables', (done) => {

		const expectedActions = [
			{ type: 'FETCH_OTHERS_TIMETABLES_REQUEST', payload: {} },
			{ type: 'FETCH_OTHERS_TIMETABLES_SUCCESS', payload: { timetables: { /* whatever. Anyway, it needs to be defined */ } } }
		];
		    
		const store = mockStore({
			timetable: {
				timetable: [] /* Mock timetable */
			}
		}, expectedActions, done);

    	store.dispatch(Timetable.fetchOthersTimetables());
	})

	it('should create TOGGLE_OTHERS_TIMETABLE when toggleOthersTimetable', () => {
		expect(Timetable.toggleOthersTimetable(1)).toEqual({
			type: 'TOGGLE_OTHERS_TIMETABLE',
			payload: { index: 1 }
		})
	})

	it('should create RESET_OTHERS_TIMETABLE_VISIBILITY when resetOthersTimetableVisibility', () => {
		expect(Timetable.resetOthersTimetableVisibility()).toEqual({
			type: 'RESET_OTHERS_TIMETABLE_VISIBILITY',
			payload: {}
		})
	})
}) 
















