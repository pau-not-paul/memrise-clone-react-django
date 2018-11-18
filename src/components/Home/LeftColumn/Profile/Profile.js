import React from 'react';
import PropTypes from 'prop-types';
import styles from './Profile.module.css';
import img from '../../../../assets/images/avatar-2.png';

const Profile = props => (
	<div className={styles.Profile}>
		<div className={styles.ProfileHeader}>
			<div className={styles.UserName}>{props.username}</div>
			<div className={styles.Level}>LEVEL {props.level}</div>
			<div className={styles.ImageWrapper}>
				<img src={img} className={styles.ProfileImage} alt="" />
			</div>
		</div>
		<div className={styles.ProfileStats}>
			<div className={styles.StatsWrapper}>
				<div className={styles.StatsNumber}>{props.wordsLearned}</div>
				<div className={styles.StatsLabel}>words learned</div>
			</div>
			<div className={styles.StatsSeparator} />
			<div className={styles.StatsWrapper}>
				<div className={styles.StatsNumber}>{props.points}</div>
				<div className={styles.StatsLabel}>points</div>
			</div>
		</div>
	</div>
);

export default React.memo(Profile);

Profile.propTypes = {
	username: PropTypes.string,
	level: PropTypes.string,
	wordsLearned: PropTypes.string,
	points: PropTypes.string,
};
