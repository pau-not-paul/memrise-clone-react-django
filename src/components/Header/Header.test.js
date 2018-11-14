import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Header, { NavButton } from './Header';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

configure({ adapter: new Adapter() });

describe('Header', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<Header url={'/home'} />);
	});

	it('url=home, checking buttons', () => {
		expect(wrapper.contains(<Link to="/" className={styles.LogoWrapper} />)).toEqual(true);
		expect(
			wrapper.contains(
				<NavButton to="/home" isActive>
					Home
				</NavButton>,
			),
		).toEqual(true);
		expect(
			wrapper.contains(
				<NavButton to="/courses" isActive={false}>
					Courses
				</NavButton>,
			),
		).toEqual(true);
		// expect(wrapper.contains(<NavButton to='/groups' isActive={false}>Groups</NavButton>)).toEqual(true);
		expect(
			wrapper.contains(
				<Link to="/logout" className={styles.LogoutBtn}>
					Log out
				</Link>,
			),
		).toEqual(true);
	});

	it('url=login, checking buttons', () => {
		wrapper.setProps({ url: '/login' });
		expect(wrapper.contains(<Link to="/" className={styles.LogoWrapper} />)).toEqual(true);
		expect(
			wrapper.contains(
				<Link to="/login" className={styles.NavButton + ' ' + styles.ActiveButton}>
					Login
				</Link>,
			),
		).toEqual(true);
		expect(
			wrapper.contains(
				<Link
					to="/join"
					className={styles.NavButton + ' ' + styles.LRMargin + ' ' + styles.SignUpPurple}
				>
					Sign up
				</Link>,
			),
		).toEqual(true);
	});

	it('NavButton check', () => {
		const navButton = shallow(
			<NavButton to="/home" isActive>
				Home
			</NavButton>,
		);
		expect(
			navButton.contains(
				<Link to="/home" className={styles.NavButton + ' ' + styles.ActiveButton}>
					Home
				</Link>,
			),
		).toEqual(true);
		navButton.setProps({ isActive: false });
		expect(
			navButton.contains(
				<Link to="/home" className={styles.NavButton}>
					Home
				</Link>,
			),
		).toEqual(true);
	});
});
