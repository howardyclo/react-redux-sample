import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as TodoActions from '../actions/todo';
import * as VisibilityFilterActions from '../actions/visibility-filter';
import TodoInputText from '../components/TodoInputText/TodoInputText';
import TodoList from '../components/TodoList/TodoList';
import Footer from '../components/Footer/Footer';
import styles from './App.css';

class App extends Component {

	constructor(props) {
		super(props)
	}

	handleEdit = (todoID, text) => {
		console.log(todoID, text);
	}

	render() {

		/* Injected by connect() call */
    	const { dispatch, activeCount, todos, visibilityFilter } = this.props

		return (
			<div>
				<div className={styles.title}>
					Todos
				</div>
				<div className={styles.container}>
					<TodoInputText onSave={text => dispatch(TodoActions.addTodo(text))} />
					<TodoList 
						todos={todos}
						onToggle={todoID => dispatch(TodoActions.toggleTodo(todoID))}
						onEdit={(todoID, text) => dispatch(TodoActions.editTodo(todoID, text))}
						onDelete={todoID => dispatch(TodoActions.deleteTodo(todoID))} />
					<Footer 
						activeCount={activeCount}
						onShowAll={() => dispatch(VisibilityFilterActions.setVisibilityFilter(VisibilityFilterActions.VisibilityFilter.SHOW_ALL_TODOS))}
						onShowCompleted={() => dispatch(VisibilityFilterActions.setVisibilityFilter(VisibilityFilterActions.VisibilityFilter.SHOW_COMPLETED_TODOS))}
						onShowUnCompleted={() => dispatch(VisibilityFilterActions.setVisibilityFilter(VisibilityFilterActions.VisibilityFilter.SHOW_UNCOMPLETED_TODOS))}
						onClearCompleted={() => dispatch(TodoActions.deleteCompletedTodos())}/>
				</div>
			</div>
		);
	}
}

function filterTodos(todos, filter) {

  	switch (filter) {

	case VisibilityFilterActions.VisibilityFilter.SHOW_ALL_TODOS:
		return todos;

	case VisibilityFilterActions.VisibilityFilter.SHOW_COMPLETED_TODOS:
		return todos.filter(todo => todo.completed);

	case VisibilityFilterActions.VisibilityFilter.SHOW_UNCOMPLETED_TODOS:
		return todos.filter(todo => !todo.completed);

	default:
		return todos;
  	}
}

/**
 * Which props do we want to inject, given the global state we defined in root reducer 
 * (or state combined in store) ?
 * It will be invoked when dispatch() is called.
 * Note: use https://github.com/faassen/reselect for better performance.
 */
function select(state) {

	console.log(state);

	return {
		activeCount: state.todos.reduce((count, todo) => !todo.completed ? count + 1 : count, 0),
		todos: filterTodos(state.todos, state.visibilityFilter),
		visibilityFilter: state.visibilityFilter
	}
}

/* Wrap the component to inject dispatch and state into it */
export default connect(select)(App)
