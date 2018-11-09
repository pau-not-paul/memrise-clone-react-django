import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Home } from './Home';

import Header from '../../components/Header/Header';
import LeftColumn from '../../components/Home/LeftColumn/LeftColumn';

configure({ adapter: new Adapter() });

describe('<Home />', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<Home match={{ url: '' }} username={'u'} token={'t'} />)
	})

	it('should have a Header', () => {
		expect(wrapper.find(Header)).toHaveLength(1);
	});

	it('should have a LeftColumn', () => {
		expect(wrapper.find(LeftColumn)).toHaveLength(1);
	});
});