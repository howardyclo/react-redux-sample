import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Todo.css';
import TodoInputText from '../TodoInputText/TodoInputText';

export default class Todo extends React.Component {

	/* we can init state here */
	constructor(props) {
		super(props);

		this.state = { editing: false };

		/**
		 * Since we use es6+ class syntax, we need to manually bind this method to the component instance.
		 * e.g. this.handleDoubleClick = this.handleDoubleClick.bind(this);
		 * But if we use es6+ arrow function syntax, we don't need to bind 'this'. It already binds it for us.
		 */
		
	}

	handleDoubleClick = (e) => {

		this.setState({ editing: true });
	}	

	handleSave = (text) => {

		this.props.onEdit(this.props.id, text);

		this.setState({ editing: false });
	}

	render() {

		var element;

		if (this.state.editing)
			element = (
				<TodoInputText text={this.props.text} onSave={text => this.handleSave(text)} />
			)
		else
			element = (
				<div className={classnames(styles.row, styles.container)}>

					<div className={styles.col10}>
						<div className={
							classnames(
								styles.circle,
								{
									[`${styles.hollow}`]: !this.props.completed, 
									[`${styles.solid}`]: this.props.completed
								}
							)}
							onClick={this.props.onToggle}>
						</div>
					</div>

					<div className={styles.col80}>
						<div className={
							classnames(
								styles.text,
								{
									[`${styles.linethrough}`]: this.props.completed
								}
							)}
							onDoubleClick={e => this.handleDoubleClick(e)}>
							{this.props.text}
						</div>
					</div>

					<div className={styles.col10}>
						<button className={styles.delete} onClick={this.props.onDelete} />
					</div>

				</div>
			)

		return element;
	}
}

Todo.propTypes = {
	id: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
	completed: PropTypes.bool.isRequired,
	onToggle: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired
}
