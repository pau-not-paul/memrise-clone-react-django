import React, { Component } from 'react';
import styles from './Profile.module.css';

class Profile extends Component {
	render() {
		const profile = this.props.profile;
		return (
			<div className={styles.Profile}>
				<div className={styles.ProfileHeader}>
					<div className={styles.UserName}>{profile.username}</div>
					<div className={styles.Level}>LEVEL {profile.level}</div>
					<div className={styles.ImageWrapper}>
						<img className={styles.ProfileImage} alt="" />
					</div>
				</div>
				<div className={styles.ProfileStats}>
					<div className={styles.StatsWrapper}>
						<div className={styles.StatsNumber}>{profile.wordsLearned}</div>
						<div className={styles.StatsLabel}>words learned</div>
					</div>
					<div className={styles.StatsSeparator} />
					<div className={styles.StatsWrapper}>
						<div className={styles.StatsNumber}>{profile.points}</div>
						<div className={styles.StatsLabel}>points</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Profile;
