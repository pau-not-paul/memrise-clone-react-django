import React, { Component } from 'react';
import styles from './SignUp.module.css';
import Header from '../../components/Header/Header';

class SignUp extends Component {

	loginClick = () => {
		this.props.history.push('home');
	}

	render() {
		return (
			<React.Fragment>
				<Header url={this.props.match.url}/>
				<div className={styles.Content}>
					<div className={styles.WhiteBox}>
						<div className={styles.LoginTitle}>Sign up</div>
						<div className={styles.Label}>Under construction...</div>
						<div onClick={this.loginClick} className={styles.LoginButton}>Log in with random account</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default SignUp;