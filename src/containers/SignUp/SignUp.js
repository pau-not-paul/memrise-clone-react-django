import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

import styles from './SignUp.module.css';
import Header from '../../components/Header/Header';

class SignUp extends Component {

	state = {
		userName: '',
		email: '',
		password: '',
		password2: '',
		userNameInputClasses: styles.Input,
		emailInputClasses: styles.Input,
		passwordInputClasses: styles.Input,
		password2InputClasses: styles.Input,
		errorMessage: null,
	}

	validateEmail(elementValue) {
		var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		return emailPattern.test(elementValue);
	}

	loginClick = () => {
		let correct = true;

		if (this.state.userName === '') {
			correct = false;
			this.setState({
				userNameInputClasses: styles.Input + ' ' + styles.Error,
			});
		}
		if (!this.validateEmail(this.state.email)) {
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
		if (this.state.password2 !== this.state.password) {
			correct = false;
			const errorMessage = (
				<div className={styles.ErrorMessage}>
					Passwords don't match
				</div>
			);

			this.setState({
				password2InputClasses: styles.Input + ' ' + styles.Error,
				errorMessage: errorMessage,
			});
		}

		if (correct) {
			this.signUp();
		}
	}

	signUp = () => {
		this.setState({ errorMessage: null });
		this.props.onAuth(this.state.userName, this.state.email, this.state.password);
	}

	onKeyDown = (event) => {
		if (event.key === 'Enter') {
			this.loginClick();
		}
	}

	userNameChange = (event) => {
		if (this.state.userNameInputClasses === styles.Input + ' ' + styles.Error) {
			this.setState({
				userName: event.target.value,
				userNameInputClasses: styles.Input,
			});
		} else {
			this.setState({ userName: event.target.value });
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
				errorMessage: null,
			});
		} else {
			this.setState({
				password: event.target.value,
				errorMessage: null,
			});
		}
	}

	password2Change = (event) => {
		if (this.state.password2InputClasses === styles.Input + ' ' + styles.Error) {
			this.setState({
				password2: event.target.value,
				password2InputClasses: styles.Input,
				errorMessage: null,
			});
		} else {
			this.setState({
				password2: event.target.value,
				errorMessage: null,
			});
		}
	}

	render() {
		let errorMessage = this.state.errorMessage;

		if (this.props.error) {
			let response = 'Error';
			if (this.props.error.response
				&& this.props.error.response.request
				&& this.props.error.response.request.response
			) {
				response = this.props.error.response.request.response;
			}
			const p = JSON.parse(response);
			let error = '';
			for (var key in p) {
				if (p.hasOwnProperty(key)) {
					console.log(key + " -> " + p[key]);
					error += ' ' + p[key];
				}
			}

			errorMessage = (
				<div className={styles.ErrorMessage}>
					{error}
				</div>
			);
		}

		return (
			<React.Fragment>
				<Header url={this.props.match.url} />
				<div className={styles.Content}>
					<div className={styles.WhiteBox}>
						<div className={styles.LoginTitle}>Sign up</div>
						{errorMessage}
						<div className={styles.Label}>Email:</div>
						<input name='email' onChange={this.emailChange} className={this.state.emailInputClasses} />
						<div className={styles.Label}>Username:</div>
						<input name='username' onChange={this.userNameChange} className={this.state.userNameInputClasses} />
						<div className={styles.Label}>Password:</div>
						<input name='password' onChange={this.passwordChange} type='password' className={this.state.passwordInputClasses} />
						<div className={styles.Label}>Repeat password:</div>
						<input onChange={this.password2Change} type='password' className={this.state.password2InputClasses} onKeyDown={this.onKeyDown} />
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
		error: state.signupError,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (username, email, password) => dispatch(actions.authSignup(username, email, password))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);