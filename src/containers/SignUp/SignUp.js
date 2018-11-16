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
	};

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
			const errorMessage = <div className={styles.ErrorMessage}>Passwords don't match</div>;

			this.setState({
				password2InputClasses: styles.Input + ' ' + styles.Error,
				errorMessage: errorMessage,
			});
		}

		if (correct) {
			this.signUp();
		}
	};

	signUp = () => {
		this.setState({ errorMessage: null });
		this.props.onAuth(this.state.userName, this.state.email, this.state.password);
	};

	onKeyDown = event => {
		if (event.key === 'Enter') {
			this.loginClick();
		}
	};

	inputChange = event => {
		const name = event.target.name;
		if (this.state[name + 'InputClasses'] === styles.Input + ' ' + styles.Error) {
			this.setState({
				[name]: event.target.value,
				[name + 'InputClasses']: styles.Input,
				errorMessage: null,
			});
		} else {
			this.setState({ [name]: event.target.value, errorMessage: null });
		}
	};

	render() {
		let errorMessage = this.state.errorMessage;

		if (this.props.error) {
			let response = 'Error';
			if (
				this.props.error.response &&
				this.props.error.response.request &&
				this.props.error.response.request.response
			) {
				response = this.props.error.response.request.response;
			}
			const p = JSON.parse(response);
			let error = '';
			for (var key in p) {
				if (p.hasOwnProperty(key)) {
					error += ' ' + p[key];
				}
			}

			errorMessage = <div className={styles.ErrorMessage}>{error}</div>;
		}

		return (
			<React.Fragment>
				<Header url={this.props.match.url} />
				<div className={styles.Content}>
					<div className={styles.WhiteBox}>
						<div className={styles.LoginTitle}>Sign up</div>
						{errorMessage}
						<div className={styles.Label}>Email:</div>
						<input
							name="email"
							onChange={this.inputChange}
							className={this.state.emailInputClasses}
						/>
						<div className={styles.Label}>Username:</div>
						<input
							name="userName"
							onChange={this.inputChange}
							className={this.state.userNameInputClasses}
						/>
						<div className={styles.Label}>Password:</div>
						<input
							name="password"
							onChange={this.inputChange}
							type="password"
							className={this.state.passwordInputClasses}
						/>
						<div className={styles.Label}>Repeat password:</div>
						<input
							name="password2"
							onChange={this.inputChange}
							type="password"
							className={this.state.password2InputClasses}
							onKeyDown={this.onKeyDown}
						/>
						<div onClick={this.loginClick} className={styles.LoginButton}>
							Login
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.signupError,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (username, email, password) => dispatch(actions.authSignup(username, email, password)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SignUp);
