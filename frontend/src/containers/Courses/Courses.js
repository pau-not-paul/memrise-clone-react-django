import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import styles from './Courses.module.css';
import Header from '../../components/Header/Header';

class Courses extends Component {

	state = {
		coursesHTML: null,
	}

	componentWillMount () {
		this.loadCourses();
	}

	loadCourses = () => {
		const coursesHTML = [];

		axios.get('http://127.0.0.1:8000/courses/')
			.then(res => {
				for (let course of res.data) {
					coursesHTML.push(
						<Link key={course.id} to={'/course/'+course.id} className={styles.CourseCard}>{course.name}</Link>
					);
				}
				this.setState({
					coursesHTML: coursesHTML
				});
			})
	}

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
					<div className={styles.ContainerMain}>
						{/*<LeftColumn/>*/}
						<div className={styles.RightColumn}>
							{this.state.coursesHTML}							
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Courses;
