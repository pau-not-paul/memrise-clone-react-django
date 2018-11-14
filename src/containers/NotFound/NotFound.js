import React, { Component } from 'react';
import styles from './NotFound.module.css';
import Header from '../../components/Header/Header';

class NotFound extends Component {
	componentDidMount() {
		document.title = 'Memrise - Error';
	}

	render() {
		return (
			<React.Fragment>
				<Header url={this.props.match.url} />
				<div className={styles.Body}>
					<p>The page you are trying to get to doesn't exist.</p>
					<p>Try heading to your dashboard instead.</p>
				</div>
			</React.Fragment>
		);
	}
}

export default NotFound;
