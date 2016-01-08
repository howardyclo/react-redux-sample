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

/* Every test will generate different account */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const username = 'Tester-' + getRandomInt(1000, 9999);
const password = username;

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

					case 'SIGNUP_REQUEST':
					case 'LOGIN_REQUEST':
						expect(action).toEqual(expectedAction);
						break;
					case 'SIGNUP_SUCCESS':
					case 'LOGIN_SUCCESS':
						expect(action.type).toEqual(expectedAction.type);
						expect(action.payload.user).toBeDefined();
						break;
					case 'SIGNUP_ERROR':
					case 'LOGIN_ERROR':
						expect(action.type).toEqual(expectedAction.type);
						expect(action.payload.error).toBeDefined();
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

describe('auth actions', () => {

	/**
	 	
		If we need a time longer than jasmine default timeout,
		we need to redefined jasmine's original timeout. 

		var originalTimeout;

		beforeEach(() => {
			originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
			jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
		})

		afterEach(() => {
	    	jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	    })
	*/

	/**
	 * Haveing 'done' argument in it() will trigger async behavior
	 * http://jasmine.github.io/2.0/introduction.html#section-Asynchronous_Support */

	it('should creates SIGNUP_REQUEST and SIGNUP_SUCCESS when signup has been done successfully', (done) => {

		/* If this account has already exists in Parse database, it will get SIGNUP_ERROR */

		const expectedActions = [
			{ type: 'SIGNUP_REQUEST', payload: { username, password } },
			{ type: 'SIGNUP_SUCCESS', payload: { user: { /* whatever. Anyway, it needs to be defined */ } } },
		];
		    
		const store = mockStore({}, expectedActions, done);

    	store.dispatch(Auth.signup(username, password));
	})

	it('should creates SIGNUP_REQUEST and SIGNUP_ERROR when signup with an existed account', (done) => {

		/* This account has already exists in Parse database after the previous signup test
		, it will get SIGNUP_ERROR */

		const expectedActions = [
			{ type: 'SIGNUP_REQUEST', payload: { username, password } },
			{ type: 'SIGNUP_ERROR', payload: { error: { /* whatever. Anyway, it needs to be defined */ } } }
		];

		const store = mockStore({}, expectedActions, done);

		store.dispatch(Auth.signup(username, password));
	})

	it('should creates LOGIN_REQUEST and LOGIN_SUCCESS when login with an existed account', (done) => {

		const expectedActions = [
			{ type: 'LOGIN_REQUEST', payload: { username, password } },
			{ type: 'LOGIN_SUCCESS', payload: { user: { /* whatever. Anyway, it needs to be defined */ } } }
		];

		const store = mockStore({}, expectedActions, done);

		store.dispatch(Auth.login(username, password));
	})

	it('should creates LOGIN_REQUEST and LOGIN_ERROR when login with an inexisted account', (done) => {

		const inexistedUsername = 'inexisted';
		const inexistedPassword = 'inexisted';

		const expectedActions = [
			{ type: 'LOGIN_REQUEST', payload: { username: inexistedUsername, password: inexistedPassword } },
			{ type: 'LOGIN_ERROR', payload: { error: { /* whatever. Anyway, it needs to be defined */ } } }
		];

		const store = mockStore({}, expectedActions, done);

		store.dispatch(Auth.login(inexistedUsername, inexistedPassword));
	})

	it('should creates LOGOUT when logout', () => {

		expect(Auth.logout()).toEqual({
			type: 'LOGOUT',
			payload: {}
		});
	})
})

/**
 * Further more information:
 * http://stackoverflow.com/questions/16558844/testing-an-ajax-api-that-uses-session-authentication-with-jasmine
 */






















