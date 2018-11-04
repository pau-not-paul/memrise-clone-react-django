import React, { Component } from 'react';
import styles from './Profile.module.css';

class Profile extends Component {

	state = {
		username: '...',
	}
	componentWillMount() {
		const username = localStorage.getItem('username');
		this.setState({ username: username });
	}

	render() {
		return (
			<div className={styles.Profile}>
				<div className={styles.ProfileHeader}>
					<div className={styles.UserName}>{this.state.username}</div>
					<div className={styles.Level}>LEVEL 1</div>
					<img className={styles.ProfileImage} alt="" />
				</div>
				<div className={styles.ProfileStats}>
					<div className={styles.StatsWrapper}>
						<div className={styles.StatsNumber}>0</div>
						<div className={styles.StatsLabel}>words learned</div>
					</div>
					<div className={styles.StatsSeparator}></div>
					<div className={styles.StatsWrapper}>
						<div className={styles.StatsNumber}>0</div>
						<div className={styles.StatsLabel}>points</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Profile;