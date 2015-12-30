jest.dontMock('../../actions/visibility-filter');
jest.dontMock('../../reducers/visibility-filter');

const _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
const Filter = require('../../actions/visibility-filter');
const visibilityFilter = _interopRequire(require('../../reducers/visibility-filter'));

describe('visibility filter reducers', () => {

	it('should handle initial state', () => {
		expect(visibilityFilter(undefined, {})).toEqual(Filter.VisibilityFilter.SHOW_ALL_TODOS);
	})

	it('should set handle SET_VISIBILITY_FILTER', () => {

		const prevState = Filter.VisibilityFilter.SHOW_ALL_TODOS;
		const newState =  Filter.VisibilityFilter.SHOW_COMPLETED_TODOS;

		expect(visibilityFilter(prevState, Filter.setVisibilityFilter(Filter.VisibilityFilter.SHOW_COMPLETED_TODOS))).toEqual(newState);
	})
})


