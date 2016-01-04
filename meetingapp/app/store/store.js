/**
 * The Store is the object that brings actions and reducers together. 
 * 
 * The store has the following responsibilities:
 * - Holds application state;
 * - Allows access to state via getState();
 * - Allows state to be updated via dispatch(action);
 * - Registers listeners via subscribe(listener).
 *
 * It’s important to note that you’ll only have a single store in a Redux application. 
 * When you want to split your data handling logic, you’ll use reducer composition instead of many stores.
 */

/*
	Using {} syntax : import the module's specified named exports ;
	if no {} syntax : import the module's defualt exports
	More information about import syntax from stackoverflow : 
	http://stackoverflow.com/questions/31096597/using-brackets-with-javascript-import-syntax
 */ 
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/';

const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware
)(createStore);

const store = createStoreWithMiddleware(rootReducer /*, initial state from client or server */);

export default store;

