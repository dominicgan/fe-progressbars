import React from 'react';
import ReactDOM from 'react-dom';
import ProgressBarsControl from '../components/ProgressBarsControl';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const dummy = function (el) {
	return;
}

// shallow testData
const testData = {
	bars: [0,1,2],
	selectValue: 0,
	buttons: [-20, -10, 10, 20],
	handleChange: (e) => {
		console.log(e);
	},
	handleClick: (el) => {
		console.log(el);
	}
};

// define test element
const progressBarControls = shallow(<ProgressBarsControl bars={testData.bars} selectValue={testData.selectValue} onChangeTarget={testData.handleChange.bind(this)} buttons={[-20,-10,10,20]} onClickButton={testData.handleClick.bind(this)}/>);

describe('progressBarControls', () => {
	test('to render <select>', () => {
		expect(progressBarControls.find('.progressBarsControl__select').children().is('select')).toEqual(true);
	});

	test('to render <options>', () => {
		progressBarControls.find('.progressBarsControl__select select').children().forEach((node, i) => {
			expect(node.containsAllMatchingElements([
				<option value={i}>Progress Bar {i+1}</option>
				])).toEqual(true);
		});
	});

	test('to render <buttons>', () => {
		progressBarControls.find('.progressBarsControl__buttons').children().forEach((node, i) => {
			expect(node.containsAllMatchingElements([
				<button>{testData.buttons[i]}</button>
				])).toEqual(true);
		});
	});
});
