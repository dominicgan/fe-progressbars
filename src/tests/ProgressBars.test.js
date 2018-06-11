import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ProgressBars from '../components/ProgressBars';

configure({ adapter: new Adapter() });

// shallow testData
const testData = {
	bars: [0,1,2],
	limit: 100
};

// define test element
const progressBar = shallow(<ProgressBars bars={testData.bars} limit={testData.limit} />);

describe('progressBars', () => {
	test('to render 3 <progress/> bars', () => {
		expect(progressBar.find('.progressBars__wrapper')).toHaveLength(3);
	});

	test('progress container to of be type <div>', () => {
		progressBar.find('.progressBars__wrapper').forEach((node) => {
			expect(node.is('div')).toEqual(true);
		});
	});

	test('progress container to contain <progress> and <span> elements', () => {
		progressBar.find('.progressBars__wrapper').forEach((node, i) => {
			expect(node.containsAllMatchingElements([
				<progress/>,
				<span>{testData.bars[i] + '%'}</span>
				])).toEqual(true);
		});
	});
});

describe('progressBars logic', () => {
	test('limit break class added if value exceeds limit', () => {
		// set value to exceed limit
		progressBar.setProps({'bars': [101,101,101]});
		// bar should have .limit-break class added to it if current value exceeds limit value
		progressBar.find('progress').forEach((node) => {
			expect(node.hasClass('limit-break')).toEqual(true);
		});
	});
});