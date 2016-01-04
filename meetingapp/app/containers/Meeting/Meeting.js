import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Timetable from '../../components/Timetable/Timetable';
import classnames from 'classnames';
import styles from './Meeting.css';

class Meeting extends Component {

	constructor(props) {
		super(props);

		this.state = {
			visibility: false
		}
	}

	handleToggle = () => {

		this.setState({
			visibility: !this.state.visibility
		});
	}

	render() {
		return(
			<div className={styles.container}>

				<div className={styles.infobar}>
					<img className={styles.avatar} src={require('../../img/avatar.png')}></img>
					<span className={styles.username}>Howard</span>
					<span className={styles.button} onClick={(e) => this.handleToggle()}>Set up a meeting</span>
				</div>

				<div className={classnames(styles.slider, {
					[`${styles.visible}`]: this.state.visibility
				})}>
					<Timetable />
				</div>

			</div>
		)
	}
}

/**
 * Which props do we want to inject, given the global state we defined in root reducer 
 * (or state combined in store) ?
 * It will be invoked when dispatch() is called.
 * Note: use https://github.com/faassen/reselect for better performance.
 */
const mapStateToProps = (state) => {

	return state;
}

/* Wrap the component to inject dispatch and state into it */
export default connect(mapStateToProps)(Meeting)
