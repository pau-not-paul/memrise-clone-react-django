import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

import styles from './Logout.module.css';
// import Header from '../../components/Header/Header';
import Spinner from '../../components/Spinner/Spinner';

class Logout extends Component {

	componentWillMount() {
		// TODO: logout
		// setTimeout(() => {
		// 	this.props.history.push('/login');
		// }, 1000);
		this.props.logout();
	}

	render() {
		// TODO: if loading show spinner
		// TODO: show error message

		return (
			<div className={styles.Container}>
				<Spinner />
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(actions.logout())
	}
}

export default connect(null, mapDispatchToProps)(Logout);