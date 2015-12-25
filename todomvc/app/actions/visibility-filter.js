/**
 * Defines actions related to todo list visibility.
 */

/* Action types */
export const Action = {
	SET_VISIBILITY_FILTER: 'SET_VISIBILITY_FILTER',
}

/* Constants */
export const VisibilityFilter = {
	SHOW_ALL_TODOS: 'SHOW_ALL_TODOS',
	SHOW_COMPLETED_TODOS: 'SHOW_COMPLETED_TODOS',
	SHOW_UNCOMPLETED_TODOS: 'SHOW_UNCOMPLETED_TODOS'
}

/**
 * Action Creators :
 * Create actions that contains action types and payloads of information that send data to the store.
 * Interface follows the 'Flux Action Standard' (https://github.com/acdlite/flux-standard-action).
 */

export function setVisibilityFilter(filter) {
	return {
		type: Action.SET_VISIBILITY_FILTER,
		payload: { filter }
	}
}