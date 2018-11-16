import React from 'react';
import PropTypes from 'prop-types';
import styles from './EditingNavBar.module.css';

const EditingNavBar = props => (
	<div className={styles.EditingNavBar}>
		<div className={styles.Row}>
			<div className={styles.Title}>Editing</div>
			<div onClick={props.goBack} className={styles.BackBtn}>
				<span className={styles.LeftArrow} />
				Back to course
			</div>
		</div>
	</div>
);

export default EditingNavBar;

EditingNavBar.propTypes = {
	goBack: PropTypes.func.isRequired,
};
