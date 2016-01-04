import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Timetable from '../../components/Timetable/Timetable';
import * as TimetableActions from '../../actions/timetable';
import classnames from 'classnames';
import styles from './Home.css';

class Home extends Component {

	constructor(props) {
		super(props);
		console.log('[Home] props', props);
	}

	render() {

		const { dispatch, auth, timetable } = this.props;
		const username = auth.user.get('username');

		return(
			<div className={styles.container}>
				<div className={styles.infobar}>
					<img className={styles.avatar} src={require('../../img/avatar.png')}></img>
					<span className={styles.username}>{username}</span>
					{
						timetable.isSetting
						? [
							<span key="1" className={classnames(styles.button, styles.cancel)} onClick={() => dispatch(TimetableActions.cancelSetAvailableTime())}>Cancel</span>,
						 	<span key="2" className={classnames(styles.button, styles.save)} onClick={() => dispatch(TimetableActions.cancelSetAvailableTime())}>Save</span> 
						  ]
						: <span className={classnames(styles.button, styles.setAvailableTime)} onClick={() => dispatch(TimetableActions.requestSetAvailableTime())}>Set available time</span>
					}
				</div>
				<Timetable {...timetable} onSetAvailableTime={(row, col) => dispatch(TimetableActions.setAvailableTime(row, col))} />
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
export default connect(mapStateToProps)(Home);