import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Login.css';

export default class Login extends Component {

	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			errorMessage: ''
		}
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

		switch(actionType) {
		case 'login':
			console.log(actionType, this.state);
			break;
		case 'signup':
			console.log(actionType, this.state);
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