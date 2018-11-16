import React from 'react';
import styles from './LeftColumn.module.css';
import Profile from './Profile/Profile';

const LeftColumn = props => {
	return (
		<div className={styles.LeftColumn}>
			<Profile {...props.profile} />
		</div>
	);
};

export default LeftColumn;
