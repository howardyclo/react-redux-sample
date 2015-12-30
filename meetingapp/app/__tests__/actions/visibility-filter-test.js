jest.dontMock('../../actions/visibility-filter');

const Filter = require('../../actions/visibility-filter');

describe('visibility filter actions', () => {

	it('setVisibilityFilter should create a SET_VISIBILITY_FILTER action', () => {
		expect(Filter.setVisibilityFilter(Filter.VisibilityFilter.SHOW_ALL_TODOS)).toEqual({
			type: Filter.Action.SET_VISIBILITY_FILTER,
			payload: { filter: Filter.VisibilityFilter.SHOW_ALL_TODOS }
		})
	})
})