import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

import styles from './Logout.module.css';
// import Header from '../../components/Header/Header';
import Spinner from '../../components/Spinner/Spinner';

class Logout extends Component {
	componentDidMount() {
		this.props.logout();
	}

	render() {
		return (
			<div className={styles.Container}>
				<Spinner />
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(actions.logout()),
	};
};

export default connect(
	null,
	mapDispatchToProps,
)(Logout);
