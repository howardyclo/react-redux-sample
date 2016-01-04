import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Timetable from '../../components/Timetable/Timetable';
import classnames from 'classnames';
import styles from './App.css';
import { logoutAndRedirect } from '../../actions/auth';

class App extends Component {

	constructor(props) {
		super(props);
		console.log('[App] props', props);
	}

	render() {

		/* Injected by connect() call */
    	const { dispatch, auth } = this.props;

		return (
			<div className={styles.container}>
				{/* Title */}
				<div className={styles.title}>
					Meeting App
				</div>

				{/* Routes */}
				<ul className={styles.navbar}>
					{
						auth.user 
						? (<li className={styles.logout}><a href='#' onClick={() => dispatch(logoutAndRedirect())}>Log out</a></li>)
						: null
					}
					<li className={styles.first}> 
					{
						auth.user 
						? <Link activeClassName={styles.active} to="/home">Home</Link>
						: <Link activeClassName={styles.active} to="/login">Log in</Link>
					}
					</li>
					<li className={styles.last}>
						<Link activeClassName={styles.active} to="/meeting">Set up a meeting</Link>
					</li>
		        </ul>

		    	{ /* Work with React Router */ }
		        {this.props.children}
			</div>
		);
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
export default connect(mapStateToProps)(App)
