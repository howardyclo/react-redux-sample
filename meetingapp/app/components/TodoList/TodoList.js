import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Todo from '../Todo/Todo';
import styles from './TodoList.css';

export default class TodoList extends Component {

	/* we can init state here */
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div>
				{this.props.todos.map(todo =>
					<Todo {...todo} 
						key={todo.id} 
						onToggle={() => this.props.onToggle(todo.id)}
						onEdit={(todoID, text) => this.props.onEdit(todoID, text)}
						onDelete={() => this.props.onDelete(todo.id)} />
				)}
			</div>
		)
	}
}

TodoList.propTypes = {
	todos: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
	    	text: PropTypes.string.isRequired,
	    	completed: PropTypes.bool.isRequired
		}).isRequired
	).isRequired,
	onToggle: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired
}