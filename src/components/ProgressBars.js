import React, { Component } from 'react';
import '../css/ProgressBars.css';

export default class ProgressBars extends Component {
	renderBars(bars) {
		let output = bars.map((el, i) => {
			return (<progress key={i} value={el} max={this.props.limit}/>)
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