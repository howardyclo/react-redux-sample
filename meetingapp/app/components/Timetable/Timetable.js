import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Timetable.css';

export default class Timetable extends Component {

	/* we can init state here */
	constructor(props) {
		super(props);
	}

	handleSetAvailableTime = (row, col) => {
		
		const { isSetting, onSetAvailableTime } = this.props;

		if (isSetting)
			onSetAvailableTime(row, col);
	}

	getCellString = (matched, available) => {

		if (matched)
			return 'Matched';

		else if (available)
			return 'Available';
		else
			return 'Unavailable';
	}

	render() {

		const { days, timetable, isSetting, timetableToBeCompared } = this.props;

		console.log(timetableToBeCompared);

		return (
			<table className={classnames(styles.timetable, {
				[`${styles.settable}`]: isSetting
			})}>
				<thead>
					<tr>
						<th>Time</th>
						{days.map((day, index) => 
							<th key={index}>{day}</th>
						)}
					</tr>
				</thead>
				<tbody>
					{timetable.map((row, rowIndex) => 
						<tr key={rowIndex}>
				        	<th>{`${row.start}:00 - ${row.end}:00`}</th>
				        	{row.cells.map((cell, colIndex) => {

				        		let matched = false;

				        		if (timetableToBeCompared !== undefined)
					        		if (cell.available && timetableToBeCompared[rowIndex].cells[colIndex].available)
					        			matched = true;

				        		return (
					        		<td className={classnames(
					        				{
					        					[`${styles.available}`]: cell.available,
					        					[`${styles.unavailable}`]: !cell.available,
					        					[`${styles.matched}`]: matched
					        				}
					        			)} 
					        			onClick={(e) => this.handleSetAvailableTime(rowIndex, colIndex) }
					        			key={colIndex}>
					        			{ this.getCellString(matched, cell.available) }
					        		</td>
					        	)
				        	})}
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
	diff: 1,
	timetable: initTimetable()
}

Timetable.propTypes = {
	days: PropTypes.arrayOf(PropTypes.string),
	start: PropTypes.number,
	end: PropTypes.number,
	diff: PropTypes.number,
	timetable: PropTypes.arrayOf(PropTypes.shape({
			cells: PropTypes.arrayOf(PropTypes.shape({ // every day in weeks, e.g. cells[0] = Mon, cells[1] = Tue ...
				available: PropTypes.bool 			   // user at this time is available or not
			})),
			start: PropTypes.number, // start hour
			end: PropTypes.number	 // start hour + diff
	})),
	onSetAvailableTime: PropTypes.func
}

function initTimetable() {

	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday', 'Sunday'],
		  start = 10, 
		  end = 18,
		  diff = 1;

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