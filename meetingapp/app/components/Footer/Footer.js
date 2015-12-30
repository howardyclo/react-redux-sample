import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Footer.css';
import * as VisibilityFilterActions from '../../actions/visibility-filter';

export default class Footer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			showAll: true,
			showUnCompleted: false,
			showCompleted: false
		}
	}

	handleSetVisibility = (filter) => {

		console.log('filter: ', filter);

		switch (filter) {

		case VisibilityFilterActions.VisibilityFilter.SHOW_ALL_TODOS:
			this.setState({
				showAll: true,
				showUnCompleted: false,
				showCompleted: false
			});
			this.props.onShowAll();
			break;

		case VisibilityFilterActions.VisibilityFilter.SHOW_COMPLETED_TODOS:
			this.setState({
				showAll: false,
				showUnCompleted: false,
				showCompleted: true
			});
			this.props.onShowCompleted();
			break;

		case VisibilityFilterActions.VisibilityFilter.SHOW_UNCOMPLETED_TODOS:
			this.setState({
				showAll: false,
				showUnCompleted: true,
				showCompleted: false
			});
			this.props.onShowUnCompleted();
			break;

		default:
			this.setState({
				showAll: true,
				showUnCompleted: false,
				showCompleted: false
			});
			this.props.onShowAll();
			break;
	  	}
	}

	render() {

		return (
			<div className={classnames(styles.row, styles.container)}>

				<span className={styles.itemleft}>{this.props.activeCount} items left</span>

				<div className={styles.col}>
					<span className={classnames(styles.spacing, {[`${styles.active}`]: this.state.showAll})} onClick={() => this.handleSetVisibility(VisibilityFilterActions.VisibilityFilter.SHOW_ALL_TODOS)}>All</span>
					<span className={classnames(styles.spacing, {[`${styles.active}`]: this.state.showUnCompleted})} onClick={() => this.handleSetVisibility(VisibilityFilterActions.VisibilityFilter.SHOW_UNCOMPLETED_TODOS)}>Active</span>
					<span className={classnames({[`${styles.active}`]: this.state.showCompleted})} onClick={() => this.handleSetVisibility(VisibilityFilterActions.VisibilityFilter.SHOW_COMPLETED_TODOS)}>Completed</span>
				</div>

				<div className={classnames(styles.col, styles.alignright)}>
					<span onClick={this.props.onClearCompleted}>Clear completed</span>
				</div>
			</div>
		)
	}
}

Footer.propTypes = {
	activeCount: PropTypes.number.isRequired,
	onShowAll: PropTypes.func.isRequired,
	onShowCompleted: PropTypes.func.isRequired,
	onShowUnCompleted: PropTypes.func.isRequired,
	onClearCompleted: PropTypes.func.isRequired
}


