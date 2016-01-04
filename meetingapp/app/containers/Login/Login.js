import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';
import classnames from 'classnames';
import styles from './Login.css';
import * as AuthActions from '../../actions/auth';

class Login extends Component {

	constructor(props) {
		super(props);

		console.log('[Login] props', props);

		this.state = {
			username: '',
			password: '',
			errorMessage: ''
		}
	}

	/* Redirect path if authenticated */
	componentWillMount() {
		
		const { dispatch, auth } = this.props;

		if (auth.user)
			dispatch(pushPath('/home'));
	}

	/* Update UI state from store's state tree when action is dispatched and receive next props */
	componentWillReceiveProps(nextProps) {

		this.setState({
			errorMessage: nextProps.auth.errorMessage
		})
	}

	handleChange = (e, field) => {

		var text = e.target.value.trim();

		switch(field) {
		case 'username':
			this.setState({ username: text });
			break;
		case 'password':
			this.setState({ password: text });
			break;
		}
	}

	handleSubmit = (e, actionType) => {

		const { dispatch, location } = this.props;
		const redirect = location.query.redirectAfterLogin || '/home';

		if (this.state.username === '') 
			return this.setState({ errorMessage: 'Username is required !' });

		if (this.state.password === '') 
			return this.setState({ errorMessage: 'Password is required !' });

		switch(actionType) {
		case 'login':
			dispatch(AuthActions.login(this.state.username, this.state.password, redirect));
			break;
		case 'signup':
			dispatch(AuthActions.signup(this.state.username, this.state.password, redirect));
			break;
		}
	}

	render() {

		return (
			<div className={styles.container}>
				
				<div className={classnames({
					[`${styles.errorMessage}`]: (this.state.errorMessage !== ''),
					[`${styles.hidden}`]: (this.state.errorMessage === '')
				})}>
					{this.state.errorMessage}
				</div>
				<div className={styles.field}>
					<label>Username</label>
					<input 
						type="text" 
					   	autoFocus="true"
					   	value={this.state.username}
					   	placeholder="Username" 
					   	onChange={e => this.handleChange(e, 'username')}>
					</input>
				</div>
				<div className={styles.field}>
					<label>Password</label>
					<input 
						type="text" 
					   	autoFocus="true"
					   	value={this.state.password}
					   	placeholder="Password"
					   	onChange={e => this.handleChange(e, 'password')}>
					</input>
				</div>
				<div className={styles.buttonGroup}>
					<button className={styles.login} onClick={e => this.handleSubmit(e, 'login')}>Log in</button>
					<button className={styles.signup} onClick={e => this.handleSubmit(e, 'signup')}>Sign up</button>
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
export default connect(mapStateToProps)(Login);