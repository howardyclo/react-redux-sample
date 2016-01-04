import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './NotFound.css';

export default class NotFound extends Component {

	constructor(props) {
		super(props);
		console.log('[NotFound] props', props);
	}

	render() {
		return (
			<div className={styles.container}>
				<div className={styles.title}>404 Not Found</div>
			</div>
		)
	}
}
