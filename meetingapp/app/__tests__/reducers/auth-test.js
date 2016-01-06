jest.dontMock('parse');
jest.dontMock('../../modules/parse/config');
jest.dontMock('../../modules/parse/index');
jest.dontMock('../../actions/auth');
jest.dontMock('../../reducers/auth');

const _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

const AuthActions = require('../../actions/auth');
const auth = _interopRequire(require('../../reducers/auth'));

describe('auth reducer', () => {

	it ('should handle initial state', () => {

		expect(auth(undefined, {})).toEqual({
			user: null,
			errorMessage: ''
		});
	})

	it ('should handle SIGNUP_REQUEST', () => {

		const username = 'test';
		const password = 'test';

		expect(auth(undefined, {
			type: 'SIGNUP_REQUEST',
			payload: { username, password }
		})).toEqual({
			user: null,
			errorMessage: ''
		});
	})

	it ('should handle SIGNUP_SUCCESS', () => {

		expect(auth({
			user: null,
			errorMessage: ''
		}, {
			type: 'SIGNUP_SUCCESS',
			payload: { user: {} } /* user object mock */ 
		})).toEqual({
			user: {}, /* user object mock */ 
			errorMessage: ''
		})
	})

	it ('should handle SIGNUP_ERROR', () => {

		expect(auth({
			user: null,
			errorMessage: ''
		}, {
			type: 'SIGNUP_ERROR',
			payload: { error: { message: 'Sign up error'} } /* error object mock */
		})).toEqual({
			user: null,
			errorMessage: 'Sign up error'
		})
	})

	it ('should handle LOGIN_REQUEST', () => {

		const username = 'test';
		const password = 'test';

		expect(auth(undefined, {
			type: 'LOGIN_REQUEST',
			payload: { username, password }
		})).toEqual({
			user: null,
			errorMessage: ''
		});
	})

	it ('should handle LOGIN_SUCCESS', () => {

		expect(auth({
			user: null,
			errorMessage: ''
		}, {
			type: 'LOGIN_SUCCESS',
			payload: { user: {} } /* user object mock */ 
		})).toEqual({
			user: {}, /* user object mock */ 
			errorMessage: ''
		});
	})

	it ('should handle LOGIN_ERROR', () => {

		expect(auth({
			user: null,
			errorMessage: ''
		}, {
			type: 'LOGIN_ERROR',
			payload: { error: { message: 'Log in error'} } /* error object mock */
		})).toEqual({
			user: null,
			errorMessage: 'Log in error'
		});
	})

	it ('should handle LOGOUT', () => {

		expect(auth({
			user: {}, /* user object mock */
			errorMessage: ''
		}, {
			type: 'LOGOUT',
			payload: {}
		})).toEqual({
			user: null,
			errorMessage: ''
		});
	})
})
