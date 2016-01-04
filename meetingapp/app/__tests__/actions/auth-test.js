jest.dontMock('redux-mock-store');
jest.dontMock('redux-thunk');
jest.dontMock('../../actions/auth');

const configureMockStore = require('redux-mock-store');
const thunk = require('redux-thunk');
const Auth = require('../../actions/auth');

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('auth actions', () => {

	it('creates SIGNUP_REQUEST and SIGNUP_SUCCESS when signup has been done successfully', () => {

		/* If this account has already exists in Parse database, it will get SIGNUP_ERROR */
		const username = 'testing';
		const password = 'testing';

		const expectedActions = [
			{ type: 'SIGNUP_REQUEST', payload: { username, password } },
			{ type: 'SIGNUP_SUCCESS', payload: {  } }
		];

		const store = mockStore({ auth: { user: null } }, expectedActions);
    	store.dispatch(Auth.signup(username, password));
	})
})
