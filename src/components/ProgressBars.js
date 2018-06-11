import React, { Component } from 'react';
import '../sass/ProgressBars.scss';

export default class ProgressBars extends Component {
	renderBars(bars) {
		let output = bars.map((value, i) => {
			// set .limit-break class if value surpasses defined limit in props
			return (
				<div className="progressBars__wrapper" key={i}>
					<progress value={value} className={value > this.props.limit ? 'limit-break' : ''} max={this.props.limit}></progress>
					<span className="bar-value">{value + '%'}</span>
				</div>
				)
		});
		return output;
	}
	render() {
		return (
			<div className='progressBars'>
				{this.renderBars(this.props.bars)}
			</div>
			)
	}
}