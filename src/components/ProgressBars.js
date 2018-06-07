import React, { Component } from 'react';
import '../css/ProgressBars.css';

export default class ProgressBars extends Component {
	renderBars(bars) {
		let output = bars.map((el, i) => {
			return (<progress key={i} value={el} className={el > 100 ? 'limit-break' : ''} max={this.props.limit}></progress>)
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