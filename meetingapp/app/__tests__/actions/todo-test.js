jest.dontMock('../../actions/todo');

const Todo = require('../../actions/todo');

describe('todo actions', () => {

	it('addTodo should create a ADD_TODO action', () => {
		expect(Todo.addTodo('This is a new todo')).toEqual({
			type: Todo.Action.ADD_TODO,
			payload: { text: 'This is a new todo' }
		})
	})

	it('editTodo should creat a EDIT_TODO action', () => {
		expect(Todo.editTodo(1, 'This is a edited todo')).toEqual({
			type: Todo.Action.EDIT_TODO,
			payload: { todoID: 1, text: 'This is a edited todo' }
		})
	})

	it('toggleTodo should creat a TOGGLE_TODO action', () => {
		expect(Todo.toggleTodo(1)).toEqual({
			type: Todo.Action.TOGGLE_TODO,
			payload: { todoID: 1 }
		})
	})

	it('deleteTodo should creat a DELETE_TODO action', () => {
		expect(Todo.deleteTodo(1)).toEqual({
			type: Todo.Action.DELETE_TODO,
			payload: { todoID: 1 }
		})
	})

	it('deleteCompletedTodos should creat a DELETE_COMPELETED_TODOS action', () => {
		expect(Todo.deleteCompletedTodos()).toEqual({
			type: Todo.Action.DELETE_COMPELETED_TODOS
		})
	})
})
