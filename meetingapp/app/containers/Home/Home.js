import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Timetable from '../../components/Timetable/Timetable';
import classnames from 'classnames';
import styles from './Home.css';

class Home extends Component {

	constructor(props) {
		super(props);
		console.log('[Home] props', props);
	}

	render() {
		return(
			<div className={styles.container}>
				<Timetable />
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