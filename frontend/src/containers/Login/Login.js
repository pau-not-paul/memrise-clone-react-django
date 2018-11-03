import React, { Component } from 'react';
import styles from './Login.module.css';
import Header from '../../components/Header/Header';

class Login extends Component {

	state = {
		errorMessage: null,
	}

	loginClick = () => {
		this.setState({errorMessage: null});

		setTimeout(() => {
			const errorMessage = (
			<div className={styles.ErrorMessage}>
				Oopsie, wrong password. Or username. Maybe it was the e-mail. Let's try again. Careful with the Caps Lock!
			</div>
			);

			this.setState({errorMessage: errorMessage});
		}, 1000);	
	}

	onKeyDown = (event) => {
		if (event.key === 'Enter') {
			this.loginClick();
		}
	}

	render() {
		return (
			<React.Fragment>
				<Header url={this.props.match.url}/>
				<div className={styles.Content}>
					<div className={styles.WhiteBox}>
						<div className={styles.LoginTitle}>Login</div>
						{this.state.errorMessage}
						<div className={styles.Label}>Username or email:</div>
						<input className={styles.Input}/>
						<div className={styles.Label}>Password:</div>
						<input type='password' className={styles.Input} onKeyDown={this.onKeyDown}/>
						<div onClick={this.loginClick} className={styles.LoginButton}>Login</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Login;