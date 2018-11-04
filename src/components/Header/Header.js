import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
// import MemriseLogo from '../../assets/images/MemriseLogo.svg';

class Header extends Component {
	state = {
		homeBtnClasses: styles.NavButton,
		coursesBtnClasses: styles.NavButton,
		groupsBtnClasses: styles.NavButton,
	}

	componentWillMount() {
		this.setActiveBtn();
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.url !== this.props.url) {
			console.log('nextProps: ');
			console.log(nextProps);
			this.setActiveBtn(nextProps);
		}
		return true;
	}


	setActiveBtn = (props = this.props) => {
		if (props.url.indexOf('home') === 1) {
			this.setState({
				homeBtnClasses: styles.NavButton + ' ' + styles.ActiveButton,
				coursesBtnClasses: styles.NavButton,
				groupsBtnClasses: styles.NavButton,
			})
		} else if (props.url.indexOf('course') === 1) {
			this.setState({
				homeBtnClasses: styles.NavButton,
				coursesBtnClasses: styles.NavButton + ' ' + styles.ActiveButton,
				groupsBtnClasses: styles.NavButton,
			})
		} else if (props.url.indexOf('groups') === 1) {
			this.setState({
				homeBtnClasses: styles.NavButton,
				coursesBtnClasses: styles.NavButton,
				groupsBtnClasses: styles.NavButton + ' ' + styles.ActiveButton,
			})
		} else if (props.url.indexOf('login') === 1) {
			this.setState({
				loginBtnClasses: styles.NavButton + ' ' + styles.ActiveButton,
				signUpBtnClasses: styles.NavButton + ' ' + styles.SignUpPurple + ' ' + styles.LRMargin,
			});
		} else if (props.url.indexOf('join') === 1) {
			this.setState({
				loginBtnClasses: styles.NavButton,
				signUpBtnClasses: styles.NavButton + ' ' + styles.ActiveButton + ' ' + styles.LRMargin,
			});
		}
	}

	render() {
		let buttons = (
			<React.Fragment>
				<div className={styles.NavRow}>
					<Link to='/home' className={this.state.homeBtnClasses}>Home</Link>
					<Link to='/courses' className={this.state.coursesBtnClasses}>Courses</Link>
					<Link to='/groups' className={this.state.groupsBtnClasses}>Groups</Link>
				</div>
				<Link to='/logout' className={styles.LogoutBtn}>Log out</Link>
			</React.Fragment>
		);

		if (this.props.url.indexOf('login') === 1 || this.props.url.indexOf('join') === 1) {
			buttons = (
				<div className={styles.AuthNavButtonsDiv}>
					<Link to='/login' className={this.state.loginBtnClasses}>Login</Link>
					<Link to='/join' className={this.state.signUpBtnClasses}>Sign up</Link>
				</div>
			);
		}

		return (
			<div className={styles.Header}>
				<div className={styles.HeaderRow}>
					<Link to='/' className={styles.LogoWrapper} />
					{buttons}
				</div>
			</div>
		);
	}
}

export default Header;