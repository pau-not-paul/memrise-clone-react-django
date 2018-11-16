import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

import styles from './Login.module.css';
import Header from '../../components/Header/Header';

class Login extends Component {
	state = {
		email: '',
		password: '',
		emailInputClasses: styles.Input,
		passwordInputClasses: styles.Input,
		errorMessage: null,
	};

	loginClick = () => {
		let correct = true;
		if (this.state.email === '') {
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
	};

	login = () => {
		this.setState({ errorMessage: null });
		this.props.onAuth(this.state.email, this.state.password);
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
			});
		} else {
			this.setState({ [name]: event.target.value });
		}
	};

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
						<input
							name="email"
							onChange={this.inputChange}
							className={this.state.emailInputClasses}
						/>
						<div className={styles.Label}>Password:</div>
						<input
							name="password"
							onChange={this.inputChange}
							type="password"
							className={this.state.passwordInputClasses}
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
		error: state.auth.loginError,
	};
};

const mapDispatchToPropos = dispatch => {
	return {
		onAuth: (email, password) => dispatch(actions.authLogin(email, password)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToPropos,
)(Login);
