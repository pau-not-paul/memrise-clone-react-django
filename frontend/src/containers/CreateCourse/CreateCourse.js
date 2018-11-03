import React, { Component } from 'react';
import styles from './CreateCourse.module.css';
import Header from '../../components/Header/Header';

class CreateCourse extends Component {

	render() {
		return (
			<React.Fragment>
				<Header url={this.props.match.url}/>
				<div className={styles.PageHead}>
					<div className={styles.PageHeadRow}>
						<div className={styles.Title}>
							Create a course
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default CreateCourse;
