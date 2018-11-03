import React, { Component } from 'react';
import axios from 'axios';
import styles from './Course.module.css';
import Header from '../../components/Header/Header';
import Spinner from '../../components/Spinner/Spinner';

class Course extends Component {

	state = {
		courseId: null,
		title: null,
		description: null,
	}

	componentWillMount() {
		// setTimeout(this.loadCourse, 1000);
		this.loadCourse();
	}

	loadCourse = () => {
		const courseId = this.props.match.params.courseId;

		const url = (process.env.NODE_ENV === 'development')
			? 'http://localhost:8000/'
			: 'https://memclone-react-django.herokuapp.com/';

		axios.get(url + 'courses/' + courseId)
			.then(res => {
				console.log('hola');
				console.log(res.data);
				const course = res.data;

				this.setState({
					title: course.name,
					description: course.description
				});
			})
		// const name = 'German 1';
		// const description = 'Introduce yourself, get around, and learn a bunch of useful colloquial German expressions to make people smile';

		// this.setState({
		// 	name: name,
		// 	description: description,
		// });
	}

	render() {
		let courseDetails = (
			<div className={styles.SpinnerWrapper}>
				<Spinner />
			</div>
		);

		if (this.state.title) {
			courseDetails = (
				<div className={styles.CourseDetails}>
					<div className={styles.Title}>
						{this.state.title}
					</div>
					<div className={styles.Description}>
						{this.state.description}
					</div>
					<div className={styles.StartButton + ' ' + styles.Disabled} to='/course/create'>Start learning</div>
				</div>
			);
		}


		return (
			<React.Fragment>
				<Header url={this.props.match.url} />
				<div className={styles.PageHead}>
					<div className={styles.PageHeadRow}>
						{courseDetails}
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Course;
