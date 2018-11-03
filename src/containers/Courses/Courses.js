import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import styles from './Courses.module.css';
import Header from '../../components/Header/Header';

class Courses extends Component {

	state = {
		coursesHTML: null,
	}

	componentWillMount() {
		this.loadCourses();
	}

	loadCourses = () => {
		const coursesHTML = [];

		// const url = (window.location.href.indexOf('heroku') !== -1)
		// 	? 'https://memclone-react-django.herokuapp.com/'
		// 	: 'http://localhost:8000/';

		const url = 'https://memclone-react-django.herokuapp.com/';

		console.log('loadCourses:');
		console.log('window.location.href: ' + window.location.href);
		console.log('Courses.url: ' + url);

		axios.get(url + 'courses/')
			.then(res => {
				for (let course of res.data) {
					let justCreatedClass = '';
					const courseId = this.props.match.params.courseId;

					if (courseId === String(course.id)) {
						justCreatedClass = styles.JustCreated;
					}

					coursesHTML.push(
						<Link key={course.id} to={'/course/' + course.id} className={styles.CourseCard + ' ' + justCreatedClass}>
							{course.name}
						</Link>
					);
				}
				coursesHTML.reverse();
				this.setState({
					coursesHTML: coursesHTML
				});
			})
	}

	render() {
		return (
			<React.Fragment>
				<Header url={this.props.match.url} />
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
