import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../components/App';

import ProgressBarsControl from '../components/ProgressBarsControl';

configure({ adapter: new Adapter() });


// shallow testData
const testData = {
	bars: [0,1,2],
	selectValue: 0,
	buttons: [-20, -10, 10, 20],
	handleChange: jest.fn(),
	handleClick: jest.fn()
};

// define test element
const progressBarControls = shallow(<ProgressBarsControl bars={testData.bars} selectValue={testData.selectValue} onChangeTarget={testData.handleChange} buttons={[-20,-10,10,20]} onClickButton={testData.handleClick}/>);

describe('progressBarControls render', () => {
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

describe('progressBarControls logic', () => {
	test('handleChange function to be triggered on <select> change', () => {
		progressBarControls.find('select').simulate('change', { target: { value: 1}});
		expect(testData.handleChange).toHaveBeenCalled();
	});

	test('handleClick function to be triggered on <button> click', () => {
		progressBarControls.find('button').forEach((node, i) => {
			node.simulate('click');
			expect(testData.handleClick).toHaveBeenCalled();
		});
	});
});
