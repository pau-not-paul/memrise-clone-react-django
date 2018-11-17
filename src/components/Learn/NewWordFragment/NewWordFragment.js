import React from 'react';
import PropTypes from 'prop-types';
import styles from './NewWordFragment.module.css';

const NewWordFragment = props => (
	<div className={styles.Content}>
		<div className={styles.Main}>
			<div className={styles.Word}>{props.word}</div>
			<div className={styles.Description}>{props.description}</div>
		</div>
		<div className={styles.RightColumn}>
			<div onClick={props.next} className={styles.NextButton}>
				<div className={styles.RightArrow} />
				<div>Next</div>
			</div>
		</div>
	</div>
);

export default React.memo(NewWordFragment);

NewWordFragment.propTypes = {
	word: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	next: PropTypes.func.isRequired,
};
