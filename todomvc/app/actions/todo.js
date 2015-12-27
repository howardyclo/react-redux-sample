/**
 * Defines actions related to todo list data.
 */

/* Action types */
export const Action = {
	ADD_TODO: 'ADD_TODO', 
	EDIT_TODO: 'EDIT_TODO',
	TOGGLE_TODO: 'TOGGLE_TODO',
	COMPLETE_ALL_TODOS: 'COMPLETE_ALL_TODOS',
	DELETE_TODO: 'DELETE_TODO',
	DELETE_COMPELETED_TODOS: 'DELETE_COMPELETED_TODOS'
}

/**
 * Action Creators
 * Create actions that contains action types and payloads of information that send data to the store.
 * Interface follows the 'Flux Action Standard' (https://github.com/acdlite/flux-standard-action).
 */

export function addTodo(text) {
	return { 
		type: Action.ADD_TODO, 
		payload: { text } 
	}
}

export function editTodo(todoID, text) {
	return { 
		type: Action.EDIT_TODO, 
		payload: { todoID, text }
	}
}

export function toggleTodo(todoID) {
	return { 
		type: Action.TOGGLE_TODO,
		payload: { todoID }
	}
}

export function deleteTodo(todoID) {
	return { 
		type: Action.DELETE_TODO,
		payload: { todoID }
	}
}

export function deleteCompletedTodos() {
	return {
		type: Action.DELETE_COMPELETED_TODOS
	}
}