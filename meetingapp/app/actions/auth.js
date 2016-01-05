/**
 * Defines actions related to user authentication.
 *
 * This approach is refered from Redux creator - gaearon's comments :
 * https://github.com/rackt/redux/issues/291
 */

import Parse from '../modules/parse/index';
import * as TimetableActions from '../actions/timetable';
import { pushPath } from 'redux-simple-router';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export function signupRequest(username, password) {
	return {
		type: SIGNUP_REQUEST,
		payload: { username, password }
	}
}

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export function signupSuccess(user) {
	return {
		type: SIGNUP_SUCCESS,
		payload: { user }
	}
}

export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export function signupError(error) {
	return {
		type: SIGNUP_ERROR,
		payload: { error }
	}
}

/* Here is where we should put our network request. */
export function signup(username, password, redirect = '/') {

	let user = new Parse.User();

	user.set('username', username);
	user.set('password', password);

	/**
	 * Here is a thunk, which is a function that returns a function. 
	 * Return a function that accepts 'dispatch' so we can dispatch in the future moment
	 * when we get response from promise.
	 */
	return (dispatch, getState) => {

		/* Update the application state to inform user the network request is about to start. */
		dispatch(signupRequest(username, password));

		return user.signUp(null, {
			success: function(user) {
				dispatch(signupSuccess(user));
				dispatch(TimetableActions.createTimetable());
				dispatch(pushPath(redirect, 'signup'));
			},
			error: function(user, error) {
				dispatch(signupError(error));
			}
		})
	}
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export function loginRequest(username, password) {
	return {
		type: LOGIN_REQUEST,
		payload: { username, password }
	}
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export function loginSuccess(user) {
	return {
		type: LOGIN_SUCCESS,
		payload: { user }
	}
}

export const LOGIN_ERROR = 'LOGIN_ERROR';
export function loginError(error) {
	return {
		type: LOGIN_ERROR,
		payload: { error }
	}
}

export function login(username, password, redirect = '/') {
	
	/**
	 * Here is a thunk, which is a function that returns a function. 
	 * Return a function that accepts 'dispatch' so we can dispatch in the future moment
	 * when we get response from promise.
	 */
	return (dispatch, getState) => {

		/* Update the application state to inform user the network request is about to start. */
		dispatch(loginRequest(username, password));

		return Parse.User.logIn(username, password, {
			success: function(user) {
				dispatch(loginSuccess(user));
				dispatch(pushPath(redirect));
			},
			error: function(user, error) {
				dispatch(loginError(error));
			}
		})
	}
}

export const LOGOUT = 'LOGOUT';
export function logout() {
	return {
		type: LOGOUT,
		payload: {}
	}
}

export function logoutAndRedirect() {
	return (dispatch, getState) => {

		dispatch(logout());
		dispatch(pushPath('/'));
	}
}