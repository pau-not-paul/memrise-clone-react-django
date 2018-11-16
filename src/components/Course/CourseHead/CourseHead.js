import React from 'react';
import PropTypes from 'prop-types';

import styles from './CourseHead.module.css';
import Spinner from '../../Spinner/Spinner';

const CourseHead = props => (
	<div className={styles.PageHead}>
		<div className={styles.PageHeadRow}>
			{props.name ? (
				<React.Fragment>
					<div className={styles.CourseDetails}>
						<div className={styles.Title}>{props.name}</div>
						<div className={styles.Description}>{props.description}</div>
					</div>
					<div className={styles.CreatedByDiv}>
						<span className={styles.CreatedBySpan}>Created by </span>
						<span className={styles.Owner}>{props.owner}</span>
					</div>
				</React.Fragment>
			) : (
				<Spinner />
			)}
		</div>
	</div>
);

export default CourseHead;

CourseHead.propTypes = {
	name: PropTypes.string,
	description: PropTypes.string,
	owner: PropTypes.string,
};
