import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export class NavButton extends Component {
	render() {
		const active = this.props.isActive ? ` ${styles.ActiveButton}` : '';
		return (
			<Link to={this.props.to} className={styles.NavButton + active}>
				{this.props.children}
			</Link>
		);
	}
}

class Header extends Component {
	render() {
		const url = this.props.url.split('/')[1];

		let buttons = (
			<React.Fragment>
				<div className={styles.NavRow}>
					<NavButton to="/home" isActive={url === 'home'}>
						Home
					</NavButton>
					<NavButton to="/courses" isActive={url === 'courses' || url === 'course'}>
						Courses
					</NavButton>
					{/* <NavButton to='/groups' isActive={url === 'groups'}>Groups</NavButton> */}
				</div>
				<Link to="/logout" className={styles.LogoutBtn}>
					Log out
				</Link>
			</React.Fragment>
		);

		if (url === 'login' || url === 'join') {
			const loginBtnActive = url === 'login' ? ` ${styles.ActiveButton}` : '';
			const signUpBtnActive =
				url === 'join' ? ` ${styles.ActiveButton}` : ` ${styles.SignUpPurple}`;

			buttons = (
				<div className={styles.AuthNavButtonsDiv}>
					<Link to="/login" className={styles.NavButton + loginBtnActive}>
						Login
					</Link>
					<Link to="/join" className={`${styles.NavButton} ${styles.LRMargin}${signUpBtnActive}`}>
						Sign up
					</Link>
				</div>
			);
		}

		return (
			<div className={styles.Header}>
				<div className={styles.HeaderRow}>
					<Link to="/" className={styles.LogoWrapper} />
					{buttons}
				</div>
			</div>
		);
	}
}

export default Header;
