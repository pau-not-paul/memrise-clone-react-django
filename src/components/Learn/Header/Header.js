import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

const Header = props => {
	const progress = (100 * (props.totalTurns - props.turns)) / props.totalTurns;
	const progressWidth = { width: progress + '%' };
	return (
		<div className={styles.Header}>
			<div className={styles.HeaderRow}>
				<div className={styles.LeftColumn}>
					<div className={styles.LearningIcon} />
				</div>
				<div className={styles.CenterColumn}>
					<div className={styles.HeaderText}>{props.name}. Learn new words</div>
					<div className={styles.ProgressBar}>
						<div style={progressWidth} className={styles.Progress} />
					</div>
				</div>
				<div className={styles.RightColumn}>
					<div onClick={props.close} className={styles.CloseButton} />
				</div>
			</div>
		</div>
	);
};

export default React.memo(Header);

Header.propTypes = {
	name: PropTypes.string.isRequired,
	close: PropTypes.func.isRequired,
	totalTurns: PropTypes.number.isRequired,
	turns: PropTypes.number.isRequired,
};
