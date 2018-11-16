import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

const Header = props => {
	return (
		<div className={styles.Header}>
			<div className={styles.HeaderRow}>
				<div className={styles.LeftColumn}>
					<div className={styles.LearningIcon} />
				</div>
				<div className={styles.CenterColumn}>{props.name}. Learn new words</div>
				<div className={styles.RightColumn}>
					<div onClick={props.close} className={styles.CloseButton} />
				</div>
			</div>
		</div>
	);
};

export default Header;

Header.propTypes = {
	name: PropTypes.string.isRequired,
	close: PropTypes.func.isRequired,
};
