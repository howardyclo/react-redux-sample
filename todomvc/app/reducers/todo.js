/**
 * Specify how todo list's state changes responsed to actions.
 */

import * as Todo from '../actions/todo'

/**
 * Reducer
 * @param  {array}  state - Previous state, if undefined, init with []
 * @param  {object} action 
 * @return {object} state - New state
 */
export default function todo(state = [], action) {

	/**
	 * To keep state from being mutated, we create a new object by Object.assign()
	 * See more ES6 Object.assign()
	 * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
	 * Need to install babel-plugin-object-assign
	 */
		
	switch (action.type) {

	case Todo.Action.ADD_TODO:
		/**
		 * Push a new created todo to old todos array.
		 * Use Array.prototyp.reduce() to create a new id.
		 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce 
		 */
		return [
			...state,
			{
				id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), 0) + 1,
				text: action.payload.text,
				completed: false
			}
		]

	case Todo.Action.EDIT_TODO:
		return state.map(todo => 
			/**
			 * Just simply return the original todo if it's not the toggle target.
			 * If it is, then change its complete state.
			 */
			(todo.id !== action.payload.todoID) ? todo 
				: Object.assign({}, todo, { text: action.payload.text })
		)

	case Todo.Action.TOGGLE_TODO:
		return state.map(todo => 
			(todo.id !== action.payload.todoID) ? todo 
				: Object.assign({}, todo, { completed: !todo.completed })
		)

	case Todo.Action.COMPLETE_ALL_TODOS:
		return state.map(todo => 
			Object.assign({}, todo, { completed: true })
		)

	case Todo.Action.DELETE_TODO:
		return state.filter(todo => 
			(todo.id !== action.payload.todoID)
		)

	case Todo.Action.DELETE_COMPELETED_TODOS:
		return state.filter(todo => 
			(!todo.completed)
		)

	default:
		return state;
	}
}

//testAddTodo();

function testAddTodo() {

	const oldState = [
		{ id: 1, text: 'todo 1', completed: false }
	]

	const newState = todo(oldState, Todo.addTodo('todo 2'));

	console.log('old state: ', oldState);	
	console.log('new state: ', newState);
}

//testEditTodo();

function testEditTodo() {

	const oldState = [
		{ id: 1, text: 'todo 1', completed: false },
		{ id: 2, text: 'todo 2', completed: false },
	]

	const newState = todo(oldState, Todo.editTodo(2, 'todo edited'));

	console.log('old state: ', oldState);	
	console.log('new state: ', newState);
}

//testToggleTodo();

function testToggleTodo() {

	const oldState = [
		{ id: 1, text: 'todo 1', completed: false },
		{ id: 2, text: 'todo 2', completed: false },
	] 

	const newState = todo(oldState, Todo.toggleTodo(2));

	console.log('old state: ', oldState);	
	console.log('new state: ', newState);
}

//testCompleteAllTodos();

function testCompleteAllTodos() {

	const oldState = [
		{ id: 1, text: 'todo 1', completed: false },
		{ id: 2, text: 'todo 2', completed: false },
	] 

	const newState = todo(oldState, Todo.completeAllTodos());

	console.log('old state: ', oldState);	
	console.log('new state: ', newState);
}

//testDeleteTodo();

function testDeleteTodo() {

	const oldState = [
		{ id: 1, text: 'todo 1', completed: false },
		{ id: 2, text: 'todo 2', completed: false },
	]

	const newState = todo(oldState, Todo.deleteTodo(2));

	console.log('old state: ', oldState);	
	console.log('new state: ', newState);
}

//testDeleteCompletedTodos();

function testDeleteCompletedTodos() {

	const oldState = [
		{ id: 1, text: 'todo 1', completed: false },
		{ id: 2, text: 'todo 2', completed: true },
		{ id: 3, text: 'todo 3', completed: false },
		{ id: 4, text: 'todo 4', completed: true }
	]

	const newState = todo(oldState, Todo.deleteCompletedTodos());

	console.log('old state: ', oldState);	
	console.log('new state: ', newState);
}

