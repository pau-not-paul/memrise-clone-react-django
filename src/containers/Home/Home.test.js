import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Home } from './Home';

import Header from '../../components/Header/Header';
import LeftColumn from '../../components/Home/LeftColumn/LeftColumn';
import CourseCard from '../../components/Home/CourseCard/CourseCard';
import Welcome from '../../components/Home/Welcome/Welcome';

configure({ adapter: new Adapter() });

describe('<Home />', () => {
	it('should render the welcome card (no courses)', () => {
		const profile = {
			loading: false,
			username: 'usernametest',
			level: 1,
			points: 125,
			wordsLearned: 1,
			courses: [],
		};
		const wrapper = shallow(
			<Home match={{ url: '' }} updateProfile={() => {}} profile={profile} />,
		);
		expect(wrapper.find(Welcome)).toHaveLength(1);
	});

	it('should render CourseCards', () => {
		const profile = {
			loading: false,
			username: 'usernametest',
			level: 1,
			points: 125,
			wordsLearned: 1,
			courses: [{ id: 0 }, { id: 1 }, { id: 2 }],
		};
		const wrapper = shallow(
			<Home match={{ url: '' }} updateProfile={() => {}} profile={profile} />,
		);
		expect(wrapper.find(CourseCard)).toHaveLength(3);
	});

	it('should render all the components (profile loading)', () => {
		const profile = {
			loading: true,
			username: null,
			level: null,
			points: null,
			wordsLearned: null,
			courses: null,
		};
		const wrapper = shallow(
			<Home match={{ url: '' }} updateProfile={() => {}} profile={profile} />,
		);
		expect(wrapper.find(Header)).toHaveLength(1);
		expect(wrapper.find(LeftColumn)).toHaveLength(1);
		expect(wrapper.find(CourseCard)).toHaveLength(2);
		expect(wrapper.contains(<CourseCard loading />)).toEqual(true);
	});
});
