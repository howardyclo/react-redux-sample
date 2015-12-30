import React, { Component, PropTypes } from 'react';
import styles from './TodoInputText.css';

export default class TodoInputText extends Component {

	/* we can init state here */
	constructor(props) {
		super(props);

		this.state = {
			text: this.props.text || ''
		}
	}

	handleSave = (e) => {

		/* press ENTER */
		if (e.which == 13) {

			var text = e.target.value.trim();

			if (text !== '')
				this.props.onSave(text);
		
			this.setState({ text: '' });
		}
	}

	handleChange = (e) => {
		this.setState({ text: e.target.value });
	}

	render() {

		return (
			<div>
				<input className={styles.input} 
					   type="text" 
					   autoFocus="true"
					   value={this.state.text}
					   placeholder={this.props.placeholder} 
					   onChange={e => this.handleChange(e)}
					   onKeyDown={e => this.handleSave(e)} />
			</div>
		)
	}
}

TodoInputText.propTypes = {
	text: PropTypes.string,
	placeholder: PropTypes.string,
	onSave: PropTypes.func.isRequired
}

TodoInputText.defaultProps = {
	placeholder: 'What needs to be done ?'
}