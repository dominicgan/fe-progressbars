import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../components/App';

import { XMLHttpRequest } from 'xmlhttprequest';
global.XMLHttpRequest = XMLHttpRequest;

configure({ adapter: new Adapter() });

jest.useFakeTimers();

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<App />, div);
	ReactDOM.unmountComponentAtNode(div);
});

// define test element
const app = shallow(<App />);

// test fetch api to contain data structure
describe('fetch api matching data structure', () => {

	test('data structure', async () => {
		const res = await app.instance().fetchData();

		expect(Array.isArray(res.bars)).toBe(true);
		expect(Array.isArray(res.buttons)).toBe(true);
		expect(typeof res.limit).toBe('number');
	});

	test('2-5 bars', async () => {
		const res = await app.instance().fetchData();
		expect(Array.isArray(res.bars)).toBe(true);

		expect(res.buttons.length).toBeGreaterThanOrEqual(2);
		expect(res.buttons.length).toBeLessThanOrEqual(5);
	});

	test('4-6 buttons', async () => {
		const res = await app.instance().fetchData();
		expect(Array.isArray(res.buttons)).toBe(true);
		
		expect(res.buttons.length).toBeGreaterThanOrEqual(4);
		expect(res.buttons.length).toBeLessThanOrEqual(6);
	});
});

describe('App logic', () => {
	// target bar id should be changed on invoking method
	test('update targetBarIndex state on handleTargetChange method', () => {
		let testVal = Math.floor(Math.random() * 50);
		app.instance().handleTargetChange({target: {value: testVal}});
		expect(app.state('targetBarIndex')).toEqual(testVal);
	});

	// value should increment as added
	test('handleButtonClick increment', () => {
		let incrementVal = 10;
		let expectedBarsFinal = [10,0,0];
		app.setState({
			barsFinal: [0,0,0],
			targetBarIndex: 0
		});

		app.instance().handleButtonClick(incrementVal);
		expect(app.state('barsFinal')).toEqual(expectedBarsFinal);
	});

	// value should not decrement if below 0
	test('handleButtonClick decrement below 0', () => {
		let decrementVal = -10;
		let expectedBarsFinal = [0,0,0];
		app.setState({
			barsFinal: [0,0,0],
			targetBarIndex: 0
		});

		app.instance().handleButtonClick(decrementVal);
		expect(app.state('barsFinal')).toEqual(expectedBarsFinal);
	});

	// bar final value should be incremented to expected value after setInterval completes
	test('progressBarValue increments bars', () => {
		let testId = 0;
		let origBars = [0,0,0];
		let expectBars = [100,0,0]; // increment first bar by 10
		let newVal = 100;

		app.setState({bars: origBars});
		app.instance().progressBarValue(testId, newVal);
		jest.runTimersToTime(2000);

		expect(app.state('bars')).toEqual(expect.arrayContaining(expectBars));
		jest.clearAllTimers();
	});

	// bar final value should be decremented to 0 after setInterval completes when newVal > curVal
	test('progressBarValue decrements bars', () => {
		let testId = 0;
		let origBars = [50,0,0];
		let expectBars = [0,0,0]; // increment first bar by 10
		let newVal = -100;

		app.setState({bars: origBars});
		app.instance().progressBarValue(testId, newVal);
		jest.runTimersToTime(2000);

		expect(app.state('bars')).toEqual(expect.arrayContaining(expectBars));
		jest.clearAllTimers();
	});
});

// app.unmount();