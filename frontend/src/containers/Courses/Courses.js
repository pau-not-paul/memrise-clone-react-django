import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Courses.module.css';
import Header from '../../components/Header/Header';

class Courses extends Component {

	render() {
		return (
			<React.Fragment>
				<Header url={this.props.match.url}/>
				<div className={styles.PageHead}>
					<div className={styles.PageHeadRow}>
						<div className={styles.Title}>
							Courses
						</div>
						<Link className={styles.CreateButton} to='/course/create'>Create a course</Link>
					</div>
				</div>
				<div className={styles.Content}>
					HOLA
				</div>
			</React.Fragment>
		);
	}
}

export default Courses;
