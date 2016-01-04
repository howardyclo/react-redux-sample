import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Timetable.css';

export default class Timetable extends Component {

	/* we can init state here */
	constructor(props) {
		super(props);

		this.state = {
			timetable: this.initTimetable()
		}
	}

	initTimetable = () => {

		/* props */
		const {days, start, end, diff} = this.props;

		/**
		 * timetable @type {Object Array} every time slots from starting hour to ending hour
		 * [
		 * 		{ 	
		 * 			start, # @type {number} [start hour] 
		 * 			end,   # @type {number} [start hour + diff]
		 * 			cells: # @type {array}  [every day in weeks, e.g. cells[0] = Mon, cells[1] = Tue ...]
		 * 			{ 
		 * 				available # @type {boolean} [user at this time is available or not]
		 * 			}
		 * 		} 
		 * ]
		 */
		let timetable = [];

		for (let i = start ; i < end ; i += diff) {

			let cells = [];

			for (let day in days) {
				cells.push({ available: false });
			}

			timetable.push({
				start: i,
				end: i + diff,
				cells: cells
			});
		}

		return timetable;
	}

	handleSetAvailable = (rowIndex, colIndex) => {

		let timetable = Object.assign([], this.state.timetable);

		timetable[rowIndex].cells[colIndex].available = !timetable[rowIndex].cells[colIndex].available;

		this.setState({
			timetable: timetable
		});
	}

	render() {

		/* props */
		const { days } = this.props;

		return (
			<table className={styles.timetable}>
				<thead>
					<tr>
						<th>Time</th>
						{days.map((day, index) => 
							<th key={index}>{day}</th>
						)}
					</tr>
				</thead>
				<tbody>
					{this.state.timetable.map((row, rowIndex) => 
						<tr key={rowIndex}>
				        	<th>{`${row.start}:00 - ${row.end}:00`}</th>
				        	{row.cells.map((cell, colIndex) => (
				        		<td className={classnames(
				        				{
				        					[`${styles.available}`]: cell.available,
				        					[`${styles.unavailable}`]: !cell.available,
				        				}
				        			)} 
				        			onClick={(e) => this.handleSetAvailable(rowIndex, colIndex) }
				        			key={colIndex}>
				        			{ (cell.available) ? 'Available' : 'Unavailable' }
				        		</td>
				        	))}
				        </tr>
					)}
			    </tbody>
			</table>
		)
	}
}

Timetable.defaultProps = {
	days: ['Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday', 'Sunday'],
	start: 10,
	end: 18,
	diff: 1
}

Timetable.propTypes = {
	days: PropTypes.arrayOf(PropTypes.string),
	start: PropTypes.number,
	end: PropTypes.number,
	diff: PropTypes.number
}