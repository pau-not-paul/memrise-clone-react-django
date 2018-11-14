import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CourseCard from './CourseCard';
import styles from './CourseCard.module.css';
import { Link } from 'react-router-dom';

configure({ adapter: new Adapter() });

describe('CourseCard', () => {
	let wrapper;

	beforeEach(() => {
		const course = {
			id: 1,
			name: 'N',
			wordsLearned: 10,
			totalWords: 10,
		};
		wrapper = shallow(<CourseCard course={course} />);
	});

	it('should have an image', () => {
		expect(wrapper.find('img')).toHaveLength(1);
		expect(
			wrapper.contains(
				<Link className={styles.CourseTitle} to={'/course/1'}>
					N
				</Link>,
			),
		).toEqual(true);
	});

	it('should have Course Completed when wordsLearned === totalWords && totalWords !== 0', () => {
		expect(
			wrapper.contains(<div className={styles.CourseCompleted}>Course completed!</div>),
		).toEqual(true);
		let course = {
			id: 1,
			name: 'N',
			wordsLearned: 0,
			totalWords: 0,
		};
		wrapper.setProps({ course: course });
		expect(
			wrapper.contains(<div className={styles.CourseCompleted}>Course completed!</div>),
		).toEqual(false);
		course = {
			id: 1,
			name: 'N',
			wordsLearned: 0,
			totalWords: 10,
		};
		wrapper.setProps({ course: course });
		expect(
			wrapper.contains(<div className={styles.CourseCompleted}>Course completed!</div>),
		).toEqual(false);
	});
});
