/**
 * Main reducer
 * Calls the reducers managing parts of the state, and combines them into a single state object. 
 */

import { combineReducers } from 'redux'
import todo from './todo'
import visibilityFilter from './visibility-filter'

var rootReducer = combineReducers({
  todos: todo,
  visibilityFilter
})

export default rootReducer

/**
 * 	The above code is completely equivalent to :
 
  	export default function app (state = {}, action) {
		return {
			todos: todo(state.todos, action),
			visibilityFilter: visibilityFilter(state.filter, action)
		}
	}
 */
	