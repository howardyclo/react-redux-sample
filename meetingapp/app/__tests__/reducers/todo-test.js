jest.dontMock('../../actions/todo');
jest.dontMock('../../reducers/todo');

const _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
const TodoAction = require('../../actions/todo');
const todo = _interopRequire(require('../../reducers/todo'));

describe('todo reducers', () => {

	it('should handle initial state', () => {

		expect(todo(undefined, {})).toEqual([]);
	})

	it('should handle ADD_TODO', () => {

		const prevState = [
			{ id: 1, text: 'todo 1', completed: false }
		]

		const newState = [
			{ id: 1, text: 'todo 1', completed: false },
			{ id: 2, text: 'todo 2', completed: false }
		]

		expect(todo(prevState, TodoAction.addTodo('todo 2'))).toEqual(newState);
	})

	it('should handle EDIT_TODO', () => {

		const prevState = [
			{ id: 1, text: 'todo 1', completed: false },
			{ id: 2, text: 'todo 2', completed: false }
		]

		const newState = [
			{ id: 1, text: 'todo 1', completed: false },
			{ id: 2, text: 'todo edited', completed: false }
		]

		expect(todo(prevState, TodoAction.editTodo(2, 'todo edited'))).toEqual(newState);
	})

	it('should handle TOGGLE_TODO', () => {

		const prevState = [
			{ id: 1, text: 'todo 1', completed: false },
			{ id: 2, text: 'todo 2', completed: false }
		]

		const newState = [
			{ id: 1, text: 'todo 1', completed: false },
			{ id: 2, text: 'todo 2', completed: true }
		]

		expect(todo(prevState, TodoAction.toggleTodo(2))).toEqual(newState);
	})

	it('should handle DELETE_TODO', () => {

		const prevState = [
			{ id: 1, text: 'todo 1', completed: false },
			{ id: 2, text: 'todo 2', completed: false }
		]

		const newState = [
			{ id: 1, text: 'todo 1', completed: false }
		]

		expect(todo(prevState, TodoAction.deleteTodo(2))).toEqual(newState);
	})

	it('should handle DELETE_COMPELETED_TODOS', () => {

		const prevState = [
			{ id: 1, text: 'todo 1', completed: false },
			{ id: 2, text: 'todo 2', completed: true },
			{ id: 3, text: 'todo 3', completed: false },
			{ id: 4, text: 'todo 4', completed: true }
		]

		const newState = [
			{ id: 1, text: 'todo 1', completed: false },
			{ id: 3, text: 'todo 3', completed: false }
		]

		expect(todo(prevState, TodoAction.deleteCompletedTodos())).toEqual(newState);
	})
})


