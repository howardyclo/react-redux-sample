import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as TodoActions from '../../actions/todo';
import * as VisibilityFilterActions from '../../actions/visibility-filter';
import Timetable from '../../components/Timetable/Timetable';
import classnames from 'classnames';
import styles from './App.css';

class App extends Component {

	constructor(props) {
		super(props);
	}

	render() {

		/* Injected by connect() call */
    	const { dispatch, activeCount, todos, visibilityFilter } = this.props

		return (
			<div className={styles.container}>
				{/* Title */}
				<div className={styles.title}>
					Meeting App
				</div>

				{/* Route links */}
				<ul className={styles.navbar}>
		          <li className={classnames()}><Link to="/login">Log in</Link></li>
		          <li><Link to="/make-appointment">Set up a meeting</Link></li>
		        </ul>

		    	{ /* Work with React Router */ }
		        {this.props.children}

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
