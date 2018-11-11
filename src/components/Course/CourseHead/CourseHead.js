import React, { Component } from 'react';
import styles from './CourseHead.module.css';

class WordsBlock extends Component {

	render() {
		return (
			<div className={styles.PageHead}>
				<div className={styles.PageHeadRow}>
					<div className={styles.CourseDetails}>
						<div className={styles.Title}>
							{this.props.course.name}
						</div>
						<div className={styles.Description}>
							{this.props.course.description}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default WordsBlock;