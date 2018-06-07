import React, { Component } from 'react';
import '../css/ProgressBarsControl.css';

export default class ProgressBarsControl extends Component {
	renderBarSelect(bars) {
		let output = bars.map((el, i) => {
			return (
				<option key={i} value={i}>
					Progress Bar {i+1}
				</option>
				)
		});
		return (
			<select onChange={this.props.onChangeTarget.bind(this)} value={this.props.selectValue}>
				{output}
			</select>
			);
	}
	renderButtons(buttons) {
		let output = buttons.map((el, i) => {
			return (<button key={i} onClick={this.props.onClickButton.bind(this,el)}>{el}</button>)
		});
		return output;
	}
	render() {
		return (
			<div className='progressBarsControl'>
				<div className='progressBarsControl__select'>
					{this.renderBarSelect(this.props.bars)}
				</div>
				<div className='progressBarsControl__buttons'>
					{this.renderButtons(this.props.buttons)}
				</div>
			</div>
			)
	}
}