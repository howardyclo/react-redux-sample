/**
 * Specify how visibility filter state changes responsed to actions.
 */

import * as Filter from '../actions/visibility-filter'

/**
 * Reducer
 * @param  {array}  state - Previous state, if undefined, init with 'SHOW_ALL_TODOS'
 * @param  {object} action 
 * @return {object} state - New state
 */
export default function visibilityFilter(state = Filter.VisibilityFilter.SHOW_ALL_TODOS, action) {

	switch (action.type) {

	case Filter.Action.SET_VISIBILITY_FILTER:
		return action.payload.filter;

	default: 
		return state;
	}
}