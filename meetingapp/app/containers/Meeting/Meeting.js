import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Timetable from '../../components/Timetable/Timetable';
import * as TimetableActions from '../../actions/timetable';
import classnames from 'classnames';
import styles from './Meeting.css';

class Meeting extends Component {

	constructor(props) {
		super(props);

		this.state = {
			visibility: false
		}
	}

	componentDidMount() {

		const { dispatch } = this.props;
		dispatch(TimetableActions.fetchOthersTimetables());
	}

	componentWillUnmount() {

		const { dispatch } = this.props;
		dispatch(TimetableActions.resetOthersTimetableVisibility());
	}

	render() {

		const { dispatch } = this.props;
		const { timetable, othersTimetables } = this.props.timetable;

		return(
			<div className={styles.container}>
				{
					othersTimetables.map((othersTimetable, index) => 
						[
							<div className={styles.infobar}>
								<img className={styles.avatar} src={require('../../img/avatar.png')}></img>
								<span className={styles.username}>{othersTimetable.username}</span>
								<span className={styles.button} onClick={(e) => dispatch(TimetableActions.toggleOthersTimetable(index))}>Check out timetable</span>
							</div>
							,
							<div className={classnames(styles.slider, {
								[`${styles.visible}`]: othersTimetable.visibility
							})}>
								<Timetable {...othersTimetable} timetableToBeCompared={timetable} />
							</div>
						]
					)
				}
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
