import React from 'react';
import ReactDOM from 'react-dom';
import ProgressBars from '../components/ProgressBars';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

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