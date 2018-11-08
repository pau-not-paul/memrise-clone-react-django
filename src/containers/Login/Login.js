import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth'

import styles from './Login.module.css';
import Header from '../../components/Header/Header';

class Login extends Component {

	state = {
		email: '',
		password: '',
		emailInputClasses: styles.Input,
		passwordInputClasses: styles.Input,
		errorMessage: null,
	}

	validateEmail(elementValue) {
		var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		return emailPattern.test(elementValue);
	}

	loginClick = () => {
		let correct = true;

		if (this.state.email === '') {
			// if (!this.validateEmail(this.state.email)) {
			correct = false;
			this.setState({
				emailInputClasses: styles.Input + ' ' + styles.Error,
			});
		}
		if (this.state.password === '') {
			correct = false;
			this.setState({
				passwordInputClasses: styles.Input + ' ' + styles.Error,
			});
		}

		if (correct) {
			this.login();
		}
	}

	login = () => {
		this.setState({ errorMessage: null });

		this.props.onAuth(this.state.email, this.state.password);
	}

	onKeyDown = (event) => {
		if (event.key === 'Enter') {
			this.loginClick();
		}
	}

	emailChange = (event) => {
		if (this.state.emailInputClasses === styles.Input + ' ' + styles.Error) {
			this.setState({
				email: event.target.value,
				emailInputClasses: styles.Input,
			});
		} else {
			this.setState({ email: event.target.value });
		}
	}

	passwordChange = (event) => {
		if (this.state.passwordInputClasses === styles.Input + ' ' + styles.Error) {
			this.setState({
				password: event.target.value,
				passwordInputClasses: styles.Input,
			});
		} else {
			this.setState({ password: event.target.value });
		}
	}

	render() {
		let errorMessage = this.state.errorMessage;

		if (this.props.error) {
			errorMessage = (
				<div className={styles.ErrorMessage}>
					Oopsie, wrong username or password. Let's try again. Careful with the Caps Lock!
				</div>
			);
		}

		return (
			<React.Fragment>
				<Header url={this.props.match.url} />
				<div className={styles.Content}>
					<div className={styles.WhiteBox}>
						<div className={styles.LoginTitle}>Login</div>
						{errorMessage}
						<div className={styles.Label}>Username:</div>
						<input onChange={this.emailChange} className={this.state.emailInputClasses} />
						<div className={styles.Label}>Password:</div>
						<input onChange={this.passwordChange} type='password' className={this.state.passwordInputClasses} onKeyDown={this.onKeyDown} />
						<div onClick={this.loginClick} className={styles.LoginButton}>Login</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.loading,
		error: state.loginError,
	}
}

const mapDispatchToPropos = dispatch => {
	return {
		onAuth: (email, password) => dispatch(actions.authLogin(email, password))
	}
}

export default connect(mapStateToProps, mapDispatchToPropos)(Login);